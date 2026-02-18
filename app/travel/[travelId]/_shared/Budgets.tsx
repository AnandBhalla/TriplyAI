"use client";

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

interface props {
  onNext: (val: string) => void;
  step: number;
}

function Budgets({ onNext, step }: props) {
  const [selectedBudget, setSelectedBudget] = useState("");

  const handleFinish = (budget: string) => {
    setSelectedBudget(budget);
    onNext(budget);
  };

  return (
    <>
      <hr />
      <div className='flex flex-col gap-2'>
        {step > 5 ? (
          <h2 className="text-primary font-medium italic text-center">
            Setting the scene for a {selectedBudget} experience! 💎
          </h2>
        ) : (
          <>
            <h2 className="text-center">Let’s talk numbers so we can find the absolute best gems for you!</h2>
            {step === 5 && (
              <div className='flex gap-2 my-2 items-center justify-center'>
                <Button 
                  className='border border-primary rounded-xl h-15 p-3 bg-primary/20 cursor-pointer text-black hover:bg-primary hover:text-white' 
                  onClick={() => handleFinish("Worth Value")}
                >
                  Worth Value 💵
                </Button>
                <Button 
                  className='border border-primary rounded-xl h-15 p-3 bg-primary/20 cursor-pointer text-black hover:bg-primary hover:text-white' 
                  onClick={() => handleFinish("Moderate")}
                >
                  Moderate 🪙
                </Button>
                <Button 
                  className='border border-primary rounded-xl h-15 p-3 bg-primary/20 cursor-pointer text-black hover:bg-primary hover:text-white' 
                  onClick={() => handleFinish("Luxury")}
                >
                  Luxury 💎
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Budgets;