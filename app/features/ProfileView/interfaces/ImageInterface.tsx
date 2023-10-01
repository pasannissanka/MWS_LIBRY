export type ImageInterface = {
  path: string;
  size: number;
  width: number;
  height: number;
  mime: string;
  exif?: null | object;

  /**
   * Selected image's localidentifier, used for PHAsset searching.
   *
   * @platform iOS only
   */
  localIdentifier?: string;

  /**
   * Selected image's source path, do not have write access.
   *
   * @platform iOS only
   */
  sourceURL?: string;

  /**
   * Selected image/video's filename.
   *
   * @platform iOS only
   */
  filename?: string;

  /**
   * UNIX timestamp when image was created.
   *
   * @platform iOS only
   */
  creationDate?: string;
  modificationDate?: string;
  data?: string | null;
};
