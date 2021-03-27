import { NextFunction, Request, Response } from 'express';
import config from 'config';

/**
 * checkAdminRole Middleware:
 * This middleware is a function that is ran before any request reaches any controller
 * that requires an admin role to access. This function executes after the authentication middleware
 * (refer authentication.ts file for more info). This middleware simply checks the decoded user from
 * from the json web token provided from the previous authenticateJWT middleware.
 */
export const checkAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  if (!config.get<boolean>('server.authEnabled')) return next();

  if (req.body?.user?.role !== 'Admin')
    res.status(403).send('Permission denied, you do not have Admin rights');

  return next();
};
