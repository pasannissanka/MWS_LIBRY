type GetProfileImgUploadUrlReqKey = 'file-type';
export type GetProfileImgUploadUrlRequest = {
  [key in GetProfileImgUploadUrlReqKey]?: string;
};

export type GetProfileImgUploadCompletedRequest = {
  key: string;
};

export type ReorderLinksRequestType = {
  links: [
    {
      id: string;
      order: number;
    },
  ];
};
