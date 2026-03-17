import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { Response } from "express";

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // console.log("EXCEPTION:", exception);

    //Postgres
    if (exception instanceof QueryFailedError) {
      const err = exception as QueryFailedError & { code: string };

      //duplicate key
      if (err.code === "23505") {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: "Duplicate data",
        });
      }

      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Database query failed (Postgres)",
      });
    }

    //fallback
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: (exception as Error).message || "Internal server error",
    });
  }
}
