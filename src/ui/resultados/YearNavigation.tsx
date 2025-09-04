'use client';

import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface YearNavigationProps {
  currentYearId: number;
}

export default function YearNavigation({ currentYearId }: YearNavigationProps) {
  const router = useRouter();
  const { data: availableYears, isLoading } = trpc.cronologia.getAvailableYears.useQuery();

  if (isLoading || !availableYears) {
    return (
      <div className="flex items-center justify-center space-x-4 py-4">
        <div className="h-10 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  const currentIndex = availableYears.findIndex(year => year.id === currentYearId);
  const previousYear = currentIndex > 0 ? availableYears[currentIndex - 1] : null;
  const nextYear = currentIndex < availableYears.length - 1 ? availableYears[currentIndex + 1] : null;
  const currentYear = availableYears[currentIndex];

  const handlePreviousYear = () => {
    if (previousYear) {
      router.push(`/resultados/${previousYear.id}`);
    }
  };

  const handleNextYear = () => {
    if (nextYear) {
      router.push(`/resultados/${nextYear.id}`);
    }
  };

  const getCurrentYearDisplay = () => {
    if (!currentYear) return currentYearId;
    
    // Show city and country if available, otherwise show year
    if (currentYear.ciudad && currentYear.pais && currentYear.ciudad !== '-' && currentYear.pais !== '-') {
      return `${currentYear.ciudad}, ${currentYear.pais}`;
    }
    
    return currentYear.id;
  };

  return (
    <div className="flex items-center justify-center space-x-4 py-4">
      <button
        onClick={handlePreviousYear}
        disabled={!previousYear}
        className={`p-2 rounded-lg font-medium transition-colors ${
          previousYear
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
        }`}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      <div className="px-6 py-2 bg-gray-100 rounded-lg font-bold text-lg text-gray-800">
        {getCurrentYearDisplay()}
      </div>

      <button
        onClick={handleNextYear}
        disabled={!nextYear}
        className={`p-2 rounded-lg font-medium transition-colors ${
          nextYear
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
        }`}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
