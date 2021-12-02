const getCountries = async () => {
  const url = 'https://restcountries.com/v3/all?fields=name,flags';
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  let response = await fetch(url, {
    method: 'GET',
    headers: options.headers,
  });
  let result = await response.json();
  return result;
};
let countryData = getCountries();
export default countryData;
