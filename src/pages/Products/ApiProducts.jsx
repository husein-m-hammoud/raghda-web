import { Container, TitleTwo } from "../../components";
import SecProductsOne from "./Products-One/SecProductsOne";
import ApiProductsCounter from "./ApiProductsCounter";
import React, { useState } from "react";

import { useContextTranslate } from "../../Context/ContextAPI";
import { useFETCH } from "../../Tools/APIs";
import { useParams } from "react-router-dom";

const ApiProducts = () => {
  const [isCounter, setIsCounter] = useState(false);

  const { id } = useParams();
  const { data } = useFETCH(
    `products/${id}?local=${localStorage.getItem("language")}`
  );
  const { data: dataPackages } = useFETCH(`products/${id}/packages`);

  if (
    dataPackages?.data?.data.length == 1 &&
    dataPackages?.data?.data[0].type !== "package"
  ) {
    if(!isCounter) {
    setIsCounter(true)
    }
  }
  console.log('hussein', isCounter, dataPackages);


  return (
    <section className="py-3 ">
      <Container>
        <TitleTwo title={data?.data.data.name} />
        {
          isCounter? (
                      <ApiProductsCounter />
                    ) : (
                      <SecProductsOne number={6}/>
                    )
        }


      </Container>
    </section>
  );
};

export default ApiProducts;
