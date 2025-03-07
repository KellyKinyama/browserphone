export function getDbItem(itemIndex, defaultValue){
    if(localDB.getItem(itemIndex) != null) return localDB.getItem(itemIndex);
    return defaultValue;
}