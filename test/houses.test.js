const request = require('supertest');
const app= require('../index.js');


const objectToTest = {
    "address": "calle 57 #55-55",
    "city": "meta",
    "state": "meta",
    "size": 95,
    "type": "house",
    "zip_code": "012ds156316",
    "rooms": 6,
    "bathrooms": 5,
    "parking": "N/a",
    "price": 200000,
    "code": "ABCDe1234",
}


let houseId= "65f86fd457fce31184ed9bb";

// describe ('GET /house', () => {
//     it('respondes with statis 200', async () => {

//         //solicitud al get 
//         const response = await request(app).get('/house');
//         //verifica status
//         expect(response.status).toBe(200);
        
//     }),
//     it('respondes with an Object that contains an specific user"', async () => {
//         const response = await request(app).get('/house');
//         const objectToTest={
            
//             "_id": "65d63240987412bbf8ab4c0a",
//             "address": "calle 27 #5-55",
//             "city": "bogota",
//             "state": "cundinamarca",
//             "size": 95,
//             "type": "apartment",
//             "zip_code": "0156316",
//             "rooms": 6,
//             "bathrooms": 5,
//             "parking": "N/a",
//             "price": 200000,
//             "code": "ABCD1234",
//             "__v": 0
//         }
//         expect(Array.isArray(response.body)).toBe(true);
//         expect(response.body).toEqual(expect.arrayContaining([objectToTest]));
        
//     })
    
// })
// describe('POST /house', () => {
//     it('create a new house in the DB and response with the data', async () => {
//         const response = await request(app).post('/house').send(objectToTest)
//         /** Asignando el _id del usuario nuevo a la variable userId 
//          *  para ser usanda en las otras pruebas */
//         userId = response.body._id;

//         expect(response.statusCode).toBe(200)
//         expect(response.body).toHaveProperty('_id')
//         expect(response.body.address).toBe(objectToTest.address)
//         expect(response.body.zip_code).toBe(objectToTest.zip_code)
//         expect(response.body.size).toBe(objectToTest.size)
//     })
// })




describe('delete /house/:id', () => {
    it('Success delete with _id', async () => {        
        const response = await request(app).delete('/house/65f86fd457fce31184ed9bb0')
                                        
        await expect (response.statusCode).toBe(200)
        await expect(response.body.status).toBe("success")
    })
})