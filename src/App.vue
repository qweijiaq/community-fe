<template>
  <div id="app">
    <gc-head></gc-head>
    <router-view></router-view>
    <gc-foot></gc-foot>
  </div>
</template>

<script setup>
import GcHead from '@/components/Head.vue'
import GcFoot from '@/components/Foot.vue'
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
