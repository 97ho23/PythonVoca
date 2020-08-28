(function () {
    'use strict'
    feather.replace()
}())

// in showVocalist()
function appendVocalist(voca, mean) {
    let vocalist_html = `<tr>
                            <td>${voca}</td>
                            <td>${mean}</td>
                     </tr>`

    $('#learning-list-body').append(vocalist_html)
}

// when document ready
function showVocalist() {
    $.ajax({
        type: "GET",
        url: "/vocalist",
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let chosen_day = response['chosen_day']
                let vocalist = response['vocalist']

                $('#learning-title').empty()
                $('#learning-title').append(`${chosen_day}`)

                for (let i = 0; i < vocalist.length; i++) {
                    let voca = vocalist[i]['voca']
                    let mean = vocalist[i]['mean']

                    appendVocalist(voca, mean)
                }
                alert(chosen_day + " 단어리스트 불러오기")
            }
        }
    })
}

$(document).ready(function () {
    showVocalist()
});