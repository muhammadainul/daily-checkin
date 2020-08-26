jQuery(document).ready(function () {
    jQuery("#tableListDetail").DataTable({
        sDom: "<'top'li>rt<'bottom'p><'clear'>",
        serverSide: true,
        ajax: {
            type: "POST",
            url: "/place/getPlaceDetails",
            data: data => {
                var placeId = jQuery("#placeId").val()
                data.placeId = placeId
            }
        },
        orderCellsTop: true,
        fixedHeader: true,
        columns: [{
                data: "url",
                orderable: false
            },
            {
                data: "isStatic",
                orderable: false
            },
            {
                data: "date",
                orderable: false
            },
            {
                data: "image.original.filename"
            },
            {
                data: "_id",
                orderable: true
            }
        ],
        columnDefs: [{
                targets: 0,
                createdCell: (td, cellData, rowData, row, col) => {
                    jQuery(td).html("<a href=" + cellData + " target='_blank' style='text-decoration: none;'>" + cellData + "</a>");
                }
            },
            {
                targets: 2,
                createdCell: (td, cellData, rowData, row, col) => {
                    const date = new Date(cellData)
                    console.log(date);
                    jQuery(td).html(date)
                }
            },
            {
                targets: 3,
                createdCell: (td, cellData, rowData, row, col) => {
                    console.log(cellData);
                    jQuery(td).html(
                        "<center><img src=" + cellData + " width='100px'></center>");
                }
            },
            {
                targets: 4,
                createdCell: (td, cellData, rowData, row, col) => {
                    console.log(cellData);
                    jQuery(td).html(
                        `<center>
                        <!--<a class='btn btn-sm btn-primary' href='#' data-toggle='modal' data-id=` + cellData + ` data-target='#modalQr` + cellData + `' style='margin-bottom: 5px;'>Show</a>-->
                        <button class='openModalDeleteQR btn btn-sm btn-danger' data-id=` + cellData + ` data-toggle='modal' data-target='#actionQRDelete'>Delete</button></center>`);
                }
            }
        ],
    });

    jQuery(document).on('click', '.openModalDeleteQR', function(){
        var id = jQuery(this).data('id')
        jQuery(".actionQRDeleteBody").html(
            "<form action='/place/qr/delete' method='post'>" +
                "<input type='hidden' name='qrId' value=" +
                id +
                ">" +
                "<center><button type='submit' class='btn btn-primary' style='margin: 5px;'>Yes</button>" +
                "<button type='button' class='btn btn-secondary' data-dismiss='modal' style='margin: 5px;'>Cancel</button></center>" +
                "</form>"
        );
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