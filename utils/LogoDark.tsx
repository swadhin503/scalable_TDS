import Image from 'next/image';

export default function LogoLight() {
  return (
    <div className='flex '>
      <Image alt='logo' width={80} height={42} src={'/new.png'} />
      {/* <h1 className='font-bold text-black dark:text-white'>TDS</h1> */}
    </div>
  );
}