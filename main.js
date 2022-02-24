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
        }
    }
})

const P = new Pokedex.Pokedex()