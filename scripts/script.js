import { rotirajIkonu } from "./modules/funkcionalnostIzbornika.js";

import { promijeniFotografiju } from "./modules/galerijaFotografija.js";

import { napuniTablicu } from "./modules/kontrolaPloce.js";

if (document.querySelector(".ikonaNavigacije") != null) {
  let prikazanaNavigacija = false;
  document
    .querySelector(".ikonaNavigacije")
    .addEventListener("click", function () {
      rotirajIkonu(prikazanaNavigacija);
      prikazanaNavigacija = !prikazanaNavigacija;
    });
}

if (document.querySelector(".okvirZaSlike") != null) {
  let brojFotografije = 0;
  setInterval(function () {
    promijeniFotografiju(brojFotografije++);
    if (brojFotografije > 3) {
      brojFotografije = 0;
    }
  }, 5000);
}

if (document.querySelector("#ploca") != null) {
  // const ploca = document.querySelector("#ploca");
  let abChess = {};
  let opcije = {
    animated: false,
  };
  abChess = new AbChess("ploca", opcije);
  abChess.setFEN();
  let games = [];
  $.get("../misc/master_games.pgn", function (data) {
    games = data.split("¤");
    abChess.setPGN(games[0]);
    // console.log(games[0]);
    // games.forEach((partija) => {
    //   let dijeloviPartije = partija.split("]");
    //   console.log(dijeloviPartije[0]);
    // });
    // console.log(abChess.getInfo("White"));
    napuniTablicu(games);
  });
}

$(document).ready(function () {
  $("#tablica").DataTable({
    select: true,
  });
});
