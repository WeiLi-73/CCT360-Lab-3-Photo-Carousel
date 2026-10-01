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
      "A story of preparation, public attention, and the quiet space that remains.",
    order: [0, 1, 2],

    titles: [
      "Before anyone sees",
      "A moment of visibility",
      "After the image fades"
    ],

    captions: [
      "A model stands among shoe racks and working hands. Here, the runway exists only as a destination beyond the photograph. Clothes are adjusted, details are checked, and a public image takes shape in a private space. The audience has not seen it yet, but the work of being seen has already begun.",

      "On the white runway, preparation becomes performance. The green framework directs our gaze toward the moving figure, while the clothes catch the daylight. What appeared backstage as separate tasks now reads as one composed image. For this brief moment, the finished look occupies the centre of attention, and the work behind it slips from view.",

      "The figure disappears from our sequence, but the runway remains. Water reflects the framework, and the white path continues toward the distance. Nothing in the space explains how much preparation brought the performance into being. After the intensity of being seen, this final image offers stillness: the stage outlasts the moment that gave it life."
    ]
  },
  {
    title: "Behind the Spectacle",
    description:
      "A story that moves from an inviting stage to the work hidden behind its polished image.",
    order: [2, 1, 0],

    titles: [
      "An invitation to look",
      "The finished illusion",
      "Where the image begins"
    ],

    captions: [
      "A white path stretches across the water, framed by green lines and reflected light. With no performer in view, the setting invites us to imagine an arrival. It appears calm, complete, and ready. Beginning here makes the runway a promise: something is about to enter this carefully arranged world and give it a centre.",

      "The promise takes a visible form. A model occupies the path, and clothing transforms the architectural setting into a fashion image. Our attention settles on the finished appearance. The frame offers movement and elegance, but little evidence of preparation. At this point in the story, the spectacle seems to contain everything we need to see.",

      "Then the sequence takes us behind the public image. Shoe racks, staff, and practical adjustments replace the clean lines of the runway. What seemed effortless now belongs to a larger process. Ending backstage changes the photograph before it: we return to that polished appearance knowing that its apparent simplicity depends on work beyond the audience's view."
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

// Switch to the other story when the button is clicked.
const switchStoryButton = document.querySelector("#switch-story");

switchStoryButton.addEventListener("click", function () {
  const otherStory = currentStory === 0 ? 1 : 0;
  selectStory(otherStory);
});

// Display the first story when the page loads.
renderStory();