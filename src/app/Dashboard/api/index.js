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

function getMetrics (adjusterId) {
  const baseUrl = getAPIBaseURL()
  const url = `${baseUrl}/adjusters/${adjusterId}/metrics`

  return fetch(url, {
    credentials: 'omit',
    mode: 'cors'
  }).then((response) => {
    return response.json()
  })
}

function getAppointments (adjusterId, startDate, endDate) {
  const baseUrl = getAPIBaseURL()
  const url = `${baseUrl}/adjusters/${adjusterId}/claims/appointments?startDate=${startDate}&endDate=${endDate}`

  return fetch(url, {
    credentials: 'omit',
    mode: 'cors'
  }).then((response) => {
    return response.json()
  })
}

export {
  getClaimActions,
  getMetrics,
  getAppointments
}
