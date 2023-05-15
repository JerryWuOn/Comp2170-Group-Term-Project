import { categoryImages } from "./config.js";
// Variables & DOM Elements

const categoryItems = document.querySelector(".categories");
let dataCategories;

// Functions

function questionsLoad(dataCategories) {
  dataCategories.forEach((category) => {
    let getID = category.id;
    let getName = category.name;

    let categoryElement = document.createElement("section");
    categoryElement.innerHTML = `<img class="category_picture" src="images/${categoryImages[getID]}"/> `;
    let newElement = document.createElement("div");
    newElement.className = "banner";
    let NewLinkTag = document.createElement("a");
    NewLinkTag.setAttribute("href", "question.html");
    NewLinkTag.innerHTML = getName
    categoryElement.appendChild(newElement);
    newElement.append(NewLinkTag);
    categoryItems.appendChild(categoryElement);

    //   <section class="categories_section">
    //   <img class="category_picture" src="images/anime.jpg" />
    //   <div class="banner">
    //     <a class="anime-banner" class="title" href="question.html"
    //       >Japanese Anime & Manga</a
    //     >
    //   </div>
    // </section>
  });
}

// Event Listeners

window.onload = () => {
  // fetch our data
  fetch("https://opentdb.com/api_category.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // {trivia_categories}
      data.trivia_categories;
      dataCategories = data.trivia_categories;
      questionsLoad(dataCategories);
    })
    .catch((error) => {
      console.log(error);
    });
};
