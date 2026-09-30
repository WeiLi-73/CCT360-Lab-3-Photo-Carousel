// The same three photographs are used in both stories.
const images = [
  {
    src: "images/backstage.avif",
    alt: "A model in a white outfit stands backstage beside staff and racks of shoes.",
    credit: "Image A · Source: Dior",
    source:
      "https://media.christiandior.com/cdn-cgi/image/width=1280,format=auto,quality=80/pm_11872_1331_1331145-ymhm3e97eb-whr.jpg"
  },
  {
    src: "images/runway.avif",
    alt: "A model wearing a grey jacket and a layered white skirt walks along a runway beneath a green framework.",
    credit: "Image B · Source: Dior",
    source:
      "https://media.christiandior.com/cdn-cgi/image/width=870,format=auto,quality=80/pm_11872_1330_1330590-x3e28ibd1w-whr.jpg"
  },
  {
    src: "images/stage.avif",
    alt: "An unoccupied white runway stretches beneath a green framework, with water and lily pads on either side.",
    credit: "Image C · Source: Dior",
    source:
      "https://media.christiandior.com/cdn-cgi/image/width=2560,format=auto,quality=80/pm_11872_1330_1330905-jwlvg3do7w-whr.jpg"
  }
];

// Each story has a different order and interpretation.
const stories = [
  {
    title: "From Preparation to Silence",
    description:
      "Preparation becomes performance, before the runway returns to stillness.",
    order: [0, 1, 2],
    titles: [
      "Before the entrance",
      "Into the spotlight",
      "What remains"
    ],
    captions: [
      "Away from the audience, the look is prepared. The performance begins before anyone steps onto the runway.",
      "The private work becomes a public image. Clothing, movement, and setting come together in one moment.",
      "Without a model on the runway, the space feels still. Placed at the end, this photograph suggests the silence after a performance."
    ]
  },
  {
    title: "Behind the Spectacle",
    description:
      "A stage becomes a spectacle, before we discover the work behind it.",
    order: [2, 1, 0],
    titles: [
      "A stage of possibility",
      "The image we see",
      "Beyond the public view"
    ],
    captions: [
      "The runway waits without a performer. Placed at the beginning, the empty space suggests anticipation.",
      "A model brings the setting to life. For a moment, the finished image holds our attention.",
      "The final photograph takes us backstage. Staff, preparation, and practical details reveal the work behind the polished performance."
    ]
  }
];

const chapters = ["BEGINNING", "MIDDLE", "END"];

// Variables remember which story and photograph are selected.
let currentStory = 0;
let currentSlide = 0;

// Find the HTML elements that JavaScript will update.
const storyLabel = document.querySelector("#story-label");
const storyTitle = document.querySelector("#story-title");
const storyDescription = document.querySelector("#story-description");

const storyImage = document.querySelector("#story-image");
const imageCredit = document.querySelector("#image-credit");
const imageSource = document.querySelector("#image-source");

const chapter = document.querySelector("#chapter");
const slideTitle = document.querySelector("#slide-title");
const slideCaption = document.querySelector("#slide-caption");
const slideCounter = document.querySelector("#slide-counter");
const endMessage = document.querySelector("#end-message");

const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");

const storyButtons = [
  document.querySelector("#story-one"),
  document.querySelector("#story-two")
];

// Update the image, text, references, and button states.
function renderStory() {
  const story = stories[currentStory];
  const imageIndex = story.order[currentSlide];
  const image = images[imageIndex];

  storyLabel.textContent = "STORY 0" + (currentStory + 1);
  storyTitle.textContent = story.title;
  storyDescription.textContent = story.description;

  storyImage.src = image.src;
  storyImage.alt = image.alt;
  imageCredit.textContent = image.credit;
  imageSource.href = image.source;

  chapter.textContent =
    chapters[currentSlide] + " · " + (currentSlide + 1) + " / 3";

  slideTitle.textContent = story.titles[currentSlide];
  slideCaption.textContent = story.captions[currentSlide];
  slideCounter.textContent = (currentSlide + 1) + " / 3";

  previousButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === story.order.length - 1;
  endMessage.hidden = currentSlide !== story.order.length - 1;

  for (let index = 0; index < storyButtons.length; index++) {
    const isSelected = index === currentStory;

    storyButtons[index].classList.toggle("active", isSelected);
    storyButtons[index].setAttribute(
      "aria-pressed",
      String(isSelected)
    );
  }
}

// Changing the story starts its sequence at the beginning.
function selectStory(storyIndex) {
  currentStory = storyIndex;
  currentSlide = 0;
  renderStory();
}

// Move only when the requested slide exists.
function moveSlide(direction) {
  const newSlide = currentSlide + direction;
  const totalSlides = stories[currentStory].order.length;

  if (newSlide >= 0 && newSlide < totalSlides) {
    currentSlide = newSlide;
    renderStory();
  }
}

// Event listeners connect user actions to functions.
storyButtons[0].addEventListener("click", function () {
  selectStory(0);
});

storyButtons[1].addEventListener("click", function () {
  selectStory(1);
});

previousButton.addEventListener("click", function () {
  moveSlide(-1);
});

nextButton.addEventListener("click", function () {
  moveSlide(1);
});

// Display the first story when the page loads.
renderStory();