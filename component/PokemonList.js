app.component('pokemon-list', {
    props: {                // All the property gave by main.js using v-bind.
        input: {            // Stores the search input.
            type: String,
            required: false
        },
        premierpoke: {      // Stores the ID of the first Pokemon to display.
            type: Number,
            required: true
        },
        nbpoke: {           // Stores the number of Pokemon to display.
            type: Number,
            required: true
        }
    },
    data() {
        return {
            pokelist: [],   // Stores the list of Pokemon to display.
            detailsID: null // Stores the ID of the Pokemon we want the details from.
        }
    },
    created() {
        this.fetchData()    // Fetch the API data on creation.
    },
    watch: {
        premierpoke() {     // If the prop premierpoke changes, we need to fetch a new pokelist from the API.
            this.fetchData()
        },
        detailsID() {       // If detailsID changes, we need to emit in order to display correctly what we want.
            if (this.detailsID === null) {  // We leave the details view : we need to display the search bar and the generation selector.
                this.$emit('unfocus')
            } else {                        // We enter the details view : we need to hide the search bar and the generation selector...
                this.$emit('focus')
                this.$emit('clearsearch')   // And clear the search bar.
            }
        }
    },
    methods: {
        changeID(id) {      // Changes the detailsID.
            this.detailsID = id
        },
        leaver() {          // Changes the detailsID to null.
            this.detailsID = null
        },
        prevPoke() {        // Changes the detailsID to the previous one (if it's not the first).
            if (this.detailsID>this.premierpoke) {
                this.detailsID = this.detailsID-1
            }
        },
        nextPoke() {        // Changes the detailsID to the next one (if it's not the last).
            if (this.detailsID<(this.premierpoke + this.nbpoke - 1)) {
                this.detailsID = this.detailsID+1
            }
        },
        fulload() {         // Relays the full load info.
            this.$emit('fulload')
        },
        fetchData() {       // Fetch the Pokemons that we need for the pokelist in the API.
            P.resource([
                "/api/v2/pokemon/?offset=" + (this.premierpoke - 1).toString() + "&limit=" + this.nbpoke.toString()
            ]).then( reponse => {
                this.pokelist = reponse[0].results
            })
        }
    },
    template:
    /*html*/
    `
    <div class="pokelist-container">
        <pokemon-detail v-if="detailsID" v-on:leave="leaver" v-on:prev="prevPoke" v-on:next="nextPoke" :id="detailsID"></pokemon-detail>
        <pokemon-card v-show="!detailsID" v-on:details="changeID" v-on:loaded="fulload" v-for="pokemon in pokelist" :name="pokemon.name" :url="pokemon.url" :input="input"></pokemon-card>
    </div>
    `
})