/* global fetch */
(function () {
  const model = {
    init: function () {
      const model = this;
      this.people = [];
      this.planets = [];
      this.species = [];
      this.starships = [];
      this.vehicles = [];
      fetch('https://swapi.co/api/')
        .then(function (response) {
          response.ok ? model.ok = true : model.ok = false; // check if API is up
          return response.ok;
        })
        .then(function (response) {
          controller.setApiStatus(response);
        })
        .catch(e => console.log(e));
    },
    fetchInstance: function (type, num) {
      const model = this;
      // check if data already exists in model
      if (model[type][num]) {
        return Promise.resolve(model[type][num]);
      }
      // get data if it hasn't already been requested and store it for later reuse
      return fetch(`https://swapi.co/api/${type}/${num}/`)
        .then(response => response.json())
        .then(function (result) {
          model[type][num] = result;
          return model[type][num];
        })
        .catch(function (e) {
          console.log(e);
        });
    }
  };

  const controller = {
    init: function () {
      const controller = this;
      controller.num = 0;
      model.init();
      view.init();
    },
    getData: function (type) {
      return model.fetchInstance(type, this.num);
    },
    setApiStatus: function (status) {
      this.isWorking = status;
      if (!this.isWorking) {
        view.displayNoApi();
      }
    },
    updateBirthdate: function () {
      this.num = view.dateInput.value;
    }
  };

  const view = {
    init: function () {
      this.display = document.getElementById('display');
      this.dateInput = document.getElementById('birthdate');
      this.dateInput.addEventListener('change', controller.updateBirthdate.bind(controller));
      this.personBtn = document.getElementById('person');
      this.personBtn.addEventListener('click', function () {
        controller.getData('people')
          .then(person => view.renderPerson(person));
      });
    },
    renderPerson: function (person) {
      const personDisplay = `
        <h2>${person.name}</h2>
      `;
      this.display.innerHTML = personDisplay;
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
})();
