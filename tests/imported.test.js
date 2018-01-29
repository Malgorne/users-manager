import request from 'supertest';
import { OK, NOT_FOUND, BAD_REQUEST } from 'http-status';
import { expect } from 'chai';

let app;

function setApp(ap) {
  app = ap;
}

/**
 * Launch the test for the test.route.
 * @return { Function } Start the test.
 */
function test() {
  const name = 'toto';

  // Test a good url.
  describe('## GET /users-manager/imported/get', () => {
    it('should return OK and success: true', () => request(app)
      .get('/users-manager/imported/get')
      .expect(OK)
      .then(res => expect(res.text).to.equal(JSON.stringify({ success: true }))));
  });

  // Tests a good post route.
  describe('# POST /users-manager/imported/post', () => {
    it('should return OK and the name submitted', () => request(app)
    .post('/users-manager/imported/post')
    .send({ name })
    .expect(OK)
    .then(res => expect(res.text).to.equal(JSON.stringify({ name }))));
  });

  // Test a post without parameter.
  describe('# POST /users-manager/imported/post', () => {
    it('should return error 400', () => request(app)
    .post('/users-manager/imported/post')
    .expect(BAD_REQUEST)
    .then(res => expect(res.text).to.equal('A name is required.')));
  });

  // Test a post with a wrong parameter.
  describe('# POST /users-manager/imported/post', () => {
    it('should return error 400', () => request(app)
    .post('/users-manager/imported/post')
    .send({ lastName: 'Bob' })
    .expect(BAD_REQUEST)
    .then(res => expect(res.text).to.equal('A name is required.')));
  });

  // Test a wrong get url.
  describe('# GET /users-manager/imported/404', () => {
    it('should return error 404', () => request(app)
    .get('/users-manager/imported/404')
    .expect(NOT_FOUND));
  });

  // Test a wrong post url.
  describe('# POST /users-manager/imported/404', () => {
    it('should return error 404', () => request(app)
    .post('/users-manager/imported/404')
    .expect(NOT_FOUND));
  });
}

export default { test, setApp };
