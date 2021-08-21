let pokemonRepository = (function () {
  let pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchInput = document.querySelector("#searchBar");


  function showLoadingMessage() {
    document.querySelector('.loading-message').classList.add('visible');
  }

  function hideLoadingMessage() {
    document.querySelector('.loading-message').classList.add('hidden');
  }

  $(document).ready(function() {
    $('.loading-message').hide();
  });

 // returns an array of all the Pokémon in pokemonList
 function getAll() {
    return pokemonList;
 }

function add(pokemon) {
   if (
     typeof pokemon === "object" &&
     "name" in pokemon
   ) {
     pokemonList.push(pokemon);
   } else {
     alert("pokemon is not correct");
   }
 }

 // adds new Pokémon to the pokemonList array with a conditional to make sure the correct type of data is entered.
 function addListItem(pokemon){
   let pokemonList = document.querySelector(".pokemonList");

   let listPokemon = document.createElement("li");
    listPokemon.classList.add("group-list-item");

   let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("poke-button", "btn-lg", "buttons", "btn-primary");

    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');

    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    // the showDetails() function will be executed when the user clicks on the characters' names button
    button.addEventListener('click', function() {
     showDetails(pokemon);
   })
 }

 function loadList() {
   showLoadingMessage();
   return fetch(apiUrl).then(function(response) {
     return response.json();
   }).then(function(json) {
     hideLoadingMessage();
     json.results.forEach(function(item) {
       let pokemon = {
         name: item.name,
         detailsUrl: item.url
       };
       add(pokemon);
     });
   }).catch(function(e) {
     console.error(e);
   });
 }

 function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {

      // Now we add the details to the item
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;

      item.types = [];
      for (let i = 0; i < details.types.length; i++) {
        item.types.push(details.types[i].type.name);
      }
      item.abilities = [];
      for (let i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name);
      }
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
    });
  }

  function showModal(item) {
    // modalContainer.classList.add('is-visible');
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + item.name + '</h1>');
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr('src', item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr('src', item.imageUrlBack);
    let heightElement = $('<p>' + 'Height : ' + item.height + '</p>');
    let weightElement = $('<p>' + 'Weight : ' + item.weight + '</p>');
    let typesElement = $('<p>' + 'Types : ' + item.types.join(', ') + '</p>');
    let abilitiesElement = $('<p>' + 'Abilities : ' + item.abilities.join(', ') + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  searchInput.addEventListener("input", function() {
    let listPokemon = document.querySelectorAll("li");
    let value = searchInput.value;

    listPokemon.forEach(function(item) {
      if (item.innerText.indexOf(value) > -1) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });

 return {
   add: add,
   getAll: getAll,
   addListItem: addListItem,
   loadList: loadList,
   loadDetails: loadDetails,
   showDetails: showDetails,
   showModal: showModal
 };
}) ();
//  ======================

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


function mOver(obj) {
  obj.innerHTML = 'Thank You for visiting'
}

function mOut(obj) {
  obj.innerHTML = 'ありがとうございます!'
}

let mybutton = document.getElementById('btn-back-to-top');

  window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
  mybutton.addEventListener('click', backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
