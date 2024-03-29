import { Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import HeadWithOGP from '../components/HeadWithOGP'
import copyToClipboard from '../utils/copyToClipboard'
import fetchProperties from '../utils/fetchProperties'

export default function Home() {
  const [ymUrl, setYmUrl] = useState("")
  const [musicId, setMusicId] = useState("")
  const [shareUrl, setShareUrl] = useState("")
  return (
    <Container maxWidth="xs">
      <HeadWithOGP
        url='https://ym-previewer.vercel.app'
        title='YM previewer for Twitter'
        description='YouTube MusicのリンクをTwitterでカード表示するための中間サイトです'
        imageUrl='https://raw.githubusercontent.com/yu-ko-ba/ym-previewer/main/screenshot.png'
      />
      <Typography>TwitterでシェアしたいYouTube Musicの曲のリンクを入力してください</Typography>
      <TextField
        label="URL"
        value={ymUrl}
        onChange={(e) => {
          setYmUrl(e.target.value)
          const id = e.target.value.slice(34)
          setMusicId(id)
          setShareUrl(`${new URL(location.href).origin}/${id}`)
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
          onClick={async () => {
            const properties = await fetchProperties(shareUrl)
            let text = ""
            text += `Title：${properties.musicTitle}\n`
            text += "\n"
            text += "#Nowplaying\n"
            try {
              navigator.share({ url: shareUrl, text: text })
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
        <Button
          variant='contained'
          onClick={async () => {
            const url = new URL("https://twitter.com/intent/tweet")
            url.searchParams.append("url", shareUrl)
            const properties = await fetchProperties(shareUrl)
            let text = ""
            text += "#NowPlaying\n"
            text += `${properties.musicTitle}\n`
            text += "\n"
            text += `${properties.tags}\n`
            url.searchParams.append("text", text)
            location.assign(url)
            }}
          disabled={shareUrl === ""}
          fullWidth
        >
          ツイート
        </Button>
      </Stack>
    </Container>
  )
}
