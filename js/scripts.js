/* global fetch */
(function (apiURL) {
  const model = {
    init: function () {
      const model = this;
      this.people = [];
      this.planets = [];
      this.species = [];
      this.starships = [];
      this.vehicles = [];
      fetch(apiURL)
        .then(function (response) {
          model.ok = response.ok; // check if API is up
          return response.ok;
        })
        .then(function (response) {
          controller.setApiStatus(response);
        })
        .catch(e => console.log(e));
    },
    fetchInstance: function (type, num, index) {
      const model = this;
      let reqURL = apiURL;
      // check if data already exists in model
      if (model[type][index]) {
        return Promise.resolve(model[type][index]);
      }
      if (num <= 10) {
        reqURL += `${type}/`;
      } else if (num <= 20) {
        reqURL += `${type}/?page=2`;
        index -= 10;
      } else if (num <= 30) {
        reqURL += `${type}/?page=3`;
        index -= 20;
      } else {
        reqURL += `${type}/?page=4`;
        index -= 30;
      }
      return fetch(reqURL)
        .then(response => response.json())
        .then(function (response) {
          const instance = response.results[index];
          model[type][index] = instance;
          return instance;
        })
        .catch(function (e) {
          console.log(e);
        });
    }
  };

  const controller = {
    init: function () {
      const controller = this;
      controller.num = 0; // day of month of birthday
      controller.index = 0; // array index will be one less than day
      model.init();
      view.init();
    },
    getDataByType: function (type) {
      return model.fetchInstance(type, this.num, this.index);
    },
    setApiStatus: function (status) {
      this.isWorking = status;
      if (!this.isWorking) {
        view.displayNoApi();
      }
    },
    updateBirthdate: function () {
      this.num = view.dateInput.value;
      this.index = this.num - 1; // set array index
    }
  };

  const view = {
    init: function () {
      this.dateInput = document.getElementById('birthdate');
      this.display = document.getElementById('display');
      this.personBtn = document.getElementById('person');
      this.planetBtn = document.getElementById('planet');
      this.speciesBtn = document.getElementById('species');
      this.starshipBtn = document.getElementById('starship');
      this.vehicleBtn = document.getElementById('vehicle');

      this.dateInput.addEventListener('change', controller.updateBirthdate.bind(controller));
      this.personBtn.addEventListener('click', function () {
        controller.getDataByType('people')
          .then(person => view.renderPerson(person));
      });
      this.planetBtn.addEventListener('click', function () {
        controller.getDataByType('planets')
          .then(planet => view.renderPlanet(planet));
      });
      this.speciesBtn.addEventListener('click', function () {
        controller.getDataByType('species')
          .then(species => view.renderSpecies(species));
      });
      this.starshipBtn.addEventListener('click', function () {
        controller.getDataByType('starships')
          .then(starship => view.renderStarship(starship));
      });
      this.vehicleBtn.addEventListener('click', function () {
        controller.getDataByType('vehicles')
          .then(vehicle => view.renderVehicle(vehicle));
      });
    },
    renderPerson: function (person) {
      const personDisplay = `
        <h2>${person.name}</h2>
      `;
      this.display.innerHTML = personDisplay;
    },
    renderPlanet: function (planet) {
      const planetDisplay = `
        <h2>${planet.name}</h2>
      `;
      this.display.innerHTML = planetDisplay;
    },
    renderSpecies: function (species) {
      const speciesDisplay = `
        <h2>${species.name}</h2>
      `;
      this.display.innerHTML = speciesDisplay;
    },
    renderStarship: function (starship) {
      const starshipDisplay = `
        <h2>${starship.name}</h2>
      `;
      this.display.innerHTML = starshipDisplay;
    },
    renderVehicle: function (vehicle) {
      const vehicleDisplay = `
        <h2>${vehicle.name}</h2>
      `;
      this.display.innerHTML = vehicleDisplay;
    },
    displayNoApi: function () {
      const statusMsg = `
        <h2>Error</h2>
          <p>The server seems to be down. Please try again later.</p>
      `;
      this.display.innerHTML = statusMsg;
    }
  };
  controller.init();
})('https://swapi.co/api/');
