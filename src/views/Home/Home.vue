<template>
  <div class="home">
    <div class="overlay" v-if="loading"></div>
    <div class="loader" v-if="loading">Loading...</div>
    <Trends />
    <div class="container-fluid">
      <div class="container toggle_search">
        <button @click="selectSearch = true">Buscar em Portais</button>
        <button @click="selectSearch = false">Buscar por endereço</button>
      </div>
      <div class="home__form" v-if="selectSearch">
        <h2>Procurar links nas páginas principais de sites</h2>
        <div class="home__form--items">
          <input
            type="text"
            v-model="formLink.busca"
            placeholder="Palavra chave..."
          />
        </div>
        <div class="home__form--items">
          <select v-model="formLink.tipo">
            <option v-for="(cat, key) in categorias" :key="key" :value="cat.nome">
              {{ cat.label }}
            </option>
          </select>
        </div>
        <div class="home__form--items">
          <button @click="getLinks()">Enviar</button>
        </div>
      </div>

      <div class="home__form" v-else>
        <h2>Procurar link em uma página específica</h2>
        <div class="home__form--items">
          <input
            type="text"
            v-model="formLink.busca"
            placeholder="Palavra chave..."
          />
        </div>
        <div class="home__form--items">
          <input
            type="text"
            v-model="formLink.sitename"
            placeholder="Nome da página"
          />
        </div>
        <div class="home__form--items">
          <input
            type="text"
            v-model="formLink.link"
            placeholder="Link da página... Ex: https://www.google.com"
          />
        </div>
        <div class="home__form--items">
          <button @click="getSpecificlink()">Buscar</button>
        </div>
      </div>
    </div>

    <div class="container-fluid" v-if="lista.length > 0">
      <div class="home__listas">
        <div
          class="home__listas__content"
          v-for="(lis, key) in lista"
          :key="key"
        >
          <div class="home__listas__content--site">{{ lis.portal }}</div>
          <div class="home__listas__content--texto">{{ lis.texto }}</div>
          <div class="home__listas__content--link">
            <a :href="lis.link" target="_blank"
              ><img src="@/assets/link.png"
            /></a>
          </div>
        </div>
      </div>
      <div class="buttonDownload">
        <download-excel :data="lista"> Exportar Lista </download-excel>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { postLinks } from "../../services/scrapper";
import Trends from "../../components/googletrends.vue";
export default {
  name: "Home",
  components: {
    Trends,
  },
  data() {
    return {
      loading: false,
      selectSearch:false,
      formLink: {
        busca: "",
        tipo: "portais",
        link: "",
        sitename:''
      },
      categorias: [],
      lista: [],
    };
  },
  watch: {
    selectSearch() {
      this.lista = []
    }
  },
  created() {
    this.mountCategorias();
    this.$store.dispatch("getTrends", { country: "brazil" });
  },
  methods: {
    async getLinks() {
      this.lista = []
      try {
        this.loading = true;
        let obj = {
          busca: this.formLink.busca,
          tipo: this.formLink.tipo,
        };
        const { data } = await postLinks("scrap/getlink", obj);
        this.lista = data.links;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },

    async getSpecificlink() {
      this.lista = []
      try {
        this.loading = true;
        let obj = {
          busca: this.formLink.busca,
          page: {
            nome: this.formLink.sitename,
            link: this.formLink.link, 
          },
        };
        const { data } = await postLinks("scrap/scrap-unique", obj);
        this.lista = data.links;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },

    mountCategorias() {
      this.categorias = [
        { nome: "portais", label:'Portais' },
        { nome: "games", label:'Games' },
        { nome: "esportes", label:'Esportes' },
        { nome: "politica", label:'Política' },
        { nome: "cinema", label:'Cinema' },
        { nome: "entretenimento", label:'Entretenimento' },
        { nome: "tecnologia", label:'Tecnologia' },
        { nome: "economia", label:'Economia' },
      ];
    },
  },
};
</script>
<style lang="less" >
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.603) !important;
  height: 110vh;
  top: -10vh;
}

.home {
  .toggle_search {
    margin-top:30px;
    display:flex;
    justify-content:space-around;
    button {
      border:0px;
      outline:0px;
      background-color:#020f14;
      border-radius:5px;
      padding:10px;
      color:#fff;
      font-weight:bold;
    }
  }
  .home__form {
    margin: 0 auto !important;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    width: 80%;
    align-items: center;
    margin-top: 50px !important;
    h2 {
      font-size: 20px;
      text-transform: uppercase;
      font-weight: bold;
      margin-bottom: 30px;
    }
    .home__form--items {
      display: flex;
      width: 100%;
      input[type="text"],
      select {
        width: 100%;
        display: block;
        border: 1px solid rgb(216, 216, 216);
        -webkit-box-shadow: -1px 0px 5px -1px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: -1px 0px 5px -1px rgba(0, 0, 0, 0.15);
        box-shadow: -1px 0px 5px -1px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
      }
      button {
        border: 0px;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        font-weight: bold;
        font-size: 20px;
        background-color: #020f14;
        color: #fff !important;
      }
    }
  }
  .home__listas {
    display: flex;

    flex-direction: column;
    width: 80%;
    margin: 0 auto !important;
    margin-top: 40px !important;
    .home__listas__content {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      padding: 20px;
      border-radius: 10px;
      background-color: rgb(216, 216, 216);
      .home__listas__content--site {
        width: 200px;
        font-weight: bold;
      }
      .home__listas__content--texto {
        width: 600px;
        text-align: left;
      }
      .home__listas__content--link {
        width: 100px;
        img {
          width: 30%;
        }
      }
    }
  }
}

.buttonDownload {
  div {
    cursor: pointer;
    text-transform: uppercase;
    width: 80%;
    margin: 0 auto !important;
    padding: 10px;
    font-weight: bold;
    background-color: #5bcdf6;
    margin-top: 20px !important;
  }
}
</style>
