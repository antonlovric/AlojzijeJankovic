function inicijalizirajDogadaje() {
  document
    .querySelector("#generirajIzreku")
    .addEventListener("click", generirajIzreku);
}

function prikazujTockice(tekstRazmisljanje, razmisljanje) {
  let brojPonavljanja = 0;
  tekstRazmisljanje.innerText = razmisljanje;
  let ID = setInterval(() => {
    if (++brojPonavljanja == 11) {
      clearInterval(ID);
    }
    if (tekstRazmisljanje.innerText.split(".").length < 4) {
      tekstRazmisljanje.innerText += ".";
    } else {
      tekstRazmisljanje.innerText = razmisljanje;
    }
  }, 200);
  setTimeout(() => {
    tekstRazmisljanje.innerText = "Evo ga!";
    document.querySelector("#izreka").style.display = "inline";
    const avatar = document.querySelector(".avatar");
    avatar.src = "../images/avatarSjetio.png";
    const mjehuric = document.querySelector(".mjehuricRazmisljanje");
    mjehuric.src = "../images/mjehuricGovor.svg";
  }, 2400);
}

async function postaviTekstRazmisljanja() {
  const avatar = document.querySelector(".avatar");
  avatar.src = "../images/avatarRazmislja.png";
  const mjehuric = document.querySelector(".mjehuricRazmisljanje");
  mjehuric.style.display = "block";
  mjehuric.src = "../images/mjehuricRazmisljanje.svg";

  const tekstRazmisljanje = document.querySelector(".tekstAvatar");
  let razmisljanja = [
    "Daj mi samo sekundu",
    "Kako je ono išlo",
    "Na vrh jezika mi je",
    "Sekundu molim",
  ];
  let razmisljanje = "";
  let index = Math.round(Math.random() * (razmisljanja.length - 1));
  if (tekstRazmisljanje.innerText) {
    while (razmisljanja[index].localeCompare(tekstRazmisljanje) == 0) {
      index = Math.round(Math.random() * (razmisljanja.length - 1));
    }
  }
  razmisljanje = razmisljanja[index];
  prikazujTockice(tekstRazmisljanje, razmisljanje);
}

function dohvatiIzreke() {
  return new Promise((resolve) => {
    $.get("../misc/poruke.txt", function (data) {
      let izreke = data.split(/[\r\n]+/);
      resolve(izreke);
    });
  });
}

async function generirajIzreku() {
  const poruke = await dohvatiIzreke();
  console.log(poruke);

  const paragraf = document.querySelector("#izreka");
  paragraf.style.display = "none";
  let trenutnaPoruka = paragraf.innerText;

  let index = Math.round(Math.random() * (poruke.length - 1));
  console.log(index);
  let novaPoruka = poruke[index];

  while (trenutnaPoruka && novaPoruka.localeCompare(trenutnaPoruka) == 0) {
    index = Math.round(Math.random() * (poruke.length - 1));
    novaPoruka = poruke[index];
  }
  postaviTekstRazmisljanja();

  paragraf.innerText = novaPoruka;
}

export { inicijalizirajDogadaje };
