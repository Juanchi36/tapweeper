const { encrypt } = require('../../../src/lib/sha256SignEncrypter');

const rightSign = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiNWRlOTViYjYxYzlkNDQwMDAwYjM0MTNjIiwiaWF0IjoxNTgwMzEzODAyLCJleHAiOjE1ODA0ODY2MDJ9.ipuwu5UP4yve4HzkR2gdWVO02nj7J_f0-Dp0mg8nRHc-8ba7d2326915559db5333d999117b341";

test('return structure', () => {
    expect(encrypt(rightSign)).toEqual(
        expect.objectContaining({
            encryptedData: expect.any(String),
            iv: expect.any(String),
        })
    );
});
