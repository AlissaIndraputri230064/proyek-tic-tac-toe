
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

function clickBoard(event) {
    const clickedItem = event.target;

    if (clickedItem.textContent === '') {
        clickedItem.textContent = currentPlayer; 

        
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
}

items.forEach(item => {
    item.addEventListener('click', clickBoard);
});

