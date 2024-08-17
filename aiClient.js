const request = require('request'); // HTML request

const askAI = async (question, url = process.env.OPENAI_API_URL) => {
    const headers = {
        'Content-Type': 'application/json',
        'api-key': process.env.OPENAI_API_KEY,
    };
    const settings = {
        messages: [{ role: 'system', content: 'You are a teacher.' }],
        temperature: 0.7,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 800,
        stop: null,
    };

    settings.messages.push({ role: 'user', content: question });

    return new Promise((res, rej) => {
        request.post({ url, headers, json: settings }, function (e, r, body) {
            if (e) {
                rej(e);
            } else {
                res(body.choices[0].message.content);
            }
        });
    });
};

module.exports = {
    askAI,
};
