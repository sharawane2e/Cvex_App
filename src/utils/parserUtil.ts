import Parser from "html-react-parser";

export const getParsedData=(data:string)=>data ? Parser(data) : null