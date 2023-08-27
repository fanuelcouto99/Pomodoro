'use client'
import { ReactNode, createContext, useState, useReducer } from "react";
import { ActionTypes, CycleProps, cyclesReducer } from "@/reducers/cycles";

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
    });

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { cycles, activeCycleId } = cyclesState;

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished() {
        dispatch({
            type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
            payload: {
                activeCycleId
            }
        });
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

        dispatch({
            type: ActionTypes.ADD_NEW_CYCLE,
            payload: {
                newCycle
            }
        });

        setAmountSecondsPassed(0);
    };

    function interruptCurrentCycle() {
        dispatch({
            type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
            payload: {
                activeCycleId
            }
        });
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