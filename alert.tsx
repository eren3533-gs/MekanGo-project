import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Tag } from "lucide-react";
import type { CampaignWithBusiness } from "@workspace/api-client-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface CampaignCardProps {
  campaign: CampaignWithBusiness;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Link href={`/businesses/${campaign.businessId}`}>
      <Card className="overflow-hidden hover-elevate transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50 h-full flex flex-col bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              {campaign.businessLogoImage ? (
                <div className="w-10 h-10 rounded-full overflow-hidden border border-border shrink-0">
                  <img src={campaign.businessLogoImage} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Tag className="w-5 h-5 text-primary" />
                </div>
              )}
              <div>
                <h4 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {campaign.businessName}
                </h4>
                <span className="text-xs text-muted-foreground">{campaign.businessCity}</span>
              </div>
            </div>
            
            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/30 font-bold text-lg px-2 py-1">
              %{campaign.discountPercent}
            </Badge>
          </div>
          
          <h3 className="font-bold text-xl mb-2 text-foreground line-clamp-2 leading-tight">
            {campaign.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {campaign.description}
          </p>
          
          <div className="mt-auto pt-4 border-t border-border/50 flex items-center text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-primary/70" />
            <span>
              Son gün: <strong className="text-foreground">{format(new Date(campaign.endDate), "dd MMM yyyy", { locale: tr })}</strong>
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
