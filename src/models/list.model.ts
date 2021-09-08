import { Document, Schema, model } from "mongoose";

interface IList extends Document {
    idBoard: string,
    name: string,
    pos: number,
    subscribed: boolean,
}

const listSchema = new Schema(
    {
        idBoard: { type: String, required: true },
        name: { type: String, required: true },
        pos: { type: Number, required: true },
        subscribed: { type: Boolean, default: false },
    },
    {
        versionKey: false,
        timestamps: { createdAt: "create_at", updatedAt: "update_at" },
    }
);

export default model<IList>("List", listSchema, "se_list");
