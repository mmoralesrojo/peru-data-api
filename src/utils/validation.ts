import Joi from "joi";
import { APIS_STATIC_VALUES } from "../constants/constants";

export const validations = {
  sunat: {
    consultaruc: Joi.object({
      tipofiltro: Joi.string().valid(APIS_STATIC_VALUES.SUNAT.CONSULTA_RUC.TIPO_FILTRO).required(),
    })
  }
}