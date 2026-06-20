export interface RemoveBackgroundOptions {
  imageBuffer: Buffer;
  format?: "png" | "jpg" | "webp";
  size?: "preview" | "full" | "auto";
  bgColor?: string;
}

export interface RemoveBackgroundResult {
  imageBuffer: Buffer;
  width: number;
  height: number;
  format: string;
  creditsUsed: number;
}

export interface UpscaleImageOptions {
  imageBuffer: Buffer;
  scale?: number;
}

export interface UpscaleImageResult {
  imageBuffer: Buffer;
  width: number;
  height: number;
}

export interface ReplaceBackgroundOptions {
  imageBuffer: Buffer;
  backgroundPrompt?: string;
  backgroundImageBuffer?: Buffer;
  backgroundUrl?: string;
}

export interface ReplaceBackgroundResult {
  imageBuffer: Buffer;
  width: number;
  height: number;
}

export interface GenerateBackgroundOptions {
  prompt: string;
  width?: number;
  height?: number;
}

export interface GenerateBackgroundResult {
  imageBuffer: Buffer;
  width: number;
  height: number;
}

export interface AIProvider {
  name: string;
  removeBackground(
    options: RemoveBackgroundOptions
  ): Promise<RemoveBackgroundResult>;
  upscaleImage?(options: UpscaleImageOptions): Promise<UpscaleImageResult>;
  replaceBackground?(
    options: ReplaceBackgroundOptions
  ): Promise<ReplaceBackgroundResult>;
  generateBackground?(
    options: GenerateBackgroundOptions
  ): Promise<GenerateBackgroundResult>;
  isAvailable(): Promise<boolean>;
}
