const triangleFlipped = (num) => {
  for (let i = num; i >= 1; i--) {
    let baris = "";

    for (let s = 1; s <= num - i; s++) {
      baris += " ";
    }

    for (let j = 1; j <= i; j++) {
      if ((i + j) % 2 == 0) {
        if (j % 2 == 0) {
          baris += " +";
        } else {
          baris += " #";
        }
      } else {
        baris += " +";
      }
    }

    console.log(baris);
  }
};

triangleFlipped(5);
