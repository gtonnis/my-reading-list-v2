document.getElementById('book-form').addEventListener('submit', saveBook);

function saveBook(e) {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let year = document.getElementById('year').value;
  let bookId = chance.guid();
  let bookReadStatus = 'Unread';

  let book = {
    id: bookId,
    title: title,
    author: author,
    year: year,
    read: bookReadStatus
  }

  if (author ==='' || title === ''|| year ===''){
    showAlert('Please fill in all fields.', 'warning');

  }else if (localStorage.getItem('books') == null) {
    let books = [];

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

  } else {
    let books = JSON.parse(localStorage.getItem('books'));
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    showAlert('Book Added to List', 'success');
  }
 
  document.getElementById('book-form').reset();
 
  fetchBooks();
 
  e.preventDefault();
 
}

function markBookRead(id) {
  let books = JSON.parse(localStorage.getItem('books'));
 
  for (let i = 0; i < books.length; i++) {
   
    if (books[i].id === id) {
           books[i].read = 'Read'     
       
    }
  }
  
  localStorage.setItem('books', JSON.stringify(books));

  fetchBooks();
  showAlert('Book Marked Read', 'read');      
}




function deleteBook(id) {
  let books = JSON.parse(localStorage.getItem('books'));

  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books.splice(i, 1);
    }
  }

  localStorage.setItem('books', JSON.stringify(books));

  fetchBooks();
  showAlert('Book Removed from List', 'danger');
}

function showAlert(message, className) {
  const div = document.createElement('div');
div.className = `alert alert-${className}`;   
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('.book-form');
  container.insertBefore(div, form);

  // Vanish in 2 seconds
  setTimeout(() => document.querySelector('.alert').remove(), 2000);
}

 


function fetchBooks() {
  
  let books = JSON.parse(localStorage.getItem('books'));
  let booksList = document.getElementById('booksList');
  
  booksList.innerHTML = '';


  for (let i = 0; i < books.length; i++) {
    let author = books[i].author;
    let title = books[i].title;
    let year = books[i].year;
     let id = books[i].id;
     let read = books[i].read; 
   

       booksList.innerHTML +=  '<tr>' +
            ' <td> <span id="label" class="'+ read +'">' +  read  + '</span> ' + '</td> ' +
            '<td><button onclick="markBookRead(\''  +  id  + '\')" class="btn-warning">Mark Read</button></td> '  +
            '<td>' + author + ' </td> ' +
            ' <td>'  + title + ' </td>' +
            ' <td>'  +  year + ' </td>' + 
   
    '<td><button onclick="deleteBook(\''  +   id   + '\')" class="btn-danger">Delete</button></td>'   +
    '</tr>';
   
  }
   
}
 
//Sorting Books
/**
*
*@param {HTMLTableElement} table The table to sort
*@param {number} column The index of the column to sort
*@param {boolean} asc Determines if the sorting will be in ascending
*/
function sortTableByColumn(table, column, asc = true){
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    //Sort each row
    const sortedRows = rows.sort((a, b) => {
       const aColumnText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
       const bColumnText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

       return aColumnText > bColumnText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    //Remove all existing TRs from the table
    while (tBody.firstChild){
        tBody.removeChild(tBody.firstChild);
    }

    //Re-add the newly sorted rows
    tBody.append(...sortedRows);

    //Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
       const tableElement = headerCell.parentElement.parentElement.parentElement; 
       const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
       const currentIsAscending = headerCell.classList.contains("th-sort-asc");

       sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

 let btn1 = document.querySelector('#btn-1');
            let btn2 = document.querySelector('#btn-2');
            let btn3 = document.querySelector('#btn-3');
            
            btn1.addEventListener('click', () => {
                document.body.style.backgroundImage = "url('images/old-books-1.jpg')";
            });
            
             btn2.addEventListener('click', () => {
                document.body.style.backgroundImage =  "url('images/dark-wood-3.jpg')";
            });
            
             btn3.addEventListener('click', () => {
                document.body.style.backgroundImage =   "url('images/library-1.jpg')";
            });
