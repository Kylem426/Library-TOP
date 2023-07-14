let myLibrary = [];
let form = document.getElementById('form-popup');
let table = document.getElementById('table');
let newBookBtn = document.getElementById('new');
let cancelBtn = document.getElementById('cancel');
let submitBtn = document.getElementById('submitBtn');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const bookRead = document.getElementById('read');

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.Info = function() {
        return (title + ' ' + author + ' ' + pages + ' ' + read);
    }
};

Book.prototype.changeReadStatus = function() {
    if(this.read == 'read') {
        this.read = 'Not Read'
    }else {
        this.read = 'read'
    }
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
};

function displayBooks() {
    myLibrary.forEach(element => {
        const bookNode = document.createElement('p');
        const textNode = document.createTextNode(element.Info());
        bookNode.dataset.id = element;
        bookNode.appendChild(textNode);
        table.appendChild(bookNode);
    })
};

addBookToLibrary('test', 'this', 23, 'read');
addBookToLibrary('second', 'test', 21, 'read');
addBookToLibrary('third', 'test', 20, 'Not Read');
displayBooks();

function displayLastBook() {
    const lastItem = myLibrary[myLibrary.length -1];
    const bookNode = document.createElement('p');
    const textNode = document.createTextNode(lastItem.Info());
    bookNode.dataset.id = myLibrary.length -1;
    bookNode.appendChild(textNode);
    table.appendChild(bookNode);
};

function openForm() {
    document.getElementById('form-popup').style.display = 'block';
};

function closeForm() {
    document.getElementById('form-popup').style.display = 'none';
    form.reset();
};

newBookBtn.addEventListener('click', openForm);

cancelBtn.addEventListener('click', closeForm);

form.onsubmit = function() {
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const read = bookRead.value;
    addBookToLibrary(title, author, pages, read);
    displayLastBook();
    closeForm();
    return false;
};
