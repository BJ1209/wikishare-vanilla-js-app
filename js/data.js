export const getSearchTerm = () => {
  const rawSearchTerm = search.value.trim();
  // regular expression searchs for 2 spaces
  const regex = /[ ]{2, }/gi;
  // replacing the 2 or more space with a single space
  const searchTerm = rawSearchTerm.replaceAll(regex, ' ');

  return searchTerm;
};

export const retrieveSearchResults = async (searchTerm) => {
  const wikiSearchString = getwikiSearchString(searchTerm);

  const wikiSearchResults = await requestData(wikiSearchString);

  let resultArray = [];

  if (wikiSearchResults.hasOwnProperty('query')) {
    resultArray = processResults(wikiSearchResults.query.pages);
  }
  return resultArray;
};

const getwikiSearchString = (searchTerm) => {
  const maxChars = getMaxChars();

  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;

  // Encoding the special characters
  const searchString = encodeURI(rawSearchString);
  return searchString;
};

const getMaxChars = () => {
  const width = window.innerWidth || document.body.clientWidth;

  let maxChars;
  if (width < 425) maxChars = 65;
  if (width >= 425 && width < 1200) maxChars = 100;
  if (width > 1200) maxChars = 130;

  return maxChars;
};

const requestData = async (searchString) => {
  try {
    const response = await fetch(searchString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const processResults = (results) => {
  const resultArray = [];

  Object.keys(results).forEach((key) => {
    const id = key;
    const title = results[key].title;
    const text = results[key].extract;
    const img = results[key]?.thumbnail?.source;

    const item = {
      id: id,
      title,
      text,
      img,
    };

    resultArray.push(item);
  });
  console.log(resultArray);
  return resultArray;
};
