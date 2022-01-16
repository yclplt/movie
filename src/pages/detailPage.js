import React from "react";
import { Card, Row } from "antd";

export default function DetailPage({ data, onBack }) {
  const { Meta } = Card;

  return (
    <>
      <Row justify="center" gutter={[0, 16]} style={{ marginTop: "20px" }}>
        <button onClick={onBack}>Back</button>
        {data.name}
      </Row>
    </>
  );
}
