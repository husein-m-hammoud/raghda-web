import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const Requirements = ({
  data,
  formData,
  setFormData,
  handleChangeInput,
  loadingPlayer,
  content,
  handleSubmitPlayer,
  dataPlayer,
}) => {
  const [requirementsData, setRequirementsData] = useState("");

  useEffect(() => {
    if(formData?.player_id){
        setFormData({
            ...formData,
            player_number: formData.player_id
          });
   
    }
    console.log({formData})
  },[formData?.player_id])
  
  useEffect(() => {
    if(data?.requirements) {
        setRequirementsData(JSON.parse(data.requirements))   
    }
  }, [data?.requirements]);

  if (!requirementsData) {
    console.log("hussein requirements false");
    return null;
  }
  const renderRequirements = () => {
    return requirementsData.map((item, index) => (
      <div className="flex flex-col requirements" key={`req${index}`}>
        <span>{item?.label}</span>
        <input
          type="text"
          name={item?.name}
          value={formData[item?.name]}
          onChange={handleChangeInput}
          className="w-full py-5 px-4  outline-none border border-[#707070] mt-3  rounded-xl"
          placeholder={content.EnterThePlayerNumber}
        />
      </div>
    ));
  };
  console.log({ requirementsData });
  return (
    <>
    {renderRequirements()}
      {data?.th_party_api_id && !data?.require_player_number && !data?.th_party_as7ab_api  && (
        <>
        
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span>{content.PlayerName}</span>
              <div className="flex items-center justify-between border-2 border-Pink p-1 cursor-pointer rounded-md w-fit mt-1 text-end">
                <p
                  className="relative"
                  onClick={() =>
                    handleSubmitPlayer(
                      "th-p-apis/" +
                        data?.th_party_api_id +
                        "?number=" +
                        formData?.player_number,
                      "",
                      true
                    )
                  }
                >
                  {loadingPlayer ? "Loading...." : content.searchPlayer}
                </p>
                <CiSearch size={20} />
              </div>
            </div>
            <div className="w-full py-5 px-4 outline-none border border-[#707070] mt-3  rounded-xl">
              {dataPlayer?.data?.data?.username ||
                dataPlayer?.data?.msg ||
                dataPlayer?.data?.message}
            </div>
          </div>
        </>
      )}
      {!data?.require_player_number && data?.th_party_as7ab_api  &&(
        <>
        
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span>{content.PlayerName}</span>
              <div className="flex items-center justify-between border-2 border-Pink p-1 cursor-pointer rounded-md w-fit mt-1 text-end">
                <p
                  className="relative"
                  onClick={() =>
                    handleSubmitPlayer(
                        "automated/get/player/name/"+formData?.player_number+"/"+data?.th_party_as7ab_api,
                      "",
                      true
                    )
                  }
                >
                  {loadingPlayer ? "Loading...." : content.searchPlayer}
                </p>
                <CiSearch size={20} />
              </div>
            </div>
            <div className="w-full py-5 px-4 outline-none border border-[#707070] mt-3  rounded-xl">
              {dataPlayer?.data?.data?.username ||
                dataPlayer?.data?.msg ||
                dataPlayer?.data?.message}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Requirements;
