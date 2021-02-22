import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger('API');
  use(req: Request, res: Response, next: NextFunction): void {
    this.logger.verbose(`${req.method} ${req.originalUrl}`);
    next();
  }
}
