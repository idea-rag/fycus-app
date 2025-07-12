import FeedbackCard from "@/components/AIPage/feedbackCard";
import SectionDefault from "@/components/AIPage/sectionDefault";
import CustomText from "@/components/general/CustomText";
import CustomView from "@/components/general/CustomView";
import Logo from "@/components/general/Logo";
import NavBar from "@/components/general/NavBar";
import PageDefault from "@/components/general/PageDefault";
import { FONTS } from "@/styles/fonts";
import { SPACING } from "@/styles/spacing";

export default function AIPage() {
    return (
        <>
        <PageDefault title={'AI'}>
            <SectionDefault title={'AI의 조언'}>
                <CustomView
                    width={'100%'}
                    height={315}
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                    gap={SPACING.huge}
                >
                    <CustomView
                        width={150}
                        height={150}
                        style={{
                            backgroundColor: 'white',
                            shadowColor: '#808080',
                            shadowOffset: { width: 4, height: 32 },
                            shadowOpacity: 0.20,
                            shadowRadius: 75,
                            elevation: 12,
                            borderRadius: 75,
                        }}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Logo
                            width={70}
                            height={70}
                        />
                    </CustomView>
                    <CustomText
                        fontSize={FONTS.size.body}
                        fontWeight={300}
                    >
                        Fics의 한마디
                    </CustomText>
                    <CustomText
                        fontSize={FONTS.size.title}
                        fontWeight={600}
                    >
                    전체적으로 완성도 있는 공부입니다. 
                    하지만 국어에 더욱 집중하면 좋겠네요.
                    </CustomText>
                </CustomView>
            </SectionDefault>
            <SectionDefault title="AI의 피드백">
                    <CustomText
                        fontSize={14}
                        fontWeight={400}
                    >
                    afdsasdfasdfasdfasdfsdafasdfasdfadsfasdfadsfddddddafdskldfklsdfjldsfkjlfdslkjdsflkjdfsljkdsfljkfdsljkfdslkjdfslkjfdslkjdfsjklfdsljkfdsljkdfsljkfdslkjfdjkldfskljdfskljdfslkjdfskljfdskljdfskljfdslkjfdskjlfdskjlfdkljfdjklfdkjfdklsjfdjlksfdslkjfdslkjfdkljdfsljkfdsjklfdsjkfdsjklfdjklsfkldjsljkdfslkjfdslkjfdsljkadsfafdsasdfasdfasdfasdfsdafasdfasdfadsfasdfadsfddddddafdskldfklsdfjldsfkjlfdslkjdsflkjdfsljkdsfljkfdsljkfdslkjdfslkjfdslkjdfsjklfdsljkf
                    </CustomText>
                </SectionDefault>
                <SectionDefault title="뉴로피드백">
                    <FeedbackCard
                        title="order-action"
                        beforeError="1"
                        afterError="0"
                        beforeTime="10"
                        afterTime="5"
                    />
                    <FeedbackCard
                        title="select-square"
                        beforeError="1"
                        afterError="0"
                        beforeTime="10"
                        afterTime="5"
                    />
                    <FeedbackCard
                        title="find-dog"
                        beforeError="1"
                        afterError="0"
                        beforeTime="10"
                        afterTime="5"
                    />
                </SectionDefault>
        </PageDefault>
        <NavBar/>
        </>
    );
}