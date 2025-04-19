import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MenuItemModel } from "@/types/common/menuModels";
import Image from "next/image";

const MenuItem = ({ data }: { data: MenuItemModel }) => {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Card className="group relative overflow-hidden p-0
                   w-[180px] h-[180px]
                   md:w-[260px] md:h-[260px] 
                   lg:w-[240px] lg:h-[240px]
          ">
            <CardContent
              className="w-[180px] h-[180px] p-0
                   md:w-[260px] md:h-[260px] 
                   lg:w-[240px] lg:h-[240px]"
            >
              {typeof data.image === "string" ? (
                <Image
                  src={data.image}
                  width={200}
                  height={200}
                  alt="menu item"
                  className="w-[180px] h-[180px] 
                   md:w-[260px] md:h-[260px] 
                   lg:w-[240px] lg:h-[240px] object-contain transition-all duration-500"
                />
              ) : (
                data.image
              )}
              <div
                className="absolute inset-0 flex items-center justify-center 
               bg-white/30 backdrop-blur-md text-black font-bold 
               transition-opacity duration-500 ease-in-out
               group-hover:opacity-0 text-center"
              >
                <span className="text-xs md:text-sm lg:text-base p-2">
                  {data.title}
                </span>
              </div>
            </CardContent>
          </Card>
        </HoverCardTrigger>

        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{data.title}</h4>
              <p className="text-sm">
                {data.description}
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default MenuItem;
