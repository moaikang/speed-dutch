import { Flex, Spacing } from "@toss/emotion-utils";
import FixedBottomCTA from "../components/FixedBottomCTA";
import Txt from "../components/Txt";
import { Logo } from "../icons";

function Home() {
  return (
    <>
      <Spacing size={42} />
      <Flex width="100%" justify="center">
        <Logo />
      </Flex>
      <Spacing size={16} />
      <Flex width="100%" justify="center">
        <Txt size="big">
          만날 장소가 고민이라면
          <br /> 중간지점에서 만나보세요!
        </Txt>
      </Flex>
      <Spacing size={42} />
      <FixedBottomCTA disabled>중간지점 찾기</FixedBottomCTA>
    </>
  );
}

export default Home;
