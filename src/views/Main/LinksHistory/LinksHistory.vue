<template>
  <div id="Links" ref="Links">
    <Container>
      <Title :title="title" :subtitle="subtitle"></Title>
      <div class="__listFilter">
        <input placeholder="Procurar..." type="text" v-model="listFilter" />
      </div>
      <Lista v-if="list.length > 0">
        <div class="__lista--item" v-for="lis in list" :key="lis.id">
          <div class="__lista--item--container">
            <i v-if="lis.list_resume != null" class="fa-solid fa-check __checked"></i>
            <div class="__lista--item--check" @click="removeFromlist(lis)">
              <i class="fa-solid fa-trash"></i>
              <!--  <i
                class="fa-solid fa-circle-check"
                :class="`${lis.markToexclude ? 'checked' : 'not_checked'}`"
              ></i> -->
            </div>

            <div class="__lista--item--site"><input type="text" :value="lis.portal" @change="changeLabel($event,lis)"/></div>
            <div class="__lista--item--texto" @click="toggleResume(lis.list_id)">
              {{ lis.texto }}
            </div>
            <div class="__lista--item--resume" @click="resumeFromList(lis)">
              <i title="Resumir" class="fa-solid fa-feather-pointed"></i>
            </div>
            <div class="__lista--item--link">
              <a title="Ir para o conteúdo" :href="lis.link" target="_blank"><i class="fa-solid fa-link"></i></a>
            </div>

          </div>
          <div class="__lista--item--container __resumeText" v-if="lis.list_resume_state">
            <div class="__lista--item--resumeText">
              <h3>Resumo da notícia</h3>
              <p v-html="lis.list_resume"></p>
            </div>
          </div>
        </div>
      </Lista>
    </Container>
  </div>
</template>
<script>
import MyWorker from 'worker-loader!@/workers/linkWorkers.js';
import Title from "../../../components/UI/Title.vue";
import Container from "../../../components/UI/Container.vue";
import Lista from "../../../components/UI/Lista.vue";
import { postLinks } from "../../../services/scrapper";
import { mapGetters } from "vuex";
export default {
  components: { Title, Container, Lista },
  data() {
    return {
      list: [],
      loading: false,
      listHistory: false,
      listFilter:'',
      title: "Histórico de Links salvos",
      subtitle:
        "Veja os links salvos anteriormente",
      linkWorker: new MyWorker(),
    };
  },

  computed: {
    ...mapGetters(["getLastResume", "getListStore"]),
  },
  watch: {
    listFilter(val) {
      
      this.linkWorker.postMessage({
        list: this.getListStore,
        filter: val,
      });
      this.linkWorker.onmessage = (e) => {
        this.list = e.data.list
      };
    }
  },
  mounted() {
    this.$store.dispatch("setLoadingclose");
    this.list = this.getListStore.length > 0 ? this.getListStore : [];
  },

  methods: {
    async resumeFromList(list) {
      if (list.list_resume != null) {
        this.toggleResume(list.list_id);
        return;
      }
      this.$store.dispatch("setLoading", {
        state: true,
        message:
          "Aguarde, estamos resumindo o conteúdo<nr>esse processo pode demorar...",
      });
      let resume = {
        url: list.link,
        prompt:
          "Faça um resumo deste conteúdo em até 5 linhas ou 250 caracteres",
      };
      try {
        const { data } = await postLinks("scrap/get_resume", resume);

        list.list_resume = data.resume;
        list.list_resume_state = true;

        this.$store.dispatch("setListStore", list);


        this.$store.dispatch("setLoadingclose");
      } catch (e) {
        this.$store.dispatch("setLoadingclose");
      }
    },

    /*     markChecked(list) {
      this.list = this.list.map((val) => {
        if (val.list_id == list.list_id) {
          val.markToexclude = !val.markToexclude;
        }
        return val;
      });
    },
 */
    changeLabel(event,list) {
      list.portal = event.target.value;
      this.$store.dispatch("editListstore", {...list});
    },
    removeFromlist(list) {
      
      let confirm = window.confirm(
        "Tem certeza que deseja remover este item da lista?"
      );
      
      if (!confirm) return;

      this.list = this.list.filter((val) => {
        return val.list_id != list.list_id;
      });

      this.$store.dispatch("removeListStore", list.list_id);
      
    },
    toggleResume(id) {
      this.list = this.list.map((val) => {
        if (val.list_id == id && val.list_resume != null) {
          val.list_resume_state = !val.list_resume_state;
        }
        return val;
      });
    },

    insertListID() {
      this.list = this.list.map((val) => {
        return {
          ...val,
          list_id: Math.random().toString(36).substr(2, 9),
          list_resume: null,
          list_resume_state: false,
          markToexclude: false,
        };
      });
    },
  },
};
</script>
    
<style lang="less">
.__linkButtons {
  position: absolute;
  display: flex;
  top: 1em;
  right: 1em;

  button {
    color: #0075fc !important;
    text-transform: uppercase;
    font-weight: bold !important;

    i {
      margin-right: 0.5em;
    }

    &.active {
      background-color: #0075fc !important;
      color: #fff !important;
      border: 1px solid #0075fc;
    }

    &.not_active {
      background-color: #ffffff;
      color: #0075fc;
      border: 1px solid #0075fc;
    }
  }
}
.__listFilter {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1em;
  margin-top: 1em;
  width:80%;
  margin-left: auto;
  margin-right: auto;
  input[type="text"] {
    width: 100%;
    padding: 0.8em;
    border: 1px solid #ccc;
    border-radius: 0.5em;
    margin: 1em;
    outline:0px;
  }
  button {
    margin-left: 1em;
  }
}
</style>