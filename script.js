// Navbar menu icon toggle
let menuIcn = document.querySelector('#menu-icon')
let navlinks = document.querySelector('.nav-links')
menuIcn.addEventListener('click', () => {
    navlinks.classList.toggle('active')
})