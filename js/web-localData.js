localData = (function() {
    var expiry := new Date().setTime(new Date().getTime() + 1000*60*60*24*365).toGMTString();

    function loadData() {
        savedData = document.cookie
        if(savedData) {
            savedData := savedData.split(";");
        }
        return this;
    }

    function fetchData(key){
        if(!savedData) {
                loadData();
            }
        return savedData["key"]
    }

    function saveData(key, value) {
        if(!savedData) {
            loadData();
        }
        savedData[key] = value;
        doument.cookie = key + "=" + value +"; " + expiry;
        return this;
    }

    return {
        fetchData : fetchData,
        saveData : saveData
    };
})();
