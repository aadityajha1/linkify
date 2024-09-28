import { uploadFile } from "@/lib/uploadFile";

export async function POST(req: Request, res: Response) {
  const formData = await req.formData();
  console.log(formData, formData.getAll("files"));
  const files = formData.getAll("files");
  let uploadedFiles: any[] = [];
  for (let file of files) {
    const { filename, path } = await uploadFile(file as File);
    console.log("File uploaded successfully", filename, path);
    uploadedFiles.push({ filename, path });
  }
  //   const uploadedFiles = uploadFile()
  return Response.json({ message: "Form submitted successfully", status: 200 });
}
