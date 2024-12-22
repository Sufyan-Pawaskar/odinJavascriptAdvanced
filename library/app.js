const myLibrary = [];

function Book(bookTitle,bookAuthor,bookPages,bookRead) {
    // the constructor...
    this.title = bookTitle;
    this.author = bookAuthor;
    this.pages = bookPages;
    this.read = bookRead;
}
// adding the function to update status of book
Book.prototype.updateStatus = function(readStatus){
    this.read = readStatus;
}

function addBookToLibrary(bookTitle,bookAuthor,bookPages,bookRead) {
    // do stuff here\
    var bookObj = new Book(bookTitle,bookAuthor,bookPages,bookRead);
    myLibrary.push(bookObj);
}

var modal = document.querySelector(".modal");
var triggers = document.querySelectorAll(".trigger");
var closeButton = document.querySelector(".close-button");
var closeButton1 = document.querySelector(".close")

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

for (var i = 0, len = triggers.length; i < len; i++) {
  triggers[i].addEventListener("click", toggleModal);
}
closeButton.addEventListener("click", toggleModal);
closeButton1.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

function submitModal(){
    var bookTitle,bookAuthor,bookPages,bookRead;
    bookTitle = document.getElementById("getBookName").value
    bookAuthor = document.getElementById("getBookAuthor").value
    bookPages = document.getElementById("getBookPages").value
    bookRead = document.getElementById("getBookRead").value
    addBookToLibrary(bookTitle,bookAuthor,bookPages,bookRead)
}

function addRow(){
    var tbody = document.getElementById("tableBody");
    
}