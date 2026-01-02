import cron from "node-cron";
import Grievance from "../models/Grievance.js";

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

        console.log(`⚠️ Escalated grievance ${grievance._id}`);
      }
    } catch (error) {
      console.error("Escalation job error:", error.message);
    }
  });
};

export default escalationJob;
