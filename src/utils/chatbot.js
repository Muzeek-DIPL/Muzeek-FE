const utterances = [
  ["hi", "hey", "hei", "hello", "hallo", "hai", "halo", "helo"], //0
  ["fungsi web", "web apa", "apa web", "fungsi aplikasi", "apa aplikasi", "aplikasi apa"], //1
  ["kamu siapa", "siapa kamu", "siapa anda", "siapa namamu"], //2
  ["jadi musisi", "publish profile", "profile ke list search"]
];

const answers = [
  ["Halo! ada yang bisa aku bantu?", "Hai! perlu bantuan?"], //0
  [
    "Muzeek merupakan sebuah aplikasi berbasis web yang dibuat untuk membantu pengguna dalam mencari informasi mengenai musisi-musisi yang telah terdaftar pada website ini.",
  ], //1
  [
    "Aku adalah MuzeekBot, bot yang siap membantu kamu untuk menjawab pertanyaan terkait Muzeek!",
    "Perkenalkan, namaku MuzeekBot, bot yang siap membantu kamu untuk menjawab pertanyaan terkait Muzeek!",
  ], //2
  [
    "Buat akun baru pada Muzeek -> Masuk ke halaman Profile dengan mengklik foto profile-mu -> Klik tombol 'Publish Profile'. Setelah itu profil musisi kamu akan terpampang pada halaman explore!"
  ]
];

const alternatives = ["Maaf aku belum mengerti...", "Coba tanya hal lain"];

function compare(utterancesArray, answersArray, string) {
  // const regex = new RegExp("^.*?" + string + "*?", "g");
  let answer;
  for (let i = 0; i < utterancesArray.length; i++) {
    for (let j = 0; j < utterancesArray[i].length; j++) {
      const regex = new RegExp("^.*?" + utterancesArray[i][j] + "*?", "g");
      if (string.match(regex)) {
        let answers = answersArray[i];
        answer = answers[Math.floor(Math.random() * answers.length)];
      }
    }
  }
  return answer;
}

export function outputBotReply(input) {
  return new Promise((resolve, _) => {
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    let product;
    if (compare(utterances, answers, text)) {
      product = compare(utterances, answers, text);
    } else {
      product = alternatives[Math.floor(Math.random() * alternatives.length)];
    }
    resolve(product);
  });
}
