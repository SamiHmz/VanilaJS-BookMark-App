const addBookMark = document.getElementById("add");
const modal = document.getElementById("modal");
const modalForm = document.getElementsByClassName("modal__form")[0];
const bookmarks = document.getElementsByClassName("bookmarks")[0];
const saveBtn = document.getElementById("save");
const websiteName = document.getElementById("name");
var oldBookmarks = {};

var isOpen = true;
function loadOldBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    oldBookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    Object.keys(oldBookmarks).forEach((id) =>
      createBoomarkElement(oldBookmarks[id].url, oldBookmarks[id].name)
    );
  }
}

function createBoomarkElement(url, name) {
  // create dom elements
  let newBookMark = document.createElement("div");
  let title = document.createElement("a");
  let deleteBookmark = document.createElement("i");
  // set the classes
  newBookMark.classList.add("bookmarks__element");
  title.classList.add("bookmarks__element__name");
  deleteBookmark.classList.add("fas", "fa-trash-alt");
  //set the content
  title.href = url;
  title.textContent = name;
  title.target = "_blank";
  deleteBookmark.addEventListener("click", handlleDeleteBookMark);
  // add to the dom
  newBookMark.appendChild(title);
  newBookMark.appendChild(deleteBookmark);
  bookmarks.appendChild(newBookMark);
}
function toggleModal(e) {
  isOpen = !isOpen;
  modal.hidden = isOpen;
  websiteName.focus();
}

function validate(url, name) {
  if (!url || !name) {
    alert("please fill the missing information");
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if (!url.match(regex)) {
    alert("please enter a valid url");
    return false;
  }
  return true;
}

function cond(element) {
  if (element.name != true) return true;
  else if (element.url != true) return true;
  else return false;
}
function handlleDeleteBookMark(e) {
  const url = e.target.previousElementSibling.href;
  if (oldBookmarks[url]) delete oldBookmarks[url];
  localStorage.setItem("bookmarks", JSON.stringify(oldBookmarks));
  e.target.parentNode.remove(e.target);
}

function handlleAddBookMark(e) {
  e.preventDefault();

  let name = e.srcElement.form.elements[0].value;
  let url = e.srcElement.form.elements[1].value;
  url = url.search("https://", "http://") === 0 ? url : `https://${url}`;
  if (!validate(url, name)) {
    return;
  }
  createBoomarkElement(url, name);

  e.srcElement.form.elements[0].value = "";
  e.srcElement.form.elements[1].value = "";

  oldBookmarks[url] = { url, name };
  localStorage.setItem("bookmarks", JSON.stringify(oldBookmarks));
  toggleModal();
}

//event listner

addBookMark.addEventListener("click", toggleModal);
modal.addEventListener("click", toggleModal);
modalForm.addEventListener("click", (e) => e.stopPropagation());
saveBtn.addEventListener("click", handlleAddBookMark);

// onLoad
loadOldBookmarks();
