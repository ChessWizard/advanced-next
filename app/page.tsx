import Menu from "@/components/common/menu/menu";
import { homePageMenu } from "@/types/static/menuDatas";

export default function Home() {
  return (
    <>
      <Menu data={homePageMenu} />
    </>
  );
}
