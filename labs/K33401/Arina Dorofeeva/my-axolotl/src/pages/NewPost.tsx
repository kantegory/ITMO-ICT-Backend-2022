import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../util/frontend"


const NewPost = () => {
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [text, setText] = useState("")
  const navigate = useNavigate()
  const submit = () => {
    api("/post", {
      method: "POST",
      body: {
        post: { title, link, text }
      }
    })
      .then(() => navigate("/"))
  }
  return (
    <>
      <input
        type="text"
        placeholder="Title"
        value={ title }
        onChange={ (e) => setTitle(e.target.value) }
      />
      <input
        type="text"
        placeholder="Link"
        value={ link }
        onChange={ (e) => setLink(e.target.value) }
      />
      <input
        type="text"
        placeholder="Text"
        value={ text }
        onChange={ (e) => setText(e.target.value) }
      />
      <button onClick={ submit }>Submit</button>
    </>
  )
}

export default NewPost
