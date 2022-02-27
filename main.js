//API initializer
const P = new Pokedex.Pokedex()

//This fonction puts a capital letter at the beggining of the string
function capitilize(str) {
    return str[0].toUpperCase() + str.slice(1)
}

const app = Vue.createApp({
    data() {
        return {
            input: '',      // Stores the search input.
            details: true,  // True when displaying the Pokemon list, else is at false.
            nbgen: 1,       // Stores how much generation there is (according to the API). We put it at 1 to prevent bugs while loading the API.
            // The two following variables stores the first Pokemon and the number of Pokemon of the displayed generation.
            // We put the default generation at 1, which contains 151 Pokemons and his first Pokemon has the ID 1.
            firstPoke: 1,
            nbPoke: 151
        }
    },
    created() {             // We load the number of generation at creation of the app.
        P.resource([
            "https://pokeapi.co/api/v2/generation/"
        ]).then( reponse => {
            this.nbgen = reponse[0].count
        })
    },
    methods: {
        noSearch() {        // Puts details at false. Called when a Pokemon's details are shown.
            this.details = false
        },
        search() {          // Puts details at true. Called when a Pokemon's details are closed.
            this.details = true
        },
        clearBar() {        // Clears the search bar. Called just before making the search bar disappear.
            this.input = ''
            document.getElementById("pokeSearch").value=''
        },
        enableSearch() {    // Enables the search bar. Called when the first load is finished and is there to prevent bugs.
            document.getElementById("pokeSearch").removeAttribute("disabled")
        },
        changeGen(firstPoke,nbPoke) {   // Change the firstPoke and nbPoke attributes of data. Used to display the Pokemon of the chosen generation/
            this.firstPoke = firstPoke
            this.nbPoke = nbPoke
        }
    }
})