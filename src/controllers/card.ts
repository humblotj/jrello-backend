import { Request, Response } from 'express';

import Card from "../models/card.model";

export const getCard = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const board = await Card.findById(id);
        return res.status(200).json(board)
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
};
