export function getFileNameFromUrl(urlStr: string): string | null {
  try {
    const url = new URL(urlStr);
    const filename = url.pathname.split("/").pop();
    return filename && filename.includes(".") ? filename : null;
  } catch {
    return null;
  }
}
