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
            types: [],
            abilities: [],
            stats: [],
            location: "",
            desc: "",
            specie: ""
        }
    },
    created() {
        this.fetchData()
    },
    watch: {
        id() {
            this.fetchData()
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
        },
        fetchData() {
            this.url = "https://pokeapi.co/api/v2/pokemon/" + this.id.toString() + "/"
            P.resource([
                this.url
            ]).then( resource => {
                this.name = capitilize(resource[0].name)
                this.sprite = resource[0].sprites.other["official-artwork"].front_default
                this.height = resource[0].height / 10.
                this.weight = resource[0].weight / 10.
                this.types = resource[0].types
                this.abilities = resource[0].abilities

                for(let i = 0; i<this.abilities.length; i++) {
                    this.abilities[i].ability.name = capitilize(this.abilities[i].ability.name)
                }

                this.stats = resource[0].stats
                P.resource([
                    resource[0].species.url
                ]).then( resource2 => {
                    if (resource[0].habitat){
                        this.location = capitilize(resource2[0].habitat.name)
                    }
    
                    this.desc = ''
                    let i = 0
                    while(i<resource2[0].flavor_text_entries.length && this.desc === '') {
                        if(resource2[0].flavor_text_entries[i].language.name == "en") {
                            this.desc = resource2[0].flavor_text_entries[i].flavor_text.replace('\n',' ').replace('\f','')
                        }
                        i++
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
    template:
    /*html*/
    `
    <div class="bigContainer">
        <div class="prevButton lilContainer clicker" @click="previous">&#8592</div>
        <div class="detailContainer lilContainer">
            <div class="pokeID"> #{{ this.idS }} </div>
            <div class="exitButton clicker" @click="leave">X</div>
            <div class="bigContainer">
                <div class="lilContainer imgType">
                    <img :src="sprite" :alt="name" width="350">
                    <div class="types-container">
                        <div v-for="t in types" class="types" :class="t.type.name"> {{ t.type.name }} </div>
                    </div>
                </div>
                <div class="lilContainer infos">
                    <div v-if="this.specie" class="pokeSpecie"> The {{ this.specie }} </div>
                    <div v-if="this.name" class="pokeName"> {{ this.name }} </div>
                    <div v-if="this.height"> <b>Height:</b> {{ this.height }}m </div>
                    <div v-if="this.weight"> <b>Weight:</b> {{ this.weight }}kg </div>
                    <div v-if="this.abilities != []"> <b>Abilities:</b>
                        <div v-for="ability in abilities"> {{ ability.ability.name }} </div>
                    </div>
                    <!-- <div> {{ this.stats }} </div>  v-for -->
                    <div v-if="this.location"> <b>Habitat:</b> {{ this.location }} </div>
                    <div  v-if="this.desc" class="dexEntry"> {{ this.desc }} </div>
                </div>
            </div>
        </div>
        <div class="nextButton lilContainer clicker" @click="next">&#8594</div>
    </div>
    `
})