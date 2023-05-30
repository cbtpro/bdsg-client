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
import { nextTick, reactive } from 'vue'
import type { UnwrapRef } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { RouterMode } from '@/constants/settings-system'
import { useSettingsSystemStore } from '@/stores/settings-system'
import { useRouterTabsStore } from '@/stores/router-tabs'

interface FormState {
  routerMode: RouterMode
}

const store = useSettingsSystemStore()

const formState: UnwrapRef<FormState> = reactive({
  routerMode: store.routerMode,
})

const route = useRoute();
const router = useRouter();

const routerTabsStore = useRouterTabsStore()

const onRouterModeChange = () => {
  store.switchRouterModeHandler()
  const { name, path, meta: { title } } = route
  routerTabsStore.add({
    name: (name || title) as unknown as string,
    path,
    title: title as unknown as string 
  })
  nextTick(() => {
    router.push(route)
      .then(() => {
        routerTabsStore.activeKey = path
      });
  })
}

</script>

<template>
  <a-breadcrumb>
    <a-breadcrumb-item>设置</a-breadcrumb-item>
    <a-breadcrumb-item>系统配置</a-breadcrumb-item>
  </a-breadcrumb>
  <a-form layout="horizontal" :model="formState">
    <a-form-item label="路由模式">
      <a-radio-group
        v-model:value="formState.routerMode"
        @change="onRouterModeChange"
      >
        <a-radio-button :value="RouterMode.SinglePage">单页面</a-radio-button>
        <a-radio-button :value="RouterMode.TabsPage">多页面</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="less" scoped></style>
