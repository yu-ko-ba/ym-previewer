import axios from "axios"
import {parse} from "node-html-parser"

const fetchHtml = async () => {
  const res = await axios.get("https://music.youtube.com/watch?v=rxWahuuqsMs&feature=share")
  const dom = parse(res.data)

  return dom
}

export default fetchHtml
