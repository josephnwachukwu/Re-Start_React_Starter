const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const head = document.getElementsByTagName('head')[0]
    const script = document.createElement('script')

    script.type = 'text/javascript'
    script.async = true
    script.onload = () => resolve()
    script.onerror = (error) => reject(error)
    script.src = url

    head.appendChild(script)
  })
}

export default loadScript
