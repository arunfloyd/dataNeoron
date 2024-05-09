const CountModel = require("../models/countModel");

exports.updateTotalCount = async (req, res, next) => {
  try {
    await ProductCountModel.findOneAndUpdate(
      {},
      { $inc: { totalCount: 1 } },
      { upsert: true }
    );
    next();
  } catch (error) {
    console.error("Error updating total count:", error);
    next(error);
  }
};
