const models = require('../models')
const { reject } = require('../utilities/object')
class LocationOnboardingForm {
  constructor (location) {
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

  findPackageIds () {
    if (this.location.dataValues.packages.length === 0) { throw new Error('this location is not associated with any packages') }
    this.packageIds = this.location.dataValues.packages.map(p => p.salesforceId)
  }

  findVertical () {
    this.vertical = this.verticalMap[this.location.dataValues.properties.vertical]
  }

  corpStatus () {
    this.isCorporate = this.location.dataValues.properties.corp || false
  }

  async loadSections () {
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
          model: models.subsection,
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

  filterEmptySections () {
    this.form = this.form.filter(s => !(s.fields.length === 0 && s.subsections.length === 0))
  }

  filterFields (fields) {
    return fields.filter(f => f.dataValues.displayVertical.includes(this.vertical))
  }

  mapField (fields) {
    return fields.map((f) => {
      const { label, placeholder, type, required, settings, dataKey, validation, component } = f
      return {
        label: label[this.vertical] || label.default,
        placeholder: placeholder ? (placeholder[this.vertical || placeholder.default]) : null,
        type,
        required,
        settings: this.fieldSettings(settings),
        dataKey,
        validation: (Object.keys(validation).length > 0 ? validation : null),
        component
      }
    })
  }

  filterMapFields (fields) {
    const f = this.filterFields(fields)
    return this.mapField(f)
  }

  mapSections () {
    this.form = this.sections.map((section) => {
      const { name, priority, subsections: s, fields: f, id } = section

      const fields = this.filterMapFields(f)
      const subsections = s.map((s) => {
        const { name, priority, fields: sf, id } = s
        const subFields = this.filterMapFields(sf)
        return {
          name: name[this.vertical] || name.default,
          priority,
          fields: subFields,
          id
        }
      })
        .filter(s => s.fields.length > 0)
      return {
        name: name[this.vertical] || name.default,
        priority,
        fields,
        subsections: subsections || [],
        id
      }
    })
  }

  fieldSettings(settings) {
    if (!settings) { return null }
    const s = {}
    const keepers = reject(settings, ['initialValue'])
    const keeperKeys = Object.keys(keepers)
    if (keeperKeys.length > 0) {
      keeperKeys.forEach((k) => {
        s[k] = settings[k][this.vertical] || settings[k].default
      })
    }
    return (Object.keys(s).length > 0) ? s : null
  }

  locationSettings () {
    this.findPackageIds()
    this.findVertical()
    this.corpStatus()
  }

  async build () {
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
