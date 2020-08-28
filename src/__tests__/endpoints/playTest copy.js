const axios = require('axios');

const url = 'https://gxrj5cfc5f.execute-api.us-east-1.amazonaws.com/production/api/play/uncover';

test('end game when a mine explodes', (done) => {
    const body = {
        "board": [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, -1]],
        "position": [4, 4],
        "size": "5",
        "minesAmount": 1
    };

    playBoard(url, body)
        .then(data => {
            expect(data.status).toEqual('game over');
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        });
});

test('continue game when no explosion', (done) => {
    const body = {
        "board": [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, -1]],
        "position": [4, 3],
        "size": "5",
        "minesAmount": 1
    };

    playBoard(url, body)
        .then(data => {
            expect(data.status).toEqual(false);
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        });
});

test('uncover no mine square', (done) => {
    const body = {
        "board": [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, -1]],
        "position": [0, 0],
        "size": "5",
        "minesAmount": 1
    };

    playBoard(url, body)
        .then(data => {
            expect(typeof (data.board[0][0])).toEqual('string');
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        });
});

test('uncover near square to uncovered square', (done) => {
    const body = {
        "board": [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, -1]],
        "position": [0, 2],
        "size": "5",
        "minesAmount": 1
    };

    playBoard(url, body)
        .then(data => {
            expect(typeof (data.board[0][1])).toEqual('string');
            expect(typeof (data.board[0][3])).toEqual('string');
            expect(typeof (data.board[2][1])).toEqual('string');
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        });
});

test('win when all non mines squares uncovered', (done) => {
    const body = {
        "board": [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, -1]],
        "position": [2, 2],
        "size": "5",
        "minesAmount": 1
    };

    playBoard(url, body)
        .then(data => {
            expect(data.status).toEqual('winner');
            done();
        })
        .catch(error => {
            console.log(error);
            done();
        });
});

const playBoard = async (url, body) => {
    return await axios.post(url, body)
        .then(({ data }) => {
            return data;
        });
}