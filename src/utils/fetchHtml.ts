import axios from "axios"
import {parse} from "node-html-parser"

const fetchHtml = async (url: string) => {
  const res = await axios.get(url)
  const dom = parse(res.data)

  return dom
}

export default fetchHtml
