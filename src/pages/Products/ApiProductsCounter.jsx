import { useParams } from "react-router-dom";
import { useContextTranslate } from "../../Context/ContextAPI";
import {
  Container,
  Currency,
  Loading,
  PopUp,
  Requirements,
  TitleTwo,
} from "../../components";
import { fileUrl, useFETCH, usePOST } from "../../Tools/APIs";
import { useEffect, useState } from "react";

const ApiProductsCounter = () => {

  const { content, showPopUp, setShowPopUp, profile } = useContextTranslate();
  const { id } = useParams();
  const [checkNumber, setCheckNumber] = useState("");
  const { data, isLoading } = useFETCH(
    `products/${id}?local=${localStorage.getItem("language")}`
  );
  const { data: dataPackages } = useFETCH(`products/${id}/packages`);
  let mergedData, package_id;
  let dataAll = data?.data.data;
  console.log(dataAll,'hus')
  if (
    dataPackages?.data?.data.length == 1 &&
    dataPackages?.data?.data[0].type !== "package"
  ) {
    mergedData = dataPackages?.data?.data[0];
    package_id = mergedData?.id;
    mergedData["package_id"] = package_id;
    mergedData["images"] = dataAll?.images;
    mergedData["name"] = dataAll?.name;
    
    mergedData["minimum_qut_note"] = dataAll?.minimum_qut_note
      ? dataAll.minimum_qut_note
      : "";

    mergedData["note"] = dataAll?.note ? dataAll?.note : "";
    mergedData["minimum_qut"] = dataAll?.minimum_qut;
    console.log({mergedData});
    dataAll = mergedData;

    // var tmprequirements = dataAll?.requirements
    // if (tmprequirements) {
    //   tmprequirements = json.parse(tmprequirements);
    //   const checkPlayerId = tmprequirements.find(person => person.name === 'player_id') !== undefined;
    //   if(checkPlayerId) {
    //     dataAll.require_player_number = 1;
    //   }
 
    // }
    
  } 
console.log({dataAll});

  const {
    handleChangeInput,
    handleSubmit,
    formData,
    loading,
    error,
    setError,
    setFormData,
  } = usePOST({ product_id: id });
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
    if ( dataAll?.maximum_qut >0 && formData.qty > dataAll?.maximum_qut) {
      setError(
        localStorage.getItem("language") === "en"
          ? "Quantity must be less than or equal to " + dataAll?.maximum_qut
          : `يجب أن تكون الكمية أقل أو تساوي ${dataAll?.maximum_qut}`
      );
      return;
    }
    if ((dataAll?.th_party_api_id || dataAll?.th_party_as7ab_api) && dataAll?.require_player_number != 1) {
      console.log("Please", dataAll?.require_player_number, dataAll?.th_party_api_id, dataAll?.th_party_as7ab_api)
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
  const calculatePrice = (price = null, percentage =null ) => {
    console.log(price, percentage,'percentage');
    if(percentage <= 0 || percentage == undefined) {
      return price;
    }
    const newPrice = price * (1+ percentage / 100);
    console.log(newPrice,'percentage');
    return newPrice;
  };

  useEffect(() => {
    if(dataPlayer?.data?.data?.username) {
      setFormData({
        ...formData,
        player_name: dataPlayer?.data?.data?.username
      });
    }
 
  },[dataPlayer?.data?.data?.username] )

  useEffect(() => {
    setFormData({
      ...formData,
      qty: dataAll?.minimum_qut,
      product_id: dataAll?.package_id,
      product_reference: dataAll?.product_reference
    });
  }, [dataAll]);

  useEffect(() => {
    if (dataPlayer?.data?.data?.username) {
      setCheckNumber(formData?.player_number);
    }
  }, [dataPlayer?.data?.data?.username]);

  return (
    <section className="py-3 font-semibold ">
      <Container>
        {isLoading ? <Loading /> : ""}
    
        <div className="py-4 mt-4">
          <div className="flex justify-center gap-6 max-sm:flex-wrap">
            <div className="w-1/2 max-md:w-full">
              <img
                src={fileUrl + dataAll?.image}
                alt=""
                className="w-full object-cover rounded-3xl"
              />
            </div>
            <div className="w-1/2 max-md:w-full space-y-2">
              <div className="flex justify-center gap-5">
                <div className="w-full">
                  <span>{content.Quantity}</span>
                  <p>
                    <input
                      name="qty"
                      type="number"
                      value={formData?.qty}
                      min={dataAll?.minimum_qut}
                      onChange={handleChangeInput}
                      placeholder={dataAll?.minimum_qut || "1234..."}
                      className={`${
                        formData.qty < dataAll?.minimum_qut
                          ? "shadow-md shadow-red-500 "
                          : ""
                      } py-5 px-4 border mt-3  border-[#707070] rounded-xl w-full outline-none`}
                    />
                    <h5 className="text-red-600">
                      {dataAll?.minimum_qut_note
                        ? dataAll?.minimum_qut_note
                        : ""}
                    </h5>
                  </p>
                </div>
                <div className="w-full ">
                  <span>{content.Total}</span>
                  <p className="bg-[#9A9A9A] mt-3  py-5 px-4 border border-[#707070] rounded-xl  ">
                    <Currency
                      number={
                        formData?.qty *
                          (profile?.type === "COMPANY"
                            ? + calculatePrice(dataAll?.company_price , dataAll?.company_percentage)
                            : + calculatePrice(dataAll?.user_price , dataAll?.user_percentage)) || 0
                      }
                    />
                  </p>
                </div>
              </div>
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
              
              <p className="text-red-600">
                {dataAll?.note ? dataAll?.note : ""}
              </p>
              <button
                onClick={() => setShowPopUp(true)}
                className="outline-none block w-2/3 mx-auto text-white text-xl my-5 py-2 px-8 rounded-3xl  cursor-pointer bg-Purple hover:bg-opacity-90"
              >
                {content.Buy}
              </button>
              <div className="text-red-500 font-semibold text-center">
                {error}
              </div>
            </div>
          </div>
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
            <p className="bg-[#D8D8D8] mt-3 py-5 px-4 border border-[#707070] rounded-xl">
              <Currency
                number={
                  formData?.qty *
                    (profile?.type === "COMPANY"
                    ? + calculatePrice(dataAll?.company_price , dataAll?.company_percentage)
                     : + calculatePrice(dataAll?.user_price , dataAll?.user_percentage)) || 0
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
          <div className="text-red-500 font-semibold text-center">{error}</div>
        </PopUp>
      </Container>
    </section>
  );
};

export default ApiProductsCounter;
