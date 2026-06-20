import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "Invalid file type. Supported: JPG, PNG, WEBP" },
        { status: 400 }
      );
    }

    const maxSize = 25 * 1024 * 1024; // 25MB
    if (file.size > maxSize) {
      return Response.json(
        { error: "File too large. Maximum size is 25MB" },
        { status: 400 }
      );
    }

    // In production, upload to S3/cloud storage
    // For now, return a demo response
    const fileId = crypto.randomUUID();

    return Response.json({
      id: fileId,
      url: `/uploads/${fileId}`,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
