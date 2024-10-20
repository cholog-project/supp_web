import { BASE_URL } from '../constants';
import {
  CommentForm,
  CreatePostForm,
  PostDetailInfo,
  PostInfo,
} from 'model/Post';

// 질문 생성 API 호출
export const useCreatePost = async (
  form: CreatePostForm,
): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('질문 생성에 실패했습니다.');
    }
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('질문 생성에 실패했습니다.');
  }
};

// 질문 목록 조회 API
export const useGetPosts = async (groupId: number): Promise<PostInfo[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/posts?studyId=${groupId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    if (!response.ok) {
      throw new Error('스터디 목록 조회에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('스터디 목록 조회에 실패했습니다.');
  }
};

// 질문 단건 조회 API
export const useGetPostDetail = async (
  postId: number,
): Promise<PostDetailInfo> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('스터디 조회에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw new Error('스터디 조회에 실패했습니다.');
  }
};

// 답변 생성 API 호출
export const useCreateComment = async (
  form: CommentForm,
): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/posts/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('답변 생성에 실패했습니다.');
    }
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('답변 생성에 실패했습니다.');
  }
};

// 답변 삭제 API 호출
export const useDeleteComment = async (
  commentId: number,
): Promise<Response> => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/posts/comment/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );
    if (!response.ok) {
      throw new Error('답변 삭제에 실패했습니다.');
    }
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('답변 삭제에 실패했습니다.');
  }
};
