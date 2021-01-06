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
      acc[obj.dataValues.dataKey] = obj.dataValues.settings.initialValue
      if (obj.dataValues.settings.mappedFields) {
        obj.dataValues.settings.mappedFields.forEach((key) => {
          acc[key] = null
        })
      }
      return acc
    }, {})
  }

  async createLocationProps() {
    const properties = await this.getDefaultLocProps()
    for (const prop in this.sfProps) {
      prop === 'country'
        ? properties[prop] = this.countryMap[this.sfProps[prop]]
        : properties[prop] = this.sfProps[prop] ? this.sfProps[prop] : null
    }
    return properties
  }
}

module.exports = LocationPropertiesSeeder
