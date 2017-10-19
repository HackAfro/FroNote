/**
 * Created by Afro on 10/11/2017.
 */
(function () {
    'use strict';

    $(document).ready(start);

    function start() {
        const $text = $('#tweet-text');
        const $count = $('.text-count');
        const $tweetForm = $('#tweet-form');
        const $closeAlert = $('.app-message-close');
        const tweetCard = document.querySelector('.tweet-box');
        const stepButton = document.querySelector('#stepper');
        const alertBox = document.querySelector('.app-message');
        let notesBox = document.getElementById('notes-box');
        const alertMessage = alertBox.lastElementChild;
        const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        const deleteTrigger = document.getElementById('trigger-delete');
        let $prev = $('#prev');
        let title = $('#title');
        let $textbox = $('#note-text');
        let deleteId, content, deleteParent;


        // Event Listeners
        $('body').on('click', toggleTweetInput);
        $text.on('keyup', countChars);
        $text.on('mouseup', countChars);
        $text.on('click', countChars);
        $text.on('change', countChars);
        $tweetForm.on('submit', postTweet);
        stepButton.addEventListener('click', makeStep);
        $prev.on('click', () => animateInputs('back'));
        tweetCard.addEventListener('click', getDeleteContent);
        notesBox.addEventListener('click', getDeleteContent);
        deleteTrigger.addEventListener('click', handleDelete);

        function countChars(e) {
            const valLength = this.value.length;
            const saveButton = this.parentElement.nextElementSibling;
            const counter = this.nextElementSibling;

            $count.text(`${valLength}`);
            saveButton.disabled = valLength > 140;
            counter.classList.add(`${valLength > 130 ? 'text-red' : 'text-green'}`);
            counter.classList.remove(`${valLength > 130 ? 'text-green' : 'text-red'}`);
        }

        (function getTweets() {
            $.get('/tweets', function (res) {
                let tweetsHtml = res
                    .map(tweet =>
                        `<div class="list-group-item list-group-item-action flex-column align-items-start border border-left-0 border-right-0 border-top-0 tweet-card">
                             <div class="d-flex w-100 justify-content-between px-4 my-2">
                                <h6 class="mb-1 font-weight-bold">${tweet.display_name} <span class="font-weight-normal">@${tweet.screen_name}</span> </h6>
                                <small>${moment(tweet.date).fromNow()}</small> 
                             </div>
                             <div class="p mb-1">
                                ${tweet.tweet}
                             </div>
                             <div class="tweet-options d-flex justify-content-between w-50 px-4 my-2">
                                <i class="fa fa-pencil edit"></i>
                                <i class="fa fa-trash-o delete" data-id="${tweet.id}" data-content="tweet" data-toggle="modal" data-target=".delete-modal"></i>
                                ${tweet.tweeted ? '' : '<i class="fa fa-send-o tweet"></i>'}
                             </div>
                        </div>`
                    );
                tweetCard.innerHTML = tweetsHtml.join('');
            })
        })();


        (function getNotes() {
            http('GET', '/notes')
                .done(data => {
                    let notes = data
                        .map(note =>
                            `
                            <div class="col col-lg-4 col-md-6 col-sm-6 col-6">
                                <div class="card text-white bg-card mb-3">
                                    <div class="card-header">
                                        <i class="fa fa-pencil float-left update"></i>
                                        <i class="fa fa-close float-right delete" data-id="${note.id}" data-content="note" data-toggle="modal" data-target=".delete-modal"></i>
                                    </div>    

                                    <div class="card-body" contenteditable="true">
                                        <h4 class="card-title note-title">${note.title}</h4>
                                        <p class="card-text note-text">${note.note}</p>
                                    </div>
                                </div>
                            </div>    
                            `
                        );

                    notesBox.innerHTML += notes.join('');
                })
                .fail(err => {
                    alert(err.message)
                })
        })();

        function postTweet(e) {
            e.preventDefault();
            const tweetText = this.querySelector('#tweet-text');

            if (tweetText.value === '') {
                showAlert("Please ensure that you fill the form before submitting");
            }
            else {
                http('POST', '/add-tweet', {tweet: tweetText.value})
                    .done(function (data) {
                        let newTweet =
                            `<div class="list-group-item list-group-item-action flex-column align-items-start border border-left-0 border-right-0 border-top-0 tweet-card">
                             <div class="d-flex w-100 justify-content-between px-4 my-2">
                                <h6 class="mb-1 font-weight-bold">${data.display_name} <span class="font-weight-normal">@${data.screen_name}</span> </h6>
                                <small>${moment(data.date).fromNow()}</small> 
                             </div>
                             <div class="p mb-1">
                                ${data.tweet}
                             </div>
                             <div class="tweet-options d-flex justify-content-between w-50 px-4 my-2">
                                <i class="fa fa-pencil edit"></i>
                                <i class="fa fa-trash-o delete" data-id="${data.id}" data-content="tweet" data-toggle="modal" data-target=".delete-modal"></i>
                                ${data.tweeted ? '' : '<i class="fa fa-send-o tweet"></i>'}
                             </div>
                        </div>`;

                        tweetText.value = "";
                        tweetCard.innerHTML += newTweet;
                        tweetText.click();
                        showAlert("Your tweet has been added successfully");

                    }).fail(function (err) {
                    showAlert("Your tweet could not be added please try again");
                })
            }
        }

        function makeStep(e) {
            e.preventDefault();
            let step = parseInt(this.dataset.step);

            if (title.val().length > 1) {
                if (step === 1) {
                    animateInputs('next');

                } else if (step === 2) {
                    let $textArea = $('#note-text');

                    if ($textArea.val().length > 1) {
                        let data = {
                            title: titleInput.val(),
                            text: $textArea.val()
                        };

                        http('POST', '/add-note', data)
                            .done(data => {
                                const notesBox = document.getElementById('notes-box');
                                let newNote = `
                                    <div class="col col-lg-4 col-md-6 col-sm-6 col-6">
                                        <div class="card text-white bg-card mb-3">
                                            <div class="card-header">
                                                <i class="fa fa-pencil float-left update"></i>
                                                <i class="fa fa-close float-right delete" data-id="${data.id}" data-content="note" data-toggle="modal" data-target=".delete-modal"></i>
                                            </div>
                                            <div class="card-body">
                                                <h4 class="card-title note-title">${data.title}</h4>
                                                <p class="card-text note-text"> ${data.note}</p>
                                            </div>
                                        </div>        
                                `;
                                notesBox.innerHTML += newNote;
                                titleInput.val('');
                                $textArea.val('');

                                this.dataset.step = "1";
                                showAlert("Your noted has been added successfully");
                                animateInputs('back');
                            })
                            .fail(() => {
                                showAlert("Your tweet could not be added please try again");
                            })
                    } else {
                        showAlert('Please complete note content before proceeding');
                    }
                }
            } else {
                showAlert('Please enter the title before proceeding');
            }
        }


        function getDeleteContent(e) {
            let target = e.target;

            if (target.classList.contains('delete')) {
                let deleteWord = $('#delete-content');

                deleteId = target.dataset.id;
                content = target.dataset.content;
                deleteParent = content === 'note' ? $(target).parents()[2] : $(target).parents()[1];
                deleteWord.text(content)
            }
            else {
                if (target.classList.contains('update')) {
                    let noteTitle = $('.note-title');
                    let noteText = $('.note-text');
                    console.log(noteTitle.text());
                    console.log(noteText.text());

                    deleteId = target.nextElementSibling.dataset.id;
                    content = target.nextElementSibling.dataset.content;
                    console.log(deleteId, content)
                    title.val(noteTitle.text());
                    $textbox.val(noteText.text());
                }
            }
        }

        function handleUpdate(e) {

        }

        function handleDelete() {
            let url = content === 'tweet' ? `/delete-tweet/${deleteId}` : `/delete-note/${deleteId}`;
            http('POST', url)
                .done(data => {
                    showAlert(`Your ${content} has been deleted successfully`);
                    $('.delete-modal').modal('hide');
                    deleteParent.remove()
                })
                .fail(err => {
                    showAlert(`Error while deleting your ${content}`);
                    $('.delete-modal').modal('hide')
                })

        }


        function animateInputs(direction) {
            let slideInAnime = 'slideInRight animated';
            let slideOutAnime = 'slideOutLeft animated';
            let slideInLeftAnime = 'slideInLeft animated';
            let slideOutRightAnime = 'slideOutRight animated';
            let stepper = document.getElementById('stepper');

            let titleParent = title.parent();
            let textParent = $textbox.parent();

            if (direction === 'next') {
                titleParent.addClass(slideOutAnime).one(animationEnd, function () {
                    $(this).removeClass(slideOutAnime).addClass('d-none');
                });
                textParent.removeClass('d-none').addClass(slideInAnime).one(animationEnd, function () {
                    $(this).removeClass(slideInAnime);
                });
                stepper.dataset.step = "2";
                stepper.innerText = "Finish";
                $textbox.focus();
                $prev.removeClass('d-none');
            }
            else {
                titleParent.removeClass('d-none').addClass(slideInLeftAnime).one(animationEnd, function () {
                    $(this).removeClass(slideInLeftAnime);
                });
                textParent.addClass(slideOutRightAnime).one(animationEnd, function () {
                    $(this).removeClass(slideOutRightAnime).addClass('d-none');
                });
                stepper.dataset.step = "1";
                stepper.innerText = "Next";
                title.focus();
                $prev.addClass('d-none');

            }
        }

        function http(method, url, data) {
            return !!data ?
                $.ajax({
                    method,
                    url,
                    data
                }) : $.ajax({
                    method,
                    url
                });
        }

        function showAlert(message) {
            alertMessage.innerHTML += ` ${message}`;
            alertBox.classList.remove('d-none');
            hideAlert()
        }

        function toggleTweetInput(e) {
            if (e.target.id === "tweet-text") {
                const tweetInput = e.target;
                tweetInput.rows = 4
            }
            else {
                const tweetInput = document.getElementById('tweet-text');
                if (tweetInput.rows !== 1) tweetInput.rows = 1;
            }
        }

        function hideAlert() {
            setTimeout(() => {
                alertBox.classList.add('d-none');
                alertMessage.innerHTML = "";
            }, 3000)
        }

    }
})();