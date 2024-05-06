import { useParams } from "react-router-dom";
import { useContextTranslate } from "../../Context/ContextAPI";
import {
  Container,
  Currency,
  Loading,
  PopUp,
  TitleTwo,
  Requirements
} from "../../components";
import { fileUrl, useFETCH, usePOST } from "../../Tools/APIs";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";

const ApiProductsPackage = () => {
  const { content, showPopUp, setShowPopUp, profile } = useContextTranslate();
  const { id } = useParams();
  const [checkNumber, setCheckNumber] = useState("");
  const { data, isLoading } = useFETCH(
    `products/packages/${id}?local=${localStorage.getItem("language")}`
  );

  const dataAll = data?.data.data;
  console.log({ dataAll });
  const calculatePrice = (price = null, percentage = null) => {
    console.log(price, percentage, "percentage");
    if (percentage <= 0 || percentage == undefined) {
      return price;
    }
    const newPrice = price * (1 + percentage / 100);
    console.log(newPrice,'percentage');

    return newPrice;
  };
  const {
    handleChangeInput,
    handleSubmit,
    formData,
    loading,
    error,
    setError,
    setFormData
  } = usePOST({ package_id: id });
  const {
    handleSubmit: handleSubmitPlayer,
    dataPlayer,
    loading: loadingPlayer,
  } = usePOST({});
  const handleSubmitMain = (e) => {
    e.preventDefault();
    if (formData.qty < dataAll?.minimum_qut) {
      setError(
        localStorage.getItem("language") === "en"
          ? "Quantity must be greater than or equal to " + dataAll?.minimum_qut
          : `يجب أن تكون الكمية أكبر أو تساوي ${dataAll?.minimum_qut}`
      );
      return;
    }
    if ((dataAll?.th_party_api_id || dataAll?.th_party_as7ab_api) && dataAll?.require_player_number != 1) {
      if (
        dataPlayer?.data?.data?.username &&
        formData?.player_number === checkNumber
      ) {
        handleSubmit(
          `automated/get/packages`
        );
      } else {
        setError(
          localStorage.getItem("language") === "en"
            ? "The player number must be correct."
            : "يجب ان يكون رقم اللاعب صحيح"
        );
      }
    }  
     else {
      handleSubmit(
        `automated/get/packages`
      );
    }
  };
  useEffect(() => {
    if (dataPlayer?.data?.data?.username) {
      setCheckNumber(formData?.player_number);
    }
  }, [dataPlayer?.data?.data?.username]);
  useEffect(() => {
    setFormData({
      ...formData,
      qty: dataAll?.minimum_qut,
      product_id: dataAll?.id,
      product_reference: dataAll?.product_reference
    });
  }, [dataAll]);

  return (
    <div className="py-4 mt-4 font-semibold">
      {isLoading ? <Loading /> : ""}
      <TitleTwo title={dataAll?.name} />
      <Container>
        <div className="flex justify-center gap-6 max-sm:flex-wrap">
          <div className="w-1/2 max-md:w-full">
            <img
              src={fileUrl + dataAll?.image}
              alt=""
              className="w-full object-cover rounded-3xl"
            />
          </div>
          <div className="w-1/2 max-md:w-full space-y-1">
            <div className="flex justify-center gap-5">
              <div className="w-full">
                <span>{content.Quantity}</span>
                <p>
                  <input
                    name="qty"
                    type="number"
                    value={formData.qty}
                    onChange={handleChangeInput}
                    placeholder={dataAll?.minimum_qut || "1234..."}
                    className="py-5 px-4 border mt-3 border-[#707070] rounded-xl w-full outline-none"
                  />
                </p>
              </div>
              <div className="w-full ">
                <span>{content.Total}</span>
                <p className="bg-[#9A9A9A] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                  <Currency
                    number={
                      formData?.qty *
                        (profile?.type === "COMPANY"
                          ? +calculatePrice(
                              dataAll?.company_price,
                              dataAll?.company_percentage
                            )
                          : +calculatePrice(
                              dataAll?.user_price,
                              dataAll?.user_percentage
                            )) || 0
                    }
                  />
                </p>
              </div>

              {dataAll?.minimum_qut_note}
            </div>
            {dataAll?.is_tiktok === 1 && (
              <>
                <div className="flex flex-col">
                  <span>{content.E_mailOrPhoneNumber}</span>
                  <input
                    type="text"
                    name="email_or_phone_number"
                    value={formData.email_or_phone_number}
                    onChange={handleChangeInput}
                    className="w-full py-5 px-4  outline-none border border-[#707070] mt-3  rounded-xl"
                    placeholder={content.EnterEmailOrPhoneNumber}
                  />
                </div>
                <div className="flex flex-col">
                  <span>{content.PasswordOptional}</span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChangeInput}
                    className="w-full py-5 px-4  outline-none border border-[#707070] mt-3  rounded-xl"
                    placeholder={content.EnterThePassword}
                  />
                </div>
                <div className="flex flex-col">
                  <span>{content.ContactNumber}</span>
                  <input
                    type="text"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChangeInput}
                    className="w-full py-5 px-4  outline-none border border-[#707070] mt-3  rounded-xl"
                    placeholder={content.EnterCntactNumber}
                  />
                </div>
              </>
            )}

            <Requirements
              data={dataAll}
              formData={formData}
              setFormData={setFormData}
              handleSubmitPlayer={handleSubmitPlayer}
              handleChangeInput={handleChangeInput}
              loadingPlayer={loadingPlayer}
              content={content}
              dataPlayer={dataPlayer}
            />

            <p className="text-red-600">{dataAll?.note ? dataAll?.note : ""}</p>
            <button
              onClick={() => setShowPopUp(true)}
              className="outline-none block w-2/3 mx-auto text-white text-xl my-5 py-2 px-8 rounded-3xl cursor-pointer bg-Purple hover:bg-opacity-90"
            >
              {content.Buy}
            </button>
            <div className="text-red-500 font-semibold text-center">
              {error}
            </div>
            {loading ? <Loading /> : ""}

            <PopUp
              loading={loading}
              showPopup={showPopUp}
              onClick={handleSubmitMain}
            >
              <div className="w-full ">
                <span>{content.Quantity}</span>
                <p className="bg-[#D8D8D8] mt-3 py-5 px-4 border border-[#707070] rounded-xl">
                  {formData?.qty || 0}
                </p>
              </div>
              <div className="w-full ">
                <span>{content.Total}</span>
                <p className="bg-[#D8D8D8] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                  <Currency
                    number={
                      formData?.qty *
                        (profile?.type === "COMPANY"
                          ? +calculatePrice(
                              dataAll?.company_price,
                              dataAll?.company_percentage
                            )
                          : +calculatePrice(
                              dataAll?.user_price,
                              dataAll?.user_percentage
                            )) || 0
                    }
                  />
                </p>
              </div>

              {dataAll?.require_player_number === 1 && (
                <div className="w-full ">
                  <span>{content.PlayerNumber}</span>
                  <p className="bg-[#D8D8D8] mt-3 py-5 px-4 border border-[#707070] rounded-xl">
                    {formData?.player_number}
                  </p>
                </div>
              )}
              {dataAll?.th_party_api_id && !dataAll?.require_player_number && (
                <>
                  <div className="w-full ">
                    <span>{content.PlayerNumber}</span>
                    <p className="bg-[#D8D8D8] mt-3 py-5 px-4 border border-[#707070] rounded-xl">
                      {formData?.player_number}
                    </p>
                  </div>
                  <div className="w-full ">
                    <span>{content.PlayerName}</span>
                    <p className="bg-[#D8D8D8] mt-3 py-5 px-4 border border-[#707070] rounded-xl">
                      {dataPlayer?.data?.data?.username ||
                        dataPlayer?.data.msg ||
                        dataPlayer?.data?.message}
                    </p>
                  </div>
                </>
              )}
              <div className="text-red-500 font-semibold text-center">
                {error}
              </div>
            </PopUp>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ApiProductsPackage;