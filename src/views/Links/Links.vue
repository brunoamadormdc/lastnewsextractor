<template>
  <div class="links">
    <div class="overlay" v-if="loading"></div>
    <div class="loader" v-if="loading">Loading...</div>
    <div class="container">
      <div class="links__form">
        <h2>
          Procurar links nas páginas principais de sites
        </h2>
        <div class="links__form--items"><input type="text" v-model="formLink.url" placeholder="Endereço com http:// ou https:// ..."></div>    
       
        <div class="links__form--items"><button @click="getLinks()">Enviar</button></div>
      </div>
     
    </div>

    <div class="container" v-if="lista.length > 0">
    <div class="buttonDownload">
      <download-excel :data="lista">
        Exportar Lista
        
      </download-excel>
    </div>

      <div class="links__listas">
          <div class="links__listas__content" v-for="(lis,key) in lista" :key="key">
            <div class="links__listas__content--site">{{lis.portal}}</div>
            <div class="links__listas__content--texto">{{lis.texto}}</div>
            <div class="links__listas__content--link"><a :href="lis.link" target="_blank"><img src="@/assets/link.png" /></a></div>
          </div>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import {postLinks} from '../../services/scrapper'

export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      loading:false,
      formLink:{
        'url':'',
      },

      lista:[]
    }
  },
  created(){

  },
  methods:{
    async getLinks() {
      try {
        this.loading = true
        let obj = {
          'url':this.formLink.url
        }
        const {data} = await postLinks('scrap/page',obj)
        this.lista = data.links
        this.loading = false
      }
      catch(e) {
        this.loading = false
        console.log(e)
      }
    },

  }
}
</script>
<style lang="less" >
.overlay {
  position:fixed;
  width:100%;
  height:100%;
  background-color:rgba(0, 0, 0, 0.603) !important;
  height:110vh;
  top:-10vh;
}

.links {
  .links__form{
    margin:0 auto !important;
    display:flex;
    justify-content: space-around;
    flex-direction: column;
    width:80%;
    align-items: center;
    margin-top:50px !important;
    h2 {
      font-size:20px;
    }
    .links__form--items {
      display:flex;
      width:100%;
      input[type=text], select {
        width:100%;
        display:block;
        background-color:#5bcdf6;
        border:0px;
        border-radius:5px;
        padding:10px;
        margin-bottom:10px;
      }
      button {
        border:0px;
        width:100%;
        padding:10px;
        border-radius:5px;
        font-weight:bold;
        font-size:20px;
        background-color:#020f14;
        color:#fff !important;
      }
    }
  }
  .links__listas {
    display:flex;
    
    flex-direction: column;
    width:80%;
    margin:0 auto !important;
    margin-top:40px !important;
    .links__listas__content {
      display:flex;
      justify-content: space-between;
      margin-bottom:20px;
      padding:20px;
      border-radius:10px;
      background-color:rgb(255, 255, 255);
      .links__listas__content--site {
        width:200px;
        font-weight:bold;
        font-size:14px;
      }
      .links__listas__content--texto {
        width:600px;
        text-align:left;
      }
      .links__listas__content--link {
        width:100px;
        img {
          width:30%;
        }
      }

    }
  }
}

.buttonDownload {
  div {
    cursor:pointer;
    text-transform:uppercase;
    width:80%;
    margin:0 auto !important;
    padding:10px;
    font-weight:bold;
    background-color:#5bcdf6;
    margin-top:20px !important;
  }

}
</style>
