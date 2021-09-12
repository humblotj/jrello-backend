import { Request, Response } from 'express';

import Board from "../models/board.model";
import List from "../models/list.model";
import Card from "../models/card.model";

const posIncr = 65535;
const todoList = [
    { name: 'Activity history', pos: posIncr * 2 + 1, desc: 'Maybe if I am really motivated...' },
    { name: '[Card] Labels', pos: posIncr * 3 + 2 },
    { name: '[Card] Due Time', pos: posIncr * 5 + 4 },
    { name: '[Card] Comments', pos: posIncr * 6 + 5 },
    { name: '[Css] Responsive Design', pos: posIncr * 9 + 8, desc: 'Probably not... not important in this test project... A fixed width is fine here, I guess...' },
    { name: '[Css] Cross browsing', pos: posIncr * 10 + 9, desc: 'I am using a mac... Probably not...' },
];
const doingList = [
    { name: '[Card] CheckList', pos: posIncr },
];
const doneList = [
    { name: '[Backend] NodeJS Express + MongoodB Mongoose', pos: posIncr / 64, desc: 'Maybe one day... When I will have time... ( ͡~ ͜ʖ ͡°)\nNot complicated though.\nDONE!' },
    { name: '[Animation] Draggable List', pos: posIncr / 32 },
    { name: '[Animation] Draggable Card', pos: posIncr / 16 },
    { name: '[Component Css] Card Edit', pos: posIncr / 8 },
    { name: '[Card Actions] Copy', pos: posIncr / 4 },
    { name: '[Card Actions] Move', pos: posIncr / 2 },
    { name: '[List Actions] Add Card / Position', pos: posIncr },
    { name: '[List Actions] Add Card', pos: posIncr * 2 + 1 },
    { name: '[List Actions] Copy List', pos: posIncr * 3 + 2 },
    { name: '[List Actions] Move List', pos: posIncr * 4 + 3 },
    { name: '[List Actions] Watch', pos: posIncr * 5 + 4 },
    { name: '[List Actions] Sort By', pos: posIncr * 6 + 5 },
    { name: '[List Actions] Move All Cards in the list', pos: posIncr * 7 + 6 },
    { name: '[List Actions] Archive All Cards in the list', pos: posIncr * 8 + 7 },
    { name: '[List Actions] Archive the list', pos: posIncr * 9 + 8 },
    { name: '[Card Actions] Archive Card', pos: posIncr * 10 + 9 },
    { name: '[Card Actions] Delete Card', pos: posIncr * 11 + 10 },
    { name: '[Card Actions] Watch Card', pos: posIncr * 12 + 11 },
    { name: '[Store] Ngrx Store Structure', pos: posIncr * 13 + 12 },
    { name: '[Card] Description', pos: posIncr * 14 + 13, desc: 'Description of the card' },
    { name: '[Model] Card', pos: posIncr * 15 + 14 },
    { name: '[Model] List', pos: posIncr * 16 + 15 },
    { name: '[Component Css] Card Create Dialog', pos: posIncr * 17 + 16 },
    { name: '[Component Css] List Actions Dropdown', pos: posIncr * 18 + 17 },
    { name: '[Component Css] Card Templates Dropdown', pos: posIncr * 19 + 18 },
    { name: '[Component Tool] Dropdown', pos: posIncr * 20 + 19 },
    { name: '[Component Tool] Dialog', pos: posIncr * 21 + 20 },
    { name: '[Component Tool] Tooltip', pos: posIncr * 22 + 21 },
    { name: '[Component Css] List', pos: posIncr * 23 + 22 },
    { name: '[Component Css] Card', pos: posIncr * 24 + 23 },
    { name: '[Component Css] Add List', pos: posIncr * 25 + 24 },
    { name: '[Component Css] Add Card', pos: posIncr * 26 + 25 },
    { name: '[Component Css] Long Name Card: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a tincidunt magna, eleifend condimentum ante. Ut non vulputate velit. Curabitur condimentum felis at posuere pulvinar.', pos: posIncr * 27 + 26 },
];

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
            const lists = await List.find({ idBoard }).sort('pos');
            const cards = await Card.find({ idBoard }).sort('pos');
            return res.status(200).json({ id: idBoard, lists, cards });
        } else {
            board = await new Board({ name }).save();
            const idBoard = board._id;
            const [todo, doing, done] = await Promise.all([
                new List({ name: 'To Do', idBoard, pos: posIncr }).save(),
                new List({ name: 'Doing', idBoard, pos: posIncr * 2 }).save(),
                new List({ name: 'Done', idBoard, pos: posIncr * 3 }).save()]);
            const [todoCards, doingCards, doneCards] = await Promise.all([
                Card.insertMany(todoList.map(c => ({ ...c, idBoard, idList: todo._id }))),
                Card.insertMany(doingList.map(c => ({ ...c, idBoard, idList: doing._id }))),
                Card.insertMany(doneList.map(c => ({ ...c, idBoard, idList: done._id })))
            ]);

            return res.status(200).json({ id: board._id, lists: [todo, doing, done], cards: [...todoCards, ...doingCards, ...doneCards] });
        }
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
};