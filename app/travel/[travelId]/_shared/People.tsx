"use client";

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

interface props {
  onNext: (val: string) => void;
  step: number;
}

function People({ onNext, step }: props) {
  const [selectedPeople, setSelectedPeople] = useState("");

  const handleFinish = (peopleType: string) => {
    setSelectedPeople(peopleType);
    onNext(peopleType);
  };

  return (
    <>
      <hr />
      <div className='flex flex-col gap-2 items-center justify-center'>
        {step > 3 ? (
          <h2 className="text-primary font-medium italic text-center">
            Traveling with your {selectedPeople}  🌍
          </h2>
        ) : (
          <>
            <h2>Time to assemble the team! Who’s in your travel tribe for this one?</h2>
            {step === 3 && (
              <div className='flex gap-2 my-2'>
                <Button 
                  className='border border-primary rounded-xl h-15 p-3 bg-primary/20 cursor-pointer text-black hover:bg-primary hover:text-white' 
                  onClick={() => handleFinish("Solo")}
                >
                  Solo 🤴🏻
                </Button>
                <Button 
                  className='border border-primary rounded-xl h-15 p-3 bg-primary/20 cursor-pointer text-black hover:bg-primary hover:text-white' 
                  onClick={() => handleFinish("Couple")}
                >
                  Couple 💕
                </Button>
                <Button 
                  className='border border-primary rounded-xl h-15 p-3 bg-primary/20 cursor-pointer text-black hover:bg-primary hover:text-white' 
                  onClick={() => handleFinish("Family")}
                >
                  Family 👨‍👩‍👧‍👦
                </Button>
                <Button 
                  className='border border-primary rounded-xl h-15 p-3 bg-primary/20 cursor-pointer text-black hover:bg-primary hover:text-white' 
                  onClick={() => handleFinish("Friends")}
                >
                  Friends 🍻
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default People;