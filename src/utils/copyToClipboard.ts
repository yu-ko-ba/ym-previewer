const copyToClipboard = (s: string) => {
  navigator.clipboard.writeText(s)
}

export default copyToClipboard
