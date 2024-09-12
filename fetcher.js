const request = require('request');

const fetcher = async (code) => {
    const get_options = {
        url: `https://finance.yahoo.com/quote/${encodeURIComponent(code)}/chart?nn=1`,
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        },
    };

    return new Promise((res, rej) => {
        request.get(get_options, (err, response, body) => {
            if (body) {
                res(body);
            } else if (err) {
                rej(err);
            }
        });
    });
};

module.exports = { fetcher };
