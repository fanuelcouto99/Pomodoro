'use client'
import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CyclesContext } from "./Form";

export function Countdown() {
    const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed } = useContext(CyclesContext);

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;
    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        let interval: number;

        if (activeCycle) {
            interval = Number(setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished();
                    setSecondsPassed(totalSeconds);
                    clearInterval(interval);
                } else {
                    setSecondsPassed(secondsDifference);
                }
            }, 1000));
        }

        return () => {
            clearInterval(interval);
        };
    }, [activeCycle, totalSeconds, activeCycleId, setSecondsPassed, markCurrentCycleAsFinished]);

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`;
        } else {
            document.title = 'Pomodoro'
        }
    }, [minutes, seconds, activeCycle]);

    return (
        <div className='font-roboto text-[10rem] leading-[8rem] text-gray-100 flex gap-4'>
            <span className='bg-gray-700 py-8 px-4 rounded-lg'>{minutes[0]}</span>
            <span className='bg-gray-700 py-8 px-4 rounded-lg'>{minutes[1]}</span>
            <span className='px-8 text-green-500 w-16 overflow-hidden flex justify-center items-center'>:</span>
            <span className='bg-gray-700 py-8 px-4 rounded-lg'>{seconds[0]}</span>
            <span className='bg-gray-700 py-8 px-4 rounded-lg'>{seconds[1]}</span>
        </div>
    )
};