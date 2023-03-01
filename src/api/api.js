import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const key = '34037944-d6bb87efc1ed15d6df0134f1f';

export async function getRequestedImgs (searchQuery, page) {

    const response = await axios.get(`?key=${key}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    return response.data;

};