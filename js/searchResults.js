const searchResults = document.getElementById('searchResults');

export const deleteSearchResults = () => {
  let child = searchResults.lastElementChild;
  while (child) {
    searchResults.removeChild(child);
    child = searchResults.lastElementChild;
  }
};

export const buildSearchResults = (array) => {
  array.forEach((result) => {
    const resultItem = createResultItem(result);

    const resultContents = document.createElement('div');
    resultContents.classList.add('resultContent');

    if (result.img) {
      const resultImg = createResultImage(result);
      resultContents.append(resultImg);
    }

    const resultText = createResultText(result);
    resultContents.append(resultText);

    resultItem.append(resultContents);

    // Appending One item to the searchResults div
    searchResults.append(resultItem);
  });
};

const createResultItem = (result) => {
  const resultItem = document.createElement('div');
  resultItem.classList.add('resultItem');

  const resultTitle = document.createElement('div');
  resultTitle.classList.add('resultTitle');

  const link = document.createElement('a');
  link.href = `https://en.wikipedia.org/?curid=${result.id}`;
  link.textContent = result.title;
  link.target = '_blank';

  resultTitle.append(link);
  resultItem.append(resultTitle);

  return resultItem;
};

const createResultImage = (result) => {
  const image = document.createElement('img');
  image.classList.add('resultImage');
  image.src = result.img;
  image.alt = result.title;

  return image;
};

const createResultText = (result) => {
  const resultText = document.createElement('div');
  resultText.classList.add('resultText');

  const para = document.createElement('p');
  para.classList.add('resultDescription');
  para.textContent = result.text;

  resultText.append(para);

  return resultText;
};

export const clearStatsLine = () => (document.getElementById('stats').textContent = '');

export const setStatsLine = (numberOfResults) => {
  const statsLine = document.getElementById('stats');
  if (numberOfResults) {
    statsLine.textContent = `Displaying ${numberOfResults} results.`;
  } else {
    statsLine.textContent = 'sorry, no results found...';
  }
};
