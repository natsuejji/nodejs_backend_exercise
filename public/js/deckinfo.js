function loadDeckContent(deck){
    $.ajax({
        type:'get',
        url: '/api/deckcontent/'+deck,
        error: function(){
            console.log('deck load failed')
        },
        success: function(data){
            setCataData(data);
            findCards(data)
        }
    })
}
function setCataData(data){
    console.log(data)
    var cards = [];
    data.forEach(d =>{
        cards.push({c_id: d.C_ID, c_amount: d.C_amount})
    })
    deckContentData = cards
}

function findCards(cards){
    cards.forEach( card =>{
        $.ajax({
            type:'get',
            url: '/api/card/'+card.C_ID,
            error: function(){
                console.log('card load failed')
            },
            success: function(data){
                disCard(data)
            }
        })
    })

}
function disCard(cards){
    cards.forEach(card =>{
        var amount = deckContentData.find(function(item,index,array){
            return item.c_id === card.C_ID
        })
        
        var $list = $("#cardList");
        var $cardbody = $("<div>").addClass("card-body mycardbody bg-white text-center m-3");
        var $card = $('<div>')
        var $img = $("<img>").attr('src', "../"+card.C_Image)
        var $name = $("<div>").addClass("pb-1").attr('id','cardname').text(card.c_name+" 共"+amount.c_amount+"張")
        var $id = $("<span>").addClass("card-item-id").text(card.C_ID)
        $card.append($cardbody)
        $cardbody.append($img).append($id).append($name)
        //$list.append($card)
        $list.append($cardbody)
    })
}

function loadDeck(deckid){
    loadDeckContent(deckid);
    $.ajax({
        type:'get',
        url: '/api/deck/'+deckid,
        error: function(){
            console.log('card load failed')
        },
        success: function(data){
            console.log(data)
            $('#deckName').text(data[0].DECK_name)
            $('#deckClass').text("Class: "+data[0].DECK_Class)
            setPassword(data[0].deck_password)
        }
    })
}
$(function(){
    var deckContentData;
    loadDeck(deckid)

    $(document).on("click","#deleteDeckBtn",function(event){
        $.ajax({
            type:'delete',
            url: '/api/deck/'+deckid,
            data:{
                DECK_id:deckid,
                password: $("#deckpassword").val()
            },
            error: function(){
                console.log('card load failed')
            },
            success: function(data){
               alert(data.message)
               if(data.message === "success") window.location='../'
            }
        })

    })
})