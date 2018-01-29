import request from 'supertest';
import { OK, NOT_FOUND } from 'http-status';
import { expect } from 'chai';

let app;

function setApp(ap) {
  app = ap;
}

/**
 * Launch the test for the init.route.
 * @return { Function } Start the test.
 */
function test() {
  // Test a good url.
  describe('## GET /users-manager/init-test', () => {
    it('should return OK', () => request(app)
      .get('/users-manager/init-test')
      .expect(OK)
      .then(res => expect(res.text).to.equal('OK')));
  });

  // Test a wrong url.
  describe('# GET /users-manager/404', () => {
    it('should return 404 status', () => request(app)
      .get('/users-manager/404-test')
      .expect(NOT_FOUND));
  });
}

export default { test, setApp };
