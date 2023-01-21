import { Button, Container, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import React, { useState } from 'react'

export default function Home() {
  const [ymUrl, setYmUrl] = useState("")
  const [shareUrl, setShareUrl] = useState("")
  return (
    <Container maxWidth="xs">
      <Head>
        <title>YM Previewer for Twitter</title>
      </Head>
      <Typography>シェアしたいYouTube MusicのURLを入力してください</Typography>
      <TextField
        label="URL"
        value={ymUrl}
        onChange={(e) => {
          setYmUrl(e.target.value)
          setShareUrl(`https://ym-previewer.vercel.app/${e.target.value.slice(34)}`)
        }}
        multiline
        fullWidth
      />
      <Typography>こちらのURLをツイートに貼ってください</Typography>
      <Typography>{shareUrl}</Typography>
      <Button
        variant="contained"
        onClick={() => {
          try {
            navigator.share({ url: shareUrl })
              .catch((err: Error) => {
                if (process.env.NODE_ENV === "development") {
                  console.log(err)
                }
              })
          } catch (err) {
            if (process.env.NODE_ENV === "development") {
              console.log(err)
            }
          }
        }}
        fullWidth
      >
        シェア
      </Button>
    </Container>
  )
}
