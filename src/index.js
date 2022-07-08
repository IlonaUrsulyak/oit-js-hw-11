import axios from "axios";
import { Notify } from "notiflix";
import NewApiService from "./js/newService";
import { makeCardImage } from "./js/makeCard";

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    scroll: document.querySelector('.scroll-guard'),
    buttonLoad: document.querySelector('.button_load'),
}


refs.searchForm.addEventListener('submit', onSubmitClick);
refs.buttonLoad.addEventListener('click', onLoadMore);

const newApiService = new NewApiService();

function onSubmitClick(event) {
    event.preventDefault();

    clearImage();
    newApiService.query = event.currentTarget.elements.searchQuery.value.trim();
    newApiService.resetPage();
    newApiService.fetchImages().then(appendImages);
}

function onLoadMore(event) {
    newApiService.fetchImages().then(appendImages);
}

function appendImages(data) {
    refs.gallery.insertAdjacentHTML('beforeend', makeCardImage(data));
}

function clearImage() {
    refs.gallery.innerHTML = "";
}