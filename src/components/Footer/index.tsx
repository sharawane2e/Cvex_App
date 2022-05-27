import CustomButton from "../UI/CustomButton"
import "./footer.scss";

type props = {
    children: any;
};
export const Footer = (props: any) => {
    return (
        <div className="footer">
            {props.children}
        </div>
    )

}