import Nav from '@/components/Navigator';
import User from '@/components/User';

export default function Headers() {
  return (
    <header
      className='
    bg-subprimary
    shadow-md
    h-full
    flex flex-col
    '
    > 
      <div className='m-8'>
        <Nav />
      </div>
      <div className='flex-grow'></div>
      <div className='m-8
        flex-col items-end'>
        <User />
      </div>
    </header>
  );
}
