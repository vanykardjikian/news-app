const API_KEY = "gJY8ngGxHYmHmclHvvIEBkoxsEYs7WwM";
const CATEGORY_URL = "https://api.nytimes.com/svc/topstories/v2/"
const SEARCH_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="

window.addEventListener('load', () => fetchNewsByCategory('home'))

async function fetchNewsByQuery(query) {
    res = await fetch(`${SEARCH_URL}${query}&api-key=${API_KEY}`)
    const data = await res.json()
    // If from search => 1, category => 0
    bindData(data.response.docs, 'search')
}

async function fetchNewsByCategory(category) {
    res = await fetch(`${CATEGORY_URL}${category}.json?api-key=${API_KEY}`)
    const data = await res.json()
    bindData(data.results, 'cat')
}


function bindData(articles, flag) {
    window.scrollTo(0, 0);
    const cardsContainer = document.querySelector('.cards-container')
    const newsCardTemplate = document.getElementById('news-card-template')

    cardsContainer.innerHTML = ''

    articles.forEach(article => {
        if(!article.abstract) return
        const cardClone = newsCardTemplate.content.cloneNode(true)
        fillCardData(cardClone, article, flag)
        cardsContainer.appendChild(cardClone)
    });
}

function fillCardData(card, article, flag) {
    const newsImage = card.querySelector('#news-img')
    const newsTitle = card.querySelector('.news-title')
    const newsSource = card.querySelector('.news-source')
    const newsParagraph = card.querySelector('.news-paragraph')
    
    if (flag === 'search') {
        const date = new Date(article.pub_date).toLocaleDateString();
        newsImage.src = `https://static01.nyt.com/${article.multimedia[0].url}`
        newsTitle.innerHTML = article.headline.main
        newsSource.innerHTML = `${article.section_name} - ${date}`
        newsParagraph.innerHTML = article.abstract

        card.firstElementChild.addEventListener('click', () => {
            window.open(article.web_url, '_blank')
        })
    } else {
        const date = new Date(article.published_date).toLocaleDateString();
        newsImage.src = article.multimedia[0].url
        newsTitle.innerHTML = article.title
        newsSource.innerHTML = `${article.section} - ${date}`
        newsParagraph.innerHTML = article.abstract

        card.firstElementChild.addEventListener('click', () => {
            window.open(article.url, '_blank')
        })
    }

}

const searchBtn = document.querySelector('.search-button')
const searchInput = document.querySelector('.search-input')
const searchResult = document.getElementById('search-result')
let currentNavItem = null


searchBtn.addEventListener('click', () => {
    const searchQuery = searchInput.value
    searchInput.value = ''
    if (!searchQuery) return
    document.querySelector('#home').classList.remove('active')
    if(currentNavItem) currentNavItem.classList.remove('active')

    searchResult.innerHTML = `Showing results for '${searchQuery}' ...`
    fetchNewsByQuery(searchQuery)
})


function toggleNavItem(category) {
    searchResult.innerHTML = ""
    fetchNewsByCategory(category)
    document.querySelector('#home').classList.remove('active')
    if(currentNavItem) currentNavItem.classList.remove('active')
    currentNavItem = document.getElementById(category)
    currentNavItem.classList.add('active')
}


// Navbar menu icon toggle
let menuIcn = document.querySelector('#menu-icon')
let navlinks = document.querySelector('.nav-links')
menuIcn.addEventListener('click', () => {
    navlinks.classList.toggle('active')
})