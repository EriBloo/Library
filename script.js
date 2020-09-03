function Book(title, author, pages, read = false) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function() {
		return `${this.title} by ${this.author}, ${pages} pages, ${read ? "Read" : "Not read"}`;
	}
	this.isread = function() {
		return `${this.read ? "Read" : "Not read"}`
	}
	this.toggleread = function() {
		this.read = !this.read;
	}
}

function addBookToLibrary(title, author, pages) {
	library.push(new Book(title, author, pages));
}

function createForm() {
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
	confirm.classList.add("confirm");
	confirm.textContent = "+";
	confirm.addEventListener("click", createBook);
	form.appendChild(confirm);

	container.insertBefore(form, addButton);
}

function createBook() {
	const form = document.querySelector("form");
	const inputs = form.querySelectorAll("input");
	
	addBookToLibrary(inputs[0].value, inputs[1].value, inputs[2].value);

	container.removeChild(form);

	drawLibrary([library[library.length-1]]);
}

function drawLibrary(lib) {
	for (let l of lib) {
		const card = document.createElement("div");
		card.classList.add("book");
		card.setAttribute("data", library.length-1);
		card.addEventListener("click", toggleRead);

		const title = document.createElement("h2");
		title.textContent = l.title;

		const author = document.createElement("h3");
		author.textContent = l.author;

		const pages = document.createElement("h3");
		pages.textContent = l.pages;

		const read = document.createElement("h3");
		read.textContent = l.isread();
		read.classList.add("isread");

		if (l.read) {
			card.classList.add("read");
		}

		const del = document.createElement("div");
		const icon = document.createElement("i");
		del.classList.add("delete");
		icon.classList.add("fas");
		icon.classList.add("fa-times")
		del.appendChild(icon);
		del.addEventListener("click", removeBook);

		card.appendChild(title);
		card.appendChild(author);
		card.appendChild(pages);
		card.appendChild(read);
		card.appendChild(del);
		container.insertBefore(card, addButton)
	}
	localStorage.setItem("library", JSON.stringify(library));
}

function removeBook(e) {
	e.stopPropagation();
	library.splice(e.target.parentNode.getAttribute("data"), 1);
	localStorage.setItem("library", JSON.stringify(library));

	container.removeChild(e.target.parentNode);
}

function toggleRead(e) {
	const book = library[e.target.getAttribute("data")];
	const read = e.target.querySelector(".isread");

	e.target.classList.toggle("read");

	book.toggleread();
	read.textContent = book.isread();

	localStorage.setItem("library", JSON.stringify(library));
}

if (!localStorage.getItem("library")) {
	var library = [];
}
else {
	var library = JSON.parse(localStorage.getItem("library"));

	for (let l of library) {
		l.info = function() {
			return `${this.title} by ${this.author}, ${pages} pages, ${read ? "Read" : "Not read"}`;
		}
		
		l.isread = function() {
			return `${this.read ? "Read" : "Not read"}`
		}
		
		l.toggleread = function() {
			this.read = !this.read;
		}
	}
}

const container = document.querySelector(".container");
const addButton = document.querySelector(".add");
addButton.addEventListener("click", createForm);

drawLibrary(library);