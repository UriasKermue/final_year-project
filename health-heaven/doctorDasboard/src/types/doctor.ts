export interface DoctorBasicInfo {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface DoctorQualifications {
  licenseNumber: string;
  specialty: string;
  yearsOfExperience: number;
  hospitalAffiliation: string;
  certifications: File[];
}

export interface DoctorIdentification {
  governmentId: File | null;
  profilePicture: File | null;
}

export type DoctorFormData = DoctorBasicInfo & DoctorQualifications & DoctorIdentification;

export type OnboardingStep = 'basic-info' | 'qualifications' | 'identification' | 'review';