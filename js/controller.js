'use srtict'

var gActiveBtn;
var gSortActive;
$('.dropdown').click(function () {

  $('.dropdown-menu').toggleClass('show');

});

function onInit() {
  console.log('hii');
  renderBooks()
  renderPageNav()


  gActiveBtn = document.querySelector(`[name="btn${gPageIdx + 1}"]`)
  gActiveBtn.classList.add('active')


  doTrans()

}


function onSetLang(lang) {

  console.log(lang);
  var lan = $(lang).attr("data-lang");
  setCurrLang(lan);
  console.log(lan);
  // if (lang === 'he') {
  // document.querySelector('body').classList.add('rtl')
  // } else {
  //     document.querySelector('body').classList.remove('rtl')
  //     document.querySelector('.modal-header').classList.remove('rtl-modal')
  //     document.querySelector('.modal-header .close').classList.remove('rtl-modal-button')
  // }

}


function renderBooks() {


  var books = getBooks()

  var strHead = `
   <div class="row bg-dark mb-2">
  <div data-trans="rate" onclick="onSetSort(this)"  class="col hover-sort">
    rate
  </div>
  <div  data-trans="name" onclick="onSetSort(this)" class="col hover-sort">
    name
  </div>
  <div data-trans="price"  onclick="onSetSort(this)" class="col hover-sort">
    price
  </div>
  <div data-trans="actions" class="col">
    actions
  </div>
  <div date-trans="test"  class="col">
    book view:
  </div>
</div>`

  var strHTMLs = books.map(function (book) {
    var strHTML =
      `
      <div class="row  mt-1 align-items-center">
      <div class="col">
        ${createStarsRate(book.rate)}
      </div>
      <div class="col">
        ${book.name}
      </div>
      <div class="col">
        ${formatCurrency(book.price)}
      </div>
      <div class="col">
      <button data-trans="read" class="btn-primary read-btn" onclick="onReadBook('${book.id}')" type="">Read</button>
      <button data-trans="update" class="btn-warning update-btn" onclick="onUpdateBook('${book.id}')" type="">Update</button>
      <button data-trans="delete" class="btn-info delete-btn" onclick="onDeleteBook('${book.id}')" type="">Delete</button>
      </div>
      <div id="grid-image" class="col ">
      ${book.img}
      </div>
      </div>
      `
    return strHTML
  })
  var elTable = document.querySelector('.container');
  elTable.innerHTML = strHead + strHTMLs.join('');
  doTrans()
}

function onSetSort(sortBy) {
  var sort = $(sortBy).attr("data-trans");
  gSortActive = sort;

  setSortBy(sort)
  renderBooks()
  doTrans()
}



function onAddBook() {
  $('#modal-fade').on('shown.bs.modal', function () {
    $('#exampleModal').trigger('focus')
  })

}

function inputConfirm() {
  var name = document.querySelector('[name="title-input"]').value
  var price = document.querySelector('[name="price-input"]').value
  var img = document.querySelector('[name="img-input"]').value
  addBook(name, price, img)
  renderBooks()
  doTrans()
  renderPageNav()
}

function onDeleteBook(bookIdx) {
  console.log('deleted id ', bookIdx);
  deleteBook(bookIdx)
  renderBooks()
  renderPageNav()

}

function onUpdateBook(bookIdx) {
  var name = document.querySelector('[name="title-input"]').value
  var price = document.querySelector('[name="price-input"]').value
  var img = document.querySelector('[name="img-input"]').value
  updateBook(bookIdx, name, price, img);
  renderBooks();
  renderPageNav()

}

function onReadBook(bookIdx) {
  var book = getBookById(bookIdx)
  $('#basicExampleModal').modal('show')
  $('.img-container').html(book.img)
  $('.modal-body h5').html(book.id)
  $('.modal-body h4').html(book.name)
  $('.modal-body h2').html(book.price)

  $('.rate-conroller').html(
    `
  <h4 data-trans="ratethis">rate this book:</h4>

<button class="btn-dark" onclick="addRate('${bookIdx}')">+</button>
<span>${book.rate}</span>
<button class="btn-dark " onclick="decRate('${bookIdx}')">-</button>`
  )
  doTrans()
}



function onPage(elDirection) {


  if (elDirection === 'next') {

    nextPage();
    renderBooks();
    gActiveBtn = document.querySelector(`[name="btn${gPageIdx + 1}"]`)
    gActiveBtn.classList.add('active')
    return
  }
  if (elDirection === 'prev') {
    prevPage()
    renderBooks()
    gActiveBtn = document.querySelector(`[name="btn${gPageIdx + 1}"]`)
    gActiveBtn.classList.add('active')
    return
  }

  var pageNum = elDirection.substring(3, 4)
  console.log(typeof pageNum);
  gPageIdx = pageNum - 1;

  gActiveBtn = document.querySelector(`[name="btn${gPageIdx + 1}"]`)
  gActiveBtn.classList.add('active')

  renderBooks()

}


function renderPageNav() {
  var str = ''
  for (var i = 1; i <= getPagesLength(); i++) {
    str += `<li class="page-item"><a class="page-link" name="btn${i}" href="#">${i}</a></li>
`}
  var strHtml = `
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" data-trans="prev" onclick="onPage('prev')">Previous</a></li>
  `
  var str2 = `   <li class="page-item"><a class="page-link" data-trans="next" onclick="onPage('next')" >Next</a></li>
  </ul>
</nav>`

  var strHtmls = strHtml + str + str2

  $('.pagination').html(strHtmls)
}
