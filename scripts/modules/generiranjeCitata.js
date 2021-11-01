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

async function dohvatiIzreke() {
  const odgovor = await fetch("../misc/poruke.txt");
  const izreke = await odgovor.text();
  return izreke.split(/[\r\n]+/);
  // return
  //   .then((odgovor) => odgovor.text())
  //   .then((izreke) => {
  //     return izreke.split(/[\r\n]+/);
  //   });
}

function prikaziMjehuric() {
  const pretinacIzreke = document.querySelector(".pretinacIzreke");
  if (pretinacIzreke.style.display == "" && screen.width < 1000) {
    pretinacIzreke.style.display = "flex";
  }
}

async function generirajIzreku() {
  prikaziMjehuric();
  prilagodiEkran();
  const poruke = await dohvatiIzreke();

  const paragraf = document.querySelector("#izreka");
  paragraf.style.display = "none";
  let trenutnaPoruka = paragraf.innerText;

  let index = Math.round(Math.random() * (poruke.length - 1));

  let novaPoruka = poruke[index];

  while (trenutnaPoruka && novaPoruka.localeCompare(trenutnaPoruka) == 0) {
    index = Math.round(Math.random() * (poruke.length - 1));
    novaPoruka = poruke[index];
  }
  postaviTekstRazmisljanja();

  paragraf.innerText = novaPoruka;
}

function prilagodiEkran() {
  if (screen.width <= 1000) {
    const odjeljakIzreka = document.querySelector("#generatorIzreka");
    odjeljakIzreka.style.height = "max-content";
  }
}

export { inicijalizirajDogadaje };
