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


const onClickCountLove = () => {
    $('.white-love').on('click', (event) => {
        const $button = $(event.currentTarget).children().eq(0);
        const $img = $button.children().eq(0);

        const idImage = $img.attr('id');
        const userName = $button.attr('id');
        console.log(idImage);
        console.log(userName);
            const promise = $.ajax({
                url: `/api/${userName}/${idImage}/love?`
            });

            promise.then(
                (data) => {
                    $(`.${idImage}-love`).html(data.length);
                    $('.list-people').empty();
                    data.forEach( item => {
                        $('.list-people').append(`<li><a href="/lico/${item}">${item}</a></li>`);
                    })
                    return data;
                },
                () => {
                    console.log('bad request');
                }
            );

            $img.attr('src') === '/images/heart.png' ? $img.attr('src', '/images/white-heart.png') : $img.attr('src', '/images/heart.png');
            
            
            return false     
    });
}

// SHOW LIST PEOPLE LILE IMAGE
const showPeople = () => {
    $('.reaction-people').on('click', (event) => {
        const $list = $(event.currentTarget).siblings('.list-people');
        console.log($list);
        $list.show();
    })
};

// HIDE LIST PEOPLE LIKE IMAGE
const hidePeople = () => {
    $('.list-people').on('mouseleave', (event) => {
       $(event.currentTarget).hide();
       
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

    $('.btn-default').on('click', () =>{
        location.reload();
    })
    onClickCountLove();

})