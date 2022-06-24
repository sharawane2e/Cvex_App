import Login from '../components/Login';
import { Introduction } from '../components/Introduction';
import React, { useEffect, useState } from 'react';
import { jsonData as jsonData1 } from '../mock/introData';
import ThankYou from '../components/ThankYou';
import QuestionPage from '../components/QuestionPage';
import GI from '../components/GI';
import PanelPage from '../components/PanelPage';
import SkillPage from '../components/SkillPage';
import ImpactCalculatorPage from '../components/ImpactCalculator';
import OutputContactCenter from '../components/OutputContactCenter';
import pageCode from '../enums/pageCode';
import HeatmapPage from '../components/HeatmapPage/Index';
import SubskillPage from '../components/SubskillPage';

const Pages = () => {
  const [jsonData, setJSONData] = useState<any>('');

  useEffect(() => {
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById('jsonData')?.innerHTML),
    );
  }, []);

  if (jsonData != '' || jsonData != undefined) {
    if (jsonData?.pageCode?.page === pageCode.Login) {
      return <Login />;
    }
    if (jsonData?.pageCode?.page === pageCode.Introduction) {
      return <Introduction />;
    }
    if (jsonData?.pageCode?.page === pageCode.GI) {
      return <GI />;
    }
    if (jsonData?.pageCode?.page == pageCode.QuestionPage) {
      return <QuestionPage />;
    }
    if (jsonData?.pageCode?.page == pageCode.ThankYou) {
      return <ThankYou />;
    }
    if (jsonData?.pageCode?.page == pageCode.SkillPage) {
      return <SkillPage />;
    }
    if (jsonData?.pageCode?.page == pageCode.PanelPage) {
      return <PanelPage />;
    }
    // if (jsonData?.pageCode?.page == 8) {
    //   return <PanelPage />;
    // }
    if (jsonData?.pageCode?.page == pageCode.ImpactCalculatorPage) {
      return <ImpactCalculatorPage />;
    }
    if (jsonData?.pageCode?.page == 11) {
      return <OutputContactCenter />;
    }
  }

  // return <SubskillPage />
};
export default Pages;
