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

const Music = ({title, site, player, image}: PropertiesType) => {
  const router = useRouter()
  useEffect(() => {
    router.push(player)
  }, [])
  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:site" content={site} />
        <meta name="twitter:image" content={image} />
      </Head>
      <p>YouTube Musicへリダイレクト中...</p>
    </>
  )
}

export default Music
