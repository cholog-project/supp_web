export interface GroupInfo {
  studyId: number;
  studyName: string;
  organization: string;
  peopleCount: number;
}

export interface CreateStudyForm {
  studyName: string;
  organization: string;
}
