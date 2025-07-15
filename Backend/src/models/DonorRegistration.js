const donorRegistrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentDate: { type: Date, required: true },
  consent: { type: Boolean, required: true },
  reminders: { type: Boolean, required: true },
}, { timestamps: true });

export default mongoose.model("DonorRegistration", donorRegistrationSchema);
