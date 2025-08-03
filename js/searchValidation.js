$('input[name="_departDate"]').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
}).on('changeDate', function (selected) {
    var minDate = new Date(selected.date.valueOf());
    minDate.setDate(minDate.getDate() + 1); 
    if ($('input[name="_returnDate"]').prop("disabled") === false) {
        $('input[name="_returnDate"]').datepicker('setDate', minDate);
        $('input[name="_returnDate"]').datepicker('setStartDate', minDate);
        $('input[name="_returnDate"]').datepicker().trigger('focus');
    }
    else {

    }

}).on('clearDate', function (selected) {
    $('input[name="_returnDate"]').datepicker('setStartDate', null);
});

$('input[name="_returnDate"]').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
}).on('changeDate', function (selected) {
    var endDate = new Date(selected.date.valueOf());
    $('input[name="_departDate"]').datepicker('setEndDate', endDate);
}).on('clearDate', function (selected) {
    $('input[name="_departDate"]').datepicker('setEndDate', null);
});
$('input:radio').click(function () {
    if (this.id == 'rdooneway') {
        $('input[name="_returnDate"]').prop("disabled", true);
        $('input[name="_returnDate"]').attr("disabled", "disabled");
    }

    if (this.id == 'rdoreturn') {
        $('input[name="_returnDate"]').prop("disabled", false);
        $('input[name="_returnDate"]').removeAttr("disabled", "disabled");
    }

    //if ($(this).hasClass('enable_tb')) {
    //    $('input[name="_returnDate"]').prop("disabled", false);
    //}
});



$(document).ready(function () {

    let _url = $(location).attr('protocol') + "//" + $(location).attr('host') + '/flights/AirportAutoComplete?stype=';

    $('.autocomplete').autocomplete({

        minLength: 3,
        dataType: "json",
        source: function (request, response) {
            $.ajax({
                url: _url + request.term.toLowerCase(),

                dataType: "json",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    response(

                        $.map(data, function (item) {
                            if (item.country_Code != "") {
                                var result = item.city_Name + ", " + item.airport_Name + " [" + item.airport_Code + "]";
                            }
                            else {
                                var result = item.city_Name;
                            }

                            var hidresult = item.airport_Code + "_" + item.city_Name + "_" + item.country_Code;
                            return { label: result, value: result, id: hidresult }
                        }


                        ));
                },
                error: function (response) {
                    debugger;
                    alert(response.responseText);
                },
                failure: function (response) {
                    debugger;
                    alert(response.responseText);
                }
            });
        },
        select: function (e, ui) {
            $('#hid_origin').val('');
            $('#hid_origin').val(ui.item.id);
        }

    });

    $('.autocomplete2').autocomplete({

        minLength: 3,
        dataType: "json",

        source: function (request, response) {
            $.ajax({
                url: _url + request.term.toLowerCase(),

                dataType: "json",
                type: "GET",
                contentType: "application/json; charset=utf-8",
                success: function (data) {

                    response(

                        $.map(data, function (item) {
                            if (item.country_Code != "") {
                                var result = item.city_Name + ", " + item.airport_Name + " [" + item.airport_Code + "]";
                            }
                            else {
                                var result = item.city_Name;
                            }

                            var hidresult = item.airport_Code + "_" + item.city_Name + "_" + item.country_Code;
                            return { label: result, value: result, id: hidresult }
                        }


                        ));
                },
                error: function (response) {
                    debugger;
                    alert(response.responseText);
                },
                failure: function (response) {
                    debugger;
                    alert(response.responseText);
                }
            });
        },
        select: function (e, ui) {
            $('#hid_destination').val('');
            $('#hid_destination').val(ui.item.id);
        }

    });


    $(".qtyDec, .qtyInc").on("click", function () {

        debugger;
        let adults = parseFloat($("#_adults").val()), children = parseFloat($("#_children").val()), infants = parseFloat($("#_infants").val());
        if (adults + children + infants <= 8 || this.id.includes("Dec")) {
            var e = $(this);
            if (this.id == '_adultsInc') {
                var a = $("#_adults").val();
                if (a <= 9) {
                    var n = parseFloat(a) + 1;
                    $("#_adults").val(n);
                }
                else {
                    alert("More than 9 Adults are not allowed")
                }
            }
            else if (this.id == '_adultsDec') {
                var a = $("#_adults").val();
                if (a > 1) {
                    var n = parseFloat($("#_adults").val()) - 1;
                    $("#_adults").val(n);

                }
                else {
                    alert("Miminum one adult is required for booking")
                }

            }
            if (this.id == '_childrenInd') {
                var c = parseFloat($("#_children").val());
                if (c < (adults * 2)) {
                    var n = parseFloat(c) + 1;
                    $("#_children").val(n);
                }
                else {
                    alert("Two children is allowed per adult")
                }
            }
            else if (this.id == '_childrenDec') {
                var a = $("#_children").val();
                if (a > 0) {
                    var n = parseFloat($("#_children").val()) - 1;
                    $("#_children").val(n);

                }


            }
            if (this.id == '_infantsInd') {
                var c = parseFloat($("#_infants").val());
                if (c < adults) {
                    var n = parseFloat(c) + 1;
                    $("#_infants").val(n);
                }
                else {
                    alert("One infant is allowed per adult")
                }
            }
            else if (this.id == '_infantsDec') {
                var a = $("#_infants").val();
                if (a > 0) {
                    var n = parseFloat($("#_infants").val()) - 1;
                    $("#_infants").val(n);

                }


            }
            $("#totalPax").html(parseFloat($("#_adults").val()) + parseFloat($("#_children").val()) + parseFloat($("#_infants").val()) + ' Traveller(s)');
        }
        
        else {
            debugger;
            alert("More than 9 passengers not allowed in a booking, for group booking please call us helpdesk number");
        }

    });
});

