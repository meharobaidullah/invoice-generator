import Image from 'next/image';

// TODO - Fix Border Color
const Header: React.FC = () => (
  <header className="flex h-[4.5625rem] items-center justify-center border-b border-slate-200">
    <Image
      src="/logo.svg"
      alt="Invoice generator logo"
      className="dark:invert"
      width={32}
      height={32}
      priority
    />
  </header>
);

export default Header;
