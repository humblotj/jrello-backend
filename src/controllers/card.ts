import { Request, Response } from 'express';

import { cardValidation } from '../libs/joi';
import Card from "../models/card.model";

const posIncr = 65535;

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
    const { idList } = req.body;

    if (!idList) {
        res.status(400).json("Invalid param");
    }

    try {
        await Card.updateMany({ idList }, { $set: { closed: true } })
        return res.status(200).json("success");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const moveAllCards = async (req: Request, res: Response) => {
    const { prev, next } = req.body;

    if (!prev || !next) {
        res.status(400).json("Invalid param");
    }

    try {
        const prevList = await Card.find({ idList: prev }).sort('pos');
        const nextList = await Card.find({ idList: next }).sort('pos');
        const lastPos = nextList.length ? nextList[nextList.length - 1].pos : 0;

        await Promise.all(prevList.map((c, i) => Card.updateOne({ _id: c._id }, {
            $set: {
                idList: next,
                pos: lastPos + i * posIncr + i
            }
        })));

        return res.status(200).json("success");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const sortCards = async (req: Request, res: Response) => {
    const { idList, sortBy } = req.body;

    if (!idList) {
        res.status(400).json("Invalid param");
    }

    try {
        let list = null;
        switch (sortBy) {
            case 'newest':
                list = await Card.find({ idList }).sort('createAt');
                break;
            case 'oldest':
                list = await Card.find({ idList }).sort('-createAt');
                break;
            case 'alphabetically':
                list = await Card.find({ idList }).sort('name');
                break;
            default:
                list = await Card.find({ idList });
                break;
        }

        await Promise.all(list.map((c, i) => Card.updateOne({ _id: c._id }, {
            $set: {
                pos: posIncr * i + (i - 1)
            }
        })));

        return res.status(200).json("success");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}