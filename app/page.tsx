import Menu from "@/components/common/menu/menu";
import { homePageMenu } from "@/types/static/menuDatas";

const HomePage = () => {
  return (
    <>
      <Menu data={homePageMenu} />
    </>
  );
};

export default HomePage;
