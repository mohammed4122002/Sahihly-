/** Admin access control — comma-separated emails in ADMIN_EMAILS. */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "pombut777@gmail.com")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}
