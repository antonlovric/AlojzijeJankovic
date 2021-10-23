let informacijeOPartijama = [];
let abChess = {};
let opcije = {
  animated: false,
  clickable: false,
  draggable: false,
  width: 480,
};

let svePartije = [];

if (screen.width <= 1000) {
  opcije.width = 320;
}
let potez = 0;
let brojPoteza;

let brojStranice = 1;
const tablica = document.querySelector("table").rows;

const prviPotez = document.querySelector("#prviPotez");
const prethodniPotez = document.querySelector("#prethodniPotez");
const iduciPotez = document.querySelector("#iduciPotez");
const posljednjiPotez = document.querySelector("#posljednjiPotez");

prviPotez.disabled = true;
prethodniPotez.disabled = true;
iduciPotez.disabled = true;
posljednjiPotez.disabled = true;

document
  .querySelector(".prethodnaStranica")
  .addEventListener("click", function () {
    prikazStraniceTablice(--brojStranice);
  });
document.querySelector(".iducaStranica").addEventListener("click", function () {
  prikazStraniceTablice(++brojStranice);
});

async function inicijalizirajPlocu() {
  abChess = new AbChess("ploca", opcije);
  abChess.setFEN();
  svePartije = await dohvatiPartije(abChess);
  napuniTablicu(svePartije);
  inicijalizirajTablicu();
  prikazStraniceTablice(1);
}

function napuniTablicu(partije) {
  const tijeloTablice = document.querySelector("#sadrzajTablice");
  let redniBroj = 1;
  partije.forEach((partija) => {
    const dijeloviPartije = partija.split("]");
    const bijeli = dijeloviPartije[4].substring(
      9,
      dijeloviPartije[4].length - 1
    );
    const crni = dijeloviPartije[5].substring(9, dijeloviPartije[5].length - 1);
    const nazivTurnira = dijeloviPartije[0].substring(
      9,
      dijeloviPartije[0].length - 1
    );
    const datum = dijeloviPartije[2].substring(
      8,
      dijeloviPartije[2].length - 1
    );
    const rezultat = dijeloviPartije[6].substring(
      10,
      dijeloviPartije[6].length - 1
    );

    let objektPartije = {
      redniBroj: redniBroj,
      bijeli: bijeli,
      crni: crni,
      nazivTurnira: nazivTurnira,
      datum: datum,
      rezultat: rezultat,
      pgn: partija,
    };
    informacijeOPartijama.push(objektPartije);

    const sadrzaj = `<tr class = "partijaUTablici">
    <td>${redniBroj}</td>
    <td>${bijeli}</td>
    <td>${crni}</td>
    <td>${nazivTurnira}</td>
    <td>${datum}</td>
    <td>${rezultat}</td>
    </tr>`;

    tijeloTablice.innerHTML += sadrzaj;
    redniBroj++;
  });
}

function inicijalizirajTablicu() {
  let partije = document.querySelectorAll(".partijaUTablici");
  partije.forEach((partija) => {
    partija.addEventListener("mouseover", function () {
      this.classList.add("oznacenaPartija");
    });
    partija.addEventListener("mouseleave", function () {
      this.classList.remove("oznacenaPartija");
    });
    partija.addEventListener("click", function () {
      partije.forEach((partija) => {
        if (partija.classList.contains("odabranaPartija")) {
          partija.classList.remove("odabranaPartija");
        }
      });

      this.classList.add("odabranaPartija");
      odaberiPartiju(this);
    });
  });
}

function odaberiPartiju(object) {
  console.log("usao u odabir");
  const paragraf = document.querySelector(".trenutnaPartija");
  let index = object.children[0].innerHTML - 1;
  let partija = informacijeOPartijama[index];
  let crni = document.querySelector(".crni");
  let bijeli = document.querySelector(".bijeli");
  crni.innerHTML = partija.crni;
  bijeli.innerHTML = partija.bijeli;
  potez = 0;

  abChess.setPGN(partija.pgn);

  let poteziPartije = abChess.getMovesPGN();
  const tablicaPoteza = document.querySelector(".potezi");
  tablicaPoteza.innerHTML = "";
  let brojacPoteza = 1;
  for (let i = 0; i < poteziPartije.length; i += 2) {
    const sablona = `<tr class = "potezPartije" colspan = "3">
    <td>${brojacPoteza++}</td>
    <td>${poteziPartije[i] == undefined ? "" : poteziPartije[i]}</td>
    <td>${poteziPartije[i + 1] == undefined ? "" : poteziPartije[i + 1]}</td>
    </tr>`;
    tablicaPoteza.innerHTML += sablona;
  }

  brojPoteza = abChess.getMovesPGN().length;
  console.log(brojPoteza);
  osvjeziGumbe();
  osvjeziPlocu();
  document.querySelector(".pretinacPloce").style.display = "flex";
  document.querySelector(".tekstIznadPloce").scrollIntoView();
}

