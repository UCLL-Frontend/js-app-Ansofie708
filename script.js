/* H1 aanpassen */
document.querySelector('h1').innerText = 'Mijn To-Do Lijst';

/* Taak toevoegen */
function voegTaakToe(taak) {
    const taakElement = document.createElement('article');
    taakElement.innerHTML = `<h2>${taak.titel}</h2><p>${taak.beschrijving}</p>`;
    taakElement.classList.add('taak');
    document.querySelector ('section.Taken').appendChild(taakElement);
    
}