const accessKey = "eCZsym-BOgEdhEIaDpDE9dZ-XtydmSL6sw0F5KbUAHA"; //api accesskey
//query selector and id selector
const fromEl = document.querySelector("form");
const inputEl = document.getElementById("scarch-input");
const scarchResult = document.querySelector(".scarch-results");
const showMore = document.querySelector(".show-more-btn");
//let var
let inputData = ""; //scarch data
let page = 1; //for adding pages

//function

async function scarchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  if (page === 1) {
    scarchResult.innerHTML = "";
  }
  //targeting the inner html \ mapping and pushing the data
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("scarch-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    const downloadButton = document.createElement("a");
    downloadButton.href = result.urls.regular;
    downloadButton.download = result.alt_description;
    downloadButton.textContent = "Download";

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    imageWrapper.appendChild(downloadButton);
    scarchResult.appendChild(imageWrapper);
  });
  page++;
  if (page > 1) {
    showMore.style.display = "block";
  }
}

fromEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  scarchImages();
});
showMore.addEventListener("click", () => {
  scarchImages();
});
