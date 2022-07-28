<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer/index.vue";
import Recommend from "./Recommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";
import { mapState } from "vuex";
export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //获取floor数据
    this.$store.dispatch("getFloorData");
    // //获取用户信息
    // this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>