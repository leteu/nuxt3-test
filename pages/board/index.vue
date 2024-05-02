<template>
  <div>
    <div v-for="post in data!.contents" :key="post.id">
      <NuxtLink :to="{ path: `/board/${post.id}` }">
        {{ post.title }}
      </NuxtLink>
    </div>
    <hr />
    <div style="display: flex; gap: 4px">
      <div
        v-for="target in (data!.total / 10)"
        style="cursor: pointer"
        :class="{
          active: page === target,
        }"
        @click="getPage(target)"
      >
        {{ target }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAsyncData } from 'nuxt/app'
import type { Post } from '~/types'

const route = useRoute()
const router = useRouter()
const { $api } = useNuxtApp()
const postService = usePostService($api)

const page = ref(Number(route.query.page) || 1)

const { data } = await useAsyncData<{ contents: Post[]; total: number }>(() => postService.get(page.value))

async function getPage(target: number) {
  router.push({ query: { page: target } })
  page.value = target
  data.value = await postService.get(target)
}
</script>

<style scoped>
.active {
  color: blue;
  font-weight: bold;
}
</style>
