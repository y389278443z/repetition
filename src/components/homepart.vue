<template>
  <div class="part">
    <repetition>
      <router-view name="repet"></router-view>
    </repetition>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'homepart'
}
</script>

<style scoped>
  .part{
    height:100%;
  }
</style>
