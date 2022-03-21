import nock from "nock";

  describe("mock api calls",() =>{
    it("register by user",  () => {
       
      // const app=require('./mockfunctions')
      // const response=app.scope()
      // console.log(response)
      nock("https://localhost")
     .post(`/register`, {
      user_name: 'user@gmail.com',
      password: 'user123',
      role:"user"
    })
     .reply(200, {
      body:{user_name: 'user@gmail.com',
      password: 'user123',
      role:"user"
     }});
    });
  }
  )  
