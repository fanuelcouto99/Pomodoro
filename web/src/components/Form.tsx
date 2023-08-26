'use client'
import { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from 'lucide-react';
import { Hand } from 'lucide-react';
import { NewCycleForm } from './NewCycleForm';
import { Countdown } from './Countdown'

interface CycleProps {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
};

interface CyclesContextType {
    activeCycle: CycleProps | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
};

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa!"),
    minutesAmount: zod.number()
        .min(1, "O ciclo precisa ser de no mínimo de 5 minutos!")
        .max(60, "O ciclo precisa ser de no máximo de 60 minutos!")
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const CyclesContext = createContext({} as CyclesContextType);

export function Form() {
    const [cycles, setCycles] = useState<CycleProps[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm;

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

    function handleCreateNewCycle(data: NewCycleFormData) {
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
        reset();
    };

    function handleInterruptCycle() {
        setCycles((state) => state.map(cycle => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        }));
        setActiveCycleId(null);
    };

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} className='flex flex-col items-center gap-14'>

                <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>

                {activeCycle ? (
                    <button type="button" onClick={handleInterruptCycle} className='w-full p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-red-500 text-gray-100 enabled:hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed'>
                        <Hand />
                        Interromper
                    </button>
                ) : (
                    <button type="submit" disabled={isSubmitDisabled} className='w-full p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-green-500 text-gray-100 enabled:hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed'>
                        <Play />
                        Começar
                    </button>
                )}
            </form>
        </>
    );
};