

document.getElementById('addTaskButton').addEventListener('click', function () {
    const taakInputElement = document.getElementById('taakInput');
   const taakInput = taakInputElement.value.trim();
   const prioriteitInput = document.getElementById('prioriteitInput').value;
   const meldingElement = document.getElementById('melding');

    if (taakInput !== '') {
        let taken = JSON.parse(localStorage.getItem('taken')) || [];

        const nieuweTaak = {
            titel: taakInput,
            prioriteit: prioriteitInput
        };

        taken.push(nieuweTaak);
        localStorage.setItem('taken', JSON.stringify(taken));

        taakInputElement.value = '';
        document.getElementById('prioriteitInput').value = 'laag'

        meldingElement.textContent = 'Taak is met succes toegevoegd!'
    } else {
        meldingElement.textContent = 'Er is geen taak ingevoerd.'
    }
    
});

      


function voegTaakObjectToe(taak) {
    const taakArtikel = document.createElement('article');
    taakArtikel.innerHTML = `<h2>${taak.titel}</h2>`;
    taakArtikel.classList.add('taak');

    document.querySelector('section.Taken').appendChild(taakArtikel);
}