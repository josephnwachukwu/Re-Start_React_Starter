import { getAPIBaseURL } from '../../Shared/Utils'

function login (username, password) {
  const baseUrl = getApiBaseURL()
  const url = `${baseUrl}/login`
  
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        "username": username,
        "password": password
      })
    }).then((response) => {
    return response.json()
  })
}

function register (registerObj) {
  const baseUrl = getApiBaseURL()
  const url = `{baseUrl}/register`

  return fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({registerObj})
      .then((response) => {
        return response.json()
      })
  }
}


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
  login
}
