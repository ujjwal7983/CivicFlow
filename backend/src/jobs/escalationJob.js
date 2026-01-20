import cron from "node-cron";
import Grievance from "../models/Grievance.js";
import createAuditLog from "../utils/createAuditLog.js";

const ASSIGNED_SLA_HOURS = 24;
const IN_PROGRESS_SLA_HOURS = 72;
const MAX_ESCALATION_LEVEL = 3;

const hoursAgo = (hours) => {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  return d;
};

const escalationJob = () => {
  cron.schedule("*/15 * * * *", async () => {
    console.log("Running escalation job...");

    try {
      // ===============================
      // 1️ASSIGNED SLA (24h not started)
      // ===============================
      const assignedBreaches = await Grievance.find({
        status: "ASSIGNED",
        assignedAt: { $lte: hoursAgo(ASSIGNED_SLA_HOURS) },
        escalationLevel: { $lt: MAX_ESCALATION_LEVEL },
        lastEscalationStage: { $ne: "ASSIGNED" }, //  idempotency guard
      });

      for (const grievance of assignedBreaches) {
        grievance.escalationLevel += 1;
        grievance.lastEscalatedAt = new Date();
        grievance.lastEscalationStage = "ASSIGNED";

        await grievance.save();

        await createAuditLog({
          grievanceId: grievance._id,
          action: "ESCALATED",
          role: "SYSTEM",
          meta: {
            escalationLevel: grievance.escalationLevel,
            slaHours: ASSIGNED_SLA_HOURS,
            reason: "ASSIGNED SLA breached (not started)",
          },
        });

        console.log(`Escalated (ASSIGNED) ${grievance._id}`);
      }

      // ==================================
      // 2️ IN_PROGRESS SLA (72h not resolved)
      // ==================================
      const inProgressBreaches = await Grievance.find({
        status: "IN_PROGRESS",
        startedAt: { $lte: hoursAgo(IN_PROGRESS_SLA_HOURS) },
        escalationLevel: { $lt: MAX_ESCALATION_LEVEL },
        lastEscalationStage: { $ne: "IN_PROGRESS" }, // idempotency guard
      });

      for (const grievance of inProgressBreaches) {
        grievance.escalationLevel += 1;
        grievance.lastEscalatedAt = new Date();
        grievance.lastEscalationStage = "IN_PROGRESS";

        await grievance.save();

        await createAuditLog({
          grievanceId: grievance._id,
          action: "ESCALATED",
          role: "SYSTEM",
          meta: {
            escalationLevel: grievance.escalationLevel,
            slaHours: IN_PROGRESS_SLA_HOURS,
            reason: "IN_PROGRESS SLA breached",
          },
        });

        console.log(`Escalated (IN_PROGRESS) ${grievance._id}`);
      }
    } catch (err) {
      console.error("Escalation job error:", err.message);
    }
  });
};

export default escalationJob;
