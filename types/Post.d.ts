interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments?: Comment[];
}

interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export { Post, Comment }
