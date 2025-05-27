'use client';

import Header from "./ui/landing/Header";
import PastEditions from "./ui/landing/PastEditions";
import PhotoGallery from "./ui/landing/PhotoGallery";

export default function Home() {
  return (
    <div className="text-black flex flex-col">
      <Header />
      <PastEditions />
      <PhotoGallery />
    </div>
  );
}
