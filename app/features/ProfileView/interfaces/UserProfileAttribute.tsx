export type UserProfileAttribute = {
  id: string;
  email: string;
  username: string;
  phone_number: string;
  description: string;
  name: string;
  birth_date: string;
  userConfirmed: boolean;
  email_verified: boolean;
  phone_number_verified: boolean;
  followers: [];
  following: [];
  links: [
    {
      id: string;
      url: string;
      title: string;
      createdAt: string;
      order: number;
    },
  ];
  profilePicture: object;
  followersCount: number;
  followingCount: number;
};
