import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { Header } from "./components/Header/Header";
import { MainPage } from "./components/pages/MainPage/MainPage";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div>
      <Header />
      <MainPage />
      {/* <AddButton /> */}
    </div>
  );
}

export default App;
