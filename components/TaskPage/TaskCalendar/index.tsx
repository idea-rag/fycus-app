import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { FONTS } from "@/styles/fonts";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import DayTaskBox from "../DayTaskBox";

const CustomHeader = (props: any) => {
    const { date } = props;
    const month = date.toString('yyyy MMMM');
  
    return (
        <Text style={styles.monthText}>{month}의 할일</Text> 
    );
};

type TaskType = {
    name: string;
    importance: number;
    isChecked: boolean;
}

interface IProps {
    MonthTasks: {[date: string]: TaskType[]}
}

export default function TaskCalendar(props: IProps) {
    const { MonthTasks } = props;
    const [selected, setSelected] = useState<string>('');

    LocaleConfig.locales.kr = {
        monthNames: [
          '01월', '02월', '03월', '04월', '05월', '06월', 
          '07월', '08월', '09월', '10월', '11월', '12월'
        ],
        monthNamesShort: [
          '01월', '02월', '03월', '04월', '05월', '06월',
          '07월', '08월', '09월', '10월', '11월', '12월'
        ],
        dayNames: [
          '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'
        ],
        dayNamesShort: [
          '일', '월', '화', '수', '목', '금', '토'
        ]
    };
    
    LocaleConfig.defaultLocale = 'kr';

    const hasTasks = MonthTasks && Object.keys(MonthTasks).length > 0;

    const onDayPress = (day: DateData) => {
        setSelected(day.dateString);
    };

    const today = new Date().toISOString().split('T')[0];
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); 
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [taskModalVisible, setTaskModalVisible] = useState(false);
    const modalOpen = () => {
        setTaskModalVisible(true);
    }
    const modalClose = () => {
        setTaskModalVisible(false);
    }
    const markedDatesFromTasks = Object.keys(MonthTasks).reduce((acc, dateString) => {
        acc[dateString] = { marked: true, dotColor: COLORS.brand.primary };
        return acc;
    }, {} as { [key: string]: { marked: boolean; dotColor: string } });

    const markedDates = {
        ...markedDatesFromTasks,
        [today]: {
            ...markedDatesFromTasks[today],
            marked: true, 
            dotColor: COLORS.brand.primary, 
            dot: false 
        },
        ...(selected && {
          [selected]: { 
            ...markedDatesFromTasks[selected],
            selected: true, 
            disableTouchEvent: true, 
            selectedColor: COLORS.brand.primary 
          }
        })
    };

    const selectedDateTasks = MonthTasks[selected] || [];

    return (
        <CustomView style={styles.container}>
            {hasTasks ? (
                <>
                    <Calendar
                        onDayPress={onDayPress}
                        markedDates={markedDates}
                        style={{width : '100%'}}
                        onMonthChange={(month) => {
                            setCurrentMonth(month.month);
                            setCurrentYear(month.year);
                        }}
                        renderHeader={(date) => <CustomHeader date={date}/>}
                        theme={{
                            arrowColor: COLORS.brand.primary,
                            todayTextColor: COLORS.brand.primary,
                        }}
                        dayComponent={({date, state, marking}) => {
                            const isSelected = date && selected === date.dateString;
                            const isToday = date?.dateString === today;
                            const isThisMonth = date?.year === currentYear && 
                                 date?.month === currentMonth;
                            return (
                                <CustomView 
                                    style={styles.dayContainer}
                                    onPress={isThisMonth ? () => {date?.dateString && setSelected(date.dateString); modalOpen();} : () => console.log(date)}
                                >
                                    <CustomView
                                        width={24}
                                        height={24}
                                        borderRadius={6}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        style={{backgroundColor : isSelected ? COLORS.brand.primary : 'transparent'}}
                                        onPress={isThisMonth ? (() => {date?.dateString && setSelected(date.dateString); modalOpen();}) : () => console.log(date)}
                                    >
                                        <CustomText 
                                            fontSize={FONTS.size.body} 
                                            textColor={isSelected ? COLORS.bng.primary : (isToday ? COLORS.brand.primary : (!isThisMonth ? COLORS.text.fifth : COLORS.text.primary))}
                                            style={isSelected && styles.selectedText}
                                        >
                                            {date?.day}
                                        </CustomText>
                                    </CustomView>
                                </CustomView>
                            );
                        }}
                    />
                    <DayTaskBox tasks={selectedDateTasks}/>
                </>
            ) : (
                <View style={styles.emptyContainer}>
                    <CustomText textColor={COLORS.text.second}>
                        이번 달에는 등록된 할 일이 없습니다.
                    </CustomText>
                </View>
            )}
        </CustomView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
    },
    monthText: {
        fontSize: 18,
        fontWeight: '400',
        color: COLORS.text.primary,
    },
    dayContainer: {
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    selectedText: {
        fontWeight: '500',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
});