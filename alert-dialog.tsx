import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Tag } from "lucide-react";
import type { BusinessCard as BusinessCardType } from "@workspace/api-client-react";

interface BusinessCardProps {
  business: BusinessCardType;
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link href={`/businesses/${business.id}`}>
      <Card className="overflow-hidden hover-elevate transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 h-full flex flex-col bg-card/50 backdrop-blur-sm">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={business.coverImage || "/placeholder-business.png"} 
            alt={business.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          {business.hasActiveCampaign && (
            <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground font-bold shadow-lg">
              <Tag className="w-3 h-3 mr-1" />
              %{business.activeCampaignDiscount} İndirim
            </Badge>
          )}
          
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <Badge variant="secondary" className="bg-secondary/80 backdrop-blur-md border-none text-xs">
              {business.categoryName}
            </Badge>
            <div className="flex items-center gap-1 bg-background/80 backdrop-blur-md px-2 py-1 rounded-md text-sm font-semibold text-primary">
              <Star className="w-3.5 h-3.5 fill-primary" />
              {business.rating.toFixed(1)}
              <span className="text-muted-foreground text-xs ml-1">({business.reviewCount})</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            {business.logoImage && (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border/50 shrink-0">
                <img src={business.logoImage} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate text-foreground group-hover:text-primary transition-colors">
                {business.name}
              </h3>
              <div className="flex items-center text-muted-foreground text-sm truncate mt-0.5">
                <MapPin className="w-3.5 h-3.5 mr-1 shrink-0" />
                <span className="truncate">{business.city}</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2 flex-1">
            {business.shortDescription || `${business.categoryName} alanında hizmet veren seçkin bir işletme.`}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
