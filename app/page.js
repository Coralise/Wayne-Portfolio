import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="h-screen place-content-center">
        <div className="w-fit relative m-auto">
          <div className="bg-red h-28 w-96 m-auto blur-3xl bg-opacity-20 absolute z-0 -left-32 motion-preset-fade-lg" />
          <div className="relative text-7xl font-bold z-10 mb-3 motion-preset-blur-right motion-duration-750">'Sup?</div>
          <div className="relative text-3xl z-10 motion-preset-blur-right motion-duration-1000">I'm <span className="text-red">Sean Wayne Gabule</span></div>
        </div>
      </div>
    </>
  );
}
