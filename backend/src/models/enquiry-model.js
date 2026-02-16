import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    query: {
      type: String,
      required: true,
    },

    aiResponse: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "RESOLVED"],
      default: "NEW",
    },

    needsHuman: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
