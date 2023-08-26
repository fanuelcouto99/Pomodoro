'use client'
import { useContext } from 'react';
import { CyclesContext } from './Form'
import { useFormContext } from 'react-hook-form';

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();

    return (
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
                min={5}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos</span>
        </div>
    )
};