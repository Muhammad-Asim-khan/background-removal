import { NextRequest } from "next/server";

export async function GET() {
  // Demo response - in production, query DB for user's API keys
  return Response.json({
    keys: [
      {
        id: "key_1",
        name: "Production App",
        key: "bgai_prod_***************8f2a",
        lastUsed: "2026-06-20T11:15:00Z",
        createdAt: "2026-01-15T00:00:00Z",
        isActive: true,
      },
      {
        id: "key_2",
        name: "Development",
        key: "bgai_dev_***************3c1b",
        lastUsed: "2026-06-19T08:30:00Z",
        createdAt: "2026-03-01T00:00:00Z",
        isActive: true,
      },
    ],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name) {
      return Response.json(
        { error: "API key name is required" },
        { status: 400 }
      );
    }

    // In production, generate a real API key and store in DB
    const apiKey = `bgai_${crypto.randomUUID().replace(/-/g, "").slice(0, 32)}`;

    return Response.json({
      id: crypto.randomUUID(),
      name: body.name,
      key: apiKey,
      createdAt: new Date().toISOString(),
      isActive: true,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create API key";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyId = searchParams.get("id");

    if (!keyId) {
      return Response.json(
        { error: "API key ID is required" },
        { status: 400 }
      );
    }

    // In production, delete from DB
    return Response.json({ deleted: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete API key";
    return Response.json({ error: message }, { status: 500 });
  }
}