//Check Flight Availability Model
$(document).ready(function () {
    $('#checkAvailablity').on('show.bs.modal', function (e) {
        debugger;
        var _value = $(e.relatedTarget).data('origin'); $("#_origin_chka").val(_value);
        _value = $(e.relatedTarget).data('destination'); $("#_destination_chka").val(_value);
        _value = $(e.relatedTarget).data('departDate'); $("#_departDate_chka").val(_value);
        _value = $(e.relatedTarget).data('returnDate'); $("#_returnDate_chka").val(_value);
    });

    $('#_callmeback').on('show.bs.modal', function (e) {
        debugger;
        var _value = $(e.relatedTarget).data('origin'); $("#_origin_cb").val(_value); $("#_hd_origin_cb").val(_value);
        _value = $(e.relatedTarget).data('destination'); $("#_destination_cb").val(_value); $("#_hd_destination_cb").val(_value);
        _value = $(e.relatedTarget).data('airline'); $("#_airline_cb").val(_value);
        
    });
});

$(document).ready(function () {
    $("#totalPax1").click(function () {

        $("#myDropdown_n1").show();
    });
    $("#done_chka").click(function () {
        $("#myDropdown_n1").hide();
    });

    $(".qtyDec_chka, .qtyInc_chka").on("click", function () {

        debugger;
        let adults1 = parseFloat($("#_adults_chka").val()), children1 = parseFloat($("#_children_chka").val()), infants1 = parseFloat($("#_infants_chka").val());
        if (adults1 + children1 + infants1 <= 8 || this.id.includes("Dec")) {
            var e = $(this);
            if (this.id == '_adultsInc_chka') {
                var a = $("#_adults_chka").val();
                if (a <= 9) {
                    var n = parseFloat(a) + 1;
                    $("#_adults_chka").val(n);
                }
                else {
                    alert("More than 9 Adults are not allowed")
                }
            }
            else if (this.id == '_adultsDec_chka') {
                var a = $("#_adults_chka").val();
                if (a > 1) {
                    var n = parseFloat($("#_adults_chka").val()) - 1;
                    $("#_adults_chka").val(n);

                }
                else {
                    alert("Miminum one adult is required for booking")
                }

            }
            if (this.id == '_childrenInd_chka') {
                var c = parseFloat($("#_children_chka").val());
                if (c < (adults1 * 2)) {
                    var n = parseFloat(c) + 1;
                    $("#_children_chka").val(n);
                }
                else {
                    alert("Two children is allowed per adult")
                }
            }
            else if (this.id == '_childrenDec_chka') {
                var a = $("#_children_chka").val();
                if (a > 0) {
                    var n = parseFloat($("#_children_chka").val()) - 1;
                    $("#_children_chka").val(n);

                }


            }
            if (this.id == '_infantsInd_chka') {
                var c = parseFloat($("#_infants_chka").val());
                if (c < adults1) {
                    var n = parseFloat(c) + 1;
                    $("#_infants_chka").val(n);
                }
                else {
                    alert("One infant is allowed per adult")
                }
            }
            else if (this.id == '_infantsDec_chka') {
                var a = $("#_infants_chka").val();
                if (a > 0) {
                    var n = parseFloat($("#_infants_chka").val()) - 1;
                    $("#_infants_chka").val(n);

                }


            }
            $("#totalPax1").html(parseFloat($("#_adults_chka").val()) + parseFloat($("#_children_chka").val()) + parseFloat($("#_infants_chka").val()) + ' Traveller(s)');
        }

        else {
            debugger;
            alert("More than 9 passengers not allowed in a booking, for group booking please call us helpdesk number");
        }

    });
});

$('input[name="_departDate_chka"]').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
}).on('changeDate', function (selected) {
    var minDate = new Date(selected.date.valueOf());
    minDate.setDate(minDate.getDate() + 1);
    if ($('input[name="_returnDate_chka"]').prop("disabled") === false) {
        $('input[name="_returnDate_chka"]').datepicker('setDate', minDate);
        $('input[name="_returnDate_chka"]').datepicker('setStartDate', minDate);
        $('input[name="_returnDate_chka"]').datepicker().trigger('focus');
    }
    else {

    }

}).on('clearDate', function (selected) {
    $('input[name="_returnDate_chka"]').datepicker('setStartDate', null);
});

$('input[name="_returnDate_chka"]').datepicker({
    format: 'dd/mm/yyyy',
    autoclose: true,
}).on('changeDate', function (selected) {
    var endDate = new Date(selected.date.valueOf());
    $('input[name="_departDate_chka"]').datepicker('setEndDate', endDate);
}).on('clearDate', function (selected) {
    $('input[name="_departDate_chka"]').datepicker('setEndDate', null);
});
$('input:radio').click(function () {
    if (this.id == 'rdooneway_chka') {
        $('input[name="_returnDate_chka"]').prop("disabled", true);
        $('input[name="_returnDate_chka"]').attr("disabled", "disabled");
    }

    if (this.id == 'rdoreturn_chka') {
        $('input[name="_returnDate_chka"]').prop("disabled", false);
        $('input[name="_returnDate_chka"]').removeAttr("disabled", "disabled");
    }

    //if ($(this).hasClass('enable_tb')) {
    //    $('input[name="_returnDate"]').prop("disabled", false);
    //}
});