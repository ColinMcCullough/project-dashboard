module.exports = (models, sequelize, Sequelize) => {
  models.user.prototype.isAllowed = async function (neededRole) {
    // console.log('this', this)
    if (!this.dataValues.roles) { await this.addRoles() }
    const roles = this.dataValues.roles
      .filter(role => role.dataValues.type === 'GLOBAL')
      .map(role => role.dataValues.name)
    return roles.includes(neededRole)
  }

  models.user.prototype.addRoles = async function() {
    const { id } = this.dataValues
    const roles = await models.role.findAll({
      where: {
        userId: id
      }
    })
    this.dataValues.roles = roles
  }
}
