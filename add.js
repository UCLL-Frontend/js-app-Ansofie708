

document.getElementById('addTaskButton').addEventListener('click', function () {
    const taakInputElement = document.getElementById('taakInput');
   const taakInput = taakInputElement.value.trim();
   const meldingElement = document.getElementById('melding');

    if (taakInput !== '') {
        let taken = JSON.parse(localStorage.getItem('taken')) || [];
        const nieuweTaak = { titel: taakInput };
        taken.push(nieuweTaak);
        localStorage.setItem('taken', JSON.stringify(taken)); 
         document.getElementById('taakInput').value = ''; 
    


      

       taakInputElement.value = '';
       meldingElement.textContent = 'Taak toegevoegd!';
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