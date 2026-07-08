globalThis.process ??= {};
globalThis.process.env ??= {};
import { t as __commonJSMin } from "./chunks/rolldown-runtime_Upwk45wU.mjs";
import { A as RedirectSinglePageBuiltModule, At as clientAddressSymbol, B as validateAndDecodePathname, Bt as fileExtension, Dt as REDIRECT_STATUS_CODES, E as renderEndpoint, Et as ASTRO_GENERATOR, F as setOriginPathname, Ft as shouldAppendForwardSlash, G as AstroError, Gt as prependForwardSlash, Ht as isInternalPath, I as isRoute404, It as appendForwardSlash, J as AstroResponseHeadersReassigned, K as ActionNotFoundError, L as isRoute500, Lt as collapseDuplicateLeadingSlashes, M as copyRequest, Mt as originPathnameSymbol, N as findRouteToRewrite, Nt as pipelineSymbol, Ot as REROUTABLE_STATUS_CODES, P as getOriginPathname, Pt as responseSentSymbol$1, R as escape, Rt as collapseDuplicateSlashes, Tt as ASTRO_ERROR_HEADER, U as BodySizeLimitError, V as NOOP_MIDDLEWARE_FN, Vt as hasFileExtension, W as readBodyWithLimit, Wt as joinPaths, X as ClientAddressNotAvailable, Xt as slash, Y as CacheNotEnabled, Yt as removeTrailingForwardSlash, Zt as s, a as createConsoleLogger, b as decodeKey, bt as SessionStorageSaveError, c as getParams, d as getFallbackRoute, dt as MiddlewareNoDataOrNextCalled, f as routeHasHtmlExtension, ft as MiddlewareNotAResponse, g as getPattern, gt as PrerenderClientAddressNotAvailable, h as SERVER_ISLAND_COMPONENT, i as PipelineFeatures, it as ForbiddenRewrite, j as sequence, jt as fetchStateSymbol, k as getRouteGenerator, kt as appSymbol, l as getProps, lt as LocalsNotAnObject, m as routeIsRedirect, n as ALL_PIPELINE_FEATURES, o as AstroIntegrationLogger, p as routeIsFallback, q as ActionsReturnedInvalidDataError, qt as removeLeadingForwardSlash, r as Pipeline, s as routeComparator, t as Slots, u as getCustom404Route, ut as LocalsReassigned, v as renderPage, vt as ResponseSentError, wt as i18nNoLocaleFoundInPath, x as generateCspDigest, xt as StaticClientAddressNotAvailable, yt as SessionStorageInitError, z as MultiLevelEncodingError, zt as collapseDuplicateTrailingSlashes } from "./chunks/render_yDXn3p_y.mjs";
import { n as matchPattern } from "./chunks/remote_DXg2bzbl.mjs";
import { r as setGetEnv } from "./chunks/runtime_B85sDFPS.mjs";
import { EventEmitter } from "node:events";
import { Writable } from "node:stream";
import { env } from "cloudflare:workers";
//#region node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime$1 = /* @__PURE__ */ Object.assign(function hrtime(startTime) {
	const now = Date.now();
	const seconds = Math.trunc(now / 1e3);
	const nanos = now % 1e3 * 1e6;
	if (startTime) {
		let diffSeconds = seconds - startTime[0];
		let diffNanos = nanos - startTime[0];
		if (diffNanos < 0) {
			diffSeconds = diffSeconds - 1;
			diffNanos = 1e9 + diffNanos;
		}
		return [diffSeconds, diffNanos];
	}
	return [seconds, nanos];
}, { bigint: function bigint() {
	return BigInt(Date.now() * 1e6);
} });
//#endregion
//#region node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
	fd;
	isRaw = false;
	isTTY = false;
	constructor(fd) {
		this.fd = fd;
	}
	setRawMode(mode) {
		this.isRaw = mode;
		return this;
	}
};
//#endregion
//#region node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
	fd;
	columns = 80;
	rows = 24;
	isTTY = false;
	constructor(fd) {
		this.fd = fd;
	}
	clearLine(dir, callback) {
		callback && callback();
		return false;
	}
	clearScreenDown(callback) {
		callback && callback();
		return false;
	}
	cursorTo(x, y, callback) {
		callback && typeof callback === "function" && callback();
		return false;
	}
	moveCursor(dx, dy, callback) {
		callback && callback();
		return false;
	}
	getColorDepth(env) {
		return 1;
	}
	hasColors(count, env) {
		return false;
	}
	getWindowSize() {
		return [this.columns, this.rows];
	}
	write(str, encoding, cb) {
		if (str instanceof Uint8Array) str = new TextDecoder().decode(str);
		try {
			console.log(str);
		} catch {}
		cb && typeof cb === "function" && cb();
		return false;
	}
};
//#endregion
//#region node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/_internal/utils.mjs
/* @__NO_SIDE_EFFECTS__ */
function createNotImplementedError(name) {
	return /* @__PURE__ */ new Error(`[unenv] ${name} is not implemented yet!`);
}
/* @__NO_SIDE_EFFECTS__ */
function notImplemented(name) {
	const fn = () => {
		throw /* @__PURE__ */ createNotImplementedError(name);
	};
	return Object.assign(fn, { __unenv__: true });
}
/* @__NO_SIDE_EFFECTS__ */
function notImplementedClass(name) {
	return class {
		__unenv__ = true;
		constructor() {
			throw new Error(`[unenv] ${name} is not implemented yet!`);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";
//#endregion
//#region node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class Process extends EventEmitter {
	env;
	hrtime;
	nextTick;
	constructor(impl) {
		super();
		this.env = impl.env;
		this.hrtime = impl.hrtime;
		this.nextTick = impl.nextTick;
		for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
			const value = this[prop];
			if (typeof value === "function") this[prop] = value.bind(this);
		}
	}
	emitWarning(warning, type, code) {
		console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
	}
	emit(...args) {
		return super.emit(...args);
	}
	listeners(eventName) {
		return super.listeners(eventName);
	}
	#stdin;
	#stdout;
	#stderr;
	get stdin() {
		return this.#stdin ??= new ReadStream(0);
	}
	get stdout() {
		return this.#stdout ??= new WriteStream(1);
	}
	get stderr() {
		return this.#stderr ??= new WriteStream(2);
	}
	#cwd = "/";
	chdir(cwd) {
		this.#cwd = cwd;
	}
	cwd() {
		return this.#cwd;
	}
	arch = "";
	platform = "";
	argv = [];
	argv0 = "";
	execArgv = [];
	execPath = "";
	title = "";
	pid = 200;
	ppid = 100;
	get version() {
		return `v${NODE_VERSION}`;
	}
	get versions() {
		return { node: NODE_VERSION };
	}
	get allowedNodeEnvironmentFlags() {
		return /* @__PURE__ */ new Set();
	}
	get sourceMapsEnabled() {
		return false;
	}
	get debugPort() {
		return 0;
	}
	get throwDeprecation() {
		return false;
	}
	get traceDeprecation() {
		return false;
	}
	get features() {
		return {};
	}
	get release() {
		return {};
	}
	get connected() {
		return false;
	}
	get config() {
		return {};
	}
	get moduleLoadList() {
		return [];
	}
	constrainedMemory() {
		return 0;
	}
	availableMemory() {
		return 0;
	}
	uptime() {
		return 0;
	}
	resourceUsage() {
		return {};
	}
	ref() {}
	unref() {}
	umask() {
		throw /* @__PURE__ */ createNotImplementedError("process.umask");
	}
	getBuiltinModule() {}
	getActiveResourcesInfo() {
		throw /* @__PURE__ */ createNotImplementedError("process.getActiveResourcesInfo");
	}
	exit() {
		throw /* @__PURE__ */ createNotImplementedError("process.exit");
	}
	reallyExit() {
		throw /* @__PURE__ */ createNotImplementedError("process.reallyExit");
	}
	kill() {
		throw /* @__PURE__ */ createNotImplementedError("process.kill");
	}
	abort() {
		throw /* @__PURE__ */ createNotImplementedError("process.abort");
	}
	dlopen() {
		throw /* @__PURE__ */ createNotImplementedError("process.dlopen");
	}
	setSourceMapsEnabled() {
		throw /* @__PURE__ */ createNotImplementedError("process.setSourceMapsEnabled");
	}
	loadEnvFile() {
		throw /* @__PURE__ */ createNotImplementedError("process.loadEnvFile");
	}
	disconnect() {
		throw /* @__PURE__ */ createNotImplementedError("process.disconnect");
	}
	cpuUsage() {
		throw /* @__PURE__ */ createNotImplementedError("process.cpuUsage");
	}
	setUncaughtExceptionCaptureCallback() {
		throw /* @__PURE__ */ createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
	}
	hasUncaughtExceptionCaptureCallback() {
		throw /* @__PURE__ */ createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
	}
	initgroups() {
		throw /* @__PURE__ */ createNotImplementedError("process.initgroups");
	}
	openStdin() {
		throw /* @__PURE__ */ createNotImplementedError("process.openStdin");
	}
	assert() {
		throw /* @__PURE__ */ createNotImplementedError("process.assert");
	}
	binding() {
		throw /* @__PURE__ */ createNotImplementedError("process.binding");
	}
	permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
	report = {
		directory: "",
		filename: "",
		signal: "SIGUSR2",
		compact: false,
		reportOnFatalError: false,
		reportOnSignal: false,
		reportOnUncaughtException: false,
		getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
		writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
	};
	finalization = {
		register: /* @__PURE__ */ notImplemented("process.finalization.register"),
		unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
		registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
	};
	memoryUsage = Object.assign(() => ({
		arrayBuffers: 0,
		rss: 0,
		external: 0,
		heapTotal: 0,
		heapUsed: 0
	}), { rss: () => 0 });
	mainModule = void 0;
	domain = void 0;
	send = void 0;
	exitCode = void 0;
	channel = void 0;
	getegid = void 0;
	geteuid = void 0;
	getgid = void 0;
	getgroups = void 0;
	getuid = void 0;
	setegid = void 0;
	seteuid = void 0;
	setgid = void 0;
	setgroups = void 0;
	setuid = void 0;
	_events = void 0;
	_eventsCount = void 0;
	_exiting = void 0;
	_maxListeners = void 0;
	_debugEnd = void 0;
	_debugProcess = void 0;
	_fatalException = void 0;
	_getActiveHandles = void 0;
	_getActiveRequests = void 0;
	_kill = void 0;
	_preload_modules = void 0;
	_rawDebug = void 0;
	_startProfilerIdleNotifier = void 0;
	_stopProfilerIdleNotifier = void 0;
	_tickCallback = void 0;
	_disconnect = void 0;
	_handleQueue = void 0;
	_pendingMessage = void 0;
	_channel = void 0;
	_send = void 0;
	_linkedBinding = void 0;
};
//#endregion
//#region node_modules/.pnpm/@cloudflare+unenv-preset@2.16.1_unenv@2.0.0-rc.24_workerd@1.20260623.1/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
	env: globalProcess.env,
	hrtime: hrtime$1,
	nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var { _channel, _debugEnd, _debugProcess, _disconnect, _events, _eventsCount, _exiting, _fatalException, _getActiveHandles, _getActiveRequests, _handleQueue, _kill, _linkedBinding, _maxListeners, _pendingMessage, _preload_modules, _rawDebug, _send, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, abort, addListener, allowedNodeEnvironmentFlags, arch, argv, argv0, assert: assert$1, availableMemory, binding, channel, chdir, config, connected, constrainedMemory, cpuUsage, cwd, debugPort, disconnect, dlopen, domain, emit, emitWarning, env: env$1, eventNames, execArgv, execPath, exitCode, finalization, getActiveResourcesInfo, getegid, geteuid, getgid, getgroups, getMaxListeners, getuid, hasUncaughtExceptionCaptureCallback, hrtime, initgroups, kill, listenerCount, listeners, loadEnvFile, mainModule, memoryUsage, moduleLoadList, nextTick, off, on, once, openStdin, permission, pid, ppid, prependListener, prependOnceListener, rawListeners, reallyExit, ref, release, removeAllListeners, removeListener, report, resourceUsage, send, setegid, seteuid, setgid, setgroups, setMaxListeners, setSourceMapsEnabled, setuid, setUncaughtExceptionCaptureCallback, sourceMapsEnabled, stderr, stdin, stdout, throwDeprecation, title, traceDeprecation, umask, unref, uptime, version, versions } = unenvProcess;
//#endregion
//#region \0virtual:cloudflare/nodejs-global-inject/@cloudflare/unenv-preset/node/process
globalThis.process = {
	abort,
	addListener,
	allowedNodeEnvironmentFlags,
	hasUncaughtExceptionCaptureCallback,
	setUncaughtExceptionCaptureCallback,
	loadEnvFile,
	sourceMapsEnabled,
	arch,
	argv,
	argv0,
	chdir,
	config,
	connected,
	constrainedMemory,
	availableMemory,
	cpuUsage,
	cwd,
	debugPort,
	dlopen,
	disconnect,
	emit,
	emitWarning,
	env: env$1,
	eventNames,
	execArgv,
	execPath,
	exit,
	finalization,
	features,
	getBuiltinModule,
	getActiveResourcesInfo,
	getMaxListeners,
	hrtime,
	kill,
	listeners,
	listenerCount,
	memoryUsage,
	nextTick,
	on,
	off,
	once,
	pid,
	platform,
	ppid,
	prependListener,
	prependOnceListener,
	rawListeners,
	release,
	removeAllListeners,
	removeListener,
	report,
	resourceUsage,
	setMaxListeners,
	setSourceMapsEnabled,
	stderr,
	stdin,
	stdout,
	title,
	throwDeprecation,
	traceDeprecation,
	umask,
	uptime,
	version,
	versions,
	domain,
	initgroups,
	moduleLoadList,
	reallyExit,
	openStdin,
	assert: assert$1,
	binding,
	send,
	exitCode,
	channel,
	getegid,
	geteuid,
	getgid,
	getgroups,
	getuid,
	setegid,
	seteuid,
	setgid,
	setgroups,
	setuid,
	permission,
	mainModule,
	_events,
	_eventsCount,
	_exiting,
	_maxListeners,
	_debugEnd,
	_debugProcess,
	_fatalException,
	_getActiveHandles,
	_getActiveRequests,
	_kill,
	_preload_modules,
	_rawDebug,
	_startProfilerIdleNotifier,
	_stopProfilerIdleNotifier,
	_tickCallback,
	_disconnect,
	_handleQueue,
	_pendingMessage,
	_channel,
	_send,
	_linkedBinding
};
//#endregion
//#region node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {}, { __unenv__: true });
//#endregion
//#region node_modules/.pnpm/unenv@2.0.0-rc.24/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _stderr = new Writable();
var _stdout = new Writable();
_console?.log;
_console?.info;
_console?.trace;
_console?.debug;
_console?.table;
_console?.error;
_console?.warn;
_console?.createTask;
_console?.clear;
_console?.count;
_console?.countReset;
_console?.dir;
_console?.dirxml;
_console?.group;
_console?.groupEnd;
_console?.groupCollapsed;
_console?.profile;
_console?.profileEnd;
_console?.time;
_console?.timeEnd;
_console?.timeLog;
_console?.timeStamp;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;
//#endregion
//#region node_modules/.pnpm/@cloudflare+unenv-preset@2.16.1_unenv@2.0.0-rc.24_workerd@1.20260623.1/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var { assert, clear, context, count, countReset, createTask, debug, dir, dirxml, error, group, groupCollapsed, groupEnd, info, log, profile, profileEnd, table, time, timeEnd, timeLog, timeStamp, trace, warn } = workerdConsole;
Object.assign(workerdConsole, {
	Console,
	_ignoreErrors: true,
	_stderr,
	_stderrErrorHandler,
	_stdout,
	_stdoutErrorHandler,
	_times
});
//#endregion
//#region \0virtual:cloudflare/nodejs-global-inject/@cloudflare/unenv-preset/node/console
globalThis.console = workerdConsole;
//#endregion
//#region \0virtual:astro-cloudflare:config
var sessionKVBindingName = "SESSION";
//#endregion
//#region node_modules/.pnpm/devalue@5.8.1/node_modules/devalue/src/base64.js
/**	@type {(array_buffer: ArrayBuffer) => string} */
function encode_native(array_buffer) {
	return new Uint8Array(array_buffer).toBase64();
}
/**	@type {(base64: string) => ArrayBuffer} */
function decode_native(base64) {
	return Uint8Array.fromBase64(base64).buffer;
}
/** @type {(array_buffer: ArrayBuffer) => string} */
function encode_buffer(array_buffer) {
	return Buffer.from(array_buffer).toString("base64");
}
/**	@type {(base64: string) => ArrayBuffer} */
function decode_buffer(base64) {
	return Uint8Array.from(Buffer.from(base64, "base64")).buffer;
}
/** @type {(array_buffer: ArrayBuffer) => string} */
function encode_legacy(array_buffer) {
	const array = new Uint8Array(array_buffer);
	let binary = "";
	const chunk_size = 32768;
	for (let i = 0; i < array.length; i += chunk_size) {
		const chunk = array.subarray(i, i + chunk_size);
		binary += String.fromCharCode.apply(null, chunk);
	}
	return btoa(binary);
}
/**	@type {(base64: string) => ArrayBuffer} */
function decode_legacy(base64) {
	const binary_string = atob(base64);
	const len = binary_string.length;
	const array = new Uint8Array(len);
	for (let i = 0; i < len; i++) array[i] = binary_string.charCodeAt(i);
	return array.buffer;
}
var native = typeof Uint8Array.fromBase64 === "function";
var buffer = typeof process === "object" && process.versions?.node !== void 0;
var encode64 = native ? encode_native : buffer ? encode_buffer : encode_legacy;
var decode64 = native ? decode_native : buffer ? decode_buffer : decode_legacy;
//#endregion
//#region node_modules/.pnpm/devalue@5.8.1/node_modules/devalue/src/constants.js
var MAX_ARRAY_LEN = 2 ** 32 - 1;
var MAX_ARRAY_INDEX = MAX_ARRAY_LEN - 1;
//#endregion
//#region node_modules/.pnpm/devalue@5.8.1/node_modules/devalue/src/utils.js
var DevalueError = class extends Error {
	/**
	* @param {string} message
	* @param {string[]} keys
	* @param {any} [value] - The value that failed to be serialized
	* @param {any} [root] - The root value being serialized
	*/
	constructor(message, keys, value, root) {
		super(message);
		this.name = "DevalueError";
		this.path = keys.join("");
		this.value = value;
		this.root = root;
	}
};
/** @param {any} thing */
function is_primitive(thing) {
	return thing === null || typeof thing !== "object" && typeof thing !== "function";
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
/** @param {any} thing */
function is_plain_object(thing) {
	const proto = Object.getPrototypeOf(thing);
	return proto === Object.prototype || proto === null || Object.getPrototypeOf(proto) === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
/** @param {any} thing */
function get_type(thing) {
	return Object.prototype.toString.call(thing).slice(8, -1);
}
/** @param {string} char */
function get_escaped_char(char) {
	switch (char) {
		case "\"": return "\\\"";
		case "<": return "\\u003C";
		case "\\": return "\\\\";
		case "\n": return "\\n";
		case "\r": return "\\r";
		case "	": return "\\t";
		case "\b": return "\\b";
		case "\f": return "\\f";
		case "\u2028": return "\\u2028";
		case "\u2029": return "\\u2029";
		default: return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
	}
}
/** @param {string} str */
function stringify_string(str) {
	let result = "";
	let last_pos = 0;
	const len = str.length;
	for (let i = 0; i < len; i += 1) {
		const char = str[i];
		const replacement = get_escaped_char(char);
		if (replacement) {
			result += str.slice(last_pos, i) + replacement;
			last_pos = i + 1;
		}
	}
	return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
/** @param {Record<string | symbol, any>} object */
function enumerable_symbols(object) {
	return Object.getOwnPropertySymbols(object).filter((symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable);
}
var is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
/** @param {string} key */
function stringify_key(key) {
	return is_identifier.test(key) ? "." + key : "[" + JSON.stringify(key) + "]";
}
/** @param {number} n */
function is_valid_array_index(n) {
	if (!Number.isInteger(n)) return false;
	if (n < 0) return false;
	if (n > MAX_ARRAY_INDEX) return false;
	return true;
}
/** @param {number} n */
function is_valid_array_len(n) {
	if (!Number.isInteger(n)) return false;
	if (n < 0) return false;
	if (n > MAX_ARRAY_LEN) return false;
	return true;
}
/** @param {string} s */
function is_valid_array_index_string(s) {
	if (s.length === 0) return false;
	if (s.length > 1 && s.charCodeAt(0) === 48) return false;
	for (let i = 0; i < s.length; i++) {
		const c = s.charCodeAt(i);
		if (c < 48 || c > 57) return false;
	}
	return is_valid_array_index(+s);
}
/**
* Finds the populated indices of an array.
* @param {unknown[]} array
*/
function valid_array_indices(array) {
	const keys = Object.keys(array);
	for (var i = keys.length - 1; i >= 0; i--) if (is_valid_array_index_string(keys[i])) break;
	keys.length = i + 1;
	return keys;
}
//#endregion
//#region node_modules/.pnpm/devalue@5.8.1/node_modules/devalue/src/parse.js
/**
* Revive a value serialized with `devalue.stringify`
* @param {string} serialized
* @param {Record<string, (value: any) => any>} [revivers]
*/
function parse$1(serialized, revivers) {
	return unflatten$1(JSON.parse(serialized), revivers);
}
/**
* Revive a value flattened with `devalue.stringify`
* @param {number | any[]} parsed
* @param {Record<string, (value: any) => any>} [revivers]
*/
function unflatten$1(parsed, revivers) {
	if (typeof parsed === "number") return hydrate(parsed, true);
	if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Invalid input");
	const values = parsed;
	const hydrated = Array(values.length);
	/**
	* A set of values currently being hydrated with custom revivers,
	* used to detect invalid cyclical dependencies
	* @type {Set<number> | null}
	*/
	let hydrating = null;
	/**
	* @param {number} index
	* @returns {any}
	*/
	function hydrate(index, standalone = false) {
		if (index === -1) return void 0;
		if (index === -3) return NaN;
		if (index === -4) return Infinity;
		if (index === -5) return -Infinity;
		if (index === -6) return -0;
		if (standalone || typeof index !== "number") throw new Error(`Invalid input`);
		if (index in hydrated) return hydrated[index];
		const value = values[index];
		if (!value || typeof value !== "object") hydrated[index] = value;
		else if (Array.isArray(value)) if (typeof value[0] === "string") {
			const type = value[0];
			const reviver = revivers && Object.hasOwn(revivers, type) ? revivers[type] : void 0;
			if (reviver) {
				let i = value[1];
				if (typeof i !== "number") i = values.push(value[1]) - 1;
				hydrating ??= /* @__PURE__ */ new Set();
				if (hydrating.has(i)) throw new Error("Invalid circular reference");
				hydrating.add(i);
				hydrated[index] = reviver(hydrate(i));
				hydrating.delete(i);
				return hydrated[index];
			}
			switch (type) {
				case "Date":
					hydrated[index] = new Date(value[1]);
					break;
				case "Set":
					const set = /* @__PURE__ */ new Set();
					hydrated[index] = set;
					for (let i = 1; i < value.length; i += 1) set.add(hydrate(value[i]));
					break;
				case "Map":
					const map = /* @__PURE__ */ new Map();
					hydrated[index] = map;
					for (let i = 1; i < value.length; i += 2) map.set(hydrate(value[i]), hydrate(value[i + 1]));
					break;
				case "RegExp":
					hydrated[index] = new RegExp(value[1], value[2]);
					break;
				case "Object": {
					const wrapped_index = value[1];
					if (typeof values[wrapped_index] === "object" && values[wrapped_index][0] !== "BigInt") throw new Error("Invalid input");
					hydrated[index] = Object(hydrate(wrapped_index));
					break;
				}
				case "BigInt":
					hydrated[index] = BigInt(value[1]);
					break;
				case "null":
					const obj = Object.create(null);
					hydrated[index] = obj;
					for (let i = 1; i < value.length; i += 2) {
						if (value[i] === "__proto__") throw new Error("Cannot parse an object with a `__proto__` property");
						obj[value[i]] = hydrate(value[i + 1]);
					}
					break;
				case "Int8Array":
				case "Uint8Array":
				case "Uint8ClampedArray":
				case "Int16Array":
				case "Uint16Array":
				case "Float16Array":
				case "Int32Array":
				case "Uint32Array":
				case "Float32Array":
				case "Float64Array":
				case "BigInt64Array":
				case "BigUint64Array":
				case "DataView": {
					if (values[value[1]][0] !== "ArrayBuffer") throw new Error("Invalid data");
					const TypedArrayConstructor = globalThis[type];
					const buffer = hydrate(value[1]);
					hydrated[index] = value[2] !== void 0 ? new TypedArrayConstructor(buffer, value[2], value[3]) : new TypedArrayConstructor(buffer);
					break;
				}
				case "ArrayBuffer": {
					const base64 = value[1];
					if (typeof base64 !== "string") throw new Error("Invalid ArrayBuffer encoding");
					hydrated[index] = decode64(base64);
					break;
				}
				case "Temporal.Duration":
				case "Temporal.Instant":
				case "Temporal.PlainDate":
				case "Temporal.PlainTime":
				case "Temporal.PlainDateTime":
				case "Temporal.PlainMonthDay":
				case "Temporal.PlainYearMonth":
				case "Temporal.ZonedDateTime": {
					const temporalName = type.slice(9);
					hydrated[index] = Temporal[temporalName].from(value[1]);
					break;
				}
				case "URL":
					hydrated[index] = new URL(value[1]);
					break;
				case "URLSearchParams":
					hydrated[index] = new URLSearchParams(value[1]);
					break;
				default: throw new Error(`Unknown type ${type}`);
			}
		} else if (value[0] === -7) {
			const len = value[1];
			if (!is_valid_array_len(len)) throw new Error("Invalid input");
			/** @type {any[]} */
			const array = [];
			hydrated[index] = array;
			array[MAX_ARRAY_INDEX] = void 0;
			delete array[MAX_ARRAY_INDEX];
			for (let i = 2; i < value.length; i += 2) {
				const idx = value[i];
				if (!is_valid_array_index(idx) || idx >= len) throw new Error("Invalid input");
				array[idx] = hydrate(value[i + 1]);
			}
			array.length = len;
		} else {
			const array = new Array(value.length);
			hydrated[index] = array;
			for (let i = 0; i < value.length; i += 1) {
				const n = value[i];
				if (n === -2) continue;
				array[i] = hydrate(n);
			}
		}
		else {
			/** @type {Record<string, any>} */
			const object = {};
			hydrated[index] = object;
			for (const key of Object.keys(value)) {
				if (key === "__proto__") throw new Error("Cannot parse an object with a `__proto__` property");
				const n = value[key];
				object[key] = hydrate(n);
			}
		}
		return hydrated[index];
	}
	return hydrate(0);
}
//#endregion
//#region node_modules/.pnpm/devalue@5.8.1/node_modules/devalue/src/stringify.js
/**
* Turn a value into a JSON string that can be parsed with `devalue.parse`
* @param {any} value
* @param {Record<string, (value: any) => any>} [reducers]
*/
function stringify$2(value, reducers) {
	const stringified = run(false, value, reducers);
	return typeof stringified === "string" ? stringified : `[${stringified.join(",")}]`;
}
/**
* @param {boolean} async
* @param {any} value
* @param {Record<string, (value: any) => any>} [reducers]
*/
function run(async, value, reducers) {
	/** @type {any[]} */
	const stringified = [];
	/** @type {Map<any, number>} */
	const indexes = /* @__PURE__ */ new Map();
	/** @type {Array<{ key: string, fn: (value: any) => any }>} */
	const custom = [];
	if (reducers) for (const key of Object.getOwnPropertyNames(reducers)) custom.push({
		key,
		fn: reducers[key]
	});
	/** @type {string[]} */
	const keys = [];
	let p = 0;
	/**
	* @param {any} thing
	* @param {number} [index]
	*/
	function flatten(thing, index) {
		if (thing === void 0) return -1;
		if (Number.isNaN(thing)) return -3;
		if (thing === Infinity) return -4;
		if (thing === -Infinity) return -5;
		if (thing === 0 && 1 / thing < 0) return -6;
		if (indexes.has(thing)) return indexes.get(thing);
		index ??= p++;
		indexes.set(thing, index);
		for (const { key, fn } of custom) {
			const value = fn(thing);
			if (value) {
				stringified[index] = `["${key}",${flatten(value)}]`;
				return index;
			}
		}
		if (typeof thing === "function") throw new DevalueError(`Cannot stringify a function`, keys, thing, value);
		else if (typeof thing === "symbol") throw new DevalueError(`Cannot stringify a Symbol primitive`, keys, thing, value);
		/** @type {string | Promise<any>} */
		let str = "";
		if (is_primitive(thing)) str = stringify_primitive(thing);
		else if (typeof thing.then === "function") {
			if (!async) throw new DevalueError(`Cannot stringify a Promise or thenable — use stringifyAsync instead`, keys, thing, value);
			str = Promise.resolve(thing).then((value) => {
				const i = flatten(value, index);
				if (i < 0) stringified[index] = i;
			});
		} else {
			const type = get_type(thing);
			switch (type) {
				case "Number":
				case "String":
				case "Boolean":
				case "BigInt":
					str = `["Object",${flatten(thing.valueOf())}]`;
					break;
				case "Date":
					str = `["Date","${!isNaN(thing.getDate()) ? thing.toISOString() : ""}"]`;
					break;
				case "URL":
					str = `["URL",${stringify_string(thing.toString())}]`;
					break;
				case "URLSearchParams":
					str = `["URLSearchParams",${stringify_string(thing.toString())}]`;
					break;
				case "RegExp":
					const { source, flags } = thing;
					str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
					break;
				case "Array": {
					let mostly_dense = false;
					str = "[";
					for (let i = 0; i < thing.length; i += 1) {
						if (i > 0) str += ",";
						if (Object.hasOwn(thing, i)) {
							keys.push(`[${i}]`);
							str += flatten(thing[i]);
							keys.pop();
						} else if (mostly_dense) str += -2;
						else {
							const populated_keys = valid_array_indices(thing);
							const population = populated_keys.length;
							const d = String(thing.length).length;
							if ((thing.length - population) * 3 > 4 + d + population * (d + 1)) {
								str = "[-7," + thing.length;
								for (let j = 0; j < populated_keys.length; j++) {
									const key = populated_keys[j];
									keys.push(`[${key}]`);
									str += "," + key + "," + flatten(thing[key]);
									keys.pop();
								}
								break;
							} else {
								mostly_dense = true;
								str += -2;
							}
						}
					}
					str += "]";
					break;
				}
				case "Set":
					str = "[\"Set\"";
					for (const value of thing) str += `,${flatten(value)}`;
					str += "]";
					break;
				case "Map":
					str = "[\"Map\"";
					for (const [key, value] of thing) {
						keys.push(`.get(${is_primitive(key) ? stringify_primitive(key) : "..."})`);
						str += `,${flatten(key)},${flatten(value)}`;
						keys.pop();
					}
					str += "]";
					break;
				case "Int8Array":
				case "Uint8Array":
				case "Uint8ClampedArray":
				case "Int16Array":
				case "Uint16Array":
				case "Float16Array":
				case "Int32Array":
				case "Uint32Array":
				case "Float32Array":
				case "Float64Array":
				case "BigInt64Array":
				case "BigUint64Array":
				case "DataView": {
					/** @type {import("./types.js").TypedArray} */
					const typedArray = thing;
					str = "[\"" + type + "\"," + flatten(typedArray.buffer);
					if (typedArray.byteLength !== typedArray.buffer.byteLength) str += `,${typedArray.byteOffset},${typedArray.length}`;
					str += "]";
					break;
				}
				case "ArrayBuffer":
					str = `["ArrayBuffer","${encode64(thing)}"]`;
					break;
				case "Temporal.Duration":
				case "Temporal.Instant":
				case "Temporal.PlainDate":
				case "Temporal.PlainTime":
				case "Temporal.PlainDateTime":
				case "Temporal.PlainMonthDay":
				case "Temporal.PlainYearMonth":
				case "Temporal.ZonedDateTime":
					str = `["${type}",${stringify_string(thing.toString())}]`;
					break;
				default:
					if (!is_plain_object(thing)) throw new DevalueError(`Cannot stringify arbitrary non-POJOs`, keys, thing, value);
					if (enumerable_symbols(thing).length > 0) throw new DevalueError(`Cannot stringify POJOs with symbolic keys`, keys, thing, value);
					if (Object.getPrototypeOf(thing) === null) {
						str = "[\"null\"";
						for (const key of Object.keys(thing)) {
							if (key === "__proto__") throw new DevalueError(`Cannot stringify objects with __proto__ keys`, keys, thing, value);
							keys.push(stringify_key(key));
							str += `,${stringify_string(key)},${flatten(thing[key])}`;
							keys.pop();
						}
						str += "]";
					} else {
						str = "{";
						let started = false;
						for (const key of Object.keys(thing)) {
							if (key === "__proto__") throw new DevalueError(`Cannot stringify objects with __proto__ keys`, keys, thing, value);
							if (started) str += ",";
							started = true;
							keys.push(stringify_key(key));
							str += `${stringify_string(key)}:${flatten(thing[key])}`;
							keys.pop();
						}
						str += "}";
					}
			}
		}
		stringified[index] = str;
		return index;
	}
	const index = flatten(value);
	if (index < 0) return `${index}`;
	return stringified;
}
/**
* @param {any} thing
* @returns {string}
*/
function stringify_primitive(thing) {
	const type = typeof thing;
	if (type === "string") return stringify_string(thing);
	if (thing === void 0) return (-1).toString();
	if (thing === 0 && 1 / thing < 0) return (-6).toString();
	if (type === "bigint") return `["BigInt","${thing}"]`;
	return String(thing);
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/actions/consts.js
var ACTION_QUERY_PARAMS = {
	actionName: "_action",
	actionPayload: "_astroActionPayload"
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/actions/runtime/client.js
var codeToStatusMap = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	CONTENT_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_CONTENT: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var statusToCodeMap = Object.fromEntries(Object.entries(codeToStatusMap).map(([key, value]) => [value, key]));
var ActionError = class ActionError extends Error {
	type = "AstroActionError";
	code = "INTERNAL_SERVER_ERROR";
	status = 500;
	constructor(params) {
		super(params.message);
		this.code = params.code;
		this.status = ActionError.codeToStatus(params.code);
		if (params.stack) this.stack = params.stack;
	}
	static codeToStatus(code) {
		return codeToStatusMap[code];
	}
	static statusToCode(status) {
		return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
	}
	static fromJson(body) {
		if (isInputError(body)) return new ActionInputError(body.issues);
		if (isActionError(body)) return new ActionError(body);
		return new ActionError({ code: "INTERNAL_SERVER_ERROR" });
	}
};
function isActionError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
var ActionInputError = class extends ActionError {
	type = "AstroActionInputError";
	issues;
	fields;
	constructor(issues) {
		super({
			message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
			code: "BAD_REQUEST"
		});
		this.issues = issues;
		this.fields = {};
		for (const issue of issues) if (issue.path.length > 0) {
			const key = issue.path[0].toString();
			this.fields[key] ??= [];
			this.fields[key]?.push(issue.message);
		}
	}
};
function deserializeActionResult(res) {
	if (res.type === "error") {
		let json;
		try {
			json = JSON.parse(res.body);
		} catch {
			return {
				data: void 0,
				error: new ActionError({
					message: res.body,
					code: "INTERNAL_SERVER_ERROR"
				})
			};
		}
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": "https://blog.shika-mori.top",
			"SSR": true
		}, {
			OS: "Windows_NT",
			Path: "C:\\Users\\TY-Han\\Documents\\newBlog\\node_modules\\.bin;C:\\Users\\TY-Han\\AppData\\Local\\pnpm\\store\\v11\\links\\@\\pnpm\\9.14.4\\3e8f6d9c56551f03f62a3633839d5355d7c33273bbbe328b0633c1252bacd5c1\\node_modules\\pnpm\\dist\\node-gyp-bin;C:\\Users\\TY-Han\\AppData\\Local\\pnpm\\store\\v11\\links\\@\\pnpm\\9.14.4\\3e8f6d9c56551f03f62a3633839d5355d7c33273bbbe328b0633c1252bacd5c1\\bin;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Windows\\System32\\OpenSSH\\;C:\\Program Files\\Git\\cmd;C:\\Program Files\\nodejs\\;D:\\Program Files\\VSCodium\\bin;C:\\Program Files\\dotnet\\;C:\\Users\\TY-Han\\.local\\bin;C:\\Users\\TY-Han\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\TY-Han\\AppData\\Roaming\\npm;C:\\Users\\TY-Han\\AppData\\Local\\PowerToys\\DSCModules\\;C:\\Users\\TY-Han\\.local\\bin;"
		})?.PROD) return {
			error: ActionError.fromJson(json),
			data: void 0
		};
		else {
			const error = ActionError.fromJson(json);
			error.stack = actionResultErrorStack.get();
			return {
				error,
				data: void 0
			};
		}
	}
	if (res.type === "empty") return {
		data: void 0,
		error: void 0
	};
	return {
		data: parse$1(res.body, { URL: (href) => new URL(href) }),
		error: void 0
	};
}
var actionResultErrorStack = /* @__PURE__ */ (function actionResultErrorStackFn() {
	let errorStack;
	return {
		set(stack) {
			errorStack = stack;
		},
		get() {
			return errorStack;
		}
	};
})();
function getActionQueryString(name) {
	return `?${new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name }).toString()}`;
}
//#endregion
//#region node_modules/.pnpm/es-module-lexer@2.1.0/node_modules/es-module-lexer/dist/lexer.js
var ImportType;
(function(A) {
	A[A.Static = 1] = "Static", A[A.Dynamic = 2] = "Dynamic", A[A.ImportMeta = 3] = "ImportMeta", A[A.StaticSourcePhase = 4] = "StaticSourcePhase", A[A.DynamicSourcePhase = 5] = "DynamicSourcePhase", A[A.StaticDeferPhase = 6] = "StaticDeferPhase", A[A.DynamicDeferPhase = 7] = "DynamicDeferPhase";
})(ImportType || (ImportType = {}));
new Uint8Array(new Uint16Array([1]).buffer)[0];
var E = () => {
	return A = "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", "undefined" != typeof Buffer ? Buffer.from(A, "base64") : Uint8Array.from(atob(A), ((A) => A.charCodeAt(0)));
	var A;
};
WebAssembly.compile(E()).then(WebAssembly.instantiate).then((({ exports: A }) => {}));
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/actions/runtime/server.js
function getActionContext(context) {
	const callerInfo = getCallerInfo(context);
	const actionResultAlreadySet = Boolean(context.locals._actionPayload);
	let action = void 0;
	if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) action = {
		calledFrom: callerInfo.from,
		name: callerInfo.name,
		handler: async () => {
			const pipeline = Reflect.get(context, pipelineSymbol);
			const callerInfoName = shouldAppendForwardSlash(pipeline.manifest.trailingSlash, pipeline.manifest.buildFormat) ? removeTrailingForwardSlash(callerInfo.name) : callerInfo.name;
			let baseAction;
			try {
				baseAction = await pipeline.getAction(callerInfoName);
			} catch (error) {
				if (error instanceof Error && "name" in error && typeof error.name === "string" && error.name === ActionNotFoundError.name) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				throw error;
			}
			const bodySizeLimit = pipeline.manifest.actionBodySizeLimit;
			let input;
			try {
				input = await parseRequestBody(context.request, bodySizeLimit);
			} catch (e) {
				if (e instanceof ActionError) return {
					data: void 0,
					error: e
				};
				if (e instanceof TypeError) return {
					data: void 0,
					error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" })
				};
				throw e;
			}
			const omitKeys = [
				"props",
				"getActionResult",
				"callAction",
				"redirect"
			];
			const actionAPIContext = Object.create(Object.getPrototypeOf(context), Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(context)).filter(([key]) => !omitKeys.includes(key))));
			Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
			return baseAction.bind(actionAPIContext)(input);
		}
	};
	function setActionResult(actionName, actionResult) {
		context.locals._actionPayload = {
			actionResult,
			actionName
		};
	}
	return {
		action,
		setActionResult,
		serializeActionResult,
		deserializeActionResult
	};
}
function getCallerInfo(ctx) {
	if (ctx.routePattern === "/_actions/[...path]") return {
		from: "rpc",
		name: ctx.url.pathname.replace(/^.*\/_actions\//, "")
	};
	const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
	if (queryParam) return {
		from: "form",
		name: queryParam
	};
}
async function parseRequestBody(request, bodySizeLimit) {
	const contentType = request.headers.get("content-type");
	const contentLengthHeader = request.headers.get("content-length");
	const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
	const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
	if (!contentType) return void 0;
	if (hasContentLength && contentLength > bodySizeLimit) throw new ActionError({
		code: "CONTENT_TOO_LARGE",
		message: `Request body exceeds ${bodySizeLimit} bytes`
	});
	try {
		if (hasContentType(contentType, formContentTypes)) {
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				return await new Request(request.url, {
					method: request.method,
					headers: request.headers,
					body: toArrayBuffer(body)
				}).formData();
			}
			return await request.clone().formData();
		}
		if (hasContentType(contentType, ["application/json"])) {
			if (contentLength === 0) return void 0;
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				if (body.byteLength === 0) return void 0;
				return JSON.parse(new TextDecoder().decode(body));
			}
			return await request.clone().json();
		}
	} catch (e) {
		if (e instanceof BodySizeLimitError) throw new ActionError({
			code: "CONTENT_TOO_LARGE",
			message: `Request body exceeds ${bodySizeLimit} bytes`
		});
		throw e;
	}
	throw new TypeError("Unsupported content type");
}
var ACTION_API_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("astro.actionAPIContext");
var formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
	const type = contentType.split(";")[0].toLowerCase();
	return expected.some((t) => type === t);
}
function serializeActionResult(res) {
	if (res.error) {
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"SITE": "https://blog.shika-mori.top",
			"SSR": true
		}, { OS: "Windows_NT" })?.DEV) actionResultErrorStack.set(res.error.stack);
		let body2;
		if (res.error instanceof ActionInputError) body2 = {
			type: res.error.type,
			issues: res.error.issues,
			fields: res.error.fields
		};
		else body2 = {
			...res.error,
			message: res.error.message
		};
		return {
			type: "error",
			status: res.error.status,
			contentType: "application/json",
			body: JSON.stringify(body2)
		};
	}
	if (res.data === void 0) return {
		type: "empty",
		status: 204
	};
	let body;
	try {
		body = stringify$2(res.data, { URL: (value) => value instanceof URL && value.href });
	} catch (e) {
		let hint = ActionsReturnedInvalidDataError.hint;
		if (res.data instanceof Response) hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
		throw new AstroError({
			...ActionsReturnedInvalidDataError,
			message: ActionsReturnedInvalidDataError.message(String(e)),
			hint
		});
	}
	return {
		type: "data",
		status: 200,
		contentType: "application/json+devalue",
		body
	};
}
function toArrayBuffer(buffer) {
	const copy = new Uint8Array(buffer.byteLength);
	copy.set(buffer);
	return copy.buffer;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/actions/utils.js
function hasActionPayload(locals) {
	return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
	return (actionFn) => {
		if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) return;
		return deserializeActionResult(locals._actionPayload.actionResult);
	};
}
function createCallAction(context) {
	return (baseAction, input) => {
		Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
		return baseAction.bind(context)(input);
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/cookies/cookies.js
var import_dist = (/* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parse = parseCookie;
	exports.stringifySetCookie = stringifySetCookie;
	exports.serialize = stringifySetCookie;
	exports.stringifySetCookie = stringifySetCookie;
	exports.serialize = stringifySetCookie;
	/**
	* RegExp to match cookie-name in RFC 6265 sec 4.1.1
	* This refers out to the obsoleted definition of token in RFC 2616 sec 2.2
	* which has been replaced by the token definition in RFC 7230 appendix B.
	*
	* cookie-name       = token
	* token             = 1*tchar
	* tchar             = "!" / "#" / "$" / "%" / "&" / "'" /
	*                     "*" / "+" / "-" / "." / "^" / "_" /
	*                     "`" / "|" / "~" / DIGIT / ALPHA
	*
	* Note: Allowing more characters - https://github.com/jshttp/cookie/issues/191
	* Allow same range as cookie value, except `=`, which delimits end of name.
	*/
	var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
	/**
	* RegExp to match cookie-value in RFC 6265 sec 4.1.1
	*
	* cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
	* cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
	*                     ; US-ASCII characters excluding CTLs,
	*                     ; whitespace DQUOTE, comma, semicolon,
	*                     ; and backslash
	*
	* Allowing more characters: https://github.com/jshttp/cookie/issues/191
	* Comma, backslash, and DQUOTE are not part of the parsing algorithm.
	*/
	var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
	/**
	* RegExp to match domain-value in RFC 6265 sec 4.1.1
	*
	* domain-value      = <subdomain>
	*                     ; defined in [RFC1034], Section 3.5, as
	*                     ; enhanced by [RFC1123], Section 2.1
	* <subdomain>       = <label> | <subdomain> "." <label>
	* <label>           = <let-dig> [ [ <ldh-str> ] <let-dig> ]
	*                     Labels must be 63 characters or less.
	*                     'let-dig' not 'letter' in the first char, per RFC1123
	* <ldh-str>         = <let-dig-hyp> | <let-dig-hyp> <ldh-str>
	* <let-dig-hyp>     = <let-dig> | "-"
	* <let-dig>         = <letter> | <digit>
	* <letter>          = any one of the 52 alphabetic characters A through Z in
	*                     upper case and a through z in lower case
	* <digit>           = any one of the ten digits 0 through 9
	*
	* Keep support for leading dot: https://github.com/jshttp/cookie/issues/173
	*
	* > (Note that a leading %x2E ("."), if present, is ignored even though that
	* character is not permitted, but a trailing %x2E ("."), if present, will
	* cause the user agent to ignore the attribute.)
	*/
	var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
	/**
	* RegExp to match path-value in RFC 6265 sec 4.1.1
	*
	* path-value        = <any CHAR except CTLs or ";">
	* CHAR              = %x01-7F
	*                     ; defined in RFC 5234 appendix B.1
	*/
	var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
	var __toString = Object.prototype.toString;
	var NullObject = /* @__PURE__ */ (() => {
		const C = function() {};
		C.prototype = Object.create(null);
		return C;
	})();
	/**
	* Parse a `Cookie` header.
	*
	* Parse the given cookie header string into an object
	* The object has the various cookies as keys(names) => values
	*/
	function parseCookie(str, options) {
		const obj = new NullObject();
		const len = str.length;
		if (len < 2) return obj;
		const dec = options?.decode || decode;
		let index = 0;
		do {
			const eqIdx = eqIndex(str, index, len);
			if (eqIdx === -1) break;
			const endIdx = endIndex(str, index, len);
			if (eqIdx > endIdx) {
				index = str.lastIndexOf(";", eqIdx - 1) + 1;
				continue;
			}
			const key = valueSlice(str, index, eqIdx);
			if (obj[key] === void 0) obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
			index = endIdx + 1;
		} while (index < len);
		return obj;
	}
	function stringifySetCookie(_name, _val, _opts) {
		const cookie = typeof _name === "object" ? _name : {
			..._opts,
			name: _name,
			value: String(_val)
		};
		const enc = (typeof _val === "object" ? _val : _opts)?.encode || encodeURIComponent;
		if (!cookieNameRegExp.test(cookie.name)) throw new TypeError(`argument name is invalid: ${cookie.name}`);
		const value = cookie.value ? enc(cookie.value) : "";
		if (!cookieValueRegExp.test(value)) throw new TypeError(`argument val is invalid: ${cookie.value}`);
		let str = cookie.name + "=" + value;
		if (cookie.maxAge !== void 0) {
			if (!Number.isInteger(cookie.maxAge)) throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
			str += "; Max-Age=" + cookie.maxAge;
		}
		if (cookie.domain) {
			if (!domainValueRegExp.test(cookie.domain)) throw new TypeError(`option domain is invalid: ${cookie.domain}`);
			str += "; Domain=" + cookie.domain;
		}
		if (cookie.path) {
			if (!pathValueRegExp.test(cookie.path)) throw new TypeError(`option path is invalid: ${cookie.path}`);
			str += "; Path=" + cookie.path;
		}
		if (cookie.expires) {
			if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) throw new TypeError(`option expires is invalid: ${cookie.expires}`);
			str += "; Expires=" + cookie.expires.toUTCString();
		}
		if (cookie.httpOnly) str += "; HttpOnly";
		if (cookie.secure) str += "; Secure";
		if (cookie.partitioned) str += "; Partitioned";
		if (cookie.priority) switch (typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0) {
			case "low":
				str += "; Priority=Low";
				break;
			case "medium":
				str += "; Priority=Medium";
				break;
			case "high":
				str += "; Priority=High";
				break;
			default: throw new TypeError(`option priority is invalid: ${cookie.priority}`);
		}
		if (cookie.sameSite) switch (typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite) {
			case true:
			case "strict":
				str += "; SameSite=Strict";
				break;
			case "lax":
				str += "; SameSite=Lax";
				break;
			case "none":
				str += "; SameSite=None";
				break;
			default: throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
		}
		return str;
	}
	/**
	* Find the `;` character between `min` and `len` in str.
	*/
	function endIndex(str, min, len) {
		const index = str.indexOf(";", min);
		return index === -1 ? len : index;
	}
	/**
	* Find the `=` character between `min` and `max` in str.
	*/
	function eqIndex(str, min, max) {
		const index = str.indexOf("=", min);
		return index < max ? index : -1;
	}
	/**
	* Slice out a value between startPod to max.
	*/
	function valueSlice(str, min, max) {
		let start = min;
		let end = max;
		do {
			const code = str.charCodeAt(start);
			if (code !== 32 && code !== 9) break;
		} while (++start < end);
		while (end > start) {
			const code = str.charCodeAt(end - 1);
			if (code !== 32 && code !== 9) break;
			end--;
		}
		return str.slice(start, end);
	}
	/**
	* URL-decode string value. Optimized to skip native call when no %.
	*/
	function decode(str) {
		if (str.indexOf("%") === -1) return str;
		try {
			return decodeURIComponent(str);
		} catch (e) {
			return str;
		}
	}
	/**
	* Determine if value is a Date.
	*/
	function isDate(val) {
		return __toString.call(val) === "[object Date]";
	}
})))();
var DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
var DELETED_VALUE = "deleted";
var responseSentSymbol = /* @__PURE__ */ Symbol.for("astro.responseSent");
var identity = (value) => value;
var AstroCookie = class {
	value;
	constructor(value) {
		this.value = value;
	}
	json() {
		if (this.value === void 0) throw new Error(`Cannot convert undefined to an object.`);
		return JSON.parse(this.value);
	}
	number() {
		return Number(this.value);
	}
	boolean() {
		if (this.value === "false") return false;
		if (this.value === "0") return false;
		return Boolean(this.value);
	}
};
var AstroCookies = class {
	#request;
	#requestValues;
	#outgoing;
	#consumed;
	constructor(request) {
		this.#request = request;
		this.#requestValues = null;
		this.#outgoing = null;
		this.#consumed = false;
	}
	/**
	* Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
	* in a Set-Cookie header added to the response.
	* @param key The cookie to delete
	* @param options Options related to this deletion, such as the path of the cookie.
	*/
	delete(key, options) {
		const { maxAge: _ignoredMaxAge, expires: _ignoredExpires, ...sanitizedOptions } = options || {};
		const serializeOptions = {
			expires: DELETED_EXPIRATION,
			...sanitizedOptions
		};
		this.#ensureOutgoingMap().set(key, [
			DELETED_VALUE,
			(0, import_dist.serialize)(key, DELETED_VALUE, serializeOptions),
			false
		]);
	}
	/**
	* Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
	* request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
	* from that set call, overriding any values already part of the request.
	* @param key The cookie to get.
	* @returns An object containing the cookie value as well as convenience methods for converting its value.
	*/
	get(key, options = void 0) {
		if (this.#outgoing?.has(key)) {
			let [serializedValue, , isSetValue] = this.#outgoing.get(key);
			if (isSetValue) return new AstroCookie(serializedValue);
			else return;
		}
		const decode = options?.decode ?? decodeURIComponent;
		const values = this.#ensureParsed();
		if (key in values) {
			const value = values[key];
			if (value) {
				let decodedValue;
				try {
					decodedValue = decode(value);
				} catch (_error) {
					decodedValue = value;
				}
				return new AstroCookie(decodedValue);
			}
		}
	}
	/**
	* Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
	* part of the initial request or set via Astro.cookies.set(key)
	* @param key The cookie to check for.
	* @param _options This parameter is no longer used.
	* @returns
	*/
	has(key, _options) {
		if (this.#outgoing?.has(key)) {
			let [, , isSetValue] = this.#outgoing.get(key);
			return isSetValue;
		}
		return this.#ensureParsed()[key] !== void 0;
	}
	/**
	* Astro.cookies.set(key, value) is used to set a cookie's value. If provided
	* an object it will be stringified via JSON.stringify(value). Additionally you
	* can provide options customizing how this cookie will be set, such as setting httpOnly
	* in order to prevent the cookie from being read in client-side JavaScript.
	* @param key The name of the cookie to set.
	* @param value A value, either a string or other primitive or an object.
	* @param options Options for the cookie, such as the path and security settings.
	*/
	set(key, value, options) {
		if (this.#consumed) {
			const warning = /* @__PURE__ */ new Error("Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page.");
			warning.name = "Warning";
			console.warn(warning);
		}
		let serializedValue;
		if (typeof value === "string") serializedValue = value;
		else {
			let toStringValue = value.toString();
			if (toStringValue === Object.prototype.toString.call(value)) serializedValue = JSON.stringify(value);
			else serializedValue = toStringValue;
		}
		const serializeOptions = {};
		if (options) Object.assign(serializeOptions, options);
		this.#ensureOutgoingMap().set(key, [
			serializedValue,
			(0, import_dist.serialize)(key, serializedValue, serializeOptions),
			true
		]);
		if (this.#request[responseSentSymbol]) throw new AstroError({ ...ResponseSentError });
	}
	/**
	* Merges a new AstroCookies instance into the current instance. Any new cookies
	* will be added to the current instance, overwriting any existing cookies with the same name.
	*/
	merge(cookies) {
		const outgoing = cookies.#outgoing;
		if (outgoing) for (const [key, value] of outgoing) this.#ensureOutgoingMap().set(key, value);
	}
	/**
	* Astro.cookies.header() returns an iterator for the cookies that have previously
	* been set by either Astro.cookies.set() or Astro.cookies.delete().
	* This method is primarily used by adapters to set the header on outgoing responses.
	* @returns
	*/
	*headers() {
		if (this.#outgoing == null) return;
		for (const [, value] of this.#outgoing) yield value[1];
	}
	/**
	* Marks the cookies as consumed and returns the header values.
	* After consumption, any subsequent `set()` calls will warn.
	*/
	consume() {
		this.#consumed = true;
		return this.headers();
	}
	/**
	* @deprecated Use the instance method `cookies.consume()` instead.
	* Kept for backward compatibility with adapters.
	*/
	static consume(cookies) {
		return cookies.consume();
	}
	#ensureParsed() {
		if (!this.#requestValues) this.#parse();
		if (!this.#requestValues) this.#requestValues = /* @__PURE__ */ Object.create(null);
		return this.#requestValues;
	}
	#ensureOutgoingMap() {
		if (!this.#outgoing) this.#outgoing = /* @__PURE__ */ new Map();
		return this.#outgoing;
	}
	#parse() {
		const raw = this.#request.headers.get("cookie");
		if (!raw) return;
		this.#requestValues = (0, import_dist.parse)(raw, { decode: identity });
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/cookies/response.js
var astroCookiesSymbol = /* @__PURE__ */ Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
	Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
	let cookies = Reflect.get(response, astroCookiesSymbol);
	if (cookies != null) return cookies;
	else return;
}
function* getSetCookiesFromResponse(response) {
	const cookies = getCookiesFromResponse(response);
	if (!cookies) return [];
	for (const headerValue of cookies.consume()) yield headerValue;
	return [];
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/csp/runtime.js
function deduplicateDirectiveValues(existingDirective, newDirective) {
	const [directiveName, ...existingValues] = existingDirective.split(/\s+/).filter(Boolean);
	const [newDirectiveName, ...newValues] = newDirective.split(/\s+/).filter(Boolean);
	if (directiveName !== newDirectiveName) return;
	return `${directiveName} ${Array.from(/* @__PURE__ */ new Set([...existingValues, ...newValues])).join(" ")}`;
}
function pushDirective(directives, newDirective) {
	if (directives.length === 0) return [newDirective];
	const finalDirectives = [];
	let matched = false;
	for (const directive of directives) {
		if (matched) {
			finalDirectives.push(directive);
			continue;
		}
		const result = deduplicateDirectiveValues(directive, newDirective);
		if (result) {
			finalDirectives.push(result);
			matched = true;
		} else finalDirectives.push(directive);
	}
	if (!matched) finalDirectives.push(newDirective);
	return finalDirectives;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/i18n/fallback.js
function computeFallbackRoute(options) {
	const { pathname, responseStatus, fallback, fallbackType, locales, defaultLocale, strategy, base } = options;
	if (responseStatus !== 404) return { type: "none" };
	if (!fallback || Object.keys(fallback).length === 0) return { type: "none" };
	const urlLocale = pathname.split("/").find((segment) => {
		for (const locale of locales) if (typeof locale === "string") {
			if (locale === segment) return true;
		} else if (locale.path === segment) return true;
		return false;
	});
	if (!urlLocale) return { type: "none" };
	if (!Object.keys(fallback).includes(urlLocale)) return { type: "none" };
	const fallbackLocale = fallback[urlLocale];
	const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
	let newPathname;
	if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") if (pathname.includes(`${base}`)) newPathname = pathname.replace(`/${urlLocale}`, ``);
	else newPathname = pathname.replace(`/${urlLocale}`, `/`);
	else newPathname = pathname.replace(`/${urlLocale}`, `/${pathFallbackLocale}`);
	return {
		type: fallbackType,
		pathname: newPathname
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/i18n/router.js
var I18nRouter = class {
	#strategy;
	#defaultLocale;
	#locales;
	#base;
	#domains;
	constructor(options) {
		this.#strategy = options.strategy;
		this.#defaultLocale = options.defaultLocale;
		this.#locales = options.locales;
		this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
		this.#domains = options.domains;
	}
	/**
	* Evaluate routing strategy for a pathname.
	* Returns decision object (not HTTP Response).
	*/
	match(pathname, context) {
		if (this.shouldSkipProcessing(pathname, context)) return { type: "continue" };
		switch (this.#strategy) {
			case "manual": return { type: "continue" };
			case "pathname-prefix-always": return this.matchPrefixAlways(pathname, context);
			case "domains-prefix-always":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlways(pathname, context);
			case "pathname-prefix-other-locales": return this.matchPrefixOtherLocales(pathname, context);
			case "domains-prefix-other-locales":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixOtherLocales(pathname, context);
			case "pathname-prefix-always-no-redirect": return this.matchPrefixAlwaysNoRedirect(pathname, context);
			case "domains-prefix-always-no-redirect":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlwaysNoRedirect(pathname, context);
			default: return { type: "continue" };
		}
	}
	/**
	* Check if i18n processing should be skipped for this request
	*/
	shouldSkipProcessing(pathname, context) {
		if (pathname.includes("/404") || pathname.includes("/500")) return true;
		if (pathname.includes("/_server-islands/")) return true;
		if (context.isReroute) return true;
		if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") return true;
		return false;
	}
	/**
	* Strategy: pathname-prefix-always
	* All locales must have a prefix, including the default locale.
	*/
	matchPrefixAlways(pathname, _context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return {
			type: "redirect",
			location: `${this.#base === "/" ? "" : this.#base}/${this.#defaultLocale}`
		};
		if (!pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-other-locales
	* Default locale has no prefix, other locales must have a prefix.
	*/
	matchPrefixOtherLocales(pathname, _context) {
		let pathnameContainsDefaultLocale = false;
		for (const segment of pathname.split("/")) if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
			pathnameContainsDefaultLocale = true;
			break;
		}
		if (pathnameContainsDefaultLocale) return {
			type: "notFound",
			location: pathname.replace(`/${this.#defaultLocale}`, "")
		};
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-always-no-redirect
	* Like prefix-always but allows root to serve instead of redirecting
	*/
	matchPrefixAlwaysNoRedirect(pathname, _context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return { type: "continue" };
		if (!pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Check if the current locale doesn't belong to the configured domain.
	* Used for domain-based routing strategies.
	*/
	localeHasntDomain(currentLocale, currentDomain) {
		if (!this.#domains || !currentDomain) return false;
		if (!currentLocale) return false;
		const localesForDomain = this.#domains[currentDomain];
		if (!localesForDomain) return true;
		return !localesForDomain.includes(currentLocale);
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/i18n/handler.js
var I18n = class {
	#i18n;
	#base;
	#trailingSlash;
	#format;
	#router;
	constructor(i18n, base, trailingSlash, format) {
		this.#i18n = i18n;
		this.#base = base;
		this.#trailingSlash = trailingSlash;
		this.#format = format;
		this.#router = new I18nRouter({
			strategy: i18n.strategy,
			defaultLocale: i18n.defaultLocale,
			locales: i18n.locales,
			base,
			domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce((acc, domain) => {
				const locale = i18n.domainLookupTable[domain];
				if (!acc[domain]) acc[domain] = [];
				acc[domain].push(locale);
				return acc;
			}, {}) : void 0
		});
	}
	async finalize(state, response) {
		state.pipeline.usedFeatures |= PipelineFeatures.i18n;
		const i18n = this.#i18n;
		if (state.skipErrorReroute && typeof i18n.fallback === "undefined") return response;
		if (state.responseRouteType !== "page" && state.responseRouteType !== "fallback") return response;
		const url = state.url;
		const currentLocale = state.computeCurrentLocale();
		const isPrerendered = state.routeData.prerender;
		const routerContext = {
			currentLocale,
			currentDomain: url.hostname,
			routeType: state.responseRouteType,
			isReroute: false
		};
		const routeDecision = this.#router.match(url.pathname, routerContext);
		switch (routeDecision.type) {
			case "redirect": {
				let location = routeDecision.location;
				if (shouldAppendForwardSlash(this.#trailingSlash, this.#format)) location = appendForwardSlash(location);
				return new Response(null, {
					status: routeDecision.status ?? 302,
					headers: { Location: location }
				});
			}
			case "notFound": {
				if (isPrerendered) {
					const prerenderedRes = new Response(response.body, {
						status: 404,
						headers: response.headers
					});
					state.skipErrorReroute = true;
					if (routeDecision.location) prerenderedRes.headers.set("Location", routeDecision.location);
					return prerenderedRes;
				}
				const headers = new Headers();
				if (routeDecision.location) headers.set("Location", routeDecision.location);
				return new Response(null, {
					status: 404,
					headers
				});
			}
			case "continue": break;
		}
		if (i18n.fallback && i18n.fallbackType) {
			const effectiveStatus = state.responseRouteType === "fallback" ? 404 : response.status;
			const fallbackDecision = computeFallbackRoute({
				pathname: url.pathname,
				responseStatus: effectiveStatus,
				currentLocale,
				fallback: i18n.fallback,
				fallbackType: i18n.fallbackType,
				locales: i18n.locales,
				defaultLocale: i18n.defaultLocale,
				strategy: i18n.strategy,
				base: this.#base
			});
			switch (fallbackDecision.type) {
				case "redirect": return new Response(null, {
					status: 302,
					headers: { Location: fallbackDecision.pathname + url.search }
				});
				case "rewrite": return await state.rewrite(fallbackDecision.pathname + url.search);
				case "none": break;
			}
		}
		return response;
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/i18n/index.js
function pathHasLocale(path, locales) {
	const segments = path.split("/").map(normalizeThePath);
	for (const segment of segments) for (const locale of locales) if (typeof locale === "string") {
		if (normalizeTheLocale(segment) === normalizeTheLocale(locale)) return true;
	} else if (segment === locale.path) return true;
	return false;
}
function getPathByLocale(locale, locales) {
	for (const loopLocale of locales) if (typeof loopLocale === "string") {
		if (loopLocale === locale) return loopLocale;
	} else for (const code of loopLocale.codes) if (code === locale) return loopLocale.path;
	throw new AstroError(i18nNoLocaleFoundInPath);
}
function normalizeTheLocale(locale) {
	return locale.replaceAll("_", "-").toLowerCase();
}
function normalizeThePath(path) {
	return path.endsWith(".html") ? path.slice(0, -5) : path;
}
function getAllCodes(locales) {
	const result = [];
	for (const loopLocale of locales) if (typeof loopLocale === "string") result.push(loopLocale);
	else result.push(...loopLocale.codes);
	return result;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/i18n/utils.js
function parseLocale(header) {
	if (header === "*") return [{
		locale: header,
		qualityValue: void 0
	}];
	const result = [];
	const localeValues = header.split(",").map((str) => str.trim());
	for (const localeValue of localeValues) {
		const split = localeValue.split(";").map((str) => str.trim());
		const localeName = split[0];
		const qualityValue = split[1];
		if (!split) continue;
		if (qualityValue && qualityValue.startsWith("q=")) {
			const qualityValueAsFloat = Number.parseFloat(qualityValue.slice(2));
			if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) result.push({
				locale: localeName,
				qualityValue: void 0
			});
			else result.push({
				locale: localeName,
				qualityValue: qualityValueAsFloat
			});
		} else result.push({
			locale: localeName,
			qualityValue: void 0
		});
	}
	return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
	const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
	return browserLocaleList.filter((browserLocale) => {
		if (browserLocale.locale !== "*") return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
		return true;
	}).sort((a, b) => {
		if (a.qualityValue && b.qualityValue) return Math.sign(b.qualityValue - a.qualityValue);
		return 0;
	});
}
function computePreferredLocale(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = void 0;
	if (acceptHeader) {
		const firstResult = sortAndFilterLocales(parseLocale(acceptHeader), locales).at(0);
		if (firstResult && firstResult.locale !== "*") {
			outer: for (const currentLocale of locales) if (typeof currentLocale === "string") {
				if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
					result = currentLocale;
					break;
				}
			} else for (const currentCode of currentLocale.codes) if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
				result = currentCode;
				break outer;
			}
		}
	}
	return result;
}
function computePreferredLocaleList(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = [];
	if (acceptHeader) {
		const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
		if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") return getAllCodes(locales);
		else if (browserLocaleList.length > 0) {
			for (const browserLocale of browserLocaleList) for (const loopLocale of locales) if (typeof loopLocale === "string") {
				if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) result.push(loopLocale);
			} else for (const code of loopLocale.codes) if (code === browserLocale.locale) result.push(code);
		}
	}
	return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
	for (const segment of pathname.split("/").map(normalizeThePath)) for (const locale of locales) if (typeof locale === "string") {
		if (!segment.includes(locale)) continue;
		if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) return locale;
	} else if (locale.path === segment) return locale.codes.at(0);
	else for (const code of locale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(segment)) return code;
	for (const locale of locales) if (typeof locale === "string") {
		if (locale === defaultLocale) return locale;
	} else if (locale.path === defaultLocale) return locale.codes.at(0);
}
function computeCurrentLocaleFromParams(params, locales) {
	const byNormalizedCode = /* @__PURE__ */ new Map();
	const byPath = /* @__PURE__ */ new Map();
	for (const locale of locales) if (typeof locale === "string") byNormalizedCode.set(normalizeTheLocale(locale), locale);
	else {
		byPath.set(locale.path, locale.codes[0]);
		for (const code of locale.codes) byNormalizedCode.set(normalizeTheLocale(code), code);
	}
	for (const value of Object.values(params)) {
		if (!value) continue;
		const pathMatch = byPath.get(value);
		if (pathMatch) return pathMatch;
		const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
		if (codeMatch) return codeMatch;
	}
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/middleware/callMiddleware.js
async function callMiddleware(onRequest, apiContext, responseFunction) {
	let nextCalled = false;
	let responseFunctionPromise = void 0;
	const next = async (payload) => {
		nextCalled = true;
		responseFunctionPromise = responseFunction(apiContext, payload);
		return responseFunctionPromise;
	};
	const middlewarePromise = onRequest(apiContext, next);
	return await Promise.resolve(middlewarePromise).then(async (value) => {
		if (nextCalled) if (typeof value !== "undefined") {
			if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
			return value;
		} else if (responseFunctionPromise) return responseFunctionPromise;
		else throw new AstroError(MiddlewareNotAResponse);
		else if (typeof value === "undefined") throw new AstroError(MiddlewareNoDataOrNextCalled);
		else if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
		else return value;
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/cache/runtime/noop.js
var EMPTY_OPTIONS = Object.freeze({ tags: [] });
var NoopAstroCache = class {
	enabled = false;
	set() {}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {}
};
var hasWarned = false;
var DisabledAstroCache = class {
	enabled = false;
	#logger;
	constructor(logger) {
		this.#logger = logger;
	}
	#warn() {
		if (!hasWarned) {
			hasWarned = true;
			this.#logger?.warn("cache", "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `cache` to enable caching.");
		}
	}
	set() {
		this.#warn();
	}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {
		throw new AstroError(CacheNotEnabled);
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/middleware/astro-middleware.js
var AstroMiddleware = class {
	#pipeline;
	constructor(pipeline) {
		this.#pipeline = pipeline;
	}
	async handle(state, renderRouteCallback) {
		state.pipeline.usedFeatures |= PipelineFeatures.middleware;
		const pipeline = this.#pipeline;
		await state.getProps();
		const apiContext = state.getAPIContext();
		state.counter++;
		if (state.counter === 4) return new Response("Loop Detected", {
			status: 508,
			statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
		});
		const next = async (ctx, payload) => {
			if (payload) {
				pipeline.logger.debug("router", "Called rewriting to:", payload);
				applyRewriteToState(state, payload, await pipeline.tryRewrite(payload, state.request));
			}
			return renderRouteCallback(state, ctx);
		};
		let response;
		if (state.skipMiddleware) response = await next(apiContext);
		else {
			const pipelineMiddleware = await pipeline.getMiddleware();
			response = await callMiddleware(sequence(...pipeline.internalMiddleware, pipelineMiddleware), apiContext, next);
		}
		response = this.#finalize(state, response);
		state.response = response;
		return response;
	}
	/**
	* Like `handle`, but mirrors the app-level error handling that
	* `AstroHandler` provides on the standard path, the same way
	* `PagesHandler.handleWithErrorFallback` does for `pages()`. When no
	* route matched it returns a 404 marked with `X-Astro-Error` for the
	* app's post-check; when Astro's own middleware chain throws it logs the
	* error and renders the custom `500.astro`.
	*
	* Errors surfaced through `renderRouteCallback` (the host framework's
	* `next`, e.g. host middleware mounted below `middleware()`) are
	* re-thrown instead, so the host's own error handling still runs rather
	* than being swallowed into Astro's 500 page. A sentinel tells the two
	* apart.
	*
	* Used by the composable `astro/fetch` `middleware()` entry point, where
	* there is no surrounding `AstroHandler` to supply this fallback.
	*/
	async handleWithErrorFallback(app, state, renderRouteCallback) {
		if (!state.routeData) return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		let nextError;
		try {
			return await this.handle(state, async (s, ctx) => {
				try {
					return await renderRouteCallback(s, ctx);
				} catch (err) {
					nextError = err;
					throw err;
				}
			});
		} catch (err) {
			if (err === nextError) throw err;
			app.logger.error(null, err.stack || err.message || String(err));
			return app.renderError(state.request, {
				...state.renderOptions,
				status: 500,
				error: err,
				pathname: state.pathname
			});
		}
	}
	#finalize(state, response) {
		attachCookiesToResponse(response, state.cookies);
		return response;
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/pages/handler.js
var EMPTY_SLOTS = Object.freeze({});
var PagesHandler = class {
	#pipeline;
	constructor(pipeline) {
		this.#pipeline = pipeline;
	}
	async handle(state, ctx) {
		const { logger, streaming } = this.#pipeline;
		state.resetResponseMetadata();
		let response;
		const componentInstance = await state.loadComponentInstance();
		switch (state.routeData.type) {
			case "endpoint":
				response = await renderEndpoint(componentInstance, ctx, state.routeData.prerender, logger, state);
				break;
			case "page": {
				const props = await state.getProps();
				const actionApiContext = state.getActionAPIContext();
				const result = await state.createResult(componentInstance, actionApiContext);
				try {
					response = await renderPage(result, componentInstance?.default, props, state.slots ?? EMPTY_SLOTS, streaming, state.routeData);
				} catch (e) {
					result.cancelled = true;
					throw e;
				}
				state.responseRouteType = "page";
				if (state.routeData.route === "/404" || state.routeData.route === "/500") state.skipErrorReroute = true;
				break;
			}
			case "redirect": return new Response(null, {
				status: 404,
				headers: { [ASTRO_ERROR_HEADER]: "true" }
			});
			case "fallback":
				state.responseRouteType = "fallback";
				return new Response(null, { status: 500 });
		}
		const responseCookies = getCookiesFromResponse(response);
		if (responseCookies) state.cookies.merge(responseCookies);
		state.response = response;
		return response;
	}
	/**
	* Like `handle`, but mirrors the app-level error handling that
	* `AstroHandler` provides on the standard path: unmatched routes
	* return a 404 marked with `X-Astro-Error` for the app's post-check
	* to render the 404 error page, and render-time errors are logged
	* and render the 500 error page instead of propagating to the host
	* framework.
	*
	* Used by the composable `astro/fetch` `pages()` entry point, where
	* there is no surrounding `AstroHandler` to supply this fallback.
	*/
	async handleWithErrorFallback(app, state) {
		if (!state.routeData) return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		try {
			return await this.handle(state, state.getAPIContext());
		} catch (err) {
			app.logger.error(null, err.stack || err.message || String(err));
			return app.renderError(state.request, {
				...state.renderOptions,
				status: 500,
				error: err,
				pathname: state.pathname
			});
		}
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/util/normalized-url.js
function createNormalizedUrl(requestUrl) {
	return normalizeUrl(new URL(requestUrl));
}
function normalizeUrl(url) {
	try {
		url.pathname = validateAndDecodePathname(url.pathname);
	} catch {
		try {
			url.pathname = decodeURI(url.pathname);
		} catch {}
	}
	url.pathname = collapseDuplicateSlashes(url.pathname);
	return url;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/rewrites/handler.js
function applyRewriteToState(state, payload, { routeData, componentInstance, newUrl, pathname }, { mergeCookies = false } = {}) {
	const pipeline = state.pipeline;
	const oldPathname = state.pathname;
	const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
	if (pipeline.manifest.serverLike && !state.routeData.prerender && routeData.prerender && !isI18nFallback) throw new AstroError({
		...ForbiddenRewrite,
		message: ForbiddenRewrite.message(state.pathname, pathname, routeData.component),
		hint: ForbiddenRewrite.hint(routeData.component)
	});
	state.routeData = routeData;
	state.componentInstance = componentInstance;
	if (payload instanceof Request) state.request = payload;
	else state.request = copyRequest(newUrl, state.request, routeData.prerender, pipeline.logger, state.routeData.route);
	state.url = createNormalizedUrl(state.request.url);
	if (mergeCookies) {
		const newCookies = new AstroCookies(state.request);
		if (state.cookies) newCookies.merge(state.cookies);
		state.cookies = newCookies;
	}
	state.params = getParams(routeData, pathname);
	state.pathname = pathname;
	state.isRewriting = true;
	state.status = 200;
	setOriginPathname(state.request, oldPathname, pipeline.manifest.trailingSlash, pipeline.manifest.buildFormat);
	state.invalidateContexts();
}
var Rewrites = class {
	async execute(state, payload) {
		const pipeline = state.pipeline;
		pipeline.logger.debug("router", "Calling rewrite: ", payload);
		applyRewriteToState(state, payload, await pipeline.tryRewrite(payload, state.request), { mergeCookies: true });
		const middleware = new AstroMiddleware(pipeline);
		const pagesHandler = new PagesHandler(pipeline);
		return middleware.handle(state, pagesHandler.handle.bind(pagesHandler));
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/routing/match.js
function matchRoute(pathname, manifest) {
	if (isRoute404(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute404(route.route));
		if (errorRoute) return errorRoute;
	}
	if (isRoute500(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute500(route.route));
		if (errorRoute) return errorRoute;
	}
	return manifest.routes.find((route) => {
		return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
	});
}
function isRoute404or500(route) {
	return isRoute404(route.route) || isRoute500(route.route);
}
function isRouteServerIsland(route) {
	return route.component === SERVER_ISLAND_COMPONENT;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/i18n/domain.js
function computePathnameFromDomain(request, url, i18n, base, trailingSlash, logger) {
	let pathname = void 0;
	if (i18n && (i18n.strategy === "domains-prefix-always" || i18n.strategy === "domains-prefix-other-locales" || i18n.strategy === "domains-prefix-always-no-redirect")) {
		let host = request.headers.get("X-Forwarded-Host");
		let protocol = request.headers.get("X-Forwarded-Proto");
		if (protocol) protocol = protocol + ":";
		else protocol = url.protocol;
		if (!host) host = request.headers.get("Host");
		if (host && protocol) {
			host = host.split(":")[0];
			try {
				let locale;
				const hostAsUrl = new URL(`${protocol}//${host}`);
				for (const [domainKey, localeValue] of Object.entries(i18n.domainLookupTable)) {
					const domainKeyAsUrl = new URL(domainKey);
					if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
						locale = localeValue;
						break;
					}
				}
				if (locale) {
					pathname = prependForwardSlash(joinPaths(normalizeTheLocale(locale), removeBase(url.pathname, base)));
					if (trailingSlash === "always") pathname = appendForwardSlash(pathname);
					else if (trailingSlash === "never") pathname = removeTrailingForwardSlash(pathname);
					else if (url.pathname.endsWith("/")) pathname = appendForwardSlash(pathname);
				}
			} catch (e) {
				logger.error("router", `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`);
				logger.error("router", `Error: ${e}`);
			}
		}
	}
	return pathname;
}
function removeBase(pathname, base) {
	pathname = collapseDuplicateLeadingSlashes(pathname);
	if (pathname.startsWith(base)) return pathname.slice(removeTrailingForwardSlash(base).length + 1);
	return pathname;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/app/render-options.js
var renderOptionsSymbol = /* @__PURE__ */ Symbol.for("astro.renderOptions");
function getRenderOptions(request) {
	return Reflect.get(request, renderOptionsSymbol);
}
function setRenderOptions(request, options) {
	Reflect.set(request, renderOptionsSymbol, options);
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/app/validate-headers.js
function getFirstForwardedValue$1(multiValueHeader) {
	return multiValueHeader?.toString().split(",").map((e) => e.trim())[0];
}
function sanitizeHost(hostname) {
	if (!hostname) return void 0;
	if (/[/\\]/.test(hostname)) return void 0;
	return hostname;
}
function parseHost(host) {
	const parts = host.split(":");
	return {
		hostname: parts[0],
		port: parts[1]
	};
}
function matchesAllowedDomains(hostname, protocol, port, allowedDomains) {
	const urlString = `${protocol}://${port ? `${hostname}:${port}` : hostname}`;
	if (!URL.canParse(urlString)) return false;
	const testUrl = new URL(urlString);
	return allowedDomains.some((pattern) => matchPattern(testUrl, pattern));
}
function validateHost(host, protocol, allowedDomains) {
	if (!host || host.length === 0) return void 0;
	if (!allowedDomains || allowedDomains.length === 0) return void 0;
	const sanitized = sanitizeHost(host);
	if (!sanitized) return void 0;
	const { hostname, port } = parseHost(sanitized);
	if (matchesAllowedDomains(hostname, protocol, port, allowedDomains)) return sanitized;
}
function validateForwardedHeaders(forwardedProtocol, forwardedHost, forwardedPort, allowedDomains) {
	const result = {};
	if (forwardedProtocol) {
		if (allowedDomains && allowedDomains.length > 0) {
			if (allowedDomains.some((pattern) => pattern.protocol !== void 0)) try {
				const testUrl = new URL(`${forwardedProtocol}://example.com`);
				if (allowedDomains.some((pattern) => matchPattern(testUrl, { protocol: pattern.protocol }))) result.protocol = forwardedProtocol;
			} catch {}
			else if (/^https?$/.test(forwardedProtocol)) result.protocol = forwardedProtocol;
		}
	}
	if (forwardedPort && allowedDomains && allowedDomains.length > 0) {
		if (allowedDomains.some((pattern) => pattern.port !== void 0)) {
			if (allowedDomains.some((pattern) => pattern.port === forwardedPort)) result.port = forwardedPort;
		}
	}
	if (forwardedHost && forwardedHost.length > 0 && allowedDomains && allowedDomains.length > 0) {
		const protoForValidation = result.protocol || "https";
		const sanitized = sanitizeHost(forwardedHost);
		if (sanitized) {
			const { hostname, port: portFromHost } = parseHost(sanitized);
			if (matchesAllowedDomains(hostname, protoForValidation, result.port || portFromHost, allowedDomains)) result.host = sanitized;
		}
	}
	return result;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/fetch/fetch-state.js
var FetchState = class {
	pipeline;
	/**
	* The request to render. Mutated during rewrites so subsequent renders
	* see the rewritten URL.
	*/
	request;
	routeData;
	/**
	* The pathname to use for routing and rendering. Starts out as the raw,
	* base-stripped, decoded pathname from the request. May be further
	* normalized by `AstroHandler` after routeData is known (in dev, when
	* the matched route has no `.html` extension, `.html` / `/index.html`
	* suffixes are stripped).
	*/
	pathname;
	/** Resolved render options (addCookieHeader, clientAddress, locals, etc.). */
	renderOptions;
	/** When the request started, used to log duration. */
	timeStart;
	/**
	* The route's loaded component module. Set before middleware runs; may
	* be swapped during in-flight rewrites from inside the middleware chain.
	*/
	componentInstance;
	/**
	* Slot overrides supplied by the container API. `undefined` for HTTP
	* requests — `PagesHandler` coalesces to `{}` on read so we don't
	* allocate an empty object per request.
	*/
	slots;
	/**
	* The `Response` produced by handlers, if any. Set after page
	* rendering or middleware completes.
	*/
	response;
	/**
	* Default HTTP status for the rendered response. Callers override
	* before rendering runs (e.g. `AstroHandler` sets this from
	* `BaseApp.getDefaultStatusCode`; error handlers set `404` / `500`).
	*/
	status = 200;
	/** Whether user middleware should be skipped for this request. */
	skipMiddleware = false;
	/**
	* Set to `true` when the request path was encoded too many times to fully
	* decode (see {@link validateAndDecodePathname}). These requests are
	* rejected with a `400` before middleware or routing run.
	*/
	invalidEncoding = false;
	/** A flag that tells the render content if the rewriting was triggered. */
	isRewriting = false;
	/** A safety net in case of loops (rewrite counter). */
	counter = 0;
	/** Cookies for this request. Created lazily on first access. */
	cookies;
	/** Route params derived from routeData + pathname. Computed lazily. */
	#params;
	get params() {
		if (!this.#params && this.routeData) this.#params = getParams(this.routeData, this.pathname);
		return this.#params;
	}
	set params(value) {
		this.#params = value;
	}
	/** Normalized URL for this request. */
	url;
	/** Client address for this request. */
	clientAddress;
	/** Whether this is a partial render (container API). */
	partial;
	/** Internal metadata about the current response route type. */
	responseRouteType;
	/** Internal flag to prevent rerouting this response to an error page. */
	skipErrorReroute = false;
	/** Whether to inject CSP meta tags. */
	shouldInjectCspMetaTags;
	/** Request-scoped locals object, shared with user middleware. */
	locals = {};
	/**
	* Memoized `props` (see `getProps`). `null` means "not yet computed"
	* — using `null` (rather than `undefined`) keeps the hidden class
	* stable and distinct from a valid-but-empty result.
	*/
	props = null;
	/** Memoized `ActionAPIContext` (see `getActionAPIContext`). */
	actionApiContext = null;
	/** Memoized `APIContext` (see `getAPIContext`). */
	apiContext = null;
	/** Registered context providers keyed by name. Lazy-initialized on first provide(). */
	#providers;
	/** Cached values from resolved providers. Lazy-initialized on first resolve(). */
	#providersResolvedValues;
	/** Cached promise for lazy component instance loading. */
	#componentInstancePromise;
	/** SSR result for the current page render. */
	result;
	/** Initial props (from container/error handler). */
	initialProps = {};
	/** Rewrites handler instance. Lazy-initialized on first rewrite(). */
	#rewrites;
	/** Memoized Astro page partial. */
	#astroPagePartial;
	/**
	* Locale-prefixed pathname derived from the Host header for domain-based
	* i18n routing (e.g. `/en/boats/1/foo`), or `undefined` when the request
	* isn't served from a locale-mapped domain. When set, `this.pathname` is
	* derived from it so locale/param resolution match the route pattern.
	*/
	#domainPathname;
	/** Memoized current locale. */
	#currentLocale;
	/** Memoized preferred locale. */
	#preferredLocale;
	/** Memoized preferred locale list. */
	#preferredLocaleList;
	constructor(pipeline, request, options) {
		this.pipeline = pipeline;
		this.request = request;
		options ??= getRenderOptions(request);
		this.routeData = options?.routeData;
		this.renderOptions = options ?? {
			addCookieHeader: false,
			clientAddress: void 0,
			locals: void 0,
			prerenderedErrorPageFetch: fetch,
			routeData: void 0,
			waitUntil: void 0
		};
		this.componentInstance = void 0;
		this.slots = void 0;
		const url = new URL(request.url);
		const domainPathname = computePathnameFromDomain(request, url, pipeline.manifest.i18n, pipeline.manifest.base, pipeline.manifest.trailingSlash, pipeline.logger);
		if (domainPathname) {
			this.#domainPathname = domainPathname;
			try {
				this.pathname = decodeURI(domainPathname);
			} catch {
				this.pathname = domainPathname;
			}
		} else this.pathname = this.#computePathname(url);
		this.timeStart = performance.now();
		this.clientAddress = options?.clientAddress;
		this.locals = options?.locals ?? {};
		this.url = normalizeUrl(url);
		this.cookies = new AstroCookies(request);
		if (pipeline.manifest.allowedDomains && pipeline.manifest.allowedDomains.length > 0 && !this.routeData?.prerender) this.#applyForwardedHeaders();
		if (!Reflect.get(this.request, originPathnameSymbol)) setOriginPathname(this.request, this.pathname, pipeline.manifest.trailingSlash, pipeline.manifest.buildFormat);
		this.#resolveRouteData();
	}
	/**
	* Triggers a rewrite. Delegates to the Rewrites handler.
	*/
	rewrite(payload) {
		return (this.#rewrites ??= new Rewrites()).execute(this, payload);
	}
	/**
	* Creates the SSR result for the current page render.
	*/
	async createResult(mod, ctx) {
		const pipeline = this.pipeline;
		const { clientDirectives, inlinedScripts, compressHTML, manifest, renderers, resolve } = pipeline;
		const routeData = this.routeData;
		const { links, scripts, styles } = await pipeline.headElements(routeData);
		const extraStyleHashes = [];
		const extraScriptHashes = [];
		const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags ?? manifest.shouldInjectCspMetaTags;
		const cspAlgorithm = manifest.csp?.algorithm ?? "SHA-256";
		if (shouldInjectCspMetaTags) {
			for (const style of styles) extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
			for (const script of scripts) extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
		}
		const componentMetadata = await pipeline.componentMetadata(routeData) ?? manifest.componentMetadata;
		const headers = new Headers({ "Content-Type": "text/html" });
		const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
		const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
		const status = this.status;
		const response = {
			status: actionResult?.error ? actionResult?.error.status : status,
			statusText: actionResult?.error ? actionResult?.error.type : "OK",
			get headers() {
				return headers;
			},
			set headers(_) {
				throw new AstroError(AstroResponseHeadersReassigned);
			}
		};
		const state = this;
		const result = {
			base: manifest.base,
			userAssetsBase: manifest.userAssetsBase,
			cancelled: false,
			clientDirectives,
			inlinedScripts,
			componentMetadata,
			compressHTML,
			cookies: this.cookies,
			createAstro: (props, slots) => state.createAstro(result, props, slots, ctx),
			links,
			params: this.params,
			partial,
			pathname: this.pathname,
			renderers,
			resolve,
			response,
			request: this.request,
			scripts,
			styles,
			actionResult,
			async getServerIslandNameMap() {
				return (await pipeline.getServerIslands()).serverIslandNameMap ?? /* @__PURE__ */ new Map();
			},
			key: manifest.key,
			trailingSlash: manifest.trailingSlash,
			_metadata: {
				hasHydrationScript: false,
				rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
				hasRenderedHead: false,
				renderedScripts: /* @__PURE__ */ new Set(),
				hasDirectives: /* @__PURE__ */ new Set(),
				hasRenderedServerIslandRuntime: false,
				headInTree: false,
				extraHead: [],
				extraStyleHashes,
				extraScriptHashes,
				propagators: /* @__PURE__ */ new Set(),
				templateDepth: 0
			},
			cspDestination: manifest.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
			shouldInjectCspMetaTags,
			cspAlgorithm,
			scriptHashes: manifest.csp?.scriptHashes ? [...manifest.csp.scriptHashes] : [],
			scriptResources: manifest.csp?.scriptResources ? [...manifest.csp.scriptResources] : [],
			styleHashes: manifest.csp?.styleHashes ? [...manifest.csp.styleHashes] : [],
			styleResources: manifest.csp?.styleResources ? [...manifest.csp.styleResources] : [],
			directives: manifest.csp?.directives ? [...manifest.csp.directives] : [],
			isStrictDynamic: manifest.csp?.isStrictDynamic ?? false,
			internalFetchHeaders: manifest.internalFetchHeaders
		};
		this.result = result;
		return result;
	}
	/**
	* Creates the Astro global object for a component render.
	*/
	createAstro(result, props, slotValues, apiContext) {
		let astroPagePartial;
		if (this.isRewriting) this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
		this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
		astroPagePartial = this.#astroPagePartial;
		const astroComponentPartial = {
			props,
			self: null
		};
		const Astro = Object.assign(Object.create(astroPagePartial), astroComponentPartial);
		let _slots;
		Object.defineProperty(Astro, "slots", { get: () => {
			if (!_slots) _slots = new Slots(result, slotValues, this.pipeline.logger);
			return _slots;
		} });
		return Astro;
	}
	/**
	* Creates the Astro page-level partial (prototype for Astro global).
	*/
	createAstroPagePartial(result, apiContext) {
		const state = this;
		const { cookies, locals, params, pipeline, url } = this;
		const { response } = result;
		const redirect = (path, status = 302) => {
			if (state.request[responseSentSymbol$1]) throw new AstroError({ ...ResponseSentError });
			return new Response(null, {
				status,
				headers: { Location: path }
			});
		};
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		const callAction = createCallAction(apiContext);
		const partial = {
			generator: ASTRO_GENERATOR,
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			cookies,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			locals,
			redirect,
			rewrite,
			request: this.request,
			response,
			site: pipeline.site,
			getActionResult: createGetActionResult(locals),
			get callAction() {
				return callAction;
			},
			url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return {
					info(msg) {
						pipeline.logger.info(null, msg);
					},
					warn(msg) {
						pipeline.logger.warn(null, msg);
					},
					error(msg) {
						pipeline.logger.error(null, msg);
					}
				};
			}
		};
		this.defineProviderGetters(partial);
		return partial;
	}
	getClientAddress() {
		const { pipeline, clientAddress } = this;
		const routeData = this.routeData;
		if (routeData.prerender) throw new AstroError({
			...PrerenderClientAddressNotAvailable,
			message: PrerenderClientAddressNotAvailable.message(routeData.component)
		});
		if (clientAddress) return clientAddress;
		if (pipeline.adapterName) throw new AstroError({
			...ClientAddressNotAvailable,
			message: ClientAddressNotAvailable.message(pipeline.adapterName)
		});
		throw new AstroError(StaticClientAddressNotAvailable);
	}
	getCookies() {
		return this.cookies;
	}
	getCsp() {
		const state = this;
		const { pipeline } = this;
		if (!pipeline.manifest.csp) {
			if (pipeline.runtimeMode === "production") pipeline.logger.warn("csp", `context.csp was used when rendering the route ${s.green(state.routeData.route)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/configuration-reference/#securitycsp`);
			return;
		}
		return {
			insertDirective(payload) {
				if (state.result) state.result.directives = pushDirective(state.result.directives, payload);
			},
			insertScriptResource(resource) {
				state.result?.scriptResources.push(resource);
			},
			insertStyleResource(resource) {
				state.result?.styleResources.push(resource);
			},
			insertStyleHash(hash) {
				state.result?.styleHashes.push(hash);
			},
			insertScriptHash(hash) {
				state.result?.scriptHashes.push(hash);
			}
		};
	}
	computeCurrentLocale() {
		const { url, pipeline: { i18n }, routeData } = this;
		if (!i18n || !routeData) return;
		const { defaultLocale, locales, strategy } = i18n;
		const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
		if (this.#currentLocale) return this.#currentLocale;
		let computedLocale;
		if (isRouteServerIsland(routeData)) {
			let referer = this.request.headers.get("referer");
			if (referer) {
				if (URL.canParse(referer)) referer = new URL(referer).pathname;
				computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
			}
		} else {
			let pathname = routeData.pathname;
			if (this.#domainPathname) pathname = this.pathname;
			else if (url && !routeData.pattern.test(url.pathname)) {
				for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(url.pathname)) {
					pathname = fallbackRoute.pathname;
					break;
				}
			}
			pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname ?? this.pathname;
			computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
			if (routeData.params.length > 0) {
				const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
				if (localeFromParams) computedLocale = localeFromParams;
			}
		}
		this.#currentLocale = computedLocale ?? fallbackTo;
		return this.#currentLocale;
	}
	computePreferredLocale() {
		const { pipeline: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
	}
	computePreferredLocaleList() {
		const { pipeline: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
	}
	/**
	* Lazily loads the route's component module. Returns the cached
	* instance if already loaded. The promise is cached so concurrent
	* callers share the same load.
	*/
	async loadComponentInstance() {
		if (this.componentInstance) return this.componentInstance;
		if (this.#componentInstancePromise) return this.#componentInstancePromise;
		this.#componentInstancePromise = this.pipeline.getComponentByRoute(this.routeData).then((mod) => {
			this.componentInstance = mod;
			return mod;
		});
		return this.#componentInstancePromise;
	}
	/**
	* Registers a context provider under the given key. Handlers call
	* this to contribute values to the request context (e.g. sessions).
	* The `create` factory is called lazily on the first `resolve(key)`.
	*/
	provide(key, provider) {
		(this.#providers ??= /* @__PURE__ */ new Map()).set(key, provider);
	}
	/**
	* Lazily resolves a provider registered under `key`. Calls
	* `provider.create()` on first access and caches the result.
	* Returns `undefined` if no provider was registered for the key.
	*/
	resolve(key) {
		if (this.#providersResolvedValues?.has(key)) return this.#providersResolvedValues.get(key);
		const provider = this.#providers?.get(key);
		if (!provider) return void 0;
		const value = provider.create();
		(this.#providersResolvedValues ??= /* @__PURE__ */ new Map()).set(key, value);
		return value;
	}
	/**
	* Runs all registered `finalize` callbacks. Should be called after
	* the response is produced, typically in a `finally` block.
	*
	* Returns synchronously (no promise allocation) when nothing needs
	* finalizing — important for the hot path where sessions are not used.
	*/
	finalizeAll() {
		if (!this.#providersResolvedValues || this.#providersResolvedValues.size === 0) return;
		let chain;
		for (const [key, provider] of this.#providers) if (provider.finalize && this.#providersResolvedValues.has(key)) {
			const result = provider.finalize(this.#providersResolvedValues.get(key));
			if (result) chain = chain ? chain.then(() => result) : result;
		}
		return chain;
	}
	/**
	* Adds lazy getters to `target` for each registered provider key.
	* Used by context creation (APIContext, Astro global) so that
	* provider values like `session` and `cache` appear as properties
	* without hard-coding the keys.
	*
	* Always defines a `session` getter (returning `undefined` when no
	* provider is registered) so `ctx.session` / `Astro.session` is a
	* present property regardless of whether the sessions handler was
	* included in the pipeline.
	*/
	defineProviderGetters(target) {
		const state = this;
		if (this.#providers) for (const key of this.#providers.keys()) Object.defineProperty(target, key, {
			get: () => state.resolve(key),
			enumerable: true,
			configurable: true
		});
		if (!this.#providers?.has("session")) {
			let warned = false;
			Object.defineProperty(target, "session", {
				get() {
					if (!warned) {
						warned = true;
						state.pipeline.logger.warn("session", "`Astro.session` was accessed but no session storage is configured. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/");
					}
				},
				enumerable: true,
				configurable: true
			});
		}
	}
	/**
	* Resolves the route to use for this request and stores it on
	* `this.routeData`. If the adapter (or the dev server) provided a
	* `routeData` via render options it's already set and this is a
	* no-op. Otherwise we use the app's synchronous route matcher and
	* fall back to a `404.astro` route so middleware can still run.
	*
	* Called eagerly from the constructor so individual handlers
	* (actions, pages, middleware, etc.) always see a resolved route
	* without the caller needing an extra setup step.
	*
	* Once routeData is known, finalizes `this.pathname`: in dev, if the
	* matched route has no `.html` extension, strip `.html` / `/index.html`
	* suffixes so the rendering pipeline sees the canonical pathname.
	*/
	/**
	* Strip `.html` / `/index.html` suffixes from the pathname so the
	* rendering pipeline sees the canonical route path. Only applies to
	* page routes where `.html` is framework-injected. Endpoint routes
	* preserve `.html` because any such suffix is user-provided (e.g.
	* from `getStaticPaths` params). Skipped when the matched route
	* itself has an `.html` extension in its definition.
	*/
	#stripHtmlExtension() {
		if (this.routeData && this.routeData.type === "page" && !routeHasHtmlExtension(this.routeData)) this.pathname = this.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
	}
	#resolveRouteData() {
		const pipeline = this.pipeline;
		if (this.routeData) {
			this.#stripHtmlExtension();
			return;
		}
		const matched = pipeline.matchRoute(this.pathname);
		if (matched && matched.prerender && pipeline.manifest.serverLike) if (matched.params.length > 0) {
			const allMatches = pipeline.matchAllRoutes(this.pathname);
			this.routeData = allMatches.find((r) => !r.prerender);
		} else this.routeData = void 0;
		else this.routeData = matched;
		pipeline.logger.debug("router", "Astro matched the following route for " + this.request.url);
		pipeline.logger.debug("router", "RouteData:\n" + this.routeData);
		if (!this.routeData) {
			const custom404 = getCustom404Route(pipeline.manifestData);
			if (custom404 && !custom404.prerender) this.routeData = custom404;
		}
		if (!this.routeData) {
			pipeline.logger.debug("router", "Astro hasn't found routes that match " + this.request.url);
			pipeline.logger.debug("router", "Here's the available routes:\n", pipeline.manifestData);
			return;
		}
		this.#stripHtmlExtension();
	}
	/**
	* Strips the pipeline's base from the request URL, prepends a forward
	* slash, and decodes the pathname. Falls back to the raw (not decoded)
	* pathname if `decodeURI` throws.
	*
	* Mirrors `BaseApp.removeBase`, including the
	* `collapseDuplicateLeadingSlashes` fix that prevents middleware
	* authorization bypass when the URL starts with `//`.
	*/
	#computePathname(url) {
		let pathname = collapseDuplicateLeadingSlashes(url.pathname);
		const base = this.pipeline.manifest.base;
		if (pathname.startsWith(base)) {
			const baseWithoutTrailingSlash = removeTrailingForwardSlash(base);
			pathname = pathname.slice(baseWithoutTrailingSlash.length + 1);
		}
		pathname = prependForwardSlash(pathname);
		try {
			return validateAndDecodePathname(pathname);
		} catch (e) {
			if (e instanceof MultiLevelEncodingError) {
				this.invalidEncoding = true;
				return pathname;
			}
			this.pipeline.logger.error(null, e.toString());
			return pathname;
		}
	}
	/**
	* Reads X-Forwarded-Proto, X-Forwarded-Host, and X-Forwarded-Port
	* from the request headers, validates them against the manifest's
	* `allowedDomains`, and updates `this.url` accordingly. Also resolves
	* `clientAddress` from X-Forwarded-For when the host is trusted.
	*
	* Only called when `allowedDomains` is configured — without it,
	* forwarded headers are never trusted.
	*/
	#applyForwardedHeaders() {
		const headers = this.request.headers;
		const allowedDomains = this.pipeline.manifest.allowedDomains;
		const validated = validateForwardedHeaders(getFirstForwardedValue$1(headers.get("x-forwarded-proto") ?? void 0), getFirstForwardedValue$1(headers.get("x-forwarded-host") ?? void 0), getFirstForwardedValue$1(headers.get("x-forwarded-port") ?? void 0), allowedDomains);
		if (!validated.protocol && !validated.host && !validated.port) return;
		if (validated.protocol) this.url.protocol = validated.protocol + ":";
		if (validated.host) {
			const colonIdx = validated.host.indexOf(":");
			if (colonIdx !== -1) {
				this.url.hostname = validated.host.slice(0, colonIdx);
				this.url.port = validated.host.slice(colonIdx + 1);
			} else {
				this.url.hostname = validated.host;
				this.url.port = "";
			}
		}
		if (validated.port) this.url.port = validated.port;
		if (validated.host !== void 0 && !this.clientAddress) {
			const forwardedFor = getFirstForwardedValue$1(this.request.headers.get("x-forwarded-for") ?? void 0);
			if (forwardedFor) this.clientAddress = forwardedFor;
		}
		const oldRequest = this.request;
		this.request = new Request(this.url, oldRequest);
		const app = Reflect.get(oldRequest, appSymbol);
		if (app !== void 0) Reflect.set(this.request, appSymbol, app);
	}
	/**
	* Returns the resolved `props` for this render, computing them lazily
	* from the route + component module on first access. If the
	* `initialProps` already carries user-supplied props (e.g. the
	* container API) those are used verbatim.
	*/
	async getProps() {
		if (this.props !== null) return this.props;
		if (Object.keys(this.initialProps).length > 0) {
			this.props = this.initialProps;
			return this.props;
		}
		const pipeline = this.pipeline;
		const mod = await this.loadComponentInstance();
		this.props = await getProps({
			mod,
			routeData: this.routeData,
			routeCache: pipeline.routeCache,
			pathname: this.pathname,
			logger: pipeline.logger,
			serverLike: pipeline.manifest.serverLike,
			base: pipeline.manifest.base,
			trailingSlash: pipeline.manifest.trailingSlash
		});
		return this.props;
	}
	/**
	* Returns the `ActionAPIContext` for this render, creating it lazily.
	* Used by middleware, actions, and page dispatch.
	*/
	getActionAPIContext() {
		if (this.actionApiContext !== null) return this.actionApiContext;
		const state = this;
		const ctx = {
			get cookies() {
				return state.cookies;
			},
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			generator: ASTRO_GENERATOR,
			get locals() {
				return state.locals;
			},
			set locals(_) {
				throw new AstroError(LocalsReassigned);
			},
			params: this.params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			request: this.request,
			site: this.pipeline.site,
			url: this.url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return {
					info(msg) {
						state.pipeline.logger.info(null, msg);
					},
					warn(msg) {
						state.pipeline.logger.warn(null, msg);
					},
					error(msg) {
						state.pipeline.logger.error(null, msg);
					}
				};
			}
		};
		this.defineProviderGetters(ctx);
		this.actionApiContext = ctx;
		return this.actionApiContext;
	}
	/**
	* Returns the `APIContext` for this render, creating it lazily from
	* the memoized props + action context.
	*
	* Callers must ensure `getProps()` has resolved at least once before
	* calling this.
	*/
	getAPIContext() {
		if (this.apiContext !== null) return this.apiContext;
		const actionApiContext = this.getActionAPIContext();
		const state = this;
		const redirect = (path, status = 302) => new Response(null, {
			status,
			headers: { Location: path }
		});
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		Reflect.set(actionApiContext, pipelineSymbol, this.pipeline);
		actionApiContext[fetchStateSymbol] = this;
		this.apiContext = Object.assign(actionApiContext, {
			props: this.props,
			redirect,
			rewrite,
			getActionResult: createGetActionResult(actionApiContext.locals),
			callAction: createCallAction(actionApiContext)
		});
		return this.apiContext;
	}
	/**
	* Invalidates the cached `APIContext` so the next `getAPIContext()`
	* call re-derives it from the (possibly mutated) state. Used
	* after an in-flight rewrite swaps the route / request / params.
	*/
	invalidateContexts() {
		this.props = null;
		this.actionApiContext = null;
		this.apiContext = null;
	}
	resetResponseMetadata() {
		this.responseRouteType = void 0;
		this.skipErrorReroute = false;
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/actions/handler.js
var ActionHandler = class {
	/**
	* Run action handling for the current request. Expects the APIContext
	* that is already being used by the render pipeline.
	*
	* Returns a `Response` when the action fully handles the request (RPC),
	* or `undefined` when the caller should continue processing the
	* request (form actions or non-action requests).
	*/
	handle(apiContext, state) {
		state.pipeline.usedFeatures |= PipelineFeatures.actions;
		if (apiContext.isPrerendered) return;
		const { action, setActionResult } = getActionContext(apiContext);
		if (!action) return;
		return this.#executeAction(action, setActionResult);
	}
	async #executeAction(action, setActionResult) {
		const serialized = serializeActionResult(await action.handler());
		if (action.calledFrom === "rpc") {
			if (serialized.type === "empty") return new Response(null, { status: serialized.status });
			return new Response(serialized.body, {
				status: serialized.status,
				headers: { "Content-Type": serialized.contentType }
			});
		}
		setActionResult(action.name, serialized);
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/app/prepare-response.js
function prepareResponse(response, { addCookieHeader }) {
	if (addCookieHeader) for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) response.headers.append("set-cookie", setCookieHeaderValue);
	Reflect.set(response, responseSentSymbol$1, true);
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/routing/3xx.js
function redirectTemplate({ status, absoluteLocation, relativeLocation, from }) {
	const delay = status === 302 ? 2 : 0;
	const rel = escape(String(relativeLocation));
	return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(String(absoluteLocation))}">
<body>
	<a href="${rel}">Redirecting ${from ? `from <code>${escape(from)}</code> ` : ""}to <code>${rel}</code></a>
</body>`;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/routing/trailing-slash-handler.js
var TrailingSlashHandler = class {
	#app;
	constructor(app) {
		this.#app = app;
	}
	/**
	* Returns a redirect `Response` if the request pathname needs
	* normalization, or `undefined` if no redirect is required.
	*/
	handle(state) {
		const url = new URL(state.request.url);
		const redirect = this.#redirectTrailingSlash(url.pathname);
		if (redirect === url.pathname) return;
		const addCookieHeader = state.renderOptions.addCookieHeader;
		const status = state.request.method === "GET" ? 301 : 308;
		const response = new Response(redirectTemplate({
			status,
			relativeLocation: url.pathname,
			absoluteLocation: redirect,
			from: state.request.url
		}), {
			status,
			headers: { location: redirect + url.search }
		});
		prepareResponse(response, { addCookieHeader });
		return response;
	}
	#redirectTrailingSlash(pathname) {
		const { trailingSlash } = this.#app.manifest;
		if (pathname === "/" || isInternalPath(pathname)) return pathname;
		const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
		if (path !== pathname) return path;
		if (trailingSlash === "ignore") return pathname;
		if (trailingSlash === "always" && !hasFileExtension(pathname)) return appendForwardSlash(pathname);
		if (trailingSlash === "never") return removeTrailingForwardSlash(pathname);
		return pathname;
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/cache/runtime/utils.js
function defaultSetHeaders(options) {
	const headers = new Headers();
	const directives = [];
	if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
	if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
	if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
	if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
	if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
	if (options.etag) headers.set("ETag", options.etag);
	return headers;
}
function isLiveDataEntry(value) {
	return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/cache/runtime/cache.js
var APPLY_HEADERS = /* @__PURE__ */ Symbol.for("astro:cache:apply");
var IS_ACTIVE = /* @__PURE__ */ Symbol.for("astro:cache:active");
var AstroCache = class {
	#options = {};
	#tags = /* @__PURE__ */ new Set();
	#disabled = false;
	#provider;
	enabled = true;
	constructor(provider) {
		this.#provider = provider;
	}
	set(input) {
		if (input === false) {
			this.#disabled = true;
			this.#tags.clear();
			this.#options = {};
			return;
		}
		this.#disabled = false;
		let options;
		if (isLiveDataEntry(input)) {
			if (!input.cacheHint) return;
			options = input.cacheHint;
		} else options = input;
		if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
		if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
		if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
		if (options.lastModified !== void 0) {
			if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
		}
		if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
	}
	get tags() {
		return [...this.#tags];
	}
	/**
	* Get the current cache options (read-only snapshot).
	* Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
	*/
	get options() {
		return {
			...this.#options,
			tags: this.tags
		};
	}
	async invalidate(input) {
		if (!this.#provider) throw new AstroError(CacheNotEnabled);
		let options;
		if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
		else options = input;
		return this.#provider.invalidate(options);
	}
	/** @internal */
	[APPLY_HEADERS](response, request) {
		if (this.#disabled) return;
		const finalOptions = {
			...this.#options,
			tags: this.tags
		};
		if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
		const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
		for (const [key, value] of headers) response.headers.set(key, value);
	}
	/** @internal */
	get [IS_ACTIVE]() {
		return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
	}
};
function applyCacheHeaders(cache, response, request) {
	if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/routing/parts.js
var ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
var ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
	const result = [];
	part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
		if (!str) return;
		const dynamic = i % 2 === 1;
		const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
		if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) throw new Error(`Invalid route ${file} \u2014 parameter name must match /^[a-zA-Z0-9_$]+$/`);
		result.push({
			content,
			dynamic,
			spread: dynamic && ROUTE_SPREAD.test(content)
		});
	});
	return result;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/cache/runtime/route-matching.js
function compileCacheRoutes(routes, base, trailingSlash) {
	const compiled = Object.entries(routes).map(([path, options]) => {
		const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
		return {
			pattern: getPattern(segments, base, trailingSlash),
			options,
			segments,
			route: path
		};
	});
	compiled.sort((a, b) => routeComparator({
		segments: a.segments,
		route: a.route,
		type: "page"
	}, {
		segments: b.segments,
		route: b.route,
		type: "page"
	}));
	return compiled;
}
function matchCacheRoute(pathname, compiledRoutes) {
	for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
	return null;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/cache/handler.js
var CACHE_KEY = "cache";
function provideCache(state) {
	const pipeline = state.pipeline;
	if (!pipeline.cacheConfig) {
		state.provide(CACHE_KEY, { create: () => new DisabledAstroCache(pipeline.logger) });
		return;
	}
	if (pipeline.runtimeMode === "development") {
		state.provide(CACHE_KEY, { create: () => new NoopAstroCache() });
		return;
	}
	return provideCacheAsync(state, pipeline);
}
async function provideCacheAsync(state, pipeline) {
	const cacheProvider = await pipeline.getCacheProvider();
	state.provide(CACHE_KEY, { create() {
		const cache = new AstroCache(cacheProvider);
		if (pipeline.cacheConfig?.routes) {
			if (!pipeline.compiledCacheRoutes) pipeline.compiledCacheRoutes = compileCacheRoutes(pipeline.cacheConfig.routes, pipeline.manifest.base, pipeline.manifest.trailingSlash);
			const matched = matchCacheRoute(state.pathname, pipeline.compiledCacheRoutes);
			if (matched) cache.set(matched);
		}
		return cache;
	} });
}
var CacheHandler = class {
	#app;
	constructor(app) {
		this.#app = app;
	}
	async handle(state, next) {
		this.#app.pipeline.usedFeatures |= PipelineFeatures.cache;
		if (!this.#app.pipeline.cacheProvider) return next();
		const cache = state.resolve(CACHE_KEY);
		const cacheProvider = await this.#app.pipeline.getCacheProvider();
		if (cacheProvider?.onRequest) {
			const response2 = await cacheProvider.onRequest({
				request: state.request,
				url: new URL(state.request.url),
				waitUntil: state.renderOptions.waitUntil
			}, async () => {
				const res = await next();
				applyCacheHeaders(cache, res, state.request);
				return res;
			});
			response2.headers.delete("CDN-Cache-Control");
			response2.headers.delete("Cache-Tag");
			return response2;
		}
		const response = await next();
		applyCacheHeaders(cache, response, state.request);
		return response;
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/redirects/render.js
function isExternalURL(url) {
	return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
	if (typeof redirect === "string") return isExternalURL(redirect);
	else return isExternalURL(redirect.destination);
}
function computeRedirectStatus(method, redirect, redirectRoute) {
	return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
	if (typeof redirectRoute !== "undefined") return getRouteGenerator(redirectRoute.segments, trailingSlash)(params) || redirectRoute?.pathname || "/";
	else if (typeof redirect === "string") if (redirectIsExternal(redirect)) return redirect;
	else {
		let target = redirect;
		for (const param of Object.keys(params)) {
			const paramValue = params[param];
			target = target.replace(`[${param}]`, paramValue).replace(`[...${param}]`, paramValue);
		}
		return target;
	}
	else if (typeof redirect === "undefined") return "/";
	return redirect.destination;
}
async function renderRedirect(state) {
	state.pipeline.usedFeatures |= PipelineFeatures.redirects;
	const { redirect, redirectRoute } = state.routeData;
	const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
	const headers = { location: encodeURI(resolveRedirectTarget(state.params, redirect, redirectRoute, state.pipeline.manifest.trailingSlash)) };
	if (redirect && redirectIsExternal(redirect)) if (typeof redirect === "string") return Response.redirect(redirect, status);
	else return Response.redirect(redirect.destination, status);
	return new Response(null, {
		status,
		headers
	});
}
//#endregion
//#region node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs
var suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
var suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
var JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
	if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
		warnKeyDropped(key);
		return;
	}
	return value;
}
function warnKeyDropped(key) {
	console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
	if (typeof value !== "string") return value;
	if (value[0] === "\"" && value[value.length - 1] === "\"" && value.indexOf("\\") === -1) return value.slice(1, -1);
	const _value = value.trim();
	if (_value.length <= 9) switch (_value.toLowerCase()) {
		case "true": return true;
		case "false": return false;
		case "undefined": return;
		case "null": return null;
		case "nan": return NaN;
		case "infinity": return Number.POSITIVE_INFINITY;
		case "-infinity": return Number.NEGATIVE_INFINITY;
	}
	if (!JsonSigRx.test(value)) {
		if (options.strict) throw new SyntaxError("[destr] Invalid JSON");
		return value;
	}
	try {
		if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
			if (options.strict) throw new Error("[destr] Possible prototype pollution");
			return JSON.parse(value, jsonParseTransform);
		}
		return JSON.parse(value);
	} catch (error) {
		if (options.strict) throw error;
		return value;
	}
}
//#endregion
//#region node_modules/.pnpm/unstorage@1.17.5/node_modules/unstorage/dist/shared/unstorage.zVDD2mZo.mjs
function wrapToPromise(value) {
	if (!value || typeof value.then !== "function") return Promise.resolve(value);
	return value;
}
function asyncCall(function_, ...arguments_) {
	try {
		return wrapToPromise(function_(...arguments_));
	} catch (error) {
		return Promise.reject(error);
	}
}
function isPrimitive(value) {
	const type = typeof value;
	return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
	const proto = Object.getPrototypeOf(value);
	return !proto || proto.isPrototypeOf(Object);
}
function stringify$1(value) {
	if (isPrimitive(value)) return String(value);
	if (isPureObject(value) || Array.isArray(value)) return JSON.stringify(value);
	if (typeof value.toJSON === "function") return stringify$1(value.toJSON());
	throw new Error("[unstorage] Cannot stringify value!");
}
var BASE64_PREFIX = "base64:";
function serializeRaw(value) {
	if (typeof value === "string") return value;
	return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
	if (typeof value !== "string") return value;
	if (!value.startsWith(BASE64_PREFIX)) return value;
	return base64Decode(value.slice(7));
}
function base64Decode(input) {
	if (globalThis.Buffer) return Buffer.from(input, "base64");
	return Uint8Array.from(globalThis.atob(input), (c) => c.codePointAt(0));
}
function base64Encode(input) {
	if (globalThis.Buffer) return Buffer.from(input).toString("base64");
	return globalThis.btoa(String.fromCodePoint(...input));
}
function normalizeKey(key) {
	if (!key) return "";
	return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
	return normalizeKey(keys.join(":"));
}
function normalizeBaseKey(base) {
	base = normalizeKey(base);
	return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
	if (depth === void 0) return true;
	let substrCount = 0;
	let index = key.indexOf(":");
	while (index > -1) {
		substrCount++;
		index = key.indexOf(":", index + 1);
	}
	return substrCount <= depth;
}
function filterKeyByBase(key, base) {
	if (base) return key.startsWith(base) && key[key.length - 1] !== "$";
	return key[key.length - 1] !== "$";
}
//#endregion
//#region node_modules/.pnpm/unstorage@1.17.5/node_modules/unstorage/dist/index.mjs
function defineDriver(factory) {
	return factory;
}
var DRIVER_NAME = "memory";
var memory = defineDriver(() => {
	const data = /* @__PURE__ */ new Map();
	return {
		name: DRIVER_NAME,
		getInstance: () => data,
		hasItem(key) {
			return data.has(key);
		},
		getItem(key) {
			return data.get(key) ?? null;
		},
		getItemRaw(key) {
			return data.get(key) ?? null;
		},
		setItem(key, value) {
			data.set(key, value);
		},
		setItemRaw(key, value) {
			data.set(key, value);
		},
		removeItem(key) {
			data.delete(key);
		},
		getKeys() {
			return [...data.keys()];
		},
		clear() {
			data.clear();
		},
		dispose() {
			data.clear();
		}
	};
});
function createStorage(options = {}) {
	const context = {
		mounts: { "": options.driver || memory() },
		mountpoints: [""],
		watching: false,
		watchListeners: [],
		unwatch: {}
	};
	const getMount = (key) => {
		for (const base of context.mountpoints) if (key.startsWith(base)) return {
			base,
			relativeKey: key.slice(base.length),
			driver: context.mounts[base]
		};
		return {
			base: "",
			relativeKey: key,
			driver: context.mounts[""]
		};
	};
	const getMounts = (base, includeParent) => {
		return context.mountpoints.filter((mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)).map((mountpoint) => ({
			relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
			mountpoint,
			driver: context.mounts[mountpoint]
		}));
	};
	const onChange = (event, key) => {
		if (!context.watching) return;
		key = normalizeKey(key);
		for (const listener of context.watchListeners) listener(event, key);
	};
	const startWatch = async () => {
		if (context.watching) return;
		context.watching = true;
		for (const mountpoint in context.mounts) context.unwatch[mountpoint] = await watch(context.mounts[mountpoint], onChange, mountpoint);
	};
	const stopWatch = async () => {
		if (!context.watching) return;
		for (const mountpoint in context.unwatch) await context.unwatch[mountpoint]();
		context.unwatch = {};
		context.watching = false;
	};
	const runBatch = (items, commonOptions, cb) => {
		const batches = /* @__PURE__ */ new Map();
		const getBatch = (mount) => {
			let batch = batches.get(mount.base);
			if (!batch) {
				batch = {
					driver: mount.driver,
					base: mount.base,
					items: []
				};
				batches.set(mount.base, batch);
			}
			return batch;
		};
		for (const item of items) {
			const isStringItem = typeof item === "string";
			const key = normalizeKey(isStringItem ? item : item.key);
			const value = isStringItem ? void 0 : item.value;
			const options2 = isStringItem || !item.options ? commonOptions : {
				...commonOptions,
				...item.options
			};
			const mount = getMount(key);
			getBatch(mount).items.push({
				key,
				value,
				relativeKey: mount.relativeKey,
				options: options2
			});
		}
		return Promise.all([...batches.values()].map((batch) => cb(batch))).then((r) => r.flat());
	};
	const storage = {
		hasItem(key, opts = {}) {
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			return asyncCall(driver.hasItem, relativeKey, opts);
		},
		getItem(key, opts = {}) {
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			return asyncCall(driver.getItem, relativeKey, opts).then((value) => destr(value));
		},
		getItems(items, commonOptions = {}) {
			return runBatch(items, commonOptions, (batch) => {
				if (batch.driver.getItems) return asyncCall(batch.driver.getItems, batch.items.map((item) => ({
					key: item.relativeKey,
					options: item.options
				})), commonOptions).then((r) => r.map((item) => ({
					key: joinKeys(batch.base, item.key),
					value: destr(item.value)
				})));
				return Promise.all(batch.items.map((item) => {
					return asyncCall(batch.driver.getItem, item.relativeKey, item.options).then((value) => ({
						key: item.key,
						value: destr(value)
					}));
				}));
			});
		},
		getItemRaw(key, opts = {}) {
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			if (driver.getItemRaw) return asyncCall(driver.getItemRaw, relativeKey, opts);
			return asyncCall(driver.getItem, relativeKey, opts).then((value) => deserializeRaw(value));
		},
		async setItem(key, value, opts = {}) {
			if (value === void 0) return storage.removeItem(key);
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			if (!driver.setItem) return;
			await asyncCall(driver.setItem, relativeKey, stringify$1(value), opts);
			if (!driver.watch) onChange("update", key);
		},
		async setItems(items, commonOptions) {
			await runBatch(items, commonOptions, async (batch) => {
				if (batch.driver.setItems) return asyncCall(batch.driver.setItems, batch.items.map((item) => ({
					key: item.relativeKey,
					value: stringify$1(item.value),
					options: item.options
				})), commonOptions);
				if (!batch.driver.setItem) return;
				await Promise.all(batch.items.map((item) => {
					return asyncCall(batch.driver.setItem, item.relativeKey, stringify$1(item.value), item.options);
				}));
			});
		},
		async setItemRaw(key, value, opts = {}) {
			if (value === void 0) return storage.removeItem(key, opts);
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			if (driver.setItemRaw) await asyncCall(driver.setItemRaw, relativeKey, value, opts);
			else if (driver.setItem) await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
			else return;
			if (!driver.watch) onChange("update", key);
		},
		async removeItem(key, opts = {}) {
			if (typeof opts === "boolean") opts = { removeMeta: opts };
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			if (!driver.removeItem) return;
			await asyncCall(driver.removeItem, relativeKey, opts);
			if (opts.removeMeta || opts.removeMata) await asyncCall(driver.removeItem, relativeKey + "$", opts);
			if (!driver.watch) onChange("remove", key);
		},
		async getMeta(key, opts = {}) {
			if (typeof opts === "boolean") opts = { nativeOnly: opts };
			key = normalizeKey(key);
			const { relativeKey, driver } = getMount(key);
			const meta = /* @__PURE__ */ Object.create(null);
			if (driver.getMeta) Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
			if (!opts.nativeOnly) {
				const value = await asyncCall(driver.getItem, relativeKey + "$", opts).then((value_) => destr(value_));
				if (value && typeof value === "object") {
					if (typeof value.atime === "string") value.atime = new Date(value.atime);
					if (typeof value.mtime === "string") value.mtime = new Date(value.mtime);
					Object.assign(meta, value);
				}
			}
			return meta;
		},
		setMeta(key, value, opts = {}) {
			return this.setItem(key + "$", value, opts);
		},
		removeMeta(key, opts = {}) {
			return this.removeItem(key + "$", opts);
		},
		async getKeys(base, opts = {}) {
			base = normalizeBaseKey(base);
			const mounts = getMounts(base, true);
			let maskedMounts = [];
			const allKeys = [];
			let allMountsSupportMaxDepth = true;
			for (const mount of mounts) {
				if (!mount.driver.flags?.maxDepth) allMountsSupportMaxDepth = false;
				const rawKeys = await asyncCall(mount.driver.getKeys, mount.relativeBase, opts);
				for (const key of rawKeys) {
					const fullKey = mount.mountpoint + normalizeKey(key);
					if (!maskedMounts.some((p) => fullKey.startsWith(p))) allKeys.push(fullKey);
				}
				maskedMounts = [mount.mountpoint, ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))];
			}
			const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
			return allKeys.filter((key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base));
		},
		async clear(base, opts = {}) {
			base = normalizeBaseKey(base);
			await Promise.all(getMounts(base, false).map(async (m) => {
				if (m.driver.clear) return asyncCall(m.driver.clear, m.relativeBase, opts);
				if (m.driver.removeItem) {
					const keys = await m.driver.getKeys(m.relativeBase || "", opts);
					return Promise.all(keys.map((key) => m.driver.removeItem(key, opts)));
				}
			}));
		},
		async dispose() {
			await Promise.all(Object.values(context.mounts).map((driver) => dispose(driver)));
		},
		async watch(callback) {
			await startWatch();
			context.watchListeners.push(callback);
			return async () => {
				context.watchListeners = context.watchListeners.filter((listener) => listener !== callback);
				if (context.watchListeners.length === 0) await stopWatch();
			};
		},
		async unwatch() {
			context.watchListeners = [];
			await stopWatch();
		},
		mount(base, driver) {
			base = normalizeBaseKey(base);
			if (base && context.mounts[base]) throw new Error(`already mounted at ${base}`);
			if (base) {
				context.mountpoints.push(base);
				context.mountpoints.sort((a, b) => b.length - a.length);
			}
			context.mounts[base] = driver;
			if (context.watching) Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
				context.unwatch[base] = unwatcher;
			}).catch(console.error);
			return storage;
		},
		async unmount(base, _dispose = true) {
			base = normalizeBaseKey(base);
			if (!base || !context.mounts[base]) return;
			if (context.watching && base in context.unwatch) {
				context.unwatch[base]?.();
				delete context.unwatch[base];
			}
			if (_dispose) await dispose(context.mounts[base]);
			context.mountpoints = context.mountpoints.filter((key) => key !== base);
			delete context.mounts[base];
		},
		getMount(key = "") {
			key = normalizeKey(key) + ":";
			const m = getMount(key);
			return {
				driver: m.driver,
				base: m.base
			};
		},
		getMounts(base = "", opts = {}) {
			base = normalizeKey(base);
			return getMounts(base, opts.parents).map((m) => ({
				driver: m.driver,
				base: m.mountpoint
			}));
		},
		keys: (base, opts = {}) => storage.getKeys(base, opts),
		get: (key, opts = {}) => storage.getItem(key, opts),
		set: (key, value, opts = {}) => storage.setItem(key, value, opts),
		has: (key, opts = {}) => storage.hasItem(key, opts),
		del: (key, opts = {}) => storage.removeItem(key, opts),
		remove: (key, opts = {}) => storage.removeItem(key, opts)
	};
	return storage;
}
function watch(driver, onChange, base) {
	return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {};
}
async function dispose(driver) {
	if (typeof driver.dispose === "function") await asyncCall(driver.dispose);
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/session/runtime.js
var PERSIST_SYMBOL = /* @__PURE__ */ Symbol();
var DEFAULT_COOKIE_NAME = "astro-session";
var VALID_COOKIE_REGEX = /^[\w-]+$/;
var unflatten = (parsed, _) => {
	return unflatten$1(parsed, { URL: (href) => new URL(href) });
};
var stringify = (data, _) => {
	return stringify$2(data, { URL: (val) => val instanceof URL && val.href });
};
var AstroSession = class AstroSession {
	#cookies;
	#config;
	#cookieConfig;
	#cookieName;
	#storage;
	#data;
	#sessionID;
	#toDestroy = /* @__PURE__ */ new Set();
	#toDelete = /* @__PURE__ */ new Set();
	#dirty = false;
	#cookieSet = false;
	#sessionIDFromCookie = false;
	#partial = true;
	#driverFactory;
	static #sharedStorage = /* @__PURE__ */ new Map();
	constructor({ cookies, config, runtimeMode, driverFactory, mockStorage }) {
		if (!config) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("No driver was defined in the session configuration and the adapter did not provide a default driver.")
		});
		this.#cookies = cookies;
		this.#driverFactory = driverFactory;
		const { cookie: cookieConfig = DEFAULT_COOKIE_NAME, ...configRest } = config;
		let cookieConfigObject;
		if (typeof cookieConfig === "object") {
			const { name = DEFAULT_COOKIE_NAME, ...rest } = cookieConfig;
			this.#cookieName = name;
			cookieConfigObject = rest;
		} else this.#cookieName = cookieConfig || DEFAULT_COOKIE_NAME;
		this.#cookieConfig = {
			sameSite: "lax",
			secure: runtimeMode === "production",
			path: "/",
			...cookieConfigObject,
			httpOnly: true
		};
		this.#config = configRest;
		if (mockStorage) this.#storage = mockStorage;
	}
	/**
	* Gets a session value. Returns `undefined` if the session or value does not exist.
	*/
	async get(key) {
		return (await this.#ensureData()).get(key)?.data;
	}
	/**
	* Checks if a session value exists.
	*/
	async has(key) {
		return (await this.#ensureData()).has(key);
	}
	/**
	* Gets all session values.
	*/
	async keys() {
		return (await this.#ensureData()).keys();
	}
	/**
	* Gets all session values.
	*/
	async values() {
		return [...(await this.#ensureData()).values()].map((entry) => entry.data);
	}
	/**
	* Gets all session entries.
	*/
	async entries() {
		return [...(await this.#ensureData()).entries()].map(([key, entry]) => [key, entry.data]);
	}
	/**
	* Deletes a session value.
	*/
	delete(key) {
		this.#data ??= /* @__PURE__ */ new Map();
		this.#data.delete(key);
		if (this.#partial) this.#toDelete.add(key);
		this.#dirty = true;
	}
	/**
	* Sets a session value. The session is created if it does not exist.
	*/
	set(key, value, { ttl } = {}) {
		if (!key) throw new AstroError({
			...SessionStorageSaveError,
			message: "The session key was not provided."
		});
		let cloned;
		try {
			cloned = unflatten(JSON.parse(stringify(value)));
		} catch (err) {
			throw new AstroError({
				...SessionStorageSaveError,
				message: `The session data for ${key} could not be serialized.`,
				hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
			}, { cause: err });
		}
		if (!this.#cookieSet) {
			this.#setCookie();
			this.#cookieSet = true;
		}
		this.#data ??= /* @__PURE__ */ new Map();
		const lifetime = ttl ?? this.#config.ttl;
		const expires = typeof lifetime === "number" ? Date.now() + lifetime * 1e3 : lifetime;
		this.#data.set(key, {
			data: cloned,
			expires
		});
		this.#dirty = true;
	}
	/**
	* Destroys the session, clearing the cookie and storage if it exists.
	*/
	destroy() {
		const sessionId = this.#sessionID ?? this.#cookies.get(this.#cookieName)?.value;
		if (sessionId) this.#toDestroy.add(sessionId);
		this.#cookies.delete(this.#cookieName, this.#cookieConfig);
		this.#sessionID = void 0;
		this.#data = void 0;
		this.#dirty = true;
	}
	/**
	* Regenerates the session, creating a new session ID. The existing session data is preserved.
	*/
	async regenerate() {
		let data = /* @__PURE__ */ new Map();
		try {
			data = await this.#ensureData();
		} catch (err) {
			console.error("Failed to load session data during regeneration:", err);
		}
		const oldSessionId = this.#sessionID;
		this.#sessionID = crypto.randomUUID();
		this.#sessionIDFromCookie = false;
		this.#data = data;
		this.#dirty = true;
		await this.#setCookie();
		if (oldSessionId && this.#storage) this.#storage.removeItem(oldSessionId).catch((err) => {
			console.error("Failed to remove old session data:", err);
		});
	}
	async [PERSIST_SYMBOL]() {
		if (!this.#dirty && !this.#toDestroy.size) return;
		const storage = await this.#ensureStorage();
		if (this.#dirty && this.#data) {
			const data = await this.#ensureData();
			this.#toDelete.forEach((key2) => data.delete(key2));
			const key = this.#ensureSessionID();
			let serialized;
			try {
				serialized = stringify(data);
			} catch (err) {
				throw new AstroError({
					...SessionStorageSaveError,
					message: SessionStorageSaveError.message("The session data could not be serialized.", this.#config.driver)
				}, { cause: err });
			}
			await storage.setItem(key, serialized);
			this.#dirty = false;
		}
		if (this.#toDestroy.size > 0) {
			const cleanupPromises = [...this.#toDestroy].map((sessionId) => storage.removeItem(sessionId).catch((err) => {
				console.error("Failed to clean up session %s:", sessionId, err);
			}));
			await Promise.all(cleanupPromises);
			this.#toDestroy.clear();
		}
	}
	get sessionID() {
		return this.#sessionID;
	}
	/**
	* Loads a session from storage with the given ID, and replaces the current session.
	* Any changes made to the current session will be lost.
	* This is not normally needed, as the session is automatically loaded using the cookie.
	* However it can be used to restore a session where the ID has been recorded somewhere
	* else (e.g. in a database).
	*/
	async load(sessionID) {
		this.#sessionID = sessionID;
		this.#data = void 0;
		await this.#setCookie();
		await this.#ensureData();
	}
	/**
	* Sets the session cookie.
	*/
	async #setCookie() {
		if (!VALID_COOKIE_REGEX.test(this.#cookieName)) throw new AstroError({
			...SessionStorageSaveError,
			message: "Invalid cookie name. Cookie names can only contain letters, numbers, and dashes."
		});
		const value = this.#ensureSessionID();
		this.#cookies.set(this.#cookieName, value, this.#cookieConfig);
	}
	/**
	* Attempts to load the session data from storage, or creates a new data object if none exists.
	* If there is existing partial data, it will be merged into the new data object.
	*/
	async #ensureData() {
		if (this.#data && !this.#partial) return this.#data;
		this.#data ??= /* @__PURE__ */ new Map();
		if (!this.#sessionID && !this.#cookies.get(this.#cookieName)?.value) {
			this.#partial = false;
			return this.#data;
		}
		const raw = await (await this.#ensureStorage()).get(this.#ensureSessionID());
		if (!raw) {
			if (this.#sessionIDFromCookie) {
				this.#sessionID = crypto.randomUUID();
				this.#sessionIDFromCookie = false;
				if (this.#cookieSet) await this.#setCookie();
			}
			return this.#data;
		}
		try {
			const storedMap = unflatten(raw);
			if (!(storedMap instanceof Map)) {
				await this.destroy();
				throw new AstroError({
					...SessionStorageInitError,
					message: SessionStorageInitError.message("The session data was an invalid type.", this.#config.driver)
				});
			}
			const now = Date.now();
			for (const [key, value] of storedMap) {
				const expired = typeof value.expires === "number" && value.expires < now;
				if (!this.#data.has(key) && !this.#toDelete.has(key) && !expired) this.#data.set(key, value);
			}
			this.#partial = false;
			return this.#data;
		} catch (err) {
			await this.destroy();
			if (err instanceof AstroError) throw err;
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("The session data could not be parsed.", this.#config.driver)
			}, { cause: err });
		}
	}
	/**
	* Returns the session ID, generating a new one if it does not exist.
	*/
	#ensureSessionID() {
		if (!this.#sessionID) {
			const cookieValue = this.#cookies.get(this.#cookieName)?.value;
			if (cookieValue) {
				this.#sessionID = cookieValue;
				this.#sessionIDFromCookie = true;
			} else this.#sessionID = crypto.randomUUID();
		}
		return this.#sessionID;
	}
	/**
	* Ensures the storage is initialized.
	* This is called automatically when a storage operation is needed.
	*/
	async #ensureStorage() {
		if (this.#storage) return this.#storage;
		if (AstroSession.#sharedStorage.has(this.#config.driver)) {
			this.#storage = AstroSession.#sharedStorage.get(this.#config.driver);
			return this.#storage;
		}
		if (!this.#driverFactory) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("Astro could not load the driver correctly. Does it exist?", this.#config.driver)
		});
		const driver = this.#driverFactory;
		try {
			this.#storage = createStorage({ driver: {
				...driver(this.#config.options),
				hasItem() {
					return false;
				},
				getKeys() {
					return [];
				}
			} });
			AstroSession.#sharedStorage.set(this.#config.driver, this.#storage);
			return this.#storage;
		} catch (err) {
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("Unknown error", this.#config.driver)
			}, { cause: err });
		}
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/session/handler.js
var SESSION_KEY = "session";
function provideSession(state) {
	state.pipeline.usedFeatures |= PipelineFeatures.sessions;
	const config = state.pipeline.manifest.sessionConfig;
	if (!config) return;
	return provideSessionAsync(state, config);
}
async function provideSessionAsync(state, config) {
	const pipeline = state.pipeline;
	const driverFactory = await pipeline.getSessionDriver();
	if (!driverFactory) return;
	state.provide(SESSION_KEY, {
		create() {
			const cookies = state.cookies;
			return new AstroSession({
				cookies,
				config,
				runtimeMode: pipeline.runtimeMode,
				driverFactory,
				mockStorage: null
			});
		},
		finalize(session) {
			return session[PERSIST_SYMBOL]();
		}
	});
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/routing/handler.js
var AstroHandler = class {
	#app;
	#trailingSlashHandler;
	#actionHandler;
	#astroMiddleware;
	#pagesHandler;
	#cacheHandler;
	/** Bound callback for the middleware chain — created once, reused per request. */
	#renderRouteCallback;
	/**
	* i18n post-processor. Only set when the app has i18n configured and
	* the strategy is not `manual` — for the manual strategy users wire
	* `astro:i18n.middleware(...)` into their own `onRequest`.
	*/
	#i18n;
	/** Whether sessions are configured on the manifest. */
	#hasSession;
	constructor(app) {
		this.#app = app;
		this.#trailingSlashHandler = new TrailingSlashHandler(app);
		this.#actionHandler = new ActionHandler();
		this.#astroMiddleware = new AstroMiddleware(app.pipeline);
		this.#pagesHandler = new PagesHandler(app.pipeline);
		this.#cacheHandler = new CacheHandler(app);
		this.#renderRouteCallback = this.#actionsAndPages.bind(this);
		this.#hasSession = !!app.manifest.sessionConfig;
		const i18n = app.manifest.i18n;
		if (i18n && i18n.strategy !== "manual") this.#i18n = new I18n(i18n, app.manifest.base, app.manifest.trailingSlash, app.manifest.buildFormat);
	}
	/**
	* Runs actions then pages — the callback at the bottom of the
	* middleware chain. Bound once in the constructor to avoid
	* per-request closure allocation.
	*/
	#actionsAndPages(state, ctx) {
		if (!state.skipMiddleware) {
			const actionResult = this.#actionHandler.handle(ctx, state);
			if (actionResult) return actionResult.then((response) => response ?? this.#pagesHandler.handle(state, ctx));
		}
		return this.#pagesHandler.handle(state, ctx);
	}
	async handle(state) {
		state.pipeline.usedFeatures |= ALL_PIPELINE_FEATURES;
		if (state.invalidEncoding) return new Response(null, {
			status: 400,
			statusText: "Bad Request"
		});
		const trailingSlashRedirect = this.#trailingSlashHandler.handle(state);
		if (trailingSlashRedirect) return trailingSlashRedirect;
		if (!state.routeData) return this.#app.renderError(state.request, {
			...state.renderOptions,
			status: 404,
			pathname: state.pathname
		});
		return this.render(state);
	}
	/**
	* Renders a response for the given `FetchState`. Assumes
	* trailing-slash redirects and routeData resolution have already run.
	*
	* User-triggered rewrites (`Astro.rewrite` / `ctx.rewrite`) go through
	* `Rewrites.execute` on the current `FetchState` — they mutate the
	* existing state in place and re-run middleware + page dispatch.
	*/
	async render(state) {
		const routeData = state.routeData;
		const pathname = state.pathname;
		const request = state.request;
		const { addCookieHeader } = state.renderOptions;
		state.status = this.#app.getDefaultStatusCode(routeData, pathname);
		let response;
		try {
			const sessionP = this.#hasSession ? provideSession(state) : void 0;
			const cacheP = provideCache(state);
			if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
			state.pipeline.usedFeatures |= PipelineFeatures.sessions;
			if (routeData.type === "redirect") {
				const redirectResponse = await renderRedirect(state);
				this.#app.logThisRequest({
					pathname,
					method: request.method,
					statusCode: redirectResponse.status,
					isRewrite: false,
					timeStart: state.timeStart
				});
				prepareResponse(redirectResponse, { addCookieHeader });
				this.#app.pipeline.logger.flush();
				return redirectResponse;
			}
			if (!this.#app.pipeline.cacheProvider) {
				this.#app.pipeline.usedFeatures |= PipelineFeatures.cache;
				response = await this.#astroMiddleware.handle(state, this.#renderRouteCallback);
				if (this.#i18n) response = await this.#i18n.finalize(state, response);
			} else {
				const runPipeline = async () => {
					let res = await this.#astroMiddleware.handle(state, this.#renderRouteCallback);
					if (this.#i18n) res = await this.#i18n.finalize(state, res);
					return res;
				};
				response = await this.#cacheHandler.handle(state, runPipeline);
			}
			this.#app.logThisRequest({
				pathname,
				method: request.method,
				statusCode: response.status,
				isRewrite: state.isRewriting,
				timeStart: state.timeStart
			});
		} catch (err) {
			this.#app.logger.error(null, err.stack || err.message || String(err));
			return this.#app.renderError(request, {
				...state.renderOptions,
				status: 500,
				error: err,
				pathname: state.pathname
			});
		} finally {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		}
		if (REROUTABLE_STATUS_CODES.includes(response.status) && response.body === null && !state.skipErrorReroute) return this.#app.renderError(request, {
			...state.renderOptions,
			response,
			status: response.status,
			error: response.status === 500 ? null : void 0,
			pathname: state.pathname
		});
		prepareResponse(response, { addCookieHeader });
		this.#app.pipeline.logger.flush();
		return response;
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/fetch/default-handler.js
var DefaultFetchHandler = class {
	#app;
	#handler;
	constructor(app) {
		this.#app = app ?? null;
		this.#handler = app ? new AstroHandler(app) : null;
	}
	/**
	* Fast path: called directly by `BaseApp.render()` with pre-resolved
	* options, avoiding the `Reflect.set/get` round-trip through the request.
	*/
	renderWithOptions(request, options) {
		if (!this.#app) {
			const app = Reflect.get(request, appSymbol);
			if (!app) throw new Error("No fetch handler provided.");
			this.#app = app;
			this.#handler = new AstroHandler(app);
		}
		const state = new FetchState(this.#app.pipeline, request, options);
		return this.#handler.handle(state);
	}
	fetch = (request) => {
		if (!this.#app) {
			const app = Reflect.get(request, appSymbol);
			if (!app) throw new Error("No fetch handler provided.");
			this.#app = app;
			this.#handler = new AstroHandler(app);
		}
		const state = new FetchState(this.#app.pipeline, request);
		if (!this.#handler) throw new Error("No fetch handler provided.");
		return this.#handler.handle(state);
	};
};
//#endregion
//#region \0virtual:astro:fetchable
var _virtual_astro_fetchable_default = new DefaultFetchHandler();
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/errors/default-handler.js
var DefaultErrorHandler = class {
	#app;
	#astroMiddleware;
	#pagesHandler;
	constructor(app) {
		this.#app = app;
		this.#astroMiddleware = new AstroMiddleware(app.pipeline);
		this.#pagesHandler = new PagesHandler(app.pipeline);
	}
	async renderError(request, { status, response: originalResponse, skipMiddleware = false, error, pathname, ...resolvedRenderOptions }) {
		const app = this.#app;
		const resolvedPathname = pathname ?? new FetchState(app.pipeline, request).pathname;
		const errorRouteData = matchRoute(`/${status}${app.manifest.trailingSlash === "always" ? "/" : ""}`, app.manifestData);
		const url = new URL(request.url);
		if (errorRouteData) {
			if (errorRouteData.prerender) {
				const maybeDotHtml = errorRouteData.route.endsWith(`/${status}`) ? ".html" : "";
				const allowedDomains = app.manifest.allowedDomains;
				const safeOrigin = validateHost(url.host, url.protocol.replace(":", ""), allowedDomains) ? url.origin : `${url.protocol}//localhost`;
				const statusURL = new URL(`${app.baseWithoutTrailingSlash}/${status}${maybeDotHtml}`, safeOrigin);
				if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) try {
					const newResponse = mergeResponses(await resolvedRenderOptions.prerenderedErrorPageFetch(statusURL.toString()), originalResponse, {
						status,
						removeContentEncodingHeaders: true
					});
					prepareResponse(newResponse, resolvedRenderOptions);
					return newResponse;
				} catch {
					const response2 = mergeResponses(new Response(null, { status }), originalResponse);
					prepareResponse(response2, resolvedRenderOptions);
					return response2;
				}
			}
			const mod = await app.pipeline.getComponentByRoute(errorRouteData);
			const errorState = new FetchState(app.pipeline, request);
			errorState.skipMiddleware = skipMiddleware;
			errorState.clientAddress = resolvedRenderOptions.clientAddress;
			errorState.routeData = errorRouteData;
			errorState.pathname = resolvedPathname;
			errorState.status = status;
			errorState.componentInstance = mod;
			errorState.locals = resolvedRenderOptions.locals ?? {};
			errorState.initialProps = { error };
			try {
				await provideSession(errorState);
				const newResponse = mergeResponses(await this.#astroMiddleware.handle(errorState, this.#pagesHandler.handle.bind(this.#pagesHandler)), originalResponse);
				prepareResponse(newResponse, resolvedRenderOptions);
				return newResponse;
			} catch {
				if (skipMiddleware === false) return this.renderError(request, {
					...resolvedRenderOptions,
					status,
					error,
					response: originalResponse,
					skipMiddleware: true,
					pathname: resolvedPathname
				});
			} finally {
				await errorState.finalizeAll();
			}
		}
		const response = mergeResponses(new Response(null, { status }), originalResponse);
		prepareResponse(response, resolvedRenderOptions);
		return response;
	}
};
function mergeResponses(newResponse, originalResponse, override) {
	let newResponseHeaders = newResponse.headers;
	if (override?.removeContentEncodingHeaders) {
		newResponseHeaders = new Headers(newResponseHeaders);
		newResponseHeaders.delete("Content-Encoding");
		newResponseHeaders.delete("Content-Length");
	}
	if (!originalResponse) {
		if (override !== void 0) return new Response(newResponse.body, {
			status: override.status,
			statusText: newResponse.statusText,
			headers: newResponseHeaders
		});
		return newResponse;
	}
	const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
	try {
		originalResponse.headers.delete("Content-type");
		originalResponse.headers.delete("Content-Length");
		originalResponse.headers.delete("Transfer-Encoding");
	} catch {}
	const newHeaders = new Headers();
	const seen = /* @__PURE__ */ new Set();
	for (const [name, value] of originalResponse.headers) {
		newHeaders.append(name, value);
		seen.add(name.toLowerCase());
	}
	for (const [name, value] of newResponseHeaders) if (!seen.has(name.toLowerCase())) newHeaders.append(name, value);
	const mergedResponse = new Response(newResponse.body, {
		status,
		statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
		headers: newHeaders
	});
	const originalCookies = getCookiesFromResponse(originalResponse);
	const newCookies = getCookiesFromResponse(newResponse);
	if (originalCookies) {
		if (newCookies) for (const cookieValue of newCookies.consume()) originalResponse.headers.append("set-cookie", cookieValue);
		attachCookiesToResponse(mergedResponse, originalCookies);
	} else if (newCookies) attachCookiesToResponse(mergedResponse, newCookies);
	return mergedResponse;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/app/base.js
var BaseApp = class BaseApp {
	manifest;
	manifestData;
	pipeline;
	#adapterLogger;
	baseWithoutTrailingSlash;
	/**
	* The handler that turns incoming `Request` objects into `Response`s.
	* Defaults to a `DefaultFetchHandler` pinned to this app and can be
	* overridden via `setFetchHandler` — typically by the bundled
	* entrypoint after importing `virtual:astro:fetchable`.
	*/
	#fetchHandler;
	#errorHandler;
	/**
	* Whether a custom fetch handler (from `src/fetch.ts`) has been set
	* via `setFetchHandler`. When false, the `DefaultFetchHandler` is
	* in use and all features are implicitly active.
	*/
	#hasCustomFetchHandler = false;
	/**
	* Whether the missing-feature check has already run. We only want
	* to warn once — after the first request in dev, or at build end.
	*/
	#featureCheckDone = false;
	get logger() {
		return this.pipeline.logger;
	}
	get adapterLogger() {
		const currentOptions = this.logger.options;
		if (!this.#adapterLogger || this.#adapterLogger.options !== currentOptions) this.#adapterLogger = new AstroIntegrationLogger(currentOptions, this.manifest.adapterName);
		return this.#adapterLogger;
	}
	constructor(manifest, streaming = true, ...args) {
		this.manifest = manifest;
		this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
		this.pipeline = this.createPipeline(streaming, manifest, ...args);
		this.manifestData = this.pipeline.manifestData;
		this.#fetchHandler = new DefaultFetchHandler(this);
		this.#errorHandler = this.createErrorHandler();
	}
	/**
	* Override the fetch handler used to dispatch requests. Entrypoints
	* call this with the default export of `virtual:astro:fetchable` to
	* plug in a user-authored handler from `src/fetch.ts`.
	*/
	setFetchHandler(handler) {
		this.#fetchHandler = handler;
		this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
	}
	/**
	* Returns the error handler strategy used by this app. Override to
	* provide environment-specific behavior (dev overlay, build-time throws, etc.).
	*/
	createErrorHandler() {
		return new DefaultErrorHandler(this);
	}
	/**
	* Resets the cached adapter logger so it picks up a new logger instance.
	* Used by BuildApp when the logger is replaced via setOptions().
	*/
	resetAdapterLogger() {
		this.#adapterLogger = void 0;
	}
	getAllowedDomains() {
		return this.manifest.allowedDomains;
	}
	matchesAllowedDomains(forwardedHost, protocol) {
		return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
	}
	static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
		if (!allowedDomains || allowedDomains.length === 0) return false;
		try {
			const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
			return allowedDomains.some((pattern) => {
				return matchPattern(testUrl, pattern);
			});
		} catch {
			return false;
		}
	}
	set setManifestData(newManifestData) {
		this.manifestData = newManifestData;
		this.pipeline.manifestData = newManifestData;
		this.pipeline.rebuildRouter();
	}
	removeBase(pathname) {
		pathname = collapseDuplicateLeadingSlashes(pathname);
		if (pathname.startsWith(this.manifest.base)) return pathname.slice(this.baseWithoutTrailingSlash.length + 1);
		return pathname;
	}
	/**
	* Decodes a pathname with `decodeURI`, falling back to the raw pathname when it
	* contains an invalid percent-sequence (e.g. `%C0%AF`, an overlong-UTF-8 encoding of
	* `/` commonly sent by path-traversal scanners). A raw `decodeURI()` would throw
	* `URIError: URI malformed`, and because `match()` runs before `render()` that error
	* escapes the adapter's request handler as an uncaught exception (HTTP 500) that user
	* middleware can't catch.
	*/
	safeDecodeURI(pathname) {
		try {
			return decodeURI(pathname);
		} catch (e) {
			this.adapterLogger.debug(e.toString());
			return pathname;
		}
	}
	/**
	* Extracts the base-stripped, decoded pathname from a request.
	* Used by adapters to compute the pathname for dev-mode route matching.
	*/
	getPathnameFromRequest(request) {
		const url = new URL(request.url);
		const pathname = prependForwardSlash(this.removeBase(url.pathname));
		return this.safeDecodeURI(pathname);
	}
	/**
	* Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
	* routes aren't returned, even if they are matched.
	*
	* When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
	* @param request
	* @param allowPrerenderedRoutes
	*/
	match(request, allowPrerenderedRoutes = false) {
		const url = new URL(request.url);
		if (this.manifest.assets.has(url.pathname)) return void 0;
		let pathname = this.computePathnameFromDomain(request);
		if (!pathname) pathname = prependForwardSlash(this.removeBase(url.pathname));
		const routeData = this.pipeline.matchRoute(this.safeDecodeURI(pathname));
		if (!routeData) return void 0;
		if (allowPrerenderedRoutes) return routeData;
		if (routeData.prerender) {
			if (routeData.params.length > 0) return this.pipeline.matchAllRoutes(this.safeDecodeURI(pathname)).find((r) => !r.prerender);
			return;
		}
		return routeData;
	}
	/**
	* A matching route function to use in the development server.
	* Contrary to the `.match` function, this function resolves props and params, returning the correct
	* route based on the priority, segments. It also returns the correct, resolved pathname.
	* @param pathname
	*/
	devMatch(pathname) {}
	computePathnameFromDomain(request) {
		return computePathnameFromDomain(request, new URL(request.url), this.manifest.i18n, this.manifest.base, this.manifest.trailingSlash, this.logger);
	}
	async render(request, { addCookieHeader = false, clientAddress = Reflect.get(request, clientAddressSymbol), locals, prerenderedErrorPageFetch = fetch, routeData, waitUntil } = {}) {
		await this.pipeline.getLogger();
		if (routeData) {
			this.logger.debug("router", "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ", request.url);
			this.logger.debug("router", "RouteData");
			this.logger.debug("router", routeData);
		}
		if (locals) {
			if (typeof locals !== "object") {
				const error = new AstroError(LocalsNotAnObject);
				this.logger.error(null, error.stack);
				return this.renderError(request, {
					addCookieHeader,
					clientAddress,
					prerenderedErrorPageFetch,
					locals: void 0,
					routeData,
					waitUntil,
					status: 500,
					error
				});
			}
		}
		if (!routeData) {
			const domainPathname = this.computePathnameFromDomain(request);
			if (domainPathname) routeData = this.pipeline.matchRoute(this.safeDecodeURI(domainPathname));
		}
		const resolvedOptions = {
			addCookieHeader,
			clientAddress,
			prerenderedErrorPageFetch,
			locals,
			routeData,
			waitUntil
		};
		let response;
		if (this.#fetchHandler instanceof DefaultFetchHandler) {
			Reflect.set(request, appSymbol, this);
			response = await this.#fetchHandler.renderWithOptions(request, resolvedOptions);
		} else {
			setRenderOptions(request, resolvedOptions);
			Reflect.set(request, appSymbol, this);
			response = await this.#fetchHandler.fetch(request);
		}
		this.#warnMissingFeatures();
		if (response.headers.get("X-Astro-Error")) {
			response.headers.delete(ASTRO_ERROR_HEADER);
			return this.renderError(request, {
				addCookieHeader,
				clientAddress,
				prerenderedErrorPageFetch,
				locals,
				routeData,
				waitUntil,
				response,
				status: response.status,
				error: response.status === 500 ? null : void 0
			});
		}
		return response;
	}
	setCookieHeaders(response) {
		return getSetCookiesFromResponse(response);
	}
	/**
	* Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
	* For example,
	* ```ts
	* for (const cookie_ of App.getSetCookieFromResponse(response)) {
	*     const cookie: string = cookie_
	* }
	* ```
	* @param response The response to read cookies from.
	* @returns An iterator that yields key-value pairs as equal-sign-separated strings.
	*/
	static getSetCookieFromResponse = getSetCookiesFromResponse;
	/**
	* If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
	* This also handles pre-rendered /404 or /500 routes.
	*
	* Delegates to the app's configured `ErrorHandler`. To customize behavior
	* for a specific environment, override `createErrorHandler()` rather than
	* this method.
	*/
	async renderError(request, options) {
		return this.#errorHandler.renderError(request, options);
	}
	/**
	* One-shot check: after the first request with a custom `src/fetch.ts`,
	* compare `usedFeatures` against the manifest and warn about any
	* configured features the user's pipeline doesn't call.
	*/
	#warnMissingFeatures() {
		if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
		this.#featureCheckDone = true;
		const manifest = this.manifest;
		const missing = [];
		const used = this.pipeline.usedFeatures;
		if (manifest.routes.some((r) => r.routeData.type === "redirect") && !(used & PipelineFeatures.redirects)) missing.push("redirects");
		if (manifest.sessionConfig && !(used & PipelineFeatures.sessions)) missing.push("sessions");
		if (manifest.actions && !(used & PipelineFeatures.actions)) missing.push("actions");
		if (manifest.middleware && !(used & PipelineFeatures.middleware)) missing.push("middleware");
		if (manifest.i18n && manifest.i18n.strategy !== "manual" && !(used & PipelineFeatures.i18n)) missing.push("i18n");
		if (manifest.cacheConfig && !(used & PipelineFeatures.cache)) missing.push("cache");
		for (const feature of missing) this.logger.warn("router", `Your project uses ${feature}, but your custom src/fetch.ts does not call the ${feature}() handler. This feature will not work unless you add it to your fetch.ts pipeline.`);
	}
	getDefaultStatusCode(routeData, pathname) {
		if (!routeData.pattern.test(pathname)) {
			for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(pathname)) return 302;
		}
		const route = removeTrailingForwardSlash(routeData.route);
		if (route.endsWith("/404")) return 404;
		if (route.endsWith("/500")) return 500;
		return 200;
	}
	getManifest() {
		return this.pipeline.manifest;
	}
	logThisRequest({ pathname, method, statusCode, isRewrite, timeStart }) {
		const timeEnd = performance.now();
		this.logRequest({
			pathname,
			method,
			statusCode,
			isRewrite,
			reqTime: timeEnd - timeStart
		});
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/assets/utils/getAssetsPrefix.js
function getAssetsPrefix(fileExtension, assetsPrefix) {
	let prefix = "";
	if (!assetsPrefix) prefix = "";
	else if (typeof assetsPrefix === "string") prefix = assetsPrefix;
	else prefix = assetsPrefix[fileExtension.slice(1)] || assetsPrefix.fallback;
	return prefix;
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/render/ssr-element.js
var URL_PARSE_BASE = "https://astro.build";
function splitAssetPath(path) {
	const parsed = new URL(path, URL_PARSE_BASE);
	return {
		pathname: !URL.canParse(path) && !path.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname,
		suffix: `${parsed.search}${parsed.hash}`
	};
}
function appendQueryParams(path, queryParams) {
	const queryString = queryParams.toString();
	if (!queryString) return path;
	const hashIndex = path.indexOf("#");
	const basePath = hashIndex === -1 ? path : path.slice(0, hashIndex);
	const hash = hashIndex === -1 ? "" : path.slice(hashIndex);
	return `${basePath}${basePath.includes("?") ? "&" : "?"}${queryString}${hash}`;
}
function createAssetLink(href, base, assetsPrefix, queryParams) {
	const { pathname, suffix } = splitAssetPath(href);
	let url = "";
	if (assetsPrefix) url = joinPaths(getAssetsPrefix(fileExtension(pathname), assetsPrefix), slash(pathname)) + suffix;
	else if (base) url = prependForwardSlash(joinPaths(base, slash(pathname))) + suffix;
	else url = href;
	if (queryParams) url = appendQueryParams(url, queryParams);
	return url;
}
function createStylesheetElement(stylesheet, base, assetsPrefix, queryParams) {
	if (stylesheet.type === "inline") return {
		props: {},
		children: stylesheet.content
	};
	else return {
		props: {
			rel: "stylesheet",
			href: createAssetLink(stylesheet.src, base, assetsPrefix, queryParams)
		},
		children: ""
	};
}
function createStylesheetElementSet(stylesheets, base, assetsPrefix, queryParams) {
	return new Set(stylesheets.map((s) => createStylesheetElement(s, base, assetsPrefix, queryParams)));
}
function createModuleScriptElement(script, base, assetsPrefix, queryParams) {
	if (script.type === "external") return createModuleScriptElementWithSrc(script.value, base, assetsPrefix, queryParams);
	else return {
		props: { type: "module" },
		children: script.value
	};
}
function createModuleScriptElementWithSrc(src, base, assetsPrefix, queryParams) {
	return {
		props: {
			type: "module",
			src: createAssetLink(src, base, assetsPrefix, queryParams)
		},
		children: ""
	};
}
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/app/pipeline.js
var AppPipeline = class AppPipeline extends Pipeline {
	getName() {
		return "AppPipeline";
	}
	static create({ manifest, streaming }) {
		return new AppPipeline(createConsoleLogger({ level: manifest.logLevel }), manifest, "production", manifest.renderers, async function resolve2(specifier) {
			if (!(specifier in manifest.entryModules)) throw new Error(`Unable to resolve [${specifier}]`);
			const bundlePath = manifest.entryModules[specifier];
			if (bundlePath.startsWith("data:") || bundlePath.length === 0) return bundlePath;
			else return createAssetLink(bundlePath, manifest.base, manifest.assetsPrefix);
		}, streaming, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0);
	}
	async headElements(routeData) {
		const { assetsPrefix, base } = this.manifest;
		const routeInfo = this.manifest.routes.find((route) => route.routeData.route === routeData.route);
		const links = /* @__PURE__ */ new Set();
		const scripts = /* @__PURE__ */ new Set();
		const styles = createStylesheetElementSet(routeInfo?.styles ?? [], base, assetsPrefix);
		for (const script of routeInfo?.scripts ?? []) if ("stage" in script) {
			if (script.stage === "head-inline") scripts.add({
				props: {},
				children: script.children
			});
		} else scripts.add(createModuleScriptElement(script, base, assetsPrefix));
		return {
			links,
			styles,
			scripts
		};
	}
	componentMetadata() {}
	async getComponentByRoute(routeData) {
		return (await this.getModuleForRoute(routeData)).page();
	}
	async getModuleForRoute(route) {
		for (const defaultRoute of this.defaultRoutes) if (route.component === defaultRoute.component) return { page: () => Promise.resolve(defaultRoute.instance) };
		let routeToProcess = route;
		if (routeIsRedirect(route)) if (route.redirectRoute) routeToProcess = route.redirectRoute;
		else return RedirectSinglePageBuiltModule;
		else if (routeIsFallback(route)) routeToProcess = getFallbackRoute(route, this.manifest.routes);
		if (this.manifest.pageMap) {
			const importComponentInstance = this.manifest.pageMap.get(routeToProcess.component);
			if (!importComponentInstance) throw new Error(`Unexpectedly unable to find a component instance for route ${route.route}`);
			return await importComponentInstance();
		} else if (this.manifest.pageModule) return this.manifest.pageModule;
		throw new Error("Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.");
	}
	async tryRewrite(payload, request) {
		const { newUrl, pathname, routeData } = findRouteToRewrite({
			payload,
			request,
			routes: this.manifest?.routes.map((r) => r.routeData),
			trailingSlash: this.manifest.trailingSlash,
			buildFormat: this.manifest.buildFormat,
			base: this.manifest.base,
			outDir: this.manifest?.serverLike ? this.manifest.buildClientDir : this.manifest.outDir
		});
		return {
			newUrl,
			pathname,
			componentInstance: await this.getComponentByRoute(routeData),
			routeData
		};
	}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/app/app.js
var App = class extends BaseApp {
	createPipeline(streaming) {
		return AppPipeline.create({
			manifest: this.manifest,
			streaming
		});
	}
	isDev() {
		return false;
	}
	logRequest(_options) {}
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/app/manifest.js
function deserializeManifest(serializedManifest, routesList) {
	const routes = [];
	if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) {
		routes.push({
			...serializedRoute,
			routeData: deserializeRouteData(serializedRoute.routeData)
		});
		const route = serializedRoute;
		route.routeData = deserializeRouteData(serializedRoute.routeData);
	}
	if (routesList) for (const route of routesList?.routes) routes.push({
		file: "",
		links: [],
		scripts: [],
		styles: [],
		routeData: route
	});
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const key = decodeKey(serializedManifest.key);
	return {
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		rootDir: new URL(serializedManifest.rootDir),
		srcDir: new URL(serializedManifest.srcDir),
		publicDir: new URL(serializedManifest.publicDir),
		outDir: new URL(serializedManifest.outDir),
		cacheDir: new URL(serializedManifest.cacheDir),
		buildClientDir: new URL(serializedManifest.buildClientDir),
		buildServerDir: new URL(serializedManifest.buildServerDir),
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		key
	};
}
function serializeRouteData(routeData, trailingSlash) {
	return {
		...routeData,
		pattern: routeData.pattern.source,
		redirectRoute: routeData.redirectRoute ? serializeRouteData(routeData.redirectRoute, trailingSlash) : void 0,
		fallbackRoutes: routeData.fallbackRoutes.map((fallbackRoute) => {
			return serializeRouteData(fallbackRoute, trailingSlash);
		}),
		_meta: { trailingSlash }
	};
}
function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
		distURL: rawRouteData.distURL
	};
}
function deserializeRouteInfo(rawRouteInfo) {
	return {
		styles: rawRouteInfo.styles,
		file: rawRouteInfo.file,
		links: rawRouteInfo.links,
		scripts: rawRouteInfo.scripts,
		routeData: deserializeRouteData(rawRouteInfo.routeData)
	};
}
//#endregion
//#region \0virtual:astro:renderers
var renderers = [];
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"component": "_server-islands.astro",
			"params": ["name"],
			"segments": [[{
				"content": "_server-islands",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "name",
				"dynamic": true,
				"spread": false
			}]],
			"pattern": "^\\/_server-islands\\/([^/]+?)\\/$",
			"prerender": false,
			"isIndex": false,
			"fallbackRoutes": [],
			"route": "/_server-islands/[name]",
			"origin": "internal",
			"distURL": [],
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/_image",
			"component": "node_modules/.pnpm/@astrojs+cloudflare@14.0.0_@types+node@25.9.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emn_26whk3zmcbdugocbnufuufbttq/node_modules/@astrojs/cloudflare/dist/entrypoints/image-transform-endpoint.js",
			"params": [],
			"pathname": "/_image",
			"pattern": "^\\/_image\\/$",
			"segments": [[{
				"content": "_image",
				"dynamic": false,
				"spread": false
			}]],
			"type": "endpoint",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"isIndex": false,
			"origin": "internal",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/oauth/callback",
			"pattern": "^\\/oauth\\/callback\\/$",
			"segments": [[{
				"content": "oauth",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "callback",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/oauth/callback.ts",
			"pathname": "/oauth/callback",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "always" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "endpoint",
			"isIndex": false,
			"route": "/oauth",
			"pattern": "^\\/oauth\\/$",
			"segments": [[{
				"content": "oauth",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/oauth/index.ts",
			"pathname": "/oauth",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "external",
			"_meta": { "trailingSlash": "always" }
		}
	}
].map(deserializeRouteInfo);
//#endregion
//#region \0virtual:astro:pages
var _page0 = () => import("./chunks/image-transform-endpoint_B-smP4Be.mjs");
var _page1 = () => import("./chunks/callback_Y_lorzwZ.mjs");
var _page2 = () => import("./chunks/index_B9ABD4yU.mjs");
var pageMap = /* @__PURE__ */ new Map([
	["node_modules/.pnpm/@astrojs+cloudflare@14.0.0_@types+node@25.9.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emn_26whk3zmcbdugocbnufuufbttq/node_modules/@astrojs/cloudflare/dist/entrypoints/image-transform-endpoint.js", _page0],
	["node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/oauth/callback.ts", _page1],
	["node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/oauth/index.ts", _page2]
]);
//#endregion
//#region \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///C:/Users/TY-Han/Documents/newBlog/","cacheDir":"file:///C:/Users/TY-Han/Documents/newBlog/node_modules/.astro/","outDir":"file:///C:/Users/TY-Han/Documents/newBlog/dist/","srcDir":"file:///C:/Users/TY-Han/Documents/newBlog/src/","publicDir":"file:///C:/Users/TY-Han/Documents/newBlog/public/","buildClientDir":"file:///C:/Users/TY-Han/Documents/newBlog/dist/client/","buildServerDir":"file:///C:/Users/TY-Han/Documents/newBlog/dist/server/","adapterName":"@astrojs/cloudflare","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/_image","component":"node_modules/.pnpm/@astrojs+cloudflare@14.0.0_@types+node@25.9.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emn_26whk3zmcbdugocbnufuufbttq/node_modules/@astrojs/cloudflare/dist/entrypoints/image-transform-endpoint.js","params":[],"pathname":"/_image","pattern":"^\\/_image\\/$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/admin/config.yml","pattern":"^\\/admin\\/config\\.yml$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"config.yml","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/config.ts","pathname":"/admin/config.yml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/admin","pattern":"^\\/admin\\/$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/admin.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/anime","isIndex":false,"type":"page","pattern":"^\\/anime\\/$","segments":[[{"content":"anime","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/anime.astro","pathname":"/anime","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/api/allPostMeta.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/allPostMeta\\.json$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"allPostMeta.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/allPostMeta.json.ts","pathname":"/api/allPostMeta.json","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/archive","isIndex":false,"type":"page","pattern":"^\\/archive\\/$","segments":[[{"content":"archive","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/archive.astro","pathname":"/archive","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/bangumi","isIndex":false,"type":"page","pattern":"^\\/bangumi\\/$","segments":[[{"content":"bangumi","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/bangumi.astro","pathname":"/bangumi","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/categories","isIndex":true,"type":"page","pattern":"^\\/categories\\/$","segments":[[{"content":"categories","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/categories/index.astro","pathname":"/categories","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/friends","isIndex":false,"type":"page","pattern":"^\\/friends\\/$","segments":[[{"content":"friends","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/friends.astro","pathname":"/friends","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/gallery/[album]","isIndex":false,"type":"page","pattern":"^\\/gallery\\/([^/]+?)\\/$","segments":[[{"content":"gallery","dynamic":false,"spread":false}],[{"content":"album","dynamic":true,"spread":false}]],"params":["album"],"component":"src/pages/gallery/[album].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/gallery","isIndex":true,"type":"page","pattern":"^\\/gallery\\/$","segments":[[{"content":"gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gallery/index.astro","pathname":"/gallery","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/guestbook","isIndex":false,"type":"page","pattern":"^\\/guestbook\\/$","segments":[[{"content":"guestbook","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/guestbook.astro","pathname":"/guestbook","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/oauth/callback","pattern":"^\\/oauth\\/callback\\/$","segments":[[{"content":"oauth","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/oauth/callback.ts","pathname":"/oauth/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/oauth","pattern":"^\\/oauth\\/$","segments":[[{"content":"oauth","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/oauth/index.ts","pathname":"/oauth","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/og/[...slug].png","isIndex":false,"type":"endpoint","pattern":"^\\/og\\/(.*?)\\.png\\/$","segments":[[{"content":"og","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true},{"content":".png","dynamic":false,"spread":false}]],"params":["...slug"],"component":"src/pages/og/[...slug].png.ts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/posts/[...slug]","isIndex":false,"type":"page","pattern":"^\\/posts(?:\\/(.*?))?\\/$","segments":[[{"content":"posts","dynamic":false,"spread":false}],[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/posts/[...slug].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/rss","isIndex":false,"type":"page","pattern":"^\\/rss\\/$","segments":[[{"content":"rss","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.astro","pathname":"/rss","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/search","isIndex":false,"type":"page","pattern":"^\\/search\\/$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/sponsor","isIndex":false,"type":"page","pattern":"^\\/sponsor\\/$","segments":[[{"content":"sponsor","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sponsor.astro","pathname":"/sponsor","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/tags","isIndex":true,"type":"page","pattern":"^\\/tags\\/$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.jW4673Gb.js"}],"styles":[],"routeData":{"route":"/[...page]","isIndex":false,"type":"page","pattern":"^(?:\\/(.*?))?\\/$","segments":[[{"content":"...page","dynamic":true,"spread":true}]],"params":["...page"],"component":"src/pages/[...page].astro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"always"}}}],"serverLike":true,"middlewareMode":"classic","site":"https://blog.shika-mori.top","base":"/","trailingSlash":"always","compressHTML":"jsx","componentMetadata":[["C:/Users/TY-Han/Documents/newBlog/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/[...page].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/anime.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/archive.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/bangumi.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/categories/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/friends.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/gallery/[album].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/gallery/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/guestbook.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/rss.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/search.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/sponsor.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/admin.astro",{"propagation":"none","containsHead":true}],["C:/Users/TY-Han/Documents/newBlog/src/content/spec/about.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:\\Users\\TY-Han\\Documents\\newBlog\\.astro\\content-modules.mjs",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/content/runtime.js",{"propagation":"in-tree","containsHead":false}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/components/layout/PostCard.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/components/layout/PostPage.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:pages",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:manifest",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/entrypoints/prerender.js",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/content.config.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/friends@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/guestbook@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/pages/og/[...slug].png.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/og/[...slug].png@_@ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/utils/content-utils.ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/components/layout/CategoryBar.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/layouts/MainGridLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/anime@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/archive@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/bangumi@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/categories/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/gallery/[album]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/gallery/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/rss@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/search@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/sponsor@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/components/widget/Categories.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/components/layout/SideBar.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/components/widget/SiteStats.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/components/widget/Tags.astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/pages/api/allPostMeta.json.ts",{"propagation":"in-tree","containsHead":false}],["\u0000virtual:astro:page:src/pages/api/allPostMeta.json@_@ts",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/content/spec/friends.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/content/posts/touhou-cosplay/index.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["C:/Users/TY-Han/Documents/newBlog/src/content/posts/waline-firefly-theme.mdx?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"astro/entrypoints/prerender":"prerender-entry.Dm8ZpmRR.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/1.avif":"chunks/1_DJ-h0wn6.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/404.astro":"chunks/404_C6gBkPYY.mjs","\u0000virtual:astro:page:src/pages/404@_@astro":"chunks/404_CZSaZe5a.mjs","C:/Users/TY-Han/Documents/newBlog/src/components/controls/ArchivePanel.svelte":"chunks/ArchivePanel_CcF5BkG7.mjs","C:/Users/TY-Han/Documents/newBlog/src/components/controls/DisplaySettings.svelte":"chunks/DisplaySettings_Bl0zxD6o.mjs","C:/Users/TY-Han/Documents/newBlog/src/components/features/EncryptedPost.astro":"chunks/EncryptedPost_DAWWsiLC.mjs","C:/Users/TY-Han/Documents/newBlog/src/components/features/FontManager.astro":"chunks/FontManager_BKPByVw6.mjs","C:/Users/TY-Han/Documents/newBlog/src/config/FooterConfig.html":"chunks/FooterConfig_CGtor7Fl.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/Github-Action-Automatic-Deployment-hexo/index.md":"chunks/Github-Action-Automatic-Deployment-hexo_Bl5VC8oC.mjs","C:/Users/TY-Han/Documents/newBlog/src/components/features/KatexManager.astro":"chunks/KatexManager_cMyGtEmK.mjs","C:/Users/TY-Han/Documents/newBlog/src/components/controls/LayoutSwitchButton.svelte":"chunks/LayoutSwitchButton_C8qott5R.mjs","C:/Users/TY-Han/Documents/newBlog/src/components/misc/License.astro":"chunks/License_hqDOB_S3.mjs","C:/Users/TY-Han/Documents/newBlog/src/config/README.md":"chunks/README_Blzyv7tb.mjs","C:/Users/TY-Han/Documents/newBlog/src/components/README.md":"chunks/README_CsNX0ULP.mjs","C:/Users/TY-Han/Documents/newBlog/src/components/misc/RecommendedPost.astro":"chunks/RecommendedPost_BDFGTlXG.mjs","C:/Users/TY-Han/Documents/newBlog/src/components/misc/SharePoster.svelte":"chunks/SharePoster_CdQjSHWr.mjs","C:/Users/TY-Han/Documents/newBlog/src/components/widget/SpineModel.astro":"chunks/SpineModel_grliUdsS.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/The-End-of-2022.md":"chunks/The-End-of-2022_CkUbv6UM.mjs","C:/Users/TY-Han/Documents/newBlog/src/components/controls/WallpaperSwitch.svelte":"chunks/WallpaperSwitch_BRkCpMl-.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/Year-end-Summary.md":"chunks/Year-end-Summary_D5_5mY2L.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/[...page].astro":"chunks/_...page__B_yBIs1g.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/og/[...slug].png.ts":"chunks/_...slug_.png_B-MR4qOE.mjs","\u0000virtual:astro:page:src/pages/og/[...slug].png@_@ts":"chunks/_...slug__DU5dGxg8.mjs","\u0000virtual:astro:page:src/pages/[...page]@_@astro":"chunks/_.._B60ReeuC.mjs","\u0000virtual:astro:page:src/pages/posts/[...slug]@_@astro":"chunks/_.._PGaWlFhq.mjs","\u0000virtual:astro:page:src/pages/gallery/[album]@_@astro":"chunks/_album__ClQWFFvU.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/gallery/[album].astro":"chunks/_album__D-elucNj.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_B7vjY4B6.mjs","\u0000virtual:astro:get-image":"chunks/_virtual_astro_get-image_Cm7S3hIV.mjs","\u0000virtual:astro:middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_q0HM18kM.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_Bvb4Kaq4.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/spec/about.mdx?astroPropagatedAssets":"chunks/about_2pRXb5Lf.mjs","\u0000virtual:astro:page:src/pages/about@_@astro":"chunks/about_CAfJ4-G7.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/spec/about.mdx":"chunks/about_CkpSO6Tq.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/about.astro":"chunks/about_qdV22lfu.mjs","\u0000virtual:astro:page:node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/admin@_@astro":"chunks/admin_C0a1A-NL.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/api/allPostMeta.json.ts":"chunks/allPostMeta.json_BQrrrtaP.mjs","\u0000virtual:astro:page:src/pages/api/allPostMeta.json@_@ts":"chunks/allPostMeta_CBoF4hHt.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/analyticsConfig.ts":"chunks/analyticsConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/anime-bangumi.css":"chunks/anime-bangumi_B6swl9wm.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/anime.ts":"chunks/anime_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/anime.astro":"chunks/anime_BxGGTNlC.mjs","\u0000virtual:astro:page:src/pages/anime@_@astro":"chunks/anime_MJRBHv2S.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/announcementConfig.ts":"chunks/announcementConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/archive.astro":"chunks/archive_Ci0dzOtH.mjs","\u0000virtual:astro:page:src/pages/archive@_@astro":"chunks/archive_DzUpJGls.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/avatar.png":"chunks/avatar_Jn4su7az.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/backgroundWallpaper.ts":"chunks/backgroundWallpaper_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/bangumi.ts":"chunks/bangumi_BvCbzfVJ.mjs","\u0000virtual:astro:page:src/pages/bangumi@_@astro":"chunks/bangumi_CT4FGejY.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/bangumi.astro":"chunks/bangumi_Daj4H25b.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/banner-title.css":"chunks/banner-title_DvmzUpo6.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/both-grid.avif":"chunks/both-grid_w0Id83IB.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/both-list.avif":"chunks/both-list_D4c3cuc8.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/categories/index.astro":"chunks/categories_CGgW4JYY.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/commentConfig.ts":"chunks/commentConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/config.ts":"chunks/config_BvCbzfVJ.mjs","\u0000virtual:astro:page:node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/config@_@ts":"chunks/config_D5229hyE.mjs","C:\\Users\\TY-Han\\Documents\\newBlog\\.astro\\content-assets.mjs":"chunks/content-assets_DUKddbio.mjs","C:\\Users\\TY-Han\\Documents\\newBlog\\.astro\\content-modules.mjs":"chunks/content-modules_D1jnar7b.mjs","C:/Users/TY-Han/Documents/newBlog/src/content.config.ts":"chunks/content.config_C4oR8iQG.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/coverImageConfig.ts":"chunks/coverImageConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/Github-Action-Automatic-Deployment-hexo/cover.jpeg":"chunks/cover_BGhceXMT.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/cover.avif":"chunks/cover_DBa5TgoY.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/custom-scrollbar.css":"chunks/custom-scrollbar_CyZ3zMGp.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/DesktopWallpaper/d1.avif":"chunks/d1_CwZHnEV0.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/DesktopWallpaper/d2.avif":"chunks/d2_CEwBjpmt.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/DesktopWallpaper/d3.avif":"chunks/d3_ua8NZ_lx.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/DesktopWallpaper/d4.avif":"chunks/d4_CwriRp2B.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/DesktopWallpaper/d5.avif":"chunks/d5_Chc0agyA.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/effectsConfig.ts":"chunks/effectsConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/env.d.ts":"chunks/env.d_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/expressiveCodeConfig.ts":"chunks/expressiveCodeConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/favicon.ico":"chunks/favicon_CPYuqPQT.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/firefly1.avif":"chunks/firefly1_BJJkiHa5.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/firefly2.avif":"chunks/firefly2_CAPUehph.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/firefly3.avif":"chunks/firefly3_BVoqNycm.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/firefly.png":"chunks/firefly_CY72Lx6t.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/fontConfig.ts":"chunks/fontConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/footerConfig.ts":"chunks/footerConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/friendsConfig.ts":"chunks/friendsConfig_BvCbzfVJ.mjs","\u0000virtual:astro:page:src/pages/friends@_@astro":"chunks/friends_B4FAAbyh.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/spec/friends.mdx":"chunks/friends_BgYo7-6D.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/friends.astro":"chunks/friends_DBX1FTeP.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/spec/friends.mdx?astroPropagatedAssets":"chunks/friends_j1-V79TK.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/future-planning.md":"chunks/future-planning_D-0c3xxj.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/galleryConfig.ts":"chunks/galleryConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/gallery.css":"chunks/gallery_0cbhuEJ7.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/gallery/index.astro":"chunks/gallery_DsP4kbld.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/github.avif":"chunks/github_kIyTaBeT.mjs","C:/Users/TY-Han/Documents/newBlog/src/global.d.ts":"chunks/global.d_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/spec/guestbook.md":"chunks/guestbook_BX4ctwGR.mjs","\u0000virtual:astro:page:src/pages/guestbook@_@astro":"chunks/guestbook_C7y3562P.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/guestbook.astro":"chunks/guestbook_CVZyzGDU.mjs","C:/Users/TY-Han/Documents/newBlog/src/utils/icon-loader.ts":"chunks/icon-loader_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/@astrojs+cloudflare@14.0.0_@types+node@25.9.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emn_26whk3zmcbdugocbnufuufbttq/node_modules/@astrojs/cloudflare/dist/entrypoints/image-service-workerd.js":"chunks/image-service-workerd_CBNXEfZo.mjs","\u0000virtual:astro:page:src/pages/gallery/index@_@astro":"chunks/index_BSWoxGxh.mjs","\u0000virtual:astro:page:src/pages/categories/index@_@astro":"chunks/index_C-bgfjN_.mjs","\u0000virtual:astro:page:src/pages/tags/index@_@astro":"chunks/index_ycNwly92.mjs","C:/Users/TY-Han/Documents/newBlog/src/utils/language-utils.ts":"chunks/language-utils_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/layout-styles.css":"chunks/layout-styles_C9M7ov8u.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/left-grid3.avif":"chunks/left-grid3_BTe7NWeP.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/left-list.avif":"chunks/left-list_DRMZJqZy.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/licenseConfig.ts":"chunks/licenseConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/MobileWallpaper/m1.avif":"chunks/m1_6dCm2sGc.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/MobileWallpaper/m2.avif":"chunks/m2_BRD0ZMAW.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/MobileWallpaper/m3.avif":"chunks/m3_DWPPCV4E.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/MobileWallpaper/m4.avif":"chunks/m4_CICfN2ji.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/MobileWallpaper/m5.avif":"chunks/m5_CXmwTrqO.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/MobileWallpaper/m6.avif":"chunks/m6_DCCSE1V6.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/masonry.avif":"chunks/masonry_DNq3voGi.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/mermaid-render-script.js":"chunks/mermaid-render-script_U5Zex6pT.mjs","C:/Users/TY-Han/Documents/newBlog/src/middleware.ts":"chunks/middleware_3WmPFvCQ.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/musicConfig.ts":"chunks/musicConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/assets/images/navbar.png":"chunks/navbar_CedyeZhr.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/navbar.css":"chunks/navbar_CpiVvXDk.mjs","\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_BYLrzUxc.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/obsidian.avif":"chunks/obsidian_DJXysX_3.mjs","C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/@shikijs+themes@4.2.0/node_modules/@shikijs/themes/dist/one-dark-pro.mjs":"chunks/one-dark-pro_CAri3QIv.mjs","C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/@shikijs+themes@4.2.0/node_modules/@shikijs/themes/dist/one-light.mjs":"chunks/one-light_Bxr1I2e3.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/touhou-cosplay/pachuli.jpg":"chunks/pachuli_3Djff9Iw.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/photoswipe.css":"chunks/photoswipe_DRdhF00r.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/pioConfig.ts":"chunks/pioConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/plantuml-encoder.js":"chunks/plantuml-encoder_bBT9T1y_.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/plantuml-render-script.js":"chunks/plantuml-render-script_BIMIbNv_.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/plantumlConfig.ts":"chunks/plantumlConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/profileConfig.ts":"chunks/profileConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/rehype-component-github-card.mjs":"chunks/rehype-component-github-card_CPI1yd3a.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/rehype-email-protection.mjs":"chunks/rehype-email-protection_DT1Zub46.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/rehype-external-links.mjs":"chunks/rehype-external-links_DDifX7on.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/rehype-figure.mjs":"chunks/rehype-figure_DYGTedWX.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/rehype-mermaid.mjs":"chunks/rehype-mermaid_Crlzl0rf.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/rehype-plantuml.mjs":"chunks/rehype-plantuml_Crlzl0rf.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/remark-directive-rehype.js":"chunks/remark-directive-rehype_Crlzl0rf.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/remark-excerpt.js":"chunks/remark-excerpt_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/remark-image-grid.js":"chunks/remark-image-grid_KcSO677z.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/remark-mermaid.js":"chunks/remark-mermaid_KcSO677z.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/remark-plantuml.js":"chunks/remark-plantuml_CfN4HGDi.mjs","C:/Users/TY-Han/Documents/newBlog/src/plugins/remark-reading-time.mjs":"chunks/remark-reading-time_DnFgbiZa.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/right-grid2.avif":"chunks/right-grid2_DwQFvDUN.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/rimworld-tutorial.md":"chunks/rimworld-tutorial_ySFi9DhJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/robots.txt.ts":"chunks/robots.txt_Bit5r8BA.mjs","\u0000virtual:astro:page:src/pages/robots.txt@_@ts":"chunks/robots_-h5G6w3i.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/rss.xml.ts":"chunks/rss.xml_hW9pcsxe.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/rss.astro":"chunks/rss_7sAkruBw.mjs","\u0000virtual:astro:page:src/pages/rss@_@astro":"chunks/rss_CYtTWs5b.mjs","\u0000virtual:astro:page:src/pages/rss.xml@_@ts":"chunks/rss_DyWXT3Ub.mjs","C:/Users/TY-Han/Documents/newBlog/src/utils/sakura-manager.ts":"chunks/sakura-manager_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/scrollbar.css":"chunks/scrollbar_DfXiywRY.mjs","\u0000virtual:astro:page:src/pages/search@_@astro":"chunks/search_DN48J2Ok.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/search.astro":"chunks/search_l3alYBnf.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/sidebarConfig.ts":"chunks/sidebarConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/siteConfig.ts":"chunks/siteConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/types/sponsorConfig.ts":"chunks/sponsorConfig_BvCbzfVJ.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/sponsor.astro":"chunks/sponsor_CUwXKDlp.mjs","\u0000virtual:astro:page:src/pages/sponsor@_@astro":"chunks/sponsor_ClVpWQoc.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/tags.css":"chunks/tags_BLHLw2ev.mjs","C:/Users/TY-Han/Documents/newBlog/src/pages/tags/index.astro":"chunks/tags_Dxfg0LFN.mjs","C:/Users/TY-Han/Documents/newBlog/src/utils/toc-utils.ts":"chunks/toc-utils_DAvorzfI.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/touhou-cosplay/index.mdx":"chunks/touhou-cosplay_BwEO9iRs.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/touhou-cosplay/index.mdx?astroPropagatedAssets":"chunks/touhou-cosplay_Slfen4CA.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/transition.css":"chunks/transition_CeyJDLty.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/twikoo.css":"chunks/twikoo_BD48zCjz.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/images/vitepress.avif":"chunks/vitepress_CYeo9UCb.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/waline-firefly-theme.mdx?astroPropagatedAssets":"chunks/waline-firefly-theme_C_kOYzMA.mjs","C:/Users/TY-Han/Documents/newBlog/src/content/posts/waline-firefly-theme.mdx":"chunks/waline-firefly-theme_DQMxjZhw.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/waves.css":"chunks/waves_DuFBHQRq.mjs","C:/Users/TY-Han/Documents/newBlog/src/styles/widget-responsive.css":"chunks/widget-responsive_IezVtYrx.mjs","virtual:cloudflare/worker-entry":"entry.mjs","\u0000virtual:astro:page:node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/oauth/callback@_@ts":"chunks/callback_Y_lorzwZ.mjs","\u0000virtual:astro:page:node_modules/.pnpm/@astrojs+cloudflare@14.0.0_@types+node@25.9.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emn_26whk3zmcbdugocbnufuufbttq/node_modules/@astrojs/cloudflare/dist/entrypoints/image-transform-endpoint@_@js":"chunks/image-transform-endpoint_B-smP4Be.mjs","\u0000virtual:astro:page:node_modules/.pnpm/decap-cms-oauth-astro@0.1.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@e_2nx4azjdxy2jx5rrh2qesus75q/node_modules/decap-cms-oauth-astro/src/oauth/index@_@ts":"chunks/index_B9ABD4yU.mjs","C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/@astrojs+cloudflare@14.0.0_@types+node@25.9.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emn_26whk3zmcbdugocbnufuufbttq/node_modules/@astrojs/cloudflare/dist/utils/static-image-collection.js":"chunks/static-image-collection_Dt7EDAS7.mjs","@components/pages/AdvancedSearch.svelte":"_astro/AdvancedSearch.DVbTz4aX.js","@/components/pages/anime/AnimeGrid.svelte":"_astro/AnimeGrid.CPjTEv6V.js","@components/controls/ArchivePanel.svelte":"_astro/ArchivePanel.fmELG8A-.js","@/components/pages/bangumi/BangumiGrid.svelte":"_astro/BangumiGrid.BxfaLb5R.js","C:/Users/TY-Han/Documents/newBlog/src/components/layout/CategoryBar.astro?astro&type=script&index=0&lang.ts":"_astro/CategoryBar.astro_astro_type_script_index_0_lang.B5sU7vtx.js","C:/Users/TY-Han/Documents/newBlog/src/components/common/CoverImage.astro?astro&type=script&index=0&lang.ts":"_astro/CoverImage.astro_astro_type_script_index_0_lang.CJU5SuGZ.js","@/components/controls/DisplaySettingsIntegrated.svelte":"_astro/DisplaySettingsIntegrated.CPGsw7Jd.js","C:/Users/TY-Han/Documents/newBlog/src/components/layout/DropdownMenu.astro?astro&type=script&index=0&lang.ts":"_astro/DropdownMenu.astro_astro_type_script_index_0_lang.eSTfV24e.js","C:/Users/TY-Han/Documents/newBlog/src/components/features/FancyboxManager.astro?astro&type=script&index=0&lang.ts":"_astro/FancyboxManager.astro_astro_type_script_index_0_lang.CnWUCWfh.js","C:/Users/TY-Han/Documents/newBlog/src/components/controls/FloatingTOC.astro?astro&type=script&index=0&lang.ts":"_astro/FloatingTOC.astro_astro_type_script_index_0_lang.gBl2DIkP.js","C:/Users/TY-Han/Documents/newBlog/src/components/features/FontManager.astro?astro&type=script&index=0&lang.ts":"_astro/FontManager.astro_astro_type_script_index_0_lang.iqsttleM.js","C:/Users/TY-Han/Documents/newBlog/src/components/features/FontSetup.astro?astro&type=script&index=0&lang.ts":"_astro/FontSetup.astro_astro_type_script_index_0_lang.D-q1tllR.js","C:/Users/TY-Han/Documents/newBlog/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.ywOKhlzA.js","@/components/controls/LightDarkSwitch.svelte":"_astro/LightDarkSwitch.CXVCzRLL.js","C:/Users/TY-Han/Documents/newBlog/src/components/features/Live2DWidget.astro?astro&type=script&index=0&lang.ts":"_astro/Live2DWidget.astro_astro_type_script_index_0_lang.Cu3VbCoD.js","C:/Users/TY-Han/Documents/newBlog/src/layouts/MainGridLayout.astro?astro&type=script&index=0&lang.ts":"_astro/MainGridLayout.astro_astro_type_script_index_0_lang.buKoLSK8.js","C:/Users/TY-Han/Documents/newBlog/src/components/layout/NavMenuPanel.astro?astro&type=script&index=0&lang.ts":"_astro/NavMenuPanel.astro_astro_type_script_index_0_lang.DyfI284U.js","C:/Users/TY-Han/Documents/newBlog/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts":"_astro/Navbar.astro_astro_type_script_index_0_lang.BxFedFsR.js","C:/Users/TY-Han/Documents/newBlog/src/components/common/PioMessageBox.astro?astro&type=script&index=0&lang.ts":"_astro/PioMessageBox.astro_astro_type_script_index_0_lang.KkvIaZJI.js","C:/Users/TY-Han/Documents/newBlog/src/components/layout/PostPage.astro?astro&type=script&index=0&lang.ts":"_astro/PostPage.astro_astro_type_script_index_0_lang.CtZR4z_1.js","@/components/controls/Search.svelte":"_astro/Search.DLj3rFEz.js","@/components/misc/SharePoster.svelte":"_astro/SharePoster.BaQDIHd0.js","C:/Users/TY-Han/Documents/newBlog/src/components/widget/SidebarTOC.astro?astro&type=script&index=0&lang.ts":"_astro/SidebarTOC.astro_astro_type_script_index_0_lang.DFzPdO8r.js","C:/Users/TY-Han/Documents/newBlog/src/components/widget/SiteInfo.astro?astro&type=script&index=0&lang.ts":"_astro/SiteInfo.astro_astro_type_script_index_0_lang.BN1SQbS5.js","C:/Users/TY-Han/Documents/newBlog/src/components/features/TypewriterText.astro?astro&type=script&index=0&lang.ts":"_astro/TypewriterText.astro_astro_type_script_index_0_lang.CsO-Wgdn.js","C:/Users/TY-Han/Documents/newBlog/src/components/common/WidgetLayout.astro?astro&type=script&index=0&lang.ts":"_astro/WidgetLayout.astro_astro_type_script_index_0_lang.CM4YOhik.js","C:/Users/TY-Han/Documents/newBlog/src/pages/[...page].astro?astro&type=script&index=0&lang.ts":"_astro/_...page_.astro_astro_type_script_index_0_lang.iYpD-8Kf.js","C:/Users/TY-Han/Documents/newBlog/src/pages/posts/[...slug].astro?astro&type=script&index=0&lang.ts":"_astro/_...slug_.astro_astro_type_script_index_0_lang.BNYwXdIp.js","@astrojs/svelte/client.js":"_astro/client.svelte.BnNrlwWW.js","astro:scripts/page.js":"_astro/page.jW4673Gb.js","C:/Users/TY-Han/Documents/newBlog/src/pages/rss.astro?astro&type=script&index=0&lang.ts":"_astro/rss.astro_astro_type_script_index_0_lang.Cpm_aF_5.js","C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/@swup+astro@1.8.0_rolldown@1.1.3/node_modules/@swup/astro/dist/client/Swup.js":"_astro/Swup.DWkI08FP.js","C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/@swup+astro@1.8.0_rolldown@1.1.3/node_modules/@swup/astro/dist/client/SwupA11yPlugin.js":"_astro/SwupA11yPlugin.OMawphHh.js","C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/@swup+astro@1.8.0_rolldown@1.1.3/node_modules/@swup/astro/dist/client/SwupHeadPlugin.js":"_astro/SwupHeadPlugin.CgeFYPNH.js","C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/@swup+astro@1.8.0_rolldown@1.1.3/node_modules/@swup/astro/dist/client/SwupPreloadPlugin.js":"_astro/SwupPreloadPlugin.B64LMvH1.js","C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/@swup+astro@1.8.0_rolldown@1.1.3/node_modules/@swup/astro/dist/client/SwupScriptsPlugin.js":"_astro/SwupScriptsPlugin.CobeD_xC.js","C:/Users/TY-Han/Documents/newBlog/node_modules/.pnpm/@fancyapps+ui@6.1.14/node_modules/@fancyapps/ui/dist/index.js":"_astro/dist.DlMb1N8S.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/TY-Han/Documents/newBlog/src/components/layout/CategoryBar.astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};var d;function v(e,t){const r=t.pathname.replace(/\\/$/,\"\"),a=(e.getAttribute(\"data-home-path\")||\"/\").replace(/\\/$/,\"\"),o=(e.getAttribute(\"data-archive-path\")||\"/archive\").replace(/\\/$/,\"\");return{isHome:r===a||r===\"\"||r===\"/\",isArchive:r===o,isCategories:r===\"/categories\",activeCategory:t.searchParams.get(\"category\")||\"\",hasTag:t.searchParams.has(\"tag\"),hasUncategorized:t.searchParams.has(\"uncategorized\")}}function y(e,t){const{isHome:r,isArchive:a,isCategories:o,activeCategory:c,hasTag:s,hasUncategorized:l}=v(e,t),h=(e.getAttribute(\"data-current-post-category\")||\"\").trim(),f=e.querySelectorAll(\".category-pill\");if(f.forEach(i=>{i.removeAttribute(\"data-active\"),i.removeAttribute(\"data-soft-active\")}),r){e.querySelector('.category-pill[data-category-name=\"\"]')?.setAttribute(\"data-active\",\"\");return}if(o){e.querySelector('.category-pill[data-category-name=\"__categories__\"]')?.setAttribute(\"data-active\",\"\");return}if(c){f.forEach(i=>{i.getAttribute(\"data-category-name\")===c&&i.setAttribute(\"data-active\",\"\")});return}if(a&&!s&&!l){e.querySelector('.category-pill[data-category-name=\"__archive__\"]')?.setAttribute(\"data-active\",\"\");return}h&&f.forEach(i=>{i.getAttribute(\"data-category-name\")===h&&i.setAttribute(\"data-soft-active\",\"\")})}function g(e,t=\"smooth\"){const r=e.querySelector(\".category-pill[data-active]\")||e.querySelector(\".category-pill[data-soft-active]\"),a=e.querySelector(\".category-scroll\");if(!r||!a)return;const o=r.offsetLeft-a.offsetLeft-(a.clientWidth-r.offsetWidth)/2;a.scrollTo({left:Math.max(0,o),behavior:t})}function w(e,t){const{isHome:r}=v(e,t),a=window.innerWidth<1024,o=document.body.classList.contains(\"enable-banner\");return a&&o&&!r}function u(e=new URL(window.location.href),t={}){const r=document.getElementById(\"category-bar\");if(!r)return;const a=document.getElementById(\"swup-container\");if(a){const s=a.getAttribute(\"data-current-post-category\")||\"\";r.setAttribute(\"data-current-post-category\",s)}y(r,e);const o=t.deferScroll??w(r,e),c=t.scrollBehavior??(o?\"auto\":\"smooth\");if(d&&(window.clearTimeout(d),d=void 0),o){d=window.setTimeout(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{g(r,c),n()})})},220);return}g(r,c),n()}function p(){const e=document.getElementById(\"category-bar\");!e||e.dataset.clickBound===\"true\"||(e.dataset.clickBound=\"true\",e.addEventListener(\"click\",t=>{if(!(t.target instanceof Element))return;const r=t.target.closest(\".category-pill\");if(!r||t.defaultPrevented||t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||r.target&&r.target!==\"_self\")return;const a=new URL(r.href,window.location.href);a.origin===window.location.origin&&(y(e,a),g(e,\"auto\"))}))}function b(){const e=document.getElementById(\"category-bar\");if(!e)return;const t=e.querySelector(\".category-scroll\");if(t){if(t.dataset.featuresBound===\"true\"){n();return}t.dataset.featuresBound=\"true\",t.addEventListener(\"wheel\",r=>{t.scrollWidth<=t.clientWidth||(r.preventDefault(),t.scrollLeft+=r.deltaY)},{passive:!1}),t.addEventListener(\"scroll\",n),window.addEventListener(\"resize\",n),n()}}function n(){const e=document.getElementById(\"category-bar\");if(!e)return;const t=e.querySelector(\".category-scroll\"),r=e.querySelector(\".scroll-fade-left\"),a=e.querySelector(\".scroll-fade-right\");if(!t||!r||!a)return;const o=t.scrollWidth>t.clientWidth+1,c=t.scrollLeft<=1,s=t.scrollLeft+t.clientWidth>=t.scrollWidth-1;o&&!c?r.setAttribute(\"data-visible\",\"\"):r.removeAttribute(\"data-visible\"),o&&!s?a.setAttribute(\"data-visible\",\"\"):a.removeAttribute(\"data-visible\");const l=e.querySelector(\".more-divider\");l&&(o?l.setAttribute(\"data-visible\",\"\"):l.removeAttribute(\"data-visible\"))}u();p();b();document.addEventListener(\"astro:page-load\",()=>{u(),b()});document.addEventListener(\"swup:contentReplaced\",()=>{u(),requestAnimationFrame(()=>{u()})});function m(){window.swup?.hooks&&window.swup.hooks.on(\"visit:start\",e=>{const t=document.getElementById(\"category-bar\");t&&y(t,new URL(e.to.url,window.location.href))})}window.swup?.hooks?m():document.addEventListener(\"swup:enable\",m);"],["C:/Users/TY-Han/Documents/newBlog/src/components/common/CoverImage.astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};function o(){document.querySelectorAll(\".cover-image-container\").forEach(t=>{if(t.hasAttribute(\"data-initialized\"))return;t.setAttribute(\"data-initialized\",\"true\");const e=t.querySelector(\"img[data-cover-img]\");if(!e)return;let a=[],l=1;const d=t.getAttribute(\"data-api-urls\");if(d)try{a=JSON.parse(d)}catch{}const i=()=>{t.setAttribute(\"data-loading\",\"false\"),e.style.opacity=\"1\";const r=t.querySelector(\".lqip-placeholder\");r&&r.classList.add(\"loaded\")},c=()=>{t.setAttribute(\"data-loading\",\"false\"),t.setAttribute(\"data-error\",\"true\");const r=t.querySelector(\".lqip-placeholder\");r&&r.classList.add(\"loaded\")},s=()=>{e.dataset.remote===\"true\"&&(l<a.length?(e.addEventListener(\"load\",i,{once:!0}),e.addEventListener(\"error\",s,{once:!0}),e.src=a[l],l++):c())};e.complete?e.naturalWidth>0?i():s():(e.addEventListener(\"load\",i,{once:!0}),e.addEventListener(\"error\",s,{once:!0}))})}o();document.addEventListener(\"astro:page-load\",o);"],["C:/Users/TY-Han/Documents/newBlog/src/components/layout/DropdownMenu.astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};document.addEventListener(\"DOMContentLoaded\",function(){const a=document.querySelectorAll(\"[data-dropdown]\");a.forEach(t=>{const e=t.querySelector(\"[data-dropdown-trigger]\"),o=t.querySelector(\"[data-dropdown-menu]\"),n=t.querySelectorAll(\".dropdown-item\");!e||!o||(e.addEventListener(\"keydown\",function(r){r.key===\"Enter\"||r.key===\" \"?(r.preventDefault(),u(t,e,o)):r.key===\"ArrowDown\"?(r.preventDefault(),l(t,e,o),n.length>0&&n[0].focus()):r.key===\"Escape\"&&i(t,e,o)}),n.forEach((r,c)=>{r.addEventListener(\"keydown\",function(s){s.key===\"ArrowDown\"?(s.preventDefault(),n[(c+1)%n.length].focus()):s.key===\"ArrowUp\"?(s.preventDefault(),n[(c-1+n.length)%n.length].focus()):s.key===\"Escape\"&&(i(t,e,o),e.focus())})}))}),document.addEventListener(\"click\",function(t){a.forEach(e=>{if(!e.contains(t.target)){const o=e.querySelector(\"[data-dropdown-trigger]\"),n=e.querySelector(\"[data-dropdown-menu]\");o&&n&&i(e,o,n)}})})});function u(a,t,e){t.getAttribute(\"aria-expanded\")===\"true\"?i(a,t,e):l(a,t,e)}function l(a,t,e){t.setAttribute(\"aria-expanded\",\"true\"),e.classList.remove(\"opacity-0\",\"invisible\",\"pointer-events-none\",\"translate-y-[-8px]\"),e.classList.add(\"opacity-100\",\"visible\",\"pointer-events-auto\",\"translate-y-0\")}function i(a,t,e){t.setAttribute(\"aria-expanded\",\"false\"),e.classList.add(\"opacity-0\",\"invisible\",\"pointer-events-none\",\"translate-y-[-8px]\"),e.classList.remove(\"opacity-100\",\"visible\",\"pointer-events-auto\",\"translate-y-0\")}"],["C:/Users/TY-Han/Documents/newBlog/src/components/features/FontManager.astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};document.fonts&&typeof document.fonts.ready<\"u\"&&document.fonts.ready.then(()=>{console.log(\"All fonts have been loaded\"),document.dispatchEvent(new CustomEvent(\"fontsLoaded\"))}).catch(e=>{console.warn(\"Font loading failed:\",e)});if(typeof PerformanceObserver<\"u\"){const e=new PerformanceObserver(o=>{o.getEntries().forEach(n=>{n.entryType})});try{e.observe({entryTypes:[\"resource\"]})}catch{}}"],["C:/Users/TY-Han/Documents/newBlog/src/components/features/FontSetup.astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};document.fonts&&typeof document.fonts.ready<\"u\"&&document.fonts.ready.then(()=>{document.dispatchEvent(new CustomEvent(\"fontsLoaded\"))}).catch(e=>{console.warn(\"Font loading failed:\",e)});"],["C:/Users/TY-Han/Documents/newBlog/src/layouts/MainGridLayout.astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};document.body.classList.add(\"wallpaper-transparent\");"],["C:/Users/TY-Han/Documents/newBlog/src/components/layout/NavMenuPanel.astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};document.addEventListener(\"DOMContentLoaded\",function(){const r=document.querySelectorAll(\"[data-mobile-dropdown]\");r.forEach(e=>{const t=e.querySelector(\"[data-mobile-dropdown-trigger]\"),d=e.querySelector(\"[data-mobile-submenu]\");!t||!d||t.addEventListener(\"click\",function(o){o.preventDefault();const s=e.getAttribute(\"data-expanded\")===\"true\";r.forEach(a=>{if(a!==e){a.setAttribute(\"data-expanded\",\"false\");const i=a.querySelector(\"[data-mobile-dropdown-trigger]\");i&&i.setAttribute(\"aria-expanded\",\"false\")}});const n=!s;e.setAttribute(\"data-expanded\",n.toString()),t.setAttribute(\"aria-expanded\",n.toString())})})});"],["C:/Users/TY-Han/Documents/newBlog/src/components/layout/PostPage.astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};function a(){const t=document.getElementById(\"post-list-container\");if(!t)return;const e=localStorage.getItem(\"postListLayout\"),o=t.getAttribute(\"data-default-layout\")||\"list\",r=t.getAttribute(\"data-mobile-default-layout\")||o,n=window.innerWidth<780?r:o;let s=e||n;window.innerWidth<380&&(s=\"grid\"),y(s)}function y(t){const e=document.getElementById(\"post-list-container\");if(!e)return;const o=e.classList.contains(\"grid-mode\"),r=e.classList.contains(\"list-mode\"),n=o?\"grid\":r?\"list\":null,s=e.getAttribute(\"data-masonry-enabled\")===\"true\",l=()=>{e.classList.remove(\"list-mode\",\"grid-mode\",\"post-grid-auto\"),t===\"grid\"?(e.classList.add(\"grid-mode\"),e.classList.remove(\"flex\",\"flex-col\"),s?(e.classList.remove(\"post-grid-auto\"),d()):(e.classList.add(\"post-grid-auto\"),f())):(e.classList.add(\"list-mode\"),e.classList.add(\"flex\",\"flex-col\",\"gap-4\",\"md:gap-4\"),e.classList.remove(\"post-grid-auto\"),f())};if(!n){l();return}if(n===t){t===\"grid\"&&s&&d();return}e.classList.add(\"layout-switching\"),setTimeout(()=>{l(),requestAnimationFrame(()=>{e.classList.remove(\"layout-switching\")})},200)}function f(){const t=document.getElementById(\"post-list-container\");t&&(t.style.height=\"\",t.style.position=\"\",t.style.display=\"\",t.querySelectorAll(\".post-card-item\").forEach(e=>{e.style.position=\"\",e.style.top=\"\",e.style.left=\"\",e.style.width=\"\"}))}function d(){const t=document.getElementById(\"post-list-container\");if(!t||t.getAttribute(\"data-masonry-enabled\")!==\"true\"||!t.classList.contains(\"grid-mode\"))return;const e=Array.from(t.querySelectorAll(\".post-card-item\"));if(e.length===0)return;const o=16,r=parseInt(t.getAttribute(\"data-column-width\")||\"280\");t.style.position=\"relative\",t.style.display=\"block\";const n=t.offsetWidth,s=Math.max(1,Math.floor((n+o)/(r+o))),l=(n-(s-1)*o)/s,c=new Array(s).fill(0);e.forEach(i=>{const u=c.indexOf(Math.min(...c));i.style.position=\"absolute\",i.style.width=`${l}px`,i.style.setProperty(\"height\",\"auto\",\"important\");const p=i.offsetHeight,g=c[u],L=u*(l+o);i.style.top=`${g}px`,i.style.left=`${L}px`,c[u]+=p+o}),t.style.height=`${Math.max(...c)}px`}document.addEventListener(\"DOMContentLoaded\",function(){setTimeout(a,50),document.querySelectorAll(\"#post-list-container img\").forEach(t=>{t.complete||t.addEventListener(\"load\",()=>{d()})})});document.addEventListener(\"visibilitychange\",function(){document.hidden||setTimeout(a,100)});window.addEventListener(\"layoutChange\",function(t){const e=t.detail.layout;document.getElementById(\"post-list-container\")&&y(e)});var m;window.addEventListener(\"resize\",function(){clearTimeout(m),m=setTimeout(function(){a()},250)});document.addEventListener(\"astro:page-load\",function(){setTimeout(a,50),document.querySelectorAll(\"#post-list-container img\").forEach(t=>{t.complete||t.addEventListener(\"load\",()=>{d()})})});document.addEventListener(\"astro:after-swap\",function(){setTimeout(a,50)});setTimeout(a,0);"],["C:/Users/TY-Han/Documents/newBlog/src/components/widget/SiteInfo.astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};var c=class extends HTMLElement{constructor(){super();const s=this.querySelector(\".site-info-toggle-btn\"),o=this.querySelector(\".site-info-detail\"),t=this.querySelector(\".site-info-toggle-text\"),n=this.querySelector(\".site-info-toggle-icon\");if(!s||!o||!t)return;const l=this.dataset.expandText||\"展开构建信息\",i=this.dataset.collapseText||\"收起构建信息\";let e=!1;t.textContent=l,s.addEventListener(\"click\",()=>{e=!e,o.classList.toggle(\"collapsed\",!e),t.textContent=e?i:l,n?.classList.toggle(\"rotate-180\",e)})}};customElements.get(\"site-info-collapse\")||customElements.define(\"site-info-collapse\",c);"],["C:/Users/TY-Han/Documents/newBlog/src/components/features/TypewriterText.astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};var r=class{element;texts;currentTextIndex=0;speed;deleteSpeed;pauseTime;currentIndex=0;isDeleting=!1;timeoutId=null;constructor(t){this.element=t;const e=t.dataset.text||\"\";try{const n=JSON.parse(e);this.texts=Array.isArray(n)?n:[e]}catch{this.texts=[e]}this.speed=parseInt(t.dataset.speed||\"100\"),this.deleteSpeed=parseInt(t.dataset.deleteSpeed||\"50\"),this.pauseTime=parseInt(t.dataset.pauseTime||\"2000\"),this.texts.length>1&&!this.isTypewriterEnabled()?this.showRandomText():this.start()}isTypewriterEnabled(){return this.element.dataset.speed!==void 0||this.element.dataset.deleteSpeed!==void 0||this.element.dataset.pauseTime!==void 0}showRandomText(){const t=Math.floor(Math.random()*this.texts.length);this.element.textContent=this.texts[t]}start(){this.texts.length!==0&&this.type()}getCurrentText(){return this.texts[this.currentTextIndex]||\"\"}type(){const t=this.getCurrentText(),e=this.segmentText(t);this.isDeleting?this.currentIndex>0?(this.currentIndex--,this.element.textContent=e.slice(0,this.currentIndex).join(\"\"),this.timeoutId=window.setTimeout(()=>this.type(),this.deleteSpeed)):(this.isDeleting=!1,this.currentTextIndex=(this.currentTextIndex+1)%this.texts.length,this.timeoutId=window.setTimeout(()=>this.type(),this.speed)):this.currentIndex<e.length?(this.currentIndex++,this.element.textContent=e.slice(0,this.currentIndex).join(\"\"),this.timeoutId=window.setTimeout(()=>this.type(),this.speed)):this.texts.length>1&&(this.isDeleting=!0,this.timeoutId=window.setTimeout(()=>this.type(),this.pauseTime))}destroy(){this.timeoutId&&clearTimeout(this.timeoutId)}segmentText(t){const e=new Intl.Segmenter(void 0,{granularity:\"grapheme\"});return Array.from(e.segment(t),n=>n.segment)}};function i(){document.querySelectorAll(\".typewriter\").forEach(t=>{const e=t;e.__typewriterInstance&&e.__typewriterInstance.destroy(),e.textContent=\"\",e.__typewriterInstance=new r(e)})}function s(){i(),setTimeout(i,220)}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",s):s();document.addEventListener(\"swup:contentReplaced\",s);document.addEventListener(\"swup:content:replace\",s);document.addEventListener(\"swup:page:view\",s);typeof window<\"u\"&&window.swup?.hooks&&(window.swup.hooks.on(\"content:replace\",s),window.swup.hooks.on(\"page:view\",s));"],["C:/Users/TY-Han/Documents/newBlog/src/components/common/WidgetLayout.astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};var c=class extends HTMLElement{constructor(){if(super(),this.dataset.isCollapsed!==\"true\")return;this.dataset.expanded=\"false\";const l=this.dataset.id,t=this.querySelector(\".expand-btn button\"),o=this.querySelector(`#${l}`);if(!t||!o)return;const a=t.querySelector(\".toggle-text\"),n=t.querySelector(\".toggle-icon-more\"),i=t.querySelector(\".toggle-icon-less\"),r=e=>{const s=e?t.dataset.showLess||\"\":t.dataset.showMore||\"\";t.dataset.expanded=String(e),this.dataset.expanded=String(e),t.title=s,t.setAttribute(\"aria-label\",s),a&&(a.textContent=s),n?.classList.toggle(\"hidden\",e),i?.classList.toggle(\"hidden\",!e)};t.addEventListener(\"click\",()=>{const e=t.dataset.expanded===\"true\";o.classList.toggle(\"collapsed\",e),r(!e)})}};customElements.get(\"widget-layout\")||customElements.define(\"widget-layout\",c);"],["C:/Users/TY-Han/Documents/newBlog/src/pages/[...page].astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};document.addEventListener(\"DOMContentLoaded\",function(){{const e=o();document.body.classList.add(`device-${e}`);let t;window.addEventListener(\"resize\",function(){clearTimeout(t),t=setTimeout(function(){const i=o(),n=document.body.className.match(/device-(mobile|tablet|desktop)/)?.[1];n!==i&&(document.body.classList.remove(`device-${n}`),document.body.classList.add(`device-${i}`))},250)})}});function o(){if(typeof window>\"u\")return\"desktop\";const e=window.innerWidth;return e<768?\"mobile\":e<1024?\"tablet\":\"desktop\"}"],["C:/Users/TY-Han/Documents/newBlog/src/pages/rss.astro?astro&type=script&index=0&lang.ts","globalThis.process??={};globalThis.process.env??={};function n(){const t=document.getElementById(\"copy-rss-btn\");if(!t)return;const o=t.cloneNode(!0);t.parentNode?.replaceChild(o,t),o.addEventListener(\"click\",async function(){const i=this.getAttribute(\"data-url\");if(i)try{await navigator.clipboard.writeText(i);const e=this.textContent;this.textContent=this.getAttribute(\"data-copied-text\")||\"\",this.style.backgroundColor=\"var(--success-color, #10b981)\",setTimeout(()=>{this.textContent=e,this.style.backgroundColor=\"\"},2e3)}catch(e){console.error(\"复制失败:\",e);const s=this.textContent;this.textContent=this.getAttribute(\"data-failed-text\")||\"\",setTimeout(()=>{this.textContent=s},2e3)}})}document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",n):setTimeout(n,0);typeof window<\"u\"&&window.swup&&window.swup.hooks.on(\"content:replace\",()=>{setTimeout(n,100)});"]],"assets":["/anime-list.json","/favicon/avatar.png","/favicon/favicon-dark-128.png","/favicon/favicon-dark-180.png","/favicon/favicon-dark-192.png","/favicon/favicon-dark-32.png","/favicon/favicon-light-128.png","/favicon/favicon-light-180.png","/favicon/favicon-light-192.png","/favicon/favicon-light-32.png","/favicon/favicon.ico","/favicon/loading.gif","/favicon/longbg.jpg","/favicon/longbg1.jpg","/favicon/m1.png","/favicon/navbar.png","/_astro/AdvancedSearch.DVbTz4aX.js","/_astro/AnimeGrid.CPjTEv6V.js","/_astro/ArchivePanel.fmELG8A-.js","/_astro/BangumiGrid.BxfaLb5R.js","/_astro/client.B8n4dM-W.js","/_astro/client.svelte.BnNrlwWW.js","/_astro/disclose-version.CzLA2S9R.js","/_astro/DisplaySettingsIntegrated.CPGsw7Jd.js","/_astro/dist.DlMb1N8S.js","/_astro/ec.1m9xu.css","/_astro/ec.xb3ii.js","/_astro/FancyboxManager.astro_astro_type_script_index_0_lang.CnWUCWfh.js","/_astro/FloatingTOC.astro_astro_type_script_index_0_lang.gBl2DIkP.js","/_astro/Icon.DDBpibWP.js","/_astro/index.modern.DikKiUF0.js","/_astro/Layout.astro_astro_type_script_index_0_lang.ywOKhlzA.js","/_astro/legacy.s0aCmorU.js","/_astro/LightDarkSwitch.CXVCzRLL.js","/_astro/Live2DWidget.astro_astro_type_script_index_0_lang.Cu3VbCoD.js","/_astro/Navbar.astro_astro_type_script_index_0_lang.BxFedFsR.js","/_astro/page.jW4673Gb.js","/_astro/PioMessageBox.astro_astro_type_script_index_0_lang.KkvIaZJI.js","/_astro/preload-helper.B_GyUlum.js","/_astro/rolldown-runtime.BfhCWWln.js","/_astro/Search.DLj3rFEz.js","/_astro/setting-utils.m7MsQjK8.js","/_astro/SharePoster.BaQDIHd0.js","/_astro/SidebarTOC.astro_astro_type_script_index_0_lang.DFzPdO8r.js","/_astro/Swup.DWkI08FP.js","/_astro/Swup.modern.D0GF1rfR.js","/_astro/SwupA11yPlugin.OMawphHh.js","/_astro/SwupHeadPlugin.CgeFYPNH.js","/_astro/SwupPreloadPlugin.B64LMvH1.js","/_astro/SwupScriptsPlugin.CobeD_xC.js","/_astro/TabNav.CJaF2u2C.js","/_astro/toc-utils.CI21AnyE.js","/_astro/translation.DH8-I_kL.js","/_astro/url-utils.D771YzUG.js","/_astro/_...slug_.astro_astro_type_script_index_0_lang.BNYwXdIp.js","/assets/fonts/GreatVibes-Regular-2.otf","/assets/images/sakura.png","/pio/README.md","/assets/music/使一颗心免于哀伤-哼唱.mp3","/assets/js/firefly-twikoo-1.6.44.all.min.js","/assets/js/highlight.min.js","/assets/js/marked.min.js","/assets/css/highlight-github-dark.min.css","/assets/css/twikoo-custom.css","/assets/css/waline-custom.css","/gallery/firefly-2026/1.avif","/gallery/firefly-2026/2.avif","/gallery/firefly-2026/3.avif","/gallery/firefly-2026/4.avif","/gallery/firefly-2026/5.avif","/gallery/firefly-2026/6.avif","/gallery/firefly-2026/7.avif","/gallery/firefly-2026/8.avif","/gallery/firefly-2026/cover.avif","/gallery/firefly-2026/urls.txt","/_astro/fonts/07431a16dd76433e.woff2","/_astro/fonts/0777cbdcf1983e64.woff2","/_astro/fonts/0f7c5e2ce7cab7eb.woff2","/_astro/fonts/179376c88e792cbb.woff2","/_astro/fonts/1eeba51e3ef72549.woff2","/_astro/fonts/2e91b11b3637a475.woff2","/_astro/fonts/4a498dfb2bdc397b.woff2","/_astro/fonts/4e13c01b98043a1e.woff2","/_astro/fonts/508014400d20fe8c.woff2","/_astro/fonts/55e2e1306166cc66.woff2","/_astro/fonts/5e5f2ba54502ad0c.woff2","/_astro/fonts/8675f4cad3dc992b.woff2","/_astro/fonts/ad6bc6999df197d3.woff2","/_astro/fonts/b92787725bce141b.woff2","/_astro/fonts/bc273a2ecdfd6228.woff2","/_astro/fonts/bd11f27b8dbac1a1.woff2","/_astro/fonts/c5c4490645b295f5.woff2","/_astro/fonts/cc5f60fd46e42cc9.woff2","/_astro/fonts/d66ba9aabc6d3ddb.woff2","/_astro/fonts/eecbb020c15d3d07.woff2","/_astro/fonts/fe8426e418b1784b.woff2","/_astro/fonts/ffa1f1149b7accfe.woff2","/gallery/encrypted-test/urls.txt","/assets/images/effects/sakura.png","/assets/images/ad/ad1.webp","/pio/static/spine-player.min.css","/pio/static/spine-player.min.js","/assets/images/sponsor/afdian.png","/assets/images/sponsor/alipay.png","/assets/images/sponsor/wechat.png","/assets/music/cover/109951169585655912.webp","/pio/static/live2d-sdk/live2d-wrapper.js","/pio/static/live2d-sdk/live2d.min.js","/pio/models/live2d/illyasviel/illyasviel.moc","/pio/models/live2d/illyasviel/illyasviel.model.json","/pio/models/live2d/11110/Lead_00.moc","/pio/models/live2d/11110/Lead_00.model.json","/pio/models/spine/firefly/1310.atlas","/pio/models/spine/firefly/1310.json","/pio/models/spine/firefly/1310.png","/pio/models/spine/firefly/1310.spine","/pio/models/live2d/pio/model.json","/pio/models/live2d/pio/model.moc","/pio/models/live2d/snow_miku/model.json","/pio/models/live2d/snow_miku/model.moc","/pio/models/live2d/illyasviel/motions/Ylia_01.mtn","/pio/models/live2d/illyasviel/motions/Ylia_02.mtn","/pio/models/live2d/illyasviel/motions/Ylia_03.mtn","/pio/models/live2d/illyasviel/motions/Ylia_04.mtn","/pio/models/live2d/illyasviel/motions/Ylia_05.mtn","/pio/models/live2d/illyasviel/motions/Ylia_06.mtn","/pio/models/live2d/illyasviel/motions/Ylia_07.mtn","/pio/models/live2d/illyasviel/motions/Ylia_08.mtn","/pio/models/live2d/illyasviel/motions/Ylia_09.mtn","/pio/models/live2d/illyasviel/motions/Ylia_10.mtn","/pio/models/live2d/illyasviel/motions/Ylia_11.mtn","/pio/models/live2d/illyasviel/motions/Ylia_12.mtn","/pio/models/live2d/illyasviel/motions/Ylia_13.mtn","/pio/models/live2d/illyasviel/motions/Ylia_14.mtn","/pio/models/live2d/illyasviel/motions/Ylia_15.mtn","/pio/models/live2d/illyasviel/textures/texture_00.png","/pio/models/live2d/11110/motions/gift_01.mtn","/pio/models/live2d/11110/motions/idle.mtn","/pio/models/live2d/11110/motions/setting_01.mtn","/pio/models/live2d/11110/motions/stay_01.mtn","/pio/models/live2d/11110/motions/touch_01_1.mtn","/pio/models/live2d/11110/motions/touch_01_2.mtn","/pio/models/live2d/11110/motions/touch_99.mtn","/pio/models/live2d/11110/motions/touch_hand.mtn","/pio/models/live2d/11110/textures/texture_00.png","/pio/models/spine/firefly/audio/使一颗心免于哀伤-哼唱.wav","/pio/models/live2d/pio/motions/Breath Dere1.mtn","/pio/models/live2d/pio/motions/Breath Dere2.mtn","/pio/models/live2d/pio/motions/Breath Dere3.mtn","/pio/models/live2d/pio/motions/Breath1.mtn","/pio/models/live2d/pio/motions/Breath2.mtn","/pio/models/live2d/pio/motions/Breath3.mtn","/pio/models/live2d/pio/motions/Breath4.mtn","/pio/models/live2d/pio/motions/Breath5.mtn","/pio/models/live2d/pio/motions/Breath6.mtn","/pio/models/live2d/pio/motions/Breath7.mtn","/pio/models/live2d/pio/motions/Breath8.mtn","/pio/models/live2d/pio/motions/Fail.mtn","/pio/models/live2d/pio/motions/Sleeping.mtn","/pio/models/live2d/pio/motions/Success.mtn","/pio/models/live2d/pio/motions/Sukebei1.mtn","/pio/models/live2d/pio/motions/Sukebei2.mtn","/pio/models/live2d/pio/motions/Sukebei3.mtn","/pio/models/live2d/pio/motions/Touch Dere1.mtn","/pio/models/live2d/pio/motions/Touch Dere2.mtn","/pio/models/live2d/pio/motions/Touch Dere3.mtn","/pio/models/live2d/pio/motions/Touch Dere4.mtn","/pio/models/live2d/pio/motions/Touch Dere5.mtn","/pio/models/live2d/pio/motions/Touch Dere6.mtn","/pio/models/live2d/pio/motions/Touch1.mtn","/pio/models/live2d/pio/motions/Touch2.mtn","/pio/models/live2d/pio/motions/Touch3.mtn","/pio/models/live2d/pio/motions/Touch4.mtn","/pio/models/live2d/pio/motions/Touch5.mtn","/pio/models/live2d/pio/motions/Touch6.mtn","/pio/models/live2d/pio/motions/WakeUp.mtn","/pio/models/live2d/pio/textures/default-costume.png","/pio/models/live2d/pio/textures/pajamas-costume.png","/pio/models/live2d/pio/textures/school-costume.png","/pio/models/live2d/snow_miku/textures/texture_00.png","/pio/models/spine/firefly/images/E眉毛.png","/pio/models/spine/firefly/images/E眼珠.png","/pio/models/spine/firefly/images/E眼白.png","/pio/models/spine/firefly/images/E眼皮.png","/pio/models/spine/firefly/images/E眼角.png","/pio/models/spine/firefly/images/E睫毛.png","/pio/models/spine/firefly/images/E脸1.png","/pio/models/spine/firefly/images/E脸2.png","/pio/models/spine/firefly/images/L大臂.png","/pio/models/spine/firefly/images/L大臂衣袖.png","/pio/models/spine/firefly/images/L大臂衣袖后.png","/pio/models/spine/firefly/images/L正常左小臂.png","/pio/models/spine/firefly/images/L正常左手.png","/pio/models/spine/firefly/images/L正常左袖口.png","/pio/models/spine/firefly/images/M嘴巴.png","/pio/models/spine/firefly/images/M笑口.png","/pio/models/spine/firefly/images/M说话.png","/pio/models/spine/firefly/images/R大臂.png","/pio/models/spine/firefly/images/R大臂衣袖.png","/pio/models/spine/firefly/images/R大臂衣袖后.png","/pio/models/spine/firefly/images/R正常右小臂.png","/pio/models/spine/firefly/images/R正常右手.png","/pio/models/spine/firefly/images/X眼.png","/pio/models/spine/firefly/images/发1.png","/pio/models/spine/firefly/images/发10.png","/pio/models/spine/firefly/images/发11内阴影.png","/pio/models/spine/firefly/images/发2.png","/pio/models/spine/firefly/images/发3.png","/pio/models/spine/firefly/images/发4.png","/pio/models/spine/firefly/images/发5.png","/pio/models/spine/firefly/images/发6.png","/pio/models/spine/firefly/images/发7.png","/pio/models/spine/firefly/images/发8.png","/pio/models/spine/firefly/images/发9.png","/pio/models/spine/firefly/images/发带.png","/pio/models/spine/firefly/images/发影子.png","/pio/models/spine/firefly/images/发饰1.png","/pio/models/spine/firefly/images/发饰2.png","/pio/models/spine/firefly/images/发饰3.png","/pio/models/spine/firefly/images/可爱花朵.png","/pio/models/spine/firefly/images/右大腿.png","/pio/models/spine/firefly/images/右小腿.png","/pio/models/spine/firefly/images/后发1.png","/pio/models/spine/firefly/images/后发2.png","/pio/models/spine/firefly/images/后发3.png","/pio/models/spine/firefly/images/后发4.png","/pio/models/spine/firefly/images/后摆.png","/pio/models/spine/firefly/images/后脑勺.png","/pio/models/spine/firefly/images/左大腿.png","/pio/models/spine/firefly/images/左小腿.png","/pio/models/spine/firefly/images/星星1.png","/pio/models/spine/firefly/images/星星2.png","/pio/models/spine/firefly/images/星星3.png","/pio/models/spine/firefly/images/星星4.png","/pio/models/spine/firefly/images/生气符号1.png","/pio/models/spine/firefly/images/生气符号2.png","/pio/models/spine/firefly/images/胸饰.png","/pio/models/spine/firefly/images/脸红.png","/pio/models/spine/firefly/images/裙边.png","/pio/models/spine/firefly/images/身体.png","/pio/models/spine/firefly/images/问号.png","/pio/models/spine/firefly/images/领子.png","/pio/models/spine/firefly/images/领结.png","/pio/models/spine/firefly/images/鼻子.png","/pio/models/live2d/snow_miku/motions/idle/idle.mtn","/_astro/d4.NWa3rRrV.avif","/_astro/d5.Bj3n82jm.avif","/_astro/m6.DGocnIpq.avif","/_astro/m1.BCj2SBgy.avif","/_astro/firefly.EzH7fIYR.png","/_astro/m3.CGVbzK4J.avif","/_astro/navbar.Dr-epX2V.png","/_astro/m2.UksA6wjV.avif","/_astro/m4.BY40PMOZ.avif","/_astro/cover.LVH5wcXY.avif","/_astro/avatar.5Cu2iPx5.png","/_astro/1.DzpFX8mf.avif","/_astro/m5.B0GdABQC.avif","/_astro/d1.CXqBv4db.avif","/_astro/d2.DWf6gUu-.avif","/_astro/firefly2.dxmXG905.avif","/_astro/both-list.CybtDZTU.avif","/_astro/both-grid.B-BFe9Al.avif","/_astro/d3.CjFvlPtz.avif","/_astro/firefly3.CGzFXcxi.avif","/_astro/cover.-T-TJ4cz.jpeg","/_astro/github.urcbElKG.avif","/_astro/left-grid3.DCIbm9j3.avif","/_astro/left-list.CdJfuugk.avif","/_astro/firefly1.CZCuCN4V.avif","/_astro/obsidian.Cwb2iYzd.avif","/_astro/masonry.BgzRsBcp.avif","/_astro/vitepress.D2YnjBWE.avif","/_astro/right-grid2.BDLeNFG9.avif","/_astro/pachuli.D1C0tRtb.jpg","/_astro/MainGridLayout.DxA3VXwr.css","/_astro/Markdown.CLMvY_Mt.css","/_astro/jetbrains-mono-cyrillic-wght-normal.D73BlboJ.woff2","/_astro/jetbrains-mono-greek-wght-normal.Bw9x6K1M.woff2","/_astro/jetbrains-mono-vietnamese-wght-normal.Bt-aOZkq.woff2","/_astro/jetbrains-mono-latin-ext-wght-normal.DBQx-q_a.woff2","/_astro/jetbrains-mono-latin-wght-normal.B9CIFXIH.woff2","/_astro/favicon.CxwItQrm.ico","/_astro/layout-styles.DkghobkV.css","/_astro/navbar.CqtaDMak.css","/_astro/twikoo.BYGF5WAZ.css","/_astro/widget-responsive.CvXhHjEC.css","/_astro/_..Ci-tvtJg.css","/_astro/KaTeX_AMS-Regular.BQhdFMY1.woff2","/_astro/KaTeX_AMS-Regular.DMm9YOAa.woff","/_astro/KaTeX_AMS-Regular.DRggAlZN.ttf","/_astro/KaTeX_Caligraphic-Bold.Dq_IR9rO.woff2","/_astro/KaTeX_Caligraphic-Bold.BEiXGLvX.woff","/_astro/KaTeX_Caligraphic-Bold.ATXxdsX0.ttf","/_astro/KaTeX_Caligraphic-Regular.Di6jR-x-.woff2","/_astro/KaTeX_Caligraphic-Regular.CTRA-rTL.woff","/_astro/KaTeX_Caligraphic-Regular.wX97UBjC.ttf","/_astro/KaTeX_Fraktur-Bold.CL6g_b3V.woff2","/_astro/KaTeX_Fraktur-Bold.BsDP51OF.woff","/_astro/KaTeX_Fraktur-Bold.BdnERNNW.ttf","/_astro/KaTeX_Fraktur-Regular.CTYiF6lA.woff2","/_astro/KaTeX_Fraktur-Regular.Dxdc4cR9.woff","/_astro/KaTeX_Fraktur-Regular.CB_wures.ttf","/_astro/KaTeX_Main-Bold.Cx986IdX.woff2","/_astro/KaTeX_Main-Bold.Jm3AIy58.woff","/_astro/KaTeX_Main-Bold.waoOVXN0.ttf","/_astro/KaTeX_Main-BoldItalic.DxDJ3AOS.woff2","/_astro/KaTeX_Main-BoldItalic.SpSLRI95.woff","/_astro/KaTeX_Main-BoldItalic.DzxPMmG6.ttf","/_astro/KaTeX_Main-Italic.NWA7e6Wa.woff2","/_astro/KaTeX_Main-Italic.BMLOBm91.woff","/_astro/KaTeX_Main-Italic.3WenGoN9.ttf","/_astro/KaTeX_Main-Regular.B22Nviop.woff2","/_astro/KaTeX_Main-Regular.Dr94JaBh.woff","/_astro/KaTeX_Main-Regular.ypZvNtVU.ttf","/_astro/KaTeX_Math-BoldItalic.CZnvNsCZ.woff2","/_astro/KaTeX_Math-BoldItalic.iY-2wyZ7.woff","/_astro/KaTeX_Math-BoldItalic.B3XSjfu4.ttf","/_astro/KaTeX_Math-Italic.t53AETM-.woff2","/_astro/KaTeX_Math-Italic.DA0__PXp.woff","/_astro/KaTeX_Math-Italic.flOr_0UB.ttf","/_astro/KaTeX_SansSerif-Bold.D1sUS0GD.woff2","/_astro/KaTeX_SansSerif-Bold.DbIhKOiC.woff","/_astro/KaTeX_SansSerif-Bold.CFMepnvq.ttf","/_astro/KaTeX_SansSerif-Italic.C3H0VqGB.woff2","/_astro/KaTeX_SansSerif-Italic.DN2j7dab.woff","/_astro/KaTeX_SansSerif-Italic.YYjJ1zSn.ttf","/_astro/KaTeX_SansSerif-Regular.DDBCnlJ7.woff2","/_astro/KaTeX_SansSerif-Regular.CS6fqUqJ.woff","/_astro/KaTeX_SansSerif-Regular.BNo7hRIc.ttf","/_astro/KaTeX_Script-Regular.D3wIWfF6.woff2","/_astro/KaTeX_Script-Regular.D5yQViql.woff","/_astro/KaTeX_Script-Regular.C5JkGWo-.ttf","/_astro/KaTeX_Size1-Regular.mCD8mA8B.woff2","/_astro/KaTeX_Size1-Regular.C195tn64.woff","/_astro/KaTeX_Size1-Regular.Dbsnue_I.ttf","/_astro/KaTeX_Size2-Regular.Dy4dx90m.woff2","/_astro/KaTeX_Size2-Regular.oD1tc_U0.woff","/_astro/KaTeX_Size2-Regular.B7gKUWhC.ttf","/_astro/KaTeX_Size3-Regular.CTq5MqoE.woff","/_astro/KaTeX_Size3-Regular.DgpXs0kz.ttf","/_astro/KaTeX_Size4-Regular.Dl5lxZxV.woff2","/_astro/KaTeX_Size4-Regular.BF-4gkZK.woff","/_astro/KaTeX_Size4-Regular.DWFBv043.ttf","/_astro/KaTeX_Typewriter-Regular.CO6r4hn1.woff2","/_astro/KaTeX_Typewriter-Regular.C0xS9mPB.woff","/_astro/KaTeX_Typewriter-Regular.D3Ib7_Hf.ttf","/_astro/page.jW4673Gb.js","/404.html","/about/index.html","/admin/config.yml","/admin/index.html","/anime/index.html","/api/allPostMeta.json","/archive/index.html","/bangumi/index.html","/categories/index.html","/friends/index.html","/gallery/index.html","/guestbook/index.html","/robots.txt","/rss/index.html","/rss.xml","/search/index.html","/sponsor/index.html","/tags/index.html"],"buildFormat":"directory","checkOrigin":true,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"34mCDrX76lsct9/QI/+bH+QuMWZE6srk+9fGEVTAjos=","sessionConfig":{"driver":"unstorage/drivers/cloudflare-kv-binding","options":{"binding":"SESSION"}},"image":{"layout":"constrained"},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./chunks/noop-entrypoint_BYLrzUxc.mjs"),
	middleware: () => import("./virtual_astro_middleware.mjs"),
	sessionDriver: () => import("./chunks/_virtual_astro_session-driver_Bvb4Kaq4.mjs"),
	serverIslandMappings: () => import("./chunks/_virtual_astro_server-island-manifest_q0HM18kM.mjs"),
	routes: manifestRoutes,
	pageMap
});
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/app/entrypoints/virtual/prod.js
var createApp$1 = ({ streaming } = {}) => {
	const app = new App(manifest, streaming);
	app.setFetchHandler(_virtual_astro_fetchable_default);
	return app;
};
//#endregion
//#region node_modules/.pnpm/astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emnapi+core@1.11.1_@emnapi+runtime@1.11.1_@types+_q3klgxt7hyc67c3ohco5qjm7sq/node_modules/astro/dist/core/app/entrypoints/virtual/index.js
var createApp = createApp$1;
//#endregion
//#region node_modules/.pnpm/@astrojs+cloudflare@14.0.0_@types+node@25.9.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emn_26whk3zmcbdugocbnufuufbttq/node_modules/@astrojs/cloudflare/dist/utils/env.js
var createGetEnv = (env) => (key) => {
	const v = env[key];
	if (typeof v === "undefined" || typeof v === "string") return v;
	if (typeof v === "boolean" || typeof v === "number") return v.toString();
};
//#endregion
//#region node_modules/.pnpm/@astrojs+internal-helpers@0.10.0/node_modules/@astrojs/internal-helpers/dist/request.js
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString()?.split(",").map((e) => e.trim())?.[0];
}
var IP_RE = /^[0-9a-fA-F.:]{1,45}$/;
function isValidIpAddress(value) {
	return IP_RE.test(value);
}
function getValidatedIpFromHeader(headerValue) {
	const raw = getFirstForwardedValue(headerValue);
	if (raw && isValidIpAddress(raw)) return raw;
}
//#endregion
//#region node_modules/.pnpm/@astrojs+cloudflare@14.0.0_@types+node@25.9.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emn_26whk3zmcbdugocbnufuufbttq/node_modules/@astrojs/cloudflare/dist/utils/cf-helpers.js
function matchStaticAsset(manifest, requestUrl, env) {
	const { pathname } = new URL(requestUrl);
	if (manifest.assets.has(pathname)) return env.ASSETS.fetch(requestUrl.replace(/\.html$/, ""));
}
async function fallbackToAssets(requestUrl, env) {
	const asset = await env.ASSETS.fetch(requestUrl.replace(/index.html$/, "").replace(/\.html$/, ""));
	if (asset.status !== 404) return asset;
}
function createErrorPageFetch(env) {
	return async (url) => {
		return env.ASSETS.fetch(url.replace(/\.html$/, ""));
	};
}
function createLocals(ctx) {
	const locals = { cfContext: ctx };
	Object.defineProperty(locals, "runtime", {
		enumerable: false,
		value: {
			get env() {
				throw new Error(`Astro.locals.runtime.env has been removed in Astro v6. Use 'import { env } from "cloudflare:workers"' instead.`);
			},
			get cf() {
				throw new Error(`Astro.locals.runtime.cf has been removed in Astro v6. Use 'Astro.request.cf' instead.`);
			},
			get caches() {
				throw new Error(`Astro.locals.runtime.caches has been removed in Astro v6. Use the global 'caches' object instead.`);
			},
			get ctx() {
				throw new Error(`Astro.locals.runtime.ctx has been removed in Astro v6. Use 'Astro.locals.cfContext' instead.`);
			}
		}
	});
	return locals;
}
function getClientAddress(request) {
	return getValidatedIpFromHeader(request.headers.get("cf-connecting-ip"));
}
//#endregion
//#region node_modules/.pnpm/@astrojs+cloudflare@14.0.0_@types+node@25.9.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emn_26whk3zmcbdugocbnufuufbttq/node_modules/@astrojs/cloudflare/dist/utils/cf.js
function injectSessionBinding(manifest, env) {
	if (env["SESSION"]) {
		const sessionConfigOptions = manifest.sessionConfig?.options ?? {};
		Object.assign(sessionConfigOptions, { binding: env[sessionKVBindingName] });
	}
}
//#endregion
//#region node_modules/.pnpm/@astrojs+cloudflare@14.0.0_@types+node@25.9.3_astro@7.0.2_@astrojs+markdown-remark@7.2.0_@emn_26whk3zmcbdugocbnufuufbttq/node_modules/@astrojs/cloudflare/dist/utils/handler.js
setGetEnv(createGetEnv(env));
var app = createApp();
async function handle(request, env, context) {
	injectSessionBinding(app.manifest, env);
	const staticAsset = matchStaticAsset(app.manifest, request.url, env);
	if (staticAsset) return staticAsset;
	let routeData = void 0;
	if (app.isDev()) {
		const result = await app.devMatch(app.getPathnameFromRequest(request));
		if (result) routeData = result.routeData;
	} else routeData = app.match(request);
	if (!routeData) {
		const asset = await fallbackToAssets(request.url, env);
		if (asset) return asset;
	}
	const locals = createLocals(context);
	const waitUntil = context.waitUntil.bind(context);
	const response = await app.render(request, {
		routeData,
		locals,
		waitUntil,
		prerenderedErrorPageFetch: createErrorPageFetch(env),
		clientAddress: getClientAddress(request)
	});
	if (app.setCookieHeaders) for (const setCookieHeader of app.setCookieHeaders(response)) response.headers.append("Set-Cookie", setCookieHeader);
	return response;
}
//#endregion
//#region \0virtual:cloudflare/worker-entry
var worker_entry_default = { fetch: handle };
//#endregion
export { worker_entry_default as default };
