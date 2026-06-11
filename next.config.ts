import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://zwriyprfujdaxtrxapfc.supabase.co/storage/v1/object/public/CodingLinguistV2/**"
      ),
      new URL(
        "https://lh3.googleusercontent.com/a/**"
      ),
    ],
  },
};

export default nextConfig;
