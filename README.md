# aamuBot

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
### Docker
#### Build Docker Image
- ``docker image build -t aamuBot .``
#### Run Docker Container
- ``docker run -d -e TOKEN= -e CLIENT_ID= -e DB_ADDRESS= --name aamuBot aamuBot``
### Migrations
- migrate to the last migration `npm run migrate:up`
- revert the last migration `npm run migrate:down`
- generate new migration `npm run migrate:generate MigrationName`
