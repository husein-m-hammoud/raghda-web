import { useParams } from "react-router-dom";
import { Currency, Loading, TitleTwo } from "../../components";
import { useContextTranslate } from "../../Context/ContextAPI";
import { Col, Container, Row } from "../../Grid-system";
import { fileUrl, useFETCH } from "../../Tools/APIs";
import { useEffect, useRef, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";

const Request = () => {
  const { content } = useContextTranslate();
  const { id } = useParams();
  const { data, isLoading } = useFETCH(
    `orders/${id}?local=${localStorage.getItem("language")}`
  );
  const dataAll = data?.data.data;
  const [copys, setCopy] = useState(false);
  const text = useRef();
  useEffect(() => {
    setTimeout(() => setCopy(false), 2000);
  }, [copys]);
  return (
    <section className="py-4">
      <Container>
        <TitleTwo title={content.Orders} />
        {isLoading ? <Loading /> : ""}
        <Row justify="center">
          <Col
            className="border border-Pink rounded-2xl p-5 flex max-md:flex-col gap-10"
            lg={15}
          >
            <Row className="p-5">
              <Col md={8}>
                <img
                  src={fileUrl + dataAll?.product_image}
                  alt=""
                  className="rounded-2xl h-[260px] object-contain mx-auto"
                />
              </Col>
              <Col md={7}>
                <Row>
                  <Col md={8}>
                    <Row>
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">ID : </div>
                          <div>{dataAll?.id}</div>
                        </div>
                      </Col>

                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            {content.Date} :
                          </div>
                          <div>{dataAll?.date}</div>
                        </div>
                      </Col>
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            {content.Time} :
                          </div>
                          <div>{dataAll?.time}</div>
                        </div>
                      </Col>
                      {dataAll?.user.username && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.UserName} :
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.user.username}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.user.phone_number && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.Phone}:
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.user.phone_number}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.service_type && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.ServiceType} :
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.service_type}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.social_link && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.SocialLink}:
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.social_link}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.wallet_address && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.WalletAddress}:
                            </div>
                            <div className={`  font-semibold break-all`}>
                              {dataAll?.wallet_address}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.email_or_phone_number && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.E_mailOrPhoneNumber}:
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.email_or_phone_number}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.password && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.Password} :
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.password}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.contact_number && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.ContactNumber} :
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.contact_number}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.refuse_reason && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              {content.RefuseReason}:
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.refuse_reason}
                            </div>
                          </div>
                        </Col>
                      )}
                      {dataAll?.accept_note && (
                        <Col>
                          <div className="flex gap-2 mb-2">
                            <div className="font-semibold text-Pink">
                              Accept Note :
                            </div>
                            <div className={`  font-semibold`}>
                              {dataAll?.accept_note}
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </Col>
                  <Col md={7}>
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                          {content.Orderstatus} :
                        </div>
                        <div
                          className={`${
                            dataAll?.status === "WAITING"
                              ? "text-blue-500"
                              : dataAll?.status === "COMPLETED"
                              ? "text-green-600"
                              : dataAll?.status === "CANCELED"
                              ? "text-red-600 "
                              : ""
                          } font-semibold`}
                        >
                          {dataAll?.status}
                        </div>
                      </div>
                    </Col>

                    {dataAll?.player_name && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            {content.PlayerName} :
                          </div>
                          <div className={`  font-semibold`}>
                            {dataAll?.player_name}
                          </div>
                        </div>
                      </Col>
                    )}
                    {dataAll?.player_number && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            {content.PlayerNumber} :
                          </div>
                          <div
                            ref={text}
                            onCopy={() => setCopy(true)}
                            className={`font-semibold`}
                          >
                            {dataAll?.player_number}
                          </div>
                          {copys ? (
                            <FaRegCheckCircle size={15} />
                          ) : (
                            <FaRegCopy
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  text.current.innerHTML
                                );
                                setCopy(true);
                              }}
                              size={15}
                              className="cursor-pointer "
                            />
                          )}
                        </div>
                      </Col>
                    )}
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                          {content.product} :
                        </div>
                        <div>{dataAll?.product_name}</div>
                      </div>
                    </Col>
                    {dataAll?.package_name && (
                      <Col>
                        <div className="flex gap-2 mb-2">
                          <div className="font-semibold text-Pink">
                            {content.Packages}:
                          </div>
                          <div>{dataAll?.package_name}</div>
                        </div>
                      </Col>
                    )}
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                          {content.Quantity}:
                        </div>
                        <div>{dataAll?.quantity}</div>
                      </div>
                    </Col>
                    <Col>
                      <div className="flex gap-2 mb-2">
                        <div className="font-semibold text-Pink">
                          {content.Total} {content.Price}:
                        </div>
                        <div>
                          <Currency
                            number={dataAll?.total_price}
                            currency={dataAll?.currency}
                          />
                        </div>
                      </div>
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Request;