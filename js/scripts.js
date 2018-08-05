/* global fetch */
(function () {
  const model = {
    init: function () {
      const model = this;
      this.peopleList = [];
      fetch('https://swapi.co/api/')
        .then(function (response) {
          response.ok ? model.ok = true : model.ok = false; // check if API is up
          return response.ok;
        })
        .then(function (response) {
          controller.setApiStatus(response);
        })
        .catch(e => console.log(e));
      // fetch('https://swapi.co/api/people/')
      //   .then(response => response.json())
      //   .then(function (response) {
      //     model.peopleList = response.results;
      //     console.log(model.peopleList);
      //     return model.peopleList;
      //   })
      //   .catch(function (e) {
      //     console.log(e);
      //   });
    },
    getData: function (type, num) {
      const model = this;
      return fetch(`https://swapi.co/api/${type}/${num}/`)
        .then(response => response.json())
        .then(function (person) {
          model.peopleList[num] = person;
          return model.peopleList[num];
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
      controller.index = 0;
      model.init();
      view.init();
    },
    getPerson: function () {
      return model.getData('people', this.num);
    },
    setApiStatus: function (status) {
      this.isWorking = status;
      if (!this.isWorking) {
        view.displayNoApi();
      }
    },
    updateBirthdate: function () {
      this.num = view.dateInput.value;
      this.index = this.num - 1; // array index will be one digit lower than day of month
    }
  };

  const view = {
    init: function () {
      this.display = document.getElementById('display');
      this.dateInput = document.getElementById('birthdate');
      this.dateInput.addEventListener('change', controller.updateBirthdate.bind(controller));
      this.personBtn = document.getElementById('person');
      this.personBtn.addEventListener('click', function () {
        controller.getPerson()
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
