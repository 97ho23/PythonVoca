(function () {
    'use strict'
    feather.replace()
}())

function appendLearning(day, count) {
    let days_html = `<tr>
                            <td><a class="nav-link" id=${day} onclick="showVocalist(id)">${day}</a></td>
                            <td>${count}</td>
                     </tr>`
    $('#learning-list-body').append(days_html)
}

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

                    appendLearning(day, count)
                }
            } else {
                alert("불러오기 오류")
            }
        }
    })
}

function changePage(day) {

    let startbtn_html = `<button type="button" onclick="location.href = '/start'"
                                    class="btn btn-lg btn-outline-primary">
                                학습시작
                            </button>`

    let listheader_html = `<th>단어</th>
                           <th>뜻</th>`

    $('#learning-title').empty()
    $('#learning-title').append(`${day}`)

    $('#learning-startbtn').empty()
    $('#learning-startbtn').append(startbtn_html)

    $('#learning-list-header').empty()
    $('#learning-list-header').append(listheader_html)

    $('#learning-list-body').empty()
}

function changeList(voca, mean) {

    let vocas_html = `<tr>
                            <td><a class="nav-link">${voca}</a></td>
                            <td>${mean}</td>
                     </tr>`

    $('#learning-list-body').append(vocas_html)

}

function showVocalist(day) {
    $.ajax({
        type: "GET",
        url: "/vocalist?day_give=" + day,
        data: {},
        success: function (response) {
            if (response["result"] == "success") {
                changePage(day)

                let vocalist1 = response['vocalist']

                for (let i = 0; i < vocalist1.length; i++) {
                    let voca = vocalist1[i]['voca']
                    let mean = vocalist1[i]['mean']

                    changeList(voca, mean)
                }
                alert(day + " 단어리스트 불러오기")
            }
        }
    })
}

$(document).ready(function () {
    showLearninglist()
});
