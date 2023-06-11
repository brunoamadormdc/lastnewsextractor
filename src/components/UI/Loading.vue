<template>
  <div v-if="getLoading.state">
    <div class="loader">Loading...</div>
    <div class="__loadingMessage" v-html="getLoading.message"></div>
    <div class="overlay"></div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Loading",
    computed: {
        ...mapGetters(["getLoading"]),
    },
}
</script>

<style lang="less" scoped>
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.803) !important;
  height: 110vh;
  top: -10vh;
  z-index:1000;
  
}
.__loadingMessage {
    position:fixed;
    width:100%;
    height:100%;
    display:flex;
    padding:3em;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    color:#fff;
    z-index:1003;
    text-transform:uppercase;
    font-size:1em;
    font-weight:700;
    text-shadow: 0px 0px 5px rgba(0,0,0,0.5);
}
</style>