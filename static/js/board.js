//Board
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

//Winner Checker
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

// Simpan sementara board
function boardSave() {
    // kela euy
}

function boardLoad() {
    // kela euy
}

//Reset Board
function resetBoard() {
    items.forEach(item => {
        item.style.pointerEvents = 'auto';  
        item.textContent = '';             
    });

    currentPlayer = 'X';  
    resultDisplay.textContent = ' ';  
    resultDisplay.innerHTML = '<br>';
}

items.forEach(item => {
    item.addEventListener('click', clickBoard);
});

const resultDisplay = document.getElementById('result');

//Timer
let intervalId;
let count = 5; 

window.addEventListener('DOMContentLoaded', (event) => {
    timer();  
});

function timer() {
    resultDisplay.textContent = `${currentPlayer}'s turn in ${count}s`;
    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(function() {
        count -= 1; 
        resultDisplay.textContent = `${currentPlayer}'s turn in ${count}s`;

        if (count === 0) {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            count = 5; 
        }
    }, 1000);  
}

//Click on board
function clickBoard(event) {
    const clickedItem = event.target;
    if (clickedItem.textContent === '') {
        clickedItem.textContent = currentPlayer;
        const result = checkWinner();
        const winner = currentPlayer;

        if (result === 'win') {
            clearInterval(intervalId); 
            resultDisplay.classList.add('text-lg');
            resultDisplay.textContent = `${winner}'s Win`;
            scoring();
            items.forEach(item => {
                item.style.pointerEvents = 'none';  
            });
            setTimeout(function(){
                resetBoard();
                count = 5;
                timer();
            }, 2000);
            return;
        } else if (result === 'draw') {
            clearInterval(intervalId); 
            resultDisplay.textContent = 'Draw';
            setTimeout(function(){
                resetBoard();
                count = 5;
                timer();
            }, 2000);
            return;
        }

        clearInterval(intervalId);
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        count = 5;  
        timer();  

    }
}

//Scoring
let scoreX = parseInt(document.getElementById('score-x').textContent);
let scoreO = parseInt(document.getElementById('score-o').textContent);

async function scoring() {
    let winner = "";

    if (currentPlayer === 'X') {
        scoreX += 1;
        document.getElementById('score-x').textContent = scoreX;  
        winner = "playerx";
    } else if (currentPlayer === 'O') {
        scoreO += 1;
        document.getElementById('score-o').textContent = scoreO;  
        winner = "playero";
    }

    // Objek JSON
    let scoreData = {
        "winner": winner,
        "pointx": scoreX,
        "pointo": scoreO
    };

    let stringify_json = JSON.stringify(scoreData);

    console.log(stringify_json);

    // JSON ke Flask
    await fetch("/update_point", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: stringify_json
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => console.log(data.message))
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to update score. Please try again later.");
    });
}






