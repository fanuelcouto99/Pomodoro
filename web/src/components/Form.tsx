'use client'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Play } from 'lucide-react';
import { Hand } from 'lucide-react';
import { CountDown } from './CountDown';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa!"),
    minutesAmount: zod.number()
        .min(1, "O ciclo precisa ser de no mínimo de 5 minutos!")
        .max(60, "O ciclo precisa ser de no máximo de 60 minutos!")
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface CycleProps {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
};

export function Form() {
    const [cycles, setCycles] = useState<CycleProps[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

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
            if(cycle.id === activeCycleId) {
                return {...cycle, interruptedDate: new Date()}
            } else {
                return cycle
            }
        }));
        setActiveCycleId(null);
    };

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;
    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    const task = watch('task');
    const isSubmitDisabled = !task;

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`;
        }
    }, [minutes, seconds, activeCycle]);

    return (
        <>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} className='flex flex-col items-center gap-14'>
                <div className='w-full flex items-center justify-center gap-2 text-gray-100 text-lg font-bold flex-wrap'>
                    <label htmlFor='task'>Vou trabalhar em</label>
                    <input
                        className='inputTask bg-transparent h-10 border-0 border-b-2 border-b-gray-500 font-bold text-lg px-2 text-gray-100 placeholder:text-gray-500 placeholder:text-base flex-1 focus:shadow-none focus:border-green-500 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-70'
                        type='text'
                        id="task"
                        placeholder='Dê um nome para o seu projeto'
                        list='taskSuggestions'
                        disabled={!!activeCycle}
                        {...register('task')}
                    />

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

                <CountDown />

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