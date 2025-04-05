import Menu from "@/components/common/menu/menu";
import { homePageMenu } from "@/types/static/menu";

export default function Home() {
  return (
    <>
      <Menu data={homePageMenu} />
    </>
  );
}
