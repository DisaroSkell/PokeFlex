function capitilize(str) {
    return str[0].toUpperCase() + str.slice(1)
}

const app = Vue.createApp({
    data() {
        return {
            input: ''
        }
    }
})

const P = new Pokedex.Pokedex()