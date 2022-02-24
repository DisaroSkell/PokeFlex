app.component('pokemon-list', {
    props: {
        input: {
            type: String,
            required: false
        },
        premierpoke: {
            type: Number,
            required: true
        },
        nbpoke: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            pokelist: [],
            detailsID: null
        }
    },
    created() {
        this.fetchData()
    },
    watch: {
        premierpoke() {
            this.fetchData()
            console.log(this.pokelist);
        },
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
            if (id>this.premierpoke) {
                this.detailsID = null
                this.detailsID = id-1
            }
        },
        nextPoke(id) {
            if (id<(this.premierpoke + this.nbpoke - 1)) {
                this.detailsID = null
                this.detailsID = id+1
            }
        },
        fulload() {
            this.$emit('fulload')
        },
        fetchData() {
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