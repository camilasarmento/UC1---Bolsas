var idAtual, limite, visitados, largura=0, altura=0, unityObj, isFullScreen=0;
var tamTituloH1=18, tamTituloH2=15, tamFonte=13, tamLegenda=9;
var masteryScore, overlayDlg=null;
var ludos_pasta, ludos_tipo_scorm=2; // 0=sem scorm; 1=lê do BD e salva no scorm; 2=lê e salva no scorm
var skinCss, skinVet={'bgMain':'#b76511','txtMain':'#fff',
 'bgRealce':'#C3711D','txtRealce':'#fff',
 'bgAtivo':'#964d02','txtAtivo':'#fff',
 'bgMenuOff':'#C3711D','txtMenuOff':'#fff',
 'bgMenuOn':'#964d02','txtMenuOn':'#fff','bgMenuMarcadorVisitado':'#f8c301',
 'bgDestaque':'#feebb2','txtDestaque':'#000','titDestaque':'#724336'};

function set_page_skin() {
  var skinCssTxt=
    '#topo, #topo span, #menu h2, .messi-titlebox, .tabela th, .tabela th *, '
   +'.playlists, .playlist a, .tabs nav ul, .tabs.vertical nav, .tabs nav li a, '
   +'.tabs nav li a *, div.acd > h3 {\n'
   +' background-color:'+skinVet['bgMain']+';\n'
   +' color:'+skinVet['txtMain']+' !important;\n'
   +'}\n'
   +'.tabs nav li.tabCurrent a, .tabs nav li.tabCurrent a *, div.acd > h3.opened, '
   +'.playlist a:hover {\n'
   +' background-color:'+skinVet['bgRealce']+';\n'
   +' color:'+skinVet['txtRealce']+' !important;\n'
   +'}\n'
   +'.destaque, .destaque p, .destaque a, .destaque em, .destaque b, .destaque b i {\n'
   +' background-color:'+skinVet['bgDestaque']+';\n'
   +' color:'+skinVet['txtDestaque']+' !important;\n'
   +'}\n'
   +'.destaque h1, .destaque h2 { color:'+skinVet['titDestaque']+' !important; }\n'
   +'.destaque.animacao::before, .destaque.atividade::before,'
   +'.destaque.casosErelatos::before, .destaque.fiqueAlerta::before,'
   +'.destaque.recapitulando::before, .destaque.saibaMais::before,'
   +'.destaque.voceSabia::before {\n'
   +' background-color:'+skinVet['titDestaque']+';\n'
   +'}\n'
   +'div.capty-caption, .tabs nav a:hover, div.acd > h3:hover,'
   +'.playlist a.playing, .playlist a.paused, .playlist a.progress,'
   +'.playlist a.playing:hover, .playlist a.paused:hover, .playlist a.progress:hover {\n'
   +' background-color:'+skinVet['bgAtivo']+';\n'
   +' color:'+skinVet['txtAtivo']+';\n'
   +'}\n'
   +'#menu, ul.mtree, ul.mtree li > a, ul.mtree li.mtree-node > a::after {\n'
   +' background-color:'+skinVet['bgMenuOff']+';\n'
   +' color:'+skinVet['txtMenuOff']+' !important;\n'
   +'}\n'
   +'ul.mtree li > a:hover, ul.mtree li.mtree-active > a,'
   +'ul.mtree li.mtree-node > a:hover::after, ul.mtree li.mtree-active > a::after {\n'
   +' background-color:'+skinVet['bgMenuOn']+';\n'
   +' color:'+skinVet['txtMenuOn']+' !important;\n'
   +'}\n'
   +'ul.mtree li > a.visitado::before {\n'
   +' color:'+skinVet['bgMenuMarcadorVisitado']+';\n'
   +'}\n'
   +'#conteudo h1, #conteudo h2, #conteudo h3, #conteudo h1 i, #conteudo h2 i,\n'
   +'#conteudo h3 > i, #conteudo a, #conteudo a > em, #conteudo ul.squared > li::before {\n'
   +' color:'+skinVet['bgMain']+' /*!important*/;\n'
   +'}\n'
   +'.tabs, div.acd > div { border-color:'+skinVet['bgRealce']+'; }\n'
   +'.tabs nav ul li.tabCurrent a::after {\n'
   +' border-top-color:'+skinVet['bgRealce']+' !important;\n' // setinha para baixo
   +'}\n'
   +'.tabs.vertical nav ul li.tabCurrent a::after {\n'
   +' border-left:10px solid '+skinVet['bgRealce']+';\n'
   +'}\n'
   +'.playlist a.playing::after, .playlist a.paused::after, .playlist a.progress::after {\n'
   +' border-left:10px solid '+skinVet['bgAtivo']+';\n'
   +'}\n'
   +'.capty-wrapper::before, .zoom::before {\n'
   +' border-color:'+skinVet['bgMain']+' '+skinVet['bgMain']+' transparent transparent;\n'
   +'}\n';
  if(typeof skinCss=='undefined') {
    skinCss=document.createElement('style');
    skinCss.type='text/css';
    if(!skinCss.styleSheet)
      skinCss.appendChild(skin_tn=document.createTextNode(''));
    document.getElementsByTagName('head')[0].appendChild(skinCss);
  }
  if(skinCss.styleSheet) skinCss.styleSheet.cssText=skinCssTxt;
  else skin_tn.nodeValue=skinCssTxt;
}
function set_html_page(tit_curso) {
  var x;
  idAtual=1;
  visitados='';
  if((api=getAPIHandle())!=null) {
    loadPage();
    if(typeof top.cursos_set_menu=='function')
      ludos_tipo_scorm=(parseInt(api.LMSGetLastError(),10)>0 ? 0:1);
  }
  ludos_pasta=(ludos_tipo_scorm<2?'../../../../':'../../scorm_export/');
  set_page_skin();
  document.getElementById('content').innerHTML=getHtmlTopo(tit_curso,true,true)
   +'<img alt="Tela anterior" title="Tela anterior" class="setaLeft" src="../../images/seta-left.png" onclick="javascript:go(idAtual-1)">\n'
   +'<section id="conteudo"><\/section>\n'
   +'<img alt="Pr&oacute;xima tela" title="Pr&oacute;xima tela" class="setaRight" src="../../images/seta-right.png" onclick="javascript:go(idAtual+1)">\n'
   +'<section id="painelDeControle">\n'
   +'  <img alt="Tela inicial" title="Tela inicial" id="home" src="../../images/icone_home.png">\n'
   +'  <img alt="Ajuda" title="Ajuda" id="ajuda" class="ajudaDesativado" src="../../images/icone_ajuda.png">\n'
   +'<\/section>\n'
   +'<section id="contadorTela">0/0<\/section>\n';
  AddEvent(document,'keydown',applyKey);
  limite = $("a[href^='javascript:go(']").length;
  atualizaVisitados(0);
  load_js_file('../../lib/mtree.js',true,function() {
   
   for(x=1; x<=limite;x++) { // trocaBgLink
     if(visitados.charAt(x)=='1')
       $('a[href="javascript:go('+x+')"]').addClass('visitado');
   }
   go(idAtual);
   winResize();
   AddEvent(window,'resize',winResize);
   load_css_file(ludos_pasta+'desafios.css');
   load_js_file(ludos_pasta+'portfolio_grupo.js',true,function() {
    load_js_file(ludos_pasta+'funcoes_prova.js',true,function() {
     load_js_file(ludos_pasta+'ludos.js',true,function() {
      webcursos_path=ludos_pasta;
     });
    });
   });
  });

  AddEvent(document.getElementById('home'),'click',function(){
   if(idAtual!=1) go(1);
  });
  AddEvent(document.getElementById('ajuda'),'click',function(){
   var altoContraste=$('body').hasClass('altoContraste');
   if(this.className=='ajudaDesativado') {
     this.className='ajudaAtivado';
     this.src='../../images/icone_ajuda_ativado'
      +(altoContraste?'_contraste':'')+'.png';
     $('.setaRight, .setaLeft').css('display','none');
     var obj=document.getElementById('conteudo');
     obj.style.top=altura+'px';
     setTimeout(function() {
      obj.style.top='0px';
      $.ajax({url:'../../ajuda.html',
       success:function(data) {
        obj.innerHTML=data;
        if(tamFonte != 13)
          atualizaFontes();
       }
      });
     },400);
   } else {
     this.className='ajudaDesativado';
     this.src='../../images/icone_ajuda'
      +(altoContraste?'_contraste':'')+'.png';
     go(idAtual);
     $('.setaRight, .setaLeft').css('display','block');
   }
  });
}

