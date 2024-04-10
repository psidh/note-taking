import Image from 'next/image';

export default function Title() {
  return (
    <div className='bg-white pt-16 pb-8 flex flex-col items-center dark:bg-black dark:text-white'>
      <Image src={'/task.png'} width={450} height={200} alt='Task Image' className='dark:hidden'/>
      <Image src={'/task-night.png'} width={450} height={200} alt='Task Image' className='hidden dark:flex'/>

    </div>
  );
}
