export default function constructUrl (dataArray, fieldName, url) {
  if (dataArray) {
    dataArray.map((data) => {
      if (url.substr(url.length - 1) !== '&' &&
        url.substr(url.length - 1) !== '?') {
        url = url.concat('&')
      }

      url = url.concat(fieldName + '=' + data)
    })
  }

  return url
}
