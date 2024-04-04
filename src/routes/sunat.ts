import express from 'express';
import playwright from 'playwright';
import { FAKE_USER_AGENT } from '../constants/constants';
import { StatusCodes } from 'http-status-codes';

export const routes = express.Router();

routes.get('/consultaruc', async (req, res) => {

  const BOTONES_FILTRO: { [key: string]: Object } = {
    RUC: {
      name: 'Por RUC'
    },
    DOCUMENTO: 'Por Documento',
    RAZON_SOCIAL: 'Por Nomb./Raz.Soc.'
  };

  const {
    tipofiltro: tipoFiltro,
    ruc,
    tipodocumento: tipoDocumento,
    numerodocumento: numeroDocumento,
    razonsocial: razonSocial
  } = req.query as {
    tipofiltro: string,
    ruc: string,
    tipodocumento: string,
    numerodocumento: string,
    razonsocial: string
  };

  const browser = await playwright.chromium.launch({
    headless: process.env.NODE_ENV !== 'local'
  });
  try {
    const context = await browser.newContext({
      userAgent: FAKE_USER_AGENT
    });
    const page = await context.newPage();
    await page.goto('https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp');
    switch (tipoFiltro) {
      case 'RUC':
        await page.getByRole('button', { name: 'Por RUC' }).click();
        await page.getByPlaceholder('Ingrese RUC').fill(ruc);
        await page.getByRole('button', { name: 'Buscar' }).click();
        break;
      case 'DOCUMENTO':
        await page.getByRole('button', { name: 'Por Documento' }).click();
        switch (tipoDocumento) {
          case 'DNI': {
            await page.locator('#cmbTipoDoc').selectOption('1');
            break;
          }
          case 'CE': {
            await page.locator('#cmbTipoDoc').selectOption('4');
            break;
          }
          case 'PASAPORTE': {
            await page.locator('#cmbTipoDoc').selectOption('7');
            break;
          }
          case 'CEDULA_DIPLOMATICA_IDENTIDAD': {
            await page.locator('#cmbTipoDoc').selectOption('A');
            break;
          }
        }
        await page.getByPlaceholder('Ingrese Número documento').fill(numeroDocumento);
        break;
      case 'RAZON_SOCIAL':
        await page.getByRole('button', { name: 'Por Nomb./Raz.Soc.' }).click();
        await page.getByPlaceholder('Ingrese Nombre o Razón Social').fill(razonSocial);
        break;
    }
    await page.getByRole('button', { name: 'Buscar' }).click();
    await page.waitForTimeout(5000);
    await browser.close();
  }
  catch (error) {
    await browser.close();
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }

  res.status(StatusCodes.OK).send('Hello World');
});
