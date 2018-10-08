!function(e){function t(t){for(var a,r,o=t[0],i=t[1],l=t[2],u=0,p=[];u<o.length;u++)r=o[u],s[r]&&p.push(s[r][0]),s[r]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);for(d&&d(t);p.length;)p.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],a=!0,o=1;o<n.length;o++){var i=n[o];0!==s[i]&&(a=!1)}a&&(c.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},s={0:0},c=[];function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var o=window.webpackJsonp=window.webpackJsonp||[],i=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var d=i;c.push([24,1]),n()}([,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(9),s=n(15),c=n(16),r=n(4),o=n(10),i=n(5),l=n(17),d=n(11),u=n(3),p=n(18),f=n(14);t.INITIALIZE="INITIALIZE",t.SELECT_CARD="SELECT_CARD",t.DESELECT_CARD="DESELECT_CARD",t.MOVE_CARDS="MOVE_CARDS",t.REPLACE_TOP="REPLACE_TOP";const h=a.createSelector([d.getFoundation,d.getWaste,d.getTableau],({stacks:e},{stacks:t},{stacks:n})=>[...e,...t,...n]);t.initialize=function(){return(e,n)=>{e({type:t.INITIALIZE}),d.getTableau(n()).stacks.forEach(t=>{const n=e(p.getRandomCard());e(f.appendCard({card:n},t))})}};const k=(e,n)=>({type:t.SELECT_CARD,card:n,stack:e}),y=()=>({type:t.DESELECT_CARD}),C=(e,n,a)=>{const s=e.cards.findIndex(e=>!!e.card&&i.equals(e.card,a)),c=e.cards.slice(s);return{type:t.MOVE_CARDS,from:e,to:n,cards:c}},b=(e,n)=>({type:t.REPLACE_TOP,stack:e,card:n});t.doubleClick=function(e,t){return(n,a)=>{if(e.type===r.StackType.foundation||e.type===r.StackType.stock)return;if(null==t)return;const{card:s}=t;if(null==s)return;const c=d.getFoundation(a()),p=s.value===o.ValueType.ace?c.stacks.find(e=>0===e.cards.length):c.stacks.find(e=>{if(0===e.cards.length)return!1;const t=e.cards[0].card;return null!=t&&t.suit===s.suit}),f=i.get_top_card(p);i.movable_to_foundation(s,f)&&(n(u.checkpoint()),e.type===r.StackType.waste&&n(l.incrementScore(5)),e.type===r.StackType.tableau&&n(l.incrementScore(10)),n(C(e,p,s)),n(y()))}},t.clickFoundation=function(e,t){return(n,a)=>{const s=h(a()),c=i.get_selection(s);if(!c)return void(t&&t.card&&n(k(e,t)));if(t&&t.selected)return void n(y());const o=i.get_top_card(e),{card:d,stack:p}=c;i.movable_to_foundation(d,o)&&(n(u.checkpoint()),p.type===r.StackType.waste&&n(l.incrementScore(5)),p.type===r.StackType.tableau&&n(l.incrementScore(10)),n(C(p,e,d)),n(y()))}},t.clickWaste=function(e,t){return(n,a)=>{if(!t)return;const s=h(a()),c=i.get_selection(s),r=i.get_top_card(e);t.selected?n(y()):c||r!==t||n(k(e,t))}},t.clickTableau=function(e,t){return(n,a)=>{const s=h(a()),c=i.get_selection(s);if(!c){if(t&&t.card)n(k(e,t));else if(t){n(u.checkpoint()),n(l.incrementScore(5));const t=n(p.getRandomCard());n(b(e,t))}return}if(t&&t.selected)return void n(y());const o=i.get_top_card(e),{card:d,stack:f}=c;t===o&&i.movable_to_tableau(d,o)&&(n(u.checkpoint()),f.type===r.StackType.waste&&n(l.incrementScore(10)),f.type===r.StackType.foundation&&n(l.incrementScore(-10)),n(C(f,e,d)),n(y()))}},t.clickStock=function(){return(e,t)=>{const n=t(),{stacks:[a]}=d.getWaste(n),{stack:r,left:o}=d.getStock(n);if(e(u.checkpoint()),o>0){const t=[];for(let n=0;n<3;n++)t.push(e(p.getRandomCard()));e(s.useStock(3)),e(c.addCardsToWaste(t))}else if(r.cards.length>0){const t=r.cards.slice(-3).map(e=>e.card).filter(e=>null!=e).reverse();e(s.useStock(3)),e(c.addCardsToWaste(t))}else{const t=a.cards.map(e=>e.card).filter(e=>null!=e).reverse();e(s.addCardsToStock(t)),e(c.recycleWaste())}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(2),s="UNDO";t.undo=(()=>({type:s}));const c="REDO";t.redo=(()=>({type:c}));const r="CHECKPOINT";t.checkpoint=(()=>({type:r})),t.undoable=function(e){const t={past:[],present:e(void 0,{}),future:[]};return function(n=t,o){const{past:i,present:l,future:d}=n;if(o.type===s){const e=i[i.length-1];return e?{past:i.slice(0,i.length-1),present:e,future:[l,...d]}:n}if(o.type===c){const e=d[0];if(!e)return n;const t=d.slice(1);return{past:[...i,l],present:e,future:t}}const u=e(l,o);return o.type===a.INITIALIZE?{past:[],present:u,future:[]}:o.type===r?{past:[...i,l],present:u,future:[]}:l===u?n:{past:i,present:u,future:d}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.horizontal="horizontal",e.vertical="vertical",e.none=""}(t.StackDirection||(t.StackDirection={})),function(e){e.tableau="tableau",e.foundation="foundation",e.stock="stock",e.waste="waste"}(t.StackType||(t.StackType={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(10);function s(e,t){return e.suit===t.suit&&e.value===t.value}function c(e){return e===a.ValueType.ace?1:e===a.ValueType.jack?11:e===a.ValueType.queen?12:e===a.ValueType.king?13:parseInt(e)}t.random=((e,t)=>Math.floor(Math.random()*t)+e),t.equals=s,t.get_top_card=function(e){return e.cards[e.cards.length-1]},t.get_selection=function(e){for(let t=0;t<e.length;t++){const n=e[t];if(null!=n.selection)return{card:n.selection,stack:n}}return null},t.select_card=function(e,t){const n=t.card;return null==n?e:e.map(e=>!function(e,t){return e.cards.some(e=>!!e.card&&s(e.card,t))}(e,n)?e:Object.assign({},e,{cards:e.cards.map(e=>e.card&&s(e.card,n)?Object.assign({},e,{selected:!0}):e),selection:n}))},t.deselect_card=function(e){return e.map(e=>e.selection?Object.assign({},e,{selection:void 0,cards:e.cards.map(e=>e.selected?Object.assign({},e,{selected:void 0}):e)}):e)},t.move_cards=function(e,t,n,a){return e.map(e=>e===n?Object.assign({},e,{cards:[...e.cards,...a.map(e=>Object.assign({},e,{selected:!1}))]}):e===t?Object.assign({},e,{cards:e.cards.filter(e=>-1===a.indexOf(e))}):e)},t.movable_to_foundation=function(e,t){if(null==t)return e.value===a.ValueType.ace;const{card:n}=t;return!!n&&c(e.value)===c(n.value)+1&&e.suit===n.suit},t.movable_to_tableau=function(e,t){if(null==t)return e.value===a.ValueType.king;const{card:n}=t;return!!n&&(c(e.value)+1===c(n.value)&&e.isRed&&n.isBlack||e.isBlack&&n.isRed)}},,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=75,s=97;var c,r;!function(e){e.ace="A",e.two="2",e.three="3",e.four="4",e.five="5",e.six="6",e.seven="7",e.eight="8",e.nine="9",e.ten="10",e.jack="J",e.queen="Q",e.king="K"}(c=t.ValueType||(t.ValueType={})),function(e){e.heart="♥",e.diamond="♦",e.spade="♠",e.club="♣"}(r||(r={})),t.Cards=[];for(const[,e]of Object.entries(c))for(const[,n]of Object.entries(r))t.Cards.push({suit:n,value:e,isRed:[r.diamond,r.heart].indexOf(n)>-1,isBlack:[r.club,r.spade].indexOf(n)>-1,drawing:o(n,e)});function o(e,t){const n=[r.diamond,r.heart].indexOf(e)>-1?"red":"black",o=[c.ace,c.jack,c.queen,c.king].indexOf(t)>-1?"72px":"20px",i=[];[c.ace,c.three,c.five,c.nine,c.jack,c.queen,c.king].indexOf(t)>-1&&i.push({x:1,y:3}),[c.two,c.three].indexOf(t)>-1&&i.push({x:1,y:0},{x:1,y:6}),[c.four,c.five,c.six,c.seven,c.eight,c.nine,c.ten].indexOf(t)>-1&&i.push({x:0,y:0},{x:2,y:0},{x:0,y:6},{x:2,y:6}),[c.six,c.seven,c.eight].indexOf(t)>-1&&i.push({x:0,y:3},{x:2,y:3}),[c.seven,c.ten,c.eight].indexOf(t)>-1&&i.push({x:1,y:1}),[c.nine,c.ten].indexOf(t)>-1&&i.push({x:0,y:2},{x:2,y:2},{x:0,y:4},{x:2,y:4}),[c.ten,c.eight].indexOf(t)>-1&&i.push({x:1,y:5});return{cornerFont:"bold 15px sans-serif",valueXOffset:9,valueYOffset:2,suitXOffset:9,suitYOffset:12,color:n,fontSize:o,positions:i.map(({x:e,y:t})=>({textAlign:(e=>{switch(e){case 0:return"left";case 1:return"center";case 2:return"right"}})(e),rotated:t>3,left:(e=>{switch(e){case 0:return.25*a;case 1:return.5*a;case 2:return.75*a}})(e),top:(e=>{switch(e){case 0:case 6:return.2*s;case 1:case 5:return.3*s;case 2:case 4:return.4*s;case 3:return.5*s}})(t)}))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(9);t.getFoundation=a.createSelector(e=>e.foundation.present,e=>e),t.getScore=a.createSelector(e=>e.score.present,e=>e),t.getStock=a.createSelector(e=>e.stock.present,e=>e),t.getTableau=a.createSelector(e=>e.tableau.present,e=>e),t.getWaste=a.createSelector(e=>e.waste.present,e=>e),t.getDeck=a.createSelector(e=>e.deck.present,e=>e)},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(2),s=n(4),c=n(5),r=n(3),o="APPEND_CARD";t.appendCard=((e,t)=>({type:o,card:e,stack:t}));const i={stacks:[]};t.default=r.undoable(function(e=i,t){if(t.type===a.INITIALIZE){const e=[];for(let t=0;t<=6;t++){const n={type:s.StackType.tableau,cards:[]};for(let e=0;e<t;e++)n.cards.push({});e.push(n)}return{stacks:e}}return t.type===a.SELECT_CARD?e.stacks.every(e=>e!==t.stack)?e:Object.assign({},e,{stacks:c.select_card(e.stacks,t.card)}):t.type===a.DESELECT_CARD?e.stacks.every(e=>null==e.selection)?e:Object.assign({},e,{stacks:c.deselect_card(e.stacks)}):t.type===a.MOVE_CARDS?e.stacks.every(e=>-1===[t.from,t.to].indexOf(e))?e:Object.assign({},e,{stacks:c.move_cards(e.stacks,t.from,t.to,t.cards)}):t.type===a.REPLACE_TOP?Object.assign({},e,{stacks:e.stacks.map(e=>e!==t.stack?e:Object.assign({},e,{cards:e.cards.map((n,a)=>a<e.cards.length-1?n:{card:t.card})}))}):t.type===o?Object.assign({},e,{stacks:e.stacks.map(e=>e!==t.stack?e:Object.assign({},e,{cards:[...e.cards,t.card]}))}):e})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(3),s=n(2),c=n(4),r="USE_STOCK",o="ADD_CARDS_TO_STOCK";t.useStock=function(e){return{type:r,count:e}},t.addCardsToStock=function(e){return{type:o,cards:e}};const i={stack:{type:c.StackType.stock,cards:[{}]},left:24};t.default=a.undoable(function(e=i,t){if(t.type===s.INITIALIZE)return Object.assign({},i);if(t.type===r){let n;return n=e.left>0?e.left-t.count==0?[]:e.stack.cards:e.stack.cards.slice(0,-t.count),{stack:Object.assign({},e.stack,{cards:n}),left:e.left>0?e.left-t.count:0}}return t.type===o?Object.assign({},e,{stack:Object.assign({},e.stack,{cards:[...e.stack.cards,...t.cards.map(e=>({card:e}))]})}):e})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(2),s=n(5),c=n(4),r=n(3),o="RECYCLE_WASTE";t.recycleWaste=(()=>({type:o}));const i="ADD_CARDS_TO_WASTE";t.addCardsToWaste=(e=>({type:i,cards:e}));const l={stacks:[{type:c.StackType.waste,cards:[]}],showing:0};t.default=r.undoable(function(e=l,t){if(t.type===a.INITIALIZE)return Object.assign({},l);if(t.type===o)return Object.assign({},l);if(t.type===a.SELECT_CARD)return e.stacks.every(e=>e!==t.stack)?e:Object.assign({},e,{stacks:s.select_card(e.stacks,t.card)});if(t.type===a.DESELECT_CARD)return e.stacks.every(e=>null==e.selection)?e:Object.assign({},e,{stacks:s.deselect_card(e.stacks)});if(t.type===a.MOVE_CARDS)return e.stacks.every(e=>-1===[t.from,t.to].indexOf(e))?e:Object.assign({},e,{showing:Math.max(1,e.showing-1),stacks:s.move_cards(e.stacks,t.from,t.to,t.cards)});if(t.type===i){const n=[...e.stacks[0].cards,...t.cards.map(e=>({card:e}))];return Object.assign({},e,{showing:Math.min(n.length,3),stacks:e.stacks.map(e=>Object.assign({},e,{cards:n}))})}return e})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(2),s=n(3),c="INCREMENT_SCORE";t.incrementScore=function(e){return{type:c,score:e}};const r={score:0};t.default=s.undoable(function(e=r,t){return t.type===a.INITIALIZE?{score:0}:t.type===c?{score:e.score+t.score}:e})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(10),s=n(2),c=n(3),r=n(5),o=n(11),i="REMOVE_CARD";t.removeCard=(e=>({type:i,card:e})),t.getRandomCard=(()=>(e,n)=>{const a=o.getDeck(n()),s=a.cards[r.random(0,a.cards.length-1)];return e(t.removeCard(s)),s});const l={cards:[]};t.default=c.undoable(function(e=l,t){if(t.type===s.INITIALIZE){const e=[];for(const t of a.Cards)e.push(Object.assign({},t));return{cards:e}}return t.type===i?{cards:e.cards.filter(e=>!r.equals(e,t.card))}:e})},function(e,t,n){e.exports={container:"_3hBob",top:"_3awzY",play:"_1E68Q",stock:"_2EnhJ",waste:"_3xl1i",foundation:"cOfJ3",tableau:"_2j3jz",version:"_3qfCP","new-game":"_3o9uZ",newGame:"_3o9uZ",score:"_1xo1P"}},,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(1),s=n(26),c=n(30),r=n(20),o=n(34),i=n(2),l=n(39);c.install({onUpdateReady(){c.applyUpdate()},onUpdated(){window.location.reload()}});const d=o.default();d.dispatch(i.initialize()),s.render(a.createElement(r.Provider,{store:d},a.createElement(l.Container,null)),document.getElementById("root"))},,,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(6),s=n(35),c=(n(36),n(37));t.default=function(e){const t=[];return t.push(s.default),a.createStore(c.default,e,a.applyMiddleware(...t))}},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(6),s=n(14),c=n(38),r=n(16),o=n(15),i=n(17),l=n(18);t.default=a.combineReducers({deck:l.default,tableau:s.default,foundation:c.default,waste:r.default,stock:o.default,score:i.default})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(2),s=n(4),c=n(5),r=n(3),o={stacks:[{type:s.StackType.foundation,cards:[]},{type:s.StackType.foundation,cards:[]},{type:s.StackType.foundation,cards:[]},{type:s.StackType.foundation,cards:[]}]};t.default=r.undoable(function(e=o,t){return t.type===a.INITIALIZE?Object.assign({},o):t.type===a.SELECT_CARD?e.stacks.every(e=>e!==t.stack)?e:Object.assign({},e,{stacks:c.select_card(e.stacks,t.card)}):t.type===a.DESELECT_CARD?e.stacks.every(e=>null==e.selection)?e:Object.assign({},e,{stacks:c.deselect_card(e.stacks)}):t.type===a.MOVE_CARDS?e.stacks.every(e=>-1===[t.from,t.to].indexOf(e))?e:Object.assign({},e,{stacks:c.move_cards(e.stacks,t.from,t.to,t.cards)}):e})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(1),s=n(20),c=n(9),r=n(40),o=n(19),i=n(4),l=n(2),d=n(11),u=n(3);const p=c.createSelector([d.getTableau,d.getFoundation,d.getStock,d.getWaste,d.getScore],({stacks:e},{stacks:t},{stack:n},a,{score:s})=>({tableau:e,foundation:t,stock:n,waste:a,score:s}));t.Container=s.connect(e=>p(e),e=>({handleNewGame:()=>e(l.initialize()),handleStockClick:()=>e(l.clickStock()),handleTableauClick:(t,n)=>e(l.clickTableau(t,n)),handleWasteClick:(t,n)=>e(l.clickWaste(t,n)),handleFoundationClick:(t,n)=>e(l.clickFoundation(t,n)),handleDoubleClick:(t,n)=>e(l.doubleClick(t,n)),handleUndo:()=>e(u.undo()),handleRedo:()=>e(u.redo())}))(class extends a.PureComponent{constructor(e){super(e),this.handleNewGameClick=this.handleNewGameClick.bind(this),this.handleStockClick=this.handleStockClick.bind(this),this.handleTableauClick=this.handleTableauClick.bind(this),this.handleWasteClick=this.handleWasteClick.bind(this),this.handleFoundationClick=this.handleFoundationClick.bind(this),this.handleDoubleClick=this.handleDoubleClick.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this)}componentDidMount(){document.addEventListener("keydown",this.handleKeyDown)}componentWillUnmount(){document.removeEventListener("keydown",this.handleKeyDown)}handleNewGameClick(){this.props.handleNewGame()}handleKeyDown(e){90===e.keyCode&&(e.ctrlKey&&e.shiftKey?this.props.handleRedo():e.ctrlKey&&this.props.handleUndo())}handleStockClick(e,t){this.props.handleStockClick(e,t)}handleTableauClick(e,t){this.props.handleTableauClick(e,t)}handleWasteClick(e,t){this.props.handleWasteClick(e,t)}handleFoundationClick(e,t){this.props.handleFoundationClick(e,t)}handleDoubleClick(e,t){this.props.handleDoubleClick(e,t)}render(){return a.createElement("div",{className:o.container},a.createElement("div",null,a.createElement("button",{id:"new-game",className:o.newGame,onClick:this.handleNewGameClick},"New Game"),a.createElement("label",{id:"score",className:o.score},"Score: ",this.props.score)),a.createElement("div",{className:o.top},a.createElement(r.StackComponent,{stack:this.props.stock,onClick:this.handleStockClick,direction:i.StackDirection.none,type:i.StackType.stock,hidden:!0}),a.createElement(r.StackComponent,{stack:this.props.waste.stacks[0],onClick:this.handleWasteClick,onDoubleClick:this.handleDoubleClick,direction:i.StackDirection.horizontal,type:i.StackType.waste,max:this.props.waste.showing,offset:15}),this.props.foundation.map((e,t)=>a.createElement(r.StackComponent,{key:`foundation-${t}`,onClick:this.handleFoundationClick,stack:e,direction:i.StackDirection.none,type:i.StackType.foundation,max:1}))),a.createElement("div",{className:o.play},this.props.tableau.map((e,t)=>a.createElement(r.StackComponent,{key:`tableau-${t}`,onClick:this.handleTableauClick,onDoubleClick:this.handleDoubleClick,stack:e,direction:i.StackDirection.vertical,type:i.StackType.tableau}))),a.createElement("div",{className:o.version},"2.1.0"))}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=n(1),s=n(19),c=n(4);class r extends a.PureComponent{constructor(e){super(e),this.ref=a.createRef(),this.handleCanvasClick=this.handleCanvasClick.bind(this),this.handleCanvasDoubleClick=this.handleCanvasDoubleClick.bind(this)}get stack_style(){switch(this.props.type){case c.StackType.foundation:return s.foundation;case c.StackType.tableau:return s.tableau;case c.StackType.stock:return s.stock;case c.StackType.waste:return s.waste}}get canvas_width(){switch(this.props.direction){case c.StackDirection.none:case c.StackDirection.vertical:return this.props.width;case c.StackDirection.horizontal:return 0===this.cards.length?this.props.height:this.props.offset*(this.cards.length-1)+this.props.width}}get canvas_height(){switch(this.props.direction){case c.StackDirection.none:case c.StackDirection.horizontal:return this.props.height;case c.StackDirection.vertical:return 0===this.cards.length?this.props.height:this.props.offset*(this.cards.length-1)+this.props.height}}get cards(){return this.props.hidden&&this.props.stack.cards.length>0?[{}]:this.props.stack.cards.slice(-this.props.max)}handleCanvasDoubleClick(e){const{cards:t}=this,{stack:n,offset:a,direction:s,onDoubleClick:r}=this.props,{nativeEvent:o}=e;if(!r)return;const i=s===c.StackDirection.horizontal?"offsetX":"offsetY";r(n,t[Math.min(t.length-1,Math.floor(o[i]/a))])}handleCanvasClick(e){const{cards:t}=this,{stack:n,offset:a,direction:s,onClick:r}=this.props,{nativeEvent:o}=e;if(!r)return;const i=s===c.StackDirection.horizontal?"offsetX":"offsetY";r(n,t[Math.min(t.length-1,Math.floor(o[i]/a))])}componentDidMount(){this.updateCanvas()}componentDidUpdate(){this.updateCanvas()}updateCanvas(){const e=this.ref.current;if(!e)return;const t=e.getContext("2d");if(!t)return;const{cards:n}=this,{direction:a,offset:s}=this.props;t.save(),t.translate(.5,.5),t.clearRect(0,0,e.width,e.height),0===n.length&&(this.drawBoxRadius(t,{x:0,y:0}),t.stroke());for(let e=0;e<n.length;e++){const r=a===c.StackDirection.horizontal?e*s:0,o=a===c.StackDirection.horizontal?0:e*s;e<n.length-1&&(t.save(),this.drawClipRegion(t,{x:r,y:o})),this.drawCard(t,n[e],{x:r,y:o}),e<n.length-1&&t.restore()}t.restore()}drawClipRegion(e,{x:t,y:n}){const{direction:a,radius:s,offset:r,width:o,height:i}=this.props,l=a===c.StackDirection.horizontal?r:o,d=a===c.StackDirection.horizontal?i:r;e.beginPath(),a===c.StackDirection.horizontal?(e.moveTo(t,n),e.lineTo(t+l+s,n),e.quadraticCurveTo(t+l,n,t+l,n+s),e.lineTo(t+l,n+d-s),e.quadraticCurveTo(t+l,n+d,t+l+s,n+d),e.lineTo(t,n+d)):(e.moveTo(t+l,n),e.lineTo(t+l,n+d+s),e.quadraticCurveTo(t+l,n+d,t+l-s,n+d),e.lineTo(t+s,n+d),e.quadraticCurveTo(t,n+d,t,n+d+s),e.lineTo(t,n)),e.closePath(),e.clip()}drawBoxRadius(e,{x:t,y:n}){const{radius:a,height:s,width:c}=this.props;e.beginPath(),e.moveTo(t+a,n),e.lineTo(t+c-a,n),e.quadraticCurveTo(t+c,n,t+c,n+a),e.lineTo(t+c,n+s-a),e.quadraticCurveTo(t+c,n+s,t+c-a,n+s),e.lineTo(t+a,n+s),e.quadraticCurveTo(t,n+s,t,n+s-a),e.lineTo(t,n+a),e.quadraticCurveTo(t,n,t+a,n),e.closePath()}drawCard(e,t,{x:n,y:a}){const{card:s,selected:c}=t;if(this.drawBoxRadius(e,{x:n,y:a}),e.stroke(),!s)return e.fillStyle="#0aa",void e.fill();c&&(e.fillStyle="yellow",e.fill());const{value:r,suit:o,drawing:i}=s;e.fillStyle=i.color,e.textAlign="center",e.textBaseline="top",e.font=i.cornerFont,e.fillText(r,i.valueXOffset+n,i.valueYOffset+a,12),e.fillText(o,i.suitXOffset+n,i.suitYOffset+a),e.save(),e.translate(this.props.width,this.props.height),e.rotate(Math.PI),e.fillText(r,i.valueXOffset-n,i.valueYOffset-a,12),e.fillText(o,i.suitXOffset-n,i.suitYOffset-a),e.restore(),e.textBaseline="middle";for(const t of i.positions){const s=t.rotated?-1:1;e.textAlign=t.textAlign,t.rotated&&(e.save(),e.translate(this.props.width,this.props.height),e.rotate(Math.PI)),e.font=`${i.fontSize} sans-serif`,e.fillText(o,t.left+n*s,t.top+a*s),t.rotated&&e.restore()}}render(){return a.createElement("canvas",{onDoubleClick:this.handleCanvasDoubleClick,onClick:this.handleCanvasClick,className:this.stack_style,width:this.canvas_width+1,height:this.canvas_height+1,ref:this.ref})}}r.defaultProps={max:1/0,hidden:!1,width:74,height:97,offset:20,radius:10},t.StackComponent=r}]);
//# sourceMappingURL=klondike.3c0a6984e75a1c0e20b8.js.map