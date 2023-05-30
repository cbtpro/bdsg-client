<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from '@/network'

defineProps<{
  msg: string
}>()

let userInfo = ref<IUserInfo | null>(null)
const getUserInfo = () => {
  return new Promise<IUserInfo>((resolve, reject) => {
    axios<IUserInfo>({
      url: '/user/get_user',
      method: 'GET'
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

onMounted(async () => {
  try {
    const user = await getUserInfo()
    userInfo.value = user
  } catch (error) {
    console.error('获取用户失败，error：', error)
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
    {{ userInfo }}
    <a-button type="primary">Primary Button</a-button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
