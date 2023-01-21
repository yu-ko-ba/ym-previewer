import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import React, { useState } from 'react'
import copyToClipboard from '../utils/copyToClipboard'

export default function Home() {
  const [ymUrl, setYmUrl] = useState("")
  const [shareUrl, setShareUrl] = useState("")
  return (
    <Container maxWidth="xs">
      <Head>
        <title>YM Previewer for Twitter</title>
      </Head>
      <Typography>TwitterでシェアしたいYouTube Musicの曲のリンクを入力してください</Typography>
      <TextField
        label="URL"
        value={ymUrl}
        onChange={(e) => {
          setYmUrl(e.target.value)
          setShareUrl(`https://ym-previewer.vercel.app/${e.target.value.slice(34)}`)
        }}
        margin="dense"
        multiline
        fullWidth
      />
      <Typography>こちらのURLをツイートに貼ってください</Typography>
      <Typography>{shareUrl}</Typography>
      <Stack spacing={2} direction="row">
        <Button
          variant="contained"
          onClick={() => {
            copyToClipboard(shareUrl)
          }}
          disabled={shareUrl === ""}
          fullWidth
        >
          コピー
        </Button>
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
          disabled={shareUrl === ""}
          fullWidth
        >
          シェア
        </Button>
      </Stack>
    </Container>
  )
}
