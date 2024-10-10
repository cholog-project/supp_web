import { BASE_URL } from '../constants';
import { CreateStudyForm, GroupInfo } from 'model/Study';

// 그룹 목록 조회 API 호출
export const useGetGroups = async (): Promise<GroupInfo[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/groups`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('스터디 조회에 실패했습니다.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('스터디 조회에 실패했습니다.');
  }
};

// 그룹 상세 조회 API 호출
export const useGetGroupDetail = async (
  groupId: number,
): Promise<GroupInfo> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/groups/${groupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('스터디 상세 조회에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('스터디 상세 조회에 실패했습니다.');
  }
};

// 스터디 생성 API 호출
export const useCreateStudy = async (
  form: CreateStudyForm,
): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('스터디 생성에 실패했습니다.');
    }
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('스터디 생성에 실패했습니다.');
  }
};
