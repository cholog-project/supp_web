export interface InvitationResult {
  invitationLink: string;
}

export interface CreateInvitationForm {
  memberType: string;
  studyId: number;
}

export interface JoinInvitationForm {
  token: string;
}
