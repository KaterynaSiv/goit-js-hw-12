import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import warningIcon from './img/bi_attantion.svg';
import infoIcon from './img/bi_bell.svg';

import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  displayLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const searchInput = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-btn');

let currentQuery = '';
let currentPage = 1;

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Attention!',
      message: 'Please enter a search term.',
      position: 'topRight',
      iconUrl: warningIcon,
      titleColor: '#fff',
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',
      progressBarColor: '#b51b1b',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  displayLoader(true);

  const { images, totalHits } = await fetchImages(query, currentPage);

  displayLoader(false);
  searchInput.value = '';

  if (images.length === 0) {
    loadMoreBtn.classList.add('hidden');
    return;
  }

  renderImages(images);
  if (totalHits > images.length) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
    iziToast.info({
      title: 'End of Results!',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      iconUrl: infoIcon,
      titleColor: '#fff',
      messageColor: '#fafafb',
      backgroundColor: '#6c8cff',
      progressBarColor: '#3a5fb',
      class: 'custom-toast',
    });
  }
});

loadMoreBtn.addEventListener('click', async function () {
  currentPage += 1;
  displayLoader(true);

  const { images, totalHits } = await fetchImages(currentQuery, currentPage);

  displayLoader(false);

  if (images.length === 0) {
    loadMoreBtn.classList.add('hidden');
    return;
  }

  renderImages(images);

  const totalLoaded = currentPage * 15;
  if (totalLoaded >= totalHits) {
    loadMoreBtn.classList.add('hidden');
    iziToast.info({
      title: 'End of Results!',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      iconUrl: infoIcon,
      titleColor: '#fff',
      messageColor: '#fafafb',
      backgroundColor: '#6c8cff',
      progressBarColor: '#3a5fb',
      class: 'custom-toast',
    });
  }

  smoothScroll();
});

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery_item');
  if (galleryItem) {
    const itemHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  }
}
