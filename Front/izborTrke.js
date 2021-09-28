document.body.onload 
{
    let container = document.createElement("div");
    container.className = "divZaUvod";
    document.body.appendChild(container);

    let labela = document.createElement("h2");
    labela.innerHTML = "Izaberite trku";
    labela.className = "divMargina";
    container.appendChild(labela);

        var spisakTrka = document.createElement("select");
        spisakTrka.className = "trka";
        container.appendChild(spisakTrka);

        fetch("https://localhost:5001/Formula/PreuzmiSampionat/" + localStorage.getItem("idSampionata")).then(p => { //ne povalci sve, nego samo one sa odgovarajucim SampionatID !!!
            p.json().then(data => {                
                data.forEach(sezona => {  
                    sezona.trkeSezona.forEach(trka => {
                        var option = document.createElement("option");
                        option.value = trka.id;
                        option.text = trka.naziv + " , " + trka.lokacija;
            
                        spisakTrka.appendChild(option);
                    });
                }); 
            });
        });

        const dugme = document.createElement("button");
        dugme.innerHTML = "Vidi grid";
        dugme.className = "dugmePocetna";
        container.appendChild(dugme);       

        //---------- deo za promenljivi grid---------------
        let elLabela = document.createElement("label");
        elLabela.className = "labelaZaBrisanje";
        container.appendChild(elLabela);

        let lab = document.createElement("label");
        lab.innerHTML = "N (za promenljivi grid)";
        container.appendChild(lab);

        let tb = document.createElement("input");
        tb.className = "nInput"; 
        tb.type = "number";
        container.appendChild(tb);
        
        lab = document.createElement("label");
        lab.innerHTML = "M (za promenljivi grid)";
        container.appendChild(lab);

        tb = document.createElement("input");
        tb.className = "mInput"; 
        tb.type = "number";
        container.appendChild(tb);
        
        const nn = container.querySelector(".nInput");
        const mm = container.querySelector(".mInput");

        //------------------------------------------------- 

        dugme.onclick = (ev) => {

            
            localStorage.setItem("imeTrke", spisakTrka.value);

            
            if(nn.value == "" || mm.value == ""){
                nn.value = 10;
                mm.value = 2;

                localStorage.setItem("nZaGrid", nn.value);
                localStorage.setItem("mZaGrid", mm.value);
        
                window.location.href = "./grid.html";
            } else {
                if(nn.value * mm.value == 20) {
                    localStorage.setItem("nZaGrid", nn.value);
                    localStorage.setItem("mZaGrid", mm.value);
                    
                    window.location.href = "./grid.html";

                } else if(nn.value * mm.value < 20) {
                        alert("Grid mora imati najmanje 20 mesta, da bi se videli svi vozaci");
                        nn.value = 10;
                        mm.value = 2;

                        localStorage.setItem("nZaGrid", nn.value);
                        localStorage.setItem("mZaGrid", mm.value);
                
                        window.location.href = "./grid.html";
                    } else {
                        localStorage.setItem("nZaGrid", nn.value);
                        localStorage.setItem("mZaGrid", mm.value);
                        
                        window.location.href = "./grid.html";
                    }
            }
        }
}