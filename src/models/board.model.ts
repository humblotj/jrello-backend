import { Document, Schema, model } from "mongoose";

interface IBoard extends Document {
    name: string
}

const boardSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: { createdAt: "create_at", updatedAt: "update_at" },
    }
);

export default model<IBoard>("Board", boardSchema, "se_board");
