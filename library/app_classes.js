class BookClass {
  static myLibrary = [];

  static addBookToLibrary(book) {
    this.myLibrary.push(book);
  }

  constructor(bookTitle, bookAuthor, bookPages, bookRead) {
    this.action =
      '<button class="delRow" >Delete</button>';
    this.hasRead = '<input class="updateStatusCheck" type="checkbox"/>';
    this.title = bookTitle;
    this.author = bookAuthor;
    this.pages = bookPages;
    this.read = bookRead;
  }

  updateStatus(readStatus) {
    this.read = readStatus;
  }

  updateReadStatus(ele){
    console.log("executed the td>> updateReadStatus ele is: ",ele)
    let table = document.getElementById('myTable');
    let eleIsChecked = ele.checked;
    let ind = parseInt(ele.closest('td').dataset.bookIndex);
    let row = ele.closest('tr');
    let hasBeenRead = row.lastElementChild;
    let bookObj = BookClass.myLibrary[ind];
    console.log("bookObj eleIsChecked: ",eleIsChecked);
    if (eleIsChecked){
      console.log("updating has been read as ",'Yes')
      bookObj.read = 'Yes';
      hasBeenRead.innerHTML = 'Yes';
    } else{
      console.log("updating has been read as ",'No')
      bookObj.read = 'No';
      hasBeenRead.innerHTML = 'No';
    }
  };

  deleteRow(ele){
    console.log(">>>>delete called: ",ele)
    let table = document.getElementById('myTable');
    let ind = parseInt(ele.closest('td').dataset.bookIndex);
    console.log(">>index: ",ind);
    console.log(">>>myLibrary before: ",BookClass.myLibrary);
    BookClass.myLibrary.splice(ind,1);
    console.log(">>>myLibrary after: ",BookClass.myLibrary);
    let tbdy = document.getElementById('tableBody');
    tbdy.remove();
    let tableBody = document.createElement('tbody')
    tableBody.id = 'tableBody'
    table.appendChild(tableBody);
    constructRows('full',BookClass.myLibrary);
    bindFunc()
  }
  getLibrary(){
    console.log(BookClass.myLibrary)
  }

}

//place holder initial load
BookClass.addBookToLibrary(new BookClass('Thor','Odin','111','Yes'));
BookClass.addBookToLibrary(new BookClass('Loki','Odin','222','Yes'));

//grabbing ui Elements
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
modalSubmit.addEventListener("click",submitModal);

function submitModal(){
    var bookTitle,bookAuthor,bookPages,bookRead;
    bookTitle = document.getElementById("getBookName").value
    bookAuthor = document.getElementById("getBookAuthor").value
    bookPages = document.getElementById("getBookPages").value
    bookRead = document.getElementById("getBookRead").value
    if (bookTitle && bookAuthor && bookPages && bookRead){
      console.log(bookTitle,bookAuthor,bookPages,bookRead);
      var bookObjR= new BookClass(bookTitle,bookAuthor,bookPages,bookRead);
      BookClass.addBookToLibrary(bookObjR);
      constructRows('partial',bookObjR);
      toggleModal();
      bindFunc();
      
    }
}

function constructRows(action,value){
  tbody = document.getElementById('tableBody');
  if (action === 'full'){
    counter = 0
    BookClass.myLibrary.forEach(book => {
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
        td.dataset.bookIndex = BookClass.myLibrary.length - 1;
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
  constructRows('full',BookClass.myLibrary);
  bindFunc();
});

function bindFunc(){
  let statusUpdateInputs = document.querySelectorAll(".updateStatusCheck");
  let delRows = document.querySelectorAll(".delRow")
  for(let i=0;i<statusUpdateInputs.length;i++){
    let ele = statusUpdateInputs[i];
    ele.addEventListener('click',function(event){
      BookClass.myLibrary[i].updateReadStatus(ele);
    })
  }
  for(let i=0;i<delRows.length;i++){
    let ele = delRows[i];
    ele.onclick = function(){BookClass.myLibrary[i].deleteRow(ele);}
    
  }
}