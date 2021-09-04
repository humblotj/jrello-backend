import { Document, Schema, model } from "mongoose";

interface IList extends Document {
    name: string
}

const listSchema = new Schema(
    {
        name: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: { createdAt: "create_at", updatedAt: "update_at" },
    }
);

export default model<IList>("List", listSchema, "se_list");
