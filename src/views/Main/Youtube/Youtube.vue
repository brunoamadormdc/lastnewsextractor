<template>
  <div id="Resume" ref="Resume">
    <Container>
        <Title :title="`Resumos de Vídeos do Youtube`" :subtitle="`Extraia resumos de vídeos do Youtube*`"></Title>
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

<style>

</style>