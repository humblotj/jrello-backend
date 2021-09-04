import { Request, Response } from 'express';

import List from "../models/list.model";

export const getList = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const list = await List.findById(id);
        return res.status(200).json(list)
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
};
