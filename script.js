// Continents with fun vacation spots
const continents = {
  Africa: ["Safari in Kenya", "Beach in Zanzibar", "Explore the Pyramids in Egypt"],
  Asia: ["Relax in Bali", "Visit the Great Wall of China", "Tour Tokyo, Japan"],
  Europe: ["Explore Paris, France", "Hike the Alps", "Tour Italy's historic cities"],
  NorthAmerica: ["Relax in Hawaii", "Visit New York City", "Road trip across Canada"],
  SouthAmerica: ["Visit Machu Picchu", "Explore Rio de Janeiro", "Amazon Rainforest Adventure"],
  Oceania: ["Visit the Great Barrier Reef", "Explore New Zealand", "Go hiking in Fiji"],
  Antarctica: ["Cruise to Antarctica", "Visit scientific research stations", "See the penguins"]
};

// Event listener for the form submission
document.querySelector('#vacation-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.querySelector('#name').value;
  const activity = document.querySelector('#activity').value;

  // Generate random continent
  const continentKeys = Object.keys(continents);
  const randomContinent = continentKeys[Math.floor(Math.random() * continentKeys.length)];

  // Prepare the result text for pop-up
  const resultText = `
    <h3>Hey ${name}, how about a vacation in ${randomContinent}?</h3>
    <p>Here's a list of fun activities you can do:</p>
    <ul>
      ${continents[randomContinent].map(place => `<li>${place}</li>`).join('')}
    </ul>
  `;

  // Display results in a pop-up
  alert(resultText);

  // Display result on the page
  const vacationResultDiv = document.querySelector('#vacation-result');
  vacationResultDiv.innerHTML = resultText;

  // Fetch continent details from API (REST Countries API for countries in the continent)
  fetchContinentCountries(randomContinent);
});

// Function to fetch countries in the continent from the REST Countries API
function fetchContinentCountries(continent) {
  const continentName = continent.replace(/ /g, '_');  // Prepare the continent for API use (replace spaces with underscores)
  const apiUrl = `https://restcountries.com/v3.1/region/${continentName.toLowerCase()}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayCountryList(data);
    })
    .catch(error => {
      console.error('Error fetching country data:', error);
    });
}

// Function to display the list of countries in the selected continent
function displayCountryList(countries) {
  const countriesListDiv = document.querySelector('#countries-list');
  const countryNames = countries.map(country => country.name.common).join(', ');

  const countriesHTML = `
    <h3>Countries in this continent:</h3>
    <ul>
      ${countries.map(country => `<li>${country.name.common}</li>`).join('')}
    </ul>
  `;

  countriesListDiv.innerHTML = countriesHTML;
}