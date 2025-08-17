import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp"
import Products from "./pages/Products"
import Search from "./pages/Search"
import Cart from "./pages/Cart";
import About from "./pages/About"
import ProfilePage from "./pages/ProfilePage"
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Product from "./pages/Product";


export default function App() {

  return (
    <div className="flex flex-col h-screen">
      <Header className="flex-shrink-0 fixed top-0 left-0 right-0 z-50" />

      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/about-us" element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile/*" element={<ProfilePage />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>

      <Navigation className="flex-shrink-0 fixed bottom-0 left-0 right-0 z-50" />
    </div>
  );
}
