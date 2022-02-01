/**
 * Typescript-GrabCut
 * Author: EatMyGoose
 * Github: https://github.com/EatMyGoose/Typescript-GrabCut
 * Modified by Haskasu
 * Github: https://github.com/haskasu/Typescript-GrabCut
 */
var workerScope = self;
/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.6 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
var requirejs,require,define;!function(global,setTimeout){var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version="2.3.6",commentRegExp=/\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,isBrowser=!("undefined"==typeof window||"undefined"==typeof navigator||!window.document),isWebWorker=!isBrowser&&"undefined"!=typeof importScripts,readyRegExp=isBrowser&&"PLAYSTATION 3"===navigator.platform?/^complete$/:/^(complete|loaded)$/,defContextName="_",isOpera="undefined"!=typeof opera&&"[object Opera]"===opera.toString(),contexts={},cfg={},globalDefQueue=[],useInteractive=!1;function commentReplace(e,t){return t||""}function isFunction(e){return"[object Function]"===ostring.call(e)}function isArray(e){return"[object Array]"===ostring.call(e)}function each(e,t){var i;if(e)for(i=0;i<e.length&&(!e[i]||!t(e[i],i,e));i+=1);}function eachReverse(e,t){var i;if(e)for(i=e.length-1;-1<i&&(!e[i]||!t(e[i],i,e));i-=1);}function hasProp(e,t){return hasOwn.call(e,t)}function getOwn(e,t){return hasProp(e,t)&&e[t]}function eachProp(e,t){var i;for(i in e)if(hasProp(e,i)&&t(e[i],i))break}function mixin(i,e,r,n){return e&&eachProp(e,function(e,t){!r&&hasProp(i,t)||(!n||"object"!=typeof e||!e||isArray(e)||isFunction(e)||e instanceof RegExp?i[t]=e:(i[t]||(i[t]={}),mixin(i[t],e,r,n)))}),i}function bind(e,t){return function(){return t.apply(e,arguments)}}function scripts(){return document.getElementsByTagName("script")}function defaultOnError(e){throw e}function getGlobal(e){if(!e)return e;var t=global;return each(e.split("."),function(e){t=t[e]}),t}function makeError(e,t,i,r){var n=new Error(t+"\nhttps://requirejs.org/docs/errors.html#"+e);return n.requireType=e,n.requireModules=r,i&&(n.originalError=i),n}if(void 0===define){if(void 0!==requirejs){if(isFunction(requirejs))return;cfg=requirejs,requirejs=void 0}void 0===require||isFunction(require)||(cfg=require,require=void 0),req=requirejs=function(e,t,i,r){var n,o,a=defContextName;return isArray(e)||"string"==typeof e||(o=e,isArray(t)?(e=t,t=i,i=r):e=[]),o&&o.context&&(a=o.context),(n=getOwn(contexts,a))||(n=contexts[a]=req.s.newContext(a)),o&&n.configure(o),n.require(e,t,i)},req.config=function(e){return req(e)},req.nextTick=void 0!==setTimeout?function(e){setTimeout(e,4)}:function(e){e()},require||(require=req),req.version=version,req.jsExtRegExp=/^\/|:|\?|\.js$/,req.isBrowser=isBrowser,s=req.s={contexts:contexts,newContext:newContext},req({}),each(["toUrl","undef","defined","specified"],function(t){req[t]=function(){var e=contexts[defContextName];return e.require[t].apply(e,arguments)}}),isBrowser&&(head=s.head=document.getElementsByTagName("head")[0],baseElement=document.getElementsByTagName("base")[0],baseElement&&(head=s.head=baseElement.parentNode)),req.onError=defaultOnError,req.createNode=function(e,t,i){var r=e.xhtml?document.createElementNS("http://www.w3.org/1999/xhtml","html:script"):document.createElement("script");return r.type=e.scriptType||"text/javascript",r.charset="utf-8",r.async=!0,r},req.load=function(t,i,r){var e,n=t&&t.config||{};if(isBrowser)return(e=req.createNode(n,i,r)).setAttribute("data-requirecontext",t.contextName),e.setAttribute("data-requiremodule",i),!e.attachEvent||e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0||isOpera?(e.addEventListener("load",t.onScriptLoad,!1),e.addEventListener("error",t.onScriptError,!1)):(useInteractive=!0,e.attachEvent("onreadystatechange",t.onScriptLoad)),e.src=r,n.onNodeCreated&&n.onNodeCreated(e,n,i,r),currentlyAddingScript=e,baseElement?head.insertBefore(e,baseElement):head.appendChild(e),currentlyAddingScript=null,e;if(isWebWorker)try{setTimeout(function(){},0),importScripts(r),t.completeLoad(i)}catch(e){t.onError(makeError("importscripts","importScripts failed for "+i+" at "+r,e,[i]))}},isBrowser&&!cfg.skipDataMain&&eachReverse(scripts(),function(e){if(head||(head=e.parentNode),dataMain=e.getAttribute("data-main"))return mainScript=dataMain,cfg.baseUrl||-1!==mainScript.indexOf("!")||(mainScript=(src=mainScript.split("/")).pop(),subPath=src.length?src.join("/")+"/":"./",cfg.baseUrl=subPath),mainScript=mainScript.replace(jsSuffixRegExp,""),req.jsExtRegExp.test(mainScript)&&(mainScript=dataMain),cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript],!0}),define=function(e,i,t){var r,n;"string"!=typeof e&&(t=i,i=e,e=null),isArray(i)||(t=i,i=null),!i&&isFunction(t)&&(i=[],t.length&&(t.toString().replace(commentRegExp,commentReplace).replace(cjsRequireRegExp,function(e,t){i.push(t)}),i=(1===t.length?["require"]:["require","exports","module"]).concat(i))),useInteractive&&(r=currentlyAddingScript||getInteractiveScript())&&(e||(e=r.getAttribute("data-requiremodule")),n=contexts[r.getAttribute("data-requirecontext")]),n?(n.defQueue.push([e,i,t]),n.defQueueMap[e]=!0):globalDefQueue.push([e,i,t])},define.amd={jQuery:!0},req.exec=function(text){return eval(text)},req(cfg)}function newContext(u){var i,e,l,c,d,g={waitSeconds:7,baseUrl:"./",paths:{},bundles:{},pkgs:{},shim:{},config:{}},p={},f={},r={},h=[],m={},n={},v={},x=1,b=1;function q(e,t,i){var r,n,o,a,s,u,c,d,p,f,l=t&&t.split("/"),h=g.map,m=h&&h["*"];if(e&&(u=(e=e.split("/")).length-1,g.nodeIdCompat&&jsSuffixRegExp.test(e[u])&&(e[u]=e[u].replace(jsSuffixRegExp,"")),"."===e[0].charAt(0)&&l&&(e=l.slice(0,l.length-1).concat(e)),function(e){var t,i;for(t=0;t<e.length;t++)if("."===(i=e[t]))e.splice(t,1),t-=1;else if(".."===i){if(0===t||1===t&&".."===e[2]||".."===e[t-1])continue;0<t&&(e.splice(t-1,2),t-=2)}}(e),e=e.join("/")),i&&h&&(l||m)){e:for(o=(n=e.split("/")).length;0<o;o-=1){if(s=n.slice(0,o).join("/"),l)for(a=l.length;0<a;a-=1)if((r=getOwn(h,l.slice(0,a).join("/")))&&(r=getOwn(r,s))){c=r,d=o;break e}!p&&m&&getOwn(m,s)&&(p=getOwn(m,s),f=o)}!c&&p&&(c=p,d=f),c&&(n.splice(0,d,c),e=n.join("/"))}return getOwn(g.pkgs,e)||e}function E(t){isBrowser&&each(scripts(),function(e){if(e.getAttribute("data-requiremodule")===t&&e.getAttribute("data-requirecontext")===l.contextName)return e.parentNode.removeChild(e),!0})}function w(e){var t=getOwn(g.paths,e);if(t&&isArray(t)&&1<t.length)return t.shift(),l.require.undef(e),l.makeRequire(null,{skipMap:!0})([e]),!0}function y(e){var t,i=e?e.indexOf("!"):-1;return-1<i&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function S(e,t,i,r){var n,o,a,s,u=null,c=t?t.name:null,d=e,p=!0,f="";return e||(p=!1,e="_@r"+(x+=1)),u=(s=y(e))[0],e=s[1],u&&(u=q(u,c,r),o=getOwn(m,u)),e&&(u?f=i?e:o&&o.normalize?o.normalize(e,function(e){return q(e,c,r)}):-1===e.indexOf("!")?q(e,c,r):e:(u=(s=y(f=q(e,c,r)))[0],f=s[1],i=!0,n=l.nameToUrl(f))),{prefix:u,name:f,parentMap:t,unnormalized:!!(a=!u||o||i?"":"_unnormalized"+(b+=1)),url:n,originalName:d,isDefine:p,id:(u?u+"!"+f:f)+a}}function k(e){var t=e.id,i=getOwn(p,t);return i||(i=p[t]=new l.Module(e)),i}function M(e,t,i){var r=e.id,n=getOwn(p,r);!hasProp(m,r)||n&&!n.defineEmitComplete?(n=k(e)).error&&"error"===t?i(n.error):n.on(t,i):"defined"===t&&i(m[r])}function O(i,e){var t=i.requireModules,r=!1;e?e(i):(each(t,function(e){var t=getOwn(p,e);t&&(t.error=i,t.events.error&&(r=!0,t.emit("error",i)))}),r||req.onError(i))}function j(){globalDefQueue.length&&(each(globalDefQueue,function(e){var t=e[0];"string"==typeof t&&(l.defQueueMap[t]=!0),h.push(e)}),globalDefQueue=[])}function P(e){delete p[e],delete f[e]}function R(){var e,r,t=1e3*g.waitSeconds,n=t&&l.startTime+t<(new Date).getTime(),o=[],a=[],s=!1,u=!0;if(!i){if(i=!0,eachProp(f,function(e){var t=e.map,i=t.id;if(e.enabled&&(t.isDefine||a.push(e),!e.error))if(!e.inited&&n)w(i)?s=r=!0:(o.push(i),E(i));else if(!e.inited&&e.fetched&&t.isDefine&&(s=!0,!t.prefix))return u=!1}),n&&o.length)return(e=makeError("timeout","Load timeout for modules: "+o,null,o)).contextName=l.contextName,O(e);u&&each(a,function(e){!function n(o,a,s){var e=o.map.id;o.error?o.emit("error",o.error):(a[e]=!0,each(o.depMaps,function(e,t){var i=e.id,r=getOwn(p,i);!r||o.depMatched[t]||s[i]||(getOwn(a,i)?(o.defineDep(t,m[i]),o.check()):n(r,a,s))}),s[e]=!0)}(e,{},{})}),n&&!r||!s||!isBrowser&&!isWebWorker||d||(d=setTimeout(function(){d=0,R()},50)),i=!1}}function a(e){hasProp(m,e[0])||k(S(e[0],null,!0)).init(e[1],e[2])}function o(e,t,i,r){e.detachEvent&&!isOpera?r&&e.detachEvent(r,t):e.removeEventListener(i,t,!1)}function s(e){var t=e.currentTarget||e.srcElement;return o(t,l.onScriptLoad,"load","onreadystatechange"),o(t,l.onScriptError,"error"),{node:t,id:t&&t.getAttribute("data-requiremodule")}}function T(){var e;for(j();h.length;){if(null===(e=h.shift())[0])return O(makeError("mismatch","Mismatched anonymous define() module: "+e[e.length-1]));a(e)}l.defQueueMap={}}return c={require:function(e){return e.require?e.require:e.require=l.makeRequire(e.map)},exports:function(e){if(e.usingExports=!0,e.map.isDefine)return e.exports?m[e.map.id]=e.exports:e.exports=m[e.map.id]={}},module:function(e){return e.module?e.module:e.module={id:e.map.id,uri:e.map.url,config:function(){return getOwn(g.config,e.map.id)||{}},exports:e.exports||(e.exports={})}}},(e=function(e){this.events=getOwn(r,e.id)||{},this.map=e,this.shim=getOwn(g.shim,e.id),this.depExports=[],this.depMaps=[],this.depMatched=[],this.pluginMaps={},this.depCount=0}).prototype={init:function(e,t,i,r){r=r||{},this.inited||(this.factory=t,i?this.on("error",i):this.events.error&&(i=bind(this,function(e){this.emit("error",e)})),this.depMaps=e&&e.slice(0),this.errback=i,this.inited=!0,this.ignore=r.ignore,r.enabled||this.enabled?this.enable():this.check())},defineDep:function(e,t){this.depMatched[e]||(this.depMatched[e]=!0,this.depCount-=1,this.depExports[e]=t)},fetch:function(){if(!this.fetched){this.fetched=!0,l.startTime=(new Date).getTime();var e=this.map;if(!this.shim)return e.prefix?this.callPlugin():this.load();l.makeRequire(this.map,{enableBuildCallback:!0})(this.shim.deps||[],bind(this,function(){return e.prefix?this.callPlugin():this.load()}))}},load:function(){var e=this.map.url;n[e]||(n[e]=!0,l.load(this.map.id,e))},check:function(){if(this.enabled&&!this.enabling){var t,e,i=this.map.id,r=this.depExports,n=this.exports,o=this.factory;if(this.inited){if(this.error)this.emit("error",this.error);else if(!this.defining){if(this.defining=!0,this.depCount<1&&!this.defined){if(isFunction(o)){if(this.events.error&&this.map.isDefine||req.onError!==defaultOnError)try{n=l.execCb(i,o,r,n)}catch(e){t=e}else n=l.execCb(i,o,r,n);if(this.map.isDefine&&void 0===n&&((e=this.module)?n=e.exports:this.usingExports&&(n=this.exports)),t)return t.requireMap=this.map,t.requireModules=this.map.isDefine?[this.map.id]:null,t.requireType=this.map.isDefine?"define":"require",O(this.error=t)}else n=o;if(this.exports=n,this.map.isDefine&&!this.ignore&&(m[i]=n,req.onResourceLoad)){var a=[];each(this.depMaps,function(e){a.push(e.normalizedMap||e)}),req.onResourceLoad(l,this.map,a)}P(i),this.defined=!0}this.defining=!1,this.defined&&!this.defineEmitted&&(this.defineEmitted=!0,this.emit("defined",this.exports),this.defineEmitComplete=!0)}}else hasProp(l.defQueueMap,i)||this.fetch()}},callPlugin:function(){var u=this.map,c=u.id,e=S(u.prefix);this.depMaps.push(e),M(e,"defined",bind(this,function(e){var o,t,i,r=getOwn(v,this.map.id),n=this.map.name,a=this.map.parentMap?this.map.parentMap.name:null,s=l.makeRequire(u.parentMap,{enableBuildCallback:!0});return this.map.unnormalized?(e.normalize&&(n=e.normalize(n,function(e){return q(e,a,!0)})||""),M(t=S(u.prefix+"!"+n,this.map.parentMap,!0),"defined",bind(this,function(e){this.map.normalizedMap=t,this.init([],function(){return e},null,{enabled:!0,ignore:!0})})),void((i=getOwn(p,t.id))&&(this.depMaps.push(t),this.events.error&&i.on("error",bind(this,function(e){this.emit("error",e)})),i.enable()))):r?(this.map.url=l.nameToUrl(r),void this.load()):((o=bind(this,function(e){this.init([],function(){return e},null,{enabled:!0})})).error=bind(this,function(e){this.inited=!0,(this.error=e).requireModules=[c],eachProp(p,function(e){0===e.map.id.indexOf(c+"_unnormalized")&&P(e.map.id)}),O(e)}),o.fromText=bind(this,function(e,t){var i=u.name,r=S(i),n=useInteractive;t&&(e=t),n&&(useInteractive=!1),k(r),hasProp(g.config,c)&&(g.config[i]=g.config[c]);try{req.exec(e)}catch(e){return O(makeError("fromtexteval","fromText eval for "+c+" failed: "+e,e,[c]))}n&&(useInteractive=!0),this.depMaps.push(r),l.completeLoad(i),s([i],o)}),void e.load(u.name,s,o,g))})),l.enable(e,this),this.pluginMaps[e.id]=e},enable:function(){(f[this.map.id]=this).enabled=!0,this.enabling=!0,each(this.depMaps,bind(this,function(e,t){var i,r,n;if("string"==typeof e){if(e=S(e,this.map.isDefine?this.map:this.map.parentMap,!1,!this.skipMap),this.depMaps[t]=e,n=getOwn(c,e.id))return void(this.depExports[t]=n(this));this.depCount+=1,M(e,"defined",bind(this,function(e){this.undefed||(this.defineDep(t,e),this.check())})),this.errback?M(e,"error",bind(this,this.errback)):this.events.error&&M(e,"error",bind(this,function(e){this.emit("error",e)}))}i=e.id,r=p[i],hasProp(c,i)||!r||r.enabled||l.enable(e,this)})),eachProp(this.pluginMaps,bind(this,function(e){var t=getOwn(p,e.id);t&&!t.enabled&&l.enable(e,this)})),this.enabling=!1,this.check()},on:function(e,t){var i=this.events[e];i||(i=this.events[e]=[]),i.push(t)},emit:function(e,t){each(this.events[e],function(e){e(t)}),"error"===e&&delete this.events[e]}},(l={config:g,contextName:u,registry:p,defined:m,urlFetched:n,defQueue:h,defQueueMap:{},Module:e,makeModuleMap:S,nextTick:req.nextTick,onError:O,configure:function(e){if(e.baseUrl&&"/"!==e.baseUrl.charAt(e.baseUrl.length-1)&&(e.baseUrl+="/"),"string"==typeof e.urlArgs){var i=e.urlArgs;e.urlArgs=function(e,t){return(-1===t.indexOf("?")?"?":"&")+i}}var r=g.shim,n={paths:!0,bundles:!0,config:!0,map:!0};eachProp(e,function(e,t){n[t]?(g[t]||(g[t]={}),mixin(g[t],e,!0,!0)):g[t]=e}),e.bundles&&eachProp(e.bundles,function(e,t){each(e,function(e){e!==t&&(v[e]=t)})}),e.shim&&(eachProp(e.shim,function(e,t){isArray(e)&&(e={deps:e}),!e.exports&&!e.init||e.exportsFn||(e.exportsFn=l.makeShimExports(e)),r[t]=e}),g.shim=r),e.packages&&each(e.packages,function(e){var t;t=(e="string"==typeof e?{name:e}:e).name,e.location&&(g.paths[t]=e.location),g.pkgs[t]=e.name+"/"+(e.main||"main").replace(currDirRegExp,"").replace(jsSuffixRegExp,"")}),eachProp(p,function(e,t){e.inited||e.map.unnormalized||(e.map=S(t,null,!0))}),(e.deps||e.callback)&&l.require(e.deps||[],e.callback)},makeShimExports:function(t){return function(){var e;return t.init&&(e=t.init.apply(global,arguments)),e||t.exports&&getGlobal(t.exports)}},makeRequire:function(o,a){function s(e,t,i){var r,n;return a.enableBuildCallback&&t&&isFunction(t)&&(t.__requireJsBuild=!0),"string"==typeof e?isFunction(t)?O(makeError("requireargs","Invalid require call"),i):o&&hasProp(c,e)?c[e](p[o.id]):req.get?req.get(l,e,o,s):(r=S(e,o,!1,!0).id,hasProp(m,r)?m[r]:O(makeError("notloaded",'Module name "'+r+'" has not been loaded yet for context: '+u+(o?"":". Use require([])")))):(T(),l.nextTick(function(){T(),(n=k(S(null,o))).skipMap=a.skipMap,n.init(e,t,i,{enabled:!0}),R()}),s)}return a=a||{},mixin(s,{isBrowser:isBrowser,toUrl:function(e){var t,i=e.lastIndexOf("."),r=e.split("/")[0];return-1!==i&&(!("."===r||".."===r)||1<i)&&(t=e.substring(i,e.length),e=e.substring(0,i)),l.nameToUrl(q(e,o&&o.id,!0),t,!0)},defined:function(e){return hasProp(m,S(e,o,!1,!0).id)},specified:function(e){return e=S(e,o,!1,!0).id,hasProp(m,e)||hasProp(p,e)}}),o||(s.undef=function(i){j();var e=S(i,o,!0),t=getOwn(p,i);t.undefed=!0,E(i),delete m[i],delete n[e.url],delete r[i],eachReverse(h,function(e,t){e[0]===i&&h.splice(t,1)}),delete l.defQueueMap[i],t&&(t.events.defined&&(r[i]=t.events),P(i))}),s},enable:function(e){getOwn(p,e.id)&&k(e).enable()},completeLoad:function(e){var t,i,r,n=getOwn(g.shim,e)||{},o=n.exports;for(j();h.length;){if(null===(i=h.shift())[0]){if(i[0]=e,t)break;t=!0}else i[0]===e&&(t=!0);a(i)}if(l.defQueueMap={},r=getOwn(p,e),!t&&!hasProp(m,e)&&r&&!r.inited){if(!(!g.enforceDefine||o&&getGlobal(o)))return w(e)?void 0:O(makeError("nodefine","No define call for "+e,null,[e]));a([e,n.deps||[],n.exportsFn])}R()},nameToUrl:function(e,t,i){var r,n,o,a,s,u,c=getOwn(g.pkgs,e);if(c&&(e=c),u=getOwn(v,e))return l.nameToUrl(u,t,i);if(req.jsExtRegExp.test(e))a=e+(t||"");else{for(r=g.paths,o=(n=e.split("/")).length;0<o;o-=1)if(s=getOwn(r,n.slice(0,o).join("/"))){isArray(s)&&(s=s[0]),n.splice(0,o,s);break}a=n.join("/"),a=("/"===(a+=t||(/^data\:|^blob\:|\?/.test(a)||i?"":".js")).charAt(0)||a.match(/^[\w\+\.\-]+:/)?"":g.baseUrl)+a}return g.urlArgs&&!/^blob\:/.test(a)?a+g.urlArgs(e,a):a},load:function(e,t){req.load(l,e,t)},execCb:function(e,t,i,r){return t.apply(r,i)},onScriptLoad:function(e){if("load"===e.type||readyRegExp.test((e.currentTarget||e.srcElement).readyState)){interactiveScript=null;var t=s(e);l.completeLoad(t.id)}},onScriptError:function(e){var i=s(e);if(!w(i.id)){var r=[];return eachProp(p,function(e,t){0!==t.indexOf("_@r")&&each(e.depMaps,function(e){if(e.id===i.id)return r.push(t),!0})}),O(makeError("scripterror",'Script error for "'+i.id+(r.length?'", needed by: '+r.join(", "):'"'),e,[i.id]))}}}).require=l.makeRequire(),l}function getInteractiveScript(){return interactiveScript&&"interactive"===interactiveScript.readyState||eachReverse(scripts(),function(e){if("interactive"===e.readyState)return interactiveScript=e}),interactiveScript}}(this,"undefined"==typeof setTimeout?void 0:setTimeout);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("Utility", ["require", "exports", "Collections/Dictionary"], function (require, exports, Dict) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UniqueRandom = exports.Fill2DRect = exports.HashItems = exports.Sum = exports.Max = exports.Swap = exports.Zip = exports.Fill2DObj = exports.FillObj = exports.Memset = exports.Fill = exports.Range = exports.PerfectlyDivisible = exports.Clamp = void 0;
    function Clamp(val, upper, lower) {
        if (val > upper)
            return upper;
        if (val < lower)
            return lower;
        return val;
    }
    exports.Clamp = Clamp;
    function PerfectlyDivisible(val, divisor) {
        var div = val / divisor;
        return Math.floor(div) == div;
    }
    exports.PerfectlyDivisible = PerfectlyDivisible;
    function Range(lowerInclusive, upperExclusive) {
        var nElem = upperExclusive - lowerInclusive;
        var arr = new Array(nElem);
        var ind = 0;
        for (var val = lowerInclusive; val < upperExclusive; val += 1) {
            arr[ind++] = val;
        }
        return arr;
    }
    exports.Range = Range;
    function Fill(length, value) {
        var arr = new Array(length);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = value;
        }
        return arr;
    }
    exports.Fill = Fill;
    function Memset(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            arr[i] = value;
        }
    }
    exports.Memset = Memset;
    function FillObj(length, generator) {
        var arr = new Array(length);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = generator();
        }
        return arr;
    }
    exports.FillObj = FillObj;
    function Fill2DObj(rows, cols, generator) {
        var arr = new Array(rows);
        for (var r = 0; r < rows; r++) {
            var newRow = new Array(cols);
            for (var c = 0; c < cols; c++) {
                newRow[c] = generator();
            }
            arr[r] = newRow;
        }
        return arr;
    }
    exports.Fill2DObj = Fill2DObj;
    function Zip(arr1, arr2, fn) {
        if (arr1.length != arr2.length) {
            throw new Error("Zip: arrays of different length: 1st: " + arr1.length + "  2nd: " + arr2.length);
        }
        var result = new Array(arr1.length);
        for (var i = 0; i < result.length; i++) {
            result[0] = fn(arr1[i], arr2[i]);
        }
        return result;
    }
    exports.Zip = Zip;
    function Swap(arr, ind1, ind2) {
        var temp = arr[ind1];
        arr[ind1] = arr[ind2];
        arr[ind2] = temp;
    }
    exports.Swap = Swap;
    function Max(arr) {
        var max = arr[0];
        for (var i = 0; i < arr.length; i++) {
            max = Math.max(max, arr[i]);
        }
        return max;
    }
    exports.Max = Max;
    function Sum(arr) {
        var acc = 0;
        for (var i = 0; i < arr.length; i++) {
            acc += arr[i];
        }
        return acc;
    }
    exports.Sum = Sum;
    function HashItems(list, keyGenerator) {
        var dict = new Dict.ObjectDict();
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var key = keyGenerator(item);
            if (!dict.ContainsKey(key)) {
                dict.Set(key, item);
            }
        }
        return dict;
    }
    exports.HashItems = HashItems;
    function Fill2DRect(arr, value, x, y, width, height) {
        var right = x + width;
        var bot = y + height;
        for (var r = y; r < bot; r++) {
            for (var c = x; c < right; c++) {
                arr[r][c] = value;
            }
        }
    }
    exports.Fill2DRect = Fill2DRect;
    function UniqueRandom(nNumbers, upperInclusive) {
        if (nNumbers > upperInclusive)
            throw new Error('UniqueRandom: nNumbers must be smaller than upperInclusive');
        var dict = new Dict.ObjectDict();
        var selected = [];
        while (selected.length < nNumbers) {
            var rand = Math.floor(Math.random() * upperInclusive);
            if (!dict.ContainsKey(rand)) {
                selected.push(rand);
                dict.Set(rand, true);
            }
        }
        return selected;
    }
    exports.UniqueRandom = UniqueRandom;
});
define("Collections/Dictionary", ["require", "exports", "Utility"], function (require, exports, Util) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VisitedArray = exports.ObjectDict = void 0;
    var ObjectDict = (function () {
        function ObjectDict() {
            this.hashtable = {};
        }
        ObjectDict.prototype.ContainsKey = function (key) {
            return this.hashtable.hasOwnProperty(key);
        };
        ObjectDict.prototype.Remove = function (key) {
            delete this.hashtable[key];
        };
        ObjectDict.prototype.Get = function (key) {
            return this.hashtable[key];
        };
        ObjectDict.prototype.Set = function (key, value) {
            this.hashtable[key] = value;
        };
        ObjectDict.prototype.ToList = function () {
            var _this = this;
            return Object.keys(this.hashtable).map(function (s) { return [s, _this.hashtable[s]]; });
        };
        return ObjectDict;
    }());
    exports.ObjectDict = ObjectDict;
    var VisitedArray = (function () {
        function VisitedArray(size) {
            this.visited = Util.Fill(size, -1);
            this.token = 0;
        }
        VisitedArray.prototype.UpdateToken = function () {
            var threshold = 2147483647;
            if (this.token >= threshold) {
                this.token = 1;
                Util.Memset(this.visited, 0);
            }
            this.token += 1;
            return [this.visited, this.token];
        };
        return VisitedArray;
    }());
    exports.VisitedArray = VisitedArray;
});
define("Collections/Queue", ["require", "exports", "Collections/Dictionary", "Utility"], function (require, exports, Dict, Util) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LabelledCircularQueue = exports.CircularBufferQueue = exports.DoubleStackQueue = void 0;
    var DoubleStackQueue = (function () {
        function DoubleStackQueue() {
            this.incoming = [];
            this.outgoing = [];
            this.size = 0;
        }
        DoubleStackQueue.prototype.Shift = function () {
            while (this.incoming.length > 0) {
                var last = this.incoming.pop();
                this.outgoing.push(last);
            }
        };
        DoubleStackQueue.prototype.Enqueue = function (value) {
            this.size += 1;
            this.incoming.push(value);
        };
        DoubleStackQueue.prototype.Peek = function () {
            if (this.outgoing.length == 0) {
                this.Shift();
            }
            return this.outgoing[this.outgoing.length - 1];
        };
        DoubleStackQueue.prototype.Dequeue = function () {
            if (this.outgoing.length == 0) {
                this.Shift();
            }
            this.size -= 1;
            return this.outgoing.pop();
        };
        DoubleStackQueue.prototype.Count = function () {
            return this.size;
        };
        return DoubleStackQueue;
    }());
    exports.DoubleStackQueue = DoubleStackQueue;
    var CircularBufferQueue = (function () {
        function CircularBufferQueue(initialSize) {
            if (initialSize === void 0) { initialSize = 32; }
            this.head = 0;
            this.tail = 0;
            this.count = 0;
            this.buffer = new Array(initialSize);
        }
        CircularBufferQueue.prototype.Resize = function (currentSize, newSize) {
            var resized = new Array(newSize);
            for (var i = 0; i < currentSize; i++) {
                var ind = (this.tail + i) % currentSize;
                resized[i] = this.buffer[ind];
            }
            this.buffer = resized;
            this.tail = 0;
            this.head = this.count;
        };
        CircularBufferQueue.prototype.Enqueue = function (value) {
            this.count++;
            this.buffer[this.head] = value;
            this.head = (this.head + 1);
            if (this.head >= this.buffer.length) {
                this.head = 0;
            }
            if (this.head == this.tail) {
                this.Resize(this.buffer.length, this.buffer.length * 2);
            }
        };
        CircularBufferQueue.prototype.Peek = function () {
            return this.buffer[this.tail];
        };
        CircularBufferQueue.prototype.Dequeue = function () {
            this.count -= 1;
            var element = this.buffer[this.tail];
            this.tail++;
            if (this.tail >= this.buffer.length) {
                this.tail = 0;
            }
            return element;
        };
        CircularBufferQueue.prototype.Count = function () {
            return this.count;
        };
        return CircularBufferQueue;
    }());
    exports.CircularBufferQueue = CircularBufferQueue;
    var LabelledCircularQueue = (function (_super) {
        __extends(LabelledCircularQueue, _super);
        function LabelledCircularQueue(initialSize) {
            if (initialSize === void 0) { initialSize = 32; }
            var _this = _super.call(this, initialSize) || this;
            _this.skip = Util.Fill(initialSize, false);
            _this.indices = new Dict.ObjectDict();
            return _this;
        }
        LabelledCircularQueue.prototype.ResizeBuffers = function (currentSize, newSize) {
            var resizedSkip = new Array(newSize);
            var resizedBuffer = new Array(newSize);
            var newDict = new Dict.ObjectDict();
            var destInd = 0;
            for (var i = 0; i < currentSize; i++) {
                var ind = (this.tail + i) % currentSize;
                if (this.skip[ind])
                    continue;
                var currentValue = this.buffer[ind];
                resizedBuffer[destInd] = currentValue;
                resizedSkip[destInd] = false;
                newDict.Set(currentValue, destInd);
                destInd++;
            }
            this.indices = newDict;
            this.buffer = resizedBuffer;
            this.skip = resizedSkip;
            this.tail = 0;
            this.head = this.count;
        };
        LabelledCircularQueue.prototype.Contains = function (value) {
            return this.indices.ContainsKey(value);
        };
        LabelledCircularQueue.prototype.Remove = function (value) {
            this.count--;
            var ind = this.indices.Get(value);
            if (!this.indices.ContainsKey(value)) {
                throw new Error("queue does not contain element " + value);
            }
            this.indices.Remove(value);
            this.skip[ind] = true;
        };
        LabelledCircularQueue.prototype.Enqueue = function (value) {
            this.count++;
            this.skip[this.head] = false;
            this.buffer[this.head] = value;
            if (this.indices.ContainsKey(value)) {
                throw new Error("Queue contains duplicate " + value);
            }
            this.indices.Set(value, this.head);
            this.head++;
            if (this.head >= this.buffer.length) {
                this.head = 0;
            }
            if (this.head == this.tail) {
                this.ResizeBuffers(this.buffer.length, this.buffer.length * 2);
            }
        };
        LabelledCircularQueue.prototype.MoveToValid = function () {
            while (this.skip[this.tail]) {
                this.tail = (this.tail + 1) % this.skip.length;
            }
        };
        LabelledCircularQueue.prototype.Peek = function () {
            this.MoveToValid();
            return _super.prototype.Peek.call(this);
        };
        LabelledCircularQueue.prototype.Dequeue = function () {
            this.MoveToValid();
            var dequeued = _super.prototype.Dequeue.call(this);
            if (!this.indices.ContainsKey(dequeued)) {
                throw new Error("queue does not contain element " + dequeued);
            }
            this.indices.Remove(dequeued);
            return dequeued;
        };
        return LabelledCircularQueue;
    }(CircularBufferQueue));
    exports.LabelledCircularQueue = LabelledCircularQueue;
});
define("FlowNetworkSolver", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Matrix", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsVector = exports.IsRowVector = exports.IsColumnVector = exports.MaxElement = exports.Inverse = exports.Cofactors = exports.SubMatrix = exports.Determinant = exports.MeanAndCovarianceFromLabelledData = exports.MeanAndCovariance = exports.AddScalar = exports.Sub = exports.AddInPlace = exports.Add = exports.Scale = exports.Transpose = exports.Mul = exports.FromArray = exports.IsSquare = exports.Dimensions = exports.NormSquare = exports.Identity = exports.Norm = exports.CreateMatrix = exports.Columns = exports.Rows = exports.RandomFill = exports.Any = exports.OfDimensions = exports.Clone = exports.Print = void 0;
    function Print(m) {
        var lines = m.map(function (r) { return "[" + r.join(',') + "]"; });
        return "[" + lines.join('\n') + "]";
    }
    exports.Print = Print;
    function Clone(m) {
        var _a = Dimensions(m), nRows = _a[0], nCols = _a[1];
        var rows = new Array(nRows);
        for (var r = 0; r < nRows; r++) {
            rows[r] = m[r].slice(0);
        }
        return FromArray(rows);
    }
    exports.Clone = Clone;
    function OfDimensions(m, nRows, nCols) {
        return m.length == nRows && m[0].length == nCols;
    }
    exports.OfDimensions = OfDimensions;
    function Any(m, fnPredicate) {
        var _a = Dimensions(m), nRows = _a[0], nCols = _a[1];
        for (var r = 0; r < nRows; r++) {
            for (var c = 0; c < nCols; c++) {
                var e = m[r][c];
                if (fnPredicate(c))
                    return true;
            }
        }
        return false;
    }
    exports.Any = Any;
    function RandomFill(lowerBound, upperBound) {
        var _a = Dimensions(lowerBound), nRows = _a[0], nCols = _a[1];
        var random = CreateMatrix(nRows, nCols);
        for (var r = 0; r < nRows; r++) {
            for (var c = 0; c < nCols; c++) {
                var lower = lowerBound[r][c];
                var upper = upperBound[r][c];
                random[r][c] = Math.random() * (upper - lower) + lower;
            }
        }
        return random;
    }
    exports.RandomFill = RandomFill;
    function Rows(m) {
        return m.length;
    }
    exports.Rows = Rows;
    function Columns(m) {
        return m[0].length;
    }
    exports.Columns = Columns;
    function CreateMatrix(rows, columns) {
        var mat = new Array(rows);
        for (var r = 0; r < rows; r++) {
            var newRow = new Array(columns);
            for (var c = 0; c < columns; c++) {
                newRow[c] = 0;
            }
            mat[r] = newRow;
        }
        return mat;
    }
    exports.CreateMatrix = CreateMatrix;
    function Norm(m) {
        var _a = Dimensions(m), rows = _a[0], cols = _a[1];
        var nElems = rows * cols;
        var acc = 0;
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
                acc += m[r][c] * m[r][c];
            }
        }
        return Math.pow(acc, 1 / nElems);
    }
    exports.Norm = Norm;
    function Identity(side) {
        var id = CreateMatrix(side, side);
        for (var i = 0; i < side; i++) {
            id[i][i] = 1;
        }
        return id;
    }
    exports.Identity = Identity;
    function NormSquare(m) {
        var _a = Dimensions(m), rows = _a[0], cols = _a[1];
        var acc = 0;
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
                acc += m[r][c] * m[r][c];
            }
        }
        return acc;
    }
    exports.NormSquare = NormSquare;
    function Dimensions(m) {
        return [Rows(m), Columns(m)];
    }
    exports.Dimensions = Dimensions;
    function IsSquare(m) {
        return Rows(m) == Columns(m);
    }
    exports.IsSquare = IsSquare;
    function FromArray(arr) {
        return arr;
    }
    exports.FromArray = FromArray;
    function Mul(m1, m2) {
        var _a = [m1.length, m2[0].length], nRows = _a[0], nCols = _a[1];
        var product = CreateMatrix(nRows, nCols);
        var len = m1[0].length;
        for (var r = 0; r < nRows; r++) {
            for (var c = 0; c < nCols; c++) {
                var acc = 0;
                for (var i = 0; i < len; i++) {
                    acc += m1[r][i] * m2[i][c];
                }
                product[r][c] = acc;
            }
        }
        return product;
    }
    exports.Mul = Mul;
    function Transpose(m1) {
        var _a = Dimensions(m1), nRows = _a[0], nCols = _a[1];
        var transposed = CreateMatrix(nCols, nRows);
        for (var r = 0; r < nRows; r++) {
            for (var c = 0; c < nCols; c++) {
                transposed[c][r] = m1[r][c];
            }
        }
        return transposed;
    }
    exports.Transpose = Transpose;
    function Scale(scalar, m1) {
        var _a = Dimensions(m1), nRows = _a[0], nCols = _a[1];
        var scaled = CreateMatrix(nRows, nCols);
        for (var r = 0; r < nRows; r++) {
            for (var c = 0; c < nCols; c++) {
                scaled[r][c] = scalar * m1[r][c];
            }
        }
        return scaled;
    }
    exports.Scale = Scale;
    function Add(m1, m2) {
        var _a = Dimensions(m1), nRows = _a[0], nCols = _a[1];
        var sum = CreateMatrix(nRows, nCols);
        for (var r = 0; r < nRows; r++) {
            for (var c = 0; c < nCols; c++) {
                sum[r][c] = m1[r][c] + m2[r][c];
            }
        }
        return sum;
    }
    exports.Add = Add;
    function AddInPlace(acc, add) {
        var _a = Dimensions(acc), nRows = _a[0], nCols = _a[1];
        for (var r = 0; r < nRows; r++) {
            for (var c = 0; c < nCols; c++) {
                acc[r][c] += add[r][c];
            }
        }
    }
    exports.AddInPlace = AddInPlace;
    function Sub(m1, m2) {
        var _a = Dimensions(m1), nRows = _a[0], nCols = _a[1];
        var sum = CreateMatrix(nRows, nCols);
        for (var r = 0; r < nRows; r++) {
            for (var c = 0; c < nCols; c++) {
                sum[r][c] = m1[r][c] - m2[r][c];
            }
        }
        return sum;
    }
    exports.Sub = Sub;
    function AddScalar(scalar, m1) {
        var _a = Dimensions(m1), nRows = _a[0], nCols = _a[1];
        var result = CreateMatrix(nRows, nCols);
        for (var r = 0; r < nRows; r++) {
            for (var c = 0; c < nCols; c++) {
                result[r][c] = m1[r][c] + scalar;
            }
        }
        return result;
    }
    exports.AddScalar = AddScalar;
    function MeanAndCovariance(data) {
        if (!IsVector(data[0]))
            throw Error("MeanAndCovariance: Vector input required");
        var _a = Dimensions(data[0]), nRows = _a[0], nCols = _a[1];
        var nData = data.length;
        var meanAcc = CreateMatrix(nRows, nCols);
        for (var i = 0; i < data.length; i++) {
            AddInPlace(meanAcc, data[i]);
        }
        var mean = Scale(1 / nData, meanAcc);
        var side = Math.max(nRows, nCols);
        var covAcc = CreateMatrix(side, side);
        for (var i = 0; i < data.length; i++) {
            var diff = Sub(data[i], mean);
            var diffTransposed = Transpose(diff);
            var add = Mul(diff, diffTransposed);
            AddInPlace(covAcc, add);
        }
        var covariance = Scale(1 / nData, covAcc);
        return { mean: mean, covariance: covariance };
    }
    exports.MeanAndCovariance = MeanAndCovariance;
    function MeanAndCovarianceFromLabelledData(tag, labels, data) {
        if (!IsVector(data[0]))
            throw Error("MeanAndCovariance: Vector input required");
        var _a = Dimensions(data[0]), nRows = _a[0], nCols = _a[1];
        var nData = 0;
        var meanAcc = CreateMatrix(nRows, nCols);
        for (var i = 0; i < data.length; i++) {
            if (labels[i] == tag) {
                AddInPlace(meanAcc, data[i]);
                nData++;
            }
        }
        var mean = Scale(1 / nData, meanAcc);
        var side = Math.max(nRows, nCols);
        var covAcc = CreateMatrix(side, side);
        for (var i = 0; i < data.length; i++) {
            if (labels[i] == tag) {
                var diff = Sub(data[i], mean);
                var diffTransposed = Transpose(diff);
                var add = Mul(diff, diffTransposed);
                AddInPlace(covAcc, add);
            }
        }
        var covariance = Scale(1 / nData, covAcc);
        return { mean: mean, covariance: covariance };
    }
    exports.MeanAndCovarianceFromLabelledData = MeanAndCovarianceFromLabelledData;
    function Determinant(m) {
        var square = IsSquare(m);
        if (!square) {
            var _a = Dimensions(m), nRows = _a[0], nCols = _a[1];
            throw new Error("Determinant: parameter is a non square matrix - rows:" + nRows + " colums:" + nCols);
        }
        var size = Rows(m);
        switch (size) {
            case 1: {
                return m[0][0];
            }
            case 2: {
                return m[0][0] * m[1][1] - m[0][1] * m[1][0];
            }
            case 3: {
                var det1 = m[1][1] * m[2][2] - m[1][2] * m[2][1];
                var det2 = m[1][0] * m[2][2] - m[1][2] * m[2][0];
                var det3 = m[1][0] * m[2][1] - m[1][1] * m[2][0];
                return m[0][0] * det1 - m[0][1] * det2 + m[0][2] * det3;
            }
            default: {
                var acc = 0;
                var even = true;
                for (var i = 0; i < size; i++) {
                    var minor = SubMatrix(m, 0, i);
                    acc += (even ? 1 : -1) * m[0][i] * Determinant(minor);
                    even = !even;
                }
                return acc;
            }
        }
    }
    exports.Determinant = Determinant;
    function SubMatrix(m1, row, col) {
        var _a = Dimensions(m1), nRows = _a[0], nCols = _a[1];
        var sub = [];
        for (var r = 0; r < nRows; r++) {
            if (r == row)
                continue;
            var newRow = [];
            for (var c = 0; c < nCols; c++) {
                if (c == col)
                    continue;
                newRow.push(m1[r][c]);
            }
            sub.push(newRow);
        }
        return FromArray(sub);
    }
    exports.SubMatrix = SubMatrix;
    function Cofactors(m1) {
        var _a = Dimensions(m1), nRows = _a[0], nCols = _a[1];
        var minors = CreateMatrix(nRows, nCols);
        for (var r = 0; r < nRows; r++) {
            var even = ((r & 1) == 0);
            for (var c = 0; c < nCols; c++) {
                var sub = SubMatrix(m1, r, c);
                var sign = even ? 1 : -1;
                even = !even;
                minors[r][c] = sign * Determinant(sub);
            }
        }
        return minors;
    }
    exports.Cofactors = Cofactors;
    function Inverse(m1) {
        var square = IsSquare(m1);
        if (!square) {
            var _a = Dimensions(m1), nRows = _a[0], nCols = _a[1];
            throw new Error("Matrix Inverse: parameter is a non square matrix - rows:" + nRows + " colums:" + nCols);
        }
        var size = Rows(m1);
        if (size == 1) {
            var adjugate_1 = CreateMatrix(1, 1);
            adjugate_1[0][0] = 1.0 / m1[0][0];
            return adjugate_1;
        }
        var det = Determinant(m1);
        var cofactors = Cofactors(m1);
        var adjugate = Transpose(cofactors);
        return Scale(1.0 / det, adjugate);
    }
    exports.Inverse = Inverse;
    function MaxElement(m) {
        var _a = Dimensions(m), nRows = _a[0], nCols = _a[1];
        var max = m[0][0];
        for (var r = 0; r < nRows; r++) {
            for (var c = 0; c < nCols; c++) {
                max = Math.max(max, m[r][c]);
            }
        }
        return max;
    }
    exports.MaxElement = MaxElement;
    function IsColumnVector(m) {
        var _a = Dimensions(m), nRows = _a[0], nCols = _a[1];
        return nCols == 1;
    }
    exports.IsColumnVector = IsColumnVector;
    function IsRowVector(m) {
        var _a = Dimensions(m), nRows = _a[0], nCols = _a[1];
        return nRows == 1;
    }
    exports.IsRowVector = IsRowVector;
    function IsVector(m) {
        return IsColumnVector(m) || IsRowVector(m);
    }
    exports.IsVector = IsVector;
});
define("ConvergenceChecker", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConvergenceChecker = void 0;
    var ConvergenceChecker = (function () {
        function ConvergenceChecker(minPercentChange, maxIter) {
            this.maxIter = 0;
            this.iterCount = 0;
            this.lastObjFnValue = null;
            this.minChange = 1;
            this.maxIter = maxIter;
            this.minChange = minPercentChange / 100;
        }
        ConvergenceChecker.prototype.hasConverged = function (objFnValue, iter) {
            if (iter === void 0) { iter = -1; }
            this.iterCount = (iter < 0) ? this.iterCount + 1 : iter;
            if (this.iterCount >= this.maxIter)
                return true;
            if (this.lastObjFnValue == null) {
                this.lastObjFnValue = objFnValue;
                return false;
            }
            else {
                var diff = Math.abs(objFnValue - this.lastObjFnValue);
                var denominator = Math.abs(objFnValue);
                this.lastObjFnValue = objFnValue;
                if (denominator == 0)
                    return false;
                var fractionalChange = (diff / denominator);
                return fractionalChange < this.minChange;
            }
        };
        ConvergenceChecker.prototype.getCurrentIter = function () {
            return this.iterCount;
        };
        return ConvergenceChecker;
    }());
    exports.ConvergenceChecker = ConvergenceChecker;
});
define("V3", ["require", "exports", "Matrix"], function (require, exports, M) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isV3 = exports.DiffNormSquare = exports.Norm = exports.NormSquare = exports.AddInPlace = exports.SubInPlace = exports.Sub = void 0;
    function Sub(v1, v2) {
        var res = new Array(3);
        res[0] = [v1[0][0] - v2[0][0]];
        res[1] = [v1[1][0] - v2[1][0]];
        res[2] = [v1[2][0] - v2[2][0]];
        return res;
    }
    exports.Sub = Sub;
    function SubInPlace(acc, v2) {
        acc[0][0] -= v2[0][0];
        acc[1][0] -= v2[1][0];
        acc[2][0] -= v2[2][0];
    }
    exports.SubInPlace = SubInPlace;
    function AddInPlace(acc, v2) {
        acc[0][0] += v2[0][0];
        acc[1][0] += v2[1][0];
        acc[2][0] += v2[2][0];
    }
    exports.AddInPlace = AddInPlace;
    function NormSquare(vec) {
        var e0 = vec[0][0];
        var e1 = vec[1][0];
        var e2 = vec[2][0];
        return e0 * e0 + e1 * e1 + e2 * e2;
    }
    exports.NormSquare = NormSquare;
    function Norm(vec) {
        var e0 = vec[0][0];
        var e1 = vec[1][0];
        var e2 = vec[2][0];
        return Math.sqrt(e0 * e0 + e1 * e1 + e2 * e2);
    }
    exports.Norm = Norm;
    function DiffNormSquare(v1, v2) {
        var e0 = v1[0][0] - v2[0][0];
        var e1 = v1[1][0] - v2[1][0];
        var e2 = v1[2][0] - v2[2][0];
        return e0 * e0 + e1 * e1 + e2 * e2;
    }
    exports.DiffNormSquare = DiffNormSquare;
    function isV3(v) {
        return M.IsColumnVector(v) && M.Rows(v) == 3;
    }
    exports.isV3 = isV3;
});
define("KMeans", ["require", "exports", "Utility", "Matrix", "Collections/Dictionary", "ConvergenceChecker", "V3"], function (require, exports, Util, Mat, Dict, Conv, V3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Fit = exports.Initializer = exports.KMeansResult = void 0;
    var KMeansResult = (function () {
        function KMeansResult(_clusters, _means) {
            this.meanDist = -1;
            this.clusters = _clusters;
            this.means = _means;
        }
        KMeansResult.prototype.MeanDistanceToCluster = function () {
            if (this.meanDist >= 0)
                return this.meanDist;
            var nElems = Util.Sum(this.clusters.map(function (c) { return c.length; }));
            var first = this.means[0];
            var isV3 = V3.isV3(first);
            function GenericDist(_means, _clusters) {
                var distAcc = 0;
                _clusters.forEach(function (c, ind) {
                    var clusterMean = _means[ind];
                    for (var i = 0; i < c.length; i++) {
                        var diff = Mat.Sub(c[i], clusterMean);
                        distAcc += Mat.Norm(diff);
                    }
                });
                return distAcc / nElems;
            }
            function V3Dist(_means, _clusters) {
                var distAcc = 0;
                _clusters.forEach(function (c, ind) {
                    var clusterMean = _means[ind];
                    for (var i = 0; i < c.length; i++) {
                        distAcc += Math.sqrt(V3.DiffNormSquare(c[i], clusterMean));
                    }
                });
                return distAcc / nElems;
            }
            var fnDist = (isV3) ? V3Dist : GenericDist;
            this.meanDist = fnDist(this.means, this.clusters);
            return this.meanDist;
        };
        return KMeansResult;
    }());
    exports.KMeansResult = KMeansResult;
    var Initializer;
    (function (Initializer) {
        Initializer[Initializer["random"] = 0] = "random";
        Initializer[Initializer["KMeansPlusPlus"] = 1] = "KMeansPlusPlus";
    })(Initializer = exports.Initializer || (exports.Initializer = {}));
    function kMeansPlusPlusInit(nClusters, data) {
        var selected = new Dict.ObjectDict();
        var firstIndex = Math.floor(Math.random() * (data.length - 1));
        selected.Set(firstIndex, true);
        var centres = [data[firstIndex]];
        var prob = new Array(data.length);
        var cumProb = new Array(data.length);
        var isV3 = V3.isV3(data[0]);
        var fnDiffSquare = (isV3) ?
            V3.DiffNormSquare :
            function (v1, v2) { return Mat.NormSquare(Mat.Sub(v1, v2)); };
        while (centres.length < nClusters) {
            for (var i = 0; i < data.length; i++) {
                var minDist = Number.MAX_VALUE;
                for (var c = 0; c < centres.length; c++) {
                    var dist = fnDiffSquare(data[i], centres[c]);
                    if (dist < minDist) {
                        minDist = dist;
                    }
                }
                prob[i] = minDist;
            }
            var acc = 0;
            for (var i = 0; i < prob.length; i++) {
                acc += prob[i];
                cumProb[i] = acc;
            }
            var max = cumProb[cumProb.length - 1];
            if (max == 0) {
                var equalCentres = new Array(nClusters);
                for (var i = 0; i < nClusters; i++)
                    equalCentres[i] = data[firstIndex];
                return [false, equalCentres];
            }
            var selectedIndex = 0;
            do {
                var rand = Math.random() * max;
                for (var i = 0; i < cumProb.length; i++) {
                    if (cumProb[i] >= rand) {
                        selectedIndex = i;
                        break;
                    }
                }
            } while (selected.ContainsKey(selectedIndex));
            selected.Set(selectedIndex, true);
            centres.push(data[selectedIndex]);
        }
        return [true, centres];
    }
    function Fit(data, nClusters, nIter, minPercentChange, init) {
        var _a;
        if (nIter === void 0) { nIter = 100; }
        if (minPercentChange === void 0) { minPercentChange = 1; }
        if (init === void 0) { init = Initializer.KMeansPlusPlus; }
        var _b = Mat.Dimensions(data[0]), nRows = _b[0], nCols = _b[1];
        var uniqueClusters;
        var clusterCentres;
        var isV3 = V3.isV3(data[0]);
        if (init == Initializer.random) {
            clusterCentres = Util.UniqueRandom(nClusters, data.length - 1).map(function (i) { return data[i]; });
            var interClusterDistances = clusterCentres.map(function (c) {
                var diff = Mat.Sub(clusterCentres[0], c);
                return Mat.NormSquare(diff);
            });
            var totalInterClusterDist = Util.Sum(interClusterDistances);
            uniqueClusters = totalInterClusterDist > 0;
        }
        else {
            _a = kMeansPlusPlusInit(nClusters, data), uniqueClusters = _a[0], clusterCentres = _a[1];
        }
        var conv = new Conv.ConvergenceChecker(minPercentChange, nIter);
        var result;
        var clusters = GroupToNearestMean(data, clusterCentres);
        var _loop_1 = function () {
            var fnAdd = (isV3) ? V3.AddInPlace : Mat.AddInPlace;
            clusterCentres = clusters.map(function (c) {
                var acc = Mat.CreateMatrix(nRows, nCols);
                for (var i = 0; i < c.length; i++) {
                    fnAdd(acc, c[i]);
                }
                return Mat.Scale(1 / c.length, acc);
            });
            clusters = GroupToNearestMean(data, clusterCentres);
            result = new KMeansResult(clusters, clusterCentres);
        };
        do {
            _loop_1();
        } while (!conv.hasConverged(result.MeanDistanceToCluster()));
        console.log("KMeans exited at " + conv.getCurrentIter());
        return result;
    }
    exports.Fit = Fit;
    function GroupToNearestMean(data, means) {
        var nClusters = means.length;
        var clusters = Util.FillObj(nClusters, function () { return []; });
        var isV3 = V3.isV3(data[0]);
        function GenericGroup(_clusterBuffer, _data, _means) {
            for (var d = 0; d < _data.length; d++) {
                var _a = [Number.MAX_VALUE, -1], maxDist = _a[0], clusterInd = _a[1];
                for (var m = 0; m < _means.length; m++) {
                    var diff = Mat.Sub(_data[d], _means[m]);
                    var dist = Mat.NormSquare(diff);
                    if (dist < maxDist) {
                        maxDist = dist;
                        clusterInd = m;
                    }
                }
                _clusterBuffer[clusterInd].push(_data[d]);
            }
            return _clusterBuffer;
        }
        function V3Group(_clusterBuffer, _data, _means) {
            for (var d = 0; d < _data.length; d++) {
                var _a = [Number.MAX_VALUE, -1], maxDist = _a[0], clusterInd = _a[1];
                for (var m = 0; m < _means.length; m++) {
                    var dist = V3.DiffNormSquare(_data[d], _means[m]);
                    if (dist < maxDist) {
                        maxDist = dist;
                        clusterInd = m;
                    }
                }
                _clusterBuffer[clusterInd].push(_data[d]);
            }
            return _clusterBuffer;
        }
        var fnGroup = (isV3) ? V3Group : GenericGroup;
        return fnGroup(clusters, data, means);
    }
});
define("GMMCluster", ["require", "exports", "Matrix"], function (require, exports, M) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.V3Cluster = exports.ClusterFactory = exports.Cluster = void 0;
    var Params = (function () {
        function Params(_pi, _mean, _covariance) {
            this.pi = _pi;
            this.mean = _mean;
            var epsilon = 1e-7;
            if (Math.abs(M.Determinant(_covariance)) < epsilon) {
                var dim = M.Rows(_covariance);
                var epsMat = M.Scale(epsilon, M.Identity(dim));
                _covariance = M.Add(_covariance, epsMat);
            }
            this.covariance = _covariance;
            this.covarianceDet = M.Determinant(_covariance);
            this.covarianceInv = M.Inverse(_covariance);
            this.dim = Math.max.apply(Math, M.Dimensions(_mean));
            var coeffDenominator = Math.sqrt(Math.pow(2 * Math.PI, this.dim) * Math.abs(this.covarianceDet));
            this.coeff = this.pi * (1 / coeffDenominator);
            var scalars = [this.dim, this.pi, this.covarianceDet];
            var anyScalarNaN = scalars.filter(function (s) { return isNaN(s); }).length > 0;
            var matrices = [this.mean, this.covariance, this.covarianceInv];
            var anyMatricesNaN = matrices.filter(function (m) { return M.Any(m, function (e) { return isNaN(e); }); }).length > 0;
            if (anyScalarNaN || anyMatricesNaN) {
                console.log({
                    dim: this.dim,
                    pi: this.pi,
                    covarianceDet: this.covarianceDet
                });
                console.log({
                    mean: this.mean,
                    covariance: this.covariance,
                    covarianceInv: this.covarianceInv
                });
                throw new Error("NaN in GMM cluster");
            }
        }
        return Params;
    }());
    var Cluster = (function () {
        function Cluster(_pi, _mean, _covariance) {
            this.params = new Params(_pi, _mean, _covariance);
        }
        Cluster.prototype.Likelihood = function (observation) {
            var diff = M.Sub(observation, this.params.mean);
            var diff_Transposed = M.Transpose(diff);
            var exponentMat = M.Mul(M.Mul(diff_Transposed, this.params.covarianceInv), diff);
            var exponent = -0.5 * exponentMat[0][0];
            var result = this.params.coeff * Math.exp(exponent);
            result = isFinite(result) ? result : Number.MAX_SAFE_INTEGER;
            return result;
        };
        return Cluster;
    }());
    exports.Cluster = Cluster;
    function ClusterFactory(_pi, _mean, _covariance) {
        var dim = Math.max.apply(Math, M.Dimensions(_mean));
        if (dim == 3) {
            return new V3Cluster(_pi, _mean, _covariance);
        }
        else {
            return new Cluster(_pi, _mean, _covariance);
        }
    }
    exports.ClusterFactory = ClusterFactory;
    var V3Cluster = (function () {
        function V3Cluster(_pi, _mean, _covariance) {
            this.params = new Params(_pi, _mean, _covariance);
        }
        V3Cluster.prototype.Likelihood = function (observation) {
            var diff = M.Sub(observation, this.params.mean);
            var exponent = -0.5 * Mul_h3_3by3_v3(diff, this.params.covarianceInv);
            var result = this.params.coeff * Math.exp(exponent);
            result = isFinite(result) ? result : Number.MAX_SAFE_INTEGER;
            return result;
        };
        return V3Cluster;
    }());
    exports.V3Cluster = V3Cluster;
    function Mul_h3_3by3_v3(v3, _3by3) {
        var e0 = v3[0][0];
        var e1 = v3[1][0];
        var e2 = v3[2][0];
        var r0 = _3by3[0];
        var r1 = _3by3[1];
        var r2 = _3by3[2];
        var c0 = e0 * r0[0] + e1 * r1[0] + e2 * r2[0];
        var c1 = e0 * r0[1] + e1 * r1[1] + e2 * r2[1];
        var c2 = e0 * r0[2] + e1 * r1[2] + e2 * r2[2];
        return c0 * e0 + c1 * e1 + c2 * e2;
    }
});
define("GMM", ["require", "exports", "Utility", "Matrix", "KMeans", "ConvergenceChecker", "GMMCluster", "Progress"], function (require, exports, Util, Mat, KM, Conv, C, Progress_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GMM = exports.GMMResult = exports.Initializer = void 0;
    var Initializer;
    (function (Initializer) {
        Initializer[Initializer["random"] = 0] = "random";
        Initializer[Initializer["KMeansPlusPlus"] = 1] = "KMeansPlusPlus";
    })(Initializer = exports.Initializer || (exports.Initializer = {}));
    var GMMResult = (function () {
        function GMMResult(likelihoods) {
            this.likelihoods = likelihoods;
        }
        GMMResult.prototype.TotalLikelihood = function () {
            return Util.Sum(this.likelihoods);
        };
        GMMResult.prototype.Normalized = function () {
            var max = Util.Max(this.likelihoods);
            return this.likelihoods.map(function (l) { return l / max; });
        };
        return GMMResult;
    }());
    exports.GMMResult = GMMResult;
    var GMM = (function () {
        function GMM() {
        }
        GMM.prototype.Fit = function (rawData, nClusters, init, MAX_ITER, MIN_PERCENT_CHANGE) {
            if (init === void 0) { init = Initializer.KMeansPlusPlus; }
            if (MAX_ITER === void 0) { MAX_ITER = 20; }
            if (MIN_PERCENT_CHANGE === void 0) { MIN_PERCENT_CHANGE = 1; }
            if (!Mat.IsVector(rawData[0])) {
                throw new Error("GMM.Fit: Error, data points need to be vectors (ideally column vectors)");
            }
            var data = rawData;
            if (Mat.IsRowVector(rawData[0])) {
                data = rawData.map(function (m) { return Mat.Transpose(m); });
            }
            console.time("GMM:Init Clusters");
            var newClusters;
            switch (init) {
                case Initializer.random: {
                    newClusters = this.RandomInit(data, nClusters);
                    break;
                }
                case Initializer.KMeansPlusPlus: {
                    console.time("KMeans");
                    var kMeansResult = KM.Fit(data, nClusters, 20, 1, KM.Initializer.KMeansPlusPlus);
                    var nonEmptyClusters_1 = kMeansResult.clusters.filter(function (c) { return c.length > 0; });
                    console.timeEnd("KMeans");
                    Progress_1.progress.STEP.KMeans.advance();
                    console.time("Points2GMM");
                    newClusters = nonEmptyClusters_1.map(function (c) {
                        var cluster = GMM.Points2GMMCluster(c, data.length);
                        Progress_1.progress.STEP.Points2GMM.advance(1 / nonEmptyClusters_1.length);
                        return cluster;
                    });
                    console.timeEnd("Points2GMM");
                    break;
                }
            }
            console.timeEnd("GMM:Init Clusters");
            console.log("GMM:EM-start");
            var conv = new Conv.ConvergenceChecker(MIN_PERCENT_CHANGE, MAX_ITER);
            var logProb;
            do {
                newClusters = EM(data, newClusters);
                logProb = GMM.LogLikelihood(data, newClusters);
                console.log("Iteration:" + conv.getCurrentIter() + ", logProb:" + logProb);
                Progress_1.progress.reset;
            } while (!conv.hasConverged(logProb));
            this.clusters = newClusters;
        };
        GMM.prototype.Predict = function (rawData) {
            var data = Mat.IsColumnVector(rawData) ? rawData : Mat.Transpose(rawData);
            var predictions = new Array(this.clusters.length);
            for (var i = 0; i < predictions.length; i++) {
                predictions[i] = this.clusters[i].Likelihood(data);
            }
            return new GMMResult(predictions);
        };
        GMM.prototype.RandomInit = function (data, nClusters) {
            var nDim = Mat.Rows(data[0]);
            var selectedIndices = Util.UniqueRandom(nClusters, data.length - 1);
            var equalWeightage = 1 / nClusters;
            return selectedIndices.map(function (i) {
                return C.ClusterFactory(equalWeightage, data[i], Mat.Identity(nDim));
            });
        };
        GMM.labelledDataToGMMs = function (fgLabels, fgGroupSize, bgLabels, bgGroupSize, labels, data) {
            var fgGMM = new GMM();
            var bgGMM = new GMM();
            var createCluster = function (_tags, _groupSizes) {
                var totalPoints = Util.Sum(_groupSizes);
                return _tags.map(function (t, ind) {
                    var groupSize = _groupSizes[ind];
                    var pi = groupSize / totalPoints;
                    var params = Mat.MeanAndCovarianceFromLabelledData(t, labels, data);
                    return C.ClusterFactory(pi, params.mean, params.covariance);
                });
            };
            fgGMM.clusters = createCluster(fgLabels, fgGroupSize);
            bgGMM.clusters = createCluster(bgLabels, bgGroupSize);
            return [fgGMM, bgGMM];
        };
        GMM.PreclusteredDataToGMM = function (clusteredData) {
            var gmm = new GMM();
            var totalPoints = Util.Sum(clusteredData.map(function (c) { return c.length; }));
            gmm.clusters = clusteredData.map(function (c) { return GMM.Points2GMMCluster(c, totalPoints); });
            return gmm;
        };
        GMM.Points2GMMCluster = function (data, dataPointsInGMMSet) {
            if (data.length == 0) {
                throw new Error("GMM cluster cannot be empty");
            }
            var nData = data.length;
            var weight = nData / dataPointsInGMMSet;
            var params = Mat.MeanAndCovariance(data);
            return C.ClusterFactory(weight, params.mean, params.covariance);
        };
        GMM.LogLikelihood = function (data, gmm) {
            var logProb = 0;
            for (var d = 0; d < data.length; d++) {
                var acc = 0;
                for (var c = 0; c < gmm.length; c++) {
                    acc += gmm[c].Likelihood(data[d]);
                }
                logProb += Math.log(acc);
            }
            return logProb;
        };
        return GMM;
    }());
    exports.GMM = GMM;
    function EM(data, initialClusters) {
        var ReplaceZeroes = function (arr, lowerThreshold) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] < lowerThreshold)
                    arr[i] = lowerThreshold;
            }
        };
        if (data.length == 0) {
            throw new Error("Empty data set");
        }
        console.time("EM-init");
        var nDataPoints = data.length;
        var nDims = Mat.Rows(data[0]);
        var nClusters = initialClusters.length;
        var prob = Mat.CreateMatrix(nClusters, nDataPoints);
        var probSum = Util.Fill(data.length, 0);
        console.time("EM-Likelihood-eval");
        for (var c = 0; c < nClusters; c++) {
            var currentCluster = initialClusters[c];
            for (var d = 0; d < nDataPoints; d++) {
                var p = currentCluster.Likelihood(data[d]);
                if (isNaN(p)) {
                    console.log(currentCluster);
                    throw new Error("NaN");
                }
                prob[c][d] = p;
                probSum[d] += p;
            }
        }
        console.timeEnd("EM-Likelihood-eval");
        Progress_1.progress.STEP.EMLikelihoodEval.advance();
        var eps = 1e-9;
        ReplaceZeroes(probSum, eps);
        var resp = Mat.CreateMatrix(nClusters, nDataPoints);
        var clusterResp = Util.Fill(nClusters, 0);
        for (var c = 0; c < nClusters; c++) {
            for (var d = 0; d < nDataPoints; d++) {
                var r = prob[c][d] / probSum[d];
                resp[c][d] = r;
                clusterResp[c] += r;
            }
        }
        ReplaceZeroes(clusterResp, eps);
        console.timeEnd("EM-init");
        var clusterSum = Util
            .FillObj(nClusters, function () { return Mat.CreateMatrix(nDims, 1); });
        console.time("EM-Resp-Sum");
        var fnSumResp = (nDims == 3) ? SumResponsibilityV3 : SumResponsibilityGeneric;
        fnSumResp(data, clusterSum, resp, nClusters);
        for (var c = 0; c < nClusters; c++) {
            if (Mat.Any(clusterSum[c], function (e) { return isNaN(e); })) {
                throw new Error("cluster sum NaN");
            }
        }
        console.timeEnd("EM-Resp-Sum");
        Progress_1.progress.STEP.EMRespSum.advance();
        var means = clusterSum
            .map(function (sum, index) { return Mat.Scale(1 / clusterResp[index], sum); });
        var weights = clusterResp.map(function (x) { return x / nDataPoints; });
        var covAcc = Util.FillObj(nClusters, function () { return Mat.CreateMatrix(nDims, nDims); });
        console.time("EM-cov-cal");
        var fnCovSum = (nDims == 3) ? sumCovarianceV3 : sumCovarianceGeneric;
        fnCovSum(data, nClusters, means, resp, covAcc);
        console.timeEnd("EM-cov-cal");
        Progress_1.progress.STEP.EMCovCal.advance();
        var covariances = covAcc.map(function (cov, ind) { return Mat.Scale(1 / clusterResp[ind], cov); });
        return means.map(function (_, cIndex) {
            return C.ClusterFactory(weights[cIndex], means[cIndex], covariances[cIndex]);
        });
    }
    function SumResponsibilityGeneric(_data, _clusterSum, _resp, _nClusters) {
        for (var c = 0; c < _nClusters; c++) {
            for (var d = 0; d < _data.length; d++) {
                var contribution = Mat.Scale(_resp[c][d], _data[d]);
                Mat.AddInPlace(_clusterSum[c], contribution);
            }
        }
    }
    function SumResponsibilityV3(_data, _clusterSum, _resp, _nClusters) {
        for (var c = 0; c < _nClusters; c++) {
            for (var d = 0; d < _data.length; d++) {
                var dest = _clusterSum[c];
                var scale = _resp[c][d];
                var data = _data[d];
                dest[0][0] += scale * data[0][0];
                dest[1][0] += scale * data[1][0];
                dest[2][0] += scale * data[2][0];
            }
        }
    }
    function sumCovarianceGeneric(_data, _nClusters, _means, _resp, _covAcc) {
        for (var c = 0; c < _nClusters; c++) {
            for (var d = 0; d < _data.length; d++) {
                var diff = Mat.Sub(_data[d], _means[c]);
                var diffTransposed = Mat.Transpose(diff);
                var contribution = Mat.Scale(_resp[c][d], Mat.Mul(diff, diffTransposed));
                Mat.AddInPlace(_covAcc[c], contribution);
            }
        }
    }
    function sumCovarianceV3(_data, _nClusters, _means, _resp, _covAcc) {
        for (var c = 0; c < _nClusters; c++) {
            for (var d = 0; d < _data.length; d++) {
                var v3 = _data[d];
                var m = _means[c];
                var e0 = v3[0][0] - m[0][0];
                var e1 = v3[1][0] - m[1][0];
                var e2 = v3[2][0] - m[2][0];
                var scale = _resp[c][d];
                var dest = _covAcc[c];
                var r0 = dest[0];
                r0[0] += scale * e0 * e0;
                r0[1] += scale * e0 * e1;
                r0[2] += scale * e0 * e2;
                var r1 = dest[1];
                r1[0] += scale * e1 * e0;
                r1[1] += scale * e1 * e1;
                r1[2] += scale * e1 * e2;
                var r2 = dest[2];
                r2[0] += scale * e2 * e0;
                r2[1] += scale * e2 * e1;
                r2[2] += scale * e2 * e2;
            }
        }
    }
});
define("GrabCut", ["require", "exports", "GMM", "BKGraph", "Matrix", "Utility", "ConvergenceChecker", "V3", "Progress"], function (require, exports, GMM, BK, Mat, Util, Conv, V3, Progress_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GrabCut = exports.Trimap = void 0;
    var Trimap;
    (function (Trimap) {
        Trimap[Trimap["Background"] = 0] = "Background";
        Trimap[Trimap["Foreground"] = 1] = "Foreground";
        Trimap[Trimap["Unknown"] = 2] = "Unknown";
    })(Trimap = exports.Trimap || (exports.Trimap = {}));
    var GrabCut = (function () {
        function GrabCut(image, width, height) {
            this.fgGMM = new GMM.GMM();
            this.bgGMM = new GMM.GMM();
            this.height = height;
            this.width = width;
            var nPixels = width * height;
            this.matte = new Uint8Array(nPixels);
            this.trimap = new Uint8Array(nPixels);
            this.flattenedImg = image;
        }
        GrabCut.prototype.SetTrimap = function (trimap, width, height) {
            for (var r = 0; r < height; r++) {
                for (var c = 0; c < width; c++) {
                    var ind = GetArrayIndex(r, c, width);
                    this.trimap[ind] = trimap[r][c];
                }
            }
        };
        GrabCut.prototype.BeginCrop = function (opt) {
            console.log(opt);
            for (var i = 0; i < this.trimap.length; i++) {
                this.matte[i] = (this.trimap[i] == Trimap.Background) ? Trimap.Background : Trimap.Foreground;
            }
            var _a = GrabCut.SegregatePixels(this.flattenedImg, this.matte, 0, 0, this.height, this.width), fgPixels = _a[0], bgPixels = _a[1];
            var GMM_N_ITER = 5;
            var MIN_PERCENT_CHANGE = 1;
            console.time("Grabcut-GM");
            this.fgGMM.Fit(fgPixels, opt.nFGClusters, GMM.Initializer.KMeansPlusPlus, GMM_N_ITER, MIN_PERCENT_CHANGE);
            this.bgGMM.Fit(bgPixels, opt.nBGClusters, GMM.Initializer.KMeansPlusPlus, GMM_N_ITER, MIN_PERCENT_CHANGE);
            console.timeEnd("Grabcut-GM");
            Progress_2.progress.STEP.KMeans.advanceMax();
            Progress_2.progress.STEP.Points2GMM.advanceMax();
            Progress_2.progress.STEP.EMLikelihoodEval.advanceMax();
            Progress_2.progress.STEP.EMRespSum.advanceMax();
            Progress_2.progress.STEP.EMCovCal.advanceMax();
            this.RunIterations(opt.maxIterations, opt.tolerance, opt.cohesionFactor);
        };
        GrabCut.prototype.RunIterations = function (nIter, tolerancePercent, cohesionFactor) {
            var _a;
            var flowNetwork = new BK.BKNetwork();
            var maxFlowSolver = BK.BKMaxflow;
            console.time("Grabcut-Pixel Graph");
            var _b = GrabCut.GeneratePixel2PixelGraph(this.flattenedImg, this.width, this.height, flowNetwork, cohesionFactor), network = _b[0], maxCapacity = _b[1];
            var _c = GrabCut.InitSourceAndSink(network, this.width, this.height), srcNode = _c[0], sinkNode = _c[1];
            console.timeEnd("Grabcut-Pixel Graph");
            var conv = new Conv.ConvergenceChecker(tolerancePercent, nIter);
            var energy;
            var labels = Util.Fill(this.width * this.height, 0);
            console.time("Grabcut-Graph Cut");
            do {
                console.log("iter:" + conv.getCurrentIter());
                console.time("Grabcut-Graph init");
                var filterEmptyGroups = function (indices, groupSize) {
                    var validIndices = [];
                    var nonEmptyGroups = [];
                    for (var i = 0; i < indices.length; i++) {
                        if (groupSize[i] > 0) {
                            validIndices.push(indices[i]);
                            nonEmptyGroups.push(groupSize[i]);
                        }
                    }
                    return [validIndices, nonEmptyGroups];
                };
                console.time("Graphcut-Graph GMM-recomputation");
                var _d = GrabCut.LabelPixels(this.matte, this.height, this.width, this.fgGMM, this.bgGMM, this.flattenedImg, labels), fgInd = _d[0], fgGroupSizes = _d[1], bgInd = _d[2], bgGroupSizes = _d[3];
                var _e = filterEmptyGroups(fgInd, fgGroupSizes), validFgInd = _e[0], validFgGroupSizes = _e[1];
                var _f = filterEmptyGroups(bgInd, bgGroupSizes), validBgInd = _f[0], validBgGroupSizes = _f[1];
                _a = GMM.GMM.labelledDataToGMMs(validFgInd, validFgGroupSizes, validBgInd, validBgGroupSizes, labels, this.flattenedImg), this.fgGMM = _a[0], this.bgGMM = _a[1];
                console.timeEnd("Graphcut-Graph GMM-recomputation");
                Progress_2.progress.STEP.GrabcutGMMRecomputation.advance();
                console.log("fg clusters:" + this.fgGMM.clusters.length + ", bg clusters:" + this.bgGMM.clusters.length);
                console.time("Grabcut-Graph source sink update");
                GrabCut.UpdateSourceAndSink(network, maxCapacity, this.fgGMM, this.bgGMM, this.flattenedImg, this.width, this.height, this.trimap, srcNode, sinkNode);
                console.timeEnd("Grabcut-Graph source sink update");
                Progress_2.progress.STEP.GrabcutGraphSourceSinkUpdate.advance();
                console.time("Grabcut-Graph flow reset");
                network.ResetFlow();
                console.timeEnd("Grabcut-Graph flow reset");
                Progress_2.progress.STEP.GrabcutGraphFlowReset.advance();
                console.timeEnd("Grabcut-Graph init");
                console.time("Grabcut-Graph maxflow");
                console.log('max flow');
                var flowResult = maxFlowSolver(srcNode, sinkNode, network);
                console.timeEnd("Grabcut-Graph maxflow");
                console.time("Grabcut-Graph cut");
                console.log('cut');
                var fgPixelIndices = flowResult.GetSourcePartition();
                GrabCut.UpdateMatte(this.matte, this.trimap, fgPixelIndices);
                energy = flowResult.GetMaxFlow();
                console.timeEnd("Grabcut-Graph cut");
                Progress_2.progress.STEP.GrabcutGraphCut.advance();
                console.log("Energy: " + energy);
            } while (!conv.hasConverged(energy));
            console.timeEnd("Grabcut-Graph Cut");
            Progress_2.progress.STEP.GrabcutGMMRecomputation.advanceMax();
            Progress_2.progress.STEP.GrabcutGraphSourceSinkUpdate.advanceMax();
            Progress_2.progress.STEP.GrabcutGraphFlowReset.advanceMax();
            Progress_2.progress.STEP.GrabcutGraphMaxFlow.advanceMax();
            Progress_2.progress.STEP.GrabcutGraphCut.advanceMax();
        };
        GrabCut.prototype.GetAlphaMask = function () {
            var alpha = Mat.CreateMatrix(this.height, this.width);
            for (var i = 0; i < this.matte.length; i++) {
                var _a = get2DArrayIndex(i, this.width), r = _a[0], c = _a[1];
                alpha[r][c] = (this.matte[i] == Trimap.Foreground) ? 1.0 : 0.0;
            }
            return alpha;
        };
        GrabCut.UpdateMatte = function (matte, trimap, fgPixelIndices) {
            var indexTable = Util.HashItems(fgPixelIndices, function (n) { return n; });
            for (var i = 0; i < matte.length; i++) {
                if (trimap[i] == Trimap.Unknown) {
                    var isFG = indexTable.ContainsKey(i);
                    matte[i] = (isFG) ? Trimap.Foreground : Trimap.Background;
                }
            }
        };
        GrabCut.SegregatePixels = function (img, matte, top, left, height, width) {
            var fgPixels = [];
            var bgPixels = [];
            for (var idx = 0; idx < img.length; idx++) {
                var currentPixel = img[idx];
                if (matte[idx] == Trimap.Foreground)
                    fgPixels.push(currentPixel);
                else
                    bgPixels.push(currentPixel);
            }
            return [fgPixels, bgPixels];
        };
        GrabCut.LabelPixels = function (matte, height, width, fgGMM, bgGMM, img, labels) {
            var nFGClusters = fgGMM.clusters.length;
            var nBGClusters = bgGMM.clusters.length;
            var fgGroupSizes = Util.Fill(nFGClusters, 0);
            var bgGroupSizes = Util.Fill(nBGClusters, 0);
            var maxIndex = function (arr) {
                var max = -Number.MAX_SAFE_INTEGER;
                var maxInd = 0;
                for (var i = 0; i < arr.length; i++) {
                    var current = arr[i];
                    if (current > max) {
                        maxInd = i;
                        max = current;
                    }
                }
                return maxInd;
            };
            for (var r = 0; r < height; r++) {
                for (var c = 0; c < width; c++) {
                    var linearIndex = GetArrayIndex(r, c, width);
                    var pixelIsFG = matte[linearIndex] == Trimap.Foreground;
                    var currentPixel = img[linearIndex];
                    if (pixelIsFG) {
                        var likelihoods = fgGMM.Predict(currentPixel).likelihoods;
                        var fgGroup = maxIndex(likelihoods);
                        fgGroupSizes[fgGroup]++;
                        labels[linearIndex] = 0 + fgGroup;
                    }
                    else {
                        var likelihoods = bgGMM.Predict(currentPixel).likelihoods;
                        var bgGroup = maxIndex(likelihoods);
                        bgGroupSizes[bgGroup]++;
                        labels[linearIndex] = nFGClusters + bgGroup;
                    }
                }
            }
            var fgIndices = Util.Range(0, nFGClusters);
            var bgIndices = Util.Range(nFGClusters, nFGClusters + nBGClusters);
            return [fgIndices, fgGroupSizes, bgIndices, bgGroupSizes];
        };
        GrabCut.GeneratePixel2PixelGraph = function (img, width, height, network, cohesionFactor) {
            var isV3 = V3.isV3(img[0]);
            {
                var nPixels = height * width;
                for (var i = 0; i < nPixels; i++) {
                    network.CreateNode();
                }
            }
            var neighbours = [[0, -1], [-1, 0], [0, 1], [1, 0]];
            var coeff = neighbours.map(function (t) { return cohesionFactor / Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2)); });
            var GetNeighbour = function (r, c, neighbourInd) {
                var offset = neighbours[neighbourInd];
                var nR = r + offset[0];
                var nC = c + offset[1];
                var validNeighbour = WithinBounds(nR, nC, width, height);
                return [validNeighbour, nR, nC];
            };
            var nCount = 0;
            var diffAcc = 0;
            var fnDiffSquare = (isV3) ?
                V3.DiffNormSquare :
                function (v1, v2) { return Mat.NormSquare(Mat.Sub(v1, v2)); };
            var progressScale = 1 / height / 2;
            for (var r = 0; r < height; r++) {
                for (var c = 0; c < width; c++) {
                    var linearInd = GetArrayIndex(r, c, width);
                    var currentPixel = img[linearInd];
                    for (var i = 0; i < neighbours.length; i++) {
                        var _a = GetNeighbour(r, c, i), validNeighbour = _a[0], nR = _a[1], nC = _a[2];
                        if (!validNeighbour)
                            continue;
                        var neighbourInd = GetArrayIndex(nR, nC, width);
                        var neighbouringPixel = img[neighbourInd];
                        var diffSquare = fnDiffSquare(currentPixel, neighbouringPixel);
                        diffAcc += diffSquare;
                        nCount++;
                    }
                }
                Progress_2.progress.STEP.GrabcutPixelGraph.advance(progressScale);
            }
            var beta = 0.5 / (diffAcc / nCount);
            var maxCap = -Number.MAX_SAFE_INTEGER;
            for (var r = 0; r < height; r++) {
                for (var c = 0; c < width; c++) {
                    var nodeIndex = GetArrayIndex(r, c, width);
                    for (var i = 0; i < neighbours.length; i++) {
                        var _b = GetNeighbour(r, c, i), validNeighbour = _b[0], nR = _b[1], nC = _b[2];
                        if (!validNeighbour)
                            continue;
                        var neighbourIndex = GetArrayIndex(nR, nC, width);
                        var diffSquare = fnDiffSquare(img[nodeIndex], img[neighbourIndex]);
                        var exponent = -beta * diffSquare;
                        var capacity = coeff[i] * Math.exp(exponent);
                        if (isNaN(capacity)) {
                            console.log({
                                coeff: coeff,
                                beta: beta,
                                exponent: exponent,
                                capacity: capacity
                            });
                        }
                        network.CreateEdge(nodeIndex, neighbourIndex, capacity);
                        maxCap = (capacity > maxCap) ? capacity : maxCap;
                    }
                }
                Progress_2.progress.STEP.GrabcutPixelGraph.advance(progressScale);
            }
            console.log("Pixel to pixel maximum capacity:" + maxCap);
            return [network, maxCap];
        };
        GrabCut.InitSourceAndSink = function (network, width, height) {
            var srcInd = network.CreateNode();
            var sinkInd = network.CreateNode();
            for (var r = 0; r < height; r++) {
                for (var c = 0; c < width; c++) {
                    var pixelNodeInd = GetArrayIndex(r, c, width);
                    network.CreateEdge(srcInd, pixelNodeInd, 0);
                }
            }
            for (var r = 0; r < height; r++) {
                for (var c = 0; c < width; c++) {
                    var pixelNodeInd = GetArrayIndex(r, c, width);
                    network.CreateEdge(pixelNodeInd, sinkInd, 0);
                }
            }
            return [srcInd, sinkInd];
        };
        GrabCut.UpdateSourceAndSink = function (network, maxCap, gmmFG, gmmBG, image, width, height, trimap, srcNode, sinkNode) {
            var nPixels = width * height;
            for (var idx = 0; idx < nPixels; idx++) {
                switch (trimap[idx]) {
                    case Trimap.Foreground: {
                        network.UpdateEdge(srcNode, idx, maxCap);
                        network.UpdateEdge(idx, sinkNode, 0);
                        break;
                    }
                    case Trimap.Background: {
                        network.UpdateEdge(srcNode, idx, 0);
                        network.UpdateEdge(idx, sinkNode, maxCap);
                        break;
                    }
                    case Trimap.Unknown: {
                        var currentPixel = image[idx];
                        var pFore = GrabCut.GetTLinkWeight(gmmBG, currentPixel);
                        var pBack = GrabCut.GetTLinkWeight(gmmFG, currentPixel);
                        network.UpdateEdge(srcNode, idx, pFore);
                        network.UpdateEdge(idx, sinkNode, pBack);
                        break;
                    }
                }
            }
        };
        GrabCut.GetTLinkWeight = function (gmm, pixel) {
            var gmmResult = gmm.Predict(pixel).TotalLikelihood();
            var res = -Math.log(gmmResult);
            if (isNaN(res)) {
                console.log({
                    gmm: gmm,
                    res: res,
                    pixel: pixel,
                    gmmResult: gmmResult
                });
                return 0;
            }
            return res;
        };
        return GrabCut;
    }());
    exports.GrabCut = GrabCut;
    function WithinBounds(row, col, width, height) {
        return (row >= 0 && row < height) && (col >= 0 && col < width);
    }
    function GetArrayIndex(row, col, width) {
        return row * width + col;
    }
    function get2DArrayIndex(index1D, width) {
        var row = Math.floor(index1D / width);
        var col = index1D % width;
        return [row, col];
    }
});
define("Progress", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.progress = void 0;
    var ProgressStep = (function () {
        function ProgressStep(total) {
            this.total = total;
            this.maxIterations = 1;
            this.currIterations = 0;
        }
        ProgressStep.prototype.reset = function (maxIterations) {
            if (maxIterations === void 0) { maxIterations = 1; }
            this.maxIterations = maxIterations;
            this.currIterations = 0;
            return this.maxIterations * this.total;
        };
        ProgressStep.prototype.advance = function (value) {
            if (value === void 0) { value = 1; }
            if (this.currIterations < this.maxIterations) {
                value = Math.min(this.maxIterations - this.currIterations, value);
                this.currIterations += value;
                exports.progress.onAdvanced(this.total * value);
                return this.total;
            }
            else {
                return 0;
            }
        };
        ProgressStep.prototype.advanceTo = function (scale) {
            if (this.currIterations < this.maxIterations) {
                var next = Math.min(this.maxIterations, Math.floor(this.currIterations + 1));
                var diff = next - this.currIterations;
                var value = diff * scale;
                this.currIterations += value;
                exports.progress.onAdvanced(this.total * value);
                return this.total;
            }
            else {
                return 0;
            }
        };
        ProgressStep.prototype.advanceMax = function () {
            if (this.currIterations < this.maxIterations) {
                var diff = this.maxIterations - this.currIterations;
                this.currIterations = this.maxIterations;
                exports.progress.onAdvanced(this.total * diff);
                return this.total * diff;
            }
            else {
                return 0;
            }
        };
        return ProgressStep;
    }());
    var Progress = (function () {
        function Progress() {
            this.STEP = {
                PREPARE_TRIMAP: new ProgressStep(200),
                PREPARE_IMGDATA: new ProgressStep(425),
                KMeans: new ProgressStep(711),
                Points2GMM: new ProgressStep(825),
                EMLikelihoodEval: new ProgressStep(600),
                EMRespSum: new ProgressStep(79),
                EMCovCal: new ProgressStep(110),
                GrabcutPixelGraph: new ProgressStep(6138),
                GrabcutGMMRecomputation: new ProgressStep(2474),
                GrabcutGraphSourceSinkUpdate: new ProgressStep(1217),
                GrabcutGraphFlowReset: new ProgressStep(54),
                GrabcutGraphMaxFlow: new ProgressStep(8000),
                GrabcutGraphCut: new ProgressStep(350),
                GetAlphaMask: new ProgressStep(90),
            };
        }
        Progress.prototype.reset = function (workerScope, options) {
            this.workerScope = workerScope;
            this.total = 0;
            this.current = 0;
            this.stopped = false;
            var steps = this.STEP;
            this.total += steps.PREPARE_TRIMAP.reset();
            this.total += steps.PREPARE_IMGDATA.reset();
            this.total += steps.KMeans.reset(2);
            this.total += steps.Points2GMM.reset(2);
            var iterations = 20;
            this.total += steps.EMLikelihoodEval.reset(iterations);
            this.total += steps.EMRespSum.reset(iterations);
            this.total += steps.EMCovCal.reset(iterations);
            this.total += steps.GrabcutPixelGraph.reset();
            iterations = options.maxIterations;
            this.total += steps.GrabcutGMMRecomputation.reset(iterations);
            this.total += steps.GrabcutGraphSourceSinkUpdate.reset(iterations);
            this.total += steps.GrabcutGraphFlowReset.reset(iterations);
            this.total += steps.GrabcutGraphMaxFlow.reset(iterations);
            this.total += steps.GrabcutGraphCut.reset(iterations);
            this.total += steps.GetAlphaMask.reset();
        };
        Progress.prototype.onAdvanced = function (value) {
            if (this.stopped) {
                throw new Error('cancelled');
            }
            this.current += value;
            this.workerScope.postMessage({ type: 'progress', progress: this.current, total: this.total });
        };
        Progress.prototype.stop = function () {
            this.stopped = true;
            this.workerScope && this.workerScope.postMessage({ type: 'cancelled' });
        };
        return Progress;
    }());
    exports.progress = new Progress();
});
define("BKGraph", ["require", "exports", "Collections/Dictionary", "Collections/Queue", "Utility", "Progress"], function (require, exports, Dict, Q, Util, Progress_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BKMaxflow = exports.BKNetwork = exports.TreeFlag = void 0;
    var TreeFlag;
    (function (TreeFlag) {
        TreeFlag[TreeFlag["Free"] = 0] = "Free";
        TreeFlag[TreeFlag["S"] = 1] = "S";
        TreeFlag[TreeFlag["T"] = 2] = "T";
    })(TreeFlag = exports.TreeFlag || (exports.TreeFlag = {}));
    var BKEdge = (function () {
        function BKEdge(from, to, capacity, index) {
            this.cap = capacity;
            this.flow = 0;
            this.to = to;
            this.from = from;
            this.ind = index;
        }
        return BKEdge;
    }());
    var BKNode = (function () {
        function BKNode() {
            this.edgesOut = [];
            this.edgesIn = [];
        }
        return BKNode;
    }());
    var BKNetwork = (function () {
        function BKNetwork() {
            this.nodes = [];
            this.edges = [];
            this.edgeList = [];
        }
        BKNetwork.prototype.CreateNode = function () {
            var ind = this.nodes.length;
            this.nodes.push(new BKNode());
            this.edgeList.push(new Dict.ObjectDict());
            return ind;
        };
        BKNetwork.prototype.CreateEdge = function (source, dest, capacity) {
            if (isNaN(capacity))
                throw new Error("capacity cannot be NaN");
            if (!isFinite(capacity))
                throw new Error("Infinite capacity");
            var edgeInd = this.edges.length;
            var edge = new BKEdge(source, dest, capacity, edgeInd);
            this.edges.push(edge);
            this.nodes[source].edgesOut.push(edge);
            this.nodes[dest].edgesIn.push(edge);
            this.edgeList[source].Set(dest, edge);
            return edgeInd;
        };
        BKNetwork.prototype.UpdateEdge = function (srcIndex, destInd, newCap) {
            var targetEdge = this.edgeList[srcIndex].Get(destInd);
            targetEdge.cap = newCap;
        };
        BKNetwork.prototype.ResetFlow = function () {
            var edges = this.edges;
            for (var i = 0; i < edges.length; i++) {
                edges[i].flow = 0;
            }
        };
        BKNetwork.prototype.Clone = function () {
            var clone = new BKNetwork();
            for (var i = 0; i < this.nodes.length; i++)
                clone.CreateNode();
            var oE = this.edges;
            for (var i = 0; i < oE.length; i++) {
                var oEdge = oE[i];
                var cEdgeInd = clone.CreateEdge(oEdge.from, oEdge.to, oEdge.cap);
                var cEdge = clone.edges[cEdgeInd];
                cEdge.flow = oEdge.flow;
            }
            return clone;
        };
        return BKNetwork;
    }());
    exports.BKNetwork = BKNetwork;
    var NULL_PARENT = -1;
    function BKGrow(nodes, active, flags, parents, edgeToParent, activeEdge) {
        while (active.Count() > 0) {
            var nInd = active.Peek();
            var group = flags[nInd];
            var n = nodes[nInd];
            if (group == TreeFlag.S) {
                var edgesOut = n.edgesOut;
                for (var i = activeEdge[nInd]; i < edgesOut.length; i++) {
                    var e = edgesOut[i];
                    if (e.flow >= e.cap)
                        continue;
                    var destNodeInd = e.to;
                    if (flags[destNodeInd] == TreeFlag.T) {
                        return e;
                    }
                    else if (flags[destNodeInd] == TreeFlag.Free) {
                        flags[destNodeInd] = group;
                        parents[destNodeInd] = nInd;
                        edgeToParent[destNodeInd] = e;
                        active.Enqueue(destNodeInd);
                    }
                    activeEdge[nInd] = i;
                }
            }
            else {
                var edgesIn = n.edgesIn;
                for (var i = activeEdge[nInd]; i < edgesIn.length; i++) {
                    var e = edgesIn[i];
                    if (e.flow >= e.cap)
                        continue;
                    var destNodeInd = e.from;
                    if (flags[destNodeInd] == TreeFlag.S) {
                        return e;
                    }
                    else if (flags[destNodeInd] == TreeFlag.Free) {
                        flags[destNodeInd] = group;
                        parents[destNodeInd] = nInd;
                        edgeToParent[destNodeInd] = e;
                        active.Enqueue(destNodeInd);
                    }
                    activeEdge[nInd] = i;
                }
            }
            active.Dequeue();
            activeEdge[nInd] = 0;
        }
        return null;
    }
    function BKBottleneck(src, sink, connector, edgeToParent) {
        var bottleneck = connector.cap - connector.flow;
        {
            var walkS = connector.from;
            while (walkS != src) {
                var edge = edgeToParent[walkS];
                bottleneck = Math.min(bottleneck, edge.cap - edge.flow);
                walkS = edge.from;
            }
        }
        {
            var walkT = connector.to;
            while (walkT != sink) {
                var edge = edgeToParent[walkT];
                bottleneck = Math.min(bottleneck, edge.cap - edge.flow);
                walkT = edge.to;
            }
        }
        return bottleneck;
    }
    function BKAugment(bottleneck, src, sink, connector, edgeToParent, orphanSet, parents) {
        connector.flow += bottleneck;
        {
            var walkS = connector.from;
            while (walkS != src) {
                var edge = edgeToParent[walkS];
                edge.flow += bottleneck;
                if (edge.cap <= edge.flow) {
                    parents[walkS] = NULL_PARENT;
                    orphanSet.push(walkS);
                }
                walkS = edge.from;
            }
        }
        {
            var walkT = connector.to;
            while (walkT != sink) {
                var edge = edgeToParent[walkT];
                edge.flow += bottleneck;
                if (edge.cap <= edge.flow) {
                    parents[walkT] = NULL_PARENT;
                    orphanSet.push(walkT);
                }
                walkT = edge.to;
            }
        }
    }
    function LinkedToSource(nodeInd, srcInd, parents, edgeToParent) {
        var walkS = nodeInd;
        while (walkS != srcInd) {
            if (parents[walkS] == NULL_PARENT)
                return false;
            var edge = edgeToParent[walkS];
            walkS = edge.from;
        }
        return true;
    }
    function LinkedToSink(nodeInd, sinkInd, parents, edgeToParent) {
        var walkT = nodeInd;
        while (walkT != sinkInd) {
            if (parents[walkT] == NULL_PARENT)
                return false;
            var edge = edgeToParent[walkT];
            walkT = edge.to;
        }
        return true;
    }
    function BKAdopt(nodes, orphanSet, flags, parents, edgeToParent, activeSet, src, sink) {
        while (orphanSet.length > 0) {
            var ind = orphanSet.pop();
            var orphanNode = nodes[ind];
            var group = flags[ind];
            var isSourceTree = group == TreeFlag.S;
            var parentFound = false;
            {
                var edges = (isSourceTree) ? orphanNode.edgesIn : orphanNode.edgesOut;
                for (var i = 0; i < edges.length; i++) {
                    var e = edges[i];
                    var parentInd = (isSourceTree) ? e.from : e.to;
                    var unsaturated = e.cap > e.flow;
                    var sameGroup = flags[parentInd] == group;
                    if (unsaturated && sameGroup) {
                        var linkedToSource = (isSourceTree) ?
                            LinkedToSource(e.from, src, parents, edgeToParent) :
                            LinkedToSink(e.to, sink, parents, edgeToParent);
                        if (linkedToSource) {
                            parentFound = true;
                            parents[ind] = parentInd;
                            edgeToParent[ind] = e;
                            break;
                        }
                    }
                }
            }
            if (parentFound)
                continue;
            {
                if (isSourceTree) {
                    var edgesIn = orphanNode.edgesIn;
                    for (var i = 0; i < edgesIn.length; i++) {
                        var e = edgesIn[i];
                        if (e.flow < e.cap && flags[e.from] == group) {
                            if (!activeSet.Contains(e.from)) {
                                activeSet.Enqueue(e.from);
                            }
                        }
                    }
                    var edgesOut = orphanNode.edgesOut;
                    for (var i = 0; i < edgesOut.length; i++) {
                        var e = edgesOut[i];
                        if (flags[e.to] == group && parents[e.to] == ind) {
                            orphanSet.push(e.to);
                            parents[e.to] = NULL_PARENT;
                        }
                    }
                }
                else {
                    var edgesOut = orphanNode.edgesOut;
                    for (var i = 0; i < edgesOut.length; i++) {
                        var e = edgesOut[i];
                        if (e.flow < e.cap && flags[e.to] == group) {
                            if (!activeSet.Contains(e.to)) {
                                activeSet.Enqueue(e.to);
                            }
                        }
                    }
                    var edgesIn = orphanNode.edgesIn;
                    for (var i = 0; i < edgesIn.length; i++) {
                        var e = edgesIn[i];
                        if (flags[e.from] == group && parents[e.from] == ind) {
                            orphanSet.push(e.from);
                            parents[e.from] = NULL_PARENT;
                        }
                    }
                }
            }
            flags[ind] = TreeFlag.Free;
            if (activeSet.Contains(ind)) {
                activeSet.Remove(ind);
            }
        }
    }
    exports.BKMaxflow = function (src, sink, network) {
        var nodes = network.nodes;
        var active = new Q.LabelledCircularQueue();
        var activeEdge = Util.Fill(nodes.length, 0);
        var flags = new Uint8Array(nodes.length);
        var parents = Util.Fill(nodes.length, NULL_PARENT);
        var edgeToParent = Util.Fill(nodes.length, null);
        var orphans = [];
        active.Enqueue(src);
        active.Enqueue(sink);
        flags[src] = TreeFlag.S;
        flags[sink] = TreeFlag.T;
        var progressScale = 1 / 20;
        var count = 0;
        while (true) {
            ++count;
            var connector = BKGrow(nodes, active, flags, parents, edgeToParent, activeEdge);
            if (connector == null)
                break;
            var min = BKBottleneck(src, sink, connector, edgeToParent);
            BKAugment(min, src, sink, connector, edgeToParent, orphans, parents);
            BKAdopt(nodes, orphans, flags, parents, edgeToParent, active, src, sink);
            if (count % 10000 == 0) {
                Progress_3.progress.STEP.GrabcutGraphMaxFlow.advanceTo(progressScale);
            }
        }
        console.log('max flow loop = ' + count);
        Progress_3.progress.STEP.GrabcutGraphMaxFlow.advanceTo(1);
        var sourceOutflux = function () { return Util.Sum(nodes[src].edgesOut.map(function (e) { return e.flow; })); };
        var STreeIndices = function () {
            return Array.from(flags)
                .map(function (f, ind) { return [f, ind]; })
                .filter(function (t) { return t[0] == TreeFlag.S; })
                .map(function (t) { return t[1]; });
        };
        return {
            GetMaxFlow: sourceOutflux,
            GetSourcePartition: STreeIndices
        };
    };
});
define("ClusterGenerator", ["require", "exports", "Utility", "Matrix"], function (require, exports, Util, Mat) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UniformClusters = void 0;
    function UniformClusters(mean, spread, nPoints) {
        var lower = Mat.Scale(-1, spread);
        var upper = spread;
        var points = Util.FillObj(nPoints, function () { return Mat.Clone(mean); });
        for (var i = 0; i < nPoints; i++) {
            var randomOffsets = Mat.RandomFill(lower, upper);
            Mat.AddInPlace(points[i], randomOffsets);
        }
        return points;
    }
    exports.UniformClusters = UniformClusters;
});
define("DinicFlowSolver", ["require", "exports", "Utility", "Collections/Dictionary", "Collections/Queue"], function (require, exports, Util, Dict, Q) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DinicSolver = exports.MinCut = exports.DinicMaxFlow = exports.DinicNetwork = exports.GraphNode = exports.Edge = void 0;
    var Edge = (function () {
        function Edge(_src, _sink, _cap, _id) {
            this.sink = _sink;
            this.source = _src;
            this.capacity = _cap;
            this.flow = 0;
            this.id = _id;
        }
        return Edge;
    }());
    exports.Edge = Edge;
    var GraphNode = (function () {
        function GraphNode(_id) {
            this.id = _id;
            this.edges = [];
        }
        return GraphNode;
    }());
    exports.GraphNode = GraphNode;
    var DinicNetwork = (function () {
        function DinicNetwork() {
            this.edgeMap = [];
            this.nodeList = [];
            this.edgeList = [];
        }
        DinicNetwork.prototype.CreateNode = function () {
            var count = this.nodeList.length;
            this.nodeList.push(new GraphNode(count));
            this.edgeMap.push(new Dict.ObjectDict());
            return count;
        };
        DinicNetwork.prototype.CreateEdge = function (source, sink, capacity) {
            var count = this.edgeList.length;
            var newEdge = new Edge(source, sink, capacity, count);
            var residualEdge = new Edge(sink, source, 0, count + 1);
            newEdge.reverse = residualEdge.id;
            residualEdge.reverse = newEdge.id;
            this.nodeList[source].edges.push(newEdge);
            this.nodeList[sink].edges.push(residualEdge);
            this.edgeList.push(newEdge);
            this.edgeList.push(residualEdge);
            this.edgeMap[source].Set(sink, count);
            return count;
        };
        DinicNetwork.prototype.ResetFlow = function () {
            var edges = this.edgeList;
            for (var i = 0; i < edges.length; i++) {
                edges[i].flow = 0;
            }
        };
        DinicNetwork.prototype.UpdateEdge = function (srcNodeInd, destNodeInd, newCap) {
            var targetEdgeInd = this.edgeMap[srcNodeInd].Get(destNodeInd);
            this.edgeList[targetEdgeInd].capacity = newCap;
        };
        DinicNetwork.prototype.Clone = function () {
            var clone = new DinicNetwork();
            for (var i = 0; i < this.nodeList.length; i++)
                clone.CreateNode();
            var originalEdges = this.edgeList;
            for (var i = 0; i < originalEdges.length; i += 2) {
                var oEdge = originalEdges[i];
                var oRes = originalEdges[i + 1];
                var cEdgeInd = clone.CreateEdge(oEdge.source, oEdge.sink, oEdge.capacity);
                var cEdge = clone.edgeList[cEdgeInd];
                var cRes = clone.edgeList[cEdgeInd + 1];
                cEdge.flow = oEdge.flow;
                cRes.flow = oRes.flow;
            }
            return clone;
        };
        return DinicNetwork;
    }());
    exports.DinicNetwork = DinicNetwork;
    var lGraph = 0;
    var fPath = 0;
    var nAugment = 0;
    function DinicLevelGraph(sinkID, sourceID, nodes, visitedArr, levelGraph) {
        lGraph++;
        Util.Memset(levelGraph, -1);
        var _a = visitedArr.UpdateToken(), visited = _a[0], visitedToken = _a[1];
        var nodeFrontier = new Q.CircularBufferQueue();
        var depthFrontier = new Q.CircularBufferQueue();
        nodeFrontier.Enqueue(sourceID);
        depthFrontier.Enqueue(0);
        visited[sourceID] = visitedToken;
        while (nodeFrontier.Count() > 0) {
            var nodeID = nodeFrontier.Dequeue();
            var depth = depthFrontier.Dequeue();
            levelGraph[nodeID] = depth;
            var node = nodes[nodeID];
            var edges = node.edges;
            var nextDepth = depth + 1;
            for (var i = 0; i < edges.length; i++) {
                var e = edges[i];
                if ((e.capacity - e.flow) > 0 &&
                    (visited[e.sink] != visitedToken)) {
                    visited[e.sink] = visitedToken;
                    nodeFrontier.Enqueue(e.sink);
                    depthFrontier.Enqueue(nextDepth);
                }
            }
        }
        var pathFound = levelGraph[sinkID] != -1;
        return pathFound;
    }
    function DinicFindPath(sinkID, sourceID, nodes, visitedArr, levelGraph, path, activeEdge) {
        fPath++;
        var _a = visitedArr.UpdateToken(), visited = _a[0], visitedToken = _a[1];
        path[sinkID] = -1;
        path[sourceID] = -1;
        var stack = [];
        stack.push(sourceID);
        visited[sourceID] = visitedToken;
        while (stack.length > 0) {
            var nodeID = stack[stack.length - 1];
            if (nodeID == sinkID)
                break;
            var edgeList = nodes[nodeID].edges;
            var nodeFound = false;
            for (var i = activeEdge[nodeID]; i < edgeList.length; i++) {
                var e = edgeList[i];
                if ((levelGraph[nodeID] < levelGraph[e.sink]) &&
                    (e.capacity - e.flow > 0) &&
                    (visited[e.sink] != visitedToken)) {
                    visited[e.sink] = visitedToken;
                    path[e.sink] = e.id;
                    stack.push(e.sink);
                    nodeFound = true;
                    break;
                }
                else {
                    activeEdge[nodeID] += 1;
                }
            }
            if (!nodeFound) {
                stack.pop();
            }
        }
        var augmentingPathFound = (path[sinkID] >= 0);
        return augmentingPathFound;
    }
    function DinicAugmentFlow(sinkID, sourceID, edges, path) {
        nAugment++;
        var MAX_INT = 9007199254740991;
        var walk = sinkID;
        var bottleneck = MAX_INT;
        while (walk != sourceID) {
            var edge = edges[path[walk]];
            var remainingCapacity = edge.capacity - edge.flow;
            bottleneck = Math.min(bottleneck, remainingCapacity);
            walk = edge.source;
        }
        walk = sinkID;
        while (walk != sourceID) {
            var edge = edges[path[walk]];
            var reverse = edges[edge.reverse];
            edge.flow += bottleneck;
            reverse.flow -= bottleneck;
            walk = edge.source;
        }
    }
    function DinicMaxFlow(network, sourceID, sinkID) {
        lGraph = 0;
        fPath = 0;
        nAugment = 0;
        var nodes = network.nodeList;
        var edges = network.edgeList;
        var levelGraph = Util.Fill(nodes.length, 0);
        var visitedArr = new Dict.VisitedArray(nodes.length);
        var path = Util.Fill(nodes.length, -1);
        var pathFound = true;
        var activeEdge = Util.Fill(nodes.length, 0);
        while (pathFound) {
            pathFound = DinicLevelGraph(sinkID, sourceID, nodes, visitedArr, levelGraph);
            if (!pathFound)
                continue;
            var augmentedFlow = true;
            Util.Memset(activeEdge, 0);
            while (augmentedFlow) {
                augmentedFlow = DinicFindPath(sinkID, sourceID, nodes, visitedArr, levelGraph, path, activeEdge);
                if (!augmentedFlow)
                    continue;
                DinicAugmentFlow(sinkID, sourceID, edges, path);
            }
        }
        console.log("calls to levelGraph:" + lGraph + "\ncalls to fPath:" + fPath + "\ncalls to augment:" + nAugment);
        return levelGraph;
    }
    exports.DinicMaxFlow = DinicMaxFlow;
    function MinCut(network, sourceID, sinkID, levelGraph) {
        var minCutIndices = [];
        var visitedNodeList = [];
        var nodes = network.nodeList;
        var visited = Util.Fill(nodes.length, false);
        var frontier = new Q.CircularBufferQueue();
        frontier.Enqueue(sourceID);
        visited[sourceID] = true;
        while (frontier.Count() > 0) {
            var nodeID = frontier.Dequeue();
            visitedNodeList.push(nodeID);
            var currentNode = nodes[nodeID];
            currentNode.edges.forEach(function (e) {
                var nextNodeID = e.sink;
                if (!visited[nextNodeID]) {
                    if (levelGraph[nextNodeID] >= 0) {
                        visited[nextNodeID] = true;
                        frontier.Enqueue(nextNodeID);
                    }
                    else {
                        if (e.capacity > 0) {
                            minCutIndices.push(e.id);
                        }
                    }
                }
            });
        }
        return { nodeList: visitedNodeList, edgeIndices: minCutIndices };
    }
    exports.MinCut = MinCut;
    exports.DinicSolver = function (src, sink, network) {
        var levelGraph = DinicMaxFlow(network, src, sink);
        var minCut = MinCut(network, src, sink, levelGraph);
        var sourceOutflux = function () {
            var srcNode = network.nodeList[src];
            return Util.Sum(srcNode.edges.map(function (e) { return e.flow; }));
        };
        var STreeIndices = function () { return minCut.nodeList; };
        return {
            GetMaxFlow: sourceOutflux,
            GetSourcePartition: STreeIndices
        };
    };
});
define("geoms/Point", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Point = void 0;
    var Point = (function () {
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Point.prototype.set = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Point.interpolate = function (point1, point2, f, result) {
            result = result || new Point();
            var dx = point1.x - point2.x;
            var dy = point1.y - point2.y;
            result.set(point2.x + dx * f, point2.y + dy * f);
            return result;
        };
        Point.distance = function (point1, point2) {
            var dx = point1.x - point2.x;
            var dy = point1.y - point2.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        Point.polar = function (len, angle, result) {
            if (result) {
                result.set(Math.cos(angle) * len, Math.sin(angle) * len);
                return result;
            }
            return new Point(Math.cos(angle) * len, Math.sin(angle) * len);
        };
        Point.fromPIXIPoint = function (point, result) {
            if (result) {
                result.set(point.x, point.y);
                return result;
            }
            return new Point(point.x, point.y);
        };
        Point.fromXY = function (x, y, result) {
            if (result) {
                result.set(x, y);
                return result;
            }
            return new Point(x, y);
        };
        Point.prototype.clone = function () {
            return new Point(this.x, this.y);
        };
        Point.fromString = function (str, result) {
            if (str) {
                var arr = str.split(',');
                if (arr.length == 2) {
                    if (result) {
                        result.set(parseFloat(arr[0]), parseFloat(arr[1]));
                        return result;
                    }
                    return new Point(parseFloat(arr[0]), parseFloat(arr[1]));
                }
            }
            return null;
        };
        Point.makeString = function (x, y) {
            return '' + x + ',' + y;
        };
        Point.prototype.sub = function (other, result) {
            if (result) {
                result.set(this.x - other.x, this.y - other.y);
                return result;
            }
            return new Point(this.x - other.x, this.y - other.y);
        };
        Point.prototype.subXY = function (x, y, result) {
            if (result) {
                result.set(this.x - x, this.y - y);
                return result;
            }
            return new Point(this.x - x, this.y - y);
        };
        Point.prototype.add = function (other, result) {
            if (result) {
                result.set(this.x + other.x, this.y + other.y);
                return result;
            }
            return new Point(this.x + other.x, this.y + other.y);
        };
        Point.prototype.addXY = function (x, y, result) {
            if (result) {
                result.set(this.x + x, this.y + y);
                return result;
            }
            return new Point(this.x + x, this.y + y);
        };
        Object.defineProperty(Point.prototype, "lengthSquared", {
            get: function () {
                return this.x * this.x + this.y * this.y;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "length", {
            get: function () {
                return Math.sqrt(this.lengthSquared);
            },
            enumerable: false,
            configurable: true
        });
        Point.prototype.distanceTo = function (other) {
            var dx = other.x - this.x;
            var dy = other.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        Point.prototype.normalize = function (length) {
            if (length === void 0) { length = 1; }
            var len = this.length;
            if (len == 0)
                return 0;
            this.scale(length / len);
            return len;
        };
        Point.prototype.dot = function (vector) {
            return this.x * vector.x + this.y * vector.y;
        };
        Point.prototype.scale = function (value) {
            this.x *= value;
            this.y *= value;
        };
        Point.prototype.cross = function (vector, result) {
            var a0 = this.y * vector.x;
            var a1 = this.x * vector.y;
            if (result) {
                result.set(a0 - a1, a1 - a0);
                return result;
            }
            return new Point(a0 - a1, a1 - a0);
        };
        Point.prototype.getNormal = function (result) {
            if (result) {
                result.set(-this.y, this.x);
                return result;
            }
            return new Point(-this.y, this.x);
        };
        Point.prototype.rotate = function (radians) {
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var ox = this.x;
            var oy = this.y;
            this.x = ox * cos - oy * sin;
            this.y = oy * cos + ox * sin;
        };
        Point.prototype.equalsXY = function (x, y) {
            return this.x == x && this.y == y;
        };
        Point.prototype.getPerpendicularDistance = function (p) {
            return Math.abs(p.x - this.x) + Math.abs(p.y - this.y);
        };
        Point.prototype.getPerpendicularDistanceFrom = function (px, py) {
            return Math.abs(px - this.x) + Math.abs(py - this.y);
        };
        Object.defineProperty(Point.prototype, "vertical", {
            get: function () {
                return this.y == 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "horizontal", {
            get: function () {
                return this.x == 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Point.prototype, "verticalOrHorizontal", {
            get: function () {
                return this.x == 0 || this.y == 0;
            },
            enumerable: false,
            configurable: true
        });
        Point.prototype.equals = function (p) {
            return p.x == this.x && p.y == this.y;
        };
        return Point;
    }());
    exports.Point = Point;
});
define("geoms/Rectangle", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Rectangle = void 0;
    var Rectangle = (function () {
        function Rectangle(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Object.defineProperty(Rectangle.prototype, "right", {
            get: function () {
                return this.x + this.width;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "left", {
            get: function () {
                return this.x;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "top", {
            get: function () {
                return this.y;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Rectangle.prototype, "bottom", {
            get: function () {
                return this.y + this.height;
            },
            enumerable: false,
            configurable: true
        });
        Rectangle.prototype.contains = function (x, y) {
            return x >= this.x && y >= this.y && x < this.right && y < this.bottom;
        };
        Rectangle.prototype.containsPoint = function (point) {
            return this.contains(point.x, point.y);
        };
        Rectangle.prototype.containsRectangle = function (other) {
            return other.x >= this.x &&
                other.y >= this.y &&
                other.right <= this.right &&
                other.bottom <= this.bottom;
        };
        Rectangle.prototype.intersects = function (other) {
            return !(other.right <= this.x ||
                other.bottom <= this.y ||
                other.x >= this.right ||
                other.y >= this.bottom);
        };
        Rectangle.prototype.clone = function () {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };
        Rectangle.prototype.equals = function (toCompare) {
            return toCompare && toCompare.x == this.x && toCompare.y == this.y && toCompare.width == this.width && toCompare.height == this.height;
        };
        Rectangle.prototype.toString = function () {
            return Rectangle.makeString(this.x, this.y, this.width, this.height);
        };
        Rectangle.makeString = function (x, y, width, height) {
            return x + "," + y + "," + width + "," + height;
        };
        Rectangle.fromString = function (str, result) {
            var arr = str.split(',');
            if (arr.length == 4) {
                if (result) {
                    result.x = parseFloat(arr[0]);
                    result.y = parseFloat(arr[1]);
                    result.width = parseFloat(arr[2]);
                    result.height = parseFloat(arr[3]);
                }
                else {
                    result = new Rectangle(parseFloat(arr[0]), parseFloat(arr[1]), parseFloat(arr[2]), parseFloat(arr[3]));
                }
                return result;
            }
            return null;
        };
        return Rectangle;
    }());
    exports.Rectangle = Rectangle;
});
define("geoms/Line", ["require", "exports", "geoms/Rectangle", "geoms/Point"], function (require, exports, Rectangle_1, Point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Line = void 0;
    var Line = (function () {
        function Line(_point1, _point2, _finite) {
            this._point1 = _point1;
            this._point2 = _point2;
            this._finite = _finite;
        }
        Object.defineProperty(Line.prototype, "point1", {
            get: function () {
                return this._point1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Line.prototype, "point2", {
            get: function () {
                return this._point2;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Line.prototype, "vector", {
            get: function () {
                if (!this._vector) {
                    this._vector = this._point2.sub(this._point1);
                }
                return this._vector;
            },
            enumerable: false,
            configurable: true
        });
        Line.prototype.clone = function () {
            return new Line(this._point1, this._point2, this._finite);
        };
        Object.defineProperty(Line.prototype, "finite", {
            get: function () {
                return this._finite;
            },
            enumerable: false,
            configurable: true
        });
        Line.prototype.toString = function () {
            return "Line[(" + this._point1 + "),(" + this._point2 + ")]";
        };
        Line.prototype.distanceTo = function (point) {
            return Math.abs((this.vector.x * (this._point1.y - point.y) - this.vector.y * (this._point1.x - point.x)) / this.vector.length);
        };
        Line.prototype.projectionOf = function (point, checkFinite) {
            if (checkFinite === void 0) { checkFinite = false; }
            var diff = new Point_1.Point(point.x - this._point1.x, point.y - this._point1.y);
            var vec = this.vector.clone();
            vec.normalize();
            var t = vec.dot(diff);
            vec.scale(t);
            var pos = this._point1.add(vec);
            if (checkFinite && this.finite) {
                if (this.vector.x == 0) {
                    if (pos.y < Math.min(this._point1.y, this._point2.y) || pos.y > Math.max(this._point1.y, this._point2.y))
                        return null;
                }
                else if (pos.x < Math.min(this._point1.x, this._point2.x) || pos.x > Math.max(this._point1.x, this._point2.x)) {
                    return null;
                }
            }
            return pos;
        };
        Line.prototype.normalize = function (length) {
            var olen = this.vector.normalize(length);
            this._point2.x = this._point1.x + this.vector.x;
            this._point2.y = this._point1.y + this.vector.y;
            this._extent = null;
            return olen;
        };
        Object.defineProperty(Line.prototype, "extent", {
            get: function () {
                if (!this._extent) {
                    this._extent = new Rectangle_1.Rectangle(Math.min(this._point1.x, this._point2.x), Math.min(this._point1.y, this._point2.y), Math.abs(this.vector.x), Math.abs(this.vector.y));
                }
                return this._extent;
            },
            enumerable: false,
            configurable: true
        });
        Line.prototype.getPerpendicularLine = function (refPoint) {
            return new Line(refPoint, new Point_1.Point(refPoint.x - this.vector.y, refPoint.y + this.vector.x), false);
        };
        Line.prototype.intersectsRectangle = function (rect) {
            if (rect.containsPoint(this._point1) || rect.containsPoint(this._point2))
                return true;
            if (!this.extent.intersects(rect))
                return false;
            if (this.vector.x == 0 || this.vector.y == 0)
                return false;
            var a = this.vector.y / this.vector.x;
            var b = this._point1.y - a * this._point1.x;
            if ((a * this.extent.left - this.extent.top + b) * (a * this.extent.right - this.extent.bottom + b) < 0)
                return true;
            if ((a * this.extent.right - this.extent.top + b) * (a * this.extent.left - this.extent.bottom + b) < 0)
                return true;
            return false;
        };
        Line.prototype.getX = function (y) {
            if (this.vector.y == 0)
                return Number.NaN;
            if (this.finite) {
                if (y > this._point1.y && y > this._point2.y)
                    return Number.NaN;
                if (y < this._point1.y && y < this._point2.y)
                    return Number.NaN;
            }
            return this._point1.x + (y - this._point1.y) * this.vector.x / this.vector.y;
        };
        Line.prototype.getY = function (x) {
            if (this.vector.x == 0)
                return Number.NaN;
            if (this.finite) {
                if (x > this._point1.x && x > this._point2.x)
                    return Number.NaN;
                if (x < this._point1.x && x < this._point2.x)
                    return Number.NaN;
            }
            return this._point1.y + (x - this._point1.x) * this.vector.y / this.vector.x;
        };
        Line.prototype.isPointOnRight = function (point) {
            if (point.equals(this._point1)) {
                return false;
            }
            else {
                var pvec = new Point_1.Point(point.x - this._point1.x, point.y - this._point1.y);
                return this.vector.getNormal().dot(pvec) > 0;
            }
        };
        Line.prototype.isPointOnLeft = function (point) {
            if (point.equals(this._point1)) {
                return false;
            }
            else {
                var pvec = new Point_1.Point(point.x - this._point1.x, point.y - this._point1.y);
                return this.vector.getNormal().dot(pvec) < 0;
            }
        };
        Line.prototype.arePointsOnSameSide = function (point1, point2) {
            var normal = this.vector.getNormal();
            var p1vec = point1.sub(this._point1);
            var p2vec = point2.sub(this._point1);
            return normal.dot(p1vec) * normal.dot(p2vec) > 0;
        };
        Line.prototype.markDirty = function () {
            this._vector = null;
            this._extent = null;
        };
        return Line;
    }());
    exports.Line = Line;
});
define("ImageUtil", ["require", "exports", "Matrix", "Utility"], function (require, exports, Mat, Util) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImgData2URL = exports.ApplyAlphaMaskToImgData = exports.CreateBWImage = exports.Apply2DConvolution = exports.FeatherMask = exports.ApplyAlphaMask = exports.ImgData2_1DMat = exports.Trimap2BW = exports.EmptyImage = exports.Temp2DCanvas = exports.RGBA = void 0;
    var RGBA = (function () {
        function RGBA(r, g, b, a) {
            this.red = r;
            this.green = g;
            this.blue = b;
            this.alpha = a;
        }
        RGBA.prototype.Equals = function (other) {
            return (this.red == other.red &&
                this.green == other.green &&
                this.blue == other.blue &&
                this.alpha == other.alpha);
        };
        RGBA.prototype.EqualsExcludeAlpha = function (other) {
            return (this.red == other.red &&
                this.green == other.green &&
                this.blue == other.blue);
        };
        RGBA.prototype.CSSValue = function () {
            return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha / 255 + ")";
        };
        return RGBA;
    }());
    exports.RGBA = RGBA;
    var Temp2DCanvas = (function () {
        function Temp2DCanvas(width, height) {
            var c = document.createElement("canvas");
            c.width = width;
            c.height = height;
            var hDC = c.getContext("2d");
            this.canvas = c;
            this.hDC = hDC;
            this.width = width;
            this.height = height;
        }
        Temp2DCanvas.prototype.GetHDC = function () {
            return this.hDC;
        };
        Temp2DCanvas.prototype.GetImageData = function () {
            return this.hDC.getImageData(0, 0, this.width, this.height);
        };
        Temp2DCanvas.prototype.SetImageData = function (data) {
            this.hDC.putImageData(data, 0, 0);
            return this.canvas.toDataURL();
        };
        return Temp2DCanvas;
    }());
    exports.Temp2DCanvas = Temp2DCanvas;
    var blankImg = null;
    function EmptyImage() {
        if (blankImg != null)
            return blankImg;
        var c = new Temp2DCanvas(1, 1);
        blankImg = c.SetImageData(c.GetImageData());
        return blankImg;
    }
    exports.EmptyImage = EmptyImage;
    function Trimap2BW(trimap) {
        var _a = [trimap[0].length, trimap.length], width = _a[0], height = _a[1];
        var canvas = new Temp2DCanvas(width, height);
        var imgData = canvas.GetImageData();
        var arr = imgData.data;
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var offset = (y * width + x) * 4;
                var lum = trimap[y][x] * 122;
                arr[offset + 0] = lum;
                arr[offset + 1] = lum;
                arr[offset + 2] = lum;
                arr[offset + 3] = 255;
            }
        }
        return canvas.SetImageData(imgData);
    }
    exports.Trimap2BW = Trimap2BW;
    function ImgData2_1DMat(data) {
        var nPixels = data.width * data.height;
        var result = Util.FillObj(nPixels, function () { return Mat.CreateMatrix(3, 1); });
        var buffer = data.data;
        for (var i = 0; i < nPixels; i++) {
            var ind = 4 * i;
            var pixel = result[i];
            pixel[0][0] = buffer[ind + 0];
            pixel[1][0] = buffer[ind + 1];
            pixel[2][0] = buffer[ind + 2];
        }
        return result;
    }
    exports.ImgData2_1DMat = ImgData2_1DMat;
    function ApplyAlphaMask(img, alpha) {
        var _a = [img.width, img.height], width = _a[0], height = _a[1];
        var c = new Temp2DCanvas(width, height);
        var bufferData = c.GetImageData();
        var buffer = bufferData.data;
        buffer.set(img.data);
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var alphaInd = 4 * (width * y + x) + 3;
                buffer[alphaInd] = 255;
                alpha[y][x] * 255;
            }
        }
        return c.SetImageData(bufferData);
    }
    exports.ApplyAlphaMask = ApplyAlphaMask;
    function FeatherMask(kernelSize, alpha) {
        var _a = [alpha[0].length, alpha.length], width = _a[0], height = _a[1];
        var minX = width;
        var maxX = 0;
        var minY = height;
        var maxY = 0;
        var feathered = Mat.CreateMatrix(height, width);
        var threshold = 0.1;
        var kernalArea = kernelSize * kernelSize;
        var kernelMid = Math.floor(kernelSize / 2);
        var meanKernel = Util.Fill2DObj(kernelSize, kernelSize, function () { return 1 / kernalArea; });
        for (var r = 0; r < height; r++) {
            for (var c = 0; c < width; c++) {
                if (alpha[r][c] < threshold) {
                    feathered[r][c] = alpha[r][c];
                }
                else {
                    feathered[r][c] = ConvolutionOnPoint(r, c, alpha, height, width, meanKernel, kernelSize, kernelSize, kernelMid, kernelMid);
                    minX = Math.min(minX, c);
                    maxX = Math.max(maxX, c);
                    minY = Math.min(minY, r);
                    maxY = Math.max(maxY, r);
                }
            }
        }
        return {
            alphaMask: feathered,
            rect: { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 }
        };
    }
    exports.FeatherMask = FeatherMask;
    function Apply2DConvolution(src, kernel) {
        var _a = Mat.Dimensions(src), nRows = _a[0], nCols = _a[1];
        var _b = Mat.Dimensions(kernel), kRows = _b[0], kCols = _b[1];
        var _c = [Math.floor(kRows / 2), Math.floor(kCols / 2)], kernelMidRow = _c[0], kernelMidCol = _c[1];
        var result = Mat.CreateMatrix(nRows, nCols);
        for (var r = 0; r < nRows; r++) {
            for (var c = 0; c < nCols; c++) {
                result[r][c] = ConvolutionOnPoint(r, c, src, nRows, nCols, kernel, kRows, kCols, kernelMidRow, kernelMidCol);
            }
        }
        return null;
    }
    exports.Apply2DConvolution = Apply2DConvolution;
    function ConvolutionOnPoint(targetRow, targetCol, src, nRows, nCols, kernel, kRows, kCols, kMidRowIndex, kMidColIndex) {
        var acc = 0;
        for (var r = 0; r < kRows; r++) {
            var destR = targetRow + r - kMidRowIndex;
            if (destR < 0 || destR >= nRows)
                continue;
            for (var c = 0; c < kCols; c++) {
                var destC = targetCol + c - kMidColIndex;
                if (destC < 0 || destC >= nCols)
                    continue;
                acc += kernel[r][c] * src[destR][destC];
            }
        }
        return acc;
    }
    function CreateBWImage(values) {
        var _a = [values[0].length, values.length], width = _a[0], height = _a[1];
        var c = new Temp2DCanvas(width, height);
        var img = c.GetImageData();
        var buffer = img.data;
        for (var r = 0; r < height; r++) {
            for (var c_1 = 0; c_1 < width; c_1++) {
                var ind = (r * width + c_1) * 4;
                var lum = values[r][c_1] * 255;
                buffer[ind + 0] = lum;
                buffer[ind + 1] = lum;
                buffer[ind + 2] = lum;
                buffer[ind + 3] = 255;
            }
        }
        return c.SetImageData(img);
    }
    exports.CreateBWImage = CreateBWImage;
    function ApplyAlphaMaskToImgData(original, alpha) {
        var _a = [original.width, original.height], width = _a[0], height = _a[1];
        var imgCopy = new ImageData(width, height);
        var buffer = imgCopy.data;
        buffer.set(original.data);
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var alphaInd = 4 * (width * y + x) + 3;
                buffer[alphaInd] = alpha[y][x] * 255;
            }
        }
        return imgCopy;
    }
    exports.ApplyAlphaMaskToImgData = ApplyAlphaMaskToImgData;
    var BinaryWriter = (function () {
        function BinaryWriter(buffer, littleEndian) {
            this.cursor = 0;
            this.littleEndian = true;
            this.buffer = buffer;
            this.littleEndian = littleEndian;
            this.view = new DataView(buffer.buffer);
        }
        BinaryWriter.prototype.Seek = function (cursor) {
            this.cursor = cursor;
        };
        BinaryWriter.prototype.Cursor = function () {
            return this.cursor;
        };
        BinaryWriter.prototype.WriteInt = function (val) {
            this.view.setInt32(this.cursor, val, this.littleEndian);
            this.cursor += 4;
        };
        BinaryWriter.prototype.WriteShort = function (val) {
            this.view.setInt16(this.cursor, val, this.littleEndian);
            this.cursor += 2;
        };
        BinaryWriter.prototype.WriteByte = function (val) {
            this.view.setUint8(this.cursor, val);
            this.cursor += 1;
        };
        BinaryWriter.prototype.BlockCopyArray = function (source) {
            this.buffer.set(source, this.cursor);
            this.cursor += source.length;
        };
        BinaryWriter.prototype.GetBuffer = function () {
            return this.buffer;
        };
        return BinaryWriter;
    }());
    function ImgData2URL(data) {
        var _a = [data.width, data.height], width = _a[0], height = _a[1];
        var headerSize = 14;
        var infoHeaderSize = 108;
        var imgDataSize = width * height * 4;
        var totalSize = imgDataSize + infoHeaderSize + headerSize;
        var bw = new BinaryWriter(new Uint8Array(totalSize), true);
        bw.WriteByte(0x42);
        bw.WriteByte(0x4D);
        bw.WriteInt(totalSize);
        bw.WriteShort(0);
        bw.WriteShort(0);
        var imgDataIndex = headerSize + infoHeaderSize;
        bw.WriteInt(imgDataIndex);
        bw.WriteInt(infoHeaderSize);
        bw.WriteInt(width);
        bw.WriteInt(-height);
        bw.WriteShort(1);
        var bitsPerPixel = 32;
        bw.WriteShort(bitsPerPixel);
        var BI_RGB = 0;
        var BI_BITFIELDS = 3;
        bw.WriteInt(BI_BITFIELDS);
        bw.WriteInt(imgDataSize);
        var inchesPerMetre = 39;
        var hRes = 72 * inchesPerMetre;
        var vRes = 72 * inchesPerMetre;
        bw.WriteInt(hRes);
        bw.WriteInt(vRes);
        var nColours = 0;
        bw.WriteInt(nColours);
        var importantColours = 0;
        bw.WriteInt(importantColours);
        var R_MASK = 0x00FF0000;
        var G_MASK = 0x0000FF00;
        var B_MASK = 0x000000FF;
        var A_MASK = 0xFF000000;
        bw.WriteInt(R_MASK);
        bw.WriteInt(G_MASK);
        bw.WriteInt(B_MASK);
        bw.WriteInt(A_MASK);
        var LCS_DEVICE_RGB = 1;
        bw.WriteInt(LCS_DEVICE_RGB);
        var CIEXYZTRIPLE_SIZE = 36;
        for (var i = 0; i < CIEXYZTRIPLE_SIZE; i++)
            bw.WriteByte(0);
        bw.WriteInt(0);
        bw.WriteInt(0);
        bw.WriteInt(0);
        bw.BlockCopyArray(data.data);
        var buffer = bw.GetBuffer();
        for (var i = imgDataIndex; i < buffer.length; i += 4) {
            var temp = buffer[i];
            buffer[i] = buffer[i + 2];
            buffer[i + 2] = temp;
        }
        var bmp = new Blob([buffer.buffer], { type: "image/bmp" });
        return URL.createObjectURL(bmp);
    }
    exports.ImgData2URL = ImgData2URL;
});
define("GrabCutWorker", ["require", "exports", "geoms/Line", "geoms/Point", "geoms/Rectangle", "GrabCut", "ImageUtil", "Progress", "Utility"], function (require, exports, Line_1, Point_2, Rectangle_2, GrabCut_1, ImageUtil_1, Progress_4, Utility_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.init = void 0;
    var Rect = (function () {
        function Rect(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.right = this.x + this.w;
            this.bottom = this.y + this.h;
        }
        Rect.prototype.contains = function (x, y) {
            return x >= this.x && x < this.right && y >= this.y && y < this.bottom;
        };
        return Rect;
    }());
    function createTrimap(originWidth, originHeight, rect, lines) {
        lines.reverse();
        prepareGrabcutLines(lines);
        var trimap = Utility_1.Fill2DObj(originHeight, originWidth, function () { return GrabCut_1.Trimap.Unknown; });
        for (var y = 0; y < originHeight; y++) {
            for (var x = 0; x < originWidth; x++) {
                var type = getGrabcutLineType(lines, x, y);
                if (type) {
                    trimap[y][x] = type == 'foreground' ? GrabCut_1.Trimap.Foreground : GrabCut_1.Trimap.Background;
                }
                else if (!rect.contains(x, y)) {
                    trimap[y][x] = GrabCut_1.Trimap.Background;
                }
            }
        }
        return trimap;
    }
    function prepareGrabcutLines(cutlines) {
        cutlines.forEach(function (cutLine) {
            cutLine.lines = [];
            var prevP;
            var halfWidth = cutLine.thickness / 2 + 1;
            var hitRect;
            for (var _i = 0, _a = cutLine.points; _i < _a.length; _i++) {
                var p = _a[_i];
                var point = new Point_2.Point(p.x, p.y);
                if (prevP) {
                    cutLine.lines.push(new Line_1.Line(prevP, point, true));
                }
                prevP = point;
                if (!hitRect) {
                    hitRect = new Rectangle_2.Rectangle(p.x - halfWidth, p.y - halfWidth, halfWidth * 2, halfWidth * 2);
                }
                else {
                    hitRect.x = Math.min(hitRect.x, p.x - halfWidth);
                    hitRect.y = Math.min(hitRect.y, p.y - halfWidth);
                    hitRect.width = Math.max(hitRect.width, p.x + halfWidth - hitRect.x);
                    hitRect.height = Math.max(hitRect.height, p.y + halfWidth - hitRect.y);
                }
            }
            cutLine.hitRect = hitRect;
        });
    }
    function getGrabcutLineType(cutLines, x, y) {
        var point = new Point_2.Point(x, y);
        var cutLine = cutLines.find(function (line) { return line.hitRect.contains(x, y) && hitTestLines(line.lines, line.thickness / 2, point); });
        return cutLine ? cutLine.mode : '';
    }
    function hitTestLines(lines, halfWidth, point) {
        return !!lines.find(function (line) {
            if (line.projectionOf(point, true) && line.distanceTo(point) <= halfWidth) {
                return true;
            }
            return Point_2.Point.distance(line.point1, point) <= halfWidth || Point_2.Point.distance(line.point2, point) <= halfWidth;
        });
    }
    function init(workerScope) {
        workerScope.onmessage = function (event) {
            var message = event.data;
            console.log('receive grabcut command: ', message);
            if (message.type == 'grabcut') {
                try {
                    Progress_4.progress.reset(workerScope, message.options);
                    var size = { width: message.width, height: message.height };
                    var rect = new Rect(message.rect.x, message.rect.y, message.rect.w, message.rect.h);
                    console.time('createTrimap');
                    var trimap = createTrimap(size.width, size.height, rect, message.lines);
                    console.timeEnd('createTrimap');
                    var cut = new GrabCut_1.GrabCut(ImageUtil_1.ImgData2_1DMat(message.imageData), size.width, size.height);
                    cut.SetTrimap(trimap, size.width, size.height);
                    cut.BeginCrop(message.options);
                    console.time('GetAlphaMask');
                    var result = ImageUtil_1.FeatherMask(message.options.featherSize, cut.GetAlphaMask());
                    console.timeEnd('GetAlphaMask');
                    Progress_4.progress.STEP.GetAlphaMask.advance();
                    workerScope.postMessage({ type: 'alphaMask', alphaMask: result.alphaMask, rect: result.rect });
                }
                catch (err) {
                    console.error('grabcut error: ', err);
                }
            }
            else if (message.type == 'cancel') {
                Progress_4.progress.stop();
            }
        };
        workerScope.postMessage({ type: 'loaded' });
    }
    exports.init = init;
});
require(["GrabCutWorker"],function(worker){worker.init(workerScope)});