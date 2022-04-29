import { css } from "@emotion/react"
import { useState, useEffect, SetStateAction } from "react"
import { Link } from "react-router-dom"
import { PostShape, UserShape } from "../models/shapes"
import { api } from "../util/frontend"

const Home = ({
  username,
  setUser
}: {
  username: string,
  setUser: (user: SetStateAction<UserShape>) => void
}) => {
  const [posts, setPosts] = useState<PostShape[]>([])
  const [search, setSearch] = useState("")
  const [favorites, setFavorites] = useState(false)
  useEffect(() => {
    const favoritesQs = favorites && "favorites=" + favorites
    const searchQs = search && "search=" + search
    const url = "/post?" + [searchQs, favoritesQs].filter(qs => qs).join("&")
    api(url).then(posts => setPosts(posts))
  }, [search, favorites])
  const addFavorite = (id: number) => {
    api("/post/favorites", {
      method: "POST",
      body: { id }
    })
      .then(() => setPosts(posts.map(post => {console.log(post);return ({
        ...post,
        favorite: post.id === id ? true : post.favorite
      })})))
  }
  return (
    <>
      <div css={ css`
          display: flex;
        ` }>
        <div css={ css`
          display: flex;
          flex-direction: column;
        ` }>
          <input
            type="text"
            placeholder="Search"
            size={50}
            value={ search }
            onChange={ e => setSearch(e.target.value) }
          />
          <label>
            <input
              type="checkbox"
              checked={ favorites }
              onChange={ e => setFavorites(e.target.checked) }
            />
            Only favorites
          </label>
        </div>
        <div css={ css`
          margin-left: auto;
        ` }>
          <h2>
            Hi { username }!&nbsp;
            <a href="/" onClick={ () => {
              setUser({
                username: "",
                password: ""
              })
              document.cookie = document.cookie
                .split(";")
                .map(c => c.split("="))
                .map(([k, v]) => 
                  `${ k }=${ k === "jwt" ? "" : "expires" ? "Thu, 01 Jan 1970 00:00:01 GMT" : v }`)
                .join(";")
            } }>
              Log out
            </a>
          </h2>
          <h2>
            <Link to="/newPost">
              New post
            </Link>
          </h2>
        </div>
      </div>
      <div css={ css`
        display: flex;
      ` }>
        {
          posts
            ? posts.map(post => (
              <div key={ post.id } css={ css`
                width: 30%;
                & + & {
                  margin-left: 5%;
                }
              ` }>
                <div css={ css`
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 0.5em;
                ` }>
                  <h3 css={ css`
                    width: 80%;
                    margin: 0;
                    margin-block: 0;
                  ` }>{ post.title }</h3>
                  <h3 onClick={ () => !post.favorite && addFavorite(post.id as number) } css={ css`
                    margin: 0 0 0 auto;
                    margin-block: 0;
                    width: 1em;
                    color: gold;
                    cursor: ${ post.favorite ? "default" : "pointer" };
                  ` }>
                    { post.favorite ? "★" : "☆" }
                  </h3>
                </div>
                {
                  post.link && (
                    <img src={ post.link + "?" } crossOrigin="anonymous" css={ css`
                      width: 100%;
                    ` } />
                  )
                }
                {
                  post.text && (
                    <div>{ post.text }</div>
                  )
                }
              </div>
            ))
          : "Nothing here yet."
        }
      </div>
    </>
  )
}

export default Home
