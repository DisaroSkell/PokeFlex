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
            this.name = capitilize(resource[0].name)
            this.sprite = resource[0].sprites.other["official-artwork"].front_default
            this.height = resource[0].height / 10.
            this.weight = resource[0].weight / 10.
            this.abilities = resource[0].abilities

            for(let i = 0; i<this.abilities.length; i++) {
                this.abilities[i].ability.name = capitilize(this.abilities[i].ability.name)
            }

            this.stats = resource[0].stats
            P.resource([
                resource[0].species.url
            ]).then( resource2 => {
                this.location = capitilize(resource2[0].habitat.name)
                let baddesc = resource2[0].flavor_text_entries[0].flavor_text.split('\n')
                this.desc = ""

                for(let i = 0; i<baddesc.length; i++) {
                    if (i != 0) {
                        this.desc += " "
                    }
                    this.desc += baddesc[i]
                }

                baddesc = this.desc.split('\f')
                this.desc = ""

                for(let i = 0; i<baddesc.length; i++) {
                    if (i != 0) {
                        this.desc += " "
                    }
                    this.desc += baddesc[i]
                }

                for(let i = 0; i<resource2[0].genera.length; i++) {
                    if(resource2[0].genera[i].language.name == "en") {
                        this.specie = resource2[0].genera[i].genus
                    }
                }
            })
        })
    },
    watch: {
        id() {
            this.url = "https://pokeapi.co/api/v2/pokemon/" + this.id.toString() + "/"
            P.resource([
                this.url
            ]).then( resource => {
                this.name = capitilize(resource[0].name)
                this.sprite = resource[0].sprites.other["official-artwork"].front_default
                this.height = resource[0].height / 10.
                this.weight = resource[0].weight / 10.
                this.abilities = resource[0].abilities

                for(let i = 0; i<this.abilities.length; i++) {
                    this.abilities[i].ability.name = capitilize(this.abilities[i].ability.name)
                }

                this.stats = resource[0].stats
                P.resource([
                    resource[0].species.url
                ]).then( resource2 => {
                    this.location = capitilize(resource2[0].habitat.name)
                    let baddesc = resource2[0].flavor_text_entries[0].flavor_text.split('\n')
                    this.desc = ""

                    for(let i = 0; i<baddesc.length; i++) {
                        if (i != 0) {
                            this.desc += " "
                        }
                        this.desc += baddesc[i]
                    }

                    baddesc = this.desc.split('\f')
                    this.desc = ""

                    for(let i = 0; i<baddesc.length; i++) {
                        if (i != 0) {
                            this.desc += " "
                        }
                        this.desc += baddesc[i]
                    }

                    for(let i = 0; i<resource2[0].genera.length; i++) {
                        if(resource2[0].genera[i].language.name == "en") {
                            this.specie = resource2[0].genera[i].genus
                        }
                    }
                })
            })
        }
    },
    computed: {
        idS() {
            return (1000 + this.id).toString().slice(-3)
        }
    },
    methods: {
        leave() {
            this.$emit('leave')
        },
        previous() {
            this.$emit('prev', this.id)
        },
        next() {
            this.$emit('next', this.id)
        }
    },
    template:
    /*html*/
    `
    <div class="bigContainer">
        <div class="prevButton lilContainer" @click="previous">&#8592</div>
        <div class="detailContainer lilContainer">
            <div class="pokeID"> #{{ this.idS }} </div>
            <div class="exitButton" @click="leave">X</div>
            <div class="bigContainer">
                <div class="lilContainer"><img :src="sprite" :alt="name" width="350"></div>
                <div class="lilContainer infos">
                    <div class="pokeSpecie"> The {{ this.specie }} </div>
                    <div class="pokeName"> {{ this.name }} </div>
                    <div> <b>Height:</b> {{ this.height }}m </div>
                    <div> <b>Weight:</b> {{ this.weight }}kg </div>
                    <div> <b>Abilities:</b>
                        <div v-for="ability in abilities"> {{ ability.ability.name }} </div>
                    </div>
                    <!-- <div> {{ this.stats }} </div>  v-for -->
                    <div> <b>Habitat:</b> {{ this.location }} </div>
                    <div class="dexEntry"> {{ this.desc }} </div>
                </div>
            </div>
        </div>
        <div class="nextButton lilContainer" @click="next">&#8594</div>
    </div>
    `
})