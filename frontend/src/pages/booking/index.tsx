import dayjs from "dayjs";
import React from "react";
import moment from "moment";
import Box from "../../components/box";
import GridLayout from "../../components/layouts/gridLayout";
import { Button, Empty } from "antd";
import { IUser } from "../../models/IUser";
import * as Api from "../../service/API/Api";

import CardBooking from "../../components/card/cardBooking";
export default function Booking() {
  const [initialUsers, setUsers] = React.useState([] as Array<IUser> | any);
  const [arrDate, setArrDate] = React.useState([
    { date: "Mon", numDate: moment().day("Monday").date() },
    { date: "Tues", numDate: moment().day("Tuesday").date() },
    { date: "Wed", numDate: moment().day("Wednesday").date() },
    { date: "Thur", numDate: moment().day("Thursday").date() },
    { date: "Fri", numDate: moment().day("Friday").date() },
  ]);
  const BASE_URL = Api.BASE_URL_SCHEDULE;

  const handleDate = async (idx: string | number) => {
    console.log(idx);
    console.log("send");
    try {
      const { data } = await Api.Get<any>(BASE_URL);
      const newData = [];

      for (const res of data) {
        const dayFormat = dayjs(res.calendar.date).format("YYYY-MM-DD");
        const last2index = dayFormat.slice(
          dayFormat.length - 2,
          dayFormat.length
        ); //get last 2 index
        if (Number(last2index) === idx) {
          newData.push(res);
        }
      }
      setUsers(newData);
      console.log(newData);
    } catch (err) {
      alert(err);
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        await Api.Random<IUser>(BASE_URL);
        const { data } = await Api.Get<any>(BASE_URL);
        const newData = [];

        for (const res of data) {
          const dayFormat = dayjs(res.calendar.date).format("YYYY-MM-DD");
          const last2index = dayFormat.slice(
            dayFormat.length - 2,
            dayFormat.length
          ); //get last 2 index
          if (Number(last2index) === moment().day("Monday").date()) {
            newData.push(res);
          }
        }
        setUsers(newData);
        console.log(newData);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 lg:p-0 px-5">
      <div className="container grid grid-cols-5 lg:gap-16 gap-2 text-center mt-10 mb-10">
        {arrDate?.map((item, index) => {
          return (
            <div key={index}>
              <Box
                onClick={() => handleDate(item.numDate)}
                date={item.date}
                numDate={item.numDate}
                className="rounded-lg shadow-md bg-transparent cursor-pointer transition-all delay-75 hover:shadow-xl hover:bg-gray-200"
              />
            </div>
          );
        })}
      </div>
      <div className="bg-gray-50 border border-gray-300 text-gray-900 h-96 text-sm w-full mx-auto p-2.5 rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <GridLayout
          items={initialUsers}
          className="grid md:grid-cols-5 md:gap-5 overflow-auto py-5 px-2.5 h-96"
          emptyList={<Empty />}
          renderItem={({ item, key }: { item: any; key: string | number }) => {
            return (
              <>
                {item.user ? (
                  <CardBooking
                    image={item.user.image}
                    name={item.user.name}
                    position={item.user.position}
                    className="bg-white card-bottom rounded-lg lg:h-40 text-start lg:py-5 lg:px-7 px-10 py-5 h-32 cursor-pointer transition-all delay-75 hover:shadow-lg"
                  />
                ) : null}
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
