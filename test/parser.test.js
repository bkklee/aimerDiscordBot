const { parser } = require('../parser');
const { readFile } = require('fs/promises');

const HTML_FILE_5 = 'test/resources/5.html';

describe('Parser', () => {
    test('can parse QQQ stock price', async () => {
        const body = await readFile(HTML_FILE_5, 'utf-8');
        const { percentage, ...parsed } = parser(body);

        expect(parsed).toEqual({
            change: '+1.58',
            curPrice: '516.87',
            marketNotice: 'UPDATING',
            name: 'UPDATING',
        });
        expect(percentage.toPrecision(3)).toBe('0.307');
    });

    test('Can return null when the input is not appropriate', () => {
        const body = 'Hello, world';
        const info = parser(body);

        expect(info).toBe(null);
    });
});
