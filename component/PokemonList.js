app.component('pokemon-list', {
    props: {
        input: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            pokelist: [],
            detailsID: null
        }
    },
    created() {
        P.resource([
            "/api/v2/pokemon/?offset=" + (premierPoke - 1).toString() + "&limit=" + nbPoke.toString()
        ]).then( reponse => {
            this.pokelist = reponse[0].results
        })
    },
    watch: {
        detailsID() {
            if (this.detailsID === null) {
                this.$emit('unfocus')
            } else {
                this.$emit('clearsearch')
                this.$emit('focus')
            }
        }
    },
    methods: {
        changeID(id) {
            this.detailsID = id
        },
        leaver() {
            this.detailsID = null
        },
        prevPoke(id) {
            if (id>premierPoke) {
                this.detailsID = null
                this.detailsID = id-1
            }
        },
        nextPoke(id) {
            if (id<nbPoke) {
                this.detailsID = null
                this.detailsID = id+1
            }
        },
        fulload() {
            this.$emit('fulload')
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