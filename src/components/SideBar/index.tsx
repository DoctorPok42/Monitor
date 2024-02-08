import {
  faMicrochip,
  faServer,
  faChartSimple,
  faCircleHalfStroke,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./style.module.scss";
import Button from "../Button";
import router from "next/router";

interface SideBarProps {
  path: string;
}

const SideBar = ({ path }: SideBarProps) => {
  const list = [
    "/cpu",
    "/server",
    // "/chart",
    "/circle",
    "/settings"
  ]

  const iconList = [
    faMicrochip,
    faServer,
    // faChartSimple,
    faCircleHalfStroke,
    faGear,
  ]

  const handleOnClick = (args: string) => {
    router.push(args);
  }
  return (
    <>
      <div className={styles.sideBar}>
        <div className={styles.content}>
          {
            list.map((item, index) => {
              return (
                <Button
                  key={index}
                  imgSrc={iconList[index]}
                  textColor="#fff" style={{
                    padding: ".6rem",
                    borderRadius: "5px",
                  }}
                  color={
                    item === path ? "#00e5bd" : "#161f28"
                  }
                  size="2x"
                  onClick={() => handleOnClick(item)}
                />
              )
            })
          }
          </div>
      </div>
    </>
  );
};

export default SideBar;
