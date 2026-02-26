/**
 * Logger Utility
 * 
 * Centralized logging with environment-aware output.
 * In production, only errors are logged to avoid console spam.
 * In development, all log levels are enabled.
 * 
 * Usage:
 * import { logger } from '@/lib/logger';
 * 
 * logger.log('User action', { userId: 123 });
 * logger.error('API failed', error);
 * logger.warn('Rate limit approaching');
 * logger.info('Process started');
 */

type LogLevel = 'log' | 'error' | 'warn' | 'info' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
}

class Logger {
  private isDevelopment: boolean;
  private prefix: string;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.prefix = '[RecX]';
  }

  /**
   * Format timestamp for logs
   */
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Format log entry for output
   */
  private formatLog(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: this.getTimestamp(),
    };
  }

  /**
   * Send logs to external service (e.g., Sentry, LogRocket, Datadog)
   * TODO: Implement when monitoring service is configured
   */
  private sendToMonitoring(entry: LogEntry): void {
    // Example integration:
    // if (process.env.SENTRY_DSN) {
    //   Sentry.captureMessage(entry.message, {
    //     level: entry.level,
    //     extra: entry.data,
    //   });
    // }
  }

  /**
   * General logging (development only)
   */
  log(message: string, ...args: any[]): void {
    if (!this.isDevelopment) return;

    const entry = this.formatLog('log', message, args);
    console.log(this.prefix, message, ...args);
  }

  /**
   * Error logging (always shown, sent to monitoring)
   */
  error(message: string, error?: Error | unknown, ...args: any[]): void {
    const entry = this.formatLog('error', message, { error, ...args });
    console.error(this.prefix, '❌', message, error, ...args);
    
    // Send to monitoring service in production
    if (!this.isDevelopment) {
      this.sendToMonitoring(entry);
    }
  }

  /**
   * Warning logging (development only)
   */
  warn(message: string, ...args: any[]): void {
    if (!this.isDevelopment) return;

    const entry = this.formatLog('warn', message, args);
    console.warn(this.prefix, '⚠️', message, ...args);
  }

  /**
   * Info logging (development only)
   */
  info(message: string, ...args: any[]): void {
    if (!this.isDevelopment) return;

    const entry = this.formatLog('info', message, args);
    console.info(this.prefix, 'ℹ️', message, ...args);
  }

  /**
   * Debug logging (development only, verbose)
   */
  debug(message: string, ...args: any[]): void {
    if (!this.isDevelopment) return;

    const entry = this.formatLog('debug', message, args);
    console.debug(this.prefix, '🔍', message, ...args);
  }

  /**
   * Success logging (development only)
   */
  success(message: string, ...args: any[]): void {
    if (!this.isDevelopment) return;

    const entry = this.formatLog('info', message, args);
    console.log(this.prefix, '✅', message, ...args);
  }

  /**
   * API request logging (development only)
   */
  api(method: string, url: string, status?: number, duration?: number): void {
    if (!this.isDevelopment) return;

    const statusEmoji = status && status >= 200 && status < 300 ? '✅' : '❌';
    const durationText = duration ? `${duration}ms` : '';
    
    console.log(
      this.prefix,
      '🌐',
      method.toUpperCase(),
      url,
      status ? `${statusEmoji} ${status}` : '',
      durationText
    );
  }

  /**
   * Group logs together (development only)
   */
  group(label: string): void {
    if (!this.isDevelopment) return;
    console.group(`${this.prefix} ${label}`);
  }

  /**
   * End log group (development only)
   */
  groupEnd(): void {
    if (!this.isDevelopment) return;
    console.groupEnd();
  }

  /**
   * Performance timing
   */
  time(label: string): void {
    if (!this.isDevelopment) return;
    console.time(`${this.prefix} ${label}`);
  }

  /**
   * End performance timing
   */
  timeEnd(label: string): void {
    if (!this.isDevelopment) return;
    console.timeEnd(`${this.prefix} ${label}`);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export type for external use
export type { LogLevel, LogEntry };
