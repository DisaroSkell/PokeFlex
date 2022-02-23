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
            abilities: [],
            height: "",
            weight: "",
            location: "",
            stats: [],
            desc: "",
            specie: ""
        }
    },
    created() {
        this.url = "https://pokeapi.co/api/v2/pokemon/" + this.id.toString() + "/"
        P.resource([
            this.url
        ]).then( reponse => {
            this.name = resource[0].name
        })
    },
    template:
    /*html*/
    `
    <div class="detailContainer">Test</div>
    `
})