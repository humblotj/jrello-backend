import { Request, Response } from 'express';

import { cardValidation } from '../libs/joi';
import Card from "../models/card.model";

export const updateCard = async (req: Request, res: Response) => {
    const { error } = cardValidation(req.body);
    if (error) {
        return res.status(400).json(error.message);
    }

    const { id, ...rest } = req.body;

    try {
        const update = await Card.findOneAndUpdate({ _id: id }, rest, {
            new: true,
        });
        return res.status(200).json(update);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};
export const deleteCard = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json("Invalid param");
    }

    try {
        const del = await Card.deleteOne({ _id: id });
        return res.status(200).json(del);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}