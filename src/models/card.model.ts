import { Document, Schema, model } from "mongoose";

interface ICard extends Document {
    name: string
}

const cardSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: { createdAt: "create_at", updatedAt: "update_at" },
    }
);

export default model<ICard>("Card", cardSchema, "se_card");
