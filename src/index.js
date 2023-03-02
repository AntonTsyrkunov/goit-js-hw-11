import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getRequestedImgs } from "./api/api";
import { createCardMarkup } from "./markup/markup";
import {gallery} from "./markup/markup" 


const form = document.querySelector('.search-form');

const loadBtn = document.querySelector('.load-more');
const simpleLightBox = new SimpleLightbox('.gallery a');

let searchQuery = '';
let page;
loadBtn.classList.add('is-hidden');

form.addEventListener('submit', handleSubmit); 
loadBtn.addEventListener('click', loadMoreImgs)

async function handleSubmit (evt) {

  evt.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  searchQuery = evt.currentTarget.searchQuery.value.trim();
  if (searchQuery === ``) {
    return Notify.warning(`Please enter the text request`);
  }
  const response = await getRequestedImgs (searchQuery, page);
  const data = response.hits;
  if (data.length === 0) {
    return Notify.warning(`Sorry, there are no images matching your search query. Please try again.`);
  } else {
    createCardMarkup(data);
    simpleLightBox.refresh();
  }
  loadBtn.classList.remove('is-hidden');
 };

async function loadMoreImgs () {
  page+=1;
  loadBtn.classList.add('is-hidden');
  const response = await getRequestedImgs( searchQuery, page);
  const data = response.hits;
  createCardMarkup(data);
  simpleLightBox.refresh();
  if (Math.ceil(response.totalHits/40) === page) {
    Notify.info("We're sorry, but you've reached the end of search results.");
  } else {
    loadBtn.classList.remove('is-hidden');    
  }  
}



