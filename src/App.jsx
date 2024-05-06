import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer, NavBar } from "./layout/index";
import {
  AboutUs,
  ChargingWallet,
  Code,
  Contact,
  ForgetPassword,
  Home,
  Products,
  ProductsFive,
  ApiProducts,
  ApiProductsPackage,
  
  ProductsFour,
  ProductsOne,
  ProductsThree,
  ProductsTwo,
  Request,
  SecProductsOne2,
  SetPassword,
  ShippingPayments,
  ShippingPayments2,
  Sign,
  SignUp,
  Wallet,
  Wallet2,
  Requests,
  Notifications,
  Search,
  SmsNumber,
} from "./pages/index";
import Navbar2 from "./layout/Navbar2";
import { BsWhatsapp } from "react-icons/bs";
import { RequireAuth, useFETCH } from "./Tools/APIs";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";

const App = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { data } = useFETCH(
    `contact-us/info?local=${localStorage.getItem("language")}`
  );
  async function requestPermission() {
    const prem = await Notification.requestPermission();
    if (prem === "granted") {
      const fcm_token = await getToken(messaging, {
        vapidKey:
          "BONx2o6NAkyiVasHiM-i1jM4yGGD8WaOdVKULD9cAWIbP_1xkL9JcSPy3qMuLUDnGbuiCc0A5lpwMxPL0C43meQ",
      });
      sessionStorage.setItem("fcm_token", fcm_token);
    } else if (prem === "denied") {
      console.log();
    }
  }
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", async () => {
        try {
          const registration = await navigator.serviceWorker.register(
            "/firebase-messaging-sw.js",
            {
              scope: "/firebase-cloud-messaging-push-scope",
            }
          );
          console.log("تم تسجيل خدمة العمل بنجاح:", registration);
        } catch (error) {
          console.error("فشل تسجيل خدمة العمل:", error);
        }
      });
    } else {
      console.warn("متصفحك لا يدعم خدمات العمل.");
    }
    requestPermission();
  }, []);

  return (
    <div className="relative ov">
      <NavBar />
      <Navbar2 />
      <div className="fixed bottom-10 right-10 z-50">
        <a
          href={`whatsapp://send?phone=${data?.data.data.whatsapp}`}
          target="_blank"
        >
          <BsWhatsapp
            color="#fff"
            className="bg-[#25D366] p-2 rounded-full w-12 h-12  "
          />
        </a>
      </div>
      <div className="bg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route element={<RequireAuth />}>
            <Route path="products">
              <Route index element={<Products />} />
              <Route path="products-1/:id" element={<ProductsOne />} />
              <Route
                path="products-1/packages/:id"
                element={<SecProductsOne2 />}
              />
              <Route path="products-2/:id" element={<ProductsTwo />} />
              <Route path="products-3/:id" element={<ProductsThree />} />
              <Route path="products-4/:id" element={<ProductsFour />} />
              <Route path="products-5/:id" element={<ProductsFive />} />
              <Route path="products-6/:id" element={<ApiProducts />} />
              <Route path="products-6/packages/:id" element={<ApiProductsPackage />} />


            </Route>
          </Route>
          <Route path="Contact-us" element={<Contact />} />
          <Route path="wallet">
            <Route index element={<Wallet />} />
            <Route path=":id" element={<Wallet2 />} />
          </Route>
          <Route path="Orders">
            <Route index element={<Requests />} />
            <Route path=":id" element={<Request />} />
          </Route>
          <Route path="shipping-payments">
            <Route index element={<ShippingPayments />} />
            <Route path=":id" element={<ShippingPayments2 />} />
          </Route>
          <Route path="charging-the-wallet" element={<ChargingWallet />} />
          <Route path="search" element={<Search />} />
          <Route path="sign-in" element={<Sign />} />
          <Route path="sign-in/code" element={<SmsNumber sign={true} />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-up/code" element={<SmsNumber />} />
          <Route path="verification-code" element={<Code />} />
          <Route path="set-password" element={<SetPassword />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="Notifications" element={<Notifications />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
