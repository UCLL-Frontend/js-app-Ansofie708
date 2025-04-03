/* H1 aanpassen */
document.querySelector('h1').innerText = 'Mijn To-Do Lijst';

/* array voor Taken*/
const taken = [
    { titel: 'Boodschappen doen' },
    { titel: 'Sporten' },
    { titel: 'Lezen' },
    { titel: 'Tuinieren' },
    { titel: 'Auto wassen' }
];

/* Taken toevoegen */
taken.forEach(taak => {
    voegTaakObjectToe(taak);
});



/*verwijderen van 'geenTaken*/
document.getElementById('geenTaken').remove();


/*toevoegen taakobject*/
function voegTaakObjectToe(taak) {
    const taakArtikel = document.createElement ('article');
    taakArtikel.innerHTML = `<h2>${taak.titel}</h2>`;
    taakArtikel.classList.add('taak');


    
/* bewerkknop */
const editButton = document.createElement('button');
editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
taakArtikel.appendChild(editButton);


editButton.addEventListener('click', function(){
    bewerkTaak(taakArtikel, taak);
});


document.querySelector('section.Taken').appendChild(taakArtikel);

}

/*verwijder knop*/
const deleteButton = DocumentTimeline.createElement('button');
deleteButton.innerHTML= '<i class="fa-solid fa-trash"></i>';
taak.Artikel.appendChild(deleteButton);

deleteButton.addEventListener('click', function () {
    verwijderTaak(taakArtikel,taak);
});

document.querySelector('section.Taken').appendChild(taakArtikel);

/* Functie om taak te bewerken */
function bewerkTaak(taakElement, taak) {
    const nieuweTitel = prompt('Bewerk taak', taak.titel);

    if (nieuweTitel !== null && nieuweTitel.trim() !== '') {
        taak.titel = nieuweTitel.trim();
        taakElement.querySelector('h2').innerText = taak.titel;
    }
}


/*verwijderen van taak*/

function verwijderTaak(taakElement, taak) {
    const index = taken.findIndex (t => t.titel === taak.titel);
    if (index > -1) {
        taken.splice(index,1);
        taak.Element.remove();
    } 
}

/* Event listener om taken te verwijderen*/
const VerwijderAlleTakenKnop = document.createElement('button');
VerwijderAlleTakenKnop.innerText = 'Verwijder alle taken';
document.querySelector('section.Taken').before(VerwijderAlleTakenKnop);

VerwijderAlleTakenKnop.addEventListener ('click', function() {
    const takenElementen = document.querySelectorAll('section.Taken article.taak');
    takenElementen.forEach(taakElement => taakElement.remove());

}) 

/*Nieuwe taak toevoegen met fat arrow*/
const voegNieuweTaakToe = (titel) => {
    const nieuweTaak = { titel: titel};
    taken.push(nieuweTaak);
    voegTaakObjectToe(nieuweTaak);
};

/*inputveld*/
const nieuweTaakInput = document.createElement('input');
nieuweTaakInput.type = 'text';
nieuweTaakInput.placeholder = 'Nieuwe taak toevoegen';
document.querySelector('section.Taken').before(nieuweTaakInput);

/*eventlistener voor nieuwe taak*/
nieuweTaakInput.addEventListener('keydown',(event) => {
   if (event.code === 'Enter' && nieuweTaakInput.value.trim() !== '') {
    voegNieuweTaakToe(nieuweTaakInput.value.trim());
    nieuweTaakInput.value = '';
   } 
});

