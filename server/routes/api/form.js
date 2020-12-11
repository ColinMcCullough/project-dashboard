
const models = require('../../models')
const fieldSeeder = require('../../config/fields-seeder')
const sectionSeeder = require('../../config/section-seeder')
const sfApi = require('../../controllers/salesforce-api')
module.exports = (app) => {
  app.get('/api/v1/form', async (req, res) => {
    // models.section.findA
    const body = await models.section.findAll({
      include: [
        {
          model: models.package,
          where: {
            salesforceId: 'a1b3l000007cMWPAA2'
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
    res.json(body)
  })
  app.get('/api/v1/form/seed', async (req, res) => {
    const packageIds = sectionSeeder.map(s => s.packageIds.map(p => p.trim()))
    const dedupePackageIds = [...new Set(packageIds.flat())]
    if (!sfApi.isLoggedIn) {
      console.log('Signing In')
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
      // const pack = dbPackage.toJSON()
      packageMap.push(dbPackage)
    }
    for (let i = 0; i < sectionSeeder.length; i++) {
      const { packageIds, name, priority, fields } = sectionSeeder[i]
      const packs = packageMap.filter(p => packageIds.includes(p.dataValues.salesforceId))
      const section = await models.section.create({ name, priority })
      await section.addPackages(packs)
      for (let j = 0; j < fields.length; j++) {
        const field = await models.field.create(fields[j])
        await section.addField(field)
      }
    }

    res.json(sectionSeeder)
    // const section = await models.section.create({ name: 'test' })
    // const field = await models.field.create({
    //   label: {
    //     default: 'Current Website'
    //   },
    //   placeholder: {},
    //   inputType: 'url',
    //   required: true,
    //   settings: {},
    //   displayVertical: ['MF', 'SS', 'SL'],
    //   displayOnCorp: true,
    //   displayOnlyOnCorp: false,
    //   bulkEditable: false,
    //   dataKey: 'current_website',
    //   isHub: false
    // })
    // const sfPackage = await models.package.findOne({ where: { id: 1 } })
    // await section.addPackage(sfPackage)
    // await section.addField(field)
    // res.sendStatus(200)
  })
}
