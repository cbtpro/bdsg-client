<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsSystemStore } from '@/stores/settings-system';

const collapsed = ref<boolean>(false)

const settingsSystemStore = useSettingsSystemStore()
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible theme="light">
      <MainLogo name="大数据模拟生成器" />
      <MainMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <MainPageTabs v-if="settingsSystemStore.isTabsMode" />
      </a-layout-header>
      <a-layout-content>
        <div class="container">
          <RouterView />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
.container {
  padding: 12px 24px;
  background: #fff;
  min-height: 360px;
}
</style>
