function capitilize(str) {
    return str[0].toUpperCase() + str.slice(1)
}

const app = Vue.createApp({
    data() {
        return {
            input: '',
            details: true
        }
    },
    methods: {
        noSearch() {
            this.details = false
        },
        search() {
            this.details = true
        },
        clearBar() {
            this.input = ''
            document.getElementById("pokeSearch").value=''
        },
        enableSearch() {
            console.log("a");
            document.getElementById("pokeSearch").removeAttribute("disabled")
        }
    }
})

const P = new Pokedex.Pokedex()

const premierPoke = 1
const nbPoke = 151