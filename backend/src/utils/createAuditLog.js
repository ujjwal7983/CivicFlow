import AuditLog from "../models/AuditLog.js";

const createAuditLog = async ({
  grievanceId,
  action,
  performedBy = null,
  role,
  meta = {},
}) => {
  await AuditLog.create({
    grievance: grievanceId,
    action,
    performedBy,
    role,
    meta,
  });
};

export default createAuditLog;
