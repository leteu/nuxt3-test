import type { NitroFetchRequest, $Fetch } from 'nitropack'
import type { Post, Comment } from '~/types'

export const usePostService = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async get(page?: number): Promise<{ contents: Post[], total: number }> {
    let total = 0
    const posts = await fetch<Post[]>('/posts', {
      query: {
        _page: page ?? 1,
        _per_page: 10,
      },
      onResponse: (ctx) => {
        total = Number(ctx.response.headers.get('X-Total-Count'))
      }
    })

    return {
      contents: posts,
      total,
    }
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
  },
})
