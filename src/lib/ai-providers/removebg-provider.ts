import {
  AIProvider,
  RemoveBackgroundOptions,
  RemoveBackgroundResult,
} from "./types";

export class RemoveBgProvider implements AIProvider {
  name = "Remove.bg";
  private apiKey: string;
  private baseUrl = "https://api.remove.bg/v1.0";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async removeBackground(
    options: RemoveBackgroundOptions
  ): Promise<RemoveBackgroundResult> {
    const formData = new FormData();
    formData.append(
      "image_file",
      new Blob([new Uint8Array(options.imageBuffer)]),
      "image.png"
    );
    formData.append("size", options.size || "auto");
    formData.append("format", options.format || "png");

    if (options.bgColor) {
      formData.append("bg_color", options.bgColor);
    }

    const response = await fetch(`${this.baseUrl}/removebg`, {
      method: "POST",
      headers: {
        "X-Api-Key": this.apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Remove.bg API error: ${error}`);
    }

    const resultBuffer = Buffer.from(await response.arrayBuffer());
    const width = parseInt(
      response.headers.get("X-Width") || "0",
      10
    );
    const height = parseInt(
      response.headers.get("X-Height") || "0",
      10
    );

    return {
      imageBuffer: resultBuffer,
      width,
      height,
      format: options.format || "png",
      creditsUsed: 1,
    };
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/account`, {
        headers: { "X-Api-Key": this.apiKey },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
