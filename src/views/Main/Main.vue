<template>
  <div id="Main" ref="Main">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <Sidebar></Sidebar>
        </div>
        <div class="col-md-10">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../components/UI/sidebar.vue";
export default {
  name: "Main",
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
#Main {
}
</style>