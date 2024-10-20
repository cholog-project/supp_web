import { create } from 'zustand';

type GroupStore = {
  groupId: number;
  setGroupId: (other: number) => void;
};

export const useGroupStore = create<GroupStore>((set) => ({
  groupId: 0,
  setGroupId: (other) =>
    set(() => ({
      groupId: other,
    })),
}));

type PostStore = {
  postId: number;
  setPostId: (other: number) => void;
};

export const usePostStore = create<PostStore>((set) => ({
  postId: 0,
  setPostId: (other) =>
    set(() => ({
      postId: other,
    })),
}));
