const axios = require('axios');

test('create 5x5 board', (done) => {
    const size = 5;
    const level = 1;
    const createUrl = `https://gxrj5cfc5f.execute-api.us-east-1.amazonaws.com/production/api/newBoard?size=${size}&difficulty=${level}`;

    getBoard(createUrl)
        .then(data => {
            const size = [data.board.length, data.board[0].length];
            const expected = [5, 5];
            expect(size).toEqual(expect.arrayContaining(expected));
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        });
});

test('create 100x100 board', (done) => {
    const size = 100;
    const level = 1;
    const createUrl = `https://gxrj5cfc5f.execute-api.us-east-1.amazonaws.com/production/api/newBoard?size=${size}&difficulty=${level}`;

    getBoard(createUrl)
        .then(data => {
            const size = [data.board.length, data.board[0].length];
            const expected = [100, 100];
            expect(size).toEqual(expect.arrayContaining(expected));
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        });
});

test('create easy level board', (done) => {
    const size = 5;
    const level = 1;
    const createUrl = `https://gxrj5cfc5f.execute-api.us-east-1.amazonaws.com/production/api/newBoard?size=${size}&difficulty=${level}`;

    getBoard(createUrl)
        .then(data => {
            let minesAmount = 0;
            data.board.map(file => {
                file.map(square => {
                    if (square === -1) {
                        minesAmount++
                    }
                })
            })
            expect(minesAmount).toEqual(1);
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        });
});

test('create medium level board', (done) => {
    const size = 5;
    const level = 2;
    const createUrl = `https://gxrj5cfc5f.execute-api.us-east-1.amazonaws.com/production/api/newBoard?size=${size}&difficulty=${level}`;

    getBoard(createUrl)
        .then(data => {
            let minesAmount = 0;
            data.board.map(file => {
                file.map(square => {
                    if (square === -1) {
                        minesAmount++
                    }
                })
            })
            expect(minesAmount).toEqual(2);
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        });
});

test('create hard level board', (done) => {
    const size = 5;
    const level = 3;
    const createUrl = `https://gxrj5cfc5f.execute-api.us-east-1.amazonaws.com/production/api/newBoard?size=${size}&difficulty=${level}`;

    getBoard(createUrl)
        .then(data => {
            let minesAmount = 0;
            data.board.map(file => {
                file.map(square => {
                    if (square === -1) {
                        minesAmount++
                    }
                })
            })
            expect(minesAmount).toEqual(3);
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        });
});

const getBoard = async (url) => {
    return await axios.get(url)
        .then(({ data }) => {
            return data;
        });
}