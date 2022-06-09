import Parser from 'html-react-parser';

export const getParsedData = (data: any) => (data ? Parser(data) : '');
