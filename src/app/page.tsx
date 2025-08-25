'use client';

import Title from "@/ui/landing/Title";
import PastEditions from "@/ui/landing/PastEditions";
import PhotoGallery from "@/ui/landing/PhotoGallery";

export default function Home() {
  return (
    <div className="text-black flex flex-col">
      <Title />
      <PastEditions />
      <PhotoGallery />
    </div>
  );
}
