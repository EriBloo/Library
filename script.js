function Book(title, author, pages, read = false) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function() {
		return `${this.title} by ${this.author}, ${pages} pages, ${read ? "read" : "not read yet"}`;
	}
}

function addBookToLibrary(title, author, pages) {
	library.push(new Book(title, author, pages));
}

function createForm(e) {
	const form = document.createElement("form");
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
	inputPages.setAttribute("type", "number");
	inputPages.setAttribute("min", "1");
	inputPages.setAttribute("autocomplete", "off");
	form.appendChild(inputPages);

	const confirm = document.createElement("h3");
	confirm.textContent = "+";
	confirm.addEventListener("click", createBook);
	form.appendChild(confirm);

	container.insertBefore(form, e.target);
}

function createBook() {
	const form = document.querySelector("form");
	const inputs = form.querySelectorAll("input");
	
	addBookToLibrary(inputs[0].value, inputs[1].value, inputs[2].value);

	container.removeChild(form);

	const book = document.createElement("div");
	book.classList.add("book");
	book.setAttribute("data", library.length);
}

let library = [];

const container = document.querySelector(".container");
const addButton = document.querySelector(".add");
addButton.addEventListener("click", createForm); 