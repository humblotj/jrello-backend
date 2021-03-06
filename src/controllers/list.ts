import { Request, Response } from 'express';

import { listValidation } from '../libs/joi';
import List from "../models/list.model";

export const createList = async (req: Request, res: Response) => {
    const { error } = listValidation(req.body);
    if (error)
        return res.status(400).json(error.message);

    const listMd = new List(req.body);
    try {
        const saved = await listMd.save();
        return res.status(200).json(saved);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export const updateList = async (req: Request, res: Response) => {
    const { error } = listValidation(req.body);
    if (error) {
        return res.status(400).json(error.message);
    }

    const { id } = req.params;

    if (!id) {
        res.status(400).json("Invalid param");
    }

    try {
        const update = await List.findOneAndUpdate({ _id: id }, req.body, {
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