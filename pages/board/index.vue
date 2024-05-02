<template>
  <div>
    <div v-for="post in posts">
      <NuxtLink :to="{ path: `/board/${post.id}` }">
        {{ post.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAsyncData } from 'nuxt/app'
import type { Post } from '~/types'

const { $api } = useNuxtApp()
const postService = usePostService($api)

const { data: posts } = await useAsyncData<Post[]>(() => postService.get())
</script>
