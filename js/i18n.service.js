'use strict'

var gTrans = {
  title: {
    en: 'Books Shop',
    he: 'חנות ספרים',
  },
  name: {
    en: 'Name',
    he: 'שם'
  },
  price: {
    en: 'Price',
    he: 'מחיר'
  },
  create: {
    en: 'create a new book',
    he: 'צור ספר חדש'
  },
  img: {
    en: 'Img',
    he: 'תמונה'
  },
  view: {
    en: 'Book',
    he: 'כריכה'
  },
  actions: {
    en: 'Actions',
    he: 'פעולות'
  },
  read: {
    en: 'Read',
    he: 'קרא'
  },
  update: {
    en: 'Update',
    he: 'עדכון'
  },
  delete: {
    en: 'Delete',
    he: 'מחק'
  },
  prev: {
    en: 'Back',
    he: 'הקודם'
  },
  next: {
    en: 'Next',
    he: 'הבא'
  },
  Language: {
    en: 'english',
    he: 'עברית'
  },
  confirm: {
    en: 'Confirm',
    he: 'אישור'
  },
  rate: {
    en: 'rating',
    he: 'דירוג'
  },
  close: {
    en: 'Close',
    he: 'סגור'
  },
  review: {
    en: 'book review:',
    he: 'מבט אל הספר'
  },
  deatiles: {
    en: 'Enter book deatiles: ',
    he: 'הכנס את פרטי הספר'
  },
  url: {
    en: 'image url',
    he: 'כתובת התמונה'
  },
  test: {
    en: 'test',
    he: 'מבחן'
  },
  ratethis: {
    en: 'rate this book: ',
    he: 'דרג את הספר: '
  },
  id: {
    en: 'id',
    he: 'קוד מזהה'
  }
}

var gCurrLang = 'en';

function getCurrLang() {
  return gCurrLang;
}

function setCurrLang(lang) {
  gCurrLang = lang;
  doTrans();
  renderBooks();
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).formant(num);
}

function getTrans(key) {
  var keyTrans = gTrans[key];

  if (!keyTrans) return 'UNKNOWN';
  var txt = keyTrans[gCurrLang];
  if (!txt) txt = keyTrans['en'];

  return txt;
}

function doTrans() {

  var els = document.querySelectorAll('[data-trans]');

  els.forEach(function (el) {
    var txt = getTrans(el.dataset.trans)
    // console.dir(el)
    // console.log(txt);
    if (el.nodeName === 'INPUT') {
      el.setAttribute('placeholder', txt)
    } else {
      el.innerText = txt;
    }
  })
}

function formatCurrency(num) {
  if (gCurrLang === 'en') return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(num)
  return new Intl.NumberFormat('he', { style: 'currency', currency: 'ILS' }).format(num)
}
