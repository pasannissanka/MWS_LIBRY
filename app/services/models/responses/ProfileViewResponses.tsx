export type GetProfileImgUploadUrlResponse = {
  data: {
    media: {
      key: string;
      uploadedUserId: string;
      type: string;
      mediaType: string;
      bucket: string;
      uploadUrl: string;
      expireTime: string;
      s3Url: any;
      isCompleted: boolean;
      id: string;
      created: string;
    };
    uploadUrl: string;
  };
  message: string;
};

export type GetProfileImgUploadCompletedResponse = {
  data: {
    profilePicture: {
      id: string;
      key: string;
      uploadedUserId: string;
      type: string;
      mediaType: any;
      s3Url: string;
      bucket: string;
      uploadUrl: string;
      expireTime: any;
      isCompleted: boolean;
      created: string;
    };
  };
  message: string;
};

export type LinksUpdateResponseType = {
  status: 'ERROR' | 'SUCCESS';
  message: string;
  data: [
    {
      id: string;
      url: string;
      title: string;
      createdAt: string;
      order: number;
    },
  ];
};
