import nock from "nock";
export function scope (){nock("https://localhost")
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
}