function getHtmlTopo(tit,temMenu,temTelaCheia) {
  return '<section id="topo">\n'
   +'  <span>'+tit+'<\/span>\n'
   +'  <div>'
   +(!temMenu?'':'    <img alt="Menu Retrátil" title="Menu Retrátil" src="../../images/menu_tree.png" onclick="toggleMenu(this)">\n')
   +'    <img alt="Alto Contraste" title="Alto Contraste" src="../../images/fonte-contraste.png" onclick="toggleAltoContraste(this)">\n'
   +'    <img alt="Aumentar Fonte" title="Aumentar Fonte" src="../../images/fonte-mais.png" onclick="incFontSize(1)">\n'
   +'    <img alt="Diminuir Fonte" title="Diminuir Fonte" src="../../images/fonte-menos.png" onclick="incFontSize(-1)">\n'
   +(!temTelaCheia?'':'    <img alt="Tela Cheia" title="Tela Cheia" src="../../images/icone_fullscreen.png" onclick="toggleFullScreen(document.getElementById(\'content\').parentNode)">\n')
   +'  <\/div>\n'
   +'<\/section>\n';
}
function overlay(titulo, texto) {
  overlayDlg=new Messi(texto,{title:titulo, modal:true});
}
function toggleMenu(im) {
  if($('#menu').hasClass('visivel')) {
    im.src='../../images/menu_tree_ativado.png';
    $('#menu').removeClass('visivel').addClass('invisivel')
     .toggle('slide',{ direction:'left' });
    $('#content').animate({left:10, width:parseInt(largura-20)+'px'},400);
  } else {
    im.src='../../images/menu_tree.png';
    $('#menu').removeClass('invisivel').addClass('visivel')
     .toggle('slide',{ direction:'left' });
    $('#content').animate({left:240, width:parseInt(largura-250)+'px'},400);
  }
}
function toggleAltoContraste(im) {
  if($('body').hasClass('altoContraste')) { // desabilita a acessibilidade
    $('body').removeClass('altoContraste');
    im.src='../../images/fonte-contraste.png';
    $('#home').attr('src', '../../images/icone_home.png');
    $('#ajuda').attr('src','../../images/icone_ajuda'
     +($('#ajuda').attr('class')=='ajudaDesativado'?'':'_ativado')+'.png');
  } else { // habilita a acessibilidade
    $('body').addClass('altoContraste');
    im.src='../../images/fonte-contraste_ativo.png';
    $('#home').attr('src','../../images/icone_home_ativado.png');
    $('#ajuda').attr('src','../../images/icone_ajuda'
     +($('#ajuda').attr('class')=='ajudaDesativado'?'':'_ativado')+'_contraste.png');
  }
}
function incFontSize(inc) {
  var tam = parseInt($('#conteudo p').css('font-size'))+inc;
  if(tam>12 && tam<=18) {
    tamFonte = tam;
    tamTituloH1 = parseInt(tamTituloH1)+inc;
    tamTituloH2 = parseInt(tamTituloH2)+inc;
    tamFonte = parseInt(tamFonte)+inc;
    tamLegenda = parseInt(tamLegenda)+inc;
    atualizaFontes();
  }
}
function toggleFullScreen(el) {
  var fn;
  if(isFullScreen == 0) {
    fn = el.requestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if(typeof fn=='undefined') overlay('Aviso','Seu navegador não suporta Tela Cheia!');
    else {
      fn.call(el);
      isFullScreen = 1;
    }
  } else {
    fn = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;
    fn.call(document);
    isFullScreen = 0;
  }
}
function atualizaVisitados(id) {
  if(api==null &&(api=getAPIHandle())==null) return;
  var x,y,num,novo='-',sd=api.LMSGetValue('cmi.suspend_data');
  if((num=sd.indexOf('visitados'))<0) visitados='';
  else {
    num+=10; // posiciona na data, após o separador
    x=sd.indexOf('&',num);
    y=sd.indexOf('-',num);
    if(y<0) y=num;
    else if(id<=0) idAtual=parseInt(sd.substring(num,y),10);
    visitados=sd.substring(y,(x<0?sd.length:x));
  }
  for(num=1; num<=limite+1; num++)
    novo+=(num==id?'1':(num<visitados.length?visitados.charAt(num):'0'));
  visitados=novo;
  if(id>0) {
    idAtual=id;
    num=sd.indexOf('visitados');
    if(num<0) sd+=(sd==''?'':'&')+'visitados='+id+visitados;
    else {
      num+=10; // posiciona após o separador
      x=sd.indexOf('&',num);
      sd=sd.substring(0,num)+id+visitados+(x>=0?sd.substring(x):'');
    }
    api.LMSSetValue('cmi.suspend_data',sd);
    api.LMSCommit('');
  }
}
function winResize() {
  var x, objs, w=$(window).width(), h=$(window).height();
  if(largura!=w || altura!=h) {
    largura = w;
    altura = h;
    $('#content').css({'height':(altura-22)+'px',
     'width':(largura-($('#menu').hasClass('invisivel')? 20:250))+'px'});
    $('#conteudo').css('height',(altura >=205 ? altura-105:100)+'px');
    $('#menu').css('height',(altura-22)+'px');
    objs=$('#menu, #conteudoScroll');
    for(x=objs.length-1; x>=0; x--) {
     try { $(objs[x]).perfectScrollbar('update'); } catch(err) {}
    }
  }
}
function atualizaFontes() {
  $('#conteudo h1,#conteudo h1 i').css('font-size', tamTituloH1);
  $('#conteudo .tabela td, #conteudo .tabela th').css('font-size', tamFonte);
  $('#conteudo h2, .enunciado').css('font-size', tamTituloH2);
  $('#conteudo h3, #conteudo p, #conteudo b, #conteudo strong, #conteudo li, #conteudo em, #caixaAlternativas label').css('font-size', tamFonte);
  $('.legenda, .legenda i').css('font-size', tamLegenda);
}
function applyKey(ev) {
  var val = ev.keyCode;
  if(val==27) {
    if(overlayDlg!=null) {
      overlayDlg.hide();
      overlayDlg=null;
    }
  } else if(val>=37 && val<=40 // 37 || 38 <-, 39 || 40 ->
   && !$.fancybox.isOpened && document.activeElement.tagName!='INPUT') {
    go(idAtual+(val>=39 ? 1:-1));
    if(ev.preventDefault) {
      ev.preventDefault();
      ev.stopPropagation();
    } else { // IE8-
      ev.cancelBubble = true;
      ev.returnValue = false;
    }
  }
}
function go(id) { // carrega a nova página
  if(id > 0 && id <= limite) {
    var obj=document.getElementById('conteudo');
    obj.innerHTML='';
    obj.style.left=largura+'px';
    $('#content').addClass('loading');
    $('.setaRight, .setaLeft').css('display','none');
    setTimeout(function() { // o timeout espera a página ir para a direita
     $.ajax({url:'pagina'+id+'.html',
      error:function(xhr, ajaxOptions, thrownError) {
       gone(id,'<h1>Erro '+xhr.status+': '+thrownError+'<\/h1>\n'
        +'<p>pagina'+id+'.html n&atilde;o encontrada.<\/p>\n');
      },
      success:function(data) {
       gone(id,'<section id="conteudoScroll">'+data+'<\/section>');
       bindPlugins();
       try {
         $('#conteudoScroll').perfectScrollbar({ wheelSpeed:5, wheelPropagation:false,
          suppressScrollX:true });
       } catch(err) {
       }
       atualizaVisitados(id);
      }
     });
    },400);
  }
}
function gone(id,htm) {
  document.getElementById('contadorTela').innerHTML = id+'/'+limite;
  document.getElementById('conteudo').style.left='0px';
  $('#content').removeClass('loading');
  $('#conteudo').html(htm); // o jQuery também processa os javascripts inline
  var lnk=$('a[href="javascript:go('+id+')"]');
  lnk.addClass('visitado');
  if(!lnk.parent().hasClass('mtree-active')) { // não foi pelo click do link
    $('.mtree-active').removeClass('mtree-active');
    lnk.parent().addClass('mtree-active'); // marca o item de menu
    if(lnk.parent().parent().parent().hasClass('mtree-closed')) { // expande o pai
      lnk.parent().parent().parent().removeClass('mtree-closed').addClass('mtree-open');
      lnk.parent().parent().css({'display':'block','height':'auto'});
    }
    lnk.parent().get(0).scrollIntoView(false);
  }
  if(id==limite) $('.setaRight').css({'display':'block','opacity':0.25,'cursor':'default'});
  else $('.setaRight').css({'display':'block','opacity':1,'cursor':'pointer'});
  if(id==1) $('.setaLeft').css({'display':'block','opacity':0.25,'cursor':'default'});
  else $('.setaLeft').css({'display':'block','opacity':1,'cursor':'pointer'});
  $('#ajuda').attr('src','../../images/icone_ajuda'
   +($('body').hasClass('altoContraste')?'_contraste':'')+'.png');
  if(tamFonte != 13)
    atualizaFontes();
  $('#ajuda').removeClass('ajudaAtivado').addClass('ajudaDesativado');
}
function bindPlugins() { // pode ser usado nos popups
  // cria os popups de imagens
  var x,objs=$('.fancybox');
  if(objs.length>0)
    objs.fancybox();
  // cria os flip books
  objs=$('.magazine');
  if(objs.length>0) {
    objs.turn({ autoCenter:false, display:'double', acceleration:true,
     gradients: !$.isTouch, elevation:50, when:{ turned: function(e,page,pageObj) {} }
    });
  }
  // cria as sanfonas
  objs=document.querySelectorAll('div.acd > h3');
  for(x=objs.length-1; x>=0; x--)
    AddEvent(objs[x],'click',toggleAccordion);
  // cria as abas
  objs=document.querySelectorAll('.tabs');
  for(x=objs.length-1; x>=0; x--)
    new CBPFWTabs(objs[x]);
  // cria os textos sobre imagem
  objs=document.getElementById('conteudoScroll')|| document.getElementById('conteudo')|| document;
  objs=objs.querySelectorAll('.txtOverImg');
  for(x=objs.length-1; x>=0; x--) {
    AddEvent(objs[x],'load',function(ev){
     var eu=$(this);
     eu.capty({ animation:'fade', height:eu.height()+5, opacity:0.8, speed:200 });
    });
  }
  // cria animações em flash
  $('div[id^=flash_]').each(function() {
   var eu=$(this);
   eu.html(flash(eu.html(),'',parseInt(eu.css('width'),10),parseInt(eu.css('height'),10)));
  });
  // cria o zoom das imagens
  objs=$('.zoom');
  if(objs.length>0)
    objs.zoom();
  // cria players de video
  $('a[id^=video_]').each(function() {
   $f($(this).attr('id'),'../../lib/flowplayer/flowplayer.swf',{
    clip:{autoPlay:false,autoBuffering:true}
   });
  });
  // cria playlists de video
  $('a[id^=videos_]').each(function() {
   var eu=$(this), id=eu.attr('id').substring(7);
   $f(eu.attr('id'),'../../lib/flowplayer/flowplayer.swf',{
    clip:{autoPlay:false,autoBuffering:true},
    plugins:{controls:{url:'../../lib/flowplayer/flowplayer.controls.swf'}}
   }).playlist('#playlist_'+id);
  });
  // cria as animações inline da Unity3D
  $('.unity_obj').each(function() {
   var unity_file=this.innerHTML, bc=this.style.backgroundColor;
   if(bc==null||bc=='') bc='314D79';
   else if(bc[0]=='#') bc=bc.substring(1);
   else if(bc.indexOf('rgb')==0) {
     bc=bc.substring(bc.indexOf('(')+1,bc.lastIndexOf(')'));
     bc=parseInt(bc.substring(0,bc.indexOf(',')).trim(),10).toString(16)
      +parseInt(bc.substring(bc.indexOf(',')+1,bc.lastIndexOf(',')).trim(),10).toString(16)
      +parseInt(bc.substring(bc.lastIndexOf(',')+1).trim(),10).toString(16);
   }
   this.innerHTML='<div class="missing">\n'
    +'  <a href="javascript:unityObj.installPlugin()" title="Instalar o Unity Web Player agora!">\n'
    +'    <img alt="Instalar o Unity Web Player agora!" src="http://webplayer.unity3d.com/installation/getunity.png" width="193" height="63">\n'
    +'  <\/a>\n'
    +'<\/div>\n';
   try {
     unityObj=new UnityObject2({width:'100%',height:'100%',
      params:{backgroundcolor:bc,bordercolor:bc,textcolor:'FFFFFF',logoimage:'../../images/logo.png',
      disableContextMenu:true,disableExternalCall:false,disableFullscreen:false}});
     unityObj.observeProgress(function(progress) {
      switch(progress.pluginStatus) {
       case "missing": break;
       case "broken": alert("Você deve reiniciar o navegador após a instalação"); break;
       case "installed": break;
       case "first": break;
      }
     });
     unityObj.initPlugin(this,unity_file);
   } catch(e) {
   }
  });
  // cria as animações SCORM em popup Unity3D e HTML sem o desempenho
  $('[id^=scorm_ativ_]').each(function() {
   this.innerHTML='<table class="ativ_wrapper" cellspacing="0" cellpadding="0">\n'
    +'<tr>\n'
    +'  <td class="ativ_tit">'+this.title+'<\/td>\n'
    +'  <td class="desemp_tit">progresso<\/td>\n'
    +'<\/tr>\n'
    +'<tr>\n'
    +'  <td class="ativ_conteudo">'+this.innerHTML+'<\/td>\n'
    +'  <td id="'+this.id.replace('_ativ_','_sinal_')+'" class="desemp_0"><img src="../../images/lightbox-ico-loading.gif" alt="Carregando..."><\/td>\n'
    +'<\/tr>\n'
    +'<\/table>\n';
  });
  // coloca o desempenho das animações SCORM em popup Unity3D e HTML
  if(typeof api!='undefined') // if para os popups que não usam SCORM
    masteryScore=parseFloat(api.LMSGetValue('cmi.student_data.mastery_score'));
  if(isNaN(masteryScore)||masteryScore==0) masteryScore=70;
  $('[id^=scorm_sinal_]').each(function() { scorm_ativ_reload_desemp(this); });
  // cria os jogos
  $('[id^=layer_jogo]').each(function() {
   var id=$(this).attr('id').substring(10);
   var x=id.indexOf('_');
   var uc=id.substring(0,x);
   id=id.substring(x+1);
   x=id.indexOf('_');
   var ue=id.substring(0,x);
   id=id.substring(x+1);
   x=id.indexOf('_');
   var id_jogo=id.substring(0,x);
   var tipo_jogo=id.substring(x+1);
   ludo_reload($(this).attr('id'),uc,ue,id_jogo,tipo_jogo,ludos_tipo_scorm);
  });
  // cria os portfólios
  $('[id^=layer_portf]').each(function() {
   var id=$(this).attr('id').substring(11);
   var x=id.indexOf('_');
   var uc=id.substring(0,x);
   id=id.substring(x+1);
   x=id.indexOf('_');
   var ue=id.substring(0,x);
   var enunc=id.substring(x+1);
   portfolio_reload($(this).attr('id'),uc,ue,enunc,ludos_pasta);
  });
  // cria os hints
  objs=document.querySelectorAll('[id^=bt_hint]');
  for(x=objs.length-1; x>=0; x--)
    AddEvent(objs[x],'click',hintClick);
}
function toggleAccordion() {
  var h, eu=$(this), tavaFechado=!eu.hasClass('opened');
  eu.parent().find('> h3.opened').each(function() {
   var ele=$(this);
   if(this.addEventListener) {
     h=ele.next().height();
     ele.next().css('height',h+'px');
     setTimeout(function(){
      ele.next().css('height','0px');
      setTimeout(function(){ ele.removeClass('opened'); },510);
     },10);
   } else { // IE8-
     ele.removeClass('opened').next().css({'height':'0px','visibility':'hidden'});
   }
  });
  this.scrollIntoView();
  if(tavaFechado) {
    if(this.addEventListener) {
      eu.addClass('opening').next().css('height','auto');
      h=eu.next().height();
      eu.next().css('height','0px');
      setTimeout(function(){
       eu.addClass('opened').removeClass('opening');
       eu.next().css('height',h+'px');
       setTimeout(function(){ eu.next().css('height','auto'); },510);
      },10);
    } else { // IE8-
      eu.addClass('opened').next().css({'height':'auto','visibility':'visible'});
    }
  }
}
function hintClick() {
  var cfg={modal:true,titleClass:'anim warning'};
  var obj2=document.getElementById(this.id.substring(3));
  if(obj2.title) cfg.title=obj2.title;
  overlayDlg=new Messi(obj2.innerHTML,cfg);
}
// funções para integração SCORM com unity ou HTML
function scorm_ativ_reload_desemp(obj) {
  var x, nota='-', maior=0, id=obj.id.substring(12);
  var num=api.LMSGetValue('cmi.objectives._count');
  if((x=parseInt(api.LMSGetLastError(),10))>0) nota='Erro '+x;
  else {
    var re = new RegExp(id,"i");
    for(x=0; x<num; x++) {
      if(re.test(api.LMSGetValue('cmi.objectives.'+x+'.id')))
        break;
    }
    if(x<num && !isNaN(x=parseInt(api.LMSGetValue('cmi.objectives.'+x+'.score.raw'),10))) {
      nota=x;
      if(nota>=masteryScore) maior=3;
      else if(nota>=masteryScore*0.7) maior=2;
      else maior=1;
    }
  }
  obj.innerHTML=nota;
  obj.className='desemp_'+maior;
  if(maior>0 && $(document.getElementById(obj.id.replace('_sinal_','_ativ_'))).data('report')!=false) {
    obj.title='Relatório';
    obj.style.cursor='pointer';
    AddEvent(obj,'click',scorm_ativ_relatorio);
  }
}
function scorm_ativ_pos(id) {
  if((api=getAPIHandle())==null) return -1;
  var x,num=parseInt(api.LMSGetValue('cmi.objectives._count'),10);
  if(parseInt(api.LMSGetLastError(),10)>0) return -1;
  var re = new RegExp(id,"i");
  for(x=0; x<num; x++) {
    if(re.test(api.LMSGetValue('cmi.objectives.'+x+'.id')))
      return x;
  }
  return x;
}
function scorm_ativ_fecha(msg) {
  try {
    window.close();
  } catch(e) {
    alert('Erro ao fechar a janela, feche manualmente');
  }
}
function scorm_ativ_relatorio() {
  var htm=api.LMSGetValue('cmi.comments');
  var params={win_name:'scorm_relatorio',w:(top.screen.width<1152 ? top.screen.width-10:1142)};
  popup('about:blank',params);
  if(params['win']==null) alert('Erro: popup do relatório bloqueado');
  else {
    params['win'].document.open();
    params['win'].document.write('<!DOCTYPE html>\n'
     +'<html lang="pt-br">\n'
     +'<head>\n'
     +'  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">\n'
     +'  <title>Relatório de Scorm<\/title>\n'
     +'<\/head>\n'
     +'<body>\n'+htm+'<\/body>\n'
     +'<\/html>\n');
    params['win'].document.close();
  }
}
function scorm_ativ_salva(vet) {
  if(isNaN(vet['score'])) return false;
  var dt=new Date();
  var timeDiff=(dt.getTime()-startDate)/1000; // diferença de tempo em segundos
  var tmp_seg=Math.round(timeDiff % 60);
  timeDiff=Math.floor(timeDiff / 60); // remove os segundos da data
  var tmp_min=Math.round(timeDiff % 60);
  timeDiff=Math.floor(timeDiff / 60); // remove os minutos da data
  var tmp_hours=Math.round(timeDiff % 24);
  vet['session_time']=(tmp_hours<10?'0':'')+tmp_hours+':'+(tmp_min<10?0:'')+tmp_min+':'
   +(tmp_seg<10?0:'')+tmp_seg;
  var num_objective=scorm_ativ_pos(vet['id']);

  masteryScore=parseFloat(api.LMSGetValue('cmi.student_data.mastery_score'));
  if(isNaN(masteryScore)||masteryScore==0) masteryScore=70;
  vet['data']=(dt.getDate()<10?0:'')+dt.getDate()+'/'+(dt.getMonth()<9?0:'')
   +(dt.getMonth()+1)+'/'+dt.getFullYear(); // usado no relatório
  vet['hora']=(dt.getHours()<10?'0':'')+dt.getHours()+':'+(dt.getMinutes()<10?0:'')
   +dt.getMinutes()+':'+(dt.getSeconds()<10?0:'')+dt.getSeconds();
  api.LMSSetValue('cmi.core.score.raw',vet['score'].toFixed(2)); // esta é a nota da UC
  api.LMSSetValue('cmi.core.session_time',vet['session_time']);
  api.LMSSetValue('cmi.objectives.'+num_objective+'.id',vet['id']);
  api.LMSSetValue('cmi.objectives.'+num_objective+'.score.raw',vet['score'].toFixed(2)); // nota da atividade
  api.LMSSetValue('cmi.objectives.'+num_objective+'.status',(vet['score']< masteryScore ?'failed':'passed'));
  api.LMSSetValue('cmi.interactions.'+num_objective+'.id',vet['id']);
  api.LMSSetValue('cmi.interactions.'+num_objective+'.objectives.0.id',vet['id']);
  api.LMSSetValue('cmi.interactions.'+num_objective+'.time',vet['hora']);
  api.LMSSetValue('cmi.interactions.'+num_objective+'.type','performance');
  api.LMSSetValue('cmi.interactions.'+num_objective+'.result',(vet['score']< masteryScore ?'wrong':'correct'));
  api.LMSSetValue('cmi.interactions.'+num_objective+'.latency',vet['session_time']);
  if(typeof vet['commit']=='undefined'||vet['commit'])
    api.LMSCommit(''); // o LMSFinish tranca as outras atividades
  return true;
}
