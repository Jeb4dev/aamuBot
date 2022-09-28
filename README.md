# project-x

## Development
### Setup
- Clone repository
- Run ``npm install``
- Add environment variables
  - copy [example .env](.env.example) as ``.env`` and fill correct variables
### Run
- ``npm run dev``
### Deploy
- ``npm run build-ts && npm start``
### Build docker
- build docker image ``docker image build -t project-x-bot .``
- run container from an image``docker run -d -e TOKEN= -e CLIENT_ID= -e DB_ADDRESS= --name project-x-bot project-x-bot ``
### Migrations
- migrate to the last migration `npm run migrate:up`
- revert the last migration `npm run migrate:down`
- generate new migration `npm run migrate:generate MigrationName`
