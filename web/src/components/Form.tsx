'use client'
import { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { differenceInSeconds } from 'date-fns';
import { Play } from 'lucide-react';
import { Hand } from 'lucide-react';

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
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);
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

                    <datalist id='taskSuggestions'>
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <input
                        className='bg-transparent h-10 border-0 border-b-2 border-b-gray-500 font-bold text-lg px-2 text-gray-100 placeholder:text-gray-500 placeholder:text-base w-16 focus:shadow-none focus:border-green-500 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-70'
                        type="number"
                        id="minutesAmount"
                        placeholder='00'
                        step={5}
                        min={1}
                        max={60}
                        disabled={!!activeCycle}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span>minutos</span>
                </div>

                <div className='font-roboto text-[10rem] leading-[8rem] text-gray-100 flex gap-4'>
                    <span className='bg-gray-700 py-8 px-4 rounded-lg'>{minutes[0]}</span>
                    <span className='bg-gray-700 py-8 px-4 rounded-lg'>{minutes[1]}</span>
                    <span className='px-8 text-green-500 w-16 overflow-hidden flex justify-center items-center'>:</span>
                    <span className='bg-gray-700 py-8 px-4 rounded-lg'>{seconds[0]}</span>
                    <span className='bg-gray-700 py-8 px-4 rounded-lg'>{seconds[1]}</span>
                </div>

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