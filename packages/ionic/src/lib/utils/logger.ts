import { CreateTaggedFormatterOptions, DEFAULT_LOGGER_HANDLERS, Logger as BaseLogger, LoggerFormatter, createTaggedFormatter } from '@ionic/cli-framework';
import chalk from 'chalk';

import { ILogger } from '../../definitions';

export class Logger extends BaseLogger implements ILogger {
  ok(msg: string): void {
    this.log({ ...this.createRecord(`${chalk.dim('[')}${chalk.bold.green('OK')}${chalk.dim(']')} ${msg}`), format: false });
  }

  rawmsg(msg: string): void {
    this.log({ ...this.createRecord(msg), format: false });
  }
}

export function createFormatter(options: CreateTaggedFormatterOptions = {}): LoggerFormatter {
  const prefix = process.argv.includes('--log-timestamps') ? () => `${chalk.dim('[' + new Date().toISOString() + ']')}` : '';

  return createTaggedFormatter({ prefix, titleize: true, wrap: true, ...options });
}

export function createDefaultLoggerHandlers(formatter = createFormatter()) {
  return new Set([...DEFAULT_LOGGER_HANDLERS].map(handler => handler.clone({ formatter })));
}
