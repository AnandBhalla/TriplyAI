"use client";

import { Button } from '@/components/ui/button';
import { Check, Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';

interface props {
  onNext: (val: number) => void;
  step: number;
}

function CountDays({ onNext, step }: props) {
  const [days, setDays] = useState(1);

  const handleFinish = () => {
    onNext(days);
  };

  return (
    <>
      <hr />
      <div className='flex flex-col gap-2 items-center justify-center'>
        {step > 6 ? (
          <h2 className="text-primary font-medium italic">
            Perfect! A {days} {days === 1 ? 'day' : 'days'} escape is being prepared. ⏳
          </h2>
        ) : (
          <>
            <h2>Time is the ultimate luxury! ⏳ How many days are we dreaming of for this escape?</h2>
            {step === 6 && (
              <div className="flex items-center gap-4 justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 cursor-pointer"
                  onClick={() => setDays(Math.max(1, days - 1))}
                >
                  <Minus />
                </Button>

                <div className="w-15 h-12 text-center text-4xl bg-gray-300 rounded-xl p-1">
                  {days}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 cursor-pointer"
                  onClick={() => setDays(days + 1)}
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

export default CountDays;