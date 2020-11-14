const axios = require('axios')
const key = process.env.PLACES_API_KEY
class PlacesApi {
  /**
    *Creates an instance of PlacesApi.
    * @property {Object}  params - Object
    * @property {String}  params.address - Street Address
    * @property {String}  params.city - City name
    * @property {String}  params.state - State Name
    * @property {String}  params.zip - Postal Code
    * @property {String}  params.vertical - ss, sl, or mf
    * @property {Array}  params.types - array of strings. Must be google places api types https://developers.google.com/places/supported_types
    * @throws {Error} - if bad params
    * @memberof PlacesApi
   */
  constructor (params) {
    this.validateParams(params)
    this.address = params.address
    this.city = params.city
    this.state = params.state
    this.zip = params.zip
    this.key = key
    this.types = params.types
    this.vertical = params.vertical
    this.numberPlaces = 10
  }

  /**
   * Validataes constructor params
   * @param {Object} params
   * @throws {Error} - if bad params
   * @memberof PlacesApi
   */
  validateParams(params) {
    if (!params || !params.address || !params.city || !params.state || !params.zip) {
      throw new Error('invalid address')
    }
    if (!params.types || !Array.isArray(params.types) || !params.vertical) {
      throw new Error('missing constructor param')
    }
  }

  /**
   * Splits string on # returning first everything to the left
   * @returns {string}
   * @memberof PlacesApi
   */
  formatAddress() {
    return /#/g.test(this.address)
      ? this.address.split(/#/g)[0].trim()
      : this.address.trim()
  }

  /**
   * Returns object with lat and long keys for a given address
   * @returns {Object} - Object with Lat / Long properties
   * @memberof PlacesApi
   */
  async getLatLong() {
    const formattedAdd = this.formatAddress()
    const reqUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAdd}${this.city}${this.state}${this.zip}&key=${this.key}`
    const { data } = await axios.get(reqUrl)
    const lat = data.results[0].geometry.location.lat
    const long = data.results[0].geometry.location.lng
    return { lat, long }
  }

  /**
   * Get http
   * @param {string} url
   * @returns {Promise} - resolves to response or error Object
   * @memberof PlacesApi
   */
  fetch(url) {
    return axios.get(url)
  }

  /**
   * Call places API with each type in class property types
   * and returnd Array of business names of type string
   * @memberof PlacesApi
   * @return {Object} Object with properties for each places type holding
   * Array of business names of type string
   */
  async getPlaces() {
    const results = {}
    const { lat, long } = await this.getLatLong()
    if (lat && long) {
      for (let i = 0; i < this.types.length; i++) {
        const type = this.types[i]
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&types=${type}&rankby=distance&key=${this.key}`
        const { data } = await this.fetch(url)
        data.results.length > this.numberPlaces
          ? results[type] = data.results.slice(0, this.numberPlaces).map(val => val.name)
          : results[type] = data.results.map(val => val.name)
      }
    }
    return results
  }
}

module.exports = PlacesApi
