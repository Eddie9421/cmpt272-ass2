const fileInput = document.getElementById("upload-csv");
const typeSelect = document.getElementById("type");
const genreSelect = document.getElementById("genre");
const sortSelect = document.getElementById("sort");
const catalogContainer = document.getElementById("catalog-container");
const statusMessage = document.getElementById("status-message");

let catalogItems = [];
fileInput.addEventListener("change", onFileChange);
sortSelect.addEventListener("change", onSortChange);
typeSelect.addEventListener("change", updateCatalogUi);
genreSelect.addEventListener("change", updateCatalogUi);
