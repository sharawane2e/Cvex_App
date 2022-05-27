
import Login from "../components/Login"
import { Introduction } from "../components/Introduction"
import { useEffect, useState } from "react";
import { jsonData as jsonData1 } from "../mock/introData";
import ThankYou from "../components/ThankYou";
const Pages = () => {
    const [jsonData, setJSONData] = useState<any>(jsonData1);
    // comment below and render only one component at a time
    useEffect(() => {
        setJSONData(
            // @ts-ignore
            JSON.parse(document.getElementById("jsonData")?.innerHTML)
        );
    }, []);
    // let jsonData = jsonData1;
    // setTimeout(function () {
    //   setJSONData(
    //     // @ts-ignore
    //     JSON.parse(document.getElementById("jsonData").innerText)
    //   );
    //   // setJSONData(jsonData2);
    // });

    // if (jsonData != "" || jsonData != undefined) {
    // let CurrentComponent: JS = <Page1 />;
    if (jsonData["pageCode"]["page"] == 1) {
        // CurrentComponent = <Page2 />;
        return <Login />;
    }
    if (jsonData["pageCode"]["page"] == 2) {
        // CurrentComponent = <Page1 />;
        return <Introduction />;
    }
    if (jsonData["pageCode"]["page"] == 5) {
        // CurrentComponent = <Page1 />;
        return <ThankYou />;
    }
    // }
}
export default Pages;
