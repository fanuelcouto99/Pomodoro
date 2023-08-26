'use client'
import { ReactNode, createContext, useState } from "react";

interface CraeteCycleData {
    task: string;
    minutesAmount: number;
};

interface CycleProps {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
};

interface CyclesContextType {
    cycles: CycleProps[];
    activeCycle: CycleProps | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CraeteCycleData) => void;
    interruptCurrentCycle: () => void;
};

interface CyclesContextProviderProps {
    children: ReactNode
};

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cycles, setCycles] = useState<CycleProps[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished() {
        setCycles((state) => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDateDate: new Date() }
            } else {
                return cycle
            }
        }));
    };

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    };

    function createNewCycle(data: CraeteCycleData) {
        const id = String(new Date().getTime());
        const newCycle: CycleProps = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        };

        setCycles(state => [...state, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);
    };

    function interruptCurrentCycle() {
        setCycles((state) => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        }));
        setActiveCycleId(null);
    };

    return (
        <CyclesContext.Provider
            value={{
                cycles,
                activeCycle,
                activeCycleId,
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle
            }}
        >
            {children}
        </CyclesContext.Provider>
    );
};