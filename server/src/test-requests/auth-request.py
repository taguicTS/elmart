requests.post("http://localhost:3000/api/v1/auth/register", json={"email":"test@gmail.com","password":"test2004"});

requests.post("http://localhost:3000/api/v1/auth/login", json={"email":"test@gmail.com","password":"test2004"});

requests.post("http://localhost:3000/api/v1/auth/logout");

