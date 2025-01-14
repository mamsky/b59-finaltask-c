// Seorang investor menginvestasikan modalnya sebesar 1 miliar ke beberapa instrumen keuangan. 350 juta ditempatkan ke deposito bank dengan keuntungan 3,5% per tahun, sedangkan 650 juta ditempatkan di obligasi negara sebesar 30% dengan keuntungan 13% per tahun, 35% ditempatkan di saham A dengan keuntungan 14,5% per tahun, dan sisanya ditempatkan di saham B dengan keuntungan 12,5% per tahun. Buatlah sebuah fungsi yang menghitung dan mencetak total uang investor setelah dua tahun.

// 1;
const investor = (tahun) => {
  let depositoBank = 350000000; //350jt
  let obligasiNegara = 650000000 * 0.3; //650 jt x 30% = 195.000.000
  let sahamA = 650000000 * 0.35; //650jt x 35% = 227.500.000
  let sahamB = 650000000 * 0.35; //650jt x 35% = 227.500.000
  //   console.log(sahamA.toLocaleString());

  let keuntunganDeposito = 0.035; //3.5% / thn
  let keuntunganObligasiNegara = 0.13; // 13% / thn
  let keuntunganSahamA = 0.145; //14.5% / thn
  let keuntunganSahamB = 0.125; //12.5 /tahun

  // 350.000.000 x 3.5%  = 12.250.000 -> 362.250.000 x 3.5%  = 12.678.750
  // 195.000.000 x 13%   = 25.350.000 -> 220.350.000 x 13%   = 28.645.500
  // 227.500.000 x 14.5% = 32.987.500 -> 260.487.500 x 14.5% = 37.770.687,5
  // 227.500.000 x 12.5% = 28.437.500 -> 255.937.500 x 12.5% = 31.992.187,5
  // Total Tahun ke 1    = 99.025.000 -> total tahun ke 2    = 210.112.125

  for (let i = 0; i < tahun; i++) {
    depositoBank += depositoBank * keuntunganDeposito;
    obligasiNegara += obligasiNegara * keuntunganObligasiNegara;
    sahamA += sahamA * keuntunganSahamA;
    sahamB += sahamB * keuntunganSahamB;
  }

  let total = depositoBank + obligasiNegara + sahamA + sahamB;

  return "uang investor setelah dua tahun " + total.toLocaleString();
};

console.log(investor(2));
