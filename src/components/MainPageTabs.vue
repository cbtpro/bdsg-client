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
import { useRouterTabsStore } from '@/stores/router-tabs'
import { useMainMenuStore } from '@/stores/main-menu'
import type { Key } from 'ant-design-vue/es/table/interface';

const routerTabsStore = useRouterTabsStore()

const router = useRouter()
const mainMenuStore = useMainMenuStore()
const onTabChangeHandle = (key: Key | string) => {
  router.push({
    path: key as string
  })
  .then(() => {
    mainMenuStore.switchMenuKeysHandle(key as string)
  })

}

</script>

<template>
  <a-tabs
    v-model:activeKey="routerTabsStore.activeKey"
    type="editable-card"
    @edit="routerTabsStore.onEdit"
    :hideAdd="true"
    @change="onTabChangeHandle"
  >
    <a-tab-pane
      v-for="pane in routerTabsStore.panes"
      :key="pane.key"
      :tab="pane.title"
      :closable="routerTabsStore.panes.length > 1"
    />
  </a-tabs>
</template>

<style lang="less" scoped></style>
