import { Request, Response } from 'express';

import { cardValidation } from '../libs/joi';
import Card from "../models/card.model";

export const createCard = async (req: Request, res: Response) => {
    const { error } = cardValidation(req.body);
    if (error)
        return res.status(400).json(error.message);

    const cardMd = new Card(req.body);
    try {
        const saved = await cardMd.save();
        return res.status(200).json(saved);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

export const updateCard = async (req: Request, res: Response) => {
    const { error } = cardValidation(req.body);
    if (error) {
        return res.status(400).json(error.message);
    }

    const { id } = req.params;

    if (!id) {
        res.status(400).json("Invalid param");
    }

    try {
        const update = await Card.findOneAndUpdate({ _id: id }, req.body, {
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

export const archiveAllCards = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json("Invalid param");
    }

    try {
        await Card.updateMany({ idList: id }, { $set: { closed: true } })
        return res.status(200).json("success");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const sortCards = async (req: Request, res: Response) => {
    const { id, sortBy } = req.body;

    if (!id) {
        res.status(400).json("Invalid param");
    }

    try {
        const cards = await Card.find({ idList: id });
        return res.status(200).json("success");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}