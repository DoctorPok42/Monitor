import React from "react";
import { Header, SideBar } from "../components";

export const Settings = () => {
  return (
    <>
      <SideBar path="/settings" />
      <Header title="Server Activity - Circle" />

      <div id="wrapper" style={{ position: "relative" }}></div>
    </>
  );
};

export default Settings;
