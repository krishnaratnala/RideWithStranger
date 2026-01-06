export const uploadToCloud = async (
  file: Express.Multer.File
): Promise<string> => {
  // TEMP: Just return filename
  return file.filename;
};
