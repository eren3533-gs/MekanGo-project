import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@workspace/api-client-react";
import * as Icons from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  // @ts-ignore
  const Icon = Icons[category.icon] || Icons.MapPin;

  return (
    <Link href={`/businesses?categoryId=${category.id}`}>
      <Card className="hover-elevate transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 text-center bg-card/50 backdrop-blur-sm h-full">
        <CardContent className="p-6 flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
            <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <div>
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {category.businessCount} Mekan
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
