export interface SignInMember {
  email: string;
  password: string;
}

export interface SignUpMember {
  email: string;
  password: string;
}

export type MemberType = 'NODE' | 'LEAF' | 'FRUIT';
