import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = ({ onClick, mobile = false, isAdmin = false }) => {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "My Bookings", href: "/mybookings" },
  ];

  if (isAdmin) {
    links.push(
      { name: "Add Destination", href: "/add-destination" },
      { name: "Inactive Destinations", href: "/admin/inactive-destinations" },
    );
  }

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return links.map(({ name, href }) => (
    <Link
      key={href}
      href={href}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        isActive(href)
          ? "bg-cyan-50 text-cyan-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-cyan-700"
      } ${mobile ? "block w-full" : ""}`}
    >
      {name}
    </Link>
  ));
};

export default NavLinks;
