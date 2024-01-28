document.addEventListener('DOMContentLoaded', function () {
    loadBooks();
});

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const status = document.getElementById('status').value;

    if (title === '' || author === '') {
        alert('Judul dan penulis buku harus diisi!');
        return;
    }

    const book = {
        title,
        author,
        status,
    };

    saveBook(book);
    loadBooks();
    clearForm();
}

function saveBook(book) {
    let books = getBooks();
    
    if (!books) {
        books = {
            belum: [],
            selesai: [],
        };
    }

    books[book.status].push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function getBooks() {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : null;
}

function loadBooks() {
    const books = getBooks();

    if (books) {
        displayBooks('belum', books.belum);
        displayBooks('selesai', books.selesai);
    }
}

function displayBooks(shelfId, books) {
    const shelf = document.getElementById(`${shelfId}-list`);
    shelf.innerHTML = '';

    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${book.title}</strong> - ${book.author} 
                        <button onclick="moveBook(${index}, '${shelfId}')">Pindah</button>
                        <button onclick="deleteBook(${index}, '${shelfId}')" class="button-danger">Hapus</button>`;
        shelf.appendChild(li);
    });
}

function moveBook(index, fromShelf) {
    const books = getBooks();
    const bookToMove = books[fromShelf].splice(index, 1)[0];

    const toShelf = fromShelf === 'belum' ? 'selesai' : 'belum';
    books[toShelf].push(bookToMove);

    localStorage.setItem('books', JSON.stringify(books));
    loadBooks();
}

function deleteBook(index, shelfId) {
    const books = getBooks();
    books[shelfId].splice(index, 1);

    localStorage.setItem('books', JSON.stringify(books));
    loadBooks();
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('status').value = 'belum';
}