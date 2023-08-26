'use client'
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from 'lucide-react';
import { Hand } from 'lucide-react';
import { NewCycleForm } from './NewCycleForm';
import { Countdown } from './Countdown'
import { CyclesContext } from '@/contexts/CyclesContext';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa!"),
    minutesAmount: zod.number()
        .min(1, "O ciclo precisa ser de no mínimo de 5 minutos!")
        .max(60, "O ciclo precisa ser de no máximo de 60 minutos!")
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Form() {
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <>
            <form onSubmit={handleSubmit(createNewCycle)} className='flex flex-col items-center gap-14'>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                {activeCycle ? (
                    <button type="button" onClick={interruptCurrentCycle} className='w-full p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-red-500 text-gray-100 enabled:hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed'>
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