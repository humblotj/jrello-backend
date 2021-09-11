import { Request, Response } from 'express';

import Board from "../models/board.model";
import List from "../models/list.model";
import Card from "../models/card.model";

export const getBoard = async (req: Request, res: Response) => {
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
        return res.status(400).json("Invalid param");
    }

    try {
        let board = await Board.findOne({ name });
        if (board) {
            const idBoard = board._id;
            const lists = await List.find({ idBoard });
            const cards = await Card.find({ idBoard });
            return res.status(200).json({ id: idBoard, lists, cards });
        } else {
            board = await new Board({ name }).save();
            return res.status(200).json({ id: board._id, lists: [], cards: [] });
        }
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
};