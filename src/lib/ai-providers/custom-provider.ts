import {
  AIProvider,
  RemoveBackgroundOptions,
  RemoveBackgroundResult,
  UpscaleImageOptions,
  UpscaleImageResult,
  ReplaceBackgroundOptions,
  ReplaceBackgroundResult,
  GenerateBackgroundOptions,
  GenerateBackgroundResult,
} from "./types";

export class CustomModelProvider implements AIProvider {
  name = "Custom Model";
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async removeBackground(
    options: RemoveBackgroundOptions
  ): Promise<RemoveBackgroundResult> {
    const formData = new FormData();
    formData.append(
      "image",
      new Blob([new Uint8Array(options.imageBuffer)]),
      "image.png"
    );
    if (options.format) formData.append("format", options.format);

    const response = await fetch(
      `${this.baseUrl}/remove-background`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${this.apiKey}` },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Custom model API error: ${await response.text()}`
      );
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

  async upscaleImage(
    options: UpscaleImageOptions
  ): Promise<UpscaleImageResult> {
    const formData = new FormData();
    formData.append(
      "image",
      new Blob([new Uint8Array(options.imageBuffer)]),
      "image.png"
    );
    formData.append("scale", String(options.scale || 2));

    const response = await fetch(`${this.baseUrl}/upscale`, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.apiKey}` },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Custom model API error: ${await response.text()}`);
    }

    const resultBuffer = Buffer.from(await response.arrayBuffer());
    return { imageBuffer: resultBuffer, width: 0, height: 0 };
  }

  async replaceBackground(
    options: ReplaceBackgroundOptions
  ): Promise<ReplaceBackgroundResult> {
    const formData = new FormData();
    formData.append(
      "image",
      new Blob([new Uint8Array(options.imageBuffer)]),
      "image.png"
    );
    if (options.backgroundPrompt) {
      formData.append("prompt", options.backgroundPrompt);
    }
    if (options.backgroundImageBuffer) {
      formData.append(
        "background",
        new Blob([new Uint8Array(options.backgroundImageBuffer)]),
        "background.png"
      );
    }

    const response = await fetch(
      `${this.baseUrl}/replace-background`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${this.apiKey}` },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Custom model API error: ${await response.text()}`);
    }

    const resultBuffer = Buffer.from(await response.arrayBuffer());
    return { imageBuffer: resultBuffer, width: 0, height: 0 };
  }

  async generateBackground(
    options: GenerateBackgroundOptions
  ): Promise<GenerateBackgroundResult> {
    const response = await fetch(
      `${this.baseUrl}/generate-background`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: options.prompt,
          width: options.width || 1024,
          height: options.height || 768,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Custom model API error: ${await response.text()}`);
    }

    const resultBuffer = Buffer.from(await response.arrayBuffer());
    return {
      imageBuffer: resultBuffer,
      width: options.width || 1024,
      height: options.height || 768,
    };
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
