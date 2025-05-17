

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

/*verwijderen van geenTaken*/
document.getElementById('geenTaken').remove();


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
const input = document.createElement('input');
input.type ='text';
input.value = taak.titel;
input.classList.add('bewerk-input');

/* huidige h2-element wordt inputveld*/
taakElement.replaceChild(input, titelElement);
input.focus();

function opslaan() {
    const nieuweTitel = input.value.trim();
    if (nieuweTitel !== '') {
        taak.titel = nieuweTitel;

        const nieuweTitelElement = document.createElement('h2');
        nieuweTitelElement.innerText = nieuweTitel;
        taakElement.replaceChild(nieuweTitelElement, input);

        /*localstorage*/
        localStorage.setItem('taken', JSON.stringify(taken));
    } else /*indien lege input niets wijzigen*/ {
        taakElement.replaceChild(titelElement, input);
    }
}

/* opslaan enter*/
input.addEventListener ('keypress', function (e) {
    if (e.key === 'Enter') {
        opslaan();
    }
});
}






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





/* Event listener om taken te verwijderen*/
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

});


