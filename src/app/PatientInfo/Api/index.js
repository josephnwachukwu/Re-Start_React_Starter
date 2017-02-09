import { getAPIBaseURL, constructURL } from '../../Shared/Utils'

function getClaimActions (claimId, productLineId, statusId, startDate, endDate) {
  const baseUrl = getAPIBaseURL()
  let url = `${baseUrl}/claims/${claimId}/actions?`

  url = constructURL(productLineId, 'productLineId', url)
  url = constructURL(statusId, 'statusId', url)
  url = constructURL([startDate], 'startDate', url)
  url = constructURL([endDate], 'endDate', url)

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

function getDropdownData () {
  const baseUrl = getAPIBaseURL()
  const url = `${baseUrl}/claims/resourceValues`

  return fetch(url, {
    credentials: 'omit',
    mode: 'cors'
  }).then((response) => {
    return response.json()
  })
}

export {
  getClaimActions,
  getPatientInfo,
  getDropdownData
}
