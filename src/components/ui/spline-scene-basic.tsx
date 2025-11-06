'use client';

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export function SplineSceneBasic() {
  return (
    <Card className="relative h-[500px] w-full overflow-hidden bg-black/95">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />

      <div className="flex h-full flex-col md:flex-row">
        <div className="relative z-10 flex flex-1 flex-col justify-center gap-4 p-8">
          <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Interactive 3D
          </h1>
          <p className="max-w-lg text-neutral-300">
            Bring your UI to life with beautiful 3D scenes. Create immersive
            experiences that capture attention and enhance your design.
          </p>
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          <ErrorBoundary fallback={<SplineFallback />}>
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full"
            />
          </ErrorBoundary>
        </div>
      </div>
    </Card>
  );
}

function SplineFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-center">
      <h3 className="text-xl font-semibold text-white">3D scene unavailable</h3>
      <p className="max-w-sm text-sm text-white/70">
        The robot scene couldn&apos;t be loaded right now. Please check the Spline
        share link or try again later.
      </p>
    </div>
  );
}
