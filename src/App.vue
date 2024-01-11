<template>
  <div id="app">
    <Head></Head>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script setup>
import Head from '@/components/Head.vue'
import Foot from '@/components/Foot.vue'
</script>

<style>
@import 'assets/layui/css/layui.css';
@import 'assets/css/global.css';
@import 'assets/layui/css/modules/layer/default/layer.css';

#app {
  background-color: #f2f2f2;
}

.svg {
  position: relative;
  top: -5px;
}
</style>
