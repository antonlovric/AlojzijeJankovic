import { rotirajIkonu } from "./modules/funkcionalnostIzbornika.js";

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
  let uveziIz = "./modules/galerijaFotografija.js";
  import(uveziIz).then((funkcije) => {
    let brojFotografije = 0;
    setInterval(function () {
      funkcije.promijeniFotografiju(brojFotografije++);
      if (brojFotografije > 3) {
        brojFotografije = 0;
      }
    }, 5000);
  });
}

if (document.querySelector("#ploca") != null) {
  let uveziIz = "./modules/kontrolaPloce.js";
  import(uveziIz).then((funkcije) => {
    funkcije.inicijalizirajPlocu();
  });
}

if (document.querySelector(".avatar") != null) {
  let uveziIz = "./modules/generiranjeCitata.js";
  import(uveziIz).then((funkcije) => {
    funkcije.inicijalizirajDogadaje();
  });
}
