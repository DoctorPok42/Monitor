import { useState } from "react";
import { Header, SideBar } from "../components";

export const Home = () => {
  const [newDate, setNewDate] = useState<string>(new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric"
  }));

  return (
    <>
      <SideBar path="/chart" />
      <Header title="Server Activity - Chart" newDate={newDate} setNewDate={setNewDate} />
    </>
  );
};

export default Home;
