$(document).ready(function () {

    let base = "TRY";

    //SETTING DATE
    dateFormat = function (d) {
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0');
        var yyyy = d.getFullYear();
        d = yyyy + "-" + mm + "-" + dd;
        return d;
    }
    //RETRIEVE DATA USING FETCH API
    getData = function (date) {
        const api =
            "https://api.ratesapi.io/api/"
            +
            date //year - month -day
            +
            "?base="
            + base;
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                //console.log(data.base);
                console.log(data.date);
                //console.log(data.rates);

                //DESTRUCTURING
                const { USD, GBP, EUR, DKK, JPY } = data.rates;

                //SET  DOM ELEMENTS FROM API
                $('.USD').html(USD);
                $('.GBP').html(GBP);
                $('.EUR').html(EUR);
                $('.DKK').html(DKK);
                $('.JPY').html(JPY);
            });
    }

    //FILL DROPDOWN WITH
    var dropItems = document.querySelector(".dropdown-menu").children;//returns HTML Collection

    var today = new Date();
    for (var i = 0; i < dropItems.length; i++) {
        today.setTime(today.getTime() - (1) * 86400000);//increment the day by 1 
        var d = dateFormat(today);
        dropItems[i].innerText = d;//display date on dropdown item
    }

    //DISPLAY TODAY'S RATES IF NOTHING IS SELECTED
    var todayMain = new Date;
    var date = dateFormat(todayMain);
    getData(date);

    //add click event to dropdown items
    $('.dropdown-item').click(function () {
        //display according to selected date from dropdown
        var selectedDate = $(this).html();
        $('#dropdownMenuButton').html(selectedDate);
        getData(selectedDate);
    })
})