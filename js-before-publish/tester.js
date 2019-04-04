export default (request) => { 
    const kvstore = require('kvstore');
    const xhr = require('xhr');

    request.message.hello = "World!";
    delete request.message.foo;
    return request.ok(); // Return a promise when you're done 
}