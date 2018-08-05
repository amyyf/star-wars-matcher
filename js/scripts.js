/* global fetch */
(function () {
  const model = {
    init: function () {
      const model = this;
      fetch('https://swapi.co/api/people/')
        .then(response => response.json())
        .then(function (response) {
          model.peopleList = response.results;
          console.log(model.peopleList);
          return model.peopleList;
        })
        .catch(function (e) {
          console.log(e);
        });
    }
  };

  const controller = {
    init: function () {
      this.num = 0;
      this.index = 0;
      model.init();
      view.init();
    },
    getPerson: function () {
      return model.peopleList[this.index];
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
        const person = controller.getPerson();
        view.renderPerson(person);
      });
    },
    renderPerson: function (person) {
      const personDisplay = `
        <h2>${person.name}</h2>
      `;
      this.display.innerHTML = personDisplay;
    }
  };
  controller.init();
})();
