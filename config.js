const categoryImages = {
  "9": "pic1.jpeg",
  "10": "pic2.jpeg",
  "11": "pic3.jpeg",
  "12": "/music.jpg",
  "13": "pic4.jpeg",
  "14": "pic5.jpeg",
  "15": "pic6.jpeg",
  "16": "pic7.jpeg",
  "17": "Natural-science.jpg",
  "18": "computer-funny.gif",
  "19": "22JumpStreet.gif",
  "20": "mythology.webp",
  "21": "sports.webp",
  "22": "geography.jpg",
  "23": "history.jpg",
  "24": "politics.jpg",
  "25": "art.jpg",
  "26": "celebrities.avif",
  "27": "animals.avif",
  "28": "cars.jpg",
  "29": "Comics.jpg",
  "30": "gadgets.jpg",
  "31": "anime.jpg",
  "32": "cartoons.jpg",
};

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
    linkElement.href = "question.html";
    linkElement.textContent = name;

    bannerElement.appendChild(linkElement);
    categoryElement.appendChild(imageElement);
    categoryElement.appendChild(bannerElement);
    categoryItems.appendChild(categoryElement);

    // Add a click event listener to the link element
    linkElement.addEventListener("click", () => {
      // Store the selected category ID and corresponding image URL in localStorage
      localStorage.setItem("selectedCategoryId", id);
      localStorage.setItem("selectedCategoryImage", categoryImages[id]);
    });
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
export{categoryImages}