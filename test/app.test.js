const chai = require('chai')
const chaiHttp = require('chai-http/index.js')
const app = require('../src')
const { expect } = chai

chai.use(chaiHttp)

describe('API Tests', () => {
  it('should return a status message', (done) => {
    chai
      .request(app)
      .get('/api/status')
      .end((err, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('message', 'Service is up and running!')
        done()
      })
  })
})
