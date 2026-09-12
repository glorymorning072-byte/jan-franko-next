const DEFAULT_TIMEOUT_MS = 8_000;

export class UpstreamError extends Error {
  status: number;

  constructor(message: string, status = 502) {
    super(message);
    this.name = "UpstreamError";
    this.status = status;
  }
}

export async function fetchWpJson<T>(
  path: string,
  options: RequestInit & { timeoutMs?: number; revalidate?: number } = {},
): Promise<T> {
  const baseUrl = (process.env.WORDPRESS_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://janfranko.com").replace(/\/$/, "");
  const { timeoutMs = DEFAULT_TIMEOUT_MS, revalidate = 600, ...fetchOptions } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${baseUrl}${path.startsWith("/") ? path : `/${path}`}`, {
      ...fetchOptions,
      signal: controller.signal,
      next: fetchOptions.cache === "no-store" ? undefined : { revalidate },
      headers: {
        Accept: "application/json",
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      throw new UpstreamError(`WordPress returned HTTP ${response.status}.`, response.status);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof UpstreamError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new UpstreamError(`WordPress did not respond within ${timeoutMs}ms.`, 504);
    }
    throw new UpstreamError(error instanceof Error ? error.message : "WordPress request failed.");
  } finally {
    clearTimeout(timer);
  }
}

