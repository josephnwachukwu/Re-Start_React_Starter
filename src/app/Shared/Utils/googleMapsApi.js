// import { getAPIBaseURL } from '../../Shared/Utils'

const googleMapsApi = {
  getApiKey () {
    return Promise.resolve({
    // TODO: get official API key
    // DO NOT USE THIS KEY IN PRODUCTION! -- Richard Marks
      apiKey: 'AIzaSyCdNQmZAzFaO2mD7pgnmoE1zwao18ek1Ig'
    })
    // const baseUrl = getAPIBaseURL()
    // const url = `${baseUrl}/apiKeys?name=googlemaps`
    // return fetch(url, {
    //   credentials: 'omit',
    //   mode: 'cors'
    // }).then((response) => {
    //   return response.json()
    // })
  },

  getUrl (config, callback) {
    const { apiKey, libraries = [] } = config

    if (!apiKey) {
      throw new Error('Sorry, an apiKey is required to get a google maps url')
    }

    const params = {
      key: apiKey,
      libraries: libraries.join(','),
      callback,
      v: 3
    }

    const query = Object.keys(params)
      .filter(key => !!params[key])
      .map(objectKey => `${objectKey}=${params[objectKey]}`)
      .join('&')

    const rootUrl = 'https://maps.googleapis.com/maps/api/js'
    const url = `${rootUrl}?${query}`

    return url
  }
}

export default googleMapsApi
