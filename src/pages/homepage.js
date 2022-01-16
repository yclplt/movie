import React, { useState, useEffect } from "react";
import axios from "axios";
import MD5 from "crypto-js/md5";
import { Card, Row, Col } from "antd";
import DetailPage from "./detailPage.js";

export default function HomePage() {
  const { Meta } = Card;
  let currentOffset = 0;
  const [characters, setCharacters] = useState([]);
  const [characterDetail, setCharacterDetail] = useState(null);

  const loadThirtyCharacters = () => {
    const baseUrl = `https://gateway.marvel.com/v1/public/characters?limit=30&offset=${currentOffset}`;
    const timestamp = new Date().getTime();
    const hash = MD5(
      timestamp +
        "cab6ab23838b3a11c4ae489c10af029a31b5aba2" +
        "79b0805cb1720ca5f2282a861c50a62e"
    ).toString();
    const auth = `&ts=${timestamp}&apikey=79b0805cb1720ca5f2282a861c50a62e&hash=${hash}`;
    const url = `${baseUrl}${auth}`;
    axios.get(url).then((res) => {
      setCharacters((list) => [...list, ...res.data.data.results]);
    });
    currentOffset += 10;
  };

  const handleScroll = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      loadThirtyCharacters();
    }
  };

  useEffect(() => {
    loadThirtyCharacters();
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Row justify="center" gutter={[0, 16]} style={{ marginTop: "20px" }}>
        {!characterDetail?.name && (
          <Col span={20}>
            <Row justify="space-between" gutter={[40, 40]}>
              {characters?.map((character, index) => {
                return (
                  <Card
                    hoverable
                    key={`${character.name}-${index}`}
                    onClick={() => setCharacterDetail(character)}
                    style={{ width: 200 }}
                    cover={
                      <img
                        alt="example"
                        src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
                      />
                    }
                  >
                    <Meta title={character.name} />
                  </Card>
                );
              })}
            </Row>
          </Col>
        )}
        {characterDetail?.name && (
          <DetailPage
            data={characterDetail}
            onBack={() => setCharacterDetail(null)}
          />
        )}
      </Row>
    </>
  );
}
