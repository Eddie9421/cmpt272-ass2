const fileInput = document.getElementById("upload-csv");
const typeSelect = document.getElementById("type");
const genreSelect = document.getElementById("genre");
const sortSelect = document.getElementById("sort");
const catalogContainer = document.getElementById("catalog-container");

let catalogItems = [];

fileInput.addEventListener("change", onFileChange);
