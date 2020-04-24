<template>
  <div id="app">
    <div id="search-button-box">
      <button id="search-button" @click="toggleSearch">&#x1f50d;</button>
    </div>
    <PlayArea v-bind:playing="playing" v-bind:playlist="playlist" />
    <SearchArea v-bind:tracks="searchResults"/>
  </div>
</template>

<script>
import PlayArea from './components/PlayArea';
import SearchArea from './components/SearchArea';
import {store , mutations } from "./store.js";

export default {
  name: 'App',

  components: {
    PlayArea,
    SearchArea
  },
  computed: {
    isSearchOpen() {
      return store.isSearchOpen;
    },
    playing() {
      return store.playing;
    },
    playlist(){
      return store.playlist;
    },
    searchResults() {
      return store.searchResults;
    }
  },
  methods: {
    toggleSearch() {
      mutations.toggleSearch();
    },
  }
}
</script>

<style>
body {
  background-color: #000000;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #dddddd;
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  min-width: 900px;
}
#search-button-box {
  text-align: right;
}
#search-button {
  height: 64px;
  width: 64px;
  font-size: 32px;
  background-color: #111111;
  padding: 0px;
}
</style>
