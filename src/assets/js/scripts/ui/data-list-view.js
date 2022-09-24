$(document).on('list-script-loaded', function (event) {
  "use strict"

  // init list view datatable
  var dataListView = $(".data-list-view").DataTable({
    responsive: false,
    retrieve: true,
    columnDefs: [
      {
        orderable: true,
        targets: 0,
        checkboxes: {selectRow: true}
      }
    ],
    dom:
      '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
    oLanguage: {
      sLengthMenu: "_MENU_",
      sSearch: ""
    },
    aLengthMenu: [[5,10, 15, 20, 30], [5,10, 15, 20, 30]],
// Incommenting the code below will make list element get a meaning styling when they are clicked
//     select: {
//       style: "multi"
//     },
    /*
    script line was initially sorting list elements by name , uncommenting the line below will bring
    back that behavior
    */
    // order: [[1, "asc"]],
    bInfo: false,
    pageLength: 10,
    /*
    script was initially showing an " Add New " button to page , uncommenting the lines below well
    show it back
    */
    buttons: [
      {
        text: "<i class='feather icon-plus'></i> Add New",
        action: function () {
          $(this).removeClass("btn-secondary")
          $(".add-new-data").addClass("show")
          $(".overlay-bg").addClass("show")
          $("#data-name, #data-price").val("")
          $("#data-category, #data-status").prop("selectedIndex", 0)

          // Create the event.
          const event = document.createEvent('Event');

// Define that the event name is 'add-new-clicked'.
          event.initEvent('add-new-clicked', true, true);


// target can be any Element or other EventTarget.
          document.dispatchEvent(event);
        },
        className: "btn-outline-primary"
      }
    ],
    initComplete: function (settings, json) {
      $(".dt-buttons .btn").removeClass("btn-secondary")
    }
  });

  dataListView.on('draw.dt', function () {
    setTimeout(function () {
      if (navigator.userAgent.indexOf("Mac OS X") !== -1) {
        $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
      }
    }, 50);
  });


  // init thumb view datatable
  var dataThumbView = $(".data-thumb-view").DataTable({
    responsive: false,
    columnDefs: [
      {
        orderable: true,
        targets: 0,
        checkboxes: {selectRow: true}
      }
    ],
    dom:
      '<"top"<"actions action-btns"B><"action-filters"lf>><"clear">rt<"bottom"<"actions">p>',
    oLanguage: {
      sLengthMenu: "_MENU_",
      sSearch: ""
    },
    aLengthMenu: [[4, 10, 15, 20], [4, 10, 15, 20]],
    select: {
      style: "multi"
    },
    order: [[1, "asc"]],
    bInfo: false,
    pageLength: 4,
    buttons: [
      {
        text: "<i class='feather icon-plus'></i> Add New",
        action: function () {
          $(this).removeClass("btn-secondary")
          $(".add-new-data").addClass("show")
          $(".overlay-bg").addClass("show")
        },
        className: "btn-outline-primary"
      }
    ],
    initComplete: function (settings, json) {
      $(".dt-buttons .btn").removeClass("btn-secondary")
    }
  })

  dataThumbView.on('draw.dt', function () {
    setTimeout(function () {
      if (navigator.userAgent.indexOf("Mac OS X") !== -1) {
        $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
      }
    }, 50);
  });

  // To append actions dropdown before add new button
  var actionDropdown = $(".actions-dropodown")
  actionDropdown.insertBefore($(".top .actions .dt-buttons"))


  // Scrollbar
  if ($(".data-items").length > 0) {
    new PerfectScrollbar(".data-items", {wheelPropagation: false})
  }

  // Close sidebar
  $(".hide-data-sidebar, .cancel-data-btn, .overlay-bg").on("click", function () {
    $(".add-new-data").removeClass("show")
    $(".overlay-bg").removeClass("show")
    $("#data-name, #data-price").val("")
    $("#data-category, #data-status").prop("selectedIndex", 0)
  })

  // On Edit
  $('.action-edit').on("click", function (e) {
    e.stopPropagation();
    $(".add-new-data").addClass("show");
    $(".overlay-bg").addClass("show");
    $(".data-items").addClass("ps--scrolling-y","ps","ps--active-y");
    $(".data-items").addClass("ps--active-y");
    // $(".data-items").removeClass("ps--scrolling-y");
  });

  // On Edit Second pagination , this function fixing
  $(document).on("edit-clicked", function (e) {
    e.stopPropagation();
    $(".add-new-data").addClass("show");
    $(".overlay-bg").addClass("show");
    $(".data-items").addClass("ps--scrolling-y","ps","ps--active-y");
    // $(".data-items").removeClass("ps--scrolling-y");
  });

  // On Delete
  $('.action-delete').on("click", function (e) {
    $(this).closest('td').parent('tr').fadeOut();
  });


  // mac chrome checkbox fix
  if (navigator.userAgent.indexOf("Mac OS X") !== -1) {
    $(".dt-checkboxes-cell input, .dt-checkboxes").addClass("mac-checkbox")
  }

  // document.eventListeners('list-script-loaded').stopPropagation();
  // event.stopImmediatePropagation();
})
