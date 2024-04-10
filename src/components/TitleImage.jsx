import Image from 'next/image';

export default function Title() {
  return (
    <div className='bg-white pt-16 pb-8 flex flex-col items-center'>
      <Image src={'/task.png'} width={450} height={200} alt='Task Image'/>

    </div>
  );
}
