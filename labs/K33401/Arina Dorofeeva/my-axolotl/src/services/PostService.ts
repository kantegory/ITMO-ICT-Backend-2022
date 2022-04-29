import Post from "../models/Post"
import type { PostShape } from "../models/Post"
import User from "../models/User"

class PostService {
  public get(id?: number): Promise<Post> | Promise<Post[]> {
    if (id) {
      return Post.findByPk(id) as Promise<Post>
    } else {
      return Post.findAll()
    }
  }

  public create(postData: PostShape): Promise<Post> {
    return Post.create(postData)
  }

  public getFavorites(user: User): Promise<Post[]> {
    return user.getPosts()
  }

  public addFavorite(user: User, post: Post): Promise<void> {
    return user.addPost(post)
  }
}

export default PostService
