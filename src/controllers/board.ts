import { Request, Response } from 'express';

import Board from "../models/board.model";

export const getBoard = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const board = await Board.findById(id);
        return res.status(200).json(board)
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
};
