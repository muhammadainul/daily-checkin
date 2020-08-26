jQuery(document).ready(function () {
    jQuery('#tableLiveLogs').DataTable({
        sDom: "<'top'li>rt<'bottom'p><'clear'>",
        serverSide: true,
        ajax: {
            type: 'POST',
            url: '/live/getAll',
            data: data => {
                var placeId = jQuery("#placeId").val()
                data.placeId = placeId

                console.log(placeId);
            }
        },
        orderCellsTop: true,
        fixedHeader: true,
        columns: [
            { data: 'userId._id', orderable: false },
            { data: 'userId.username', orderable: false },
            { data: 'scanTime', orderable: false },
            { data: 'status', orderable: false }
        ],
        columnDefs: [
            {
                targets: 0,
                createdCell: (td, cellData, rowData, row, col) => {
                    console.log(cellData)
                }
            },
            {
                targets: 2,
                createdCell: (td, cellData, rowData, row, col) => {
                    let date = new Date();
                    console.log(date)
                    jQuery(td).html(date);
                }
            },
            {
                targets: 3,
                createdCell: (td, cellData, rowData, row, col) => {
                    if (rowData.status == 'RED') {
                        jQuery(td).html("<center><button class='btn btn-danger'>" + cellData + "</button></center>");
                    }
                }
            }
        ]
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
})
