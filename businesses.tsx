import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="w-6 h-6">
                <path d="M25 70V30L50 55L75 30V70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">MekanGo</span>
          </Link>
          <p className="text-sm text-muted-foreground mb-4">
            Şehrindeki en iyi mekanları keşfet. Size özel fırsatları kaçırma.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-foreground">Keşfet</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/businesses" className="hover:text-primary transition-colors">Tüm Mekanlar</Link></li>
            <li><Link href="/categories" className="hover:text-primary transition-colors">Kategoriler</Link></li>
            <li><Link href="/campaigns" className="hover:text-primary transition-colors">Fırsatlar</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-foreground">İşletmeler İçin</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/pricing" className="hover:text-primary transition-colors">İşletme Ekle</Link></li>
            <li><Link href="/pricing" className="hover:text-primary transition-colors">Fiyatlandırma</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary transition-colors">İşletme Paneli</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4 text-foreground">İletişim</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>destek@mekango.com</li>
            <li>+90 (555) 123 45 67</li>
            <li className="pt-2">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MekanGo. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}