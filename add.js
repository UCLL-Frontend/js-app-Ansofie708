

document.getElementById('addTaskButton').addEventListener('click', function () {
    const taakInput = document.getElementById('taakInput').value.trim();

    if (taakInput !== '') {
        let taken = JSON.parse(localStorage.getItem('taken')) || [];
        const nieuweTaak = { titel: taakInput };
        taken.push(nieuweTaak);
        localStorage.setItem('taken', JSON.stringify(taken)); 
         document.getElementById('taakInput').value = ''; 
    }
});

function voegTaakObjectToe(taak) {
    const taakArtikel = document.createElement('article');
    taakArtikel.innerHTML = `<h2>${taak.titel}</h2>`;
    taakArtikel.classList.add('taak');

    document.querySelector('section.Taken').appendChild(taakArtikel);
}