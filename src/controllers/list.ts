import { Request, Response } from 'express';

import { listValidation } from '../libs/joi';
import List from "../models/list.model";

export const updateList = async (req: Request, res: Response) => {
    const { error } = listValidation(req.body);
    if (error) {
        return res.status(400).json(error.message);
    }

    const { id, ...rest } = req.body;

    try {
        const update = await List.findOneAndUpdate({ _id: id }, rest, {
            new: true,
        });
        return res.status(200).json(update);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};
export const deleteList = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json("Invalid param");
    }

    try {
        const del = await List.deleteOne({ _id: id });
        return res.status(200).json(del);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}