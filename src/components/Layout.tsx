"use client";

import { CircleUserRound, Menu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Projects', href: '/' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-16 items-center justify-between border-b px-4 bg-white">
        <div className="flex items-center gap-x-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="lg:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pl-1 pr-0">
              <div className="px-7">
                <Link to="/" className="flex items-center">
                  <span className="font-bold text-xl">Sense</span>
                </Link>
              </div>
              <nav className="my-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "block px-7 py-2 text-base font-semibold hover:bg-accent",
                      location.pathname === item.href && "bg-accent"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="font-bold text-xl">
            Sense
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
}