import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
          <li class="gallery_item">
            <a href="${largeImageURL}" class="gallery_link">
              <img src="${webformatURL}" alt="${tags}" class="gallery_image" />
            </a>
            <div class="gallery_info">
              <div class="gallery_stats">
                <p class="gallery_likes">Likes: <span class="gallery_likes_value">${likes}</span></p>
                <p class="gallery_views">Views: <span class="gallery_views_value">${views}</span></p>
                <p class="gallery_comments">Comments: <span class="gallery_comments_value">${comments}</span></p>
                <p class="gallery_downloads">Downloads: <span class="gallery_downloads_value">${downloads}</span></p>
              </div>
            </div>
          </li>
        `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  lightbox.refresh();
}

export function displayLoader(isLoading) {
  const loader = document.querySelector('.loader');
  loader.style.display = isLoading ? 'inline-block' : 'none';
}
