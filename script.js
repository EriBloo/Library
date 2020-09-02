function Book(title, author, pages, read = false) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function() {
		return `${this.title} by ${this.author}, ${pages} pages, ${read ? "read" : "not read yet"}`;
	}
}

function addBookToLibrary(title, author, pages, read = false) {
	library.push(new Book(title, author, pages, read));
}

function addBook(e) {
	const bookForm = document.createElement("form");
	const book = document.createElement("div");

	createForm(bookForm);

	container.insertBefore(bookForm, e.target);

	book.classList.add("book");
	book.setAttribute("data", library.length);
}

function createForm(form) {
	form.classList.add("book");

	const inputTitle = document.createElement("input");
	inputTitle.classList.add("form-title");
	inputTitle.setAttribute("placeholder", "Title");
	inputTitle.setAttribute("type", "text");
	inputTitle.setAttribute("autocomplete", "off");
	form.appendChild(inputTitle);

	const inputAuthor = document.createElement("input");
	inputAuthor.setAttribute("placeholder", "Author");
	inputAuthor.setAttribute("type", "text");
	inputAuthor.setAttribute("autocomplete", "off");
	form.appendChild(inputAuthor);

	const inputPages = document.createElement("input");
	inputPages.setAttribute("placeholder", "Pages");
	inputPages.setAttribute("type", "text");
	inputPages.setAttribute("autocomplete", "off");
	form.appendChild(inputPages);

	const confirm = document.createElement("h3");
	confirm.textContent = "+";
	confirm.addEventListener("click", createBook);
	form.appendChild(confirm);
}

function createBook() {
	const form = document.querySelector("form");
	const inputs = form.querySelectorAll("input");
	
	library.push(new Book(inputs[0].value, inputs[1].value, inputs[2].value));
	
	container.removeChild(form);
}

let library = [];

const container = document.querySelector(".container");
const addButton = document.querySelector(".add");
addButton.addEventListener("click", addBook); 