<template>
    <div ref="playtrack" id='track'>
         <img width="108px" height="108px" :src="track.img">
         <h1 class='title'>{{track.title}}</h1>
         <h2 class='album'>{{track.album}}</h2>
         <h2 class='artist'>{{track.artist}}</h2>
         <button v-if="inPlaylist" id="remove-button" @click="removeTrack">
             X
         </button>
         <h2 class='time'>{{minutes}}:{{seconds}}</h2>
    </div>
</template>

<script>
//import {mutations, store} from "../store";
import {mutations} from "../store";
export default {
    name: "Track",
    props: ["track", "inPlaylist"],
    computed: {
        minutes() {
            return Math.floor(this.track.time / 60000);
        },
        seconds() {
            return (this.track.time / 1000) % 60;
        }
    },
    methods: {
        removeTrack() {
            mutations.removeTrack(this.track.id);
        }
    }
}
</script>

<style scoped>
    #track{
        display: grid;
        grid-template-columns: 108px 50% 15% auto 108px;
        grid-template-rows: 3;
        background-color: #111111;
        color: #dddddd;
        height: 108px;
        margin: 4px;
        border-color: #cccccc;
        border-style:solid;
        border-radius: 0px 30px 30px 0px;
    }
    img{
        margin: 0px;
        grid-column: 1 / 2;
        grid-row: 1 / 4;
    }
    .title{
        text-align: left;
        margin: 1px;
        grid-column: 2 / 3;
        grid-row: 1 / 2;
    }
    .album{
        text-align: left;
        margin: 1px;
        grid-column: 2 / 3;
        grid-row: 2 / 3;
    }
    .artist{
        text-align: left;
        margin: 1px;
        grid-column: 2 / 3;
        grid-row: 3 / 4;
    }
    #remove-button{
        margin: auto;
        grid-column: 5 / 6;
        grid-row: 1 / 3;
        width: 64px;
        height: 64px;
        background-color: transparent;
        border-radius: 100%;
        border-color: #777777;
        border-style: solid;
        border-width: 3px;
        font-size: 2.8em;
    }
    #remove-button:hover{
        background-color: #777777;
        border-color: transparent;
    }
    #remove-button:active{
        background-color: #cccccc;
        color: #e80400;
        border: none;
    }
    .time{
        text-align: center;
        margin: 1px;
        grid-column: 5 / 6;
        grid-row: 3 / 4;
    }
</style>