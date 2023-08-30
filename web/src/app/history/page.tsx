'use client'
import { useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import './styles.css';
import { CyclesContext } from '@/contexts/CyclesContext';

export default function History() {
    const colorVariants = {
        green: `before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-green-500`,
        yellow: `before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-yellow-500`,
        red: `before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-red-500`
    };

    const { cycles } = useContext(CyclesContext);

    return (
        <div className="flex-1 p-14 flex flex-col">
            <h1 className="text-2xl text-gray-100">Meu histórico</h1>

            <div className="flex-1 overflow-auto mt-8">
                <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                        <tr>
                            <th className='rounded-tl-lg pl-6'>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th className='rounded-tr-lg pr-6'>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cycles.map(cycle => {
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutos</td>
                                    <td>{formatDistanceToNow(new Date(cycle.startDate), {
                                        addSuffix: true,
                                        locale: ptBR
                                    })}</td>
                                    <td>
                                        {cycle.finishedDate && (<span className={`${colorVariants['green']}`}>Concluído</span>)}
                                        {cycle.interruptedDate && (<span className={`${colorVariants['red']}`}>Interrompido</span>)}
                                        {(!cycle.finishedDate && !cycle.interruptedDate) && (<span className={`${colorVariants['yellow']}`}>Em andamento</span>)}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};