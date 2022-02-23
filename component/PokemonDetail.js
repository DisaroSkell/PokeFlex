app.component('pokemon-detail', {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            url: "",
            name: "",
            sprite: "",
            height: null,
            weight: null,
            abilities: [],
            stats: [],
            location: "",
            desc: "",
            specie: ""
        }
    },
    created() {
        this.url = "https://pokeapi.co/api/v2/pokemon/" + this.id.toString() + "/"
        P.resource([
            this.url
        ]).then( resource => {
            this.name = resource[0].name
            this.sprite = resource[0].sprites.other["official-artwork"].front_default
            this.height = resource[0].height / 10.
            this.weight = resource[0].weight / 10.
            this.abilities = []
            this.stats = []
            P.resource([
                resource[0].species.url
            ]).then( resource => {
                this.location = ""
                this.desc = ""
                this.specie = ""
            })
        })
    },
    computed: {
        idS() {
            return (1000 + this.id).toString().slice(-3)
        }
    },
    template:
    /*html*/
    `
    <div class="detailContainer">
        <div class="pokeID"> #{{ this.idS }} </div>
        <div> {{ this.name }} </div>
        <div> {{ this.height }}m </div>
        <div> {{ this.weight }}kg </div>
        <div> {{ this.abilities }} </div> <!-- v-for -->
        <div> {{ this.stats }} </div> <!-- v-for -->
        <div> {{ this.location }} </div>
        <div> {{ this.desc }} </div> <!-- Small text -->
        <div> {{ this.specie }} </div>
        <img :src="sprite" :alt="name">
    </div>
    `
})