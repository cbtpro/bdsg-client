<!--
 Copyright 2023 Peter Chen
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<script setup lang="ts">
import { toRefs } from 'vue'
interface Props {
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: '请传入应用名称'
})
const { name } = toRefs(props)

import logo from '@/assets/vue.png'
</script>

<template>
  <div class="logo">
    <a-image width="32px" :src="logo" :preview="false" />
    <span class="name">{{ name }}</span>
  </div>
</template>

<style lang="less" scoped>
.logo {
  height: 32px;
  margin: 16px;
  /* background: rgba(255, 255, 255, 0.3); */
  color: #fff;
  overflow: hidden;
  .name {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    // transition: width 1s;
  }
}
</style>
