import { getAPIBaseURL } from '../../Shared/Utils'

function getClaimActions (adjusterId) {
  const baseUrl = getAPIBaseURL()
  const url = `${baseUrl}/adjusters/${adjusterId}/claimactions?type=pinned`

  return fetch(url, {
    credentials: 'omit',
    mode: 'cors'
  }).then((response) => {
    return response.json()
  })
}

export { getClaimActions }
