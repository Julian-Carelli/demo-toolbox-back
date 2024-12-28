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
npm run dev
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
npm run dev
```

------------------------------------------------------

When all environments are running, you should access http://localhost:3005 to see the complete application.

------------------------------------------------------

To run tests:

```
npm run test
```
