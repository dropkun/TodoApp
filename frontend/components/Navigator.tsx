import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <ul
        className={`text-black`}
      >
        <li className='my-6'>
          <Link href='/'>Tasks</Link>
        </li>
        <li className='my-6'>
          <Link href='/tech'>Schedule</Link>
        </li>
      </ul>
    </nav>
  );
}
