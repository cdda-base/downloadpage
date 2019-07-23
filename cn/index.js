//与Mod页面功用一套脚本逻辑，一些变量名就不改了
var mods = null;
var pagemax = 12;
//加载页面
function LoadMods(pageindex){
	$(".Mods").empty();
	$("#changepage").empty();
	var modindex = pageindex * pagemax;
	for(var i = modindex;i<(modindex + pagemax < mods.length ? modindex+pagemax : mods.length);i++){
		var mod = mods[i];
		var content = "<div class=\"Mod\">";
		
		content += "<h4>" + mod.name + "</h4>"
		
		content += "<p class=\"tag\">";
		for(var j = 0;j<mod.tags.length;j++){
			content += mod.tags[j] + " ";
		}
		content += "</p>";
		if(mod.author != undefined){
			content += "<p class=\"author\" id=\"" + i + "\">测试者：" + mod.author + "</p>";
			//获取作者信息
			LoadAuthorInfo(mod.author,i);
		}
		content += "<p class=\"Modver\">版本：" + mod.ver + "</p>";
		if(mod.info != undefined){
			content += "<p class=\"Msg\">" + mod.info + "</p>";
		}
		if(mod.warning != undefined){
			content += "<p class=\"warning\">" + mod.warning + "</p>";
		}
		if(mod.addr.win != undefined){
			for(int j = 0;i<mod.addr.win.length;j++){
				content += "<a class=\"download\" href=\"" + mod.addr.win[j] + "\">win下载链接" + (j+1) + "</a>";
			}
		}
		if(mod.addr.android != undefined){
			for(int j = 0;i<mod.addr.android.length;j++){
				content += "<a class=\"download\" href=\"" + mod.addr.android[j] + "\">win下载链接" + (j+1) + "</a>";
			}
		}
		content += "<p class=\"score\">" + mod.score + "</p>";
		content += "</div>";
		
		$(".Mods").append(content);
		
	}
	//添加换页
		$("#changepage").append("<p>现在是第"+ (pageindex + 1) + "页，共"+ Math.ceil(mods.length / pagemax) +"页</p>")
		if(pageindex == 0){
			$("#changepage").append("<a href=\"#header\" onClick=\"LoadMods(" + (pageindex + 1) + ")\">下一页</a>");
		}else if(modindex + pagemax >= mods.length){//当到了最后一页
			$("#changepage").append("<a href=\"#header\" onClick=\"LoadMods(" + (pageindex - 1) + ")\">上一页</a>");
		}else{
			$("#changepage").append("<a href=\"#header\" onClick=\"LoadMods(" + (pageindex - 1) + ")\">上一页</a>");
			$("#changepage").append("<a href=\"#header\" onClick=\"LoadMods(" + (pageindex + 1) + ")\">下一页</a>");
		}
}
function LoadAuthorInfo(name,id){
	$.getJSON("../../authors/" + name + ".json",function(data) {
				if(data.email != undefined){
					$("#" + id).after("<p class=\"authormsg\">作者邮箱：" + data.email + " </p>");
				}
	   			
   			});
}
//加载信息
$.getJSON("downloadsinfo.json",function(data) {
	   mods = data;
	   LoadMods(0);
   });
