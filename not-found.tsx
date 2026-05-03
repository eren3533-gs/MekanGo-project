import { Link, useLocation } from "wouter";
import { Show, useClerk, useUser } from "@clerk/react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, User, LogOut, LayoutDashboard, PlusCircle, Heart } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();
  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
            <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="w-6 h-6">
                <path d="M25 70V30L50 55L75 30V70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline-block">MekanGo</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/businesses" className={`transition-colors hover:text-primary ${location.startsWith('/businesses') ? 'text-primary' : 'text-muted-foreground'}`}>
              Mekanlar
            </Link>
            <Link href="/campaigns" className={`transition-colors hover:text-primary ${location.startsWith('/campaigns') ? 'text-primary' : 'text-muted-foreground'}`}>
              Fırsatlar
            </Link>
            <Link href="/categories" className={`transition-colors hover:text-primary ${location.startsWith('/categories') ? 'text-primary' : 'text-muted-foreground'}`}>
              Kategoriler
            </Link>
            <Link href="/pricing" className={`transition-colors hover:text-primary ${location.startsWith('/pricing') ? 'text-primary' : 'text-muted-foreground'}`}>
              İşletme Ekle
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <div className="flex items-center gap-2">
              <Link href="/sign-in" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block px-3 py-2">
                Giriş Yap
              </Link>
              <Link href="/sign-up" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                Kayıt Ol
              </Link>
            </div>
          </Show>

          <Show when="signed-in">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName || "User"} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.firstName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer flex items-center">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>İşletme Paneli</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/add-business" className="cursor-pointer flex items-center">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Yeni İşletme Ekle</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favorites" className="cursor-pointer flex items-center">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favorilerim</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer" onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Çıkış Yap</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Show>
        </div>
      </div>
    </header>
  );
}