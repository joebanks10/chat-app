const expect = require('expect');

var { generateMessage } = require('./message');

describe('message', () => {
  it('should return a message object', () => {
    const from = 'Joe';
    const text = 'Hello';
    const result = generateMessage(from, text);

    expect(result.from).toBe(from);
    expect(result.text).toBe(text);
    expect(typeof result.createdAt).toBe('number');
  });
});