const bcrypt = require("bcrypt");
const { User, Collections, Task } = require("../../models");
const { where } = require("sequelize");

const rollDice = 10;

const authRegister = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    req.flash("error", "Semua Input Tidak Boleh Kosong");
    return res.redirect("/register");
  }

  const isUsername = await User.findOne({ where: { email: email } });
  if (isUsername) {
    req.flash(
      "error",
      "Email Sudah Terdaftar Silahkan Masukkan Email yang lain"
    );
    return res.redirect("/register");
  }

  const passwordHash = await bcrypt.hash(password, rollDice);
  if (password.length < 6 && password.length < 12) {
    req.flash("error", "Password Harus 6 - 12 Character");
    return res.redirect("/register");
  }

  await User.create({
    username,
    email,
    password: passwordHash,
  });

  req.flash("success", "Registrasi Success");
  res.redirect("/login");
};

const authLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash("error", "Semua Input Tidak Boleh Kosong");
    return res.redirect("/login");
  }

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    req.flash("error", "Email Yang Anda Masukkan Tidak Terdaftar");
    return res.redirect("/login");
  }

  const isValidate = await bcrypt.compare(password, user.password);
  if (!isValidate) {
    req.flash("error", "Password Yang Anda Masukkan Salah");
    return res.redirect("/login");
  }

  let loginSession = user.toJSON();
  delete loginSession.password;
  req.session.user = loginSession;

  req.flash("success", "Login Succcess");
  res.redirect("/");
};
const processLogout = async (req, res) => {
  req.session.user = null; // Clear the session on logout

  req.flash("success", `Yey Berhasil Logout`);
  res.redirect("/login");
};

const addCollections = async (req, res) => {
  const { user } = req.session;
  const { name } = req.body;
  if (!user) {
    req.flash("error", "Login Terlebih Dahulu");
    return res.redirect("/login");
  }

  if (!name) {
    req.flash("error", "Input Tidak Boleh Kosong");
    return res.redirect("/add-collection");
  }

  const user_id = user.id;

  await Collections.create({
    name,
    user_id,
  });

  req.flash("success", "Berhasil Menambahkan Collection Baru");
  res.redirect("/");
};

const addTask = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { user } = req.session;

  if (!user) {
    req.flash("error", "Login Terlebih Dahulu");
    return res.redirect("/login");
  }

  if (!name) {
    req.flash("error", "Input Tidak Boleh Kosong");
    return res.redirect(`/add-task/${id}`);
  }
  let isDone = "Pending";

  const dataCollection = await Collections.findOne({
    where: {
      id,
    },
  });

  if (dataCollection.user_id != user.id) {
    req.flash("error", "Tidak Bisa Menambahkan Task Yang Bukan Hak Anda!");
    return res.redirect(`/add-task/${id}`);
  }

  await Task.create({
    name,
    is_done: isDone,
    collections_id: id,
  });

  req.flash("success", "Berhasil Menambahkan Task Baru");
  res.redirect(`/add-task/${id}`);
};

const doneGaBang = async (req, res) => {
  const { id } = req.params;
  const { idc } = req.query;
  const { user } = req.session;

  if (!user) {
    req.flash("error", "Login Terlebih Dahulu");
    return res.redirect("/login");
  }

  const dataCollection = await Collections.findOne({ where: { id: idc } });

  if (dataCollection.user_id != user.id) {
    req.flash("error", "Tidak Bisa menyelesaikan Task Yang Bukan Hak Anda!");
    return res.redirect(`/add-task/${idc}`);
  }

  const is_done = "Done";

  await Task.update(
    {
      is_done,
    },
    {
      where: {
        id: id,
      },
    }
  );

  req.flash("success", "DONE BANGGG.......");
  res.redirect(`/add-task/${idc}`);
};

const pendingNeh = async (req, res) => {
  const { id } = req.params;
  const { idc } = req.query;
  const { user } = req.session;

  if (!user) {
    req.flash("error", "Login Terlebih Dahulu");
    return res.redirect("/login");
  }

  const dataCollection = await Collections.findOne({ where: { id: idc } });

  if (dataCollection.user_id != user.id) {
    req.flash("error", "Tidak Bisa Mengubah Task Yang Bukan Hak Anda!");
    return res.redirect(`/add-task/${idc}`);
  }

  const is_done = "Pending";

  const pendings = await Task.update(
    {
      is_done,
    },
    {
      where: {
        id: id,
      },
    }
  );

  if (pendings) {
    req.flash("success", "Update Task Berhasil");
    return res.redirect(`/add-task/${idc}`);
  }
};

const deleteSemuaTask = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;

  if (!user) {
    req.flash("error", "Login Terlebih Dahulu");
    return res.redirect("/login");
  }

  const dataCollection = await Collections.findOne({
    where: {
      id,
    },
  });

  if (dataCollection.user_id != user.id) {
    req.flash(
      "error",
      "Tidak Bisa Menghapus Data Collections Yang Bukan Hak Anda!"
    );
    return res.redirect(`/add-task/${id}`);
  }

  await Task.destroy({
    where: {
      collections_id: id,
    },
  });

  await Collections.destroy({
    where: {
      id: id,
    },
  });

  req.flash("success", "Delete Task Berhasil");
  res.redirect("/");
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const { user } = req.session;

  if (!user) {
    req.flash("error", "Login Terlebih Dahulu");
    return res.redirect("/login");
  }

  await Task.update(
    {
      name: task,
    },
    {
      where: {
        id: id,
      },
    }
  );

  res.redirect(`/`);
};

const btnDeleteTasks = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;

  if (!user) {
    req.flash("error", "Login Terlebih Dahulu");
    return res.redirect("/login");
  }

  await Task.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/");
};

module.exports = {
  authRegister,
  authLogin,
  processLogout,
  addCollections,
  addTask,
  doneGaBang,
  pendingNeh,
  deleteSemuaTask,
  updateTask,
  btnDeleteTasks,
};
