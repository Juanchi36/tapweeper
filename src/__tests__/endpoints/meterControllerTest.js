//jest.setTimeout(10000);
const axios = require('axios');
const configJson = require('../../../config.json');
const ip = configJson.envData[configJson.env].ip;

const rightBody = {
    "token": "string",
    "sign": "string",
    "hallId": 31,
    "timeStamp": "2019-12-19T13:06:34.677Z",
    "transactions": [
        {
            "slotId": "1234567",
            "timeStamp": "2019-12-19T13:06:34.677Z",
            "currencyCode": "ARS",
            "denomination": 0.01,
            "isRectification": false,
            "requestId": 1,
            "item": "0",
            "billMeters": [
                {
                    "id": 100,
                    "quantity": 10
                },
                {
                    "id": 200,
                    "quantity": 10
                }
            ],
            "gameMeters": {
                "ci": "800000",
                "co": "100000",
                "jp": "1000",
                "ca": "10000",
                "cc": "500",
                "cxb": "800000",
                "drop": "1000",
                "jj": "1000",
                "tci": "800000",
                "tco": "101000"
            }
        }
    ]
};

const bodyWithoutHallId = {
    "token": "string",
    "sign": "string",
    "timeStamp": "2019-12-19T13:06:34.677Z",
    "transactions": [
        {
            "slotId": "1234567",
            "timeStamp": "2019-12-19T13:06:34.677Z",
            "currencyCode": "ARS",
            "denomination": 0.01,
            "isRectification": false,
            "requestId": 1,
            "item": "0",
            "billMeters": [
                {
                    "id": 100,
                    "quantity": 10
                },
                {
                    "id": 200,
                    "quantity": 10
                }
            ],
            "gameMeters": {
                "ci": "800000",
                "co": "100000",
                "jp": "1000",
                "ca": "10000",
                "cc": "500",
                "cxb": "800000",
                "drop": "1000",
                "jj": "1000",
                "tci": "800000",
                "tco": "101000"
            }
        }
    ]
};

const slotIdInteger = {
    "token": "string",
    "sign": "string",
    "timeStamp": "2019-12-19T13:06:34.677Z",
    "transactions": [
        {
            "slotId": 1234567,
            "timeStamp": "2019-12-19T13:06:34.677Z",
            "currencyCode": "ARS",
            "denomination": 0.01,
            "isRectification": false,
            "requestId": 1,
            "item": "0",
            "billMeters": [
                {
                    "id": 100,
                    "quantity": 10
                },
                {
                    "id": 200,
                    "quantity": 10
                }
            ],
            "gameMeters": {
                "ci": "800000",
                "co": "100000",
                "jp": "1000",
                "ca": "10000",
                "cc": "500",
                "cxb": "800000",
                "drop": "1000",
                "jj": "1000",
                "tci": "800000",
                "tco": "101000"
            }
        }
    ]
};

test('meters response structure', (done) => {
    const url = ip + '3000/0.0.1/meter';
    callToApi(url, rightBody)
        .then(res => {
            expect(res).toEqual(
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

test('request failed', (done) => {
    const url = ip + '3000/0.0.1/meter';
    callToApi(url, bodyWithoutHallId)
        .then(res => {
            expect(res).toEqual(
                expect.objectContaining({
                    code: expect.any(String),
                    message: expect.any(String),
                })
            );
            done();
        });
});

test('slotId wrong type', (done) => {
    const url = ip + '3000/0.0.1/meter';
    callToApi(url, slotIdInteger)
        .then(res => {
            expect(res.code).not.toBe(0)
            done();
        });
});

function callToApi(url, body) {
    return axios.post(url, body)
        .then(({ data }) => {
            return data;
        });
}

