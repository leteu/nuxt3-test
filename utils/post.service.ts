import type { NitroFetchRequest, $Fetch } from 'nitropack'
import type { Post, Comment } from '~/types'

export const usePostService = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async get(): Promise<Post[]> {
    return fetch<Post[]>('/posts/')
  },

  async getDetail(id: number): Promise<Post> {
    const [post, comments] = await Promise.all([
      fetch<Post>(`/posts/${id}`),
      fetch<Comment[]>(`/posts/${id}/comments`),
    ])

    return {
      ...post,
      comments,
    }
  }
})
