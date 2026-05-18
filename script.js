const addNoteBtn = document.getElementById("addNoteBtn");

const noteTitle = document.getElementById("noteTitle");

const noteText = document.getElementById("noteText");

const notesGrid = document.getElementById("notesGrid");

const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");

const themeToggle = document.getElementById("themeToggle");

const dateText = document.getElementById("dateText");

/* Current Date */

const currentDate = new Date();

dateText.textContent =
  currentDate.toDateString();

/* Notes Array */

let notes =
  JSON.parse(localStorage.getItem("notes")) || [];

/* Save */

function saveNotes(){

  localStorage.setItem(
    "notes",
    JSON.stringify(notes)
  );

}

/* Render Notes */

function renderNotes(filteredNotes = notes){

  notesGrid.innerHTML = "";

  if(filteredNotes.length === 0){

    notesGrid.appendChild(emptyState);

    return;

  }

  filteredNotes.forEach((note,index) => {

    const noteCard =
      document.createElement("div");

    noteCard.className = "note-card";

    noteCard.innerHTML = `
      <h3>${note.title}</h3>

      <p>${note.text}</p>

      <div class="note-footer">

        <span>${note.date}</span>

        <button class="delete-btn">
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>
    `;

    const deleteBtn =
      noteCard.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {

      notes.splice(index,1);

      saveNotes();

      renderNotes();

    });

    notesGrid.appendChild(noteCard);

  });

}

/* Add Note */

addNoteBtn.addEventListener("click", () => {

  const title = noteTitle.value.trim();

  const text = noteText.value.trim();

  if(title === "" || text === ""){

    alert("Please write something.");

    return;

  }

  const note = {

    title,
    text,
    date:new Date().toLocaleDateString()

  };

  notes.unshift(note);

  saveNotes();

  renderNotes();

  noteTitle.value = "";

  noteText.value = "";

});

/* Search */

searchInput.addEventListener("input", () => {

  const value =
    searchInput.value.toLowerCase();

  const filtered =
    notes.filter(note =>
      note.title.toLowerCase().includes(value) ||
      note.text.toLowerCase().includes(value)
    );

  renderNotes(filtered);

});

/* Theme */

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  const icon =
    themeToggle.querySelector("i");

  if(document.body.classList.contains("dark")){

    icon.className = "fa-solid fa-moon";

  } else {

    icon.className = "fa-solid fa-sun";

  }

});

/* Init */

renderNotes();