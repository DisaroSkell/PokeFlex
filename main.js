const P = new Pokedex.Pokedex()

function capitilize(str) {
    return str[0].toUpperCase() + str.slice(1)
}

const app = Vue.createApp({
    data() {
        return {
            input: '',
            details: true,
            nbgen: 1,
            firstPoke: 1,
            nbPoke: 151
        }
    },
    created() {
        P.resource([
            "https://pokeapi.co/api/v2/generation/"
        ]).then( reponse => {
            this.nbgen = reponse[0].count
        })
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
            document.getElementById("pokeSearch").removeAttribute("disabled")
        },
        changeGen(firstPoke,nbPoke) {
            this.firstPoke = firstPoke
            this.nbPoke = nbPoke
        }
    }
})