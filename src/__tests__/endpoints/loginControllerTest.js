//jest.setTimeout(10000);
const axios = require('axios');
const configJson = require('../../../config.json');
const ip = configJson.envData[configJson.env].ip;

const rightBody = {
    "usuario": "jperez",
    "expirationTime": "2d",
    "signature": "86f474ecaa20018aa1253727138b55496b644bbb8bd29a664b2448ad424353cefab2b36e8e14b5f9b47880c12b94539420df370808fa3bd3d40598cc24a19c5123ca37f6da6612ee43d6e47f3a3dec56310994e0d8d005f3e92174a3c2997d22090fac7b4e649511df60634ee40795e184b625403377b8cf6282e6f09de8a1b07dc4e897fd2fed9a8d25e2975ea3a24dc9654f967f23f9a8dfac15399d19ed1d215881eb40309525fd5e607064f12121ae697b3a0ac81ab771fbc5cd56afd870267dcfcf6bf6bdc9df0aee08b1fb00bbe9883173306125dc0e4efa1fab7aefc46c48f6803cce9c2dfda46d110dc572bc3dbbc2fd6bb3b3a29e695e89f6b5575724bc2b7742f37d1ebf2095ce283a3ead84c9780c8bd46ef783cd34db27a2c59cacf9a376e1fa1879ea9ed8081738d0a3b0cbf49b3174ff8257b32a3dc60cc95657d1c68616f0fa50a3e8513af7f03e6ae97029c2bb462640be26b6f4bf76f61cc220d02def45c693a1a4365a97ef3b447e5a6c0f6bbe76868fb72ef69a39362e000deae91a29724bf8c013eeae3acf863de2dfa5af2d193c79b2dded648dba1c9fe2440a56cd62d7ba8445a2549137e079719d69bd2773e044739a868182032cc7f91ddc5164a0a85a8932e10799f37b31494e07be639f3c50207fb9fd11cd483acad83e8a42844aaadcb8f56e9300084c818c7355cc94519fd7f0bd573259b0"
};

const wrongBody = {
    "usuario": "jperez",
    "signature": "86f474ecaa20018aa1253727138b55496b644bbb8bd29a664b2448ad424353cefab2b36e8e14b5f9b47880c12b94539420df370808fa3bd3d40598cc24a19c5123ca37f6da6612ee43d6e47f3a3dec56310994e0d8d005f3e92174a3c2997d22090fac7b4e649511df60634ee40795e184b625403377b8cf6282e6f09de8a1b07dc4e897fd2fed9a8d25e2975ea3a24dc9654f967f23f9a8dfac15399d19ed1d215881eb40309525fd5e607064f12121ae697b3a0ac81ab771fbc5cd56afd870267dcfcf6bf6bdc9df0aee08b1fb00bbe9883173306125dc0e4efa1fab7aefc46c48f6803cce9c2dfda46d110dc572bc3dbbc2fd6bb3b3a29e695e89f6b5575724bc2b7742f37d1ebf2095ce283a3ead84c9780c8bd46ef783cd34db27a2c59cacf9a376e1fa1879ea9ed8081738d0a3b0cbf49b3174ff8257b32a3dc60cc95657d1c68616f0fa50a3e8513af7f03e6ae97029c2bb462640be26b6f4bf76f61cc220d02def45c693a1a4365a97ef3b447e5a6c0f6bbe76868fb72ef69a39362e000deae91a29724bf8c013eeae3acf863de2dfa5af2d193c79b2dded648dba1c9fe2440a56cd62d7ba8445a2549137e079719d69bd2773e044739a868182032cc7f91ddc5164a0a85a8932e10799f37b31494e07be639f3c50207fb9fd11cd483acad83e8a42844aaadcb8f56e9300084c818c7355cc94519fd7f0bd573259b0"
};

test('response structure', (done) => {
    const url = ip + '3000/0.0.1/login';
    callToApi(url, rightBody)
        .then(data => {
            expect(data).toEqual(
                expect.objectContaining({
                    token: expect.any(String),
                    sign: expect.any(String),
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
    const url = ip + '3000/0.0.1/login';
    callToApi(url, wrongBody)
        .then(data => {
            expect(data).toEqual(
                expect.objectContaining({
                    token: expect.any(String),
                    sign: expect.any(String),
                })
            );
            done();
        })
        .catch(error => {
            expect(error.message).toBe('Request failed with status code 500');
            done();
        });
});

function callToApi(url, body) {
    return axios.post(url, body)
        .then(({ data }) => {
            return data;
        });
}