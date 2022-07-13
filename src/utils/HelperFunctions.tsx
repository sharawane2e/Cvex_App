export const getTrimedString = (str:any) => {return str.trim()};

export const numberWithCommas = (num: any) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};