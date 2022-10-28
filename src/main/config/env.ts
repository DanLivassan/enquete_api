export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/clean-node0-api',
  port: process.env.PORT ?? 5555
}
