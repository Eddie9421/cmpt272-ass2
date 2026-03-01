const hasOption = (selectId, option) =>
  document.querySelector(`#${selectId} option[value="${option}"]`);

const addFilterOptions = () => {
  const allOption = document.createElement("option");
  allOption.text = "All";
  allOption.value = "all";

  typeSelect.innerHTML = "";
  genreSelect.innerHTML = "";
  typeSelect.options.add(allOption);

  genreSelect.options.add(allOption.cloneNode(true));

  for (const item of catalogItems) {
    const itemType = item.type;
    const itemGenre = item.genre;

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

const updateCatalogUi = () => {
  const validItems = [];
  for (const item of catalogItems) {
    if (item.matchesFilter(typeSelect.value, genreSelect.value)) {
      validItems.push(item);
    }
  }

  catalogContainer.innerHTML = "";

  catalogContainer.classList = "container";
  if (validItems.length === 0) {
    catalogContainer.classList = "py-5 text-center";
    const heading = document.createElement("h3");
    heading.textContent = "No matching items";

    const p = document.createElement("p");
    p.textContent = "Try adjusting your filter, or sort.";

    catalogContainer.append(heading, p);
  }

  const containerRow = document.createElement("div");
  containerRow.classList = "row row-cols-1 row-cols-lg-2 row-cols-xl-3";
  catalogContainer.append(containerRow);

  for (const item of validItems) {
    const containerCol = document.createElement("div");
    containerCol.classList = "col";

    containerRow.append(containerCol);
    containerCol.append(item.toCard());
  }

  const itemCountText = document.getElementById("catalog-items-count");
  itemCountText.textContent = `${validItems.length} item(s)`;
};

const onFileChange = (event) => {
  const file = event.target.files[0];

  if (file) {
    if (!file.name.endsWith(".csv")) {
      statusMessage.textContent = "Please upload only CSV files.";
      statusMessage.classList =
        "alert alert-danger border-2 border-black fs-5 text-black";
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      try {
        let lines = event.target.result.split("\n");
        lines.shift();
        lines = lines.map((line) => line.split(","));

        let index = 0;

        catalogItems = lines.map((line) => {
          const year = parseInt(line[3]);
          const rating = parseFloat(line[5]);

          if (Number.isNaN(year) || Number.isNaN(rating)) {
            throw new Error(`NaN error, year = ${year}, rating = ${rating}`);
          }

          return new CatalogItem(
            line[0].trim(),
            line[1].trim(),
            line[2].trim(),
            year,
            line[4].trim(),
            rating,
            line[6].trim(),
            index++,
          );
        });

        addFilterOptions();
        updateCatalogUi();

        sortSelect.value = "none";
        statusMessage.classList =
          "alert alert-success border-2 border-black fs-5 text-black";
        statusMessage.textContent = `Loaded ${catalogItems.length} item(s).`;
      } catch (error) {
        console.error(error);
        statusMessage.textContent =
          "Unable to parse CSV file, please check that it's correct.";
        statusMessage.classList =
          "alert alert-danger border-2 border-black fs-5 text-black";
      }
    });

    reader.readAsText(file);
  } else {
    statusMessage.textContent = "No file found.";
  }
};

const onSortChange = (event) => {
  const sortOption = event.target.value;

  switch (sortOption) {
    case "none":
      catalogItems.sort((a, b) => a.originalIndex - b.originalIndex);
      break;
    case "year-ascending":
      catalogItems.sort((a, b) => a.year - b.year);
      break;
    case "year-descending":
      catalogItems.sort((a, b) => b.year - a.year);
      break;
    case "rating-ascending":
      catalogItems.sort((a, b) => a.rating - b.rating);
      break;
    case "rating-descending":
      catalogItems.sort((a, b) => b.rating - a.rating);
      break;
    default:
      console.error("Reached default case.");
      break;
  }

  updateCatalogUi();
};
