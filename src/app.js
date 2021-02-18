// TODO: Build an awesome garage!

// GET ALL CARS:

// build url (include garage name)
// fetch url
// parse JSON
// extract data and add to DOM

const GARAGE_NAME = 'reparator2000';
const url = `https://wagon-garage-api.herokuapp.com/${GARAGE_NAME}/cars`;

const buildCarHtml = (brand, model, owner, plate) => {
  const html = `
    <div class="car">
      <div class="car-image">
        <img src="http://loremflickr.com/280/280/Ferrari 308 GTS" />
      </div>
      <div class="car-info">
        <h4>${brand} ${model}</h4>
        <p><strong>Owner:</strong> ${owner}</p>
        <p><strong>Plate:</strong> ${plate}</p>
      </div>
    </div>`;
  return html;
};

const resetForm = () => {
  document.querySelector('#new-car').reset();
  document.querySelector('#brand').focus();
};

const showCars = () => {
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      const carsList = document.querySelector('.cars-list');
      carsList.innerHTML = '';
      data.forEach((item) => {
        // Destructuring, a nice short way to extract properties from an object:
        const {
          brand, model, owner, plate
        } = item;
        // Or the old way:
        // const brand = item.brand;
        // const model = item.model;
        // const owner = item.owner;
        // const plate = item.plate;

        carsList.insertAdjacentHTML('afterbegin', buildCarHtml(brand, model, owner, plate));
      });
    });
  resetForm();
};

// CREATE A NEW CAR

// select the form
// listen for 'submit' event
// prevent default submit
// prepare HTTP request body
// fetch the url from API

const buildCarObject = () => {
  const car = {};
  car.owner = document.querySelector('#owner').value;
  car.brand = document.querySelector('#brand').value;
  car.model = document.querySelector('#model').value;
  car.plate = document.querySelector('#plate').value;
  return car;
};

const form = document.querySelector('.car-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(event);

  const car = buildCarObject();

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      showCars();
    });
});

showCars();
