import cron from "node-cron";
import Grievance from "../models/Grievance.js";
import createAuditLog from "../utils/createAuditLog.js";


const IN_PROGRESS_SLA_HOURS = 72;
const MAX_ESCALATION_LEVEL = 3;

const hoursAgo = (hours) => {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  return d;
};

const escalationJob = () => {
  cron.schedule("*/15 * * * *", async () => {
    console.log(" Running escalation job...");

    try {
      const overdueGrievances = await Grievance.find({
        status: "IN_PROGRESS",
        startedAt: { $lte: hoursAgo(IN_PROGRESS_SLA_HOURS) },
        escalationLevel: { $lt: MAX_ESCALATION_LEVEL },
      });

      for (const grievance of overdueGrievances) {
        grievance.status = "ESCALATED";
        grievance.escalationLevel += 1;
        grievance.lastEscalatedAt = new Date();

        await grievance.save();

      // ESCALATED AUDIT LOG (SYSTEM)
      await createAuditLog({
        grievanceId: grievance._id,
        action: "ESCALATED",
        performedBy: null,
        role: "SYSTEM",
        meta: {
          escalationLevel: grievance.escalationLevel,
          slaHours: IN_PROGRESS_SLA_HOURS,
          reason: "IN_PROGRESS SLA breached",
        },
      });

        console.log(`⚠️ Escalated grievance ${grievance._id}`);
      }
    } catch (error) {
      console.error("Escalation job error:", error.message);
    }
  });
};

export default escalationJob;
