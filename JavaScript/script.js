const carousel = document.querySelector('.carousel');
const arrowBtns = document.querySelectorAll('.wrapper i');
const firstCardWidth = carousel.querySelector('.card').offsetWidth;
const carouselChildren = [...carousel.children];

let isDragging = false, startX, startScrollLeft;

/**
 * cardPerview is the number of cards that can be displayed on the carousel
 * at any given time. This is calculated by dividing the width of the carousel
 * by the width of a single card.
 */
let cardPerview = Math.round(carousel.offsetWidth / firstCardWidth);

// clone the last 'cardPerview' number of children, reverse the order of the cloned elements, and insert them at the beginning of the carousel
carouselChildren.slice(-cardPerview).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML)
});


// clone the first 'cardPerview' number of children and insert them at the end of the carousel
// this is done to create the illusion of a continuous loop when the user scrolls to the end of the carousel
carouselChildren.slice(0, cardPerview).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML)
});

// When the user clicks on either the left or right arrow button,
// we want to scroll the carousel by the width of one card in the
// direction of the arrow that was clicked.
//
// We use the id of the button ("left" or "right") to determine the
// direction of the scroll. If the button is the left arrow, we want
// to scroll to the left, so we subtract the width of one card from
// the current scroll position. If the button is the right arrow, we
// want to scroll to the right, so we add the width of one card to the
// current scroll position.
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

/**
 * This function is called when the user starts dragging the carousel.
 * It sets the isDragging flag to true, adds the "dragging" class to the
 * carousel, and records the initial x-coordinate of the mouse and the
 * initial scroll position of the carousel.
 * @param {MouseEvent} e The mouse event that triggered this function.
 */
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;
    const distance = e.pageX - startX;
    carousel.scrollLeft = startScrollLeft - distance;
} 
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition")
    } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition")
    }
}

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mousedown', dragStart);
document.addEventListener('mouseup', dragStop);
carousel.addEventListener('scroll', infiniteScroll);