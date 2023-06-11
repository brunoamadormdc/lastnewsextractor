<template>
  <div id="app">
    <Loading></Loading>
    <router-view/>
  </div>
</template>


<script>
import Loading from "./components/UI/Loading.vue";
export default {
  name: "App",
  components: {
    Loading,
  },
  created() {
    this.$store.dispatch("setStaticsites");
  }
};

</script>
<style lang="less">

h1,h2,h3,h4,h5,h6 {
  font-family: 'Poppins', sans-serif;
  font-weight: 800 !important;
  margin: 0;
  padding: 0;
  color:#0075fc;
  
}

button {
  outline:0px;
  padding:0.5em !important;
  border-radius:5px !important;
  border:0px;
  background-color:#0075fc;
  border: 2px solid #0075fc;;
  color:#fff !important;
  margin-top:0.3em !important;
  margin-bottom:0.3em !important;
  transition:all 0.3s ease-in-out;
  &:hover {
    background-color:#ffffff;
    color:#0075fc !important;
    border:2px solid #0075fc;
    transition:all 0.3s ease-in-out;
  }
}

h3, h4, h5, h6 {
  font-weight: 400 !important;
  color: #333333;
}

p, span, li, font, input, textarea, select, button, a {
  font-family: 'Poppins', sans-serif;
  font-size:0.8rem !important;
  font-weight: 500 !important;
  margin: 0;
  padding: 0;
  color:#333333
}

body {
   background-color:#f3f3f3 !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.loader,
.loader:before,
.loader:after {
  background: #ffffff;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader {
  color: #ffffff;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  position:fixed;
  left:50%;
  z-index:1001;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}

</style>
