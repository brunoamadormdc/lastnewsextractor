<template>
  <div class="home">
    <div class="overlay" v-if="loading"></div>
    <div class="loader" v-if="loading">Loading...</div>
    <div class="container">
      <div class="home__form">
        <h2>
          Procurar links nas páginas principais de sites
        </h2>
        <div class="home__form--items"><input type="text" v-model="formLink.busca" placeholder="Palavra chave..."></div>    
        <div class="home__form--items">
          <select v-model="formLink.tipo">
            <option v-for="(cat,key) in categorias" :key="key">{{cat.nome}}</option>
          </select>
          </div>
        <div class="home__form--items"><button @click="getLinks()">Enviar</button></div>
      </div>
     
    </div>

    <div class="container" v-if="lista.length > 0">
    <div class="buttonDownload">
      <download-excel :data="lista">
        Exportar Lista
        
      </download-excel>
    </div>

      <div class="home__listas">
          <div class="home__listas__content" v-for="(lis,key) in lista" :key="key">
            <div class="home__listas__content--site">{{lis.portal}}</div>
            <div class="home__listas__content--texto">{{lis.texto}}</div>
            <div class="home__listas__content--link"><a :href="lis.link" target="_blank"><img src="@/assets/link.png" /></a></div>
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
        'busca':'',
        'tipo':'portais',
      },
      categorias:[],
      lista:[]
    }
  },
  created(){
      this.mountCategorias()
  },
  methods:{
    async getLinks() {
      try {
        this.loading = true
        let obj = {
          'busca':this.formLink.busca,
          'tipo':this.formLink.tipo
        }
        const {data} = await postLinks('getlink',obj)
        this.lista = data.links
        this.loading = false
      }
      catch(e) {
        this.loading = false
        console.log(e)
      }
    },
    mountCategorias() {
       this.categorias = [
         {'nome':'portais'},
         {'nome':'games'},
         {'nome':'esportes'},
         {'nome':'politica'},
         {'nome':'cinema'},
         {'nome':'entretenimento'},
         {'nome':'tecnologia'},
         {'nome':'economia'}

       ]
    }
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

.home {
  .home__form{
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
    .home__form--items {
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
  .home__listas {
    display:flex;
    
    flex-direction: column;
    width:80%;
    margin:0 auto !important;
    margin-top:40px !important;
    .home__listas__content {
      display:flex;
      justify-content: space-between;
      margin-bottom:20px;
      padding:20px;
      border-radius:10px;
      background-color:rgb(255, 255, 255);
      .home__listas__content--site {
        width:200px;
        font-weight:bold;
      }
      .home__listas__content--texto {
        width:600px;
        text-align:left;
      }
      .home__listas__content--link {
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
