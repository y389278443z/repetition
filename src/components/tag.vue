<template>
  <div class="tag">
    <router-link to="/home" class="item-tag" :class="{active: this.$route.path == '/home'}">主页</router-link>
     <router-link :to="{path:tag.route.path,query:tag.route.query,fullPath:tag.route.fullPath}" class="item-tag"  v-for="tag in visitedView" :key="tag.path" :class="{active:isActive(tag)}">{{tag.title}} <span class="close" @click.stop.prevent="closeTag(tag)">×</span></router-link>
  </div>
</template>

<script>
export default {
  name: 'tag',
  methods: {
    closeTag (tag) {
      this.$store.commit('deleteViews', tag)
      if (this.visitedView.length === 0) {
        this.$router.push({path: '/home'})
      } else {
        let visit = this.visitedView[this.visitedView.length - 1]
        this.$router.push({path: visit.route.path})
      }
    },
    isActive (tag) {
      return tag.route.path === this.$route.path
    }
  },
  computed: {
    visitedView () {
      return this.$store.state.visitedView
    }
  }
}
</script>

<style scoped>
  a{text-decoration: none;color:#333;}
  .tag{
    position:absolute;
    top:20px;
    left:0;
    width:100%;
    height:30px;
    background:#000;
    color:#fff;
    text-align: left;
  }
  .item-tag{
    height:30px;
    line-height:30px;
    background:#999;
    padding: 0 12px;
    margin: 0 5px;
  }
  .item-tag.active{
    background:#fff;
  }
  .close{
    display: inline-block;
    padding:0 5px;
    height:20px;
    line-height:20px;
    color:#fff;
    margin-left:5px;
    background:red;
    cursor: default;
  }
</style>
