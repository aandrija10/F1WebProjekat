import { Vozac } from "./vozac.js";

export class Trka{

    constructor(id, naziv, lokacija, n, m){
        this.id = id;
        this.naziv=naziv;
        this.lokacija = lokacija;
        this.kontejner =null;
        this.vozaci=[20];

        if(n == null) {
            this.n = 10;
        } else this.n = n;
            
        if(m == null){
            this.m = 2;
        } else this.m = m;

    }

    dodajVozaca(vozac){
        this.vozaci.push(vozac);
    }

    crtajGrid(host){
        if(!host)
            throw new Exception("Roditeljski element ne postoji");
        
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontejner");
        host.appendChild(this.kontejner);

        this.crtajFormu(this.kontejner);
        this.crtajVozace(this.kontejner);
    }

    crtajFormu(host){
        const kontForma = document.createElement("div");
        kontForma.className="kontForma";
        host.appendChild(kontForma);

        let elLabela = document.createElement("h1");
        elLabela.innerHTML = "Trka";
        kontForma.appendChild(elLabela);

        elLabela = document.createElement("div");
        elLabela.innerHTML = this.naziv;
        elLabela.className = "labTrka";
        kontForma.appendChild(elLabela);

        elLabela = document.createElement("h2");
        elLabela.innerHTML="Dodaj Vozaca";
        kontForma.appendChild(elLabela);

        elLabela = document.createElement("label");
        elLabela.innerHTML="Ime";
        kontForma.appendChild(elLabela);

        let tb= document.createElement("input");
        tb.className="imeVozaca"; 
        kontForma.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.innerHTML="Prezime";
        kontForma.appendChild(elLabela);

        tb= document.createElement("input");
        tb.className="prezimeVozaca"; 
        kontForma.appendChild(tb);

        let nizEkipa = ["Mercedes", "Red Bull", "Meklaren", "Ferrari", "Aston Martin", "Alpin", "Alpha Tauri", "Alfa Romeo", "Williams", "Haas"];
        let bojeTim = ["darkgrey", "blue", "orange", "red", "green", "lightblue", "darkblue", "lightcoral", "lightskyblue", "white"];
        
        let imelab = document.createElement("label");
        imelab.innerHTML = "Ekipa";
        kontForma.appendChild(imelab);

        var spisakEkipa = document.createElement("select");
        spisakEkipa.className = "ekipa";
        kontForma.appendChild(spisakEkipa);

        for (var i = 0; i < nizEkipa.length; i++) {
            var option = document.createElement("option");
            option.value = nizEkipa[i];
            option.text = nizEkipa[i];
            option.style.backgroundColor = bojeTim[i];
            spisakEkipa.appendChild(option);
        }

        elLabela = document.createElement("label");
        elLabela.innerHTML="Pozicija";
        kontForma.appendChild(elLabela);

        tb= document.createElement("input");
        tb.className="pozicija";
        tb.defaultValue = 1;
        tb.type="number";
        kontForma.appendChild(tb);

        const dugme = document.createElement("button");
        dugme.className = "dugmeDodajVozaca";
        dugme.innerHTML="Dodaj Vozaca";
        kontForma.appendChild(dugme);

        dugme.onclick=(ev)=>{     
            //----------- uslov da je trka zavrsena (pun grid) ----------
            let punGrid = 0;
            this.vozaci.forEach(vozac =>{
                if(vozac.ime != null){
                    punGrid++;
                }
            });

            if(punGrid == this.vozaci.length-1){ //grid je pun
                alert("Trka je zavrsena, nemate prava da menjate poredak!");
            } else { //grid nije pun
                const imeV = this.kontejner.querySelector(".imeVozaca").value;
                const prezimeV = this.kontejner.querySelector(".prezimeVozaca").value;
                const timV = spisakEkipa.value;
                const pozicijaV = parseInt(this.kontejner.querySelector(".pozicija").value);
                

                //--------------

                if((pozicijaV <= 20 && pozicijaV > 0 && imeV != "" && prezimeV != "")){ 
                         
                        var brVozaca = 0;
                        var brTimova = 0;
    
                        this.vozaci.forEach( vozac => {
                            if(vozac.ime == imeV && vozac.prezime == prezimeV && vozac.tim == timV) {
                                brVozaca++;
                            };
                        });
    
                        this.vozaci.forEach( vozac => {
                            if(vozac.tim == timV) {
                                brTimova++;
                            };
                        });
    
                        if(brTimova == 2){
                            alert("Tim " + timV +" ima oba vozaca")
                        } else {
                            if(brVozaca == 1){ 
                                alert("Taj vozac vec postoji"); 
                                                     
                            } else { 
                                
                                    if(this.vozaci[pozicijaV].ime == null) { // grid mesto je prazno 
                                        fetch("https://localhost:5001/Formula/DodajVozaca/" + this.id, {
                                        method: "POST",
                                        mode: 'cors',
                                        headers: {
                                            "Content-Type": "application/json"
                                        }, 
                                        body: JSON.stringify({
                                            ime: imeV,
                                            prezime: prezimeV,
                                            tim: timV,
                                            pozicija: pozicijaV
                                        })
                                        }).then(p => {
                                        if(p.ok) {
                                            this.vozaci[pozicijaV].azurirajVozaca(imeV, prezimeV, timV, pozicijaV);
                                            }
                                        else if(p.status == 400) {
                                            alert("Greska");
                                            };
                                        }).catch (p => {
                                            alert("Greska");
                                            });
        
                                    } else { // grid mesto nije prazno
                                        alert("Postoji vozac na datom grid mestu");
                                    }
                            }
                        }   
                    
                } else { //promena vozaca
                    if(pozicijaV > 20 || pozicijaV <= 0) {
                        alert("Nevalidna pozicija!");
                    } else if((imeV == "" && prezimeV != "") || (imeV != "" && prezimeV == "")) {
                        
                    } else alert("Popunite trazena polja validnim podacima!");
                }  
            }
        }

        //------------ deo za promenu imena trke---------------
        
        elLabela = document.createElement("label");
        elLabela.className = "labelaZaBrisanje";
        kontForma.appendChild(elLabela);

        tb = document.createElement("input");
        tb.className = "imeTrkeEdit"; 
        kontForma.appendChild(tb);

        let dugmeEdit = document.createElement("button");
        dugmeEdit.innerHTML = "Promeni ime trke";
        dugmeEdit.className = "dugmeZaEdit";
        kontForma.appendChild(dugmeEdit);

        const novoImeTrke = this.kontejner.querySelector(".imeTrkeEdit");

        dugmeEdit.onclick = (ev) => {

            var answer = window.confirm("Da li ste sigurni da zelite da promenite ime trke?");

            if (answer) {

                    fetch("https://localhost:5001/Formula/PromeniTrku/" + this.id, {
                        method: 'PUT',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            naziv: novoImeTrke.value
                        })
                        }).then(p => {
                            if(p.ok){
                                this.naziv = novoImeTrke.value;
                                document.querySelector(".labTrka").innerHTML = this.naziv;
                            } else if(p.status == 400){
                                alert("Poslati podaci nisu u odgovarajućem formatu");
                                return;
                            }
                        })
                    }        
                }

        //---------------------------------------------------

        //--------------------deo za delete trke ------------------
        
        elLabela = document.createElement("label");
        elLabela.className = "labelaZaBrisanje";
        kontForma.appendChild(elLabela);

        let dugmeDelete = document.createElement("button");
        dugmeDelete.innerHTML = "Obrisi ovu trku";
        dugmeDelete.className = "dugmeZaDelete";
        kontForma.appendChild(dugmeDelete);

        dugmeDelete.onclick = (ev) => {

            var answer = window.confirm("Da li ste sigurni da zelite da obrisete trku?");
            if (answer) {
                fetch("https://localhost:5001/Formula/ObrisiTrku/" + this.id, {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(r => {
                    alert("Trka obrisana");
                    window.history.back();
                })
            }
        }
    }
    
    crtajVozace(host){
        const kontLokacije = document.createElement("div");
        kontLokacije.className="kontLokacije";
        host.appendChild(kontLokacije);

        let red, gridPlace, gp;
        
        for(let i=0; i<this.n;i++){
            red=document.createElement("div");
            red.className="red";
            kontLokacije.appendChild(red);
            for(let j=0; j<this.m;j++){
                gridPlace= document.createElement("div");
                gridPlace.className="lok";
                gp = new Vozac(this.vozaci[i+j].ime, this.vozaci[i+j].prezime, this.vozaci[i+j].tim, this.vozaci[i+j].pozicija);
                this.dodajVozaca(gp);
                gp.crtajVozaca(red);
            }
        }
    }
}