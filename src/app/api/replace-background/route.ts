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
    const backgroundPrompt = formData.get("prompt") as string | null;
    const backgroundFile = formData.get("background") as File | null;

    if (!imageFile) {
      return Response.json({ error: "No image provided" }, { status: 400 });
    }

    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    let backgroundImageBuffer: Buffer | undefined;
    if (backgroundFile) {
      backgroundImageBuffer = Buffer.from(await backgroundFile.arrayBuffer());
    }

    const provider = getProvider();
    if (!provider.replaceBackground) {
      return Response.json(
        { error: "Current provider does not support background replacement" },
        { status: 501 }
      );
    }

    const result = await provider.replaceBackground({
      imageBuffer,
      backgroundPrompt: backgroundPrompt || undefined,
      backgroundImageBuffer,
    });

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
