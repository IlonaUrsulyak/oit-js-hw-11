import Notiflix from "notiflix";
import axios from "axios";

export default class NewApiService {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }

    async fetchImages() {
    const KEY = "28459600-f1f2368280c1e052eadd529e7";
    const url = `https://pixabay.com/api/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
         return await axios.get(url).then(res=> {
             this.incrementPage();
             return res.data;
        });

    }
  
    incrementPage() {
    this.page += 1;
    }
    
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.query;
    }

    set query(newQury) {
        this.searchQuery = newQury;
    }
}
