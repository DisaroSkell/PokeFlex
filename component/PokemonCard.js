app.component('pokemon-card', {
    props: {
        input: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            id: null,
            displayName: "",
            types: [],
            sprite: "",
            spritef: "",
            spriteb: ""
        }
    },
    created() {
        this.fetchData()
    },
    computed: {
        searched() {
            return this.name.includes(this.input.toLowerCase()) || this.id.toString().includes(this.input)
        }
    },
    watch: {
        url() {
            this.fetchData()
        }
    },
    methods: {
        back() {
            this.sprite = this.spriteb
        },
        front() {
            this.sprite = this.spritef
        },
        details() {
            this.$emit('details', this.id)
        },
        fetchData() {
            this.displayName = capitilize(this.name)
            P.resource([
                this.url
            ]).then( reponse => {
                this.id = reponse[0].id
                this.types = reponse[0].types
                this.sprite = reponse[0].sprites.front_shiny
                this.spritef = reponse[0].sprites.front_shiny
                if (reponse[0].sprites.back_shiny) {
                    this.spriteb = reponse[0].sprites.back_shiny
                } else {
                    this.spriteb = reponse[0].sprites.back_default
                }
                if(this.id == nbPoke){
                    this.$emit('loaded')
                }
            })
        }
    },
    template:
    /*html*/
    `
    <div v-show="searched" class="pokecard">
        <div class="pokeID"> #{{ this.id }} </div>
        <p class="pokeName"> {{ this.displayName }} </p>
        
        <img :src="sprite" :alt="name" class="center-div clicker" width="200" @mouseover="back" @mouseleave="front" @click="details">
        <div class="types-container">
            <div v-for="t in types" class="types" :class="t.type.name"> {{ t.type.name }} </div>
        </div>
    </div>
    `
})