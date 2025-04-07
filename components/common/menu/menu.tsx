import { MenuItemModel, MenuModel } from "@/types/common/menuModels";
import MenuItem from "./menuItem";
import Link from "next/link";

const Menu = ({ data }: { data: MenuModel }) => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-4 p-3">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <div
            className="grid grid-cols-2 gap-3
                        sm:grid-cols-3
                        md:grid-cols-4
                        lg:grid-cols-5"
          >
            {data.items.map((item: MenuItemModel, index: number) => (
              <Link href={item.link} key={index}>
                <MenuItem data={item} key={index} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
