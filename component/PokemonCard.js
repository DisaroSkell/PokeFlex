app.component('pokemon-card', {
    props: {                // All the property gave by main.js using v-bind.
        input: {            // Stores the search input.
            type: String,
            required: false
        },
        url: {              // Stores the URL corresponding to the Pokemon to display on the card in the API.
            type: String,
            required: true
        },
        name: {             // Stores the name of the Pokemon to display on the card.
            type: String,
            required: true
        }
    },
    data() {
        return {
            id: null,       // Stores the id of the Pokemon to display on the card.
            displayName: "",// Stores the name of the Pokemon to display on the card. (that one will be displayed, the other one will not)
            types: [],      // Stores the type array of the Pokemon to display on the card. (can be one type ou double type)
            // The three next variables store the sprite URL of the Pokemon to display on the card.
            sprite: "",     // This one will just swap between the next two when hovered.
            spritef: "",    // Keeps the front sprite.
            spriteb: ""     // Keeps the back sprite.
        }
    },
    created() {             // Fetch the API data on creation.
        this.fetchData()
    },
    computed: {
        searched() {        // Boolean that indicates if the Pokemon has been searched or not. Used for display.
            return this.name.includes(this.input.toLowerCase()) || this.id.toString().includes(this.input)
        }
    },
    watch: {
        url() {             // If the URL changes, we need to fetch the Pokemon data in the API.
            this.fetchData()
        }
    },
    methods: {
        back() {            // We switch the sprite to display to the back sprite.
            this.sprite = this.spriteb
        },
        front() {           // We switch the sprite to display to the front sprite.
            this.sprite = this.spritef
        },
        details() {         // Emits a signal to show details of the chosen Pokemon.
            this.$emit('details', this.id)
        },
        fetchData() {       // Fetch all of the data needed for the Pokemon in the API.
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
                if(this.id == 151){
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