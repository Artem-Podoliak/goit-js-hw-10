import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import NewfetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const newsfetchCountries = new NewfetchCountries();

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();

  const name = e.target.value.trim();
  clearRender()

  if (name !== '') {
    newsfetchCountries
      .fetchCountries(name)
      .then(data => renderCountry(data))
      .catch(error =>
        Notiflix.Notify.failure('Oops, there is no country with that name.')
      );
  }
}

function renderCountry(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (data.length > 2 && data.length < 10) {
    renderCountryList(data);
    return;
  } else {
    renderCountryInfo(data);
    return;
  }
}

function renderCountryList(data) {
  const listEl = data
    .map(item => {
      return `<li>
        <img class="country-list__flag" src="${item.flags.svg}" alt="${item.flags.alt}" width="60px">
      </li>
      <li>
        <p class="country-list__name">${item.name.official}</p>
      </li>`;
    })
    .join();
  refs.countryListEl.innerHTML = listEl;
}

function renderCountryInfo(data) {
    const infoEl = data.map(item => {
        return `  <div>
        <img class="country-info__flag" src="${item.flags.svg}" alt="${item.flags.alt}" width="60px" >
        <p class="country-info__name">${item.name.official}</p>
      </div>
      <ul>
        <li>
          <p class="country-info__txt">Capital: ${item.capital}</p>
        </li>
        <li>
          <p class="country-info__txt">Population: ${item.population}</p>
        </li>
        <li>
          <p class="country-info__txt">Languages: ${Object.values(item.languages).join(', ')}</p>
        </li>
      </ul>`
    }).join()
    refs.countryInfoEl.innerHTML = infoEl
}

function clearRender() {
    refs.countryListEl.innerHTML = ''
    refs.countryInfoEl.innerHTML = ''
}

