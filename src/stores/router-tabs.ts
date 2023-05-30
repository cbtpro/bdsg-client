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

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useRouterTabsStore = defineStore('router-tabs-store', () => {
  const panes = ref<PageTabsItem[]>([])

  const activeKey = ref<string | undefined>(panes.value[0]?.key)

  const add = (option: { name: string; path: string; title: string }) => {
    const { name, path, title } = option
    const existTabIndex = panes.value.findIndex((pane) => pane.path === path)
    if (existTabIndex === -1) {
      panes.value.push({
        title: title || 'UnTitle',
        path,
        key: path,
        name
      })
    }
    activeKey.value = path
  }

  const router = useRouter()
  const remove = (targetKey: string) => {
    let lastIndex = 0
    panes.value.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    panes.value = panes.value.filter((pane) => pane.key !== targetKey)
    if (panes.value.length && activeKey.value === targetKey) {
      let panel
      if (lastIndex >= 0) {
        panel = panes.value[lastIndex]
      } else {
        panel = panes.value[0]
      }
      const { key, path } = panel
      activeKey.value = key
      router.push({
        path,
      })
    }
  }

  const onEdit = (targetKey: string) => {
    remove(targetKey as string)
  }
  return {
    activeKey,
    panes,
    add,
    remove,
    onEdit
  }
},
{
  persist: true,
})
