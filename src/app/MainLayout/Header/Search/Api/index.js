import { getAPIBaseURL } from '../../../../Shared/Utils'
import $ from 'jquery'

function getSearchResults (keyword, resultLimit) {
  const baseUrl = getAPIBaseURL()
  const url = `${baseUrl}/search?query=${keyword}&limit=${resultLimit}`

  // use ajax vs fetch so we can abort in-flight requests
  return $.ajax({
    url,
    crossDomain: true,
    dataType: 'json'
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
  getSearchResults,
  setPinnedStatus
}
