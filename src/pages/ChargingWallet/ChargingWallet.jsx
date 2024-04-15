import Money from "../../images/1200x630wa_clipdrop-background-removal.png";
import USDT from "../../images/886865-middle_clipdrop-background-removal.png";
import CODE from "../../images/istockphoto-1136155337-612x612.jpg";
import copy from "../../images/Icon feather-copy.png";
import { Container, Currency, Loading, TitleTwo } from "../../components";
import { useContextTranslate } from "../../Context/ContextAPI";
import { useEffect, useRef, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { Col, Row } from "../../Grid-system";
import AddImage from "../../Tools/AddFile";
import { useFETCH, usePOST } from "../../Tools/APIs";
import { CiSearch } from "react-icons/ci";

const ChargingWallet = () => {
  const { content, profile } = useContextTranslate();
  const [copys, setCopy] = useState(false);
  const [active, setActive] = useState("USDT");
  const text = useRef();
  useEffect(() => {
    setTimeout(() => setCopy(false), 2000);
  }, [copys]);

  const {
    handleChangeInput,
    handleSubmit,
    setFormData,
    setViewFile,
    viewFile,
    formData,
    loading,
    error,
  } = usePOST({});
  const { data } = useFETCH(
    `payments/info?local=${localStorage.getItem("language")}`
  );

  const dataAll = data?.data.data;
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(
      `charging-processes?local=${localStorage.getItem("language")}`
    );
  };
  useEffect(() => {
    setFormData({
      ...formData,
      name: active,
    });
  }, [active]);
  useEffect(() => {
    if (profile?.currency !== "USD") {
      setActive("WHISH_MONEY");
    }
  }, [profile?.currency]);

  return (
    <div className="py-4 font-semibold">
      <Container>
        <TitleTwo title={content.ChargingTheWallet} />
        <div className="w-1/2 max-md:w-full mx-auto my-5 border border-Pink rounded-2xl p-5 ">
          <div>
            <Row justify="center" className=" gap-2 py-5 text-center  mb-10 ">
              {profile?.currency === "USD" ? (
                <Col
                  sm={4}
                  md={4}
                  onClick={() => {
                    if (active !== "USDT") {
                      setActive("USDT");
                      setFormData("");
                    }
                  }}
                  className={`${
                    active === "USDT" ? "shadow-lg shadow-Pink" : ""
                  } border border-Purple p-1 flex flex-col justify-between cursor-pointer w-[150px]  rounded-2xl  font-semibold`}
                >
                  <div className="w-[60px] mx-auto">
                    <img src={USDT} alt="" className="mx-auto" />
                  </div>
                  <h6 className="max-sm:text-[16px]">USDT-TRC20</h6>
                </Col>
              ) : (
                ""
              )}

              <Col
                sm={4}
                md={4}
                onClick={() => {
                  if (active !== "WHISH_MONEY") {
                    setActive("WHISH_MONEY");
                    setFormData("");
                  }
                }}
                className={`${
                  active === "WHISH_MONEY" ? "shadow-lg shadow-Pink" : ""
                } border border-Purple p-1 flex flex-col justify-between cursor-pointer w-[150px]  rounded-2xl  font-semibold`}
              >
                <div className="w-[60px] mx-auto">
                  <img src={Money} alt="" className="mx-auto" />
                </div>
                <h6 className="max-sm:text-[16px]">Whish Money</h6>
              </Col>
              <Col
                onClick={() => {
                  if (active !== "PROMO_CODE") {
                    setActive("PROMO_CODE");
                    setFormData("");
                  }
                }}
                sm={4}
                md={4}
                className={`${
                  active === "PROMO_CODE" ? "shadow-lg shadow-Pink" : ""
                } border border-Purple p-1 flex flex-col justify-between cursor-pointer w-[150px]  rounded-2xl  font-semibold`}
              >
                <div className="w-full  flex justify-center items-center h-full">
                  <img src={CODE} alt="" className="mx-auto " />
                </div>
                <h6 className="max-sm:text-[16px]">Code</h6>
              </Col>
            </Row>
            <div className={`space-y-5 `}>
              <div
                className={`${
                  active === "USDT" || active === "WHISH_MONEY" ? "" : "hidden"
                }`}
              >
                <div className="bg-[#9A9A9A] text-white rounded-2xl py-5 px-8 flex justify-between items-center">
                  <span
                    ref={text}
                    onCopy={() => setCopy(true)}
                    className=" break-all"
                  >
                    {active === "USDT"
                      ? `${dataAll?.usdt_text || "Loading..."}`
                      : `${dataAll?.whish_money_text || "Loading..."}`}
                  </span>
                  {copys ? (
                    <FaRegCheckCircle size={30} />
                  ) : (
                    <img
                      src={copy}
                      onClick={() => {
                        navigator.clipboard.writeText(text.current.innerHTML);
                        setCopy(true);
                      }}
                      alt=""
                      width={25}
                      className="cursor-pointer"
                    />
                  )}
                </div>
                <div>
                  <div>{content.TheValue}</div>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChangeInput}
                    placeholder={content.EntertheValuetobesent}
                    className="outline-none block w-full bg-slate-50  py-5 px-8 rounded-2xl"
                  />
                </div>
                <div className="mb-4">
                  <div>{content.Shippingvalue}</div>
                  <div className="w-full py-2 px-5 bg-slate-300 rounded-xl">
                    <div className="bg-slate-300 py-2">
                      <>
                        <Currency
                          number={
                            formData?.value -
                              formData?.value *
                                ((active === "USDT"
                                  ? +dataAll?.usdt_tax_percentage
                                  : +dataAll?.whish_money_tax_percentage) /
                                  100) || 0
                          }
                        />
                      </>
                    </div>
                  </div>
                </div>
                <div>
                  <div>{content.UploadPhoto}</div>
                  <AddImage
                    name="image"
                    newImage={viewFile}
                    onChange={handleChangeInput}
                    title={content.Uploadthenotice}
                    clickDeleteImage={() => {
                      setViewFile("");
                      setFormData({ ...formData, image: "" });
                    }}
                  />
                  {loading ? <Loading /> : ""}
                  <div className="text-red-500 font-semibold">{error}</div>
                </div>
              </div>
              {/* =============================================== */}
              <Code className={`${active === "PROMO_CODE" ? "" : "hidden"}`} />
              {active !== "PROMO_CODE" && (
                <div>
                  <button
                    disabled={loading}
                    onClick={handleSubmitMain}
                    className="outline-none block w-2/3 mx-auto text-white text-xl my-5 py-2 px-8 rounded-3xl  cursor-pointer bg-Pink hover:bg-opacity-90"
                  >
                    {content.Send}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ChargingWallet;

const Code = ({ className }) => {
  const { content } = useContextTranslate();
  const { handleChangeInput, handleSubmit, formData, loading, error } = usePOST(
    {}
  );
  const {
    handleSubmit: handleSubmitPlayer,
    dataPlayer,
    loading: loadingPlayer,
  } = usePOST({});
  const handleSubmitMain = (e) => {
    e.preventDefault();
    handleSubmit(`charging-processes?name=PROMO_CODE`);
  };

  return (
    <div className={`${className}`}>
      <div>
        <input
          type="text"
          name="promo_code"
          value={formData?.promo_code}
          onChange={handleChangeInput}
          placeholder={content.EnterCode}
          className="outline-none block w-full bg-slate-50  py-5 px-8 rounded-2xl"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <span>{content.Shippingvalue}</span>
          <div className="flex items-center justify-between border-2 border-Pink p-1 cursor-pointer rounded-md w-fit mt-1 text-end">
            <p
              onClick={() =>
                handleSubmitPlayer(
                  "promo-codes/check?code=" + formData?.promo_code,
                  "",
                  true
                )
              }
            >
              {content.Shippingvalue}
            </p>
            <CiSearch size={20} />
          </div>
        </div>
        <div className="w-full py-4 px-5 bg-slate-300 rounded-xl mt-1">
          {dataPlayer?.data?.data?.value
            ? dataPlayer?.data?.data?.value + dataPlayer?.data?.data?.currency
            : "" || dataPlayer?.response.data.message}
        </div>
      </div>
      {loading || loadingPlayer ? <Loading /> : ""}
      <div className="text-red-500 font-semibold">{error}</div>
      <div>
        <button
          onClick={handleSubmitMain}
          disabled={loading}
          className="outline-none block w-2/3 mx-auto text-white text-xl my-5 py-2 px-8 rounded-3xl  cursor-pointer bg-Pink hover:bg-opacity-90"
        >
          {content.Send}
        </button>
      </div>
    </div>
  );
};
