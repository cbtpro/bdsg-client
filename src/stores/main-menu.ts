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

const menuStoreageKey = 'menu-storage-key'
export const useMainMenuStore = defineStore('main-menu', () => {
  const selectedKeys = ref<string[]>(['home'])

  getItem(menuStoreageKey)
    .then(value => {
      if (value) {
        selectedKeys.value = JSON.parse(value as string)
      }
    })

  const switchMenuKeysHandle = (key: string) => {
    selectedKeys.value = [key]
    setItem(menuStoreageKey, JSON.stringify(selectedKeys.value))
  }

  return { selectedKeys, switchMenuKeysHandle }
})
