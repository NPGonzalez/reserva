const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = movieSelect.value;

const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

const updateSelectedCount = () => {
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
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

container.addEventListener('click', (e) => {

    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')) {
        // console.log(e.target);
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }



});