import { appDataSource } from '@/shared/infra/database/typeorm';

// typeorm
appDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

export { appDataSource }