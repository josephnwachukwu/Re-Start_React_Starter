import { getAPIBaseURL } from '../../Utils'
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

export {
  getSearchResults
}
