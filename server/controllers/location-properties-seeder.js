const { map } = require('../config/section-seeder')
const models = require('../models')
class LocationPropertiesSeeder {
  constructor (props) {
    this.sfProps = props
    this.mappedValues = {
      country: { 'United States': 'US', Canada: 'CA' },
      vertical: {
        'Multifamily Housing': 'MF',
        'Senior Living': 'SL',
        'Self Storage': 'SS'
      }
    }
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
    const mapKeys = Object.keys(this.mappedValues)
    for (const prop in this.sfProps) {
      if (mapKeys.includes(prop)) {
        properties[prop] = this.mappedValues[prop][this.sfProps[prop]]
      } else {
        properties[prop] = this.sfProps[prop] ? this.sfProps[prop] : null
      }
    }
    return properties
  }
}

module.exports = LocationPropertiesSeeder
