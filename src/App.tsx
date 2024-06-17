import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { Header } from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { ProductList } from "./components/ProductList/ProductList";
import { Form } from "./components/Form/Form";
import { Profile } from "./components/Profile/Profile";
import { Navigation } from "./components/Navigation/Navigation";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div>
      {/* <Header /> */}
      <Navigation />
      <Routes>
        <Route path="/" index element={<ProductList />} />
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
