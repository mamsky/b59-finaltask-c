const { where } = require("sequelize");
const { User, Collections, Task } = require("../../models");

const renderHome = async (req, res) => {
  const { user } = req.session;

  const collection = await Collections.findAll({
    include: {
      model: Task,
      as: "collections",
    },
    order: [["user_id", "DESC"]],
  });

  res.render("home", { data: collection, user });
};

const renderAddCollections = (req, res) => {
  const { user } = req.session;

  res.render("addColections", { user });
};

const renderAddTask = async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;

  const collections = await Collections.findOne({
    include: {
      model: Task,
      as: "collections",
    },
    order: [["createdAt", "DESC"]],
    where: {
      id: id,
    },
  });

  const isPending = await Task.findAll({
    where: {
      collections_id: id,
      is_done: "Pending",
    },
  });

  const isDone = await Task.findAll({
    where: {
      collections_id: id,
      is_done: "Done",
    },
  });

  res.render("addTask", {
    data: collections,
    pending: isPending,
    done: isDone,
    user,
  });
};

const renderLogin = (req, res) => {
  const { user } = req.session;
  if (user) {
    req.flash("error", "Tidak Bisa Kembali Ke Halaman Login");
    return res.redirect("/");
  }
  res.render("login");
};

const renderRegister = (req, res) => {
  const { user } = req.session;
  if (user) {
    req.flash("error", "Tidak Bisa Kembali Ke Halaman Register");
    return res.redirect("/");
  }
  res.render("register");
};

const renderEditTask = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;

  const getDataTask = await Task.findOne({
    where: {
      id: id,
    },
  });

  res.render("editTask", { data: getDataTask, user });
};

module.exports = {
  renderHome,
  renderAddCollections,
  renderAddTask,
  renderLogin,
  renderRegister,
  renderEditTask,
};
