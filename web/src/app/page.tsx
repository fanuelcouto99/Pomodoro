import { Play } from 'lucide-react'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center flex-1 h-full'>
      <form className='flex flex-col items-center gap-14'>
        <div className='w-full flex items-center justify-center gap-2 text-gray-100 text-lg font-bold flex-wrap'>
          <label htmlFor='task'>Vou trabalhar em</label>
          <input
            className='inputTask bg-transparent h-10 border-0 border-b-2 border-b-gray-500 font-bold text-lg px-2 text-gray-100 placeholder:text-gray-500 placeholder:text-base flex-1 focus:shadow-none focus:border-green-500 focus:ring-0'
            type='text'
            id="task"
            placeholder='Dê um nome para o seu projeto'
            list='taskSuggestions'
          />

          <datalist id='taskSuggestions'>
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <input
            className='bg-transparent h-10 border-0 border-b-2 border-b-gray-500 font-bold text-lg px-2 text-gray-100 placeholder:text-gray-500 placeholder:text-base w-16 focus:shadow-none focus:border-green-500 focus:ring-0'
            type="number"
            name="minutesAmount"
            id="minutesAmount"
            placeholder='00'
            step={5}
            min={5}
            max={60}
          />

          <span>minutos</span>
        </div>

        <div className='font-roboto text-[10rem] leading-[8rem] text-gray-100 flex gap-4'>
          <span className='bg-gray-700 py-8 px-4 rounded-lg'>0</span>
          <span className='bg-gray-700 py-8 px-4 rounded-lg'>0</span>
          <span className='px-8 text-green-500 w-16 overflow-hidden flex justify-center items-center'>:</span>
          <span className='bg-gray-700 py-8 px-4 rounded-lg'>0</span>
          <span className='bg-gray-700 py-8 px-4 rounded-lg'>0</span>
        </div>

        <button type="submit" className='w-full p-4 rounded-lg flex items-center justify-center gap-2 font-bold cursor-pointer bg-green-500 text-gray-100 enabled:hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed'>
          <Play />
          Começar
        </button>
      </form>
    </div>
  )
}
