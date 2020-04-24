import Vue from "vue";

export const store = Vue.observable({
    isSearchOpen: false,
    trackTemplate: {
        id: null,
        title: '',
        album: '',
        artist: '',
        time: 0,
        img: ''
    },
    playing: {
        id: 0,
        title: 'play title',
        album: 'play album',
        artist: 'play artist',
        time: 150000,
        img: 'test.png'
      },
      playlist: [],
      searchResults: [
        
      ],
      playTime: 0,
      isPaused: false
});

export const mutations = {
    toggleSearch() {
        store.isSearchOpen = !store.isSearchOpen;
    },
    togglePlay() {
        store.isPaused = !store.isPaused;
    },
    playNext() {
        store.playTime = 0;
        store.playing = store.playlist.shift();
        store.playing.inPlaylist = false;
        store.playing.isPlaying = true;
    },
    removeTrack(id){
        for(var track in store.playlist){
            if(store.playlist[track].id == id){
                store.playlist.splice(track,1);
                break;
            }
        }
    },
    incTimer(){
        if(store.playTime == store.playing.time){
            this.playNext();
        }
        if(!store.isPaused){
            store.playTime += 10;
        }
    },
    clearSearch(){
        store.searchResults = [];
    },
    translateResponse(response){
        console.log(response);
        for(var t = 0; t < response.data.data.length; ++t){
            this.addToSearch(response.data.data[t].id, response.data.data[t].title, response.data.data[t].album.title, response.data.data[t].artist.name, response.data.data[t].duration, response.data.data[t].album.cover_small);
        }
    },
    addToSearch(id, title, album, artist, time, img){
        var newSearchTrack = {
            id: null,
            title: '',
            album: '',
            artist: '',
            time: 0,
            img: ''
        };
        newSearchTrack.id = id;
        newSearchTrack.title = title;
        newSearchTrack.album = album;
        newSearchTrack.artist = artist;
        newSearchTrack.time = time * 1000;
        newSearchTrack.img = img;
        store.searchResults.push(newSearchTrack);
    }
}