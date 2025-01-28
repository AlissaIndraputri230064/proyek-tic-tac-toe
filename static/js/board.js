
const board = document.querySelector('.board');
const items = [
    document.getElementById('item1'),
    document.getElementById('item2'),
    document.getElementById('item3'),
    document.getElementById('item4'),
    document.getElementById('item5'),
    document.getElementById('item6'),
    document.getElementById('item7'),
    document.getElementById('item8'),
    document.getElementById('item9')
];

let currentPlayer = 'X'; 

const checkWinner = () => {
    const board = [
        [items[0].textContent, items[1].textContent, items[2].textContent],
        [items[3].textContent, items[4].textContent, items[5].textContent],
        [items[6].textContent, items[7].textContent, items[8].textContent]
    ];

    // Baris
    for (let i = 0; i < 3; i++) {
        const a = board[i][0];
        const b = board[i][1];
        const c = board[i][2];

        if (a != '' && a === b && b === c) {
            return 'win';
        }
    }

    // Kolom
    for (let i = 0; i < 3; i++) {
        const a = board[0][i];
        const b = board[1][i];
        const c = board[2][i];

        if (a != '' && a === b && b === c) {
            return 'win';
        }
    }

    // Ujung kiri atas ke ujung kanan bawah
    for (let i = 0; i < 3; i++) {
        const a = board[0][0];
        const b = board[1][1];
        const c = board[2][2];

        if (a != '' && a === b && b === c) {
            return 'win';
        }
    }

    // Ujung kanan atas ke ujung kiri bawah
    for (let i = 0; i < 3; i++) {
        const d = board[0][2];
        const e = board[1][1];
        const f = board[2][0];

        if (d != '' && d === e && e === f) {
            return 'win';
        }
    }

    // Seri
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const square = board[i][j];
            if (square === '') return undefined;
        }
    }
    return 'draw';
}

function resetBoard() {
    // Mengembalikan pointer-events agar papan bisa diklik kembali
    items.forEach(item => {
        item.style.pointerEvents = 'auto';  // Mengaktifkan kembali interaksi
        item.textContent = '';             // Menghapus teks atau gambar pada elemen papan
    });

    // Lakukan reset status permainan lainnya jika perlu
    currentPlayer = 'X';  // Atau pemain pertama
    resultDisplay.textContent = ' ';  
}


const resultDisplay = document.getElementById('result');

function clickBoard(event) {
    const clickedItem = event.target;
    if (clickedItem.textContent === '') {
        clickedItem.textContent = currentPlayer;
        const result = checkWinner();
        if (result === 'win') {
            resultDisplay.textContent = `${currentPlayer}'s Win`;
            items.forEach(item => {
                item.style.pointerEvents = 'none';  // Menonaktifkan interaksi dengan elemen
            });
            setTimeout(function(){
                resetBoard();
            }, 2000);
            return;
        } else if (result === 'draw') {
            resultDisplay.textContent = 'Draw';
            setTimeout(function(){
                resetBoard();
            }, 2000);
            return;
        }
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
}





items.forEach(item => {
    item.addEventListener('click', clickBoard);
});

