import nock from "nock";
const scope = ()=>{nock("https://localhost")
     .post(`/register`, {
      user_name: 'user',
      password: 'user@gmail.com',
      role:"user"
    })
     .reply(200, {
       message:"user registered"
     });
}
    
     describe('New Service', () => {
      it('/user register', async () => {
        scope();
        
      });
    });