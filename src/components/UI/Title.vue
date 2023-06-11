<template>
  <div id="PageTitle">
    <h1>{{ title }}</h1>
    <h3>{{ subtitle }}</h3>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="less">
#PageTitle {
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  h3 {
    font-size: 1rem !important;
  }
}
</style>