export function generateRandomCode(length: number = 6): string {
  const uuid = crypto.randomUUID().replace(/-/g, '');
  return uuid.substring(0, length);
}