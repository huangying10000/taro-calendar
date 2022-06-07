import { useState } from 'react';
import { View } from "@tarojs/components";
import { Icon } from "@antmjs/vantui";
import type {Dayjs} from 'dayjs';

type HeaderProps = {
  initialMinDate: Dayjs
  onPrevMonth: (a: any) => void
  onNextMonth: (a: any) => void
}

const Index = (props: HeaderProps) => {
  const { initialMinDate, onPrevMonth, onNextMonth } = props;

  const [weekdays] = useState<Array<string>>(['日', '一', '二', '三', '四', '五', '六'])

  return (
    <View className='calendar-header'>
      <View className='calendar-header-title flex'>
        <View>
          <Icon onClick={onPrevMonth} name='arrow-left' size='36' className='icon' />
        </View>
        <View className='flex-1 t-c'>
          {initialMinDate.format('YYYY年MM月')}
        </View>
        <View>
          <Icon onClick={onNextMonth} name='arrow' size='36' className='icon' />
        </View>
      </View>
      <View className='calendar-header-weekdays flex t-c'>
        {weekdays.map((item: any) => {
          return (
            <View key={item} className='calendar-weekday'>
              {item}
            </View>
          )
        })}
      </View>
    </View>
  );
};

export default Index;
