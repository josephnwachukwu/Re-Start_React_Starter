import APIJSON from '../../../../config/api.json'

export default function getAPIBaseURL () {
  return APIJSON.api.path
}
