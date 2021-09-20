function promijeniFotografiju(brojFotografije) {
  const trenutnaFotka = document.querySelector(".prvaFotografija");
  const iducaFotka = document.querySelector(".drugaFotografija");
  let podaciOFotografiji = odrediIducuFotografiju(brojFotografije);
  iducaFotka.setAttribute("src", podaciOFotografiji.izvor);
  iducaFotka.setAttribute("alt", podaciOFotografiji.alt);
  trenutnaFotka.classList.add("promjenaPrethodna");
  iducaFotka.classList.add("promjenaIduca");
  setTimeout(function () {
    makniKlase(trenutnaFotka, iducaFotka);
  }, 2000);
}

function makniKlase(trenutnaFotka, iducaFotka) {
  trenutnaFotka.classList.remove("prvaFotografija");
  trenutnaFotka.classList.add("drugaFotografija");

  iducaFotka.classList.remove("drugaFotografija");
  iducaFotka.classList.add("prvaFotografija");

  trenutnaFotka.classList.remove("promjenaPrethodna");
  iducaFotka.classList.remove("promjenaIduca");
}

function odrediIducuFotografiju(brojFotografije) {
  let podaciOFotografiji = {
    izvor: "",
    alt: "",
  };
  switch (brojFotografije) {
    case 0: {
      podaciOFotografiji.izvor = "../images/fotografijaSPlocom.jpeg";
      podaciOFotografiji.alt = "Fotografija s pločom";
      break;
    }
    case 1: {
      podaciOFotografiji.izvor = "../images/prvakHrvatske.jpg";
      podaciOFotografiji.alt = "Alojzije Janković s trofejem prvaka Hrvatske";
      break;
    }
    case 2: {
      podaciOFotografiji.izvor = "../images/simultanka.jpg";
      podaciOFotografiji.alt = "Alojzije Janković na simultanci";
      break;
    }
    case 3: {
      podaciOFotografiji.izvor = "../images/alojzije.jpeg";
      podaciOFotografiji.alt = "Alojzije Janković";
      break;
    }
  }
  return podaciOFotografiji;
}

export { promijeniFotografiju };
