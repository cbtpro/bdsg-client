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
import { useRouter } from 'vue-router'
import { useMainMenuStore } from '@/stores/main-menu'

const router = useRouter()
const navTo = (path: string) => {
  router.push({
    path,
  })
}

const mainMenuStore = useMainMenuStore()

</script>

<template>
  <a-menu
    theme="light"
    v-model:selectedKeys="mainMenuStore.selectedKeys"
    mode="inline"
  >
    <a-menu-item key="/" @click="navTo('/')">
      <span>
        <pie-chart-outlined />
        <span>首页</span>
      </span>
    </a-menu-item>
    <a-sub-menu key="task">
      <template #title>
        <span>
          <desktop-outlined />
          <span>作业</span>
        </span>
      </template>
      <a-menu-item key="/task/generating" @click="navTo('/task/generating')">
        <span> 生成数据 </span>
      </a-menu-item>
      <a-menu-item key="/task/template" @click="navTo('/task/template')">
        <span> 模板 </span>
      </a-menu-item>
    </a-sub-menu>
    <a-sub-menu key="settings">
      <template #title>
        <span>
          <setting-outlined />
          <span>设置</span>
        </span>
      </template>
      <a-menu-item key="/settings/system" @click="navTo('/settings/system')">
        <span> 系统设置 </span>
      </a-menu-item>
      <a-menu-item key="/settings/db-config" @click="navTo('/settings/db-config')">
        <span> 数据源配置 </span>
      </a-menu-item>
    </a-sub-menu>
    <a-menu-item key="/about" @click="navTo('/about')">
      <span>
        <desktop-outlined />
        <span>关于</span>
      </span>
    </a-menu-item>
  </a-menu>
</template>

<style scoped></style>
