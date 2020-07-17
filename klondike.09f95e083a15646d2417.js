!function(e){function t(t){for(var r,c,i=t[0],s=t[1],l=t[2],u=0,g=[];u<i.length;u++)c=i[u],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&g.push(n[c][0]),n[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(d&&d(t);g.length;)g.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],r=!0,i=1;i<a.length;i++){var s=a[i];0!==n[s]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=a[0]))}return e}var r={},n={0:0},o=[];function c(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.m=e,c.c=r,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(a,r,function(t){return e[t]}.bind(null,r));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var i=window.webpackJsonp=window.webpackJsonp||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var d=s;o.push([23,1]),a()}([,function(e,t,a){"use strict";var r,n;Object.defineProperty(t,"__esModule",{value:!0}),t.Cards=t.StackType=t.StackDirection=t.SuitType=t.ValueType=void 0,function(e){e.ace="A",e.two="2",e.three="3",e.four="4",e.five="5",e.six="6",e.seven="7",e.eight="8",e.nine="9",e.ten="10",e.jack="J",e.queen="Q",e.king="K"}(r=t.ValueType||(t.ValueType={})),function(e){e.heart="♥",e.diamond="♦",e.spade="♠",e.club="♣"}(n=t.SuitType||(t.SuitType={})),function(e){e.horizontal="horizontal",e.vertical="vertical"}(t.StackDirection||(t.StackDirection={})),function(e){e.tableau="tableau",e.foundation="foundation",e.stock="stock",e.waste="waste"}(t.StackType||(t.StackType={}));const o=[];t.Cards=o;for(const e of Object.values(r))for(const t of Object.values(n))o.push({suit:t,value:e});Object.freeze(o)},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.disallowClickStock=t.getSelection=t.getShowing=t.getDraws=t.getScoringType=t.getScore=t.getScoreStore=t.getFoundationStack=t.getWaste=t.getStock=t.getTableau=t.getFoundation=t.getAllStacks=void 0;const r=a(40),n=a(1),o=a(4);t.getAllStacks=r.createSelector(e=>e.stacks.present.stacks,e=>e),t.getFoundation=r.createSelector(t.getAllStacks,e=>e.filter(e=>e.type===n.StackType.foundation)),t.getTableau=r.createSelector(t.getAllStacks,e=>e.filter(e=>e.type===n.StackType.tableau)),t.getStock=r.createSelector(t.getAllStacks,e=>e.filter(e=>e.type===n.StackType.stock)[0]),t.getWaste=r.createSelector(t.getAllStacks,e=>e.filter(e=>e.type===n.StackType.waste)[0]),t.getFoundationStack=r.createSelector(t.getFoundation,(e,t)=>t,(e,t)=>e.find(({cards:e})=>{const a=e[e.length-1];return null==a?t.value===n.ValueType.ace:a.card.suit===t.suit&&o.isSequential(t,a.card)})),t.getScoreStore=r.createSelector(e=>e.gameState.present,e=>e),t.getScore=r.createSelector(t.getScoreStore,e=>e.score),t.getScoringType=r.createSelector(t.getScoreStore,e=>e.scoringType),t.getDraws=r.createSelector(e=>e.gameState.present,({draws:e})=>e),t.getShowing=r.createSelector(e=>e.gameState.present,({showing:e})=>e),t.getSelection=r.createSelector(t.getAllStacks,e=>{const t=e.find(e=>null!=e.selection);return t?{card:t.selection,stack:t}:null}),t.disallowClickStock=r.createSelector([t.getStock,t.getDraws],(e,t)=>0===e.cards.length&&0===t)},,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isValidMove=t.isBig=t.isBlack=t.isRed=t.isSequential=t.contains=t.random=t.getTopCard=t.sumConsecutive=t.rnd=void 0;const r=a(1);t.rnd=e=>{const t=()=>(Math.pow(2,31)-1&(e=Math.imul(48271,e)))/Math.pow(2,31);return t(),(e,a)=>Math.floor(t()*(a-e+1))+e},t.sumConsecutive=e=>e*(e+1)/2,t.getTopCard=e=>e[e.length-1],t.random=(e,t)=>Math.floor(Math.random()*t)+e,t.contains=(e,t)=>e.cards.some(e=>e.card===t),t.isSequential=(e,t)=>n(t.value)+1===n(e.value),t.isRed=e=>[r.SuitType.diamond,r.SuitType.heart].includes(e.suit),t.isBlack=e=>[r.SuitType.club,r.SuitType.spade].includes(e.suit),t.isBig=e=>!![r.ValueType.ace,r.ValueType.jack,r.ValueType.queen,r.ValueType.king].includes(e.value),t.isValidMove=(e,a)=>null==a?e.value===r.ValueType.king:t.isSequential(a.card,e)&&(t.isRed(e)&&t.isBlack(a.card)||t.isBlack(e)&&t.isRed(a.card));const n=e=>e===r.ValueType.ace?1:e===r.ValueType.jack?11:e===r.ValueType.queen?12:e===r.ValueType.king?13:parseInt(e,10)},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.undoable=t.checkpoint=t.redo=t.undo=t.destroy=void 0;t.destroy=()=>({type:"@@undoable/destroy"});const r="@@undoable/undo";t.undo=()=>({type:r});const n="@@undoable/redo";t.redo=()=>({type:n});t.checkpoint=()=>({type:"@@undoable/checkpoint"}),t.undoable=e=>{const t={past:[],present:e(void 0,{}),future:[]};return(a=t,o)=>{const{past:c,present:i,future:s}=a;if(o.type===r){const e=c[c.length-1];if(!e)return a;return{past:c.slice(0,c.length-1),present:e,future:[i,...s]}}if(o.type===n){const e=s[0];if(!e)return a;const t=s.slice(1);return{past:[...c,i],present:e,future:t}}const l=e(i,o);return"@@undoable/destroy"===o.type?{past:[],present:l,future:[]}:"@@undoable/checkpoint"===o.type?{past:[...c,i],present:l,future:[]}:i===l?a:{past:c,present:l,future:s}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.decrementDraws=t.incrementScore=t.saveScore=t.ScoreType=t.ScoringType=void 0;const r=a(11),n=a(1),o=a(5),c=a(12);var i,s;!function(e){e[e.vegas=0]="vegas",e[e.regular=1]="regular"}(i=t.ScoringType||(t.ScoringType={})),function(e){e.wasteToTableau="wasteToTableau",e.wasteToFoundation="wasteToFoundation",e.tableauToFoundation="tableauToFoundation",e.revealCard="revealCard",e.foundationToTableau="foundationToTableau"}(s=t.ScoreType||(t.ScoreType={}));const l=()=>{try{const e=localStorage.getItem("score");if(null==e)return 0;const t=parseInt(e,10);return Number.isNaN(t)?0:t}catch(e){return 0}};t.saveScore=e=>{try{e.scoringType===i.vegas&&localStorage.setItem("score",e.score.toString())}catch(e){}};const d=(e,t)=>{let a=0;return e===i.regular&&t===s.tableauToFoundation?a=10:t===s.wasteToFoundation||e===i.vegas&&t===s.tableauToFoundation||e===i.regular&&t===s.revealCard||e===i.regular&&t===s.wasteToTableau?a=5:e===i.regular&&s.foundationToTableau?a=-10:e===i.vegas&&t===s.foundationToTableau&&(a=-5),a};t.incrementScore=e=>({type:"@@game-state/increment-score",scoreType:e});t.decrementDraws=()=>({type:"DECREMENT_DRAWS"});const u={showing:0,score:0,draws:1/0,scoringType:i.regular};t.default=o.undoable((e=u,t)=>t.type===c.INITIALIZE?Object.assign(Object.assign({},e),{scoringType:t.scoringType,score:t.scoringType===i.vegas?l()-52:0,draws:t.scoringType===i.vegas?2:1/0}):"DECREMENT_DRAWS"===t.type?Object.assign(Object.assign({},e),{draws:e.draws-1}):t.type===r.MOVE_CARDS?t.to.type===n.StackType.waste||t.from&&t.from.type===n.StackType.waste?Object.assign(Object.assign({},e),{showing:t.to.type===n.StackType.waste?Math.min(t.to.cards.length+t.cards.length,3):Math.max(1,e.showing-1)}):e:"@@game-state/increment-score"===t.type?Object.assign(Object.assign({},e),{score:e.score+d(e.scoringType,t.scoreType)}):e)},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GameCanvas=t.GameCtx=void 0;const r=a(0),n=a(45),o=a(19),c=a(47);t.GameCtx=r.createContext(null);const i=(e,t)=>{const{nativeEvent:a}=e,r=a.target,n={x:a.offsetX,y:a.offsetY},o=r.getContext("2d");for(const e of t.keys())if(null==o?void 0:o.isPointInPath(e,n.x,n.y)){const a=t.get(e);if(null==a)return;return{thing:a,point:n}}},s=({children:e})=>{const a=r.useRef(new Map),s=r.useRef(new Map),l=r.useRef(new Map),[d]=r.useState(n.colorSchemes[n.ColorSchemeType.dark]),{ctx:u,width:g,height:h,handleCanvasRef:p}=c.useCanvasSize(),y=r.useMemo(()=>g&&h&&u?{ctx:u,width:g,height:h,colorScheme:d}:null,[u,g,h,d]);r.useLayoutEffect(()=>y&&o.initialize(y)||void 0,[y]);const f=r.useMemo(()=>y&&{context:y,add(e,t){a.current.set(e.path,e),t.onClick&&s.current.set(e.path,t.onClick),t.onDoubleClick&&l.current.set(e.path,t.onDoubleClick)},remove(e){a.current.delete(e),s.current.delete(e),l.current.delete(e)}},[y]),S=r.useCallback(e=>{const t=i(e,a.current);if(t){const{thing:e,point:a}=t,r=l.current.get(e.path);r&&r(e,a)}},[]),b=r.useCallback(e=>{const t=i(e,a.current);if(t){const{thing:e,point:a}=t,r=s.current.get(e.path);r&&r(e,a)}},[]);return r.createElement(r.Fragment,null,r.createElement("canvas",{id:"canvas",style:{backgroundColor:d.background,top:"0",left:"0",width:"100vw",height:"100vh",position:"absolute"},ref:p,width:window.innerWidth,height:window.innerHeight,onClick:b,onDoubleClick:S}),r.createElement(t.GameCtx.Provider,{value:f},e))};t.GameCanvas=s,t.default=r.memo(s)},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getStackBox=t.getCardBox=t.getTopbarBox=t.getHorizontalMarginSize=t.getVerticalMarginSize=t.getStackCardOffsetHeight=t.getStackCardOffsetWidth=void 0;const r=a(1);t.getStackCardOffsetWidth=e=>Math.floor(.03*e.height),t.getStackCardOffsetHeight=e=>Math.floor(.03*e.height),t.getVerticalMarginSize=e=>Math.floor(.01*e.height),t.getHorizontalMarginSize=e=>Math.floor(.01*e.width),t.getTopbarBox=()=>({x:0,y:0,width:0,height:30}),t.getCardBox=e=>{const a=t.getHorizontalMarginSize(e),r=t.getVerticalMarginSize(e),n=t.getTopbarBox(),o=t.getStackCardOffsetHeight(e),c=n.height+2*r+19*o,i=6*a,s=Math.floor((e.width-i)/7),l=Math.floor((e.height-c)/1.5),d=1.618*s<l?s:l/1.618,u=1.618*s<l?1.618*s:l;return{x:0,y:0,width:Math.floor(d),height:Math.floor(u)}},t.getStackBox=(e,a,n)=>{const o=t.getVerticalMarginSize(e),c=t.getHorizontalMarginSize(e),i=t.getTopbarBox(),s=t.getCardBox(e),l=Math.min(a.cards.length,n),d=6*c+7*s.width,u=d<e.width?(e.width-d)/2:0,g=a.direction===r.StackDirection.horizontal?0===l?s.height:t.getStackCardOffsetWidth(e)*(l-1)+s.width:s.width,h=a.direction===r.StackDirection.vertical?0===l?s.height:t.getStackCardOffsetHeight(e)*(l-1)+s.height:s.height;switch(a.type){case r.StackType.stock:return{y:i.height+o,x:u,width:g,height:h};case r.StackType.waste:return{y:i.height+o,x:u+c+s.width,width:g,height:h};case r.StackType.foundation:return{y:i.height+o,x:u+3*c+3*s.width+a.index*(c+s.width),width:g,height:h};case r.StackType.tableau:return{y:i.height+3*o+s.height,x:u+a.index*(c+s.width),width:g,height:h}}}},,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.moveCards=t.recycleWaste=t.throwStock=t.MOVE_CARDS=t.appendCards=t.APPEND=t.reveal=t.REVEAL_TOP=t.deselectCard=t.DESELECT=t.selectCard=t.SELECT=void 0;const r=a(1),n=a(4),o=a(5),c=a(12);t.SELECT="@@global/select-card",t.selectCard=(e,a)=>({type:t.SELECT,card:a,stack:e}),t.DESELECT="@@global/deselect-card",t.deselectCard=()=>({type:t.DESELECT}),t.REVEAL_TOP="@@global/reveal-top",t.reveal=e=>({type:t.REVEAL_TOP,stack:e}),t.APPEND="@@global/append-cards",t.appendCards=(e,a)=>({type:t.APPEND,cards:a,stack:e}),t.MOVE_CARDS="@@global/move-cards",t.throwStock=(e,a)=>({type:t.MOVE_CARDS,from:e,to:a,cards:e.cards.slice(-3).reverse(),hidden:!1}),t.recycleWaste=(e,a)=>({type:t.MOVE_CARDS,from:e,to:a,cards:e.cards.slice(0),hidden:!0}),t.moveCards=(e,a,r=null)=>({type:t.MOVE_CARDS,from:e,to:a,cards:e.cards.slice(e.cards.findIndex(e=>e.card===r)),hidden:!1});const i={[c.INITIALIZE]:(e,t)=>Object.assign(Object.assign({},e),{stacks:e.stacks.map(e=>e.type===r.StackType.foundation||e.type===r.StackType.waste?Object.assign(Object.assign({},e),{cards:[]}):e.type===r.StackType.stock?Object.assign(Object.assign({},e),{cards:t.cards.slice(0,24).map(e=>({card:e,hidden:!0}))}):e.type===r.StackType.tableau?Object.assign(Object.assign({},e),{cards:t.cards.slice(24+n.sumConsecutive(e.index),24+n.sumConsecutive(e.index)+e.index+1).map((e,t,a)=>({card:e,hidden:a.length!==t+1}))}):e)}),[t.SELECT]:(e,t)=>Object.assign(Object.assign({},e),{stacks:e.stacks.map(e=>e===t.stack&&n.contains(e,t.card.card)?Object.assign(Object.assign({},e),{selection:t.card.card,cards:e.cards.map(e=>e.card&&e.card===t.card.card?Object.assign(Object.assign({},e),{selected:!0}):e)}):e)}),[t.DESELECT]:e=>Object.assign(Object.assign({},e),{stacks:e.stacks.map(e=>null!=e.selection?Object.assign(Object.assign({},e),{selection:null,cards:e.cards.map(e=>e.selected?Object.assign(Object.assign({},e),{selected:!1}):e)}):e)}),[t.APPEND]:(e,t)=>Object.assign(Object.assign({},e),{stacks:e.stacks.map(e=>e===t.stack?Object.assign(Object.assign({},e),{cards:[...e.cards,...t.cards]}):e)}),[t.MOVE_CARDS]:(e,t)=>e.stacks.some(e=>[t.from,t.to].includes(e))?Object.assign(Object.assign({},e),{stacks:e.stacks.map(e=>e===t.to?Object.assign(Object.assign({},e),{cards:[...e.cards,...t.cards.map(e=>Object.assign(Object.assign({},e),{selected:!1,hidden:t.hidden}))]}):e===t.from?Object.assign(Object.assign({},e),{cards:e.cards.filter(e=>!t.cards.includes(e))}):e)}):e,[t.REVEAL_TOP]:(e,t)=>Object.assign(Object.assign({},e),{stacks:e.stacks.map(e=>e===t.stack?Object.assign(Object.assign({},e),{cards:e.cards.map((t,a)=>a<e.cards.length-1?t:Object.assign(Object.assign({},t),{hidden:!1}))}):e)})},s={stacks:[{type:r.StackType.stock,direction:null,cards:[],index:0,selection:null},{type:r.StackType.waste,direction:r.StackDirection.horizontal,cards:[],index:0,selection:null},...Array.from({length:7},(e,t)=>({index:t,type:r.StackType.tableau,direction:r.StackDirection.vertical,cards:[],selection:null})),...Array.from({length:4},(e,t)=>({index:t,type:r.StackType.foundation,direction:null,cards:[],selection:null}))]};t.default=o.undoable((e=s,t)=>{const a=i[t.type];return a?a(e,t):e})},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initialize=t.INITIALIZE=void 0,t.INITIALIZE="@@game-state/initialize",t.initialize=(e,a)=>({type:t.INITIALIZE,scoringType:e,cards:a})},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.doubleClickCard=t.clickCard=t.initialize=void 0;const r=a(4),n=a(1),o=a(11),c=a(2),i=a(5),s=a(6),l=a(12);t.initialize=e=>(t,a)=>{const o=null==e?c.getScoringType(a()):e,i=Array.from(n.Cards),s=[];for(let e=0;e<52;e++){const e=r.random(0,i.length);s.push(...i.splice(e,1))}t(l.initialize(o,s))},t.clickCard=(e,t)=>(a,l)=>{if(null!=t&&t.selected)return a(o.deselectCard());const d=c.getSelection(l());if(null==d&&t&&t.card&&!t.hidden)return a(o.selectCard(e,t));if(e.type!==n.StackType.foundation){if(e.type===n.StackType.tableau&&(null==d&&t&&t.hidden&&(a(i.checkpoint()),a(s.incrementScore(s.ScoreType.revealCard)),a(o.reveal(e))),null!=d&&r.isValidMove(d.card,t)&&(a(i.checkpoint()),d.stack.type===n.StackType.waste&&a(s.incrementScore(s.ScoreType.wasteToTableau)),d.stack.type===n.StackType.foundation&&a(s.incrementScore(s.ScoreType.foundationToTableau)),a(o.moveCards(d.stack,e,d.card)),a(o.deselectCard()))),e.type===n.StackType.stock){if(c.disallowClickStock(l()))return;const e=c.getWaste(l()),t=c.getStock(l());a(i.checkpoint()),d&&a(o.deselectCard()),t.cards.length>0?a(o.throwStock(t,e)):(a(o.recycleWaste(e,t)),a(s.decrementDraws()))}}else{const e=d&&c.getFoundationStack(l(),d.card)||null;e&&d&&(d.stack.type===n.StackType.waste&&a(s.incrementScore(s.ScoreType.wasteToFoundation)),d.stack.type===n.StackType.tableau&&a(s.incrementScore(s.ScoreType.tableauToFoundation)),a(o.moveCards(d.stack,e,d.card)),a(o.deselectCard()))}},t.doubleClickCard=(e,t)=>(a,r)=>{if(e.type===n.StackType.foundation||e.type===n.StackType.stock||null==t||null==t.card)return;const l=c.getFoundationStack(r(),t.card);l&&(a(i.checkpoint()),e.type===n.StackType.waste&&a(s.incrementScore(s.ScoreType.wasteToFoundation)),e.type===n.StackType.tableau&&a(s.incrementScore(s.ScoreType.tableauToFoundation)),a(o.moveCards(e,l,t.card)),a(o.deselectCard()))}},,,,,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.writeDataToCanvas=t.initialize=t.cardCache=t.getKey=void 0;const r=a(1),n=a(46),o=a(8);let c;t.getKey=({card:{suit:e,value:t},selected:a})=>`${e}_${t}_${(a||!1).toString()}`,t.cardCache=new Map,t.initialize=e=>{const{width:a,height:i}=o.getCardBox(e);t.cardCache.set("hidden",n.getHiddenImageData(e)),t.cardCache.set("empty",n.getEmptyImageData(e)),t.cardCache.set("error",n.getErrorImageData(e)),r.Cards.forEach(a=>{t.cardCache.set(t.getKey({card:a,selected:!0}),n.getCardImageData(e,{card:a,selected:!0})).set(t.getKey({card:a,selected:!1}),n.getCardImageData(e,{card:a,selected:!1}))}),c=document.createElement("canvas"),c.width=a,c.height=i,e.ctx.clearRect(0,0,a+2,i+2)},t.writeDataToCanvas=(e,t,a,r)=>{const n=c.getContext("2d");null==n||n.putImageData(t,0,0),e.ctx.drawImage(c,a,r)}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.search=t.measureHeight=t.measureWidth=void 0;const r=Array.from({length:200},(e,t)=>t);t.measureWidth=(e,t,a)=>(e.font=t,e.measureText(a).width),t.measureHeight=(e,t)=>(e.font=t,e.measureText("M").width);const n=(e,a,o,c,i)=>{const s=Math.floor((i+c)/2),l=r[s]+"px sans-serif",d=t.measureWidth(e,l,o),u=t.measureHeight(e,l);return c>i?l:a(d,u)?n(e,a,o,c,s-1):n(e,a,o,s+1,i)};t.search=(e,t,a)=>n(e,t,a,0,r.length-1)},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useDrawing=void 0;const r=a(0),n=a(7);t.useDrawing=(e,t={})=>{var a,o;const c=r.useContext(n.GameCtx),i=r.useRef(!0),s=r.useRef(null!==(a=null==c?void 0:c.context.width)&&void 0!==a?a:0),l=r.useRef(null!==(o=null==c?void 0:c.context.height)&&void 0!==o?o:0);r.useEffect(()=>{c&&(i.current=!((l.current!==c.context.height||s.current!==c.context.width)&&l.current>0&&s.current>0))},[c]),r.useEffect(()=>{if(null==c)return;const{add:a,remove:r,context:n}=c,{ctx:o}=n,s=e(n);return null!=s?(a(s,t),()=>{r(s.path),i.current&&o.clearRect(s.box.x,s.box.y,s.box.width,s.box.height),i.current=!0}):void 0})}},,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=a(0),n=a(10),o=a(28),c=a(29);o.install({onUpdateReady(){o.applyUpdate()},onUpdated(){window.location.reload()}}),n.render(r.createElement(c.default,null),document.getElementById("root"))},,,,,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const r=a(0),n=a(3),o=a(35),c=a(13),i=a(41),s=()=>{const e=o.default();return(0,e.dispatch)(c.initialize()),r.createElement(n.Provider,{store:e},r.createElement(i.default,null))};t.App=s,t.default=r.memo(s)},,,,,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=a(9),n=a(36),o=(a(37),a(38)),c=a(39),i=a(6),s=a(2);t.default=()=>{const e=[];e.push(n.default);const t=r.createStore(o.default,void 0,r.applyMiddleware(...e));return c.default(t,s.getScoreStore,e=>i.saveScore(e)),t}},,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=a(9),n=a(11),o=a(6);t.default=r.combineReducers({stacks:n.default,gameState:o.default})},,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=a(0),n=a(42),o=a(3),c=a(43),i=a(5),s=a(7),l=a(48),d=a(2),u=a(50);t.default=n.hot(r.memo(()=>{const e=o.useDispatch(),t=o.useSelector(d.getAllStacks),a=o.useSelector(d.getDraws),n=o.useSelector(d.getShowing),g=r.useCallback(t=>{90===t.keyCode&&(t.ctrlKey&&t.shiftKey?e(i.redo()):t.ctrlKey&&e(i.undo()))},[e]);return r.useEffect(()=>(document.addEventListener("keydown",g),()=>document.removeEventListener("keydown",g)),[g]),r.createElement("div",null,r.createElement(c.default,null),r.createElement(s.default,null,r.createElement(u.default,null),t.map(e=>r.createElement(l.default,{key:`${e.type}-${e.index}`,stack:e,showing:n,draws:a}))))}))},,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=a(0),n=a(3),o=a(44),c=a(2);t.default=r.memo(()=>{const e=r.useRef(null),t=r.useRef(),a=n.useSelector(c.getFoundation).every(e=>13===e.cards.length),i=a?"":"none";return r.useEffect(()=>{if(null==e.current)return;t.current=new o(e.current);return document.addEventListener("keydown",e=>{var a;27===e.keyCode&&(null===(a=t.current)||void 0===a||a.stop())}),()=>{var e;null===(e=t.current)||void 0===e||e.destroy()}},[e,a]),r.useEffect(()=>{var e,r;a?null===(e=t.current)||void 0===e||e.stop():null===(r=t.current)||void 0===r||r.start()},[a]),r.createElement("div",{style:{display:i,top:"0",left:"0",width:"100vw",height:"100vh",position:"absolute"},ref:e})})},,function(e,t,a){"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.colorSchemes=t.ColorSchemeType=void 0,function(e){e[e.dark=0]="dark",e[e.light=1]="light"}(r=t.ColorSchemeType||(t.ColorSchemeType={})),t.colorSchemes={[r.dark]:{background:"#000",emptyColor:"#060606",faceUp:"#222",faceDown:"#333",buttonBorder:"#ddd",cardBorder:"#000",black:"#999",red:"#900",selected:"#660",errorColor:"#900"},[r.light]:{background:"#fff",emptyColor:"#eee",faceUp:"#ddd",faceDown:"#ccc",buttonBorder:"#000",cardBorder:"#333",black:"#333",red:"crimson",selected:"yellow",errorColor:"red"}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getErrorImageData=t.getCardImageData=t.getHiddenImageData=t.getEmptyImageData=t.getGlyphLocations=t.getBoxPath=void 0;const r=a(1),n=a(4),o=a(20),c=a(8);var i;t.getBoxPath=({x:e,y:t,width:a,height:r},n=10,o=0)=>{const c=new Path2D,i=e+o,s=t+o,l=a-2*o,d=r-2*o;return c.moveTo(i+n,s),c.lineTo(i+l-n,s),c.quadraticCurveTo(i+l,s,i+l,s+n),c.lineTo(i+l,s+d-n),c.quadraticCurveTo(i+l,s+d,i+l-n,s+d),c.lineTo(i+n,s+d),c.quadraticCurveTo(i,s+d,i,s+d-n),c.lineTo(i,s+n),c.quadraticCurveTo(i,s,i+n,s),c.closePath(),c},function(e){e[e.Regular=0]="Regular",e[e.Corner=1]="Corner"}(i||(i={})),t.getGlyphLocations=(e,t)=>{const{card:a,hidden:s}=t;if(s)return[];const{ctx:l}=e,{width:d,height:u}=c.getCardBox(e),g=c.getVerticalMarginSize(e),h=c.getHorizontalMarginSize(e),p=Math.floor(.2*d),y=e=>o.search(l,(a,r)=>e===i.Corner?a>p:n.isBig(t.card)?a>d-2*Math.floor(d/5):a>Math.floor(d/5)&&r>Math.floor(u/20),e===i.Corner?"10":"♥"),f={[i.Corner]:y(i.Corner),[i.Regular]:y(i.Regular)},S=h/2,b=g/2,x=h/2,k=h/2+o.measureHeight(l,f[i.Corner]),{suit:w,value:T}=a,m=[{x:S,y:b,glyph:T},{x:x,y:k,glyph:w}].reduce((e,t)=>(e.push(Object.assign(Object.assign({},t),{rotated:!1,textAlign:"left",textBaseline:"top",font:f[i.Corner]}),Object.assign(Object.assign({},t),{rotated:!0,textAlign:"left",textBaseline:"top",font:f[i.Corner]})),e),[]),v=[];[r.ValueType.ace,r.ValueType.three,r.ValueType.five,r.ValueType.nine,r.ValueType.jack,r.ValueType.queen,r.ValueType.king].includes(T)&&v.push({x:1,y:3}),[r.ValueType.two,r.ValueType.three].includes(T)&&v.push({x:1,y:0},{x:1,y:6}),[r.ValueType.four,r.ValueType.five,r.ValueType.six,r.ValueType.seven,r.ValueType.eight,r.ValueType.nine,r.ValueType.ten].includes(T)&&v.push({x:0,y:0},{x:2,y:0},{x:0,y:6},{x:2,y:6}),[r.ValueType.six,r.ValueType.seven,r.ValueType.eight].includes(T)&&v.push({x:0,y:3},{x:2,y:3}),[r.ValueType.seven,r.ValueType.ten,r.ValueType.eight].includes(T)&&v.push({x:1,y:1}),[r.ValueType.nine,r.ValueType.ten].includes(T)&&v.push({x:0,y:2},{x:2,y:2},{x:0,y:4},{x:2,y:4}),[r.ValueType.ten,r.ValueType.eight].includes(T)&&v.push({x:1,y:5});const C=e=>{switch(e){case 0:case 6:return.2*u;case 1:case 5:return.3*u;case 2:case 4:return.4*u;case 3:return.5*u}},O=e=>{switch(e){case 0:return.25*d;case 1:return.5*d;case 2:return.75*d}},j=e=>{switch(e){case 0:return"left";case 1:return"center";case 2:return"right"}};return v.forEach(({x:e,y:t})=>{m.push({x:O(e),y:C(t),glyph:w,textAlign:j(e),textBaseline:"middle",rotated:t>3,font:f[i.Regular]})}),m},t.getEmptyImageData=e=>{const{ctx:t,colorScheme:a}=e,{width:r,height:n}=c.getCardBox(e),o={x:0,y:0,width:r,height:n};return t.clearRect(0,0,r,n),t.fillStyle=a.emptyColor,t.fillRect(o.x,o.y,o.width,o.height),t.lineWidth=.5,t.strokeStyle=a.cardBorder,t.strokeRect(o.x,o.y,o.width,o.height),t.getImageData(o.x,o.y,o.width,o.height)},t.getHiddenImageData=e=>{const{ctx:a,colorScheme:r}=e,{width:n,height:o}=c.getCardBox(e),i={x:0,y:0,width:n,height:o};return a.clearRect(i.x,i.y,i.width,i.height),a.strokeStyle=r.cardBorder,a.lineWidth=2,a.stroke(t.getBoxPath(i,10)),a.fillStyle=r.faceDown,a.fill(t.getBoxPath(i,10,.5)),a.getImageData(i.x,i.y,i.width,i.height)},t.getCardImageData=(e,a)=>{const{ctx:r,colorScheme:o}=e,{width:i,height:s}=c.getCardBox(e),l={x:0,y:0,width:i,height:s};r.clearRect(l.x,l.y,l.width,l.height),r.strokeStyle=o.cardBorder,r.lineWidth=2,r.stroke(t.getBoxPath(l,10)),r.fillStyle=a.selected?o.selected:o.faceUp,r.fill(t.getBoxPath(l,10,.5));for(const c of t.getGlyphLocations(e,a))r.fillStyle=n.isRed(a.card)?o.red:o.black,r.textAlign=c.textAlign,r.textBaseline=c.textBaseline,r.font=c.font,c.rotated&&(r.save(),r.translate(i,s),r.rotate(Math.PI)),r.fillText(c.glyph,c.x+l.x*(c.rotated?-1:1),c.y+l.y*(c.rotated?-1:1)),c.rotated&&r.restore();return r.getImageData(l.x,l.y,l.width,l.height)},t.getErrorImageData=e=>{const{ctx:a,colorScheme:r}=e,{width:n,height:o}=c.getCardBox(e),i={x:0,y:0,width:n,height:o};return a.clearRect(i.x,i.y,i.width,i.height),a.fillStyle=r.emptyColor,a.fill(t.getBoxPath(i)),a.font="48px sans-serif",a.textAlign="center",a.textBaseline="middle",a.fillStyle=r.errorColor,a.fillText("X",i.width/2,i.height/2),a.getImageData(i.x,i.y,i.width,i.height)}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useCanvasSize=void 0;const r=a(0);t.useCanvasSize=()=>{const[e,t]=r.useState(null),a=r.useCallback(e=>e&&t(e),[]),n=()=>({width:window.innerWidth,height:window.innerHeight}),[o,c]=r.useState();r.useEffect(()=>{if(!e)return;if(null==e.getContext("2d"))return;let t;const a=()=>{t&&clearTimeout(t),t=window.setTimeout(()=>c(n()),300)};return window.addEventListener("resize",a),()=>{window.removeEventListener("resize",a)}});return r.useMemo(()=>Object.assign({handleCanvasRef:a},e&&Object.assign({ctx:e.getContext("2d")},null!=o?o:n())),[o,a,e])}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.StackElement=void 0;const r=a(0),n=a(7),o=a(49),c=a(1),i=a(3),s=a(13),l=a(21),d=a(0),u=({stack:e,draws:t,showing:a})=>{const u=i.useDispatch(),g=r.useContext(n.GameCtx),h=d.useMemo(()=>g&&o.getStackDrawingContext(g.context,e,{draws:t,showing:a}),[g,e,t,a]),p=r.useCallback((t,a)=>{if(null==g||null==h)return;const r=e.direction===c.StackDirection.horizontal?"x":"y",n=e.cards.slice(-h.max),o=Math.min(n.length-1,Math.floor((a[r]-h.box[r])/h.space));e.type===c.StackType.waste&&o!==n.length-1||u(s.doubleClickCard(e,n[o]))},[u,g,h,e]),y=r.useCallback((t,a)=>{if(null==g||null==h)return;const r=e.direction===c.StackDirection.horizontal?"x":"y",n=e.cards.slice(-h.max),o=Math.min(n.length-1,Math.floor((a[r]-h.box[r])/h.space));e.type===c.StackType.waste&&o!==n.length-1||u(s.clickCard(e,n[o]))},[u,g,h,e]);return l.useDrawing(e=>o.drawStack(e,h),{onClick:y,onDoubleClick:p}),null};t.StackElement=u,t.default=r.memo(u)},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.drawStack=t.getStackDrawingContext=void 0;const r=a(1),n=a(19),o=a(8);t.getStackDrawingContext=(e,t,a)=>{const n=o.getStackCardOffsetWidth(e),c=o.getStackCardOffsetHeight(e),i=t.type===r.StackType.stock||t.type===r.StackType.foundation?1:t.type===r.StackType.waste?a.showing||0:t.cards.length,s=o.getStackBox(e,t,i),l=t.direction===r.StackDirection.horizontal?n:c;return{stack:t,draws:a.draws,showing:a.showing,space:l,box:s,max:i}},t.drawStack=(e,t)=>{if(null==t)return null;const{stack:a,draws:o,max:c,space:i,box:s}=t,l=a.cards.slice(-c),d=new Path2D;d.rect(s.x,s.y,s.width,s.height),d.closePath();const u=0===l.length,g=a.type===r.StackType.stock&&u&&0===o,h=[];g?h.push({data:n.cardCache.get("error"),x:s.x,y:s.y}):u?h.push({data:n.cardCache.get("empty"),x:s.x,y:s.y}):l.forEach((e,t)=>{const o=e.hidden?n.cardCache.get("hidden"):n.cardCache.get(n.getKey(e));if(o){const e=a.direction===r.StackDirection.horizontal?t*i:0,n=a.direction===r.StackDirection.horizontal?0:t*i;h.push({data:o,x:s.x+e,y:s.y+n})}});for(const{data:t,x:a,y:r}of h)t&&n.writeDataToCanvas(e,t,a,r);return{path:d,box:s}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TopBar=void 0;const r=a(0),n=a(3),o=a(2),c=a(6),i=a(13),s=a(21),l=a(51),d=a(7),u=a(8),g=()=>{const e=n.useDispatch(),t=r.useContext(d.GameCtx),a=n.useSelector(o.getScoringType),g=n.useSelector(o.getScore),h=r.useMemo(()=>a===c.ScoringType.vegas?c.ScoringType.regular:c.ScoringType.vegas,[a]),p=r.useMemo(()=>{if(null==t)return null;const e=l.getLabelDrawingContext(t.context,{x:5,y:5,height:15,padding:5,label:"New Game",border:!0}),a=l.getLabelDrawingContext(t.context,{x:e.box.x+e.box.width+u.getHorizontalMarginSize(t.context),y:5,height:15,padding:5,label:"Switch to "+c.ScoringType[h],border:!0}),r=l.getLabelDrawingContext(t.context,{x:0,y:5,height:15,padding:5,label:"Score: "+g,border:!1}),n=l.getLabelDrawingContext(t.context,{x:0,y:5,height:15,padding:5,label:"3.0.0",border:!1});return a.box.x=e.box.x+e.box.width+u.getHorizontalMarginSize(t.context),r.box.x=t.context.width-r.box.width-u.getHorizontalMarginSize(t.context),n.box.x=t.context.width-n.box.width-u.getHorizontalMarginSize(t.context),n.box.y=t.context.height-n.box.height-u.getVerticalMarginSize(t.context),{newGame:e,switchGame:a,score:r,version:n}},[t,g,h]),y=r.useCallback(()=>e(i.initialize()),[e]),f=r.useCallback(()=>e(i.initialize(h)),[e,h]);return s.useDrawing(e=>p&&l.drawLabel(e,p.newGame),{onClick:y}),s.useDrawing(e=>p&&l.drawLabel(e,p.switchGame),{onClick:f}),s.useDrawing(e=>p&&l.drawLabel(e,p.score)),s.useDrawing(e=>p&&l.drawLabel(e,p.version)),null};t.TopBar=g,t.default=r.memo(g)},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.drawLabel=t.getLabelDrawingContext=void 0;const r=a(20);t.getLabelDrawingContext=(e,t)=>{const{ctx:a}=e,{x:n,y:o,height:c,label:i}=t,s=r.search(e.ctx,(e,t)=>t>c,i),l=r.measureWidth(a,s,i);return Object.assign(Object.assign({},t),{box:{x:null!=n?n:0,y:o,width:l+2*t.padding,height:c+2*t.padding},font:s})},t.drawLabel=(e,t)=>{if(null==t)return null;const{ctx:a}=e,{font:r,box:n,label:o,padding:c,border:i}=t;a.save(),a.beginPath(),a.rect(n.x,n.y,n.width,n.height),a.closePath(),a.clip(),a.font=r,a.textAlign="left",a.textBaseline="top",a.fillText(o,n.x+c,n.y+c),i&&(a.strokeStyle=e.colorScheme.buttonBorder,a.strokeRect(n.x,n.y,n.width,n.height)),a.restore();const s=new Path2D;return s.rect(n.x,n.y,n.width,n.height),s.closePath(),{box:n,path:s}}}]);
//# sourceMappingURL=klondike.09f95e083a15646d2417.js.map