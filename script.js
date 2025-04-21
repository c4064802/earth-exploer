// Updated JavaScript
const continents = {
  Africa: ["Safari in Kenya", "Beach in Zanzibar", "Explore the Pyramids in Egypt"],
  Asia: ["Relax in Bali", "Visit the Great Wall of China", "Tour Tokyo, Japan"],
  Europe: ["Explore Paris, France", "Hike the Alps", "Tour Italy's historic cities"],
  NorthAmerica: ["Relax in Hawaii", "Visit New York City", "Road trip across Canada"],
  SouthAmerica: ["Visit Machu Picchu", "Explore Rio de Janeiro", "Amazon Rainforest Adventure"],
  Oceania: ["Visit the Great Barrier Reef", "Explore New Zealand", "Go hiking in Fiji"],
  Antarctica: ["Cruise to Antarctica", "Visit scientific research stations", "See the penguins"]
};

// Vacation form submission
const vacationForm = document.querySelector('#vacation-form');
vacationForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const activity = document.querySelector('#activity').value;
  const continentKeys = Object.keys(continents);
  const randomContinent = continentKeys[Math.floor(Math.random() * continentKeys.length)];

  const resultText = `
    <h3>Hey ${name}, how about a vacation in ${randomContinent}?</h3>
    <p>Here's a list of fun activities you can do:</p>
    <ul>
      ${continents[randomContinent].map(place => `<li>${place}</li>`).join('')}
    </ul>
  `;

  document.querySelector('#vacation-result').innerHTML = resultText;
  fetchContinentCountries(randomContinent);
});

function fetchContinentCountries(continent) {
  const apiUrl = `https://restcountries.com/v3.1/region/${continent.toLowerCase()}`;
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const countryNames = data.map(c => `<li>${c.name.common}</li>`).join('');
      document.querySelector('#vacation-result').innerHTML += `<h3>Countries in this continent:</h3><ul>${countryNames}</ul>`;
    })
    .catch(err => console.error('API error:', err));
}

// Discount registration form
document.querySelector('#discount-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.querySelector('#discount-name').value.trim();
  const email = document.querySelector('#email').value.trim();

  if (name && email) {
    const code = 'DISC-' + name.toUpperCase().slice(0, 3) + '-' + Math.floor(Math.random() * 10000);
    document.querySelector('#discount-code').innerHTML = `<p>Your discount code is: <strong>${code}</strong></p>`;
  }
});

// Add hover text for continent boxes
const continentDescriptions = {
  "Africa": "Rich in wildlife, deserts, and vibrant cultures.",
  "Asia": "The largest continent with diverse landscapes.",
  "Europe": "Known for history, culture, and architecture.",
  "North America": "Home to a variety of climates and landscapes.",
  "South America": "Famous for rainforests, mountains, and beaches.",
  "Oceania": "Comprised of Australia, New Zealand, and Pacific islands.",
  "Antarctica": "The coldest, driest, and windiest continent."
};

document.querySelectorAll('.continent-box').forEach(box => {
  const name = box.dataset.name;
  box.style.backgroundImage = `url('images/${name.toLowerCase().replace(/ /g, '_')}.jpg')`;
  box.innerHTML = `<h3>${name}</h3><div class="info">${continentDescriptions[name]}</div>`;
});
