app.component('pokemon-list', {
    data() {
        return {
            pokelist: [],
            detailsID: null
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
        <pokemon-detail v-if="detailsID" :id="detailsID"></pokemon-detail>
        <pokemon-card v-show="!detailsID" v-on:details="" v-for="pokemon in pokelist" :name="pokemon.name" :url="pokemon.url"></pokemon-card>
    </div>
    `
})