const models = require('../models')
class LocationOnboardingForm {
  constructor(location) {
    this.location = location
    this.verticalMap = {
      'Self Storage': 'SS',
      'Multifamily Housing': 'MF',
      'Senior Living': 'SL'
    }
    this.sections = null
    this.form = null
    this.packageIds = null
    this.isCorporate = null
  }

  findPackageIds() {
    if (this.location.dataValues.packages.length === 0) { throw new Error('this location is not associated with any packages') }
    this.packageIds = this.location.dataValues.packages.map(p => p.salesforceId)
  }

  findVertical() {
    this.vertical = this.verticalMap[this.location.dataValues.properties.vertical]
  }

  corpStatus() {
    this.isCorporate = this.location.dataValues.properties.corp || false
  }

  async loadSections() {
    if (!this.packageIds) { throw new Error('packageIds must be set') }
    this.sections = await models.section.findAll({
      include: [
        {
          model: models.package,
          where: {
            salesforceId: {
              [models.Sequelize.Op.in]: this.packageIds
            }
          }
        },
        {
          model: models.subSection,
          include: [
            {
              model: models.field
            }
          ]
        },
        {
          model: models.field
        }
      ]
    })
  }

  filterEmptySections() {
    this.form = this.form.filter(s => s.fields.length !== 0)
  }

  filterFields(fields) {
    return fields.filter(f => f.dataValues.displayVertical.includes(this.vertical))
  }

  mapField (fields) {
    return fields.map((f) => {
      const { label, placeholder, inputType, required, settings, dataKey } = f
      return {
        label: label[this.vertical] || label.default,
        placeholder: placeholder ? (placeholder[this.vertical || placeholder.default]) : null,
        inputType,
        required,
        settings: this.fieldSettings(settings),
        dataKey
      }
    })
  }

  filterMapFields(fields) {
    const f = this.filterFields(fields)
    return this.mapField(f)
  }

  mapSections() {
    this.form = this.sections.map((section) => {
      const { name, priority, subSections, fields: f } = section
      // console.log({ fields })
      // return section
      const fields = this.filterMapFields(f)
      return {
        name: name[this.vertical] || name.default,
        priority,
        fields
      }
    })
  }

  fieldSettings(settings) {
    if (!settings) { return null }
    const s = {}
    const keys = Object.keys(settings)
    keys.forEach((k) => {
      s[k] = settings[k][this.vertical] || settings[k].default
    })
    return s
  }

  locationSettings() {
    this.findPackageIds()
    this.findVertical()
    this.corpStatus()
  }

  async build() {
    this.locationSettings()
    await this.loadSections()
    this.mapSections()
    this.filterEmptySections()
  }

  display () {
    return this.form
  }
}

module.exports = LocationOnboardingForm
