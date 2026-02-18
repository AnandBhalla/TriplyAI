"use client";

import { Button } from "@/components/ui/button";
import React from "react";

interface props {
  onNext: () => void;
  step: number;
}

function StartChat({ onNext, step }: props) {
  const handleFinish = () => {
    onNext();
  };

  return (
    <div className="flex gap-1 items-center justify-between">
      {step > 0 ? (
        <h2 className="text-primary font-medium italic">
          The journey with TriplyAI has officially begun! 🚀
        </h2>
      ) : (
        <>
          <h2>
            Hi there! I’m TriplyAI, your personal travel guide. Ready to start your
            journey?
          </h2>
          {step === 0 && (
            <Button
              onClick={handleFinish}
              className={"bg-primary cursor-pointer mx-3"}
            >
              Lets Travel
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export default StartChat;