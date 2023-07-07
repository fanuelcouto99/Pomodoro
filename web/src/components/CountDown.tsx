import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

export function CountDown() {
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = Number(setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);

                if(secondsDifference >= totalSeconds) {
                    setCycles((state) => state.map(cycle => {
                        if(cycle.id === activeCycleId) {
                            return {...cycle, finishedDateDate: new Date()}
                        } else {
                            return cycle
                        }
                    }));
                    setAmountSecondsPassed(totalSeconds);
                    clearInterval(interval);
                    setActiveCycleId(null);
                } else {
                    setAmountSecondsPassed(secondsDifference);
                }
            }, 1000));
        }

        return () => {
            clearInterval(interval);
        };
    }, [activeCycle, totalSeconds, activeCycleId]);

    return (
        <div className='font-roboto text-[10rem] leading-[8rem] text-gray-100 flex gap-4'>
            <span className='bg-gray-700 py-8 px-4 rounded-lg'>{minutes[0]}</span>
            <span className='bg-gray-700 py-8 px-4 rounded-lg'>{minutes[1]}</span>
            <span className='px-8 text-green-500 w-16 overflow-hidden flex justify-center items-center'>:</span>
            <span className='bg-gray-700 py-8 px-4 rounded-lg'>{seconds[0]}</span>
            <span className='bg-gray-700 py-8 px-4 rounded-lg'>{seconds[1]}</span>
        </div>
    );
};