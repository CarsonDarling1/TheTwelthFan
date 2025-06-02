import * as React from "react"

import { cn } from "@/lib/utils.tsx"
import { Card, CardHeader, CardContent } from "../ui/card";
import { useState, useEffect } from "react";

interface CardData {
  Name: string;
  Content: string;
}

function ScrollContainer({ cardData, className, ...props }: { cardData: CardData[]; className?: string } & React.ComponentProps<"div">) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    if (cardData.length === 0) return; // If no data, exit early.

    let intervalId = setInterval(() => {
      setCurrentCardIndex((prevIndex) => {
        // If we've reached the end of the data array, stop updating
        if (prevIndex + 1 === cardData.length) {
          clearInterval(intervalId);
          return 0;
        }
        return prevIndex + 1;
      });
    }, 6000);

    return () => clearInterval(intervalId = 0);
  }, [cardData]);

  const currentCard = cardData[currentCardIndex];

  return (
    <div {...props} className={cn("flex flex-col items-center justify-center w-full p-4", className)}>
      {currentCard && (
        <Card className="w-full flex items-center max-w-lg shadow-lg mb-4 border-b border-black card">
          <CardHeader className="w-full text-2xl border-b border-black">{currentCard.Name}</CardHeader>
          <CardContent>{currentCard.Content}</CardContent>
        </Card>
      )}
    </div>
  );
}

export default ScrollContainer;
