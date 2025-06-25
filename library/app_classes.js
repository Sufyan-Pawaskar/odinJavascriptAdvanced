class Book {
  myLibrary = [];

  static addBookToLibrary(book) {
    this.myLibrary.push(book);
  }

  constructor(bookTitle, bookAuthor, bookPages, bookRead) {
    this.action =
      '<button class="delRow" onclick="deleteRow(this)">Delete</button>';
    this.hasRead = '<input onclick="updateReadStatus(this)" type="checkbox"/>';
    this.title = bookTitle;
    this.author = bookAuthor;
    this.pages = bookPages;
    this.read = bookRead;
  }

  updateStatus(readStatus) {
    this.read = readStatus;
  }
}
