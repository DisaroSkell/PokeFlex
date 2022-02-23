app.component('pokemon-list', {
    data() {
        return {
            pokelist: []
        }
    },
    created() {
        P.resource([
            "/api/v2/pokemon/?offset=0&limit=151"
        ]).then( reponse => {
            this.pokelist = reponse[0].results
        })
    },
    template:
    /*html*/
    `
    <div class="pokelist-container">
        <pokemon-card v-for="pokemon in pokelist" :name="pokemon.name" :url="pokemon.url"></pokemon-card>
    </div>
    `
})