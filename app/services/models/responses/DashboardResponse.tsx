export type GetUsersBySearchResponse = {
  status: 'ERROR' | 'SUCCESS';
  message: string;
  data: [
    {
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
      followersCount: number;
      followingCount: number;
      isFollowed: boolean;
      profilePicture: {
        bucket: string;
        key: string;
        mediaType: any;
        type: string;
        s3Url: string;
      };
    },
  ];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};
