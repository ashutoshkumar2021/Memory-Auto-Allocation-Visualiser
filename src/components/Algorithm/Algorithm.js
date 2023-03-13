import React from 'react';
import MemoryIndicator from "../MemoryIndicator";

import { Col, Row } from "reactstrap";

export default function Algorithm({ name, data, drawGraph }) {

  if (!data) {
    return null;
  }

  const style = {
    padding: 4,
    // borderBottom: '1px solid black',
    display: 'flex',
    flexWrap: 'wrap',
    flex: '1 1 50%',
    // borderRight: '1px solid black',
  };

  const infoStyle = {
    paddingTop: 40,
    paddingLeft: 40,
  };

  const { chunks, error, done } = data;

  let titleColor = 'black';
  if (done) {
    titleColor = 'green';
  } else if (error) {
    titleColor = 'red'
  }

  return (
    <div style={style}>
      <Row style={{ width: '100%' }}>
        <Col style={{ display: 'flex', alignItems: 'center' }}>
          <h2 style={{ marginTop: '20px', marginLeft: '30px', color: titleColor }}>{name}</h2>
          {error && <span style={{ ...infoStyle, color: 'red' }}>Failed to satisfy all allocation requests!</span>}
          {done && <span style={{ ...infoStyle, color: 'green' }}>Successfully allocated all requested memory!</span>}
        </Col>
      </Row>
      <Row style={{ width: '100%' }}>
        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', minWidth: 360 }}>
          <MemoryIndicator chunks={chunks}/>
        </Col>
        <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', minWidth: 400 }}>
        </Col>
      </Row>
    </div>
  )
}