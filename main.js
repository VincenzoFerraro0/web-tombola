// Genera il tabellone
const board = document.getElementById('board');

// Creiamo le cartelle con numeri predefiniti
const cards = [
    [1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 21, 22, 23, 24, 25], // Prima cartella
    [6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 26, 27, 28, 29, 30], // Seconda cartella
    [31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55], // Terza cartella
    [36, 37, 38, 39, 40, 46, 47, 48, 49, 50, 56, 57, 58, 59, 60], // Quarta cartella
    [61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85], // Quinta cartella
    [66, 67, 68, 69, 70, 76, 77, 78, 79, 80, 86, 87, 88, 89, 90]  // Sesta cartella
];

// Genera le celle del tabellone e le distribuisce nelle cartelle
for (let i = 1; i <= 90; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = i;
    cell.setAttribute('data-number', i);
    
    // Aggiungi ogni cella alla cartella corrispondente
    let cardNumber = -1;
    for (let j = 0; j < cards.length; j++) {
        if (cards[j].includes(i)) {
            cardNumber = j + 1;  // Rileva in quale cartella si trova il numero
            break;
        }
    }

    // Appendi un attributo per identificare la cartella
    cell.setAttribute('data-card', cardNumber);
    board.appendChild(cell);
}

// Variabili globali
const drawnNumbers = [];
const currentNumberDisplay = document.getElementById('current-number');

// Variabili per tracciare se un tipo di combinazione è stato già segnalato
const combinationAlerts = {
    ambo: false,
    terna: false,
    quaterna: false,
    cinquina: false,
    tombola: false
};

// Sezione per visualizzare i messaggi
const messagesDiv = document.getElementById('messages');

// Funzione per estrarre un numero
document.getElementById('draw-button').addEventListener('click', () => {
    if (drawnNumbers.length >= 90) {
        showMessage('Tutti i numeri sono stati estratti!');
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

    // Controlla le combinazioni sul tabellone
    checkBoardCombinations();
});

// Funzione per resettare il gioco
document.getElementById('reset-button').addEventListener('click', () => {
    // Resetta i numeri estratti
    drawnNumbers.length = 0;
    currentNumberDisplay.textContent = '';
    
    // Rimuove la classe 'red' da tutte le celle
    document.querySelectorAll('.cell.red').forEach(cell => cell.classList.remove('red'));

    // Resetta gli alert delle combinazioni
    combinationAlerts.ambo = false;
    combinationAlerts.terna = false;
    combinationAlerts.quaterna = false;
    combinationAlerts.cinquina = false;
    combinationAlerts.tombola = false;

    // Pulisce i messaggi
    messagesDiv.innerHTML = '';
});

// Funzione per mostrare i messaggi a schermo
function showMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);

    // Imposta un timeout per rimuovere il messaggio dopo qualche secondo
    setTimeout(() => {
        messageElement.remove();
    }, 10000); // Rimuove il messaggio dopo 5 secondi
}

// Funzione per controllare le combinazioni sul tabellone
function checkBoardCombinations() {
    // Controlliamo per ogni cartella quante celle sono colorate
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const coloredCells = card.filter(num => drawnNumbers.includes(num));
        
        // Controlliamo le combinazioni riga per riga
        for (let row = 0; row < 3; row++) {
            const rowStart = row * 5;
            const rowEnd = rowStart + 5;
            const rowCells = card.slice(rowStart, rowEnd);
            const rowColoredCells = rowCells.filter(num => drawnNumbers.includes(num));

            // Verifica combinazione per riga
            if (rowColoredCells.length === 2 && !combinationAlerts.ambo) {
                showMessage(`Ambo! Cartella ${i + 1} `);
                combinationAlerts.ambo = true;  // Segna che l'alert per ambo è stato dato
            } else if (rowColoredCells.length === 3 && !combinationAlerts.terna) {
                showMessage(`Terna! Cartella ${i + 1}`);
                combinationAlerts.terna = true;  // Segna che l'alert per terna è stato dato
            } else if (rowColoredCells.length === 4 && !combinationAlerts.quaterna) {
                showMessage(`Quaterna! Cartella ${i + 1}`);
                combinationAlerts.quaterna = true;  // Segna che l'alert per quaterna è stato dato
            } else if (rowColoredCells.length === 5 && !combinationAlerts.cinquina) {
                showMessage(`Cinquina! Cartella ${i + 1}`);
                combinationAlerts.cinquina = true;  // Segna che l'alert per cinquina è stato dato
            }
        }

        // Controlla la Tombola (tutti i numeri della cartella)
        if (coloredCells.length === 15 && !combinationAlerts.tombola) {
            showMessage(`Tombola! Hai completato la Cartella ${i + 1}`);
            combinationAlerts.tombola = true;  // Segna che l'alert per tombola è stato dato
        }
    }
}
