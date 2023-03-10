export default class NewfetchCountries {
  constructor() {}

  fetchCountries(name) {
    const URL = 'https://restcountries.com/v3.1/name';
    const PARAMS = 'name,capital,population,flags,languages';

    return fetch(`${URL}/${name}?fields=${PARAMS}`).then(response =>
      response.json()
    );
  }
  
}
// console.log(NewfetchCountries.fetchCountries(ukraine)); 
