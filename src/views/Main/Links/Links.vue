<template>
  <div id="Links" ref="Links">
    <Container>
      <div class="__linkButtons">
        <button :class="`${listHistory ? 'active' : 'not_active'}`" @click="$router.push('/main/linkshistory')"
          class="__linkButtons--history">
          <i class="fa-solid fa-database"></i>
          <template v-if="!listHistory">Ver Links Salvos</template>
          <template v-if="listHistory">Procurar Links</template>
        </button>
      </div>
      <Title :title="title" :subtitle="subtitle"></Title>
      <Form :fields="formFields" @updateForm="updateForm" v-if="!listHistory"></Form>
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

            <div class="__lista--item--site">{{ lis.portal }}</div>
            <div class="__lista--item--texto" @click="toggleResume(lis.list_id)">
              {{ lis.texto }}
            </div>
            <div class="__lista--item--resume" @click="resumeFromList(lis)">
              <i title="Resumir" class="fa-solid fa-feather-pointed"></i>
            </div>
            <div class="__lista--item--link">
              <a title="Ir para o conteúdo" :href="lis.link" target="_blank"><i class="fa-solid fa-link"></i></a>
            </div>
            <div v-if="!listHistory" class="__lista--item--save" @click="saveTocloud(lis)">
              <i class="fa-solid fa-cloud-arrow-up"></i>
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
import Title from "../../../components/UI/Title.vue";
import Container from "../../../components/UI/Container.vue";
import Form from "../../../components/UI/Form.vue";
import { formFields } from "./form-fields";
import Lista from "../../../components/UI/Lista.vue";
import { postLinks } from "../../../services/scrapper";
import { mapGetters } from "vuex";
export default {
  components: { Title, Container, Form, Lista },
  data() {
    return {
      formFields: formFields,
      list: [],
      loading: false,
      listHistory: false,
      title: "Links",
      subtitle:
        "Extraia informações e resuma conteúdos de uma página específica",
    };
  },

  computed: {
    ...mapGetters(["getLastResume", "getListStore"]),
  },
  watch: {
    listHistory(val) {
      if (!val) {
        this.title = "Links";
        this.subtitle =
          "Extraia informações e resuma conteúdos de uma página específica";
        this.list = this.getLastResume.length > 0 ? this.getLastResume : [];
      } else {
        this.title = "Histórico de Links salvos";
        this.subtitle = "Veja os links salvos anteriormente";
        this.list = this.getListStore.length > 0 ? this.getListStore : [];
      }
    },
  },

  mounted() {
    this.$store.dispatch("setLoadingclose");
    this.list = this.getLastResume.length > 0 ? this.getLastResume : [];
  },

  methods: {
    async updateForm(form) {
      let send = { ...form };

      this.list = [];
      try {
        this.$store.dispatch("setLoading", {
          state: true,
          message: "Aguarde, estamos buscando os links...",
        });
        let obj = {
          busca: send["1"].value,
          page: {
            nome: send["2"].value,
            link: send["0"].value,
          },
        };
        const { data } = await postLinks("scrap/scrap-unique", obj);
        this.list = data.links;
        this.insertListID();
        this.cleanFields();
        this.$store.dispatch("setLastResume", this.list);
        this.$store.dispatch("setLoadingclose");
      } catch (e) {
        this.$store.dispatch("setLoadingclose");
        console.log(e);
      }
    },
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

        if (this.listHistory) this.$store.dispatch("setListStore", list);
        else this.$store.dispatch("setLastResume", this.list);

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
    removeFromlist(list) {
      let confirm = window.confirm(
        "Tem certeza que deseja remover este item da lista?"
      );
      if (!confirm) return;
      this.list = this.list.filter((val) => {
        return val.list_id != list.list_id;
      });
      if (this.listHistory)
        this.$store.dispatch("setArrayListStore", this.list);
      else this.$store.dispatch("setLastResume", this.list);
    },
    toggleResume(id) {
      this.list = this.list.map((val) => {
        if (val.list_id == id && val.list_resume != null) {
          val.list_resume_state = !val.list_resume_state;
        }
        return val;
      });
    },

    cleanFields() {
      this.formFields = this.formFields.map((val) => {
        return {
          ...val,
          value: "",
        };
      });
    },

    saveTocloud(list) {
      console.log(list);
      this.$store.dispatch("setListStore", list);
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
</style>