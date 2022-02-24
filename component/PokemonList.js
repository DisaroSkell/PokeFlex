app.component('pokemon-list', {
    props: {
        input: ''
    },
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
    methods: {
        changeID(id) {
            this.detailsID = id
        },
        leaver() {
            this.detailsID = null
        },
        prevPoke(id) {
            if (id>1) {
                this.detailsID = null
                this.detailsID = id-1
            }
        },
        nextPoke(id) {
            if (id<151) {
                this.detailsID = null
                this.detailsID = id+1
            }
        }
    },
    watch: {
        input() {
            console.log(this.input);
        }
    },
    template:
    /*html*/
    `
    <div class="pokelist-container">
        <pokemon-detail v-if="detailsID" v-on:leave="leaver" v-on:prev="prevPoke" v-on:next="nextPoke" :id="detailsID"></pokemon-detail>
        <pokemon-card v-show="!detailsID" v-on:details="changeID" v-for="pokemon in pokelist" :name="pokemon.name" :url="pokemon.url"></pokemon-card>
    </div>
    `
})