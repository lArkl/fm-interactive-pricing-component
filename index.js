const switchRef = document.querySelector(".pricing__switch > input");
const rangeRef = document.querySelector(".pricing__slider > input");
const pricingRateRef = document.querySelector(".pricing__rate--value > span");
const pageRateRef = document.querySelector(".pricing > .pricing__rate--value");
const startBtnRef = document.querySelector("button");

const YEAR_DISCOUNT = 0.25;
const PAGE_RATE = { MAX: 200, MIN: 0};
const PRICING_RATE = { MAX: 32, MIN: 0}; // Monhly limits

const NUMBER_FORMAT = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

class AppState {
  constructor() {
    this.isMonthly = true;
    this.pricingRate = NUMBER_FORMAT.format(16);
    pricingRateRef.textContent = `$${this.pricingRate}`;
  }
  applyDiscount(pricingRate) {
    return NUMBER_FORMAT.format(pricingRate * (1 - YEAR_DISCOUNT));
  }
  revertDiscount(pricingRate) {
    return NUMBER_FORMAT.format(pricingRate / (1 - YEAR_DISCOUNT));
  }
  changeFrequency() {
    this.isMonthly = !this.isMonthly
    const pricingRate = this.isMonthly? this.revertDiscount(this.pricingRate) : this.applyDiscount(this.pricingRate);
    this.updatePricingRate(pricingRate);
  }
  updatePricingRate(pricingRate) {
    pricingRateRef.textContent = `$${pricingRate}`;
    this.pricingRate = pricingRate;
  }
  updatePageRate(pageRate) {
    pageRateRef.textContent = `${pageRate}K PAGEVIEWS`;
  }
  changePageRate(rate, maxRange=100) {
    const actRate = rate / maxRange;
    let pricingRate = actRate * (PRICING_RATE.MAX - PRICING_RATE.MIN) + PRICING_RATE.MIN;
    pricingRate = this.isMonthly? pricingRate : this.applyDiscount(pricingRate);
    this.updatePricingRate(pricingRate);

    const pageRate = Math.floor(actRate * (PAGE_RATE.MAX - PAGE_RATE.MIN) + PAGE_RATE.MIN);
    this.updatePageRate(pageRate);
  }
}

const APP_STATE = new AppState();


switchRef.addEventListener('click', () => {
  APP_STATE.changeFrequency();
});

rangeRef.addEventListener('input', (ev) => {
  const rate = ev.target.value;
  styleRange(rangeRef, rate);
  APP_STATE.changePageRate(rate);
});


startBtnRef.addEventListener("click", () => {
  console.log("Trial started!")
})

function styleRange(rangeRef, value) {
  rangeRef.style.background = `
    linear-gradient(to right,
    var(--soft-cyan) 0%, 
    var(--soft-cyan) ${value}%, 
    var(--light-grayish-blue1) ${value}%, 
    var(--light-grayish-blue1) 100%)
  `
}