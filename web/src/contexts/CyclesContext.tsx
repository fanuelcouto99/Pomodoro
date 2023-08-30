'use client'
import { ReactNode, createContext, useState, useReducer, useEffect } from "react";
import { CycleProps, cyclesReducer } from "@/reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "@/reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CraeteCycleData {
    task: string;
    minutesAmount: number;
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

    // Alterando o uso de state para reducer
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null
    }, () => {
        const storedStateAsJSON = localStorage.getItem('@pomodoro:cycles-state-1.0.0');
        if(storedStateAsJSON) {
           return JSON.parse(storedStateAsJSON);
        }
    });

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);
        localStorage.setItem('@pomodoro:cycles-state-1.0.0', stateJSON);
    }, [cyclesState]);

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if(activeCycle) {
           return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }
        return 0;
    });

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction());
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

        dispatch(addNewCycleAction(newCycle));

        setAmountSecondsPassed(0);
    };

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction());
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