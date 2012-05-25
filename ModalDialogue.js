define(["require","util"],function(a,b){function i(a){if(typeof a=="object"&&!(a instanceof Array)){if(!a.title||!a.body)return!1;if(a.isWizardDialogue){if(!a.buttons)return!1;if(!a.buttons.next&&!a.buttons.prev&&!a.buttons.close)return!1}if(a.form)if(!a.form.name||!a.form.inputs)return!1;return!0}}b.registerStylesheet(a.toUrl("./ModalDialogue.css")),b.Browser.isMobile()&&b.registerStylesheet(a.toUrl("./ModalDialogue.mobile.css"));var c=document.getElementById("ModalDialogueOverlay")?document.getElementById("ModalDialogueOverlay"):b.createElement({tag:"div",id:"ModalDialogueOverlay",appendTo:document.body}),d=null,e,f=b.Browser.HasSupport.cssTransitions(),g,h,j=function(a){var c=this;this.MDD=a;if(i(a)){var d=this.dialogue=b.createElement({tag:"div",id:a.customId||"ModalDialogue",customClass:"visible"});a.errorDialogue==1&&d.addClass("error"),a.alignment&&/^(center|right|justify)$/.test(a.alignment)&&d.addClass(a.alignment);var e=b.createElement({tag:"h1",inner:a.title,appendTo:d});return this.createBody(a.body),a.form&&this.createForm(a.form),a.buttons&&this.createButtons(a.buttons,a),a.customClass&&d.addClass(a.customClass),d}throw b.error("Invalid Modal Dialogue Definiion.","MDD_ERR")};j.prototype.createBody=function(a){var b=this;a instanceof Array||(a=[a]),a.forEach(function(a){typeof a=="object"&&a instanceof Element?b.dialogue.appendChild(a):typeof a=="string"&&(/\<.+\>.*\<.+\>/.test(a)||(a="<p>"+a+"</p>"),b.dialogue.innerHTML+=a)})},j.prototype.createForm=function(c){var d=b.createElement({tag:"form",appendTo:this.dialogue,setAttributes:{name:c.name,method:"post"}}),e=[];c.inputs.forEach(function(f,g){if(f.title)var h=b.createElement({tag:"label",inner:f.title});if(f.type&&f.type=="select"){var i=b.createElement({tag:"select",setAttributes:{name:f.name}});f.options.forEach(function(a){var c=b.createElement({tag:"option",inner:a,appendTo:i,setAttributes:{value:a}});f.placeholder&&a==f.placeholder&&c.setAttribute("selected","selected")})}else if(f.type&&f.type=="button"&&typeof f.callback=="function"){var i=b.createElement({tag:"button",inner:f.name});b.addListener(i,"click",f.callback)}else{var i=b.createElement({tag:"input",setAttributes:{name:f.name||c.name+"-"+g,type:f.type||"text"}});f.type=="checkbox"&&(i.checked=f.checked||!1)}f.placeholder&&f.type!=="select"&&("placeholder"in i?i.setAttribute("placeholder",f.placeholder):a(["UI/Widget/Placeholder/Placeholder"],function(a){new a(i,f.placeholder)})),h?(h.appendChild(i),d.appendChild(h)):d.appendChild(i),e.push(i),c.callback&&b.addListener(i,"keyup",function(a){a.keyCode===13&&c.callback.call(l,e)})}),typeof c.callback=="function"&&(this.MDD.buttons=this.MDD.buttons||{},this.MDD.buttons[c.buttonName||"Submit"]=function(){c.callback.call(l,e)}),this.dialogue.appendChild(d)};var k=function(a,c,d){var e=b.createElement({tag:"button",inner:a});return b.addListener(e,"click",function(a,b){return function(c){a.call(b||l,c)}}(c,d)),e};j.prototype.createButtons=function(a,c){var c=c instanceof Element?c:b.createElement({tag:"div",customClass:"buttons",appendTo:this.dialogue});for(var d in a){var e,f,g=this;typeof a[d]=="function"?(e=d,f=a[d]):typeof a[d]=="object"?(e=a[d].title||a[d].name,f=a[d].callback):typeof a[d]=="boolean"&&/close/i.test(d)&&(e="Close",f=function(){l.close()});var h=typeof a[d].context=="object"?a[d].context:l,i=k(e,f,h);i&&c.appendChild(i)}};var l={};return l.createSingle=function(a){g=a.animate&&typeof a.animate.animateIn!="undefined"?a.animate.animateIn:null,h=a.animate&&typeof a.animate.animateOut!="undefined"?a.animate.animateOut:null;var b=new j(a);this.open(b)},l.createWizard=function(a,b){var e=0;g=b&&typeof b.animateIn!="undefined"?b.animateIn:null,h=b&&typeof b.animateOut!="undefined"?b.animateOut:null,a.forEach(function(b,f){if(b.buttons)for(var g in b.buttons){if(!/(prev|next)/i.test(g)||typeof b.buttons[g]!="boolean")continue;b.buttons[g]={name:g=="prev"?"Previous":"Next",callback:function(b){return function(){d.removeNode(!0),e=b=="prev"?e-1:e+1,d=a[e],c.appendChild(d)}}(g)}}a[f]=new j(b)}),this.open(a[0])},l.createMultiView=function(a){if(typeof a!="object")return!1;g=a.animate&&typeof a.animate.animateIn!="undefined"?a.animate.animateIn:null,h=a.animate&&typeof a.animate.animateOut!="undefined"?a.animate.animateOut:null;var c=function(a,c,d,e){var f=b.createElement({tag:"li",inner:a,setAttributes:{"data-viewIndex":c}});return b.addListener(f,"click",function(){return function(){d.call(d||window,c)}}()),c===0&&f.addClass("active"),f},d=function(a){k[s].removeClass("active"),s=a,k[s].addClass("active"),o.removeNode(!0),o=r[a],n.appendChild(o)},e,f,k=[],m,n,o,p,q,r=[],s=0,t=this;e=b.createElement({tag:"div",id:"ModalDialogue",customClass:"sidebar"}),f=b.createElement({tag:"div",customClass:"navigation",appendTo:e}),n=b.createElement({tag:"div",customClass:"views",appendTo:e}),typeof a.title=="string"&&(p=b.createElement({tag:"h1",inner:a.title,appendTo:f})),m=b.createElement({tag:"ol",appendTo:f}),typeof a.buttons=="object"&&(q=b.createElement({tag:"div",customClass:"buttons",appendTo:n}),j.prototype.createButtons(a.buttons,q));if(a.views instanceof Array)return a.views.forEach(function(a,e){if(!i(a))throw b.error("Invalid MDD - "+e);a.buttons&&delete a.buttons,a.form&&a.form.callback&&delete a.form.callback,a.customId="ModalView"+(e+1),a.customClass="view",r.push(new j(a));var f=c(a.navTitle||a.title,e,d,l);k.push(f),m.appendChild(f)}),o=r[0],n.appendChild(o),this.open(e,a.animate&&a.animate.animateIn),e;throw b.error("The MutiView Definition does not have any views.")},l.close=function(){f&&h?(new e(c,"fadeOut",.5),new e(d,h,.5,function(){d.removeNode(!0),c.removeClass("visible")})):(d.removeNode(!0),c.removeClass("visible"))},l.open=function(b){c.removeChildren(),d=b;if(f&&g){var h=function(a){a&&(e=a),c.appendChild(b),c.addClass("visible"),new e(c,"fadeIn",.5),new e(b,g,.5)};e?h():a(["UI/Animator/Animator"],h)}else c.appendChild(b),c.addClass("visible")},l})