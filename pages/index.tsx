import router from "next/router";
import { Button } from "../components";
import {
  faMicrochip,
  faServer,
  // faChartSimple,
  faCircleHalfStroke,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

export const Home = () => {
  const handleOnClick = (args: string) => {
    router.push(args);
  }

  const allButtons = [
    {
      imgSrc: faMicrochip,
      link: '/cpu',
    },
    {
      imgSrc: faServer,
      link: '/server',
    },
    // {
    //   imgSrc: faChartSimple,
    //   link: '/chart',
    // },
    {
      imgSrc: faCircleHalfStroke,
      link: '/circle',
    },
    {
      imgSrc: faGear,
      link: '/settings',
    },
  ]

  return (
    <>
      <div className="chooseButton">
        {allButtons.map((button, index) => (
          <Button key={index} imgSrc={button.imgSrc} textColor="#fff" onClick={() => handleOnClick(button.link)} />
        ))}
      </div>
    </>
  );
};

export default Home;
