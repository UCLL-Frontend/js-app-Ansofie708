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



/* Functie om taak te bewerken */
function bewerkTaak(taakElement, taak) {
    const nieuweTitel = prompt('Bewerk taak', taak.titel);

    if (nieuweTitel !== null && nieuweTitel.trim() !== '') {
        taak.titel = nieuweTitel.trim();
        taakElement.querySelector('h2').innerText = taak.titel;
    }
}

