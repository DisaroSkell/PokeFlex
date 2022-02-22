const P = new Pokedex.Pokedex()

app.component('pokemon-list', {
    template:
    /*html*/
    `
    <div class="pokelist-container">
        <ul>
            <li v-for="(pokemon, index) in pokelist" :key="index">
                {{ pokemon.name }}
            </li>
        </ul>
    </div>
    `,
    computed: {
        pokelist() {
            P.resource([
                "/api/v2/pokemon"
            ]).then(function(reponse) {
                return reponse[0].results
            })
        }
    }
})