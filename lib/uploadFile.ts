import { writeFile } from "fs/promises";
import { join } from "path";

export const uploadFile = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const name = file.name.split(".")[0];
  const ext = file.name.split(".").pop();
  const newFilename = `${name}-${Date.now()}.${ext}`;
  const path = join(process.cwd(), "public", "uploads", newFilename);

  await writeFile(path, buffer);
  return { filename: newFilename, path };
};
