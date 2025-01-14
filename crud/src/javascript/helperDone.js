const formatDone = (data) => {
  let le = [];
  let ee = [];
  data.map((field) => {
    // console.log(field.is_done, field.collections_id);
    if (field.collections_id) {
      if (field.is_done == "Done") {
        ee.push(field.is_done.length);
      }
      le.push(field.is_done);
    }
  });
  return `${ee.length}/${le.length}`;
};

const formatImage = (data) => {
  let le = [];
  let ee = [];
  data.map((field) => {
    if (field.collections_id) {
      if (field.is_done == "Done") {
        ee.push(field.is_done.length);
      }
      le.push(field.is_done);
    }
  });

  if (ee.length == le.length) {
    return `/assets/image/ckls.png`;
  } else {
    return `/assets/image/time.png`;
  }
};

module.exports = {
  formatDone,
  formatImage,
};
