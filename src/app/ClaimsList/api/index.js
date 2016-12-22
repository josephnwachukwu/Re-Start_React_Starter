import { getAPIBaseURL } from '../../Shared/Utils'

function getClaimsList (adjusterId) {
  const baseUrl = getAPIBaseURL()
  const url = `${baseUrl}/adjusters/${adjusterId}/claims?type=all`

  return fetch(url, {
    credentials: 'omit',
    mode: 'cors'
  }).then((response) => {
    return response.json()
  })
}

export { getClaimsList }
