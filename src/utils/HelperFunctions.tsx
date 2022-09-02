export const getTrimedString = (str:any) => {return str.trim()};

export const numberWithCommas = (num: any) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const ByteToPPTConvert = (filename:any, data:any) => {                
    var byteCharacters = atob(data);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], {
        type: "application/vnd.ms-powerpoint",
    });

    const fileURL = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = fileURL;
    a.type = "application/vnd.ms-powerpoint";
    a.download = filename;
    a.click();
}

export const ByteToPdfConvert = (filename:any, data:any) => {                
    var byteCharacters = atob(data);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = fileURL;
    a.type = "application/pdf";
    a.download = filename;
    a.click();
}