const request = require('supertest');
const app= require('../index.js');

const objectToTest = {
    "id": 4515,
    "name": "Brandon",
    "lastname": "Purebas",
    "email": "bpruebas@correo.com",
    "password": "123546"
}


let userId="65d3b0a1cc50730077042317";
let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ0ZDBkOWM1YzY1OTcxZWM1MDVmMzEiLCJlbWFpbCI6InBydWViYWxAY29ycmVvLmNvbSIsImlhdCI6MTcwOTY3MTU3NCwiZXhwIjoxNzA5Njc1MTc0fQ.s7O_isfcRc2Givm-wVlfEnBtQljds_-bdITJATEJ37o";

// describe ('GET /', () => {
//     it('respondes with statis 200', async () => {

//         //solicitud al get 
//         const response = await request(app).get('/');
//         //verifica status
//         expect(response.status).toBe(200);
        
//     }),
//     it('respondes with text "hello world"', async () => {
//         const response = await request(app).get('/');
//         //verifica el texto
//         expect(response.text).toBe('Hello world');
//     })
//     it('respondes with an Object that contains an specific user"', async () => {
//         const response = await request(app).get('/user');
//         const objectToTest={
            
//                 "_id": "65d386a92013fcf85ef9b60d",
//                 "id": 56546,
//                 "name": "jean",
//                 "lastname": "cabeza",
//                 "email": "cabeza@correo.com",
//                 "password": "12345",
//                 "__v": 0,
//                 "avatar": "uploads\\1708458153860-RobloxScreenShot20231211_164938448.png"
         
//         }
//         expect(Array.isArray(response.body)).toBe(true);
//         expect(response.body).toEqual(expect.arrayContaining([objectToTest]));
        
//     })
    
// })
// describe('POST /user', () => {
//     it('create a new user in the DB and response with the data', async () => {
//         const response = await request(app).post('/user').send(objectToTest)
//         /** Asignando el _id del usuario nuevo a la variable userId 
//          *  para ser usanda en las otras pruebas */
//         userId = response.body._id;

//         expect(response.statusCode).toBe(200)
//         expect(response.body).toHaveProperty('_id')
//         expect(response.body.name).toBe(objectToTest.name)
//         expect(response.body.lastname).toBe(objectToTest.lastname)
//         expect(response.body.email).toBe(objectToTest.email)
//     })
// })


// describe('POST /login', () => {
//     it('Success login with email and password', async () => {        

//         const response = await request(app).post('/login').send(objectToTest)

//         token = response.body.token;
//         expect(response.statusCode).toBe(200)
//         expect(response.body).toHaveProperty('token')
//         expect(response.body.status).toBe("success")
//     })

//     it('Error login with email and password', async () => {
//         const user = {
//             "email": "pruebal@correo.com",
//             "password": "123546"
//         }

//         const response = await request(app).post('/login').send(user)

//         expect(response.statusCode).toBe(200)
//         expect(response.body).not.toHaveProperty('token')
//         expect(response.body.status).toBe("error")
//     })
// })

describe('POST /delete', () => {
    it('Success delete with _id', async () => {        
        const response = await request(app).delete('/user/'+ userId)
                                        .set('Authorization', 'Bearer ' + token)
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe("success")
    })
})

