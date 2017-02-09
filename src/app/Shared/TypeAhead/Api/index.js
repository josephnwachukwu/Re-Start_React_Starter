import { getAPIBaseURL } from '../../../Shared/Utils'
import $ from 'jquery'

function getSearchResults (keyword, fieldName) {
  const baseUrl = getAPIBaseURL()
  const url = `${baseUrl}/orders/fieldSearch?fieldName=${fieldName}&query=${keyword}`

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
