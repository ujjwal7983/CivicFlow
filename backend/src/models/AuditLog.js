import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    grievance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grievance",
      required: true,
    },

    action: {
      type: String,
      enum: [
        "CREATED",
        "ASSIGNED",
        "STARTED",
        "ESCALATED",
        "RESOLVED",
        "CLOSED",
      ],
      required: true,
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, 
    },

    role: {
      type: String, 
      required: true,
    },

    meta: {
      type: Object, 
      default: {},
    },
  },
  { timestamps: true }
);

const AuditLog = mongoose.model("AuditLog", auditLogSchema);
export default AuditLog;
