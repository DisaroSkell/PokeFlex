app.component('pokemon-gens', {
    props: {
        nbgen: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            gentab: [],
            selected: null
        }
    },
    watch: {
        nbgen() {
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
        selected() {
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