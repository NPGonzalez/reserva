const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let selectedSeats = [];
let ticketPrice = movieSelect.value;

const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
    console.log(localStorage);
}

const dataLoadUI = () => {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
    console.log(selectedSeats);
};

dataLoadUI();




const updateSelectedCount = (ticketPrice) => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(e => [...seats].indexOf(e));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    console.log(seatsIndex);

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;


    console.log(selectedSeatsCount);
}



movieSelect.addEventListener('change', (e) => {
    ticketPrice = e.target.value;
    updateSelectedCount(ticketPrice);

    // selectedSeatsCount = 1;
    console.log(ticketPrice);
    setMovieData(e.target.selectedIndex, e.target.value);


});

container.addEventListener('click', (e) => {

    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
        // console.log(e.target);
        e.target.classList.toggle('selected');
        updateSelectedCount(ticketPrice);
    }
});

updateSelectedCount(ticketPrice);