const board = document.querySelector('.board');

const items = [
    document.getElementById('#item1'),
    document.getElementById('#item2'),
    document.getElementById('#item3'),
    document.getElementById('#item4'),
    document.getElementById('#item5'),
    document.getElementById('#item6'),
    document.getElementById('#item7'),
    document.getElementById('#item8'),
    document.getElementById('#item9')
];


function clickBoard(event) {
    // Ambil elemen yang diklik
    const clickedItem = event.target;

    // Cek apakah kotak sudah terisi
    if (clickedItem.textContent === '') {
      clickedItem.textContent = currentPlayer; // Isi dengan X atau O

      // Ubah giliran pemain
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
}

items.forEach(item => {
    item.addEventListener('click', clickBoard);
});