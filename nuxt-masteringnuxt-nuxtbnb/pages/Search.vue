<template>
    <div>
      Results for: {{ label }}<br/>
    <div style="height: 800px, width: 800px; float: right;" ref="map" class="map"></div>
    <div v-if="homes.length > 0">
        <nuxt-link v-for="home in homes" :key="home.objectID" :to="`/home/${home.objectID}`">
            <HomeRow :home="home" @mouseover="highlightMarker(home.objectId, true)" @mouseout="highlightMarker(home.objectId, false)"/>
        </nuxt-link>
    </div><div v-else>No results found.</div>
    </div>
</template>

<script>
export default {
    head(){
        return {
            title: `Homes around ${this.label}`
        }
    },
    mounted(){
        this.updateMap()
    },
    methods: {
        highlightMarker(homeId, isHighlighted){
            document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle('marker-highlight', isHighlighted)
        },
        updateMap(){
            this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers())
        },
        getHomeMarkers(){
            return this.homes.map( home => {
                return {
                    ...home._geoloc,
                    pricePerNight: home.pricePerNight,
                    id: home.objectID   
                }
            })
        }
    },
    async beforeRouteUpdate(to, from, next){
        const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng)
        this.homes = data.json.hits
        this.label = to.query.label
        this.lat = to.query.lat
        this.lng = to.query.lng
        this.updateMap()
        next()
    },
    async asyncData({query, $dataApi}){
        const data = await $dataApi.getHomesByLocation(query.lat, query.lng)
        return {
            homes: data.json.hits,
            label: query.label,
            lat: query.lat,
            lng: query.lng
        }
    }
    // BUG IN DEV?
    // watchQuery: ['lat'],
    //  async asyncData({query, $dataApi}){ // there is no this in asyncData
    //     const data = await $dataApi.getHomesByLocation(query.lat, query.lng)

    //     return {
    //         homes: data.json.hits,
    //         label: query.label,
    //         lat: query.lat,
    //         lng: query.lng
    //     }
    // }
}
</script>
<style>
.map-container{
    position: relative;
    margin-top: 200px;
}
.map{
    width: 100vw;
    height: 50vh;
}
.marker{
    background-color: white;
    border: 1px solid lightgrey;
    font-weight: bold;
    border-radius: 20px;
    padding: 8px;
}
.marker-highlight{
    color: white !important;
    background-color: black;
}
</style>