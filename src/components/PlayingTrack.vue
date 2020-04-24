<template>
    <div :style="progressBar" id='track'>
        <img width="108px" height="108px" :src="track.img">
        <h1 class='title'>{{track.title}}</h1>
        <h2 class='album'>{{track.album}}</h2>
        <h2 class='artist'>{{track.artist}}</h2>
        <button id="play-button" @click="togglePlay">
            <span v-if="isPaused" class="play-tri"></span>
            <span v-if="isPlaying" class="play-rect" id="rect-left"></span>
            <span v-if="isPlaying" class="play-rect" id="rect-right"></span>
        </button>        
        <button id="skip-button" @click="playNext">
            <span class="skip-tri" id="trione"></span>
            <span class="skip-tri" id="tritwo"></span>
        </button>
        <h2 class='time'>{{minutes}}:{{seconds}}</h2>
    </div>
</template>

<script>
import {mutations, store} from "../store";

export default {
    name: "PlayingTrack",
    props: ["track"],
    data() {
        return{
            progressBar: {
                backgroundImage: null
            }
        }
    },
    computed: {
        minutes() {
            return Math.floor(this.track.time / 60000);
        },
        seconds() {
            return (this.track.time / 1000) % 60;
        },
        isPlaying() {
            return !store.isPaused;
        },
        isPaused() {
            return store.isPaused;
        }
    },
    methods: {
        togglePlay() {
            mutations.togglePlay();
        },
        playNext() {
            mutations.playNext();
        },
        updateProgBar() {
            this.progressBar.backgroundImage = "linear-gradient(to right, #ab62a7 " + store.playTime / this.track.time * 100 + "%, #111111 " + store.playTime / this.track.time * 100 + "%)"
            if(store.playTime == this.track.time){
                mutations.playNext();
            }
            window.requestAnimationFrame(this.updateProgBar);
        }
    },
  mounted:function() {
    setInterval(() => {mutations.incTimer();}, 10);
  },
  created() {
      window.requestAnimationFrame(this.updateProgBar);
  }
}
</script>

<style scoped>
    #track{
        display: grid;
        grid-template-columns: 108px 50% 15% auto 108px;
        grid-template-rows: auto auto auto;
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
    #play-button{
        margin-right: 4px;
        margin-left: auto;
        grid-column: 3 / 4;
        grid-row: 1 / 4;
        height: 84px;
        width: 84px;
        background-color: transparent;
        margin-top:auto;
        margin-bottom:auto;
        border-radius: 100%;
        border-color: #ffffff;
        border-style: solid;
        border-width: 5px;
        padding: 0px;
    }
    #play-button:hover{
        background-color: #222222;
    }
    #play-button:active{
        background-color: #ffffff;
        border-color: #000000;
    }
    .play-tri{
        display: block;
        width: 0px;
        height: 0px;
        border-top: 25px solid transparent;
        border-left: 50px solid #0497e6;
        border-bottom: 25px solid transparent;
        margin: auto;
        margin-right: 6px;
    }
    .play-rect{
        display: block;
        background-color: transparent;
        border-left: 12px solid #0497e6;
        border-right: 12px solid #0497e6;
        height: 26px;
        width: 12px;
        margin: auto;
    }
    #skip-button{
        display: grid;
        grid-template-columns: auto 28px 45%;
        margin: 0px;
        height: 84px;
        width: 84px;
        background-color: transparent;
        margin-top:auto;
        margin-bottom:auto;
        border-radius: 100%;
        border-color: #ffffff;
        border-style: solid;
        border-width: 5px;
        grid-column: 4 / 5;
        grid-row: 1 / 4;
        padding: 0px;
        margin-left:4px;
    }
    .skip-tri{
        width: 0px;
        height: 0px;
        border-top: 15px solid transparent;
        border-left: 28px solid #0497e6;
        border-bottom: 15px solid transparent;
        margin-top:auto;
        margin-bottom:auto;        
    }
    #trione{
        grid-column: 2 / 3;
        grid-row: 1;
    }
    #tritwo{
        grid-column: 3 / 4;
        grid-row: 1;
        
    }
    #skip-button:hover{
        background-color: #222222;
    }
    #skip-button:active{
        background-color: #ffffff;
        border-color: #000000;
    }
    .time{
        text-align: center;
        margin: 1px;
        grid-column: 5 / 6;
        grid-row: 3 / 4;
    }
</style>