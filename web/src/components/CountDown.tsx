export function CountDown() {
    return (
        <div className='font-roboto text-[10rem] leading-[8rem] text-gray-100 flex gap-4'>
            <span className='bg-gray-700 py-8 px-4 rounded-lg'>{minutes[0]}</span>
            <span className='bg-gray-700 py-8 px-4 rounded-lg'>{minutes[1]}</span>
            <span className='px-8 text-green-500 w-16 overflow-hidden flex justify-center items-center'>:</span>
            <span className='bg-gray-700 py-8 px-4 rounded-lg'>{seconds[0]}</span>
            <span className='bg-gray-700 py-8 px-4 rounded-lg'>{seconds[1]}</span>
        </div>
    );
};