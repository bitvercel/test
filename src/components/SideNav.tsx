import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";

export function SideNav() {
  const pathname = usePathname();
  
  const navigation = [
    { name: "Projects", href: "/" },
  ];

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-card px-6">
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/" className="font-bold">
            Program Manager
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href && "bg-accent text-accent-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-x-4 py-3 lg:gap-x-6">
          <Button variant="ghost" size="icon">
            <CircleUserRound className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}