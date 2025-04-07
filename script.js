const addNoteBtn = document.getElementById("addNote");// Selecting the button by its ID
const noteInput = document.getElementById("noteInput"); // Selecting the input field by its ID
const notesContainer = document.getElementById("notesContainer"); // Selecting the container where notes will be displayed

window.addEventListener("DOMContentLoaded", showSavedNotes); // Load saved notes on page load


// Event listener for the button to add a new note
// When the button is clicked, it checks if the input field is not empty, creates a new note element, and saves it to local storage
addNoteBtn.addEventListener("click", () => {
  const noteText = noteInput.value.trim(); // Get the trimmed value of the input field
  if (noteText === "") return;// If the input is empty, do nothing

  createNoteElement(noteText);// Create a new note element and add it to the container
  saveNoteToLocalStorage(noteText);// Save the note to local storage
 
  noteInput.value = "";// Clear the input field after adding the note
});

// Event listener for the input field to add a new note when the Enter key is pressed
// When the Enter key is pressed, it checks if the input field is not empty, creates a new note element, and saves it to local storage
function createNoteElement(noteText) {
  const note = document.createElement("div");/// Create a new div element for the note
  note.classList.add("note");/// Add a class to the note div for styling

//
  const textDiv = document.createElement("div");// Create a div element for the note text
  textDiv.classList.add("note-text");/// Add a class to the text div for styling
  textDiv.textContent = noteText;// Set the text content of the text div to the note text

  // Create a button for deleting the note
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✕";// Set the button text to an X symbol

  // Add an event listener to the delete button to remove the note when clicked
  deleteBtn.addEventListener("click", () => {
    notesContainer.removeChild(note);
    deleteFromLocalStorage(noteText);
  });

  // Append the text div and delete button to the note div
  note.appendChild(textDiv);
  note.appendChild(deleteBtn);
  notesContainer.appendChild(note);//
}

 // Function to save a note to local storage
function saveNoteToLocalStorage(noteText) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];// Get existing notes from local storage or initialize an empty array
  notes.push(noteText);// Add the new note to the notes array
  localStorage.setItem("notes", JSON.stringify(notes));// Save the updated notes array to local storage
}

// Function to delete a note from local storage
function deleteFromLocalStorage(noteText) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.filter(note => note !== noteText);// Filter out the note to be deleted
  localStorage.setItem("notes", JSON.stringify(notes));// Save the updated notes array to local storage
}

// Function to show saved notes on page load
// It retrieves the notes from local storage and creates note elements for each one
function showSavedNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(noteText => createNoteElement(noteText));
}
