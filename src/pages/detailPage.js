import React, { useState, useEffect } from "react";
import axios from "axios";
import MD5 from "crypto-js/md5";
import { Card, Row, Col, Button, Image } from "antd";

export default function DetailPage({ data, onBack }) {
  const [characterDetail, setCharacterDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getCharacterDetail() {
    setCharacterDetail([]);
    setIsLoading(true);
    const baseUrl = `https://gateway.marvel.com/v1/public/characters/${data?.id}/comics?limit=10`;
    const timestamp = new Date().getTime();
    const hash = MD5(
      timestamp +
        "cab6ab23838b3a11c4ae489c10af029a31b5aba2" +
        "79b0805cb1720ca5f2282a861c50a62e"
    ).toString();
    const auth = `&ts=${timestamp}&apikey=79b0805cb1720ca5f2282a861c50a62e&hash=${hash}`;
    const url = `${baseUrl}${auth}`;
    await axios.get(url).then((res) => {
      setCharacterDetail(res?.data?.data?.results);
    });
    setIsLoading(false);
  }

  useEffect(() => {
    getCharacterDetail();
  }, []);
  return (
    <>
      <Row justify="center" gutter={[0, 16]} style={{ marginTop: "20px" }}>
        <Col span={20}>
          <Row style={{ marginBottom: "10px" }}>
            <Button onClick={onBack}>Back</Button>
          </Row>
          <Row>
            <Col>
              <Image
                width={350}
                src={`${data?.thumbnail?.path}.${data?.thumbnail?.extension}`}
              />
            </Col>
            <Col>
              <Card title={data?.name} bordered={false} style={{ width: 600 }}>
                <p>{data?.description?.length > 0 ? data?.description : "-"}</p>
              </Card>
              <Card
                title="Comics Series"
                bordered={false}
                loading={isLoading}
                style={{ width: 600 }}
              >
                {characterDetail &&
                  characterDetail.map((character, index) => {
                    return (
                      <p key={`${character.title}-${index}`}>
                        {character?.title}
                      </p>
                    );
                  })}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
