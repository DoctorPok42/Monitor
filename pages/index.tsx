import router from "next/router";
import { Button, Header } from "../components";
import {
  faMicrochip,
  faServer,
  faChartSimple,
  faCircleHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

export const Home = () => {

  const handleOnClick = (args: string) => {
    router.push(args);
  }

  return (
    <>
      <div className="chooseButton">
        <Button imgSrc={faMicrochip} textColor="#fff" onClick={() => handleOnClick('/cpu')} />
        <Button imgSrc={faServer} textColor="#fff" onClick={() => handleOnClick('/server')} />
        <Button imgSrc={faChartSimple} textColor="#fff" onClick={() => handleOnClick('/chart')} />
        <Button imgSrc={faCircleHalfStroke} textColor="#fff" onClick={() => handleOnClick('/circle')} />
      </div>
    </>
  );
};

export default Home;
