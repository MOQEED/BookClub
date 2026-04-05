let books = [];

function toggleDark() {
    document.body.classList.toggle("dark");
    let mode = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", mode);
}
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

function createClub() {
    let name = document.getElementById("clubName").value;
    alert("Club Created: " + name);
}

function joinClub() {
    let link = document.getElementById("invite").value;
    alert("Joined using link: " + link);
}
async function loadBooks() {
    let loading = document.getElementById("loadingText");
    if (loading) {
        loading.style.display = "block";
    }
    try {
        let url = "https://api.allorigins.win/raw?url=https://www.freetestapi.com/api/v1/books";
        let res = await fetch(url);
        let data = await res.json();
        console.log("Full API Response:", data);
        if (Array.isArray(data)) {
            books = data;
        } else if (data && Array.isArray(data.data)) {
            books = data.data;
        } else {
            books = [];
        }
        displayBooks();
    } catch (error) {
        console.log("Error fetching books:", error);
        books = [];
    }
    if (loading) {
        loading.style.display = "none";
    }
}

function displayBooks() {
    let list = document.getElementById("bookList");
    list.innerHTML = "";
    if (!books || books.length === 0) {
        list.innerHTML = "<p>Loading Books...</p>";
        return;
    }
    for (let i = 0; i < books.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = `
            <b>${books[i].title}</b> - ${books[i].author}
            <p>${books[i].description}</p>
        `;
        div.onclick = function() {
            selectBook(books[i].id);
        };
        list.appendChild(div);
    }
}

function selectBook(id) {
    let book = books.find(function(b) {
        return b.id === Number(id);
    });
    showDetails(book);
}

function showDetails(book) {
    let details = document.getElementById("bookDetails");
    details.innerHTML = `
        <h3>${book.title}</h3>
        <p><b>Author:</b> ${book.author}</p>
        <p>${book.description}</p>
    `;
}

function shuffleBooks() {
    if (!Array.isArray(books)) {
        alert("Books not loaded yet!");
        return;
    }
    books.sort(function() {
        return Math.random() - 0.5;
    });
    displayBooks();
}

function logProgress() {
    let pages = document.getElementById("pages").value;
    let date = document.getElementById("date").value;
    let output = document.getElementById("progressOutput");
    output.innerText = `You read ${pages} pages. Finish by: ${date}`;
    alert("Progress Logged Successfully!");
}

function scheduleDiscussion() {
    let date = document.getElementById("discussionDate").value;
    if (date === "") {
        alert("Please select date!");
        return;
    }
    let output = document.getElementById("discussionOutput");
    output.innerText = `Discussion scheduled on ${date}`;
    alert("Discussion Scheduled Successfully!");
}

function sendMessage() {
    let input = document.getElementById("chatInput");
    let chat = document.getElementById("chatBox");
    if (input.value === "") return;
    let msg = document.createElement("p");
    msg.innerText = input.value;
    chat.appendChild(msg);
    input.value = "";
}

function exampleScope() {
    let localVar = "I am a local variable";
    console.log(localVar);
}
exampleScope();
loadBooks();
