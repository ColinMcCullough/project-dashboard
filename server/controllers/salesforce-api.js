const jsforce = require('jsforce')
const util = require('../utilities/object')
const {
  SF_USERNAME: username,
  SF_PASSWORD: password,
  SF_TOKEN: token
} = process.env

/**
 * Salesforce connection class
 * @class SfApi
 * @extends {jsforce.Connection}
 */
class SfApi extends jsforce.Connection {
  /**
   *Creates an instance of SfApi.
   * @param { Object } params
   *  @param { string } params.username
   *  @param { string } params.password
   *  @param { string } params.token
   *  @param { string } params.loginUrl
   * @memberof SfApi
   */
  constructor(params) {
    if (SfApi._instance) {
      throw new Error('SfApi already has an instance!!!')
    }
    super(params)
    this.username = params.username
    this.password = params.password
    this.token = params.token
    this.loggedIn = false
    SfApi._instance = this
  }

  /**
   * Signs into SF
   * @returns { Promise }
   * @memberof SfApi
   */
  signIn() {
    return this.login(this.username, `${this.password}${this.token}`).then(() => { this.loggedIn = true })
  }

  /**
   * Signs into SF
   * @returns { Promise }
   * @memberof SfApi
   */
  signOut() {
    return this.logout().then(() => { this.loggedIn = false })
  }

  /**
   * Getter for Instance property loggedIn
   * @returns { Boolean }
   * @memberof SfApi
   */
  get isLoggedIn() {
    return this.loggedIn
  }

  /**
   * Setter for Instance property loggedIn
   * @param { Boolean }
   * @memberof SfApi
   */
  set isLoggedIn(param) {
    this.loggedIn = param
  }

  /**
   *
   *
   * @param {*} Id
   * @param {*} update
   * @returns
   * @memberof SfApi
   */

  updateAccount(Id, update) {
    return this.sobject('Account').update({
      Id,
      ...update
    })
  }

  /**
 *
 *
 * @param {*} where
 * @param {*} attributes
 * @returns
 * @memberof SfApi
 */
  findAccount(where, attributes) {
    return this.sobject('Account').find(where, attributes)
      .then(accounts => util.pick(accounts[0], attributes))
  }

  /**
   * find Project__c object
   *
   * @param {*} where
   * @param {*} attributes
   * @memberof SfApi
   */
  findProject(where, attributes) {
    return this.sobject('Project__c').find(where, attributes)
      .then(accounts => util.pick(accounts[0], attributes))
  }

  /**
   * find inspire1__Project__c
   *
   * @param {*} where
   * @param {*} attributes
   * @memberof SfApi
   */
  findInspireProject(where, attributes) {
    return this.sobject('inspire1__Project__c').find(where, attributes)
      .then(accounts => util.pick(accounts[0], attributes))
  }

  /**
   * find Location__c
   *
   * @param {*} where
   * @param {*} attributes
   * @memberof SfApi
   */
  findLocation(where, attributes) {
    return this.sobject('Location__c').find(where, attributes)
      .then(accounts => util.pick(accounts[0], attributes))
  }
}

module.exports = new SfApi({ username, password, token })
