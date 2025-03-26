// const mongoose = require("mongoose");

// const CallSchema = new mongoose.Schema(
//   {
//     caller: {
//       type: mongoose.Schema.Types.ObjectId,
//       refPath: "callerModel", // Dynamic reference (Newuser or Ddoctor)
//       required: true,
//     },
//     callerModel: {
//       type: String,
//       enum: ["Newuser", "Ddoctor"], // Can be a user or a doctor
//       required: true,
//     },
//     receiver: {
//       type: mongoose.Schema.Types.ObjectId,
//       refPath: "receiverModel", // Dynamic reference (Newuser or Ddoctor)
//       required: true,
//     },
//     receiverModel: {
//       type: String,
//       enum: ["Newuser", "Ddoctor"], // Can be a user or a doctor
//       required: true,
//     },
//     callType: { type: String, enum: ["audio", "video"], required: true },
//     status: { type: String, enum: ["missed", "completed", "ongoing"], default: "ongoing" }, // Call status
//     duration: { type: Number, default: 0 }, // Call duration in seconds
//     callId: { type: String, unique: true }, // Unique Call ID
//   },
//   { timestamps: true }
// );

// const Call = mongoose.model("Call", CallSchema);
// module.exports = Call;

const mongoose = require("mongoose");

const CallSchema = new mongoose.Schema(
  {
    caller: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "callerModel", // Dynamic reference (Newuser or Ddoctor)
      required: true,
    },
    callerModel: {
      type: String,
      enum: ["Newuser", "Ddoctor"], // Can be a user or a doctor
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "receiverModel", // Dynamic reference (Newuser or Ddoctor)
      required: true,
    },
    receiverModel: {
      type: String,
      enum: ["Newuser", "Ddoctor"], // Can be a user or a doctor
      required: true,
    },
    callType: { type: String, enum: ["audio", "video"], required: true },
    status: { type: String, enum: ["missed", "completed", "ongoing"], default: "ongoing" }, // Call status
    duration: { type: Number, default: 0 }, // Call duration in seconds
    callId: { type: String, unique: true, required: true, index: true }, // Unique Call ID
  },
  { timestamps: true }
);

const Call = mongoose.model("Call", CallSchema);
module.exports = Call;
