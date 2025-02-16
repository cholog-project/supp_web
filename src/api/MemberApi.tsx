import { BASE_URL } from '../constants';
import { SignInMember, SignUpMember } from 'model/Member';

// 회원가입 API 호출
export const useSignUpMember = async (member: SignUpMember): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('회원가입에 실패했습니다.');
    }
  } catch (error) {
    console.error(error);
    throw new Error('회원가입에 실패했습니다.');
  }
};

// 로그인 API 호출
export const useSignInMember = async (member: SignInMember): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.');
    }
  } catch (error) {
    console.error(error);
    throw new Error('로그인에 실패했습니다.');
  }
};

// 이메일 중복검사 API 호출
export const useEmailCheck = async (email: string): Promise<Response> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/email-validation?email=${email}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    return response;
  } catch (error) {
    throw new Error('오류가 발생했습니다. 관리자에게 문의하세요');
  }
};
