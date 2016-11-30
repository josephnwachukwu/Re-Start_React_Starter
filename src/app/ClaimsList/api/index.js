async function getClaimsList (adjusterId) {
  const baseUrl = 'http://app-d-polarisgatewayapi.azurewebsites.net/api/Gateway/claimsbyadjuster'
  const url = `${baseUrl}/${adjusterId}/All`

  return await fetch(url, {
  })
}

export { getClaimsList }
