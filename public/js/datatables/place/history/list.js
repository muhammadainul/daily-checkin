jQuery(document).ready(function() {
    var table = jQuery("#tableListHistory").DataTable({
        order      : [[3, ['desc']]],
        sDom       : "<'top'li>rt<'bottom'p><'clear'>",
        serverSide : true,
        ajax       : {
            type : "POST",
            url  : "/place/getHistory",
            contentType : 'application/x-www-form-urlencoded',
            data: data => {
                var placeId = jQuery("#placeId").val()
                var date = jQuery("#date").val()

                data.searchByDate = date
                data.placeId = placeId
                console.log(date)
            }
        },
        fixedHeader   : true,
        columns       : [
            { data: "userId._id", orderable: false },
            { data: "userId.username", orderable: false },
            { data: "checkInTime", orderable: true },
            { data: "checkOutTime", orderable: false },
        ],
        columnDefs: [
            {
                targets     : 2,
                createdCell : (td, cellData, rowData, row, col) => {
                    const date = new Date(cellData)
                    jQuery(td).html(date)
                }
            },
            {
                targets     : 3,
                createdCell : (td, cellData, rowData, row, col) => {
                    const date = new Date(cellData)
                    jQuery(td).html(date)
                }
            }
        ],
    });
    jQuery('#buttonFilter').click(() => {
        table.draw()
    })
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
