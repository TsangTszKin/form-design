layui.use(['layer','element'], function() {
	var $ = layui.jquery, el = layui.element, layer = layui.layer;
	var custom = $('.layui-body-custom');
	var active = {
		resizeTab: function() {
			var height = $(window).height() - 60;
			custom.find('.layui-tab-title').css('cssText', 'height:'+height+'px !important;');
			custom.find('.layui-tab-content').height(height);
			custom.find('.layui-tab-content').find('iframe').height(height);
		},
		userMsg: function(){
			custom.find('.layui-user').click();
		},
		logout: function(){
			location.href = '../../html/login/login.html';
		}
	}
	
	var navFlag = false;
	el.on('nav(headNav)', function(elem) {
		navFlag = true;
		var othis = $(this), type = othis.data('click');
		if(!type){
			othis = othis.children('a');
			type = othis.data('click');
			var ref = othis.data('ref');
			custom.find(ref).click();
		}
		active[type] ? active[type].call(this, othis) : '';
	});
	el.on('tab(indexTab)', function(){
		if(!navFlag)
			$('.layui-layout-right .layui-this').removeClass('layui-this');
		navFlag = false;
	});
	
	custom.find('.layui-home').click();
	$(window).on('resize', active.resizeTab);
	active.resizeTab();
});

function toHome(){
	console.log(123456)
}
