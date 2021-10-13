$(document).ready(function () {
    // CHANGE NAVBAR ONSCROLL
    window.onscroll = function () {
        changenav()
    };
    function changenav() {
        let bgNavDefault = 'navbar navbar-dark bg-transparent transition';
        let bgNavLight = 'navbar navbar-light bg-light transition shadow';
        if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
            $("#nav").removeClass(bgNavDefault).addClass(bgNavLight);
        }
        else {
            $("#nav").removeClass(bgNavLight).addClass(bgNavDefault);
        }
    }

    //API LINK
    //https://covid-api.mmediagroup.fr/v1/cases?country=Brazil

    //LINK COUNTRIES 
    // 'https://github.com/M-Media-Group/country-json/blob/master/src/countries-master.json'
    var URL_COUNTRIES = 'src/countriesv2.json'

    //LOAD COUNTRIES JSON
    $.get(URL_COUNTRIES, function (data) {
        data.map((data) => {
            $("#countries").append(
                "<option id='" + data.country + "'>" + data.country + "</option>"
            )
        })
    });

    //SUBMIT FORM
    $("#form").submit(function (e) {
        e.preventDefault();
        //NÃO ESQUECER DE VERIFICAR SE O INPUT NÃO ESTÁ VAZIO

        $('#content').append("<div class='ui active dimmer' id='loader'><div class='ui text loader'>Loading</div></div>")
        let country = $('#country').val();

        var form = $(this);
        var url = "https://covid-api.mmediagroup.fr/v1/cases?country=";

        $.ajax({
            type: "GET",
            url: url + country,
            data: country,
            success: function (data) {
                $('#content').load('./result.html');
                setTimeout(() => {
                    $('#loader').remove();
                    $('#countryResp').html(data.All.country);
                    // console.table(data);
                    $.each(data, function (key, value) { 
                        $('tbody').append("<tr><td id=" + key + ">" + key + "</td><td class='right aligned'>" + value.confirmed + "</td><td class='right aligned'>" + value.deaths + "</td></tr>")
                    });
                    $('#All').html('Total');
                    $('tbody tr').first().addClass('bg-warning font-weight-bold')
                }, 50);
            }
        });


    });

});