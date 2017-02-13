import { getAPIBaseURL } from '../../Shared/Utils'

function getOrderForms (productCategory = null, product = null) {
  const baseUrl = getAPIBaseURL()
  const url = `${baseUrl}/orders/orderforms?productCategory=${productCategory}&product=${product}`

  return fetch(url, {
    credentials: 'omit',
    mode: 'cors'
  }).then((response) => {
    return response.json()
  })
}

export {
  getOrderForms
}
