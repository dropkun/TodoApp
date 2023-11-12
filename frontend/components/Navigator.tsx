import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <ul
        className={`
            text-black
            mx-4 my-4`}
      >
        <li className={`m-4`}>
          <Link href='/'>Tasks</Link>
        </li>
        <li className={`m-4`}>
          <Link href='/tech'>Schedule</Link>
        </li>
      </ul>
    </nav>
  );
}
