"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

interface props {
  onNext: (val: string) => void;
  step: number;
}

function Request({ onNext, step }: props) {
  const [val, setVal] = useState("");

  const handleFinish = () => {
    onNext(val);
  };

  return (
    <>
      <hr />
      <div className='flex gap-1 items-center justify-between flex-col'>
        {step > 7 ? (
          <h2 className="text-primary font-medium italic">
            Your request "{val || "none"}" will be ensured! ✨
          </h2>
        ) : (
          <>
            <h2>Your wish is my command! ✨ Do you have any special requests for this journey?</h2>
            <div className="flex justify-between items-center">
              <Input
                placeholder="Eg. Only Veg Food..."
                className="p-2 w-75 border bg-white border-primary rounded-2xl"
                value={val}
                onChange={(e) => setVal(e.target.value)}
              />
              {step === 7 && (
                <Button
                  onClick={handleFinish}
                  className="bg-primary cursor-pointer mx-3"
                >
                  Start Travel
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Request;