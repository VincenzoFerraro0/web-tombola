  // Genera il tabellone
  const board = document.getElementById('board');
  for (let i = 1; i <= 90; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = i;
    cell.setAttribute('data-number', i);
    board.appendChild(cell);
  }