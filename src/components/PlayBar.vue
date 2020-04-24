<template>
    <div id='play-bar'>
        <PlayingTrack v-bind:track="playing"/>
    </div>
</template>

<script>
import PlayingTrack from './PlayingTrack';
export default {
    name: 'PlayBar',
    components: {
        PlayingTrack
    },
    props: ["playing"]
}
</script>

<style scoped>
    #play-bar{
        position:fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
    }
</style>