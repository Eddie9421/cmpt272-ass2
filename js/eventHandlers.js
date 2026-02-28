const hasOption = (selectId, option) =>
  document.querySelector(`#${selectId} option[value="${option}"]`);

const addFilterOptions = () => {
  for (const item of catalogItems) {
    const itemType = item.type.trim();
    const itemGenre = item.genre.trim();

    if (!hasOption(typeSelect.id, itemType)) {
      const typeOption = document.createElement("option");
      typeOption.text = itemType;
      typeOption.value = itemType;

      typeSelect.options.add(typeOption);
    }

    if (!hasOption(genreSelect.id, itemGenre)) {
      const genreOption = document.createElement("option");
      genreOption.text = itemGenre;
      genreOption.value = itemGenre;

      genreSelect.options.add(genreOption);
    }
  }
};

// classList of no items found message = py-5 text-center
const updateCatalogUi = () => {
  catalogContainer.innerHTML = "";
  catalogContainer.classList = "container";

  const containerRow = document.createElement("div");
  containerRow.classList = "row row-cols-1 row-cols-lg-2 row-cols-xl-3";
  catalogContainer.append(containerRow);

  for (const item of catalogItems) {
    const containerCol = document.createElement("div");
    containerCol.classList = "col";

    containerRow.append(containerCol);
    containerCol.append(item.toCard());
  }

  const itemCountText = document.getElementById("catalog-items-count");
  itemCountText.textContent = `${catalogItems.length} items`;
};

const onFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      let lines = event.target.result.split("\n");
      lines.shift();
      lines = lines.map((line) => line.split(","));

      catalogItems = lines.map((line) => {
        const year = parseInt(line[3]);
        const rating = parseFloat(line[5]);

        return new CatalogItem(
          line[0],
          line[1],
          line[2],
          year,
          line[4],
          rating,
          line[6],
        );
      });

      addFilterOptions();
      updateCatalogUi();
    });

    reader.readAsText(file);
  } else {
    console.log("No file found.");
  }
};

const onTypeChange = (event) => {};

const onGenreChange = (event) => {};

const onSortChange = (event) => {};
