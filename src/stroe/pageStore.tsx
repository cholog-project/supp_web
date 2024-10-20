import { create } from 'zustand';

type GroupStore = {
  groupId: number;
  setGroupId: (other: number) => void;
};

export const useGroupStore = create<GroupStore>((set) => ({
  groupId: 1,
  setGroupId: (other) =>
    set(() => ({
      groupId: other,
    })),
}));
