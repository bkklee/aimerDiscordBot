const { parser } = require('../parser');
const { readFile } = require('fs/promises');

const HTML_FILE_5 = 'test/resources/5.html';

describe('Parser', () => {
    test('can parse HSBC stock price', async () => {
        const body = await readFile(HTML_FILE_5, 'utf-8');
        const { percentage, ...parsed } = parser(body);

        expect(parsed).toEqual({
            change: '+0.250',
            curPrice: '66.250',
            marketNotice: 'At close:  04:08PM HKT',
            name: 'HSBC Holdings plc (0005.HK)',
        });
        expect(percentage.toPrecision(3)).toBe('0.379');
    });

    test('Can return null when the input is not appropriate', () => {
        const body = 'Hello, world';
        const info = parser(body);

        expect(info).toBe(null);
    });
});
