import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = "pk_test_YXBwYXJlbnQtdHJvdXQtOTYuY2xlcmsuYWNjb3VudHMuZGV2JA"; // Get from Clerk Dashboard

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

export function AuthWrapper({ children }) {
  return <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{children}</ClerkProvider>;
}
