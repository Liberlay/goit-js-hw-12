import { fetchImages } from './js/pixabay-api'
import { renderGallery, clearGallery } from './js/render-functions'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const form = document.querySelector('.search-form')
const loader = document.querySelector('.loader')
const loadMore = document.querySelector('.load-more')

let currentPage = 1
let currentQuery = ''
const perPage = 15

form.addEventListener('submit', onSearch)
loadMore.addEventListener('click', onLoadMore)

async function onSearch(e) {
  e.preventDefault()
  const query = form.elements.search.value.trim()

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Search query cannot be empty!',
      position: 'topRight',
    })
    return
  }

  currentQuery = query
  currentPage = 1
  clearGallery()
  toggleLoader(true)
  toggleLoadMore(false)

  try {
    const { data } = await fetchImages(currentQuery, currentPage, perPage)

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      })
      return
    } else if (currentPage * perPage >= data.totalHits) {
      toggleLoadMore(false)
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      })
    } else toggleLoadMore(true)
    renderGallery(data.hits)
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    })
  } finally {
    toggleLoader(false)
  }
}

async function onLoadMore() {
  currentPage += 1

  toggleLoadMore(false)
  toggleLoader(true)
  try {
    const { data } = await fetchImages(currentQuery, currentPage, perPage)

    if (currentPage * perPage >= data.totalHits) {
      toggleLoadMore(false)
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      })
    } else toggleLoadMore(true)
    renderGallery(data.hits)
    smoothScroll()
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `Something went wrong: ${error.message}`,
      position: 'topRight',
    })
  } finally {
    toggleLoader(false)
  }
}

const smoothScroll = () => {
  const galleryCard = document.querySelector('.photo-card')
  if (galleryCard) {
    window.scrollBy({
      top: galleryCard.getBoundingClientRect().height * 2,
      behavior: 'smooth',
    })
  }
}

const toggleLoader = (isLoading) => (loader.style.display = isLoading ? 'block' : 'none')

const toggleLoadMore = (isDisplaying) => (loadMore.style.display = isDisplaying ? 'block' : 'none')
