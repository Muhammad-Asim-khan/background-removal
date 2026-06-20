import { AIProvider } from "./types";
import { RemoveBgProvider } from "./removebg-provider";
import { ClipdropProvider } from "./clipdrop-provider";
import { PhotoroomProvider } from "./photoroom-provider";
import { ReplicateProvider } from "./replicate-provider";
import { CustomModelProvider } from "./custom-provider";

export type { AIProvider } from "./types";
export type {
  RemoveBackgroundOptions,
  RemoveBackgroundResult,
  UpscaleImageOptions,
  UpscaleImageResult,
  ReplaceBackgroundOptions,
  ReplaceBackgroundResult,
  GenerateBackgroundOptions,
  GenerateBackgroundResult,
} from "./types";

export type ProviderType =
  | "removebg"
  | "clipdrop"
  | "photoroom"
  | "replicate"
  | "custom";

interface ProviderConfig {
  provider: ProviderType;
  apiKey: string;
  baseUrl?: string;
  isActive: boolean;
  priority: number;
}

let providerConfigs: ProviderConfig[] = [];
let cachedProviders: Map<string, AIProvider> = new Map();

export function configureProviders(configs: ProviderConfig[]): void {
  providerConfigs = configs
    .filter((c) => c.isActive)
    .sort((a, b) => b.priority - a.priority);
  cachedProviders.clear();
}

function createProvider(config: ProviderConfig): AIProvider {
  switch (config.provider) {
    case "removebg":
      return new RemoveBgProvider(config.apiKey);
    case "clipdrop":
      return new ClipdropProvider(config.apiKey);
    case "photoroom":
      return new PhotoroomProvider(config.apiKey);
    case "replicate":
      return new ReplicateProvider(config.apiKey);
    case "custom":
      return new CustomModelProvider(
        config.apiKey,
        config.baseUrl || ""
      );
    default:
      throw new Error(`Unknown provider: ${config.provider}`);
  }
}

export function getProvider(type?: ProviderType): AIProvider {
  if (type) {
    const cached = cachedProviders.get(type);
    if (cached) return cached;

    const config = providerConfigs.find((c) => c.provider === type);
    if (!config) {
      throw new Error(`Provider ${type} not configured or inactive`);
    }

    const provider = createProvider(config);
    cachedProviders.set(type, provider);
    return provider;
  }

  if (providerConfigs.length === 0) {
    throw new Error("No AI providers configured");
  }

  const topConfig = providerConfigs[0];
  const cached = cachedProviders.get(topConfig.provider);
  if (cached) return cached;

  const provider = createProvider(topConfig);
  cachedProviders.set(topConfig.provider, provider);
  return provider;
}

export async function getAvailableProvider(): Promise<AIProvider> {
  for (const config of providerConfigs) {
    try {
      const provider = getProvider(config.provider);
      if (await provider.isAvailable()) {
        return provider;
      }
    } catch {
      continue;
    }
  }
  throw new Error("No AI providers available");
}

export function listProviders(): ProviderConfig[] {
  return [...providerConfigs];
}
