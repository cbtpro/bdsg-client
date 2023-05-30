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
import { getItem, setItem } from '@/utils/localstorage'

const routeTabsStorageKey = 'router-tabs-storage-key'
const routerTabsPanelStorageKey = 'router-tabs-panel-storage-key'
export const useRouterTabsStore = defineStore('router-tabs-store', () => {
  const panes = ref<PageTabsItem[]>([])
  getItem(routerTabsPanelStorageKey).then(value => {
    if (value) {
      panes.value = JSON.parse(value as string)
    }
  })

  const activeKey = ref<string | undefined>(panes.value[0]?.key)
  getItem(routeTabsStorageKey).then((value) => {
    if (value) {
      activeKey.value = value as string
    }
  })

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
      setItem(routerTabsPanelStorageKey, JSON.stringify(panes.value))
    }
    activeKey.value = path
    setItem(routeTabsStorageKey, JSON.stringify(activeKey.value))
  }

  const remove = (targetKey: string) => {
    let lastIndex = 0
    panes.value.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1
      }
    })
    panes.value = panes.value.filter((pane) => pane.key !== targetKey)
    if (panes.value.length && activeKey.value === targetKey) {
      if (lastIndex >= 0) {
        activeKey.value = panes.value[lastIndex].key
      } else {
        activeKey.value = panes.value[0].key
      }
    }
    setItem(routeTabsStorageKey, activeKey.value)
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
})
