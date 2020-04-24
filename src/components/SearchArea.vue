<template>
    <div class='search-area'>
        <transition name="slide">
            <div v-if="isOpen" class='search-area-panel' @mouseleave="toggleSearch">
                <input v-on:keyup.enter="runQuery" v-model="query" placeholder="search">
                <draggable :list="tracks" group="tracks">
                    <div v-bind:key="track.id" v-for="track in tracks">
                        <Track v-bind:track="track" v-bing:inPlaylit=false />
                    </div>
                </draggable>
            </div>
        </transition>
    </div>
</template>

<script>
import {store, mutations} from "../store";
import Track from "./Track";
import draggable from 'vuedraggable';
import axios from 'axios';

export default {
    name: 'SearchArea',
    props: ["tracks"],
    data(){
        return {
            query: ''
        }
    },
    methods: {
        toggleSearch(){
            mutations.toggleSearch();
        },
        runQuery(){
            mutations.clearSearch();
            axios({
                method: 'get',
                url: "https://deezerdevs-deezer.p.rapidapi.com/search",
                params: {
                    q: this.query,
                    limit: 7
                },
                headers: {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": "076cf08d31msh22c0a26cee49a48p15d01ajsn67abbf44b329"
                }
            }).then(response => {
                mutations.translateResponse(response);
            }).catch(function(error){
                console.log(error);
            })
        }
    },
    computed: {
        isOpen() {
            return store.isSearchOpen;
        }
    },
    components: {
        Track,
        draggable
    }
}
</script>

<style scoped>
    .slide-enter-active,
    .slide-leave-active
    {
        transition: transform 0.2s ease;
    }
    .slide-enter,
    .slide-leave-to {
        transform: translateX(100%);
        transition: all 150ms ease-in 0s
    }
    .search-area-panel{
        background-color: #a89d00;
        position: fixed;
        right:0;
        top:0;
        height: 100vh;
        width: 50%;
    }
</style>