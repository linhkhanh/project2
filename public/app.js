// show upload Button
const onClick = (button1, show) => {
    $(button1).on('click', () => {
        $(show).show();
    })
};

// SHOW INFO OF IMAGE
const showInfo = (image, info) => {
    $(image).on('mouseenter', (event) => {

        const $div = $(event.currentTarget).parent();

        const $show = $div.siblings(info);
        $show.show();
    })
}

// SHOW USERNAME OF AVATA
const showUserName = () => {
    $('.user-column').on('mouseenter', (event) => {
        const $userName = $(event.currentTarget).children('.title');
        $userName.show();
    })
};

// HIDE USERNAME
const hideUserName = () => {
    $('.user-column').on('mouseleave', (event) => {
        const $userName = $(event.currentTarget).children('.title');
        $userName.hide();
    })
}

// HIDE INFO OF IMAGE
const hideInfo = (image, info) => {
    $(image).on('mouseleave', (event) => {

        const $div = $(event.currentTarget).parent();

        const $show = $div.siblings(info);
        $show.hide();
    })
}

// COUNT LOVE
const onClickCountLove = () => {
    $('.white-love').on('click', (event) => {
        const $button = $(event.currentTarget).children().eq(0);
        const $img = $button.children().eq(0);

        const idImage = $img.attr('id');
        const userName = $button.attr('id');
            const promise = $.ajax({
                url: `/api/${userName}/${idImage}/love?`
            });

            promise.then(
                (data) => {
                    $(`.${idImage}-love`).html(data.length); //update how many people love image

                    $(`.${idImage}-list`).empty(); // update list people love image
                    data.forEach( item => {
                        $(`.${idImage}-list`).append(`<li><a href="/lico/${item}" class="all-people">${item}</a></li>`);
                    })
                    // change image white love  => black love (and convert)
                    $img.attr('src') === '/images/heart.png' ? $img.attr('src', '/images/white-heart.png') : $img.attr('src', '/images/heart.png');
                    return data;
                },
                () => {
                    console.log('bad request');
                }
            );
            
            return false     
    });
}

// SHOW LIST PEOPLE LIKE IMAGE
const showPeople = () => {
    $('.reaction-people').on('click', (event) => {
        const $list = $(event.currentTarget).siblings('.list-people');
        $list.show();
    })
};

// HIDE LIST PEOPLE LIKE IMAGE
const hidePeople = () => {
    $('.list-people').on('mouseleave', (event) => {
       $(event.currentTarget).hide();
       
    })
}

// UPDATE COMMENT
const commentImage = () => {
    $('.send').on('click', (event) => {
        // get id of input.send
        const id = $(event.currentTarget).attr('id'); //id = userName-idImage

        const arrId = id.split('-'); // split string
       
        const idImage = arrId[1]; // get idImage for url to call ajax
        const userName = arrId[0]; // get userName for url to call ajax

        const $div = $(event.currentTarget).parent(); 
        const $allComments = $div.siblings('.all-comments'); // update div.all-comments

        const $writeComment = $(event.currentTarget).siblings('.write-comment'); // find input.write-comment

        const commentContent = $writeComment.val(); // get content of comment from input
       
            const promise = $.ajax({
                url: `/api/${userName}/${idImage}/comment?comment=${commentContent}`
            });

            promise.then(
                (data) => {
                    const newData = JSON.parse(data);
                    const allComments = newData.comments;
                    const newComment = allComments[allComments.length - 1]; // get newest comment
                   
                    // update div.all-comments
                   $allComments.append(`<div class="comment"> 
                   <p class="date"><i>${newComment.createdAt}</i></p>
                   <p><img src="${newComment.avataOfUserComment}" class="avata-comment"><a
                           href="/lico/${newComment.userComment}">${newComment.userComment}</a>
                       ${newComment.content}
                   </p>
               </div>`);
                    $(`.${newData.idImage}-comment`).html(allComments.length); // update how many comments in index page
                    return data;
                },
                () => {
                    console.log('bad request');
                }
            );
            return false;
    })
}
$(() => {
    onClick('.choose-avata', '.change-avata');
    onClick('.choose-image', '.up-image');
    onClick('.choose-image', '.description');

    showInfo('.show-image', '.show-info');
    hideInfo('.show-image', '.show-info');

    showUserName();
    hideUserName();

    showPeople();
    hidePeople();

    onClickCountLove();

    commentImage();

})