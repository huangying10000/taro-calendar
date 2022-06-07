import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import { Popup, Toast } from "@antmjs/vantui";
import dayjs from "dayjs";
import _cloneDeep from 'lodash/cloneDeep';
import Header from "./components/header";
import Month from "./components/month";
import "./index.scss";

type CalendarProps = {
  title?: string | React.ReactNode;
};

const Index = (props: CalendarProps) => {
  const { title } = props;
  const [initialMinDate, setInitialMinDate] = useState<any>(dayjs());
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<any[]>([]);

  const showPageContainer = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  const onConfirm = (arr) => {
    const msg = _cloneDeep(arr).map((e) => dayjs(e).format("YYYY年MM月DD日")).join(",")
    Toast.show(msg)
    onClose();
    setValue(arr);
  };

  const onPrevMonth = () => {
    setInitialMinDate(initialMinDate.add(-1, 'month'))
  }

  const onNextMonth = () => {
    setInitialMinDate(initialMinDate.add(1, 'month'))
  }

  return (
    <View className='calendar'>
      <View className='cell flex' onClick={showPageContainer}>
        <View className='cell-title flex-1'>
          <Text>{title}</Text>
        </View>
        <View className='cell-value flex-1'>
          <View>
            {value.length ? (
              <Text>
                {value.map((e) => dayjs(e).format("YYYY年MM月DD日")).join(",")}
              </Text>
            ) : (
              <Text className='text-info'>选择日期</Text>
            )}
          </View>
        </View>
      </View>
      <Popup show={show} onClose={onClose} round position='bottom'>
        <Header initialMinDate={initialMinDate} onPrevMonth={onPrevMonth} onNextMonth={onNextMonth} />
        <Month
          value={value}
          initialMinDate={initialMinDate}
          onChange={onConfirm}
        />
      </Popup>
      <Toast />
    </View>
  );
};

export default Index;
