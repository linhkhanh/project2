const onClick = (button1, show) => {
    $(button1).on('click', () => {
        $(show).show();
    })
};

const showInfo = () => {
    $('.index-image').on('mouseenter', (event) => {
        console.log(event.currentTarget);
        const $div = $(event.currentTarget).parent();
        console.log($div);
        const $show = $div.siblings('.show-info');
        $show.show();
    })
}
const hideInfo = () => {
    $('.index-image').on('mouseleave', (event) => {
        console.log(event.currentTarget);
        const $div = $(event.currentTarget).parent();
        console.log($div);
        const $show = $div.siblings('.show-info');
        $show.hide();
    })
}
$(() => {
    onClick('.choose-avata', '.change-avata');
    onClick('.choose-image', '.up-image' );
    onClick('.choose-image', '.description' );
    showInfo();
    hideInfo();
})