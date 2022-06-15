
import SecondaryHeader from '../Headers/SecondaryHeader';
import inputPageData from "../../mock/inputPageData.json";
import ProgressBar from "../ProgressBar";
// import Footer from "../Footer";
const InputPage = () => {
    const inputPageDetails = inputPageData?.data?.inputData;
    console.log(inputPageDetails);
    return (
        <>
            <div className="input-container">
                <SecondaryHeader />
                <div>
                    <ProgressBar />
                </div>
            </div>
        </>
    )
}

export default InputPage;