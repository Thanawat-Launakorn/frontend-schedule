import React from "react";
import { Button, Space } from "antd";
import "./home.css";
// import { Card } from "antd";
import GridLayout from "../../components/layouts/gridLayout";
import ICreateder from "../../models/ICreateder";
import * as DataCreateder from "../../data/createder";
import Card from "../../components/card/cardDefault";
import { Link } from "react-router-dom";
export default function Home() {
  const handleToLocation = () => {
    window.location.href = "https://github.com/Woottikrai/SchduleUser";
  };

  React.useEffect(() => {
    (async () => {})();
  }, []);
  return (
    <div>
      <div className="bg-gray-200 p-28 w-full bg-animation shadow-sm block">
        <h1 className="fontThai lg:text-7xl text-xs text-transparent">
          ระบบจองเวร
        </h1>
      </div>
      <section className="lg:p-10 p-5 text-center tracking-normal">
        <h1 className="lg:text-7xl text-4xl uppercase font-bold mb-5">
          booking system
        </h1>
        <p className="lg:text-lg text-sm font-normal mb-8">
          Help designers/developers building beautiful products more flexible
          and working with happiness
        </p>
        <Space wrap>
          <Button type="primary" size="large" onClick={handleToLocation}>
            View Code
          </Button>
          <div className="mx-.5"></div>
          <Button size="large">Default Button</Button>
        </Space>
        {/* GridLayoutTop */}
        <GridLayout
          className="container lg:max-w-6xl mx-auto grid lg:grid-cols-3 lg:gap-10 lg:mt-24 sm:grid-cols-1 mt-10 gap-y-10"
          items={DataCreateder.createder_Top}
          renderItem={({
            item,
            key,
          }: {
            item: ICreateder;
            idx: number;
            array: Array<ICreateder>;
            key: string | number;
          }) => {
            return (
              <Link key={key} to={item.path} className="no-underline">
                <Card
                  title={item.name}
                  description={item.description}
                  position={item.position}
                  className="card-top rounded-lg text-center py-5 px-7 cursor-pointer transition-all delay-75 hover:shadow-lg lg:text-start"
                  id=""
                />
              </Link>
            );
          }}
        />

        <GridLayout
          className="container lg:max-w-3xl mx-auto grid lg:grid-cols-2 lg:gap-10 lg:mt-24 sm:grid-cols-1 mt-10 gap-y-10"
          items={DataCreateder.createder_Bottom}
          renderItem={({
            item,
            key,
          }: {
            item: ICreateder;
            idx: number;
            array: Array<ICreateder>;
            key: string | number;
          }) => {
            return (
              <Link key={key} to={item.path} className="no-underline">
                <Card
                  title={item.name}
                  description={item.description}
                  position={item.position}
                  className="card-top rounded-lg text-center  py-5 px-7 cursor-pointer transition-all delay-75 hover:shadow-lg lg:text-start"
                  id=""
                />
              </Link>
            );
          }}
        />
      </section>
    </div>
  );
}
