
function findCards(){
    var ckind = "";
    var Crare = "";
    var cname = "";
    if($("#kindSelect option:selected").val()!='null'){ckind = $("#kindSelect option:selected").val()}
    if($("#rareSelect option:selected").val()!='null'){Crare = $("#rareSelect option:selected").val()}
    if($("input[id='cardName']").val()!=''){cname = "%"+$("input[id='cardName']").val()+'%'}
    $.ajax({
        type:'post',
        url: '/api/findCard',
        data:{
            C_class: seleClass,
            C_rare: Crare,
            c_kind: ckind,
            c_name: cname,
        },
        error: function(error){
            console.log(error)
        },
        success: function(data){
            disCard(data)
        }
    })
}
function disCard(cards){
    /*
    卡片資訊 pattern
<div class="card-body bg-white m-3"  style="border-radius:10px">
    <img src = "/image/cards/basic/Bloodcraft/C_100611010.png"/>
    <div class="pb-1">name</div>
    <span class="decklist-item-id">deck id</span>
    <div class="btn-group mr-2" role="group" aria-label="btngroup">
        <button type="button" class="btn btn-danger ">+</button>
        <button type="button" class="btn btn-secondary">-</button>
    </div>
</div> */   
    var $list = $("#cardList");
    $list.empty()
    cards.forEach(card => {
        var $cardbody = $("<div>").addClass("card-body mycardbody bg-white m-1");
        var $img = $("<img>").attr('src', "../"+card.C_Image)
        var $name = $("<div>").addClass("pb-1").attr('id','cardname').text(card.c_name)
        var $card_maxAmount = $("<div>").addClass("pb-1").attr('id','card_maxAmount').text(card.c_maxAmount)
        var $id = $("<span>").addClass("card-item-id").text(card.C_ID)
        var $btngroup = $("<div>").addClass("btn-group mr-2")
                            .attr("role","group")
                            .attr("aria-label","btngroup")
        var $btnplus = $("<button>").addClass("btn btn-danger").text("+").attr('id','incCurCardCount-btn')
        var $btnminus = $("<button>").addClass("btn btn-secondary").text("-").attr('id','desCurCardCount-btn')
        $btngroup.append($btnplus).append($btnminus)
        $cardbody.append($img).append($id).append($name).append($btngroup).append($card_maxAmount)
        $list.append($cardbody)
    });

}

function disSelectedCard(card){
    // <li class="list-group-item row text-center">
    //     <span class="col-3">白熊聖騎士</span>
        
    //     <div class="btn-group float-right" role="group" aria-label="btngroup">
    //             <button type="button" class="btn btn-danger ">+</button>
    //             <button type="button" class="btn btn-secondary">-</button>
    //     </div>
    //     <span id="cardCount" class="col-3 float-right">0/40</span>
    // </li>
    var $cardBody = $("<li>").addClass("list-group-item row text-center").attr('selectedCardID',card.C_ID).attr('id','deckCurContent')
    var $name = $("<span>").addClass("col-3").text(card.c_name).attr('id','cardname')
    var $count = $('<span>').attr('id','cardCount').addClass("col-3 float-right").text("1/"+card.c_maxAmount)
    var $btngroup = $("<div>").addClass("btn-group mr-2 float-right")
                              .attr("role","group")
                              .attr("aria-label","btngroup")
    var $btnplus = $("<button>").addClass("btn btn-danger").text("+").attr('id','curplus')
    var $btnminus = $("<button>").addClass("btn btn-secondary").text("-").attr('id','curminus')
    $btngroup.append($btnplus).append($btnminus)
    $cardBody.append($name).append($btngroup).append($count)
    
    return $cardBody;
}
$(function(){
    var deckCount = 0;
    var allcard = []
    findCards()
    $('#findCard').button().click(findCards)
    //從卡牌增加卡牌
    $(document).on("click", "#incCurCardCount-btn" , function(event) {
        if(deckCount>39) {
            alert("不能超過40張")
            return;
        }
        var id = $(this).parent().siblings(".card-item-id").text();
        var name = $(this).parent().siblings("#cardname").text();
        var maxcount = $(this).parent().siblings("#card_maxAmount").text();
        var card = {C_ID:id,c_name:name,c_maxAmount:maxcount}
        var $target = $("[selectedCardID='"+id+"']")

        if($target.length==0){
            $("#deckCurContentList").append(disSelectedCard(card))
            deckCount++;
        }else{
            var $node = $target.find('#cardCount').text().split('/')
            var count = Number.parseInt($node[0])+1
            console.log($node[0])
            if(count>3) return;
            $target.find("#cardCount").text(count+'/'+$node[1]);
            deckCount++;
        }
        console.log(deckCount)

        
    });
    //減少卡牌
    $(document).on("click", "#desCurCardCount-btn" , function(event) {
       
        var id = $(this).parent().siblings(".card-item-id").text();
        var $target = $("[selectedCardID='"+id+"']")

        if($target.length==0){
            
            console.log('沒了')
            return;
        }else{
            var $node = $target.find('#cardCount').text().split('/')
            var count = Number.parseInt($node[0])-1
            deckCount--;
            console.log($node[0])
            if(count>0){
                $target.find("#cardCount").text(count+'/'+$node[1]);
            }
            else{
                console.log('移除')
                $target.remove();
                return;  
            }
        }
        console.log(deckCount)

        
    });
    //從牌組中的卡牌增加卡牌

    $(document).on("click", "#curplus", function(event){
        if(deckCount>39) {
            alert("不能超過40張")
            return;
        }
        var countNode = $(this).parent().siblings("#cardCount");
        var countNodeText = countNode.text().split('/');
        var count = Number.parseInt(countNodeText[0])+1;
        if(count>3) return;
        countNode.text(count+'/'+countNodeText[1])
        deckCount++;
        console.log(deckCount)

    })
    //從牌組中的卡牌減少卡牌
    $(document).on("click", "#curminus", function(event){
        var countNode = $(this).parent().siblings("#cardCount");
        var countNodeText = countNode.text().split('/');
        var count = Number.parseInt(countNodeText[0])-1;
        deckCount--;
        if(count!=0){
            countNode.text(count+'/'+countNodeText[1])
        }
        else{
            $(this).parent().parent().remove()
            console.log('沒了');
        }         
        console.log(deckCount)
    })

    $(document).on('click','#createCard',function(event){
        var alertstr =""
        if($("#deckName").val()=="") {
            alertstr+="卡組名子不能為空\n"
            
        }
        if($("#deckPass").val()=="") {
            alertstr+="卡組密碼不能為空"
            
        }
        if(alertstr!="") {
            alert(alertstr)
            return;
        }

        allcard = [];
        $("[id='deckCurContent']").each(function(index){
            var amount = $(this).find("#cardCount").text().split('/')[0];
            var ID = $(this).attr('selectedCardID')
            allcard.push({c_amount: amount,
                          C_ID: ID
            })
        })
        if(allcard.length==0){
            alert("請選擇想要加入卡組的卡片")
            return;
        }
        $.ajax({
            type:'post',
            url: '/api/createDeck',
            data:{
                // console.log(res.body.deckName)
                // console.log(res.body.deckIntro)
                // console.log(res.body.cardList)  
                deckClass: seleClass,
                deckName: $("#deckName").val(),
                deckIntro: $('#intro').val()==""?"none":$('#intro').val(),
                deckPass: $('#deckPass').val(),
                deck_count: deckCount,
                allcard: JSON.stringify(allcard)
            },
            success: function(data){
                //your code here
                if(data.success===true){
                    window.location = '../'
                }
                
            },
            error: function(){
                //your code here
            }
        })
    })

})