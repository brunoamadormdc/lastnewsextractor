<template>
  <div id="Trends" ref="Trends">
    <Container>
        <Title :title="`Tendências`" :subtitle="`Veja as últimas tendências do Google Trends`"></Title>
    </Container>
   </div>
</template>

<script>
import Title from "../../../components/UI/Title.vue";
import Container from "../../../components/UI/Container.vue";
export default {
    components: { Title, Container },
}
</script>


<style lang="less" scoped>

</style>