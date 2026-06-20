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

    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;
    const scale = parseInt((formData.get("scale") as string) || "2", 10);

    if (!imageFile) {
      return Response.json({ error: "No image provided" }, { status: 400 });
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const provider = getProvider();
    if (!provider.upscaleImage) {
      return Response.json(
        { error: "Current provider does not support upscaling" },
        { status: 501 }
      );
    }

    const result = await provider.upscaleImage({ imageBuffer, scale });

    return new Response(new Uint8Array(result.imageBuffer), {
      headers: {
        "Content-Type": "image/png",
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
