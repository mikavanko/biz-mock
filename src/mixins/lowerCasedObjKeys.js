export default {
    lcArrOfObjKeys(data){

        let newData = []

        if (data.length) {
            for (let i = 0; i < data.length; i++) {
                const lowerCasedKeysData = this.lcObjKeys(data[i])
                newData.push(lowerCasedKeysData)
            }
        }
        return newData
    },
    lcObjKeys(data){
        let key, keys = Object.keys(data)
        let n = keys.length;
        let lowerCasedKeysData = {}
        while (n--) {
            key = keys[n]
            lowerCasedKeysData[key.toLowerCase()] = data[key]
        }

        return lowerCasedKeysData
    }
}