import express from 'express';
import playwright from 'playwright';
import { FAKE_USER_AGENT } from '../constants/constants';
import { StatusCodes } from 'http-status-codes';

export const routes = express.Router();

routes.get('/consultaruc', async (req, res) => {
  console.log(process.env);
  const browser = await playwright.chromium.launch({
    headless: process.env.NODE_ENV !== 'local'
  });
  const context = await browser.newContext({
    userAgent: FAKE_USER_AGENT
  });
  const page = await context.newPage();
  await page.goto('https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp');
  await browser.close();
  res.status(StatusCodes.OK).send('Hello World');
});
