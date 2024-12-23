// Genera il tabellone
const board = document.getElementById('board');
for (let i = 1; i <= 90; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = i;
    cell.setAttribute('data-number', i);
    board.appendChild(cell);
}

// Variabili globali
const drawnNumbers = [];
const currentNumberDisplay = document.getElementById('current-number');

// Funzione per estrarre un numero
document.getElementById('draw-button').addEventListener('click', () => {
    if (drawnNumbers.length >= 90) {
        alert('Tutti i numeri sono stati estratti!');
        return;
    }

    let number;
    do {
        number = Math.floor(Math.random() * 90) + 1;
    } while (drawnNumbers.includes(number));

    drawnNumbers.push(number);

    // Aggiorna il numero corrente
    currentNumberDisplay.textContent = number;

    // Colora la cella corrispondente
    const cell = document.querySelector(`.cell[data-number='${number}']`);
    if (cell) {
        cell.classList.add('red');
    }
});

// Funzione per resettare il gioco
document.getElementById('reset-button').addEventListener('click', () => {
    // Resetta i numeri estratti
    drawnNumbers.length = 0;
    currentNumberDisplay.textContent = '';
    
    // Rimuove la classe 'red' da tutte le celle
    document.querySelectorAll('.cell.red').forEach(cell => cell.classList.remove('red'));
});
