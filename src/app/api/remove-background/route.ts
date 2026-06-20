import { NextRequest } from "next/server";
import { getProvider } from "@/lib/ai-providers";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const contentType = request.headers.get("content-type") || "";

    let imageBuffer: Buffer;
    let format = "png";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const imageFile = formData.get("image") as File | null;
      if (!imageFile) {
        return Response.json({ error: "No image provided" }, { status: 400 });
      }
      const arrayBuffer = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
      format = (formData.get("format") as string) || "png";
    } else {
      const body = await request.json();
      if (!body.image_url && !body.image_base64) {
        return Response.json(
          { error: "Provide image_url or image_base64" },
          { status: 400 }
        );
      }

      if (body.image_url) {
        const imageResponse = await fetch(body.image_url);
        if (!imageResponse.ok) {
          return Response.json(
            { error: "Failed to fetch image from URL" },
            { status: 400 }
          );
        }
        imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
      } else {
        imageBuffer = Buffer.from(body.image_base64 as string, "base64");
      }
      format = body.format || "png";
    }

    const provider = getProvider();
    const result = await provider.removeBackground({
      imageBuffer,
      format: format as "png" | "jpg" | "webp",
    });

    return new Response(new Uint8Array(result.imageBuffer), {
      headers: {
        "Content-Type": `image/${format}`,
        "X-Credits-Used": String(result.creditsUsed),
        "X-Width": String(result.width),
        "X-Height": String(result.height),
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
