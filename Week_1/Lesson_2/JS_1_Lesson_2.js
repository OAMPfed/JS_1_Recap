//Banner code
const bannerArrays = ["images/pkm_banner_1.jpg", "images/pkm_banner_2.png", "images/pkm_banner_3.png", "images/pkm_banner_4.jpg"];

let pkmIterator = 0;

setInterval(function () {
    if (pkmIterator === 3) {
        pkmIterator = -1;
    } else {
        pkmIterator++;
        document.getElementById('pkm_banner').src = bannerArrays[pkmIterator];
    }
}, 3000);

//API fetch
let savedFetchObj;
number = 1;
fetch('https://pokeapi.co/api/v2/pokemon')
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        console.log(result);
        savedFetchObj = result;
        for (i = 0; i < result.results.length; i++) {
            console.log(savedFetchObj.results[i].name);
            console.log(number);

            pokeCard = document.createElement("div");
            pokeCardClass = document.createAttribute("class");
            pokeCardClass.value = "card";
            pokeCard.setAttributeNode(pokeCardClass);
            pokeName = document.createElement("h2");
            pokeNameText = document.createTextNode(result.results[i].name);
            pokeDetails = document.createElement("DETAILS");
            pokeSummary = document.createElement("summary");
            pokeSummaryText = document.createTextNode("Abilities");
            onClickFunction = document.createAttribute("onClick");
            onClickFunction.value = "fetchPokemonAbilities(" + number + ")";
            pokeSummary.setAttributeNode(onClickFunction);
            abilitiesWrapper = document.createElement("div");
            abilitiesWrapperId = document.createAttribute("id");
            abilitiesWrapperId.value = "abilitiesWrapper" + number;
            abilitiesWrapper.setAttributeNode(abilitiesWrapperId);


            document.getElementById('cards_wrapper').appendChild(pokeCard);
            pokeCard.appendChild(pokeName);
            pokeName.appendChild(pokeNameText);
            pokeCard.appendChild(pokeDetails);
            pokeDetails.appendChild(pokeSummary);
            pokeSummary.appendChild(pokeSummaryText);
            pokeDetails.appendChild(abilitiesWrapper);
            number++;
        };
    });

function fetchPokemonAbilities(number) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + number + '/')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            if (document.contains(document.getElementById('abilitiesText1Id' + number))) {
                document.getElementById('abilitiesText1Id' + number).remove();
                document.getElementById('abilitiesText2Id' + number).remove();
            } else {
                abilitiesWrapperTarget = document.getElementById("abilitiesWrapper" + number);

                abilitiesText1 = document.createElement("p");
                abilitiesText1Id = document.createAttribute("id");
                abilitiesText1Id.value = "abilitiesText1Id" + number;
                abilitiesText1.setAttributeNode(abilitiesText1Id);
                abilitiesText1Content = document.createTextNode(result.abilities[0].ability.name);
                abilitiesText2 = document.createElement("p");
                abilitiesText2Id = document.createAttribute("id");
                abilitiesText2Id.value = "abilitiesText2Id" + number;
                abilitiesText2.setAttributeNode(abilitiesText2Id);
                abilitiesText2Content = document.createTextNode(result.abilities[1].ability.name);

                abilitiesWrapperTarget.appendChild(abilitiesText1);
                abilitiesText1.appendChild(abilitiesText1Content);
                abilitiesWrapperTarget.appendChild(abilitiesText2);
                abilitiesText2.appendChild(abilitiesText2Content);
            }
        })
};

/*
<div class="card" id="bulbasaur">
    <h2>Bulbasaur</h2>
    <details>
        <summary onClick="fetchPokemonAbilities()">Abilities</summary>
        <p>chlorophyll</p>
        <p>overgrow</p>
    </details>
</div>



pokeCardClass = document.createAttribute("class");
            pokeCardClass.value = "card";
 */