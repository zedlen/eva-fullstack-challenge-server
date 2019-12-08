var supertest = require('supertest');

describe('UserController.login', () => {
  describe('#analiticMedicationsSearch()', () => {
    it('It should return a list of bookings with its explorations', (done) => {
      supertest(sails.hooks.http.app)
      .get('/analytics/consumedMedications')
      .query({
          date_start: '2019-11-01', 
          date_end: '2019-11-10', 
          clinic:'EXPLANADA',
          mode:'STRICT',
          medications:'["HORMONE_THERAPY","ANTIBIOTICS"]'
      })
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
      .expect(200,done);      
    });
  });

});