<template>
  <div class="home">
    <div class="bgUrlIcon"></div>
    <img :src="resolveTsStaticPath('/static/images/loc.jpg')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { resolveTsStaticPath } from '@/utils/common'

export default defineComponent({
  name: 'HomeView',
  setup() {
    return {
      resolveTsStaticPath,
    }
  },
})
</script>

<style lang="scss" scoped>
$prefix: '/static';

.bgUrlIcon {
  width: 40px;
  height: 40px;
  background-image: url($prefix+"/images/leida02.png");
  background-size: 100% 100%;
  background-color: blue;
  margin: 20px auto;
}
</style>
