export async function apiFetch<T>(
  input: RequestInfo | URL,
  init?: RequestInit & { timeoutMs?: number },
): Promise<T> {
  const { timeoutMs = 15_000, ...rest } = init ?? {};
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(input, {
      ...rest,
      signal: rest.signal ?? controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...rest.headers,
      },
    });

    const payload = (await response.json().catch(() => null)) as {
      ok?: boolean;
      data?: T;
      error?: string;
    } | null;

    if (!response.ok || payload?.ok === false) {
      throw new Error(payload?.error ?? `Request failed (${response.status})`);
    }

    if (payload && "data" in payload) {
      return payload.data as T;
    }

    return payload as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(
        "Request timed out. The server may be unable to reach the database.",
      );
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
