"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface props {
  onNext: (val: string) => void;
  step: number;
}

function Destination({ onNext, step }: props) {
  const [val, setVal] = useState("");

  const handleFinish = () => {
    onNext(val);
  };

  return (
    <>
      <hr />
      <div className="flex gap-1 items-center justify-between flex-col ">
        {step > 2 ? (
          <h2 className="text-primary font-medium italic">
            The compass is set! Destination: {val} 📍
          </h2>
        ) : (
          <>
            <h2>
              Now for the best part—the destination! 📍 Where is the compass
              pointing?{" "}
            </h2>
            <div className="flex justify-between items-center">
              <Input
                placeholder="Enter Destination (city, state, country)"
                className="p-2 w-75 border bg-white border-primary rounded-2xl"
                value={val}
                onChange={(e) => setVal(e.target.value)}
              />
              {step === 2 && (
                <Button
                  onClick={handleFinish}
                  className={"bg-primary cursor-pointer mx-3"}
                >
                  Next
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Destination;