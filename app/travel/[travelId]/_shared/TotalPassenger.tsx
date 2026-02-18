"use client";

import { Button } from "@/components/ui/button";
import { Check, Minus, Plus } from "lucide-react";
import React, { useState } from "react";

interface props {
  onNext: (val: number) => void;
  step: number;
}

function TotalPassenger({ onNext, step }: props) {
  const [count, setCount] = useState(1);

  const handleFinish = () => {
    onNext(count);
  };

  const onPlus = () => {
    setCount(count + 1);
  };

  const onMinus = () => {
    setCount(Math.max(1, count - 1));
  };

  return (
    <>
      <hr />
      <div className="flex flex-col gap-2 items-center justify-center">
        {step > 4 ? (
          <h2 className="text-primary font-medium italic">
            Awesome! We are planning a legendary trip for {count} {count === 1 ? 'explorer' : 'explorers'}. 🖐️
          </h2>
        ) : (
          <>
            <h2>
              Time for a quick headcount! 🖐️{" "}
              <span className="font-bold">
                How many awesome people are we planning for?
              </span>{" "}
            </h2>

            {step === 4 && (
              <div className="flex items-center gap-4 justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 cursor-pointer"
                  onClick={onMinus}
                >
                  <Minus />
                </Button>

                <div className="w-15 h-12 text-center text-4xl bg-gray-300 rounded-xl p-1">
                  {count}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 cursor-pointer"
                  onClick={onPlus}
                >
                  <Plus />
                </Button>
                <Button onClick={handleFinish} className="cursor-pointer">
                  <Check />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default TotalPassenger;