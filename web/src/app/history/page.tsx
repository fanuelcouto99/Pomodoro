import './styles.css';

export default function History() {
    const colorVariants = {
        green: `before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-green-500`,
        yellow: `before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-yellow-500`,
        red: `before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-red-500`
    };

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
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há 1 minuto</td>
                            <td>
                                <span className={`${colorVariants['yellow']}`}>Em andamento</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>10 minutos</td>
                            <td>Há 1 mes</td>
                            <td>
                                <span className={`${colorVariants['red']}`}>Interrompido</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>30 minutos</td>
                            <td>Há 3 meses</td>
                            <td>
                                <span className={`${colorVariants['green']}`}>Concluido</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td>
                                <span className={`${colorVariants['green']}`}>Concluido</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <td>
                                <span className={`${colorVariants['green']}`}>Concluido</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};