function loadDeckList(){
    var list = $("#decklist");
    list.empty();
    $.ajax({
        type:'get',
        url: '/api/deck/',
        error: function(){
            console.log('deck list load failed')
        },
        success: function(data){
            disDeckList(data)
        }
    })
}

function disDeckList(decks){
    var $list = $("#decklist");
    decks.forEach( deck =>{
        /*
    deck列表　pattern

            <li class="pb-1">
                <div class="card-body bg-dark decklist-item">
                    <h5 class="card-title">deck name</h5>
                    <span class="decklist-item-id">deck id</span>
                    <span class="card-text">deck descript</span>
                    <a href="#" class="btn btn-primary float-right">觀看</a>
                </div>
            </li>
 */
        var $panel = $("<li>").addClass('pb-1')
        var $body = $("<div>").addClass("card-body bg-dark decklist-item")
        var $title = $("<h5>").addClass('card-title').text(deck.DECK_name)
        var $id = $("<span>").addClass('decklist-item-id').text(deck.DECK_id)
        var $intro = $("<span>").addClass('card-text').text(deck.deck_intro==null?"none":deck.deck_intro)
        var $btn = $("<a>").addClass('btn btn-primary float-right').attr('href','/deck/'+ deck.DECK_id).text("觀看")
        $body.append($title)
             .append($id)
             .append($intro)
             .append($btn)
        $panel.append($body)
        $list.append($panel)
    })

}
$(function(){
    loadDeckList()
})