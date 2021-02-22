import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    //@ts-ignore
    const { message, name, severity, detail } = exception;
    response.status(status).json({
      timestamp: new Date().toISOString(),
      message,
      name,
      severity,
      detail,
    });
  }
}
