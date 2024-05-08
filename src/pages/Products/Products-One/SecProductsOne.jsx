import { CardProducts, LoadingProducts, Title } from "../../../components";
import { useContextTranslate } from "../../../Context/ContextAPI";
import { Col, Row } from "../../../Grid-system";
import { useParams } from "react-router-dom";
import { fileUrl, useFETCH, useFilter } from "../../../Tools/APIs";

const SecProductsOne = ({ number = 1 }) => {
  const { content, profile } = useContextTranslate();
  const { id } = useParams();
  const { filter } = useFilter();
  const { data, isLoading } = useFETCH(
    `products/${id}/packages?local=${localStorage.getItem("language")}${
      filter.get("page") ? "&page=" + filter.get("page") : ""
    }`
  );

  const calculatePrice = (price = null, percentage = null) => {
    console.log(price, percentage, "percentage");
    if (percentage <= 0 || percentage == undefined) {
      return price;
    }
    const newPrice = price * (1 + percentage / 100);
    console.log(newPrice, "percentage");

    return newPrice;
  };
  return (
    <div className="py-3">
      <div>
        <Title title={content.Packages} />
        <div className="text-xl mb-4">{content.Choosetherightpackage}:</div>
        <Row justify="center">
          <Row justify="center">
            {isLoading ? (
              <>
                <Col sm={7} xs={5} lg={3}>
                  <LoadingProducts />
                </Col>
                <Col sm={7} xs={5} lg={3}>
                  <LoadingProducts />
                </Col>
                <Col sm={7} xs={5} lg={3}>
                  <LoadingProducts />
                </Col>
                <Col sm={7} xs={5} lg={3}>
                  <LoadingProducts />
                </Col>
                <Col sm={7} xs={5} lg={3}>
                  <LoadingProducts />
                </Col>
                <Col sm={7} xs={5} lg={3}>
                  <LoadingProducts />
                </Col>
                <Col sm={7} xs={5} lg={3}>
                  <LoadingProducts />
                </Col>
              </>
            ) : (
              ""
            )}
            {data?.data.data.map((e) => (
              <Col sm={7} xs={5} lg={3} key={e.id}>
                <CardProducts
                  image={fileUrl + e.image}
                  link={
                    e.is_available
                      ? `/products/products-${number}/packages/${e.id}`
                      : ""
                  }
                  title={e.name}
                  active={e.is_available ? `` : `${content.unAvailable}`}
                  bg={e.is_available ? `` : `bg-black/10`}
                  price={
                    number == 6
                      ? profile?.type === "COMPANY"
                        ? calculatePrice(e.company_price, e.company_percentage)
                        : calculatePrice(e.user_price, e.user_percentage)
                      : profile?.type === "COMPANY"
                      ? e.company_price
                      : e.user_price
                  }
                />
              </Col>
            ))}
          </Row>
          {/* </Pagination> */}
        </Row>
      </div>
    </div>
  );
};

export default SecProductsOne;
