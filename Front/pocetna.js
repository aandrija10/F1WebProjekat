document.body.onload 
{
    alert("Sajt za proveru rezultata trka Formule 1"); 

    let container = document.createElement("div");
    container.className = "divZaUvod";
    document.body.appendChild(container);
    
    let labela = document.createElement("h3");
    labela.innerHTML = "Izaberite sezonu";
    container.appendChild(labela);

    var divRB = null;
    var opcija = null;

    fetch("https://localhost:5001/Formula/PreuzmiSampionate").then(p => {
        p.json().then(data  => {
            data.forEach(el => {

                divRB = document.createElement("div");

                opcija = document.createElement("input");
                opcija.type = "radio";
                opcija.name = "godinaSampionat";
                opcija.value = el.id; 
                
                let labela = document.createElement("label");
                labela.innerHTML = el.godina;

                divRB.appendChild(opcija);
                divRB.appendChild(labela);
                container.appendChild(divRB);
                
            });         
        });
    });

    setTimeout(function(){ //kasnjenje da bi se gornji deo iscrtao pravilno 

        const dugmeSezona = document.createElement("button");
        dugmeSezona.innerHTML = "Vidi trke za sezonu"
        container.appendChild(dugmeSezona);

        dugmeSezona.onclick = (ev) => {

            const idSampionat = container.querySelector(`input[name='godinaSampionat']:checked`);

            if (idSampionat == null){
                alert("Morate odabrati sezonu da biste nastavili");
            } else {
                localStorage.setItem("idSampionata", idSampionat.value);
                window.location.href = "./izborTrke.html";
            }
        }

    }, 500);
}