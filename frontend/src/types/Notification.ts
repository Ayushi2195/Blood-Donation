export default interface Notification {
  _id: string;
  type: 'patient_request' | 'donor_approval' | 'emergency';
  data: {
    donorName?: string;
    donorPhone?: string;
    patientName?: string;
    patientPhone?: string;
    message?: string;
    hospitalName?: string;
    hospitalLocation?: string;
    bloodType?: string;
    unitsNeeded?: string;
    urgency?: string;
  };
  status: 'pending' | 'approved' | 'denied';
  createdAt: string;
}
