import axios from "axios";
export { fetchImages };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '28459600-f1f2368280c1e052eadd529e7';

async function fetchImages(query, page, perPage) {
    const response = await axios.get(
        `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    return response;
}