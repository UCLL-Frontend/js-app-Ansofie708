/* H1 aanpassen */
document.querySelector('h1').innerText = 'Mijn To-Do Lijst';

/*eerste taak toevoegen*/
const taakTitel1 = 'Boodschappen doen';
const taakElement1= document.createElement('article');
taakElement1.innerHTML = `<h2>${taakTitel1}</h2>`;
taakElement1.classList.add('taak');
document.querySelector('section.Taken').appendChild(taakElement1);

/*Tweede taak toevoegen*/
const taakTitel2 = 'Sporten';
const taakElement2 = document.createElement ('article');
taakElement2.innerHTML = `<h2>${taakTitel2}</h2>`;
taakElement2.classList.add('taak');
document.querySelector('section.Taken').appendChild(taakElement2);


/*verwijderen van 'geenTaken*/
document.getElementById('geenTaken').remove();

/* Taak toevoegen */
function voegTaakToe(taak) {
    const taakElement = document.createElement('article');
    taakElement.innerHTML = `<h2>${taak.titel}</h2><p>${taak.beschrijving}</p>`;
    taakElement.classList.add('taak');
    document.querySelector ('section.Taken').appendChild(taakElement);

}



