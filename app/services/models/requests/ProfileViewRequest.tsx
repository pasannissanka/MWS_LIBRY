type GetProfileImgUploadUrlReqKey = 'file-type';
export type GetProfileImgUploadUrlRequest = {
  [key in GetProfileImgUploadUrlReqKey]?: string;
};

export type GetProfileImgUploadCompletedRequest = {
  key: string;
};
