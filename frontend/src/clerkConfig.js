import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY; // Get from Clerk Dashboard

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

export function AuthWrapper({ children }) {
  return <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{children}</ClerkProvider>;
}



