import { Play } from 'lucide-react'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center flex-1 h-full'>
      <form className='flex flex-col items-center gap-14'>
        <div className='w-full flex items-center justify-center gap-2 text-gray-100 text-lg font-bold flex-wrap'>
          <label htmlFor='task'>Vou trabalhar em</label>
          <input
            className=''
            type='text'
            id="task"
          />

          <label htmlFor="minutesAmount">durante</label>
          <input
            className=''
            type="number"
            name="minutesAmount"
            id="minutesAmount"
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
