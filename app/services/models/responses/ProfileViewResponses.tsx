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
