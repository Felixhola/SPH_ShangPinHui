<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startAndEnd.start > 1" @click="$emit('getPageNo',1)">1</button>
    <button v-if="startAndEnd.start > 2">···</button>

    <button
      v-for="(page, index) in startAndEnd.end"
      :key="index"
      v-if="page >= startAndEnd.start"
      @click="$emit('getPageNo',page)"
      :class="{active: page === pageNo}"
    >
      {{ page }}
    </button>

    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <button v-if="startAndEnd.end < totalPage" @click="$emit('getPageNo',totalPage)">{{ totalPage }}</button>
    <button @click="$emit('getPageNo',pageNo+1)" :disabled="pageNo === totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageSize", "pageNo", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续的页码的起始和结束位置
    startAndEnd() {
      //定义起始和结束的位置
      let start = 0;
      let end = 0;
      //计算出连续的页码的起始和结束位置
      //不正常情况
      if (this.totalPage < this.continues) {
        start = 1;
        end = this.totalPage;
      } else {
        //正常情况
        start = this.pageNo - Math.floor(this.continues / 2);
        end = this.pageNo + Math.floor(this.continues / 2);
        //边界情况
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return {
        start,
        end,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
