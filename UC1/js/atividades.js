var msgPreenchaTodasLacunas = "Preencha corretamente as lacunas, para finalizar esta atividade.";
var msgParabens = "Resposta correta!";
var msgError = "Resposta incorreta. Retorne ao estudo deste conte&uacute;do e refa&ccedil;a o exerc&iacute;cio.";
var msgSelecioneUmaOpcao = "Selecione uma op&ccedil;&atilde;o.";
var msgMarqueTodasAsAlternativas = "Marque todas as alternativas corretas para finalizar essa atividade.";
var msgSselecionouAlternativaErrada = "Selecione corretamente todos os campos, para finalizar esta atividade.";
var msgParabensFinal = msgParabens+" Acesse o menu de t&oacute;picos do curso e inicie a pr&oacute;xima etapa de estudo.";

function getColorTexto() {
  return($('body').hasClass('altoContraste')?'#FFF':'#000');
}
function validaPreencher(formulario, msgFinal) {
  var ok = true;
  if(camposVazios(formulario)) {
    overlay('Aten&ccedil;&atilde;o!',msgPreenchaTodasLacunas);
    return;
  }
  var color=getColorTexto();
  for(var i=0; i < formulario.length; i++) {
    var controle = formulario.elements[i];
    var objeto = document.getElementById('label'+i);
    if(i != [ formulario.length - 1 ]) {
      if(controle.id.toLowerCase() != controle.value.toLowerCase()) {
        objeto.style.color='red';
        $('#label'+i+' i').css('color','red');
        ok = false;
      } else {
        objeto.style.color = color;
        $('#label'+i+' i').css('color',color);
      }
    }
  }
  if(ok) overlay('Parab&eacute;ns!',(msgFinal ? msgParabensFinal:msgParabens));
  else overlay('Ops!',msgError);
}
function validaObjetiva(formulario, correta, msgFinal) {
  var ok = true;
  if(!tudoChecado(formulario)) {
    overlay('Aten&ccedil;&atilde;o!',msgSelecioneUmaOpcao);
    return;
  }
  var color=getColorTexto();
  for(var i=0; i < formulario.length; i++) {
    var controle = formulario.elements[i];
    var objeto = document.getElementById('label'+i);
    if(i != [ formulario.length - 1 ]) {
      if(controle.checked) {
        if(controle.id != correta) {
          objeto.style.color = "red";
          $('#label'+i+' i').css('color','red');
          $('#label'+i+' b').css('color','red');
          ok = false;
        }
      } else {
        objeto.style.color = color;
        $('#label'+i+' i').css('color',color);
      }
    }
  }
  if(ok) overlay('Parab&eacute;ns!',(msgFinal ? msgParabensFinal:msgParabens));
  else overlay('Ops!',msgError);
}
function validaBox(formulario, msgFinal) {
  var ok=true;
  if(boxVazias(formulario)) {
    overlay('Aten&ccedil;&atilde;o!',msgSselecionouAlternativaErrada);
    return;
  }
  var color=getColorTexto();
  for(var i=0; i < formulario.length; i++) {
    var controle = formulario.elements[i];
    var objeto = document.getElementById('label'+i);
    if(i != [ formulario.length - 1 ]) {
      if(controle.id.toLowerCase() != controle.value.toLowerCase()) {
        objeto.style.color = 'red';
        ok = false;
      } else {
        objeto.style.color = color;
      }
    }
  }
  if(ok) overlay('Parab&eacute;ns!',(msgFinal ? msgParabensFinal:msgParabens));
  else overlay('Ops!',msgError);
}
function validaMultipla(formulario, nAlternativas, msgFinal) {
  var ok=true, alternativas=0, color=getColorTexto();
  for(var i=0; i < formulario.length; i++) {
    var controle = formulario.elements[i];
    var objeto = document.getElementById('label'+i);
    if(i != [ formulario.length - 1 ]) {
      if(controle.checked) {
        if(controle.value=='false') {
          objeto.style.color='red';
          $('#label'+i+' i').css('color','red');
          ok = false;
        } else {
          alternativas++;
        }
      } else {
        objeto.style.color = color;
        $('#label'+i+' i').css('color',color);
      }
    }
  }
  if(ok) {
    if(alternativas == nAlternativas) {
      overlay('Parab&eacute;ns!',(msgFinal ? msgParabensFinal:msgParabens));
    } else {
      overlay('Aten&ccedil;&atilde;o!',msgMarqueTodasAsAlternativas);
    }
  } else {
    overlay('Ops!',msgError);
  }
}
function tudoChecado(formulario) {
  var checados = false;
  for(var i=0; i < formulario.length; i++) {
    var controle = formulario.elements[i];
    if(i != [ formulario.length - 1 ]) {
      if(controle.checked)
        checados = true;
    }
  }
  return checados;
}
function camposVazios(formulario) {
  var vazio = false;
  for(var i=0; i < formulario.length; i++) {
    var controle = formulario.elements[i];
    if(i != [ formulario.length - 1 ]) {
      if(controle.value=="")
        vazio = true;
    }
  }
  return vazio;
}
function boxVazias(formulario) {
  var checados = false;
  var check = 'selecione';
  for(var i=0; i < formulario.length; i++) {
    var controle = formulario.elements[i];
    var objeto = document.getElementById('label'+i);
    if(i != [ formulario.length - 1 ]) {
      if(controle.value.toLowerCase()== check.toLowerCase())
        checados = true;
    }
  }
  return checados;
}
