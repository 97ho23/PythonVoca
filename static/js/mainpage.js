(function () {
    'use strict'
    feather.replace()
}())

// in showLearninglist()
function appendLearninglist(day, count) {
    let learninglist_html = `<tr>
                            <td><a class="nav-link" id=${day} onclick="moveToVocalist(id)">${day}</a></td>
                            <td>${count}</td>
                     </tr>`
    $('#learning-list-body').append(learninglist_html)
}

// when document ready
function showLearninglist() {
    $.ajax({
        type: "GET",
        url: "/learninglist",
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                let learnings = response['learning']
                for (let i = 0; i < learnings.length; i++) {
                    let day = learnings[i]['day']
                    let count = learnings[i]['count']

                    appendLearninglist(day, count)
                }
            } else {
                alert("불러오기 오류")
            }
        }
    })
}

$(document).ready(function () {
    showLearninglist()
});

// onclick day in 'learning list'
function moveToVocalist(day) {
    $.ajax({
        type: "GET",
        url: "/day_choose?day_give=" + day,
        data: {},
        success: function (response) {
            $('body').html(response)
        }
    })
}

