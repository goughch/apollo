<template>
    <div>
        <draggable :list="tracks" group="tracks">
            <div v-bind:key="track.id" v-for="track in tracks">
                <Track v-bind:track="track" v-bind:inPlaylist=true />
            </div>
        </draggable>
    </div>
</template>

<script>
import Track from './Track';
import draggable from 'vuedraggable';

export default {
    name: "Playlist",
    components: {
        Track,
        draggable
    },
    props: ["tracks"]
}
</script>

<style scoped>

</style>