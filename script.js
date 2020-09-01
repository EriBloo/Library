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

let library = [];

addBookToLibrary("Hobbit", "Tolkien", 299);

console.log(library)
