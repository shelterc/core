import { Logger as log4jsLogger, configure, getLogger } from 'log4js';
import * as path from 'path';
export class LoggerService {
  log4js: log4jsLogger;
  constructor() {
    configure({
      appenders: {
        console: {
          type: 'console',
        },
        app: {
          type: 'dateFile',
          filename: path.resolve('./logs', 'app.log'),
          // 日志文件按日期（天）切割
          pattern: 'yyyy-MM-dd',
          // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
          keepFileExt: true,
          // 输出的日志文件名是都始终包含 pattern 日期结尾
          alwaysIncludePattern: true,
          // 日志备份个数
          numBackups: 10,
        },
      },
      categories: {
        default: {
          appenders: ['console', 'app'],
          level: 'info',
        },
      },
    });
    this.log4js = getLogger();
  }

  error(message: any, trace: string) {
    this.log4js.error(message, trace);
  }
}
