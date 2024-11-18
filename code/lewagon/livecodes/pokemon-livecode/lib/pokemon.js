// Sélection des éléments du DOM
const cardTemplate = document.getElementById("cardTemplate");
const cardsContainer = document.getElementById("cardsContainer");
const infoTemplate = document.getElementById("infoTemplate");
const infoContainer = document.getElementById("infoContainer");

// Requête fetch principale pour obtenir la liste des Pokémon
fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0")
  .then((response) => response.json())
  .then((data) => {
    // Boucle sur chaque Pokémon dans la liste
    data.results.forEach((pokemon) => {
      // Requête fetch pour obtenir les détails de chaque Pokémon
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonData) => {
          // Création d'une copie du template de carte
          const clone = cardTemplate.content.cloneNode(true);

          // Remplissage des informations du Pokémon dans la carte
          clone.querySelector("h2").textContent = pokemon.name;
          clone.querySelector("img").src = pokemonData.sprites.front_default;

          // Traitement des types du Pokémon
          clone.querySelector("p").textContent = pokemonData.types
            // Utilisation de .map() pour transformer le tableau des types
            .map((type) => {
              // type est un objet avec la structure : { type: { name: "fire" } }
              // On extrait uniquement le nom du type
              return type.type.name;
              // Le résultat de .map() est un nouveau tableau contenant seulement les noms des types
            })
            // Utilisation de .join() pour convertir le tableau en chaîne
            .join(", ");
            // .join(", ") prend tous les éléments du tableau et les joint en une seule chaîne,
            // en insérant ", " entre chaque élément.
            // Par exemple, ['fire', 'flying'] devient "fire, flying"

          // Ajout d'un gestionnaire d'événements pour le clic sur la carte
          clone.querySelector("a").addEventListener("click", (event) => {
            event.preventDefault();

            // Création d'une copie du template d'informations détaillées
            const infoClone = infoTemplate.content.cloneNode(true);

            // Remplissage des informations détaillées du Pokémon
            infoClone.querySelector("h2").textContent = pokemon.name;
            infoClone.querySelector("img").src = pokemonData.sprites.front_default;

            // Réutilisation de la même logique pour les types dans les détails
            infoClone.querySelector("p").textContent = pokemonData.types
              .map((type) => type.type.name)
              .join(", ");

            // Effacement et ajout des nouvelles informations dans le conteneur
            infoContainer.innerHTML = "";
            infoContainer.appendChild(infoClone);
          });

          // Ajout de la carte au conteneur principal
          cardsContainer.appendChild(clone);
        });
    });
  });
