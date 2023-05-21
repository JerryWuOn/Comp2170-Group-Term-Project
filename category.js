import { categoryImages } from "./config.js";

const categoryItems = document.querySelector(".categories");
let dataCategories;

function questionsLoad(dataCategories) {
  dataCategories.forEach((category) => {
    const { id, name } = category;

    const categoryElement = document.createElement("section");

    const imageElement = document.createElement("img");
    imageElement.classList.add("category_picture");
    imageElement.src = `images/${categoryImages[id]}`;

    const bannerElement = document.createElement("div");
    bannerElement.classList.add("banner");

    const linkElement = document.createElement("a");
    linkElement.classList.add("title");
    linkElement.href = `question.html?category=${id}`;
    linkElement.textContent = name;

    bannerElement.appendChild(linkElement);
    categoryElement.appendChild(imageElement);
    categoryElement.appendChild(bannerElement);
    categoryItems.appendChild(categoryElement);
  });
}

window.onload = () => {
  fetch("https://opentdb.com/api_category.php")
    .then((response) => response.json())
    .then((data) => {
      dataCategories = data.trivia_categories;
      questionsLoad(dataCategories);
    })
    .catch((error) => {
      console.log(error);
    });
};
