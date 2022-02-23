app.component('pokemon-list', {
    data() {
        return {
            pokelist: []
        }
    },
    created() {
        P.resource([
            "/api/v2/pokemon"
        ]).then(function(reponse) {
            for(let i=0;i<reponse[0].results.length;i++) {
                console.log(reponse[0].results[i].name)
            }
            this.pokelist = reponse[0].results
            console.log(this.pokelist)
        })
        console.log(this.pokelist)
    },
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
    `
})