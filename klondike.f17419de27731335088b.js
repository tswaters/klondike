(()=>{var e,t={3:e=>{e.exports={topBar:"XwVLUrO3NoD_AUivFS56j",fireworks:"_3nvOdthckw9G8z05Xiav92",game:"_1VoMUOf1IbpEJjbCNdZsU9",button:"OktEGbV1DqgG2_sQ16MRl",label:"_1HEad0y2SdUmqeXvzo2hG6",optionsMask:"_27aor1u7u5hz8M4_9poVe8",optionsModal:"_3gKGSm81FK9xUP7Tx5P_-n"}},730:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const r=a(294),n=a(940),o=a(409),c=a(938),i=a(5),s=a(638),l=a(626),d=a(956),u=a(737),h=()=>{const e=c.retrieve(c.PersistanceType.number,u.newGameNumber()),t=c.retrieve(c.PersistanceType.type,i.ScoringType.regular),a=c.retrieve(c.PersistanceType.theme,s.ColorSchemeType.dark);return l.default.dispatch(d.initializeGame({newType:t,newNumber:e,newTheme:a})),r.createElement(n.Provider,{store:l.default},r.createElement(o.default,null))};t.App=h,t.default=r.memo(h)},409:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=a(294),n=a(570),o=a(940),c=a(688),i=a(638),s=a(3),l=a(394),d=a(634),u=a(794),h=a(383),g=a(956),p=a(741),y=a(845);t.default=n.hot(r.memo((()=>{const e=o.useDispatch(),t=o.useSelector(y.getStacks),a=o.useSelector(y.getOverDrawn),n=o.useSelector(y.getShowing),m=o.useSelector(y.getTheme),f=o.useSelector(y.getScore),S=o.useSelector(y.getNumber),k=r.useMemo((()=>{const e=i.colorSchemes[m];return{"--background":e.background,"--color":e.color,"--emptyColor":e.emptyColor,"--faceUp":e.faceUp,"--hiddenColor1":e.hiddenColor1,"--hiddenColor2":e.hiddenColor2,"--buttonBorder":e.buttonBorder,"--cardBorder":e.cardBorder,"--black":e.black,"--red":e.red,"--selected":e.selected,"--errorColor":e.errorColor}}),[m]),[v,C]=r.useState(!1),T=r.useCallback((()=>C(!1)),[]),b=r.useCallback((()=>C(!0)),[]),w=r.useCallback((()=>e(g.newNumber())),[e]);return r.useEffect((()=>{const t=t=>{1===t.button&&(t.preventDefault(),e(g.performMoves()))},a=t=>{"F2"===t.code&&e(g.newNumber()),"Escape"===t.code&&C((e=>!e)),"KeyZ"===t.code&&t.ctrlKey&&(t.shiftKey?e(p.redo()):e(p.undo()))};return document.addEventListener("mousedown",t),document.addEventListener("keydown",a),()=>{document.removeEventListener("mousedown",t),document.removeEventListener("keydown",a)}}),[e]),r.createElement("div",{style:k},r.createElement(l.default,null),v&&r.createElement(r.Fragment,null,r.createElement(h.default,{onClose:T,className:s.optionsModal}),r.createElement("div",{onClick:T,className:s.optionsMask})),r.createElement("div",{className:s.topBar},r.createElement("div",null,r.createElement("button",{title:"New Game",tabIndex:1,onClick:w,className:s.button},r.createElement("span",{"aria-hidden":"true"},"🔄︎"),r.createElement("span",{style:{display:"none"}},"New Game")),r.createElement("span",{title:"Game Number",className:s.label},String(S).padStart(4,"0"))),r.createElement("div",null,r.createElement("span",{title:"Score",className:s.label},f),r.createElement("button",{title:"Main Menu",tabIndex:1,onClick:b,className:s.button},r.createElement("span",{"aria-hidden":"true"},"☰︎"),r.createElement("span",{style:{display:"none"}},"Main Menu")))),r.createElement(d.default,{className:s.game},t.map((e=>r.createElement(u.default,Object.assign({key:`${e.type}-${e.index}`,stack:e},e.type===c.StackType.waste&&{showing:n},e.type===c.StackType.stock&&{overDrawn:a}))))))})))},394:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=a(294),n=a(940),o=a(217),c=a(845),i=a(3);t.default=r.memo((()=>{const e=r.useRef(null),t=r.useRef(),a=n.useSelector(c.getGameWon),s=a?"":"none";return r.useEffect((()=>{if(null==e.current)return;t.current=new o(e.current);return document.addEventListener("keydown",(e=>{var a;"Escape"===e.key&&(null===(a=t.current)||void 0===a||a.stop())})),()=>{var e;null===(e=t.current)||void 0===e||e.destroy()}}),[e,a]),r.useEffect((()=>{var e,r;a?null===(e=t.current)||void 0===e||e.start():null===(r=t.current)||void 0===r||r.stop()}),[a]),r.createElement("div",{className:i.fireworks,style:{display:s,zIndex:5},ref:e})}))},634:function(e,t,a){"use strict";var r=this&&this.__rest||function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(a[r[n]]=e[r[n]])}return a};Object.defineProperty(t,"__esModule",{value:!0}),t.GameCanvas=t.GameCtx=void 0;const n=a(294),o=a(638),c=a(952),i=a(411),s=a(940),l=a(845);t.GameCtx=n.createContext(null);const d=(e,t)=>{const{nativeEvent:a}=e,r=a.target,n={x:a.offsetX,y:a.offsetY},o=r.getContext("2d");for(const e of t.keys())if(null==o?void 0:o.isPointInPath(e,n.x,n.y)){const a=t.get(e);if(null==a)return;return{thing:a,point:n}}},u=e=>{var{children:a}=e,u=r(e,["children"]);const h=n.useRef(new Map),g=n.useRef(new Map),p=n.useRef(new Map),{ctx:y,width:m,height:f,handleCanvasRef:S}=i.useCanvasSize(),k=s.useSelector(l.getTheme),v=o.colorSchemes[k],C=n.useMemo((()=>m&&f&&y?{ctx:y,width:m,height:f,colorSchemeType:k,colorScheme:v}:null),[y,m,f,k,v]);n.useLayoutEffect((()=>C&&c.initialize(C)||void 0),[C]);const T=n.useMemo((()=>C&&{context:C,add(e,t){h.current.set(e.path,e),t.onClick&&g.current.set(e.path,t.onClick),t.onDoubleClick&&p.current.set(e.path,t.onDoubleClick)},remove(e){h.current.delete(e),g.current.delete(e),p.current.delete(e)}}),[C]),b=n.useCallback((e=>{const t=d(e,h.current);if(t){const{thing:e,point:a}=t,r=p.current.get(e.path);r&&r(e,a)}}),[]),w=n.useCallback((e=>{const t=d(e,h.current);if(t){const{thing:e,point:a}=t,r=g.current.get(e.path);r&&r(e,a)}}),[]);return n.createElement(n.Fragment,null,n.createElement("canvas",Object.assign({id:"canvas",ref:S,width:window.innerWidth,height:window.innerHeight,onClick:w,onDoubleClick:b},u)),n.createElement(t.GameCtx.Provider,{value:T},a))};t.GameCanvas=u,t.default=n.memo(u)},383:function(e,t,a){"use strict";var r=this&&this.__rest||function(e,t){var a={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(a[r[n]]=e[r[n]])}return a};Object.defineProperty(t,"__esModule",{value:!0}),t.Options=t.OptionCtx=void 0;const n=a(294),o=a(940),c=a(5),i=a(638),s=a(845),l=a(229),d=a(956),u=new Set;t.OptionCtx=n.createContext(u);const h=n.memo((e=>{var{value:t,onChange:a,name:o,options:c=[],label:i,min:s,max:l,type:d="text"}=e,h=r(e,["value","onChange","name","options","label","min","max","type"]);const[g,p]=n.useState(t),y=n.useCallback((e=>p(e.target.value)),[]),m=n.useCallback((()=>{g!==t&&a(g)}),[t,g,a]);return n.useEffect((()=>(u.add(m),()=>{u.delete(m)}))),n.createElement("fieldset",Object.assign({},h),n.createElement("legend",null,i),0===c.length?n.createElement("div",null,n.createElement("label",{htmlFor:`option-${o}`,style:{display:"none"}},i),n.createElement("input",Object.assign({type:d,id:`option-${o}`,value:String(g),onChange:y},s&&{min:s},l&&{max:l}))):c.map((([e,t])=>n.createElement("div",{key:e.toString()},n.createElement("input",{type:"radio",id:`${o}-${e}`,checked:g===t,value:String(t),onChange:y}),n.createElement("label",{htmlFor:`${o}-${e}`},e)))))}));h.displayName="Option";const g=[["Regular",c.ScoringType.regular],["Vegas",c.ScoringType.vegas]],p=[["Dark",i.ColorSchemeType.dark],["Light",i.ColorSchemeType.light]],y=n.memo((e=>{var{onClose:t}=e,a=r(e,["onClose"]);const c=n.useCallback((e=>{e.preventDefault(),u.forEach((e=>e())),t()}),[t]),i=o.useDispatch(),y=o.useSelector(s.getType),m=o.useSelector(s.getTheme),f=o.useSelector(s.getNumber),S=n.useCallback((e=>i(d.newNumber(parseInt(e,10)))),[i]),k=n.useCallback((e=>i(d.newType(e))),[i]),v=n.useCallback((e=>i(l.changeTheme(e))),[i]);return n.createElement("form",Object.assign({onSubmit:c},a),n.createElement(h,{name:"game-number",label:"Game Number",type:"number",min:1,max:9999,value:f,onChange:S}),n.createElement(h,{name:"type",label:"Game Type",value:y,onChange:k,options:g}),n.createElement(h,{name:"theme",label:"Theme",value:m,onChange:v,options:p}),n.createElement("button",{type:"submit"},"Save"))}));t.Options=y,y.displayName="OptionContainer",t.default=n.memo(y)},794:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.StackElement=void 0;const r=a(294),n=a(634),o=a(669),c=a(688),i=a(940),s=a(956),l=a(126),d=a(294),u=({stack:e,overDrawn:t=!1,showing:a=1/0})=>{const u=i.useDispatch(),h=r.useContext(n.GameCtx),g=d.useMemo((()=>h&&o.getStackDrawingContext(h.context,e,{overDrawn:t,showing:a})),[h,e,t,a]),p=r.useCallback(((t,a)=>{if(null==h||null==g)return;const r=e.direction===c.StackDirection.horizontal?"x":"y",n=e.cards.slice(-g.max),o=Math.min(n.length-1,Math.floor((a[r]-g.box[r])/g.space));e.type===c.StackType.waste&&o!==n.length-1||u(s.doubleClickCard({stack:e,stackCard:n[o]}))}),[u,h,g,e]),y=r.useCallback(((t,a)=>{if(null==h||null==g)return;const r=e.direction===c.StackDirection.horizontal?"x":"y",n=e.cards.slice(-g.max),o=Math.min(n.length-1,Math.floor((a[r]-g.box[r])/g.space));e.type===c.StackType.waste&&o!==n.length-1||u(s.clickCard({stack:e,stackCard:n[o]}))}),[u,h,g,e]);return l.useDrawing((e=>o.drawStack(e,g)),{onClick:y,onDoubleClick:p}),null};t.StackElement=u,t.default=r.memo(u)},51:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getErrorImageData=t.getCardImageData=t.getHiddenImageData=t.getEmptyImageData=t.getGlyphLocations=t.getBoxPath=void 0;const r=a(688),n=a(737),o=a(115),c=a(445);var i;t.getBoxPath=({x:e,y:t,width:a,height:r},n=10,o=0)=>{const c=new Path2D,i=e+o,s=t+o,l=a-2*o,d=r-2*o;return c.moveTo(i+n,s),c.lineTo(i+l-n,s),c.quadraticCurveTo(i+l,s,i+l,s+n),c.lineTo(i+l,s+d-n),c.quadraticCurveTo(i+l,s+d,i+l-n,s+d),c.lineTo(i+n,s+d),c.quadraticCurveTo(i,s+d,i,s+d-n),c.lineTo(i,s+n),c.quadraticCurveTo(i,s,i+n,s),c.closePath(),c},function(e){e[e.Regular=0]="Regular",e[e.Corner=1]="Corner"}(i||(i={}));t.getGlyphLocations=(e,{card:t,hidden:a})=>{if(a)return[];const{ctx:s}=e,{width:l,height:d}=c.getCardDimensions(e),u=c.getVerticalMarginSize(e),h=c.getHorizontalMarginSize(e),g=Math.floor(.2*l),p=e=>o.search(s,((a,r)=>e===i.Corner?a>g:n.isBig(t)?a>l-2*Math.floor(l/5):a>Math.floor(l/5)&&r>Math.floor(d/20)),e===i.Corner?"10":"♥"),y={[i.Corner]:p(i.Corner),[i.Regular]:p(i.Regular)},m=h/2,f=u/2,S=h/2,k=h/2+o.measureHeight(s,y[i.Corner]),{suit:v,value:C}=t,T=[{x:m,y:f,glyph:C},{x:S,y:k,glyph:v}].reduce(((e,t)=>(e.push(Object.assign(Object.assign({},t),{rotated:!1,textAlign:"left",textBaseline:"top",font:y[i.Corner]}),Object.assign(Object.assign({},t),{rotated:!0,textAlign:"left",textBaseline:"top",font:y[i.Corner]})),e)),[]),b=[];[r.ValueType.ace,r.ValueType.three,r.ValueType.five,r.ValueType.nine,r.ValueType.jack,r.ValueType.queen,r.ValueType.king].includes(C)&&b.push({x:1,y:3}),[r.ValueType.two,r.ValueType.three].includes(C)&&b.push({x:1,y:0},{x:1,y:6}),[r.ValueType.four,r.ValueType.five,r.ValueType.six,r.ValueType.seven,r.ValueType.eight,r.ValueType.nine,r.ValueType.ten].includes(C)&&b.push({x:0,y:0},{x:2,y:0},{x:0,y:6},{x:2,y:6}),[r.ValueType.six,r.ValueType.seven,r.ValueType.eight].includes(C)&&b.push({x:0,y:3},{x:2,y:3}),[r.ValueType.seven,r.ValueType.ten,r.ValueType.eight].includes(C)&&b.push({x:1,y:1}),[r.ValueType.nine,r.ValueType.ten].includes(C)&&b.push({x:0,y:2},{x:2,y:2},{x:0,y:4},{x:2,y:4}),[r.ValueType.ten,r.ValueType.eight].includes(C)&&b.push({x:1,y:5});const w=e=>{switch(e){case 0:case 6:return.2*d;case 1:case 5:return.3*d;case 2:case 4:return.4*d;case 3:return.5*d}},x=e=>{switch(e){case 0:return.25*l;case 1:return.5*l;case 2:return.75*l}},O=e=>{switch(e){case 0:return"left";case 1:return"center";case 2:return"right"}};return b.forEach((({x:e,y:t})=>{T.push({x:x(e),y:w(t),glyph:v,textAlign:O(e),textBaseline:"middle",rotated:t>3,font:y[i.Regular]})})),T};t.getEmptyImageData=e=>{const{ctx:t,colorScheme:a}=e,{width:r,height:n}=c.getCardDimensions(e),o={x:0,y:0,width:r,height:n};return t.clearRect(0,0,r,n),t.fillStyle=a.emptyColor,t.fillRect(o.x,o.y,o.width,o.height),t.lineWidth=.5,t.strokeStyle=a.cardBorder,t.strokeRect(o.x,o.y,o.width,o.height),t.getImageData(o.x,o.y,o.width,o.height)};t.getHiddenImageData=e=>{const{ctx:a,colorScheme:r}=e,{width:n,height:o}=c.getCardDimensions(e),i={x:0,y:0,width:n,height:o},s=document.createElement("canvas");s.width=s.height=25;const l=s.getContext("2d"),d=l.createLinearGradient(0,0,s.width,s.height);return d.addColorStop(0,r.hiddenColor1),d.addColorStop(.25,r.hiddenColor1),d.addColorStop(.25,r.hiddenColor2),d.addColorStop(.5,r.hiddenColor2),d.addColorStop(.5,r.hiddenColor1),d.addColorStop(.75,r.hiddenColor1),d.addColorStop(.75,r.hiddenColor2),d.addColorStop(1,r.hiddenColor2),l.fillStyle=d,l.fillRect(0,0,25,25),a.clearRect(i.x,i.y,i.width,i.height),a.strokeStyle=r.cardBorder,a.lineWidth=3,a.stroke(t.getBoxPath(i)),a.save(),a.clip(t.getBoxPath(i,10)),a.fillStyle=a.createPattern(s,"repeat"),a.fillRect(i.x+1,i.y+1,i.width-2,i.height-2),a.restore(),a.getImageData(i.x,i.y,i.width,i.height)};t.getCardImageData=(e,a)=>{const{ctx:r,colorScheme:o}=e,{width:i,height:s}=c.getCardDimensions(e),l={x:0,y:0,width:i,height:s};r.clearRect(l.x,l.y,l.width,l.height),r.strokeStyle=o.cardBorder,r.lineWidth=2,r.stroke(t.getBoxPath(l,10)),r.fillStyle=a.selected?o.selected:o.faceUp,r.fill(t.getBoxPath(l,10,.5));for(const c of t.getGlyphLocations(e,a))r.fillStyle=n.isRed(a.card)?o.red:o.black,r.textAlign=c.textAlign,r.textBaseline=c.textBaseline,r.font=c.font,c.rotated&&(r.save(),r.translate(i,s),r.rotate(Math.PI)),r.fillText(c.glyph,c.x+l.x*(c.rotated?-1:1),c.y+l.y*(c.rotated?-1:1)),c.rotated&&r.restore();return r.getImageData(l.x,l.y,l.width,l.height)};t.getErrorImageData=e=>{const{ctx:a,colorScheme:r}=e,{width:n,height:o}=c.getCardDimensions(e),i={x:0,y:0,width:n,height:o};return a.clearRect(i.x,i.y,i.width,i.height),a.fillStyle=r.emptyColor,a.fill(t.getBoxPath(i)),a.font="48px sans-serif",a.textAlign="center",a.textBaseline="middle",a.fillStyle=r.errorColor,a.fillText("X",i.width/2,i.height/2),a.getImageData(i.x,i.y,i.width,i.height)}},638:(e,t)=>{"use strict";var a;Object.defineProperty(t,"__esModule",{value:!0}),t.colorSchemes=t.ColorSchemeType=void 0,function(e){e.dark="dark",e.light="light"}(a=t.ColorSchemeType||(t.ColorSchemeType={})),t.colorSchemes={[a.dark]:{background:"#000",color:"#fff",emptyColor:"#060606",faceUp:"#ddd",hiddenColor1:"#404dac",hiddenColor2:"#263278",buttonBorder:"#ddd",cardBorder:"#000",black:"#505050",red:"#f03a17",selected:"#fff000",errorColor:"#900"},[a.light]:{background:"#ffffff",color:"#000",emptyColor:"#f5f5f5",faceUp:"#ddd",hiddenColor1:"#606dbc",hiddenColor2:"#465298",buttonBorder:"#000",cardBorder:"#000",black:"#505050",red:"#f03a17",selected:"#fff000",errorColor:"red"}}},952:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.writeDataToCanvas=t.initialize=t.cardCache=t.getKey=void 0;const r=a(688),n=a(51),o=a(445);let c;t.getKey=({card:{suit:e,value:t},selected:a})=>`${e}_${t}_${(a||!1).toString()}`,t.cardCache=new Map;t.initialize=e=>{const{width:a,height:i}=o.getCardDimensions(e);t.cardCache.set("hidden",n.getHiddenImageData(e)),t.cardCache.set("empty",n.getEmptyImageData(e)),t.cardCache.set("error",n.getErrorImageData(e)),r.Cards.forEach((a=>{t.cardCache.set(t.getKey({card:a,selected:!0}),n.getCardImageData(e,{card:a,selected:!0})).set(t.getKey({card:a,selected:!1}),n.getCardImageData(e,{card:a,selected:!1}))})),c=document.createElement("canvas"),c.width=a,c.height=i,e.ctx.clearRect(0,0,a+2,i+2)};t.writeDataToCanvas=(e,t,a,r)=>{const n=c.getContext("2d");null==n||n.putImageData(t,0,0),e.ctx.drawImage(c,a,r)}},115:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.search=t.measureHeight=t.measureWidth=void 0;const a=Array.from({length:200},((e,t)=>t));t.measureWidth=(e,t,a)=>(e.font=t,e.measureText(a).width);t.measureHeight=(e,t)=>(e.font=t,e.measureText("M").width);const r=(e,n,o,c,i)=>{const s=Math.floor((i+c)/2),l=`${a[s]}px sans-serif`,d=t.measureWidth(e,l,o),u=t.measureHeight(e,l);return c>i?l:n(d,u)?r(e,n,o,c,s-1):r(e,n,o,s+1,i)};t.search=(e,t,n)=>r(e,t,n,0,a.length-1)},445:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getStackBox=t.getCardDimensions=t.getTopbarBox=t.getHorizontalMarginSize=t.getVerticalMarginSize=t.getStackCardOffsetHeight=t.getStackCardOffsetWidth=void 0;const r=a(688);t.getStackCardOffsetWidth=e=>Math.floor(.03*e.height);t.getStackCardOffsetHeight=e=>Math.floor(.03*e.height);t.getVerticalMarginSize=e=>Math.floor(.01*e.height);t.getHorizontalMarginSize=e=>Math.floor(.01*e.width);t.getTopbarBox=()=>({x:0,y:0,width:0,height:30});t.getCardDimensions=e=>{const a=t.getHorizontalMarginSize(e),r=t.getVerticalMarginSize(e),n=t.getTopbarBox(),o=t.getStackCardOffsetHeight(e),c=n.height+2*r+19*o,i=6*a,s=Math.floor((e.width-i)/7),l=Math.floor((e.height-c)/1.5),d=1.618,u=s*d<l?s:l/d,h=s*d<l?s*d:l;return{width:Math.floor(u),height:Math.floor(h)}};t.getStackBox=(e,a,n)=>{const o=t.getVerticalMarginSize(e),c=t.getHorizontalMarginSize(e),i=t.getTopbarBox(),{width:s,height:l}=t.getCardDimensions(e),d=Math.min(a.cards.length,n),u=6*c+7*s,h=u<e.width?(e.width-u)/2:0,g=a.direction===r.StackDirection.horizontal?0===d?l:t.getStackCardOffsetWidth(e)*(d-1)+s:s,p=a.direction===r.StackDirection.vertical?0===d?l:t.getStackCardOffsetHeight(e)*(d-1)+l:l;switch(a.type){case r.StackType.stock:return{y:i.height+o,x:h,width:g,height:p};case r.StackType.waste:return{y:i.height+o,x:h+c+s,width:g,height:p};case r.StackType.foundation:return{y:i.height+o,x:h+3*c+3*s+a.index*(c+s),width:g,height:p};case r.StackType.tableau:return{y:i.height+3*o+l,x:h+a.index*(c+s),width:g,height:p}}}},669:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.drawStack=t.getStackDrawingContext=void 0;const r=a(688),n=a(952),o=a(445);t.getStackDrawingContext=(e,t,a)=>{const n=t.type===r.StackType.stock||t.type===r.StackType.foundation?1:t.type===r.StackType.waste?a.showing||0:t.cards.length,c=o.getStackBox(e,t,n),i=t.direction===r.StackDirection.horizontal?o.getStackCardOffsetWidth(e):o.getStackCardOffsetHeight(e);return{stack:t,overDrawn:a.overDrawn,showing:a.showing,space:i,box:c,max:n}};t.drawStack=(e,t)=>{if(null==t)return null;const{stack:a,overDrawn:o,max:c,space:i,box:s}=t,l=a.cards.slice(-c),d=new Path2D;d.rect(s.x,s.y,s.width,s.height),d.closePath();const u=0===l.length,h=a.type===r.StackType.stock&&u&&o,g=[];h?g.push({data:n.cardCache.get("error"),x:s.x,y:s.y}):u?g.push({data:n.cardCache.get("empty"),x:s.x,y:s.y}):l.forEach(((e,t)=>{const o=e.hidden?n.cardCache.get("hidden"):n.cardCache.get(n.getKey(e));if(o){const e=a.direction===r.StackDirection.horizontal?t*i:0,n=a.direction===r.StackDirection.horizontal?0:t*i;g.push({data:o,x:s.x+e,y:s.y+n})}}));for(const{data:t,x:a,y:r}of g)t&&n.writeDataToCanvas(e,t,a,r);return{path:d,box:s}}},411:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useCanvasSize=void 0;const r=a(294);t.useCanvasSize=()=>{const[e,t]=r.useState(null),a=r.useCallback((e=>e&&t(e)),[]),n=()=>({width:window.innerWidth,height:window.innerHeight}),[o,c]=r.useState();r.useEffect((()=>{let e;const t=()=>{e&&clearTimeout(e),e=window.setTimeout((()=>c(n())),300)};return window.addEventListener("resize",t),()=>{window.removeEventListener("resize",t)}}));return r.useMemo((()=>Object.assign({handleCanvasRef:a},e&&Object.assign({ctx:e.getContext("2d")},null!=o?o:n()))),[o,a,e])}},126:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useDrawing=void 0;const r=a(294),n=a(634);t.useDrawing=(e,t={})=>{var a,o;const c=r.useContext(n.GameCtx),i=r.useRef(!0),s=r.useRef(null!==(a=null==c?void 0:c.context.width)&&void 0!==a?a:0),l=r.useRef(null!==(o=null==c?void 0:c.context.height)&&void 0!==o?o:0);r.useLayoutEffect((()=>{c&&(i.current=!((l.current!==c.context.height||s.current!==c.context.width)&&l.current>0&&s.current>0),l.current=c.context.height,s.current=c.context.width)}),[c]),r.useEffect((()=>{if(null==c)return;const{add:a,remove:r,context:n}=c,{ctx:o}=n,s=e(n);return null!=s?(a(s,t),()=>{r(s.path),i.current&&o.clearRect(s.box.x,s.box.y,s.box.width,s.box.height),i.current=!0}):void 0}))}},70:(e,t,a)=>{"use strict";const r=a(294),n=a(935),o=a(731),c=a(730);o.install({onUpdateReady(){o.applyUpdate()},onUpdated(){window.location.reload()}}),n.render(r.createElement(c.default,null),document.getElementById("root"))},688:(e,t)=>{"use strict";var a,r;Object.defineProperty(t,"__esModule",{value:!0}),t.Cards=t.StackType=t.StackDirection=t.SuitType=t.ValueType=void 0,function(e){e.ace="A",e.two="2",e.three="3",e.four="4",e.five="5",e.six="6",e.seven="7",e.eight="8",e.nine="9",e.ten="10",e.jack="J",e.queen="Q",e.king="K"}(a=t.ValueType||(t.ValueType={})),function(e){e.heart="♥",e.diamond="♦",e.spade="♠",e.club="♣"}(r=t.SuitType||(t.SuitType={})),function(e){e.horizontal="horizontal",e.vertical="vertical"}(t.StackDirection||(t.StackDirection={})),function(e){e.tableau="tableau",e.foundation="foundation",e.stock="stock",e.waste="waste"}(t.StackType||(t.StackType={}));const n=[];t.Cards=n;for(const e of Object.values(a))for(const t of Object.values(r))n.push({suit:t,value:e});Object.freeze(n)},938:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.retrieve=t.persist=t.PersistanceType=void 0,function(e){e.type="game-mode",e.theme="theme",e.score="score",e.number="game-number"}(t.PersistanceType||(t.PersistanceType={}));t.persist=(e,t)=>{try{localStorage.setItem(e,JSON.stringify(t))}catch(e){}};t.retrieve=(e,t)=>{try{const t=localStorage.getItem(e)||"";return JSON.parse(t)}catch(e){return t}}},5:(e,t)=>{"use strict";var a,r;Object.defineProperty(t,"__esModule",{value:!0}),t.getScoreChange=t.ScoreType=t.ScoringType=void 0,function(e){e.vegas="vegas",e.regular="regular"}(a=t.ScoringType||(t.ScoringType={})),function(e){e.wasteToTableau="wasteToTableau",e.wasteToFoundation="wasteToFoundation",e.tableauToFoundation="tableauToFoundation",e.revealCard="revealCard",e.foundationToTableau="foundationToTableau"}(r=t.ScoreType||(t.ScoreType={}));t.getScoreChange=(e,t)=>{let n=0;return e===a.regular&&t===r.tableauToFoundation?n=10:t===r.wasteToFoundation||e===a.vegas&&t===r.tableauToFoundation||e===a.regular&&t===r.revealCard||e===a.regular&&t===r.wasteToTableau?n=5:e===a.regular&&r.foundationToTableau?n=-10:e===a.vegas&&t===r.foundationToTableau&&(n=-5),n}},737:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isValidTableauMove=t.isValidFoundationMove=t.isBig=t.isRed=t.contains=t.sameCard=t.sameStack=t.newGameNumber=t.getTopCard=t.sumConsecutive=t.rnd=void 0;const r=a(688);t.rnd=e=>{const t=()=>(Math.pow(2,31)-1&(e=Math.imul(48271,e)))/Math.pow(2,31);return t(),(e,a)=>Math.floor(t()*a)+e};t.sumConsecutive=e=>e*(e+1)/2;t.getTopCard=e=>e.cards[e.cards.length-1]||null;t.newGameNumber=()=>{return e=1,t=9999,Math.floor(Math.random()*t)+e;var e,t};t.sameStack=(e,t)=>e.type===t.type&&e.index===t.index;const n=(e,t)=>e.suit===t.suit;t.sameCard=(e,t)=>((e,t)=>e.value===t.value)(e,t)&&n(e,t);t.contains=(e,a)=>e.some((({card:e})=>t.sameCard(e,a)));const o=(e,t)=>c(e.value)===c(t.value)+1;t.isRed=e=>[r.SuitType.diamond,r.SuitType.heart].includes(e.suit);t.isBig=e=>[r.ValueType.ace,r.ValueType.jack,r.ValueType.queen,r.ValueType.king].includes(e.value);t.isValidFoundationMove=(e,t)=>null==t?e.card.value===r.ValueType.ace:n(e.card,t.card)&&o(e.card,t.card);t.isValidTableauMove=(e,a)=>null==a?e.card.value===r.ValueType.king:o(a.card,e.card)&&((e,a)=>+t.isRed(e)^+t.isRed(a))(e.card,a.card);const c=e=>e===r.ValueType.ace?1:e===r.ValueType.jack?11:e===r.ValueType.queen?12:e===r.ValueType.king?13:parseInt(e,10)},229:(e,t,a)=>{"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.changeTheme=t.incrementScore=t.incrementDraws=void 0;const n=a(770),o=a(688),c=a(938),i=a(5),s=a(638),l=a(130),d=a(741),u=a(777),h=n.createSlice({name:"game-state",initialState:{draws:0,number:0,score:0,scoringType:i.ScoringType.regular,showing:0,theme:s.ColorSchemeType.dark},reducers:{incrementDraws(e){e.draws=e.draws+1},incrementScore(e,{payload:t}){e.score=e.score+i.getScoreChange(e.scoringType,t)},changeTheme(e,{payload:t}){e.theme=t}},extraReducers:e=>e.addCase(l.initialize,((e,{payload:t})=>{e.draws=0,e.number=t.number,e.score=t.scoringType===i.ScoringType.vegas?c.retrieve(c.PersistanceType.score,0)-52:0,e.scoringType=t.scoringType,e.showing=3,e.theme=t.theme})).addMatcher((e=>u.shiftCards.match(e)&&(e.payload.to.type===o.StackType.waste||e.payload.from&&e.payload.from.type===o.StackType.waste)),((e,{payload:{to:t,cards:a}})=>{e.showing=t.type===o.StackType.waste?Math.min(t.cards.length+a.length,3):Math.max(1,e.showing-1)}))});r=h.actions,t.incrementDraws=r.incrementDraws,t.incrementScore=r.incrementScore,t.changeTheme=r.changeTheme,t.default=d.undoable(h.reducer)},626:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=a(770),n=(a(500),a(595)),o=a(845),c=a(777),i=a(229),s=a(938),l=a(5),d=r.getDefaultMiddleware({immutableCheck:!1,serializableCheck:!1});const u=r.combineReducers({stacks:c.default,gameState:i.default}),h=r.configureStore({reducer:u,middleware:d});n.default(h,o.getGameState,(({scoringType:e,score:t})=>{e===l.ScoringType.vegas&&s.persist(s.PersistanceType.score,t)})),n.default(h,o.getType,(e=>s.persist(s.PersistanceType.type,e))),n.default(h,o.getTheme,(e=>s.persist(s.PersistanceType.theme,e))),n.default(h,o.getNumber,(e=>s.persist(s.PersistanceType.number,e))),t.default=h},130:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.initialize=void 0;const r=a(770);t.initialize=r.createAction("initialize")},845:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.disallowClickStock=t.getSelection=t.getNumber=t.getShowing=t.getOverDrawn=t.getDraws=t.getType=t.getScore=t.getTheme=t.getGameState=t.getFoundationStack=t.getWaste=t.getStock=t.getMovableToFoundation=t.getHiddenCard=t.getGameWon=t.getTableau=t.getStacks=void 0;const r=a(222),n=a(688),o=a(737),c=a(5);t.getStacks=r.createSelector((e=>e.stacks.present.stacks),(e=>e));const i=r.createSelector(t.getStacks,(e=>e.filter((e=>e.type===n.StackType.foundation))));t.getTableau=r.createSelector(t.getStacks,(e=>e.filter((e=>e.type===n.StackType.tableau)))),t.getGameWon=r.createSelector(i,(e=>e.every((e=>13===e.cards.length)))),t.getHiddenCard=r.createSelector(t.getTableau,(e=>e.reduce(((e,t)=>{if(e)return e;const a=o.getTopCard(t);return a&&a.hidden?{stack:t,stackCard:a}:null}),null))),t.getMovableToFoundation=r.createSelector([t.getStacks,i],((e,t)=>e.filter((e=>e.type!==n.StackType.foundation)).reduce(((e,a)=>{if(e)return e;const r=o.getTopCard(a);return null==r||r.hidden?e:t.some((e=>o.isValidFoundationMove(r,o.getTopCard(e))))?{stack:a,stackCard:r}:null}),null))),t.getStock=r.createSelector(t.getStacks,(e=>e.filter((e=>e.type===n.StackType.stock))[0])),t.getWaste=r.createSelector(t.getStacks,(e=>e.filter((e=>e.type===n.StackType.waste))[0])),t.getFoundationStack=r.createSelector(i,((e,t)=>t),((e,t)=>e.find((e=>o.isValidFoundationMove(t,o.getTopCard(e)))))),t.getGameState=r.createSelector((e=>e.gameState.present),(e=>e)),t.getTheme=r.createSelector(t.getGameState,(e=>e.theme)),t.getScore=r.createSelector(t.getGameState,(e=>e.score)),t.getType=r.createSelector(t.getGameState,(e=>e.scoringType)),t.getDraws=r.createSelector(t.getGameState,(e=>e.draws));t.getOverDrawn=r.createSelector([t.getDraws,t.getType],((e,t)=>t===c.ScoringType.vegas&&e+1>3)),t.getShowing=r.createSelector(t.getGameState,(({showing:e})=>e)),t.getNumber=r.createSelector(t.getGameState,(({number:e})=>e)),t.getSelection=r.createSelector(t.getStacks,(e=>{const t=e.find((e=>null!=e.selection));return t?{stackCard:t.selection,stack:t}:null})),t.disallowClickStock=r.createSelector([t.getStock,t.getOverDrawn],((e,t)=>0===e.cards.length&&t))},777:(e,t,a)=>{"use strict";var r;Object.defineProperty(t,"__esModule",{value:!0}),t.recycleWaste=t.drawStockCards=t.moveCards=t.shiftCards=t.revealTop=t.deselectCard=t.selectCard=void 0;const n=a(770),o=a(688),c=a(737),i=a(741),s=a(130),l=n.createSlice({name:"stacks",initialState:{stacks:[{type:o.StackType.stock,direction:null,cards:[],index:0,selection:null},{type:o.StackType.waste,direction:o.StackDirection.horizontal,cards:[],index:0,selection:null},...Array.from({length:7},((e,t)=>({type:o.StackType.tableau,direction:o.StackDirection.vertical,cards:[],index:t,selection:null}))),...Array.from({length:4},((e,t)=>({type:o.StackType.foundation,direction:null,cards:[],index:t,selection:null})))]},reducers:{shiftCards:(e,{payload:{from:t,to:a,cards:r,hidden:n}})=>{const o=e.stacks.find((e=>c.sameStack(a,e))),i=e.stacks.find((e=>c.sameStack(t,e)));o&&o.cards.push(...r.map((e=>Object.assign(Object.assign({},e),{selected:!1,hidden:n})))),i&&(i.cards=i.cards.filter((e=>!c.contains(r,e.card))))},revealTop:(e,{payload:t})=>{const a=e.stacks.find((e=>c.sameStack(e,t)));if(a){const e=a.cards[a.cards.length-1];e&&(e.hidden=!1)}},selectCard:(e,{payload:{stack:t,stackCard:a}})=>{const r=e.stacks.find((e=>c.sameStack(e,t)));if(r){r.selection=a;const e=r.cards.find((e=>c.sameCard(e.card,a.card)));e&&(e.selected=!0)}},deselectCard:e=>{const t=e.stacks.find((e=>null!=e.selection));if(t){t.selection=null;const e=t.cards.find((e=>e.selected));e&&(e.selected=!1)}}},extraReducers:e=>e.addCase(s.initialize,((e,{payload:t})=>{e.stacks=e.stacks.map((e=>{switch(e.type){case o.StackType.foundation:case o.StackType.waste:return Object.assign(Object.assign({},e),{cards:[]});case o.StackType.stock:return Object.assign(Object.assign({},e),{cards:t.cards.slice(0,24).map((e=>({card:e,hidden:!0})))});case o.StackType.tableau:return Object.assign(Object.assign({},e),{cards:t.cards.slice(24+c.sumConsecutive(e.index),24+c.sumConsecutive(e.index)+e.index+1).map(((e,t,a)=>({card:e,hidden:a.length!==t+1})))})}}))}))});r=l.actions,t.selectCard=r.selectCard,t.deselectCard=r.deselectCard,t.revealTop=r.revealTop,t.shiftCards=r.shiftCards;t.moveCards=(e,a,r)=>t.shiftCards({from:e,to:a,cards:e.cards.slice(e.cards.findIndex((e=>r&&c.sameCard(e.card,r.card)))),hidden:!1});t.drawStockCards=({stock:e,waste:a})=>t.shiftCards({from:e,to:a,cards:e.cards.slice(-3).reverse(),hidden:!1});t.recycleWaste=({stock:e,waste:a})=>t.shiftCards({from:a,to:e,cards:a.cards.slice(0).reverse(),hidden:!0}),t.default=i.undoable(l.reducer)},956:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.doubleClickCard=t.clickCard=t.performMoves=t.initializeGame=t.newNumber=t.newType=void 0;const r=a(737),n=a(688),o=a(5),c=a(130),i=a(777),s=a(845),l=a(741),d=a(229);t.newType=e=>t.initializeGame({newNumber:r.newGameNumber(),newType:e});t.newNumber=e=>t.initializeGame({newNumber:null==e?r.newGameNumber():e});t.initializeGame=({newType:e,newNumber:t,newTheme:a})=>(o,i)=>{const l=null==t?s.getNumber(i()):t,d=null==e?s.getType(i()):e,u=null==a?s.getTheme(i()):a,h=Array.from(n.Cards),g=[],p=r.rnd(l);for(let e=0;e<52;e+=1){const e=p(0,h.length),[t]=h.splice(e,1);g.push(t)}o(c.initialize({scoringType:d,cards:g,number:l,theme:u}))};t.performMoves=()=>(e,t)=>{var a,r;let n;for(;n=s.getMovableToFoundation(t())||s.getHiddenCard(t());)null!==(r=null===(a=n.stackCard)||void 0===a?void 0:a.hidden)&&void 0!==r&&r?e(u(n)):e(h(n))};const u=e=>t=>{null!=e&&(t(l.checkpoint()),t(d.incrementScore(o.ScoreType.revealCard)),t(i.revealTop(e.stack)))},h=e=>(t,a)=>{const r=e.stackCard&&s.getFoundationStack(a(),e.stackCard);r&&e.stackCard&&(t(i.deselectCard()),t(l.checkpoint()),e.stack.type===n.StackType.waste&&t(d.incrementScore(o.ScoreType.wasteToFoundation)),e.stack.type===n.StackType.tableau&&t(d.incrementScore(o.ScoreType.tableauToFoundation)),t(i.moveCards(e.stack,r,e.stackCard)))};t.clickCard=e=>(t,a)=>{const{stackCard:c,stack:u}=e;if(null!=c&&c.selected)return t(i.deselectCard());const g=s.getSelection(a());if(null==g&&c&&!c.hidden)return t(i.selectCard({stack:u,stackCard:c}));if(u.type===n.StackType.foundation&&g)t(h(g));else if(u.type===n.StackType.tableau&&(null==g&&c&&c.hidden&&(t(l.checkpoint()),t(d.incrementScore(o.ScoreType.revealCard)),t(i.revealTop(u))),g&&g.stackCard&&r.isValidTableauMove(g.stackCard,c)&&(t(i.deselectCard()),t(l.checkpoint()),g.stack.type===n.StackType.waste&&t(d.incrementScore(o.ScoreType.wasteToTableau)),g.stack.type===n.StackType.foundation&&t(d.incrementScore(o.ScoreType.foundationToTableau)),t(i.moveCards(g.stack,u,g.stackCard)))),u.type===n.StackType.stock){if(s.disallowClickStock(a()))return;g&&t(i.deselectCard());const e=s.getWaste(a()),r=s.getStock(a());t(l.checkpoint()),r.cards.length>0?t(i.drawStockCards({stock:r,waste:e})):(t(i.recycleWaste({stock:r,waste:e})),t(d.incrementDraws()))}};t.doubleClickCard=e=>t=>{const{stack:a,stackCard:r}=e;a.type!==n.StackType.foundation&&a.type!==n.StackType.stock&&null!=r&&null!=r.card&&t(h({stack:a,stackCard:r}))}},741:(e,t,a)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.undoable=t.checkpoint=t.redo=t.undo=t.destroy=void 0;const r=a(770);t.destroy=r.createAction("destroy"),t.undo=r.createAction("undo"),t.redo=r.createAction("redo"),t.checkpoint=r.createAction("checkpoint");t.undoable=e=>{const a={past:[],present:e(void 0,{}),future:[]};return(r=a,n)=>{const{past:o,present:c,future:i}=r;if(t.undo.match(n)){const e=o[o.length-1];if(!e)return r;return{past:o.slice(0,o.length-1),present:e,future:[c,...i]}}if(t.redo.match(n)){const e=i[0];if(!e)return r;const t=i.slice(1);return{past:[...o,c],present:e,future:t}}const s=e(c,n);return t.destroy.match(n)?{past:[],present:s,future:[]}:t.checkpoint.match(n)?{past:[...o,c],present:s,future:[]}:c===s?r:{past:o,present:s,future:i}}}}},a={};function r(e){var n=a[e];if(void 0!==n)return n.exports;var o=a[e]={exports:{}};return t[e].call(o.exports,o,o.exports,r),o.exports}r.m=t,e=[],r.O=(t,a,n,o)=>{if(!a){var c=1/0;for(l=0;l<e.length;l++){for(var[a,n,o]=e[l],i=!0,s=0;s<a.length;s++)(!1&o||c>=o)&&Object.keys(r.O).every((e=>r.O[e](a[s])))?a.splice(s--,1):(i=!1,o<c&&(c=o));i&&(e.splice(l--,1),t=n())}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[a,n,o]},r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={604:0};r.O.j=t=>0===e[t];var t=(t,a)=>{var n,o,[c,i,s]=a,l=0;for(n in i)r.o(i,n)&&(r.m[n]=i[n]);if(s)var d=s(r);for(t&&t(a);l<c.length;l++)o=c[l],r.o(e,o)&&e[o]&&e[o][0](),e[c[l]]=0;return r.O(d)},a=self.webpackChunkklondike=self.webpackChunkklondike||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var n=r.O(void 0,[163],(()=>r(70)));n=r.O(n)})();
//# sourceMappingURL=klondike.f17419de27731335088b.js.map