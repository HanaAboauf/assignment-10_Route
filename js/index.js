tableBody = document.getElementById("tbody");

var bookList = [];

if (localStorage.getItem("Book") !== null) {
    bookList = JSON.parse(localStorage.getItem("Book"));
    displayBooks();
}

function addBook() {
    var bookMarkName = document.getElementById("bookmarkName").value.trim();
    var bookMarkUrl = document.getElementById("bookmarkURL").value.trim();

    if (bookMarkName === "" || bookMarkUrl === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill out both fields before submitting.',
        });
        return;
    }

    if (!isValidURL(bookMarkUrl)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid URL',
            html: 'Please enter a valid URL (e.g., <b>https://www.example.com</b>)',
        });
        return;
    }

    var book = {
        bookName: bookMarkName,
        bookUrl: bookMarkUrl
    };

    bookList.push(book);
    localStorage.setItem("Book", JSON.stringify(bookList));
    displayBooks();
    clearForm();
}

function displayBooks() {
    var box = "";
    for (var i = 0; i < bookList.length; ++i) {
        box += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${bookList[i].bookName}</td>
            <td><button type="button" onclick="visitBook(${i})" class="btn btn-visite"><i class="fa-solid fa-eye"></i> Visit</button></td>
            <td><button type="button" onclick="deleteBook(${i})" class="btn btn-delete"><i class="fa-solid fa-trash"></i> Delete</button></td>
        </tr>`;
    }
    tableBody.innerHTML = box;
}

function clearForm() {
    document.getElementById("bookmarkName").value = "";
    document.getElementById("bookmarkURL").value = "";
}

function deleteBook(index) {
    bookList.splice(index, 1);
    localStorage.setItem("Book", JSON.stringify(bookList));
    displayBooks();
}

function visitBook(index) {
    var url = bookList[index].bookUrl;

    if (!url.startsWith("http")) {
        url = "https://" + url;
    }
    window.open(url, "_blank");
}

function isValidURL(url) {
    var rejex = /^(https?:\/\/)?((([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,})|localhost)(\:[0-9]{1,5})?(\/.*)?$/i;
    return rejex.test(url);
}
