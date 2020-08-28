const axios = require('axios');

const rightBody = {
    "token": "string",
    "sign": "string",
    "hallId": 31,
    "timeStamp": "2019-12-19T13:06:34.677Z",
    "transactions": [
        {
        "item": "0",
        "slotId": "1234567",
        "timeStamp": "2019-12-19T13:06:34.677Z",
        "currencyCode": "ARS",
        "denomination": 0.01,
        "isRectification": false,
        "requestId": 1,
        "deltaCi": "10000",
        "deltaCo": "5000",
        "deltaJp": "10"
        }
    ]
};

const wrongBody = {
    "token": "string",
    "sign": "string",
    "hallId": 31,
    "timeStamp": "2019-12-19T13:06:34.677Z",
    "transactions": [
        {
        //"item": "0",
        //"slotId": "1234567",
        "timeStamp": "2019-12-19T13:06:34.677Z",
        "currencyCode": "ARS",
        "denomination": 0.01,
        "isRectification": false,
        "requestId": 1,
        "deltaCi": "10000",
        "deltaCo": "5000",
        "deltaJp": "10"
        }
    ]
};

test('response structure', (done) => {
    const url = 'http://localhost:3000/0.0.1/netwin';
    callToApi(url, rightBody)
        .then(data => {
            expect(data).toEqual(
                expect.objectContaining({
                    code: expect.any(Number),
                    description: expect.any(String),
                })
            );
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        });
});

test('Campos enviados incorrectos. Faltan campos', (done) => {
    const url = 'http://localhost:3000/0.0.1/netwin';
    callToApi(url, wrongBody)
        .then(data => {
            expect(data).toEqual(
                expect.objectContaining({
                    code: "001",
                    message: "err.body.errors"
                })
            );
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        });
});

function callToApi(url, body) {
    return axios.post(url, body)
        .then(({ data }) => {
            return data;
        });
}