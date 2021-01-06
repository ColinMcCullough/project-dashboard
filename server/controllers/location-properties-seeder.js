const models = require('../models')
class LocationPropertiesSeeder {
  constructor (props) {
    this.sfProps = props
    this.countryMap = { 'United States': 'US', Canada: 'CA' }
  }

  async getDefaultLocProps() {
    const dataKeys = await models.field.findAll({
      attributes: ['dataKey', 'settings']
    })
    return dataKeys.reduce((acc, obj) => {
      console.log(obj)
      acc[obj.dataValues.dataKey] = obj.dataValues.settings.initialValue
      return acc
    }, {})
  }

  async createLocationProps() {
    const properties = await this.getDefaultLocProps()
    for (const prop in this.sfProps) {
      prop === 'country'
        ? properties[prop] = this.sfProps[prop] ? this.countryMap[this.sfProps[prop]] : 'US'
        : properties[prop] = this.sfProps[prop] ? this.sfProps[prop] : null
    }
    return properties
  }
}

module.exports = LocationPropertiesSeeder
