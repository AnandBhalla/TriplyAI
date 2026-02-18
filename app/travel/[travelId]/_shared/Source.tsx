"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface props {
  onNext: (val: string) => void;
  step: number;
}

function Source({ onNext, step }: props) {
  const [val, setVal] = useState("");

  const handleFinish = () => {
    onNext(val);
  };

  return (
    <>
      <hr />
      <div className="flex gap-1 items-center justify-between flex-col ">
        {step > 1 ? (
          <h2 className="text-primary font-medium italic">
            Starting the engines at {val}! ✈️
          </h2>
        ) : (
          <>
            <h2>
              I can almost hear the engines starting! ✈️
              <span className="font-bold">
                {" "}Where is our point of departure today?
              </span>{" "}
              Give me the name of the city where your amazing trip begins!
            </h2>
            <div className="flex justify-between items-center">
              <input
                placeholder="Enter Source Location (city,state,country)"
                className="p-2 w-75 border bg-white border-primary rounded-2xl text-sm outline-none"
                value={val}
                onChange={(e) => setVal(e.target.value)}
              />
              {step === 1 && (
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

export default Source;