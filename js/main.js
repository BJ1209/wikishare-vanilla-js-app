import { getSearchTerm, retrieveSearchResults } from './data.js';
import {
  clearKeyListener,
  clearSearchText,
  setSearchFocus,
  showClearTextButton,
} from './searchBar.js';
import {
  deleteSearchResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine,
} from './searchResults.js';

const form = document.getElementById('searchBar');
const search = document.getElementById('search');
const clear = document.getElementById('clear');

document.addEventListener('readystatechange', (e) => {
  if (e.target.readyState === 'complete') {
    initApp();
  }
});

const initApp = () => {
  // set the focus
  setSearchFocus();

  // the function fires when the value of input is changed
  search.addEventListener('input', showClearTextButton);

  clear.addEventListener('click', clearSearchText);

  clear.addEventListener('keydown', clearKeyListener);

  form.addEventListener('submit', submitHandler);
};

const submitHandler = (e) => {
  e.preventDefault();

  // deleting all the previous results
  deleteSearchResults();

  // Proccess the search
  processTheSearch();
};

const processTheSearch = async () => {
  clearStatsLine();

  const searchTerm = getSearchTerm();

  if (!searchTerm) return;
  const resultsArray = await retrieveSearchResults(searchTerm);

  if (resultsArray.length) buildSearchResults(resultsArray);

  setStatsLine(resultsArray.length);
};
