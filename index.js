const switchRef = document.querySelector(".pricing__switch > input");
const rangeRef = document.querySelector(".pricing__slider > input");

switchRef.addEventListener('click', () => {
})

rangeRef.addEventListener('input', (ev) => {
  styleRange(rangeRef, ev.target.value);
});

function styleRange(rangeRef, value) {
  rangeRef.style.background = `linear-gradient(to right, var(--soft-cyan) 0%, 
  var(--soft-cyan) ${value}%, 
  var(--light-grayish-blue1) ${value}%, 
  var(--light-grayish-blue1) 100%)`
}