
import Login from "../components/Login"
import SecondaryHeader from "../components/Headers/SecondaryHeader";
import CustomSlider from "../components/UI/CustomSlider";
import { Introduction } from "../components/Introduction";
import { useEffect, useState } from "react";
import { jsonData as jsonData1 } from "../mock/introData";
import ThankYou from "../components/ThankYou";
import QuestionPage from "../components/QuestionPage";
import GI from "../components/GI";

const Pages = () => {
    const [jsonData, setJSONData] = useState<any>(jsonData1);
    // comment below and render only one component at a time
    // useEffect(() => {
    //     setJSONData(
    //         // @ts-ignore
    //         JSON.parse(document.getElementById("jsonData")?.innerHTML)
    //     );
    // }, []);
    // let jsonData = jsonData1;
    // setTimeout(function () {
    //   setJSONData(
    //     // @ts-ignore
    //     JSON.parse(document.getElementById("jsonData").innerText)
    //   );
    //   // setJSONData(jsonData2);
    // });

    // if (jsonData != "" || jsonData != undefined) {
    // if (jsonData["pageCode"]["page"] == 1) {
    // return <Login />;
    // }
    // if (jsonData["pageCode"]["page"] == 2) {
    // return <Introduction />;
    // }
    // if (jsonData["pageCode"]["page"] == 3) {
    //     return <GI />;
    // }
    // if (jsonData["pageCode"]["page"] == 4) {
    return <QuestionPage />;
    // }
    // if (jsonData["pageCode"]["page"] == 5) {
    //     return <ThankYou />;
    // }
    // }
}
export default Pages;
