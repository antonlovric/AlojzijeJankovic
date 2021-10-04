export function rotirajIkonu(prikazanaNavigacija) {
  const ikona = document.querySelector(".ikonaNavigacije");

  if (!prikazanaNavigacija) {
    ikona.classList.add("rotacijaKodPrikaza");
    if (ikona.classList.contains("rotacijaKodSkrivanja")) {
      ikona.classList.remove("rotacijaKodSkrivanja");
    }
    upravljajIzbornikom(true);
  } else {
    ikona.classList.add("rotacijaKodSkrivanja");
    if (ikona.classList.contains("rotacijaKodPrikaza")) {
      ikona.classList.remove("rotacijaKodPrikaza");
    }
    upravljajIzbornikom(false);
  }
}

export function upravljajIzbornikom(prikaz) {
  console.log("uso");
  const izbornik = document.querySelector(".izbornik");
  const tijelo = document.querySelector("body");
  console.log(izbornik);
  if (!prikaz) {
    tijelo.classList.remove("onemoguciScroll");
    izbornik.classList.add("skrivanjeIzbornika");
    izbornik.classList.remove("prikazIzbornika");
  } else {
    izbornik.classList.add("prikazIzbornika");
    tijelo.classList.add("onemoguciScroll");
    izbornik.classList.remove("skrivanjeIzbornika");
  }
}
