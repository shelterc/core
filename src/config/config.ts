export default () => ({
  mysql: {
    type: 'mysql',
    port: process.env.MYSQL_PORT,
    host: 'localhost',
    username: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: 'shelter',
    timezone: '+08:00',
    logging: true,
    synchronize: true, // 生产环境要关闭
    dropSchema: false, // 每次建立连接时删除架构
    autoLoadEntities: true, //自动注入到entities，下面就没必要开启了
    // entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  },
  redis: {
    port: 6379,
    host: 'localhost',
    username: 'default',
    password: 'my-top-secret',
    db: 0,
  },
  jwt_secret: process.env.JWT_SECRET,
});
