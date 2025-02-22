import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = "pk_test_aW5maW5pdGUteWFrLTE1LmNsZXJrLmFjY291bnRzLmRldiQ"; // Get from Clerk Dashboard

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

export function AuthWrapper({ children }) {
  return <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{children}</ClerkProvider>;
}
