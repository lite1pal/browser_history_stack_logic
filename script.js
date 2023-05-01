const Stack = require("./Stack.js");
const prompt = require("prompt-sync")();
// ------------------------------
// Initialization
// ------------------------------
const backPages = new Stack();
const nextPages = new Stack();
let currentPage = "Codecademy";
let finish = false;
// ------------------------------
// Helper Functions
// ------------------------------
const showCurrentPage = (action) => {
  console.log(action);
  console.log("Current page - ", currentPage);
  console.log("Back page - ", backPages.peek());
  console.log("Next page - ", nextPages.peek());
};

const newPage = (page) => {
  backPages.push(currentPage);
  currentPage = page;

  while (!nextPages.isEmpty()) {
    nextPages.pop();
  }

  showCurrentPage("NEW: ");
};

const backPage = () => {
  const nextPage = currentPage;
  currentPage = backPages.pop();
  nextPages.push(nextPage);
  showCurrentPage("BACK: ");
};

const nextPage = () => {
  const backPage = currentPage;
  if (!nextPages.isEmpty()) {
    currentPage = nextPages.pop();
  }
  backPages.push(backPage);
  showCurrentPage("NEXT: ");
};
/*
 * The following strings are used to prompt the user
 */
const baseInfo = "\nEnter a url";
const backInfo = "B|b for back page";
const nextInfo = "N|n for next page";
const quitInfo = "Q|q for quit";
const question = "Where would you like to go today? ";

showCurrentPage("DEFAULT: ");
while (!finish) {
  let showBack = false;
  let showNext = false;
  let instructions = baseInfo;
  if (!backPages.isEmpty()) {
    instructions += `, ${backInfo}`;
    showBack = true;
  }
  if (!nextPages.isEmpty()) {
    instructions += `, ${nextInfo}`;
    showNext = true;
  }
  // logs instructions
  console.log(instructions);

  // prompts the user for input
  const response = prompt();
  // quits the prompt if the user types 'q'
  if (response === "q") {
    finish = true;
  }
  switch (response) {
    case "q":
      finish = true;
      break;
    case "back":
      backPage();
      break;
    case "next":
      nextPage();
      break;
    default:
      newPage(response);
      break;
  }
}
