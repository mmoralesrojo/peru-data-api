import express from 'express';
import { routes as sunatRoutes } from './sunat';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../../swagger/swagger.json';

export const routes = express.Router();

routes.use('/sunat', sunatRoutes)

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
