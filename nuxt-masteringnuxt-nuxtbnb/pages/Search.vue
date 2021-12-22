<template>
    <div>
        {{ lat}} / {{ lng }} // {{ label }}

        <div v-for="home in homes" :key="home.objectID">{{home.title}}
        </div>
    </div>
</template>

<script>
export default {
    // data(){
    //     return {
    //         homes: [],
    //         label: '',
    //         lat: null,
    //         lng: null
    //     }
    // },
    // async beforeRouteUpdate(to, from, next){
    //     const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng)
    //     this.homes = data.json.hits
    //     this.label = to.query.label
    //     this.lat = to.query.lat
    //     this.lng = to.query.lng
    //     next()
    // }
    // BUG IN DEV?
    watchQuery: ['lat'],
     async asyncData({query, $dataApi}){ // there is no this in asyncData
        const data = await $dataApi.getHomesByLocation(query.lat, query.lng)

        return {
            homes: data.json.hits,
            label: query.label,
            lat: query.lat,
            lng: query.lng
        }
    }
}
</script>