function prikazStraniceTablice(brojStranice) {
  const ukupniBrojStranica = svePartije.length;

  const prikazBrojaStranice = document.querySelector(".brojStranice");
  prikazBrojaStranice.innerHTML =
    brojStranice + " / " + Math.round(ukupniBrojStranica / 10);
  let zadnjaPrikazanaPartija = brojStranice * 10;
  let prvaPrikazanaPartija = zadnjaPrikazanaPartija - 9;

  for (let i = 0; i < tablica.length; i++) {
    if (i < prvaPrikazanaPartija || i > zadnjaPrikazanaPartija) {
      tablica[i].style.display = "none";
    } else {
      tablica[i].style.display = "table-row";
    }
  }
  tablica[0].style.display = "table-row";
  osvjeziGumbeTablice();
}

function osvjeziGumbeTablice() {
  const prethodnaStranica = document.querySelector(".prethodnaStranica");
  const iducaStranica = document.querySelector(".iducaStranica");
  console.log(brojStranice);
  if (brojStranice == 1) {
    prethodnaStranica.disabled = true;
  } else {
    prethodnaStranica.disabled = false;
  }

  if (brojStranice == 3) {
    iducaStranica.disabled = true;
  } else {
    iducaStranica.disabled = false;
  }
}

function osvjeziPlocu() {
  abChess.view(0);
}

function obojiRedakPoteza(trenutniPotez, sviPotezi) {
  sviPotezi.forEach((potez) => {
    console.log(potez);
    if (potez === trenutniPotez) {
      potez.classList.add("trenutniRed");

      potez.scrollIntoView();
    } else {
      potez.classList.remove("trenutniRed");
    }
  });
}

function oznaciPotez() {
  let trenutniRed = Math.round(potez / 2) - 1;
  const sviPotezi = document.querySelectorAll(".potezPartije");
  if (sviPotezi[trenutniRed] != undefined) {
    obojiRedakPoteza(sviPotezi[trenutniRed], sviPotezi);
  }
}

function osvjeziGumbe() {
  if (potez < brojPoteza) {
    iduciPotez.disabled = false;
    posljednjiPotez.disabled = false;
  } else {
    iduciPotez.disabled = true;
    posljednjiPotez.disabled = true;
  }
  if (potez == 0) {
    prviPotez.disabled = true;
    prethodniPotez.disabled = true;
  } else {
    prviPotez.disabled = false;
    prethodniPotez.disabled = false;
  }
  oznaciPotez();
}

function igrajPrviPotez() {
  potez = 0;
  abChess.view(potez);
  osvjeziGumbe();
}
function igrajPrethodniPotez() {
  if (potez == 0) {
  } else {
    abChess.view(--potez);
    osvjeziGumbe();
  }
}
function igrajIduciPotez() {
  abChess.view(++potez);
  osvjeziGumbe();
}
function igrajPosljednjiPotez() {
  potez = brojPoteza - 1;
  abChess.view(++potez);
  osvjeziGumbe();
}

if (iduciPotez != undefined) {
  prviPotez.addEventListener("click", igrajPrviPotez);
  prethodniPotez.addEventListener("click", igrajPrethodniPotez);
  iduciPotez.addEventListener("click", igrajIduciPotez);
  posljednjiPotez.addEventListener("click", igrajPosljednjiPotez);
}

async function dohvatiPartije(abChess) {
  const partije = await preuzmiPartije();
  return partije.split("¤");
}

function preuzmiPartije() {
  return fetch("../misc/master_games.pgn").then((odgovor) =>
    odgovor.text().then((dohvacenePartije) => {
      return dohvacenePartije;
    })
  );
}

export {
  inicijalizirajPlocu,
  dohvatiPartije,
  inicijalizirajTablicu,
  napuniTablicu,
  odaberiPartiju,
};
