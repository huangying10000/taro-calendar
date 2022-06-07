import { View } from '@tarojs/components'
import Calendar from '../../components/Calendar'
import './index.scss'


const Index = () => {

  return (
    <View className='index'>
      <Calendar title='日期' />
    </View>
  )
}

export default Index;
