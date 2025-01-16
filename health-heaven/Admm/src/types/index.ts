export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  dateJoined: string;
  imageUrl: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  lastVisit: string;
}