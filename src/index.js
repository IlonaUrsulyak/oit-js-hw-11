import { fetchImages } from './js/fetchImages';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
let query = '';
let page = 1;
let simpleLightBox;
const perPage = 40;

searchForm.addEventListener('submit', onSearchForm);
loadMore.addEventListener('click', onLoadMore);



function onSearchForm(event) {
    event.preventDefault();
    page = 1;
    query = event.currentTarget.searchQuery.value.trim();
    gallery.innerHTML = '';
    loadMore.classList.add('is-hidden');

    if (query === '') {
        emptySearch();
        return;
    }

    fetchImages(query, page, perPage).then(({ data }) => {
        if (data.totalHits === 0) {
            noImagesFound();
        } else {
            gallery.insertAdjacentHTML('beforeend', makeCardImage(data.hits));
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();
            imagesFound(data);

            if (data.totalHits > perPage) {
                loadMore.classList.remove('is-hidden');
            }
        }
    })
    .catch(error => console.log(error))
    .finally(() => {
        searchForm.reset();
    });
}

function onLoadMore() {
    page += 1;
    simpleLightBox.destroy();
    fetchImages(query, page, perPage)
        .then(({ data }) => {
            gallery.insertAdjacentHTML('beforeend',makeCardImage(data.hits));
            simpleLightBox = new SimpleLightbox('.gallery a').refresh();

            if (page * 40 > data.totalHits) {
                loadMore.classList.add('is-hidden');
                endOfSearch();
            }
        })
        .catch(error => console.log(error));   
}


function emptySearch() {
    Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
}

function noImagesFound() {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function imagesFound(data) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function endOfSearch() {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
}


function makeCardImage (images) {
    return images.map (image => {
        const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
        return `
            <a class="gallery__link" href="${largeImageURL}">
                <div class="gallery-item" id="${id}">
                    <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                    <p class="info-item"><b>Likes</b>${likes}</p>
                    <p class="info-item"><b>Views</b>${views}</p>
                    <p class="info-item"><b>Comments</b>${comments}</p>
                    <p class="info-item"><b>Downloads</b>${downloads}</p>
                    </div>
                </div>
            </a>
        `;
    }).join('');
}