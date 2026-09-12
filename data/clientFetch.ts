// Simple client-side cache to prevent duplicate concurrent or consecutive API fetches on the client
const promiseCache: Record<string, Promise<unknown> | undefined> = {};
const responseCache: Record<string, unknown> = {};

export async function clientFetch<T>(url: string): Promise<T> {
  if (typeof window === "undefined") {
    // Fallback to direct fetch on the server side
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Server fetch failed for: ${url}`);
    return res.json();
  }

  // If we already have the resolved data, return it immediately
  const cachedResponse = responseCache[url];
  if (cachedResponse !== undefined) {
    return cachedResponse as T;
  }

  // If a fetch is already in progress, return the existing promise
  const cachedPromise = promiseCache[url];
  if (cachedPromise !== undefined) {
    return cachedPromise as Promise<T>;
  }

  const promise = fetch(url)
    .then(async (res) => {
      if (!res.ok) {
        delete promiseCache[url];
        throw new Error(`Client fetch failed for ${url} with status: ${res.status}`);
      }
      const data = await res.json();
      responseCache[url] = data;
      delete promiseCache[url];
      return data;
    })
    .catch((err) => {
      delete promiseCache[url];
      throw err;
    });

  promiseCache[url] = promise;
  return promise as Promise<T>;
}
