import { Route, Routes } from "react-router-dom";
import { ProductList } from "../../ProductList/ProductList";
import { Form } from "../../Form/Form";
import { Profile } from "../../Profile/Profile";

export const MainPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" index element={<ProductList />} />
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};
