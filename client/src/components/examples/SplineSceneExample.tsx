import { SplineScene, SpotlightSVG } from '../SplineScene';

export default function SplineSceneExample() {
  return (
    <div className="relative h-[400px] w-full bg-black/40 rounded-[2rem] border border-white/10 overflow-hidden">
      <SpotlightSVG />
      <div className="relative z-10 w-full h-full">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
