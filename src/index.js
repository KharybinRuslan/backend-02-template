const http = require('http');
const { getUsers } = require('./modules/users');

const PORT = process.env.PORT || 3003;
const HOST = '127.0.0.1';

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${HOST}:${PORT}`);
  const params = url.searchParams;

  const hasHello = params.has('hello');
  const hasUsers = params.has('users');
  const paramCount = params.size;

  if (hasHello && paramCount === 1) {
    const name = params.get('hello');
    if (!name || name.trim() === '') {
      response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Enter a name');
      return;
    }
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(`Hello, ${name}.`);
    return;
  }

  if (hasUsers && paramCount === 1) {
    try {
      const users = getUsers();
      response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify(users));
    } catch (err) {
      response.writeHead(500);
      response.end();
    }
    return;
  }

  if (paramCount === 0) {
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Hello, World!');
    return;
  }

  response.writeHead(500);
  response.end();
});

server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
