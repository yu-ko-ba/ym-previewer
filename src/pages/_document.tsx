import { Head, Html, Main, NextScript } from "next/document"
import React from "react"

const Document = () => {
  return (
    <Html lang="ja">
      <Head prefix="og: https://ogp.me/ns# website: https://ogp.me/ns/website# article: https://ogp.me/ns/article#">
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
