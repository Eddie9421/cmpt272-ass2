class CatalogItem {
  constructor(
    title,
    type,
    author,
    year,
    genre,
    rating,
    description,
    originalIndex,
  ) {
    this.title = title;
    this.type = type;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.rating = rating;
    this.description = description;
    this.originalIndex = originalIndex;
  }

  matchesProprety = function (currentProprety, expectedProprety) {
    return expectedProprety === "all"
      ? true
      : currentProprety === expectedProprety;
  };

  matchesFilter = function (type, genre) {
    return (
      this.matchesProprety(this.type, type) &&
      this.matchesProprety(this.genre, genre)
    );
  };

  addCardInformation = function (cardBody, tag, info) {
    const infoParagraph = document.createElement("p");
    infoParagraph.classList = "list-group-item";

    const tagText = document.createElement("span");
    tagText.classList = "fw-semibold";
    tagText.textContent = `${tag}: `;

    infoParagraph.append(tagText, info);

    cardBody.append(infoParagraph);
  };

  toCard = function () {
    const card = document.createElement("figure");
    card.classList = "card shadow-lg border-black";

    const title = document.createElement("h3");
    title.classList = "card-header";
    title.textContent = this.title;

    card.append(title);

    const cardBody = document.createElement("ul");
    cardBody.classList = "list-group list-group-flush";

    card.append(cardBody);

    this.addCardInformation(cardBody, "Author", this.author);
    this.addCardInformation(cardBody, "Year", this.year);
    this.addCardInformation(cardBody, "Type", this.type);
    this.addCardInformation(cardBody, "Genre", this.genre);
    this.addCardInformation(cardBody, "Rating", `${this.rating} ⭐`);

    const modal = new bootstrap.Modal("#item-modal");

    document
      .getElementById("item-header-close-button")
      .addEventListener("click", () => {
        modal.hide();
      });
    document
      .getElementById("item-footer-close-button")
      .addEventListener("click", () => {
        modal.hide();
      });

    card.addEventListener("click", () => {
      document.getElementById("item-title").textContent = this.title;
      document.getElementById("item-details").textContent = this.description;
      modal.show();
    });

    return card;
  };
}
