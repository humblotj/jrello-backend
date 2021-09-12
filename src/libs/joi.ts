import Joi from "joi";

//test validation
export const cardValidation = (data: any) => {
  const cardSchema = Joi.object({
    idBoard: Joi.string().required(),
    idList: Joi.string().required(),
    name: Joi.string().required(),
    pos: Joi.number().required(),
    subscribed: Joi.boolean().required(),
    desc: Joi.string(),
    closed: Joi.boolean().required(),
  });
  return cardSchema.validate(data);
};

export const listValidation = (data: any) => {
  const listSchema = Joi.object({
    idBoard: Joi.string().required(),
    name: Joi.string().required(),
    pos: Joi.number().required(),
    subscribed: Joi.boolean().required(),
  });
  return listSchema.validate(data);
};
