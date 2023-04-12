"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navAddStories(evt) {
  console.debug("navAddStories", evt);
  hidePageComponents();
  $storyForm.show();
}

$navStory.on("click", navAddStories);

function navFavorites(evt) {
  console.debug("navFavorites", evt);
  hidePageComponents();
  $favoritesForm.show();
  $favoritesList.show();
  putStoriesOnFavoritesPage()
}

$navFavorites.on("click", navFavorites);