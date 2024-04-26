import Image from "next/image";
import Link from "next/link";

const Logo = () => (
  <div>
    <Link href="/">
      <span className="sr-only">Course App</span>
      <Image
        src="/logo.svg"
        alt="Logo"
        width={111}
        height={48}
        priority
      />
    </Link>
  </div>
);

export default Logo;
