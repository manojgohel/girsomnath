import mongoose from "mongoose";

const DirectorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    category: { type: String, required: true },
    phone: { type: String, required: true },
    altPhone: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    email: { type: String, default: "" },
    timing: { type: String, default: "" },
    address: { type: String, required: true },
    town: { type: String, default: "" },
    taluka: { type: String, required: true },
    image: { type: String, default: "/images/directory/shops.svg" },
    gallery: { type: [String], default: [] },
    description: { type: String, default: "" },
    services: { type: [String], default: [] },
    verified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Directory =
  mongoose.models.Directory || mongoose.model("Directory", DirectorySchema);
