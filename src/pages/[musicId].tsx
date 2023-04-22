import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import fetchProperties from "../utils/fetchProperties"
import PropertiesType from "../utils/PropertiesType"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const musicId = context.query.musicId as string
  const properties = await fetchProperties(`https://music.youtube.com/watch?v=${musicId}`)
  return {
    props: properties
  }
}

const Music = ({title, site, player, image, ogVideoTags}: PropertiesType) => {
  const router = useRouter()
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      router.push(player)
    }
  }, [])
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="YouTube Musicで再生する" />
        <meta name="twitter:site" content={site} />
        <meta name="twitter:image" content={image} />
        <meta name="music_title" content={title.slice(0, -16)} />
        <meta name="ym-previewer_tags" content={ogVideoTags.join("、")} />
      </Head>
      <p>YouTube Musicへリダイレクト中...</p>
    </>
  )
}

export default Music
