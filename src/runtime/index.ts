import * as os from 'os';

const runtime = () => {
  const port = process.env.APP_PORT;
  const ipConfig = os.networkInterfaces();
  let address =
    ipConfig.WLAN.find((item) => item.family === 'IPv4')?.address || null;
  return { address, port };
};

const logger = (address, port) => {
  const titleColor = '\x1B[34m%s\x1B[39m';
  const itemColor = '\x1B[36m%s\x1B[0m';
  console.log(titleColor, `App running at:`);
  console.log(itemColor, `- Local: http://localhost:${port}`);
  console.log(itemColor, `- Network http://${address}:${port}`);
  console.log(titleColor, `Swagger docs running at:`);
  console.log(itemColor, `- Local  http://localhost:${port}/swagger`);
  console.log(itemColor, `- Network http://${address}:${port}/swagger`);
};

export { logger, runtime };
