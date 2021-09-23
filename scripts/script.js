import { rotirajIkonu } from "./modules/funkcionalnostIzbornika.js";

import { promijeniFotografiju } from "./modules/galerijaFotografija.js";

import {
  inicijalizirajPlocu,
  dohvatiPartije,
  inicijalizirajTablicu,
  napuniTablicu,
  odaberiPartiju,
} from "./modules/kontrolaPloce.js";

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
  inicijalizirajPlocu();
}
