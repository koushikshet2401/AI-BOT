import Enquiry from "../models/enquiry-model.js";

// 🟢 GET ENQUIRIES (ADMIN → ALL | USER → OWN)

export const getAllEnquiries = async (req, res) => {
  try {
    // 🔐 token data from verifyToken middleware
    const jwtData = res.locals.jwtData;

    if (!jwtData) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized – No token data",
        enquiries: [],
      });
    }

    const userId = jwtData.id;
    const userRole = jwtData.role;

    let enquiries = [];

    // 🧠 ADMIN → see all
    if (userRole === "admin") {
      enquiries = await Enquiry.find().sort({ createdAt: -1 });
    }

    // 👤 NORMAL USER → see only own
    else {
      enquiries = await Enquiry.find({ user: userId }).sort({
        createdAt: -1,
      });
    }

    return res.status(200).json({
      success: true,
      enquiries,
    });

  } catch (error) {
    console.log("❌ ENQUIRY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching enquiries",
      enquiries: [], // ⭐ prevents frontend crash
    });
  }
};



// 🟡 UPDATE STATUS (ADMIN ONLY)

export const updateEnquiryStatus = async (req, res) => {
  try {
    const jwtData = res.locals.jwtData;

    if (!jwtData || jwtData.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      updatedEnquiry,
    });

  } catch (error) {
    console.log("❌ UPDATE ENQUIRY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error updating enquiry status",
    });
  }
};
