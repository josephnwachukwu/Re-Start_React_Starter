function getClaimActions (adjusterId) {
  const baseUrl = '//app-d-polarisgatewayapi.azurewebsites.net/api/v0.1/gateway/adjusters'
  const url = `${baseUrl}/${adjusterId}/claimactions?type=pinned`

  return fetch(url, {
    credentials: 'omit',
    mode: 'cors'
  }).then((response) => {
    return response.json()
  })
}

export { getClaimActions }
