function Book(title, author, pages, read = false) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = function() {
		return `${this.title} by ${this.author}, ${pages} pages, ${read ? "Read" : "Not read"}`;
	}
	this.isread = function() {
		return `${read ? "Read" : "Not read"}`
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
	for (let [i, l] of lib.entries()) {
		const card = document.createElement("div");
		card.classList.add("book");
		card.setAttribute("data", i);

		const title = document.createElement("h2");
		title.textContent = l.title;

		const author = document.createElement("h3");
		author.textContent = l.author;

		const pages = document.createElement("h3");
		pages.textContent = l.pages;

		const read = document.createElement("h3");
		read.textContent = l.isread();

		card.appendChild(title);
		card.appendChild(author);
		card.appendChild(pages);
		card.appendChild(read);
		container.insertBefore(card, addButton)
	}
}

let library = [];

const container = document.querySelector(".container");
const addButton = document.querySelector(".add");
addButton.addEventListener("click", createForm); 

drawLibrary(library);