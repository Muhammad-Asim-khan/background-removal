import {
  AIProvider,
  RemoveBackgroundOptions,
  RemoveBackgroundResult,
} from "./types";

export class PhotoroomProvider implements AIProvider {
  name = "Photoroom";
  private apiKey: string;
  private baseUrl = "https://sdk.photoroom.com/v1";

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

    if (options.bgColor) {
      formData.append("bg_color", options.bgColor);
    }

    const response = await fetch(`${this.baseUrl}/segment`, {
      method: "POST",
      headers: {
        "x-api-key": this.apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Photoroom API error: ${error}`);
    }

    const resultBuffer = Buffer.from(await response.arrayBuffer());

    return {
      imageBuffer: resultBuffer,
      width: 0,
      height: 0,
      format: options.format || "png",
      creditsUsed: 1,
    };
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey;
  }
}
