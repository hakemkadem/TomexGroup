/// <reference path="angular.js" />
/// <reference path="jquery.min.js" />

 {% load static %}
 <script href="{% static 'scripts/jquery.js' %}"></script>
 <script href="{% static 'scripts/angular.min.js' %}"></script>


var MyApp = angular.module("MyModule", []).controller("Mycontroller", function ($scope, $http) {
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    $scope.Now = day + "/" + month + "/" + year;

    $scope.test = true;
    $scope.postCheck = false;

    $scope.empName = $('#spnEmpName').text();
    //validate Section
    $scope.validRoot = false;
    $scope.validtiket = false;
    $scope.validtour = false;
    $scope.validgroup = false;

    $scope.ADTNamesValidate = false;
    $scope.CHDNamesValidate = false;
    $scope.INFNamesValidate = false;


    $scope.CompIssue = 'blank';
    $scope.airline = 'blank';
    $scope.tCompIssue = 'blank';
    $scope.gCompIssueTo = 'blank';

    $scope.GroupObject = {};
    $scope.ticketIssue = true;
    $scope.ticketto = 'شركة';
    $scope.bookingtype = 2;
    $scope.tickefor = function (val) {
        if (val == 'مسافر') {
            $scope.ticketIssue = false;
            $scope.bookingtype = 1;

        }
        else {
            $scope.ticketIssue = true;
            $scope.bookingtype = 2;

        }

        $scope.ticketto = val;
    }

    $('#btn').click(function () {
        $('#test').text($scope.tcktObj.PNR);
    });
    //TiketInfo
    $scope.tcktObj = {};

    //TourInfo
    var tourObj = {};


    //groupInfo
    var groupObj = {};


    $scope.ADTPrice = 0;
    $scope.tADTPrice = 0;

    $scope.CHDPrice = 0;
    $scope.tCHDPrice = 0;

    $scope.INFPrice = 0;
    $scope.tINFPrice = 0;

    $scope.$watch('tADTPrice', function () { $scope.gADTPrice = ($scope.ADTPrice * 1) + ($scope.tADTPrice * 1) });
    $scope.$watch('ADTPrice', function () { $scope.gADTPrice = ($scope.ADTPrice * 1) + ($scope.tADTPrice * 1) });

    $scope.$watch('tCHDPrice', function () { $scope.gCHDPrice = ($scope.CHDPrice * 1) + ($scope.tCHDPrice * 1) });
    $scope.$watch('CHDPrice', function () { $scope.gCHDPrice = ($scope.CHDPrice * 1) + ($scope.tCHDPrice * 1) });

    $scope.$watch('tINFPrice', function () { $scope.gINFPrice = ($scope.INFPrice * 1) + ($scope.tINFPrice * 1) });
    $scope.$watch('INFPrice', function () { $scope.gINFPrice = ($scope.INFPrice * 1) + ($scope.tINFPrice * 1) });


    $scope.ADTTcom = 0;
    $scope.ADTOcom = 0;
    $scope.$watch('gADTPrice', function () { $scope.ADTPaid = ($scope.gADTPrice * 1) + ($scope.ADTTcom * 1) - ($scope.ADTOcom * 1) });
    $scope.$watch('ADTTcom', function () { $scope.ADTPaid = ($scope.gADTPrice * 1) + ($scope.ADTTcom * 1) - ($scope.ADTOcom * 1) });
    $scope.$watch('ADTOcom', function () { $scope.ADTPaid = ($scope.gADTPrice * 1) + ($scope.ADTTcom * 1) - ($scope.ADTOcom * 1) });


    $scope.CHDTcom = 0;
    $scope.CHDOcom = 0;
    $scope.$watch('gCHDPrice', function () { $scope.CHDPaid = ($scope.gCHDPrice * 1) + ($scope.CHDTcom * 1) - ($scope.CHDOcom * 1) });
    $scope.$watch('CHDTcom', function () { $scope.CHDPaid = ($scope.gCHDPrice * 1) + ($scope.CHDTcom * 1) - ($scope.CHDOcom * 1) });
    $scope.$watch('CHDOcom', function () { $scope.CHDPaid = ($scope.gCHDPrice * 1) + ($scope.CHDTcom * 1) - ($scope.CHDOcom * 1) });

    $scope.INFTcom = 0;
    $scope.INFOcom = 0;
    $scope.$watch('gINFPrice', function () { $scope.INFPaid = ($scope.gINFPrice * 1) + ($scope.INFTcom * 1) - ($scope.INFOcom * 1) });
    $scope.$watch('INFTcom', function () { $scope.INFPaid = ($scope.gINFPrice * 1) + ($scope.INFTcom * 1) - ($scope.INFOcom * 1) });
    $scope.$watch('INFOcom', function () { $scope.INFPaid = ($scope.gINFPrice * 1) + ($scope.INFTcom * 1) - ($scope.INFOcom * 1) });




    $scope.$watch('ADTTcom', function () { $scope.ADTIncom = ($scope.ADTTcom * 1) - ($scope.ADTOcom * 1) });
    $scope.$watch('ADTOcom', function () { $scope.ADTIncom = ($scope.ADTTcom * 1) - ($scope.ADTOcom * 1) });

    $scope.$watch('CHDTcom', function () { $scope.CHDIncom = ($scope.CHDTcom * 1) - ($scope.CHDOcom * 1) });
    $scope.$watch('CHDOcom', function () { $scope.CHDIncom = ($scope.CHDTcom * 1) - ($scope.CHDOcom * 1) });

    $scope.$watch('INFTcom', function () { $scope.INFIncom = ($scope.INFTcom * 1) - ($scope.INFOcom * 1) });
    $scope.$watch('INFOcom', function () { $scope.INFIncom = ($scope.INFTcom * 1) - ($scope.INFOcom * 1) });


    var GetDate = function (date) {
        Stringdate = date.toString();
        return Stringdate;
    }

    $scope.PNR = '';

    $('#txtPNR').focusout(function () {

        $http.get('http://win-tsirsesjtrg/tareek/WebServices.asmx/GetPNRExist', {
            params: { PNR: $scope.PNR.trim() }
        })
                       .then(function (response) {
                           $scope.PNRExist = response.data;
                          
                           if ($scope.PNRExist[0] == 1) {
                               $('#spnpnrMsg').fadeIn();
                               $('#txtPNR').css('border','1px solid red');
                           }
                           else {
                               $('#spnpnrMsg').fadeOut();
                               $('#txtPNR').css('border','1px solid rgba(128, 128, 128, 0.31)');
                          
                           }
                       });

        if ($scope.PNRExist[0] == 1) {

            $('#spnpnrMsg').fadeIn();
        }
        else {
            $('#spnpnrMsg').fadeOut();
           
        }
    });

    $scope.Addgroup = function () {
        $scope.sName = $scope.ADTpass.concat($scope.CHDpass);
        $scope.MName = $scope.sName.concat($scope.INFpass);
        $scope.TotalPrice = 0;
        $scope.TotalTcom = 0;
        $scope.TotalOcom = 0;
        $scope.Totalpaid = 0;
        $scope.TotalIcom = 0;


        for (var i = 0; i < $scope.MName.length; i++) {
            if ($scope.MName[i].type == 'ADT') {
                $scope.MName[i].Total = ($scope.gADTPrice * 1) + ($scope.ADTTcom * 1);
                $scope.MName[i].Tcom = ($scope.ADTTcom * 1);
                $scope.MName[i].TOcom = ($scope.ADTOcom * 1);
                $scope.MName[i].Paid = ($scope.gADTPrice * 1) + ($scope.ADTTcom * 1) - ($scope.ADTOcom * 1);
                $scope.MName[i].Icom = ($scope.ADTTcom * 1) - ($scope.ADTOcom * 1);


            }
            if ($scope.MName[i].type == 'CHD') {
                $scope.MName[i].Total = ($scope.gCHDPrice * 1) + ($scope.CHDTcom * 1);
                $scope.MName[i].Tcom = ($scope.CHDTcom * 1);
                $scope.MName[i].TOcom = ($scope.CHDOcom * 1);
                $scope.MName[i].Paid = ($scope.gCHDPrice * 1) + ($scope.CHDTcom * 1) - ($scope.CHDOcom * 1);
                $scope.MName[i].Icom = ($scope.CHDTcom * 1) - ($scope.CHDOcom * 1);

            }
            if ($scope.MName[i].type == 'INF') {
                $scope.MName[i].Total = ($scope.gINFPrice * 1) + ($scope.INFTcom * 1);
                $scope.MName[i].Tcom = ($scope.INFTcom * 1);
                $scope.MName[i].TOcom = ($scope.INFOcom * 1);
                $scope.MName[i].Paid = ($scope.gINFPrice * 1) + ($scope.INFTcom * 1) - ($scope.INFOcom * 1);
                $scope.MName[i].Icom = ($scope.INFTcom * 1) - ($scope.INFOcom * 1);

            }
            $scope.TotalPrice += ($scope.MName[i].Total * 1);
            $scope.TotalTcom += $scope.MName[i].Tcom;
            $scope.TotalOcom += $scope.MName[i].TOcom;
            $scope.TotalIcom += $scope.MName[i].Icom;
            $scope.Totalpaid += $scope.MName[i].Paid;

        }


        var datey1 = $('#date1').val().trim();
        var datey2 = $('#date2').val().trim();
        $scope.mdatey1 = datey1;
        $scope.mdatey2 = datey2;
        $scope.tcktObj.PNR = $scope.PNR;
        $scope.tcktObj.Gofrom = $scope.Gofrom;
        $scope.tcktObj.Goto = $scope.Goto;
        $scope.tcktObj.CompIssue = $scope.CompIssue;
        $scope.tcktObj.Airline = $scope.airline;


        $scope.ADTTcktPriceValidate = false;
        $scope.CHDTcktPriceValidate = false;
        $scope.INFTcktPriceValidate = false;


        if ($scope.checkADT == true) {
            if ($scope.ADTPrice != 0) { $scope.tcktObj.ADTPrice = $scope.ADTPrice; $scope.ADTTcktPriceValidate = false; }
            else { $scope.ADTTcktPriceValidate = true; }

        } else $scope.tcktObj.ADTPrice = $scope.ADTPrice;



        if ($scope.checkCHD == true) {
            if ($scope.CHDPrice != 0) { $scope.tcktObj.CHDPrice = $scope.CHDPrice; $scope.CHDTcktPriceValidate = false; }
            else { $scope.CHDTcktPriceValidate = true; }
        } else $scope.tcktObj.CHDPrice = $scope.CHDPrice;

        if ($scope.checkINF == true) {
            if ($scope.INFPrice != 0) { $scope.tcktObj.INFPrice = $scope.INFPrice; $scope.INFTcktPriceValidate = false; }
            else { $scope.INFTcktPriceValidate = true; }
        } else $scope.tcktObj.INFPrice = $scope.INFPrice;



        $scope.ADTTourPriceValidate = false;
        $scope.CHDTourPriceValidate = false;
        //  $scope.INFTourPriceValidate = false;

        tourObj.PNR = $scope.PNRs[1];
        tourObj.CompIssue = $scope.tCompIssue;

        if ($scope.checkADT == true) {
            if ($scope.tADTPrice != 0) { tourObj.ADTPrice = $scope.tADTPrice; $scope.ADTTourPriceValidate = false; }
            else { $scope.ADTTourPriceValidate = true; }
        }
        else
            tourObj.ADTPrice = $scope.tADTPrice;

        if ($scope.checkCHD == true) {
            if ($scope.tCHDPrice != 0) { tourObj.CHDPrice = $scope.tCHDPrice; $scope.CHDTourPriceValidate = false; }
            else { $scope.CHDTourPriceValidate = true; }
        }
        else
            tourObj.CHDPrice = $scope.tCHDPrice;

        if ($scope.checkINF == true) {
            tourObj.INFPrice = $scope.tINFPrice;
        }
        else
            tourObj.INFPrice = $scope.tINFPrice;


        groupObj.PNR = $scope.PNRs[0];
        groupObj.Gofrom = $scope.gGofrom;
        groupObj.Goto = $scope.gGoto;
        groupObj.Datego = $scope.mdatey1;
        groupObj.Dateback = $scope.mdatey2;
        if ($scope.ticketto == 'شركة')
            groupObj.CompIssue = $scope.gCompIssueTo;
        else
            groupObj.CompIssue = $scope.ticketto;

        groupObj.empid = $('#spantest').text();
        groupObj.notes = $scope.gNotes;
        groupObj.bookingtype = $scope.bookingtype;

        if ($scope.bookingtype == 2)
            $scope.Groupto = $scope.gCompIssueTo;
        else
            $scope.Groupto = 'مسافر';

        groupObj.date1 = GetDate(datey1);
        groupObj.date2 = GetDate(datey2);
        if ($scope.checkADT == true) {
            groupObj.ADTPrice = $scope.gADTPrice;
            groupObj.ADTTcom = $scope.ADTTcom;
            groupObj.ADTOcom = $scope.ADTOcom;
            groupObj.ADTIncom = $scope.ADTIncom;
            groupObj.ADTPaid = $scope.ADTPaid;
        }

        else {
            groupObj.ADTPrice = 0;
            groupObj.ADTTcom = 0;
            groupObj.ADTOcom = 0;
            groupObj.ADTIncom = 0;
            groupObj.ADTPaid = 0;
        }


        if ($scope.checkCHD == true) {
            groupObj.CHDPrice = $scope.gCHDPrice;
            groupObj.CHDTcom = $scope.CHDTcom;
            groupObj.CHDOcom = $scope.CHDOcom;
            groupObj.CHDIncom = $scope.CHDIncom;
            groupObj.CHDPaid = $scope.CHDPaid;
        }

        else {
            groupObj.CHDPrice = 0;
            groupObj.CHDTcom = 0;
            groupObj.CHDOcom = 0;
            groupObj.CHDIncom = 0;
            groupObj.CHDPaid = 0;
        }

        if ($scope.checkINF == true) {
            groupObj.INFPrice = $scope.gINFPrice;
            groupObj.INFTcom = $scope.INFTcom;
            groupObj.INFOcom = $scope.INFOcom;
            groupObj.INFIncom = $scope.INFIncom;
            groupObj.INFPaid = $scope.INFPaid;
        }

        else {
            groupObj.INFPrice = 0;
            groupObj.INFTcom = 0;
            groupObj.INFOcom = 0;
            groupObj.INFIncom = 0;
            groupObj.INFPaid = 0;
        }




        $scope.GroupObject['ticketObject'] = $scope.tcktObj
        $scope.GroupObject['tourObject'] = tourObj;
        $scope.GroupObject['groupObject'] = groupObj;
        $scope.GroupObject['ADTNames'] = $scope.ADTpass;
        $scope.GroupObject['CHDNames'] = $scope.CHDpass;
        $scope.GroupObject['INFNames'] = $scope.INFpass;



        /************************************** validate the Names empty ***********************************************/
        $scope.ADTNamesExist = [];
        $scope.CHDNamesExist = [];
        $scope.INFNamesExist = [];

        var ADTNamesExistvalidate = false;
        var CHDNamesExistvalidate = false;
        var INFNamesExistvalidate = false;

        //To validate the ADTName information entry
        for (var i = 0; i < $scope.ADTpass.length; i++) {
            $scope.ADTNamesExist[i] = false;
            if ($scope.ADTpass[i].Name == '') {
                $scope.ADTNamesExist[i] = true;
                ADTNamesExistvalidate = true;
                break;
            }
            else {
                ADTNamesExistvalidate = false;
            }
        }

        //To validate the ADTName information entry
        for (var i = 0; i < $scope.CHDpass.length; i++) {
            $scope.CHDNamesExist[i] = false;
            if ($scope.CHDpass[i].Name == '') {
                $scope.CHDNamesExist[i] = true;
                CHDNamesExistvalidate = true;
                break;
            }
            else {
                CHDNamesExistvalidate = false;
            }
        }

        //To validate the ADTName information entry
        for (var i = 0; i < $scope.INFpass.length; i++) {
            $scope.INFNamesExist[i] = false;
            if ($scope.INFpass[i].Name == '') {
                $scope.INFNamesExist[i] = true;
                INFNamesExistvalidate = true;
                break;
            }
            else {
                INFNamesExistvalidate = false;
            }
        }


        /*************************************************************************************/



        if ($scope.checkADT == true)
            if ($scope.ADTpass.length == 0) {
                $scope.ADTNamesValidate = true;
            }
            else
                $scope.ADTNamesValidate = false;

        if ($scope.checkCHD == true)
            if ($scope.CHDpass.length == 0) {
                $scope.CHDNamesValidate = true;
            }
            else
                $scope.CHDNamesValidate = false;

        if ($scope.checkINF == true)
            if ($scope.INFpass.length == 0) {
                $scope.INFNamesValidate = true;
            }
            else
                $scope.INFNamesValidate = false;


        if (groupObj.Gofrom == '' || groupObj.Goto == '' || groupObj.Datego == '' || groupObj.Dateback == '') {
            $scope.validRoot = true;
        }
        else if ($scope.CompIssue == 'blank' || $scope.airline == 'blank' || $scope.PNRExist[0] == 1 || $scope.PNR == '' || $scope.Gofrom == '' || $scope.Goto == '' || $scope.ADTTcktPriceValidate == true || $scope.CHDTcktPriceValidate == true || $scope.INFTcktPriceValidate == true) {
            $scope.validRoot = false;
            $scope.validtiket = true;
        }
        else if ($scope.tCompIssue == 'blank' || $scope.ADTTourPriceValidate == true || $scope.CHDTourPriceValidate == true) {
            $scope.validRoot = false;
            $scope.validtiket = false;
            $scope.validtour = true;
        }
        else if ($scope.gCompIssueTo == 'blank' && $scope.ticketto == 'شركة') {
            $scope.validRoot = false;
            $scope.validtiket = false;
            $scope.validtour = false;
            $scope.validgroup = true;
        }

        else {
            $scope.validRoot = false;
            $scope.validtiket = false;
            $scope.validtour = false;
            $scope.validgroup = false;
            if ($scope.ADTNamesValidate == true || $scope.CHDNamesValidate == true || $scope.INFNamesValidate == true) {

            } else if (ADTNamesExistvalidate == true || CHDNamesExistvalidate == true || INFNamesExistvalidate == true) {

                $scope.NameExistStatus = true;

                $scope.ADTNamesValidate = false;
                $scope.CHDNamesValidate = false;
                $scope.INFNamesValidate = false;
            }

            else {
                $scope.NameExistStatus = false;

                $scope.ADTNamesValidate = false;
                $scope.CHDNamesValidate = false;
                $scope.INFNamesValidate = false;

                $('#PostBackgroundWait').show();
                $('#PostLoadingImage').show();

                $http({
                    method: 'POST',
                    url: 'http://win-tsirsesjtrg/tareek/WebServices.asmx/postgroup',
                    data: $.param({ group: JSON.stringify($scope.GroupObject) }),
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
                }).success(function (data, status, headers, config) {

                    $scope.$watch('PostbackMSG', postObserve(data));

                }).error(function (data, status, headers, config) {
                    // handle error things
                });
            }

        }





    }


    //Get Companies
    $scope.TicketCompany = [];
    $scope.VisaCompany = [];
    $scope.HotelCompany = [];
    $scope.TourCompany = [];
    $scope.PayForCompany = [];
    $scope.len = 10;
    $http.get('http://win-tsirsesjtrg/tareek/WebServices.asmx/GetCompany')
            .then(function (response) {
                $scope.Companyissue = response.data;

                for (var i = 0; i < $scope.Companyissue.length; i++) {
                    if ($scope.Companyissue[i].CompanyType == 's')
                        $scope.TicketCompany.push($scope.Companyissue[i].CompanyName);
                    if ($scope.Companyissue[i].CompanyType == 'h' )
                        $scope.HotelCompany.push($scope.Companyissue[i].CompanyName);
                    if ($scope.Companyissue[i].CompanyType == 'v')
                        $scope.VisaCompany.push($scope.Companyissue[i].CompanyName);
                    if ($scope.Companyissue[i].CompanyType == 't' || $scope.Companyissue[i].CompanyType == 'g')
                        $scope.TourCompany.push($scope.Companyissue[i].CompanyName);
                    if ($scope.Companyissue[i].CompanyType == 'c')
                        $scope.PayForCompany.push($scope.Companyissue[i].CompanyName);
                }
                $scope.len = $scope.TicketCompany[2];

                $scope.$watch('GetbackMSG', observe(response));


            });



    $http.get('http://win-tsirsesjtrg/tareek/WebServices.asmx/GetAirline')
                       .then(function (response) {
                           $scope.Airlines = response.data;

                       });

    $scope.test = true;
    $scope.GetbackMSG = 'blank';
    var observe = function (info) {
        $scope.GetbackMSG = info;
        if ($scope.GetbackMSG != 'blank') {
            $scope.test = false;
        }

    };


    $scope.postCheck = false;
    $scope.PostbackMSG = 'blank';
    var postObserve = function (info) {
        $scope.PostbackMSG = info;
        if ($scope.PostbackMSG != 'blank') {
            $scope.postCheck = true;
            $('.ClassHotelPage1').css('display', 'block');
            $('#PostLoadingImage').css('display', 'none');

        }

    };

    $http.get('http://win-tsirsesjtrg/tareek/WebServices.asmx/GetPNRs', {
        params: { EmpID: $('#spantest').text() }
    })
                       .then(function (response) {
                           $scope.PNRs = response.data;

                       });





    $scope.ADTpass = [];
    $scope.AddATDPass = function () {
        $scope.ADTpass.push({ "type": "ADT", "Name": "", "phone": "07817777214" });
    }

    $scope.ADTRemove = function (ADT) {
        var index = $scope.ADTpass.indexOf(ADT);
        $scope.ADTpass.splice(index, 1);
    }


    $scope.INFpass = [];
    $scope.AddINFPass = function () {
        $scope.INFpass.push({ "type": "INF", "Name": "", "phone": "07817777214" });
    }

    $scope.INFRemove = function (ADT) {
        var index = $scope.INFpass.indexOf(ADT);
        $scope.INFpass.splice(index, 1);
    }

    $scope.CHDpass = [];
    $scope.AddCHDPass = function () {
        $scope.CHDpass.push({ "type": "CHD", "Name": "", "phone": "07817777214" });
    }

    $scope.CHDRemove = function (CHD) {
        var index = $scope.CHDpass.indexOf(CHD);
        $scope.CHDpass.splice(index, 1);
    }

}).controller("CtrlBellReport", ['$http', '$scope', '$location', function ($http, $scope, $location) {

    $http.get('http://win-tsirsesjtrg/tareek/WebServices.asmx/GetBellDetials', {
        params: { bellId: $location.search().BellID }
    }).then(function (response) {
        $scope.BillObj = response.data;
    });

} ]);