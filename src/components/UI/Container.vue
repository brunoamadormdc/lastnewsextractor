<template>
    <div id="Container" ref="Container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Container",
    props: {},
};

</script>

<style>
#Container {
    padding:2.0em;

}
</style>