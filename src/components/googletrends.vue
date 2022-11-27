<template>
  <div class="__trendsContainer">
    <div class="__iconTrends" @click="show_trends = !show_trends">
      <img src="@/assets/trending.png" />
    </div>
    <div class="__trends" v-if="show_trends">
      <select v-model="changetrend">
        <option
          v-for="(country, key) in countries"
          :key="key"
          :value="country.value"
        >
          {{ country.name }}
        </option>
      </select>
      <template v-for="(t, key) in trends">
        <span :key="key"> {{ key + 1 }} - {{ t }} </span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changetrend: "brazil",
      show_trends: false,
      countries: [
        { name: "Brasil", value: "brazil" },
        { name: "Estados Unidos", value: "united_states" },
        { name: "Reino Unido", value: "united_kingdom" },
        { name: "Canadá", value: "canada" },
        { name: "México", value: "mexico" },
        { name: "Argentina", value: "argentina" },
        { name: "Alemanha", value: "germany" },
        { name: "Portugal", value: "portugal" },
      ],
    };
  },
  watch: {
    changetrend(val) {
      this.$store.dispatch("getTrends", { country: val });
    },
  },
  computed: {
    trends() {
      return this.$store.getters.getTrends;
    },
  },
};
</script>

<style lang="less" scoped>
.__trendsContainer {
  .__iconTrends {
    position:fixed;
    display:flex;
    align-items:center;
    justify-content: center;
    width:50px;
    height:50px;
    background-color:rgb(216, 216, 216);
    border-radius:50%;
    top:10px;
    left:10px;
    cursor:pointer;
    img {
      width:30px;
    }
  }
  .__trends {
  position: fixed;
  display: flex;
  width: 300px;
  flex-direction: column;
  padding: 20px;
  background-color: rgb(216, 216, 216);
  top: 70px;
  border-radius: 10px;
  select {
    padding:10px;
    border-radius:5px;
    margin-bottom:20px;
    outline:0px;
  }
  span {
    font-size: 14px;
    text-align: left;
  }
}
}

</style>