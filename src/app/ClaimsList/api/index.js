function getClaimsList (adjusterId) {
  const baseUrl = '//app-d-polarisgatewayapi.azurewebsites.net/api/v0.1/gateway/adjusters'
  const url = `${baseUrl}/${adjusterId}/claims?type=all`

  return fetch(url, {
    credentials: 'omit',
    mode: 'cors'
  }).then((response) => {
    return response.json()
  })
}

export { getClaimsList }
