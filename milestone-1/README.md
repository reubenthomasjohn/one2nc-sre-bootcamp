## Milestone 1

## Setting up the project

```sh
cd api/
npm init
```

## Setting up Prisma

```sh
npm install -g prisma
prisma init
```

This creates a file `prisma\schema.prisma`, which takes in the url to connect to the DB.
The url is passed in through an env variable.

Since we are using a Postgres DB, this url will be of the form: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA`.

Here's a short explanation of each component:

`USER`: The name of your database user \
`PASSWORD`: The password for your database user \
`HOST`: The name of your host name (for the local environment, it is localhost) \
`PORT`: The port where your database server is running (typically 5432 for PostgreSQL) \
`DATABASE`: The name of the database \
`SCHEMA`: The name of the schema inside the database

Since our Postgres DB runs inside a Docker container, the url will be ``

Now, once the url is added, trying to run `npx primsa db pull` should result in:

After the connection url is added, the data model needs to be updated in the schema.prisma. After this, run
`npx prisma migrate dev --name init`

This does two things:

1. It creates a new SQL migration file for this migration
2. It runs the SQL migration file against the database

Next, run `npm install @prisma/client`. This invokes `prisma generate`, which reads your Prisma schema and generates a version of Prisma Client that is tailored to your models.

Whenever you update your Prisma schema, you will have to update your database schema using either `prisma migrate dev` or `prisma db push`. This will keep your database schema in sync with your Prisma schema. The commands will also regenerate Prisma Client.

## Running a PostgresDB using a Docker container:

```sh
docker run -d -e POSTGRES_DB=mydb -e POSTGRES_PASSWORD=testpass123 -e POSTGRES_USER=postgres -p "6500:5432" postgres
```

Then, the connection url will be:

```sh
DATABASE_URL="postgresql://postgres:testpass123@localhost:6500/mydb?schema=public"
```

### References:

1. Connecting to Postgres DB: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-postgresql

2. Connecting to Postgres DB running inside a Docker container: https://medium.com/nerd-for-tech/how-to-set-up-prisma-with-a-local-docker-postgres-container-9e0958d08544
