const API_KEY = "633256b667014be6b48a1bf2f01f5450";
const url = "https://newsapi.org/v2/"

window.addEventListener('load', () => fetchNews("armenia"))

async function fetchNews(query) {
    const res = await fetch(`${url}everything?q=${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    bindData(data.articles)
}


function bindData(articles) {
    window.scrollTo(0, 0);
    const cardsContainer = document.querySelector('.cards-container')
    const newsCardTemplate = document.getElementById('news-card-template')

    cardsContainer.innerHTML = ''

    articles.forEach(article => {
        if(!article.urlToImage) return
        const cardClone = newsCardTemplate.content.cloneNode(true)
        fillCardData(cardClone, article)
        cardsContainer.appendChild(cardClone)
    });
}

function fillCardData(card, article) {
    const newsImage = card.querySelector('#news-img')
    const newsTitle = card.querySelector('.news-title')
    const newsSource = card.querySelector('.news-source')
    const newsParagraph = card.querySelector('.news-paragraph')

    const date = new Date(article.publishedAt).toLocaleDateString();

    newsImage.src = article.urlToImage
    newsTitle.innerHTML = article.title
    newsSource.innerHTML = `${article.source.name} - ${date}`
    newsParagraph.innerHTML = article.description

    card.firstElementChild.addEventListener('click', () => {
        window.open(article.url, '_blank')
    })
}

const searchBtn = document.querySelector('.search-button')
const searchInput = document.querySelector('.search-input')
const searchResult = document.getElementById('search-result')
let currentNavItem = null


searchBtn.addEventListener('click', () => {
    const searchQuery = searchInput.value
    searchInput.value = ''
    if (!searchQuery) return
    document.querySelector('#armenia').classList.remove('active')
    if(currentNavItem) currentNavItem.classList.remove('active')

    searchResult.innerHTML = `Showing results for '${searchQuery}' ...`
    fetchNews(searchQuery)
})


function toggleNavItem(query) {
    searchResult.innerHTML = ""
    fetchNews(query)
    document.querySelector('#armenia').classList.remove('active')
    if(currentNavItem) currentNavItem.classList.remove('active')
    currentNavItem = document.getElementById(query)
    currentNavItem.classList.add('active')
}


// Navbar menu icon toggle
let menuIcn = document.querySelector('#menu-icon')
let navlinks = document.querySelector('.nav-links')
menuIcn.addEventListener('click', () => {
    navlinks.classList.toggle('active')
})