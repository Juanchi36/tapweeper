const { endPointNetwin } = require('../../lib/endPointNetwin.js');

let message = {
  "__type": "SetSlotNetwinDataRequest", "timeStamp": "2020-01-24T15:58:57.405Z", "sender": { "__type": "BaseStamp", "name": "urano.apigateway", "id": null, "version": null }, "addressee": { "__type": "BaseStamp", "name": "urano.apigateway", "id": null, "version": null }, "sessionId": null, "body": { "__type": "EndpointPackageDTO", "type": "slotMeters", "timeStamp": "2019-12-19T13:06:34.677Z", "hallId": 31, "userId": 123456, "transactions": [{ "__type": "MetersTransactionDTO", "isRectification": false, "requestId": 1, "timeStamp": "2019-12-19T13:06:34.677Z", "slotId": "1234567", "currencyCode": "ARS", "billMeters": [{ "__type": "BillMeterDTO", "id": 100, "quantity": 10 }, { "__type": "BillMeterDTO", "id": 200, "quantity": 10 }], "gameMeters": { "__type": "GameMetersDTO", "ca": "10000", "cc": "500", "ci": "800000", "co": "100000", "cxb": "800000", "drop": "1000", "jj": "1000", "jp": "1000", "tci": "800000", "tco": "101000" }, "denomination": 0.01, "item": "0" }], "token": "string", "sign": "string" }, "correlationId": 1
};

test('successful operation', done => {
  getData(result => {
    expect(result.body.payLoad.code).toBe(0);
    expect(result.body.payLoad.description).toBe('Operación exitosa');
    done();
  });
});

test('get meter type', done => {
  getData(result => {
    expect(result.__type).toBe('SetSlotNetwinDataResponse');
    done();
  });
});

test('response structure', done => {
  getData(result => {
    expect(result).toEqual(
      expect.objectContaining({
        __type: expect.any(String),
        timeStamp: expect.any(Date),
        sender: expect.any(Object),
        addressee: expect.any(Object),
        //sessionId: expect.any(Object),
        body: expect.any(Object),
      })
    );
    done();
  });
});

/////////////////////////////////////////////////////////////////////////////////////
// Es necesario realizar una validacion real en endPointNetwin para correr este test
/////////////////////////////////////////////////////////////////////////////////////

/*beforeEach(() => {
    message = {
       "__type": 123, "timeStamp": "2020-01-24T15:58:57.405Z", "sender": { "__type": "BaseStamp", "name": "urano.apigateway", "id": null, "version": null }, "addressee": { "__type": "BaseStamp", "name": "urano.apigateway", "id": null, "version": null }, "sessionId": null, "body": { "__type": "EndpointPackageDTO", "type": "slotMeters", "timeStamp": "2019-12-19T13:06:34.677Z", "hallId": 31, "userId": 123456, "transactions": [{ "__type": "MetersTransactionDTO", "isRectification": false, "requestId": 1, "timeStamp": "2019-12-19T13:06:34.677Z", "slotId": "1234567", "currencyCode": "ARS", "billMeters": [{ "__type": "BillMeterDTO", "id": 100, "quantity": 10 }, { "__type": "BillMeterDTO", "id": 200, "quantity": 10 }], "gameMeters": { "__type": "GameMetersDTO", "ca": "10000", "cc": "500", "ci": "800000", "co": "100000", "cxb": "800000", "drop": "1000", "jj": "1000", "jp": "1000", "tci": "800000", "tco": "101000" }, "denomination": 0.01, "item": "0" }], "token": "string", "sign": "string" }, "correlationId": 1
     };
});

test('invalid data', (done) => {
   getData((result)=> {
       expect(result.body.payLoad.code).toBe(99);
       expect(result.body.payLoad.description).toBe('Datos inválidos');
       done();
   });
});*/

function getData(callback) {
  message.body._id = (Math.floor(Math.random() * 100000000000000000)).toString(16);
  const result = endPointNetwin(message);
  setTimeout(() => {
    callback(result);
  }, 2000);
}
