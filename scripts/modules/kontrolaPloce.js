function postaviPlocu() {}
function iduciPotez() {}
function prethodniPotez() {}
function odaberiPartiju() {}

export function napuniTablicu(partije) {
  const tijeloTablice = document.querySelector("#sadrzajTablice");
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

    const sadrzaj = `<tr>
    <td>${bijeli}</td>
    <td>${crni}</td>
    <td>${nazivTurnira}</td>
    <td>${datum}</td>
    <td>${rezultat}</td>
    </tr>`;

    tijeloTablice.innerHTML += sadrzaj;
  });
}
