


//const monthNames = ["January", "February", "March","April", "May", "June", "July","August", "September", "October","November", "December"];

const monthIndexes = ["01", "02", "03","04", "05", "06", "07","08", "09", "10","11", "12"];

export function formatSQLFormat(original_date){
    let date = Array.isArray(original_date) ? original_date[0] : original_date;
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    if(day < 10){
        day = '0'+day;
    }
    return year+'-'+monthIndexes[monthIndex]+'-'+day;
}

export function formatAmericanDate(original_date){
    let date = new Date(original_date);
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    if(day < 10){
        day = '0'+day;
    }
    return monthIndexes[monthIndex]+'/'+day+'/'+year;
}

export function formatFilterDate(original_date){
    let date = Array.isArray(original_date) ? original_date[0] : original_date;
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    if(day < 10){
        day = '0'+day;
    }
    return monthIndexes[monthIndex]+'-'+day+'-'+year;
}