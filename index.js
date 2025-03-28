/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import games from "./games.js";
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(game) {
  // loop over each item in the data
  for (let i = 0; i < game.length; i++) {
    // create a new div element, which will become the game card
    const newDiv = document.createElement("div");
    // add the class game-card to the list
    newDiv.classList.add("game-card");
    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")

    const markUp = `<div><p><img src="${game[i].img}" width=100% height=50%/></p><h2>${game[i].name}</h2><p>${game[i].description}</p><p>Pledged: ${game[i].backers}</p></div>`;
    newDiv.innerHTML = markUp;
    // append the game to the games-container
    gamesContainer.appendChild(newDiv);
  }
}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const contributionsDiv = document.createElement("div");
// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, item) => {
  return acc + item.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
const totalBackers = `${totalContributions.toLocaleString("en-US")}`;
contributionsDiv.innerHTML = totalBackers;
contributionsCard.appendChild(contributionsDiv);

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const raisedDiv = document.createElement("div");
const totalRaised = GAMES_JSON.reduce((acc, item) => {
  return acc + item.pledged;
}, 0);
// set inner HTML using template literal
const totalFunds = `$${totalRaised.toLocaleString("en-US")}`;
raisedDiv.innerHTML = totalFunds;
raisedCard.appendChild(raisedDiv);

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const gamesDiv = document.createElement("div");
const totalGames = GAMES_JSON.length;
// set inner HTML using template literal
const totalNumofGames = `${totalGames.toLocaleString("en-US")}`;
gamesDiv.innerHTML = totalNumofGames;
gamesCard.appendChild(gamesDiv);
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  let unfundedGames = GAMES_JSON.filter((item) => {
    return item.pledged < item.goal;
  });
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unfundedGames);
}
//filterUnFundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  let fundedGames = GAMES_JSON.filter((item) => {
    return item.pledged > item.goal;
  });
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(fundedGames);
}
//filterFundedOnly();
// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
  // add all games from the JSON data to the DOM
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const totalGamesUnfunded = GAMES_JSON.reduce((acc, item) => {
  return acc + (item.pledged < item.goal);
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayUnfundedString = `A total of ${totalFunds} has been raised for ${totalNumofGames} games. There are ${
  filterUnfundedOnly ? totalGamesUnfunded : "0"
} still requiring funding. Thanks for helping us fund these games!`;
// create a new DOM element containing the template string and append it to the description container
const descriptionPara = document.createElement("div");
const descriptionMarkup = `<p>${displayUnfundedString}</p>`;
descriptionPara.innerHTML = descriptionMarkup;
descriptionContainer.appendChild(descriptionPara);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
//const { name, desc, pt, goat, bkrs, img } = sortedGames[0];
const [topGame, secondGame] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameDiv = document.createElement("div");
const topGameMarkup = `<p>${topGame.name}</p>`;
topGameDiv.innerHTML = topGameMarkup;
firstGameContainer.appendChild(topGameDiv);
// do the same for the runner up item
const secondGameDiv = document.createElement("div");
const secondGameMarkup = `<p>${secondGame.name}</p>`;
secondGameDiv.innerHTML = secondGameMarkup;
secondGameContainer.appendChild(secondGameDiv);
