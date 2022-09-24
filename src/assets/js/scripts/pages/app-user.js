$(document).ready(function () {

  var isRtl;
  if ($('html').attr('data-textdirection') == 'rtl') {
    isRtl = true;
  } else {
    isRtl = false;
  }

  // this is a custom function that formats the date to YYYY-MM-DD
  // some field do not have a value so we need to check for that
  const customDate = function (params) {
    if (params.data.isBanned) {
      return params.value ? '<span style="color: #dc3545">' + params.value.slice(0, 10) + '</span>' : '';
    }
    return params.value ? params.value.slice(0, 10) : '';
  }


  const bannedClientRed = function (params) {
    return params.data.isBanned ? '<span style="color: #dc3545">' + params.value + '</span>' : params.value
  }


  // Renering Icons in Actions column


  // ag-grid
  /*** COLUMN DEFINE ***/

  var columnDefs = [
    {
      headerName: 'Name',
      field: 'name',
      filter: true,
      width: 200,
      cellRenderer: bannedClientRed,
    },
    {
      headerName: 'Email',
      field: 'email',
      filter: true,
      width: 250,
      cellRenderer: bannedClientRed,
    },
    {
      headerName: 'Country',
      field: 'country',
      filter: true,
      width: 150,
      cellRenderer: bannedClientRed,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      filter: true,
      width: 150,
      cellRenderer: bannedClientRed,
    },
    {
      headerName: 'Sign up date',
      field: 'createdAt',
      filter: true,
      width: 175,
      cellRenderer: customDate,
    },
    {
      headerName: 'Next control',
      field: 'nextSchedule',
      filter: true,
      width: 175,
      cellRenderer: customDate,
    }
  ];

  /*** GRID OPTIONS ***/
  var gridOptions = {
    defaultColDef: {
      sortable: true
    },
    enableRtl: isRtl,
    columnDefs: columnDefs,
    rowSelection: "multiple",
    floatingFilter: true,
    filter: true,
    pagination: false,
    paginationPageSize: Infinity,
    pivotPanelShow: "always",
    colResizeDefault: "shift",
    animateRows: true,
    resizable: true
  };
  if (document.getElementById("myGrid")) {
    /*** DEFINED TABLE VARIABLE ***/
    var gridTable = document.getElementById("myGrid");

    /*** GET TABLE DATA FROM URL ***/
    agGrid
      .simpleHttpRequest({
        // url: "http://127.0.0.1:3000/clients"
        // url: "https://gewinner-api.herokuapp.com/clients"
        // url: "https://51.178.220.119:3000/clients"
        url: "https://gewinner.tn:3000/clients"
      })
      .then(function (data) {
        gridOptions.api.setRowData(data);
      });

    /*** FILTER TABLE ***/
    function updateSearchQuery(val) {
      gridOptions.api.setQuickFilter(val);
    }


    $(".ag-grid-filter").on("keyup", function () {
      updateSearchQuery($(this).val());
    });

    /*** CHANGE DATA PER PAGE ***/
    function changePageSize(value) {
      gridOptions.api.paginationSetPageSize(Number(value));
    }

    $(".sort-dropdown .dropdown-item").on("click", function () {
      var $this = $(this);
      changePageSize($this.text());
      $(".filter-btn").text("1 - " + $this.text() + " of 50");
    });

    /*** EXPORT AS CSV BTN ***/
    $(".ag-grid-export-btn").on("click", function (params) {
      gridOptions.api.exportDataAsCsv();
    });

    //  filter data function
    var filterData = function agSetColumnFilter(column, val) {
      var filter = gridOptions.api.getFilterInstance(column)
      var modelObj = null
      if (val !== "all") {
        modelObj = {
          type: "equals",
          filter: val
        }
      }
      filter.setModel(modelObj)
      gridOptions.api.onFilterChanged()
    }
    //  filter inside role
    $("#users-list-role").on("change", function () {
      var usersListRole = $("#users-list-role").val();
      filterData("role", usersListRole)
    });
    //  filter inside verified
    $("#users-list-verified").on("change", function () {
      var usersListVerified = $("#users-list-verified").val();
      filterData("is_verified", usersListVerified)
    });
    //  filter inside status
    $("#users-list-status").on("change", function () {
      var usersListStatus = $("#users-list-status").val();
      filterData("status", usersListStatus)
    });
    //  filter inside department
    $("#users-list-department").on("change", function () {
      var usersListDepartment = $("#users-list-department").val();
      filterData("department", usersListDepartment)
    });
    // filter reset
    $(".users-data-filter").click(function () {
      $('#users-list-role').prop('selectedIndex', 0);
      $('#users-list-role').change();
      $('#users-list-status').prop('selectedIndex', 0);
      $('#users-list-status').change();
      $('#users-list-verified').prop('selectedIndex', 0);
      $('#users-list-verified').change();
      $('#users-list-department').prop('selectedIndex', 0);
      $('#users-list-department').change();
    });

    /*** INIT TABLE ***/
    new agGrid.Grid(gridTable, gridOptions);
  }
  // users language select
  if ($("#users-language-select2").length > 0) {
    $("#users-language-select2").select2({
      dropdownAutoWidth: true,
      width: '100%'
    });
  }
  // users music select
  if ($("#users-music-select2").length > 0) {
    $("#users-music-select2").select2({
      dropdownAutoWidth: true,
      width: '100%'
    });
  }
  // users movies select
  if ($("#users-movies-select2").length > 0) {
    $("#users-movies-select2").select2({
      dropdownAutoWidth: true,
      width: '100%'
    });
  }
  // users birthdate date
  if ($(".birthdate-picker").length > 0) {
    $('.birthdate-picker').pickadate({
      format: 'mmmm, d, yyyy'
    });
  }
  // Input, Select, Textarea validations except submit button validation initialization
  if ($(".users-edit").length > 0) {
    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
  }
});
