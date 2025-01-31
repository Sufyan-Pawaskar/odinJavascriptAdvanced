const myLibrary = [];

function Book(bookTitle,bookAuthor,bookPages,bookRead) {
    // the constructor...
    this.action = '<button class="delRow" onclick="deleteRow(this)">Delete</button>';
    this.hasRead = '<input onclick="updateReadStatus(this)" type="checkbox"/>'
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
    return bookObj;
}
addBookToLibrary('Thor','Odin','111','Yes');
addBookToLibrary('Loki','Odin','222','Yes');
var modal = document.querySelector(".modal");
var triggers = document.querySelectorAll(".trigger");
var closeButton = document.querySelector(".close-button");
var closeButton1 = document.querySelector(".close")
var modalSubmit = document.getElementById('submitButton');

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
modalSubmit.addEventListener("click",submitModal)

function submitModal(){
    var bookTitle,bookAuthor,bookPages,bookRead;
    bookTitle = document.getElementById("getBookName").value
    bookAuthor = document.getElementById("getBookAuthor").value
    bookPages = document.getElementById("getBookPages").value
    bookRead = document.getElementById("getBookRead").value
    if (bookTitle && bookAuthor && bookPages && bookRead){
      console.log(bookTitle,bookAuthor,bookPages,bookRead);
      var bookObjR= addBookToLibrary(bookTitle,bookAuthor,bookPages,bookRead);
      constructRows('partial',bookObjR)
      toggleModal();
      
    }
}

function constructRows(action,value){
  tbody = document.getElementById('tableBody');
  if (action === 'full'){
    counter = 0
    myLibrary.forEach(book => {
      var tr = document.createElement('tr');
      for(const property in book){
        if(property !== 'updateStatus'){
          var td = document.createElement('td');
          td.dataset.bookIndex = counter
          td.innerHTML = book[property];
          if (property === 'title'){
            td.colSpan='3';
          }
          if(property === 'author'){
            td.colSpan='2';
          }
          tr.appendChild(td);
        } 
      }
      tbody.appendChild(tr);
      counter ++;
    });
  } else if (action == 'partial'){
    var book = value;
    var tr = document.createElement('tr');
    for(const property in book){
      if(property !== 'updateStatus'){
        var td = document.createElement('td');
        td.dataset.bookIndex = myLibrary.length - 1;
        td.innerHTML = book[property];
        if (property === 'title'){
          td.colSpan='3';
        }
        if(property === 'author'){
          td.colSpan='2';
        }
        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  constructRows('full',myLibrary)
});

function deleteRow(ele){
  var table = document.getElementById('myTable');
  var ind = parseInt(ele.closest('td').dataset.bookIndex);
  myLibrary.splice(ind,1);
  var tbdy = document.getElementById('tableBody');
  tbdy.remove();
  tableBody = document.createElement('tbody')
  tableBody.id = 'tableBody'
  table.appendChild(tableBody);
  constructRows('full',myLibrary);
}

function updateReadStatus(ele){
  var table = document.getElementById('myTable');
  var eleIsChecked = ele.checked;
  var ind = parseInt(ele.closest('td').dataset.bookIndex);
  var row = ele.closest('tr');
  var hasBeenRead = row.lastElementChild
  if (eleIsChecked){
    var bookObj = myLibrary[ind].updateStatus('Yes');
    hasBeenRead.innerHTML = 'Yes';
  } else {
    var bookObj = myLibrary[ind].updateStatus('no');
    hasBeenRead.innerHTML = 'no';
  }
}