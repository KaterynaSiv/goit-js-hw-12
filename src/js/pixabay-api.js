import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/bi_error.svg';

const API_KEY = '49402125-a1d49ef049172818d68ba12b9';
const BASE_URL = 'https://pixabay.com/api/';

let currentPage = 1;
let currentQuery = '';

export async function fetchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15, // Fetch 15 images per page
      },
    });

    if (response.data.hits.length === 0) {
      iziToast.error({
        title: 'Oopps!',
        message: 'Sorry, no images match your search query. Please try again!',
        position: 'topRight',
        iconUrl: errorIcon,
        titleColor: '#fff',
        messageColor: '#fafafb',
        backgroundColor: '#ef4040',
        progressBarColor: '#b51b1b',
        class: 'custom-toast',
      });
      return { images: [], totalHits: 0 }; // Return empty results
    }

    return { images: response.data.hits, totalHits: response.data.totalHits };
  } catch (error) {
    iziToast.error({
      title: 'Oopps!',
      message: 'There was an error fetching images. Please try again later.',
      position: 'topRight',
      iconUrl: errorIcon,
      titleColor: '#fff',
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',
      progressBarColor: '#b51b1b',
      class: 'custom-toast',
    });
    console.error('Error:', error);
    return { images: [], totalHits: 0 };
  }
}
