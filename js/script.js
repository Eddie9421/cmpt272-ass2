const logElementNotFound = (elementName) =>
  console.error(`${elementName} not found.`);

const fileInput =
  document.getElementById("upload-csv") || logElementNotFound("upload-csv");
const typeSelect =
  document.getElementById("type") || logElementNotFound("type");
const sortSelect =
  document.getElementById("sort") || logElementNotFound("sort");

fileInput.addEventListener("change", (event) => {
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    console.log(event.target.result);
  });
  reader.readAsText(event.target.files[0]);
});
