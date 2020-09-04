import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import GetMarkets from "./GetMarkets";
import GetPipeline from "./GetPipeline";

export default function Markets() {
  return (
    <Tabs defaultActiveKey="1" transition={false} className="horizontal-tabs">
      <Tab eventKey="1" className="headings" title="Get Markets">
        <GetMarkets />
      </Tab>
      <Tab eventKey="2" className="headings" title="Get Pipeline">
        <GetPipeline />
      </Tab>
    </Tabs>
  );
}
