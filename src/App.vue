<template>
  <div id="app">
    <!-- <h1 v-myPlugins.erha = "msg"></h1> -->
    <indexVue></indexVue>
    <router-view></router-view>
    <footerVue v-show="$route.meta.show"></footerVue>
  </div>
</template>

<script>
import indexVue from './components/Header/index.vue'
import footerVue from './components/Footer/FooterIndex.vue'
export default {
  name: 'App',
  data() {
    return {
      msg: 'yjx'
    }
  },
  components: {
    indexVue,
    footerVue
  },
  mounted() {
    // categoryList
    this.$store.dispatch("getCategory");
  }
}
</script>

<style scoped>

</style>
