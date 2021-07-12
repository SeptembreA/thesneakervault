/* eslint-disable */
const sneakerApp = {};

sneakerApp.getSneakers = async = (brandSelection = 'Adidas', genderSelection = 'men') => {
  $.ajax({
    url: 'http://proxy.hackeryou.com',
    dataType: 'json',
    method: 'GET',
    data: {
      reqUrl: 'http://api.thesneakerdatabase.com/v1/sneakers',
      params: {
        limit: 100,
        brand: `${brandSelection}`,
        gender: `${genderSelection}`
      }
    }
  }).then(function (results) {
    sneakerApp.displaySneakers(results);
  });
};

sneakerApp.getBrandValue = () => {
  $('#brand').on('change', () => {
    const brandSelection = $("#brand option:selected").val();
    $(".results").empty();
    sneakerApp.getSneakers(brandSelection, undefined);
  });
};

sneakerApp.getGenderValue = () => {
  $("#gender").on('change', () => {
    const genderSelection = $("#gender option:selected").val();
    $(".results").empty();
    sneakerApp.getSneakers(undefined, genderSelection);
  });
};

sneakerApp.displaySneakers = sneakers => {
  sneakers.results.forEach(sneaker => {
    const htmlToAppend = `
      <div class="sneaker-card">
      <h3 class="sneaker-title">${sneaker.brand} ${sneaker.name}</h3>
      <img src="${sneaker.media.imageUrl}" alt="${sneaker.name}">
      <h5>${sneaker.gender}/${sneaker.year}</h5>
      </div>
      `;
    $(".results").append(htmlToAppend);
  });
};

sneakerApp.init = function() {
  sneakerApp.getBrandValue();
  sneakerApp.getGenderValue()

  $('.header a').on('click', function () {
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 1200);
  })
  // STRETCH GOAL: Add placeholder image to results with no images
  // STRETCH GOAL: Have card flip on click and show additional inetation (release date, retail price, etc.) 
  sneakerApp.displaySneakers = sneakers => {
    sneakers.results.forEach(sneaker => {
      const htmlToAppend = `
      <div class="sneaker-card">
      <h3 class="sneaker-title">${sneaker.brand} ${sneaker.name}</h3>
      <img src="${sneaker.media.imageUrl}" alt="${sneaker.name}">
      <h5>${sneaker.gender}/${sneaker.year}</h5>
      </div>
      `;
      $(".results").append(htmlToAppend);
    });
  };
};

$(document).ready(function () {
  sneakerApp.init();
  sneakerApp.getSneakers();
});