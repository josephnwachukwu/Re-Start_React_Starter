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

export {
  getClaimsList,
  setPinnedStatus
}
