export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://root:password123@localhost:27017/clean-node0-api?authMechanism=DEFAULT&directConnection=true&authSource=admin',
  port: process.env.PORT ?? 5555
}
export const JWT_TOKEN = process.env.JWT_TOKEN ?? 'jjk'
