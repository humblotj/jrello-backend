import { Document, Schema, model } from "mongoose";

interface ICard extends Document {
    name: string,
    idBoard: string,
    idList: string,
    pos: number,
    subscribed: boolean,
    desc: string,
    closed: boolean,
}

const cardSchema = new Schema(
    {
        name: { type: String, required: true },
        idBoard: { type: String, required: true },
        idList: { type: String, required: true },
        pos: { type: Number, required: true },
        subscribed: { type: Boolean, default: false },
        desc: { type: String, required: true },
        closed: { type: Boolean, default: false },
    },
    {
        versionKey: false,
        timestamps: { createdAt: "create_at", updatedAt: "update_at" },
    }
);

export default model<ICard>("Card", cardSchema, "se_card");
