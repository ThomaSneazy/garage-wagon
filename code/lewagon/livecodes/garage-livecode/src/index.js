console.log("livecode ajax");

const garage = "Openrent";
const url = `https://garage.api.lewagon.com/${garage}/cars`;
const carsList = document.querySelector(".cars-list");
const carsForm = document.querySelector(".car-form");

const fetchAllCars = () => {
  fetch(url)
  .then(response => response.json())
  .then((data) => {
    carsList.innerHTML = "";
    data.forEach(car => insertCarCard(car));
  })
}

const insertCarCard = (car) => {
  const carCard = `
        <div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand}${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong> ${car.owner}</p>
            <p><strong>Plate:</strong> ${car.plate}</p>
          </div>
          <button class="delete-car" data-car-id="${car.id}">Delete</button>
        </div>
  `;
  carsList.insertAdjacentHTML("beforeend", carCard)
}

//CREATE FUNCTION
const addCar = (event) => {
  event.preventDefault();

  const brand = document.querySelector('input[name="brand"]').value
  const model = document.querySelector('input[name="model"]').value
  const owner = document.querySelector('input[name="owner"]').value
  const plate = document.querySelector('input[name="plate"]').value

  const car = {brand, model, owner, plate};


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

  })
}


//DELETE FUNCTION
const deleteCar = (carId) => {
  fetch(`https://garage.api.lewagon.com/cars/${carId}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(() => {
    console.log('Voiture supprimée');
    fetchAllCars();
  })
}


carsForm.addEventListener('submit', addCar);

carsList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-car')){
    const carId = event.target.getAttribute('data-car-id');
    deleteCar(carId)
  }
})



fetchAllCars();
