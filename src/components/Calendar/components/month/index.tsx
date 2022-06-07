import { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import { Button } from '@antmjs/vantui';
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import _cloneDeep from 'lodash/cloneDeep';
import { getMonths } from "../../utils";


type MonthProps = {
  value?: any[];
  initialMinDate: Dayjs;
  onChange: (a: any) => void;
};

const Index = (props: MonthProps) => {
  const { initialMinDate, onChange, value } = props;
  const [days, setDays] = useState<any[]>([]);
  const [selectDays, setSelectDays] = useState<any[]>([]);

  useEffect(() => {
    if (value?.length){
      setSelectDays(value.map((e) => dayjs(e).valueOf()))
    }
  }, [value])

  useEffect(() => {
    const d = getMonths(initialMinDate);
    setDays(d);
  }, [initialMinDate]);

  const isDisabled = (d) => {
    return dayjs(d).isBefore(dayjs());
  };

  const onClickDay = (d: any) => {
    const newDays: any[] = _cloneDeep(selectDays)
    const i = newDays.indexOf(d)
    if(i > -1) {
      newDays.splice(i, 1)
    } else {
      newDays.push(d)
    }
    setSelectDays(newDays)
  }

  const isSelect = (d) => {
    return selectDays.indexOf(d) > -1
  }

  return (
    <View className='calendar-month'>
      <View className='flex flex-wrap t-c'>
        {days.map((item: any, index: number) => {
          const disabled = isDisabled(item.dayjs);
          const select = isSelect(item.dayjs);
          return (
            <View
              className={
              `calendar-weekday
              ${disabled ? "calendar-weekday-disabled" : ""}
              ${select ? "calendar-weekday-selected" : ""}
              `
            }
              key={item.key}
              style={
                index === 0 ? { marginLeft: `${item.week * 14.285}%` } : ""
              }
              onClick={() => {
                if (disabled) {
                  return
                }
                onClickDay(item.dayjs)
              }}
            >
              <View className='calendar-weekday-day'>{item.dd}</View>
              {[1,3,5].indexOf(item.week) > -1 && !disabled ? <View className='calendar-weekday-badge' /> : null}
            </View>
          );
        })}
      </View>
      <View className='calendar-footer'>
        <Button type='info' block size='small' onClick={() => onChange(selectDays)}>确定</Button>
      </View>
    </View>
  );
};

export default Index;
