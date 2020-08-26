jQuery(document).ready(function() {
    jQuery("#tableListPlace").DataTable({
        sDom       : "<'top'li>rt<'bottom'p><'clear'>",
        serverSide : true,
        ajax       : {
            type : "POST",
            url  : "/place/getAll",
        },
        orderCellsTop : true,
        fixedHeader   : true,
        columns       : [
            { data: "name", orderable: false },
            { data: "address", orderable: false },
            { data: "_id", orderable: true }
        ],
        columnDefs: [
            {
                targets     : 2,
                createdCell : (td, cellData, rowData, row, col) => {
                    console.log(cellData);
                    jQuery(td).html(
                        "<center><a href='/place/list/detail/" + cellData + "' class='btn btn-success btn-sm' aria-disabled='true' style='margin: 5px;'> Details</a>" +
                        "<a href='/place/list/history/" + cellData + "' class='btn btn-info btn-sm' aria-disabled='true'> History</a> <a href='/place/list/liveLogs/" + cellData + "' class='btn btn-secondary btn-sm' aria-disabled='true'> Live Logs</a></center>");
                }
            }
        ],
    });

    // if (typeof Storage !== "undefined") {
    //     if (!localStorage["da-token"]) {
    //         jQuery.post("/token/get", {}, (data) => {
    //             localStorage["da-token"] = data.token_code;
    //         });
    //         console.log('token_code', localStorage['da-token'])
    //     }
    // }
    // table.on('draw', function() {
    //     jQuery("#btnToggle").trigger('change');
    //     jQuery("#btnToggle").trigger('change');
    // });
    // jQuery("#buttonFilterPost").click(() => {
    //     table.draw();
    // });
    // jQuery('#formPost').on('keyup keypress', function(e) {
    //     var keyCode = e.keyCode || e.which;
	// 	if (keyCode === 13) {
    //         e.preventDefault();
    //         document.getElementById("buttonFilterPost").click();
    //     }
    // });
    // jQuery('#btnToggle').change(function() {
    //     // $('#console-event').html('Toggle: ' + $(this).prop('checked'))
    //     var checkBtn = $(this).prop('checked');
    //     if (checkBtn){
    //         console.log('checked');
    //     } else {
    //         console.log('unchecked');
    //     }
    // });

});
