const inputArray = [
  "u",
  "D",
  "m",
  "w",
  "b",
  "a",
  "y",
  "s",
  "i",
  "s",
  "w",
  "a",
  "e",
  "s",
  "e",
  "o",
  "m",
  " ",
  " ",
];

sortArray(inputArray);

function sortArray(data) {
  const arrayTarget = "Dumbways is awesome".split("");

  for (let i = 0; i < data.length; i++) {
    if (data[i] !== arrayTarget[i]) {
      data[i] = arrayTarget[i];
    }
  }

  const result = data.join("");
  console.table(result);
}
