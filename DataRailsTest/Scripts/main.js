var name;

$(document).ready(function () {
    $(".searchBtn").click(function () {
        getArtistBdByName();

    });

    $('#inputTextId').keypress(function (event) { //
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            getArtistBdByName();
        }
    });
});

function getArtistBdByName() {
    name = $('#inputTextId').val();
    searchUrl = 'https://musicbrainz.org/ws/2/artist/?query=artist:' + name + '&fmt=json&limit=1';
    $.get(searchUrl).done((data) => {
        try {
            getHebDate(data.artists[0]["life-span"].begin);
        } catch (e) {
            errorSwal()
        }
    });
    $.get(searchUrl).fail((err) => {
        console.log(err);
    });
}
function getHebDate(date) {
    console.log(date)
    dateArr = date.split("-")
    console.log(dateArr)
    if (dateArr.length == 3) {
        dateUrl = 'https://www.hebcal.com/converter?cfg=json&gy=' + dateArr[0] + '&gm=' + dateArr[1] + '&gd=' + dateArr[2] + '&g2h=1';
        $.get(dateUrl).done((data) => {
            var hebDate= data.hebrew
            successSwal(date, hebDate);
        });
        $.get(searchUrl).fail((err) => {
            errorSwal()
        });
    }
    else {
        errorSwal()
    }
}


function successSwal(date,hebDate) {
    swal({
        title: name,
        text: 'Date of birth is: ' + date + 'By Jewish calendar is: ' + hebDate, 
       
        icon: 'success',
        button: 'Great!'
    })
}
 //text:  'By Jewish calendar is: ' + data.hebrew ,

function errorSwal() {
    swal({
        text:
            'We could not find ' + name + ' date of birth, try to write his name accurately',
        icon: 'error',
        button: 'Ok!'
    })
}
