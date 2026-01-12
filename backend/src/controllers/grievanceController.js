import Grievance from "../models/Grievance.js";
import User from "../models/User.js";
import createAuditLog from "../utils/createAuditLog.js";

// ------------------ CREATE GRIEVANCE (CITIZEN) ------------------
export const createGrievance = async (req, res) => {
  try {
    const { title, description, department } = req.body;

    if (!title || !description || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const grievance = await Grievance.create({
      title,
      description,
      department,
      createdBy: req.user.id,
    });

    // ✅ AUDIT LOG
    await createAuditLog({
      grievanceId: grievance._id,
      action: "CREATED",
      performedBy: req.user.id,
      role: "CITIZEN",
    });

    res.status(201).json({
      message: "Grievance submitted successfully",
      grievance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ GET MY GRIEVANCES (CITIZEN) ------------------
export const getMyGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({
      createdBy: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      count: grievances.length,
      grievances,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ GET ALL GRIEVANCE (ADMIN) ------------------

export const getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.aggregate([
      {
        $addFields: {
          statusOrder: {
            $indexOfArray: [
              [
                "SUBMITTED",
                "ASSIGNED",
                "IN_PROGRESS",
                "RESOLVED",
                "ESCALATED",
                "CLOSED"
              ],
              "$status"
            ]
          }
        }
      },
      {
        $sort: {
          statusOrder: 1, 
          createdAt: 1      
        }
      },
      {
        $project: { statusOrder: 0 }
      }
    ]);

    res.status(200).json({
      count: grievances.length,
      grievances
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ------------------ GET Grievance Info ------------------
export const getGrievance = async (req, res) =>{
  try {
    let { id } = req.params;
    let grievance = await Grievance.findById(id).populate("createdBy").populate("assignedTo");

    if(!grievance){
      return res.status(404).json({message : "Grievance does not exsist"});
    }

    res.status(200).json(grievance);
  } catch (err) {
    res.status(500).json({message : "Internal Server Error"});
  }
}


// ------------------ ASSIGN GRIEVANCE (ADMIN) ------------------
export const assignGrievance = async (req, res) => {
  try {
    const { id } = req.params;
    const { officerId } = req.body;

    if (!officerId) {
      return res.status(400).json({ message: "Officer ID is required" });
    }

    const grievance = await Grievance.findById(id);
    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    const officer = await User.findById(officerId);
    if (!officer || officer.role !== "OFFICER") {
      return res.status(400).json({ message: "Invalid officer ID" });
    }

    grievance.assignedTo = officerId;
    grievance.status = "ASSIGNED";
    grievance.assignedAt = new Date();

    await grievance.save();

    // ✅ AUDIT LOG
    await createAuditLog({
      grievanceId: grievance._id,
      action: "ASSIGNED",
      performedBy: req.user.id,
      role: "ADMIN",
      meta: { assignedTo: officerId },
    });

    res.json({
      message: "Grievance assigned successfully",
      grievance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ GET ASSIGNED GRIEVANCES (OFFICER) ------------------
export const getAssignedGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find({
      assignedTo: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      count: grievances.length,
      grievances,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ START GRIEVANCE (OFFICER) ------------------
export const startGrievance = async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);
    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    if (grievance.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (grievance.status !== "ASSIGNED") {
      return res.status(400).json({ message: "Grievance must be ASSIGNED to start" });
    }

    grievance.status = "IN_PROGRESS";
    grievance.startedAt = new Date();

    await grievance.save();

    // ✅ AUDIT LOG
    await createAuditLog({
      grievanceId: grievance._id,
      action: "STARTED",
      performedBy: req.user.id,
      role: "OFFICER",
    });

    res.json({
      message: "Grievance marked as IN_PROGRESS",
      grievance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ RESOLVE GRIEVANCE (OFFICER) ------------------
export const resolveGrievance = async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);
    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }

    if (grievance.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (grievance.status !== "IN_PROGRESS") {
      return res.status(400).json({ message: "Grievance must be IN_PROGRESS to resolve" });
    }

    grievance.status = "RESOLVED";
    grievance.resolvedAt = new Date();

    await grievance.save();

    // ✅ AUDIT LOG
    await createAuditLog({
      grievanceId: grievance._id,
      action: "RESOLVED",
      performedBy: req.user.id,
      role: "OFFICER",
    });

    res.json({
      message: "Grievance resolved successfully",
      grievance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
