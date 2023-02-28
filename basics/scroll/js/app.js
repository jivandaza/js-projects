// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
// show date footer
const showDateFooter = () => {
    const $date = document.getElementById("date");
    $date.innerHTML = new Date().getFullYear();
}

// event load page
window.addEventListener("DOMContentLoaded", () => {
    showDateFooter();
});
// ********** close links ************
const $navToggle = document.querySelector(".nav-toggle"),
    $linksContainer = document.querySelector(".links-container"),
    $links = document.querySelector(".links");

// resize links container
const resizeLinkContainer = () => {
    const containerHeight = $linksContainer.getBoundingClientRect().height,
        linksHeight = $links.getBoundingClientRect().height;
    
    containerHeight === 0
        ? $linksContainer.style.height = `${linksHeight}px`
        : $linksContainer.style.height = 0;
}

// event nav toggle button
$navToggle.addEventListener("click", () => {
    $linksContainer.classList.toggle("show-links");
    resizeLinkContainer();
});

// ********** fixed navbar ************
const $navbar = document.getElementById("nav"),
    $topBtn = document.querySelector(".top-link");

// show navbar
const showNavbar = (scrollHeight) => {
    const navHeight = $navbar.getBoundingClientRect().height;
    
    scrollHeight > navHeight
        ? $navbar.classList.add("fixed-nav")
        : $navbar.classList.remove("fixed-nav");
}

// show top button
const showTopBtn = (scrollHeight) => {
    scrollHeight > 500
        ? $topBtn.classList.add("show-link")
        : $topBtn.classList.remove("show-link");
}

// event scroll page 
window.addEventListener("scroll", () => {
    const scrollHeight = window.pageYOffset;
    showNavbar(scrollHeight);
    showTopBtn(scrollHeight);
});

// ********** smooth scroll ************
// select links
const $scrollLinks = document.querySelectorAll(".scroll-link");

$scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        // navigate to specific spot
        const id = e.currentTarget.getAttribute("href").slice(1);
        const element = document.getElementById(id);
        // calculate the heights
        const navHeight = $navbar.getBoundingClientRect().height,
            containerHeight = $linksContainer.getBoundingClientRect().height,
            fixedNav = $navbar.classList.contains("fixed");
        let position = element.offsetTop - navHeight;

        if (!fixedNav)
            position = position - navHeight;
        
        if (navHeight > 82)
            position = position + containerHeight;

        window.scrollTo({
            left: 0,
            top: position,
        });
        $linksContainer.style.height = 0;
    });
});