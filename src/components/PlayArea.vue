<template>
    <div id='play-area'>
        <Playlist v-bind:tracks="playlist"/>
        <PlayBar v-bind:playing="playing"  />
    </div>
</template>

<script>
import Playlist from './Playlist';
import PlayBar from './PlayBar';

export default {
    name: 'PlayArea',
    components: {
        Playlist,
        PlayBar
    },
    props: ["playing", "playlist"]
}
</script>

<style scoped>
    #play-area{
        margin-bottom: 122px;
    }
</style>