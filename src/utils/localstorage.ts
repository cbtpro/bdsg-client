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

import localforage from 'localforage'

localforage.config({
  name: 'bdsg-client',
})

const NeverExpiresFlag = -1

/**
 * 
 * @param k key
 * @param v value
 * @param expired 过期时间，-1为永不过期
 * @returns 
 */
export const setItem = (k: string, v: any, expired: number = -1) => {
  const expiredKey = `${k}__expires__`
  let exp = 0
  if (expired === -1) {
    exp = NeverExpiresFlag
  }
  if (expired !== undefined && expired >= 0) {
    exp += Date.now() + 1000 * 60 * expired
  }
  localforage.setItem(expiredKey, exp + '').catch(err => {
    console.log(err)
  })

  return localforage.setItem(k, v)
}

export const getItem = (k: string) => {
  const expiredKey = `${k}__expires__`
  return localforage
    .getItem<string | null>(expiredKey)
    .then(value => {
      if (Number.parseInt(value as string) === NeverExpiresFlag) {
        return localforage.getItem(k)
      }

      let expired = 0
      try {
        expired = parseFloat((expired as unknown) as string)
      } catch (e) {
        if (expired) {
          expired = Date.now() - 1000
        }
      }
      if (expired) {
        if (expired > Date.now()) {
          return localforage.getItem(k)
        }
      }
      // 过期
      removeItem(k)
      removeItem(expiredKey)
      return null
    })
    .catch(err => {
      console.log(err)
    })
}

export const removeItem = (k: string) => {
  return localforage.removeItem(k)
}
