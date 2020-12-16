var uname;
$(function() {
	$("#closereply").click(function() {
		$("#replycontent").val('');
		$("#rpnotice").html('');
		$("#reply-box").removeClass('reply-box-fd');
	    $("#closereply").hide();
	    $("#rpid").val('0');
	    $("#rpuid").val('0');
	    $("#reply-to-box").text('回复：楼主');
	});
});

function reply(id,uid,name) {
	uname = name;
	$("#reply-box").addClass('reply-box-fd');
	$("#rpid").val(id);
	$("#rpuid").val(uid);
	$("#reply-to-box").text("");
	$("#reply-to-box").append(name);
	$("#closereply").show();
}
function rpsubmit(link) {
	var id = $("#rpid").val();
	var uid = $("#rpuid").val();
	var content = $("#replycontent").val();
	if(!id || !uid || !content){
		$("#rpnotice").html("数据不完整！");
		return;
	}
	$.post(link, {
		id:id,uid:uid,tid:tid,content:content
	}, function(data) {
		if(data['msg'] == 'ok'){
			$("#hfnum").html(parseInt($("#hfnum").html())+1);
			$("#rpnotice").html("回复成功");
			$("#replycontent").val("");
			if(id>0){
				uname = uname.replace("回复：","");
                var html = '<div class="reply-list" id="reply'+data['id']+'"><img src="'+data['upic']+'" alt="图像"><div class="reply-r"><div class="reply-info"><span>回复:</span><a href="javascript:;" style="padding-left:0px;">@ '+uname+'</a><span>'+data['addtime']+'</span></div><div><p class="reply-c">'+content+'<a onclick="del(\''+data['dellink']+'\',\''+data['id']+'\')" class="am-fr" href="javascript:;">删除</a><a onclick="reply(\''+data['id']+'\',\''+data['uid']+'\',\'回复：'+data['uname']+'\')" class="am-fr" href="javascript:;">回复</a></p></div></div></div>';
			    $("#reply"+id).append(html);
			}else{
				if($(".nomsg").length > 0 ) { 
                    window.location.reload();
				}else{
					$('.zhw-replylist li').removeClass('one');
					var html = '<li id="reply'+data['id']+'" class="one"><div class="reply-main"><img src="'+data['upic']+'" alt="留言用户头像"><div class="reply-r"><div class="reply-info"><a href="javascript:;">'+data['uname']+'</a><span>发布于：'+data['addtime']+'</span></div><div><p class="reply-c">'+content+'<a onclick="del(\''+data['dellink']+'\',\''+data['id']+'\')" class="am-fr" href="javascript:;">删除</a><a onclick="reply(\''+data['id']+'\',\''+data['uid']+'\',\'回复：'+data['uname']+'\')" class="am-fr" href="javascript:;">回复</a></p></div></div></div></li>';
			        $(".zhw-replylist").prepend(html);
				}
			}
		}else{
			$("#rpnotice").html(data['msg']);
			$("#replycontent").val('');
		}
	},'json');
}

function clike(link){
	$.post(link, {
		tid:tid
	}, function(data) {
		if(data == '1'){
			var z = $('#zan').attr('z');
			var zhits = $('#zan').attr('zhits');
			if(z=='1'){
			   zhits = parseInt(zhits)-1;
               $('#zan').css('color','').attr('z','0').attr('zhits',zhits);
			   $('#zan i').removeClass('zhw-icon');
			   $('#zhits').html(' '+zhits+' 赞');
			}else{
			   zhits = parseInt(zhits)+1;
               $('#zan').css('color','#0e90d2').attr('z','1').attr('zhits',zhits);
			   $('#zan i').addClass('zhw-icon');
			   $('#zhits').html(' '+zhits+' 已赞');
			}
			//window.location.reload();
		}else{
			alert(data);
		}
	});
}
function collect(link){
	$.post(link, {
		tid:tid
	}, function(data) {
		if(data == '1'){
			var s = $('#fav').attr('s');
			if(s=='1'){
               $('#fav').css('color','').attr('s','0');
			   $('#fav i').removeClass('zhw-icon');
			   $('#sc').html(' 加入收藏');
			}else{
               $('#fav').css('color','#0e90d2').attr('s','1');
			   $('#fav i').addClass('zhw-icon');
			   $('#sc').html(' 已收藏');
			}
			//window.location.reload();
		}else{
			alert(data);
		}
	});
}

function del(link,ids){
	if(confirm("确定删除？")) { 
	    $.post(link, {id: ids}, function(data){
             if(data=='ok'){
				  $("#hfnum").html(parseInt($("#hfnum").html())-1);
                  $('#reply'+ids).remove();
			 }else{
                  alert(data);
			 }
	    });
	}
}