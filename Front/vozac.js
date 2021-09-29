export class Vozac{
    constructor(ime, prezime, tim, pozicija) {
        this.ime = ime;
        this.prezime = prezime;
        this.tim = tim;
        this.pozicija = pozicija;
        this.miniKontejner =null;
    }
    timBoja(){
        if(this.tim == "Mercedes"){
            return "darkgrey";
        } else if (this.tim == "Red Bull"){
            return "blue";
        } else if (this.tim == "Meklaren"){
            return "orange";
        } else if (this.tim == "Ferrari"){
            return "red";
        } else if(this.tim == "Aston Martin"){
            return "green";
        } else if(this.tim == "Alpin"){
            return "lightblue";
        } else if(this.tim == "Alpha Tauri"){
            return "darkblue";
        } else if(this.tim == "Alfa Romeo"){
            return "lightcoral";
        } else if(this.tim == "Williams"){
            return "lightskyblue";
        } else if(this.tim == "Haas"){
            return "white";
        }
    }
    
    crtajVozaca(host){
        this.miniKontejner = document.createElement("div");
        this.miniKontejner.className="lok";
        if(!this.ime) {
            this.miniKontejner.innerHTML= "";
        } else {
            this.miniKontejner.innerHTML= this.ime + " " +this.prezime + " ( " + this.tim + " )";
        }
        
        this.miniKontejner.style.backgroundColor=this.timBoja();
        host.appendChild(this.miniKontejner);
    }

    azurirajVozaca(ime, prezime, tim, pozicija){
        this.ime = ime;
        this.tim=tim;
        this.prezime = prezime;
        this.pozicija = pozicija;
        this.miniKontejner.innerHTML = this.ime + " " + this.prezime + " ( " + this.tim + " )";
        this.miniKontejner.style.backgroundColor=this.timBoja(this.tim); 
    }
}