import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './../swagger.json';

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));