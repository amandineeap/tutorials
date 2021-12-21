<template>
    <div>{{error.message}} {{error.statusCode}}</div>
</template>

<script>
export default {
    head(){
        return {
            title: 'OUCH'
        }
    },
    props: {
        error: {
            type: Object,
            required: true
        }
    }
}
</script>