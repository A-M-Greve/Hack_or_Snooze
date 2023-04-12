"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

//Define favoriteStories array
// let favoriteStories = [];
// let $favoriteStory = null;
// console.log($favoriteStory);

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}


/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const $story = $(`
      <li id="${story.storyId}">
      <i class="fa-regular fa-heart" style="color: #dd2626;"></i>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);

    const $heartIcon = $story.find('.fa-heart');
    $heartIcon.on('click', function() {
      addToFavorites(story);
      $heartIcon.toggleClass('fa-regular fa-solid');
    });

    return $story;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function addNewStoryToPage(evt) {
    console.debug("addStory", evt);

    evt.preventDefault();

    const createAuthor = $("#create-author").val();
    const createTitle = $("#create-title").val();
    const createUrl = $("#create-url").val();


    const response = await StoryList.addStory(createAuthor, createTitle, createUrl)

};

$storyForm.on("submit", addNewStoryToPage);


async function getAndShowFavoriteStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnFavoritesPage();
}



const clickedStories = [];
   
 function addToFavorites(story) {
  console.log("addToFavorites called");
    const hostName = story.getHostName();
    const $story = $(`
    <li id="${story.storyId}">
    <i class="fa-regular fa-heart" style="color: #dd2626;"></i>
      <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
      </a>
      <small class="story-hostname">(${hostName})</small>
      <small class="story-author">by ${story.author}</small>
      <small class="story-user">posted by ${story.username}</small>
    </li>
  `);

  const $heartIcon = $story.find('.fa-heart');
  $heartIcon.on('click', function() {
    if (!clickedStories.includes(story)) {
      clickedStories.push(story);
    }
    $heartIcon.toggleClass('fa-regular fa-solid');
  })
    return $story;
}

function putStoriesOnFavoritesPage() {
  console.debug("putStoriesOnFavoritesPage");

console.log(clickedStories)

  $favoritesList.empty();

  for (let story of clickedStories) {
    const $story = addToFavorites(story);
    console.log($story);
    $favoritesList.append($story);
  }

    $favoritesList.show();
}

//console.log(clickedStories);