const path = require("path");

const paths = {
  entities: path.resolve(__dirname, './src/modules/**/entities/*.ts'),
  migrations: path.resolve(__dirname, 'src/database/migrations/*.ts')
}

if (!process[Symbol.for("ts-node.register.instance")]) {
  paths.entities = path.resolve(__dirname, 'dist', './src/modules/**/entities/*{.ts,.js}')
  paths.migrations = path.resolve(__dirname, 'dist', 'src/database/migrations/*{.ts,.js}')
}

module.exports = {
  type: 'sqlite',
  database: 'src/db.sqlite',
  synchronize: true,
  logging: false,
  entities: [paths.entities],
  migrations: [paths.migrations],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: './src/database/migrations',
  },
};