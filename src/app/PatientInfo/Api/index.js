import { getAPIBaseURL } from '../../Shared/Utils'

function getClaimActions (claimId, productLineId, statusId, startDate, endDate) {
  const baseUrl = getAPIBaseURL()
  let url = `${baseUrl}/claims/${claimId}/actions?`

  url = constructUrl(productLineId, 'productLineId', url)
  url = constructUrl(statusId, 'statusId', url)
  url = constructUrl([startDate], 'startDate', url)
  url = constructUrl([endDate], 'endDate', url)

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

function constructUrl (dataArray, fieldName, url) {
  if (dataArray) {
    dataArray.map((data) => {
      if (url.substr(url.length - 1) !== '&' &&
        url.substr(url.length - 1) !== '?') {
        url = url.concat('&')
      }

      url = url.concat(fieldName + '=' + data)
    })
  }

  return url
}

export {
  getClaimActions,
  getPatientInfo,
  getDropdownData
}
