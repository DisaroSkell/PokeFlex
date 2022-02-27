app.component('pokemon-gens', {
    props: {                // All the property gave by main.js using v-bind.
        nbgen: {            // Stores how much generation there is (according to the API).
            type: Number,
            required: true
        }
    },
    data() {
        return {
            gentab: [],     // Stores informations about every generations in an array.
            selected: null  // Stores which generation is selected.
        }
    },
    watch: {
        nbgen() {           // Considering the nbgen variable initialized at 1 (see main.js), we need to fetch the data when it changes.
            for(let i = 0; i < this.nbgen; i++) {
                P.resource([
                    "https://pokeapi.co/api/v2/generation/" + (i+1).toString() + "/"
                ]).then( reponse => {
                    let j = 0
                    while(j < reponse[0].names.length && reponse[0].names[j].language.name != "en") {
                        j++
                    }
                    this.gentab[reponse[0].id - 1] = {name: reponse[0].names[j].name, count: reponse[0].pokemon_species.length}
                })
            }
        },
        selected() {        // Calculates the first Pokemon and the number of Pokemons of the selected generation with the gentab and emits it.
            let firstPoke = 1

            for(let i = 0; i < this.selected - 1; i++) {
                firstPoke += this.gentab[i].count
            }

            let nbPoke = this.gentab[this.selected - 1].count

            this.$emit('genselec', firstPoke, nbPoke)
        }
    },
    template:
    /*html*/
    `
    <select v-model="selected" class="genSelec">
        <option disabled value=""> Select a generation </option>
        <option v-for="(gen, index) in gentab" :value="index+1">{{ gen.name }}</option>
    </select>
    `
})