<template>
  <div>
    <div style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">
      {{ post?.title }}
    </div>
    <div>
      {{ post?.body }}
    </div>

    <hr />

    Comments:
    <div>
      <div v-for="comment in post?.comments" style="margin-bottom: 4px; border: 1px solid #ccc; padding: 8px;">
        <div>{{ comment.name }}</div>
        <div>{{ comment.body }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAsyncData } from 'nuxt/app'
import type { Post } from '~/types'

const route = useRoute()

definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  }
})

const { $api } = useNuxtApp()
const postService = usePostService($api)

const { data: post } = await useAsyncData<Post>(() => postService.getDetail(Number(route.params.id)))
</script>
