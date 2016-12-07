function getClaimsList (adjusterId) {
  const baseUrl = 'http://app-d-polarisgatewayapi.azurewebsites.net/api/v0.1/Gateway/claimsbyadjuster'
  const url = `${baseUrl}/${adjusterId}/all`

  return fetch(url, {
    credentials: 'omit',
    mode: 'cors'
  }).then((response) => {
    return response.json()
  })
}

export { getClaimsList }
