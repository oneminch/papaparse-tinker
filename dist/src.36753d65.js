parcelRequire = (function (e, r, t, n) {
	var i,
		o = "function" == typeof parcelRequire && parcelRequire,
		u = "function" == typeof require && require;
	function f(t, n) {
		if (!r[t]) {
			if (!e[t]) {
				var i = "function" == typeof parcelRequire && parcelRequire;
				if (!n && i) return i(t, !0);
				if (o) return o(t, !0);
				if (u && "string" == typeof t) return u(t);
				var c = new Error("Cannot find module '" + t + "'");
				throw ((c.code = "MODULE_NOT_FOUND"), c);
			}
			(p.resolve = function (r) {
				return e[t][1][r] || r;
			}),
				(p.cache = {});
			var l = (r[t] = new f.Module(t));
			e[t][0].call(l.exports, p, l, l.exports, this);
		}
		return r[t].exports;
		function p(e) {
			return f(p.resolve(e));
		}
	}
	(f.isParcelRequire = !0),
		(f.Module = function (e) {
			(this.id = e), (this.bundle = f), (this.exports = {});
		}),
		(f.modules = e),
		(f.cache = r),
		(f.parent = o),
		(f.register = function (r, t) {
			e[r] = [
				function (e, r) {
					r.exports = t;
				},
				{},
			];
		});
	for (var c = 0; c < t.length; c++)
		try {
			f(t[c]);
		} catch (e) {
			i || (i = e);
		}
	if (t.length) {
		var l = f(t[t.length - 1]);
		"object" == typeof exports && "undefined" != typeof module
			? (module.exports = l)
			: "function" == typeof define && define.amd
			? define(function () {
					return l;
			  })
			: n && (this[n] = l);
	}
	if (((parcelRequire = f), i)) throw i;
	return f;
})(
	{
		fIlN: [
			function (require, module, exports) {
				var define;
				var e;
				!(function (t, i) {
					"function" == typeof e && e.amd
						? e([], i)
						: "object" == typeof module && "undefined" != typeof exports
						? (module.exports = i())
						: (t.Papa = i());
				})(this, function e() {
					"use strict";
					var t =
							"undefined" != typeof self
								? self
								: "undefined" != typeof window
								? window
								: void 0 !== t
								? t
								: {},
						i = !t.document && !!t.postMessage,
						r = i && /blob:/i.test((t.location || {}).protocol),
						n = {},
						s = 0,
						a = {
							parse: function (i, r) {
								var o = (r = r || {}).dynamicTyping || !1;
								if (
									(b(o) && ((r.dynamicTypingFunction = o), (o = {})),
									(r.dynamicTyping = o),
									(r.transform = !!b(r.transform) && r.transform),
									r.worker && a.WORKERS_SUPPORTED)
								) {
									var h = (function () {
										if (!a.WORKERS_SUPPORTED) return !1;
										var i,
											r,
											o =
												((i = t.URL || t.webkitURL || null),
												(r = e.toString()),
												a.BLOB_URL ||
													(a.BLOB_URL = i.createObjectURL(
														new Blob(["(", r, ")();"], {
															type: "text/javascript",
														})
													))),
											h = new t.Worker(o);
										return (
											(h.onmessage = _), (h.id = s++), (n[h.id] = h)
										);
									})();
									return (
										(h.userStep = r.step),
										(h.userChunk = r.chunk),
										(h.userComplete = r.complete),
										(h.userError = r.error),
										(r.step = b(r.step)),
										(r.chunk = b(r.chunk)),
										(r.complete = b(r.complete)),
										(r.error = b(r.error)),
										delete r.worker,
										void h.postMessage({
											input: i,
											config: r,
											workerId: h.id,
										})
									);
								}
								var c = null;
								return (
									a.NODE_STREAM_INPUT,
									"string" == typeof i
										? (c = r.download ? new u(r) : new d(r))
										: !0 === i.readable && b(i.read) && b(i.on)
										? (c = new l(r))
										: ((t.File && i instanceof File) ||
												i instanceof Object) &&
										  (c = new f(r)),
									c.stream(i)
								);
							},
							unparse: function (e, t) {
								var i = !1,
									r = !0,
									n = ",",
									s = "\r\n",
									o = '"',
									h = o + o,
									u = !1,
									f = null;
								!(function () {
									if ("object" == typeof t) {
										if (
											("string" != typeof t.delimiter ||
												a.BAD_DELIMITERS.filter(function (e) {
													return -1 !== t.delimiter.indexOf(e);
												}).length ||
												(n = t.delimiter),
											("boolean" == typeof t.quotes ||
												"function" == typeof t.quotes ||
												Array.isArray(t.quotes)) &&
												(i = t.quotes),
											("boolean" != typeof t.skipEmptyLines &&
												"string" != typeof t.skipEmptyLines) ||
												(u = t.skipEmptyLines),
											"string" == typeof t.newline &&
												(s = t.newline),
											"string" == typeof t.quoteChar &&
												(o = t.quoteChar),
											"boolean" == typeof t.header && (r = t.header),
											Array.isArray(t.columns))
										) {
											if (0 === t.columns.length)
												throw new Error("Option columns is empty");
											f = t.columns;
										}
										void 0 !== t.escapeChar && (h = t.escapeChar + o);
									}
								})();
								var d = new RegExp(p(o), "g");
								if (
									("string" == typeof e && (e = JSON.parse(e)),
									Array.isArray(e))
								) {
									if (!e.length || Array.isArray(e[0]))
										return c(null, e, u);
									if ("object" == typeof e[0])
										return c(f || l(e[0]), e, u);
								} else if ("object" == typeof e)
									return (
										"string" == typeof e.data &&
											(e.data = JSON.parse(e.data)),
										Array.isArray(e.data) &&
											(e.fields ||
												(e.fields = e.meta && e.meta.fields),
											e.fields ||
												(e.fields = Array.isArray(e.data[0])
													? e.fields
													: l(e.data[0])),
											Array.isArray(e.data[0]) ||
												"object" == typeof e.data[0] ||
												(e.data = [e.data])),
										c(e.fields || [], e.data || [], u)
									);
								throw new Error(
									"Unable to serialize unrecognized input"
								);
								function l(e) {
									if ("object" != typeof e) return [];
									var t = [];
									for (var i in e) t.push(i);
									return t;
								}
								function c(e, t, i) {
									var a = "";
									"string" == typeof e && (e = JSON.parse(e)),
										"string" == typeof t && (t = JSON.parse(t));
									var o = Array.isArray(e) && 0 < e.length,
										h = !Array.isArray(t[0]);
									if (o && r) {
										for (var u = 0; u < e.length; u++)
											0 < u && (a += n), (a += g(e[u], u));
										0 < t.length && (a += s);
									}
									for (var f = 0; f < t.length; f++) {
										var d = o ? e.length : t[f].length,
											l = !1,
											c = o
												? 0 === Object.keys(t[f]).length
												: 0 === t[f].length;
										if (
											(i &&
												!o &&
												(l =
													"greedy" === i
														? "" === t[f].join("").trim()
														: 1 === t[f].length &&
														  0 === t[f][0].length),
											"greedy" === i && o)
										) {
											for (var p = [], _ = 0; _ < d; _++) {
												var m = h ? e[_] : _;
												p.push(t[f][m]);
											}
											l = "" === p.join("").trim();
										}
										if (!l) {
											for (var v = 0; v < d; v++) {
												0 < v && !c && (a += n);
												var y = o && h ? e[v] : v;
												a += g(t[f][y], v);
											}
											f < t.length - 1 &&
												(!i || (0 < d && !c)) &&
												(a += s);
										}
									}
									return a;
								}
								function g(e, t) {
									if (null == e) return "";
									if (e.constructor === Date)
										return JSON.stringify(e).slice(1, 25);
									var r = e.toString().replace(d, h);
									return ("boolean" == typeof i && i) ||
										("function" == typeof i && i(e, t)) ||
										(Array.isArray(i) && i[t]) ||
										(function (e, t) {
											for (var i = 0; i < t.length; i++)
												if (-1 < e.indexOf(t[i])) return !0;
											return !1;
										})(r, a.BAD_DELIMITERS) ||
										-1 < r.indexOf(n) ||
										" " === r.charAt(0) ||
										" " === r.charAt(r.length - 1)
										? o + r + o
										: r;
								}
							},
						};
					if (
						((a.RECORD_SEP = String.fromCharCode(30)),
						(a.UNIT_SEP = String.fromCharCode(31)),
						(a.BYTE_ORDER_MARK = "\ufeff"),
						(a.BAD_DELIMITERS = ["\r", "\n", '"', a.BYTE_ORDER_MARK]),
						(a.WORKERS_SUPPORTED = !i && !!t.Worker),
						(a.NODE_STREAM_INPUT = 1),
						(a.LocalChunkSize = 10485760),
						(a.RemoteChunkSize = 5242880),
						(a.DefaultDelimiter = ","),
						(a.Parser = g),
						(a.ParserHandle = c),
						(a.NetworkStreamer = u),
						(a.FileStreamer = f),
						(a.StringStreamer = d),
						(a.ReadableStreamStreamer = l),
						t.jQuery)
					) {
						var o = t.jQuery;
						o.fn.parse = function (e) {
							var i = e.config || {},
								r = [];
							return (
								this.each(function (e) {
									if (
										"INPUT" !==
											o(this).prop("tagName").toUpperCase() ||
										"file" !== o(this).attr("type").toLowerCase() ||
										!t.FileReader ||
										!this.files ||
										0 === this.files.length
									)
										return !0;
									for (var n = 0; n < this.files.length; n++)
										r.push({
											file: this.files[n],
											inputElem: this,
											instanceConfig: o.extend({}, i),
										});
								}),
								n(),
								this
							);
							function n() {
								if (0 !== r.length) {
									var t,
										i,
										n,
										h = r[0];
									if (b(e.before)) {
										var u = e.before(h.file, h.inputElem);
										if ("object" == typeof u) {
											if ("abort" === u.action)
												return (
													"AbortError",
													(t = h.file),
													(i = h.inputElem),
													(n = u.reason),
													void (
														b(e.error) &&
														e.error(
															{ name: "AbortError" },
															t,
															i,
															n
														)
													)
												);
											if ("skip" === u.action) return void s();
											"object" == typeof u.config &&
												(h.instanceConfig = o.extend(
													h.instanceConfig,
													u.config
												));
										} else if ("skip" === u) return void s();
									}
									var f = h.instanceConfig.complete;
									(h.instanceConfig.complete = function (e) {
										b(f) && f(e, h.file, h.inputElem), s();
									}),
										a.parse(h.file, h.instanceConfig);
								} else b(e.complete) && e.complete();
							}
							function s() {
								r.splice(0, 1), n();
							}
						};
					}
					function h(e) {
						(this._handle = null),
							(this._finished = !1),
							(this._completed = !1),
							(this._halted = !1),
							(this._input = null),
							(this._baseIndex = 0),
							(this._partialLine = ""),
							(this._rowCount = 0),
							(this._start = 0),
							(this._nextChunk = null),
							(this.isFirstChunk = !0),
							(this._completeResults = {
								data: [],
								errors: [],
								meta: {},
							}),
							function (e) {
								var t = y(e);
								(t.chunkSize = parseInt(t.chunkSize)),
									e.step || e.chunk || (t.chunkSize = null),
									(this._handle = new c(t)),
									((this._handle.streamer = this)._config = t);
							}.call(this, e),
							(this.parseChunk = function (e, i) {
								if (
									this.isFirstChunk &&
									b(this._config.beforeFirstChunk)
								) {
									var n = this._config.beforeFirstChunk(e);
									void 0 !== n && (e = n);
								}
								(this.isFirstChunk = !1), (this._halted = !1);
								var s = this._partialLine + e;
								this._partialLine = "";
								var o = this._handle.parse(
									s,
									this._baseIndex,
									!this._finished
								);
								if (!this._handle.paused() && !this._handle.aborted()) {
									var h = o.meta.cursor;
									this._finished ||
										((this._partialLine = s.substring(
											h - this._baseIndex
										)),
										(this._baseIndex = h)),
										o && o.data && (this._rowCount += o.data.length);
									var u =
										this._finished ||
										(this._config.preview &&
											this._rowCount >= this._config.preview);
									if (r)
										t.postMessage({
											results: o,
											workerId: a.WORKER_ID,
											finished: u,
										});
									else if (b(this._config.chunk) && !i) {
										if (
											(this._config.chunk(o, this._handle),
											this._handle.paused() ||
												this._handle.aborted())
										)
											return void (this._halted = !0);
										(o = void 0), (this._completeResults = void 0);
									}
									return (
										this._config.step ||
											this._config.chunk ||
											((this._completeResults.data = this._completeResults.data.concat(
												o.data
											)),
											(this._completeResults.errors = this._completeResults.errors.concat(
												o.errors
											)),
											(this._completeResults.meta = o.meta)),
										this._completed ||
											!u ||
											!b(this._config.complete) ||
											(o && o.meta.aborted) ||
											(this._config.complete(
												this._completeResults,
												this._input
											),
											(this._completed = !0)),
										u || (o && o.meta.paused) || this._nextChunk(),
										o
									);
								}
								this._halted = !0;
							}),
							(this._sendError = function (e) {
								b(this._config.error)
									? this._config.error(e)
									: r &&
									  this._config.error &&
									  t.postMessage({
											workerId: a.WORKER_ID,
											error: e,
											finished: !1,
									  });
							});
					}
					function u(e) {
						var t;
						(e = e || {}).chunkSize || (e.chunkSize = a.RemoteChunkSize),
							h.call(this, e),
							(this._nextChunk = i
								? function () {
										this._readChunk(), this._chunkLoaded();
								  }
								: function () {
										this._readChunk();
								  }),
							(this.stream = function (e) {
								(this._input = e), this._nextChunk();
							}),
							(this._readChunk = function () {
								if (this._finished) this._chunkLoaded();
								else {
									if (
										((t = new XMLHttpRequest()),
										this._config.withCredentials &&
											(t.withCredentials = this._config.withCredentials),
										i ||
											((t.onload = k(this._chunkLoaded, this)),
											(t.onerror = k(this._chunkError, this))),
										t.open(
											this._config.downloadRequestBody
												? "POST"
												: "GET",
											this._input,
											!i
										),
										this._config.downloadRequestHeaders)
									) {
										var e = this._config.downloadRequestHeaders;
										for (var r in e) t.setRequestHeader(r, e[r]);
									}
									if (this._config.chunkSize) {
										var n = this._start + this._config.chunkSize - 1;
										t.setRequestHeader(
											"Range",
											"bytes=" + this._start + "-" + n
										);
									}
									try {
										t.send(this._config.downloadRequestBody);
									} catch (e) {
										this._chunkError(e.message);
									}
									i && 0 === t.status && this._chunkError();
								}
							}),
							(this._chunkLoaded = function () {
								var e;
								4 === t.readyState &&
									(t.status < 200 || 400 <= t.status
										? this._chunkError()
										: ((this._start += this._config.chunkSize
												? this._config.chunkSize
												: t.responseText.length),
										  (this._finished =
												!this._config.chunkSize ||
												this._start >=
													(null ===
													(e = t.getResponseHeader(
														"Content-Range"
													))
														? -1
														: parseInt(
																e.substring(
																	e.lastIndexOf("/") + 1
																)
														  ))),
										  this.parseChunk(t.responseText)));
							}),
							(this._chunkError = function (e) {
								var i = t.statusText || e;
								this._sendError(new Error(i));
							});
					}
					function f(e) {
						var t, i;
						(e = e || {}).chunkSize || (e.chunkSize = a.LocalChunkSize),
							h.call(this, e);
						var r = "undefined" != typeof FileReader;
						(this.stream = function (e) {
							(this._input = e),
								(i = e.slice || e.webkitSlice || e.mozSlice),
								r
									? (((t = new FileReader()).onload = k(
											this._chunkLoaded,
											this
									  )),
									  (t.onerror = k(this._chunkError, this)))
									: (t = new FileReaderSync()),
								this._nextChunk();
						}),
							(this._nextChunk = function () {
								this._finished ||
									(this._config.preview &&
										!(this._rowCount < this._config.preview)) ||
									this._readChunk();
							}),
							(this._readChunk = function () {
								var e = this._input;
								if (this._config.chunkSize) {
									var n = Math.min(
										this._start + this._config.chunkSize,
										this._input.size
									);
									e = i.call(e, this._start, n);
								}
								var s = t.readAsText(e, this._config.encoding);
								r || this._chunkLoaded({ target: { result: s } });
							}),
							(this._chunkLoaded = function (e) {
								(this._start += this._config.chunkSize),
									(this._finished =
										!this._config.chunkSize ||
										this._start >= this._input.size),
									this.parseChunk(e.target.result);
							}),
							(this._chunkError = function () {
								this._sendError(t.error);
							});
					}
					function d(e) {
						var t;
						h.call(this, (e = e || {})),
							(this.stream = function (e) {
								return (t = e), this._nextChunk();
							}),
							(this._nextChunk = function () {
								if (!this._finished) {
									var e,
										i = this._config.chunkSize;
									return (
										i
											? ((e = t.substring(0, i)),
											  (t = t.substring(i)))
											: ((e = t), (t = "")),
										(this._finished = !t),
										this.parseChunk(e)
									);
								}
							});
					}
					function l(e) {
						h.call(this, (e = e || {}));
						var t = [],
							i = !0,
							r = !1;
						(this.pause = function () {
							h.prototype.pause.apply(this, arguments),
								this._input.pause();
						}),
							(this.resume = function () {
								h.prototype.resume.apply(this, arguments),
									this._input.resume();
							}),
							(this.stream = function (e) {
								(this._input = e),
									this._input.on("data", this._streamData),
									this._input.on("end", this._streamEnd),
									this._input.on("error", this._streamError);
							}),
							(this._checkIsFinished = function () {
								r && 1 === t.length && (this._finished = !0);
							}),
							(this._nextChunk = function () {
								this._checkIsFinished(),
									t.length ? this.parseChunk(t.shift()) : (i = !0);
							}),
							(this._streamData = k(function (e) {
								try {
									t.push(
										"string" == typeof e
											? e
											: e.toString(this._config.encoding)
									),
										i &&
											((i = !1),
											this._checkIsFinished(),
											this.parseChunk(t.shift()));
								} catch (e) {
									this._streamError(e);
								}
							}, this)),
							(this._streamError = k(function (e) {
								this._streamCleanUp(), this._sendError(e);
							}, this)),
							(this._streamEnd = k(function () {
								this._streamCleanUp(), (r = !0), this._streamData("");
							}, this)),
							(this._streamCleanUp = k(function () {
								this._input.removeListener("data", this._streamData),
									this._input.removeListener("end", this._streamEnd),
									this._input.removeListener(
										"error",
										this._streamError
									);
							}, this));
					}
					function c(e) {
						var t,
							i,
							r,
							n = Math.pow(2, 53),
							s = -n,
							o = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)(e[-+]?\d+)?\s*$/,
							h = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
							u = this,
							f = 0,
							d = 0,
							l = !1,
							c = !1,
							_ = [],
							m = { data: [], errors: [], meta: {} };
						if (b(e.step)) {
							var v = e.step;
							e.step = function (t) {
								if (((m = t), w())) E();
								else {
									if ((E(), 0 === m.data.length)) return;
									(f += t.data.length),
										e.preview && f > e.preview
											? i.abort()
											: ((m.data = m.data[0]), v(m, u));
								}
							};
						}
						function k(t) {
							return "greedy" === e.skipEmptyLines
								? "" === t.join("").trim()
								: 1 === t.length && 0 === t[0].length;
						}
						function E() {
							if (
								(m &&
									r &&
									(R(
										"Delimiter",
										"UndetectableDelimiter",
										"Unable to auto-detect delimiting character; defaulted to '" +
											a.DefaultDelimiter +
											"'"
									),
									(r = !1)),
								e.skipEmptyLines)
							)
								for (var t = 0; t < m.data.length; t++)
									k(m.data[t]) && m.data.splice(t--, 1);
							return (
								w() &&
									(function () {
										if (m)
											if (Array.isArray(m.data[0])) {
												for (
													var t = 0;
													w() && t < m.data.length;
													t++
												)
													m.data[t].forEach(i);
												m.data.splice(0, 1);
											} else m.data.forEach(i);
										function i(t) {
											b(e.transformHeader) &&
												(t = e.transformHeader(t)),
												_.push(t);
										}
									})(),
								(function () {
									if (
										!m ||
										(!e.header && !e.dynamicTyping && !e.transform)
									)
										return m;
									function t(t, i) {
										var r,
											n = e.header ? {} : [];
										for (r = 0; r < t.length; r++) {
											var s = r,
												a = t[r];
											e.header &&
												(s =
													r >= _.length ? "__parsed_extra" : _[r]),
												e.transform && (a = e.transform(a, s)),
												(a = C(s, a)),
												"__parsed_extra" === s
													? ((n[s] = n[s] || []), n[s].push(a))
													: (n[s] = a);
										}
										return (
											e.header &&
												(r > _.length
													? R(
															"FieldMismatch",
															"TooManyFields",
															"Too many fields: expected " +
																_.length +
																" fields but parsed " +
																r,
															d + i
													  )
													: r < _.length &&
													  R(
															"FieldMismatch",
															"TooFewFields",
															"Too few fields: expected " +
																_.length +
																" fields but parsed " +
																r,
															d + i
													  )),
											n
										);
									}
									var i = 1;
									return (
										!m.data.length || Array.isArray(m.data[0])
											? ((m.data = m.data.map(t)),
											  (i = m.data.length))
											: (m.data = t(m.data, 0)),
										e.header && m.meta && (m.meta.fields = _),
										(d += i),
										m
									);
								})()
							);
						}
						function w() {
							return e.header && 0 === _.length;
						}
						function C(t, i) {
							return (
								(r = t),
								e.dynamicTypingFunction &&
									void 0 === e.dynamicTyping[r] &&
									(e.dynamicTyping[r] = e.dynamicTypingFunction(r)),
								!0 === (e.dynamicTyping[r] || e.dynamicTyping)
									? "true" === i ||
									  "TRUE" === i ||
									  ("false" !== i &&
											"FALSE" !== i &&
											((function (e) {
												if (o.test(e)) {
													var t = parseFloat(e);
													if (s < t && t < n) return !0;
												}
												return !1;
											})(i)
												? parseFloat(i)
												: h.test(i)
												? new Date(i)
												: "" === i
												? null
												: i))
									: i
							);
							var r;
						}
						function R(e, t, i, r) {
							var n = { type: e, code: t, message: i };
							void 0 !== r && (n.row = r), m.errors.push(n);
						}
						(this.parse = function (n, s, o) {
							var h = e.quoteChar || '"';
							if (
								(e.newline ||
									(e.newline = (function (e, t) {
										e = e.substring(0, 1048576);
										var i = new RegExp(p(t) + "([^]*?)" + p(t), "gm"),
											r = (e = e.replace(i, "")).split("\r"),
											n = e.split("\n"),
											s = 1 < n.length && n[0].length < r[0].length;
										if (1 === r.length || s) return "\n";
										for (var a = 0, o = 0; o < r.length; o++)
											"\n" === r[o][0] && a++;
										return a >= r.length / 2 ? "\r\n" : "\r";
									})(n, h)),
								(r = !1),
								e.delimiter)
							)
								b(e.delimiter) &&
									((e.delimiter = e.delimiter(n)),
									(m.meta.delimiter = e.delimiter));
							else {
								var u = (function (t, i, r, n, s) {
									var o, h, u, f;
									s = s || [
										",",
										"\t",
										"|",
										";",
										a.RECORD_SEP,
										a.UNIT_SEP,
									];
									for (var d = 0; d < s.length; d++) {
										var l = s[d],
											c = 0,
											p = 0,
											_ = 0;
										u = void 0;
										for (
											var m = new g({
													comments: n,
													delimiter: l,
													newline: i,
													preview: 10,
												}).parse(t),
												v = 0;
											v < m.data.length;
											v++
										)
											if (r && k(m.data[v])) _++;
											else {
												var y = m.data[v].length;
												(p += y),
													void 0 !== u
														? 0 < y &&
														  ((c += Math.abs(y - u)), (u = y))
														: (u = y);
											}
										0 < m.data.length && (p /= m.data.length - _),
											(void 0 === h || c <= h) &&
												(void 0 === f || f < p) &&
												1.99 < p &&
												((h = c), (o = l), (f = p));
									}
									return {
										successful: !!(e.delimiter = o),
										bestDelimiter: o,
									};
								})(
									n,
									e.newline,
									e.skipEmptyLines,
									e.comments,
									e.delimitersToGuess
								);
								u.successful
									? (e.delimiter = u.bestDelimiter)
									: ((r = !0), (e.delimiter = a.DefaultDelimiter)),
									(m.meta.delimiter = e.delimiter);
							}
							var f = y(e);
							return (
								e.preview && e.header && f.preview++,
								(t = n),
								(i = new g(f)),
								(m = i.parse(t, s, o)),
								E(),
								l
									? { meta: { paused: !0 } }
									: m || { meta: { paused: !1 } }
							);
						}),
							(this.paused = function () {
								return l;
							}),
							(this.pause = function () {
								(l = !0),
									i.abort(),
									(t = b(e.chunk)
										? ""
										: t.substring(i.getCharIndex()));
							}),
							(this.resume = function () {
								u.streamer._halted
									? ((l = !1), u.streamer.parseChunk(t, !0))
									: setTimeout(u.resume, 3);
							}),
							(this.aborted = function () {
								return c;
							}),
							(this.abort = function () {
								(c = !0),
									i.abort(),
									(m.meta.aborted = !0),
									b(e.complete) && e.complete(m),
									(t = "");
							});
					}
					function p(e) {
						return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
					}
					function g(e) {
						var t,
							i = (e = e || {}).delimiter,
							r = e.newline,
							n = e.comments,
							s = e.step,
							o = e.preview,
							h = e.fastMode,
							u = (t = void 0 === e.quoteChar ? '"' : e.quoteChar);
						if (
							(void 0 !== e.escapeChar && (u = e.escapeChar),
							("string" != typeof i ||
								-1 < a.BAD_DELIMITERS.indexOf(i)) &&
								(i = ","),
							n === i)
						)
							throw new Error("Comment character same as delimiter");
						!0 === n
							? (n = "#")
							: ("string" != typeof n ||
									-1 < a.BAD_DELIMITERS.indexOf(n)) &&
							  (n = !1),
							"\n" !== r && "\r" !== r && "\r\n" !== r && (r = "\n");
						var f = 0,
							d = !1;
						(this.parse = function (e, a, l) {
							if ("string" != typeof e)
								throw new Error("Input must be a string");
							var c = e.length,
								g = i.length,
								_ = r.length,
								m = n.length,
								v = b(s),
								y = [],
								k = [],
								E = [],
								w = (f = 0);
							if (!e) return j();
							if (h || (!1 !== h && -1 === e.indexOf(t))) {
								for (var C = e.split(r), R = 0; R < C.length; R++) {
									if (
										((E = C[R]), (f += E.length), R !== C.length - 1)
									)
										f += r.length;
									else if (l) return j();
									if (!n || E.substring(0, m) !== n) {
										if (v) {
											if (((y = []), L(E.split(i)), q(), d))
												return j();
										} else L(E.split(i));
										if (o && o <= R)
											return (y = y.slice(0, o)), j(!0);
									}
								}
								return j();
							}
							for (
								var S = e.indexOf(i, f),
									x = e.indexOf(r, f),
									O = new RegExp(p(u) + p(t), "g"),
									D = e.indexOf(t, f);
								;

							)
								if (e[f] !== t)
									if (
										n &&
										0 === E.length &&
										e.substring(f, f + m) === n
									) {
										if (-1 === x) return j();
										(f = x + _),
											(x = e.indexOf(r, f)),
											(S = e.indexOf(i, f));
									} else {
										if (-1 !== S && (S < x || -1 === x)) {
											if (!(S < D)) {
												E.push(e.substring(f, S)),
													(f = S + g),
													(S = e.indexOf(i, f));
												continue;
											}
											var I = U(S, D, x);
											if (I && void 0 !== I.nextDelim) {
												(S = I.nextDelim),
													(D = I.quoteSearch),
													E.push(e.substring(f, S)),
													(f = S + g),
													(S = e.indexOf(i, f));
												continue;
											}
										}
										if (-1 === x) break;
										if (
											(E.push(e.substring(f, x)),
											M(x + _),
											v && (q(), d))
										)
											return j();
										if (o && y.length >= o) return j(!0);
									}
								else
									for (D = f, f++; ; ) {
										if (-1 === (D = e.indexOf(t, D + 1)))
											return (
												l ||
													k.push({
														type: "Quotes",
														code: "MissingQuotes",
														message: "Quoted field unterminated",
														row: y.length,
														index: f,
													}),
												z()
											);
										if (D === c - 1)
											return z(e.substring(f, D).replace(O, t));
										if (t !== u || e[D + 1] !== u) {
											if (t === u || 0 === D || e[D - 1] !== u) {
												-1 !== S &&
													S < D + 1 &&
													(S = e.indexOf(i, D + 1)),
													-1 !== x &&
														x < D + 1 &&
														(x = e.indexOf(r, D + 1));
												var T = F(-1 === x ? S : Math.min(S, x));
												if (e[D + 1 + T] === i) {
													E.push(e.substring(f, D).replace(O, t)),
														e[(f = D + 1 + T + g)] !== t &&
															(D = e.indexOf(t, f)),
														(S = e.indexOf(i, f)),
														(x = e.indexOf(r, f));
													break;
												}
												var A = F(x);
												if (
													e.substring(D + 1 + A, D + 1 + A + _) ===
													r
												) {
													if (
														(E.push(
															e.substring(f, D).replace(O, t)
														),
														M(D + 1 + A + _),
														(S = e.indexOf(i, f)),
														(D = e.indexOf(t, f)),
														v && (q(), d))
													)
														return j();
													if (o && y.length >= o) return j(!0);
													break;
												}
												k.push({
													type: "Quotes",
													code: "InvalidQuotes",
													message:
														"Trailing quote on quoted field is malformed",
													row: y.length,
													index: f,
												}),
													D++;
											}
										} else D++;
									}
							return z();
							function L(e) {
								y.push(e), (w = f);
							}
							function F(t) {
								var i = 0;
								if (-1 !== t) {
									var r = e.substring(D + 1, t);
									r && "" === r.trim() && (i = r.length);
								}
								return i;
							}
							function z(t) {
								return (
									l ||
										(void 0 === t && (t = e.substring(f)),
										E.push(t),
										(f = c),
										L(E),
										v && q()),
									j()
								);
							}
							function M(t) {
								(f = t), L(E), (E = []), (x = e.indexOf(r, f));
							}
							function j(e) {
								return {
									data: y,
									errors: k,
									meta: {
										delimiter: i,
										linebreak: r,
										aborted: d,
										truncated: !!e,
										cursor: w + (a || 0),
									},
								};
							}
							function q() {
								s(j()), (y = []), (k = []);
							}
							function U(r, n, s) {
								var a = { nextDelim: void 0, quoteSearch: void 0 },
									o = e.indexOf(t, n + 1);
								if (n < r && r < o && (o < s || -1 === s)) {
									var h = e.indexOf(i, o);
									if (-1 === h) return a;
									o < h && (o = e.indexOf(t, o + 1)), (a = U(h, o, s));
								} else a = { nextDelim: r, quoteSearch: n };
								return a;
							}
						}),
							(this.abort = function () {
								d = !0;
							}),
							(this.getCharIndex = function () {
								return f;
							});
					}
					function _(e) {
						var t = e.data,
							i = n[t.workerId],
							r = !1;
						if (t.error) i.userError(t.error, t.file);
						else if (t.results && t.results.data) {
							var s = {
								abort: function () {
									(r = !0),
										m(t.workerId, {
											data: [],
											errors: [],
											meta: { aborted: !0 },
										});
								},
								pause: v,
								resume: v,
							};
							if (b(i.userStep)) {
								for (
									var a = 0;
									a < t.results.data.length &&
									(i.userStep(
										{
											data: t.results.data[a],
											errors: t.results.errors,
											meta: t.results.meta,
										},
										s
									),
									!r);
									a++
								);
								delete t.results;
							} else
								b(i.userChunk) &&
									(i.userChunk(t.results, s, t.file),
									delete t.results);
						}
						t.finished && !r && m(t.workerId, t.results);
					}
					function m(e, t) {
						var i = n[e];
						b(i.userComplete) && i.userComplete(t),
							i.terminate(),
							delete n[e];
					}
					function v() {
						throw new Error("Not implemented.");
					}
					function y(e) {
						if ("object" != typeof e || null === e) return e;
						var t = Array.isArray(e) ? [] : {};
						for (var i in e) t[i] = y(e[i]);
						return t;
					}
					function k(e, t) {
						return function () {
							e.apply(t, arguments);
						};
					}
					function b(e) {
						return "function" == typeof e;
					}
					return (
						r &&
							(t.onmessage = function (e) {
								var i = e.data;
								if (
									(void 0 === a.WORKER_ID &&
										i &&
										(a.WORKER_ID = i.workerId),
									"string" == typeof i.input)
								)
									t.postMessage({
										workerId: a.WORKER_ID,
										results: a.parse(i.input, i.config),
										finished: !0,
									});
								else if (
									(t.File && i.input instanceof File) ||
									i.input instanceof Object
								) {
									var r = a.parse(i.input, i.config);
									r &&
										t.postMessage({
											workerId: a.WORKER_ID,
											results: r,
											finished: !0,
										});
								}
							}),
						((u.prototype = Object.create(h.prototype)).constructor = u),
						((f.prototype = Object.create(h.prototype)).constructor = f),
						((d.prototype = Object.create(d.prototype)).constructor = d),
						((l.prototype = Object.create(h.prototype)).constructor = l),
						a
					);
				});
			},
			{},
		],
		jgwB: [
			function (require, module, exports) {
				"use strict";
				Object.defineProperty(exports, "__esModule", { value: !0 }),
					(exports.h = b),
					(exports.html = q),
					(exports.Grid = exports.Config = void 0);
				var t = function (e, n) {
					return (t =
						Object.setPrototypeOf ||
						({ __proto__: [] } instanceof Array &&
							function (t, e) {
								t.__proto__ = e;
							}) ||
						function (t, e) {
							for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
						})(e, n);
				};
				function e(e, n) {
					function r() {
						this.constructor = e;
					}
					t(e, n),
						(e.prototype =
							null === n
								? Object.create(n)
								: ((r.prototype = n.prototype), new r()));
				}
				var n = function () {
					return (n =
						Object.assign ||
						function (t) {
							for (var e, n = 1, r = arguments.length; n < r; n++)
								for (var o in (e = arguments[n]))
									Object.prototype.hasOwnProperty.call(e, o) &&
										(t[o] = e[o]);
							return t;
						}).apply(this, arguments);
				};
				function r(t, e, n, r) {
					return new (n || (n = Promise))(function (o, i) {
						function s(t) {
							try {
								u(r.next(t));
							} catch (t) {
								i(t);
							}
						}
						function a(t) {
							try {
								u(r.throw(t));
							} catch (t) {
								i(t);
							}
						}
						function u(t) {
							var e;
							t.done
								? o(t.value)
								: ((e = t.value),
								  e instanceof n
										? e
										: new n(function (t) {
												t(e);
										  })).then(s, a);
						}
						u((r = r.apply(t, e || [])).next());
					});
				}
				function o(t, e) {
					var n,
						r,
						o,
						i,
						s = {
							label: 0,
							sent: function () {
								if (1 & o[0]) throw o[1];
								return o[1];
							},
							trys: [],
							ops: [],
						};
					return (
						(i = { next: a(0), throw: a(1), return: a(2) }),
						"function" == typeof Symbol &&
							(i[Symbol.iterator] = function () {
								return this;
							}),
						i
					);
					function a(i) {
						return function (a) {
							return (function (i) {
								if (n)
									throw new TypeError(
										"Generator is already executing."
									);
								for (; s; )
									try {
										if (
											((n = 1),
											r &&
												(o =
													2 & i[0]
														? r.return
														: i[0]
														? r.throw ||
														  ((o = r.return) && o.call(r), 0)
														: r.next) &&
												!(o = o.call(r, i[1])).done)
										)
											return o;
										switch (
											((r = 0), o && (i = [2 & i[0], o.value]), i[0])
										) {
											case 0:
											case 1:
												o = i;
												break;
											case 4:
												return s.label++, { value: i[1], done: !1 };
											case 5:
												s.label++, (r = i[1]), (i = [0]);
												continue;
											case 7:
												(i = s.ops.pop()), s.trys.pop();
												continue;
											default:
												if (
													!(
														(o =
															(o = s.trys).length > 0 &&
															o[o.length - 1]) ||
														(6 !== i[0] && 2 !== i[0])
													)
												) {
													s = 0;
													continue;
												}
												if (
													3 === i[0] &&
													(!o || (i[1] > o[0] && i[1] < o[3]))
												) {
													s.label = i[1];
													break;
												}
												if (6 === i[0] && s.label < o[1]) {
													(s.label = o[1]), (o = i);
													break;
												}
												if (o && s.label < o[2]) {
													(s.label = o[2]), s.ops.push(i);
													break;
												}
												o[2] && s.ops.pop(), s.trys.pop();
												continue;
										}
										i = e.call(t, s);
									} catch (t) {
										(i = [6, t]), (r = 0);
									} finally {
										n = o = 0;
									}
								if (5 & i[0]) throw i[1];
								return { value: i[0] ? i[1] : void 0, done: !0 };
							})([i, a]);
						};
					}
				}
				function i() {
					for (var t = 0, e = 0, n = arguments.length; e < n; e++)
						t += arguments[e].length;
					var r = Array(t),
						o = 0;
					for (e = 0; e < n; e++)
						for (
							var i = arguments[e], s = 0, a = i.length;
							s < a;
							s++, o++
						)
							r[o] = i[s];
					return r;
				}
				function s() {
					return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
						/[xy]/g,
						function (t) {
							var e = (16 * Math.random()) | 0;
							return ("x" == t ? e : (3 & e) | 8).toString(16);
						}
					);
				}
				var a,
					u,
					c,
					l,
					p,
					h,
					f,
					d = (function () {
						function t(t) {
							this._id = t || s();
						}
						return (
							Object.defineProperty(t.prototype, "id", {
								get: function () {
									return this._id;
								},
								enumerable: !1,
								configurable: !0,
							}),
							t
						);
					})(),
					_ = {},
					y = [],
					g = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
				function m(t, e) {
					for (var n in e) t[n] = e[n];
					return t;
				}
				function v(t) {
					var e = t.parentNode;
					e && e.removeChild(t);
				}
				function b(t, e, n) {
					var r,
						o = arguments,
						i = {};
					for (r in e) "key" !== r && "ref" !== r && (i[r] = e[r]);
					if (arguments.length > 3)
						for (n = [n], r = 3; r < arguments.length; r++) n.push(o[r]);
					if (
						(null != n && (i.children = n),
						"function" == typeof t && null != t.defaultProps)
					)
						for (r in t.defaultProps)
							void 0 === i[r] && (i[r] = t.defaultProps[r]);
					return w(t, i, e && e.key, e && e.ref, null);
				}
				function w(t, e, n, r, o) {
					var i = {
						type: t,
						props: e,
						key: n,
						ref: r,
						__k: null,
						__: null,
						__b: 0,
						__e: null,
						__d: void 0,
						__c: null,
						constructor: void 0,
						__v: o,
					};
					return null == o && (i.__v = i), a.vnode && a.vnode(i), i;
				}
				function k(t) {
					return t.children;
				}
				function x(t, e) {
					(this.props = t), (this.context = e);
				}
				function S(t, e) {
					if (null == e)
						return t.__ ? S(t.__, t.__.__k.indexOf(t) + 1) : null;
					for (var n; e < t.__k.length; e++)
						if (null != (n = t.__k[e]) && null != n.__e) return n.__e;
					return "function" == typeof t.type ? S(t) : null;
				}
				function P(t) {
					var e, n;
					if (null != (t = t.__) && null != t.__c) {
						for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
							if (null != (n = t.__k[e]) && null != n.__e) {
								t.__e = t.__c.base = n.__e;
								break;
							}
						return P(t);
					}
				}
				function C(t) {
					((!t.__d && (t.__d = !0) && u.push(t) && !c++) ||
						p !== a.debounceRendering) &&
						((p = a.debounceRendering) || l)(N);
				}
				function N() {
					for (var t; (c = u.length); )
						(t = u.sort(function (t, e) {
							return t.__v.__b - e.__v.__b;
						})),
							(u = []),
							t.some(function (t) {
								var e, n, r, o, i, s, a;
								t.__d &&
									((s = (i = (e = t).__v).__e),
									(a = e.__P) &&
										((n = []),
										((r = m({}, i)).__v = r),
										(o = L(
											a,
											i,
											r,
											e.__n,
											void 0 !== a.ownerSVGElement,
											null,
											n,
											null == s ? S(i) : s
										)),
										U(n, i),
										o != s && P(i)));
							});
				}
				function E(t, e, n, r, o, i, s, a, u, c) {
					var l,
						p,
						h,
						f,
						d,
						g,
						m,
						b,
						x,
						P = (r && r.__k) || y,
						C = P.length;
					for (
						u == _ && (u = null != s ? s[0] : C ? S(r, 0) : null),
							n.__k = [],
							l = 0;
						l < e.length;
						l++
					)
						if (
							null !=
							(f = n.__k[l] =
								null == (f = e[l]) || "boolean" == typeof f
									? null
									: "string" == typeof f || "number" == typeof f
									? w(null, f, null, null, f)
									: Array.isArray(f)
									? w(k, { children: f }, null, null, null)
									: null != f.__e || null != f.__c
									? w(f.type, f.props, f.key, null, f.__v)
									: f)
						) {
							if (
								((f.__ = n),
								(f.__b = n.__b + 1),
								null === (h = P[l]) ||
									(h && f.key == h.key && f.type === h.type))
							)
								P[l] = void 0;
							else
								for (p = 0; p < C; p++) {
									if (
										(h = P[p]) &&
										f.key == h.key &&
										f.type === h.type
									) {
										P[p] = void 0;
										break;
									}
									h = null;
								}
							if (
								((d = L(t, f, (h = h || _), o, i, s, a, u, c)),
								(p = f.ref) &&
									h.ref != p &&
									(b || (b = []),
									h.ref && b.push(h.ref, null, f),
									b.push(p, f.__c || d, f)),
								null != d)
							) {
								if (
									(null == m && (m = d),
									(x = void 0),
									void 0 !== f.__d)
								)
									(x = f.__d), (f.__d = void 0);
								else if (s == h || d != u || null == d.parentNode) {
									t: if (null == u || u.parentNode !== t)
										t.appendChild(d), (x = null);
									else {
										for (
											g = u, p = 0;
											(g = g.nextSibling) && p < C;
											p += 2
										)
											if (g == d) break t;
										t.insertBefore(d, u), (x = u);
									}
									"option" == n.type && (t.value = "");
								}
								(u = void 0 !== x ? x : d.nextSibling),
									"function" == typeof n.type && (n.__d = u);
							} else u && h.__e == u && u.parentNode != t && (u = S(h));
						}
					if (((n.__e = m), null != s && "function" != typeof n.type))
						for (l = s.length; l--; ) null != s[l] && v(s[l]);
					for (l = C; l--; ) null != P[l] && R(P[l], P[l]);
					if (b) for (l = 0; l < b.length; l++) I(b[l], b[++l], b[++l]);
				}
				function O(t, e, n) {
					"-" === e[0]
						? t.setProperty(e, n)
						: (t[e] =
								"number" == typeof n && !1 === g.test(e)
									? n + "px"
									: null == n
									? ""
									: n);
				}
				function T(t, e, n, r, o) {
					var i, s, a, u, c;
					if (
						(o
							? "className" === e && (e = "class")
							: "class" === e && (e = "className"),
						"style" === e)
					)
						if (((i = t.style), "string" == typeof n)) i.cssText = n;
						else {
							if (
								("string" == typeof r && ((i.cssText = ""), (r = null)),
								r)
							)
								for (u in r) (n && u in n) || O(i, u, "");
							if (n) for (c in n) (r && n[c] === r[c]) || O(i, c, n[c]);
						}
					else
						"o" === e[0] && "n" === e[1]
							? ((s = e !== (e = e.replace(/Capture$/, ""))),
							  (a = e.toLowerCase()),
							  (e = (a in t ? a : e).slice(2)),
							  n
									? (r || t.addEventListener(e, D, s),
									  ((t.l || (t.l = {}))[e] = n))
									: t.removeEventListener(e, D, s))
							: "list" !== e &&
							  "tagName" !== e &&
							  "form" !== e &&
							  "type" !== e &&
							  "size" !== e &&
							  !o &&
							  e in t
							? (t[e] = null == n ? "" : n)
							: "function" != typeof n &&
							  "dangerouslySetInnerHTML" !== e &&
							  (e !== (e = e.replace(/^xlink:?/, ""))
									? null == n || !1 === n
										? t.removeAttributeNS(
												"http://www.w3.org/1999/xlink",
												e.toLowerCase()
										  )
										: t.setAttributeNS(
												"http://www.w3.org/1999/xlink",
												e.toLowerCase(),
												n
										  )
									: null == n || (!1 === n && !/^ar/.test(e))
									? t.removeAttribute(e)
									: t.setAttribute(e, n));
				}
				function D(t) {
					this.l[t.type](a.event ? a.event(t) : t);
				}
				function L(t, e, n, r, o, i, s, u, c) {
					var l,
						p,
						h,
						f,
						d,
						_,
						y,
						g,
						v,
						b,
						w,
						S = e.type;
					if (void 0 !== e.constructor) return null;
					(l = a.__b) && l(e);
					try {
						t: if ("function" == typeof S) {
							if (
								((g = e.props),
								(v = (l = S.contextType) && r[l.__c]),
								(b = l ? (v ? v.props.value : l.__) : r),
								n.__c
									? (y = (p = e.__c = n.__c).__ = p.__E)
									: ("prototype" in S && S.prototype.render
											? (e.__c = p = new S(g, b))
											: ((e.__c = p = new x(g, b)),
											  (p.constructor = S),
											  (p.render = A)),
									  v && v.sub(p),
									  (p.props = g),
									  p.state || (p.state = {}),
									  (p.context = b),
									  (p.__n = r),
									  (h = p.__d = !0),
									  (p.__h = [])),
								null == p.__s && (p.__s = p.state),
								null != S.getDerivedStateFromProps &&
									(p.__s == p.state && (p.__s = m({}, p.__s)),
									m(p.__s, S.getDerivedStateFromProps(g, p.__s))),
								(f = p.props),
								(d = p.state),
								h)
							)
								null == S.getDerivedStateFromProps &&
									null != p.componentWillMount &&
									p.componentWillMount(),
									null != p.componentDidMount &&
										p.__h.push(p.componentDidMount);
							else {
								if (
									(null == S.getDerivedStateFromProps &&
										g !== f &&
										null != p.componentWillReceiveProps &&
										p.componentWillReceiveProps(g, b),
									(!p.__e &&
										null != p.shouldComponentUpdate &&
										!1 === p.shouldComponentUpdate(g, p.__s, b)) ||
										e.__v === n.__v)
								) {
									for (
										p.props = g,
											p.state = p.__s,
											e.__v !== n.__v && (p.__d = !1),
											p.__v = e,
											e.__e = n.__e,
											e.__k = n.__k,
											p.__h.length && s.push(p),
											l = 0;
										l < e.__k.length;
										l++
									)
										e.__k[l] && (e.__k[l].__ = e);
									break t;
								}
								null != p.componentWillUpdate &&
									p.componentWillUpdate(g, p.__s, b),
									null != p.componentDidUpdate &&
										p.__h.push(function () {
											p.componentDidUpdate(f, d, _);
										});
							}
							(p.context = b),
								(p.props = g),
								(p.state = p.__s),
								(l = a.__r) && l(e),
								(p.__d = !1),
								(p.__v = e),
								(p.__P = t),
								(l = p.render(p.props, p.state, p.context)),
								null != p.getChildContext &&
									(r = m(m({}, r), p.getChildContext())),
								h ||
									null == p.getSnapshotBeforeUpdate ||
									(_ = p.getSnapshotBeforeUpdate(f, d)),
								(w =
									null != l && l.type == k && null == l.key
										? l.props.children
										: l),
								E(
									t,
									Array.isArray(w) ? w : [w],
									e,
									n,
									r,
									o,
									i,
									s,
									u,
									c
								),
								(p.base = e.__e),
								p.__h.length && s.push(p),
								y && (p.__E = p.__ = null),
								(p.__e = !1);
						} else
							null == i && e.__v === n.__v
								? ((e.__k = n.__k), (e.__e = n.__e))
								: (e.__e = j(n.__e, e, n, r, o, i, s, c));
						(l = a.diffed) && l(e);
					} catch (t) {
						(e.__v = null), a.__e(t, e, n);
					}
					return e.__e;
				}
				function U(t, e) {
					a.__c && a.__c(e, t),
						t.some(function (e) {
							try {
								(t = e.__h),
									(e.__h = []),
									t.some(function (t) {
										t.call(e);
									});
							} catch (t) {
								a.__e(t, e.__v);
							}
						});
				}
				function j(t, e, n, r, o, i, s, a) {
					var u,
						c,
						l,
						p,
						h,
						f = n.props,
						d = e.props;
					if (((o = "svg" === e.type || o), null != i))
						for (u = 0; u < i.length; u++)
							if (
								null != (c = i[u]) &&
								((null === e.type
									? 3 === c.nodeType
									: c.localName === e.type) ||
									t == c)
							) {
								(t = c), (i[u] = null);
								break;
							}
					if (null == t) {
						if (null === e.type) return document.createTextNode(d);
						(t = o
							? document.createElementNS(
									"http://www.w3.org/2000/svg",
									e.type
							  )
							: document.createElement(e.type, d.is && { is: d.is })),
							(i = null),
							(a = !1);
					}
					if (null === e.type) f !== d && t.data != d && (t.data = d);
					else {
						if (
							(null != i && (i = y.slice.call(t.childNodes)),
							(l = (f = n.props || _).dangerouslySetInnerHTML),
							(p = d.dangerouslySetInnerHTML),
							!a)
						) {
							if (null != i)
								for (f = {}, h = 0; h < t.attributes.length; h++)
									f[t.attributes[h].name] = t.attributes[h].value;
							(p || l) &&
								((p && l && p.__html == l.__html) ||
									(t.innerHTML = (p && p.__html) || ""));
						}
						(function (t, e, n, r, o) {
							var i;
							for (i in n)
								"children" === i ||
									"key" === i ||
									i in e ||
									T(t, i, null, n[i], r);
							for (i in e)
								(o && "function" != typeof e[i]) ||
									"children" === i ||
									"key" === i ||
									"value" === i ||
									"checked" === i ||
									n[i] === e[i] ||
									T(t, i, e[i], n[i], r);
						})(t, d, f, o, a),
							p
								? (e.__k = [])
								: ((u = e.props.children),
								  E(
										t,
										Array.isArray(u) ? u : [u],
										e,
										n,
										r,
										"foreignObject" !== e.type && o,
										i,
										s,
										_,
										a
								  )),
							a ||
								("value" in d &&
									void 0 !== (u = d.value) &&
									u !== t.value &&
									T(t, "value", u, f.value, !1),
								"checked" in d &&
									void 0 !== (u = d.checked) &&
									u !== t.checked &&
									T(t, "checked", u, f.checked, !1));
					}
					return t;
				}
				function I(t, e, n) {
					try {
						"function" == typeof t ? t(e) : (t.current = e);
					} catch (t) {
						a.__e(t, n);
					}
				}
				function R(t, e, n) {
					var r, o, i;
					if (
						(a.unmount && a.unmount(t),
						(r = t.ref) &&
							((r.current && r.current !== t.__e) || I(r, null, e)),
						n || "function" == typeof t.type || (n = null != (o = t.__e)),
						(t.__e = t.__d = void 0),
						null != (r = t.__c))
					) {
						if (r.componentWillUnmount)
							try {
								r.componentWillUnmount();
							} catch (t) {
								a.__e(t, e);
							}
						r.base = r.__P = null;
					}
					if ((r = t.__k))
						for (i = 0; i < r.length; i++) r[i] && R(r[i], e, n);
					null != o && v(o);
				}
				function A(t, e, n) {
					return this.constructor(t, n);
				}
				function M(t, e, n) {
					var r, o, i;
					a.__ && a.__(t, e),
						(o = (r = n === h) ? null : (n && n.__k) || e.__k),
						(t = b(k, null, [t])),
						(i = []),
						L(
							e,
							((r ? e : n || e).__k = t),
							o || _,
							_,
							void 0 !== e.ownerSVGElement,
							n && !r
								? [n]
								: o
								? null
								: e.childNodes.length
								? y.slice.call(e.childNodes)
								: null,
							i,
							n || _,
							r
						),
						U(i, t);
				}
				function H(t) {
					if (!t) return null;
					var e = Object.keys(t);
					return e.length ? t[e[0]].props.value : null;
				}
				(a = {
					__e: function (t, e) {
						for (var n, r; (e = e.__); )
							if ((n = e.__c) && !n.__)
								try {
									if (
										(n.constructor &&
											null !=
												n.constructor.getDerivedStateFromError &&
											((r = !0),
											n.setState(
												n.constructor.getDerivedStateFromError(t)
											)),
										null != n.componentDidCatch &&
											((r = !0), n.componentDidCatch(t)),
										r)
									)
										return C((n.__E = n));
								} catch (e) {
									t = e;
								}
						throw t;
					},
				}),
					(x.prototype.setState = function (t, e) {
						var n;
						(n =
							this.__s !== this.state
								? this.__s
								: (this.__s = m({}, this.state))),
							"function" == typeof t && (t = t(n, this.props)),
							t && m(n, t),
							null != t && this.__v && (e && this.__h.push(e), C(this));
					}),
					(x.prototype.forceUpdate = function (t) {
						this.__v && ((this.__e = !0), t && this.__h.push(t), C(this));
					}),
					(x.prototype.render = k),
					(u = []),
					(c = 0),
					(l =
						"function" == typeof Promise
							? Promise.prototype.then.bind(Promise.resolve())
							: setTimeout),
					(h = _),
					(f = 0);
				var F = {
						search: { placeholder: "Type a keyword..." },
						sort: {
							sortAsc: "Sort column ascending",
							sortDesc: "Sort column descending",
						},
						pagination: {
							previous: "Previous",
							next: "Next",
							navigate: function (t, e) {
								return "Page " + t + " of " + e;
							},
							page: function (t) {
								return "Page " + t;
							},
							showing: "Showing",
							of: "of",
							to: "to",
							results: "results",
						},
						loading: "Loading...",
						noRecordsFound: "No matching records found",
						error: "An error happened while fetching the data",
					},
					W = (function () {
						function t(t) {
							(this._language = t), (this._defaultLanguage = F);
						}
						return (
							(t.prototype.getString = function (t, e) {
								if (!e || !t) return null;
								var n = t.split("."),
									r = n[0];
								if (e[r]) {
									var o = e[r];
									return "string" == typeof o
										? function () {
												return o;
										  }
										: "function" == typeof o
										? o
										: this.getString(n.slice(1).join("."), o);
								}
								return null;
							}),
							(t.prototype.translate = function (t) {
								for (var e = [], n = 1; n < arguments.length; n++)
									e[n - 1] = arguments[n];
								var r;
								return (r =
									this.getString(t, this._language) ||
									this.getString(t, this._defaultLanguage))
									? r.apply(void 0, e)
									: t;
							}),
							t
						);
					})(),
					B = (function (t) {
						function n(e, n) {
							var r,
								o = t.call(this, e, n) || this;
							return (
								(o.config = H(n)),
								o.config &&
									(o._ =
										((r = o.config.translator),
										function (t) {
											for (
												var e = [], n = 1;
												n < arguments.length;
												n++
											)
												e[n - 1] = arguments[n];
											return r.translate.apply(r, i([t], e));
										})),
								o
							);
						}
						return e(n, t), n;
					})(x),
					G = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.render = function () {
								return b(this.props.parentElement, {
									dangerouslySetInnerHTML: {
										__html: this.props.content,
									},
								});
							}),
							(n.defaultProps = { parentElement: "span" }),
							n
						);
					})(B);
				function q(t, e) {
					return b(G, { content: t, parentElement: e });
				}
				var K = (function (t) {
						function n(e) {
							var n = t.call(this) || this;
							return n.setData(e), n;
						}
						return (
							e(n, t),
							(n.prototype.cast = function (t) {
								return t instanceof HTMLElement ? q(t.outerHTML) : t;
							}),
							(n.prototype.setData = function (t) {
								return (this.data = this.cast(t)), this;
							}),
							n
						);
					})(d),
					$ = (function (t) {
						function n(e) {
							var n = t.call(this) || this;
							return (n.cells = e || []), n;
						}
						return (
							e(n, t),
							Object.defineProperty(n.prototype, "cells", {
								get: function () {
									return this._cells;
								},
								set: function (t) {
									this._cells = t;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(n.fromCells = function (t) {
								return new n(
									t.map(function (t) {
										return new K(t.data);
									})
								);
							}),
							Object.defineProperty(n.prototype, "length", {
								get: function () {
									return this.cells.length;
								},
								enumerable: !1,
								configurable: !0,
							}),
							n
						);
					})(d),
					z = (function (t) {
						function n(e) {
							var n = t.call(this) || this;
							return (
								(n.rows =
									e instanceof Array ? e : e instanceof $ ? [e] : []),
								n
							);
						}
						return (
							e(n, t),
							Object.defineProperty(n.prototype, "rows", {
								get: function () {
									return this._rows;
								},
								set: function (t) {
									this._rows = t;
								},
								enumerable: !1,
								configurable: !0,
							}),
							Object.defineProperty(n.prototype, "length", {
								get: function () {
									return this._length || this.rows.length;
								},
								set: function (t) {
									this._length = t;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(n.fromRows = function (t) {
								return new n(
									t.map(function (t) {
										return $.fromCells(t.cells);
									})
								);
							}),
							(n.fromArray = function (t) {
								return new n(
									(t = (function (t) {
										return !t[0] || t[0] instanceof Array ? t : [t];
									})(t)).map(function (t) {
										return new $(
											t.map(function (t) {
												return new K(t);
											})
										);
									})
								);
							}),
							(n.fromStorageResponse = function (t) {
								var e = n.fromArray(t.data);
								return (e.length = t.total), e;
							}),
							n
						);
					})(d);
				function V(t, e) {
					return "string" == typeof t
						? t.indexOf("%") > -1
							? (e / 100) * parseInt(t, 10)
							: parseInt(t, 10)
						: t;
				}
				function Y(t) {
					return t ? Math.floor(t) + "px" : "";
				}
				function X(t, e) {
					if (!t) return null;
					var n = t.querySelectorAll("tr:first-child > td");
					return n && n[e] ? n[e].clientWidth : null;
				}
				var J,
					Q = (function (t) {
						function r() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(r, t),
							(r.prototype.resetStyle = function () {
								return {
									padding: 0,
									margin: 0,
									border: "none",
									outline: "none",
								};
							}),
							(r.prototype.head = function () {
								var t = this;
								return b(
									"thead",
									{ style: this.resetStyle() },
									b(
										"tr",
										null,
										this.props.header.columns.map(function (e) {
											return b(
												"th",
												{
													style: n(n({}, t.resetStyle()), {
														whiteSpace: "nowrap",
														paddingRight: e.sort ? "18px" : "0",
													}),
												},
												e.name
											);
										})
									)
								);
							}),
							(r.prototype.td = function (t) {
								return b("td", { style: this.resetStyle() }, t.data);
							}),
							(r.prototype.tr = function (t) {
								var e = this;
								return b(
									"tr",
									{ style: this.resetStyle() },
									t.cells.map(function (t) {
										return e.td(t);
									})
								);
							}),
							(r.prototype.body = function () {
								var t = this;
								return b(
									"tbody",
									{ style: this.resetStyle() },
									this.props.data &&
										this.props.data.rows.map(function (e) {
											return t.tr(e);
										})
								);
							}),
							(r.prototype.render = function () {
								return b(
									"table",
									{
										style: n(
											{
												position: "absolute",
												zIndex: "-2147483640",
												visibility: "hidden",
												tableLayout: "auto",
												width: "auto",
											},
											this.resetStyle()
										),
									},
									this.head(),
									this.body()
								);
							}),
							r
						);
					})(B),
					Z = (function (t) {
						function r() {
							var e = t.call(this) || this;
							return (e._columns = []), e;
						}
						return (
							e(r, t),
							Object.defineProperty(r.prototype, "columns", {
								get: function () {
									return this._columns;
								},
								set: function (t) {
									this._columns = t;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(r.prototype.adjustWidth = function (t, e, n, r) {
								if ((void 0 === r && (r = !0), !t)) return this;
								var o = t.clientWidth,
									i = {};
								if (n && n.length && r) {
									var s = b(Q, {
										data: z.fromRows(n.rows.slice(0, 10)),
										header: this,
									});
									(s.ref = i), M(s, e.current);
								}
								for (var a = 0, u = this.columns; a < u.length; a++) {
									var c = u[a];
									!c.width && r
										? (c.width = Y(
												X(i.current.base, this.columns.indexOf(c))
										  ))
										: (c.width = Y(V(c.width, o)));
								}
								return n && n.length && r && M(null, e.current), this;
							}),
							(r.prototype.setSort = function (t) {
								for (var e = 0, r = this.columns; e < r.length; e++) {
									var o = r[e];
									void 0 === o.sort &&
										t.sort &&
										(o.sort = { enabled: !0 }),
										o.sort
											? "object" == typeof o.sort &&
											  (o.sort = n({ enabled: !0 }, o.sort))
											: (o.sort = { enabled: !1 });
								}
							}),
							(r.fromUserConfig = function (t) {
								if (!t.columns && !t.from) return null;
								var e = new r();
								if (t.from) e.columns = r.fromHTMLTable(t.from).columns;
								else {
									e.columns = [];
									for (var n = 0, o = t.columns; n < o.length; n++) {
										var i = o[n];
										"string" == typeof i
											? e.columns.push({ name: i })
											: "object" == typeof i && e.columns.push(i);
									}
								}
								return e.setSort(t), e;
							}),
							(r.fromHTMLTable = function (t) {
								for (
									var e = new r(),
										n = 0,
										o = t
											.querySelector("thead")
											.querySelectorAll("th");
									n < o.length;
									n++
								) {
									var i = o[n];
									e.columns.push({
										name: i.innerText,
										width: i.width,
									});
								}
								return e;
							}),
							r
						);
					})(d),
					tt = (function () {
						function t() {
							(this._callbacks = {}),
								(this._isDispatching = !1),
								(this._isHandled = {}),
								(this._isPending = {}),
								(this._lastID = 1);
						}
						return (
							(t.prototype.register = function (t) {
								var e = "ID_" + this._lastID++;
								return (this._callbacks[e] = t), e;
							}),
							(t.prototype.unregister = function (t) {
								if (!this._callbacks[t])
									throw Error(
										"Dispatcher.unregister(...): " +
											t +
											" does not map to a registered callback."
									);
								delete this._callbacks[t];
							}),
							(t.prototype.waitFor = function (t) {
								if (!this._isDispatching)
									throw Error(
										"Dispatcher.waitFor(...): Must be invoked while dispatching."
									);
								for (var e = 0; e < t.length; e++) {
									var n = t[e];
									if (this._isPending[n]) {
										if (!this._isHandled[n])
											throw Error(
												"Dispatcher.waitFor(...): Circular dependency detected while ' +\n            'waiting for " +
													n +
													"."
											);
									} else {
										if (!this._callbacks[n])
											throw Error(
												"Dispatcher.waitFor(...): " +
													n +
													" does not map to a registered callback."
											);
										this._invokeCallback(n);
									}
								}
							}),
							(t.prototype.dispatch = function (t) {
								if (this._isDispatching)
									throw Error(
										"Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."
									);
								this._startDispatching(t);
								try {
									for (var e in this._callbacks)
										this._isPending[e] || this._invokeCallback(e);
								} finally {
									this._stopDispatching();
								}
							}),
							(t.prototype.isDispatching = function () {
								return this._isDispatching;
							}),
							(t.prototype._invokeCallback = function (t) {
								(this._isPending[t] = !0),
									this._callbacks[t](this._pendingPayload),
									(this._isHandled[t] = !0);
							}),
							(t.prototype._startDispatching = function (t) {
								for (var e in this._callbacks)
									(this._isPending[e] = !1), (this._isHandled[e] = !1);
								(this._pendingPayload = t), (this._isDispatching = !0);
							}),
							(t.prototype._stopDispatching = function () {
								delete this._pendingPayload, (this._isDispatching = !1);
							}),
							t
						);
					})(),
					et = function () {},
					nt = (function (t) {
						function n(e) {
							var n = t.call(this) || this;
							return n.set(e), n;
						}
						return (
							e(n, t),
							(n.prototype.get = function () {
								return r(this, void 0, void 0, function () {
									var t;
									return o(this, function (e) {
										switch (e.label) {
											case 0:
												return [4, this.data()];
											case 1:
												return [
													2,
													{
														data: (t = e.sent()),
														total: t.length,
													},
												];
										}
									});
								});
							}),
							(n.prototype.set = function (t) {
								return (
									t instanceof Array
										? (this.data = function () {
												return t;
										  })
										: t instanceof Function && (this.data = t),
									this
								);
							}),
							n
						);
					})(et),
					rt = new ((function () {
						function t() {}
						return (
							(t.prototype.format = function (t, e) {
								return "[Grid.js] [" + e.toUpperCase() + "]: " + t;
							}),
							(t.prototype.error = function (t, e) {
								void 0 === e && (e = !1);
								var n = this.format(t, "error");
								if (e) throw Error(n);
								console.error(n);
							}),
							(t.prototype.warn = function (t) {
								console.warn(this.format(t, "warn"));
							}),
							(t.prototype.info = function (t) {
								console.info(this.format(t, "info"));
							}),
							t
						);
					})())(),
					ot = (function (t) {
						function r(e) {
							var n = t.call(this) || this;
							return (n.options = e), n;
						}
						return (
							e(r, t),
							(r.prototype.handler = function (t) {
								return "function" == typeof this.options.handle
									? this.options.handle(t)
									: t.ok
									? t.json()
									: (rt.error(
											"Could not fetch data: " +
												t.status +
												" - " +
												t.statusText,
											!0
									  ),
									  null);
							}),
							(r.prototype.get = function (t) {
								var e = n(n({}, this.options), t);
								return fetch(e.url, e)
									.then(this.handler.bind(this))
									.then(function (t) {
										return {
											data: e.then(t),
											total:
												"function" == typeof e.total
													? e.total(t)
													: void 0,
										};
									});
							}),
							r
						);
					})(et),
					it = (function () {
						function t() {}
						return (
							(t.createFromUserConfig = function (t) {
								var e = null;
								return (
									t.data && (e = new nt(t.data)),
									t.from &&
										((e = new nt(this.tableElementToArray(t.from))),
										(t.from.style.display = "none")),
									t.server && (e = new ot(t.server)),
									e ||
										rt.error(
											"Could not determine the storage type",
											!0
										),
									e
								);
							}),
							(t.tableElementToArray = function (t) {
								for (
									var e = [],
										n = 0,
										r = t
											.querySelector("tbody")
											.querySelectorAll("tr");
									n < r.length;
									n++
								) {
									for (
										var o = [],
											i = 0,
											s = r[n].querySelectorAll("td");
										i < s.length;
										i++
									) {
										var a = s[i];
										1 === a.childNodes.length &&
										a.childNodes[0].nodeType === Node.TEXT_NODE
											? o.push(a.innerText)
											: o.push(q(a.innerHTML));
									}
									e.push(o);
								}
								return e;
							}),
							t
						);
					})();
				function st(t) {
					for (var e = [], n = 1; n < arguments.length; n++)
						e[n - 1] = arguments[n];
					t &&
						t.forEach(function (t) {
							return t.apply(void 0, e);
						});
				}
				!(function (t) {
					(t[(t.Initiator = 0)] = "Initiator"),
						(t[(t.ServerFilter = 1)] = "ServerFilter"),
						(t[(t.ServerSort = 2)] = "ServerSort"),
						(t[(t.ServerLimit = 3)] = "ServerLimit"),
						(t[(t.Extractor = 4)] = "Extractor"),
						(t[(t.Transformer = 5)] = "Transformer"),
						(t[(t.Filter = 6)] = "Filter"),
						(t[(t.Sort = 7)] = "Sort"),
						(t[(t.Limit = 8)] = "Limit");
				})(J || (J = {}));
				var at,
					ut = (function () {
						function t(t) {
							(this.propsUpdatedCallback = new Set()),
								(this.beforeProcessCallback = new Set()),
								(this.afterProcessCallback = new Set()),
								(this._props = {}),
								(this.id = s()),
								t && this.setProps(t);
						}
						return (
							(t.prototype.process = function () {
								for (var t = [], e = 0; e < arguments.length; e++)
									t[e] = arguments[e];
								this.validateProps instanceof Function &&
									this.validateProps.apply(this, t),
									st.apply(void 0, i([this.beforeProcessCallback], t));
								var n = this._process.apply(this, t);
								return (
									st.apply(void 0, i([this.afterProcessCallback], t)),
									n
								);
							}),
							(t.prototype.setProps = function (t) {
								return (
									Object.assign(this._props, t),
									st(this.propsUpdatedCallback, this),
									this
								);
							}),
							Object.defineProperty(t.prototype, "props", {
								get: function () {
									return this._props;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(t.prototype.propsUpdated = function (t) {
								return this.propsUpdatedCallback.add(t), this;
							}),
							(t.prototype.beforeProcess = function (t) {
								return this.beforeProcessCallback.add(t), this;
							}),
							(t.prototype.afterProcess = function (t) {
								return this.afterProcessCallback.add(t), this;
							}),
							t
						);
					})(),
					ct = (function () {
						function t(t) {
							var e = this;
							(this._steps = new Map()),
								(this.cache = new Map()),
								(this.lastProcessorIndexUpdated = -1),
								(this.propsUpdatedCallback = new Set()),
								(this.afterRegisterCallback = new Set()),
								(this.updatedCallback = new Set()),
								(this.afterProcessCallback = new Set()),
								(this.onErrorCallback = new Set()),
								t &&
									t.forEach(function (t) {
										return e.register(t);
									});
						}
						return (
							(t.prototype.clearCache = function () {
								this.cache = new Map();
							}),
							(t.prototype.register = function (t, e) {
								if ((void 0 === e && (e = null), null === t.type))
									throw Error("Processor type is not defined");
								t.propsUpdated(this.processorPropsUpdated.bind(this)),
									this.addProcessorByPriority(t, e),
									this.afterRegistered(t);
							}),
							(t.prototype.addProcessorByPriority = function (t, e) {
								var n = this._steps.get(t.type);
								if (!n) {
									var r = [];
									this._steps.set(t.type, r), (n = r);
								}
								if (null === e || e < 0) n.push(t);
								else if (n[e]) {
									var o = n.slice(0, e - 1),
										i = n.slice(e + 1);
									this._steps.set(t.type, o.concat(t).concat(i));
								} else n[e] = t;
							}),
							Object.defineProperty(t.prototype, "steps", {
								get: function () {
									for (
										var t = [],
											e = 0,
											n = this.getSortedProcessorTypes();
										e < n.length;
										e++
									) {
										var r = n[e],
											o = this._steps.get(r);
										o && o.length && (t = t.concat(o));
									}
									return t.filter(function (t) {
										return t;
									});
								},
								enumerable: !1,
								configurable: !0,
							}),
							(t.prototype.getStepsByType = function (t) {
								return this.steps.filter(function (e) {
									return e.type === t;
								});
							}),
							(t.prototype.getSortedProcessorTypes = function () {
								return Object.keys(J)
									.filter(function (t) {
										return !isNaN(Number(t));
									})
									.map(function (t) {
										return Number(t);
									});
							}),
							(t.prototype.process = function (t) {
								return r(this, void 0, void 0, function () {
									var e, n, r, i, s, a, u;
									return o(this, function (o) {
										switch (o.label) {
											case 0:
												(e = this.lastProcessorIndexUpdated),
													(n = this.steps),
													(r = t),
													(o.label = 1);
											case 1:
												o.trys.push([1, 7, , 8]),
													(i = 0),
													(s = n),
													(o.label = 2);
											case 2:
												return i < s.length
													? ((a = s[i]),
													  this.findProcessorIndexByID(a.id) >= e
															? [4, a.process(r)]
															: [3, 4])
													: [3, 6];
											case 3:
												return (
													(r = o.sent()),
													this.cache.set(a.id, r),
													[3, 5]
												);
											case 4:
												(r = this.cache.get(a.id)), (o.label = 5);
											case 5:
												return i++, [3, 2];
											case 6:
												return [3, 8];
											case 7:
												throw (
													((u = o.sent()),
													rt.error(u),
													st(this.onErrorCallback, r),
													u)
												);
											case 8:
												return (
													(this.lastProcessorIndexUpdated =
														n.length),
													st(this.afterProcessCallback, r),
													[2, r]
												);
										}
									});
								});
							}),
							(t.prototype.findProcessorIndexByID = function (t) {
								return this.steps.findIndex(function (e) {
									return e.id == t;
								});
							}),
							(t.prototype.setLastProcessorIndex = function (t) {
								var e = this.findProcessorIndexByID(t.id);
								this.lastProcessorIndexUpdated > e &&
									(this.lastProcessorIndexUpdated = e);
							}),
							(t.prototype.processorPropsUpdated = function (t) {
								this.setLastProcessorIndex(t),
									st(this.propsUpdatedCallback),
									st(this.updatedCallback, t);
							}),
							(t.prototype.afterRegistered = function (t) {
								this.setLastProcessorIndex(t),
									st(this.afterRegisterCallback),
									st(this.updatedCallback, t);
							}),
							(t.prototype.propsUpdated = function (t) {
								return this.propsUpdatedCallback.add(t), this;
							}),
							(t.prototype.afterRegister = function (t) {
								return this.afterRegisterCallback.add(t), this;
							}),
							(t.prototype.updated = function (t) {
								return this.updatedCallback.add(t), this;
							}),
							(t.prototype.afterProcess = function (t) {
								return this.afterProcessCallback.add(t), this;
							}),
							(t.prototype.onError = function (t) {
								return this.onErrorCallback.add(t), this;
							}),
							t
						);
					})(),
					lt = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							Object.defineProperty(n.prototype, "type", {
								get: function () {
									return J.Extractor;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(n.prototype._process = function (t) {
								return r(this, void 0, void 0, function () {
									return o(this, function (e) {
										switch (e.label) {
											case 0:
												return [4, this.props.storage.get(t)];
											case 1:
												return [2, e.sent()];
										}
									});
								});
							}),
							n
						);
					})(ut),
					pt = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							Object.defineProperty(n.prototype, "type", {
								get: function () {
									return J.Transformer;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(n.prototype._process = function (t) {
								return z.fromStorageResponse(t);
							}),
							n
						);
					})(ut),
					ht = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							Object.defineProperty(n.prototype, "type", {
								get: function () {
									return J.Initiator;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(n.prototype._process = function () {
								return {
									url: this.props.serverStorageOptions.url,
									method: this.props.serverStorageOptions.method,
								};
							}),
							n
						);
					})(ut),
					ft = (function () {
						function t() {}
						return (
							(t.createFromConfig = function (t) {
								var e = new ct();
								return (
									t.storage instanceof ot &&
										e.register(
											new ht({ serverStorageOptions: t.server })
										),
									e.register(new lt({ storage: t.storage })),
									e.register(new pt()),
									e
								);
							}),
							t
						);
					})(),
					dt = (function () {
						function t(e) {
							var r = n(n({}, t.defaultConfig()), e);
							(this._userConfig = {}), Object.assign(this, r);
						}
						return (
							(t.prototype.assign = function (t) {
								for (var e = 0, n = Object.keys(t); e < n.length; e++) {
									var r = n[e];
									"_userConfig" !== r && (this[r] = t[r]);
								}
								return this;
							}),
							(t.prototype.update = function (e) {
								return e
									? ((this._userConfig = n(
											n({}, this._userConfig),
											e
									  )),
									  this.assign(t.fromUserConfig(this._userConfig)),
									  this)
									: this;
							}),
							(t.defaultConfig = function () {
								return {
									dispatcher: new tt(),
									tempRef: {},
									width: "100%",
									autoWidth: !0,
								};
							}),
							(t.fromUserConfig = function (e) {
								var r = new t(e);
								return (
									(r._userConfig = e),
									r.assign({ storage: it.createFromUserConfig(e) }),
									r.assign({ pipeline: ft.createFromConfig(r) }),
									"boolean" == typeof e.sort &&
										e.sort &&
										r.assign({ sort: { multiColumn: !0 } }),
									r.assign({ header: Z.fromUserConfig(r) }),
									r.assign({
										pagination: n(
											{
												enabled:
													!0 === e.pagination ||
													e.pagination instanceof Object,
											},
											e.pagination
										),
									}),
									r.assign({
										search: n(
											{
												enabled:
													!0 === e.search ||
													e.search instanceof Object,
											},
											e.search
										),
									}),
									r.assign({ translator: new W(e.language) }),
									r
								);
							}),
							t
						);
					})();
				function _t() {
					for (var t = [], e = 0; e < arguments.length; e++)
						t[e] = arguments[e];
					return (
						"gridjs" +
						t.reduce(function (t, e) {
							return t + "-" + e;
						}, "")
					);
				}
				function yt() {
					for (var t = [], e = 0; e < arguments.length; e++)
						t[e] = arguments[e];
					return t
						.filter(function (t) {
							return t;
						})
						.reduce(function (t, e) {
							return (t || "") + " " + e;
						}, "")
						.trim();
				}
				(exports.Config = dt),
					(function (t) {
						(t[(t.Init = 0)] = "Init"),
							(t[(t.Loading = 1)] = "Loading"),
							(t[(t.Loaded = 2)] = "Loaded"),
							(t[(t.Rendered = 3)] = "Rendered"),
							(t[(t.Error = 4)] = "Error");
					})(at || (at = {}));
				var gt,
					mt,
					vt,
					bt = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.content = function () {
								return this.props.column &&
									"function" == typeof this.props.column.formatter
									? this.props.column.formatter(
											this.props.cell.data,
											this.props.row,
											this.props.column
									  )
									: this.props.cell.data;
							}),
							(n.prototype.render = function () {
								return b(
									"td",
									{
										role: this.props.role,
										colSpan: this.props.colSpan,
										className: yt(_t("td"), this.props.className),
									},
									this.content()
								);
							}),
							n
						);
					})(B),
					wt = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.getColumn = function (t) {
								return this.props.header
									? this.props.header.columns[t]
									: null;
							}),
							(n.prototype.render = function () {
								var t = this;
								return this.props.children
									? b(
											"tr",
											{ className: _t("tr") },
											this.props.children
									  )
									: b(
											"tr",
											{ className: _t("tr") },
											this.props.row.cells.map(function (e, n) {
												return b(bt, {
													key: e.id,
													cell: e,
													row: t.props.row,
													column: t.getColumn(n),
												});
											})
									  );
							}),
							n
						);
					})(B),
					kt = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.render = function () {
								return b(
									wt,
									null,
									b(bt, {
										role: "alert",
										colSpan: this.props.colSpan,
										cell: new K(this.props.message),
										className: yt(
											_t("message"),
											this.props.className
												? this.props.className
												: null
										),
									})
								);
							}),
							n
						);
					})(B),
					xt = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.headerLength = function () {
								return this.props.header
									? this.props.header.columns.length
									: 0;
							}),
							(n.prototype.render = function () {
								var t = this;
								return b(
									"tbody",
									{ className: _t("tbody") },
									this.props.data &&
										this.props.data.rows.map(function (e) {
											return b(wt, {
												key: e.id,
												row: e,
												header: t.props.header,
											});
										}),
									this.props.status === at.Loading &&
										(!this.props.data ||
											0 === this.props.data.length) &&
										b(kt, {
											message: this._("loading"),
											colSpan: this.headerLength(),
											className: _t("loading"),
										}),
									this.props.status === at.Loaded &&
										this.props.data &&
										0 === this.props.data.length &&
										b(kt, {
											message: this._("noRecordsFound"),
											colSpan: this.headerLength(),
											className: _t("notfound"),
										}),
									this.props.status === at.Error &&
										b(kt, {
											message: this._("error"),
											colSpan: this.headerLength(),
											className: _t("error"),
										})
								);
							}),
							n
						);
					})(B),
					St = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.validateProps = function () {
								for (
									var t = 0, e = this.props.columns;
									t < e.length;
									t++
								) {
									var n = e[t];
									void 0 === n.direction && (n.direction = 1),
										1 !== n.direction &&
											-1 !== n.direction &&
											rt.error(
												"Invalid sort direction " + n.direction
											);
								}
							}),
							Object.defineProperty(n.prototype, "type", {
								get: function () {
									return J.Sort;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(n.prototype.compare = function (t, e) {
								return t > e ? 1 : t < e ? -1 : 0;
							}),
							(n.prototype.compareWrapper = function (t, e) {
								for (
									var n = 0, r = 0, o = this.props.columns;
									r < o.length;
									r++
								) {
									var i = o[r];
									if (0 !== n) break;
									var s = t.cells[i.index].data,
										a = e.cells[i.index].data;
									"function" == typeof i.compare
										? (n |= i.compare(s, a) * i.direction)
										: (n |= this.compare(s, a) * i.direction);
								}
								return n;
							}),
							(n.prototype._process = function (t) {
								var e = i(t.rows);
								return e.sort(this.compareWrapper.bind(this)), new z(e);
							}),
							n
						);
					})(ut),
					Pt = (function (t) {
						function n(e) {
							var n = t.call(this) || this;
							return (
								(n.dispatcher = e),
								(n._state = n.getInitialState()),
								e.register(n._handle.bind(n)),
								n
							);
						}
						return (
							e(n, t),
							(n.prototype._handle = function (t) {
								this.handle(t.type, t.payload);
							}),
							(n.prototype.setState = function (t) {
								var e = this._state;
								(this._state = t), this.emit("updated", t, e);
							}),
							Object.defineProperty(n.prototype, "state", {
								get: function () {
									return this._state;
								},
								enumerable: !1,
								configurable: !0,
							}),
							n
						);
					})(
						(function () {
							function t() {}
							return (
								(t.prototype.init = function (t) {
									this.callbacks || (this.callbacks = {}),
										t &&
											!this.callbacks[t] &&
											(this.callbacks[t] = []);
								}),
								(t.prototype.on = function (t, e) {
									return this.init(t), this.callbacks[t].push(e), this;
								}),
								(t.prototype.off = function (t, e) {
									var n = t;
									return (
										this.init(),
										this.callbacks[n] &&
										0 !== this.callbacks[n].length
											? ((this.callbacks[n] = this.callbacks[
													n
											  ].filter(function (t) {
													return t != e;
											  })),
											  this)
											: this
									);
								}),
								(t.prototype.emit = function (t) {
									for (var e = [], n = 1; n < arguments.length; n++)
										e[n - 1] = arguments[n];
									var r = t;
									return (
										this.init(r),
										this.callbacks[r].length > 0 &&
											(this.callbacks[r].forEach(function (t) {
												return t.apply(void 0, e);
											}),
											!0)
									);
								}),
								t
							);
						})()
					),
					Ct = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.getInitialState = function () {
								return [];
							}),
							(n.prototype.handle = function (t, e) {
								if ("SORT_COLUMN" === t) {
									var n = e.index,
										r = e.direction,
										o = e.multi,
										i = e.compare;
									this.sortColumn(n, r, o, i);
								} else
									"SORT_COLUMN_TOGGLE" === t &&
										((n = e.index),
										(o = e.multi),
										(i = e.compare),
										this.sortToggle(n, o, i));
							}),
							(n.prototype.sortToggle = function (t, e, n) {
								var r = i(this.state).find(function (e) {
									return e.index === t;
								});
								r
									? this.sortColumn(
											t,
											1 === r.direction ? -1 : 1,
											e,
											n
									  )
									: this.sortColumn(t, 1, e, n);
							}),
							(n.prototype.sortColumn = function (t, e, n, r) {
								var o = i(this.state),
									s = o.length,
									a = o.find(function (e) {
										return e.index === t;
									}),
									u = !1,
									c = !1,
									l = !1,
									p = !1;
								if (
									(void 0 !== a
										? n
											? -1 === a.direction
												? (l = !0)
												: (p = !0)
											: 1 === s
											? (p = !0)
											: s > 1 && ((c = !0), (u = !0))
										: 0 === s
										? (u = !0)
										: s > 0 && !n
										? ((u = !0), (c = !0))
										: s > 0 && n && (u = !0),
									c && (o = []),
									u)
								)
									o.push({ index: t, direction: e, compare: r });
								else if (p) {
									var h = o.indexOf(a);
									o[h].direction = e;
								} else if (l) {
									var f = o.indexOf(a);
									o.splice(f, 1);
								}
								this.setState(o);
							}),
							n
						);
					})(Pt),
					Nt = (function () {
						function t(t) {
							this.dispatcher = t;
						}
						return (
							(t.prototype.dispatch = function (t, e) {
								this.dispatcher.dispatch({ type: t, payload: e });
							}),
							t
						);
					})(),
					Et = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.sortColumn = function (t, e, n, r) {
								this.dispatch("SORT_COLUMN", {
									index: t,
									direction: e,
									multi: n,
									compare: r,
								});
							}),
							(n.prototype.sortToggle = function (t, e, n) {
								this.dispatch("SORT_COLUMN_TOGGLE", {
									index: t,
									multi: e,
									compare: n,
								});
							}),
							n
						);
					})(Nt),
					Ot = (function (t) {
						function r() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(r, t),
							Object.defineProperty(r.prototype, "type", {
								get: function () {
									return J.ServerSort;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(r.prototype._process = function (t) {
								var e = {};
								return (
									this.props.url &&
										(e.url = this.props.url(
											t.url,
											this.props.columns
										)),
									this.props.body &&
										(e.body = this.props.body(
											t.body,
											this.props.columns
										)),
									n(n({}, t), e)
								);
							}),
							r
						);
					})(ut),
					Tt = (function (t) {
						function r(e, n) {
							var r = t.call(this, e, n) || this;
							return (
								(r.actions = new Et(r.config.dispatcher)),
								(r.store = new Ct(r.config.dispatcher)),
								e.enabled &&
									((r.sortProcessor = r.getOrCreateSortProcessor()),
									r.store.on("updated", r.storeUpdated.bind(r)),
									(r.state = { direction: 0 })),
								r
							);
						}
						return (
							e(r, t),
							(r.prototype.componentWillUnmount = function () {
								this.store.off("updated", this.storeUpdated.bind(this));
							}),
							(r.prototype.storeUpdated = function () {
								var t = this,
									e = this.store.state.find(function (e) {
										return e.index === t.props.index;
									});
								e
									? this.setState({ direction: e.direction })
									: this.setState({ direction: 0 });
							}),
							(r.prototype.getOrCreateSortProcessor = function () {
								var t = this,
									e = J.Sort;
								this.config.sort &&
									"object" == typeof this.config.sort.server &&
									(e = J.ServerSort);
								var r,
									o = this.config.pipeline.getStepsByType(e);
								return (
									o.length > 1 &&
										rt.warn(
											"There are more than sorting pipeline registered, selecting the first one"
										),
									o.length > 0
										? (r = o[0])
										: (this.store.on("updated", function (e) {
												t.sortProcessor.setProps({ columns: e });
										  }),
										  (r =
												e === J.ServerSort
													? new Ot(
															n(
																{ columns: this.store.state },
																this.config.sort.server
															)
													  )
													: new St({ columns: this.store.state })),
										  this.config.pipeline.register(r)),
									r
								);
							}),
							(r.prototype.changeDirection = function (t) {
								t.preventDefault(),
									t.stopPropagation(),
									this.actions.sortToggle(
										this.props.index,
										!0 === t.shiftKey && this.config.sort.multiColumn,
										this.props.compare
									);
							}),
							(r.prototype.render = function () {
								if (!this.props.enabled) return null;
								var t = this.state.direction,
									e = "neutral";
								return (
									1 === t ? (e = "asc") : -1 === t && (e = "desc"),
									b("button", {
										tabIndex: -1,
										"aria-label": this._(
											"sort.sort" + (1 === t ? "Desc" : "Asc")
										),
										title: this._(
											"sort.sort" + (1 === t ? "Desc" : "Asc")
										),
										className: yt(_t("sort"), _t("sort", e)),
										onClick: this.changeDirection.bind(this),
									})
								);
							}),
							r
						);
					})(B),
					Dt = (function (t) {
						function r() {
							var e = (null !== t && t.apply(this, arguments)) || this;
							return (e.sortRef = {}), e;
						}
						return (
							e(r, t),
							(r.prototype.isSortable = function () {
								return this.props.column.sort.enabled;
							}),
							(r.prototype.onClick = function (t) {
								t.stopPropagation(),
									this.isSortable() &&
										this.sortRef.current.changeDirection(t);
							}),
							(r.prototype.keyDown = function (t) {
								this.isSortable() && 13 === t.which && this.onClick(t);
							}),
							(r.prototype.render = function () {
								var t = yt(
										_t("th"),
										this.isSortable() ? _t("th", "sort") : null
									),
									e = {};
								return (
									this.isSortable() && (e.tabIndex = 0),
									b(
										"th",
										n(
											{
												className: t,
												onClick: this.onClick.bind(this),
												style: { width: this.props.column.width },
												onKeyDown: this.keyDown.bind(this),
											},
											e
										),
										this.props.column.name,
										this.isSortable() &&
											b(
												Tt,
												n(
													{
														ref: this.sortRef,
														index: this.props.index,
													},
													this.props.column.sort
												)
											)
									)
								);
							}),
							r
						);
					})(B),
					Lt = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.render = function () {
								return this.props.header
									? b(
											"thead",
											{
												key: this.props.header.id,
												className: _t("thead"),
											},
											b(
												wt,
												null,
												this.props.header.columns.map(function (
													t,
													e
												) {
													return b(Dt, { column: t, index: e });
												})
											)
									  )
									: null;
							}),
							n
						);
					})(B),
					Ut = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.getStyle = function () {
								var t = {};
								return (
									this.props.width && (t.width = this.props.width), t
								);
							}),
							(n.prototype.render = function () {
								return b(
									"table",
									{
										role: "grid",
										className: _t("table"),
										style: this.getStyle(),
									},
									b(Lt, { header: this.props.header }),
									b(xt, {
										data: this.props.data,
										status: this.props.status,
										header: this.props.header,
									})
								);
							}),
							n
						);
					})(B),
					jt = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							Object.defineProperty(n.prototype, "type", {
								get: function () {
									return J.Filter;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(n.prototype._process = function (t) {
								return this.props.keyword
									? ((n = t),
									  (e = (e = String(
											this.props.keyword
									  ).trim()).replace(
											/[-[\]{}()*+?.,\\^$|#\s]/g,
											"\\$&"
									  )),
									  new z(
											n.rows.filter(function (t) {
												return t.cells.some(function (t) {
													if (!t || !t.data) return !1;
													var n = "";
													if ("object" == typeof t.data) {
														var r = t.data;
														r.props.content &&
															(n = r.props.content);
													} else n = String(t.data);
													return new RegExp(e, "gi").test(n);
												});
											})
									  ))
									: t;
								var e, n;
							}),
							n
						);
					})(ut),
					It = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.getInitialState = function () {
								return { keyword: null };
							}),
							(n.prototype.handle = function (t, e) {
								if ("SEARCH_KEYWORD" === t) {
									var n = e.keyword;
									this.search(n);
								}
							}),
							(n.prototype.search = function (t) {
								this.setState({ keyword: t });
							}),
							n
						);
					})(Pt),
					Rt = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.search = function (t) {
								this.dispatch("SEARCH_KEYWORD", { keyword: t });
							}),
							n
						);
					})(Nt),
					At = (function (t) {
						function r() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(r, t),
							Object.defineProperty(r.prototype, "type", {
								get: function () {
									return J.ServerFilter;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(r.prototype._process = function (t) {
								if (!this.props.keyword) return t;
								var e = {};
								return (
									this.props.url &&
										(e.url = this.props.url(
											t.url,
											this.props.keyword
										)),
									this.props.body &&
										(e.body = this.props.body(
											t.body,
											this.props.keyword
										)),
									n(n({}, t), e)
								);
							}),
							r
						);
					})(ut),
					Mt = (function (t) {
						function n(e, n) {
							var r = t.call(this, e, n) || this;
							(r.actions = new Rt(r.config.dispatcher)),
								(r.store = new It(r.config.dispatcher));
							var o = e.enabled,
								i = e.keyword;
							if (o) {
								r.actions.search(i),
									r.store.on("updated", r.storeUpdated.bind(r));
								var s;
								(s = e.server
									? new At({
											keyword: e.keyword,
											url: e.server.url,
											body: e.server.body,
									  })
									: new jt({ keyword: e.keyword })),
									(r.searchProcessor = s),
									r.config.pipeline.register(s);
							}
							return r;
						}
						return (
							e(n, t),
							(n.prototype.storeUpdated = function (t) {
								this.searchProcessor.setProps({ keyword: t.keyword });
							}),
							(n.prototype.onChange = function (t) {
								var e = t.target.value;
								this.actions.search(e);
							}),
							(n.prototype.render = function () {
								if (!this.props.enabled) return null;
								var t,
									e,
									n,
									r = this.onChange.bind(this);
								return (
									this.searchProcessor instanceof At &&
										((t = r),
										(e = this.props.debounceTimeout),
										(r = function () {
											for (
												var r = [], o = 0;
												o < arguments.length;
												o++
											)
												r[o] = arguments[o];
											return new Promise(function (o) {
												n && clearTimeout(n),
													(n = setTimeout(function () {
														return o(t.apply(void 0, r));
													}, e));
											});
										})),
									b(
										"div",
										{ className: _t("search") },
										b("input", {
											type: "search",
											placeholder: this._("search.placeholder"),
											"aria-label": this._("search.placeholder"),
											onInput: r,
											className: yt(
												_t("input"),
												_t("search", "input")
											),
											value: this.store.state.keyword,
										})
									)
								);
							}),
							(n.defaultProps = { debounceTimeout: 250 }),
							n
						);
					})(B),
					Ht = 0,
					Ft = [],
					Wt = a.__r,
					Bt = a.diffed,
					Gt = a.__c,
					qt = a.unmount;
				function Kt(t, e) {
					a.__h && a.__h(mt, t, Ht || e), (Ht = 0);
					var n = mt.__H || (mt.__H = { __: [], __h: [] });
					return t >= n.__.length && n.__.push({}), n.__[t];
				}
				function $t(t) {
					return (
						(Ht = 5),
						(function (t, e) {
							var n = Kt(gt++, 7);
							return (function (t, e) {
								return (
									!t ||
									e.some(function (e, n) {
										return e !== t[n];
									})
								);
							})(n.__H, e)
								? ((n.__H = e), (n.__h = t), (n.__ = t()))
								: n.__;
						})(function () {
							return { current: t };
						}, [])
					);
				}
				function zt() {
					Ft.some(function (t) {
						if (t.__P)
							try {
								t.__H.__h.forEach(Vt),
									t.__H.__h.forEach(Yt),
									(t.__H.__h = []);
							} catch (e) {
								return (t.__H.__h = []), a.__e(e, t.__v), !0;
							}
					}),
						(Ft = []);
				}
				function Vt(t) {
					"function" == typeof t.u && t.u();
				}
				function Yt(t) {
					t.u = t.__();
				}
				(a.__r = function (t) {
					Wt && Wt(t), (gt = 0);
					var e = (mt = t.__c).__H;
					e && (e.__h.forEach(Vt), e.__h.forEach(Yt), (e.__h = []));
				}),
					(a.diffed = function (t) {
						Bt && Bt(t);
						var e = t.__c;
						e &&
							e.__H &&
							e.__H.__h.length &&
							((1 !== Ft.push(e) && vt === a.requestAnimationFrame) ||
								(
									(vt = a.requestAnimationFrame) ||
									function (t) {
										var e,
											n = function () {
												clearTimeout(r),
													cancelAnimationFrame(e),
													setTimeout(t);
											},
											r = setTimeout(n, 100);
										"undefined" != typeof window &&
											(e = requestAnimationFrame(n));
									}
								)(zt));
					}),
					(a.__c = function (t, e) {
						e.some(function (t) {
							try {
								t.__h.forEach(Vt),
									(t.__h = t.__h.filter(function (t) {
										return !t.__ || Yt(t);
									}));
							} catch (n) {
								e.some(function (t) {
									t.__h && (t.__h = []);
								}),
									(e = []),
									a.__e(n, t.__v);
							}
						}),
							Gt && Gt(t, e);
					}),
					(a.unmount = function (t) {
						qt && qt(t);
						var e = t.__c;
						if (e && e.__H)
							try {
								e.__H.__.forEach(Vt);
							} catch (t) {
								a.__e(t, e.__v);
							}
					});
				var Xt = (function (t) {
						function r(e, n) {
							var r = t.call(this, e, n) || this;
							return (
								(r.headerRef = $t(null)),
								(r.state = { isActive: !0 }),
								r
							);
						}
						return (
							e(r, t),
							(r.prototype.componentDidMount = function () {
								0 === this.headerRef.current.children.length &&
									this.setState({ isActive: !1 });
							}),
							(r.prototype.render = function () {
								var t = H(this.context);
								return this.state.isActive
									? b(
											"div",
											{ ref: this.headerRef, className: _t("head") },
											b(Mt, n({}, t.search))
									  )
									: null;
							}),
							r
						);
					})(B),
					Jt = (function (t) {
						function n() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(n, t),
							(n.prototype.validateProps = function () {
								if (
									isNaN(Number(this.props.limit)) ||
									isNaN(Number(this.props.page))
								)
									throw Error("Invalid parameters passed");
							}),
							Object.defineProperty(n.prototype, "type", {
								get: function () {
									return J.Limit;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(n.prototype._process = function (t) {
								var e = this.props.page,
									n = e * this.props.limit,
									r = (e + 1) * this.props.limit;
								return new z(t.rows.slice(n, r));
							}),
							n
						);
					})(ut),
					Qt = (function (t) {
						function r() {
							return (null !== t && t.apply(this, arguments)) || this;
						}
						return (
							e(r, t),
							Object.defineProperty(r.prototype, "type", {
								get: function () {
									return J.ServerLimit;
								},
								enumerable: !1,
								configurable: !0,
							}),
							(r.prototype._process = function (t) {
								var e = {};
								return (
									this.props.url &&
										(e.url = this.props.url(
											t.url,
											this.props.page,
											this.props.limit
										)),
									this.props.body &&
										(e.body = this.props.body(
											t.body,
											this.props.page,
											this.props.limit
										)),
									n(n({}, t), e)
								);
							}),
							r
						);
					})(ut),
					Zt = (function (t) {
						function n(e, n) {
							var r = t.call(this, e, n) || this;
							return (
								(r.state = {
									limit: e.limit,
									page: e.page || 0,
									total: 0,
								}),
								r
							);
						}
						return (
							e(n, t),
							(n.prototype.componentWillMount = function () {
								var t = this;
								if (this.props.enabled) {
									var e = void 0;
									this.props.server
										? ((e = new Qt({
												limit: this.state.limit,
												page: this.state.page,
												url: this.props.server.url,
												body: this.props.server.body,
										  })),
										  this.config.pipeline.afterProcess(function (e) {
												t.setTotal(e.length);
										  }))
										: (e = new Jt({
												limit: this.state.limit,
												page: this.state.page,
										  })).beforeProcess(function (e) {
												return r(t, void 0, void 0, function () {
													return o(this, function (t) {
														return this.setTotal(e.length), [2];
													});
												});
										  }),
										(this.processor = e),
										this.config.pipeline.register(e),
										this.config.pipeline.onError(function () {
											t.setState({ total: 0, page: 0 });
										});
								}
							}),
							(n.prototype.componentDidMount = function () {
								var t = this;
								H(this.context).pipeline.updated(function (e) {
									e !== t.processor && t.setPage(0);
								});
							}),
							Object.defineProperty(n.prototype, "pages", {
								get: function () {
									return Math.ceil(
										this.state.total / this.state.limit
									);
								},
								enumerable: !1,
								configurable: !0,
							}),
							(n.prototype.setPage = function (t) {
								if (t >= this.pages || t < 0 || t === this.state.page)
									return null;
								this.setState({ page: t }),
									this.processor.setProps({ page: t });
							}),
							(n.prototype.setTotal = function (t) {
								this.setState({ total: t });
							}),
							(n.prototype.render = function () {
								var t = this;
								if (!this.props.enabled) return null;
								var e = Math.min(this.pages, this.props.buttonsCount),
									n = Math.min(this.state.page, Math.floor(e / 2));
								return (
									this.state.page + Math.floor(e / 2) >= this.pages &&
										(n = e - (this.pages - this.state.page)),
									b(
										"div",
										{ className: _t("pagination") },
										this.props.summary &&
											this.state.total > 0 &&
											b(
												"div",
												{
													role: "status",
													className: _t("summary"),
													title: this._(
														"pagination.navigate",
														this.state.page + 1,
														this.pages
													),
												},
												this._("pagination.showing"),
												" ",
												b(
													"b",
													null,
													this._(
														"" +
															(this.state.page *
																this.state.limit +
																1)
													)
												),
												" ",
												this._("pagination.to"),
												" ",
												b(
													"b",
													null,
													this._(
														"" +
															Math.min(
																(this.state.page + 1) *
																	this.state.limit,
																this.state.total
															)
													)
												),
												" ",
												this._("pagination.of"),
												" ",
												b("b", null, this._("" + this.state.total)),
												" ",
												this._("pagination.results")
											),
										b(
											"div",
											{ className: _t("pages") },
											this.props.prevButton &&
												b(
													"button",
													{
														tabIndex: 0,
														disabled: 0 === this.state.page,
														onClick: this.setPage.bind(
															this,
															this.state.page - 1
														),
													},
													this._("pagination.previous")
												),
											this.pages > e &&
												this.state.page - n > 0 &&
												b(
													k,
													null,
													b(
														"button",
														{
															tabIndex: 0,
															onClick: this.setPage.bind(
																this,
																0
															),
															title: this._(
																"pagination.firstPage"
															),
														},
														this._("1")
													),
													b(
														"button",
														{ className: _t("spread") },
														"..."
													)
												),
											Array.from(Array(e).keys())
												.map(function (e) {
													return t.state.page + (e - n);
												})
												.map(function (e) {
													return b(
														"button",
														{
															tabIndex: 0,
															onClick: t.setPage.bind(t, e),
															className:
																t.state.page === e
																	? _t("currentPage")
																	: null,
															title: t._(
																"pagination.page",
																e + 1
															),
														},
														t._("" + (e + 1))
													);
												}),
											this.pages > e &&
												this.pages > this.state.page + n + 1 &&
												b(
													k,
													null,
													b(
														"button",
														{
															tabIndex: -1,
															className: _t("spread"),
														},
														"..."
													),
													b(
														"button",
														{
															tabIndex: 0,
															onClick: this.setPage.bind(
																this,
																this.pages - 1
															),
															title: this._(
																"pagination.page",
																this.pages
															),
														},
														this._("" + this.pages)
													)
												),
											this.props.nextButton &&
												b(
													"button",
													{
														tabIndex: 0,
														disabled:
															this.pages ===
																this.state.page + 1 ||
															0 === this.pages,
														onClick: this.setPage.bind(
															this,
															this.state.page + 1
														),
													},
													this._("pagination.next")
												)
										)
									)
								);
							}),
							(n.defaultProps = {
								summary: !0,
								nextButton: !0,
								prevButton: !0,
								buttonsCount: 3,
								limit: 10,
							}),
							n
						);
					})(B),
					te = (function (t) {
						function r(e, n) {
							var r = t.call(this, e, n) || this;
							return (
								(r.footerRef = $t(null)),
								(r.state = { isActive: !0 }),
								r
							);
						}
						return (
							e(r, t),
							(r.prototype.componentDidMount = function () {
								0 === this.footerRef.current.children.length &&
									this.setState({ isActive: !1 });
							}),
							(r.prototype.render = function () {
								var t = H(this.context);
								return this.state.isActive
									? b(
											"div",
											{
												ref: this.footerRef,
												className: _t("footer"),
											},
											b(Zt, n({}, t.pagination))
									  )
									: null;
							}),
							r
						);
					})(B),
					ee = (function (t) {
						function n(e, n) {
							var r = t.call(this, e, n) || this;
							return (
								(r.configContext = (function (t) {
									var e = {},
										n = {
											__c: "__cC" + f++,
											__: null,
											Consumer: function (t, e) {
												return t.children(e);
											},
											Provider: function (t) {
												var r,
													o = this;
												return (
													this.getChildContext ||
														((r = []),
														(this.getChildContext = function () {
															return (e[n.__c] = o), e;
														}),
														(this.shouldComponentUpdate = function (
															t
														) {
															o.props.value !== t.value &&
																r.some(function (e) {
																	(e.context = t.value), C(e);
																});
														}),
														(this.sub = function (t) {
															r.push(t);
															var e = t.componentWillUnmount;
															t.componentWillUnmount = function () {
																r.splice(r.indexOf(t), 1),
																	e && e.call(t);
															};
														})),
													t.children
												);
											},
										};
									return (
										(n.Consumer.contextType = n),
										(n.Provider.__ = n),
										n
									);
								})()),
								(r.state = {
									status: at.Loading,
									header: e.header,
									data: null,
								}),
								r
							);
						}
						return (
							e(n, t),
							(n.prototype.processPipeline = function () {
								return r(this, void 0, void 0, function () {
									var t, e, n;
									return o(this, function (r) {
										switch (r.label) {
											case 0:
												this.setState({ status: at.Loading }),
													(r.label = 1);
											case 1:
												return (
													r.trys.push([1, 3, , 4]),
													(t = this.setState),
													(e = {}),
													[4, this.props.pipeline.process()]
												);
											case 2:
												return (
													t.apply(this, [
														((e.data = r.sent()),
														(e.status = at.Loaded),
														e),
													]),
													[3, 4]
												);
											case 3:
												return (
													(n = r.sent()),
													rt.error(n),
													this.setState({
														status: at.Error,
														data: null,
													}),
													[3, 4]
												);
											case 4:
												return [2];
										}
									});
								});
							}),
							(n.prototype.componentDidMount = function () {
								return r(this, void 0, void 0, function () {
									var t,
										e = this;
									return o(this, function (n) {
										switch (n.label) {
											case 0:
												return (
													(t = this.props.config),
													[4, this.processPipeline()]
												);
											case 1:
												return (
													n.sent(),
													t.header &&
														this.state.data &&
														this.state.data.length &&
														this.setState({
															header: t.header.adjustWidth(
																t.container,
																t.tempRef,
																this.state.data,
																t.autoWidth
															),
														}),
													this.props.pipeline.updated(function () {
														return r(
															e,
															void 0,
															void 0,
															function () {
																return o(this, function (t) {
																	switch (t.label) {
																		case 0:
																			return [
																				4,
																				this.processPipeline(),
																			];
																		case 1:
																			return t.sent(), [2];
																	}
																});
															}
														);
													}),
													[2]
												);
										}
									});
								});
							}),
							(n.prototype.render = function () {
								return b(
									this.configContext.Provider,
									{ value: this.props.config },
									b(
										"div",
										{
											role: "complementary",
											className: yt(
												"gridjs",
												_t("container"),
												this.state.status === at.Loading
													? _t("loading")
													: null
											),
											style: { width: this.props.width },
										},
										this.state.status === at.Loading &&
											b("div", { className: _t("loading-bar") }),
										b(Xt, null),
										b(
											"div",
											{
												className: _t("wrapper"),
												style: { width: this.props.width },
											},
											b(Ut, {
												data: this.state.data,
												header: this.state.header,
												width: this.props.width,
												status: this.state.status,
											})
										),
										b(te, null)
									),
									b("div", {
										ref: this.props.config.tempRef,
										id: "gridjs-temp",
										className: _t("temp"),
									})
								);
							}),
							n
						);
					})(B),
					ne = (function () {
						function t(t) {
							this.config = new dt().update(t);
						}
						return (
							(t.prototype.updateConfig = function (t) {
								return this.config.update(t), this;
							}),
							(t.prototype.createElement = function () {
								return b(ee, {
									config: this.config,
									pipeline: this.config.pipeline,
									header: this.config.header,
									width: this.config.width,
								});
							}),
							(t.prototype.forceRender = function () {
								return (
									(this.config && this.config.container) ||
										rt.error(
											"Container is empty. Make sure you call render() before forceRender()",
											!0
										),
									this.config.pipeline.clearCache(),
									M(null, this.config.container),
									M(this.createElement(), this.config.container),
									this
								);
							}),
							(t.prototype.render = function (t) {
								return (
									t ||
										rt.error("Container element cannot be null", !0),
									t.childNodes.length > 0
										? (rt.error(
												"The container element " +
													t +
													" is not empty. Make sure the container is empty and call render() again"
										  ),
										  this)
										: ((this.config.container = t),
										  M(this.createElement(), t),
										  this)
								);
							}),
							t
						);
					})();
				exports.Grid = ne;
			},
			{},
		],
		yhIm: [function (require, module, exports) {}, {}],
		H99C: [
			function (require, module, exports) {
				"use strict";
				var r,
					t = require("papaparse"),
					e = require("gridjs");
				function n(r) {
					return u(r) || i(r) || o(r) || a();
				}
				function a() {
					throw new TypeError(
						"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
					);
				}
				function o(r, t) {
					if (r) {
						if ("string" == typeof r) return c(r, t);
						var e = Object.prototype.toString.call(r).slice(8, -1);
						return (
							"Object" === e &&
								r.constructor &&
								(e = r.constructor.name),
							"Map" === e || "Set" === e
								? Array.from(r)
								: "Arguments" === e ||
								  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
								? c(r, t)
								: void 0
						);
					}
				}
				function i(r) {
					if ("undefined" != typeof Symbol && Symbol.iterator in Object(r))
						return Array.from(r);
				}
				function u(r) {
					if (Array.isArray(r)) return c(r);
				}
				function c(r, t) {
					(null == t || t > r.length) && (t = r.length);
					for (var e = 0, n = new Array(t); e < t; e++) n[e] = r[e];
					return n;
				}
				require("gridjs/dist/theme/mermaid.css"),
					(0, t.parse)("./data.csv", {
						download: !0,
						delimiter: "",
						complete: function (t) {
							r = new e.Grid({ columns: [], data: [] });
							for (
								var a = [], o = n(t.data[0]), i = 1;
								i < t.data.length - 1;
								i++
							)
								a.push(t.data[i]);
							r.updateConfig({ columns: o, data: [].concat(a) }).render(
								document.querySelector("#app")
							);
						},
					});
			},
			{
				papaparse: "fIlN",
				gridjs: "jgwB",
				"gridjs/dist/theme/mermaid.css": "yhIm",
			},
		],
	},
	{},
	["H99C"],
	null
);
//# sourceMappingURL=./src.36753d65.js.map
