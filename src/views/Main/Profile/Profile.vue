<template>
    <div id="Profile" ref="Profile">
        <Container>
            <Title :title="`Perfil`" :subtitle="`Veja e edite suas informações`"></Title>
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

<style lang="less">

</style>