import { getAPIBaseURL } from '../../Shared/Utils'

function getClaimActions (claimId) {
  const baseUrl = getAPIBaseURL()
  const url = `${baseUrl}/claims/${claimId}/actions`

  return fetch(url, {
    credentials: 'omit',
    mode: 'cors'
  }).then((response) => {
    return response.json()
  })
}

function getPatientInfo (claimId) {
  const baseUrl = getAPIBaseURL()
  const url = `${baseUrl}/claims/${claimId}/info`

  return fetch(url, {
    credentials: 'omit',
    mode: 'cors'
  }).then((response) => {
    return response.json()
  })
}

export {
  getClaimActions,
  getPatientInfo
}
