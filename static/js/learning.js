(function () {
    'use strict'
    feather.replace()
}())

// in showLearningcard()
function appendLearningcard(voca, mean) {
    let learningcard_html = `<p class="card-text"
                                       style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
                                        ${voca}
                                    </p>`
    $('#main-card').empty()
    $('#main-card').append(learningcard_html)
}

// document ready
function showLearningcard() {
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

                let voca = vocalist[0]['voca']
                let mean = vocalist[0]['mean']

                appendLearningcard(voca, mean)

                alert(chosen_day + " 카드 불러오기")
            }
        }
    })
}

$(document).ready(function () {
    showLearningcard()
});

function vocaCountMinus() {
    alert("해당 단어의 count -1, 다음단어 출력")
}

function vocaCountPlus() {
    alert("해당 단어의 count +1, 다음단어 출력")
}

function reverseCard() {
    alert("단어를 지우고 단어의 mean값을 출력")
}