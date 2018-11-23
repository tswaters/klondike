!function(e){function t(t){for(var s,o,r=t[0],i=t[1],l=t[2],u=0,p=[];u<r.length;u++)o=r[u],a[o]&&p.push(a[o][0]),a[o]=0;for(s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s]);for(d&&d(t);p.length;)p.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],s=!0,r=1;r<n.length;r++){var i=n[r];0!==a[i]&&(s=!1)}s&&(c.splice(t--,1),e=o(o.s=n[0]))}return e}var s={},a={0:0},c=[];function o(t){if(s[t])return s[t].exports;var n=s[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=s,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var r=window.webpackJsonp=window.webpackJsonp||[],i=r.push.bind(r);r.push=t,r=r.slice();for(var l=0;l<r.length;l++)t(r[l]);var d=i;c.push([21,1]),n()}([,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(6),a=n(4),c=n(11),o=n(5),r=n(16),i=n(7),l=n(3),d=n(17);t.INITIALIZE="INITIALIZE",t.SELECT_CARD="SELECT_CARD",t.DESELECT_CARD="DESELECT_CARD",t.MOVE_CARDS="MOVE_CARDS",t.REVEAL_TOP="REVEAL_TOP",t.APPEND_CARDS="APPEND_CARDS";const u=s.createSelector([i.getFoundation,i.getWaste,i.getTableau],({stacks:e},{stacks:t},{stacks:n})=>[...e,...t,...n]);t.initialize=function(){return(e,n)=>{e({type:t.INITIALIZE});const s=i.getStock(n()),a=e(d.getRandomCards(24)).map(e=>Object.assign({},e,{hidden:!0}));e(f(s.stacks[0],a));const c=i.getTableau(n());for(let t=0;t<c.stacks.length;t++){const n=e(d.getRandomCards(t+1)).map((e,n)=>Object.assign({},e,{hidden:n!==t}));e(f(c.stacks[t],n))}}};const p=(e,n)=>({type:t.SELECT_CARD,card:n,stack:e}),h=()=>({type:t.DESELECT_CARD}),f=(e,n)=>({type:t.APPEND_CARDS,cards:n,stack:e}),k=(e,n,s=null,a=null,c=!1,o=!1)=>{if(null==a){if(null==s)throw new Error("from card reqired when index not provided");a=e.cards.findIndex(e=>!!e.card&&e.card===s)}let r=e.cards.slice(a);return c&&r.reverse(),{type:t.MOVE_CARDS,from:e,to:n,cards:r,hidden:o}},y=e=>({type:t.REVEAL_TOP,stack:e});t.doubleClick=function(e,t){return(n,s)=>{if(e.type===a.StackType.foundation||e.type===a.StackType.stock)return;if(null==t)return;const{card:d}=t;if(null==d)return;const u=i.getFoundation(s()),p=d.value===c.ValueType.ace?u.stacks.find(e=>0===e.cards.length):u.stacks.find(e=>{if(0===e.cards.length)return!1;const t=e.cards[0].card;return null!=t&&t.suit===d.suit});if(!p)return;const f=o.get_top_card(p);o.movable_to_foundation(d,f)&&(n(l.checkpoint()),e.type===a.StackType.waste&&n(r.incrementScore(5)),e.type===a.StackType.tableau&&n(r.incrementScore(10)),n(k(e,p,d)),n(h()))}},t.clickFoundation=function(e,t){return(n,s)=>{const c=u(s()),i=o.get_selection(c);if(!i)return void(t&&t.card&&n(p(e,t)));if(t&&t.selected)return void n(h());const d=o.get_top_card(e),{card:f,stack:y}=i;o.movable_to_foundation(f,d)&&(n(l.checkpoint()),y.type===a.StackType.waste&&n(r.incrementScore(5)),y.type===a.StackType.tableau&&n(r.incrementScore(10)),n(k(y,e,f)),n(h()))}},t.clickWaste=function(e,t){return(n,s)=>{if(!t)return;const a=u(s()),c=o.get_selection(a),r=o.get_top_card(e);t.selected?n(h()):c||r!==t||n(p(e,t))}},t.clickTableau=function(e,t){return(n,s)=>{const c=u(s()),i=o.get_selection(c),d=o.get_top_card(e);if(!i)return void(t&&!t.hidden?n(p(e,t)):t&&d&&!0===d.hidden&&(n(l.checkpoint()),n(r.incrementScore(5)),n(y(e))));if(t&&t.selected)return void n(h());const{card:f,stack:m}=i;t===d&&o.movable_to_tableau(f,d)&&(n(l.checkpoint()),m.type===a.StackType.waste&&n(r.incrementScore(10)),m.type===a.StackType.foundation&&n(r.incrementScore(-10)),n(k(m,e,f)),n(h()))}},t.clickStock=function(){return(e,t)=>{const n=t(),{stacks:[s]}=i.getWaste(n),{stacks:[a]}=i.getStock(n);e(l.checkpoint()),e(h()),a.cards.length>0?e(k(a,s,null,-3,!0,!1)):e(k(s,a,null,0,!0,!0))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(2),a="UNDO";t.undo=(()=>({type:a}));const c="REDO";t.redo=(()=>({type:c}));const o="CHECKPOINT";t.checkpoint=(()=>({type:o})),t.undoable=function(e){const t={past:[],present:e(void 0,{}),future:[]};return function(n=t,r){const{past:i,present:l,future:d}=n;if(r.type===a){const e=i[i.length-1];return e?{past:i.slice(0,i.length-1),present:e,future:[l,...d]}:n}if(r.type===c){const e=d[0];if(!e)return n;const t=d.slice(1);return{past:[...i,l],present:e,future:t}}const u=e(l,r);return r.type===s.INITIALIZE?{past:[],present:u,future:[]}:r.type===o?{past:[...i,l],present:u,future:[]}:l===u?n:{past:i,present:u,future:d}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.horizontal="horizontal",e.vertical="vertical",e.none=""}(t.StackDirection||(t.StackDirection={})),function(e){e.tableau="tableau",e.foundation="foundation",e.stock="stock",e.waste="waste"}(t.StackType||(t.StackType={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(11);function a(e){return e===s.ValueType.ace?1:e===s.ValueType.jack?11:e===s.ValueType.queen?12:e===s.ValueType.king?13:parseInt(e)}t.random=((e,t)=>Math.floor(Math.random()*t)+e),t.get_top_card=function(e){return e.cards[e.cards.length-1]},t.get_selection=function(e){for(let t=0;t<e.length;t++){const n=e[t];if(null!=n.selection)return{card:n.selection,stack:n}}return null},t.select_card=function(e,t){const n=t.card;return null==n?e:e.map(e=>!function(e,t){return e.cards.some(e=>e.card===t)}(e,n)?e:Object.assign({},e,{cards:e.cards.map(e=>e.card?e.card!==n?e:Object.assign({},e,{selected:!0}):e),selection:n}))},t.deselect_card=function(e){return e.map(e=>e.selection?Object.assign({},e,{selection:void 0,cards:e.cards.map(e=>e.selected?Object.assign({},e,{selected:void 0}):e)}):e)},t.move_cards=function(e,t,n,s,a){return e.map(e=>e===n?Object.assign({},e,{cards:[...e.cards,...s.map(e=>Object.assign({},e,{selected:!1,hidden:a}))]}):e===t?Object.assign({},e,{cards:e.cards.filter(e=>-1===s.indexOf(e))}):e)},t.append_cards=function(e,t,n){return e.map(e=>e!==t?e:Object.assign({},e,{cards:[...e.cards,...n]}))},t.movable_to_foundation=function(e,t){if(null==t)return e.value===s.ValueType.ace;const{card:n}=t;return!!n&&a(e.value)===a(n.value)+1&&e.suit===n.suit},t.movable_to_tableau=function(e,t){if(null==t)return e.value===s.ValueType.king;const{card:n}=t;return!!n&&(a(e.value)+1===a(n.value)&&e.isRed&&n.isBlack||e.isBlack&&n.isRed)}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(6);t.getFoundation=s.createSelector(e=>e.foundation.present,e=>e),t.getScore=s.createSelector(e=>e.score.present,e=>e),t.getStock=s.createSelector(e=>e.stock.present,e=>e),t.getTableau=s.createSelector(e=>e.tableau.present,e=>e),t.getWaste=s.createSelector(e=>e.waste.present,e=>e),t.getDeck=s.createSelector(e=>e.deck.present,e=>e)},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=75,a=97;var c,o;!function(e){e.ace="A",e.two="2",e.three="3",e.four="4",e.five="5",e.six="6",e.seven="7",e.eight="8",e.nine="9",e.ten="10",e.jack="J",e.queen="Q",e.king="K"}(c=t.ValueType||(t.ValueType={})),function(e){e.heart="♥",e.diamond="♦",e.spade="♠",e.club="♣"}(o||(o={})),t.Cards=[];for(const[,e]of Object.entries(c))for(const[,n]of Object.entries(o))t.Cards.push({suit:n,value:e,isRed:[o.diamond,o.heart].indexOf(n)>-1,isBlack:[o.club,o.spade].indexOf(n)>-1,drawing:r(n,e)});function r(e,t){const n=[o.diamond,o.heart].indexOf(e)>-1?"red":"black",r=[c.ace,c.jack,c.queen,c.king].indexOf(t)>-1?"72px":"20px",i=[];[c.ace,c.three,c.five,c.nine,c.jack,c.queen,c.king].indexOf(t)>-1&&i.push({x:1,y:3}),[c.two,c.three].indexOf(t)>-1&&i.push({x:1,y:0},{x:1,y:6}),[c.four,c.five,c.six,c.seven,c.eight,c.nine,c.ten].indexOf(t)>-1&&i.push({x:0,y:0},{x:2,y:0},{x:0,y:6},{x:2,y:6}),[c.six,c.seven,c.eight].indexOf(t)>-1&&i.push({x:0,y:3},{x:2,y:3}),[c.seven,c.ten,c.eight].indexOf(t)>-1&&i.push({x:1,y:1}),[c.nine,c.ten].indexOf(t)>-1&&i.push({x:0,y:2},{x:2,y:2},{x:0,y:4},{x:2,y:4}),[c.ten,c.eight].indexOf(t)>-1&&i.push({x:1,y:5});return{cornerFont:"bold 15px sans-serif",valueXOffset:9,valueYOffset:2,suitXOffset:9,suitYOffset:12,color:n,fontSize:r,positions:i.map(({x:e,y:t})=>({textAlign:(e=>{switch(e){case 0:return"left";case 1:return"center";case 2:return"right"}})(e),rotated:t>3,left:(e=>{switch(e){case 0:return.25*s;case 1:return.5*s;case 2:return.75*s}})(e),top:(e=>{switch(e){case 0:case 6:return.2*a;case 1:case 5:return.3*a;case 2:case 4:return.4*a;case 3:return.5*a}})(t)}))}}},function(e,t,n){e.exports={container:"_3hBob",fireworks:"XihLW",top:"_3awzY",play:"_1E68Q",stock:"_2EnhJ",waste:"_3xl1i",foundation:"cOfJ3",tableau:"_2j3jz",version:"_3qfCP","new-game":"_3o9uZ",newGame:"_3o9uZ",score:"_1xo1P"}},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(2),a=n(3),c="INCREMENT_SCORE";t.incrementScore=function(e){return{type:c,score:e}};const o={score:0};t.default=a.undoable(function(e=o,t){return t.type===s.INITIALIZE?{score:0}:t.type===c?{score:e.score+t.score}:e})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(11),a=n(2),c=n(3),o=n(5),r=n(7),i="REMOVE_CARD";t.removeCards=(e=>({type:i,cards:e})),t.getRandomCards=(e=>(n,s)=>{const a=[...r.getDeck(s()).cards],c=[];for(let t=0;t<e;t++){const e=o.random(0,a.length-1);c.push(...a.splice(e,1))}return n(t.removeCards(c)),c});const l={cards:[]};t.default=c.undoable(function(e=l,t){if(t.type===a.INITIALIZE){const e=[];for(const t of s.Cards)e.push({card:Object.assign({},t)});return{cards:e}}return t.type===i?{cards:e.cards.filter(e=>-1===t.cards.indexOf(e))}:e})},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(1),a=n(23),c=n(27),o=n(13),r=n(31),i=n(2),l=n(39);c.install({onUpdateReady(){c.applyUpdate()},onUpdated(){window.location.reload()}});const d=r.default();d.dispatch(i.initialize()),a.render(s.createElement(o.Provider,{store:d},s.createElement(l.Container,null)),document.getElementById("root"))},,,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(8),a=n(32),c=(n(33),n(34));t.default=function(e){const t=[];return t.push(a.default),s.createStore(c.default,e,s.applyMiddleware(...t))}},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(8),a=n(35),c=n(36),o=n(37),r=n(38),i=n(16),l=n(17);t.default=s.combineReducers({deck:l.default,tableau:a.default,foundation:c.default,waste:o.default,stock:r.default,score:i.default})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(2),a=n(4),c=n(5),o=n(3),r={stacks:[{type:a.StackType.tableau,cards:[]},{type:a.StackType.tableau,cards:[]},{type:a.StackType.tableau,cards:[]},{type:a.StackType.tableau,cards:[]},{type:a.StackType.tableau,cards:[]},{type:a.StackType.tableau,cards:[]},{type:a.StackType.tableau,cards:[]}]};t.default=o.undoable(function(e=r,t){return t.type===s.INITIALIZE?Object.assign({},r):t.type===s.SELECT_CARD&&e.stacks.some(e=>e===t.stack)?Object.assign({},e,{stacks:c.select_card(e.stacks,t.card)}):t.type===s.DESELECT_CARD&&e.stacks.some(e=>!!e.selection)?Object.assign({},e,{stacks:c.deselect_card(e.stacks)}):t.type===s.MOVE_CARDS&&e.stacks.some(e=>[t.from,t.to].indexOf(e)>-1)?Object.assign({},e,{stacks:c.move_cards(e.stacks,t.from,t.to,t.cards,t.hidden)}):t.type===s.APPEND_CARDS&&e.stacks.some(e=>t.stack===e)?Object.assign({},e,{stacks:c.append_cards(e.stacks,t.stack,t.cards)}):t.type===s.REVEAL_TOP?Object.assign({},e,{stacks:e.stacks.map(e=>e!==t.stack?e:Object.assign({},e,{cards:e.cards.map((t,n)=>n<e.cards.length-1?t:Object.assign({},t,{hidden:!1}))}))}):e})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(2),a=n(4),c=n(5),o=n(3),r={stacks:[{type:a.StackType.foundation,cards:[]},{type:a.StackType.foundation,cards:[]},{type:a.StackType.foundation,cards:[]},{type:a.StackType.foundation,cards:[]}]};t.default=o.undoable(function(e=r,t){return t.type===s.INITIALIZE?Object.assign({},r):t.type===s.SELECT_CARD&&e.stacks.some(e=>e===t.stack)?Object.assign({},e,{stacks:c.select_card(e.stacks,t.card)}):t.type===s.DESELECT_CARD&&e.stacks.some(e=>!!e.selection)?Object.assign({},e,{stacks:c.deselect_card(e.stacks)}):t.type===s.MOVE_CARDS&&e.stacks.some(e=>[t.from,t.to].indexOf(e)>-1)?Object.assign({},e,{stacks:c.move_cards(e.stacks,t.from,t.to,t.cards,t.hidden)}):e})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(2),a=n(5),c=n(4),o=n(3),r={stacks:[{type:c.StackType.waste,cards:[]}],showing:0};t.default=o.undoable(function(e=r,t){return t.type===s.INITIALIZE?Object.assign({},r):t.type===s.SELECT_CARD&&e.stacks.some(e=>e===t.stack)?Object.assign({},e,{stacks:a.select_card(e.stacks,t.card)}):t.type===s.DESELECT_CARD&&e.stacks.some(e=>!!e.selection)?Object.assign({},e,{stacks:a.deselect_card(e.stacks)}):t.type===s.MOVE_CARDS&&e.stacks.some(e=>[t.from,t.to].indexOf(e)>-1)?Object.assign({},e,{showing:t.to===e.stacks[0]?Math.min(e.stacks[0].cards.length+t.cards.length,3):Math.max(1,e.showing-1),stacks:a.move_cards(e.stacks,t.from,t.to,t.cards,t.hidden)}):t.type===s.APPEND_CARDS&&e.stacks.some(e=>t.stack===e)?Object.assign({},e,{showing:t.stack===e.stacks[0]?Math.min(e.stacks[0].cards.length+t.cards.length,3):Math.max(1,e.showing-1),stacks:a.append_cards(e.stacks,t.stack,t.cards)}):e})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(3),a=n(2),c=n(4),o=n(5),r={stacks:[{type:c.StackType.stock,cards:[]}]};t.default=s.undoable(function(e=r,t){return t.type===a.INITIALIZE?Object.assign({},r):t.type===a.MOVE_CARDS&&e.stacks.some(e=>[t.from,t.to].indexOf(e)>-1)?Object.assign({},e,{stacks:o.move_cards(e.stacks,t.from,t.to,t.cards,t.hidden)}):t.type===a.APPEND_CARDS&&e.stacks.some(e=>t.stack===e)?Object.assign({},e,{stacks:o.append_cards(e.stacks,t.stack,t.cards)}):e})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(1),a=n(13),c=n(6),o=n(40),r=n(42),i=n(12),l=n(4),d=n(2),u=n(7),p=n(3);const h=c.createSelector([u.getTableau,u.getFoundation,u.getStock,u.getWaste,u.getScore],({stacks:e},{stacks:t},n,s,{score:a})=>({tableau:e,foundation:t,stock:n,waste:s,score:a}));t.Container=a.connect(e=>h(e),e=>({handleNewGame:()=>e(d.initialize()),handleStockClick:()=>e(d.clickStock()),handleTableauClick:(t,n)=>e(d.clickTableau(t,n)),handleWasteClick:(t,n)=>e(d.clickWaste(t,n)),handleFoundationClick:(t,n)=>e(d.clickFoundation(t,n)),handleDoubleClick:(t,n)=>e(d.doubleClick(t,n)),handleUndo:()=>e(p.undo()),handleRedo:()=>e(p.redo())}))(class extends s.PureComponent{constructor(e){super(e),this.handleNewGameClick=this.handleNewGameClick.bind(this),this.handleStockClick=this.handleStockClick.bind(this),this.handleTableauClick=this.handleTableauClick.bind(this),this.handleWasteClick=this.handleWasteClick.bind(this),this.handleFoundationClick=this.handleFoundationClick.bind(this),this.handleDoubleClick=this.handleDoubleClick.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this)}componentDidMount(){document.addEventListener("keydown",this.handleKeyDown)}componentWillUnmount(){document.removeEventListener("keydown",this.handleKeyDown)}handleNewGameClick(){this.props.handleNewGame()}handleKeyDown(e){90===e.keyCode&&(e.ctrlKey&&e.shiftKey?this.props.handleRedo():e.ctrlKey&&this.props.handleUndo())}handleStockClick(e,t){this.props.handleStockClick(e,t)}handleTableauClick(e,t){this.props.handleTableauClick(e,t)}handleWasteClick(e,t){this.props.handleWasteClick(e,t)}handleFoundationClick(e,t){this.props.handleFoundationClick(e,t)}handleDoubleClick(e,t){this.props.handleDoubleClick(e,t)}render(){return s.createElement("div",{className:i.container},s.createElement(r.default,null),s.createElement("div",null,s.createElement("button",{id:"new-game",className:i.newGame,onClick:this.handleNewGameClick},"New Game"),s.createElement("label",{id:"score",className:i.score},"Score: ",this.props.score)),s.createElement("div",{className:i.top},s.createElement(o.StackComponent,{stack:this.props.stock.stacks[0],onClick:this.handleStockClick,direction:l.StackDirection.none,type:l.StackType.stock,hidden:!0,max:1}),s.createElement(o.StackComponent,{stack:this.props.waste.stacks[0],onClick:this.handleWasteClick,onDoubleClick:this.handleDoubleClick,direction:l.StackDirection.horizontal,type:l.StackType.waste,hidden:!1,max:this.props.waste.showing,offset:15}),this.props.foundation.map((e,t)=>s.createElement(o.StackComponent,{key:`foundation-${t}`,onClick:this.handleFoundationClick,stack:e,direction:l.StackDirection.none,type:l.StackType.foundation,max:1}))),s.createElement("div",{className:i.play},this.props.tableau.map((e,t)=>s.createElement(o.StackComponent,{key:`tableau-${t}`,onClick:this.handleTableauClick,onDoubleClick:this.handleDoubleClick,stack:e,direction:l.StackDirection.vertical,type:l.StackType.tableau}))),s.createElement("div",{className:i.version},"2.2.1"))}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(1),a=n(12),c=n(4);class o extends s.PureComponent{constructor(e){super(e),this.ref=s.createRef(),this.handleCanvasClick=this.handleCanvasClick.bind(this),this.handleCanvasDoubleClick=this.handleCanvasDoubleClick.bind(this)}get stack_style(){switch(this.props.type){case c.StackType.foundation:return a.foundation;case c.StackType.tableau:return a.tableau;case c.StackType.stock:return a.stock;case c.StackType.waste:return a.waste}}get canvas_width(){switch(this.props.direction){case c.StackDirection.none:case c.StackDirection.vertical:return this.props.width;case c.StackDirection.horizontal:return 0===this.cards.length?this.props.height:this.props.offset*(this.cards.length-1)+this.props.width}}get canvas_height(){switch(this.props.direction){case c.StackDirection.none:case c.StackDirection.horizontal:return this.props.height;case c.StackDirection.vertical:return 0===this.cards.length?this.props.height:this.props.offset*(this.cards.length-1)+this.props.height}}get cards(){return this.props.stack.cards.slice(-this.props.max)}handleCanvasDoubleClick(e){const{cards:t}=this,{stack:n,offset:s,direction:a,onDoubleClick:o}=this.props,{nativeEvent:r}=e;if(!o)return;const i=a===c.StackDirection.horizontal?"offsetX":"offsetY";o(n,t[Math.min(t.length-1,Math.floor(r[i]/s))])}handleCanvasClick(e){const{cards:t}=this,{stack:n,offset:s,direction:a,onClick:o}=this.props,{nativeEvent:r}=e;if(!o)return;const i=a===c.StackDirection.horizontal?"offsetX":"offsetY";o(n,t[Math.min(t.length-1,Math.floor(r[i]/s))])}componentDidMount(){this.updateCanvas()}componentDidUpdate(){this.updateCanvas()}updateCanvas(){const e=this.ref.current;if(!e)return;const t=e.getContext("2d");if(!t)return;const{cards:n}=this,{direction:s,offset:a}=this.props;t.save(),t.translate(.5,.5),t.clearRect(0,0,e.width,e.height),0===n.length&&(this.drawBoxRadius(t,{x:0,y:0}),t.stroke());for(let e=0;e<n.length;e++){const o=s===c.StackDirection.horizontal?e*a:0,r=s===c.StackDirection.horizontal?0:e*a;e<n.length-1&&(t.save(),this.drawClipRegion(t,{x:o,y:r})),this.drawCard(t,n[e],{x:o,y:r}),e<n.length-1&&t.restore()}t.restore()}drawClipRegion(e,{x:t,y:n}){const{direction:s,radius:a,offset:o,width:r,height:i}=this.props,l=s===c.StackDirection.horizontal?o:r,d=s===c.StackDirection.horizontal?i:o;e.beginPath(),s===c.StackDirection.horizontal?(e.moveTo(t,n),e.lineTo(t+l+a,n),e.quadraticCurveTo(t+l,n,t+l,n+a),e.lineTo(t+l,n+d-a),e.quadraticCurveTo(t+l,n+d,t+l+a,n+d),e.lineTo(t,n+d)):(e.moveTo(t+l,n),e.lineTo(t+l,n+d+a),e.quadraticCurveTo(t+l,n+d,t+l-a,n+d),e.lineTo(t+a,n+d),e.quadraticCurveTo(t,n+d,t,n+d+a),e.lineTo(t,n)),e.closePath(),e.clip()}drawBoxRadius(e,{x:t,y:n}){const{radius:s,height:a,width:c}=this.props;e.beginPath(),e.moveTo(t+s,n),e.lineTo(t+c-s,n),e.quadraticCurveTo(t+c,n,t+c,n+s),e.lineTo(t+c,n+a-s),e.quadraticCurveTo(t+c,n+a,t+c-s,n+a),e.lineTo(t+s,n+a),e.quadraticCurveTo(t,n+a,t,n+a-s),e.lineTo(t,n+s),e.quadraticCurveTo(t,n,t+s,n),e.closePath()}drawCard(e,t,{x:n,y:s}){const{card:a,hidden:c,selected:o}=t;if(this.drawBoxRadius(e,{x:n,y:s}),e.stroke(),c)return e.fillStyle="#0aa",void e.fill();o&&(e.fillStyle="yellow",e.fill());const{value:r,suit:i,drawing:l}=a;e.fillStyle=l.color,e.textAlign="center",e.textBaseline="top",e.font=l.cornerFont,e.fillText(r,l.valueXOffset+n,l.valueYOffset+s,12),e.fillText(i,l.suitXOffset+n,l.suitYOffset+s),e.save(),e.translate(this.props.width,this.props.height),e.rotate(Math.PI),e.fillText(r,l.valueXOffset-n,l.valueYOffset-s,12),e.fillText(i,l.suitXOffset-n,l.suitYOffset-s),e.restore(),e.textBaseline="middle";for(const t of l.positions){const a=t.rotated?-1:1;e.textAlign=t.textAlign,t.rotated&&(e.save(),e.translate(this.props.width,this.props.height),e.rotate(Math.PI)),e.font=`${l.fontSize} sans-serif`,e.fillText(i,t.left+n*a,t.top+s*a),t.rotated&&e.restore()}}render(){return s.createElement("canvas",{onDoubleClick:this.handleCanvasDoubleClick,onClick:this.handleCanvasClick,className:this.stack_style,width:this.canvas_width+1,height:this.canvas_height+1,ref:this.ref})}}o.defaultProps={max:1/0,hidden:!1,width:74,height:97,offset:20,radius:10},t.StackComponent=o},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(1),a=n(13),c=n(6),o=n(43),r=n(12),i=n(7);const l=c.createSelector([i.getFoundation],({stacks:e})=>({active:e.every(e=>13===e.cards.length)}));t.default=a.connect(e=>l(e))(class extends s.PureComponent{constructor(e){super(e),this.ref=s.createRef(),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this)}handleDocumentKeyDown(e){27===e.keyCode&&this.fireworks.stop()}componentDidMount(){if(!this.ref.current)return null;this.fireworks=new o(this.ref.current)}componentDidUpdate(){this.props.active?(document.addEventListener("keydown",this.handleDocumentKeyDown),this.fireworks.start()):(document.removeEventListener("keydown",this.handleDocumentKeyDown),this.fireworks.kill())}componentWillUnmount(){this.fireworks.destroy()}render(){return s.createElement("div",{className:r.fireworks,ref:this.ref})}})}]);
//# sourceMappingURL=klondike.d05ce5e3c384f4626fd8.js.map