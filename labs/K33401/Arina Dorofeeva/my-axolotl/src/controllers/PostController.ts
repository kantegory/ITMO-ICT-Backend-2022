import AppError, { handleGenericError } from "../errors"
import PostService from "../services/PostService"
import type { PostShape } from "../models/Post"
import type { Request, Response } from "express"
import Post from "../models/Post"

type ResponseOrError<T> = Response<T | AppError>
type JwtResponse = { jwt: string, jwtExpires: Date }

class PostController {
  private postService: PostService

  public constructor() {
    this.postService = new PostService()
  }

  public get = (req: Request, res: ResponseOrError<PostShape | PostShape[]>) => {
    const { id } = req.params
    const { search, favorites } = req.query
    const { user } = res.locals
    if (id) {
      return this.postService.get(Number(id))
        .then(post => res.status(200).send(post))
    } else {
      Promise.all([
        this.postService.get(),
        this.postService.getFavorites(user)
      ])
        .then(([all, fav]) => {
          let result = favorites ? fav as Post[] : all as Post[];
          if (search) {
            result = result.filter(post => 
              (post.title + post.text).toLowerCase().includes((search as string).toLowerCase()))
          }
          result = result
            .map(post => {
              (post as any).dataValues.favorite = fav.some(favPost => post.id === favPost.id)
              return post
            })
          res.status(200).send(result)
        })
        .catch(e => handleGenericError(res, e))
    }
  }

  public post = (req: Request, res: ResponseOrError<PostShape>) => {
    const { post }: { post: PostShape } = req.body
    this.postService
      .create(post)
      .then(post => res.status(200).send(post))
      .catch(e => handleGenericError(res, e))
  }

  public addFavorite = (req: Request, res: ResponseOrError<any>) => {
    const { user } = res.locals
    const { id: postId } = req.body
    this.postService
      .get(Number(postId))
      .then(post =>
        this.postService
          .addFavorite(user, post as Post)
          .then(() => res.status(200).send({}))
      )
  }
}

export default PostController
export type { JwtResponse }
