(() => {
  // node_modules/@lit/reactive-element/css-tag.js
  var t = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var e = Symbol();
  var s = class {
    constructor(t3, s5) {
      if (s5 !== e)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t3;
    }
    get styleSheet() {
      return t && this.t === void 0 && (this.t = new CSSStyleSheet(), this.t.replaceSync(this.cssText)), this.t;
    }
    toString() {
      return this.cssText;
    }
  };
  var n = new Map();
  var o = (t3) => {
    let o5 = n.get(t3);
    return o5 === void 0 && n.set(t3, o5 = new s(t3, e)), o5;
  };
  var r = (t3) => o(typeof t3 == "string" ? t3 : t3 + "");
  var i = (t3, ...e4) => {
    const n5 = t3.length === 1 ? t3[0] : e4.reduce((e5, n6, o5) => e5 + ((t4) => {
      if (t4 instanceof s)
        return t4.cssText;
      if (typeof t4 == "number")
        return t4;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(n6) + t3[o5 + 1], t3[0]);
    return o(n5);
  };
  var S = (e4, s5) => {
    t ? e4.adoptedStyleSheets = s5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : s5.forEach((t3) => {
      const s6 = document.createElement("style");
      s6.textContent = t3.cssText, e4.appendChild(s6);
    });
  };
  var u = t ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
    let e4 = "";
    for (const s5 of t4.cssRules)
      e4 += s5.cssText;
    return r(e4);
  })(t3) : t3;

  // node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2;
  var h;
  var r2;
  var o2 = { toAttribute(t3, i4) {
    switch (i4) {
      case Boolean:
        t3 = t3 ? "" : null;
        break;
      case Object:
      case Array:
        t3 = t3 == null ? t3 : JSON.stringify(t3);
    }
    return t3;
  }, fromAttribute(t3, i4) {
    let s5 = t3;
    switch (i4) {
      case Boolean:
        s5 = t3 !== null;
        break;
      case Number:
        s5 = t3 === null ? null : Number(t3);
        break;
      case Object:
      case Array:
        try {
          s5 = JSON.parse(t3);
        } catch (t4) {
          s5 = null;
        }
    }
    return s5;
  } };
  var n2 = (t3, i4) => i4 !== t3 && (i4 == i4 || t3 == t3);
  var l = { attribute: true, type: String, converter: o2, reflect: false, hasChanged: n2 };
  var a = class extends HTMLElement {
    constructor() {
      super(), this.\u03A0i = new Map(), this.\u03A0o = void 0, this.\u03A0l = void 0, this.isUpdatePending = false, this.hasUpdated = false, this.\u03A0h = null, this.u();
    }
    static addInitializer(t3) {
      var i4;
      (i4 = this.v) !== null && i4 !== void 0 || (this.v = []), this.v.push(t3);
    }
    static get observedAttributes() {
      this.finalize();
      const t3 = [];
      return this.elementProperties.forEach((i4, s5) => {
        const e4 = this.\u03A0p(s5, i4);
        e4 !== void 0 && (this.\u03A0m.set(e4, s5), t3.push(e4));
      }), t3;
    }
    static createProperty(t3, i4 = l) {
      if (i4.state && (i4.attribute = false), this.finalize(), this.elementProperties.set(t3, i4), !i4.noAccessor && !this.prototype.hasOwnProperty(t3)) {
        const s5 = typeof t3 == "symbol" ? Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s5, i4);
        e4 !== void 0 && Object.defineProperty(this.prototype, t3, e4);
      }
    }
    static getPropertyDescriptor(t3, i4, s5) {
      return { get() {
        return this[i4];
      }, set(e4) {
        const h4 = this[t3];
        this[i4] = e4, this.requestUpdate(t3, h4, s5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t3) {
      return this.elementProperties.get(t3) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t3 = Object.getPrototypeOf(this);
      if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this.\u03A0m = new Map(), this.hasOwnProperty("properties")) {
        const t4 = this.properties, i4 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
        for (const s5 of i4)
          this.createProperty(s5, t4[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i4) {
      const s5 = [];
      if (Array.isArray(i4)) {
        const e4 = new Set(i4.flat(1 / 0).reverse());
        for (const i5 of e4)
          s5.unshift(u(i5));
      } else
        i4 !== void 0 && s5.push(u(i4));
      return s5;
    }
    static \u03A0p(t3, i4) {
      const s5 = i4.attribute;
      return s5 === false ? void 0 : typeof s5 == "string" ? s5 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
    }
    u() {
      var t3;
      this.\u03A0g = new Promise((t4) => this.enableUpdating = t4), this.L = new Map(), this.\u03A0_(), this.requestUpdate(), (t3 = this.constructor.v) === null || t3 === void 0 || t3.forEach((t4) => t4(this));
    }
    addController(t3) {
      var i4, s5;
      ((i4 = this.\u03A0U) !== null && i4 !== void 0 ? i4 : this.\u03A0U = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((s5 = t3.hostConnected) === null || s5 === void 0 || s5.call(t3));
    }
    removeController(t3) {
      var i4;
      (i4 = this.\u03A0U) === null || i4 === void 0 || i4.splice(this.\u03A0U.indexOf(t3) >>> 0, 1);
    }
    \u03A0_() {
      this.constructor.elementProperties.forEach((t3, i4) => {
        this.hasOwnProperty(i4) && (this.\u03A0i.set(i4, this[i4]), delete this[i4]);
      });
    }
    createRenderRoot() {
      var t3;
      const s5 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s5, this.constructor.elementStyles), s5;
    }
    connectedCallback() {
      var t3;
      this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this.\u03A0U) === null || t3 === void 0 || t3.forEach((t4) => {
        var i4;
        return (i4 = t4.hostConnected) === null || i4 === void 0 ? void 0 : i4.call(t4);
      }), this.\u03A0l && (this.\u03A0l(), this.\u03A0o = this.\u03A0l = void 0);
    }
    enableUpdating(t3) {
    }
    disconnectedCallback() {
      var t3;
      (t3 = this.\u03A0U) === null || t3 === void 0 || t3.forEach((t4) => {
        var i4;
        return (i4 = t4.hostDisconnected) === null || i4 === void 0 ? void 0 : i4.call(t4);
      }), this.\u03A0o = new Promise((t4) => this.\u03A0l = t4);
    }
    attributeChangedCallback(t3, i4, s5) {
      this.K(t3, s5);
    }
    \u03A0j(t3, i4, s5 = l) {
      var e4, h4;
      const r4 = this.constructor.\u03A0p(t3, s5);
      if (r4 !== void 0 && s5.reflect === true) {
        const n5 = ((h4 = (e4 = s5.converter) === null || e4 === void 0 ? void 0 : e4.toAttribute) !== null && h4 !== void 0 ? h4 : o2.toAttribute)(i4, s5.type);
        this.\u03A0h = t3, n5 == null ? this.removeAttribute(r4) : this.setAttribute(r4, n5), this.\u03A0h = null;
      }
    }
    K(t3, i4) {
      var s5, e4, h4;
      const r4 = this.constructor, n5 = r4.\u03A0m.get(t3);
      if (n5 !== void 0 && this.\u03A0h !== n5) {
        const t4 = r4.getPropertyOptions(n5), l4 = t4.converter, a4 = (h4 = (e4 = (s5 = l4) === null || s5 === void 0 ? void 0 : s5.fromAttribute) !== null && e4 !== void 0 ? e4 : typeof l4 == "function" ? l4 : null) !== null && h4 !== void 0 ? h4 : o2.fromAttribute;
        this.\u03A0h = n5, this[n5] = a4(i4, t4.type), this.\u03A0h = null;
      }
    }
    requestUpdate(t3, i4, s5) {
      let e4 = true;
      t3 !== void 0 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || n2)(this[t3], i4) ? (this.L.has(t3) || this.L.set(t3, i4), s5.reflect === true && this.\u03A0h !== t3 && (this.\u03A0k === void 0 && (this.\u03A0k = new Map()), this.\u03A0k.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this.\u03A0g = this.\u03A0q());
    }
    async \u03A0q() {
      this.isUpdatePending = true;
      try {
        for (await this.\u03A0g; this.\u03A0o; )
          await this.\u03A0o;
      } catch (t4) {
        Promise.reject(t4);
      }
      const t3 = this.performUpdate();
      return t3 != null && await t3, !this.isUpdatePending;
    }
    performUpdate() {
      var t3;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this.\u03A0i && (this.\u03A0i.forEach((t4, i5) => this[i5] = t4), this.\u03A0i = void 0);
      let i4 = false;
      const s5 = this.L;
      try {
        i4 = this.shouldUpdate(s5), i4 ? (this.willUpdate(s5), (t3 = this.\u03A0U) === null || t3 === void 0 || t3.forEach((t4) => {
          var i5;
          return (i5 = t4.hostUpdate) === null || i5 === void 0 ? void 0 : i5.call(t4);
        }), this.update(s5)) : this.\u03A0$();
      } catch (t4) {
        throw i4 = false, this.\u03A0$(), t4;
      }
      i4 && this.E(s5);
    }
    willUpdate(t3) {
    }
    E(t3) {
      var i4;
      (i4 = this.\u03A0U) === null || i4 === void 0 || i4.forEach((t4) => {
        var i5;
        return (i5 = t4.hostUpdated) === null || i5 === void 0 ? void 0 : i5.call(t4);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
    }
    \u03A0$() {
      this.L = new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this.\u03A0g;
    }
    shouldUpdate(t3) {
      return true;
    }
    update(t3) {
      this.\u03A0k !== void 0 && (this.\u03A0k.forEach((t4, i4) => this.\u03A0j(i4, this[i4], t4)), this.\u03A0k = void 0), this.\u03A0$();
    }
    updated(t3) {
    }
    firstUpdated(t3) {
    }
  };
  a.finalized = true, a.elementProperties = new Map(), a.elementStyles = [], a.shadowRootOptions = { mode: "open" }, (e2 = (s2 = globalThis).reactiveElementPlatformSupport) === null || e2 === void 0 || e2.call(s2, { ReactiveElement: a }), ((h = (r2 = globalThis).reactiveElementVersions) !== null && h !== void 0 ? h : r2.reactiveElementVersions = []).push("1.0.0-rc.2");

  // node_modules/lit-html/lit-html.js
  var t2;
  var i2;
  var s3;
  var e3;
  var o3 = globalThis.trustedTypes;
  var l2 = o3 ? o3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
  var n3 = `lit$${(Math.random() + "").slice(9)}$`;
  var h2 = "?" + n3;
  var r3 = `<${h2}>`;
  var u2 = document;
  var c = (t3 = "") => u2.createComment(t3);
  var d = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function";
  var v = Array.isArray;
  var a2 = (t3) => {
    var i4;
    return v(t3) || typeof ((i4 = t3) === null || i4 === void 0 ? void 0 : i4[Symbol.iterator]) == "function";
  };
  var f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var _ = /-->/g;
  var m = />/g;
  var p = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g;
  var $ = /'/g;
  var g = /"/g;
  var y = /^(?:script|style|textarea)$/i;
  var b = (t3) => (i4, ...s5) => ({ _$litType$: t3, strings: i4, values: s5 });
  var T = b(1);
  var x = b(2);
  var w = Symbol.for("lit-noChange");
  var A = Symbol.for("lit-nothing");
  var P = new WeakMap();
  var V = (t3, i4, s5) => {
    var e4, o5;
    const l4 = (e4 = s5 == null ? void 0 : s5.renderBefore) !== null && e4 !== void 0 ? e4 : i4;
    let n5 = l4._$litPart$;
    if (n5 === void 0) {
      const t4 = (o5 = s5 == null ? void 0 : s5.renderBefore) !== null && o5 !== void 0 ? o5 : null;
      l4._$litPart$ = n5 = new C(i4.insertBefore(c(), t4), t4, void 0, s5);
    }
    return n5.I(t3), n5;
  };
  var E = u2.createTreeWalker(u2, 129, null, false);
  var M = (t3, i4) => {
    const s5 = t3.length - 1, e4 = [];
    let o5, h4 = i4 === 2 ? "<svg>" : "", u3 = f;
    for (let i5 = 0; i5 < s5; i5++) {
      const s6 = t3[i5];
      let l4, c3, d2 = -1, v2 = 0;
      for (; v2 < s6.length && (u3.lastIndex = v2, c3 = u3.exec(s6), c3 !== null); )
        v2 = u3.lastIndex, u3 === f ? c3[1] === "!--" ? u3 = _ : c3[1] !== void 0 ? u3 = m : c3[2] !== void 0 ? (y.test(c3[2]) && (o5 = RegExp("</" + c3[2], "g")), u3 = p) : c3[3] !== void 0 && (u3 = p) : u3 === p ? c3[0] === ">" ? (u3 = o5 != null ? o5 : f, d2 = -1) : c3[1] === void 0 ? d2 = -2 : (d2 = u3.lastIndex - c3[2].length, l4 = c3[1], u3 = c3[3] === void 0 ? p : c3[3] === '"' ? g : $) : u3 === g || u3 === $ ? u3 = p : u3 === _ || u3 === m ? u3 = f : (u3 = p, o5 = void 0);
      const a4 = u3 === p && t3[i5 + 1].startsWith("/>") ? " " : "";
      h4 += u3 === f ? s6 + r3 : d2 >= 0 ? (e4.push(l4), s6.slice(0, d2) + "$lit$" + s6.slice(d2) + n3 + a4) : s6 + n3 + (d2 === -2 ? (e4.push(void 0), i5) : a4);
    }
    const c2 = h4 + (t3[s5] || "<?>") + (i4 === 2 ? "</svg>" : "");
    return [l2 !== void 0 ? l2.createHTML(c2) : c2, e4];
  };
  var N = class {
    constructor({ strings: t3, _$litType$: i4 }, s5) {
      let e4;
      this.parts = [];
      let l4 = 0, r4 = 0;
      const u3 = t3.length - 1, d2 = this.parts, [v2, a4] = M(t3, i4);
      if (this.el = N.createElement(v2, s5), E.currentNode = this.el.content, i4 === 2) {
        const t4 = this.el.content, i5 = t4.firstChild;
        i5.remove(), t4.append(...i5.childNodes);
      }
      for (; (e4 = E.nextNode()) !== null && d2.length < u3; ) {
        if (e4.nodeType === 1) {
          if (e4.hasAttributes()) {
            const t4 = [];
            for (const i5 of e4.getAttributeNames())
              if (i5.endsWith("$lit$") || i5.startsWith(n3)) {
                const s6 = a4[r4++];
                if (t4.push(i5), s6 !== void 0) {
                  const t5 = e4.getAttribute(s6.toLowerCase() + "$lit$").split(n3), i6 = /([.?@])?(.*)/.exec(s6);
                  d2.push({ type: 1, index: l4, name: i6[2], strings: t5, ctor: i6[1] === "." ? I : i6[1] === "?" ? L : i6[1] === "@" ? R : H });
                } else
                  d2.push({ type: 6, index: l4 });
              }
            for (const i5 of t4)
              e4.removeAttribute(i5);
          }
          if (y.test(e4.tagName)) {
            const t4 = e4.textContent.split(n3), i5 = t4.length - 1;
            if (i5 > 0) {
              e4.textContent = o3 ? o3.emptyScript : "";
              for (let s6 = 0; s6 < i5; s6++)
                e4.append(t4[s6], c()), E.nextNode(), d2.push({ type: 2, index: ++l4 });
              e4.append(t4[i5], c());
            }
          }
        } else if (e4.nodeType === 8)
          if (e4.data === h2)
            d2.push({ type: 2, index: l4 });
          else {
            let t4 = -1;
            for (; (t4 = e4.data.indexOf(n3, t4 + 1)) !== -1; )
              d2.push({ type: 7, index: l4 }), t4 += n3.length - 1;
          }
        l4++;
      }
    }
    static createElement(t3, i4) {
      const s5 = u2.createElement("template");
      return s5.innerHTML = t3, s5;
    }
  };
  function S2(t3, i4, s5 = t3, e4) {
    var o5, l4, n5, h4;
    if (i4 === w)
      return i4;
    let r4 = e4 !== void 0 ? (o5 = s5.\u03A3i) === null || o5 === void 0 ? void 0 : o5[e4] : s5.\u03A3o;
    const u3 = d(i4) ? void 0 : i4._$litDirective$;
    return (r4 == null ? void 0 : r4.constructor) !== u3 && ((l4 = r4 == null ? void 0 : r4.O) === null || l4 === void 0 || l4.call(r4, false), u3 === void 0 ? r4 = void 0 : (r4 = new u3(t3), r4.T(t3, s5, e4)), e4 !== void 0 ? ((n5 = (h4 = s5).\u03A3i) !== null && n5 !== void 0 ? n5 : h4.\u03A3i = [])[e4] = r4 : s5.\u03A3o = r4), r4 !== void 0 && (i4 = S2(t3, r4.S(t3, i4.values), r4, e4)), i4;
  }
  var k = class {
    constructor(t3, i4) {
      this.l = [], this.N = void 0, this.D = t3, this.M = i4;
    }
    u(t3) {
      var i4;
      const { el: { content: s5 }, parts: e4 } = this.D, o5 = ((i4 = t3 == null ? void 0 : t3.creationScope) !== null && i4 !== void 0 ? i4 : u2).importNode(s5, true);
      E.currentNode = o5;
      let l4 = E.nextNode(), n5 = 0, h4 = 0, r4 = e4[0];
      for (; r4 !== void 0; ) {
        if (n5 === r4.index) {
          let i5;
          r4.type === 2 ? i5 = new C(l4, l4.nextSibling, this, t3) : r4.type === 1 ? i5 = new r4.ctor(l4, r4.name, r4.strings, this, t3) : r4.type === 6 && (i5 = new z(l4, this, t3)), this.l.push(i5), r4 = e4[++h4];
        }
        n5 !== (r4 == null ? void 0 : r4.index) && (l4 = E.nextNode(), n5++);
      }
      return o5;
    }
    v(t3) {
      let i4 = 0;
      for (const s5 of this.l)
        s5 !== void 0 && (s5.strings !== void 0 ? (s5.I(t3, s5, i4), i4 += s5.strings.length - 2) : s5.I(t3[i4])), i4++;
    }
  };
  var C = class {
    constructor(t3, i4, s5, e4) {
      this.type = 2, this.N = void 0, this.A = t3, this.B = i4, this.M = s5, this.options = e4;
    }
    setConnected(t3) {
      var i4;
      (i4 = this.P) === null || i4 === void 0 || i4.call(this, t3);
    }
    get parentNode() {
      return this.A.parentNode;
    }
    get startNode() {
      return this.A;
    }
    get endNode() {
      return this.B;
    }
    I(t3, i4 = this) {
      t3 = S2(this, t3, i4), d(t3) ? t3 === A || t3 == null || t3 === "" ? (this.H !== A && this.R(), this.H = A) : t3 !== this.H && t3 !== w && this.m(t3) : t3._$litType$ !== void 0 ? this._(t3) : t3.nodeType !== void 0 ? this.$(t3) : a2(t3) ? this.g(t3) : this.m(t3);
    }
    k(t3, i4 = this.B) {
      return this.A.parentNode.insertBefore(t3, i4);
    }
    $(t3) {
      this.H !== t3 && (this.R(), this.H = this.k(t3));
    }
    m(t3) {
      const i4 = this.A.nextSibling;
      i4 !== null && i4.nodeType === 3 && (this.B === null ? i4.nextSibling === null : i4 === this.B.previousSibling) ? i4.data = t3 : this.$(u2.createTextNode(t3)), this.H = t3;
    }
    _(t3) {
      var i4;
      const { values: s5, _$litType$: e4 } = t3, o5 = typeof e4 == "number" ? this.C(t3) : (e4.el === void 0 && (e4.el = N.createElement(e4.h, this.options)), e4);
      if (((i4 = this.H) === null || i4 === void 0 ? void 0 : i4.D) === o5)
        this.H.v(s5);
      else {
        const t4 = new k(o5, this), i5 = t4.u(this.options);
        t4.v(s5), this.$(i5), this.H = t4;
      }
    }
    C(t3) {
      let i4 = P.get(t3.strings);
      return i4 === void 0 && P.set(t3.strings, i4 = new N(t3)), i4;
    }
    g(t3) {
      v(this.H) || (this.H = [], this.R());
      const i4 = this.H;
      let s5, e4 = 0;
      for (const o5 of t3)
        e4 === i4.length ? i4.push(s5 = new C(this.k(c()), this.k(c()), this, this.options)) : s5 = i4[e4], s5.I(o5), e4++;
      e4 < i4.length && (this.R(s5 && s5.B.nextSibling, e4), i4.length = e4);
    }
    R(t3 = this.A.nextSibling, i4) {
      var s5;
      for ((s5 = this.P) === null || s5 === void 0 || s5.call(this, false, true, i4); t3 && t3 !== this.B; ) {
        const i5 = t3.nextSibling;
        t3.remove(), t3 = i5;
      }
    }
  };
  var H = class {
    constructor(t3, i4, s5, e4, o5) {
      this.type = 1, this.H = A, this.N = void 0, this.V = void 0, this.element = t3, this.name = i4, this.M = e4, this.options = o5, s5.length > 2 || s5[0] !== "" || s5[1] !== "" ? (this.H = Array(s5.length - 1).fill(A), this.strings = s5) : this.H = A;
    }
    get tagName() {
      return this.element.tagName;
    }
    I(t3, i4 = this, s5, e4) {
      const o5 = this.strings;
      let l4 = false;
      if (o5 === void 0)
        t3 = S2(this, t3, i4, 0), l4 = !d(t3) || t3 !== this.H && t3 !== w, l4 && (this.H = t3);
      else {
        const e5 = t3;
        let n5, h4;
        for (t3 = o5[0], n5 = 0; n5 < o5.length - 1; n5++)
          h4 = S2(this, e5[s5 + n5], i4, n5), h4 === w && (h4 = this.H[n5]), l4 || (l4 = !d(h4) || h4 !== this.H[n5]), h4 === A ? t3 = A : t3 !== A && (t3 += (h4 != null ? h4 : "") + o5[n5 + 1]), this.H[n5] = h4;
      }
      l4 && !e4 && this.W(t3);
    }
    W(t3) {
      t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
    }
  };
  var I = class extends H {
    constructor() {
      super(...arguments), this.type = 3;
    }
    W(t3) {
      this.element[this.name] = t3 === A ? void 0 : t3;
    }
  };
  var L = class extends H {
    constructor() {
      super(...arguments), this.type = 4;
    }
    W(t3) {
      t3 && t3 !== A ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
    }
  };
  var R = class extends H {
    constructor() {
      super(...arguments), this.type = 5;
    }
    I(t3, i4 = this) {
      var s5;
      if ((t3 = (s5 = S2(this, t3, i4, 0)) !== null && s5 !== void 0 ? s5 : A) === w)
        return;
      const e4 = this.H, o5 = t3 === A && e4 !== A || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, l4 = t3 !== A && (e4 === A || o5);
      o5 && this.element.removeEventListener(this.name, this, e4), l4 && this.element.addEventListener(this.name, this, t3), this.H = t3;
    }
    handleEvent(t3) {
      var i4, s5;
      typeof this.H == "function" ? this.H.call((s5 = (i4 = this.options) === null || i4 === void 0 ? void 0 : i4.host) !== null && s5 !== void 0 ? s5 : this.element, t3) : this.H.handleEvent(t3);
    }
  };
  var z = class {
    constructor(t3, i4, s5) {
      this.element = t3, this.type = 6, this.N = void 0, this.V = void 0, this.M = i4, this.options = s5;
    }
    I(t3) {
      S2(this, t3);
    }
  };
  (i2 = (t2 = globalThis).litHtmlPlatformSupport) === null || i2 === void 0 || i2.call(t2, N, C), ((s3 = (e3 = globalThis).litHtmlVersions) !== null && s3 !== void 0 ? s3 : e3.litHtmlVersions = []).push("2.0.0-rc.3");

  // node_modules/lit-element/lit-element.js
  var i3;
  var l3;
  var o4;
  var s4;
  var n4;
  var a3;
  ((i3 = (a3 = globalThis).litElementVersions) !== null && i3 !== void 0 ? i3 : a3.litElementVersions = []).push("3.0.0-rc.2");
  var h3 = class extends a {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this.\u03A6t = void 0;
    }
    createRenderRoot() {
      var t3, e4;
      const r4 = super.createRenderRoot();
      return (t3 = (e4 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e4.renderBefore = r4.firstChild), r4;
    }
    update(t3) {
      const r4 = this.render();
      super.update(t3), this.\u03A6t = V(r4, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t3;
      super.connectedCallback(), (t3 = this.\u03A6t) === null || t3 === void 0 || t3.setConnected(true);
    }
    disconnectedCallback() {
      var t3;
      super.disconnectedCallback(), (t3 = this.\u03A6t) === null || t3 === void 0 || t3.setConnected(false);
    }
    render() {
      return w;
    }
  };
  h3.finalized = true, h3._$litElement$ = true, (o4 = (l3 = globalThis).litElementHydrateSupport) === null || o4 === void 0 || o4.call(l3, { LitElement: h3 }), (n4 = (s4 = globalThis).litElementPlatformSupport) === null || n4 === void 0 || n4.call(s4, { LitElement: h3 });

  // challenge-chart/dist/challenge-chart.js
  (() => {
    var we = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yi = Symbol(), Se = class {
      constructor(t3, e4) {
        if (e4 !== yi)
          throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t3;
      }
      get styleSheet() {
        return we && this.t === void 0 && (this.t = new CSSStyleSheet(), this.t.replaceSync(this.cssText)), this.t;
      }
      toString() {
        return this.cssText;
      }
    }, vi = new Map(), wi = (i4) => {
      let t3 = vi.get(i4);
      return t3 === void 0 && vi.set(i4, t3 = new Se(i4, yi)), t3;
    }, Si = (i4) => wi(typeof i4 == "string" ? i4 : i4 + ""), wn = (i4, ...t3) => {
      let e4 = i4.length === 1 ? i4[0] : t3.reduce((n5, s5, o5) => n5 + ((a4) => {
        if (a4 instanceof Se)
          return a4.cssText;
        if (typeof a4 == "number")
          return a4;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + a4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      })(s5) + i4[o5 + 1], i4[0]);
      return wi(e4);
    }, Sn = (i4, t3) => {
      we ? i4.adoptedStyleSheets = t3.map((e4) => e4 instanceof CSSStyleSheet ? e4 : e4.styleSheet) : t3.forEach((e4) => {
        let n5 = document.createElement("style");
        n5.textContent = e4.cssText, i4.appendChild(n5);
      });
    }, Me = we ? (i4) => i4 : (i4) => i4 instanceof CSSStyleSheet ? ((t3) => {
      let e4 = "";
      for (let n5 of t3.cssRules)
        e4 += n5.cssText;
      return Si(e4);
    })(i4) : i4;
    var Mi, Mn, kn, ki, Pn = { toAttribute(i4, t3) {
      switch (t3) {
        case Boolean:
          i4 = i4 ? "" : null;
          break;
        case Object:
        case Array:
          i4 = i4 == null ? i4 : JSON.stringify(i4);
      }
      return i4;
    }, fromAttribute(i4, t3) {
      let e4 = i4;
      switch (t3) {
        case Boolean:
          e4 = i4 !== null;
          break;
        case Number:
          e4 = i4 === null ? null : Number(i4);
          break;
        case Object:
        case Array:
          try {
            e4 = JSON.parse(i4);
          } catch (n5) {
            e4 = null;
          }
      }
      return e4;
    } }, Pi = (i4, t3) => t3 !== i4 && (t3 == t3 || i4 == i4), Cn = { attribute: true, type: String, converter: Pn, reflect: false, hasChanged: Pi }, ht = class extends HTMLElement {
      constructor() {
        super(), this.\u03A0i = new Map(), this.\u03A0o = void 0, this.\u03A0l = void 0, this.isUpdatePending = false, this.hasUpdated = false, this.\u03A0h = null, this.u();
      }
      static addInitializer(t3) {
        var e4;
        (e4 = this.v) !== null && e4 !== void 0 || (this.v = []), this.v.push(t3);
      }
      static get observedAttributes() {
        this.finalize();
        let t3 = [];
        return this.elementProperties.forEach((e4, n5) => {
          let s5 = this.\u03A0p(n5, e4);
          s5 !== void 0 && (this.\u03A0m.set(s5, n5), t3.push(s5));
        }), t3;
      }
      static createProperty(t3, e4 = Cn) {
        if (e4.state && (e4.attribute = false), this.finalize(), this.elementProperties.set(t3, e4), !e4.noAccessor && !this.prototype.hasOwnProperty(t3)) {
          let n5 = typeof t3 == "symbol" ? Symbol() : "__" + t3, s5 = this.getPropertyDescriptor(t3, n5, e4);
          s5 !== void 0 && Object.defineProperty(this.prototype, t3, s5);
        }
      }
      static getPropertyDescriptor(t3, e4, n5) {
        return { get() {
          return this[e4];
        }, set(s5) {
          let o5 = this[t3];
          this[e4] = s5, this.requestUpdate(t3, o5, n5);
        }, configurable: true, enumerable: true };
      }
      static getPropertyOptions(t3) {
        return this.elementProperties.get(t3) || Cn;
      }
      static finalize() {
        if (this.hasOwnProperty("finalized"))
          return false;
        this.finalized = true;
        let t3 = Object.getPrototypeOf(this);
        if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this.\u03A0m = new Map(), this.hasOwnProperty("properties")) {
          let e4 = this.properties, n5 = [...Object.getOwnPropertyNames(e4), ...Object.getOwnPropertySymbols(e4)];
          for (let s5 of n5)
            this.createProperty(s5, e4[s5]);
        }
        return this.elementStyles = this.finalizeStyles(this.styles), true;
      }
      static finalizeStyles(t3) {
        let e4 = [];
        if (Array.isArray(t3)) {
          let n5 = new Set(t3.flat(1 / 0).reverse());
          for (let s5 of n5)
            e4.unshift(Me(s5));
        } else
          t3 !== void 0 && e4.push(Me(t3));
        return e4;
      }
      static \u03A0p(t3, e4) {
        let n5 = e4.attribute;
        return n5 === false ? void 0 : typeof n5 == "string" ? n5 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
      }
      u() {
        var t3;
        this.\u03A0g = new Promise((e4) => this.enableUpdating = e4), this.L = new Map(), this.\u03A0_(), this.requestUpdate(), (t3 = this.constructor.v) === null || t3 === void 0 || t3.forEach((e4) => e4(this));
      }
      addController(t3) {
        var e4, n5;
        ((e4 = this.\u03A0U) !== null && e4 !== void 0 ? e4 : this.\u03A0U = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((n5 = t3.hostConnected) === null || n5 === void 0 || n5.call(t3));
      }
      removeController(t3) {
        var e4;
        (e4 = this.\u03A0U) === null || e4 === void 0 || e4.splice(this.\u03A0U.indexOf(t3) >>> 0, 1);
      }
      \u03A0_() {
        this.constructor.elementProperties.forEach((t3, e4) => {
          this.hasOwnProperty(e4) && (this.\u03A0i.set(e4, this[e4]), delete this[e4]);
        });
      }
      createRenderRoot() {
        var t3;
        let e4 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
        return Sn(e4, this.constructor.elementStyles), e4;
      }
      connectedCallback() {
        var t3;
        this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this.\u03A0U) === null || t3 === void 0 || t3.forEach((e4) => {
          var n5;
          return (n5 = e4.hostConnected) === null || n5 === void 0 ? void 0 : n5.call(e4);
        }), this.\u03A0l && (this.\u03A0l(), this.\u03A0o = this.\u03A0l = void 0);
      }
      enableUpdating(t3) {
      }
      disconnectedCallback() {
        var t3;
        (t3 = this.\u03A0U) === null || t3 === void 0 || t3.forEach((e4) => {
          var n5;
          return (n5 = e4.hostDisconnected) === null || n5 === void 0 ? void 0 : n5.call(e4);
        }), this.\u03A0o = new Promise((e4) => this.\u03A0l = e4);
      }
      attributeChangedCallback(t3, e4, n5) {
        this.K(t3, n5);
      }
      \u03A0j(t3, e4, n5 = Cn) {
        var s5, o5;
        let a4 = this.constructor.\u03A0p(t3, n5);
        if (a4 !== void 0 && n5.reflect === true) {
          let r4 = ((o5 = (s5 = n5.converter) === null || s5 === void 0 ? void 0 : s5.toAttribute) !== null && o5 !== void 0 ? o5 : Pn.toAttribute)(e4, n5.type);
          this.\u03A0h = t3, r4 == null ? this.removeAttribute(a4) : this.setAttribute(a4, r4), this.\u03A0h = null;
        }
      }
      K(t3, e4) {
        var n5, s5, o5;
        let a4 = this.constructor, r4 = a4.\u03A0m.get(t3);
        if (r4 !== void 0 && this.\u03A0h !== r4) {
          let l4 = a4.getPropertyOptions(r4), c2 = l4.converter, d2 = (o5 = (s5 = (n5 = c2) === null || n5 === void 0 ? void 0 : n5.fromAttribute) !== null && s5 !== void 0 ? s5 : typeof c2 == "function" ? c2 : null) !== null && o5 !== void 0 ? o5 : Pn.fromAttribute;
          this.\u03A0h = r4, this[r4] = d2(e4, l4.type), this.\u03A0h = null;
        }
      }
      requestUpdate(t3, e4, n5) {
        let s5 = true;
        t3 !== void 0 && (((n5 = n5 || this.constructor.getPropertyOptions(t3)).hasChanged || Pi)(this[t3], e4) ? (this.L.has(t3) || this.L.set(t3, e4), n5.reflect === true && this.\u03A0h !== t3 && (this.\u03A0k === void 0 && (this.\u03A0k = new Map()), this.\u03A0k.set(t3, n5))) : s5 = false), !this.isUpdatePending && s5 && (this.\u03A0g = this.\u03A0q());
      }
      async \u03A0q() {
        this.isUpdatePending = true;
        try {
          for (await this.\u03A0g; this.\u03A0o; )
            await this.\u03A0o;
        } catch (e4) {
          Promise.reject(e4);
        }
        let t3 = this.performUpdate();
        return t3 != null && await t3, !this.isUpdatePending;
      }
      performUpdate() {
        var t3;
        if (!this.isUpdatePending)
          return;
        this.hasUpdated, this.\u03A0i && (this.\u03A0i.forEach((s5, o5) => this[o5] = s5), this.\u03A0i = void 0);
        let e4 = false, n5 = this.L;
        try {
          e4 = this.shouldUpdate(n5), e4 ? (this.willUpdate(n5), (t3 = this.\u03A0U) === null || t3 === void 0 || t3.forEach((s5) => {
            var o5;
            return (o5 = s5.hostUpdate) === null || o5 === void 0 ? void 0 : o5.call(s5);
          }), this.update(n5)) : this.\u03A0$();
        } catch (s5) {
          throw e4 = false, this.\u03A0$(), s5;
        }
        e4 && this.E(n5);
      }
      willUpdate(t3) {
      }
      E(t3) {
        var e4;
        (e4 = this.\u03A0U) === null || e4 === void 0 || e4.forEach((n5) => {
          var s5;
          return (s5 = n5.hostUpdated) === null || s5 === void 0 ? void 0 : s5.call(n5);
        }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
      }
      \u03A0$() {
        this.L = new Map(), this.isUpdatePending = false;
      }
      get updateComplete() {
        return this.getUpdateComplete();
      }
      getUpdateComplete() {
        return this.\u03A0g;
      }
      shouldUpdate(t3) {
        return true;
      }
      update(t3) {
        this.\u03A0k !== void 0 && (this.\u03A0k.forEach((e4, n5) => this.\u03A0j(n5, this[n5], e4)), this.\u03A0k = void 0), this.\u03A0$();
      }
      updated(t3) {
      }
      firstUpdated(t3) {
      }
    };
    ht.finalized = true, ht.elementProperties = new Map(), ht.elementStyles = [], ht.shadowRootOptions = { mode: "open" }, (Mn = (Mi = globalThis).reactiveElementPlatformSupport) === null || Mn === void 0 || Mn.call(Mi, { ReactiveElement: ht }), ((kn = (ki = globalThis).reactiveElementVersions) !== null && kn !== void 0 ? kn : ki.reactiveElementVersions = []).push("1.0.0-rc.2");
    var Ci, Dn, On, Di, ke = globalThis.trustedTypes, Oi = ke ? ke.createPolicy("lit-html", { createHTML: (i4) => i4 }) : void 0, ut = `lit$${(Math.random() + "").slice(9)}$`, Ai = "?" + ut, ra = `<${Ai}>`, Tt = document, Ut = (i4 = "") => Tt.createComment(i4), Pe = (i4) => i4 === null || typeof i4 != "object" && typeof i4 != "function", Ti = Array.isArray, la = (i4) => {
      var t3;
      return Ti(i4) || typeof ((t3 = i4) === null || t3 === void 0 ? void 0 : t3[Symbol.iterator]) == "function";
    }, Yt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ri = /-->/g, Li = />/g, yt = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, Ei = /'/g, Fi = /"/g, zi = /^(?:script|style|textarea)$/i, Ii = (i4) => (t3, ...e4) => ({ _$litType$: i4, strings: t3, values: e4 }), Bi = Ii(1), Dc = Ii(2), vt = Symbol.for("lit-noChange"), H2 = Symbol.for("lit-nothing"), Hi = new WeakMap(), Vi = (i4, t3, e4) => {
      var n5, s5;
      let o5 = (n5 = e4 == null ? void 0 : e4.renderBefore) !== null && n5 !== void 0 ? n5 : t3, a4 = o5._$litPart$;
      if (a4 === void 0) {
        let r4 = (s5 = e4 == null ? void 0 : e4.renderBefore) !== null && s5 !== void 0 ? s5 : null;
        o5._$litPart$ = a4 = new Ft(t3.insertBefore(Ut(), r4), r4, void 0, e4);
      }
      return a4.I(i4), a4;
    }, Rt = Tt.createTreeWalker(Tt, 129, null, false), ca = (i4, t3) => {
      let e4 = i4.length - 1, n5 = [], s5, o5 = t3 === 2 ? "<svg>" : "", a4 = Yt;
      for (let l4 = 0; l4 < e4; l4++) {
        let c2 = i4[l4], d2, h4, u3 = -1, f2 = 0;
        for (; f2 < c2.length && (a4.lastIndex = f2, h4 = a4.exec(c2), h4 !== null); )
          f2 = a4.lastIndex, a4 === Yt ? h4[1] === "!--" ? a4 = Ri : h4[1] !== void 0 ? a4 = Li : h4[2] !== void 0 ? (zi.test(h4[2]) && (s5 = RegExp("</" + h4[2], "g")), a4 = yt) : h4[3] !== void 0 && (a4 = yt) : a4 === yt ? h4[0] === ">" ? (a4 = s5 ?? Yt, u3 = -1) : h4[1] === void 0 ? u3 = -2 : (u3 = a4.lastIndex - h4[2].length, d2 = h4[1], a4 = h4[3] === void 0 ? yt : h4[3] === '"' ? Fi : Ei) : a4 === Fi || a4 === Ei ? a4 = yt : a4 === Ri || a4 === Li ? a4 = Yt : (a4 = yt, s5 = void 0);
        let g2 = a4 === yt && i4[l4 + 1].startsWith("/>") ? " " : "";
        o5 += a4 === Yt ? c2 + ra : u3 >= 0 ? (n5.push(d2), c2.slice(0, u3) + "$lit$" + c2.slice(u3) + ut + g2) : c2 + ut + (u3 === -2 ? (n5.push(void 0), l4) : g2);
      }
      let r4 = o5 + (i4[e4] || "<?>") + (t3 === 2 ? "</svg>" : "");
      return [Oi !== void 0 ? Oi.createHTML(r4) : r4, n5];
    }, Lt = class {
      constructor({ strings: t3, _$litType$: e4 }, n5) {
        let s5;
        this.parts = [];
        let o5 = 0, a4 = 0, r4 = t3.length - 1, l4 = this.parts, [c2, d2] = ca(t3, e4);
        if (this.el = Lt.createElement(c2, n5), Rt.currentNode = this.el.content, e4 === 2) {
          let h4 = this.el.content, u3 = h4.firstChild;
          u3.remove(), h4.append(...u3.childNodes);
        }
        for (; (s5 = Rt.nextNode()) !== null && l4.length < r4; ) {
          if (s5.nodeType === 1) {
            if (s5.hasAttributes()) {
              let h4 = [];
              for (let u3 of s5.getAttributeNames())
                if (u3.endsWith("$lit$") || u3.startsWith(ut)) {
                  let f2 = d2[a4++];
                  if (h4.push(u3), f2 !== void 0) {
                    let g2 = s5.getAttribute(f2.toLowerCase() + "$lit$").split(ut), p2 = /([.?@])?(.*)/.exec(f2);
                    l4.push({ type: 1, index: o5, name: p2[2], strings: g2, ctor: p2[1] === "." ? Ni : p2[1] === "?" ? ji : p2[1] === "@" ? $i : Xt });
                  } else
                    l4.push({ type: 6, index: o5 });
                }
              for (let u3 of h4)
                s5.removeAttribute(u3);
            }
            if (zi.test(s5.tagName)) {
              let h4 = s5.textContent.split(ut), u3 = h4.length - 1;
              if (u3 > 0) {
                s5.textContent = ke ? ke.emptyScript : "";
                for (let f2 = 0; f2 < u3; f2++)
                  s5.append(h4[f2], Ut()), Rt.nextNode(), l4.push({ type: 2, index: ++o5 });
                s5.append(h4[u3], Ut());
              }
            }
          } else if (s5.nodeType === 8)
            if (s5.data === Ai)
              l4.push({ type: 2, index: o5 });
            else {
              let h4 = -1;
              for (; (h4 = s5.data.indexOf(ut, h4 + 1)) !== -1; )
                l4.push({ type: 7, index: o5 }), h4 += ut.length - 1;
            }
          o5++;
        }
      }
      static createElement(t3, e4) {
        let n5 = Tt.createElement("template");
        return n5.innerHTML = t3, n5;
      }
    };
    function Et(i4, t3, e4 = i4, n5) {
      var s5, o5, a4, r4;
      if (t3 === vt)
        return t3;
      let l4 = n5 !== void 0 ? (s5 = e4.\u03A3i) === null || s5 === void 0 ? void 0 : s5[n5] : e4.\u03A3o, c2 = Pe(t3) ? void 0 : t3._$litDirective$;
      return (l4 == null ? void 0 : l4.constructor) !== c2 && ((o5 = l4 == null ? void 0 : l4.O) === null || o5 === void 0 || o5.call(l4, false), c2 === void 0 ? l4 = void 0 : (l4 = new c2(i4), l4.T(i4, e4, n5)), n5 !== void 0 ? ((a4 = (r4 = e4).\u03A3i) !== null && a4 !== void 0 ? a4 : r4.\u03A3i = [])[n5] = l4 : e4.\u03A3o = l4), l4 !== void 0 && (t3 = Et(i4, l4.S(i4, t3.values), l4, n5)), t3;
    }
    var Wi = class {
      constructor(t3, e4) {
        this.l = [], this.N = void 0, this.D = t3, this.M = e4;
      }
      u(t3) {
        var e4;
        let { el: { content: n5 }, parts: s5 } = this.D, o5 = ((e4 = t3 == null ? void 0 : t3.creationScope) !== null && e4 !== void 0 ? e4 : Tt).importNode(n5, true);
        Rt.currentNode = o5;
        let a4 = Rt.nextNode(), r4 = 0, l4 = 0, c2 = s5[0];
        for (; c2 !== void 0; ) {
          if (r4 === c2.index) {
            let d2;
            c2.type === 2 ? d2 = new Ft(a4, a4.nextSibling, this, t3) : c2.type === 1 ? d2 = new c2.ctor(a4, c2.name, c2.strings, this, t3) : c2.type === 6 && (d2 = new Ui(a4, this, t3)), this.l.push(d2), c2 = s5[++l4];
          }
          r4 !== (c2 == null ? void 0 : c2.index) && (a4 = Rt.nextNode(), r4++);
        }
        return o5;
      }
      v(t3) {
        let e4 = 0;
        for (let n5 of this.l)
          n5 !== void 0 && (n5.strings !== void 0 ? (n5.I(t3, n5, e4), e4 += n5.strings.length - 2) : n5.I(t3[e4])), e4++;
      }
    }, Ft = class {
      constructor(t3, e4, n5, s5) {
        this.type = 2, this.N = void 0, this.A = t3, this.B = e4, this.M = n5, this.options = s5;
      }
      setConnected(t3) {
        var e4;
        (e4 = this.P) === null || e4 === void 0 || e4.call(this, t3);
      }
      get parentNode() {
        return this.A.parentNode;
      }
      get startNode() {
        return this.A;
      }
      get endNode() {
        return this.B;
      }
      I(t3, e4 = this) {
        t3 = Et(this, t3, e4), Pe(t3) ? t3 === H2 || t3 == null || t3 === "" ? (this.H !== H2 && this.R(), this.H = H2) : t3 !== this.H && t3 !== vt && this.m(t3) : t3._$litType$ !== void 0 ? this._(t3) : t3.nodeType !== void 0 ? this.$(t3) : la(t3) ? this.g(t3) : this.m(t3);
      }
      k(t3, e4 = this.B) {
        return this.A.parentNode.insertBefore(t3, e4);
      }
      $(t3) {
        this.H !== t3 && (this.R(), this.H = this.k(t3));
      }
      m(t3) {
        let e4 = this.A.nextSibling;
        e4 !== null && e4.nodeType === 3 && (this.B === null ? e4.nextSibling === null : e4 === this.B.previousSibling) ? e4.data = t3 : this.$(Tt.createTextNode(t3)), this.H = t3;
      }
      _(t3) {
        var e4;
        let { values: n5, _$litType$: s5 } = t3, o5 = typeof s5 == "number" ? this.C(t3) : (s5.el === void 0 && (s5.el = Lt.createElement(s5.h, this.options)), s5);
        if (((e4 = this.H) === null || e4 === void 0 ? void 0 : e4.D) === o5)
          this.H.v(n5);
        else {
          let a4 = new Wi(o5, this), r4 = a4.u(this.options);
          a4.v(n5), this.$(r4), this.H = a4;
        }
      }
      C(t3) {
        let e4 = Hi.get(t3.strings);
        return e4 === void 0 && Hi.set(t3.strings, e4 = new Lt(t3)), e4;
      }
      g(t3) {
        Ti(this.H) || (this.H = [], this.R());
        let e4 = this.H, n5, s5 = 0;
        for (let o5 of t3)
          s5 === e4.length ? e4.push(n5 = new Ft(this.k(Ut()), this.k(Ut()), this, this.options)) : n5 = e4[s5], n5.I(o5), s5++;
        s5 < e4.length && (this.R(n5 && n5.B.nextSibling, s5), e4.length = s5);
      }
      R(t3 = this.A.nextSibling, e4) {
        var n5;
        for ((n5 = this.P) === null || n5 === void 0 || n5.call(this, false, true, e4); t3 && t3 !== this.B; ) {
          let s5 = t3.nextSibling;
          t3.remove(), t3 = s5;
        }
      }
    }, Xt = class {
      constructor(t3, e4, n5, s5, o5) {
        this.type = 1, this.H = H2, this.N = void 0, this.V = void 0, this.element = t3, this.name = e4, this.M = s5, this.options = o5, n5.length > 2 || n5[0] !== "" || n5[1] !== "" ? (this.H = Array(n5.length - 1).fill(H2), this.strings = n5) : this.H = H2;
      }
      get tagName() {
        return this.element.tagName;
      }
      I(t3, e4 = this, n5, s5) {
        let o5 = this.strings, a4 = false;
        if (o5 === void 0)
          t3 = Et(this, t3, e4, 0), a4 = !Pe(t3) || t3 !== this.H && t3 !== vt, a4 && (this.H = t3);
        else {
          let r4 = t3, l4, c2;
          for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
            c2 = Et(this, r4[n5 + l4], e4, l4), c2 === vt && (c2 = this.H[l4]), a4 || (a4 = !Pe(c2) || c2 !== this.H[l4]), c2 === H2 ? t3 = H2 : t3 !== H2 && (t3 += (c2 ?? "") + o5[l4 + 1]), this.H[l4] = c2;
        }
        a4 && !s5 && this.W(t3);
      }
      W(t3) {
        t3 === H2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
      }
    }, Ni = class extends Xt {
      constructor() {
        super(...arguments), this.type = 3;
      }
      W(t3) {
        this.element[this.name] = t3 === H2 ? void 0 : t3;
      }
    }, ji = class extends Xt {
      constructor() {
        super(...arguments), this.type = 4;
      }
      W(t3) {
        t3 && t3 !== H2 ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
      }
    }, $i = class extends Xt {
      constructor() {
        super(...arguments), this.type = 5;
      }
      I(t3, e4 = this) {
        var n5;
        if ((t3 = (n5 = Et(this, t3, e4, 0)) !== null && n5 !== void 0 ? n5 : H2) === vt)
          return;
        let s5 = this.H, o5 = t3 === H2 && s5 !== H2 || t3.capture !== s5.capture || t3.once !== s5.once || t3.passive !== s5.passive, a4 = t3 !== H2 && (s5 === H2 || o5);
        o5 && this.element.removeEventListener(this.name, this, s5), a4 && this.element.addEventListener(this.name, this, t3), this.H = t3;
      }
      handleEvent(t3) {
        var e4, n5;
        typeof this.H == "function" ? this.H.call((n5 = (e4 = this.options) === null || e4 === void 0 ? void 0 : e4.host) !== null && n5 !== void 0 ? n5 : this.element, t3) : this.H.handleEvent(t3);
      }
    }, Ui = class {
      constructor(t3, e4, n5) {
        this.element = t3, this.type = 6, this.N = void 0, this.V = void 0, this.M = e4, this.options = n5;
      }
      I(t3) {
        Et(this, t3);
      }
    };
    (Dn = (Ci = globalThis).litHtmlPlatformSupport) === null || Dn === void 0 || Dn.call(Ci, Lt, Ft), ((On = (Di = globalThis).litHtmlVersions) !== null && On !== void 0 ? On : Di.litHtmlVersions = []).push("2.0.0-rc.3");
    var An, Yi, Tn, Xi, Rn, qi;
    ((An = (qi = globalThis).litElementVersions) !== null && An !== void 0 ? An : qi.litElementVersions = []).push("3.0.0-rc.2");
    var wt = class extends ht {
      constructor() {
        super(...arguments), this.renderOptions = { host: this }, this.\u03A6t = void 0;
      }
      createRenderRoot() {
        var t3, e4;
        let n5 = super.createRenderRoot();
        return (t3 = (e4 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e4.renderBefore = n5.firstChild), n5;
      }
      update(t3) {
        let e4 = this.render();
        super.update(t3), this.\u03A6t = Vi(e4, this.renderRoot, this.renderOptions);
      }
      connectedCallback() {
        var t3;
        super.connectedCallback(), (t3 = this.\u03A6t) === null || t3 === void 0 || t3.setConnected(true);
      }
      disconnectedCallback() {
        var t3;
        super.disconnectedCallback(), (t3 = this.\u03A6t) === null || t3 === void 0 || t3.setConnected(false);
      }
      render() {
        return vt;
      }
    };
    wt.finalized = true, wt._$litElement$ = true, (Tn = (Yi = globalThis).litElementHydrateSupport) === null || Tn === void 0 || Tn.call(Yi, { LitElement: wt }), (Rn = (Xi = globalThis).litElementPlatformSupport) === null || Rn === void 0 || Rn.call(Xi, { LitElement: wt });
    var Ln = function() {
      return typeof window == "undefined" ? function(i4) {
        return i4();
      } : window.requestAnimationFrame;
    }();
    function En(i4, t3, e4) {
      let n5 = e4 || ((a4) => Array.prototype.slice.call(a4)), s5 = false, o5 = [];
      return function(...a4) {
        o5 = n5(a4), s5 || (s5 = true, Ln.call(window, () => {
          s5 = false, i4.apply(t3, o5);
        }));
      };
    }
    function Ki(i4, t3) {
      let e4;
      return function() {
        return t3 ? (clearTimeout(e4), e4 = setTimeout(i4, t3)) : i4(), t3;
      };
    }
    var Gi = (i4) => i4 === "start" ? "left" : i4 === "end" ? "right" : "center", Fn = (i4, t3, e4) => i4 === "start" ? t3 : i4 === "end" ? e4 : (t3 + e4) / 2;
    var Zi = function() {
      let i4 = 0;
      return function() {
        return i4++;
      };
    }();
    function P2(i4) {
      return i4 === null || typeof i4 == "undefined";
    }
    function T2(i4) {
      if (Array.isArray && Array.isArray(i4))
        return true;
      let t3 = Object.prototype.toString.call(i4);
      return t3.substr(0, 7) === "[object" && t3.substr(-6) === "Array]";
    }
    function O(i4) {
      return i4 !== null && Object.prototype.toString.call(i4) === "[object Object]";
    }
    var B = (i4) => (typeof i4 == "number" || i4 instanceof Number) && isFinite(+i4);
    function U(i4, t3) {
      return B(i4) ? i4 : t3;
    }
    function C2(i4, t3) {
      return typeof i4 == "undefined" ? t3 : i4;
    }
    var Ji = (i4, t3) => typeof i4 == "string" && i4.endsWith("%") ? parseFloat(i4) / 100 : i4 / t3, Ce = (i4, t3) => typeof i4 == "string" && i4.endsWith("%") ? parseFloat(i4) / 100 * t3 : +i4;
    function R2(i4, t3, e4) {
      if (i4 && typeof i4.call == "function")
        return i4.apply(e4, t3);
    }
    function D(i4, t3, e4, n5) {
      let s5, o5, a4;
      if (T2(i4))
        if (o5 = i4.length, n5)
          for (s5 = o5 - 1; s5 >= 0; s5--)
            t3.call(e4, i4[s5], s5);
        else
          for (s5 = 0; s5 < o5; s5++)
            t3.call(e4, i4[s5], s5);
      else if (O(i4))
        for (a4 = Object.keys(i4), o5 = a4.length, s5 = 0; s5 < o5; s5++)
          t3.call(e4, i4[a4[s5]], a4[s5]);
    }
    function qt(i4, t3) {
      let e4, n5, s5, o5;
      if (!i4 || !t3 || i4.length !== t3.length)
        return false;
      for (e4 = 0, n5 = i4.length; e4 < n5; ++e4)
        if (s5 = i4[e4], o5 = t3[e4], s5.datasetIndex !== o5.datasetIndex || s5.index !== o5.index)
          return false;
      return true;
    }
    function De(i4) {
      if (T2(i4))
        return i4.map(De);
      if (O(i4)) {
        let t3 = Object.create(null), e4 = Object.keys(i4), n5 = e4.length, s5 = 0;
        for (; s5 < n5; ++s5)
          t3[e4[s5]] = De(i4[e4[s5]]);
        return t3;
      }
      return i4;
    }
    function Qi(i4) {
      return ["__proto__", "prototype", "constructor"].indexOf(i4) === -1;
    }
    function da(i4, t3, e4, n5) {
      if (!Qi(i4))
        return;
      let s5 = t3[i4], o5 = e4[i4];
      O(s5) && O(o5) ? zt(s5, o5, n5) : t3[i4] = De(o5);
    }
    function zt(i4, t3, e4) {
      let n5 = T2(t3) ? t3 : [t3], s5 = n5.length;
      if (!O(i4))
        return i4;
      e4 = e4 || {};
      let o5 = e4.merger || da;
      for (let a4 = 0; a4 < s5; ++a4) {
        if (t3 = n5[a4], !O(t3))
          continue;
        let r4 = Object.keys(t3);
        for (let l4 = 0, c2 = r4.length; l4 < c2; ++l4)
          o5(r4[l4], i4, t3, e4);
      }
      return i4;
    }
    function It(i4, t3) {
      return zt(i4, t3, { merger: ha });
    }
    function ha(i4, t3, e4) {
      if (!Qi(i4))
        return;
      let n5 = t3[i4], s5 = e4[i4];
      O(n5) && O(s5) ? It(n5, s5) : Object.prototype.hasOwnProperty.call(t3, i4) || (t3[i4] = De(s5));
    }
    var ua = "", fa = ".";
    function ts(i4, t3) {
      let e4 = i4.indexOf(fa, t3);
      return e4 === -1 ? i4.length : e4;
    }
    function ot(i4, t3) {
      if (t3 === ua)
        return i4;
      let e4 = 0, n5 = ts(t3, e4);
      for (; i4 && n5 > e4; )
        i4 = i4[t3.substr(e4, n5 - e4)], e4 = n5 + 1, n5 = ts(t3, e4);
      return i4;
    }
    function Oe(i4) {
      return i4.charAt(0).toUpperCase() + i4.slice(1);
    }
    var q = (i4) => typeof i4 != "undefined", St = (i4) => typeof i4 == "function", es = (i4, t3) => {
      if (i4.size !== t3.size)
        return false;
      for (let e4 of i4)
        if (!t3.has(e4))
          return false;
      return true;
    }, I2 = Math.PI, A2 = 2 * I2, ga = A2 + I2, Ae = Number.POSITIVE_INFINITY, pa = I2 / 180, L2 = I2 / 2, Kt = I2 / 4, ns = I2 * 2 / 3, Y = Math.log10, at = Math.sign;
    function zn(i4) {
      let t3 = Math.pow(10, Math.floor(Y(i4))), e4 = i4 / t3;
      return (e4 <= 1 ? 1 : e4 <= 2 ? 2 : e4 <= 5 ? 5 : 10) * t3;
    }
    function is(i4) {
      let t3 = [], e4 = Math.sqrt(i4), n5;
      for (n5 = 1; n5 < e4; n5++)
        i4 % n5 == 0 && (t3.push(n5), t3.push(i4 / n5));
      return e4 === (e4 | 0) && t3.push(e4), t3.sort((s5, o5) => s5 - o5).pop(), t3;
    }
    function Mt(i4) {
      return !isNaN(parseFloat(i4)) && isFinite(i4);
    }
    function Gt(i4, t3, e4) {
      return Math.abs(i4 - t3) < e4;
    }
    function ss(i4, t3) {
      let e4 = Math.round(i4);
      return e4 - t3 <= i4 && e4 + t3 >= i4;
    }
    function In(i4, t3, e4) {
      let n5, s5, o5;
      for (n5 = 0, s5 = i4.length; n5 < s5; n5++)
        o5 = i4[n5][e4], isNaN(o5) || (t3.min = Math.min(t3.min, o5), t3.max = Math.max(t3.max, o5));
    }
    function Q(i4) {
      return i4 * (I2 / 180);
    }
    function Te(i4) {
      return i4 * (180 / I2);
    }
    function os(i4) {
      if (!B(i4))
        return;
      let t3 = 1, e4 = 0;
      for (; Math.round(i4 * t3) / t3 !== i4; )
        t3 *= 10, e4++;
      return e4;
    }
    function as(i4, t3) {
      let e4 = t3.x - i4.x, n5 = t3.y - i4.y, s5 = Math.sqrt(e4 * e4 + n5 * n5), o5 = Math.atan2(n5, e4);
      return o5 < -0.5 * I2 && (o5 += A2), { angle: o5, distance: s5 };
    }
    function Re(i4, t3) {
      return Math.sqrt(Math.pow(t3.x - i4.x, 2) + Math.pow(t3.y - i4.y, 2));
    }
    function ma(i4, t3) {
      return (i4 - t3 + ga) % A2 - I2;
    }
    function tt(i4) {
      return (i4 % A2 + A2) % A2;
    }
    function Zt(i4, t3, e4) {
      let n5 = tt(i4), s5 = tt(t3), o5 = tt(e4), a4 = tt(s5 - n5), r4 = tt(o5 - n5), l4 = tt(n5 - s5), c2 = tt(n5 - o5);
      return n5 === s5 || n5 === o5 || a4 > r4 && l4 < c2;
    }
    function X(i4, t3, e4) {
      return Math.max(t3, Math.min(e4, i4));
    }
    function rs(i4) {
      return X(i4, -32768, 32767);
    }
    var Le = (i4) => i4 === 0 || i4 === 1, ls = (i4, t3, e4) => -(Math.pow(2, 10 * (i4 -= 1)) * Math.sin((i4 - t3) * A2 / e4)), cs = (i4, t3, e4) => Math.pow(2, -10 * i4) * Math.sin((i4 - t3) * A2 / e4) + 1, Bt = { linear: (i4) => i4, easeInQuad: (i4) => i4 * i4, easeOutQuad: (i4) => -i4 * (i4 - 2), easeInOutQuad: (i4) => (i4 /= 0.5) < 1 ? 0.5 * i4 * i4 : -0.5 * (--i4 * (i4 - 2) - 1), easeInCubic: (i4) => i4 * i4 * i4, easeOutCubic: (i4) => (i4 -= 1) * i4 * i4 + 1, easeInOutCubic: (i4) => (i4 /= 0.5) < 1 ? 0.5 * i4 * i4 * i4 : 0.5 * ((i4 -= 2) * i4 * i4 + 2), easeInQuart: (i4) => i4 * i4 * i4 * i4, easeOutQuart: (i4) => -((i4 -= 1) * i4 * i4 * i4 - 1), easeInOutQuart: (i4) => (i4 /= 0.5) < 1 ? 0.5 * i4 * i4 * i4 * i4 : -0.5 * ((i4 -= 2) * i4 * i4 * i4 - 2), easeInQuint: (i4) => i4 * i4 * i4 * i4 * i4, easeOutQuint: (i4) => (i4 -= 1) * i4 * i4 * i4 * i4 + 1, easeInOutQuint: (i4) => (i4 /= 0.5) < 1 ? 0.5 * i4 * i4 * i4 * i4 * i4 : 0.5 * ((i4 -= 2) * i4 * i4 * i4 * i4 + 2), easeInSine: (i4) => -Math.cos(i4 * L2) + 1, easeOutSine: (i4) => Math.sin(i4 * L2), easeInOutSine: (i4) => -0.5 * (Math.cos(I2 * i4) - 1), easeInExpo: (i4) => i4 === 0 ? 0 : Math.pow(2, 10 * (i4 - 1)), easeOutExpo: (i4) => i4 === 1 ? 1 : -Math.pow(2, -10 * i4) + 1, easeInOutExpo: (i4) => Le(i4) ? i4 : i4 < 0.5 ? 0.5 * Math.pow(2, 10 * (i4 * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (i4 * 2 - 1)) + 2), easeInCirc: (i4) => i4 >= 1 ? i4 : -(Math.sqrt(1 - i4 * i4) - 1), easeOutCirc: (i4) => Math.sqrt(1 - (i4 -= 1) * i4), easeInOutCirc: (i4) => (i4 /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - i4 * i4) - 1) : 0.5 * (Math.sqrt(1 - (i4 -= 2) * i4) + 1), easeInElastic: (i4) => Le(i4) ? i4 : ls(i4, 0.075, 0.3), easeOutElastic: (i4) => Le(i4) ? i4 : cs(i4, 0.075, 0.3), easeInOutElastic(i4) {
      let t3 = 0.1125, e4 = 0.45;
      return Le(i4) ? i4 : i4 < 0.5 ? 0.5 * ls(i4 * 2, t3, e4) : 0.5 + 0.5 * cs(i4 * 2 - 1, t3, e4);
    }, easeInBack(i4) {
      let t3 = 1.70158;
      return i4 * i4 * ((t3 + 1) * i4 - t3);
    }, easeOutBack(i4) {
      let t3 = 1.70158;
      return (i4 -= 1) * i4 * ((t3 + 1) * i4 + t3) + 1;
    }, easeInOutBack(i4) {
      let t3 = 1.70158;
      return (i4 /= 0.5) < 1 ? 0.5 * (i4 * i4 * (((t3 *= 1.525) + 1) * i4 - t3)) : 0.5 * ((i4 -= 2) * i4 * (((t3 *= 1.525) + 1) * i4 + t3) + 2);
    }, easeInBounce: (i4) => 1 - Bt.easeOutBounce(1 - i4), easeOutBounce(i4) {
      let t3 = 7.5625, e4 = 2.75;
      return i4 < 1 / e4 ? t3 * i4 * i4 : i4 < 2 / e4 ? t3 * (i4 -= 1.5 / e4) * i4 + 0.75 : i4 < 2.5 / e4 ? t3 * (i4 -= 2.25 / e4) * i4 + 0.9375 : t3 * (i4 -= 2.625 / e4) * i4 + 0.984375;
    }, easeInOutBounce: (i4) => i4 < 0.5 ? Bt.easeInBounce(i4 * 2) * 0.5 : Bt.easeOutBounce(i4 * 2 - 1) * 0.5 + 0.5 };
    var K = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Bn = "0123456789ABCDEF", ba = (i4) => Bn[i4 & 15], xa = (i4) => Bn[(i4 & 240) >> 4] + Bn[i4 & 15], Ee = (i4) => (i4 & 240) >> 4 == (i4 & 15);
    function _a(i4) {
      return Ee(i4.r) && Ee(i4.g) && Ee(i4.b) && Ee(i4.a);
    }
    function ya(i4) {
      var t3 = i4.length, e4;
      return i4[0] === "#" && (t3 === 4 || t3 === 5 ? e4 = { r: 255 & K[i4[1]] * 17, g: 255 & K[i4[2]] * 17, b: 255 & K[i4[3]] * 17, a: t3 === 5 ? K[i4[4]] * 17 : 255 } : (t3 === 7 || t3 === 9) && (e4 = { r: K[i4[1]] << 4 | K[i4[2]], g: K[i4[3]] << 4 | K[i4[4]], b: K[i4[5]] << 4 | K[i4[6]], a: t3 === 9 ? K[i4[7]] << 4 | K[i4[8]] : 255 })), e4;
    }
    function va(i4) {
      var t3 = _a(i4) ? ba : xa;
      return i4 && "#" + t3(i4.r) + t3(i4.g) + t3(i4.b) + (i4.a < 255 ? t3(i4.a) : "");
    }
    function Jt(i4) {
      return i4 + 0.5 | 0;
    }
    var Fe = (i4, t3, e4) => Math.max(Math.min(i4, e4), t3);
    function Qt(i4) {
      return Fe(Jt(i4 * 2.55), 0, 255);
    }
    function te(i4) {
      return Fe(Jt(i4 * 255), 0, 255);
    }
    function Hn(i4) {
      return Fe(Jt(i4 / 2.55) / 100, 0, 1);
    }
    function ds(i4) {
      return Fe(Jt(i4 * 100), 0, 100);
    }
    var wa = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
    function Sa(i4) {
      let t3 = wa.exec(i4), e4 = 255, n5, s5, o5;
      if (!!t3) {
        if (t3[7] !== n5) {
          let a4 = +t3[7];
          e4 = 255 & (t3[8] ? Qt(a4) : a4 * 255);
        }
        return n5 = +t3[1], s5 = +t3[3], o5 = +t3[5], n5 = 255 & (t3[2] ? Qt(n5) : n5), s5 = 255 & (t3[4] ? Qt(s5) : s5), o5 = 255 & (t3[6] ? Qt(o5) : o5), { r: n5, g: s5, b: o5, a: e4 };
      }
    }
    function Ma(i4) {
      return i4 && (i4.a < 255 ? `rgba(${i4.r}, ${i4.g}, ${i4.b}, ${Hn(i4.a)})` : `rgb(${i4.r}, ${i4.g}, ${i4.b})`);
    }
    var ka = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
    function hs(i4, t3, e4) {
      let n5 = t3 * Math.min(e4, 1 - e4), s5 = (o5, a4 = (o5 + i4 / 30) % 12) => e4 - n5 * Math.max(Math.min(a4 - 3, 9 - a4, 1), -1);
      return [s5(0), s5(8), s5(4)];
    }
    function Pa(i4, t3, e4) {
      let n5 = (s5, o5 = (s5 + i4 / 60) % 6) => e4 - e4 * t3 * Math.max(Math.min(o5, 4 - o5, 1), 0);
      return [n5(5), n5(3), n5(1)];
    }
    function Ca(i4, t3, e4) {
      let n5 = hs(i4, 1, 0.5), s5;
      for (t3 + e4 > 1 && (s5 = 1 / (t3 + e4), t3 *= s5, e4 *= s5), s5 = 0; s5 < 3; s5++)
        n5[s5] *= 1 - t3 - e4, n5[s5] += t3;
      return n5;
    }
    function Vn(i4) {
      let t3 = 255, e4 = i4.r / t3, n5 = i4.g / t3, s5 = i4.b / t3, o5 = Math.max(e4, n5, s5), a4 = Math.min(e4, n5, s5), r4 = (o5 + a4) / 2, l4, c2, d2;
      return o5 !== a4 && (d2 = o5 - a4, c2 = r4 > 0.5 ? d2 / (2 - o5 - a4) : d2 / (o5 + a4), l4 = o5 === e4 ? (n5 - s5) / d2 + (n5 < s5 ? 6 : 0) : o5 === n5 ? (s5 - e4) / d2 + 2 : (e4 - n5) / d2 + 4, l4 = l4 * 60 + 0.5), [l4 | 0, c2 || 0, r4];
    }
    function Wn(i4, t3, e4, n5) {
      return (Array.isArray(t3) ? i4(t3[0], t3[1], t3[2]) : i4(t3, e4, n5)).map(te);
    }
    function Nn(i4, t3, e4) {
      return Wn(hs, i4, t3, e4);
    }
    function Da(i4, t3, e4) {
      return Wn(Ca, i4, t3, e4);
    }
    function Oa(i4, t3, e4) {
      return Wn(Pa, i4, t3, e4);
    }
    function us(i4) {
      return (i4 % 360 + 360) % 360;
    }
    function Aa(i4) {
      let t3 = ka.exec(i4), e4 = 255, n5;
      if (!t3)
        return;
      t3[5] !== n5 && (e4 = t3[6] ? Qt(+t3[5]) : te(+t3[5]));
      let s5 = us(+t3[2]), o5 = +t3[3] / 100, a4 = +t3[4] / 100;
      return t3[1] === "hwb" ? n5 = Da(s5, o5, a4) : t3[1] === "hsv" ? n5 = Oa(s5, o5, a4) : n5 = Nn(s5, o5, a4), { r: n5[0], g: n5[1], b: n5[2], a: e4 };
    }
    function Ta(i4, t3) {
      var e4 = Vn(i4);
      e4[0] = us(e4[0] + t3), e4 = Nn(e4), i4.r = e4[0], i4.g = e4[1], i4.b = e4[2];
    }
    function Ra(i4) {
      if (!i4)
        return;
      let t3 = Vn(i4), e4 = t3[0], n5 = ds(t3[1]), s5 = ds(t3[2]);
      return i4.a < 255 ? `hsla(${e4}, ${n5}%, ${s5}%, ${Hn(i4.a)})` : `hsl(${e4}, ${n5}%, ${s5}%)`;
    }
    var fs = { x: "dark", Z: "light", Y: "re", X: "blu", W: "gr", V: "medium", U: "slate", A: "ee", T: "ol", S: "or", B: "ra", C: "lateg", D: "ights", R: "in", Q: "turquois", E: "hi", P: "ro", O: "al", N: "le", M: "de", L: "yello", F: "en", K: "ch", G: "arks", H: "ea", I: "ightg", J: "wh" }, gs = { OiceXe: "f0f8ff", antiquewEte: "faebd7", aqua: "ffff", aquamarRe: "7fffd4", azuY: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "0", blanKedOmond: "ffebcd", Xe: "ff", XeviTet: "8a2be2", bPwn: "a52a2a", burlywood: "deb887", caMtXe: "5f9ea0", KartYuse: "7fff00", KocTate: "d2691e", cSO: "ff7f50", cSnflowerXe: "6495ed", cSnsilk: "fff8dc", crimson: "dc143c", cyan: "ffff", xXe: "8b", xcyan: "8b8b", xgTMnPd: "b8860b", xWay: "a9a9a9", xgYF: "6400", xgYy: "a9a9a9", xkhaki: "bdb76b", xmagFta: "8b008b", xTivegYF: "556b2f", xSange: "ff8c00", xScEd: "9932cc", xYd: "8b0000", xsOmon: "e9967a", xsHgYF: "8fbc8f", xUXe: "483d8b", xUWay: "2f4f4f", xUgYy: "2f4f4f", xQe: "ced1", xviTet: "9400d3", dAppRk: "ff1493", dApskyXe: "bfff", dimWay: "696969", dimgYy: "696969", dodgerXe: "1e90ff", fiYbrick: "b22222", flSOwEte: "fffaf0", foYstWAn: "228b22", fuKsia: "ff00ff", gaRsbSo: "dcdcdc", ghostwEte: "f8f8ff", gTd: "ffd700", gTMnPd: "daa520", Way: "808080", gYF: "8000", gYFLw: "adff2f", gYy: "808080", honeyMw: "f0fff0", hotpRk: "ff69b4", RdianYd: "cd5c5c", Rdigo: "4b0082", ivSy: "fffff0", khaki: "f0e68c", lavFMr: "e6e6fa", lavFMrXsh: "fff0f5", lawngYF: "7cfc00", NmoncEffon: "fffacd", ZXe: "add8e6", ZcSO: "f08080", Zcyan: "e0ffff", ZgTMnPdLw: "fafad2", ZWay: "d3d3d3", ZgYF: "90ee90", ZgYy: "d3d3d3", ZpRk: "ffb6c1", ZsOmon: "ffa07a", ZsHgYF: "20b2aa", ZskyXe: "87cefa", ZUWay: "778899", ZUgYy: "778899", ZstAlXe: "b0c4de", ZLw: "ffffe0", lime: "ff00", limegYF: "32cd32", lRF: "faf0e6", magFta: "ff00ff", maPon: "800000", VaquamarRe: "66cdaa", VXe: "cd", VScEd: "ba55d3", VpurpN: "9370db", VsHgYF: "3cb371", VUXe: "7b68ee", VsprRggYF: "fa9a", VQe: "48d1cc", VviTetYd: "c71585", midnightXe: "191970", mRtcYam: "f5fffa", mistyPse: "ffe4e1", moccasR: "ffe4b5", navajowEte: "ffdead", navy: "80", Tdlace: "fdf5e6", Tive: "808000", TivedBb: "6b8e23", Sange: "ffa500", SangeYd: "ff4500", ScEd: "da70d6", pOegTMnPd: "eee8aa", pOegYF: "98fb98", pOeQe: "afeeee", pOeviTetYd: "db7093", papayawEp: "ffefd5", pHKpuff: "ffdab9", peru: "cd853f", pRk: "ffc0cb", plum: "dda0dd", powMrXe: "b0e0e6", purpN: "800080", YbeccapurpN: "663399", Yd: "ff0000", Psybrown: "bc8f8f", PyOXe: "4169e1", saddNbPwn: "8b4513", sOmon: "fa8072", sandybPwn: "f4a460", sHgYF: "2e8b57", sHshell: "fff5ee", siFna: "a0522d", silver: "c0c0c0", skyXe: "87ceeb", UXe: "6a5acd", UWay: "708090", UgYy: "708090", snow: "fffafa", sprRggYF: "ff7f", stAlXe: "4682b4", tan: "d2b48c", teO: "8080", tEstN: "d8bfd8", tomato: "ff6347", Qe: "40e0d0", viTet: "ee82ee", JHt: "f5deb3", wEte: "ffffff", wEtesmoke: "f5f5f5", Lw: "ffff00", LwgYF: "9acd32" };
    function La() {
      let i4 = {}, t3 = Object.keys(gs), e4 = Object.keys(fs), n5, s5, o5, a4, r4;
      for (n5 = 0; n5 < t3.length; n5++) {
        for (a4 = r4 = t3[n5], s5 = 0; s5 < e4.length; s5++)
          o5 = e4[s5], r4 = r4.replace(o5, fs[o5]);
        o5 = parseInt(gs[a4], 16), i4[r4] = [o5 >> 16 & 255, o5 >> 8 & 255, o5 & 255];
      }
      return i4;
    }
    var ze;
    function Ea(i4) {
      ze || (ze = La(), ze.transparent = [0, 0, 0, 0]);
      let t3 = ze[i4.toLowerCase()];
      return t3 && { r: t3[0], g: t3[1], b: t3[2], a: t3.length === 4 ? t3[3] : 255 };
    }
    function Ie(i4, t3, e4) {
      if (i4) {
        let n5 = Vn(i4);
        n5[t3] = Math.max(0, Math.min(n5[t3] + n5[t3] * e4, t3 === 0 ? 360 : 1)), n5 = Nn(n5), i4.r = n5[0], i4.g = n5[1], i4.b = n5[2];
      }
    }
    function ps(i4, t3) {
      return i4 && Object.assign(t3 || {}, i4);
    }
    function ms(i4) {
      var t3 = { r: 0, g: 0, b: 0, a: 255 };
      return Array.isArray(i4) ? i4.length >= 3 && (t3 = { r: i4[0], g: i4[1], b: i4[2], a: 255 }, i4.length > 3 && (t3.a = te(i4[3]))) : (t3 = ps(i4, { r: 0, g: 0, b: 0, a: 1 }), t3.a = te(t3.a)), t3;
    }
    function Fa(i4) {
      return i4.charAt(0) === "r" ? Sa(i4) : Aa(i4);
    }
    var ee = class {
      constructor(t3) {
        if (t3 instanceof ee)
          return t3;
        let e4 = typeof t3, n5;
        e4 === "object" ? n5 = ms(t3) : e4 === "string" && (n5 = ya(t3) || Ea(t3) || Fa(t3)), this._rgb = n5, this._valid = !!n5;
      }
      get valid() {
        return this._valid;
      }
      get rgb() {
        var t3 = ps(this._rgb);
        return t3 && (t3.a = Hn(t3.a)), t3;
      }
      set rgb(t3) {
        this._rgb = ms(t3);
      }
      rgbString() {
        return this._valid ? Ma(this._rgb) : this._rgb;
      }
      hexString() {
        return this._valid ? va(this._rgb) : this._rgb;
      }
      hslString() {
        return this._valid ? Ra(this._rgb) : this._rgb;
      }
      mix(t3, e4) {
        let n5 = this;
        if (t3) {
          let s5 = n5.rgb, o5 = t3.rgb, a4, r4 = e4 === a4 ? 0.5 : e4, l4 = 2 * r4 - 1, c2 = s5.a - o5.a, d2 = ((l4 * c2 == -1 ? l4 : (l4 + c2) / (1 + l4 * c2)) + 1) / 2;
          a4 = 1 - d2, s5.r = 255 & d2 * s5.r + a4 * o5.r + 0.5, s5.g = 255 & d2 * s5.g + a4 * o5.g + 0.5, s5.b = 255 & d2 * s5.b + a4 * o5.b + 0.5, s5.a = r4 * s5.a + (1 - r4) * o5.a, n5.rgb = s5;
        }
        return n5;
      }
      clone() {
        return new ee(this.rgb);
      }
      alpha(t3) {
        return this._rgb.a = te(t3), this;
      }
      clearer(t3) {
        let e4 = this._rgb;
        return e4.a *= 1 - t3, this;
      }
      greyscale() {
        let t3 = this._rgb, e4 = Jt(t3.r * 0.3 + t3.g * 0.59 + t3.b * 0.11);
        return t3.r = t3.g = t3.b = e4, this;
      }
      opaquer(t3) {
        let e4 = this._rgb;
        return e4.a *= 1 + t3, this;
      }
      negate() {
        let t3 = this._rgb;
        return t3.r = 255 - t3.r, t3.g = 255 - t3.g, t3.b = 255 - t3.b, this;
      }
      lighten(t3) {
        return Ie(this._rgb, 2, t3), this;
      }
      darken(t3) {
        return Ie(this._rgb, 2, -t3), this;
      }
      saturate(t3) {
        return Ie(this._rgb, 1, t3), this;
      }
      desaturate(t3) {
        return Ie(this._rgb, 1, -t3), this;
      }
      rotate(t3) {
        return Ta(this._rgb, t3), this;
      }
    };
    function bs(i4) {
      return new ee(i4);
    }
    var xs = (i4) => i4 instanceof CanvasGradient || i4 instanceof CanvasPattern;
    function jn(i4) {
      return xs(i4) ? i4 : bs(i4);
    }
    function $n(i4) {
      return xs(i4) ? i4 : bs(i4).saturate(0.5).darken(0.1).hexString();
    }
    var ft = Object.create(null), Be = Object.create(null);
    function ne(i4, t3) {
      if (!t3)
        return i4;
      let e4 = t3.split(".");
      for (let n5 = 0, s5 = e4.length; n5 < s5; ++n5) {
        let o5 = e4[n5];
        i4 = i4[o5] || (i4[o5] = Object.create(null));
      }
      return i4;
    }
    function Un(i4, t3, e4) {
      return typeof t3 == "string" ? zt(ne(i4, t3), e4) : zt(ne(i4, ""), t3);
    }
    var _s = class {
      constructor(t3) {
        this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (e4) => e4.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = ["mousemove", "mouseout", "click", "touchstart", "touchmove"], this.font = { family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", size: 12, style: "normal", lineHeight: 1.2, weight: null }, this.hover = {}, this.hoverBackgroundColor = (e4, n5) => $n(n5.backgroundColor), this.hoverBorderColor = (e4, n5) => $n(n5.borderColor), this.hoverColor = (e4, n5) => $n(n5.color), this.indexAxis = "x", this.interaction = { mode: "nearest", intersect: true }, this.maintainAspectRatio = true, this.onHover = null, this.onClick = null, this.parsing = true, this.plugins = {}, this.responsive = true, this.scale = void 0, this.scales = {}, this.showLine = true, this.describe(t3);
      }
      set(t3, e4) {
        return Un(this, t3, e4);
      }
      get(t3) {
        return ne(this, t3);
      }
      describe(t3, e4) {
        return Un(Be, t3, e4);
      }
      override(t3, e4) {
        return Un(ft, t3, e4);
      }
      route(t3, e4, n5, s5) {
        let o5 = ne(this, t3), a4 = ne(this, n5), r4 = "_" + e4;
        Object.defineProperties(o5, { [r4]: { value: o5[e4], writable: true }, [e4]: { enumerable: true, get() {
          let l4 = this[r4], c2 = a4[s5];
          return O(l4) ? Object.assign({}, c2, l4) : C2(l4, c2);
        }, set(l4) {
          this[r4] = l4;
        } } });
      }
    }, k2 = new _s({ _scriptable: (i4) => !i4.startsWith("on"), _indexable: (i4) => i4 !== "events", hover: { _fallback: "interaction" }, interaction: { _scriptable: false, _indexable: false } });
    function za(i4) {
      return !i4 || P2(i4.size) || P2(i4.family) ? null : (i4.style ? i4.style + " " : "") + (i4.weight ? i4.weight + " " : "") + i4.size + "px " + i4.family;
    }
    function ie(i4, t3, e4, n5, s5) {
      let o5 = t3[s5];
      return o5 || (o5 = t3[s5] = i4.measureText(s5).width, e4.push(s5)), o5 > n5 && (n5 = o5), n5;
    }
    function ys(i4, t3, e4, n5) {
      n5 = n5 || {};
      let s5 = n5.data = n5.data || {}, o5 = n5.garbageCollect = n5.garbageCollect || [];
      n5.font !== t3 && (s5 = n5.data = {}, o5 = n5.garbageCollect = [], n5.font = t3), i4.save(), i4.font = t3;
      let a4 = 0, r4 = e4.length, l4, c2, d2, h4, u3;
      for (l4 = 0; l4 < r4; l4++)
        if (h4 = e4[l4], h4 != null && T2(h4) !== true)
          a4 = ie(i4, s5, o5, a4, h4);
        else if (T2(h4))
          for (c2 = 0, d2 = h4.length; c2 < d2; c2++)
            u3 = h4[c2], u3 != null && !T2(u3) && (a4 = ie(i4, s5, o5, a4, u3));
      i4.restore();
      let f2 = o5.length / 2;
      if (f2 > e4.length) {
        for (l4 = 0; l4 < f2; l4++)
          delete s5[o5[l4]];
        o5.splice(0, f2);
      }
      return a4;
    }
    function gt(i4, t3, e4) {
      let n5 = i4.currentDevicePixelRatio, s5 = e4 !== 0 ? Math.max(e4 / 2, 0.5) : 0;
      return Math.round((t3 - s5) * n5) / n5 + s5;
    }
    function Yn(i4, t3) {
      t3 = t3 || i4.getContext("2d"), t3.save(), t3.resetTransform(), t3.clearRect(0, 0, i4.width, i4.height), t3.restore();
    }
    function He(i4, t3, e4, n5) {
      let s5, o5, a4, r4, l4, c2 = t3.pointStyle, d2 = t3.rotation, h4 = t3.radius, u3 = (d2 || 0) * pa;
      if (c2 && typeof c2 == "object" && (s5 = c2.toString(), s5 === "[object HTMLImageElement]" || s5 === "[object HTMLCanvasElement]")) {
        i4.save(), i4.translate(e4, n5), i4.rotate(u3), i4.drawImage(c2, -c2.width / 2, -c2.height / 2, c2.width, c2.height), i4.restore();
        return;
      }
      if (!(isNaN(h4) || h4 <= 0)) {
        switch (i4.beginPath(), c2) {
          default:
            i4.arc(e4, n5, h4, 0, A2), i4.closePath();
            break;
          case "triangle":
            i4.moveTo(e4 + Math.sin(u3) * h4, n5 - Math.cos(u3) * h4), u3 += ns, i4.lineTo(e4 + Math.sin(u3) * h4, n5 - Math.cos(u3) * h4), u3 += ns, i4.lineTo(e4 + Math.sin(u3) * h4, n5 - Math.cos(u3) * h4), i4.closePath();
            break;
          case "rectRounded":
            l4 = h4 * 0.516, r4 = h4 - l4, o5 = Math.cos(u3 + Kt) * r4, a4 = Math.sin(u3 + Kt) * r4, i4.arc(e4 - o5, n5 - a4, l4, u3 - I2, u3 - L2), i4.arc(e4 + a4, n5 - o5, l4, u3 - L2, u3), i4.arc(e4 + o5, n5 + a4, l4, u3, u3 + L2), i4.arc(e4 - a4, n5 + o5, l4, u3 + L2, u3 + I2), i4.closePath();
            break;
          case "rect":
            if (!d2) {
              r4 = Math.SQRT1_2 * h4, i4.rect(e4 - r4, n5 - r4, 2 * r4, 2 * r4);
              break;
            }
            u3 += Kt;
          case "rectRot":
            o5 = Math.cos(u3) * h4, a4 = Math.sin(u3) * h4, i4.moveTo(e4 - o5, n5 - a4), i4.lineTo(e4 + a4, n5 - o5), i4.lineTo(e4 + o5, n5 + a4), i4.lineTo(e4 - a4, n5 + o5), i4.closePath();
            break;
          case "crossRot":
            u3 += Kt;
          case "cross":
            o5 = Math.cos(u3) * h4, a4 = Math.sin(u3) * h4, i4.moveTo(e4 - o5, n5 - a4), i4.lineTo(e4 + o5, n5 + a4), i4.moveTo(e4 + a4, n5 - o5), i4.lineTo(e4 - a4, n5 + o5);
            break;
          case "star":
            o5 = Math.cos(u3) * h4, a4 = Math.sin(u3) * h4, i4.moveTo(e4 - o5, n5 - a4), i4.lineTo(e4 + o5, n5 + a4), i4.moveTo(e4 + a4, n5 - o5), i4.lineTo(e4 - a4, n5 + o5), u3 += Kt, o5 = Math.cos(u3) * h4, a4 = Math.sin(u3) * h4, i4.moveTo(e4 - o5, n5 - a4), i4.lineTo(e4 + o5, n5 + a4), i4.moveTo(e4 + a4, n5 - o5), i4.lineTo(e4 - a4, n5 + o5);
            break;
          case "line":
            o5 = Math.cos(u3) * h4, a4 = Math.sin(u3) * h4, i4.moveTo(e4 - o5, n5 - a4), i4.lineTo(e4 + o5, n5 + a4);
            break;
          case "dash":
            i4.moveTo(e4, n5), i4.lineTo(e4 + Math.cos(u3) * h4, n5 + Math.sin(u3) * h4);
            break;
        }
        i4.fill(), t3.borderWidth > 0 && i4.stroke();
      }
    }
    function Ht(i4, t3, e4) {
      return e4 = e4 || 0.5, i4 && i4.x > t3.left - e4 && i4.x < t3.right + e4 && i4.y > t3.top - e4 && i4.y < t3.bottom + e4;
    }
    function Ve(i4, t3) {
      i4.save(), i4.beginPath(), i4.rect(t3.left, t3.top, t3.right - t3.left, t3.bottom - t3.top), i4.clip();
    }
    function We(i4) {
      i4.restore();
    }
    function vs(i4, t3, e4, n5, s5) {
      if (!t3)
        return i4.lineTo(e4.x, e4.y);
      if (s5 === "middle") {
        let o5 = (t3.x + e4.x) / 2;
        i4.lineTo(o5, t3.y), i4.lineTo(o5, e4.y);
      } else
        s5 === "after" != !!n5 ? i4.lineTo(t3.x, e4.y) : i4.lineTo(e4.x, t3.y);
      i4.lineTo(e4.x, e4.y);
    }
    function ws(i4, t3, e4, n5) {
      if (!t3)
        return i4.lineTo(e4.x, e4.y);
      i4.bezierCurveTo(n5 ? t3.cp1x : t3.cp2x, n5 ? t3.cp1y : t3.cp2y, n5 ? e4.cp2x : e4.cp1x, n5 ? e4.cp2y : e4.cp1y, e4.x, e4.y);
    }
    function se(i4, t3, e4, n5, s5, o5 = {}) {
      let a4 = T2(t3) ? t3 : [t3], r4 = o5.strokeWidth > 0 && o5.strokeColor !== "", l4, c2;
      for (i4.save(), o5.translation && i4.translate(o5.translation[0], o5.translation[1]), P2(o5.rotation) || i4.rotate(o5.rotation), i4.font = s5.string, o5.color && (i4.fillStyle = o5.color), o5.textAlign && (i4.textAlign = o5.textAlign), o5.textBaseline && (i4.textBaseline = o5.textBaseline), l4 = 0; l4 < a4.length; ++l4) {
        if (c2 = a4[l4], r4 && (o5.strokeColor && (i4.strokeStyle = o5.strokeColor), P2(o5.strokeWidth) || (i4.lineWidth = o5.strokeWidth), i4.strokeText(c2, e4, n5, o5.maxWidth)), i4.fillText(c2, e4, n5, o5.maxWidth), o5.strikethrough || o5.underline) {
          let d2 = i4.measureText(c2), h4 = e4 - d2.actualBoundingBoxLeft, u3 = e4 + d2.actualBoundingBoxRight, f2 = n5 - d2.actualBoundingBoxAscent, g2 = n5 + d2.actualBoundingBoxDescent, p2 = o5.strikethrough ? (f2 + g2) / 2 : g2;
          i4.strokeStyle = i4.fillStyle, i4.beginPath(), i4.lineWidth = o5.decorationWidth || 2, i4.moveTo(h4, p2), i4.lineTo(u3, p2), i4.stroke();
        }
        n5 += s5.lineHeight;
      }
      i4.restore();
    }
    function Ne(i4, t3) {
      let { x: e4, y: n5, w: s5, h: o5, radius: a4 } = t3;
      i4.arc(e4 + a4.topLeft, n5 + a4.topLeft, a4.topLeft, -L2, I2, true), i4.lineTo(e4, n5 + o5 - a4.bottomLeft), i4.arc(e4 + a4.bottomLeft, n5 + o5 - a4.bottomLeft, a4.bottomLeft, I2, L2, true), i4.lineTo(e4 + s5 - a4.bottomRight, n5 + o5), i4.arc(e4 + s5 - a4.bottomRight, n5 + o5 - a4.bottomRight, a4.bottomRight, L2, 0, true), i4.lineTo(e4 + s5, n5 + a4.topRight), i4.arc(e4 + s5 - a4.topRight, n5 + a4.topRight, a4.topRight, 0, -L2, true), i4.lineTo(e4 + a4.topLeft, n5);
    }
    var Ia = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/), Ba = new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);
    function Ha(i4, t3) {
      let e4 = ("" + i4).match(Ia);
      if (!e4 || e4[1] === "normal")
        return t3 * 1.2;
      switch (i4 = +e4[2], e4[3]) {
        case "px":
          return i4;
        case "%":
          i4 /= 100;
          break;
      }
      return t3 * i4;
    }
    var Va = (i4) => +i4 || 0;
    function je(i4, t3) {
      let e4 = {}, n5 = O(t3), s5 = n5 ? Object.keys(t3) : t3, o5 = O(i4) ? n5 ? (a4) => C2(i4[a4], i4[t3[a4]]) : (a4) => i4[a4] : () => i4;
      for (let a4 of s5)
        e4[a4] = Va(o5(a4));
      return e4;
    }
    function Xn(i4) {
      return je(i4, { top: "y", right: "x", bottom: "y", left: "x" });
    }
    function qn(i4) {
      return je(i4, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
    }
    function G(i4) {
      let t3 = Xn(i4);
      return t3.width = t3.left + t3.right, t3.height = t3.top + t3.bottom, t3;
    }
    function N2(i4, t3) {
      i4 = i4 || {}, t3 = t3 || k2.font;
      let e4 = C2(i4.size, t3.size);
      typeof e4 == "string" && (e4 = parseInt(e4, 10));
      let n5 = C2(i4.style, t3.style);
      n5 && !("" + n5).match(Ba) && (console.warn('Invalid font style specified: "' + n5 + '"'), n5 = "");
      let s5 = { family: C2(i4.family, t3.family), lineHeight: Ha(C2(i4.lineHeight, t3.lineHeight), e4), size: e4, style: n5, weight: C2(i4.weight, t3.weight), string: "" };
      return s5.string = za(s5), s5;
    }
    function oe(i4, t3, e4, n5) {
      let s5 = true, o5, a4, r4;
      for (o5 = 0, a4 = i4.length; o5 < a4; ++o5)
        if (r4 = i4[o5], r4 !== void 0 && (t3 !== void 0 && typeof r4 == "function" && (r4 = r4(t3), s5 = false), e4 !== void 0 && T2(r4) && (r4 = r4[e4 % r4.length], s5 = false), r4 !== void 0))
          return n5 && !s5 && (n5.cacheable = false), r4;
    }
    function Ss(i4, t3) {
      let { min: e4, max: n5 } = i4;
      return { min: e4 - Math.abs(Ce(t3, e4)), max: n5 + Ce(t3, n5) };
    }
    function ae(i4, t3, e4) {
      e4 = e4 || ((a4) => i4[a4] < t3);
      let n5 = i4.length - 1, s5 = 0, o5;
      for (; n5 - s5 > 1; )
        o5 = s5 + n5 >> 1, e4(o5) ? s5 = o5 : n5 = o5;
      return { lo: s5, hi: n5 };
    }
    var Vt = (i4, t3, e4) => ae(i4, e4, (n5) => i4[n5][t3] < e4), Ms = (i4, t3, e4) => ae(i4, e4, (n5) => i4[n5][t3] >= e4);
    function ks(i4, t3, e4) {
      let n5 = 0, s5 = i4.length;
      for (; n5 < s5 && i4[n5] < t3; )
        n5++;
      for (; s5 > n5 && i4[s5 - 1] > e4; )
        s5--;
      return n5 > 0 || s5 < i4.length ? i4.slice(n5, s5) : i4;
    }
    var Ps = ["push", "pop", "shift", "splice", "unshift"];
    function Cs(i4, t3) {
      if (i4._chartjs) {
        i4._chartjs.listeners.push(t3);
        return;
      }
      Object.defineProperty(i4, "_chartjs", { configurable: true, enumerable: false, value: { listeners: [t3] } }), Ps.forEach((e4) => {
        let n5 = "_onData" + Oe(e4), s5 = i4[e4];
        Object.defineProperty(i4, e4, { configurable: true, enumerable: false, value(...o5) {
          let a4 = s5.apply(this, o5);
          return i4._chartjs.listeners.forEach((r4) => {
            typeof r4[n5] == "function" && r4[n5](...o5);
          }), a4;
        } });
      });
    }
    function Kn(i4, t3) {
      let e4 = i4._chartjs;
      if (!e4)
        return;
      let n5 = e4.listeners, s5 = n5.indexOf(t3);
      s5 !== -1 && n5.splice(s5, 1), !(n5.length > 0) && (Ps.forEach((o5) => {
        delete i4[o5];
      }), delete i4._chartjs);
    }
    function Gn(i4) {
      let t3 = new Set(), e4, n5;
      for (e4 = 0, n5 = i4.length; e4 < n5; ++e4)
        t3.add(i4[e4]);
      if (t3.size === n5)
        return i4;
      let s5 = [];
      return t3.forEach((o5) => {
        s5.push(o5);
      }), s5;
    }
    function $e(i4, t3 = [""], e4 = i4, n5, s5 = () => i4[0]) {
      q(n5) || (n5 = Rs("_fallback", i4));
      let o5 = { [Symbol.toStringTag]: "Object", _cacheable: true, _scopes: i4, _rootScopes: e4, _fallback: n5, _getTarget: s5, override: (a4) => $e([a4, ...i4], t3, e4, n5) };
      return new Proxy(o5, { deleteProperty(a4, r4) {
        return delete a4[r4], delete a4._keys, delete i4[0][r4], true;
      }, get(a4, r4) {
        return Os(a4, r4, () => Xa(r4, t3, i4, a4));
      }, getOwnPropertyDescriptor(a4, r4) {
        return Reflect.getOwnPropertyDescriptor(a4._scopes[0], r4);
      }, getPrototypeOf() {
        return Reflect.getPrototypeOf(i4[0]);
      }, has(a4, r4) {
        return Ls(a4).includes(r4);
      }, ownKeys(a4) {
        return Ls(a4);
      }, set(a4, r4, l4) {
        let c2 = a4._storage || (a4._storage = s5());
        return c2[r4] = l4, delete a4[r4], delete a4._keys, true;
      } });
    }
    function kt(i4, t3, e4, n5) {
      let s5 = { _cacheable: false, _proxy: i4, _context: t3, _subProxy: e4, _stack: new Set(), _descriptors: Zn(i4, n5), setContext: (o5) => kt(i4, o5, e4, n5), override: (o5) => kt(i4.override(o5), t3, e4, n5) };
      return new Proxy(s5, { deleteProperty(o5, a4) {
        return delete o5[a4], delete i4[a4], true;
      }, get(o5, a4, r4) {
        return Os(o5, a4, () => Na(o5, a4, r4));
      }, getOwnPropertyDescriptor(o5, a4) {
        return o5._descriptors.allKeys ? Reflect.has(i4, a4) ? { enumerable: true, configurable: true } : void 0 : Reflect.getOwnPropertyDescriptor(i4, a4);
      }, getPrototypeOf() {
        return Reflect.getPrototypeOf(i4);
      }, has(o5, a4) {
        return Reflect.has(i4, a4);
      }, ownKeys() {
        return Reflect.ownKeys(i4);
      }, set(o5, a4, r4) {
        return i4[a4] = r4, delete o5[a4], true;
      } });
    }
    function Zn(i4, t3 = { scriptable: true, indexable: true }) {
      let { _scriptable: e4 = t3.scriptable, _indexable: n5 = t3.indexable, _allKeys: s5 = t3.allKeys } = i4;
      return { allKeys: s5, scriptable: e4, indexable: n5, isScriptable: St(e4) ? e4 : () => e4, isIndexable: St(n5) ? n5 : () => n5 };
    }
    var Wa = (i4, t3) => i4 ? i4 + Oe(t3) : t3, Ds = (i4, t3) => O(t3) && i4 !== "adapters";
    function Os(i4, t3, e4) {
      let n5 = i4[t3];
      return q(n5) || (n5 = e4(), q(n5) && (i4[t3] = n5)), n5;
    }
    function Na(i4, t3, e4) {
      let { _proxy: n5, _context: s5, _subProxy: o5, _descriptors: a4 } = i4, r4 = n5[t3];
      return St(r4) && a4.isScriptable(t3) && (r4 = ja(t3, r4, i4, e4)), T2(r4) && r4.length && (r4 = $a(t3, r4, i4, a4.isIndexable)), Ds(t3, r4) && (r4 = kt(r4, s5, o5 && o5[t3], a4)), r4;
    }
    function ja(i4, t3, e4, n5) {
      let { _proxy: s5, _context: o5, _subProxy: a4, _stack: r4 } = e4;
      if (r4.has(i4))
        throw new Error("Recursion detected: " + [...r4].join("->") + "->" + i4);
      return r4.add(i4), t3 = t3(o5, a4 || n5), r4.delete(i4), O(t3) && (t3 = Jn(s5._scopes, s5, i4, t3)), t3;
    }
    function $a(i4, t3, e4, n5) {
      let { _proxy: s5, _context: o5, _subProxy: a4, _descriptors: r4 } = e4;
      if (q(o5.index) && n5(i4))
        t3 = t3[o5.index % t3.length];
      else if (O(t3[0])) {
        let l4 = t3, c2 = s5._scopes.filter((d2) => d2 !== l4);
        t3 = [];
        for (let d2 of l4) {
          let h4 = Jn(c2, s5, i4, d2);
          t3.push(kt(h4, o5, a4 && a4[i4], r4));
        }
      }
      return t3;
    }
    function As(i4, t3, e4) {
      return St(i4) ? i4(t3, e4) : i4;
    }
    var Ua = (i4, t3) => i4 === true ? t3 : typeof i4 == "string" ? ot(t3, i4) : void 0;
    function Ya(i4, t3, e4, n5) {
      for (let s5 of t3) {
        let o5 = Ua(e4, s5);
        if (o5) {
          i4.add(o5);
          let a4 = As(o5._fallback, e4, o5);
          if (q(a4) && a4 !== e4 && a4 !== n5)
            return a4;
        } else if (o5 === false && q(n5) && e4 !== n5)
          return null;
      }
      return false;
    }
    function Jn(i4, t3, e4, n5) {
      let s5 = t3._rootScopes, o5 = As(t3._fallback, e4, n5), a4 = [...i4, ...s5], r4 = new Set();
      r4.add(n5);
      let l4 = Ts(r4, a4, e4, o5 || e4);
      return l4 === null || q(o5) && o5 !== e4 && (l4 = Ts(r4, a4, o5, l4), l4 === null) ? false : $e([...r4], [""], s5, o5, () => {
        let c2 = t3._getTarget();
        return e4 in c2 || (c2[e4] = {}), c2[e4];
      });
    }
    function Ts(i4, t3, e4, n5) {
      for (; e4; )
        e4 = Ya(i4, t3, e4, n5);
      return e4;
    }
    function Xa(i4, t3, e4, n5) {
      let s5;
      for (let o5 of t3)
        if (s5 = Rs(Wa(o5, i4), e4), q(s5))
          return Ds(i4, s5) ? Jn(e4, n5, i4, s5) : s5;
    }
    function Rs(i4, t3) {
      for (let e4 of t3) {
        if (!e4)
          continue;
        let n5 = e4[i4];
        if (q(n5))
          return n5;
      }
    }
    function Ls(i4) {
      let t3 = i4._keys;
      return t3 || (t3 = i4._keys = qa(i4._scopes)), t3;
    }
    function qa(i4) {
      let t3 = new Set();
      for (let e4 of i4)
        for (let n5 of Object.keys(e4).filter((s5) => !s5.startsWith("_")))
          t3.add(n5);
      return [...t3];
    }
    var Ka = Number.EPSILON || 1e-14, Wt = (i4, t3) => t3 < i4.length && !i4[t3].skip && i4[t3];
    function Ga(i4, t3, e4, n5) {
      let s5 = i4.skip ? t3 : i4, o5 = t3, a4 = e4.skip ? t3 : e4, r4 = Re(o5, s5), l4 = Re(a4, o5), c2 = r4 / (r4 + l4), d2 = l4 / (r4 + l4);
      c2 = isNaN(c2) ? 0 : c2, d2 = isNaN(d2) ? 0 : d2;
      let h4 = n5 * c2, u3 = n5 * d2;
      return { previous: { x: o5.x - h4 * (a4.x - s5.x), y: o5.y - h4 * (a4.y - s5.y) }, next: { x: o5.x + u3 * (a4.x - s5.x), y: o5.y + u3 * (a4.y - s5.y) } };
    }
    function Za(i4, t3, e4) {
      let n5 = i4.length, s5, o5, a4, r4, l4, c2 = Wt(i4, 0);
      for (let d2 = 0; d2 < n5 - 1; ++d2)
        if (l4 = c2, c2 = Wt(i4, d2 + 1), !(!l4 || !c2)) {
          if (Gt(t3[d2], 0, Ka)) {
            e4[d2] = e4[d2 + 1] = 0;
            continue;
          }
          s5 = e4[d2] / t3[d2], o5 = e4[d2 + 1] / t3[d2], r4 = Math.pow(s5, 2) + Math.pow(o5, 2), !(r4 <= 9) && (a4 = 3 / Math.sqrt(r4), e4[d2] = s5 * a4 * t3[d2], e4[d2 + 1] = o5 * a4 * t3[d2]);
        }
    }
    function Ja(i4, t3) {
      let e4 = i4.length, n5, s5, o5, a4 = Wt(i4, 0);
      for (let r4 = 0; r4 < e4; ++r4) {
        if (s5 = o5, o5 = a4, a4 = Wt(i4, r4 + 1), !o5)
          continue;
        let { x: l4, y: c2 } = o5;
        s5 && (n5 = (l4 - s5.x) / 3, o5.cp1x = l4 - n5, o5.cp1y = c2 - n5 * t3[r4]), a4 && (n5 = (a4.x - l4) / 3, o5.cp2x = l4 + n5, o5.cp2y = c2 + n5 * t3[r4]);
      }
    }
    function Qa(i4) {
      let t3 = i4.length, e4 = Array(t3).fill(0), n5 = Array(t3), s5, o5, a4, r4 = Wt(i4, 0);
      for (s5 = 0; s5 < t3; ++s5)
        if (o5 = a4, a4 = r4, r4 = Wt(i4, s5 + 1), !!a4) {
          if (r4) {
            let l4 = r4.x - a4.x;
            e4[s5] = l4 !== 0 ? (r4.y - a4.y) / l4 : 0;
          }
          n5[s5] = o5 ? r4 ? at(e4[s5 - 1]) !== at(e4[s5]) ? 0 : (e4[s5 - 1] + e4[s5]) / 2 : e4[s5 - 1] : e4[s5];
        }
      Za(i4, e4, n5), Ja(i4, n5);
    }
    function Ue(i4, t3, e4) {
      return Math.max(Math.min(i4, e4), t3);
    }
    function tr(i4, t3) {
      let e4, n5, s5, o5, a4, r4 = Ht(i4[0], t3);
      for (e4 = 0, n5 = i4.length; e4 < n5; ++e4)
        a4 = o5, o5 = r4, r4 = e4 < n5 - 1 && Ht(i4[e4 + 1], t3), !!o5 && (s5 = i4[e4], a4 && (s5.cp1x = Ue(s5.cp1x, t3.left, t3.right), s5.cp1y = Ue(s5.cp1y, t3.top, t3.bottom)), r4 && (s5.cp2x = Ue(s5.cp2x, t3.left, t3.right), s5.cp2y = Ue(s5.cp2y, t3.top, t3.bottom)));
    }
    function Es(i4, t3, e4, n5) {
      let s5, o5, a4, r4;
      if (t3.spanGaps && (i4 = i4.filter((l4) => !l4.skip)), t3.cubicInterpolationMode === "monotone")
        Qa(i4);
      else {
        let l4 = n5 ? i4[i4.length - 1] : i4[0];
        for (s5 = 0, o5 = i4.length; s5 < o5; ++s5)
          a4 = i4[s5], r4 = Ga(l4, a4, i4[Math.min(s5 + 1, o5 - (n5 ? 0 : 1)) % o5], t3.tension), a4.cp1x = r4.previous.x, a4.cp1y = r4.previous.y, a4.cp2x = r4.next.x, a4.cp2y = r4.next.y, l4 = a4;
      }
      t3.capBezierPoints && tr(i4, e4);
    }
    function pt(i4) {
      let t3 = i4.parentNode;
      return t3 && t3.toString() === "[object ShadowRoot]" && (t3 = t3.host), t3;
    }
    function Ye(i4, t3, e4) {
      let n5;
      return typeof i4 == "string" ? (n5 = parseInt(i4, 10), i4.indexOf("%") !== -1 && (n5 = n5 / 100 * t3.parentNode[e4])) : n5 = i4, n5;
    }
    var Xe = (i4) => window.getComputedStyle(i4, null);
    function er(i4, t3) {
      return Xe(i4).getPropertyValue(t3);
    }
    var nr = ["top", "right", "bottom", "left"];
    function Pt(i4, t3, e4) {
      let n5 = {};
      e4 = e4 ? "-" + e4 : "";
      for (let s5 = 0; s5 < 4; s5++) {
        let o5 = nr[s5];
        n5[o5] = parseFloat(i4[t3 + "-" + o5 + e4]) || 0;
      }
      return n5.width = n5.left + n5.right, n5.height = n5.top + n5.bottom, n5;
    }
    var ir = (i4, t3, e4) => (i4 > 0 || t3 > 0) && (!e4 || !e4.shadowRoot);
    function sr(i4, t3) {
      let e4 = i4.native || i4, n5 = e4.touches, s5 = n5 && n5.length ? n5[0] : e4, { offsetX: o5, offsetY: a4 } = s5, r4 = false, l4, c2;
      if (ir(o5, a4, e4.target))
        l4 = o5, c2 = a4;
      else {
        let d2 = t3.getBoundingClientRect();
        l4 = s5.clientX - d2.left, c2 = s5.clientY - d2.top, r4 = true;
      }
      return { x: l4, y: c2, box: r4 };
    }
    function Qn(i4, t3) {
      let { canvas: e4, currentDevicePixelRatio: n5 } = t3, s5 = Xe(e4), o5 = s5.boxSizing === "border-box", a4 = Pt(s5, "padding"), r4 = Pt(s5, "border", "width"), { x: l4, y: c2, box: d2 } = sr(i4, e4), h4 = a4.left + (d2 && r4.left), u3 = a4.top + (d2 && r4.top), { width: f2, height: g2 } = t3;
      return o5 && (f2 -= a4.width + r4.width, g2 -= a4.height + r4.height), { x: Math.round((l4 - h4) / f2 * e4.width / n5), y: Math.round((c2 - u3) / g2 * e4.height / n5) };
    }
    function or(i4, t3, e4) {
      let n5, s5;
      if (t3 === void 0 || e4 === void 0) {
        let o5 = pt(i4);
        if (!o5)
          t3 = i4.clientWidth, e4 = i4.clientHeight;
        else {
          let a4 = o5.getBoundingClientRect(), r4 = Xe(o5), l4 = Pt(r4, "border", "width"), c2 = Pt(r4, "padding");
          t3 = a4.width - c2.width - l4.width, e4 = a4.height - c2.height - l4.height, n5 = Ye(r4.maxWidth, o5, "clientWidth"), s5 = Ye(r4.maxHeight, o5, "clientHeight");
        }
      }
      return { width: t3, height: e4, maxWidth: n5 || Ae, maxHeight: s5 || Ae };
    }
    var ti = (i4) => Math.round(i4 * 10) / 10;
    function Fs(i4, t3, e4, n5) {
      let s5 = Xe(i4), o5 = Pt(s5, "margin"), a4 = Ye(s5.maxWidth, i4, "clientWidth") || Ae, r4 = Ye(s5.maxHeight, i4, "clientHeight") || Ae, l4 = or(i4, t3, e4), { width: c2, height: d2 } = l4;
      if (s5.boxSizing === "content-box") {
        let h4 = Pt(s5, "border", "width"), u3 = Pt(s5, "padding");
        c2 -= u3.width + h4.width, d2 -= u3.height + h4.height;
      }
      return c2 = Math.max(0, c2 - o5.width), d2 = Math.max(0, n5 ? Math.floor(c2 / n5) : d2 - o5.height), c2 = ti(Math.min(c2, a4, l4.maxWidth)), d2 = ti(Math.min(d2, r4, l4.maxHeight)), c2 && !d2 && (d2 = ti(c2 / 2)), { width: c2, height: d2 };
    }
    function ei(i4, t3, e4) {
      let n5 = i4.currentDevicePixelRatio = t3 || 1, { canvas: s5, width: o5, height: a4 } = i4;
      s5.height = a4 * n5, s5.width = o5 * n5, i4.ctx.setTransform(n5, 0, 0, n5, 0, 0), s5.style && (e4 || !s5.style.height && !s5.style.width) && (s5.style.height = a4 + "px", s5.style.width = o5 + "px");
    }
    var zs = function() {
      let i4 = false;
      try {
        let t3 = { get passive() {
          return i4 = true, false;
        } };
        window.addEventListener("test", null, t3), window.removeEventListener("test", null, t3);
      } catch (t3) {
      }
      return i4;
    }();
    function ni(i4, t3) {
      let e4 = er(i4, t3), n5 = e4 && e4.match(/^(\d+)(\.\d+)?px$/);
      return n5 ? +n5[1] : void 0;
    }
    function mt(i4, t3, e4, n5) {
      return { x: i4.x + e4 * (t3.x - i4.x), y: i4.y + e4 * (t3.y - i4.y) };
    }
    function Is(i4, t3, e4, n5) {
      return { x: i4.x + e4 * (t3.x - i4.x), y: n5 === "middle" ? e4 < 0.5 ? i4.y : t3.y : n5 === "after" ? e4 < 1 ? i4.y : t3.y : e4 > 0 ? t3.y : i4.y };
    }
    function Bs(i4, t3, e4, n5) {
      let s5 = { x: i4.cp2x, y: i4.cp2y }, o5 = { x: t3.cp1x, y: t3.cp1y }, a4 = mt(i4, s5, e4), r4 = mt(s5, o5, e4), l4 = mt(o5, t3, e4), c2 = mt(a4, r4, e4), d2 = mt(r4, l4, e4);
      return mt(c2, d2, e4);
    }
    var Hs = new Map();
    function ar(i4, t3) {
      t3 = t3 || {};
      let e4 = i4 + JSON.stringify(t3), n5 = Hs.get(e4);
      return n5 || (n5 = new Intl.NumberFormat(i4, t3), Hs.set(e4, n5)), n5;
    }
    function re(i4, t3, e4) {
      return ar(t3, e4).format(i4);
    }
    var rr = function(i4, t3) {
      return { x(e4) {
        return i4 + i4 + t3 - e4;
      }, setWidth(e4) {
        t3 = e4;
      }, textAlign(e4) {
        return e4 === "center" ? e4 : e4 === "right" ? "left" : "right";
      }, xPlus(e4, n5) {
        return e4 - n5;
      }, leftForLtr(e4, n5) {
        return e4 - n5;
      } };
    }, lr = function() {
      return { x(i4) {
        return i4;
      }, setWidth(i4) {
      }, textAlign(i4) {
        return i4;
      }, xPlus(i4, t3) {
        return i4 + t3;
      }, leftForLtr(i4, t3) {
        return i4;
      } };
    };
    function qe(i4, t3, e4) {
      return i4 ? rr(t3, e4) : lr();
    }
    function Vs(i4, t3) {
      let e4, n5;
      (t3 === "ltr" || t3 === "rtl") && (e4 = i4.canvas.style, n5 = [e4.getPropertyValue("direction"), e4.getPropertyPriority("direction")], e4.setProperty("direction", t3, "important"), i4.prevTextDirection = n5);
    }
    function Ws(i4, t3) {
      t3 !== void 0 && (delete i4.prevTextDirection, i4.canvas.style.setProperty("direction", t3[0], t3[1]));
    }
    function Ns(i4) {
      return i4 === "angle" ? { between: Zt, compare: ma, normalize: tt } : { between: (t3, e4, n5) => t3 >= Math.min(e4, n5) && t3 <= Math.max(n5, e4), compare: (t3, e4) => t3 - e4, normalize: (t3) => t3 };
    }
    function js({ start: i4, end: t3, count: e4, loop: n5, style: s5 }) {
      return { start: i4 % e4, end: t3 % e4, loop: n5 && (t3 - i4 + 1) % e4 == 0, style: s5 };
    }
    function cr(i4, t3, e4) {
      let { property: n5, start: s5, end: o5 } = e4, { between: a4, normalize: r4 } = Ns(n5), l4 = t3.length, { start: c2, end: d2, loop: h4 } = i4, u3, f2;
      if (h4) {
        for (c2 += l4, d2 += l4, u3 = 0, f2 = l4; u3 < f2 && a4(r4(t3[c2 % l4][n5]), s5, o5); ++u3)
          c2--, d2--;
        c2 %= l4, d2 %= l4;
      }
      return d2 < c2 && (d2 += l4), { start: c2, end: d2, loop: h4, style: i4.style };
    }
    function $s(i4, t3, e4) {
      if (!e4)
        return [i4];
      let { property: n5, start: s5, end: o5 } = e4, a4 = t3.length, { compare: r4, between: l4, normalize: c2 } = Ns(n5), { start: d2, end: h4, loop: u3, style: f2 } = cr(i4, t3, e4), g2 = [], p2 = false, m2 = null, b2, _2, y2, x2 = () => l4(s5, y2, b2) && r4(s5, y2) !== 0, v2 = () => r4(o5, b2) === 0 || l4(o5, y2, b2), w2 = () => p2 || x2(), S3 = () => !p2 || v2();
      for (let M2 = d2, z2 = d2; M2 <= h4; ++M2)
        _2 = t3[M2 % a4], !_2.skip && (b2 = c2(_2[n5]), p2 = l4(b2, s5, o5), m2 === null && w2() && (m2 = r4(b2, s5) === 0 ? M2 : z2), m2 !== null && S3() && (g2.push(js({ start: m2, end: M2, loop: u3, count: a4, style: f2 })), m2 = null), z2 = M2, y2 = b2);
      return m2 !== null && g2.push(js({ start: m2, end: h4, loop: u3, count: a4, style: f2 })), g2;
    }
    function Us(i4, t3) {
      let e4 = [], n5 = i4.segments;
      for (let s5 = 0; s5 < n5.length; s5++) {
        let o5 = $s(n5[s5], i4.points, t3);
        o5.length && e4.push(...o5);
      }
      return e4;
    }
    function dr(i4, t3, e4, n5) {
      let s5 = 0, o5 = t3 - 1;
      if (e4 && !n5)
        for (; s5 < t3 && !i4[s5].skip; )
          s5++;
      for (; s5 < t3 && i4[s5].skip; )
        s5++;
      for (s5 %= t3, e4 && (o5 += s5); o5 > s5 && i4[o5 % t3].skip; )
        o5--;
      return o5 %= t3, { start: s5, end: o5 };
    }
    function hr(i4, t3, e4, n5) {
      let s5 = i4.length, o5 = [], a4 = t3, r4 = i4[t3], l4;
      for (l4 = t3 + 1; l4 <= e4; ++l4) {
        let c2 = i4[l4 % s5];
        c2.skip || c2.stop ? r4.skip || (n5 = false, o5.push({ start: t3 % s5, end: (l4 - 1) % s5, loop: n5 }), t3 = a4 = c2.stop ? l4 : null) : (a4 = l4, r4.skip && (t3 = l4)), r4 = c2;
      }
      return a4 !== null && o5.push({ start: t3 % s5, end: a4 % s5, loop: n5 }), o5;
    }
    function Ys(i4, t3) {
      let e4 = i4.points, n5 = i4.options.spanGaps, s5 = e4.length;
      if (!s5)
        return [];
      let o5 = !!i4._loop, { start: a4, end: r4 } = dr(e4, s5, o5, n5);
      if (n5 === true)
        return Xs([{ start: a4, end: r4, loop: o5 }], e4, t3);
      let l4 = r4 < a4 ? r4 + s5 : r4, c2 = !!i4._fullLoop && a4 === 0 && r4 === s5 - 1;
      return Xs(hr(e4, a4, l4, c2), e4, t3);
    }
    function Xs(i4, t3, e4) {
      return !e4 || !e4.setContext || !t3 ? i4 : ur(i4, t3, e4);
    }
    function ur(i4, t3, e4) {
      let n5 = t3.length, s5 = [], o5 = i4[0].start, a4 = o5;
      for (let r4 of i4) {
        let l4, c2, d2 = t3[o5 % n5];
        for (a4 = o5 + 1; a4 <= r4.end; a4++) {
          let h4 = t3[a4 % n5];
          c2 = fr(e4.setContext({ type: "segment", p0: d2, p1: h4 })), gr(c2, l4) && (s5.push({ start: o5, end: a4 - 1, loop: r4.loop, style: l4 }), l4 = c2, o5 = a4 - 1), d2 = h4, l4 = c2;
        }
        o5 < a4 - 1 && (s5.push({ start: o5, end: a4 - 1, loop: r4.loop, style: c2 }), o5 = a4 - 1);
      }
      return s5;
    }
    function fr(i4) {
      return { backgroundColor: i4.backgroundColor, borderCapStyle: i4.borderCapStyle, borderDash: i4.borderDash, borderDashOffset: i4.borderDashOffset, borderJoinStyle: i4.borderJoinStyle, borderWidth: i4.borderWidth, borderColor: i4.borderColor };
    }
    function gr(i4, t3) {
      return t3 && JSON.stringify(i4) !== JSON.stringify(t3);
    }
    var qs = class {
      constructor() {
        this._request = null, this._charts = new Map(), this._running = false, this._lastDate = void 0;
      }
      _notify(t3, e4, n5, s5) {
        let o5 = e4.listeners[s5], a4 = e4.duration;
        o5.forEach((r4) => r4({ chart: t3, initial: e4.initial, numSteps: a4, currentStep: Math.min(n5 - e4.start, a4) }));
      }
      _refresh() {
        let t3 = this;
        t3._request || (t3._running = true, t3._request = Ln.call(window, () => {
          t3._update(), t3._request = null, t3._running && t3._refresh();
        }));
      }
      _update(t3 = Date.now()) {
        let e4 = this, n5 = 0;
        e4._charts.forEach((s5, o5) => {
          if (!s5.running || !s5.items.length)
            return;
          let a4 = s5.items, r4 = a4.length - 1, l4 = false, c2;
          for (; r4 >= 0; --r4)
            c2 = a4[r4], c2._active ? (c2._total > s5.duration && (s5.duration = c2._total), c2.tick(t3), l4 = true) : (a4[r4] = a4[a4.length - 1], a4.pop());
          l4 && (o5.draw(), e4._notify(o5, s5, t3, "progress")), a4.length || (s5.running = false, e4._notify(o5, s5, t3, "complete"), s5.initial = false), n5 += a4.length;
        }), e4._lastDate = t3, n5 === 0 && (e4._running = false);
      }
      _getAnims(t3) {
        let e4 = this._charts, n5 = e4.get(t3);
        return n5 || (n5 = { running: false, initial: true, items: [], listeners: { complete: [], progress: [] } }, e4.set(t3, n5)), n5;
      }
      listen(t3, e4, n5) {
        this._getAnims(t3).listeners[e4].push(n5);
      }
      add(t3, e4) {
        !e4 || !e4.length || this._getAnims(t3).items.push(...e4);
      }
      has(t3) {
        return this._getAnims(t3).items.length > 0;
      }
      start(t3) {
        let e4 = this._charts.get(t3);
        !e4 || (e4.running = true, e4.start = Date.now(), e4.duration = e4.items.reduce((n5, s5) => Math.max(n5, s5._duration), 0), this._refresh());
      }
      running(t3) {
        if (!this._running)
          return false;
        let e4 = this._charts.get(t3);
        return !(!e4 || !e4.running || !e4.items.length);
      }
      stop(t3) {
        let e4 = this._charts.get(t3);
        if (!e4 || !e4.items.length)
          return;
        let n5 = e4.items, s5 = n5.length - 1;
        for (; s5 >= 0; --s5)
          n5[s5].cancel();
        e4.items = [], this._notify(t3, e4, Date.now(), "complete");
      }
      remove(t3) {
        return this._charts.delete(t3);
      }
    }, rt = new qs(), Ks = "transparent", pr = { boolean(i4, t3, e4) {
      return e4 > 0.5 ? t3 : i4;
    }, color(i4, t3, e4) {
      let n5 = jn(i4 || Ks), s5 = n5.valid && jn(t3 || Ks);
      return s5 && s5.valid ? s5.mix(n5, e4).hexString() : t3;
    }, number(i4, t3, e4) {
      return i4 + (t3 - i4) * e4;
    } }, Gs = class {
      constructor(t3, e4, n5, s5) {
        let o5 = e4[n5];
        s5 = oe([t3.to, s5, o5, t3.from]);
        let a4 = oe([t3.from, o5, s5]);
        this._active = true, this._fn = t3.fn || pr[t3.type || typeof a4], this._easing = Bt[t3.easing] || Bt.linear, this._start = Math.floor(Date.now() + (t3.delay || 0)), this._duration = this._total = Math.floor(t3.duration), this._loop = !!t3.loop, this._target = e4, this._prop = n5, this._from = a4, this._to = s5, this._promises = void 0;
      }
      active() {
        return this._active;
      }
      update(t3, e4, n5) {
        let s5 = this;
        if (s5._active) {
          s5._notify(false);
          let o5 = s5._target[s5._prop], a4 = n5 - s5._start, r4 = s5._duration - a4;
          s5._start = n5, s5._duration = Math.floor(Math.max(r4, t3.duration)), s5._total += a4, s5._loop = !!t3.loop, s5._to = oe([t3.to, e4, o5, t3.from]), s5._from = oe([t3.from, o5, e4]);
        }
      }
      cancel() {
        let t3 = this;
        t3._active && (t3.tick(Date.now()), t3._active = false, t3._notify(false));
      }
      tick(t3) {
        let e4 = this, n5 = t3 - e4._start, s5 = e4._duration, o5 = e4._prop, a4 = e4._from, r4 = e4._loop, l4 = e4._to, c2;
        if (e4._active = a4 !== l4 && (r4 || n5 < s5), !e4._active) {
          e4._target[o5] = l4, e4._notify(true);
          return;
        }
        if (n5 < 0) {
          e4._target[o5] = a4;
          return;
        }
        c2 = n5 / s5 % 2, c2 = r4 && c2 > 1 ? 2 - c2 : c2, c2 = e4._easing(Math.min(1, Math.max(0, c2))), e4._target[o5] = e4._fn(a4, l4, c2);
      }
      wait() {
        let t3 = this._promises || (this._promises = []);
        return new Promise((e4, n5) => {
          t3.push({ res: e4, rej: n5 });
        });
      }
      _notify(t3) {
        let e4 = t3 ? "res" : "rej", n5 = this._promises || [];
        for (let s5 = 0; s5 < n5.length; s5++)
          n5[s5][e4]();
      }
    }, mr = ["x", "y", "borderWidth", "radius", "tension"], br = ["color", "borderColor", "backgroundColor"];
    k2.set("animation", { delay: void 0, duration: 1e3, easing: "easeOutQuart", fn: void 0, from: void 0, loop: void 0, to: void 0, type: void 0 });
    var xr = Object.keys(k2.animation);
    k2.describe("animation", { _fallback: false, _indexable: false, _scriptable: (i4) => i4 !== "onProgress" && i4 !== "onComplete" && i4 !== "fn" });
    k2.set("animations", { colors: { type: "color", properties: br }, numbers: { type: "number", properties: mr } });
    k2.describe("animations", { _fallback: "animation" });
    k2.set("transitions", { active: { animation: { duration: 400 } }, resize: { animation: { duration: 0 } }, show: { animations: { colors: { from: "transparent" }, visible: { type: "boolean", duration: 0 } } }, hide: { animations: { colors: { to: "transparent" }, visible: { type: "boolean", easing: "linear", fn: (i4) => i4 | 0 } } } });
    var ii = class {
      constructor(t3, e4) {
        this._chart = t3, this._properties = new Map(), this.configure(e4);
      }
      configure(t3) {
        if (!O(t3))
          return;
        let e4 = this._properties;
        Object.getOwnPropertyNames(t3).forEach((n5) => {
          let s5 = t3[n5];
          if (!O(s5))
            return;
          let o5 = {};
          for (let a4 of xr)
            o5[a4] = s5[a4];
          (T2(s5.properties) && s5.properties || [n5]).forEach((a4) => {
            (a4 === n5 || !e4.has(a4)) && e4.set(a4, o5);
          });
        });
      }
      _animateOptions(t3, e4) {
        let n5 = e4.options, s5 = yr(t3, n5);
        if (!s5)
          return [];
        let o5 = this._createAnimations(s5, n5);
        return n5.$shared && _r(t3.options.$animations, n5).then(() => {
          t3.options = n5;
        }, () => {
        }), o5;
      }
      _createAnimations(t3, e4) {
        let n5 = this._properties, s5 = [], o5 = t3.$animations || (t3.$animations = {}), a4 = Object.keys(e4), r4 = Date.now(), l4;
        for (l4 = a4.length - 1; l4 >= 0; --l4) {
          let c2 = a4[l4];
          if (c2.charAt(0) === "$")
            continue;
          if (c2 === "options") {
            s5.push(...this._animateOptions(t3, e4));
            continue;
          }
          let d2 = e4[c2], h4 = o5[c2], u3 = n5.get(c2);
          if (h4)
            if (u3 && h4.active()) {
              h4.update(u3, d2, r4);
              continue;
            } else
              h4.cancel();
          if (!u3 || !u3.duration) {
            t3[c2] = d2;
            continue;
          }
          o5[c2] = h4 = new Gs(u3, t3, c2, d2), s5.push(h4);
        }
        return s5;
      }
      update(t3, e4) {
        if (this._properties.size === 0) {
          Object.assign(t3, e4);
          return;
        }
        let n5 = this._createAnimations(t3, e4);
        if (n5.length)
          return rt.add(this._chart, n5), true;
      }
    };
    function _r(i4, t3) {
      let e4 = [], n5 = Object.keys(t3);
      for (let s5 = 0; s5 < n5.length; s5++) {
        let o5 = i4[n5[s5]];
        o5 && o5.active() && e4.push(o5.wait());
      }
      return Promise.all(e4);
    }
    function yr(i4, t3) {
      if (!t3)
        return;
      let e4 = i4.options;
      if (!e4) {
        i4.options = t3;
        return;
      }
      return e4.$shared && (i4.options = e4 = Object.assign({}, e4, { $shared: false, $animations: {} })), e4;
    }
    function Zs(i4, t3) {
      let e4 = i4 && i4.options || {}, n5 = e4.reverse, s5 = e4.min === void 0 ? t3 : 0, o5 = e4.max === void 0 ? t3 : 0;
      return { start: n5 ? o5 : s5, end: n5 ? s5 : o5 };
    }
    function vr(i4, t3, e4) {
      if (e4 === false)
        return false;
      let n5 = Zs(i4, e4), s5 = Zs(t3, e4);
      return { top: s5.end, right: n5.end, bottom: s5.start, left: n5.start };
    }
    function wr(i4) {
      let t3, e4, n5, s5;
      return O(i4) ? (t3 = i4.top, e4 = i4.right, n5 = i4.bottom, s5 = i4.left) : t3 = e4 = n5 = s5 = i4, { top: t3, right: e4, bottom: n5, left: s5 };
    }
    function Js(i4, t3) {
      let e4 = [], n5 = i4._getSortedDatasetMetas(t3), s5, o5;
      for (s5 = 0, o5 = n5.length; s5 < o5; ++s5)
        e4.push(n5[s5].index);
      return e4;
    }
    function Qs(i4, t3, e4, n5) {
      let s5 = i4.keys, o5 = n5.mode === "single", a4, r4, l4, c2;
      if (t3 !== null) {
        for (a4 = 0, r4 = s5.length; a4 < r4; ++a4) {
          if (l4 = +s5[a4], l4 === e4) {
            if (n5.all)
              continue;
            break;
          }
          c2 = i4.values[l4], B(c2) && (o5 || t3 === 0 || at(t3) === at(c2)) && (t3 += c2);
        }
        return t3;
      }
    }
    function Sr(i4) {
      let t3 = Object.keys(i4), e4 = new Array(t3.length), n5, s5, o5;
      for (n5 = 0, s5 = t3.length; n5 < s5; ++n5)
        o5 = t3[n5], e4[n5] = { x: o5, y: i4[o5] };
      return e4;
    }
    function to(i4, t3) {
      let e4 = i4 && i4.options.stacked;
      return e4 || e4 === void 0 && t3.stack !== void 0;
    }
    function Mr(i4, t3, e4) {
      return `${i4.id}.${t3.id}.${e4.stack || e4.type}`;
    }
    function kr(i4) {
      let { min: t3, max: e4, minDefined: n5, maxDefined: s5 } = i4.getUserBounds();
      return { min: n5 ? t3 : Number.NEGATIVE_INFINITY, max: s5 ? e4 : Number.POSITIVE_INFINITY };
    }
    function Pr(i4, t3, e4) {
      let n5 = i4[t3] || (i4[t3] = {});
      return n5[e4] || (n5[e4] = {});
    }
    function eo(i4, t3, e4) {
      for (let n5 of t3.getMatchingVisibleMetas("bar").reverse()) {
        let s5 = i4[n5.index];
        if (e4 && s5 > 0 || !e4 && s5 < 0)
          return n5.index;
      }
      return null;
    }
    function no(i4, t3) {
      let { chart: e4, _cachedMeta: n5 } = i4, s5 = e4._stacks || (e4._stacks = {}), { iScale: o5, vScale: a4, index: r4 } = n5, l4 = o5.axis, c2 = a4.axis, d2 = Mr(o5, a4, n5), h4 = t3.length, u3;
      for (let f2 = 0; f2 < h4; ++f2) {
        let g2 = t3[f2], { [l4]: p2, [c2]: m2 } = g2, b2 = g2._stacks || (g2._stacks = {});
        u3 = b2[c2] = Pr(s5, d2, p2), u3[r4] = m2, u3._top = eo(u3, a4, true), u3._bottom = eo(u3, a4, false);
      }
    }
    function si(i4, t3) {
      let e4 = i4.scales;
      return Object.keys(e4).filter((n5) => e4[n5].axis === t3).shift();
    }
    function Cr(i4, t3) {
      return Object.assign(Object.create(i4), { active: false, dataset: void 0, datasetIndex: t3, index: t3, mode: "default", type: "dataset" });
    }
    function Dr(i4, t3, e4) {
      return Object.assign(Object.create(i4), { active: false, dataIndex: t3, parsed: void 0, raw: void 0, element: e4, index: t3, mode: "default", type: "data" });
    }
    function Ke(i4, t3) {
      t3 = t3 || i4._parsed;
      for (let e4 of t3) {
        let n5 = e4._stacks;
        if (!n5 || n5[i4.vScale.id] === void 0 || n5[i4.vScale.id][i4.index] === void 0)
          return;
        delete n5[i4.vScale.id][i4.index];
      }
    }
    var oi = (i4) => i4 === "reset" || i4 === "none", io = (i4, t3) => t3 ? i4 : Object.assign({}, i4), J = class {
      constructor(t3, e4) {
        this.chart = t3, this._ctx = t3.ctx, this.index = e4, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = false, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = false, this.$context = void 0, this.initialize();
      }
      initialize() {
        let t3 = this, e4 = t3._cachedMeta;
        t3.configure(), t3.linkScales(), e4._stacked = to(e4.vScale, e4), t3.addElements();
      }
      updateIndex(t3) {
        this.index = t3;
      }
      linkScales() {
        let t3 = this, e4 = t3.chart, n5 = t3._cachedMeta, s5 = t3.getDataset(), o5 = (u3, f2, g2, p2) => u3 === "x" ? f2 : u3 === "r" ? p2 : g2, a4 = n5.xAxisID = C2(s5.xAxisID, si(e4, "x")), r4 = n5.yAxisID = C2(s5.yAxisID, si(e4, "y")), l4 = n5.rAxisID = C2(s5.rAxisID, si(e4, "r")), c2 = n5.indexAxis, d2 = n5.iAxisID = o5(c2, a4, r4, l4), h4 = n5.vAxisID = o5(c2, r4, a4, l4);
        n5.xScale = t3.getScaleForId(a4), n5.yScale = t3.getScaleForId(r4), n5.rScale = t3.getScaleForId(l4), n5.iScale = t3.getScaleForId(d2), n5.vScale = t3.getScaleForId(h4);
      }
      getDataset() {
        return this.chart.data.datasets[this.index];
      }
      getMeta() {
        return this.chart.getDatasetMeta(this.index);
      }
      getScaleForId(t3) {
        return this.chart.scales[t3];
      }
      _getOtherScale(t3) {
        let e4 = this._cachedMeta;
        return t3 === e4.iScale ? e4.vScale : e4.iScale;
      }
      reset() {
        this._update("reset");
      }
      _destroy() {
        let t3 = this._cachedMeta;
        this._data && Kn(this._data, this), t3._stacked && Ke(t3);
      }
      _dataCheck() {
        let t3 = this, e4 = t3.getDataset(), n5 = e4.data || (e4.data = []);
        O(n5) ? t3._data = Sr(n5) : t3._data !== n5 && (t3._data && (Kn(t3._data, t3), Ke(t3._cachedMeta)), n5 && Object.isExtensible(n5) && Cs(n5, t3), t3._data = n5);
      }
      addElements() {
        let t3 = this, e4 = t3._cachedMeta;
        t3._dataCheck(), t3.datasetElementType && (e4.dataset = new t3.datasetElementType());
      }
      buildOrUpdateElements(t3) {
        let e4 = this, n5 = e4._cachedMeta, s5 = e4.getDataset(), o5 = false;
        e4._dataCheck(), n5._stacked = to(n5.vScale, n5), n5.stack !== s5.stack && (o5 = true, Ke(n5), n5.stack = s5.stack), e4._resyncElements(t3), o5 && no(e4, n5._parsed);
      }
      configure() {
        let t3 = this, e4 = t3.chart.config, n5 = e4.datasetScopeKeys(t3._type), s5 = e4.getOptionScopes(t3.getDataset(), n5, true);
        t3.options = e4.createResolver(s5, t3.getContext()), t3._parsing = t3.options.parsing;
      }
      parse(t3, e4) {
        let n5 = this, { _cachedMeta: s5, _data: o5 } = n5, { iScale: a4, _stacked: r4 } = s5, l4 = a4.axis, c2 = t3 === 0 && e4 === o5.length ? true : s5._sorted, d2 = t3 > 0 && s5._parsed[t3 - 1], h4, u3, f2;
        if (n5._parsing === false)
          s5._parsed = o5, s5._sorted = true, f2 = o5;
        else {
          T2(o5[t3]) ? f2 = n5.parseArrayData(s5, o5, t3, e4) : O(o5[t3]) ? f2 = n5.parseObjectData(s5, o5, t3, e4) : f2 = n5.parsePrimitiveData(s5, o5, t3, e4);
          let g2 = () => u3[l4] === null || d2 && u3[l4] < d2[l4];
          for (h4 = 0; h4 < e4; ++h4)
            s5._parsed[h4 + t3] = u3 = f2[h4], c2 && (g2() && (c2 = false), d2 = u3);
          s5._sorted = c2;
        }
        r4 && no(n5, f2);
      }
      parsePrimitiveData(t3, e4, n5, s5) {
        let { iScale: o5, vScale: a4 } = t3, r4 = o5.axis, l4 = a4.axis, c2 = o5.getLabels(), d2 = o5 === a4, h4 = new Array(s5), u3, f2, g2;
        for (u3 = 0, f2 = s5; u3 < f2; ++u3)
          g2 = u3 + n5, h4[u3] = { [r4]: d2 || o5.parse(c2[g2], g2), [l4]: a4.parse(e4[g2], g2) };
        return h4;
      }
      parseArrayData(t3, e4, n5, s5) {
        let { xScale: o5, yScale: a4 } = t3, r4 = new Array(s5), l4, c2, d2, h4;
        for (l4 = 0, c2 = s5; l4 < c2; ++l4)
          d2 = l4 + n5, h4 = e4[d2], r4[l4] = { x: o5.parse(h4[0], d2), y: a4.parse(h4[1], d2) };
        return r4;
      }
      parseObjectData(t3, e4, n5, s5) {
        let { xScale: o5, yScale: a4 } = t3, { xAxisKey: r4 = "x", yAxisKey: l4 = "y" } = this._parsing, c2 = new Array(s5), d2, h4, u3, f2;
        for (d2 = 0, h4 = s5; d2 < h4; ++d2)
          u3 = d2 + n5, f2 = e4[u3], c2[d2] = { x: o5.parse(ot(f2, r4), u3), y: a4.parse(ot(f2, l4), u3) };
        return c2;
      }
      getParsed(t3) {
        return this._cachedMeta._parsed[t3];
      }
      getDataElement(t3) {
        return this._cachedMeta.data[t3];
      }
      applyStack(t3, e4, n5) {
        let s5 = this.chart, o5 = this._cachedMeta, a4 = e4[t3.axis], r4 = { keys: Js(s5, true), values: e4._stacks[t3.axis] };
        return Qs(r4, a4, o5.index, { mode: n5 });
      }
      updateRangeFromParsed(t3, e4, n5, s5) {
        let o5 = n5[e4.axis], a4 = o5 === null ? NaN : o5, r4 = s5 && n5._stacks[e4.axis];
        s5 && r4 && (s5.values = r4, t3.min = Math.min(t3.min, a4), t3.max = Math.max(t3.max, a4), a4 = Qs(s5, o5, this._cachedMeta.index, { all: true })), t3.min = Math.min(t3.min, a4), t3.max = Math.max(t3.max, a4);
      }
      getMinMax(t3, e4) {
        let n5 = this, s5 = n5._cachedMeta, o5 = s5._parsed, a4 = s5._sorted && t3 === s5.iScale, r4 = o5.length, l4 = n5._getOtherScale(t3), c2 = e4 && s5._stacked && { keys: Js(n5.chart, true), values: null }, d2 = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY }, { min: h4, max: u3 } = kr(l4), f2, g2, p2, m2;
        function b2() {
          return p2 = o5[f2], g2 = p2[t3.axis], m2 = p2[l4.axis], !B(g2) || h4 > m2 || u3 < m2;
        }
        for (f2 = 0; f2 < r4 && !(!b2() && (n5.updateRangeFromParsed(d2, t3, p2, c2), a4)); ++f2)
          ;
        if (a4) {
          for (f2 = r4 - 1; f2 >= 0; --f2)
            if (!b2()) {
              n5.updateRangeFromParsed(d2, t3, p2, c2);
              break;
            }
        }
        return d2;
      }
      getAllParsedValues(t3) {
        let e4 = this._cachedMeta._parsed, n5 = [], s5, o5, a4;
        for (s5 = 0, o5 = e4.length; s5 < o5; ++s5)
          a4 = e4[s5][t3.axis], B(a4) && n5.push(a4);
        return n5;
      }
      getMaxOverflow() {
        return false;
      }
      getLabelAndValue(t3) {
        let e4 = this, n5 = e4._cachedMeta, s5 = n5.iScale, o5 = n5.vScale, a4 = e4.getParsed(t3);
        return { label: s5 ? "" + s5.getLabelForValue(a4[s5.axis]) : "", value: o5 ? "" + o5.getLabelForValue(a4[o5.axis]) : "" };
      }
      _update(t3) {
        let e4 = this, n5 = e4._cachedMeta;
        e4.configure(), e4._cachedDataOpts = {}, e4.update(t3 || "default"), n5._clip = wr(C2(e4.options.clip, vr(n5.xScale, n5.yScale, e4.getMaxOverflow())));
      }
      update(t3) {
      }
      draw() {
        let t3 = this, e4 = t3._ctx, n5 = t3.chart, s5 = t3._cachedMeta, o5 = s5.data || [], a4 = n5.chartArea, r4 = [], l4 = t3._drawStart || 0, c2 = t3._drawCount || o5.length - l4, d2;
        for (s5.dataset && s5.dataset.draw(e4, a4, l4, c2), d2 = l4; d2 < l4 + c2; ++d2) {
          let h4 = o5[d2];
          h4.active ? r4.push(h4) : h4.draw(e4, a4);
        }
        for (d2 = 0; d2 < r4.length; ++d2)
          r4[d2].draw(e4, a4);
      }
      getStyle(t3, e4) {
        let n5 = e4 ? "active" : "default";
        return t3 === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n5) : this.resolveDataElementOptions(t3 || 0, n5);
      }
      getContext(t3, e4, n5) {
        let s5 = this, o5 = s5.getDataset(), a4;
        if (t3 >= 0 && t3 < s5._cachedMeta.data.length) {
          let r4 = s5._cachedMeta.data[t3];
          a4 = r4.$context || (r4.$context = Dr(s5.getContext(), t3, r4)), a4.parsed = s5.getParsed(t3), a4.raw = o5.data[t3];
        } else
          a4 = s5.$context || (s5.$context = Cr(s5.chart.getContext(), s5.index)), a4.dataset = o5;
        return a4.active = !!e4, a4.mode = n5, a4;
      }
      resolveDatasetElementOptions(t3) {
        return this._resolveElementOptions(this.datasetElementType.id, t3);
      }
      resolveDataElementOptions(t3, e4) {
        return this._resolveElementOptions(this.dataElementType.id, e4, t3);
      }
      _resolveElementOptions(t3, e4 = "default", n5) {
        let s5 = this, o5 = e4 === "active", a4 = s5._cachedDataOpts, r4 = t3 + "-" + e4, l4 = a4[r4], c2 = s5.enableOptionSharing && q(n5);
        if (l4)
          return io(l4, c2);
        let d2 = s5.chart.config, h4 = d2.datasetElementScopeKeys(s5._type, t3), u3 = o5 ? [`${t3}Hover`, "hover", t3, ""] : [t3, ""], f2 = d2.getOptionScopes(s5.getDataset(), h4), g2 = Object.keys(k2.elements[t3]), p2 = () => s5.getContext(n5, o5), m2 = d2.resolveNamedOptions(f2, g2, p2, u3);
        return m2.$shared && (m2.$shared = c2, a4[r4] = Object.freeze(io(m2, c2))), m2;
      }
      _resolveAnimations(t3, e4, n5) {
        let s5 = this, o5 = s5.chart, a4 = s5._cachedDataOpts, r4 = `animation-${e4}`, l4 = a4[r4];
        if (l4)
          return l4;
        let c2;
        if (o5.options.animation !== false) {
          let h4 = s5.chart.config, u3 = h4.datasetAnimationScopeKeys(s5._type, e4), f2 = h4.getOptionScopes(s5.getDataset(), u3);
          c2 = h4.createResolver(f2, s5.getContext(t3, n5, e4));
        }
        let d2 = new ii(o5, c2 && c2.animations);
        return c2 && c2._cacheable && (a4[r4] = Object.freeze(d2)), d2;
      }
      getSharedOptions(t3) {
        if (!!t3.$shared)
          return this._sharedOptions || (this._sharedOptions = Object.assign({}, t3));
      }
      includeOptions(t3, e4) {
        return !e4 || oi(t3) || this.chart._animationsDisabled;
      }
      updateElement(t3, e4, n5, s5) {
        oi(s5) ? Object.assign(t3, n5) : this._resolveAnimations(e4, s5).update(t3, n5);
      }
      updateSharedOptions(t3, e4, n5) {
        t3 && !oi(e4) && this._resolveAnimations(void 0, e4).update(t3, n5);
      }
      _setStyle(t3, e4, n5, s5) {
        t3.active = s5;
        let o5 = this.getStyle(e4, s5);
        this._resolveAnimations(e4, n5, s5).update(t3, { options: !s5 && this.getSharedOptions(o5) || o5 });
      }
      removeHoverStyle(t3, e4, n5) {
        this._setStyle(t3, n5, "active", false);
      }
      setHoverStyle(t3, e4, n5) {
        this._setStyle(t3, n5, "active", true);
      }
      _removeDatasetHoverStyle() {
        let t3 = this._cachedMeta.dataset;
        t3 && this._setStyle(t3, void 0, "active", false);
      }
      _setDatasetHoverStyle() {
        let t3 = this._cachedMeta.dataset;
        t3 && this._setStyle(t3, void 0, "active", true);
      }
      _resyncElements(t3) {
        let e4 = this, n5 = e4._cachedMeta.data.length, s5 = e4._data.length;
        s5 > n5 ? e4._insertElements(n5, s5 - n5, t3) : s5 < n5 && e4._removeElements(s5, n5 - s5);
        let o5 = Math.min(s5, n5);
        o5 && e4.parse(0, o5);
      }
      _insertElements(t3, e4, n5 = true) {
        let s5 = this, o5 = s5._cachedMeta, a4 = o5.data, r4 = t3 + e4, l4, c2 = (d2) => {
          for (d2.length += e4, l4 = d2.length - 1; l4 >= r4; l4--)
            d2[l4] = d2[l4 - e4];
        };
        for (c2(a4), l4 = t3; l4 < r4; ++l4)
          a4[l4] = new s5.dataElementType();
        s5._parsing && c2(o5._parsed), s5.parse(t3, e4), n5 && s5.updateElements(a4, t3, e4, "reset");
      }
      updateElements(t3, e4, n5, s5) {
      }
      _removeElements(t3, e4) {
        let n5 = this, s5 = n5._cachedMeta;
        if (n5._parsing) {
          let o5 = s5._parsed.splice(t3, e4);
          s5._stacked && Ke(s5, o5);
        }
        s5.data.splice(t3, e4);
      }
      _onDataPush() {
        let t3 = arguments.length;
        this._insertElements(this.getDataset().data.length - t3, t3);
      }
      _onDataPop() {
        this._removeElements(this._cachedMeta.data.length - 1, 1);
      }
      _onDataShift() {
        this._removeElements(0, 1);
      }
      _onDataSplice(t3, e4) {
        this._removeElements(t3, e4), this._insertElements(t3, arguments.length - 2);
      }
      _onDataUnshift() {
        this._insertElements(0, arguments.length);
      }
    };
    J.defaults = {};
    J.prototype.datasetElementType = null;
    J.prototype.dataElementType = null;
    function Or(i4) {
      if (!i4._cache.$bar) {
        let t3 = i4.getMatchingVisibleMetas("bar"), e4 = [];
        for (let n5 = 0, s5 = t3.length; n5 < s5; n5++)
          e4 = e4.concat(t3[n5].controller.getAllParsedValues(i4));
        i4._cache.$bar = Gn(e4.sort((n5, s5) => n5 - s5));
      }
      return i4._cache.$bar;
    }
    function Ar(i4) {
      let t3 = Or(i4), e4 = i4._length, n5, s5, o5, a4, r4 = () => {
        o5 === 32767 || o5 === -32768 || (q(a4) && (e4 = Math.min(e4, Math.abs(o5 - a4) || e4)), a4 = o5);
      };
      for (n5 = 0, s5 = t3.length; n5 < s5; ++n5)
        o5 = i4.getPixelForValue(t3[n5]), r4();
      for (a4 = void 0, n5 = 0, s5 = i4.ticks.length; n5 < s5; ++n5)
        o5 = i4.getPixelForTick(n5), r4();
      return e4;
    }
    function Tr(i4, t3, e4, n5) {
      let s5 = e4.barThickness, o5, a4;
      return P2(s5) ? (o5 = t3.min * e4.categoryPercentage, a4 = e4.barPercentage) : (o5 = s5 * n5, a4 = 1), { chunk: o5 / n5, ratio: a4, start: t3.pixels[i4] - o5 / 2 };
    }
    function Rr(i4, t3, e4, n5) {
      let s5 = t3.pixels, o5 = s5[i4], a4 = i4 > 0 ? s5[i4 - 1] : null, r4 = i4 < s5.length - 1 ? s5[i4 + 1] : null, l4 = e4.categoryPercentage;
      a4 === null && (a4 = o5 - (r4 === null ? t3.end - t3.start : r4 - o5)), r4 === null && (r4 = o5 + o5 - a4);
      let c2 = o5 - (o5 - Math.min(a4, r4)) / 2 * l4;
      return { chunk: Math.abs(r4 - a4) / 2 * l4 / n5, ratio: e4.barPercentage, start: c2 };
    }
    function Lr(i4, t3, e4, n5) {
      let s5 = e4.parse(i4[0], n5), o5 = e4.parse(i4[1], n5), a4 = Math.min(s5, o5), r4 = Math.max(s5, o5), l4 = a4, c2 = r4;
      Math.abs(a4) > Math.abs(r4) && (l4 = r4, c2 = a4), t3[e4.axis] = c2, t3._custom = { barStart: l4, barEnd: c2, start: s5, end: o5, min: a4, max: r4 };
    }
    function so(i4, t3, e4, n5) {
      return T2(i4) ? Lr(i4, t3, e4, n5) : t3[e4.axis] = e4.parse(i4, n5), t3;
    }
    function oo(i4, t3, e4, n5) {
      let s5 = i4.iScale, o5 = i4.vScale, a4 = s5.getLabels(), r4 = s5 === o5, l4 = [], c2, d2, h4, u3;
      for (c2 = e4, d2 = e4 + n5; c2 < d2; ++c2)
        u3 = t3[c2], h4 = {}, h4[s5.axis] = r4 || s5.parse(a4[c2], c2), l4.push(so(u3, h4, o5, c2));
      return l4;
    }
    function ai(i4) {
      return i4 && i4.barStart !== void 0 && i4.barEnd !== void 0;
    }
    var Ge = class extends J {
      parsePrimitiveData(t3, e4, n5, s5) {
        return oo(t3, e4, n5, s5);
      }
      parseArrayData(t3, e4, n5, s5) {
        return oo(t3, e4, n5, s5);
      }
      parseObjectData(t3, e4, n5, s5) {
        let { iScale: o5, vScale: a4 } = t3, { xAxisKey: r4 = "x", yAxisKey: l4 = "y" } = this._parsing, c2 = o5.axis === "x" ? r4 : l4, d2 = a4.axis === "x" ? r4 : l4, h4 = [], u3, f2, g2, p2;
        for (u3 = n5, f2 = n5 + s5; u3 < f2; ++u3)
          p2 = e4[u3], g2 = {}, g2[o5.axis] = o5.parse(ot(p2, c2), u3), h4.push(so(ot(p2, d2), g2, a4, u3));
        return h4;
      }
      updateRangeFromParsed(t3, e4, n5, s5) {
        super.updateRangeFromParsed(t3, e4, n5, s5);
        let o5 = n5._custom;
        o5 && e4 === this._cachedMeta.vScale && (t3.min = Math.min(t3.min, o5.min), t3.max = Math.max(t3.max, o5.max));
      }
      getLabelAndValue(t3) {
        let e4 = this, n5 = e4._cachedMeta, { iScale: s5, vScale: o5 } = n5, a4 = e4.getParsed(t3), r4 = a4._custom, l4 = ai(r4) ? "[" + r4.start + ", " + r4.end + "]" : "" + o5.getLabelForValue(a4[o5.axis]);
        return { label: "" + s5.getLabelForValue(a4[s5.axis]), value: l4 };
      }
      initialize() {
        let t3 = this;
        t3.enableOptionSharing = true, super.initialize();
        let e4 = t3._cachedMeta;
        e4.stack = t3.getDataset().stack;
      }
      update(t3) {
        let e4 = this, n5 = e4._cachedMeta;
        e4.updateElements(n5.data, 0, n5.data.length, t3);
      }
      updateElements(t3, e4, n5, s5) {
        let o5 = this, a4 = s5 === "reset", r4 = o5._cachedMeta.vScale, l4 = r4.getBasePixel(), c2 = r4.isHorizontal(), d2 = o5._getRuler(), h4 = o5.resolveDataElementOptions(e4, s5), u3 = o5.getSharedOptions(h4), f2 = o5.includeOptions(s5, u3);
        o5.updateSharedOptions(u3, s5, h4);
        for (let g2 = e4; g2 < e4 + n5; g2++) {
          let p2 = o5.getParsed(g2), m2 = a4 || P2(p2[r4.axis]) ? { base: l4, head: l4 } : o5._calculateBarValuePixels(g2), b2 = o5._calculateBarIndexPixels(g2, d2), _2 = (p2._stacks || {})[r4.axis], y2 = { horizontal: c2, base: m2.base, enableBorderRadius: !_2 || ai(p2._custom) || o5.index === _2._top || o5.index === _2._bottom, x: c2 ? m2.head : b2.center, y: c2 ? b2.center : m2.head, height: c2 ? b2.size : void 0, width: c2 ? void 0 : b2.size };
          f2 && (y2.options = u3 || o5.resolveDataElementOptions(g2, s5)), o5.updateElement(t3[g2], g2, y2, s5);
        }
      }
      _getStacks(t3, e4) {
        let n5 = this, o5 = n5._cachedMeta.iScale, a4 = o5.getMatchingVisibleMetas(n5._type), r4 = o5.options.stacked, l4 = a4.length, c2 = [], d2, h4;
        for (d2 = 0; d2 < l4; ++d2) {
          if (h4 = a4[d2], typeof e4 != "undefined") {
            let u3 = h4.controller.getParsed(e4)[h4.controller._cachedMeta.vScale.axis];
            if (P2(u3) || isNaN(u3))
              continue;
          }
          if ((r4 === false || c2.indexOf(h4.stack) === -1 || r4 === void 0 && h4.stack === void 0) && c2.push(h4.stack), h4.index === t3)
            break;
        }
        return c2.length || c2.push(void 0), c2;
      }
      _getStackCount(t3) {
        return this._getStacks(void 0, t3).length;
      }
      _getStackIndex(t3, e4, n5) {
        let s5 = this._getStacks(t3, n5), o5 = e4 !== void 0 ? s5.indexOf(e4) : -1;
        return o5 === -1 ? s5.length - 1 : o5;
      }
      _getRuler() {
        let t3 = this, e4 = t3.options, n5 = t3._cachedMeta, s5 = n5.iScale, o5 = [], a4, r4;
        for (a4 = 0, r4 = n5.data.length; a4 < r4; ++a4)
          o5.push(s5.getPixelForValue(t3.getParsed(a4)[s5.axis], a4));
        let l4 = e4.barThickness;
        return { min: l4 || Ar(s5), pixels: o5, start: s5._startPixel, end: s5._endPixel, stackCount: t3._getStackCount(), scale: s5, grouped: e4.grouped, ratio: l4 ? 1 : e4.categoryPercentage * e4.barPercentage };
      }
      _calculateBarValuePixels(t3) {
        let e4 = this, { vScale: n5, _stacked: s5 } = e4._cachedMeta, { base: o5, minBarLength: a4 } = e4.options, r4 = e4.getParsed(t3), l4 = r4._custom, c2 = ai(l4), d2 = r4[n5.axis], h4 = 0, u3 = s5 ? e4.applyStack(n5, r4, s5) : d2, f2, g2;
        u3 !== d2 && (h4 = u3 - d2, u3 = d2), c2 && (d2 = l4.barStart, u3 = l4.barEnd - l4.barStart, d2 !== 0 && at(d2) !== at(l4.barEnd) && (h4 = 0), h4 += d2);
        let p2 = !P2(o5) && !c2 ? o5 : h4, m2 = n5.getPixelForValue(p2);
        this.chart.getDataVisibility(t3) ? f2 = n5.getPixelForValue(h4 + u3) : f2 = m2, g2 = f2 - m2, a4 !== void 0 && Math.abs(g2) < a4 && (g2 = g2 < 0 ? -a4 : a4, d2 === 0 && (m2 -= g2 / 2), f2 = m2 + g2);
        let b2 = o5 || 0;
        if (m2 === n5.getPixelForValue(b2)) {
          let _2 = n5.getLineWidthForValue(b2) / 2;
          g2 > 0 ? (m2 += _2, g2 -= _2) : g2 < 0 && (m2 -= _2, g2 += _2);
        }
        return { size: g2, base: m2, head: f2, center: f2 + g2 / 2 };
      }
      _calculateBarIndexPixels(t3, e4) {
        let n5 = this, s5 = e4.scale, o5 = n5.options, a4 = o5.skipNull, r4 = C2(o5.maxBarThickness, Infinity), l4, c2;
        if (e4.grouped) {
          let d2 = a4 ? n5._getStackCount(t3) : e4.stackCount, h4 = o5.barThickness === "flex" ? Rr(t3, e4, o5, d2) : Tr(t3, e4, o5, d2), u3 = n5._getStackIndex(n5.index, n5._cachedMeta.stack, a4 ? t3 : void 0);
          l4 = h4.start + h4.chunk * u3 + h4.chunk / 2, c2 = Math.min(r4, h4.chunk * h4.ratio);
        } else
          l4 = s5.getPixelForValue(n5.getParsed(t3)[s5.axis], t3), c2 = Math.min(r4, e4.min * e4.ratio);
        return { base: l4 - c2 / 2, head: l4 + c2 / 2, center: l4, size: c2 };
      }
      draw() {
        let t3 = this, e4 = t3.chart, n5 = t3._cachedMeta, s5 = n5.vScale, o5 = n5.data, a4 = o5.length, r4 = 0;
        for (Ve(e4.ctx, e4.chartArea); r4 < a4; ++r4)
          t3.getParsed(r4)[s5.axis] !== null && o5[r4].draw(t3._ctx);
        We(e4.ctx);
      }
    };
    Ge.id = "bar";
    Ge.defaults = { datasetElementType: false, dataElementType: "bar", categoryPercentage: 0.8, barPercentage: 0.9, grouped: true, animations: { numbers: { type: "number", properties: ["x", "y", "base", "width", "height"] } } };
    Ge.overrides = { interaction: { mode: "index" }, scales: { _index_: { type: "category", offset: true, grid: { offset: true } }, _value_: { type: "linear", beginAtZero: true } } };
    var Ze = class extends J {
      initialize() {
        this.enableOptionSharing = true, super.initialize();
      }
      parseObjectData(t3, e4, n5, s5) {
        let { xScale: o5, yScale: a4 } = t3, { xAxisKey: r4 = "x", yAxisKey: l4 = "y" } = this._parsing, c2 = [], d2, h4, u3;
        for (d2 = n5, h4 = n5 + s5; d2 < h4; ++d2)
          u3 = e4[d2], c2.push({ x: o5.parse(ot(u3, r4), d2), y: a4.parse(ot(u3, l4), d2), _custom: u3 && u3.r && +u3.r });
        return c2;
      }
      getMaxOverflow() {
        let { data: t3, _parsed: e4 } = this._cachedMeta, n5 = 0;
        for (let s5 = t3.length - 1; s5 >= 0; --s5)
          n5 = Math.max(n5, t3[s5].size() / 2, e4[s5]._custom);
        return n5 > 0 && n5;
      }
      getLabelAndValue(t3) {
        let e4 = this, n5 = e4._cachedMeta, { xScale: s5, yScale: o5 } = n5, a4 = e4.getParsed(t3), r4 = s5.getLabelForValue(a4.x), l4 = o5.getLabelForValue(a4.y), c2 = a4._custom;
        return { label: n5.label, value: "(" + r4 + ", " + l4 + (c2 ? ", " + c2 : "") + ")" };
      }
      update(t3) {
        let e4 = this, n5 = e4._cachedMeta.data;
        e4.updateElements(n5, 0, n5.length, t3);
      }
      updateElements(t3, e4, n5, s5) {
        let o5 = this, a4 = s5 === "reset", { xScale: r4, yScale: l4 } = o5._cachedMeta, c2 = o5.resolveDataElementOptions(e4, s5), d2 = o5.getSharedOptions(c2), h4 = o5.includeOptions(s5, d2);
        for (let u3 = e4; u3 < e4 + n5; u3++) {
          let f2 = t3[u3], g2 = !a4 && o5.getParsed(u3), p2 = a4 ? r4.getPixelForDecimal(0.5) : r4.getPixelForValue(g2.x), m2 = a4 ? l4.getBasePixel() : l4.getPixelForValue(g2.y), b2 = { x: p2, y: m2, skip: isNaN(p2) || isNaN(m2) };
          h4 && (b2.options = o5.resolveDataElementOptions(u3, s5), a4 && (b2.options.radius = 0)), o5.updateElement(f2, u3, b2, s5);
        }
        o5.updateSharedOptions(d2, s5, c2);
      }
      resolveDataElementOptions(t3, e4) {
        let n5 = this.getParsed(t3), s5 = super.resolveDataElementOptions(t3, e4);
        s5.$shared && (s5 = Object.assign({}, s5, { $shared: false }));
        let o5 = s5.radius;
        return e4 !== "active" && (s5.radius = 0), s5.radius += C2(n5 && n5._custom, o5), s5;
      }
    };
    Ze.id = "bubble";
    Ze.defaults = { datasetElementType: false, dataElementType: "point", animations: { numbers: { type: "number", properties: ["x", "y", "borderWidth", "radius"] } } };
    Ze.overrides = { scales: { x: { type: "linear" }, y: { type: "linear" } }, plugins: { tooltip: { callbacks: { title() {
      return "";
    } } } } };
    function Er(i4, t3, e4) {
      let n5 = 1, s5 = 1, o5 = 0, a4 = 0;
      if (t3 < A2) {
        let r4 = i4, l4 = r4 + t3, c2 = Math.cos(r4), d2 = Math.sin(r4), h4 = Math.cos(l4), u3 = Math.sin(l4), f2 = (y2, x2, v2) => Zt(y2, r4, l4) ? 1 : Math.max(x2, x2 * e4, v2, v2 * e4), g2 = (y2, x2, v2) => Zt(y2, r4, l4) ? -1 : Math.min(x2, x2 * e4, v2, v2 * e4), p2 = f2(0, c2, h4), m2 = f2(L2, d2, u3), b2 = g2(I2, c2, h4), _2 = g2(I2 + L2, d2, u3);
        n5 = (p2 - b2) / 2, s5 = (m2 - _2) / 2, o5 = -(p2 + b2) / 2, a4 = -(m2 + _2) / 2;
      }
      return { ratioX: n5, ratioY: s5, offsetX: o5, offsetY: a4 };
    }
    var le = class extends J {
      constructor(t3, e4) {
        super(t3, e4);
        this.enableOptionSharing = true, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
      }
      linkScales() {
      }
      parse(t3, e4) {
        let n5 = this.getDataset().data, s5 = this._cachedMeta, o5, a4;
        for (o5 = t3, a4 = t3 + e4; o5 < a4; ++o5)
          s5._parsed[o5] = +n5[o5];
      }
      _getRotation() {
        return Q(this.options.rotation - 90);
      }
      _getCircumference() {
        return Q(this.options.circumference);
      }
      _getRotationExtents() {
        let t3 = A2, e4 = -A2, n5 = this;
        for (let s5 = 0; s5 < n5.chart.data.datasets.length; ++s5)
          if (n5.chart.isDatasetVisible(s5)) {
            let o5 = n5.chart.getDatasetMeta(s5).controller, a4 = o5._getRotation(), r4 = o5._getCircumference();
            t3 = Math.min(t3, a4), e4 = Math.max(e4, a4 + r4);
          }
        return { rotation: t3, circumference: e4 - t3 };
      }
      update(t3) {
        let e4 = this, n5 = e4.chart, { chartArea: s5 } = n5, o5 = e4._cachedMeta, a4 = o5.data, r4 = e4.getMaxBorderWidth() + e4.getMaxOffset(a4), l4 = Math.max((Math.min(s5.width, s5.height) - r4) / 2, 0), c2 = Math.min(Ji(e4.options.cutout, l4), 1), d2 = e4._getRingWeight(e4.index), { circumference: h4, rotation: u3 } = e4._getRotationExtents(), { ratioX: f2, ratioY: g2, offsetX: p2, offsetY: m2 } = Er(u3, h4, c2), b2 = (s5.width - r4) / f2, _2 = (s5.height - r4) / g2, y2 = Math.max(Math.min(b2, _2) / 2, 0), x2 = Ce(e4.options.radius, y2), v2 = Math.max(x2 * c2, 0), w2 = (x2 - v2) / e4._getVisibleDatasetWeightTotal();
        e4.offsetX = p2 * x2, e4.offsetY = m2 * x2, o5.total = e4.calculateTotal(), e4.outerRadius = x2 - w2 * e4._getRingWeightOffset(e4.index), e4.innerRadius = Math.max(e4.outerRadius - w2 * d2, 0), e4.updateElements(a4, 0, a4.length, t3);
      }
      _circumference(t3, e4) {
        let n5 = this, s5 = n5.options, o5 = n5._cachedMeta, a4 = n5._getCircumference();
        return e4 && s5.animation.animateRotate || !this.chart.getDataVisibility(t3) || o5._parsed[t3] === null ? 0 : n5.calculateCircumference(o5._parsed[t3] * a4 / A2);
      }
      updateElements(t3, e4, n5, s5) {
        let o5 = this, a4 = s5 === "reset", r4 = o5.chart, l4 = r4.chartArea, d2 = r4.options.animation, h4 = (l4.left + l4.right) / 2, u3 = (l4.top + l4.bottom) / 2, f2 = a4 && d2.animateScale, g2 = f2 ? 0 : o5.innerRadius, p2 = f2 ? 0 : o5.outerRadius, m2 = o5.resolveDataElementOptions(e4, s5), b2 = o5.getSharedOptions(m2), _2 = o5.includeOptions(s5, b2), y2 = o5._getRotation(), x2;
        for (x2 = 0; x2 < e4; ++x2)
          y2 += o5._circumference(x2, a4);
        for (x2 = e4; x2 < e4 + n5; ++x2) {
          let v2 = o5._circumference(x2, a4), w2 = t3[x2], S3 = { x: h4 + o5.offsetX, y: u3 + o5.offsetY, startAngle: y2, endAngle: y2 + v2, circumference: v2, outerRadius: p2, innerRadius: g2 };
          _2 && (S3.options = b2 || o5.resolveDataElementOptions(x2, s5)), y2 += v2, o5.updateElement(w2, x2, S3, s5);
        }
        o5.updateSharedOptions(b2, s5, m2);
      }
      calculateTotal() {
        let t3 = this._cachedMeta, e4 = t3.data, n5 = 0, s5;
        for (s5 = 0; s5 < e4.length; s5++) {
          let o5 = t3._parsed[s5];
          o5 !== null && !isNaN(o5) && this.chart.getDataVisibility(s5) && (n5 += Math.abs(o5));
        }
        return n5;
      }
      calculateCircumference(t3) {
        let e4 = this._cachedMeta.total;
        return e4 > 0 && !isNaN(t3) ? A2 * (Math.abs(t3) / e4) : 0;
      }
      getLabelAndValue(t3) {
        let e4 = this, n5 = e4._cachedMeta, s5 = e4.chart, o5 = s5.data.labels || [], a4 = re(n5._parsed[t3], s5.options.locale);
        return { label: o5[t3] || "", value: a4 };
      }
      getMaxBorderWidth(t3) {
        let e4 = this, n5 = 0, s5 = e4.chart, o5, a4, r4, l4, c2;
        if (!t3) {
          for (o5 = 0, a4 = s5.data.datasets.length; o5 < a4; ++o5)
            if (s5.isDatasetVisible(o5)) {
              r4 = s5.getDatasetMeta(o5), t3 = r4.data, l4 = r4.controller, l4 !== e4 && l4.configure();
              break;
            }
        }
        if (!t3)
          return 0;
        for (o5 = 0, a4 = t3.length; o5 < a4; ++o5)
          c2 = l4.resolveDataElementOptions(o5), c2.borderAlign !== "inner" && (n5 = Math.max(n5, c2.borderWidth || 0, c2.hoverBorderWidth || 0));
        return n5;
      }
      getMaxOffset(t3) {
        let e4 = 0;
        for (let n5 = 0, s5 = t3.length; n5 < s5; ++n5) {
          let o5 = this.resolveDataElementOptions(n5);
          e4 = Math.max(e4, o5.offset || 0, o5.hoverOffset || 0);
        }
        return e4;
      }
      _getRingWeightOffset(t3) {
        let e4 = 0;
        for (let n5 = 0; n5 < t3; ++n5)
          this.chart.isDatasetVisible(n5) && (e4 += this._getRingWeight(n5));
        return e4;
      }
      _getRingWeight(t3) {
        return Math.max(C2(this.chart.data.datasets[t3].weight, 1), 0);
      }
      _getVisibleDatasetWeightTotal() {
        return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
      }
    };
    le.id = "doughnut";
    le.defaults = { datasetElementType: false, dataElementType: "arc", animation: { animateRotate: true, animateScale: false }, animations: { numbers: { type: "number", properties: ["circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth"] } }, cutout: "50%", rotation: 0, circumference: 360, radius: "100%", indexAxis: "r" };
    le.overrides = { aspectRatio: 1, plugins: { legend: { labels: { generateLabels(i4) {
      let t3 = i4.data;
      return t3.labels.length && t3.datasets.length ? t3.labels.map((e4, n5) => {
        let o5 = i4.getDatasetMeta(0).controller.getStyle(n5);
        return { text: e4, fillStyle: o5.backgroundColor, strokeStyle: o5.borderColor, lineWidth: o5.borderWidth, hidden: !i4.getDataVisibility(n5), index: n5 };
      }) : [];
    } }, onClick(i4, t3, e4) {
      e4.chart.toggleDataVisibility(t3.index), e4.chart.update();
    } }, tooltip: { callbacks: { title() {
      return "";
    }, label(i4) {
      let t3 = i4.label, e4 = ": " + i4.formattedValue;
      return T2(t3) ? (t3 = t3.slice(), t3[0] += e4) : t3 += e4, t3;
    } } } } };
    var Ct = class extends J {
      initialize() {
        this.enableOptionSharing = true, super.initialize();
      }
      update(t3) {
        let e4 = this, n5 = e4._cachedMeta, { dataset: s5, data: o5 = [], _dataset: a4 } = n5, r4 = e4.chart._animationsDisabled, { start: l4, count: c2 } = Fr(n5, o5, r4);
        e4._drawStart = l4, e4._drawCount = c2, zr(n5) && (l4 = 0, c2 = o5.length), s5._decimated = !!a4._decimated, s5.points = o5;
        let d2 = e4.resolveDatasetElementOptions(t3);
        e4.options.showLine || (d2.borderWidth = 0), d2.segment = e4.options.segment, e4.updateElement(s5, void 0, { animated: !r4, options: d2 }, t3), e4.updateElements(o5, l4, c2, t3);
      }
      updateElements(t3, e4, n5, s5) {
        let o5 = this, a4 = s5 === "reset", { xScale: r4, yScale: l4, _stacked: c2 } = o5._cachedMeta, d2 = o5.resolveDataElementOptions(e4, s5), h4 = o5.getSharedOptions(d2), u3 = o5.includeOptions(s5, h4), f2 = o5.options.spanGaps, g2 = Mt(f2) ? f2 : Number.POSITIVE_INFINITY, p2 = o5.chart._animationsDisabled || a4 || s5 === "none", m2 = e4 > 0 && o5.getParsed(e4 - 1);
        for (let b2 = e4; b2 < e4 + n5; ++b2) {
          let _2 = t3[b2], y2 = o5.getParsed(b2), x2 = p2 ? _2 : {}, v2 = P2(y2.y), w2 = x2.x = r4.getPixelForValue(y2.x, b2), S3 = x2.y = a4 || v2 ? l4.getBasePixel() : l4.getPixelForValue(c2 ? o5.applyStack(l4, y2, c2) : y2.y, b2);
          x2.skip = isNaN(w2) || isNaN(S3) || v2, x2.stop = b2 > 0 && y2.x - m2.x > g2, x2.parsed = y2, u3 && (x2.options = h4 || o5.resolveDataElementOptions(b2, s5)), p2 || o5.updateElement(_2, b2, x2, s5), m2 = y2;
        }
        o5.updateSharedOptions(h4, s5, d2);
      }
      getMaxOverflow() {
        let t3 = this, e4 = t3._cachedMeta, n5 = e4.dataset, s5 = n5.options && n5.options.borderWidth || 0, o5 = e4.data || [];
        if (!o5.length)
          return s5;
        let a4 = o5[0].size(t3.resolveDataElementOptions(0)), r4 = o5[o5.length - 1].size(t3.resolveDataElementOptions(o5.length - 1));
        return Math.max(s5, a4, r4) / 2;
      }
      draw() {
        this._cachedMeta.dataset.updateControlPoints(this.chart.chartArea), super.draw();
      }
    };
    Ct.id = "line";
    Ct.defaults = { datasetElementType: "line", dataElementType: "point", showLine: true, spanGaps: false };
    Ct.overrides = { scales: { _index_: { type: "category" }, _value_: { type: "linear" } } };
    function Fr(i4, t3, e4) {
      let n5 = t3.length, s5 = 0, o5 = n5;
      if (i4._sorted) {
        let { iScale: a4, _parsed: r4 } = i4, l4 = a4.axis, { min: c2, max: d2, minDefined: h4, maxDefined: u3 } = a4.getUserBounds();
        h4 && (s5 = X(Math.min(Vt(r4, a4.axis, c2).lo, e4 ? n5 : Vt(t3, l4, a4.getPixelForValue(c2)).lo), 0, n5 - 1)), u3 ? o5 = X(Math.max(Vt(r4, a4.axis, d2).hi + 1, e4 ? 0 : Vt(t3, l4, a4.getPixelForValue(d2)).hi + 1), s5, n5) - s5 : o5 = n5 - s5;
      }
      return { start: s5, count: o5 };
    }
    function zr(i4) {
      let { xScale: t3, yScale: e4, _scaleRanges: n5 } = i4, s5 = { xmin: t3.min, xmax: t3.max, ymin: e4.min, ymax: e4.max };
      if (!n5)
        return i4._scaleRanges = s5, true;
      let o5 = n5.xmin !== t3.min || n5.xmax !== t3.max || n5.ymin !== e4.min || n5.ymax !== e4.max;
      return Object.assign(n5, s5), o5;
    }
    var Je = class extends J {
      constructor(t3, e4) {
        super(t3, e4);
        this.innerRadius = void 0, this.outerRadius = void 0;
      }
      update(t3) {
        let e4 = this._cachedMeta.data;
        this._updateRadius(), this.updateElements(e4, 0, e4.length, t3);
      }
      _updateRadius() {
        let t3 = this, e4 = t3.chart, n5 = e4.chartArea, s5 = e4.options, o5 = Math.min(n5.right - n5.left, n5.bottom - n5.top), a4 = Math.max(o5 / 2, 0), r4 = Math.max(s5.cutoutPercentage ? a4 / 100 * s5.cutoutPercentage : 1, 0), l4 = (a4 - r4) / e4.getVisibleDatasetCount();
        t3.outerRadius = a4 - l4 * t3.index, t3.innerRadius = t3.outerRadius - l4;
      }
      updateElements(t3, e4, n5, s5) {
        let o5 = this, a4 = s5 === "reset", r4 = o5.chart, l4 = o5.getDataset(), d2 = r4.options.animation, h4 = o5._cachedMeta.rScale, u3 = h4.xCenter, f2 = h4.yCenter, g2 = h4.getIndexAngle(0) - 0.5 * I2, p2 = g2, m2, b2 = 360 / o5.countVisibleElements();
        for (m2 = 0; m2 < e4; ++m2)
          p2 += o5._computeAngle(m2, s5, b2);
        for (m2 = e4; m2 < e4 + n5; m2++) {
          let _2 = t3[m2], y2 = p2, x2 = p2 + o5._computeAngle(m2, s5, b2), v2 = r4.getDataVisibility(m2) ? h4.getDistanceFromCenterForValue(l4.data[m2]) : 0;
          p2 = x2, a4 && (d2.animateScale && (v2 = 0), d2.animateRotate && (y2 = x2 = g2));
          let w2 = { x: u3, y: f2, innerRadius: 0, outerRadius: v2, startAngle: y2, endAngle: x2, options: o5.resolveDataElementOptions(m2, s5) };
          o5.updateElement(_2, m2, w2, s5);
        }
      }
      countVisibleElements() {
        let t3 = this.getDataset(), e4 = this._cachedMeta, n5 = 0;
        return e4.data.forEach((s5, o5) => {
          !isNaN(t3.data[o5]) && this.chart.getDataVisibility(o5) && n5++;
        }), n5;
      }
      _computeAngle(t3, e4, n5) {
        return this.chart.getDataVisibility(t3) ? Q(this.resolveDataElementOptions(t3, e4).angle || n5) : 0;
      }
    };
    Je.id = "polarArea";
    Je.defaults = { dataElementType: "arc", animation: { animateRotate: true, animateScale: true }, animations: { numbers: { type: "number", properties: ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"] } }, indexAxis: "r", startAngle: 0 };
    Je.overrides = { aspectRatio: 1, plugins: { legend: { labels: { generateLabels(i4) {
      let t3 = i4.data;
      return t3.labels.length && t3.datasets.length ? t3.labels.map((e4, n5) => {
        let o5 = i4.getDatasetMeta(0).controller.getStyle(n5);
        return { text: e4, fillStyle: o5.backgroundColor, strokeStyle: o5.borderColor, lineWidth: o5.borderWidth, hidden: !i4.getDataVisibility(n5), index: n5 };
      }) : [];
    } }, onClick(i4, t3, e4) {
      e4.chart.toggleDataVisibility(t3.index), e4.chart.update();
    } }, tooltip: { callbacks: { title() {
      return "";
    }, label(i4) {
      return i4.chart.data.labels[i4.dataIndex] + ": " + i4.formattedValue;
    } } } }, scales: { r: { type: "radialLinear", angleLines: { display: false }, beginAtZero: true, grid: { circular: true }, pointLabels: { display: false }, startAngle: 0 } } };
    var ri = class extends le {
    };
    ri.id = "pie";
    ri.defaults = { cutout: 0, rotation: 0, circumference: 360, radius: "100%" };
    var Qe = class extends J {
      getLabelAndValue(t3) {
        let e4 = this, n5 = e4._cachedMeta.vScale, s5 = e4.getParsed(t3);
        return { label: n5.getLabels()[t3], value: "" + n5.getLabelForValue(s5[n5.axis]) };
      }
      update(t3) {
        let e4 = this, n5 = e4._cachedMeta, s5 = n5.dataset, o5 = n5.data || [], a4 = n5.iScale.getLabels();
        if (s5.points = o5, t3 !== "resize") {
          let r4 = e4.resolveDatasetElementOptions(t3);
          e4.options.showLine || (r4.borderWidth = 0);
          let l4 = { _loop: true, _fullLoop: a4.length === o5.length, options: r4 };
          e4.updateElement(s5, void 0, l4, t3);
        }
        e4.updateElements(o5, 0, o5.length, t3);
      }
      updateElements(t3, e4, n5, s5) {
        let o5 = this, a4 = o5.getDataset(), r4 = o5._cachedMeta.rScale, l4 = s5 === "reset";
        for (let c2 = e4; c2 < e4 + n5; c2++) {
          let d2 = t3[c2], h4 = o5.resolveDataElementOptions(c2, s5), u3 = r4.getPointPositionForValue(c2, a4.data[c2]), f2 = l4 ? r4.xCenter : u3.x, g2 = l4 ? r4.yCenter : u3.y, p2 = { x: f2, y: g2, angle: u3.angle, skip: isNaN(f2) || isNaN(g2), options: h4 };
          o5.updateElement(d2, c2, p2, s5);
        }
      }
    };
    Qe.id = "radar";
    Qe.defaults = { datasetElementType: "line", dataElementType: "point", indexAxis: "r", showLine: true, elements: { line: { fill: "start" } } };
    Qe.overrides = { aspectRatio: 1, scales: { r: { type: "radialLinear" } } };
    var tn = class extends Ct {
    };
    tn.id = "scatter";
    tn.defaults = { showLine: false, fill: false };
    tn.overrides = { interaction: { mode: "point" }, plugins: { tooltip: { callbacks: { title() {
      return "";
    }, label(i4) {
      return "(" + i4.label + ", " + i4.formattedValue + ")";
    } } } }, scales: { x: { type: "linear" }, y: { type: "linear" } } };
    function Dt() {
      throw new Error("This method is not implemented: either no adapter can be found or an incomplete integration was provided.");
    }
    var en = class {
      constructor(t3) {
        this.options = t3 || {};
      }
      formats() {
        return Dt();
      }
      parse(t3, e4) {
        return Dt();
      }
      format(t3, e4) {
        return Dt();
      }
      add(t3, e4, n5) {
        return Dt();
      }
      diff(t3, e4, n5) {
        return Dt();
      }
      startOf(t3, e4, n5) {
        return Dt();
      }
      endOf(t3, e4) {
        return Dt();
      }
    };
    en.override = function(i4) {
      Object.assign(en.prototype, i4);
    };
    var Ir = { _date: en };
    function ce(i4, t3) {
      return "native" in i4 ? { x: i4.x, y: i4.y } : Qn(i4, t3);
    }
    function Br(i4, t3) {
      let e4 = i4.getSortedVisibleDatasetMetas(), n5, s5, o5;
      for (let a4 = 0, r4 = e4.length; a4 < r4; ++a4) {
        ({ index: n5, data: s5 } = e4[a4]);
        for (let l4 = 0, c2 = s5.length; l4 < c2; ++l4)
          o5 = s5[l4], o5.skip || t3(o5, n5, l4);
      }
    }
    function Hr(i4, t3, e4, n5) {
      let { controller: s5, data: o5, _sorted: a4 } = i4, r4 = s5._cachedMeta.iScale;
      if (r4 && t3 === r4.axis && a4 && o5.length) {
        let l4 = r4._reversePixels ? Ms : Vt;
        if (n5) {
          if (s5._sharedOptions) {
            let c2 = o5[0], d2 = typeof c2.getRange == "function" && c2.getRange(t3);
            if (d2) {
              let h4 = l4(o5, t3, e4 - d2), u3 = l4(o5, t3, e4 + d2);
              return { lo: h4.lo, hi: u3.hi };
            }
          }
        } else
          return l4(o5, t3, e4);
      }
      return { lo: 0, hi: o5.length - 1 };
    }
    function ao(i4, t3, e4, n5, s5) {
      let o5 = i4.getSortedVisibleDatasetMetas(), a4 = e4[t3];
      for (let r4 = 0, l4 = o5.length; r4 < l4; ++r4) {
        let { index: c2, data: d2 } = o5[r4], { lo: h4, hi: u3 } = Hr(o5[r4], t3, a4, s5);
        for (let f2 = h4; f2 <= u3; ++f2) {
          let g2 = d2[f2];
          g2.skip || n5(g2, c2, f2);
        }
      }
    }
    function Vr(i4) {
      let t3 = i4.indexOf("x") !== -1, e4 = i4.indexOf("y") !== -1;
      return function(n5, s5) {
        let o5 = t3 ? Math.abs(n5.x - s5.x) : 0, a4 = e4 ? Math.abs(n5.y - s5.y) : 0;
        return Math.sqrt(Math.pow(o5, 2) + Math.pow(a4, 2));
      };
    }
    function li(i4, t3, e4, n5) {
      let s5 = [];
      return Ht(t3, i4.chartArea, i4._minPadding) && ao(i4, e4, t3, function(a4, r4, l4) {
        a4.inRange(t3.x, t3.y, n5) && s5.push({ element: a4, datasetIndex: r4, index: l4 });
      }, true), s5;
    }
    function ci(i4, t3, e4, n5, s5) {
      let o5 = Vr(e4), a4 = Number.POSITIVE_INFINITY, r4 = [];
      return Ht(t3, i4.chartArea, i4._minPadding) && ao(i4, e4, t3, function(c2, d2, h4) {
        if (n5 && !c2.inRange(t3.x, t3.y, s5))
          return;
        let u3 = c2.getCenterPoint(s5), f2 = o5(t3, u3);
        f2 < a4 ? (r4 = [{ element: c2, datasetIndex: d2, index: h4 }], a4 = f2) : f2 === a4 && r4.push({ element: c2, datasetIndex: d2, index: h4 });
      }), r4;
    }
    function ro(i4, t3, e4, n5) {
      let s5 = ce(t3, i4), o5 = [], a4 = e4.axis, r4 = a4 === "x" ? "inXRange" : "inYRange", l4 = false;
      return Br(i4, (c2, d2, h4) => {
        c2[r4](s5[a4], n5) && o5.push({ element: c2, datasetIndex: d2, index: h4 }), c2.inRange(s5.x, s5.y, n5) && (l4 = true);
      }), e4.intersect && !l4 ? [] : o5;
    }
    var Wr = { modes: { index(i4, t3, e4, n5) {
      let s5 = ce(t3, i4), o5 = e4.axis || "x", a4 = e4.intersect ? li(i4, s5, o5, n5) : ci(i4, s5, o5, false, n5), r4 = [];
      return a4.length ? (i4.getSortedVisibleDatasetMetas().forEach((l4) => {
        let c2 = a4[0].index, d2 = l4.data[c2];
        d2 && !d2.skip && r4.push({ element: d2, datasetIndex: l4.index, index: c2 });
      }), r4) : [];
    }, dataset(i4, t3, e4, n5) {
      let s5 = ce(t3, i4), o5 = e4.axis || "xy", a4 = e4.intersect ? li(i4, s5, o5, n5) : ci(i4, s5, o5, false, n5);
      if (a4.length > 0) {
        let r4 = a4[0].datasetIndex, l4 = i4.getDatasetMeta(r4).data;
        a4 = [];
        for (let c2 = 0; c2 < l4.length; ++c2)
          a4.push({ element: l4[c2], datasetIndex: r4, index: c2 });
      }
      return a4;
    }, point(i4, t3, e4, n5) {
      let s5 = ce(t3, i4), o5 = e4.axis || "xy";
      return li(i4, s5, o5, n5);
    }, nearest(i4, t3, e4, n5) {
      let s5 = ce(t3, i4), o5 = e4.axis || "xy";
      return ci(i4, s5, o5, e4.intersect, n5);
    }, x(i4, t3, e4, n5) {
      return e4.axis = "x", ro(i4, t3, e4, n5);
    }, y(i4, t3, e4, n5) {
      return e4.axis = "y", ro(i4, t3, e4, n5);
    } } }, Nr = ["left", "top", "right", "bottom"];
    function de(i4, t3) {
      return i4.filter((e4) => e4.pos === t3);
    }
    function lo(i4, t3) {
      return i4.filter((e4) => Nr.indexOf(e4.pos) === -1 && e4.box.axis === t3);
    }
    function he(i4, t3) {
      return i4.sort((e4, n5) => {
        let s5 = t3 ? n5 : e4, o5 = t3 ? e4 : n5;
        return s5.weight === o5.weight ? s5.index - o5.index : s5.weight - o5.weight;
      });
    }
    function jr(i4) {
      let t3 = [], e4, n5, s5;
      for (e4 = 0, n5 = (i4 || []).length; e4 < n5; ++e4)
        s5 = i4[e4], t3.push({ index: e4, box: s5, pos: s5.position, horizontal: s5.isHorizontal(), weight: s5.weight });
      return t3;
    }
    function $r(i4, t3) {
      let e4, n5, s5;
      for (e4 = 0, n5 = i4.length; e4 < n5; ++e4)
        s5 = i4[e4], s5.horizontal ? (s5.width = s5.box.fullSize && t3.availableWidth, s5.height = t3.hBoxMaxHeight) : (s5.width = t3.vBoxMaxWidth, s5.height = s5.box.fullSize && t3.availableHeight);
    }
    function Ur(i4) {
      let t3 = jr(i4), e4 = he(t3.filter((c2) => c2.box.fullSize), true), n5 = he(de(t3, "left"), true), s5 = he(de(t3, "right")), o5 = he(de(t3, "top"), true), a4 = he(de(t3, "bottom")), r4 = lo(t3, "x"), l4 = lo(t3, "y");
      return { fullSize: e4, leftAndTop: n5.concat(o5), rightAndBottom: s5.concat(l4).concat(a4).concat(r4), chartArea: de(t3, "chartArea"), vertical: n5.concat(s5).concat(l4), horizontal: o5.concat(a4).concat(r4) };
    }
    function co(i4, t3, e4, n5) {
      return Math.max(i4[e4], t3[e4]) + Math.max(i4[n5], t3[n5]);
    }
    function ho(i4, t3) {
      i4.top = Math.max(i4.top, t3.top), i4.left = Math.max(i4.left, t3.left), i4.bottom = Math.max(i4.bottom, t3.bottom), i4.right = Math.max(i4.right, t3.right);
    }
    function Yr(i4, t3, e4) {
      let n5 = e4.box, s5 = i4.maxPadding;
      O(e4.pos) || (e4.size && (i4[e4.pos] -= e4.size), e4.size = e4.horizontal ? n5.height : n5.width, i4[e4.pos] += e4.size), n5.getPadding && ho(s5, n5.getPadding());
      let o5 = Math.max(0, t3.outerWidth - co(s5, i4, "left", "right")), a4 = Math.max(0, t3.outerHeight - co(s5, i4, "top", "bottom")), r4 = o5 !== i4.w, l4 = a4 !== i4.h;
      return i4.w = o5, i4.h = a4, e4.horizontal ? { same: r4, other: l4 } : { same: l4, other: r4 };
    }
    function Xr(i4) {
      let t3 = i4.maxPadding;
      function e4(n5) {
        let s5 = Math.max(t3[n5] - i4[n5], 0);
        return i4[n5] += s5, s5;
      }
      i4.y += e4("top"), i4.x += e4("left"), e4("right"), e4("bottom");
    }
    function qr(i4, t3) {
      let e4 = t3.maxPadding;
      function n5(s5) {
        let o5 = { left: 0, top: 0, right: 0, bottom: 0 };
        return s5.forEach((a4) => {
          o5[a4] = Math.max(t3[a4], e4[a4]);
        }), o5;
      }
      return n5(i4 ? ["left", "right"] : ["top", "bottom"]);
    }
    function ue(i4, t3, e4) {
      let n5 = [], s5, o5, a4, r4, l4, c2;
      for (s5 = 0, o5 = i4.length, l4 = 0; s5 < o5; ++s5) {
        a4 = i4[s5], r4 = a4.box, r4.update(a4.width || t3.w, a4.height || t3.h, qr(a4.horizontal, t3));
        let { same: d2, other: h4 } = Yr(t3, e4, a4);
        l4 |= d2 && n5.length, c2 = c2 || h4, r4.fullSize || n5.push(a4);
      }
      return l4 && ue(n5, t3, e4) || c2;
    }
    function uo(i4, t3, e4) {
      let n5 = e4.padding, s5 = t3.x, o5 = t3.y, a4, r4, l4, c2;
      for (a4 = 0, r4 = i4.length; a4 < r4; ++a4)
        l4 = i4[a4], c2 = l4.box, l4.horizontal ? (c2.left = c2.fullSize ? n5.left : t3.left, c2.right = c2.fullSize ? e4.outerWidth - n5.right : t3.left + t3.w, c2.top = o5, c2.bottom = o5 + c2.height, c2.width = c2.right - c2.left, o5 = c2.bottom) : (c2.left = s5, c2.right = s5 + c2.width, c2.top = c2.fullSize ? n5.top : t3.top, c2.bottom = c2.fullSize ? e4.outerHeight - n5.right : t3.top + t3.h, c2.height = c2.bottom - c2.top, s5 = c2.right);
      t3.x = s5, t3.y = o5;
    }
    k2.set("layout", { padding: { top: 0, right: 0, bottom: 0, left: 0 } });
    var nn = { addBox(i4, t3) {
      i4.boxes || (i4.boxes = []), t3.fullSize = t3.fullSize || false, t3.position = t3.position || "top", t3.weight = t3.weight || 0, t3._layers = t3._layers || function() {
        return [{ z: 0, draw(e4) {
          t3.draw(e4);
        } }];
      }, i4.boxes.push(t3);
    }, removeBox(i4, t3) {
      let e4 = i4.boxes ? i4.boxes.indexOf(t3) : -1;
      e4 !== -1 && i4.boxes.splice(e4, 1);
    }, configure(i4, t3, e4) {
      t3.fullSize = e4.fullSize, t3.position = e4.position, t3.weight = e4.weight;
    }, update(i4, t3, e4, n5) {
      if (!i4)
        return;
      let s5 = G(i4.options.layout.padding), o5 = t3 - s5.width, a4 = e4 - s5.height, r4 = Ur(i4.boxes), l4 = r4.vertical, c2 = r4.horizontal;
      D(i4.boxes, (g2) => {
        typeof g2.beforeLayout == "function" && g2.beforeLayout();
      });
      let d2 = l4.reduce((g2, p2) => p2.box.options && p2.box.options.display === false ? g2 : g2 + 1, 0) || 1, h4 = Object.freeze({ outerWidth: t3, outerHeight: e4, padding: s5, availableWidth: o5, availableHeight: a4, vBoxMaxWidth: o5 / 2 / d2, hBoxMaxHeight: a4 / 2 }), u3 = Object.assign({}, s5);
      ho(u3, G(n5));
      let f2 = Object.assign({ maxPadding: u3, w: o5, h: a4, x: s5.left, y: s5.top }, s5);
      $r(l4.concat(c2), h4), ue(r4.fullSize, f2, h4), ue(l4, f2, h4), ue(c2, f2, h4) && ue(l4, f2, h4), Xr(f2), uo(r4.leftAndTop, f2, h4), f2.x += f2.w, f2.y += f2.h, uo(r4.rightAndBottom, f2, h4), i4.chartArea = { left: f2.left, top: f2.top, right: f2.left + f2.w, bottom: f2.top + f2.h, height: f2.h, width: f2.w }, D(r4.chartArea, (g2) => {
        let p2 = g2.box;
        Object.assign(p2, i4.chartArea), p2.update(f2.w, f2.h);
      });
    } }, di = class {
      acquireContext(t3, e4) {
      }
      releaseContext(t3) {
        return false;
      }
      addEventListener(t3, e4, n5) {
      }
      removeEventListener(t3, e4, n5) {
      }
      getDevicePixelRatio() {
        return 1;
      }
      getMaximumSize(t3, e4, n5, s5) {
        return e4 = Math.max(0, e4 || t3.width), n5 = n5 || t3.height, { width: e4, height: Math.max(0, s5 ? Math.floor(e4 / s5) : n5) };
      }
      isAttached(t3) {
        return true;
      }
    }, fo = class extends di {
      acquireContext(t3) {
        return t3 && t3.getContext && t3.getContext("2d") || null;
      }
    }, sn = "$chartjs", Kr = { touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup", pointerenter: "mouseenter", pointerdown: "mousedown", pointermove: "mousemove", pointerup: "mouseup", pointerleave: "mouseout", pointerout: "mouseout" }, go = (i4) => i4 === null || i4 === "";
    function Gr(i4, t3) {
      let e4 = i4.style, n5 = i4.getAttribute("height"), s5 = i4.getAttribute("width");
      if (i4[sn] = { initial: { height: n5, width: s5, style: { display: e4.display, height: e4.height, width: e4.width } } }, e4.display = e4.display || "block", e4.boxSizing = e4.boxSizing || "border-box", go(s5)) {
        let o5 = ni(i4, "width");
        o5 !== void 0 && (i4.width = o5);
      }
      if (go(n5))
        if (i4.style.height === "")
          i4.height = i4.width / (t3 || 2);
        else {
          let o5 = ni(i4, "height");
          o5 !== void 0 && (i4.height = o5);
        }
      return i4;
    }
    var po = zs ? { passive: true } : false;
    function Zr(i4, t3, e4) {
      i4.addEventListener(t3, e4, po);
    }
    function Jr(i4, t3, e4) {
      i4.canvas.removeEventListener(t3, e4, po);
    }
    function Qr(i4, t3) {
      let e4 = Kr[i4.type] || i4.type, { x: n5, y: s5 } = Qn(i4, t3);
      return { type: e4, chart: t3, native: i4, x: n5 !== void 0 ? n5 : null, y: s5 !== void 0 ? s5 : null };
    }
    function tl(i4, t3, e4) {
      let n5 = i4.canvas, o5 = n5 && pt(n5) || n5, a4 = new MutationObserver((r4) => {
        let l4 = pt(o5);
        r4.forEach((c2) => {
          for (let d2 = 0; d2 < c2.addedNodes.length; d2++) {
            let h4 = c2.addedNodes[d2];
            (h4 === o5 || h4 === l4) && e4(c2.target);
          }
        });
      });
      return a4.observe(document, { childList: true, subtree: true }), a4;
    }
    function el(i4, t3, e4) {
      let n5 = i4.canvas, s5 = n5 && pt(n5);
      if (!s5)
        return;
      let o5 = new MutationObserver((a4) => {
        a4.forEach((r4) => {
          for (let l4 = 0; l4 < r4.removedNodes.length; l4++)
            if (r4.removedNodes[l4] === n5) {
              e4();
              break;
            }
        });
      });
      return o5.observe(s5, { childList: true }), o5;
    }
    var fe = new Map(), mo = 0;
    function bo() {
      let i4 = window.devicePixelRatio;
      i4 !== mo && (mo = i4, fe.forEach((t3, e4) => {
        e4.currentDevicePixelRatio !== i4 && t3();
      }));
    }
    function nl(i4, t3) {
      fe.size || window.addEventListener("resize", bo), fe.set(i4, t3);
    }
    function il(i4) {
      fe.delete(i4), fe.size || window.removeEventListener("resize", bo);
    }
    function sl(i4, t3, e4) {
      let n5 = i4.canvas, s5 = n5 && pt(n5);
      if (!s5)
        return;
      let o5 = En((r4, l4) => {
        let c2 = s5.clientWidth;
        e4(r4, l4), c2 < s5.clientWidth && e4();
      }, window), a4 = new ResizeObserver((r4) => {
        let l4 = r4[0], c2 = l4.contentRect.width, d2 = l4.contentRect.height;
        c2 === 0 && d2 === 0 || o5(c2, d2);
      });
      return a4.observe(s5), nl(i4, o5), a4;
    }
    function hi(i4, t3, e4) {
      e4 && e4.disconnect(), t3 === "resize" && il(i4);
    }
    function ol(i4, t3, e4) {
      let n5 = i4.canvas, s5 = En((o5) => {
        i4.ctx !== null && e4(Qr(o5, i4));
      }, i4, (o5) => {
        let a4 = o5[0];
        return [a4, a4.offsetX, a4.offsetY];
      });
      return Zr(n5, t3, s5), s5;
    }
    var xo = class extends di {
      acquireContext(t3, e4) {
        let n5 = t3 && t3.getContext && t3.getContext("2d");
        return n5 && n5.canvas === t3 ? (Gr(t3, e4), n5) : null;
      }
      releaseContext(t3) {
        let e4 = t3.canvas;
        if (!e4[sn])
          return false;
        let n5 = e4[sn].initial;
        ["height", "width"].forEach((o5) => {
          let a4 = n5[o5];
          P2(a4) ? e4.removeAttribute(o5) : e4.setAttribute(o5, a4);
        });
        let s5 = n5.style || {};
        return Object.keys(s5).forEach((o5) => {
          e4.style[o5] = s5[o5];
        }), e4.width = e4.width, delete e4[sn], true;
      }
      addEventListener(t3, e4, n5) {
        this.removeEventListener(t3, e4);
        let s5 = t3.$proxies || (t3.$proxies = {}), a4 = { attach: tl, detach: el, resize: sl }[e4] || ol;
        s5[e4] = a4(t3, e4, n5);
      }
      removeEventListener(t3, e4) {
        let n5 = t3.$proxies || (t3.$proxies = {}), s5 = n5[e4];
        if (!s5)
          return;
        ({ attach: hi, detach: hi, resize: hi }[e4] || Jr)(t3, e4, s5), n5[e4] = void 0;
      }
      getDevicePixelRatio() {
        return window.devicePixelRatio;
      }
      getMaximumSize(t3, e4, n5, s5) {
        return Fs(t3, e4, n5, s5);
      }
      isAttached(t3) {
        let e4 = pt(t3);
        return !!(e4 && pt(e4));
      }
    }, et = class {
      constructor() {
        this.x = void 0, this.y = void 0, this.active = false, this.options = void 0, this.$animations = void 0;
      }
      tooltipPosition(t3) {
        let { x: e4, y: n5 } = this.getProps(["x", "y"], t3);
        return { x: e4, y: n5 };
      }
      hasValue() {
        return Mt(this.x) && Mt(this.y);
      }
      getProps(t3, e4) {
        let n5 = this, s5 = this.$animations;
        if (!e4 || !s5)
          return n5;
        let o5 = {};
        return t3.forEach((a4) => {
          o5[a4] = s5[a4] && s5[a4].active() ? s5[a4]._to : n5[a4];
        }), o5;
      }
    };
    et.defaults = {};
    et.defaultRoutes = void 0;
    var _o = { values(i4) {
      return T2(i4) ? i4 : "" + i4;
    }, numeric(i4, t3, e4) {
      if (i4 === 0)
        return "0";
      let n5 = this.chart.options.locale, s5, o5 = i4;
      if (e4.length > 1) {
        let c2 = Math.max(Math.abs(e4[0].value), Math.abs(e4[e4.length - 1].value));
        (c2 < 1e-4 || c2 > 1e15) && (s5 = "scientific"), o5 = al(i4, e4);
      }
      let a4 = Y(Math.abs(o5)), r4 = Math.max(Math.min(-1 * Math.floor(a4), 20), 0), l4 = { notation: s5, minimumFractionDigits: r4, maximumFractionDigits: r4 };
      return Object.assign(l4, this.options.ticks.format), re(i4, n5, l4);
    }, logarithmic(i4, t3, e4) {
      if (i4 === 0)
        return "0";
      let n5 = i4 / Math.pow(10, Math.floor(Y(i4)));
      return n5 === 1 || n5 === 2 || n5 === 5 ? _o.numeric.call(this, i4, t3, e4) : "";
    } };
    function al(i4, t3) {
      let e4 = t3.length > 3 ? t3[2].value - t3[1].value : t3[1].value - t3[0].value;
      return Math.abs(e4) > 1 && i4 !== Math.floor(i4) && (e4 = i4 - Math.floor(i4)), e4;
    }
    var on = { formatters: _o };
    k2.set("scale", { display: true, offset: false, reverse: false, beginAtZero: false, bounds: "ticks", grace: 0, grid: { display: true, lineWidth: 1, drawBorder: true, drawOnChartArea: true, drawTicks: true, tickLength: 8, tickWidth: (i4, t3) => t3.lineWidth, tickColor: (i4, t3) => t3.color, offset: false, borderDash: [], borderDashOffset: 0, borderWidth: 1 }, title: { display: false, text: "", padding: { top: 4, bottom: 4 } }, ticks: { minRotation: 0, maxRotation: 50, mirror: false, textStrokeWidth: 0, textStrokeColor: "", padding: 3, display: true, autoSkip: true, autoSkipPadding: 3, labelOffset: 0, callback: on.formatters.values, minor: {}, major: {}, align: "center", crossAlign: "near", showLabelBackdrop: false, backdropColor: "rgba(255, 255, 255, 0.75)", backdropPadding: 2 } });
    k2.route("scale.ticks", "color", "", "color");
    k2.route("scale.grid", "color", "", "borderColor");
    k2.route("scale.grid", "borderColor", "", "borderColor");
    k2.route("scale.title", "color", "", "color");
    k2.describe("scale", { _fallback: false, _scriptable: (i4) => !i4.startsWith("before") && !i4.startsWith("after") && i4 !== "callback" && i4 !== "parser", _indexable: (i4) => i4 !== "borderDash" && i4 !== "tickBorderDash" });
    k2.describe("scales", { _fallback: "scale" });
    function rl(i4, t3) {
      let e4 = i4.options.ticks, n5 = e4.maxTicksLimit || ll(i4), s5 = e4.major.enabled ? dl(t3) : [], o5 = s5.length, a4 = s5[0], r4 = s5[o5 - 1], l4 = [];
      if (o5 > n5)
        return hl(t3, l4, s5, o5 / n5), l4;
      let c2 = cl(s5, t3, n5);
      if (o5 > 0) {
        let d2, h4, u3 = o5 > 1 ? Math.round((r4 - a4) / (o5 - 1)) : null;
        for (an(t3, l4, c2, P2(u3) ? 0 : a4 - u3, a4), d2 = 0, h4 = o5 - 1; d2 < h4; d2++)
          an(t3, l4, c2, s5[d2], s5[d2 + 1]);
        return an(t3, l4, c2, r4, P2(u3) ? t3.length : r4 + u3), l4;
      }
      return an(t3, l4, c2), l4;
    }
    function ll(i4) {
      let t3 = i4.options.offset, e4 = i4._tickSize(), n5 = i4._length / e4 + (t3 ? 0 : 1), s5 = i4._maxLength / e4;
      return Math.floor(Math.min(n5, s5));
    }
    function cl(i4, t3, e4) {
      let n5 = ul(i4), s5 = t3.length / e4;
      if (!n5)
        return Math.max(s5, 1);
      let o5 = is(n5);
      for (let a4 = 0, r4 = o5.length - 1; a4 < r4; a4++) {
        let l4 = o5[a4];
        if (l4 > s5)
          return l4;
      }
      return Math.max(s5, 1);
    }
    function dl(i4) {
      let t3 = [], e4, n5;
      for (e4 = 0, n5 = i4.length; e4 < n5; e4++)
        i4[e4].major && t3.push(e4);
      return t3;
    }
    function hl(i4, t3, e4, n5) {
      let s5 = 0, o5 = e4[0], a4;
      for (n5 = Math.ceil(n5), a4 = 0; a4 < i4.length; a4++)
        a4 === o5 && (t3.push(i4[a4]), s5++, o5 = e4[s5 * n5]);
    }
    function an(i4, t3, e4, n5, s5) {
      let o5 = C2(n5, 0), a4 = Math.min(C2(s5, i4.length), i4.length), r4 = 0, l4, c2, d2;
      for (e4 = Math.ceil(e4), s5 && (l4 = s5 - n5, e4 = l4 / Math.floor(l4 / e4)), d2 = o5; d2 < 0; )
        r4++, d2 = Math.round(o5 + r4 * e4);
      for (c2 = Math.max(o5, 0); c2 < a4; c2++)
        c2 === d2 && (t3.push(i4[c2]), r4++, d2 = Math.round(o5 + r4 * e4));
    }
    function ul(i4) {
      let t3 = i4.length, e4, n5;
      if (t3 < 2)
        return false;
      for (n5 = i4[0], e4 = 1; e4 < t3; ++e4)
        if (i4[e4] - i4[e4 - 1] !== n5)
          return false;
      return n5;
    }
    var fl = (i4) => i4 === "left" ? "right" : i4 === "right" ? "left" : i4, yo = (i4, t3, e4) => t3 === "top" || t3 === "left" ? i4[t3] + e4 : i4[t3] - e4;
    function vo(i4, t3) {
      let e4 = [], n5 = i4.length / t3, s5 = i4.length, o5 = 0;
      for (; o5 < s5; o5 += n5)
        e4.push(i4[Math.floor(o5)]);
      return e4;
    }
    function gl(i4, t3, e4) {
      let n5 = i4.ticks.length, s5 = Math.min(t3, n5 - 1), o5 = i4._startPixel, a4 = i4._endPixel, r4 = 1e-6, l4 = i4.getPixelForTick(s5), c2;
      if (!(e4 && (n5 === 1 ? c2 = Math.max(l4 - o5, a4 - l4) : t3 === 0 ? c2 = (i4.getPixelForTick(1) - l4) / 2 : c2 = (l4 - i4.getPixelForTick(s5 - 1)) / 2, l4 += s5 < t3 ? c2 : -c2, l4 < o5 - r4 || l4 > a4 + r4)))
        return l4;
    }
    function pl(i4, t3) {
      D(i4, (e4) => {
        let n5 = e4.gc, s5 = n5.length / 2, o5;
        if (s5 > t3) {
          for (o5 = 0; o5 < s5; ++o5)
            delete e4.data[n5[o5]];
          n5.splice(0, s5);
        }
      });
    }
    function ge(i4) {
      return i4.drawTicks ? i4.tickLength : 0;
    }
    function wo(i4, t3) {
      if (!i4.display)
        return 0;
      let e4 = N2(i4.font, t3), n5 = G(i4.padding);
      return (T2(i4.text) ? i4.text.length : 1) * e4.lineHeight + n5.height;
    }
    function ml(i4, t3) {
      return Object.assign(Object.create(i4), { scale: t3, type: "scale" });
    }
    function bl(i4, t3, e4) {
      return Object.assign(Object.create(i4), { tick: e4, index: t3, type: "tick" });
    }
    function xl(i4, t3, e4) {
      let n5 = Gi(i4);
      return (e4 && t3 !== "right" || !e4 && t3 === "right") && (n5 = fl(n5)), n5;
    }
    function _l(i4, t3, e4, n5) {
      let { top: s5, left: o5, bottom: a4, right: r4 } = i4, l4 = 0, c2, d2, h4;
      return i4.isHorizontal() ? (d2 = Fn(n5, o5, r4), h4 = yo(i4, e4, t3), c2 = r4 - o5) : (d2 = yo(i4, e4, t3), h4 = Fn(n5, a4, s5), l4 = e4 === "left" ? -L2 : L2), { titleX: d2, titleY: h4, maxWidth: c2, rotation: l4 };
    }
    var bt = class extends et {
      constructor(t3) {
        super();
        this.id = t3.id, this.type = t3.type, this.options = void 0, this.ctx = t3.ctx, this.chart = t3.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = { left: 0, right: 0, top: 0, bottom: 0 }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = false, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = false, this.$context = void 0;
      }
      init(t3) {
        let e4 = this;
        e4.options = t3.setContext(e4.getContext()), e4.axis = t3.axis, e4._userMin = e4.parse(t3.min), e4._userMax = e4.parse(t3.max), e4._suggestedMin = e4.parse(t3.suggestedMin), e4._suggestedMax = e4.parse(t3.suggestedMax);
      }
      parse(t3, e4) {
        return t3;
      }
      getUserBounds() {
        let { _userMin: t3, _userMax: e4, _suggestedMin: n5, _suggestedMax: s5 } = this;
        return t3 = U(t3, Number.POSITIVE_INFINITY), e4 = U(e4, Number.NEGATIVE_INFINITY), n5 = U(n5, Number.POSITIVE_INFINITY), s5 = U(s5, Number.NEGATIVE_INFINITY), { min: U(t3, n5), max: U(e4, s5), minDefined: B(t3), maxDefined: B(e4) };
      }
      getMinMax(t3) {
        let e4 = this, { min: n5, max: s5, minDefined: o5, maxDefined: a4 } = e4.getUserBounds(), r4;
        if (o5 && a4)
          return { min: n5, max: s5 };
        let l4 = e4.getMatchingVisibleMetas();
        for (let c2 = 0, d2 = l4.length; c2 < d2; ++c2)
          r4 = l4[c2].controller.getMinMax(e4, t3), o5 || (n5 = Math.min(n5, r4.min)), a4 || (s5 = Math.max(s5, r4.max));
        return { min: U(n5, U(s5, n5)), max: U(s5, U(n5, s5)) };
      }
      getPadding() {
        let t3 = this;
        return { left: t3.paddingLeft || 0, top: t3.paddingTop || 0, right: t3.paddingRight || 0, bottom: t3.paddingBottom || 0 };
      }
      getTicks() {
        return this.ticks;
      }
      getLabels() {
        let t3 = this.chart.data;
        return this.options.labels || (this.isHorizontal() ? t3.xLabels : t3.yLabels) || t3.labels || [];
      }
      beforeLayout() {
        this._cache = {}, this._dataLimitsCached = false;
      }
      beforeUpdate() {
        R2(this.options.beforeUpdate, [this]);
      }
      update(t3, e4, n5) {
        let s5 = this, o5 = s5.options.ticks, a4 = o5.sampleSize;
        s5.beforeUpdate(), s5.maxWidth = t3, s5.maxHeight = e4, s5._margins = n5 = Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, n5), s5.ticks = null, s5._labelSizes = null, s5._gridLineItems = null, s5._labelItems = null, s5.beforeSetDimensions(), s5.setDimensions(), s5.afterSetDimensions(), s5._maxLength = s5.isHorizontal() ? s5.width + n5.left + n5.right : s5.height + n5.top + n5.bottom, s5._dataLimitsCached || (s5.beforeDataLimits(), s5.determineDataLimits(), s5.afterDataLimits(), s5._range = Ss(s5, s5.options.grace), s5._dataLimitsCached = true), s5.beforeBuildTicks(), s5.ticks = s5.buildTicks() || [], s5.afterBuildTicks();
        let r4 = a4 < s5.ticks.length;
        s5._convertTicksToLabels(r4 ? vo(s5.ticks, a4) : s5.ticks), s5.configure(), s5.beforeCalculateLabelRotation(), s5.calculateLabelRotation(), s5.afterCalculateLabelRotation(), o5.display && (o5.autoSkip || o5.source === "auto") && (s5.ticks = rl(s5, s5.ticks), s5._labelSizes = null), r4 && s5._convertTicksToLabels(s5.ticks), s5.beforeFit(), s5.fit(), s5.afterFit(), s5.afterUpdate();
      }
      configure() {
        let t3 = this, e4 = t3.options.reverse, n5, s5;
        t3.isHorizontal() ? (n5 = t3.left, s5 = t3.right) : (n5 = t3.top, s5 = t3.bottom, e4 = !e4), t3._startPixel = n5, t3._endPixel = s5, t3._reversePixels = e4, t3._length = s5 - n5, t3._alignToPixels = t3.options.alignToPixels;
      }
      afterUpdate() {
        R2(this.options.afterUpdate, [this]);
      }
      beforeSetDimensions() {
        R2(this.options.beforeSetDimensions, [this]);
      }
      setDimensions() {
        let t3 = this;
        t3.isHorizontal() ? (t3.width = t3.maxWidth, t3.left = 0, t3.right = t3.width) : (t3.height = t3.maxHeight, t3.top = 0, t3.bottom = t3.height), t3.paddingLeft = 0, t3.paddingTop = 0, t3.paddingRight = 0, t3.paddingBottom = 0;
      }
      afterSetDimensions() {
        R2(this.options.afterSetDimensions, [this]);
      }
      _callHooks(t3) {
        let e4 = this;
        e4.chart.notifyPlugins(t3, e4.getContext()), R2(e4.options[t3], [e4]);
      }
      beforeDataLimits() {
        this._callHooks("beforeDataLimits");
      }
      determineDataLimits() {
      }
      afterDataLimits() {
        this._callHooks("afterDataLimits");
      }
      beforeBuildTicks() {
        this._callHooks("beforeBuildTicks");
      }
      buildTicks() {
        return [];
      }
      afterBuildTicks() {
        this._callHooks("afterBuildTicks");
      }
      beforeTickToLabelConversion() {
        R2(this.options.beforeTickToLabelConversion, [this]);
      }
      generateTickLabels(t3) {
        let e4 = this, n5 = e4.options.ticks, s5, o5, a4;
        for (s5 = 0, o5 = t3.length; s5 < o5; s5++)
          a4 = t3[s5], a4.label = R2(n5.callback, [a4.value, s5, t3], e4);
        for (s5 = 0; s5 < o5; s5++)
          P2(t3[s5].label) && (t3.splice(s5, 1), o5--, s5--);
      }
      afterTickToLabelConversion() {
        R2(this.options.afterTickToLabelConversion, [this]);
      }
      beforeCalculateLabelRotation() {
        R2(this.options.beforeCalculateLabelRotation, [this]);
      }
      calculateLabelRotation() {
        let t3 = this, e4 = t3.options, n5 = e4.ticks, s5 = t3.ticks.length, o5 = n5.minRotation || 0, a4 = n5.maxRotation, r4 = o5, l4, c2, d2;
        if (!t3._isVisible() || !n5.display || o5 >= a4 || s5 <= 1 || !t3.isHorizontal()) {
          t3.labelRotation = o5;
          return;
        }
        let h4 = t3._getLabelSizes(), u3 = h4.widest.width, f2 = h4.highest.height, g2 = X(t3.chart.width - u3, 0, t3.maxWidth);
        l4 = e4.offset ? t3.maxWidth / s5 : g2 / (s5 - 1), u3 + 6 > l4 && (l4 = g2 / (s5 - (e4.offset ? 0.5 : 1)), c2 = t3.maxHeight - ge(e4.grid) - n5.padding - wo(e4.title, t3.chart.options.font), d2 = Math.sqrt(u3 * u3 + f2 * f2), r4 = Te(Math.min(Math.asin(Math.min((h4.highest.height + 6) / l4, 1)), Math.asin(Math.min(c2 / d2, 1)) - Math.asin(f2 / d2))), r4 = Math.max(o5, Math.min(a4, r4))), t3.labelRotation = r4;
      }
      afterCalculateLabelRotation() {
        R2(this.options.afterCalculateLabelRotation, [this]);
      }
      beforeFit() {
        R2(this.options.beforeFit, [this]);
      }
      fit() {
        let t3 = this, e4 = { width: 0, height: 0 }, { chart: n5, options: { ticks: s5, title: o5, grid: a4 } } = t3, r4 = t3._isVisible(), l4 = t3.isHorizontal();
        if (r4) {
          let c2 = wo(o5, n5.options.font);
          if (l4 ? (e4.width = t3.maxWidth, e4.height = ge(a4) + c2) : (e4.height = t3.maxHeight, e4.width = ge(a4) + c2), s5.display && t3.ticks.length) {
            let { first: d2, last: h4, widest: u3, highest: f2 } = t3._getLabelSizes(), g2 = s5.padding * 2, p2 = Q(t3.labelRotation), m2 = Math.cos(p2), b2 = Math.sin(p2);
            if (l4) {
              let _2 = s5.mirror ? 0 : b2 * u3.width + m2 * f2.height;
              e4.height = Math.min(t3.maxHeight, e4.height + _2 + g2);
            } else {
              let _2 = s5.mirror ? 0 : m2 * u3.width + b2 * f2.height;
              e4.width = Math.min(t3.maxWidth, e4.width + _2 + g2);
            }
            t3._calculatePadding(d2, h4, b2, m2);
          }
        }
        t3._handleMargins(), l4 ? (t3.width = t3._length = n5.width - t3._margins.left - t3._margins.right, t3.height = e4.height) : (t3.width = e4.width, t3.height = t3._length = n5.height - t3._margins.top - t3._margins.bottom);
      }
      _calculatePadding(t3, e4, n5, s5) {
        let o5 = this, { ticks: { align: a4, padding: r4 }, position: l4 } = o5.options, c2 = o5.labelRotation !== 0, d2 = l4 !== "top" && o5.axis === "x";
        if (o5.isHorizontal()) {
          let h4 = o5.getPixelForTick(0) - o5.left, u3 = o5.right - o5.getPixelForTick(o5.ticks.length - 1), f2 = 0, g2 = 0;
          c2 ? d2 ? (f2 = s5 * t3.width, g2 = n5 * e4.height) : (f2 = n5 * t3.height, g2 = s5 * e4.width) : a4 === "start" ? g2 = e4.width : a4 === "end" ? f2 = t3.width : (f2 = t3.width / 2, g2 = e4.width / 2), o5.paddingLeft = Math.max((f2 - h4 + r4) * o5.width / (o5.width - h4), 0), o5.paddingRight = Math.max((g2 - u3 + r4) * o5.width / (o5.width - u3), 0);
        } else {
          let h4 = e4.height / 2, u3 = t3.height / 2;
          a4 === "start" ? (h4 = 0, u3 = t3.height) : a4 === "end" && (h4 = e4.height, u3 = 0), o5.paddingTop = h4 + r4, o5.paddingBottom = u3 + r4;
        }
      }
      _handleMargins() {
        let t3 = this;
        t3._margins && (t3._margins.left = Math.max(t3.paddingLeft, t3._margins.left), t3._margins.top = Math.max(t3.paddingTop, t3._margins.top), t3._margins.right = Math.max(t3.paddingRight, t3._margins.right), t3._margins.bottom = Math.max(t3.paddingBottom, t3._margins.bottom));
      }
      afterFit() {
        R2(this.options.afterFit, [this]);
      }
      isHorizontal() {
        let { axis: t3, position: e4 } = this.options;
        return e4 === "top" || e4 === "bottom" || t3 === "x";
      }
      isFullSize() {
        return this.options.fullSize;
      }
      _convertTicksToLabels(t3) {
        let e4 = this;
        e4.beforeTickToLabelConversion(), e4.generateTickLabels(t3), e4.afterTickToLabelConversion();
      }
      _getLabelSizes() {
        let t3 = this, e4 = t3._labelSizes;
        if (!e4) {
          let n5 = t3.options.ticks.sampleSize, s5 = t3.ticks;
          n5 < s5.length && (s5 = vo(s5, n5)), t3._labelSizes = e4 = t3._computeLabelSizes(s5, s5.length);
        }
        return e4;
      }
      _computeLabelSizes(t3, e4) {
        let { ctx: n5, _longestTextCache: s5 } = this, o5 = [], a4 = [], r4 = 0, l4 = 0, c2, d2, h4, u3, f2, g2, p2, m2, b2, _2, y2;
        for (c2 = 0; c2 < e4; ++c2) {
          if (u3 = t3[c2].label, f2 = this._resolveTickFontOptions(c2), n5.font = g2 = f2.string, p2 = s5[g2] = s5[g2] || { data: {}, gc: [] }, m2 = f2.lineHeight, b2 = _2 = 0, !P2(u3) && !T2(u3))
            b2 = ie(n5, p2.data, p2.gc, b2, u3), _2 = m2;
          else if (T2(u3))
            for (d2 = 0, h4 = u3.length; d2 < h4; ++d2)
              y2 = u3[d2], !P2(y2) && !T2(y2) && (b2 = ie(n5, p2.data, p2.gc, b2, y2), _2 += m2);
          o5.push(b2), a4.push(_2), r4 = Math.max(b2, r4), l4 = Math.max(_2, l4);
        }
        pl(s5, e4);
        let x2 = o5.indexOf(r4), v2 = a4.indexOf(l4), w2 = (S3) => ({ width: o5[S3] || 0, height: a4[S3] || 0 });
        return { first: w2(0), last: w2(e4 - 1), widest: w2(x2), highest: w2(v2), widths: o5, heights: a4 };
      }
      getLabelForValue(t3) {
        return t3;
      }
      getPixelForValue(t3, e4) {
        return NaN;
      }
      getValueForPixel(t3) {
      }
      getPixelForTick(t3) {
        let e4 = this.ticks;
        return t3 < 0 || t3 > e4.length - 1 ? null : this.getPixelForValue(e4[t3].value);
      }
      getPixelForDecimal(t3) {
        let e4 = this;
        e4._reversePixels && (t3 = 1 - t3);
        let n5 = e4._startPixel + t3 * e4._length;
        return rs(e4._alignToPixels ? gt(e4.chart, n5, 0) : n5);
      }
      getDecimalForPixel(t3) {
        let e4 = (t3 - this._startPixel) / this._length;
        return this._reversePixels ? 1 - e4 : e4;
      }
      getBasePixel() {
        return this.getPixelForValue(this.getBaseValue());
      }
      getBaseValue() {
        let { min: t3, max: e4 } = this;
        return t3 < 0 && e4 < 0 ? e4 : t3 > 0 && e4 > 0 ? t3 : 0;
      }
      getContext(t3) {
        let e4 = this, n5 = e4.ticks || [];
        if (t3 >= 0 && t3 < n5.length) {
          let s5 = n5[t3];
          return s5.$context || (s5.$context = bl(e4.getContext(), t3, s5));
        }
        return e4.$context || (e4.$context = ml(e4.chart.getContext(), e4));
      }
      _tickSize() {
        let t3 = this, e4 = t3.options.ticks, n5 = Q(t3.labelRotation), s5 = Math.abs(Math.cos(n5)), o5 = Math.abs(Math.sin(n5)), a4 = t3._getLabelSizes(), r4 = e4.autoSkipPadding || 0, l4 = a4 ? a4.widest.width + r4 : 0, c2 = a4 ? a4.highest.height + r4 : 0;
        return t3.isHorizontal() ? c2 * s5 > l4 * o5 ? l4 / s5 : c2 / o5 : c2 * o5 < l4 * s5 ? c2 / s5 : l4 / o5;
      }
      _isVisible() {
        let t3 = this.options.display;
        return t3 !== "auto" ? !!t3 : this.getMatchingVisibleMetas().length > 0;
      }
      _computeGridLineItems(t3) {
        let e4 = this, n5 = e4.axis, s5 = e4.chart, o5 = e4.options, { grid: a4, position: r4 } = o5, l4 = a4.offset, c2 = e4.isHorizontal(), h4 = e4.ticks.length + (l4 ? 1 : 0), u3 = ge(a4), f2 = [], g2 = a4.setContext(e4.getContext()), p2 = g2.drawBorder ? g2.borderWidth : 0, m2 = p2 / 2, b2 = function(E2) {
          return gt(s5, E2, p2);
        }, _2, y2, x2, v2, w2, S3, M2, z2, st, V2, Z, W;
        if (r4 === "top")
          _2 = b2(e4.bottom), S3 = e4.bottom - u3, z2 = _2 - m2, V2 = b2(t3.top) + m2, W = t3.bottom;
        else if (r4 === "bottom")
          _2 = b2(e4.top), V2 = t3.top, W = b2(t3.bottom) - m2, S3 = _2 + m2, z2 = e4.top + u3;
        else if (r4 === "left")
          _2 = b2(e4.right), w2 = e4.right - u3, M2 = _2 - m2, st = b2(t3.left) + m2, Z = t3.right;
        else if (r4 === "right")
          _2 = b2(e4.left), st = t3.left, Z = b2(t3.right) - m2, w2 = _2 + m2, M2 = e4.left + u3;
        else if (n5 === "x") {
          if (r4 === "center")
            _2 = b2((t3.top + t3.bottom) / 2 + 0.5);
          else if (O(r4)) {
            let E2 = Object.keys(r4)[0], $2 = r4[E2];
            _2 = b2(e4.chart.scales[E2].getPixelForValue($2));
          }
          V2 = t3.top, W = t3.bottom, S3 = _2 + m2, z2 = S3 + u3;
        } else if (n5 === "y") {
          if (r4 === "center")
            _2 = b2((t3.left + t3.right) / 2);
          else if (O(r4)) {
            let E2 = Object.keys(r4)[0], $2 = r4[E2];
            _2 = b2(e4.chart.scales[E2].getPixelForValue($2));
          }
          w2 = _2 - m2, M2 = w2 - u3, st = t3.left, Z = t3.right;
        }
        for (y2 = 0; y2 < h4; ++y2) {
          let E2 = a4.setContext(e4.getContext(y2)), $2 = E2.lineWidth, F = E2.color, dt = a4.borderDash || [], pn = E2.borderDashOffset, mn = E2.tickWidth, bn = E2.tickColor, ve = E2.tickBorderDash || [], At = E2.tickBorderDashOffset;
          x2 = gl(e4, y2, l4), x2 !== void 0 && (v2 = gt(s5, x2, $2), c2 ? w2 = M2 = st = Z = v2 : S3 = z2 = V2 = W = v2, f2.push({ tx1: w2, ty1: S3, tx2: M2, ty2: z2, x1: st, y1: V2, x2: Z, y2: W, width: $2, color: F, borderDash: dt, borderDashOffset: pn, tickWidth: mn, tickColor: bn, tickBorderDash: ve, tickBorderDashOffset: At }));
        }
        return e4._ticksLength = h4, e4._borderValue = _2, f2;
      }
      _computeLabelItems(t3) {
        let e4 = this, n5 = e4.axis, s5 = e4.options, { position: o5, ticks: a4 } = s5, r4 = e4.isHorizontal(), l4 = e4.ticks, { align: c2, crossAlign: d2, padding: h4, mirror: u3 } = a4, f2 = ge(s5.grid), g2 = f2 + h4, p2 = u3 ? -h4 : g2, m2 = -Q(e4.labelRotation), b2 = [], _2, y2, x2, v2, w2, S3, M2, z2, st, V2, Z, W, E2 = "middle";
        if (o5 === "top")
          S3 = e4.bottom - p2, M2 = e4._getXAxisLabelAlignment();
        else if (o5 === "bottom")
          S3 = e4.top + p2, M2 = e4._getXAxisLabelAlignment();
        else if (o5 === "left") {
          let F = e4._getYAxisLabelAlignment(f2);
          M2 = F.textAlign, w2 = F.x;
        } else if (o5 === "right") {
          let F = e4._getYAxisLabelAlignment(f2);
          M2 = F.textAlign, w2 = F.x;
        } else if (n5 === "x") {
          if (o5 === "center")
            S3 = (t3.top + t3.bottom) / 2 + g2;
          else if (O(o5)) {
            let F = Object.keys(o5)[0], dt = o5[F];
            S3 = e4.chart.scales[F].getPixelForValue(dt) + g2;
          }
          M2 = e4._getXAxisLabelAlignment();
        } else if (n5 === "y") {
          if (o5 === "center")
            w2 = (t3.left + t3.right) / 2 - g2;
          else if (O(o5)) {
            let F = Object.keys(o5)[0], dt = o5[F];
            w2 = e4.chart.scales[F].getPixelForValue(dt);
          }
          M2 = e4._getYAxisLabelAlignment(f2).textAlign;
        }
        n5 === "y" && (c2 === "start" ? E2 = "top" : c2 === "end" && (E2 = "bottom"));
        let $2 = e4._getLabelSizes();
        for (_2 = 0, y2 = l4.length; _2 < y2; ++_2) {
          x2 = l4[_2], v2 = x2.label;
          let F = a4.setContext(e4.getContext(_2));
          z2 = e4.getPixelForTick(_2) + a4.labelOffset, st = e4._resolveTickFontOptions(_2), V2 = st.lineHeight, Z = T2(v2) ? v2.length : 1;
          let dt = Z / 2, pn = F.color, mn = F.textStrokeColor, bn = F.textStrokeWidth;
          r4 ? (w2 = z2, o5 === "top" ? d2 === "near" || m2 !== 0 ? W = -Z * V2 + V2 / 2 : d2 === "center" ? W = -$2.highest.height / 2 - dt * V2 + V2 : W = -$2.highest.height + V2 / 2 : d2 === "near" || m2 !== 0 ? W = V2 / 2 : d2 === "center" ? W = $2.highest.height / 2 - dt * V2 : W = $2.highest.height - Z * V2, u3 && (W *= -1)) : (S3 = z2, W = (1 - Z) * V2 / 2);
          let ve;
          if (F.showLabelBackdrop) {
            let At = G(F.backdropPadding), xn = $2.heights[_2], _n = $2.widths[_2], yn = S3 + W - At.top, vn = w2 - At.left;
            switch (E2) {
              case "middle":
                yn -= xn / 2;
                break;
              case "bottom":
                yn -= xn;
                break;
            }
            switch (M2) {
              case "center":
                vn -= _n / 2;
                break;
              case "right":
                vn -= _n;
                break;
            }
            ve = { left: vn, top: yn, width: _n + At.width, height: xn + At.height, color: F.backdropColor };
          }
          b2.push({ rotation: m2, label: v2, font: st, color: pn, strokeColor: mn, strokeWidth: bn, textOffset: W, textAlign: M2, textBaseline: E2, translation: [w2, S3], backdrop: ve });
        }
        return b2;
      }
      _getXAxisLabelAlignment() {
        let t3 = this, { position: e4, ticks: n5 } = t3.options;
        if (-Q(t3.labelRotation))
          return e4 === "top" ? "left" : "right";
        let o5 = "center";
        return n5.align === "start" ? o5 = "left" : n5.align === "end" && (o5 = "right"), o5;
      }
      _getYAxisLabelAlignment(t3) {
        let e4 = this, { position: n5, ticks: { crossAlign: s5, mirror: o5, padding: a4 } } = e4.options, r4 = e4._getLabelSizes(), l4 = t3 + a4, c2 = r4.widest.width, d2, h4;
        return n5 === "left" ? o5 ? (d2 = "left", h4 = e4.right + a4) : (h4 = e4.right - l4, s5 === "near" ? d2 = "right" : s5 === "center" ? (d2 = "center", h4 -= c2 / 2) : (d2 = "left", h4 = e4.left)) : n5 === "right" ? o5 ? (d2 = "right", h4 = e4.left + a4) : (h4 = e4.left + l4, s5 === "near" ? d2 = "left" : s5 === "center" ? (d2 = "center", h4 += c2 / 2) : (d2 = "right", h4 = e4.right)) : d2 = "right", { textAlign: d2, x: h4 };
      }
      _computeLabelArea() {
        let t3 = this;
        if (t3.options.ticks.mirror)
          return;
        let e4 = t3.chart, n5 = t3.options.position;
        if (n5 === "left" || n5 === "right")
          return { top: 0, left: t3.left, bottom: e4.height, right: t3.right };
        if (n5 === "top" || n5 === "bottom")
          return { top: t3.top, left: 0, bottom: t3.bottom, right: e4.width };
      }
      drawBackground() {
        let { ctx: t3, options: { backgroundColor: e4 }, left: n5, top: s5, width: o5, height: a4 } = this;
        e4 && (t3.save(), t3.fillStyle = e4, t3.fillRect(n5, s5, o5, a4), t3.restore());
      }
      getLineWidthForValue(t3) {
        let e4 = this, n5 = e4.options.grid;
        if (!e4._isVisible() || !n5.display)
          return 0;
        let o5 = e4.ticks.findIndex((a4) => a4.value === t3);
        return o5 >= 0 ? n5.setContext(e4.getContext(o5)).lineWidth : 0;
      }
      drawGrid(t3) {
        let e4 = this, n5 = e4.options.grid, s5 = e4.ctx, o5 = e4._gridLineItems || (e4._gridLineItems = e4._computeGridLineItems(t3)), a4, r4, l4 = (c2, d2, h4) => {
          !h4.width || !h4.color || (s5.save(), s5.lineWidth = h4.width, s5.strokeStyle = h4.color, s5.setLineDash(h4.borderDash || []), s5.lineDashOffset = h4.borderDashOffset, s5.beginPath(), s5.moveTo(c2.x, c2.y), s5.lineTo(d2.x, d2.y), s5.stroke(), s5.restore());
        };
        if (n5.display)
          for (a4 = 0, r4 = o5.length; a4 < r4; ++a4) {
            let c2 = o5[a4];
            n5.drawOnChartArea && l4({ x: c2.x1, y: c2.y1 }, { x: c2.x2, y: c2.y2 }, c2), n5.drawTicks && l4({ x: c2.tx1, y: c2.ty1 }, { x: c2.tx2, y: c2.ty2 }, { color: c2.tickColor, width: c2.tickWidth, borderDash: c2.tickBorderDash, borderDashOffset: c2.tickBorderDashOffset });
          }
      }
      drawBorder() {
        let t3 = this, { chart: e4, ctx: n5, options: { grid: s5 } } = t3, o5 = s5.setContext(t3.getContext()), a4 = s5.drawBorder ? o5.borderWidth : 0;
        if (!a4)
          return;
        let r4 = s5.setContext(t3.getContext(0)).lineWidth, l4 = t3._borderValue, c2, d2, h4, u3;
        t3.isHorizontal() ? (c2 = gt(e4, t3.left, a4) - a4 / 2, d2 = gt(e4, t3.right, r4) + r4 / 2, h4 = u3 = l4) : (h4 = gt(e4, t3.top, a4) - a4 / 2, u3 = gt(e4, t3.bottom, r4) + r4 / 2, c2 = d2 = l4), n5.save(), n5.lineWidth = o5.borderWidth, n5.strokeStyle = o5.borderColor, n5.beginPath(), n5.moveTo(c2, h4), n5.lineTo(d2, u3), n5.stroke(), n5.restore();
      }
      drawLabels(t3) {
        let e4 = this;
        if (!e4.options.ticks.display)
          return;
        let s5 = e4.ctx, o5 = e4._computeLabelArea();
        o5 && Ve(s5, o5);
        let a4 = e4._labelItems || (e4._labelItems = e4._computeLabelItems(t3)), r4, l4;
        for (r4 = 0, l4 = a4.length; r4 < l4; ++r4) {
          let c2 = a4[r4], d2 = c2.font, h4 = c2.label;
          c2.backdrop && (s5.fillStyle = c2.backdrop.color, s5.fillRect(c2.backdrop.left, c2.backdrop.top, c2.backdrop.width, c2.backdrop.height));
          let u3 = c2.textOffset;
          se(s5, h4, 0, u3, d2, c2);
        }
        o5 && We(s5);
      }
      drawTitle() {
        let { ctx: t3, options: { position: e4, title: n5, reverse: s5 } } = this;
        if (!n5.display)
          return;
        let o5 = N2(n5.font), a4 = G(n5.padding), r4 = n5.align, l4 = o5.lineHeight / 2;
        e4 === "bottom" ? (l4 += a4.bottom, T2(n5.text) && (l4 += o5.lineHeight * (n5.text.length - 1))) : l4 += a4.top;
        let { titleX: c2, titleY: d2, maxWidth: h4, rotation: u3 } = _l(this, l4, e4, r4);
        se(t3, n5.text, 0, 0, o5, { color: n5.color, maxWidth: h4, rotation: u3, textAlign: xl(r4, e4, s5), textBaseline: "middle", translation: [c2, d2] });
      }
      draw(t3) {
        let e4 = this;
        !e4._isVisible() || (e4.drawBackground(), e4.drawGrid(t3), e4.drawBorder(), e4.drawTitle(), e4.drawLabels(t3));
      }
      _layers() {
        let t3 = this, e4 = t3.options, n5 = e4.ticks && e4.ticks.z || 0, s5 = e4.grid && e4.grid.z || 0;
        return !t3._isVisible() || t3.draw !== bt.prototype.draw ? [{ z: n5, draw(o5) {
          t3.draw(o5);
        } }] : [{ z: s5, draw(o5) {
          t3.drawBackground(), t3.drawGrid(o5), t3.drawTitle();
        } }, { z: s5 + 1, draw() {
          t3.drawBorder();
        } }, { z: n5, draw(o5) {
          t3.drawLabels(o5);
        } }];
      }
      getMatchingVisibleMetas(t3) {
        let e4 = this, n5 = e4.chart.getSortedVisibleDatasetMetas(), s5 = e4.axis + "AxisID", o5 = [], a4, r4;
        for (a4 = 0, r4 = n5.length; a4 < r4; ++a4) {
          let l4 = n5[a4];
          l4[s5] === e4.id && (!t3 || l4.type === t3) && o5.push(l4);
        }
        return o5;
      }
      _resolveTickFontOptions(t3) {
        let e4 = this.options.ticks.setContext(this.getContext(t3));
        return N2(e4.font);
      }
      _maxDigits() {
        let t3 = this, e4 = t3._resolveTickFontOptions(0).lineHeight;
        return t3.isHorizontal() ? t3.width / e4 / 0.7 : t3.height / e4;
      }
    }, pe = class {
      constructor(t3, e4, n5) {
        this.type = t3, this.scope = e4, this.override = n5, this.items = Object.create(null);
      }
      isForType(t3) {
        return Object.prototype.isPrototypeOf.call(this.type.prototype, t3.prototype);
      }
      register(t3) {
        let e4 = this, n5 = Object.getPrototypeOf(t3), s5;
        wl(n5) && (s5 = e4.register(n5));
        let o5 = e4.items, a4 = t3.id, r4 = e4.scope + "." + a4;
        if (!a4)
          throw new Error("class does not have id: " + t3);
        return a4 in o5 || (o5[a4] = t3, yl(t3, r4, s5), e4.override && k2.override(t3.id, t3.overrides)), r4;
      }
      get(t3) {
        return this.items[t3];
      }
      unregister(t3) {
        let e4 = this.items, n5 = t3.id, s5 = this.scope;
        n5 in e4 && delete e4[n5], s5 && n5 in k2[s5] && (delete k2[s5][n5], this.override && delete ft[n5]);
      }
    };
    function yl(i4, t3, e4) {
      let n5 = zt(Object.create(null), [e4 ? k2.get(e4) : {}, k2.get(t3), i4.defaults]);
      k2.set(t3, n5), i4.defaultRoutes && vl(t3, i4.defaultRoutes), i4.descriptors && k2.describe(t3, i4.descriptors);
    }
    function vl(i4, t3) {
      Object.keys(t3).forEach((e4) => {
        let n5 = e4.split("."), s5 = n5.pop(), o5 = [i4].concat(n5).join("."), a4 = t3[e4].split("."), r4 = a4.pop(), l4 = a4.join(".");
        k2.route(o5, s5, l4, r4);
      });
    }
    function wl(i4) {
      return "id" in i4 && "defaults" in i4;
    }
    var So = class {
      constructor() {
        this.controllers = new pe(J, "datasets", true), this.elements = new pe(et, "elements"), this.plugins = new pe(Object, "plugins"), this.scales = new pe(bt, "scales"), this._typedRegistries = [this.controllers, this.scales, this.elements];
      }
      add(...t3) {
        this._each("register", t3);
      }
      remove(...t3) {
        this._each("unregister", t3);
      }
      addControllers(...t3) {
        this._each("register", t3, this.controllers);
      }
      addElements(...t3) {
        this._each("register", t3, this.elements);
      }
      addPlugins(...t3) {
        this._each("register", t3, this.plugins);
      }
      addScales(...t3) {
        this._each("register", t3, this.scales);
      }
      getController(t3) {
        return this._get(t3, this.controllers, "controller");
      }
      getElement(t3) {
        return this._get(t3, this.elements, "element");
      }
      getPlugin(t3) {
        return this._get(t3, this.plugins, "plugin");
      }
      getScale(t3) {
        return this._get(t3, this.scales, "scale");
      }
      removeControllers(...t3) {
        this._each("unregister", t3, this.controllers);
      }
      removeElements(...t3) {
        this._each("unregister", t3, this.elements);
      }
      removePlugins(...t3) {
        this._each("unregister", t3, this.plugins);
      }
      removeScales(...t3) {
        this._each("unregister", t3, this.scales);
      }
      _each(t3, e4, n5) {
        let s5 = this;
        [...e4].forEach((o5) => {
          let a4 = n5 || s5._getRegistryForType(o5);
          n5 || a4.isForType(o5) || a4 === s5.plugins && o5.id ? s5._exec(t3, a4, o5) : D(o5, (r4) => {
            let l4 = n5 || s5._getRegistryForType(r4);
            s5._exec(t3, l4, r4);
          });
        });
      }
      _exec(t3, e4, n5) {
        let s5 = Oe(t3);
        R2(n5["before" + s5], [], n5), e4[t3](n5), R2(n5["after" + s5], [], n5);
      }
      _getRegistryForType(t3) {
        for (let e4 = 0; e4 < this._typedRegistries.length; e4++) {
          let n5 = this._typedRegistries[e4];
          if (n5.isForType(t3))
            return n5;
        }
        return this.plugins;
      }
      _get(t3, e4, n5) {
        let s5 = e4.get(t3);
        if (s5 === void 0)
          throw new Error('"' + t3 + '" is not a registered ' + n5 + ".");
        return s5;
      }
    }, lt = new So(), Mo = class {
      constructor() {
        this._init = [];
      }
      notify(t3, e4, n5, s5) {
        let o5 = this;
        e4 === "beforeInit" && (o5._init = o5._createDescriptors(t3, true), o5._notify(o5._init, t3, "install"));
        let a4 = s5 ? o5._descriptors(t3).filter(s5) : o5._descriptors(t3), r4 = o5._notify(a4, t3, e4, n5);
        return e4 === "destroy" && (o5._notify(a4, t3, "stop"), o5._notify(o5._init, t3, "uninstall")), r4;
      }
      _notify(t3, e4, n5, s5) {
        s5 = s5 || {};
        for (let o5 of t3) {
          let a4 = o5.plugin, r4 = a4[n5], l4 = [e4, s5, o5.options];
          if (R2(r4, l4, a4) === false && s5.cancelable)
            return false;
        }
        return true;
      }
      invalidate() {
        P2(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
      }
      _descriptors(t3) {
        if (this._cache)
          return this._cache;
        let e4 = this._cache = this._createDescriptors(t3);
        return this._notifyStateChanges(t3), e4;
      }
      _createDescriptors(t3, e4) {
        let n5 = t3 && t3.config, s5 = C2(n5.options && n5.options.plugins, {}), o5 = Sl(n5);
        return s5 === false && !e4 ? [] : kl(t3, o5, s5, e4);
      }
      _notifyStateChanges(t3) {
        let e4 = this._oldCache || [], n5 = this._cache, s5 = (o5, a4) => o5.filter((r4) => !a4.some((l4) => r4.plugin.id === l4.plugin.id));
        this._notify(s5(e4, n5), t3, "stop"), this._notify(s5(n5, e4), t3, "start");
      }
    };
    function Sl(i4) {
      let t3 = [], e4 = Object.keys(lt.plugins.items);
      for (let s5 = 0; s5 < e4.length; s5++)
        t3.push(lt.getPlugin(e4[s5]));
      let n5 = i4.plugins || [];
      for (let s5 = 0; s5 < n5.length; s5++) {
        let o5 = n5[s5];
        t3.indexOf(o5) === -1 && t3.push(o5);
      }
      return t3;
    }
    function Ml(i4, t3) {
      return !t3 && i4 === false ? null : i4 === true ? {} : i4;
    }
    function kl(i4, t3, e4, n5) {
      let s5 = [], o5 = i4.getContext();
      for (let a4 = 0; a4 < t3.length; a4++) {
        let r4 = t3[a4], l4 = r4.id, c2 = Ml(e4[l4], n5);
        c2 !== null && s5.push({ plugin: r4, options: Pl(i4.config, r4, c2, o5) });
      }
      return s5;
    }
    function Pl(i4, t3, e4, n5) {
      let s5 = i4.pluginScopeKeys(t3), o5 = i4.getOptionScopes(e4, s5);
      return i4.createResolver(o5, n5, [""], { scriptable: false, indexable: false, allKeys: true });
    }
    function ui(i4, t3) {
      let e4 = k2.datasets[i4] || {};
      return ((t3.datasets || {})[i4] || {}).indexAxis || t3.indexAxis || e4.indexAxis || "x";
    }
    function Cl(i4, t3) {
      let e4 = i4;
      return i4 === "_index_" ? e4 = t3 : i4 === "_value_" && (e4 = t3 === "x" ? "y" : "x"), e4;
    }
    function Dl(i4, t3) {
      return i4 === t3 ? "_index_" : "_value_";
    }
    function Ol(i4) {
      if (i4 === "top" || i4 === "bottom")
        return "x";
      if (i4 === "left" || i4 === "right")
        return "y";
    }
    function fi(i4, t3) {
      return i4 === "x" || i4 === "y" ? i4 : t3.axis || Ol(t3.position) || i4.charAt(0).toLowerCase();
    }
    function Al(i4, t3) {
      let e4 = ft[i4.type] || { scales: {} }, n5 = t3.scales || {}, s5 = ui(i4.type, t3), o5 = Object.create(null), a4 = Object.create(null);
      return Object.keys(n5).forEach((r4) => {
        let l4 = n5[r4], c2 = fi(r4, l4), d2 = Dl(c2, s5), h4 = e4.scales || {};
        o5[c2] = o5[c2] || r4, a4[r4] = It(Object.create(null), [{ axis: c2 }, l4, h4[c2], h4[d2]]);
      }), i4.data.datasets.forEach((r4) => {
        let l4 = r4.type || i4.type, c2 = r4.indexAxis || ui(l4, t3), h4 = (ft[l4] || {}).scales || {};
        Object.keys(h4).forEach((u3) => {
          let f2 = Cl(u3, c2), g2 = r4[f2 + "AxisID"] || o5[f2] || f2;
          a4[g2] = a4[g2] || Object.create(null), It(a4[g2], [{ axis: f2 }, n5[g2], h4[u3]]);
        });
      }), Object.keys(a4).forEach((r4) => {
        let l4 = a4[r4];
        It(l4, [k2.scales[l4.type], k2.scale]);
      }), a4;
    }
    function ko(i4) {
      let t3 = i4.options || (i4.options = {});
      t3.plugins = C2(t3.plugins, {}), t3.scales = Al(i4, t3);
    }
    function Po(i4) {
      return i4 = i4 || {}, i4.datasets = i4.datasets || [], i4.labels = i4.labels || [], i4;
    }
    function Tl(i4) {
      return i4 = i4 || {}, i4.data = Po(i4.data), ko(i4), i4;
    }
    var Co = new Map(), Do = new Set();
    function rn(i4, t3) {
      let e4 = Co.get(i4);
      return e4 || (e4 = t3(), Co.set(i4, e4), Do.add(e4)), e4;
    }
    var me = (i4, t3, e4) => {
      let n5 = ot(t3, e4);
      n5 !== void 0 && i4.add(n5);
    }, Oo = class {
      constructor(t3) {
        this._config = Tl(t3), this._scopeCache = new Map(), this._resolverCache = new Map();
      }
      get type() {
        return this._config.type;
      }
      set type(t3) {
        this._config.type = t3;
      }
      get data() {
        return this._config.data;
      }
      set data(t3) {
        this._config.data = Po(t3);
      }
      get options() {
        return this._config.options;
      }
      set options(t3) {
        this._config.options = t3;
      }
      get plugins() {
        return this._config.plugins;
      }
      update() {
        let t3 = this._config;
        this.clearCache(), ko(t3);
      }
      clearCache() {
        this._scopeCache.clear(), this._resolverCache.clear();
      }
      datasetScopeKeys(t3) {
        return rn(t3, () => [[`datasets.${t3}`, ""]]);
      }
      datasetAnimationScopeKeys(t3, e4) {
        return rn(`${t3}.transition.${e4}`, () => [[`datasets.${t3}.transitions.${e4}`, `transitions.${e4}`], [`datasets.${t3}`, ""]]);
      }
      datasetElementScopeKeys(t3, e4) {
        return rn(`${t3}-${e4}`, () => [[`datasets.${t3}.elements.${e4}`, `datasets.${t3}`, `elements.${e4}`, ""]]);
      }
      pluginScopeKeys(t3) {
        let e4 = t3.id, n5 = this.type;
        return rn(`${n5}-plugin-${e4}`, () => [[`plugins.${e4}`, ...t3.additionalOptionScopes || []]]);
      }
      _cachedScopes(t3, e4) {
        let n5 = this._scopeCache, s5 = n5.get(t3);
        return (!s5 || e4) && (s5 = new Map(), n5.set(t3, s5)), s5;
      }
      getOptionScopes(t3, e4, n5) {
        let { options: s5, type: o5 } = this, a4 = this._cachedScopes(t3, n5), r4 = a4.get(e4);
        if (r4)
          return r4;
        let l4 = new Set();
        e4.forEach((d2) => {
          t3 && (l4.add(t3), d2.forEach((h4) => me(l4, t3, h4))), d2.forEach((h4) => me(l4, s5, h4)), d2.forEach((h4) => me(l4, ft[o5] || {}, h4)), d2.forEach((h4) => me(l4, k2, h4)), d2.forEach((h4) => me(l4, Be, h4));
        });
        let c2 = [...l4];
        return Do.has(e4) && a4.set(e4, c2), c2;
      }
      chartOptionScopes() {
        let { options: t3, type: e4 } = this;
        return [t3, ft[e4] || {}, k2.datasets[e4] || {}, { type: e4 }, k2, Be];
      }
      resolveNamedOptions(t3, e4, n5, s5 = [""]) {
        let o5 = { $shared: true }, { resolver: a4, subPrefixes: r4 } = Ao(this._resolverCache, t3, s5), l4 = a4;
        if (Rl(a4, e4)) {
          o5.$shared = false, n5 = St(n5) ? n5() : n5;
          let c2 = this.createResolver(t3, n5, r4);
          l4 = kt(a4, n5, c2);
        }
        for (let c2 of e4)
          o5[c2] = l4[c2];
        return o5;
      }
      createResolver(t3, e4, n5 = [""], s5) {
        let { resolver: o5 } = Ao(this._resolverCache, t3, n5);
        return O(e4) ? kt(o5, e4, void 0, s5) : o5;
      }
    };
    function Ao(i4, t3, e4) {
      let n5 = i4.get(t3);
      n5 || (n5 = new Map(), i4.set(t3, n5));
      let s5 = e4.join(), o5 = n5.get(s5);
      return o5 || (o5 = { resolver: $e(t3, e4), subPrefixes: e4.filter((r4) => !r4.toLowerCase().includes("hover")) }, n5.set(s5, o5)), o5;
    }
    function Rl(i4, t3) {
      let { isScriptable: e4, isIndexable: n5 } = Zn(i4);
      for (let s5 of t3)
        if (e4(s5) && St(i4[s5]) || n5(s5) && T2(i4[s5]))
          return true;
      return false;
    }
    var Ll = "3.2.1", El = ["top", "bottom", "left", "right", "chartArea"];
    function To(i4, t3) {
      return i4 === "top" || i4 === "bottom" || El.indexOf(i4) === -1 && t3 === "x";
    }
    function Ro(i4, t3) {
      return function(e4, n5) {
        return e4[i4] === n5[i4] ? e4[t3] - n5[t3] : e4[i4] - n5[i4];
      };
    }
    function Lo(i4) {
      let t3 = i4.chart, e4 = t3.options.animation;
      t3.notifyPlugins("afterRender"), R2(e4 && e4.onComplete, [i4], t3);
    }
    function Fl(i4) {
      let t3 = i4.chart, e4 = t3.options.animation;
      R2(e4 && e4.onProgress, [i4], t3);
    }
    function Eo() {
      return typeof window != "undefined" && typeof document != "undefined";
    }
    function Fo(i4) {
      return Eo() && typeof i4 == "string" ? i4 = document.getElementById(i4) : i4 && i4.length && (i4 = i4[0]), i4 && i4.canvas && (i4 = i4.canvas), i4;
    }
    var ln = {}, zo = (i4) => {
      let t3 = Fo(i4);
      return Object.values(ln).filter((e4) => e4.canvas === t3).pop();
    }, nt = class {
      constructor(t3, e4) {
        let n5 = this;
        this.config = e4 = new Oo(e4);
        let s5 = Fo(t3), o5 = zo(s5);
        if (o5)
          throw new Error("Canvas is already in use. Chart with ID '" + o5.id + "' must be destroyed before the canvas can be reused.");
        let a4 = e4.createResolver(e4.chartOptionScopes(), n5.getContext());
        this.platform = n5._initializePlatform(s5, e4);
        let r4 = n5.platform.acquireContext(s5, a4.aspectRatio), l4 = r4 && r4.canvas, c2 = l4 && l4.height, d2 = l4 && l4.width;
        if (this.id = Zi(), this.ctx = r4, this.canvas = l4, this.width = d2, this.height = c2, this._options = a4, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._sortedMetasets = [], this.scales = {}, this.scale = void 0, this._plugins = new Mo(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = false, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Ki(() => this.update("resize"), a4.resizeDelay || 0), ln[n5.id] = n5, !r4 || !l4) {
          console.error("Failed to create chart: can't acquire context from the given item");
          return;
        }
        rt.listen(n5, "complete", Lo), rt.listen(n5, "progress", Fl), n5._initialize(), n5.attached && n5.update();
      }
      get aspectRatio() {
        let { options: { aspectRatio: t3, maintainAspectRatio: e4 }, width: n5, height: s5, _aspectRatio: o5 } = this;
        return P2(t3) ? e4 && o5 ? o5 : s5 ? n5 / s5 : null : t3;
      }
      get data() {
        return this.config.data;
      }
      set data(t3) {
        this.config.data = t3;
      }
      get options() {
        return this._options;
      }
      set options(t3) {
        this.config.options = t3;
      }
      _initialize() {
        let t3 = this;
        return t3.notifyPlugins("beforeInit"), t3.options.responsive ? t3.resize() : ei(t3, t3.options.devicePixelRatio), t3.bindEvents(), t3.notifyPlugins("afterInit"), t3;
      }
      _initializePlatform(t3, e4) {
        return e4.platform ? new e4.platform() : !Eo() || typeof OffscreenCanvas != "undefined" && t3 instanceof OffscreenCanvas ? new fo() : new xo();
      }
      clear() {
        return Yn(this.canvas, this.ctx), this;
      }
      stop() {
        return rt.stop(this), this;
      }
      resize(t3, e4) {
        rt.running(this) ? this._resizeBeforeDraw = { width: t3, height: e4 } : this._resize(t3, e4);
      }
      _resize(t3, e4) {
        let n5 = this, s5 = n5.options, o5 = n5.canvas, a4 = s5.maintainAspectRatio && n5.aspectRatio, r4 = n5.platform.getMaximumSize(o5, t3, e4, a4), l4 = n5.currentDevicePixelRatio, c2 = s5.devicePixelRatio || n5.platform.getDevicePixelRatio();
        n5.width === r4.width && n5.height === r4.height && l4 === c2 || (n5.width = r4.width, n5.height = r4.height, n5._aspectRatio = n5.aspectRatio, ei(n5, c2, true), n5.notifyPlugins("resize", { size: r4 }), R2(s5.onResize, [n5, r4], n5), n5.attached && n5._doResize() && n5.render());
      }
      ensureScalesHaveIDs() {
        let e4 = this.options.scales || {};
        D(e4, (n5, s5) => {
          n5.id = s5;
        });
      }
      buildOrUpdateScales() {
        let t3 = this, e4 = t3.options, n5 = e4.scales, s5 = t3.scales, o5 = Object.keys(s5).reduce((r4, l4) => (r4[l4] = false, r4), {}), a4 = [];
        n5 && (a4 = a4.concat(Object.keys(n5).map((r4) => {
          let l4 = n5[r4], c2 = fi(r4, l4), d2 = c2 === "r", h4 = c2 === "x";
          return { options: l4, dposition: d2 ? "chartArea" : h4 ? "bottom" : "left", dtype: d2 ? "radialLinear" : h4 ? "category" : "linear" };
        }))), D(a4, (r4) => {
          let l4 = r4.options, c2 = l4.id, d2 = fi(c2, l4), h4 = C2(l4.type, r4.dtype);
          (l4.position === void 0 || To(l4.position, d2) !== To(r4.dposition)) && (l4.position = r4.dposition), o5[c2] = true;
          let u3 = null;
          if (c2 in s5 && s5[c2].type === h4)
            u3 = s5[c2];
          else {
            let f2 = lt.getScale(h4);
            u3 = new f2({ id: c2, type: h4, ctx: t3.ctx, chart: t3 }), s5[u3.id] = u3;
          }
          u3.init(l4, e4);
        }), D(o5, (r4, l4) => {
          r4 || delete s5[l4];
        }), D(s5, (r4) => {
          nn.configure(t3, r4, r4.options), nn.addBox(t3, r4);
        });
      }
      _updateMetasetIndex(t3, e4) {
        let n5 = this._metasets, s5 = t3.index;
        s5 !== e4 && (n5[s5] = n5[e4], n5[e4] = t3, t3.index = e4);
      }
      _updateMetasets() {
        let t3 = this, e4 = t3._metasets, n5 = t3.data.datasets.length, s5 = e4.length;
        if (s5 > n5) {
          for (let o5 = n5; o5 < s5; ++o5)
            t3._destroyDatasetMeta(o5);
          e4.splice(n5, s5 - n5);
        }
        t3._sortedMetasets = e4.slice(0).sort(Ro("order", "index"));
      }
      _removeUnreferencedMetasets() {
        let t3 = this, { _metasets: e4, data: { datasets: n5 } } = t3;
        e4.length > n5.length && delete t3._stacks, e4.forEach((s5, o5) => {
          n5.filter((a4) => a4 === s5._dataset).length === 0 && t3._destroyDatasetMeta(o5);
        });
      }
      buildOrUpdateControllers() {
        let t3 = this, e4 = [], n5 = t3.data.datasets, s5, o5;
        for (t3._removeUnreferencedMetasets(), s5 = 0, o5 = n5.length; s5 < o5; s5++) {
          let a4 = n5[s5], r4 = t3.getDatasetMeta(s5), l4 = a4.type || t3.config.type;
          if (r4.type && r4.type !== l4 && (t3._destroyDatasetMeta(s5), r4 = t3.getDatasetMeta(s5)), r4.type = l4, r4.indexAxis = a4.indexAxis || ui(l4, t3.options), r4.order = a4.order || 0, t3._updateMetasetIndex(r4, s5), r4.label = "" + a4.label, r4.visible = t3.isDatasetVisible(s5), r4.controller)
            r4.controller.updateIndex(s5), r4.controller.linkScales();
          else {
            let c2 = lt.getController(l4), { datasetElementType: d2, dataElementType: h4 } = k2.datasets[l4];
            Object.assign(c2.prototype, { dataElementType: lt.getElement(h4), datasetElementType: d2 && lt.getElement(d2) }), r4.controller = new c2(t3, s5), e4.push(r4.controller);
          }
        }
        return t3._updateMetasets(), e4;
      }
      _resetElements() {
        let t3 = this;
        D(t3.data.datasets, (e4, n5) => {
          t3.getDatasetMeta(n5).controller.reset();
        }, t3);
      }
      reset() {
        this._resetElements(), this.notifyPlugins("reset");
      }
      update(t3) {
        let e4 = this, n5 = e4.config;
        n5.update(), e4._options = n5.createResolver(n5.chartOptionScopes(), e4.getContext()), D(e4.scales, (c2) => {
          nn.removeBox(e4, c2);
        });
        let s5 = e4._animationsDisabled = !e4.options.animation;
        e4.ensureScalesHaveIDs(), e4.buildOrUpdateScales();
        let o5 = new Set(Object.keys(e4._listeners)), a4 = new Set(e4.options.events);
        if (es(o5, a4) || (e4.unbindEvents(), e4.bindEvents()), e4._plugins.invalidate(), e4.notifyPlugins("beforeUpdate", { mode: t3, cancelable: true }) === false)
          return;
        let r4 = e4.buildOrUpdateControllers();
        e4.notifyPlugins("beforeElementsUpdate");
        let l4 = 0;
        for (let c2 = 0, d2 = e4.data.datasets.length; c2 < d2; c2++) {
          let { controller: h4 } = e4.getDatasetMeta(c2), u3 = !s5 && r4.indexOf(h4) === -1;
          h4.buildOrUpdateElements(u3), l4 = Math.max(+h4.getMaxOverflow(), l4);
        }
        e4._minPadding = l4, e4._updateLayout(l4), s5 || D(r4, (c2) => {
          c2.reset();
        }), e4._updateDatasets(t3), e4.notifyPlugins("afterUpdate", { mode: t3 }), e4._layers.sort(Ro("z", "_idx")), e4._lastEvent && e4._eventHandler(e4._lastEvent, true), e4.render();
      }
      _updateLayout(t3) {
        let e4 = this;
        if (e4.notifyPlugins("beforeLayout", { cancelable: true }) === false)
          return;
        nn.update(e4, e4.width, e4.height, t3);
        let n5 = e4.chartArea, s5 = n5.width <= 0 || n5.height <= 0;
        e4._layers = [], D(e4.boxes, (o5) => {
          s5 && o5.position === "chartArea" || (o5.configure && o5.configure(), e4._layers.push(...o5._layers()));
        }, e4), e4._layers.forEach((o5, a4) => {
          o5._idx = a4;
        }), e4.notifyPlugins("afterLayout");
      }
      _updateDatasets(t3) {
        let e4 = this, n5 = typeof t3 == "function";
        if (e4.notifyPlugins("beforeDatasetsUpdate", { mode: t3, cancelable: true }) !== false) {
          for (let s5 = 0, o5 = e4.data.datasets.length; s5 < o5; ++s5)
            e4._updateDataset(s5, n5 ? t3({ datasetIndex: s5 }) : t3);
          e4.notifyPlugins("afterDatasetsUpdate", { mode: t3 });
        }
      }
      _updateDataset(t3, e4) {
        let n5 = this, s5 = n5.getDatasetMeta(t3), o5 = { meta: s5, index: t3, mode: e4, cancelable: true };
        n5.notifyPlugins("beforeDatasetUpdate", o5) !== false && (s5.controller._update(e4), o5.cancelable = false, n5.notifyPlugins("afterDatasetUpdate", o5));
      }
      render() {
        let t3 = this;
        t3.notifyPlugins("beforeRender", { cancelable: true }) !== false && (rt.has(t3) ? t3.attached && !rt.running(t3) && rt.start(t3) : (t3.draw(), Lo({ chart: t3 })));
      }
      draw() {
        let t3 = this, e4;
        if (t3._resizeBeforeDraw) {
          let { width: s5, height: o5 } = t3._resizeBeforeDraw;
          t3._resize(s5, o5), t3._resizeBeforeDraw = null;
        }
        if (t3.clear(), t3.width <= 0 || t3.height <= 0 || t3.notifyPlugins("beforeDraw", { cancelable: true }) === false)
          return;
        let n5 = t3._layers;
        for (e4 = 0; e4 < n5.length && n5[e4].z <= 0; ++e4)
          n5[e4].draw(t3.chartArea);
        for (t3._drawDatasets(); e4 < n5.length; ++e4)
          n5[e4].draw(t3.chartArea);
        t3.notifyPlugins("afterDraw");
      }
      _getSortedDatasetMetas(t3) {
        let n5 = this._sortedMetasets, s5 = [], o5, a4;
        for (o5 = 0, a4 = n5.length; o5 < a4; ++o5) {
          let r4 = n5[o5];
          (!t3 || r4.visible) && s5.push(r4);
        }
        return s5;
      }
      getSortedVisibleDatasetMetas() {
        return this._getSortedDatasetMetas(true);
      }
      _drawDatasets() {
        let t3 = this;
        if (t3.notifyPlugins("beforeDatasetsDraw", { cancelable: true }) === false)
          return;
        let e4 = t3.getSortedVisibleDatasetMetas();
        for (let n5 = e4.length - 1; n5 >= 0; --n5)
          t3._drawDataset(e4[n5]);
        t3.notifyPlugins("afterDatasetsDraw");
      }
      _drawDataset(t3) {
        let e4 = this, n5 = e4.ctx, s5 = t3._clip, o5 = e4.chartArea, a4 = { meta: t3, index: t3.index, cancelable: true };
        e4.notifyPlugins("beforeDatasetDraw", a4) !== false && (Ve(n5, { left: s5.left === false ? 0 : o5.left - s5.left, right: s5.right === false ? e4.width : o5.right + s5.right, top: s5.top === false ? 0 : o5.top - s5.top, bottom: s5.bottom === false ? e4.height : o5.bottom + s5.bottom }), t3.controller.draw(), We(n5), a4.cancelable = false, e4.notifyPlugins("afterDatasetDraw", a4));
      }
      getElementsAtEventForMode(t3, e4, n5, s5) {
        let o5 = Wr.modes[e4];
        return typeof o5 == "function" ? o5(this, t3, n5, s5) : [];
      }
      getDatasetMeta(t3) {
        let e4 = this, n5 = e4.data.datasets[t3], s5 = e4._metasets, o5 = s5.filter((a4) => a4 && a4._dataset === n5).pop();
        return o5 || (o5 = s5[t3] = { type: null, data: [], dataset: null, controller: null, hidden: null, xAxisID: null, yAxisID: null, order: n5 && n5.order || 0, index: t3, _dataset: n5, _parsed: [], _sorted: false }), o5;
      }
      getContext() {
        return this.$context || (this.$context = { chart: this, type: "chart" });
      }
      getVisibleDatasetCount() {
        return this.getSortedVisibleDatasetMetas().length;
      }
      isDatasetVisible(t3) {
        let e4 = this.data.datasets[t3];
        if (!e4)
          return false;
        let n5 = this.getDatasetMeta(t3);
        return typeof n5.hidden == "boolean" ? !n5.hidden : !e4.hidden;
      }
      setDatasetVisibility(t3, e4) {
        let n5 = this.getDatasetMeta(t3);
        n5.hidden = !e4;
      }
      toggleDataVisibility(t3) {
        this._hiddenIndices[t3] = !this._hiddenIndices[t3];
      }
      getDataVisibility(t3) {
        return !this._hiddenIndices[t3];
      }
      _updateDatasetVisibility(t3, e4) {
        let n5 = this, s5 = e4 ? "show" : "hide", o5 = n5.getDatasetMeta(t3), a4 = o5.controller._resolveAnimations(void 0, s5);
        n5.setDatasetVisibility(t3, e4), a4.update(o5, { visible: e4 }), n5.update((r4) => r4.datasetIndex === t3 ? s5 : void 0);
      }
      hide(t3) {
        this._updateDatasetVisibility(t3, false);
      }
      show(t3) {
        this._updateDatasetVisibility(t3, true);
      }
      _destroyDatasetMeta(t3) {
        let e4 = this, n5 = e4._metasets && e4._metasets[t3];
        n5 && n5.controller && (n5.controller._destroy(), delete e4._metasets[t3]);
      }
      destroy() {
        let t3 = this, { canvas: e4, ctx: n5 } = t3, s5, o5;
        for (t3.stop(), rt.remove(t3), s5 = 0, o5 = t3.data.datasets.length; s5 < o5; ++s5)
          t3._destroyDatasetMeta(s5);
        t3.config.clearCache(), e4 && (t3.unbindEvents(), Yn(e4, n5), t3.platform.releaseContext(n5), t3.canvas = null, t3.ctx = null), t3.notifyPlugins("destroy"), delete ln[t3.id];
      }
      toBase64Image(...t3) {
        return this.canvas.toDataURL(...t3);
      }
      bindEvents() {
        let t3 = this, e4 = t3._listeners, n5 = t3.platform, s5 = (r4, l4) => {
          n5.addEventListener(t3, r4, l4), e4[r4] = l4;
        }, o5 = (r4, l4) => {
          e4[r4] && (n5.removeEventListener(t3, r4, l4), delete e4[r4]);
        }, a4 = function(r4, l4, c2) {
          r4.offsetX = l4, r4.offsetY = c2, t3._eventHandler(r4);
        };
        if (D(t3.options.events, (r4) => s5(r4, a4)), t3.options.responsive) {
          a4 = (c2, d2) => {
            t3.canvas && t3.resize(c2, d2);
          };
          let r4, l4 = () => {
            o5("attach", l4), t3.attached = true, t3.resize(), s5("resize", a4), s5("detach", r4);
          };
          r4 = () => {
            t3.attached = false, o5("resize", a4), s5("attach", l4);
          }, n5.isAttached(t3.canvas) ? l4() : r4();
        } else
          t3.attached = true;
      }
      unbindEvents() {
        let t3 = this, e4 = t3._listeners;
        !e4 || (t3._listeners = {}, D(e4, (n5, s5) => {
          t3.platform.removeEventListener(t3, s5, n5);
        }));
      }
      updateHoverStyle(t3, e4, n5) {
        let s5 = n5 ? "set" : "remove", o5, a4, r4, l4;
        for (e4 === "dataset" && (o5 = this.getDatasetMeta(t3[0].datasetIndex), o5.controller["_" + s5 + "DatasetHoverStyle"]()), r4 = 0, l4 = t3.length; r4 < l4; ++r4) {
          a4 = t3[r4];
          let c2 = a4 && this.getDatasetMeta(a4.datasetIndex).controller;
          c2 && c2[s5 + "HoverStyle"](a4.element, a4.datasetIndex, a4.index);
        }
      }
      getActiveElements() {
        return this._active || [];
      }
      setActiveElements(t3) {
        let e4 = this, n5 = e4._active || [], s5 = t3.map(({ datasetIndex: a4, index: r4 }) => {
          let l4 = e4.getDatasetMeta(a4);
          if (!l4)
            throw new Error("No dataset found at index " + a4);
          return { datasetIndex: a4, element: l4.data[r4], index: r4 };
        });
        !qt(s5, n5) && (e4._active = s5, e4._updateHoverStyles(s5, n5));
      }
      notifyPlugins(t3, e4, n5) {
        return this._plugins.notify(this, t3, e4, n5);
      }
      _updateHoverStyles(t3, e4, n5) {
        let s5 = this, o5 = s5.options.hover, a4 = (c2, d2) => c2.filter((h4) => !d2.some((u3) => h4.datasetIndex === u3.datasetIndex && h4.index === u3.index)), r4 = a4(e4, t3), l4 = n5 ? t3 : a4(t3, e4);
        r4.length && s5.updateHoverStyle(r4, o5.mode, false), l4.length && o5.mode && s5.updateHoverStyle(l4, o5.mode, true);
      }
      _eventHandler(t3, e4) {
        let n5 = this, s5 = { event: t3, replay: e4, cancelable: true }, o5 = (r4) => (r4.options.events || this.options.events).includes(t3.type);
        if (n5.notifyPlugins("beforeEvent", s5, o5) === false)
          return;
        let a4 = n5._handleEvent(t3, e4);
        return s5.cancelable = false, n5.notifyPlugins("afterEvent", s5, o5), (a4 || s5.changed) && n5.render(), n5;
      }
      _handleEvent(t3, e4) {
        let n5 = this, { _active: s5 = [], options: o5 } = n5, a4 = o5.hover, r4 = e4, l4 = [], c2 = false, d2 = null;
        return t3.type !== "mouseout" && (l4 = n5.getElementsAtEventForMode(t3, a4.mode, a4, r4), d2 = t3.type === "click" ? n5._lastEvent : t3), n5._lastEvent = null, Ht(t3, n5.chartArea, n5._minPadding) && (R2(o5.onHover, [t3, l4, n5], n5), (t3.type === "mouseup" || t3.type === "click" || t3.type === "contextmenu") && R2(o5.onClick, [t3, l4, n5], n5)), c2 = !qt(l4, s5), (c2 || e4) && (n5._active = l4, n5._updateHoverStyles(l4, s5, e4)), n5._lastEvent = d2, c2;
      }
    }, Io = () => D(nt.instances, (i4) => i4._plugins.invalidate()), xt = true;
    Object.defineProperties(nt, { defaults: { enumerable: xt, value: k2 }, instances: { enumerable: xt, value: ln }, overrides: { enumerable: xt, value: ft }, registry: { enumerable: xt, value: lt }, version: { enumerable: xt, value: Ll }, getChart: { enumerable: xt, value: zo }, register: { enumerable: xt, value: (...i4) => {
      lt.add(...i4), Io();
    } }, unregister: { enumerable: xt, value: (...i4) => {
      lt.remove(...i4), Io();
    } } });
    function Bo(i4, t3) {
      let { startAngle: e4, endAngle: n5, pixelMargin: s5, x: o5, y: a4, outerRadius: r4, innerRadius: l4 } = t3, c2 = s5 / r4;
      i4.beginPath(), i4.arc(o5, a4, r4, e4 - c2, n5 + c2), l4 > s5 ? (c2 = s5 / l4, i4.arc(o5, a4, l4, n5 + c2, e4 - c2, true)) : i4.arc(o5, a4, s5, n5 + L2, e4 - L2), i4.closePath(), i4.clip();
    }
    function zl(i4) {
      return je(i4, ["outerStart", "outerEnd", "innerStart", "innerEnd"]);
    }
    function Il(i4, t3, e4, n5) {
      let s5 = zl(i4.options.borderRadius), o5 = (e4 - t3) / 2, a4 = Math.min(o5, n5 * t3 / 2), r4 = (l4) => {
        let c2 = (e4 - Math.min(o5, l4)) * n5 / 2;
        return X(l4, 0, Math.min(o5, c2));
      };
      return { outerStart: r4(s5.outerStart), outerEnd: r4(s5.outerEnd), innerStart: X(s5.innerStart, 0, a4), innerEnd: X(s5.innerEnd, 0, a4) };
    }
    function Nt(i4, t3, e4, n5) {
      return { x: e4 + i4 * Math.cos(t3), y: n5 + i4 * Math.sin(t3) };
    }
    function gi(i4, t3) {
      let { x: e4, y: n5, startAngle: s5, endAngle: o5, pixelMargin: a4 } = t3, r4 = Math.max(t3.outerRadius - a4, 0), l4 = t3.innerRadius + a4, { outerStart: c2, outerEnd: d2, innerStart: h4, innerEnd: u3 } = Il(t3, l4, r4, o5 - s5), f2 = r4 - c2, g2 = r4 - d2, p2 = s5 + c2 / f2, m2 = o5 - d2 / g2, b2 = l4 + h4, _2 = l4 + u3, y2 = s5 + h4 / b2, x2 = o5 - u3 / _2;
      if (i4.beginPath(), i4.arc(e4, n5, r4, p2, m2), d2 > 0) {
        let S3 = Nt(g2, m2, e4, n5);
        i4.arc(S3.x, S3.y, d2, m2, o5 + L2);
      }
      let v2 = Nt(_2, o5, e4, n5);
      if (i4.lineTo(v2.x, v2.y), u3 > 0) {
        let S3 = Nt(_2, x2, e4, n5);
        i4.arc(S3.x, S3.y, u3, o5 + L2, x2 + Math.PI);
      }
      if (i4.arc(e4, n5, l4, o5 - u3 / l4, s5 + h4 / l4, true), h4 > 0) {
        let S3 = Nt(b2, y2, e4, n5);
        i4.arc(S3.x, S3.y, h4, y2 + Math.PI, s5 - L2);
      }
      let w2 = Nt(f2, s5, e4, n5);
      if (i4.lineTo(w2.x, w2.y), c2 > 0) {
        let S3 = Nt(f2, p2, e4, n5);
        i4.arc(S3.x, S3.y, c2, s5 - L2, p2);
      }
      i4.closePath();
    }
    function Bl(i4, t3) {
      if (t3.fullCircles) {
        t3.endAngle = t3.startAngle + A2, gi(i4, t3);
        for (let e4 = 0; e4 < t3.fullCircles; ++e4)
          i4.fill();
      }
      isNaN(t3.circumference) || (t3.endAngle = t3.startAngle + t3.circumference % A2), gi(i4, t3), i4.fill();
    }
    function Hl(i4, t3, e4) {
      let { x: n5, y: s5, startAngle: o5, endAngle: a4, pixelMargin: r4 } = t3, l4 = Math.max(t3.outerRadius - r4, 0), c2 = t3.innerRadius + r4, d2;
      for (e4 && (t3.endAngle = t3.startAngle + A2, Bo(i4, t3), t3.endAngle = a4, t3.endAngle === t3.startAngle && (t3.endAngle += A2, t3.fullCircles--)), i4.beginPath(), i4.arc(n5, s5, c2, o5 + A2, o5, true), d2 = 0; d2 < t3.fullCircles; ++d2)
        i4.stroke();
      for (i4.beginPath(), i4.arc(n5, s5, l4, o5, o5 + A2), d2 = 0; d2 < t3.fullCircles; ++d2)
        i4.stroke();
    }
    function Vl(i4, t3) {
      let { options: e4 } = t3, n5 = e4.borderAlign === "inner";
      !e4.borderWidth || (n5 ? (i4.lineWidth = e4.borderWidth * 2, i4.lineJoin = "round") : (i4.lineWidth = e4.borderWidth, i4.lineJoin = "bevel"), t3.fullCircles && Hl(i4, t3, n5), n5 && Bo(i4, t3), gi(i4, t3), i4.stroke());
    }
    var cn = class extends et {
      constructor(t3) {
        super();
        this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, t3 && Object.assign(this, t3);
      }
      inRange(t3, e4, n5) {
        let s5 = this.getProps(["x", "y"], n5), { angle: o5, distance: a4 } = as(s5, { x: t3, y: e4 }), { startAngle: r4, endAngle: l4, innerRadius: c2, outerRadius: d2, circumference: h4 } = this.getProps(["startAngle", "endAngle", "innerRadius", "outerRadius", "circumference"], n5), u3 = h4 >= A2 || Zt(o5, r4, l4), f2 = a4 >= c2 && a4 <= d2;
        return u3 && f2;
      }
      getCenterPoint(t3) {
        let { x: e4, y: n5, startAngle: s5, endAngle: o5, innerRadius: a4, outerRadius: r4 } = this.getProps(["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"], t3), l4 = (s5 + o5) / 2, c2 = (a4 + r4) / 2;
        return { x: e4 + Math.cos(l4) * c2, y: n5 + Math.sin(l4) * c2 };
      }
      tooltipPosition(t3) {
        return this.getCenterPoint(t3);
      }
      draw(t3) {
        let e4 = this, n5 = e4.options, s5 = n5.offset || 0;
        if (e4.pixelMargin = n5.borderAlign === "inner" ? 0.33 : 0, e4.fullCircles = Math.floor(e4.circumference / A2), !(e4.circumference === 0 || e4.innerRadius < 0 || e4.outerRadius < 0)) {
          if (t3.save(), s5 && e4.circumference < A2) {
            let o5 = (e4.startAngle + e4.endAngle) / 2;
            t3.translate(Math.cos(o5) * s5, Math.sin(o5) * s5);
          }
          t3.fillStyle = n5.backgroundColor, t3.strokeStyle = n5.borderColor, Bl(t3, e4), Vl(t3, e4), t3.restore();
        }
      }
    };
    cn.id = "arc";
    cn.defaults = { borderAlign: "center", borderColor: "#fff", borderRadius: 0, borderWidth: 2, offset: 0, angle: void 0 };
    cn.defaultRoutes = { backgroundColor: "backgroundColor" };
    function Ho(i4, t3, e4 = t3) {
      i4.lineCap = C2(e4.borderCapStyle, t3.borderCapStyle), i4.setLineDash(C2(e4.borderDash, t3.borderDash)), i4.lineDashOffset = C2(e4.borderDashOffset, t3.borderDashOffset), i4.lineJoin = C2(e4.borderJoinStyle, t3.borderJoinStyle), i4.lineWidth = C2(e4.borderWidth, t3.borderWidth), i4.strokeStyle = C2(e4.borderColor, t3.borderColor);
    }
    function Wl(i4, t3, e4) {
      i4.lineTo(e4.x, e4.y);
    }
    function Nl(i4) {
      return i4.stepped ? vs : i4.tension || i4.cubicInterpolationMode === "monotone" ? ws : Wl;
    }
    function Vo(i4, t3, e4 = {}) {
      let n5 = i4.length, { start: s5 = 0, end: o5 = n5 - 1 } = e4, { start: a4, end: r4 } = t3, l4 = Math.max(s5, a4), c2 = Math.min(o5, r4), d2 = s5 < a4 && o5 < a4 || s5 > r4 && o5 > r4;
      return { count: n5, start: l4, loop: t3.loop, ilen: c2 < l4 && !d2 ? n5 + c2 - l4 : c2 - l4 };
    }
    function jl(i4, t3, e4, n5) {
      let { points: s5, options: o5 } = t3, { count: a4, start: r4, loop: l4, ilen: c2 } = Vo(s5, e4, n5), d2 = Nl(o5), { move: h4 = true, reverse: u3 } = n5 || {}, f2, g2, p2;
      for (f2 = 0; f2 <= c2; ++f2)
        g2 = s5[(r4 + (u3 ? c2 - f2 : f2)) % a4], !g2.skip && (h4 ? (i4.moveTo(g2.x, g2.y), h4 = false) : d2(i4, p2, g2, u3, o5.stepped), p2 = g2);
      return l4 && (g2 = s5[(r4 + (u3 ? c2 : 0)) % a4], d2(i4, p2, g2, u3, o5.stepped)), !!l4;
    }
    function $l(i4, t3, e4, n5) {
      let s5 = t3.points, { count: o5, start: a4, ilen: r4 } = Vo(s5, e4, n5), { move: l4 = true, reverse: c2 } = n5 || {}, d2 = 0, h4 = 0, u3, f2, g2, p2, m2, b2, _2 = (x2) => (a4 + (c2 ? r4 - x2 : x2)) % o5, y2 = () => {
        p2 !== m2 && (i4.lineTo(d2, m2), i4.lineTo(d2, p2), i4.lineTo(d2, b2));
      };
      for (l4 && (f2 = s5[_2(0)], i4.moveTo(f2.x, f2.y)), u3 = 0; u3 <= r4; ++u3) {
        if (f2 = s5[_2(u3)], f2.skip)
          continue;
        let x2 = f2.x, v2 = f2.y, w2 = x2 | 0;
        w2 === g2 ? (v2 < p2 ? p2 = v2 : v2 > m2 && (m2 = v2), d2 = (h4 * d2 + x2) / ++h4) : (y2(), i4.lineTo(x2, v2), g2 = w2, h4 = 0, p2 = m2 = v2), b2 = v2;
      }
      y2();
    }
    function pi(i4) {
      let t3 = i4.options, e4 = t3.borderDash && t3.borderDash.length;
      return !i4._decimated && !i4._loop && !t3.tension && t3.cubicInterpolationMode !== "monotone" && !t3.stepped && !e4 ? $l : jl;
    }
    function Ul(i4) {
      return i4.stepped ? Is : i4.tension || i4.cubicInterpolationMode === "monotone" ? Bs : mt;
    }
    function Yl(i4, t3, e4, n5) {
      let s5 = t3._path;
      s5 || (s5 = t3._path = new Path2D(), t3.path(s5, e4, n5) && s5.closePath()), Ho(i4, t3.options), i4.stroke(s5);
    }
    function Xl(i4, t3, e4, n5) {
      let { segments: s5, options: o5 } = t3, a4 = pi(t3);
      for (let r4 of s5)
        Ho(i4, o5, r4.style), i4.beginPath(), a4(i4, t3, r4, { start: e4, end: e4 + n5 - 1 }) && i4.closePath(), i4.stroke();
    }
    var ql = typeof Path2D == "function";
    function Kl(i4, t3, e4, n5) {
      ql && t3.segments.length === 1 ? Yl(i4, t3, e4, n5) : Xl(i4, t3, e4, n5);
    }
    var Ot = class extends et {
      constructor(t3) {
        super();
        this.animated = true, this.options = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = false, this._pointsUpdated = false, t3 && Object.assign(this, t3);
      }
      updateControlPoints(t3) {
        let e4 = this, n5 = e4.options;
        if ((n5.tension || n5.cubicInterpolationMode === "monotone") && !n5.stepped && !e4._pointsUpdated) {
          let s5 = n5.spanGaps ? e4._loop : e4._fullLoop;
          Es(e4._points, n5, t3, s5), e4._pointsUpdated = true;
        }
      }
      set points(t3) {
        let e4 = this;
        e4._points = t3, delete e4._segments, delete e4._path, e4._pointsUpdated = false;
      }
      get points() {
        return this._points;
      }
      get segments() {
        return this._segments || (this._segments = Ys(this, this.options.segment));
      }
      first() {
        let t3 = this.segments, e4 = this.points;
        return t3.length && e4[t3[0].start];
      }
      last() {
        let t3 = this.segments, e4 = this.points, n5 = t3.length;
        return n5 && e4[t3[n5 - 1].end];
      }
      interpolate(t3, e4) {
        let n5 = this, s5 = n5.options, o5 = t3[e4], a4 = n5.points, r4 = Us(n5, { property: e4, start: o5, end: o5 });
        if (!r4.length)
          return;
        let l4 = [], c2 = Ul(s5), d2, h4;
        for (d2 = 0, h4 = r4.length; d2 < h4; ++d2) {
          let { start: u3, end: f2 } = r4[d2], g2 = a4[u3], p2 = a4[f2];
          if (g2 === p2) {
            l4.push(g2);
            continue;
          }
          let m2 = Math.abs((o5 - g2[e4]) / (p2[e4] - g2[e4])), b2 = c2(g2, p2, m2, s5.stepped);
          b2[e4] = t3[e4], l4.push(b2);
        }
        return l4.length === 1 ? l4[0] : l4;
      }
      pathSegment(t3, e4, n5) {
        return pi(this)(t3, this, e4, n5);
      }
      path(t3, e4, n5) {
        let s5 = this, o5 = s5.segments, a4 = pi(s5), r4 = s5._loop;
        e4 = e4 || 0, n5 = n5 || s5.points.length - e4;
        for (let l4 of o5)
          r4 &= a4(t3, s5, l4, { start: e4, end: e4 + n5 - 1 });
        return !!r4;
      }
      draw(t3, e4, n5, s5) {
        let o5 = this, a4 = o5.options || {};
        !(o5.points || []).length || !a4.borderWidth || (t3.save(), Kl(t3, o5, n5, s5), t3.restore(), o5.animated && (o5._pointsUpdated = false, o5._path = void 0));
      }
    };
    Ot.id = "line";
    Ot.defaults = { borderCapStyle: "butt", borderDash: [], borderDashOffset: 0, borderJoinStyle: "miter", borderWidth: 3, capBezierPoints: true, cubicInterpolationMode: "default", fill: false, spanGaps: false, stepped: false, tension: 0 };
    Ot.defaultRoutes = { backgroundColor: "backgroundColor", borderColor: "borderColor" };
    Ot.descriptors = { _scriptable: true, _indexable: (i4) => i4 !== "borderDash" && i4 !== "fill" };
    function Wo(i4, t3, e4, n5) {
      let s5 = i4.options, { [e4]: o5 } = i4.getProps([e4], n5);
      return Math.abs(t3 - o5) < s5.radius + s5.hitRadius;
    }
    var jt = class extends et {
      constructor(t3) {
        super();
        this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t3 && Object.assign(this, t3);
      }
      inRange(t3, e4, n5) {
        let s5 = this.options, { x: o5, y: a4 } = this.getProps(["x", "y"], n5);
        return Math.pow(t3 - o5, 2) + Math.pow(e4 - a4, 2) < Math.pow(s5.hitRadius + s5.radius, 2);
      }
      inXRange(t3, e4) {
        return Wo(this, t3, "x", e4);
      }
      inYRange(t3, e4) {
        return Wo(this, t3, "y", e4);
      }
      getCenterPoint(t3) {
        let { x: e4, y: n5 } = this.getProps(["x", "y"], t3);
        return { x: e4, y: n5 };
      }
      size(t3) {
        t3 = t3 || this.options || {};
        let e4 = t3.radius || 0;
        e4 = Math.max(e4, e4 && t3.hoverRadius || 0);
        let n5 = e4 && t3.borderWidth || 0;
        return (e4 + n5) * 2;
      }
      draw(t3) {
        let e4 = this, n5 = e4.options;
        e4.skip || n5.radius < 0.1 || (t3.strokeStyle = n5.borderColor, t3.lineWidth = n5.borderWidth, t3.fillStyle = n5.backgroundColor, He(t3, n5, e4.x, e4.y));
      }
      getRange() {
        let t3 = this.options || {};
        return t3.radius + t3.hitRadius;
      }
    };
    jt.id = "point";
    jt.defaults = { borderWidth: 1, hitRadius: 1, hoverBorderWidth: 1, hoverRadius: 4, pointStyle: "circle", radius: 3, rotation: 0 };
    jt.defaultRoutes = { backgroundColor: "backgroundColor", borderColor: "borderColor" };
    function No(i4, t3) {
      let { x: e4, y: n5, base: s5, width: o5, height: a4 } = i4.getProps(["x", "y", "base", "width", "height"], t3), r4, l4, c2, d2, h4;
      return i4.horizontal ? (h4 = a4 / 2, r4 = Math.min(e4, s5), l4 = Math.max(e4, s5), c2 = n5 - h4, d2 = n5 + h4) : (h4 = o5 / 2, r4 = e4 - h4, l4 = e4 + h4, c2 = Math.min(n5, s5), d2 = Math.max(n5, s5)), { left: r4, top: c2, right: l4, bottom: d2 };
    }
    function jo(i4) {
      let t3 = i4.options.borderSkipped, e4 = {};
      return t3 && (t3 = i4.horizontal ? $o(t3, "left", "right", i4.base > i4.x) : $o(t3, "bottom", "top", i4.base < i4.y), e4[t3] = true), e4;
    }
    function $o(i4, t3, e4, n5) {
      return n5 ? (i4 = Gl(i4, t3, e4), i4 = Uo(i4, e4, t3)) : i4 = Uo(i4, t3, e4), i4;
    }
    function Gl(i4, t3, e4) {
      return i4 === t3 ? e4 : i4 === e4 ? t3 : i4;
    }
    function Uo(i4, t3, e4) {
      return i4 === "start" ? t3 : i4 === "end" ? e4 : i4;
    }
    function _t(i4, t3, e4, n5) {
      return i4 ? 0 : Math.max(Math.min(t3, n5), e4);
    }
    function Zl(i4, t3, e4) {
      let n5 = i4.options.borderWidth, s5 = jo(i4), o5 = Xn(n5);
      return { t: _t(s5.top, o5.top, 0, e4), r: _t(s5.right, o5.right, 0, t3), b: _t(s5.bottom, o5.bottom, 0, e4), l: _t(s5.left, o5.left, 0, t3) };
    }
    function Jl(i4, t3, e4) {
      let { enableBorderRadius: n5 } = i4.getProps(["enableBorderRadius"]), s5 = i4.options.borderRadius, o5 = qn(s5), a4 = Math.min(t3, e4), r4 = jo(i4), l4 = n5 || O(s5);
      return { topLeft: _t(!l4 || r4.top || r4.left, o5.topLeft, 0, a4), topRight: _t(!l4 || r4.top || r4.right, o5.topRight, 0, a4), bottomLeft: _t(!l4 || r4.bottom || r4.left, o5.bottomLeft, 0, a4), bottomRight: _t(!l4 || r4.bottom || r4.right, o5.bottomRight, 0, a4) };
    }
    function Ql(i4) {
      let t3 = No(i4), e4 = t3.right - t3.left, n5 = t3.bottom - t3.top, s5 = Zl(i4, e4 / 2, n5 / 2), o5 = Jl(i4, e4 / 2, n5 / 2);
      return { outer: { x: t3.left, y: t3.top, w: e4, h: n5, radius: o5 }, inner: { x: t3.left + s5.l, y: t3.top + s5.t, w: e4 - s5.l - s5.r, h: n5 - s5.t - s5.b, radius: { topLeft: Math.max(0, o5.topLeft - Math.max(s5.t, s5.l)), topRight: Math.max(0, o5.topRight - Math.max(s5.t, s5.r)), bottomLeft: Math.max(0, o5.bottomLeft - Math.max(s5.b, s5.l)), bottomRight: Math.max(0, o5.bottomRight - Math.max(s5.b, s5.r)) } } };
    }
    function mi(i4, t3, e4, n5) {
      let s5 = t3 === null, o5 = e4 === null, r4 = i4 && !(s5 && o5) && No(i4, n5);
      return r4 && (s5 || t3 >= r4.left && t3 <= r4.right) && (o5 || e4 >= r4.top && e4 <= r4.bottom);
    }
    function tc(i4) {
      return i4.topLeft || i4.topRight || i4.bottomLeft || i4.bottomRight;
    }
    function ec(i4, t3) {
      i4.rect(t3.x, t3.y, t3.w, t3.h);
    }
    var dn = class extends et {
      constructor(t3) {
        super();
        this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, t3 && Object.assign(this, t3);
      }
      draw(t3) {
        let e4 = this.options, { inner: n5, outer: s5 } = Ql(this), o5 = tc(s5.radius) ? Ne : ec;
        t3.save(), (s5.w !== n5.w || s5.h !== n5.h) && (t3.beginPath(), o5(t3, s5), t3.clip(), o5(t3, n5), t3.fillStyle = e4.borderColor, t3.fill("evenodd")), t3.beginPath(), o5(t3, n5), t3.fillStyle = e4.backgroundColor, t3.fill(), t3.restore();
      }
      inRange(t3, e4, n5) {
        return mi(this, t3, e4, n5);
      }
      inXRange(t3, e4) {
        return mi(this, t3, null, e4);
      }
      inYRange(t3, e4) {
        return mi(this, null, t3, e4);
      }
      getCenterPoint(t3) {
        let { x: e4, y: n5, base: s5, horizontal: o5 } = this.getProps(["x", "y", "base", "horizontal"], t3);
        return { x: o5 ? (e4 + s5) / 2 : e4, y: o5 ? n5 : (n5 + s5) / 2 };
      }
      getRange(t3) {
        return t3 === "x" ? this.width / 2 : this.height / 2;
      }
    };
    dn.id = "bar";
    dn.defaults = { borderSkipped: "start", borderWidth: 0, borderRadius: 0, enableBorderRadius: true, pointStyle: void 0 };
    dn.defaultRoutes = { backgroundColor: "backgroundColor", borderColor: "borderColor" };
    var hn = { average(i4) {
      if (!i4.length)
        return false;
      let t3, e4, n5 = 0, s5 = 0, o5 = 0;
      for (t3 = 0, e4 = i4.length; t3 < e4; ++t3) {
        let a4 = i4[t3].element;
        if (a4 && a4.hasValue()) {
          let r4 = a4.tooltipPosition();
          n5 += r4.x, s5 += r4.y, ++o5;
        }
      }
      return { x: n5 / o5, y: s5 / o5 };
    }, nearest(i4, t3) {
      if (!i4.length)
        return false;
      let e4 = t3.x, n5 = t3.y, s5 = Number.POSITIVE_INFINITY, o5, a4, r4;
      for (o5 = 0, a4 = i4.length; o5 < a4; ++o5) {
        let l4 = i4[o5].element;
        if (l4 && l4.hasValue()) {
          let c2 = l4.getCenterPoint(), d2 = Re(t3, c2);
          d2 < s5 && (s5 = d2, r4 = l4);
        }
      }
      if (r4) {
        let l4 = r4.tooltipPosition();
        e4 = l4.x, n5 = l4.y;
      }
      return { x: e4, y: n5 };
    } };
    function it(i4, t3) {
      return t3 && (T2(t3) ? Array.prototype.push.apply(i4, t3) : i4.push(t3)), i4;
    }
    function ct(i4) {
      return (typeof i4 == "string" || i4 instanceof String) && i4.indexOf(`
`) > -1 ? i4.split(`
`) : i4;
    }
    function nc(i4, t3) {
      let { element: e4, datasetIndex: n5, index: s5 } = t3, o5 = i4.getDatasetMeta(n5).controller, { label: a4, value: r4 } = o5.getLabelAndValue(s5);
      return { chart: i4, label: a4, parsed: o5.getParsed(s5), raw: i4.data.datasets[n5].data[s5], formattedValue: r4, dataset: o5.getDataset(), dataIndex: s5, datasetIndex: n5, element: e4 };
    }
    function Yo(i4, t3) {
      let e4 = i4._chart.ctx, { body: n5, footer: s5, title: o5 } = i4, { boxWidth: a4, boxHeight: r4 } = t3, l4 = N2(t3.bodyFont), c2 = N2(t3.titleFont), d2 = N2(t3.footerFont), h4 = o5.length, u3 = s5.length, f2 = n5.length, g2 = G(t3.padding), p2 = g2.height, m2 = 0, b2 = n5.reduce((x2, v2) => x2 + v2.before.length + v2.lines.length + v2.after.length, 0);
      if (b2 += i4.beforeBody.length + i4.afterBody.length, h4 && (p2 += h4 * c2.lineHeight + (h4 - 1) * t3.titleSpacing + t3.titleMarginBottom), b2) {
        let x2 = t3.displayColors ? Math.max(r4, l4.lineHeight) : l4.lineHeight;
        p2 += f2 * x2 + (b2 - f2) * l4.lineHeight + (b2 - 1) * t3.bodySpacing;
      }
      u3 && (p2 += t3.footerMarginTop + u3 * d2.lineHeight + (u3 - 1) * t3.footerSpacing);
      let _2 = 0, y2 = function(x2) {
        m2 = Math.max(m2, e4.measureText(x2).width + _2);
      };
      return e4.save(), e4.font = c2.string, D(i4.title, y2), e4.font = l4.string, D(i4.beforeBody.concat(i4.afterBody), y2), _2 = t3.displayColors ? a4 + 2 : 0, D(n5, (x2) => {
        D(x2.before, y2), D(x2.lines, y2), D(x2.after, y2);
      }), _2 = 0, e4.font = d2.string, D(i4.footer, y2), e4.restore(), m2 += g2.width, { width: m2, height: p2 };
    }
    function ic(i4, t3) {
      let { y: e4, height: n5 } = t3;
      return e4 < n5 / 2 ? "top" : e4 > i4.height - n5 / 2 ? "bottom" : "center";
    }
    function sc(i4, t3, e4, n5) {
      let { x: s5, width: o5 } = n5, a4 = e4.caretSize + e4.caretPadding;
      if (i4 === "left" && s5 + o5 + a4 > t3.width || i4 === "right" && s5 - o5 - a4 < 0)
        return true;
    }
    function oc(i4, t3, e4, n5) {
      let { x: s5, width: o5 } = e4, { width: a4, chartArea: { left: r4, right: l4 } } = i4, c2 = "center";
      return n5 === "center" ? c2 = s5 <= (r4 + l4) / 2 ? "left" : "right" : s5 <= o5 / 2 ? c2 = "left" : s5 >= a4 - o5 / 2 && (c2 = "right"), sc(c2, i4, t3, e4) && (c2 = "center"), c2;
    }
    function Xo(i4, t3, e4) {
      let n5 = t3.yAlign || ic(i4, e4);
      return { xAlign: t3.xAlign || oc(i4, t3, e4, n5), yAlign: n5 };
    }
    function ac(i4, t3) {
      let { x: e4, width: n5 } = i4;
      return t3 === "right" ? e4 -= n5 : t3 === "center" && (e4 -= n5 / 2), e4;
    }
    function rc(i4, t3, e4) {
      let { y: n5, height: s5 } = i4;
      return t3 === "top" ? n5 += e4 : t3 === "bottom" ? n5 -= s5 + e4 : n5 -= s5 / 2, n5;
    }
    function qo(i4, t3, e4, n5) {
      let { caretSize: s5, caretPadding: o5, cornerRadius: a4 } = i4, { xAlign: r4, yAlign: l4 } = e4, c2 = s5 + o5, d2 = a4 + o5, h4 = ac(t3, r4), u3 = rc(t3, l4, c2);
      return l4 === "center" ? r4 === "left" ? h4 += c2 : r4 === "right" && (h4 -= c2) : r4 === "left" ? h4 -= d2 : r4 === "right" && (h4 += d2), { x: X(h4, 0, n5.width - t3.width), y: X(u3, 0, n5.height - t3.height) };
    }
    function un(i4, t3, e4) {
      let n5 = G(e4.padding);
      return t3 === "center" ? i4.x + i4.width / 2 : t3 === "right" ? i4.x + i4.width - n5.right : i4.x + n5.left;
    }
    function Ko(i4) {
      return it([], ct(i4));
    }
    function lc(i4, t3, e4) {
      return Object.assign(Object.create(i4), { tooltip: t3, tooltipItems: e4, type: "tooltip" });
    }
    function Go(i4, t3) {
      let e4 = t3 && t3.dataset && t3.dataset.tooltip && t3.dataset.tooltip.callbacks;
      return e4 ? i4.override(e4) : i4;
    }
    var Zo = class extends et {
      constructor(t3) {
        super();
        this.opacity = 0, this._active = [], this._chart = t3._chart, this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.options = t3.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
      }
      initialize(t3) {
        this.options = t3, this._cachedAnimations = void 0, this.$context = void 0;
      }
      _resolveAnimations() {
        let t3 = this, e4 = t3._cachedAnimations;
        if (e4)
          return e4;
        let n5 = t3._chart, s5 = t3.options.setContext(t3.getContext()), o5 = s5.enabled && n5.options.animation && s5.animations, a4 = new ii(t3._chart, o5);
        return o5._cacheable && (t3._cachedAnimations = Object.freeze(a4)), a4;
      }
      getContext() {
        let t3 = this;
        return t3.$context || (t3.$context = lc(t3._chart.getContext(), t3, t3._tooltipItems));
      }
      getTitle(t3, e4) {
        let n5 = this, { callbacks: s5 } = e4, o5 = s5.beforeTitle.apply(n5, [t3]), a4 = s5.title.apply(n5, [t3]), r4 = s5.afterTitle.apply(n5, [t3]), l4 = [];
        return l4 = it(l4, ct(o5)), l4 = it(l4, ct(a4)), l4 = it(l4, ct(r4)), l4;
      }
      getBeforeBody(t3, e4) {
        return Ko(e4.callbacks.beforeBody.apply(this, [t3]));
      }
      getBody(t3, e4) {
        let n5 = this, { callbacks: s5 } = e4, o5 = [];
        return D(t3, (a4) => {
          let r4 = { before: [], lines: [], after: [] }, l4 = Go(s5, a4);
          it(r4.before, ct(l4.beforeLabel.call(n5, a4))), it(r4.lines, l4.label.call(n5, a4)), it(r4.after, ct(l4.afterLabel.call(n5, a4))), o5.push(r4);
        }), o5;
      }
      getAfterBody(t3, e4) {
        return Ko(e4.callbacks.afterBody.apply(this, [t3]));
      }
      getFooter(t3, e4) {
        let n5 = this, { callbacks: s5 } = e4, o5 = s5.beforeFooter.apply(n5, [t3]), a4 = s5.footer.apply(n5, [t3]), r4 = s5.afterFooter.apply(n5, [t3]), l4 = [];
        return l4 = it(l4, ct(o5)), l4 = it(l4, ct(a4)), l4 = it(l4, ct(r4)), l4;
      }
      _createItems(t3) {
        let e4 = this, n5 = e4._active, s5 = e4._chart.data, o5 = [], a4 = [], r4 = [], l4 = [], c2, d2;
        for (c2 = 0, d2 = n5.length; c2 < d2; ++c2)
          l4.push(nc(e4._chart, n5[c2]));
        return t3.filter && (l4 = l4.filter((h4, u3, f2) => t3.filter(h4, u3, f2, s5))), t3.itemSort && (l4 = l4.sort((h4, u3) => t3.itemSort(h4, u3, s5))), D(l4, (h4) => {
          let u3 = Go(t3.callbacks, h4);
          o5.push(u3.labelColor.call(e4, h4)), a4.push(u3.labelPointStyle.call(e4, h4)), r4.push(u3.labelTextColor.call(e4, h4));
        }), e4.labelColors = o5, e4.labelPointStyles = a4, e4.labelTextColors = r4, e4.dataPoints = l4, l4;
      }
      update(t3, e4) {
        let n5 = this, s5 = n5.options.setContext(n5.getContext()), o5 = n5._active, a4, r4 = [];
        if (!o5.length)
          n5.opacity !== 0 && (a4 = { opacity: 0 });
        else {
          let l4 = hn[s5.position].call(n5, o5, n5._eventPosition);
          r4 = n5._createItems(s5), n5.title = n5.getTitle(r4, s5), n5.beforeBody = n5.getBeforeBody(r4, s5), n5.body = n5.getBody(r4, s5), n5.afterBody = n5.getAfterBody(r4, s5), n5.footer = n5.getFooter(r4, s5);
          let c2 = n5._size = Yo(n5, s5), d2 = Object.assign({}, l4, c2), h4 = Xo(n5._chart, s5, d2), u3 = qo(s5, d2, h4, n5._chart);
          n5.xAlign = h4.xAlign, n5.yAlign = h4.yAlign, a4 = { opacity: 1, x: u3.x, y: u3.y, width: c2.width, height: c2.height, caretX: l4.x, caretY: l4.y };
        }
        n5._tooltipItems = r4, n5.$context = void 0, a4 && n5._resolveAnimations().update(n5, a4), t3 && s5.external && s5.external.call(n5, { chart: n5._chart, tooltip: n5, replay: e4 });
      }
      drawCaret(t3, e4, n5, s5) {
        let o5 = this.getCaretPosition(t3, n5, s5);
        e4.lineTo(o5.x1, o5.y1), e4.lineTo(o5.x2, o5.y2), e4.lineTo(o5.x3, o5.y3);
      }
      getCaretPosition(t3, e4, n5) {
        let { xAlign: s5, yAlign: o5 } = this, { cornerRadius: a4, caretSize: r4 } = n5, { x: l4, y: c2 } = t3, { width: d2, height: h4 } = e4, u3, f2, g2, p2, m2, b2;
        return o5 === "center" ? (m2 = c2 + h4 / 2, s5 === "left" ? (u3 = l4, f2 = u3 - r4, p2 = m2 + r4, b2 = m2 - r4) : (u3 = l4 + d2, f2 = u3 + r4, p2 = m2 - r4, b2 = m2 + r4), g2 = u3) : (s5 === "left" ? f2 = l4 + a4 + r4 : s5 === "right" ? f2 = l4 + d2 - a4 - r4 : f2 = this.caretX, o5 === "top" ? (p2 = c2, m2 = p2 - r4, u3 = f2 - r4, g2 = f2 + r4) : (p2 = c2 + h4, m2 = p2 + r4, u3 = f2 + r4, g2 = f2 - r4), b2 = p2), { x1: u3, x2: f2, x3: g2, y1: p2, y2: m2, y3: b2 };
      }
      drawTitle(t3, e4, n5) {
        let s5 = this, o5 = s5.title, a4 = o5.length, r4, l4, c2;
        if (a4) {
          let d2 = qe(n5.rtl, s5.x, s5.width);
          for (t3.x = un(s5, n5.titleAlign, n5), e4.textAlign = d2.textAlign(n5.titleAlign), e4.textBaseline = "middle", r4 = N2(n5.titleFont), l4 = n5.titleSpacing, e4.fillStyle = n5.titleColor, e4.font = r4.string, c2 = 0; c2 < a4; ++c2)
            e4.fillText(o5[c2], d2.x(t3.x), t3.y + r4.lineHeight / 2), t3.y += r4.lineHeight + l4, c2 + 1 === a4 && (t3.y += n5.titleMarginBottom - l4);
        }
      }
      _drawColorBox(t3, e4, n5, s5, o5) {
        let a4 = this, r4 = a4.labelColors[n5], l4 = a4.labelPointStyles[n5], { boxHeight: c2, boxWidth: d2 } = o5, h4 = N2(o5.bodyFont), u3 = un(a4, "left", o5), f2 = s5.x(u3), g2 = c2 < h4.lineHeight ? (h4.lineHeight - c2) / 2 : 0, p2 = e4.y + g2;
        if (o5.usePointStyle) {
          let m2 = { radius: Math.min(d2, c2) / 2, pointStyle: l4.pointStyle, rotation: l4.rotation, borderWidth: 1 }, b2 = s5.leftForLtr(f2, d2) + d2 / 2, _2 = p2 + c2 / 2;
          t3.strokeStyle = o5.multiKeyBackground, t3.fillStyle = o5.multiKeyBackground, He(t3, m2, b2, _2), t3.strokeStyle = r4.borderColor, t3.fillStyle = r4.backgroundColor, He(t3, m2, b2, _2);
        } else {
          t3.lineWidth = r4.borderWidth || 1, t3.strokeStyle = r4.borderColor, t3.setLineDash(r4.borderDash || []), t3.lineDashOffset = r4.borderDashOffset || 0;
          let m2 = s5.leftForLtr(f2, d2), b2 = s5.leftForLtr(s5.xPlus(f2, 1), d2 - 2), _2 = qn(r4.borderRadius);
          Object.values(_2).some((y2) => y2 !== 0) ? (t3.beginPath(), t3.fillStyle = o5.multiKeyBackground, Ne(t3, { x: m2, y: p2, w: d2, h: c2, radius: _2 }), t3.fill(), t3.stroke(), t3.fillStyle = r4.backgroundColor, t3.beginPath(), Ne(t3, { x: b2, y: p2 + 1, w: d2 - 2, h: c2 - 2, radius: _2 }), t3.fill()) : (t3.fillStyle = o5.multiKeyBackground, t3.fillRect(m2, p2, d2, c2), t3.strokeRect(m2, p2, d2, c2), t3.fillStyle = r4.backgroundColor, t3.fillRect(b2, p2 + 1, d2 - 2, c2 - 2));
        }
        t3.fillStyle = a4.labelTextColors[n5];
      }
      drawBody(t3, e4, n5) {
        let s5 = this, { body: o5 } = s5, { bodySpacing: a4, bodyAlign: r4, displayColors: l4, boxHeight: c2, boxWidth: d2 } = n5, h4 = N2(n5.bodyFont), u3 = h4.lineHeight, f2 = 0, g2 = qe(n5.rtl, s5.x, s5.width), p2 = function(M2) {
          e4.fillText(M2, g2.x(t3.x + f2), t3.y + u3 / 2), t3.y += u3 + a4;
        }, m2 = g2.textAlign(r4), b2, _2, y2, x2, v2, w2, S3;
        for (e4.textAlign = r4, e4.textBaseline = "middle", e4.font = h4.string, t3.x = un(s5, m2, n5), e4.fillStyle = n5.bodyColor, D(s5.beforeBody, p2), f2 = l4 && m2 !== "right" ? r4 === "center" ? d2 / 2 + 1 : d2 + 2 : 0, x2 = 0, w2 = o5.length; x2 < w2; ++x2) {
          for (b2 = o5[x2], _2 = s5.labelTextColors[x2], e4.fillStyle = _2, D(b2.before, p2), y2 = b2.lines, l4 && y2.length && (s5._drawColorBox(e4, t3, x2, g2, n5), u3 = Math.max(h4.lineHeight, c2)), v2 = 0, S3 = y2.length; v2 < S3; ++v2)
            p2(y2[v2]), u3 = h4.lineHeight;
          D(b2.after, p2);
        }
        f2 = 0, u3 = h4.lineHeight, D(s5.afterBody, p2), t3.y -= a4;
      }
      drawFooter(t3, e4, n5) {
        let s5 = this, o5 = s5.footer, a4 = o5.length, r4, l4;
        if (a4) {
          let c2 = qe(n5.rtl, s5.x, s5.width);
          for (t3.x = un(s5, n5.footerAlign, n5), t3.y += n5.footerMarginTop, e4.textAlign = c2.textAlign(n5.footerAlign), e4.textBaseline = "middle", r4 = N2(n5.footerFont), e4.fillStyle = n5.footerColor, e4.font = r4.string, l4 = 0; l4 < a4; ++l4)
            e4.fillText(o5[l4], c2.x(t3.x), t3.y + r4.lineHeight / 2), t3.y += r4.lineHeight + n5.footerSpacing;
        }
      }
      drawBackground(t3, e4, n5, s5) {
        let { xAlign: o5, yAlign: a4 } = this, { x: r4, y: l4 } = t3, { width: c2, height: d2 } = n5, h4 = s5.cornerRadius;
        e4.fillStyle = s5.backgroundColor, e4.strokeStyle = s5.borderColor, e4.lineWidth = s5.borderWidth, e4.beginPath(), e4.moveTo(r4 + h4, l4), a4 === "top" && this.drawCaret(t3, e4, n5, s5), e4.lineTo(r4 + c2 - h4, l4), e4.quadraticCurveTo(r4 + c2, l4, r4 + c2, l4 + h4), a4 === "center" && o5 === "right" && this.drawCaret(t3, e4, n5, s5), e4.lineTo(r4 + c2, l4 + d2 - h4), e4.quadraticCurveTo(r4 + c2, l4 + d2, r4 + c2 - h4, l4 + d2), a4 === "bottom" && this.drawCaret(t3, e4, n5, s5), e4.lineTo(r4 + h4, l4 + d2), e4.quadraticCurveTo(r4, l4 + d2, r4, l4 + d2 - h4), a4 === "center" && o5 === "left" && this.drawCaret(t3, e4, n5, s5), e4.lineTo(r4, l4 + h4), e4.quadraticCurveTo(r4, l4, r4 + h4, l4), e4.closePath(), e4.fill(), s5.borderWidth > 0 && e4.stroke();
      }
      _updateAnimationTarget(t3) {
        let e4 = this, n5 = e4._chart, s5 = e4.$animations, o5 = s5 && s5.x, a4 = s5 && s5.y;
        if (o5 || a4) {
          let r4 = hn[t3.position].call(e4, e4._active, e4._eventPosition);
          if (!r4)
            return;
          let l4 = e4._size = Yo(e4, t3), c2 = Object.assign({}, r4, e4._size), d2 = Xo(n5, t3, c2), h4 = qo(t3, c2, d2, n5);
          (o5._to !== h4.x || a4._to !== h4.y) && (e4.xAlign = d2.xAlign, e4.yAlign = d2.yAlign, e4.width = l4.width, e4.height = l4.height, e4.caretX = r4.x, e4.caretY = r4.y, e4._resolveAnimations().update(e4, h4));
        }
      }
      draw(t3) {
        let e4 = this, n5 = e4.options.setContext(e4.getContext()), s5 = e4.opacity;
        if (!s5)
          return;
        e4._updateAnimationTarget(n5);
        let o5 = { width: e4.width, height: e4.height }, a4 = { x: e4.x, y: e4.y };
        s5 = Math.abs(s5) < 1e-3 ? 0 : s5;
        let r4 = G(n5.padding), l4 = e4.title.length || e4.beforeBody.length || e4.body.length || e4.afterBody.length || e4.footer.length;
        n5.enabled && l4 && (t3.save(), t3.globalAlpha = s5, e4.drawBackground(a4, t3, o5, n5), Vs(t3, n5.textDirection), a4.y += r4.top, e4.drawTitle(a4, t3, n5), e4.drawBody(a4, t3, n5), e4.drawFooter(a4, t3, n5), Ws(t3, n5.textDirection), t3.restore());
      }
      getActiveElements() {
        return this._active || [];
      }
      setActiveElements(t3, e4) {
        let n5 = this, s5 = n5._active, o5 = t3.map(({ datasetIndex: l4, index: c2 }) => {
          let d2 = n5._chart.getDatasetMeta(l4);
          if (!d2)
            throw new Error("Cannot find a dataset at index " + l4);
          return { datasetIndex: l4, element: d2.data[c2], index: c2 };
        }), a4 = !qt(s5, o5), r4 = n5._positionChanged(o5, e4);
        (a4 || r4) && (n5._active = o5, n5._eventPosition = e4, n5.update(true));
      }
      handleEvent(t3, e4) {
        let n5 = this, s5 = n5.options, o5 = n5._active || [], a4 = false, r4 = [];
        t3.type !== "mouseout" && (r4 = n5._chart.getElementsAtEventForMode(t3, s5.mode, s5, e4), s5.reverse && r4.reverse());
        let l4 = n5._positionChanged(r4, t3);
        return a4 = e4 || !qt(r4, o5) || l4, a4 && (n5._active = r4, (s5.enabled || s5.external) && (n5._eventPosition = { x: t3.x, y: t3.y }, n5.update(true, e4))), a4;
      }
      _positionChanged(t3, e4) {
        let { caretX: n5, caretY: s5, options: o5 } = this, a4 = hn[o5.position].call(this, t3, e4);
        return a4 !== false && (n5 !== a4.x || s5 !== a4.y);
      }
    };
    Zo.positioners = hn;
    var cc = (i4, t3, e4) => typeof t3 == "string" ? i4.push(t3) - 1 : isNaN(t3) ? null : e4;
    function dc(i4, t3, e4) {
      let n5 = i4.indexOf(t3);
      if (n5 === -1)
        return cc(i4, t3, e4);
      let s5 = i4.lastIndexOf(t3);
      return n5 !== s5 ? e4 : n5;
    }
    var hc = (i4, t3) => i4 === null ? null : X(Math.round(i4), 0, t3), $t = class extends bt {
      constructor(t3) {
        super(t3);
        this._startValue = void 0, this._valueRange = 0;
      }
      parse(t3, e4) {
        if (P2(t3))
          return null;
        let n5 = this.getLabels();
        return e4 = isFinite(e4) && n5[e4] === t3 ? e4 : dc(n5, t3, C2(e4, t3)), hc(e4, n5.length - 1);
      }
      determineDataLimits() {
        let t3 = this, { minDefined: e4, maxDefined: n5 } = t3.getUserBounds(), { min: s5, max: o5 } = t3.getMinMax(true);
        t3.options.bounds === "ticks" && (e4 || (s5 = 0), n5 || (o5 = t3.getLabels().length - 1)), t3.min = s5, t3.max = o5;
      }
      buildTicks() {
        let t3 = this, e4 = t3.min, n5 = t3.max, s5 = t3.options.offset, o5 = [], a4 = t3.getLabels();
        a4 = e4 === 0 && n5 === a4.length - 1 ? a4 : a4.slice(e4, n5 + 1), t3._valueRange = Math.max(a4.length - (s5 ? 0 : 1), 1), t3._startValue = t3.min - (s5 ? 0.5 : 0);
        for (let r4 = e4; r4 <= n5; r4++)
          o5.push({ value: r4 });
        return o5;
      }
      getLabelForValue(t3) {
        let n5 = this.getLabels();
        return t3 >= 0 && t3 < n5.length ? n5[t3] : t3;
      }
      configure() {
        let t3 = this;
        super.configure(), t3.isHorizontal() || (t3._reversePixels = !t3._reversePixels);
      }
      getPixelForValue(t3) {
        let e4 = this;
        return typeof t3 != "number" && (t3 = e4.parse(t3)), t3 === null ? NaN : e4.getPixelForDecimal((t3 - e4._startValue) / e4._valueRange);
      }
      getPixelForTick(t3) {
        let e4 = this, n5 = e4.ticks;
        return t3 < 0 || t3 > n5.length - 1 ? null : e4.getPixelForValue(n5[t3].value);
      }
      getValueForPixel(t3) {
        let e4 = this;
        return Math.round(e4._startValue + e4.getDecimalForPixel(t3) * e4._valueRange);
      }
      getBasePixel() {
        return this.bottom;
      }
    };
    $t.id = "category";
    $t.defaults = { ticks: { callback: $t.prototype.getLabelForValue } };
    function uc(i4, t3) {
      let e4 = [], n5 = 1e-14, { step: s5, min: o5, max: a4, precision: r4, count: l4, maxTicks: c2, maxDigits: d2, horizontal: h4 } = i4, u3 = s5 || 1, f2 = c2 - 1, { min: g2, max: p2 } = t3, m2 = !P2(o5), b2 = !P2(a4), _2 = !P2(l4), y2 = (p2 - g2) / d2, x2 = zn((p2 - g2) / f2 / u3) * u3, v2, w2, S3, M2;
      if (x2 < n5 && !m2 && !b2)
        return [{ value: g2 }, { value: p2 }];
      M2 = Math.ceil(p2 / x2) - Math.floor(g2 / x2), M2 > f2 && (x2 = zn(M2 * x2 / f2 / u3) * u3), P2(r4) || (v2 = Math.pow(10, r4), x2 = Math.ceil(x2 * v2) / v2), w2 = Math.floor(g2 / x2) * x2, S3 = Math.ceil(p2 / x2) * x2, m2 && b2 && s5 && ss((a4 - o5) / s5, x2 / 1e3) ? (M2 = Math.min((a4 - o5) / x2, c2), x2 = (a4 - o5) / M2, w2 = o5, S3 = a4) : _2 ? (w2 = m2 ? o5 : w2, S3 = b2 ? a4 : S3, M2 = l4 - 1, x2 = (S3 - w2) / M2) : (M2 = (S3 - w2) / x2, Gt(M2, Math.round(M2), x2 / 1e3) ? M2 = Math.round(M2) : M2 = Math.ceil(M2)), v2 = Math.pow(10, P2(r4) ? os(x2) : r4), w2 = Math.round(w2 * v2) / v2, S3 = Math.round(S3 * v2) / v2;
      let z2 = 0;
      for (m2 && (e4.push({ value: o5 }), w2 <= o5 && z2++, Gt(Math.round((w2 + z2 * x2) * v2) / v2, o5, y2 * (h4 ? ("" + o5).length : 1)) && z2++); z2 < M2; ++z2)
        e4.push({ value: Math.round((w2 + z2 * x2) * v2) / v2 });
      return b2 ? Gt(e4[e4.length - 1].value, a4, y2 * (h4 ? ("" + a4).length : 1)) ? e4[e4.length - 1].value = a4 : e4.push({ value: a4 }) : e4.push({ value: S3 }), e4;
    }
    var be = class extends bt {
      constructor(t3) {
        super(t3);
        this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
      }
      parse(t3, e4) {
        return P2(t3) || (typeof t3 == "number" || t3 instanceof Number) && !isFinite(+t3) ? null : +t3;
      }
      handleTickRangeOptions() {
        let t3 = this, { beginAtZero: e4, stacked: n5 } = t3.options, { minDefined: s5, maxDefined: o5 } = t3.getUserBounds(), { min: a4, max: r4 } = t3, l4 = (d2) => a4 = s5 ? a4 : d2, c2 = (d2) => r4 = o5 ? r4 : d2;
        if (e4 || n5) {
          let d2 = at(a4), h4 = at(r4);
          d2 < 0 && h4 < 0 ? c2(0) : d2 > 0 && h4 > 0 && l4(0);
        }
        a4 === r4 && (c2(r4 + 1), e4 || l4(a4 - 1)), t3.min = a4, t3.max = r4;
      }
      getTickLimit() {
        let t3 = this, e4 = t3.options.ticks, { maxTicksLimit: n5, stepSize: s5 } = e4, o5;
        return s5 ? o5 = Math.ceil(t3.max / s5) - Math.floor(t3.min / s5) + 1 : (o5 = t3.computeTickLimit(), n5 = n5 || 11), n5 && (o5 = Math.min(n5, o5)), o5;
      }
      computeTickLimit() {
        return Number.POSITIVE_INFINITY;
      }
      buildTicks() {
        let t3 = this, e4 = t3.options, n5 = e4.ticks, s5 = t3.getTickLimit();
        s5 = Math.max(2, s5);
        let o5 = { maxTicks: s5, min: e4.min, max: e4.max, precision: n5.precision, step: n5.stepSize, count: n5.count, maxDigits: t3._maxDigits(), horizontal: t3.isHorizontal() }, a4 = t3._range || t3, r4 = uc(o5, a4);
        return e4.bounds === "ticks" && In(r4, t3, "value"), e4.reverse ? (r4.reverse(), t3.start = t3.max, t3.end = t3.min) : (t3.start = t3.min, t3.end = t3.max), r4;
      }
      configure() {
        let t3 = this, e4 = t3.ticks, n5 = t3.min, s5 = t3.max;
        if (super.configure(), t3.options.offset && e4.length) {
          let o5 = (s5 - n5) / Math.max(e4.length - 1, 1) / 2;
          n5 -= o5, s5 += o5;
        }
        t3._startValue = n5, t3._endValue = s5, t3._valueRange = s5 - n5;
      }
      getLabelForValue(t3) {
        return re(t3, this.chart.options.locale);
      }
    }, xe = class extends be {
      determineDataLimits() {
        let t3 = this, { min: e4, max: n5 } = t3.getMinMax(true);
        t3.min = B(e4) ? e4 : 0, t3.max = B(n5) ? n5 : 1, t3.handleTickRangeOptions();
      }
      computeTickLimit() {
        let t3 = this;
        if (t3.isHorizontal())
          return Math.ceil(t3.width / 40);
        let e4 = t3._resolveTickFontOptions(0);
        return Math.ceil(t3.height / e4.lineHeight);
      }
      getPixelForValue(t3) {
        return t3 === null ? NaN : this.getPixelForDecimal((t3 - this._startValue) / this._valueRange);
      }
      getValueForPixel(t3) {
        return this._startValue + this.getDecimalForPixel(t3) * this._valueRange;
      }
    };
    xe.id = "linear";
    xe.defaults = { ticks: { callback: on.formatters.numeric } };
    function Jo(i4) {
      return i4 / Math.pow(10, Math.floor(Y(i4))) === 1;
    }
    function fc(i4, t3) {
      let e4 = Math.floor(Y(t3.max)), n5 = Math.ceil(t3.max / Math.pow(10, e4)), s5 = [], o5 = U(i4.min, Math.pow(10, Math.floor(Y(t3.min)))), a4 = Math.floor(Y(o5)), r4 = Math.floor(o5 / Math.pow(10, a4)), l4 = a4 < 0 ? Math.pow(10, Math.abs(a4)) : 1;
      do
        s5.push({ value: o5, major: Jo(o5) }), ++r4, r4 === 10 && (r4 = 1, ++a4, l4 = a4 >= 0 ? 1 : l4), o5 = Math.round(r4 * Math.pow(10, a4) * l4) / l4;
      while (a4 < e4 || a4 === e4 && r4 < n5);
      let c2 = U(i4.max, o5);
      return s5.push({ value: c2, major: Jo(o5) }), s5;
    }
    var bi = class extends bt {
      constructor(t3) {
        super(t3);
        this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
      }
      parse(t3, e4) {
        let n5 = be.prototype.parse.apply(this, [t3, e4]);
        if (n5 === 0) {
          this._zero = true;
          return;
        }
        return B(n5) && n5 > 0 ? n5 : null;
      }
      determineDataLimits() {
        let t3 = this, { min: e4, max: n5 } = t3.getMinMax(true);
        t3.min = B(e4) ? Math.max(0, e4) : null, t3.max = B(n5) ? Math.max(0, n5) : null, t3.options.beginAtZero && (t3._zero = true), t3.handleTickRangeOptions();
      }
      handleTickRangeOptions() {
        let t3 = this, { minDefined: e4, maxDefined: n5 } = t3.getUserBounds(), s5 = t3.min, o5 = t3.max, a4 = (c2) => s5 = e4 ? s5 : c2, r4 = (c2) => o5 = n5 ? o5 : c2, l4 = (c2, d2) => Math.pow(10, Math.floor(Y(c2)) + d2);
        s5 === o5 && (s5 <= 0 ? (a4(1), r4(10)) : (a4(l4(s5, -1)), r4(l4(o5, 1)))), s5 <= 0 && a4(l4(o5, -1)), o5 <= 0 && r4(l4(s5, 1)), t3._zero && t3.min !== t3._suggestedMin && s5 === l4(t3.min, 0) && a4(l4(s5, -1)), t3.min = s5, t3.max = o5;
      }
      buildTicks() {
        let t3 = this, e4 = t3.options, n5 = { min: t3._userMin, max: t3._userMax }, s5 = fc(n5, t3);
        return e4.bounds === "ticks" && In(s5, t3, "value"), e4.reverse ? (s5.reverse(), t3.start = t3.max, t3.end = t3.min) : (t3.start = t3.min, t3.end = t3.max), s5;
      }
      getLabelForValue(t3) {
        return t3 === void 0 ? "0" : re(t3, this.chart.options.locale);
      }
      configure() {
        let t3 = this, e4 = t3.min;
        super.configure(), t3._startValue = Y(e4), t3._valueRange = Y(t3.max) - Y(e4);
      }
      getPixelForValue(t3) {
        let e4 = this;
        return (t3 === void 0 || t3 === 0) && (t3 = e4.min), t3 === null || isNaN(t3) ? NaN : e4.getPixelForDecimal(t3 === e4.min ? 0 : (Y(t3) - e4._startValue) / e4._valueRange);
      }
      getValueForPixel(t3) {
        let e4 = this, n5 = e4.getDecimalForPixel(t3);
        return Math.pow(10, e4._startValue + n5 * e4._valueRange);
      }
    };
    bi.id = "logarithmic";
    bi.defaults = { ticks: { callback: on.formatters.logarithmic, major: { enabled: true } } };
    function xi(i4) {
      let t3 = i4.ticks;
      if (t3.display && i4.display) {
        let e4 = G(t3.backdropPadding);
        return C2(t3.font && t3.font.size, k2.font.size) + e4.height;
      }
      return 0;
    }
    function gc(i4, t3, e4) {
      return T2(e4) ? { w: ys(i4, i4.font, e4), h: e4.length * t3 } : { w: i4.measureText(e4).width, h: t3 };
    }
    function Qo(i4, t3, e4, n5, s5) {
      return i4 === n5 || i4 === s5 ? { start: t3 - e4 / 2, end: t3 + e4 / 2 } : i4 < n5 || i4 > s5 ? { start: t3 - e4, end: t3 } : { start: t3, end: t3 + e4 };
    }
    function pc(i4) {
      let t3 = { l: 0, r: i4.width, t: 0, b: i4.height - i4.paddingTop }, e4 = {}, n5, s5, o5, a4 = [], r4 = [], l4 = i4.getLabels().length;
      for (n5 = 0; n5 < l4; n5++) {
        let u3 = i4.options.pointLabels.setContext(i4.getContext(n5));
        r4[n5] = u3.padding, o5 = i4.getPointPosition(n5, i4.drawingArea + r4[n5]);
        let f2 = N2(u3.font);
        i4.ctx.font = f2.string, s5 = gc(i4.ctx, f2.lineHeight, i4._pointLabels[n5]), a4[n5] = s5;
        let g2 = i4.getIndexAngle(n5), p2 = Te(g2), m2 = Qo(p2, o5.x, s5.w, 0, 180), b2 = Qo(p2, o5.y, s5.h, 90, 270);
        m2.start < t3.l && (t3.l = m2.start, e4.l = g2), m2.end > t3.r && (t3.r = m2.end, e4.r = g2), b2.start < t3.t && (t3.t = b2.start, e4.t = g2), b2.end > t3.b && (t3.b = b2.end, e4.b = g2);
      }
      i4._setReductions(i4.drawingArea, t3, e4), i4._pointLabelItems = [];
      let c2 = i4.options, d2 = xi(c2), h4 = i4.getDistanceFromCenterForValue(c2.ticks.reverse ? i4.min : i4.max);
      for (n5 = 0; n5 < l4; n5++) {
        let u3 = n5 === 0 ? d2 / 2 : 0, f2 = i4.getPointPosition(n5, h4 + u3 + r4[n5]), g2 = Te(i4.getIndexAngle(n5)), p2 = a4[n5];
        bc(g2, p2, f2);
        let m2 = mc(g2), b2;
        m2 === "left" ? b2 = f2.x : m2 === "center" ? b2 = f2.x - p2.w / 2 : b2 = f2.x - p2.w;
        let _2 = b2 + p2.w;
        i4._pointLabelItems[n5] = { x: f2.x, y: f2.y, textAlign: m2, left: b2, top: f2.y, right: _2, bottom: f2.y + p2.h };
      }
    }
    function mc(i4) {
      return i4 === 0 || i4 === 180 ? "center" : i4 < 180 ? "left" : "right";
    }
    function bc(i4, t3, e4) {
      i4 === 90 || i4 === 270 ? e4.y -= t3.h / 2 : (i4 > 270 || i4 < 90) && (e4.y -= t3.h);
    }
    function xc(i4, t3) {
      let { ctx: e4, options: { pointLabels: n5 } } = i4;
      for (let s5 = t3 - 1; s5 >= 0; s5--) {
        let o5 = n5.setContext(i4.getContext(s5)), a4 = N2(o5.font), { x: r4, y: l4, textAlign: c2, left: d2, top: h4, right: u3, bottom: f2 } = i4._pointLabelItems[s5], { backdropColor: g2 } = o5;
        if (!P2(g2)) {
          let p2 = G(o5.backdropPadding);
          e4.fillStyle = g2, e4.fillRect(d2 - p2.left, h4 - p2.top, u3 - d2 + p2.width, f2 - h4 + p2.height);
        }
        se(e4, i4._pointLabels[s5], r4, l4 + a4.lineHeight / 2, a4, { color: o5.color, textAlign: c2, textBaseline: "middle" });
      }
    }
    function ta(i4, t3, e4, n5) {
      let { ctx: s5 } = i4;
      if (e4)
        s5.arc(i4.xCenter, i4.yCenter, t3, 0, A2);
      else {
        let o5 = i4.getPointPosition(0, t3);
        s5.moveTo(o5.x, o5.y);
        for (let a4 = 1; a4 < n5; a4++)
          o5 = i4.getPointPosition(a4, t3), s5.lineTo(o5.x, o5.y);
      }
    }
    function _c(i4, t3, e4, n5) {
      let s5 = i4.ctx, o5 = t3.circular, { color: a4, lineWidth: r4 } = t3;
      !o5 && !n5 || !a4 || !r4 || e4 < 0 || (s5.save(), s5.strokeStyle = a4, s5.lineWidth = r4, s5.setLineDash(t3.borderDash), s5.lineDashOffset = t3.borderDashOffset, s5.beginPath(), ta(i4, e4, o5, n5), s5.closePath(), s5.stroke(), s5.restore());
    }
    function fn(i4) {
      return Mt(i4) ? i4 : 0;
    }
    var _e = class extends be {
      constructor(t3) {
        super(t3);
        this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
      }
      setDimensions() {
        let t3 = this;
        t3.width = t3.maxWidth, t3.height = t3.maxHeight, t3.paddingTop = xi(t3.options) / 2, t3.xCenter = Math.floor(t3.width / 2), t3.yCenter = Math.floor((t3.height - t3.paddingTop) / 2), t3.drawingArea = Math.min(t3.height - t3.paddingTop, t3.width) / 2;
      }
      determineDataLimits() {
        let t3 = this, { min: e4, max: n5 } = t3.getMinMax(false);
        t3.min = B(e4) && !isNaN(e4) ? e4 : 0, t3.max = B(n5) && !isNaN(n5) ? n5 : 0, t3.handleTickRangeOptions();
      }
      computeTickLimit() {
        return Math.ceil(this.drawingArea / xi(this.options));
      }
      generateTickLabels(t3) {
        let e4 = this;
        be.prototype.generateTickLabels.call(e4, t3), e4._pointLabels = e4.getLabels().map((n5, s5) => {
          let o5 = R2(e4.options.pointLabels.callback, [n5, s5], e4);
          return o5 || o5 === 0 ? o5 : "";
        });
      }
      fit() {
        let t3 = this, e4 = t3.options;
        e4.display && e4.pointLabels.display ? pc(t3) : t3.setCenterPoint(0, 0, 0, 0);
      }
      _setReductions(t3, e4, n5) {
        let s5 = this, o5 = e4.l / Math.sin(n5.l), a4 = Math.max(e4.r - s5.width, 0) / Math.sin(n5.r), r4 = -e4.t / Math.cos(n5.t), l4 = -Math.max(e4.b - (s5.height - s5.paddingTop), 0) / Math.cos(n5.b);
        o5 = fn(o5), a4 = fn(a4), r4 = fn(r4), l4 = fn(l4), s5.drawingArea = Math.max(t3 / 2, Math.min(Math.floor(t3 - (o5 + a4) / 2), Math.floor(t3 - (r4 + l4) / 2))), s5.setCenterPoint(o5, a4, r4, l4);
      }
      setCenterPoint(t3, e4, n5, s5) {
        let o5 = this, a4 = o5.width - e4 - o5.drawingArea, r4 = t3 + o5.drawingArea, l4 = n5 + o5.drawingArea, c2 = o5.height - o5.paddingTop - s5 - o5.drawingArea;
        o5.xCenter = Math.floor((r4 + a4) / 2 + o5.left), o5.yCenter = Math.floor((l4 + c2) / 2 + o5.top + o5.paddingTop);
      }
      getIndexAngle(t3) {
        let e4 = A2 / this.getLabels().length, n5 = this.options.startAngle || 0;
        return tt(t3 * e4 + Q(n5));
      }
      getDistanceFromCenterForValue(t3) {
        let e4 = this;
        if (P2(t3))
          return NaN;
        let n5 = e4.drawingArea / (e4.max - e4.min);
        return e4.options.reverse ? (e4.max - t3) * n5 : (t3 - e4.min) * n5;
      }
      getValueForDistanceFromCenter(t3) {
        if (P2(t3))
          return NaN;
        let e4 = this, n5 = t3 / (e4.drawingArea / (e4.max - e4.min));
        return e4.options.reverse ? e4.max - n5 : e4.min + n5;
      }
      getPointPosition(t3, e4) {
        let n5 = this, s5 = n5.getIndexAngle(t3) - L2;
        return { x: Math.cos(s5) * e4 + n5.xCenter, y: Math.sin(s5) * e4 + n5.yCenter, angle: s5 };
      }
      getPointPositionForValue(t3, e4) {
        return this.getPointPosition(t3, this.getDistanceFromCenterForValue(e4));
      }
      getBasePosition(t3) {
        return this.getPointPositionForValue(t3 || 0, this.getBaseValue());
      }
      getPointLabelPosition(t3) {
        let { left: e4, top: n5, right: s5, bottom: o5 } = this._pointLabelItems[t3];
        return { left: e4, top: n5, right: s5, bottom: o5 };
      }
      drawBackground() {
        let t3 = this, { backgroundColor: e4, grid: { circular: n5 } } = t3.options;
        if (e4) {
          let s5 = t3.ctx;
          s5.save(), s5.beginPath(), ta(t3, t3.getDistanceFromCenterForValue(t3._endValue), n5, t3.getLabels().length), s5.closePath(), s5.fillStyle = e4, s5.fill(), s5.restore();
        }
      }
      drawGrid() {
        let t3 = this, e4 = t3.ctx, n5 = t3.options, { angleLines: s5, grid: o5 } = n5, a4 = t3.getLabels().length, r4, l4, c2;
        if (n5.pointLabels.display && xc(t3, a4), o5.display && t3.ticks.forEach((d2, h4) => {
          if (h4 !== 0) {
            l4 = t3.getDistanceFromCenterForValue(d2.value);
            let u3 = o5.setContext(t3.getContext(h4 - 1));
            _c(t3, u3, l4, a4);
          }
        }), s5.display) {
          for (e4.save(), r4 = t3.getLabels().length - 1; r4 >= 0; r4--) {
            let d2 = s5.setContext(t3.getContext(r4)), { color: h4, lineWidth: u3 } = d2;
            !u3 || !h4 || (e4.lineWidth = u3, e4.strokeStyle = h4, e4.setLineDash(d2.borderDash), e4.lineDashOffset = d2.borderDashOffset, l4 = t3.getDistanceFromCenterForValue(n5.ticks.reverse ? t3.min : t3.max), c2 = t3.getPointPosition(r4, l4), e4.beginPath(), e4.moveTo(t3.xCenter, t3.yCenter), e4.lineTo(c2.x, c2.y), e4.stroke());
          }
          e4.restore();
        }
      }
      drawBorder() {
      }
      drawLabels() {
        let t3 = this, e4 = t3.ctx, n5 = t3.options, s5 = n5.ticks;
        if (!s5.display)
          return;
        let o5 = t3.getIndexAngle(0), a4, r4;
        e4.save(), e4.translate(t3.xCenter, t3.yCenter), e4.rotate(o5), e4.textAlign = "center", e4.textBaseline = "middle", t3.ticks.forEach((l4, c2) => {
          if (c2 === 0 && !n5.reverse)
            return;
          let d2 = s5.setContext(t3.getContext(c2)), h4 = N2(d2.font);
          if (a4 = t3.getDistanceFromCenterForValue(t3.ticks[c2].value), d2.showLabelBackdrop) {
            r4 = e4.measureText(l4.label).width, e4.fillStyle = d2.backdropColor;
            let u3 = G(d2.backdropPadding);
            e4.fillRect(-r4 / 2 - u3.left, -a4 - h4.size / 2 - u3.top, r4 + u3.width, h4.size + u3.height);
          }
          se(e4, l4.label, 0, -a4, h4, { color: d2.color });
        }), e4.restore();
      }
      drawTitle() {
      }
    };
    _e.id = "radialLinear";
    _e.defaults = { display: true, animate: true, position: "chartArea", angleLines: { display: true, lineWidth: 1, borderDash: [], borderDashOffset: 0 }, grid: { circular: false }, startAngle: 0, ticks: { showLabelBackdrop: true, callback: on.formatters.numeric }, pointLabels: { backdropColor: void 0, backdropPadding: 2, display: true, font: { size: 10 }, callback(i4) {
      return i4;
    }, padding: 5 } };
    _e.defaultRoutes = { "angleLines.color": "borderColor", "pointLabels.color": "color", "ticks.color": "color" };
    _e.descriptors = { angleLines: { _fallback: "grid" } };
    var gn = { millisecond: { common: true, size: 1, steps: 1e3 }, second: { common: true, size: 1e3, steps: 60 }, minute: { common: true, size: 6e4, steps: 60 }, hour: { common: true, size: 36e5, steps: 24 }, day: { common: true, size: 864e5, steps: 30 }, week: { common: false, size: 6048e5, steps: 4 }, month: { common: true, size: 2628e6, steps: 12 }, quarter: { common: false, size: 7884e6, steps: 4 }, year: { common: true, size: 3154e7 } }, j = Object.keys(gn);
    function yc(i4, t3) {
      return i4 - t3;
    }
    function ea(i4, t3) {
      if (P2(t3))
        return null;
      let e4 = i4._adapter, { parser: n5, round: s5, isoWeekday: o5 } = i4._parseOpts, a4 = t3;
      return typeof n5 == "function" && (a4 = n5(a4)), B(a4) || (a4 = typeof n5 == "string" ? e4.parse(a4, n5) : e4.parse(a4)), a4 === null ? null : (s5 && (a4 = s5 === "week" && (Mt(o5) || o5 === true) ? e4.startOf(a4, "isoWeek", o5) : e4.startOf(a4, s5)), +a4);
    }
    function na(i4, t3, e4, n5) {
      let s5 = j.length;
      for (let o5 = j.indexOf(i4); o5 < s5 - 1; ++o5) {
        let a4 = gn[j[o5]], r4 = a4.steps ? a4.steps : Number.MAX_SAFE_INTEGER;
        if (a4.common && Math.ceil((e4 - t3) / (r4 * a4.size)) <= n5)
          return j[o5];
      }
      return j[s5 - 1];
    }
    function vc(i4, t3, e4, n5, s5) {
      for (let o5 = j.length - 1; o5 >= j.indexOf(e4); o5--) {
        let a4 = j[o5];
        if (gn[a4].common && i4._adapter.diff(s5, n5, a4) >= t3 - 1)
          return a4;
      }
      return j[e4 ? j.indexOf(e4) : 0];
    }
    function wc(i4) {
      for (let t3 = j.indexOf(i4) + 1, e4 = j.length; t3 < e4; ++t3)
        if (gn[j[t3]].common)
          return j[t3];
    }
    function ia(i4, t3, e4) {
      if (!e4)
        i4[t3] = true;
      else if (e4.length) {
        let { lo: n5, hi: s5 } = ae(e4, t3), o5 = e4[n5] >= t3 ? e4[n5] : e4[s5];
        i4[o5] = true;
      }
    }
    function Sc(i4, t3, e4, n5) {
      let s5 = i4._adapter, o5 = +s5.startOf(t3[0].value, n5), a4 = t3[t3.length - 1].value, r4, l4;
      for (r4 = o5; r4 <= a4; r4 = +s5.add(r4, 1, n5))
        l4 = e4[r4], l4 >= 0 && (t3[l4].major = true);
      return t3;
    }
    function sa(i4, t3, e4) {
      let n5 = [], s5 = {}, o5 = t3.length, a4, r4;
      for (a4 = 0; a4 < o5; ++a4)
        r4 = t3[a4], s5[r4] = a4, n5.push({ value: r4, major: false });
      return o5 === 0 || !e4 ? n5 : Sc(i4, n5, s5, e4);
    }
    var ye = class extends bt {
      constructor(t3) {
        super(t3);
        this._cache = { data: [], labels: [], all: [] }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = false, this._parseOpts = void 0;
      }
      init(t3, e4) {
        let n5 = t3.time || (t3.time = {}), s5 = this._adapter = new Ir._date(t3.adapters.date);
        It(n5.displayFormats, s5.formats()), this._parseOpts = { parser: n5.parser, round: n5.round, isoWeekday: n5.isoWeekday }, super.init(t3), this._normalized = e4.normalized;
      }
      parse(t3, e4) {
        return t3 === void 0 ? null : ea(this, t3);
      }
      beforeLayout() {
        super.beforeLayout(), this._cache = { data: [], labels: [], all: [] };
      }
      determineDataLimits() {
        let t3 = this, e4 = t3.options, n5 = t3._adapter, s5 = e4.time.unit || "day", { min: o5, max: a4, minDefined: r4, maxDefined: l4 } = t3.getUserBounds();
        function c2(d2) {
          !r4 && !isNaN(d2.min) && (o5 = Math.min(o5, d2.min)), !l4 && !isNaN(d2.max) && (a4 = Math.max(a4, d2.max));
        }
        (!r4 || !l4) && (c2(t3._getLabelBounds()), (e4.bounds !== "ticks" || e4.ticks.source !== "labels") && c2(t3.getMinMax(false))), o5 = B(o5) && !isNaN(o5) ? o5 : +n5.startOf(Date.now(), s5), a4 = B(a4) && !isNaN(a4) ? a4 : +n5.endOf(Date.now(), s5) + 1, t3.min = Math.min(o5, a4 - 1), t3.max = Math.max(o5 + 1, a4);
      }
      _getLabelBounds() {
        let t3 = this.getLabelTimestamps(), e4 = Number.POSITIVE_INFINITY, n5 = Number.NEGATIVE_INFINITY;
        return t3.length && (e4 = t3[0], n5 = t3[t3.length - 1]), { min: e4, max: n5 };
      }
      buildTicks() {
        let t3 = this, e4 = t3.options, n5 = e4.time, s5 = e4.ticks, o5 = s5.source === "labels" ? t3.getLabelTimestamps() : t3._generate();
        e4.bounds === "ticks" && o5.length && (t3.min = t3._userMin || o5[0], t3.max = t3._userMax || o5[o5.length - 1]);
        let a4 = t3.min, r4 = t3.max, l4 = ks(o5, a4, r4);
        return t3._unit = n5.unit || (s5.autoSkip ? na(n5.minUnit, t3.min, t3.max, t3._getLabelCapacity(a4)) : vc(t3, l4.length, n5.minUnit, t3.min, t3.max)), t3._majorUnit = !s5.major.enabled || t3._unit === "year" ? void 0 : wc(t3._unit), t3.initOffsets(o5), e4.reverse && l4.reverse(), sa(t3, l4, t3._majorUnit);
      }
      initOffsets(t3) {
        let e4 = this, n5 = 0, s5 = 0, o5, a4;
        e4.options.offset && t3.length && (o5 = e4.getDecimalForValue(t3[0]), t3.length === 1 ? n5 = 1 - o5 : n5 = (e4.getDecimalForValue(t3[1]) - o5) / 2, a4 = e4.getDecimalForValue(t3[t3.length - 1]), t3.length === 1 ? s5 = a4 : s5 = (a4 - e4.getDecimalForValue(t3[t3.length - 2])) / 2);
        let r4 = t3.length < 3 ? 0.5 : 0.25;
        n5 = X(n5, 0, r4), s5 = X(s5, 0, r4), e4._offsets = { start: n5, end: s5, factor: 1 / (n5 + 1 + s5) };
      }
      _generate() {
        let t3 = this, e4 = t3._adapter, n5 = t3.min, s5 = t3.max, o5 = t3.options, a4 = o5.time, r4 = a4.unit || na(a4.minUnit, n5, s5, t3._getLabelCapacity(n5)), l4 = C2(a4.stepSize, 1), c2 = r4 === "week" ? a4.isoWeekday : false, d2 = Mt(c2) || c2 === true, h4 = {}, u3 = n5, f2, g2;
        if (d2 && (u3 = +e4.startOf(u3, "isoWeek", c2)), u3 = +e4.startOf(u3, d2 ? "day" : r4), e4.diff(s5, n5, r4) > 1e5 * l4)
          throw new Error(n5 + " and " + s5 + " are too far apart with stepSize of " + l4 + " " + r4);
        let p2 = o5.ticks.source === "data" && t3.getDataTimestamps();
        for (f2 = u3, g2 = 0; f2 < s5; f2 = +e4.add(f2, l4, r4), g2++)
          ia(h4, f2, p2);
        return (f2 === s5 || o5.bounds === "ticks" || g2 === 1) && ia(h4, f2, p2), Object.keys(h4).sort((m2, b2) => m2 - b2).map((m2) => +m2);
      }
      getLabelForValue(t3) {
        let e4 = this, n5 = e4._adapter, s5 = e4.options.time;
        return s5.tooltipFormat ? n5.format(t3, s5.tooltipFormat) : n5.format(t3, s5.displayFormats.datetime);
      }
      _tickFormatFunction(t3, e4, n5, s5) {
        let o5 = this, a4 = o5.options, r4 = a4.time.displayFormats, l4 = o5._unit, c2 = o5._majorUnit, d2 = l4 && r4[l4], h4 = c2 && r4[c2], u3 = n5[e4], f2 = c2 && h4 && u3 && u3.major, g2 = o5._adapter.format(t3, s5 || (f2 ? h4 : d2)), p2 = a4.ticks.callback;
        return p2 ? R2(p2, [g2, e4, n5], o5) : g2;
      }
      generateTickLabels(t3) {
        let e4, n5, s5;
        for (e4 = 0, n5 = t3.length; e4 < n5; ++e4)
          s5 = t3[e4], s5.label = this._tickFormatFunction(s5.value, e4, t3);
      }
      getDecimalForValue(t3) {
        let e4 = this;
        return t3 === null ? NaN : (t3 - e4.min) / (e4.max - e4.min);
      }
      getPixelForValue(t3) {
        let e4 = this, n5 = e4._offsets, s5 = e4.getDecimalForValue(t3);
        return e4.getPixelForDecimal((n5.start + s5) * n5.factor);
      }
      getValueForPixel(t3) {
        let e4 = this, n5 = e4._offsets, s5 = e4.getDecimalForPixel(t3) / n5.factor - n5.end;
        return e4.min + s5 * (e4.max - e4.min);
      }
      _getLabelSize(t3) {
        let e4 = this, n5 = e4.options.ticks, s5 = e4.ctx.measureText(t3).width, o5 = Q(e4.isHorizontal() ? n5.maxRotation : n5.minRotation), a4 = Math.cos(o5), r4 = Math.sin(o5), l4 = e4._resolveTickFontOptions(0).size;
        return { w: s5 * a4 + l4 * r4, h: s5 * r4 + l4 * a4 };
      }
      _getLabelCapacity(t3) {
        let e4 = this, n5 = e4.options.time, s5 = n5.displayFormats, o5 = s5[n5.unit] || s5.millisecond, a4 = e4._tickFormatFunction(t3, 0, sa(e4, [t3], e4._majorUnit), o5), r4 = e4._getLabelSize(a4), l4 = Math.floor(e4.isHorizontal() ? e4.width / r4.w : e4.height / r4.h) - 1;
        return l4 > 0 ? l4 : 1;
      }
      getDataTimestamps() {
        let t3 = this, e4 = t3._cache.data || [], n5, s5;
        if (e4.length)
          return e4;
        let o5 = t3.getMatchingVisibleMetas();
        if (t3._normalized && o5.length)
          return t3._cache.data = o5[0].controller.getAllParsedValues(t3);
        for (n5 = 0, s5 = o5.length; n5 < s5; ++n5)
          e4 = e4.concat(o5[n5].controller.getAllParsedValues(t3));
        return t3._cache.data = t3.normalize(e4);
      }
      getLabelTimestamps() {
        let t3 = this, e4 = t3._cache.labels || [], n5, s5;
        if (e4.length)
          return e4;
        let o5 = t3.getLabels();
        for (n5 = 0, s5 = o5.length; n5 < s5; ++n5)
          e4.push(ea(t3, o5[n5]));
        return t3._cache.labels = t3._normalized ? e4 : t3.normalize(e4);
      }
      normalize(t3) {
        return Gn(t3.sort(yc));
      }
    };
    ye.id = "time";
    ye.defaults = { bounds: "data", adapters: {}, time: { parser: false, unit: false, round: false, isoWeekday: false, minUnit: "millisecond", displayFormats: {} }, ticks: { source: "auto", major: { enabled: false } } };
    function oa(i4, t3, e4) {
      let n5, s5, o5, a4;
      if (e4)
        n5 = Math.floor(t3), s5 = Math.ceil(t3), o5 = i4[n5], a4 = i4[s5];
      else {
        let l4 = ae(i4, t3);
        o5 = l4.lo, a4 = l4.hi, n5 = i4[o5], s5 = i4[a4];
      }
      let r4 = s5 - n5;
      return r4 ? o5 + (a4 - o5) * (t3 - n5) / r4 : o5;
    }
    var _i = class extends ye {
      constructor(t3) {
        super(t3);
        this._table = [], this._maxIndex = void 0;
      }
      initOffsets() {
        let t3 = this, e4 = t3._getTimestampsForTable();
        t3._table = t3.buildLookupTable(e4), t3._maxIndex = t3._table.length - 1, super.initOffsets(e4);
      }
      buildLookupTable(t3) {
        let e4 = this, { min: n5, max: s5 } = e4;
        if (!t3.length)
          return [{ time: n5, pos: 0 }, { time: s5, pos: 1 }];
        let o5 = [n5], a4, r4, l4;
        for (a4 = 0, r4 = t3.length; a4 < r4; ++a4)
          l4 = t3[a4], l4 > n5 && l4 < s5 && o5.push(l4);
        return o5.push(s5), o5;
      }
      _getTimestampsForTable() {
        let t3 = this, e4 = t3._cache.all || [];
        if (e4.length)
          return e4;
        let n5 = t3.getDataTimestamps(), s5 = t3.getLabelTimestamps();
        return n5.length && s5.length ? e4 = t3.normalize(n5.concat(s5)) : e4 = n5.length ? n5 : s5, e4 = t3._cache.all = e4, e4;
      }
      getPixelForValue(t3, e4) {
        let n5 = this, s5 = n5._offsets, o5 = n5._normalized && n5._maxIndex > 0 && !P2(e4) ? e4 / n5._maxIndex : n5.getDecimalForValue(t3);
        return n5.getPixelForDecimal((s5.start + o5) * s5.factor);
      }
      getDecimalForValue(t3) {
        return oa(this._table, t3) / this._maxIndex;
      }
      getValueForPixel(t3) {
        let e4 = this, n5 = e4._offsets, s5 = e4.getDecimalForPixel(t3) / n5.factor - n5.end;
        return oa(e4._table, s5 * this._maxIndex, true);
      }
    };
    _i.id = "timeseries";
    _i.defaults = ye.defaults;
    var aa = class extends wt {
      static get styles() {
        return wn``;
      }
      static get properties() {
        return { data: Array };
      }
      constructor() {
        super();
        nt.register(xe), nt.register($t), nt.register(Ct), nt.register(jt), nt.register(Ot);
      }
      firstUpdated() {
        this.chartOptions = { responsive: true, maintainAspectRatio: false, type: "line", data: [], options: { scales: { x: { display: true, type: "linear", position: "bottom", axis: "x", min: 0, max: 1 }, y: { display: true, type: "linear", position: "left", axis: "y", min: 0, max: 1 } } }, plugins: { legend: { display: false }, Filler: false } }, this.chart = new nt(this.shadowRoot.querySelector("#chart"), this.chartOptions);
      }
      updated(t3) {
        t3.has("data") && this._updateData();
      }
      async _updateData() {
        let t3 = [{ type: "line", backgroundColor: "white", borderColor: "red", data: this.data, showLine: true, yAxisID: "y" }], e4 = this.data.map((l4) => l4.x), n5 = this.data.map((l4) => l4.y), s5 = Math.min(...e4), o5 = Math.max(...e4), a4 = Math.min(...n5), r4 = Math.max(...n5);
        this.chart.data = { datasets: t3 }, this.chart.options.scales.x.min = s5, this.chart.options.scales.x.max = o5, this.chart.options.scales.y.min = a4, this.chart.options.scales.y.max = r4, this.chart.update();
      }
      render() {
        return Bi`<canvas id="chart"></canvas>`;
      }
    };
    customElements.define("challenge-chart", aa);
  })();

  // ChallengeDataService.js
  var ChallengeDataColumn = class {
    constructor(name, values) {
      this._name = name;
      this._values = values;
    }
    get name() {
      return this._name;
    }
    get values() {
      return this._values;
    }
  };
  var ChallengeDataSet = class {
    constructor(name, xColumn, yColumn) {
      this._name = name;
      this._xColumn = xColumn;
      this._yColumn = yColumn;
    }
    get name() {
      return this._name;
    }
    get xColumn() {
      return this._xColumn;
    }
    get yColumn() {
      return this._yColumn;
    }
  };
  var delay = async (ms) => {
    return new Promise((accept) => {
      setTimeout(accept, ms);
    });
  };
  var ChallengeDataService = class {
    constructor() {
      this._streamTimeout = 0;
    }
    async getDataSet(which) {
      let count = 0;
      if (which === "small") {
        count = 10;
      } else if (which === "medium") {
        count = 100;
      } else if (which === "large") {
        count = 1e3;
      } else {
        throw new Error("Invalid argument passed to getDataSet");
      }
      let x2 = 0;
      const xValues = [];
      const yValues = [];
      for (let i4 = 0; i4 < count; ++i4) {
        xValues.push(x2);
        yValues.push(Math.sin(x2));
        x2 += 2 * Math.PI / count;
      }
      const xColumn = new ChallengeDataColumn("x", xValues);
      const yColumn = new ChallengeDataColumn("y", yValues);
      await delay(Math.random() * 500);
      return new ChallengeDataSet(`DataSet-${which}`, xColumn, yColumn);
    }
    startStreaming(rate, callback) {
      const delayMS = 1e3 / rate;
      const deltaX = 2 * Math.PI / 100;
      let x2 = 0;
      const getNextSample = () => {
        const y2 = Math.sin(x2);
        callback(x2, y2);
        x2 += deltaX;
        this._streamTimeout = setTimeout(getNextSample, delayMS);
      };
      this.stopStreaming();
      this._streamTimeout = setTimeout(getNextSample, 1e3);
    }
    stopStreaming() {
      if (this._streamTimeout) {
        clearTimeout(this._streamTimeout);
        this._streamTimeout = 0;
      }
    }
  };

  // challenge-table.js
  var ChallengeTable = class extends h3 {
    static get properties() {
      return {
        dataSetName: { type: String },
        columnLabels: { type: Array },
        data: { type: Array }
      };
    }
    static get styles() {
      return i`
    * {
      font-size: 100%;
    }
    table,
      td {
        border: 1px solid #333;
      }

      thead,
      tfoot {
        background-color: #333;
        color: #fff;
      }
  `;
    }
    render() {
      return T`
    <table>
        <thead>
            <tr>
                <th colspan="2">${this.dataSetName}</th>
            </tr>
            <tr>
                ${this.columnLabels.map((label) => T`
                <th>${label}</th>
                `)}
            </tr>
        </thead>
        <tbody>
            ${this.data.map((row) => T`
            <tr>
                <td>
                    ${row.x}
                </td>
                <td>
                    ${row.y}
                </td>
            </tr>
            `)}
        </tbody>
    </table>
  `;
    }
  };
  customElements.define("challenge-table", ChallengeTable);

  // challenge-app.js
  var ChallengeApp = class extends h3 {
    static get styles() {
      return i`
      * {
        font-size: 100%;
      }

      .dropdown {
        display: flex;
        justify-content: center;
        margin: 4px 0px;
      }

      .challenge {
        display: flex;
        justify-content: space-between;
      }

      challenge-chart {
        width: 85%;
      }
      
  `;
    }
    static get properties() {
      return {
        columnLabels: { type: Array },
        data: { type: Array },
        currentDataSet: { type: Object }
      };
    }
    constructor() {
      super();
      this.columnLabels = [];
      this.challengeDataService = new ChallengeDataService();
      this.loadDataSet();
    }
    async loadDataSet(e4) {
      const size = e4?.target.value ?? "small";
      this.currentDataSet = await this.challengeDataService.getDataSet(size);
      this.columnLabels = [this.currentDataSet.xColumn.name, this.currentDataSet.yColumn.name];
      const xvalues = this.currentDataSet.xColumn.values;
      const yvalues = this.currentDataSet.yColumn.values;
      const valueslength = Math.max(xvalues.length, yvalues.length);
      this.data = [];
      for (let i4 = 0; i4 < valueslength; ++i4) {
        this.data.push({ x: xvalues[i4], y: yvalues[i4] });
      }
      this.requestUpdate();
    }
    render() {
      return T`
    <div class="dropdown"><select @change="${this.loadDataSet}">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
        </select></div>
    <div class="challenge">
        <challenge-chart .data=${this.data}></challenge-chart>
        <challenge-table .dataSetName="${this.currentDataSet.name}" .data="${this.data}"
            .columnLabels="${this.columnLabels}">
        </challenge-table>
    </div>
    `;
    }
  };
  window.customElements.define("challenge-app", ChallengeApp);
})();
/*!
 * @kurkle/color v0.1.9
 * https://github.com/kurkle/color#readme
 * (c) 2020 Jukka Kurkela
 * Released under the MIT License
 */
/*!
 * Chart.js v3.2.1
 * https://www.chartjs.org
 * (c) 2021 Chart.js Contributors
 * Released under the MIT License
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
//# sourceMappingURL=challenge-app.js.map
