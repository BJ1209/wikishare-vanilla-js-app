const search = document.getElementById('search');
const clear = document.getElementById('clear');

export const setSearchFocus = () => {
  search.focus();
};

export const showClearTextButton = () => {
  if (search.value.length) {
    clear.classList.remove('none');
    clear.classList.add('flex');
  } else {
    clear.classList.remove('flex');
    clear.classList.add('none');
  }
};

export const clearSearchText = (e) => {
  e.preventDefault();
  search.value = '';
  clear.classList.add('none');
  clear.classList.remove('flex');
  setSearchFocus();
};

export const clearKeyListener = (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    clear.click();
  }
};
