const onClick = (button1, show) => {
    $(button1).on('click', () => {
        $(show).show();
    })
};

const showInfo = (image, info) => {
    $(image).on('mouseenter', (event) => {
        
        const $div = $(event.currentTarget).parent();
        
        const $show = $div.siblings(info);
        $show.show();
    })
}
const showUserName = () => {
    $('.user-column').on('mouseenter', (event) => {
        const $userName = $(event.currentTarget).children('.title');
        $userName.show();
    })
};

const hideUserName = () => {
    $('.user-column').on('mouseleave', (event) => {
        const $userName = $(event.currentTarget).children('.title');
        $userName.hide();
    })
}
const hideInfo = (image, info) => {
    $(image).on('mouseleave', (event) => {
        console.log(event.currentTarget);
        const $div = $(event.currentTarget).parent();
        console.log($div);
        const $show = $div.siblings(info);
        $show.hide();
    })
}
$(() => {
    onClick('.choose-avata', '.change-avata');
    onClick('.choose-image', '.up-image' );
    onClick('.choose-image', '.description' );

    showInfo('.index-image', '.show-info');
    hideInfo('.index-image', '.show-info');

    showUserName();
    hideUserName();
})