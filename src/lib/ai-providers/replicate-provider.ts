import {
  AIProvider,
  RemoveBackgroundOptions,
  RemoveBackgroundResult,
} from "./types";

export class ReplicateProvider implements AIProvider {
  name = "Replicate";
  private apiKey: string;
  private baseUrl = "https://api.replicate.com/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async removeBackground(
    options: RemoveBackgroundOptions
  ): Promise<RemoveBackgroundResult> {
    const base64Image = options.imageBuffer.toString("base64");
    const dataUri = `data:image/png;base64,${base64Image}`;

    const createResponse = await fetch(`${this.baseUrl}/predictions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version:
          "fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003",
        input: { image: dataUri },
      }),
    });

    if (!createResponse.ok) {
      throw new Error(
        `Replicate API error: ${await createResponse.text()}`
      );
    }

    const prediction = await createResponse.json();
    let result = prediction;

    while (
      result.status !== "succeeded" &&
      result.status !== "failed"
    ) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const pollResponse = await fetch(
        `${this.baseUrl}/predictions/${result.id}`,
        {
          headers: { Authorization: `Bearer ${this.apiKey}` },
        }
      );
      result = await pollResponse.json();
    }

    if (result.status === "failed") {
      throw new Error(`Replicate prediction failed: ${result.error}`);
    }

    const outputUrl = result.output;
    const imageResponse = await fetch(outputUrl);
    const resultBuffer = Buffer.from(await imageResponse.arrayBuffer());

    return {
      imageBuffer: resultBuffer,
      width: 0,
      height: 0,
      format: options.format || "png",
      creditsUsed: 1,
    };
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: { Authorization: `Bearer ${this.apiKey}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}
