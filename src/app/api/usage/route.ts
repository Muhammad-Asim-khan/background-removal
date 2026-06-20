import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return Response.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    // Demo response - in production this would query the database
    return Response.json({
      plan: "free",
      credits: {
        total: 10,
        used: 2,
        remaining: 8,
      },
      usage: {
        images_processed: 2,
        api_calls: 5,
        storage_used_mb: 12.5,
      },
      billing_period: {
        start: "2026-06-01T00:00:00Z",
        end: "2026-06-30T23:59:59Z",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
