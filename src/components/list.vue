<template>
  <div class="box">
    <ul class="side">
      <li @click="toList1">to list1</li>
      <li @click="toList2">to list2</li>
      <li @click="toList3">to list3</li>
    </ul>
    <ul class="list" ref="list" @scroll="scrollBox">
      <li v-for="item in 100" :key="item">{{name +'---'+ item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      name: '',
      scrollTop: 0,
      listId: ''
    }
  },
  methods: {
    toList1 () {
      this.$router.push({path:'/list/1'})
    },
    toList2 () {
      this.$router.push({path:'/list/2'})
    },
    toList3 () {
      this.$router.push({path:'/list/3'})
    },
    scrollBox () {
      this.scrollTop = this.$refs.list.scrollTop
    }
  },
  created () {
    let id = this.$route.params.listId
    this.name = 'list'+ id
    this.listId = id
  },
  activated () {
    if (this.scrollTop) {
      this.$refs.list.scrollTop = this.scrollTop
    }
  }
}
</script>

<style scoped>
  .box{height:100%;width:100%;overflow-y: auto;}
  .list{
    padding-top:60px;
    height:100%;
    overflow-y: auto;
  }
  .list li {
    padding:4px 0;
  }
  .side{
    width:150px;
    height:50%;
    position:absolute;
    top:100px;
    left:0;
    background: #000000;
  }
  .side li{
    padding:5px 10px;
    background:#23dbd1;
    color:#fff;
    margin: 50px 0;
    cursor:pointer;
  }
</style>
