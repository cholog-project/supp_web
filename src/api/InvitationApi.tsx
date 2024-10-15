import { InvitationResult } from 'model/Invitation';
import { BASE_URL } from '../constants';
import { CreateInvitationForm, JoinInvitationForm } from 'model/Invitation';

// 스터디 초대 링크 만들기 API
export const useGetInviteUrl = async (
  form: CreateInvitationForm,
): Promise<InvitationResult> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/invitation?memberType=${form.memberType}&studyId=${form.studyId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    if (!response.ok) {
      throw new Error('초대링크 생성에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('초대링크 생성에 실패했습니다.');
  }
};

// 스터디 참여 API
export const useJoinGroup = async (form: JoinInvitationForm): Promise<void> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/groups/join?token=${form.token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    if (!response.ok) {
      throw new Error('스터디 참여에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('스터디 참여에 실패했습니다.');
  }
};
