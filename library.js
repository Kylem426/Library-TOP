let myLibrary = [];
let form = document.getElementById('form-popup');
let table = document.getElementById('table');
let newBookBtn = document.getElementById('newBookBtn');
let cancelBtn = document.getElementById('cancelBtn');
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
        return (title + ' ' + author + ' It has ' + pages + ' pages ' + read);
    }
};

Book.prototype.changeReadStatus = function() {
    if(this.read == 'read') {
        this.read = 'not read'
    }else {
        this.read = 'read'
    }
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    console.log(myLibrary);
};

function displayBooks() {
    myLibrary.forEach(element => {
        const bookHolder = document.createElement('div');
        bookHolder.classList.add('bookholder');
        const titleNode = document.createElement('p');
        titleNode.innerHTML = element.title;
        const authorNode = document.createElement('p');
        authorNode.innerHTML = element.author;
        const pagesNode = document.createElement('p');
        pagesNode.innerHTML = element.pages;
        const removeBtn = document.createElement('button');
        const removeTxt = document.createTextNode('Remove');
        removeBtn.classList.add('removeBtn');
        removeBtn.addEventListener('click', () => {
        let bookToRemove = findBookIndex(element);
        removeBook(bookToRemove);
        });
        removeBtn.addEventListener('click', () => {
            table.removeChild(bookHolder);
        });
        const readBtn = document.createElement('button');
        readBtn.classList.add('readBtn');
        const readTxt = document.createTextNode(element.read);
        readBtn.addEventListener('click', () => {
            element.changeReadStatus();
            });
        readBtn.addEventListener('click', () => {
            if(readTxt.textContent == 'read') {
                readTxt.textContent = 'not read'
            }else {
                readTxt.textContent = 'read'
            }
        });
        removeBtn.appendChild(removeTxt); 
        readBtn.appendChild(readTxt);  
        bookHolder.appendChild(titleNode);
        bookHolder.appendChild(authorNode);
        bookHolder.appendChild(pagesNode);
        bookHolder.appendChild(readBtn);
        bookHolder.appendChild(removeBtn);
        table.appendChild(bookHolder);
    });
};
addBookToLibrary('The Hobbit', 'by J.R.R. Tolkien', '304 pages', 'read');
addBookToLibrary('Harry Potter and the Deathly Hallows', 'by J.K. Rowling', '784 pages', 'read');
addBookToLibrary('Moby Dick', 'by Hermine Melville', '427 pages', 'not read');
displayBooks();

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
    displayNewBook();
    closeForm();
    return false;
};

function findBookIndex(book_name) {
    let index = myLibrary.findIndex(() => {book_name});
    return index
};

function removeBook(index) {
    myLibrary.splice(index, 1)
};


function displayNewBook() {
    const newBook = myLibrary[myLibrary.length -1];
    const bookHolder = document.createElement('div');
    bookHolder.classList.add('bookholder');
    const titleNode = document.createElement('p');
    titleNode.innerHTML = newBook.title;
    const authorNode = document.createElement('p');
    authorNode.innerHTML = `by ${newBook.author}`;
    const pagesNode = document.createElement('p');
    pagesNode.innerHTML = `${newBook.pages} pages`;
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn');
    const removeTxt = document.createTextNode('Remove');
    removeBtn.addEventListener('click', () => {
    let bookToRemove = findBookIndex(newBook);
    removeBook(bookToRemove);
    });
    removeBtn.addEventListener('click', () => {
        table.removeChild(bookHolder);
    });
    const readBtn = document.createElement('button');
    readBtn.classList.add('readBtn');
    const readTxt = document.createTextNode(newBook.read);
    readBtn.addEventListener('click', () => {
        newBook.changeReadStatus();
        });
    readBtn.addEventListener('click', () => {
        if(readTxt.textContent == 'read') {
            readTxt.textContent = 'not read'
        }else {
            readTxt.textContent = 'read'
        }
    });
    removeBtn.appendChild(removeTxt); 
    readBtn.appendChild(readTxt);  
    bookHolder.appendChild(titleNode);
    bookHolder.appendChild(authorNode);
    bookHolder.appendChild(pagesNode);
    bookHolder.appendChild(readBtn);
    bookHolder.appendChild(removeBtn);
    table.appendChild(bookHolder);
};