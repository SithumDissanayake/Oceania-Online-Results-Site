import axios from 'axios'

const client = axios.create( {
	baseURL: process.env.VUE_APP_BASE_MEOS_MOP_URL,
	json: true
})

export default {
  async execute (method, resource, data) {
    return client({
      method,
      url: resource,
      data,
      headers: {}
    }).then(req => {
      return req.data
    })
  },
  getResultsScreen () {
    return this.execute('get', '/results-api.php')
  },
  getSplitResults (competitorId, radioId) {
    return this.execute('get', `/split-control-api.php?competitorId=${competitorId}&radioId=${radioId}`)
  },
  getOverallStandings () {
    return this.execute('get', `/standings-api.php`)
  },
  getLatestPunches () {
    return this.execute('get', `/latest-punches-api.php`)
  },
  getLatestPunchesForRadio (radioId) {
    return this.execute('get', `/latest-punches-api.php?radioId=${radioId}`)
  },
}