app.component('pokemon-card', {
    props: {
        url: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required:true
        },
    },
    data() {
        return {
            id: null,
            types: [],
            sprite: "",
            spritef: "",
            spriteb: ""
        }
    },
    created() {
        P.resource([
            this.url
        ]).then( reponse => {
            this.id = reponse[0].id
            this.types = reponse[0].types
            this.sprite = reponse[0].sprites.front_shiny
            this.spritef = reponse[0].sprites.front_shiny
            this.spriteb = reponse[0].sprites.back_shiny
        })
    },
    methods: {
        back() {
            this.sprite = this.spriteb
        },
        front() {
            this.sprite = this.spritef
        }
    },
    template:
    /*html*/
    `
    <div class="pokecard">
        <div class="pokeID"> {{ this.id }} </div>
        <p class="pokeName"> {{ this.name }} </p>
        
        <img :src="sprite" :alt="name" class="center-div" width="200" @mouseover="back" @mouseleave="front">
        <div class="types-container">
            <div v-for="t in types" class="types" :class="t.type.name"> {{ t.type.name }} </div>
        </div>
    </div>
    `
})