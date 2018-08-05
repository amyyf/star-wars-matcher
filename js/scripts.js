/* global fetch */
(function () {
  const model = {
    // init: function () {
    //   fetch('https://swapi.co/api/people/')
    //     .then(response => response.json())
    //     .then(function (response) {
    //       this.peopleList = response;
    //       console.log(this.peopleList);
    //       return this.peopleList;
    //     })
    //     .catch(function (e) {
    //       console.log(e);
    //     });
    // }
    peopleList: [
      {
        'birth_year': '19 BBY',
        'eye_color': 'Blue',
        'films': [
          'https://swapi.co/api/films/1/'
        ],
        'gender': 'Male',
        'hair_color': 'Blond',
        'height': '172',
        'homeworld': 'https://swapi.co/api/planets/1/',
        'mass': '77',
        'name': 'Luke Skywalker',
        'skin_color': 'Fair',
        'created': '2014-12-09T13:50:51.644000Z',
        'edited': '2014-12-10T13:52:43.172000Z',
        'species': [
          'https://swapi.co/api/species/1/'
        ],
        'starships': [
          'https://swapi.co/api/starships/12/'
        ],
        'url': 'https://swapi.co/api/people/1/',
        'vehicles': [
          'https://swapi.co/api/vehicles/14/'
        ]
      }
    ]
  };

  const controller = {
    init: function () {
      this.num = 0;
      this.index = 0;
      // model.init();
      view.init();
    },
    getPerson: function () {
      return model.peopleList[this.index];
    },
    updateBirthdate: function () {
      this.num = view.dateInput.value;
      this.index = this.num - 1; // array index will be one digit lower
    }
  };

  const view = {
    init: function () {
      this.display = document.getElementById('display');
      this.dateInput = document.getElementById('birthdate');
      this.dateInput.addEventListener('change', controller.updateBirthdate.bind(controller));
      this.personBtn = document.getElementById('person');
      this.personBtn.addEventListener('click', function () {
        const person = controller.getPerson.bind(controller)();
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
