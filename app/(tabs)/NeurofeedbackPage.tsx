import PageDefault from "@/components/general/PageDefault";
import FindDogIntroduce from "@/components/NeurofeedbackPage/Section/find-dog/introduce";
import Start from "@/components/NeurofeedbackPage/Section/start";

export default function NeurofeedbackPage() {
    
    return (
        <PageDefault title={'뉴로피드백'} isScrollView={false}>
           <Start />
           <FindDogIntroduce /> 
          
        </PageDefault>
    );
}