// Copyright 2023 Peter Chen
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { RouterMode } from '@/constants/settings-system'

export const useSettingsSystemStore = defineStore(
  'settings-system',
  () => {
    /** 路由模式 */
    const routerMode = ref<RouterMode>(RouterMode.SinglePage)

    /** 路由模式是tabs */
    const isTabsMode = computed(() => routerMode.value === RouterMode.TabsPage)

    /** 切换路由模式 */
    const switchRouterModeHandler = () => {
      if (routerMode.value === RouterMode.TabsPage) {
        routerMode.value = RouterMode.SinglePage
      } else {
        routerMode.value = RouterMode.TabsPage
      }
    }

    return {
      routerMode,
      isTabsMode,
      switchRouterModeHandler
    }
  },
  {
    persist: true
  }
)
