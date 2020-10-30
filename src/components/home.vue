<template>
  <div class="home">
    <p>这是主页面</p>
    <p @click="jumpTo" class="toList1">跳转到list1页面</p>
  </div>
</template>

<script>
export default {
    name: 'home',
  methods: {
    jumpTo () {
      this.$router.push({path:'/list/1'})
      console.log(this)
    }
  }
}
</script>

<style scoped>
  .home{
    height:100%;
    text-align: center;
    padding-top:100px;
    box-sizing:border-box;
  }
  .toList1{
    background:#23dbd1;
    display: inline-block;
    padding:5px 10px;
    color:#fff;
    margin:50px 0;
    cursor: pointer;
  }
</style>
