import Head from "next/head"

type HeadWithOgpProps = {
  url: string
  title: string
  description: string
  imageUrl: string
}

const HeadWithOGP = ({ url, title, description, imageUrl }: HeadWithOgpProps) => {
  return (
    <Head>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} / >
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@yu_ko_ba" />
      <meta name="twitter:creator" content="@yu_ko_ba" />
      <title>{title}</title>
    </Head>
  )
}

export default HeadWithOGP
