# demo-toolbox-back

A API project that works with the external API.

### Prerequisites 📋

```
node -v <=14
docker (optional)

Have these ports available:
  - 3000 ==> demo-toolbox-front (APP)
  - 3005 ==> demo-toolbox-back (API)
```

Ensure you have a `.env` file in the root of the project to load the necessary environment variables. Example `.env` file:

```env
  FILE_SERVICES_API_URL=
  FILE_SERVICES_API_KEY=
```

This `.env` file will be automatically loaded by Docker when using the `docker-compose.yml` configuration mentioned earlier.

### Installation 🔧

Clone project:

```
git clone git@github.com:Julian-Carelli/demo-toolbox-back.git
```

Enter the folder:

```
cd demo-toolbox-back
```

Install all project dependencies:

```
npm i
```

Run the command for the development environment:

```
npm run start
```

To run tests:

```
npm run test
```

------------------------------------------------------

### Installation with Docker (DOCKER MUST BE INSTALLED GLOBALLY)

Clone project:

```
git clone git@github.com:Julian-Carelli/demo-toolbox-back.git
```

Enter the folder:

```
cd demo-toolbox-back
```

Create a container for the project:

```
npm run docker:create
```

Enter the project's container:

```
docker exec -it demo-toolbox-back-container sh
```

Install all project dependencies:

```
npm i
```

Run the command for the development environment:

```
npm run start
```

------------------------------------------------------

When all environments are running, you should access http://localhost:3005 to see the complete application.

------------------------------------------------------

To run tests:

```
npm run test
```
