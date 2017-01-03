import { getAPIBaseURL } from '../../Utils'

function setPinnedStatus (claimId, pinnedStatus) {
  const baseUrl = getAPIBaseURL()
  const url = `${baseUrl}/claims/${claimId}/pinnedstatus`

  return fetch(url, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pinnedStatus)
  }).then((response) => {
    return response.json()
  })
}

export { setPinnedStatus }
