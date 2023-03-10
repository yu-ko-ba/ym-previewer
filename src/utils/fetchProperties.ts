import fetchHtml from "./fetchHtml"
import PropertiesType from "./PropertiesType"

const fetchProperties = async (url: string): Promise<PropertiesType> => {
  const dom = await fetchHtml(url)
  const metas = dom.querySelectorAll("meta")

  let card: string = ""
  let title: string = ""
  let site: string = ""
  let player: string = ""
  let playerWidth: string = ""
  let playerHeight: string = ""
  let image: string = ""

  for await (const meta of metas) {
    const property = meta.attributes.property
    const name = meta.attributes.name
    const content = meta.attributes.content
    if (name === "twitter:card") {
      card = content
    }
    if (name === "twitter:title") {
      title = content
    }
    if (name === "twitter:site") {
      site = content
    }
    if (property === "og:url") {
      player = content
    }
    if (property === "og:image:width") {
      playerWidth = content
    }
    if (property === "og:image:height") {
      playerHeight = content
    }
    if (name === "twitter:image") {
      image = content
    }
  }

  return {
    card: card,
    title: title,
    site: site,
    player: player,
    playerWidth: playerWidth,
    playerHeight: playerHeight,
    image: image,
  }
}

export default fetchProperties
