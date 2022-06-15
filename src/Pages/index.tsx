import Login from '../components/Login';
import { Introduction } from '../components/Introduction';
import { useEffect, useState } from 'react';
import { jsonData as jsonData1 } from '../mock/introData';
import ThankYou from '../components/ThankYou';
import QuestionPage from '../components/QuestionPage';
import GI from '../components/GI';
import PanelPage from "../components/PanelPage";
import SkillPage from "../components/SkillPage";
import InputPage from "../components/InputPage"
const Pages = () => {
  const [jsonData, setJSONData] = useState<any>('');

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
  }, []);

  if (jsonData != '' || jsonData != undefined) {
    if (jsonData?.pageCode?.page == 1) {
      return <Login />;
    }
    if (jsonData?.pageCode?.page == 2) {
      return <Introduction />;
    }
    if (jsonData?.pageCode?.page == 3) {
      return <GI />;
    }
    if (jsonData?.pageCode?.page == 4) {

      return <QuestionPage />;
    }
    if (jsonData?.pageCode?.page == 5) {

      return <ThankYou />;
    }
    if (jsonData?.pageCode?.page == 6) {

      return <SkillPage />
    }
    if (jsonData?.pageCode?.page == 7) {
      return <PanelPage />;
    }
    // if(jsonData?.pageCode?.page == 8) {
    //     return < />;
    // }
    if (jsonData?.pageCode?.page == 9) {
      return <InputPage />;
    }

  }


};
export default Pages;
