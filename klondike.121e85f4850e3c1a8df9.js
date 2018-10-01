!function(e){function t(t){for(var s,i,r=t[0],o=t[1],l=t[2],u=0,f=[];u<r.length;u++)i=r[u],n[i]&&f.push(n[i][0]),n[i]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s]);for(d&&d(t);f.length;)f.shift()();return c.push.apply(c,l||[]),a()}function a(){for(var e,t=0;t<c.length;t++){for(var a=c[t],s=!0,r=1;r<a.length;r++){var o=a[r];0!==n[o]&&(s=!1)}s&&(c.splice(t--,1),e=i(i.s=a[0]))}return e}var s={},n={0:0},c=[];function i(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=s,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(a,s,function(t){return e[t]}.bind(null,s));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var r=window.webpackJsonp=window.webpackJsonp||[],o=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var d=o;c.push([21,1]),a()}([,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(12),n=a(8),c=a(13),i=a(14),r=a(3),o=a(9),l=a(4),d=a(15);t.INITIALIZE="INITIALIZE",t.SELECT_CARD="SELECT_CARD",t.DESELECT_CARD="DESELECT_CARD",t.MOVE_CARDS="MOVE_CARDS",t.REPLACE_TOP="REPLACE_TOP";const u=s.createSelector([e=>e.foundation.stacks,e=>e.waste.stacks,e=>e.tableau.stacks],(e,t,a)=>[...e,...t,...a]);t.initialize=(()=>({type:t.INITIALIZE}));const f=(e,a)=>({type:t.SELECT_CARD,card:a,stack:e}),p=()=>({type:t.DESELECT_CARD}),h=(e,a,s)=>{const n=e.cards.findIndex(e=>!!e.card&&l.equals(e.card,s)),c=e.cards.slice(n);return{type:t.MOVE_CARDS,from:e,to:a,cards:c}},k=(e,a)=>({type:t.REPLACE_TOP,stack:e,card:a});t.doubleClick=function(e,t){return(a,s)=>{if(e.type===r.StackType.foundation||e.type===r.StackType.stock)return;if(null==t)return;const{card:n}=t;if(null==n)return;const{foundation:c}=s(),i=n.value===o.ValueType.ace?c.stacks.find(e=>0===e.cards.length):c.stacks.find(e=>{if(0===e.cards.length)return!1;const t=e.cards[0].card;return null!=t&&t.suit===n.suit}),u=l.get_top_card(i);l.movable_to_foundation(n,u)&&(e.type===r.StackType.waste&&a(d.incrementScore(5)),e.type===r.StackType.tableau&&a(d.incrementScore(10)),a(h(e,i,n)),a(p()))}},t.clickFoundation=function(e,t){return(a,s)=>{const n=u(s()),c=l.get_selection(n);if(!c)return void(t&&t.card&&a(f(e,t)));if(t&&t.selected)return void a(p());const i=l.get_top_card(e),{card:o,stack:k}=c;l.movable_to_foundation(o,i)&&(k.type===r.StackType.waste&&a(d.incrementScore(5)),k.type===r.StackType.tableau&&a(d.incrementScore(10)),a(h(k,e,o)),a(p()))}},t.clickWaste=function(e,t){return(a,s)=>{if(!t)return;const n=u(s()),c=l.get_selection(n),i=l.get_top_card(e);t.selected?a(p()):c||i!==t||a(f(e,t))}},t.clickTableau=function(e,t){return(a,s)=>{const c=u(s()),i=l.get_selection(c);if(!i)return void(t&&t.card?a(f(e,t)):t&&(a(d.incrementScore(5)),a(k(e,n.default.getCard()))));if(t&&t.selected)return void a(p());const o=l.get_top_card(e),{card:y,stack:C}=i;t===o&&l.movable_to_tableau(y,o)&&(C.type===r.StackType.waste&&a(d.incrementScore(10)),C.type===r.StackType.foundation&&a(d.incrementScore(-10)),a(h(C,e,y)),a(p()))}},t.clickStock=function(){return(e,t)=>{const{stock:{stack:a,left:s},waste:{stacks:[r]}}=t();if(s>0)e(c.useStock(3)),e(i.addCardsToWaste([n.default.getCard(),n.default.getCard(),n.default.getCard()]));else if(a.cards.length>0){const t=a.cards.slice(-3).map(e=>e.card).filter(e=>null!=e).reverse();e(c.useStock(3)),e(i.addCardsToWaste(t))}else{const t=r.cards.map(e=>e.card).filter(e=>null!=e).reverse();e(c.addCardsToStock(t)),e(i.recycleWaste())}}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.horizontal="horizontal",e.vertical="vertical",e.none=""}(t.StackDirection||(t.StackDirection={})),function(e){e.tableau="tableau",e.foundation="foundation",e.stock="stock",e.waste="waste"}(t.StackType||(t.StackType={}))},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(9);function n(e,t){return e.suit===t.suit&&e.value===t.value}function c(e){return e===s.ValueType.ace?1:e===s.ValueType.jack?11:e===s.ValueType.queen?12:e===s.ValueType.king?13:parseInt(e)}t.random=((e,t)=>Math.floor(Math.random()*t)+e),t.equals=n,t.get_top_card=function(e){return e.cards[e.cards.length-1]},t.get_selection=function(e){for(let t=0;t<e.length;t++){const a=e[t];if(null!=a.selection)return{card:a.selection,stack:a}}return null},t.select_card=function(e,t){const a=t.card;return null==a?e:e.map(e=>!function(e,t){return e.cards.some(e=>!!e.card&&n(e.card,t))}(e,a)?e:Object.assign({},e,{cards:e.cards.map(e=>e.card&&n(e.card,a)?Object.assign({},e,{selected:!0}):e),selection:a}))},t.deselect_card=function(e){return e.map(e=>e.selection?Object.assign({},e,{selection:void 0,cards:e.cards.map(e=>e.selected?Object.assign({},e,{selected:void 0}):e)}):e)},t.move_cards=function(e,t,a,s){return e.map(e=>e===a?Object.assign({},e,{cards:[...e.cards,...s.map(e=>Object.assign({},e,{selected:!1}))]}):e===t?Object.assign({},e,{cards:e.cards.filter(e=>-1===s.indexOf(e))}):e)},t.movable_to_foundation=function(e,t){if(null==t)return e.value===s.ValueType.ace;const{card:a}=t;return!!a&&c(e.value)===c(a.value)+1&&e.suit===a.suit},t.movable_to_tableau=function(e,t){if(null==t)return e.value===s.ValueType.king;const{card:a}=t;return!!a&&(c(e.value)+1===c(a.value)&&e.isRed&&a.isBlack||e.isBlack&&a.isRed)}},,,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(9),n=a(4);t.default=new class{constructor(){this.cards=[],this.shuffle()}shuffle(){this.cards=[];for(const e of s.Cards)this.cards.push(Object.assign({},e))}getCard(){return this.cards.splice(n.random(0,this.cards.length-1),1)[0]}}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=75,n=97;var c,i;!function(e){e.ace="A",e.two="2",e.three="3",e.four="4",e.five="5",e.six="6",e.seven="7",e.eight="8",e.nine="9",e.ten="10",e.jack="J",e.queen="Q",e.king="K"}(c=t.ValueType||(t.ValueType={})),function(e){e.heart="♥",e.diamond="♦",e.spade="♠",e.club="♣"}(i||(i={})),t.Cards=[];for(const[,e]of Object.entries(c))for(const[,a]of Object.entries(i))t.Cards.push({suit:a,value:e,isRed:[i.diamond,i.heart].indexOf(a)>-1,isBlack:[i.club,i.spade].indexOf(a)>-1,drawing:r(a,e)});function r(e,t){const a=[i.diamond,i.heart].indexOf(e)>-1?"red":"black",r=[c.ace,c.jack,c.queen,c.king].indexOf(t)>-1?"72px":"20px",o=[];[c.ace,c.three,c.five,c.nine,c.jack,c.queen,c.king].indexOf(t)>-1&&o.push({x:1,y:3}),[c.two,c.three].indexOf(t)>-1&&o.push({x:1,y:0},{x:1,y:6}),[c.four,c.five,c.six,c.seven,c.eight,c.nine,c.ten].indexOf(t)>-1&&o.push({x:0,y:0},{x:2,y:0},{x:0,y:6},{x:2,y:6}),[c.six,c.seven,c.eight].indexOf(t)>-1&&o.push({x:0,y:3},{x:2,y:3}),[c.seven,c.ten,c.eight].indexOf(t)>-1&&o.push({x:1,y:1}),[c.nine,c.ten].indexOf(t)>-1&&o.push({x:0,y:2},{x:2,y:2},{x:0,y:4},{x:2,y:4}),[c.ten,c.eight].indexOf(t)>-1&&o.push({x:1,y:5});return{cornerFont:"bold 15px sans-serif",valueXOffset:9,valueYOffset:2,suitXOffset:9,suitYOffset:12,color:a,fontSize:r,positions:o.map(({x:e,y:t})=>({textAlign:(e=>{switch(e){case 0:return"left";case 1:return"center";case 2:return"right"}})(e),rotated:t>3,left:(e=>{switch(e){case 0:return.25*s;case 1:return.5*s;case 2:return.75*s}})(e),top:(e=>{switch(e){case 0:case 6:return.2*n;case 1:case 5:return.3*n;case 2:case 4:return.4*n;case 3:return.5*n}})(t)}))}}},,,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(2),n=a(3),c="USE_STOCK",i="ADD_CARDS_TO_STOCK";t.useStock=function(e){return{type:c,count:e}},t.addCardsToStock=function(e){return{type:i,cards:e}};const r={stack:{type:n.StackType.stock,cards:[{}]},left:24};t.default=function(e=r,t){if(t.type===s.INITIALIZE)return Object.assign({},r);if(t.type===c){let a;return a=e.left>0?e.left-t.count==0?[]:e.stack.cards:e.stack.cards.slice(0,-t.count),{stack:Object.assign({},e.stack,{cards:a}),left:e.left>0?e.left-t.count:0}}return t.type===i?Object.assign({},e,{stack:Object.assign({},e.stack,{cards:[...e.stack.cards,...t.cards.map(e=>({card:e}))]})}):e}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(2),n=a(4),c=a(3),i="RECYCLE_WASTE";t.recycleWaste=(()=>({type:i}));const r="ADD_CARDS_TO_WASTE";t.addCardsToWaste=(e=>({type:r,cards:e}));const o={stacks:[{type:c.StackType.waste,cards:[]}],showing:0};t.default=function(e=o,t){if(t.type===s.INITIALIZE)return Object.assign({},o);if(t.type===i)return Object.assign({},o);if(t.type===s.SELECT_CARD)return e.stacks.every(e=>e!==t.stack)?e:Object.assign({},e,{stacks:n.select_card(e.stacks,t.card)});if(t.type===s.DESELECT_CARD)return e.stacks.every(e=>null==e.selection)?e:Object.assign({},e,{stacks:n.deselect_card(e.stacks)});if(t.type===s.MOVE_CARDS)return e.stacks.every(e=>-1===[t.from,t.to].indexOf(e))?e:Object.assign({},e,{showing:Math.max(1,e.showing-1),stacks:n.move_cards(e.stacks,t.from,t.to,t.cards)});if(t.type===r){const a=[...e.stacks[0].cards,...t.cards.map(e=>({card:e}))];return Object.assign({},e,{showing:Math.min(a.length,3),stacks:e.stacks.map(e=>Object.assign({},e,{cards:a}))})}return e}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(2),n="INCREMENT_SCORE";t.incrementScore=function(e){return{type:n,score:e}};const c={score:0};t.default=function(e=c,t){return t.type===s.INITIALIZE?{score:0}:t.type===n?{score:e.score+t.score}:e}},function(e,t,a){e.exports={container:"_3hBob",top:"_3awzY",play:"_1E68Q",stock:"_2EnhJ",waste:"_3xl1i",foundation:"cOfJ3",tableau:"_2j3jz",version:"_3qfCP","new-game":"_3o9uZ",newGame:"_3o9uZ",score:"_1xo1P"}},,,,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(1),n=a(23),c=a(27),i=a(17),r=a(31),o=a(2),l=a(37);c.install({onUpdateReady(){c.applyUpdate()},onUpdated(){window.location.reload()}});const d=r.default();d.dispatch(o.initialize()),n.render(s.createElement(i.Provider,{store:d},s.createElement(l.Container,null)),document.getElementById("root"))},,,,,,,,,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(5),n=a(32),c=(a(33),a(34));t.default=function(e){const t=[];return t.push(n.default),s.createStore(c.default,e,s.applyMiddleware(...t))}},,,function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(5),n=a(35),c=a(36),i=a(14),r=a(13),o=a(15);t.default=s.combineReducers({tableau:n.default,foundation:c.default,waste:i.default,stock:r.default,score:o.default})},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(8),n=a(2),c=a(3),i=a(4),r={stacks:[]};t.default=function(e=r,t){if(t.type===n.INITIALIZE){const e=[];for(let t=0;t<=6;t++){const a={type:c.StackType.tableau,cards:[]};for(let e=0;e<t;e++)a.cards.push({});a.cards.push({card:s.default.getCard()}),e.push(a)}return{stacks:e}}return t.type===n.SELECT_CARD?e.stacks.every(e=>e!==t.stack)?e:Object.assign({},e,{stacks:i.select_card(e.stacks,t.card)}):t.type===n.DESELECT_CARD?e.stacks.every(e=>null==e.selection)?e:Object.assign({},e,{stacks:i.deselect_card(e.stacks)}):t.type===n.MOVE_CARDS?e.stacks.every(e=>-1===[t.from,t.to].indexOf(e))?e:Object.assign({},e,{stacks:i.move_cards(e.stacks,t.from,t.to,t.cards)}):t.type===n.REPLACE_TOP?Object.assign({},e,{stacks:e.stacks.map(e=>e!==t.stack?e:Object.assign({},e,{cards:e.cards.map((a,s)=>s<e.cards.length-1?a:{card:t.card})}))}):e}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(2),n=a(3),c=a(4),i={stacks:[{type:n.StackType.foundation,cards:[]},{type:n.StackType.foundation,cards:[]},{type:n.StackType.foundation,cards:[]},{type:n.StackType.foundation,cards:[]}]};t.default=function(e=i,t){return t.type===s.INITIALIZE?Object.assign({},i):t.type===s.SELECT_CARD?e.stacks.every(e=>e!==t.stack)?e:Object.assign({},e,{stacks:c.select_card(e.stacks,t.card)}):t.type===s.DESELECT_CARD?e.stacks.every(e=>null==e.selection)?e:Object.assign({},e,{stacks:c.deselect_card(e.stacks)}):t.type===s.MOVE_CARDS?e.stacks.every(e=>-1===[t.from,t.to].indexOf(e))?e:Object.assign({},e,{stacks:c.move_cards(e.stacks,t.from,t.to,t.cards)}):e}},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(1),n=a(17),c=a(12),i=a(38),r=a(8),o=a(16),l=a(3),d=a(2);const u=c.createSelector([e=>e.tableau.stacks,e=>e.foundation.stacks,e=>e.stock.stack,e=>e.waste,e=>e.score.score],(e,t,a,s,n)=>({tableau:e,foundation:t,stock:a,waste:s,score:n}));t.Container=n.connect(e=>u(e),e=>({handleNewGame:()=>e(d.initialize()),handleStockClick:()=>e(d.clickStock()),handleTableauClick:(t,a)=>e(d.clickTableau(t,a)),handleWasteClick:(t,a)=>e(d.clickWaste(t,a)),handleFoundationClick:(t,a)=>e(d.clickFoundation(t,a)),handleDoubleClick:(t,a)=>e(d.doubleClick(t,a))}))(class extends s.PureComponent{constructor(e){super(e),this.handleNewGameClick=this.handleNewGameClick.bind(this),this.handleStockClick=this.handleStockClick.bind(this),this.handleTableauClick=this.handleTableauClick.bind(this),this.handleWasteClick=this.handleWasteClick.bind(this),this.handleFoundationClick=this.handleFoundationClick.bind(this),this.handleDoubleClick=this.handleDoubleClick.bind(this)}handleNewGameClick(){r.default.shuffle(),this.props.handleNewGame()}handleStockClick(e,t){this.props.handleStockClick(e,t)}handleTableauClick(e,t){this.props.handleTableauClick(e,t)}handleWasteClick(e,t){this.props.handleWasteClick(e,t)}handleFoundationClick(e,t){this.props.handleFoundationClick(e,t)}handleDoubleClick(e,t){this.props.handleDoubleClick(e,t)}render(){return s.createElement("div",{className:o.container},s.createElement("div",null,s.createElement("button",{id:"new-game",className:o.newGame,onClick:this.handleNewGameClick},"New Game"),s.createElement("label",{id:"score",className:o.score},"Score: ",this.props.score)),s.createElement("div",{className:o.top},s.createElement(i.StackComponent,{stack:this.props.stock,onClick:this.handleStockClick,direction:l.StackDirection.none,type:l.StackType.stock,hidden:!0}),s.createElement(i.StackComponent,{stack:this.props.waste.stacks[0],onClick:this.handleWasteClick,onDoubleClick:this.handleDoubleClick,direction:l.StackDirection.horizontal,type:l.StackType.waste,max:this.props.waste.showing,offset:15}),this.props.foundation.map((e,t)=>s.createElement(i.StackComponent,{key:`foundation-${t}`,onClick:this.handleFoundationClick,stack:e,direction:l.StackDirection.none,type:l.StackType.foundation,max:1}))),s.createElement("div",{className:o.play},this.props.tableau.map((e,t)=>s.createElement(i.StackComponent,{key:`tableau-${t}`,onClick:this.handleTableauClick,onDoubleClick:this.handleDoubleClick,stack:e,direction:l.StackDirection.vertical,type:l.StackType.tableau}))),s.createElement("div",{className:o.version},"2.0.0"))}})},function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=a(1),n=a(16),c=a(3);class i extends s.PureComponent{constructor(e){super(e),this.ref=s.createRef(),this.handleCanvasClick=this.handleCanvasClick.bind(this),this.handleCanvasDoubleClick=this.handleCanvasDoubleClick.bind(this)}get stack_style(){switch(this.props.type){case c.StackType.foundation:return n.foundation;case c.StackType.tableau:return n.tableau;case c.StackType.stock:return n.stock;case c.StackType.waste:return n.waste}}get canvas_width(){switch(this.props.direction){case c.StackDirection.none:case c.StackDirection.vertical:return this.props.width;case c.StackDirection.horizontal:return 0===this.cards.length?this.props.height:this.props.offset*(this.cards.length-1)+this.props.width}}get canvas_height(){switch(this.props.direction){case c.StackDirection.none:case c.StackDirection.horizontal:return this.props.height;case c.StackDirection.vertical:return 0===this.cards.length?this.props.height:this.props.offset*(this.cards.length-1)+this.props.height}}get cards(){return this.props.hidden&&this.props.stack.cards.length>0?[{}]:this.props.stack.cards.slice(-this.props.max)}handleCanvasDoubleClick(e){const{cards:t}=this,{stack:a,offset:s,direction:n,onDoubleClick:i}=this.props,{nativeEvent:r}=e;if(!i)return;const o=n===c.StackDirection.horizontal?"offsetX":"offsetY";i(a,t[Math.min(t.length-1,Math.floor(r[o]/s))])}handleCanvasClick(e){const{cards:t}=this,{stack:a,offset:s,direction:n,onClick:i}=this.props,{nativeEvent:r}=e;if(!i)return;const o=n===c.StackDirection.horizontal?"offsetX":"offsetY";i(a,t[Math.min(t.length-1,Math.floor(r[o]/s))])}componentDidMount(){this.updateCanvas()}componentDidUpdate(){this.updateCanvas()}updateCanvas(){const e=this.ref.current;if(!e)return;const t=e.getContext("2d");if(!t)return;const{cards:a}=this,{direction:s,offset:n}=this.props;t.save(),t.translate(.5,.5),t.clearRect(0,0,e.width,e.height),0===a.length&&(this.drawBoxRadius(t,{x:0,y:0}),t.stroke());for(let e=0;e<a.length;e++){const i=s===c.StackDirection.horizontal?e*n:0,r=s===c.StackDirection.horizontal?0:e*n;e<a.length-1&&(t.save(),this.drawClipRegion(t,{x:i,y:r})),this.drawCard(t,a[e],{x:i,y:r}),e<a.length-1&&t.restore()}t.restore()}drawClipRegion(e,{x:t,y:a}){const{direction:s,radius:n,offset:i,width:r,height:o}=this.props,l=s===c.StackDirection.horizontal?i:r,d=s===c.StackDirection.horizontal?o:i;e.beginPath(),s===c.StackDirection.horizontal?(e.moveTo(t,a),e.lineTo(t+l+n,a),e.quadraticCurveTo(t+l,a,t+l,a+n),e.lineTo(t+l,a+d-n),e.quadraticCurveTo(t+l,a+d,t+l+n,a+d),e.lineTo(t,a+d)):(e.moveTo(t+l,a),e.lineTo(t+l,a+d+n),e.quadraticCurveTo(t+l,a+d,t+l-n,a+d),e.lineTo(t+n,a+d),e.quadraticCurveTo(t,a+d,t,a+d+n),e.lineTo(t,a)),e.closePath(),e.clip()}drawBoxRadius(e,{x:t,y:a}){const{radius:s,height:n,width:c}=this.props;e.beginPath(),e.moveTo(t+s,a),e.lineTo(t+c-s,a),e.quadraticCurveTo(t+c,a,t+c,a+s),e.lineTo(t+c,a+n-s),e.quadraticCurveTo(t+c,a+n,t+c-s,a+n),e.lineTo(t+s,a+n),e.quadraticCurveTo(t,a+n,t,a+n-s),e.lineTo(t,a+s),e.quadraticCurveTo(t,a,t+s,a),e.closePath()}drawCard(e,t,{x:a,y:s}){const{card:n,selected:c}=t;if(this.drawBoxRadius(e,{x:a,y:s}),e.stroke(),!n)return e.fillStyle="#0aa",void e.fill();c&&(e.fillStyle="yellow",e.fill());const{value:i,suit:r,drawing:o}=n;e.fillStyle=o.color,e.textAlign="center",e.textBaseline="top",e.font=o.cornerFont,e.fillText(i,o.valueXOffset+a,o.valueYOffset+s,12),e.fillText(r,o.suitXOffset+a,o.suitYOffset+s),e.save(),e.translate(this.props.width,this.props.height),e.rotate(Math.PI),e.fillText(i,o.valueXOffset-a,o.valueYOffset-s,12),e.fillText(r,o.suitXOffset-a,o.suitYOffset-s),e.restore(),e.textBaseline="middle";for(const t of o.positions){const n=t.rotated?-1:1;e.textAlign=t.textAlign,t.rotated&&(e.save(),e.translate(this.props.width,this.props.height),e.rotate(Math.PI)),e.font=`${o.fontSize} sans-serif`,e.fillText(r,t.left+a*n,t.top+s*n),t.rotated&&e.restore()}}render(){return s.createElement("canvas",{onDoubleClick:this.handleCanvasDoubleClick,onClick:this.handleCanvasClick,className:this.stack_style,width:this.canvas_width+1,height:this.canvas_height+1,ref:this.ref})}}i.defaultProps={max:1/0,hidden:!1,width:74,height:97,offset:20,radius:10},t.StackComponent=i}]);
//# sourceMappingURL=klondike.121e85f4850e3c1a8df9.js.map