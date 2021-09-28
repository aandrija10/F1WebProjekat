import {Trka} from "./trka.js"

fetch("https://localhost:5001/Formula/PreuzmiTrku/" + localStorage.getItem("imeTrke")).then(p => { 
    p.json().then(data => {
        data.forEach(trka => {
            const novaTrka = new Trka(trka.id, trka.naziv, trka.lokacija, localStorage.getItem("nZaGrid"), localStorage.getItem("mZaGrid"));
            novaTrka.crtajGrid(document.body);

            trka.vozaci.forEach(vozac => {
                var vozacNovi = novaTrka.vozaci[vozac.pozicija];
                vozacNovi.azurirajVozaca(vozac.ime, vozac.prezime, vozac.tim, vozac.pozicija);
            });
        });
    });
});

