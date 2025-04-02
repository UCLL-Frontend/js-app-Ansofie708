/* H1 aanpassen */
document.querySelector('h1').innerText = 'Mijn To-Do Lijst';

/*eerste taak toevoegen*/
const taakTitel1 = 'Boodschappen doen';
const taakElement1= document.createElement('article');
taakElement1.innerHTML = `<h2>${taakTitel1}</h2>`;
taakElement1.classList.add('taak');
document.querySelector('section.Taken').appendChild(taakElement1);

/*bewerkknop*/
const editButton1 = document.createElement('button');
editButton1.innerHTML = '<i class="fa-solid fa-pencil"></i>';
taakElement1.appendChild(editButton1);

editButton1.addEventListener('click', function() {
    bewerkTaak(taakElement1, taakTitel1);
});

/*Tweede taak toevoegen*/
const taakTitel2 = 'Sporten';
const taakElement2 = document.createElement ('article');
taakElement2.innerHTML = `<h2>${taakTitel2}</h2>`;
taakElement2.classList.add('taak');
document.querySelector('section.Taken').appendChild(taakElement2);

/*bewerkknop*/
const editButton2 = document.createElement('button');
editButton2.innerHTML = '<i class="fa-solid fa-pencil"></i>';
taakElement2.appendChild(editButton2);

editButton2.addEventListener('click', function() {
    bewerkTaak(taakElement2, taakTitel2);
});


/*verwijderen van 'geenTaken*/
document.getElementById('geenTaken').remove();

/* Taak toevoegen */
function voegTaakToe(taak) {
    const taakElement = document.createElement('article');
    taakElement.innerHTML = `<h2>${taak.titel}</h2><p>${taak.beschrijving}</p>`;
    taakElement.classList.add('taak');
    document.querySelector ('section.Taken').appendChild(taakElement);

}

const taakObjectLezen = {
    titel: 'Lezen'
};

   
voegTaakObjectToe(taakObjectLezen);

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


