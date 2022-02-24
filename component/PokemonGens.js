app.component('pokemon-gens', {
    props: {
        nbgen: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            gentab: []
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
                    this.gentab[reponse[0].id - 1] = reponse[0].names[j].name
                })
            }
        }
    },
    template:
    /*html*/
    `
    <select name="gen">
        <option v-for="gen in gentab" :value="gen">{{ gen }}</option>
    </select>
    `
})