function appendLearning(day, count) {
    let temp_html = `<tr>
                            <td><a class="nav-link" id=${day} onclick="showVocalist(id)">${day}</a></td>
                            <td>${count}</td>
                     </tr>`
    $('#learning-list').append(temp_html)
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

function showVocalist(day) {
    $.ajax({
        type: "POST",
        url: "/vocalist",
        data: {day_give: day},
        success: function (response) {
            $('body').html(response)
            alert('완료')
        }
    })
}

$(document).ready(function () {
    showLearninglist()
});
