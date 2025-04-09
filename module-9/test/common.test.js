import * as chai from "chai";
import {default as chaiHttp, request} from "chai-http";
import { expect } from 'chai';
chai.use(chaiHttp)
let server = 'http://localhost:3800';
let userId

chai.use(chaiHttp)

describe('testing my rest API',()=>{
    it('should create the new user',(done)=>{
      request.execute(server)
      .post('/')
      .send({ name: 'Chandru', email: 'chandru@example.com', age: 25 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        userId = res.body._id;
        done();
      });
    })

    it('should get all the users', (done)=>{
        request.execute(server)
        .get('/')
        .end((err,res)=>{
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('array');
            done()
        })
    })

    it('should get particular user by id', (done)=>{
        request.execute(server)
        .get(`/${userId}`)
        .end((err,res)=>{
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('name');
            done() 
        })
    })

    it('should get user by query name', (done) => {
        request.execute(server)
          .get(`/user/search?name=Chandru`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
          });
      });

      it('should update user by id', (done) => {
        request.execute(server)
          .put(`/${userId}`)
          .send({age: 30 })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.age).to.equal(30);
            done();
          });
      });

      it('should delete user by id', (done) => {
        request.execute(server)
          .delete(`/${userId}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('should return 404 for non-existent user', (done) => {
        request.execute(server)
          .get(`/000000000000000000000000`)
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
})