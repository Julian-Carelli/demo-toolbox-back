const chai = require('chai')
const chaiHttp = require('chai-http/index.js')
const sinon = require('sinon')
const app = require('../../src')
const fileServices = require('../../src/services/fileServices')
const { expect } = chai

chai.use(chaiHttp)

describe('File Controllers', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('GET /data (Formatted Files)', () => {
    it('should return formatted files when successful', (done) => {
      const mockData = [{ file: 'file1.csv', lines: [] }]

      sinon.stub(fileServices, 'listFormattedFiles').resolves(mockData)

      chai
        .request(app)
        .get('/api/files/data')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.deep.equal(mockData)
          done()
        })
    })

    it('should return 500 if an error occurs', (done) => {
      sinon.stub(fileServices, 'listFormattedFiles').rejects(new Error('Something went wrong'))

      chai
        .request(app)
        .get('/api/files/data')
        .end((err, res) => {
          expect(res).to.have.status(500)
          expect(res.body).to.have.property('error', 'Something went wrong')
          done()
        })
    })
  })

  describe('GET /data?fileName=filename (Formatted File)', () => {
    it('should return formatted file when successful', (done) => {
      const mockData = [{ file: 'file1.csv', lines: [] }]

      sinon.stub(fileServices, 'listFormattedFiles').resolves(mockData)

      chai
        .request(app)
        .get('/api/files/data?fileName=file1.csv')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.deep.equal(mockData)
          done()
        })
    })

    it('should return 500 if an error occurs', (done) => {
      sinon.stub(fileServices, 'listFormattedFiles').rejects(new Error('Something went wrong'))

      chai
        .request(app)
        .get('/api/files/data?fileName=file1.csv')
        .end((err, res) => {
          expect(res).to.have.status(500)
          expect(res.body).to.have.property('error', 'Something went wrong')
          done()
        })
    })
  })

  describe('GET /list (Unformatted Files)', () => {
    it('should return unformatted files when successful', (done) => {
      const mockData = [{ file: 'file1.csv', lines: [] }]

      sinon.stub(fileServices, 'listUnformattedFiles').resolves(mockData)

      chai
        .request(app)
        .get('/api/files/list')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.deep.equal(mockData)
          done()
        })
    })

    it('should return 500 if an error occurs', (done) => {
      sinon.stub(fileServices, 'listUnformattedFiles').rejects(new Error('Something went wrong'))

      chai
        .request(app)
        .get('/api/files/list')
        .end((err, res) => {
          expect(res).to.have.status(500)
          expect(res.body).to.have.property('error', 'Something went wrong')
          done()
        })
    })
  })
})
