

import { standaardTaken } from "./taken.js";


let taken = JSON.parse(localStorage.getItem('taken')) || []; 


if (taken.length === 0) {
    taken = [...standaardTaken];
    localStorage.setItem('taken', JSON.stringify(taken)); 
}


/* H1 aanpassen */
document.querySelector('h1').innerText = 'Mijn To-Do Lijst';





/* Taken toevoegen */
taken.forEach(taak => {
    voegTaakObjectToe(taak);
});


updateAantalTaken();
updatePrioriteitStatistieken();
updateGeenTakenMelding();




/* Functie om het aantal taken bij te werken */
function updateAantalTaken() {
    const aantalTaken = taken.length;  
    document.getElementById('aantalTaken').innerText = `Totaal aantal Taken: ${aantalTaken}`;
}

/* Functie prioriteit statistieken*/
function updatePrioriteitStatistieken () {
    const stats = { laag: 0, middel: 0, hoog: 0};

taken.forEach((taak) => {
    if (taak.prioriteit && stats.hasOwnProperty(taak.prioriteit)) {
        stats[taak.prioriteit]++;
    }
});


document.getElementById('prioriteitLaag').innerText= `Laag: ${stats.laag}`;
document.getElementById('prioriteitMiddel').innerText= `Middel: ${stats.middel}`;
document.getElementById('prioriteitHoog').innerText= `Hoog: ${stats.hoog}`;

}

/*functie om 'geen taken' melding te tonen*/
function updateGeenTakenMelding() {
    const geenTakenElement = document.getElementById('geenTaken');
    if (taken.length ===0 ) {
        geenTakenElement.style.display = 'block';

    } else {
        geenTakenElement.style.display = 'none';
    }
}

/*toevoegen taakobject*/
function voegTaakObjectToe(taak) {
    const taakArtikel = document.createElement ('article');
    taakArtikel.classList.add('taak');

    const titel = document.createElement('h2');
    titel.innerText = taak.titel;
    taakArtikel.appendChild(titel);

    const prioriteitSpan = document.createElement('span');
    prioriteitSpan.innerText= `prioriteit: ${taak.prioriteit}`;
    prioriteitSpan.classList.add('prioriteit-label');
    taakArtikel.appendChild(prioriteitSpan);


/*verwijder knop per taak*/
const deleteButton = document.createElement('button');
deleteButton.innerHTML= '<i class="fa-solid fa-trash"></i>';
taakArtikel.appendChild(deleteButton);

deleteButton.addEventListener('click', function (){
    verwijderTaak(taakArtikel,taak);
});


    
/* bewerkknop */
const editButton = document.createElement('button');
editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
taakArtikel.appendChild(editButton);


editButton.addEventListener('click', function(){
    bewerkTaak(taakArtikel, taak);
});

document.querySelector('section.Taken').appendChild(taakArtikel);

}



/* Functie om taak te bewerken */
function bewerkTaak(taakElement, taak) {
const titelElement = taakElement.querySelector('h2');
const prioriteitElement = taakElement.querySelector('.prioriteit-label');
const inputTitel = document.createElement('input');
inputTitel.type ='text';
inputTitel.value = taak.titel;
inputTitel.classList.add('bewerk-input');

const selectPrioriteit = document.createElement('select');
['laag', 'middel', 'hoog'].forEach(prioriteit => {
    const optie = document.createElement('option');
    optie.value= prioriteit;
    optie.innerText= prioriteit; 
    if (taak.prioriteit === prioriteit) {
        optie.selected = true;
    }

selectPrioriteit.appendChild(optie);
});

/* huidige h2-element wordt inputveld*/
taakElement.replaceChild(inputTitel, titelElement);
taakElement.replaceChild(selectPrioriteit, prioriteitElement);
inputTitel.focus();

function opslaan() {
    const nieuweTitel = inputTitel.value.trim();
    const nieuwePrioriteit = selectPrioriteit.value;

    if (nieuweTitel !== '') {
        taak.titel = nieuweTitel;
        taak.prioriteit = nieuwePrioriteit

        const nieuweTitelElement = document.createElement('h2');
        nieuweTitelElement.innerText = nieuweTitel;
        
        const nieuwePrioriteitSpan = document.createElement('span');
        nieuwePrioriteitSpan.innerText = `prioriteit: ${nieuwePrioriteit}`;
        nieuwePrioriteitSpan.classList.add('prioriteit-label');


        taakElement.replaceChild(nieuweTitelElement, inputTitel);
        taakElement.replaceChild(nieuwePrioriteitSpan, selectPrioriteit);

        /*localstorage*/
        localStorage.setItem('taken', JSON.stringify(taken));
        updatePrioriteitStatistieken();
    } else /*indien lege input niets wijzigen*/ {
        taakElement.replaceChild(titelElement, inputTitel);
        taakElement.replaceChild(prioriteitElement, selectPrioriteit);
    }
}

/* opslaan enter*/
inputTitel.addEventListener ('keypress', function (e) {
    if (e.key === 'Enter') {
        opslaan();
    }
});

selectPrioriteit.addEventListener('change', function() {
   
        opslaan();
    })
};






/*verwijderen van taak*/

function verwijderTaak(taakElement, taak) {
    const index = taken.findIndex ((t) => t.titel === taak.titel);
    if (index > -1) {
        taken.splice(index, 1);
        taakElement.remove();
        localStorage.setItem('taken', JSON.stringify(taken));
        updateAantalTaken();
        updatePrioriteitStatistieken();
    }
}





/* Event listener om alle taken te verwijderen*/
const VerwijderAlleTakenKnop = document.createElement('button');
VerwijderAlleTakenKnop.innerText = 'Verwijder alle taken';
document.querySelector('section.Taken').before(VerwijderAlleTakenKnop);

VerwijderAlleTakenKnop.addEventListener ('click', function() {
    const takenElementen = document.querySelectorAll('section.Taken article.taak');
    takenElementen.forEach(taakElement => taakElement.remove());
    taken.length= 0;
    localStorage.setItem('taken', JSON.stringify(taken));
    updateAantalTaken();
    updatePrioriteitStatistieken();
    updateGeenTakenMelding();

    /* 'mijn taken' verwijderen*/
    const takenHeader = document.querySelector('section.Taken > h2');
    if (takenHeader) {
        takenHeader.remove();
    }

    VerwijderAlleTakenKnop.remove();

});


