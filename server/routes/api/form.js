
const models = require('../../models')
const sectionSeeder = require('../../config/section-seeder')
const sfApi = require('../../controllers/salesforce-api')
const LocationOnboardingForm = require('../../controllers/location-onboarding-form')
module.exports = (app) => {
  app.get('/api/v1/form/seed', async (req, res) => {
    const packageIds = sectionSeeder.map(s => s.packageIds.map(p => p.trim()))
    const dedupePackageIds = [...new Set(packageIds.flat())]
    if (!sfApi.isLoggedIn) {
      await sfApi.signIn()
    }
    const sfPackageMap = await sfApi.findPackagesByid(dedupePackageIds, ['Id', 'Name'])
      .then(packages => packages.map((p) => {
        const { Id, Name } = p
        return { salesforceId: Id.trim(), name: Name }
      }))
    await sfApi.signOut()
    const packageMap = []
    for (let i = 0; i < sfPackageMap.length; i++) {
      const p = sfPackageMap[i]
      const { salesforceId, name } = p
      const [dbPackage] = await models.package.findOrCreate({
        where: { salesforceId },
        defaults: {
          name,
          salesforceId
        }
      })
      packageMap.push(dbPackage)
    }
    for (let i = 0; i < sectionSeeder.length; i++) {
      const { packageIds, name, priority, fields } = sectionSeeder[i]
      console.log(fields)
      const packs = packageMap.filter(p => packageIds.includes(p.dataValues.salesforceId))
      const section = await models.section.create({ name, priority })
      await section.addPackages(packs)
      if (fields) {
        for (let j = 0; j < fields.length; j++) {
          const { recordLocation } = fields[j]
          const [recLoc] = await models.recordLocation.findOrCreate({
            where: { name: recordLocation },
            defaults: {
              name: recordLocation
            }
          })
          const field = await models.field.create({ recordLocationId: recLoc.dataValues.id, ...fields[j] })
          await section.addField(field)
        }
      }
    }
    res.json(sectionSeeder)
  })
  app.get('/api/v1/form/:locationProjectId', async (req, res) => {
    const { locationProjectId } = req.params
    const location = await models.location.findOne({
      where: {
        locationProjectId
      },
      include: [
        {
          model: models.package,
          attributes: ['salesforceId']
        }
      ]
    })

    const form = new LocationOnboardingForm(location)
    await form.build()
    res.json(form.display())
  })
}
