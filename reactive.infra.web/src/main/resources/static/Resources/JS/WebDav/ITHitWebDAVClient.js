if ("undefined" === typeof ITHit) {
    (function () {
        this.ITHit = {
            _oComponents: {},
            _oNamespace: {},
            Define: function (_1) {
                this._oComponents[_1] = true;
            },
            Defined: function (_2) {
                return !!this._oComponents[_2];
            },
            Add: function (_3, _4) {
                var _5 = _3.split(".");
                var _6 = this;
                var _7 = _5.length;
                for (var i = 0; i < _7; i++) {
                    if ("undefined" === typeof _6[_5[i]]) {
                        if (i < (_7 - 1)) {
                            _6[_5[i]] = {};
                        } else {
                            _6[_5[i]] = _4;
                        }
                    } else {
                        if (!(_6[_5[i]] instanceof Object)) {
                            return;
                        }
                    }
                    _6 = _6[_5[i]];
                }
            },
            Temp: {}
        };
    })();
}
ITHit.Config = {Global: window, ShowOriginalException: true, PreventCaching: false};
ITHit.Add("GetNamespace", function (_9, _a, _b) {
    var _c = ITHit.Utils;
    if (!_c.IsString(_9) && !_c.IsArray(_9)) {
        throw new ITHit.Exception("ITHit.GetNamespace() expected string as first parameter of method.");
    }
    var _d = _c.IsArray(_9) ? _9 : _9.split(".");
    var _e = _b || ITHit.Config.Global;
    for (var i = 0, _10 = ""; _e && (_10 = _d[i]); i++) {
        if (_10 in _e) {
            _e = _e[_10];
        } else {
            if (_a) {
                _e[_10] = {};
                _e = _e[_10];
            } else {
                _e = undefined;
            }
        }
    }
    return _e;
});
ITHit.Add("Namespace", function (_11, _12) {
    return ITHit.GetNamespace(_11, false, _12);
});
ITHit.Add("Declare", function (_13, _14) {
    return ITHit.GetNamespace(_13, true, _14);
});
ITHit.Add("DetectOS", function () {
    var _15 = navigator.platform, _16 = {
        Windows: (-1 != _15.indexOf("Win")),
        MacOS: (-1 != _15.indexOf("Mac")),
        IOS: (/iPad|iPhone|iPod/.test(_15)),
        Linux: (-1 != _15.indexOf("Linux")),
        UNIX: (-1 != _15.indexOf("X11")),
        OS: null
    };
    if (_16.Windows) {
        _16.OS = "Windows";
    } else {
        if (_16.Linux) {
            _16.OS = "Linux";
        } else {
            if (_16.MacOS) {
                _16.OS = "MacOS";
            } else {
                if (_16.UNIX) {
                    _16.OS = "UNIX";
                } else {
                    if (_16.IOS) {
                        _16.OS = "IOS";
                    }
                }
            }
        }
    }
    return _16;
}());
ITHit.Add("DetectBrowser", function () {
    var _17 = navigator.userAgent,
        _18 = {IE: false, FF: false, Chrome: false, Safari: false, Opera: false, Browser: null, Mac: false}, _19 = {
            IE: {Search: "MSIE", Browser: "IE"},
            IE11: {Search: "Trident/7", Version: "rv", Browser: "IE"},
            Edge: {Search: "Edge", Browser: "Edge"},
            FF: {Search: "Firefox", Browser: "FF"},
            Chrome: {Search: "Chrome", Browser: "Chrome"},
            Safari: {
                Search: "Safari",
                Version: "Version",
                Browser: "Safari",
                Mac: "Macintosh",
                iPad: "iPad",
                iPhone: "iPhone"
            },
            Opera: {Search: "Opera", Browser: "Opera"}
        };
    for (var _1a in _19) {
        var pos = _17.indexOf(_19[_1a].Search);
        if (-1 != pos) {
            _18.Browser = _19[_1a].Browser;
            _18.Mac = navigator.platform.indexOf("Mac") == 0;
            _18.iPad = (_19[_1a].iPad && _17.indexOf(_19[_1a].iPad) != -1);
            _18.iPhone = (_19[_1a].iPhone && _17.indexOf(_19[_1a].iPhone) != -1);
            var _1c = _19[_1a].Version || _19[_1a].Search, _1d = _17.indexOf(_1c);
            if (-1 == _1d) {
                _18[_19[_1a].Browser] = true;
                break;
            }
            _18[_19[_1a].Browser] = parseFloat(_17.substring(_1d + _1c.length + 1));
            break;
        }
    }
    return _18;
}());
ITHit.Add("DetectDevice", function () {
    var _1e = navigator.userAgent;
    var _1f = {};
    var _20 = {
        Android: {Search: "Android"},
        BlackBerry: {Search: "BlackBerry"},
        iOS: {Search: "iPhone|iPad|iPod"},
        Opera: {Search: "Opera Mini"},
        Windows: {Search: "IEMobile"},
        Mobile: {}
    };
    for (var _21 in _20) {
        var _22 = _20[_21];
        if (!_22.Search) {
            continue;
        }
        var _23 = new RegExp(_22.Search, "i");
        _1f[_21] = _23.test(_1e);
        if (!_1f.Mobile && _1f[_21]) {
            _1f.Mobile = true;
        }
    }
    return _1f;
}());
ITHit.Add("HttpRequest", function (_24, _25, _26, _27, _28, _29) {
    if (!ITHit.Utils.IsString(_24)) {
        throw new ITHit.Exception("Expexted string href in ITHit.HttpRequest. Passed: \"" + _24 + "\"", "sHref");
    }
    if (!ITHit.Utils.IsObjectStrict(_26) && !ITHit.Utils.IsNull(_26) && !ITHit.Utils.IsUndefined(_26)) {
        throw new ITHit.Exception("Expexted headers list as object in ITHit.HttpRequest.", "oHeaders");
    }
    this.Href = _24;
    this.Method = _25;
    this.Headers = _26;
    this.Body = _27;
    this.User = _28 || null;
    this.Password = _29 || null;
});
ITHit.Add("HttpResponse", function () {
    var _2a = function (_2b, _2c, _2d, _2e) {
        if (!ITHit.Utils.IsString(_2b)) {
            throw new ITHit.Exception("Expexted string href in ITHit.HttpResponse. Passed: \"" + _2b + "\"", "sHref");
        }
        if (!ITHit.Utils.IsInteger(_2c)) {
            throw new ITHit.Exception("Expexted integer status in ITHit.HttpResponse.", "iStatus");
        }
        if (!ITHit.Utils.IsString(_2d)) {
            throw new ITHit.Exception("Expected string status description in ITHit.HttpResponse.", "sStatusDescription");
        }
        if (_2e && !ITHit.Utils.IsObjectStrict(_2e)) {
            throw new ITHit.Exception("Expected object headers in ITHit.HttpResponse.", "oHeaders");
        } else {
            if (!_2e) {
                _2e = {};
            }
        }
        this.Href = _2b;
        this.Status = _2c;
        this.StatusDescription = _2d;
        this.Headers = _2e;
        this.BodyXml = null;
        this.BodyText = "";
    };
    _2a.prototype._SetBody = function (_2f, _30) {
        this.BodyXml = _2f || null;
        this.BodyText = _30 || "";
    };
    _2a.prototype.SetBodyText = function (_31) {
        this.BodyXml = null;
        this.BodyText = _31;
    };
    _2a.prototype.SetBodyXml = function (_32) {
        this.BodyXml = _32;
        this.BodyText = "";
    };
    _2a.prototype.ParseXml = function (_33) {
        if (!ITHit.Utils.IsString(_33)) {
            throw new ITHit.Exception("Expected XML string in ITHit.HttpResponse.ParseXml", "sXml");
        }
        var _34 = new ITHit.XMLDoc();
        _34.load(_33);
        this.BodyXml = _34._get();
        this.BodyText = _33;
    };
    _2a.prototype.GetResponseHeader = function (_35, _36) {
        if (!_36) {
            return this.Headers[_35];
        } else {
            var _35 = String(_35).toLowerCase();
            for (var _37 in this.Headers) {
                if (_35 === String(_37).toLowerCase()) {
                    return this.Headers[_37];
                }
            }
            return undefined;
        }
    };
    return _2a;
}());
ITHit.Add("XMLRequest", (function () {
    var _38;
    var _39 = function () {
        if (ITHit.DetectBrowser.IE && ITHit.DetectBrowser.IE < 10 && window.ActiveXObject) {
            if (_38) {
                return new ActiveXObject(_38);
            } else {
                var _3a = ["MSXML2.XmlHttp.6.0", "MSXML2.XmlHttp.3.0"];
                for (var i = 0; i < _3a.length; i++) {
                    try {
                        var _3c = new ActiveXObject(_3a[i]);
                        _38 = _3a[i];
                        return _3c;
                    } catch (e) {
                    }
                }
            }
        } else {
            if ("undefined" != typeof XMLHttpRequest) {
                return new XMLHttpRequest();
            }
        }
        throw new ITHit.Exception("XMLHttpRequest (AJAX) not supported");
    };
    var _3d = function (_3e) {
        var _3f = {};
        if (!_3e) {
            return _3f;
        }
        var _40 = _3e.split("\n");
        for (var i = 0; i < _40.length; i++) {
            if (!ITHit.Trim(_40[i])) {
                continue;
            }
            var _42 = _40[i].split(":");
            var _43 = _42.shift();
            _3f[_43] = ITHit.Trim(_42.join(":"));
        }
        return _3f;
    };
    var _44 = function (_45, _46) {
        this.bAsync = _46 === true;
        this.OnData = null;
        this.OnError = null;
        this.OnProgress = null;
        this.oHttpRequest = _45;
        this.oError = null;
        if (!_45.Href) {
            throw new ITHit.Exception("Server url had not been set.");
        }
        if (ITHit.Logger && ITHit.LogLevel) {
            ITHit.Logger.WriteMessage("[" + _45.Href + "]");
        }
        this.oRequest = _39();
        var _47 = String(_45.Href);
        var _48 = _45.Method || "GET";
        try {
            if (_45.User) {
                this.oRequest.open(_48, ITHit.DecodeHost(_47), this.bAsync, _45.User, _45.Password);
            } else {
                this.oRequest.open(_48, ITHit.DecodeHost(_47), this.bAsync);
            }
            if (ITHit.DetectBrowser.IE && ITHit.DetectBrowser.IE >= 10) {
                try {
                    this.oRequest.responseType = "msxml-document";
                } catch (e) {
                }
            }
        } catch (e) {
            var _49 = _47.match(/(?:\/\/)[^\/]+/);
            if (_49) {
                var _4a = _49[0].substr(2);
                if (_44.Host != _4a) {
                    throw new ITHit.Exception(ITHit.Phrases.CrossDomainRequestAttempt.Paste(window.location, _47, String(_48)), e);
                } else {
                    throw e;
                }
            }
        }
        for (var _4b in _45.Headers) {
            this.oRequest.setRequestHeader(_4b, _45.Headers[_4b]);
        }
        if (this.bAsync) {
            try {
                this.oRequest.withCredentials = true;
            } catch (e) {
            }
        }
        if (this.bAsync) {
            var _4c = this;
            this.oRequest.onreadystatechange = function () {
                if (_4c.oRequest.readyState != 4) {
                    return;
                }
                var _4d = _4c.GetResponse();
                if (typeof _4c.OnData === "function") {
                    _4c.OnData.call(_4c, _4d);
                }
            };
            if ("onprogress" in this.oRequest) {
                this.oRequest.onprogress = function (_4e) {
                    if (typeof _4c.OnProgress === "function") {
                        _4c.OnProgress.call(_4c, _4e);
                    }
                };
            }
        }
    };
    _44.prototype.Send = function () {
        var _4f = this.oHttpRequest.Body;
        _4f = _4f || (ITHit.Utils.IsUndefined(_4f) || ITHit.Utils.IsNull(_4f) || ITHit.Utils.IsBoolean(_4f) ? "" : _4f);
        _4f = String(_4f);
        if (_4f === "") {
            _4f = null;
        }
        try {
            this.oRequest.send(_4f);
        } catch (e) {
            this.oError = e;
            if (typeof this.OnError === "function") {
                this.OnError.call(this, e);
            }
        }
    };
    _44.prototype.Abort = function () {
        if (this.oRequest) {
            try {
                this.oRequest.abort();
            } catch (e) {
                this.oError = e;
                if (typeof this.OnError === "function") {
                    this.OnError.call(this, e);
                }
            }
        }
    };
    _44.prototype.GetResponse = function () {
        var _50 = this.oHttpRequest;
        var _51 = this.oRequest;
        var _52 = String(_50.Href);
        if (this.bAsync && _51.readyState != 4) {
            throw new ITHit.Exception("Request sended as asynchronous, please register callback through XMLRequest.OnData() method for get responce object.");
        }
        if ((404 == _51.status) && (-1 != _52.indexOf(".js") && (_50.Method !== "PROPFIND"))) {
            ITHit.debug.loadTrace.failed(ITHit.debug.loadTrace.FAILED_LOAD);
            throw new ITHit.Exception("Failed to load script (\"" + _52 + "\"). Request returned status: " + _51.status + (_51.statusText ? " (" + _51.statusText + ")" : "") + ".", this.oError || undefined);
        }
        var _53 = this.FixResponseStatus(_51.status, _51.statusText);
        var _54 = new ITHit.HttpResponse(_52, _53.Status, _53.StatusDescription, _3d(_51.getAllResponseHeaders()));
        _54._SetBody(_51.responseXML, _51.responseText);
        return _54;
    };
    _44.prototype.FixResponseStatus = function (_55, _56) {
        var _57 = {Status: _55, StatusDescription: _56};
        if (1223 == _55) {
            _57.Status = 204;
            _57.StatusDescription = "No Content";
        }
        return _57;
    };
    _44.Host = window.location.host;
    return _44;
})());
ITHit.Add("Utils", {
    IsString: function (_58) {
        return (("string" == typeof _58) || (_58 instanceof String));
    }, IsNumber: function (_59) {
        return ("number" == typeof _59);
    }, IsBoolean: function (_5a) {
        return (("boolean" == typeof _5a) || (_5a instanceof Boolean));
    }, IsInteger: function (_5b) {
        return this.IsNumber(_5b) && (-1 == String(_5b).indexOf("."));
    }, IsArray: function (_5c) {
        return (_5c instanceof Array || ("array" == typeof _5c));
    }, IsFunction: function (_5d) {
        return (_5d instanceof Function);
    }, IsObject: function (_5e) {
        return ("object" == typeof _5e);
    }, IsDate: function (_5f) {
        return (_5f instanceof Date);
    }, IsRegExp: function (_60) {
        return (_60 instanceof RegExp);
    }, IsObjectStrict: function (_61) {
        return this.IsObject(_61) && !this.IsArray(_61) && !this.IsString(_61) && !this.IsNull(_61) && !this.IsNumber(_61) && !this.IsDate(_61) && !this.IsRegExp(_61) && !this.IsBoolean(_61) && !this.IsFunction(_61) && !this.IsNull(_61);
    }, IsUndefined: function (_62) {
        return (undefined === _62);
    }, IsNull: function (_63) {
        return (null === _63);
    }, IsDOMObject: function (_64) {
        return _64 && this.IsObject(_64) && !this.IsUndefined(_64.nodeType);
    }, HtmlEscape: function (_65) {
        return String(_65).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }, IndexOf: function (_66, _67, _68) {
        var i = 0, _6a = _66 && _66.length;
        if (typeof _68 == "number") {
            i = _68 < 0 ? Math.max(0, _6a + _68) : _68;
        }
        for (; i < _6a; i++) {
            if (_66[i] === _67) {
                return i;
            }
        }
        return -1;
    }, Contains: function (_6b, _6c) {
        return _6b && _6c && this.IsArray(_6b) && (this.IndexOf(_6b, _6c) >= 0);
    }, FindBy: function (_6d, _6e, _6f) {
        if (_6d.find) {
            return _6d.find(_6e, _6f);
        }
        for (var i = 0; i < _6d.length; i++) {
            var _71 = _6d[i];
            if (_6e(_71, i, _6d)) {
                return _71;
            }
        }
        return undefined;
    }, FilterBy: function (_72, _73, _74) {
        var _75 = [];
        if (_72.filter) {
            return _72.filter(_73, _74);
        }
        for (var i = 0; i < _72.length; i++) {
            var _77 = _72[i];
            if (_73(_77, i, _72)) {
                _75.push(_77);
            }
        }
        return _75;
    }, CreateDOMElement: function (_78, _79) {
        var _7a = ITHit.Utils;
        if (_7a.IsObject(_78)) {
            if (!_78.nodeName) {
                throw new ITHit.Exception("nodeName property does not specified.");
            }
            _79 = _78;
            _78 = _78.nodeName;
            delete _79.nodeName;
        }
        var _7b = document.createElement(_78);
        if (_79 && _7a.IsObject(_79)) {
            for (var _7c in _79) {
                if (!_79.hasOwnProperty(_7c)) {
                    continue;
                }
                switch (_7c) {
                    case "class":
                        if (_79[_7c]) {
                            _7b.className = _79[_7c];
                        }
                        break;
                    case "style":
                        var _7d = _79[_7c];
                        for (var _7e in _7d) {
                            if (!_7d.hasOwnProperty(_7e)) {
                                continue;
                            }
                            _7b.style[_7e] = _7d[_7e];
                        }
                        break;
                    case "childNodes":
                        for (var i = 0, l = _79[_7c].length; i < l; i++) {
                            var _81 = _79[_7c][i];
                            if (_7a.IsString(_81) || _7a.IsNumber(_81) || _7a.IsBoolean(_81)) {
                                _81 = document.createTextNode(_81);
                            } else {
                                if (!_81) {
                                    continue;
                                }
                            }
                            if (!_7a.IsDOMObject(_81)) {
                                _81 = ITHit.Utils.CreateDOMElement(_81);
                            }
                            _7b.appendChild(_81);
                        }
                        break;
                    default:
                        _7b[_7c] = _79[_7c];
                }
            }
        }
        return _7b;
    }, GetComputedStyle: function (_82) {
        ITHit.Utils.GetComputedStyle = ITHit.Components.dojo.getComputedStyle;
        return ITHit.Utils.GetComputedStyle(_82);
    }, MakeScopeClosure: function (_83, _84, _85) {
        if (this.IsUndefined(_85)) {
            return this._GetClosureFunction(_83, _84);
        } else {
            if (!this.IsArray(_85)) {
                _85 = [_85];
            }
            return this._GetClosureParamsFunction(_83, _84, _85);
        }
    }, _GetClosureParamsFunction: function (_86, _87, _88) {
        return function () {
            var _89 = [];
            for (var i = 0, l = _88.length; i < l; i++) {
                _89.push(_88[i]);
            }
            if (arguments.length) {
                for (var i = 0, l = arguments.length; i < l; i++) {
                    _89.push(arguments[i]);
                }
            }
            if (ITHit.Utils.IsFunction(_87)) {
                _87.apply(_86, _89);
            } else {
                _86[_87].apply(_86, _89);
            }
        };
    }, _GetClosureFunction: function (_8c, _8d) {
        return function () {
            if (ITHit.Utils.IsFunction(_8d)) {
                return _8d.apply(_8c, arguments);
            }
            return _8c[_8d].apply(_8c, arguments);
        };
    }
});
ITHit.Add("Trim", function (_8e, _8f, _90) {
    if (("string" != typeof _8e) && !(_8e instanceof String)) {
        if (!_90) {
            return _8e;
        } else {
            throw new ITHit.Exception("ITHit.Trim() expected string as first prameter.");
        }
    }
    switch (_8f) {
        case ITHit.Trim.Left:
            return _8e.replace(/^\s+/, "");
            break;
        case ITHit.Trim.Right:
            return _8e.replace(/\s+$/, "");
            break;
        default:
            return _8e.replace(/(?:^\s+|\s+$)/g, "");
    }
});
ITHit.Add("Trim.Left", "Left");
ITHit.Add("Trim.Right", "Right");
ITHit.Add("Trim.Both", "Both");
ITHit.Add("Exception", (function () {
    var _91 = function (_92, _93) {
        this.Message = _92;
        this.InnerException = _93;
        if (ITHit.Logger.GetCount(ITHit.LogLevel.Error)) {
            var _94 = "Exception: " + this.Name + "\n" + "Message: " + this.Message + "\n";
            if (_93) {
                _94 += ((!_93 instanceof Error) ? "Inner exception: " : "") + this.GetExceptionsStack(_93);
            }
            ITHit.Logger.WriteMessage(_94, ITHit.LogLevel.Error);
        }
    };
    _91.prototype.Name = "Exception";
    _91.prototype.GetExceptionsStack = function (_95, _96) {
        if ("undefined" === typeof _95) {
            var _95 = this;
        }
        var _96 = _96 ? _96 : 0;
        var _97 = "";
        var _98 = "      ";
        var _99 = "";
        for (var i = 0; i < _96; i++) {
            _99 += _98;
        }
        if (_95 instanceof ITHit.Exception) {
            _97 += _99 + (_95.Message ? _95.Message : _95) + "\n";
        } else {
            if (ITHit.Config.ShowOriginalException) {
                _97 += "\nOriginal exception:\n";
                if (("string" != typeof _95) && !(_95 instanceof String)) {
                    for (var _9b in _95) {
                        _97 += "\t" + _9b + ": \"" + ITHit.Trim(_95[_9b]) + "\"\n";
                    }
                } else {
                    _97 += "\t" + _95 + "\n";
                }
            }
        }
        return _97;
    };
    _91.prototype.toString = function () {
        return this.GetExceptionsStack();
    };
    return _91;
})());
ITHit.Add("Extend", function (_9c, _9d) {
    function inheritance() {
    }

    inheritance.prototype = _9d.prototype;
    _9c.prototype = new inheritance();
    _9c.prototype.constructor = _9c;
    _9c.baseConstructor = _9d;
    if (_9d.base) {
        _9d.prototype.base = _9d.base;
    }
    _9c.base = _9d.prototype;
});
ITHit.Add("Events", function () {
    var _9e = function () {
        this._Listeners = this._NewObject();
        this._DispatchEvents = {};
        this._DelayedDelete = {};
    };
    _9e.prototype._NewObject = function () {
        var obj = {};
        for (var _a0 in obj) {
            delete obj[_a0];
        }
        return obj;
    };
    _9e.prototype.AddListener = function (_a1, _a2, _a3, _a4) {
        var _a5 = _a1.__instanceName;
        var _a6;
        var _a7 = ITHit.EventHandler;
        if (!(_a3 instanceof ITHit.EventHandler)) {
            _a6 = new ITHit.EventHandler(_a4 || null, _a3);
        } else {
            _a6 = _a3;
        }
        var _a8 = this._Listeners[_a5] || (this._Listeners[_a5] = this._NewObject());
        var _a9 = _a8[_a2] || (_a8[_a2] = []);
        var _aa = false;
        for (var i = 0, l = _a9.length; i < l; i++) {
            if (_a9[i].IsEqual(_a6)) {
                _aa = true;
                break;
            }
        }
        if (!_aa) {
            _a9.push(_a6);
        }
    };
    _9e.prototype.DispatchEvent = function (_ad, _ae, _af) {
        var _b0 = _ad.__instanceName;
        if (!this._Listeners[_b0] || !this._Listeners[_b0][_ae] || !this._Listeners[_b0][_ae].length) {
            return undefined;
        }
        var _b1 = ITHit.EventHandler;
        var _b2;
        var _b3 = [];
        for (var i = 0, l = this._Listeners[_b0][_ae].length; i < l; i++) {
            _b3.push(this._Listeners[_b0][_ae][i]);
        }
        this._DispatchEvents[_b0] = (this._DispatchEvents[_b0] || 0) + 1;
        this._DispatchEvents[_b0 + ":" + _ae] = (this._DispatchEvents[_b0 + ":" + _ae] || 0) + 1;
        for (var i = 0; i < _b3.length; i++) {
            var _b6;
            if (_b3[i] instanceof _b1) {
                try {
                    _b6 = _b3[i].CallHandler(_ad, _ae, _af);
                } catch (e) {
                    throw e;
                }
            }
            if (_b3[i] instanceof Function) {
                try {
                    _b6 = _b3[i](_ad, _ae, _af);
                } catch (e) {
                    throw e;
                }
            }
            if (!ITHit.Utils.IsUndefined(_b6)) {
                _b2 = _b6;
            }
        }
        this._DispatchEvents[_b0]--;
        this._DispatchEvents[_b0 + ":" + _ae]--;
        this._CheckDelayedDelete(_ad, _ae);
        return _b2;
    };
    _9e.prototype.RemoveListener = function (_b7, _b8, _b9, _ba) {
        var _bb = _b7.__instanceName;
        _ba = _ba || null;
        if (!this._Listeners[_bb] || !this._Listeners[_bb][_b8] || !this._Listeners[_bb][_b8].length) {
            return true;
        }
        var _bc = this._Listeners[_bb][_b8];
        for (var i = 0, l = _bc.length; i < l; i++) {
            if (_bc[i].IsEqual(_ba, _b9)) {
                this._Listeners[_bb][_b8].splice(i, 1);
                break;
            }
        }
    };
    _9e.prototype.RemoveAllListeners = function (_bf, _c0) {
        var _c1 = _bf.__instanceName;
        if (!ITHit.Utils.IsUndefined(_c0)) {
            if (ITHit.Utils.IsUndefined(this._DispatchEvents[_c1 + ":" + _c0])) {
                delete this._Listeners[_c1][_c0];
            } else {
                this._DelayedDelete[_c1 + ":" + _c0] = true;
            }
        } else {
            if (ITHit.Utils.IsUndefined(this._DispatchEvents[_c1])) {
                delete this._Listeners[_c1];
            } else {
                this._DelayedDelete[_c1] = true;
            }
        }
    };
    _9e.prototype._CheckDelayedDelete = function (_c2, _c3) {
        var _c4 = _c2.__instanceName;
        if (!this._DispatchEvents[_c4 + ":" + _c3]) {
            delete this._DispatchEvents[_c4 + ":" + _c3];
            if (!ITHit.Utils.IsUndefined(this._DelayedDelete[_c4 + ":" + _c3])) {
                this.RemoveAllListeners(_c2, _c3);
            }
        }
        if (!this._DispatchEvents[_c4]) {
            delete this._DispatchEvents[_c4];
            if (!ITHit.Utils.IsUndefined(this._DelayedDelete[_c4])) {
                this.RemoveAllListeners(_c2);
            }
        }
    };
    _9e.prototype.ListenersLength = function (_c5, _c6) {
        var _c7 = _c5.__instanceName;
        if (!this._Listeners[_c7] || !this._Listeners[_c7][_c6]) {
            return 0;
        }
        return this._Listeners[_c7][_c6].length;
    };
    _9e.prototype.Fix = function (e) {
        e = e || window.event;
        if (!e.target && e.srcElement) {
            e.target = e.srcElement;
        }
        if ((null == e.pageX) && (null != e.clientX)) {
            var _c9 = document.documentElement, _ca = document.body;
            e.pageX = e.clientX + (_c9 && _c9.scrollLeft || _ca && _ca.scrollLeft || 0) - (_c9.clientLeft || 0);
            e.pageY = e.clientY + (_c9 && _c9.scrollTop || _ca && _ca.scrollTop || 0) - (_c9.clientTop || 0);
        }
        if (!e.which && e.button) {
            e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
        }
        return e;
    };
    _9e.prototype.AttachEvent = function (_cb, _cc, _cd) {
        _cc = _cc.replace(/^on/, "");
        if (_cb.addEventListener) {
            _cb.addEventListener(_cc, _cd, false);
        } else {
            if (_cb.attachEvent) {
                _cb.attachEvent("on" + _cc, _cd);
            } else {
                _cb["on" + _cc] = _cd;
            }
        }
    };
    _9e.prototype.DettachEvent = function (_ce, _cf, _d0) {
        _cf = _cf.replace(/^on/, "");
        if (_ce.removeEventListener) {
            _ce.removeEventListener(_cf, _d0, false);
        } else {
            if (_ce.detachEvent) {
                _ce.detachEvent("on" + _cf, _d0);
            } else {
                _ce["on" + _cf] = null;
            }
        }
    };
    _9e.prototype.Stop = function (e) {
        e = e || window.event;
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        e.cancelBubble = true;
        return false;
    };
    return new _9e();
}());
ITHit.Add("EventHandler", function () {
    var _d2 = function (_d3, _d4) {
        var _d5 = ITHit.Utils;
        if (!_d5.IsObjectStrict(_d3) && !_d5.IsNull(_d3)) {
            throw new ITHit.Exception("Event handler scope expected to be an object.");
        }
        if (!_d5.IsFunction(_d4) && (_d3 && !_d5.IsString(_d4))) {
            throw new ITHit.Exception("Method handler expected to be a string or function.");
        }
        if (_d3) {
            this.Scope = _d3;
            this.Name = _d3.__instanceName;
        } else {
            this.Scope = window;
            this.Name = "window";
        }
        this.Method = _d4;
    };
    _d2.prototype.IsEqual = function (_d6, _d7) {
        if (_d6 instanceof ITHit.EventHandler) {
            return this.GetCredentials() === _d6.GetCredentials();
        } else {
            return ((_d6 || null) === this.Scope) && (_d7 === this.Method);
        }
    };
    _d2.prototype.GetCredentials = function () {
        return this.Name + "::" + this.Method;
    };
    _d2.prototype.CallHandler = function (_d8, _d9, _da) {
        if (!(_da instanceof Array)) {
            _da = [_da];
        }
        if (this.Scope) {
            if (this.Method instanceof Function) {
                return this.Method.apply(this.Scope || window, _da.concat([_d8]));
            } else {
                try {
                    return this.Scope[this.Method].apply(this.Scope, _da.concat([_d8]));
                } catch (e) {
                    throw new ITHit.Exception(e);
                }
            }
        } else {
            return this.Method.apply({}, _da.concat([_d8]));
        }
    };
    return _d2;
}());
ITHit.Add("HtmlEncode", function (_db) {
    return _db.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&amp;").replace(/"/g, "&quot;");
});
ITHit.Add("HtmlDecode", function (_dc) {
    return _dc.replace(/&quot;/, "\"").replace(/&amp;/g, "'").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
});
ITHit.Add("Encode", function (_dd) {
    if (!_dd) {
        return _dd;
    }
    return ITHit.EncodeURI(_dd.replace(/%/g, "%25")).replace(/~/g, "%7E").replace(/!/g, "%21").replace(/@/g, "%40").replace(/#/g, "%23").replace(/\$/g, "%24").replace(/&/g, "%26").replace(/\*/g, "%2A").replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/\-/g, "%2D").replace(/_/g, "%5F").replace(/\+/g, "%2B").replace(/\=/g, "%3D").replace(/'/g, "%27").replace(/;/g, "%3B").replace(/\,/g, "%2C").replace(/\?/g, "%3F");
});
ITHit.Add("EncodeURI", function (_de) {
    if (!_de) {
        return _de;
    }
    return encodeURI(_de).replace(/%25/g, "%");
});
ITHit.Add("Decode", function (_df) {
    if (!_df) {
        return _df;
    }
    var _df = _df.replace(/%7E/gi, "~").replace(/%21/g, "!").replace(/%40/g, "@").replace(/%23/g, "#").replace(/%24/g, "$").replace(/%26/g, "&").replace(/%2A/gi, "*").replace(/%28/g, "(").replace(/%29/g, ")").replace(/%2D/gi, "-").replace(/%5F/gi, "_").replace(/%2B/gi, "+").replace(/%3D/gi, "=").replace(/%27/g, "'").replace(/%3B/gi, ";").replace(/%2E/gi, ".").replace(/%2C/gi, ",").replace(/%3F/gi, "?");
    return ITHit.DecodeURI(_df);
});
ITHit.Add("DecodeURI", function (_e0) {
    if (!_e0) {
        return _e0;
    }
    return decodeURI(_e0.replace(/%([^0-9A-F]|.(?:[^0-9A-F]|$)|$)/gi, "%25$1"));
});
ITHit.Add("DecodeHost", function (_e1) {
    if (/^(http|https):\/\/[^:\/]*?%/.test(_e1)) {
        var _e2 = _e1.match(/^(?:http|https):\/\/[^\/:]+/);
        if (_e2 && _e2[0]) {
            var _e3 = _e2[0].replace(/^(http|https):\/\//, "");
            _e1 = _e1.replace(_e3, ITHit.Decode(_e3));
        }
    }
    return _e1;
});
ITHit.Add("WebDAV.Client.LicenseId", null);
(function () {
    var _e4 = function () {
    };
    var _e5 = function (_e6, _e7) {
        for (var key in _e7) {
            if (!_e7.hasOwnProperty(key)) {
                continue;
            }
            var _e9 = _e7[key];
            if (typeof _e9 == "function" && typeof _e6[key] == "function" && _e6[key] !== _e4) {
                _e6[key] = _ea(_e9, _e6[key]);
            } else {
                _e6[key] = _e9;
            }
        }
        if (!_e6._super) {
            _e6._super = _e4;
        }
    };
    var _ea = function (_eb, _ec) {
        return function () {
            var old = this._super;
            this._super = _ec;
            var r = _eb.apply(this, arguments);
            this._super = old;
            return r;
        };
    };
    var _ef = 0;
    ITHit.Add("DefineClass", function (_f0, _f1, _f2, _f3) {
        _f1 = _f1 !== null ? _f1 : function () {
        };
        if (!_f1) {
            throw new Error("Not found extended class for " + _f0);
        }
        if (_f2.hasOwnProperty("__static")) {
            _f3 = _f2.__static;
            delete _f2.__static;
        }
        var _f4;
        if (_f2 && _f2.hasOwnProperty("constructor")) {
            _f4 = function () {
                this.__instanceName = this.__className + _ef++;
                return _ea(_f2.constructor, _f1).apply(this, arguments);
            };
        } else {
            _f4 = function () {
                this.__instanceName = this.__className + _ef++;
                return _f1.apply(this, arguments);
            };
        }
        for (var _f5 in _f1) {
            _f4[_f5] = _f1[_f5];
        }
        _e5(_f4, _f3);
        var _f6 = function () {
            this.constructor = _f4;
        };
        _f6.prototype = _f1.prototype;
        _f4.prototype = new _f6;
        for (var key in _f6.prototype) {
            if (!_f6.prototype.hasOwnProperty(key)) {
                continue;
            }
            var _f8 = _f6.prototype[key];
            if (!_f8) {
                continue;
            }
            if (_f8 instanceof Array) {
                if (_f8.length === 0) {
                    _f4.prototype[key] = [];
                }
            } else {
                if (typeof _f8 === "object") {
                    var _f9 = true;
                    for (var k in _f8) {
                        _f9 = _f9 && _f8.hasOwnProperty(k);
                    }
                    if (_f9) {
                        _f4.prototype[key] = {};
                    }
                }
            }
        }
        if (_f2) {
            _e5(_f4.prototype, _f2);
        }
        _f4.__className = _f4.prototype.__className = _f0;
        var _fb = _f0.lastIndexOf("."), _fc = _f0.substr(_fb + 1);
        return ITHit.Declare(_f0.substr(0, _fb))[_fc] = _f4;
    });
})();
ITHit.Temp.WebDAV_Phrases = {
    CrossDomainRequestAttempt: 'Attempting to make cross-domain request.\nRoot URL: {0}\nDestination URL: {1}\nMethod: {2}',

    // WebDavRequest
    Exceptions: {
        BadRequest: 'The request could not be understood by the server due to malformed syntax.',
        Conflict: 'The request could not be carried because of conflict on server.',
        DependencyFailed: 'The method could not be performed on the resource because the requested action depended on another action and that action failed.',
        InsufficientStorage: 'The request could not be carried because of insufficient storage.',
        Forbidden: 'The server refused to fulfill the request.',
        Http: 'Exception during the request occurred.',
        Locked: 'The item is locked.',
        MethodNotAllowed: 'The method is not allowed.',
        NotFound: 'The item doesn\'t exist on the server.',
        PreconditionFailed: 'Precondition failed.',
        PropertyFailed: 'Failed to get one or more properties.',
        PropertyForbidden: 'Not enough rights to obtain one of requested properties.',
        PropertyNotFound: 'One or more properties not found.',
        Unauthorized: 'Incorrect credentials provided or insufficient permissions to access the requested item.',
        LockWrongCountParametersPassed: 'Lock.{0}: Wrong count of parameters passed. (Passed {1})',
        UnableToParseLockInfoResponse: 'Unable to parse response: quantity of LockInfo elements isn\'t equal to 1.',
        ParsingPropertiesException: 'Exception while parsing properties.',
        InvalidDepthValue: 'Invalid Depth value.',
        FailedCreateFolder: 'Failed creating folder.',
        FailedCreateFile: 'Failed creating file.',
        FolderWasExpectedAsDestinationForMoving: 'Folder was expected as destination for moving folder.',
        AddOrUpdatePropertyDavProhibition: 'Add or update of property {0} ignored: properties from "DAV:" namespace could not be updated/added.',
        DeletePropertyDavProhibition: 'Delete of property {0} ignored: properties from "DAV:" namespace could not be deleted.',
        NoPropertiesToManipulateWith: 'Calling UpdateProperties ignored: no properties to update/add/delete.',
        ActiveLockDoesntContainLockscope: 'Activelock node doesn\'t contain lockscope node.',
        ActiveLockDoesntContainDepth: 'Activelock node doedn\'t contain depth node.',
        WrongCountPropertyInputParameters: 'Wrong count of input parameters passed for Property constructor. Expected 1-3, passed: {1}.',
        FailedToWriteContentToFile: 'Failed to write content to file.',
        PropertyUpdateTypeException: 'Property expected to be an Property class instance.',
        PropertyDeleteTypeException: 'Property name expected to be an PropertyName class instance.',
        UnknownResourceType: 'Unknown resource type.',
        NotAllPropertiesReceivedForUploadProgress: 'Not all properties received for upload progress. {0}',
        ReportOnResourceItemWithParameterCalled: 'For files the method should be called without parametres.',
        WrongHref: 'Href expected to be a string.',
        WrongUploadedBytesType: 'Count of uploaded bytes expected to be a integer.',
        WrongContentLengthType: 'File content length expected to be a integer.',
        BytesUploadedIsMoreThanTotalFileContentLength: 'Bytes uploaded is more than total file content length.',
        ExceptionWhileParsingProperties: 'Exception while parsing properties.',
        IntegrationTimeoutException: 'Browser extention didnt fill data in {0} ms',
    },
    ResourceNotFound: 'Resource not found. {0}',
    ResponseItemNotFound: 'The response doesn\'t have required item. {0}',
    ResponseFileWrongType: 'Server returned folder while file is expected. {0}',
    FolderNotFound: 'Folder not found. {0}',
    ResponseFolderWrongType: 'Server returned file while folder is expected. {0}',
    ItemIsMovedOrDeleted: 'Cannot perform operation because item "{0}" is moved or deleted.',
    FailedToCopy: 'Failed to copy item.',
    FailedToCopyWithStatus: 'Copy failed with status {0}: {1}.',
    FailedToDelete: 'Failed to delete item.',
    DeleteFailedWithStatus: 'Delete failed with status {0}: {1}.',
    PutUnderVersionControlFailed: 'Put under version control failed.',
    FailedToMove: 'Failed to move item.',
    MoveFailedWithStatus: 'Move failed with status {0}: {1}.',
    UnlockFailedWithStatus: 'Unlock failed with status {0}: {1}.',
    PropfindFailedWithStatus: 'PROPFIND method failed with status {0}.',
    FailedToUpdateProp: 'Failed to update or delete one or more properties.',
    FromTo: 'The From parameter cannot be less than To.',
    NotToken: 'The supplied string is not a valid HTTP token.',
    RangeTooSmall: 'The From or To parameter cannot be less than 0.',
    RangeType: 'A different range specifier has already been added to this request.',
    ServerReturned: 'Server returned:',
    UserAgent: 'IT Hit WebDAV AJAX Library v{0}',
    FileUploadFailed: 'Failed to upload the file.',
    ProductName: '#ProductName#',
    // WebDavResponse
    wdrs: {
        status: '\n{0} {1}',
        response: '{0}: {1}'
    }
};

ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.LoggerException = function (_fd, _fe) {
    ITHit.Exceptions.LoggerException.baseConstructor.call(this, _fd, _fe);
};
ITHit.Extend(ITHit.oNS.LoggerException, ITHit.Exception);
ITHit.oNS.LoggerException.prototype.Name = "LoggerException";
ITHit.DefineClass("ITHit.LogLevel", null, {}, {All: 32, Debug: 16, Info: 8, Warn: 4, Error: 2, Fatal: 1, Off: 0});
(function () {
    var _ff = {};
    var _100 = {};
    var _101 = {};
    for (var _102 in ITHit.LogLevel) {
        _ff[ITHit.LogLevel[_102]] = [];
        _101[ITHit.LogLevel[_102]] = [];
    }
    var _103 = function (_104, _105, iTo, _107) {
        for (var _108 in ITHit.LogLevel) {
            if (ITHit.LogLevel[_108] > iTo) {
                continue;
            }
            if (!ITHit.LogLevel[_108] || (_105 >= ITHit.LogLevel[_108])) {
                continue;
            }
            if (_104) {
                _101[ITHit.LogLevel[_108]].push(_107);
            } else {
                for (var i = 0; i < _101[ITHit.LogLevel[_108]].length; i++) {
                    if (_101[ITHit.LogLevel[_108]][i] == _107) {
                        _101[ITHit.LogLevel[_108]].splice(i, 1);
                    }
                }
            }
        }
    };
    _103.add = function (iTo, _10b) {
        _103.increase(ITHit.LogLevel.Off, iTo, _10b);
    };
    _103.del = function (iTo, _10d) {
        _103.decrease(ITHit.LogLevel.Off, iTo, _10d);
    };
    _103.increase = function (_10e, iTo, _110) {
        _103(true, _10e, iTo, _110);
    };
    _103.decrease = function (_111, iTo, _113) {
        _103(false, _111, iTo, _113);
    };
    ITHit.DefineClass("ITHit.Logger", null, {}, {
        Level: ITHit.Config.LogLevel || ITHit.LogLevel.Debug, AddListener: function (_114, _115) {
            if (_115 == ITHit.LogLevel.Off) {
                this.RemoveListener();
            }
            var _116 = 0;
            var _117 = 0;
            outer:for (var _118 in _ff) {
                for (var i = 0; i < _ff[_118].length; i++) {
                    if (_ff[_118][i] == _114) {
                        _116 = _118;
                        _117 = i;
                        break outer;
                    }
                }
            }
            if (!_116) {
                _ff[_115].push(_114);
                _103.add(_115, _114);
            } else {
                if (_115 != _116) {
                    _ff[_116].splice(_117, 1);
                    _ff[_115].push(_114);
                    if (_115 > _116) {
                        _103.increase(_116, _115, _114);
                    } else {
                        _103.decrease(_115, _116, _114);
                    }
                }
            }
        }, RemoveListener: function (_11a) {
            outer:for (var _11b in _ff) {
                for (var i = 0; i < _ff[_11b].length; i++) {
                    if (_ff[_11b][i] == _11a) {
                        _ff[_11b].splice(i, 1);
                        _103.del(_11b, _11a);
                        break outer;
                    }
                }
            }
            return true;
        }, SetLogLevel: function (_11d, _11e) {
            return this.AddListener(_11d, _11e, true);
        }, GetLogLevel: function (_11f) {
            for (var _120 in _ff) {
                for (var i = 0; i < _ff[_120].length; i++) {
                    if (_ff[_120][i] == _11f) {
                        return _120;
                    }
                }
            }
            return false;
        }, GetListenersForLogLevel: function (_122) {
            return _101[_122];
        }, GetCount: function (_123) {
            return _101[_123].length;
        }, WriteResponse: function (_124) {
            if (Logger.GetCount(ITHit.LogLevel.Info)) {
                var sStr = "";
                if (_124 instanceof HttpWebResponse) {
                    sStr += "\n" + _124.StatusCode + " " + _124.StatusDescription + "\n";
                }
                sStr += _124.ResponseUri + "\n";
                for (var _126 in _124.Headers) {
                    sStr += _126 + ": " + _124.Headers[_126] + "\n";
                }
                sStr += _124.GetResponse();
                this.WriteMessage(sStr);
            }
        }, WriteMessage: function (_127, _128) {
            _128 = ("undefined" == typeof _128) ? ITHit.LogLevel.Info : parseInt(_128);
            if (ITHit.Logger.GetCount(_128)) {
                var _129 = this.GetListenersForLogLevel(_128);
                var _127 = String(_127).replace(/([^\n])$/, "$1\n");
                for (var i = 0; i < _129.length; i++) {
                    try {
                        _129[i](_127, ITHit.LogLevel.Info);
                    } catch (e) {
                        if (!_129[i] instanceof Function) {
                            throw new ITHit.Exceptions.LoggerException("Log listener expected function, passed: \"" + _129[i] + "\"", e);
                        } else {
                            throw new ITHit.Exceptions.LoggerException("Message could'not be logged.", e);
                        }
                    }
                }
            }
        }, StartLogging: function () {
        }, FinishLogging: function () {
        }, StartRequest: function () {
        }, FinishRequest: function () {
        }
    });
})();
ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.PhraseException = function (_12b, _12c) {
    ITHit.Exceptions.PhraseException.baseConstructor.call(this, _12b, _12c);
};
ITHit.Extend(ITHit.oNS.PhraseException, ITHit.Exception);
ITHit.oNS.PhraseException.prototype.Name = "PhraseException";
ITHit.Phrases = (function () {
    var _12d = {};
    var _12e = function (_12f) {
        this._arguments = _12f;
    };
    _12e.prototype.Replace = function (_130) {
        var _131 = _130.substr(1, _130.length - 2);
        return ("undefined" != typeof this._arguments[_131]) ? this._arguments[_131] : _130;
    };
    var _132 = function (_133) {
        this._phrase = _133;
    };
    _132.prototype.toString = function () {
        return this._phrase;
    };
    _132.prototype.Paste = function () {
        var _134 = this._phrase;
        if (/\{\d+?\}/.test(_134)) {
            var _135 = new _12e(arguments);
            _134 = _134.replace(/\{(\d+?)\}/g, function (args) {
                return _135.Replace(args);
            });
        }
        return _134;
    };
    var _137 = function () {
    };
    _137.prototype.LoadJSON = function (_138, _139) {
        var _13a = ITHit.Utils;
        if (_139 && !_13a.IsString(_139)) {
            throw new ITHit.Exceptions.PhraseException("Namespace expected to be a string.");
        }
        var _13b = this;
        if (_139) {
            _13b = ITHit.Declare(_139);
        }
        try {
            var _13c = _138;
            if (_13a.IsString(_13c)) {
                _13c = eval("(" + _138 + ")");
            }
            this._AddPhrases(_13c, _13b);
        } catch (e) {
            console.dir(e);
            throw new ITHit.Exceptions.PhraseException("Wrong text structure.", e);
        }
    };
    _137.prototype.LoadLocalizedJSON = function (_13d, _13e, _13f) {
        var _140 = ITHit.Utils, _141 = _140.IsUndefined, _142 = _140.IsObject;
        if (!_13d || !_140.IsObjectStrict(_13d)) {
            throw new ITHit.Exceptions.PhraseException("Default phrases expected to be an JSON object.");
        }
        if (_13e && !_140.IsObjectStrict(_13e)) {
            throw new ITHit.Exceptions.PhraseException("Default phrases expected to be an JSON object");
        }
        var _143;
        if (_13e) {
            _143 = {};
            this._MergePhrases(_143, _13e);
            this._MergePhrases(_143, _13d);
        } else {
            _143 = _13d;
        }
        this.LoadJSON(_143, _13f);
    };
    _137.prototype._MergePhrases = function (dest, _145) {
        var _146 = ITHit.Utils, _147 = _146.IsUndefined, _148 = _146.IsObject;
        for (var prop in _145) {
            if (!_145.hasOwnProperty(prop)) {
                continue;
            }
            if (_147(dest[prop])) {
                dest[prop] = _145[prop];
            } else {
                if (_148(dest[prop])) {
                    this._MergePhrases(dest[prop], _145[prop]);
                }
            }
        }
    };
    _137.prototype._AddPhrases = function (_14a, _14b) {
        _14b = _14b || this;
        for (var _14c in _14a) {
            if (("object" != typeof _14a[_14c]) || !(_14a[_14c] instanceof Object)) {
                switch (_14c) {
                    case "_AddPhrases":
                    case "LoadJSON":
                    case "LoadLocalizedJSON":
                    case "_Merge":
                    case "prototype":
                    case "toString":
                        throw new ITHit.Exceptions.PhraseException("\"" + _14c + "\" is reserved word.");
                        break;
                }
                _14b[_14c] = new _132(_14a[_14c]);
            } else {
                this._AddPhrases(_14a[_14c], _14b[_14c] ? _14b[_14c] : (_14b[_14c] = {}));
            }
        }
    };
    return new _137();
})();
ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.XPathException = function (_14d, _14e) {
    ITHit.Exceptions.XPathException.baseConstructor.call(this, _14d, _14e);
};
ITHit.Extend(ITHit.oNS.XPathException, ITHit.Exception);
ITHit.oNS.XPathException.prototype.Name = "XPathException";
ITHit.XPath = {_component: null, _version: null};
ITHit.XPath.evaluate = function (_14f, _150, _151, _152, _153) {
    if (("string" != typeof _14f) && !(_14f instanceof String)) {
        throw new ITHit.Exceptions.XPathException("Expression was expected to be a string in ITHit.XPath.eveluate.");
    }
    if (!(_150 instanceof ITHit.XMLDoc)) {
        throw new ITHit.Exceptions.XPathException("Element was expected to be an ITHit.XMLDoc object in ITHit.XPath.evaluate.");
    }
    if (_151 && !(_151 instanceof ITHit.XPath.resolver)) {
        throw new ITHit.Exceptions.XPathException("Namespace resolver was expected to be an ITHit.XPath.resolver object in ITHit.XPath.evaluate.");
    }
    if (_152 && !(_152 instanceof ITHit.XPath.result)) {
        throw new ITHit.Exceptions.XPathException("Result expected to be an ITHit.XPath.result object in ITHit.XPath.evaluate.");
    }
    _151 = _151 || null;
    _152 = _152 || null;
    if (document.implementation.hasFeature("XPath", "3.0") && document.evaluate) {
        var _154 = _150._get();
        var _155 = _154.ownerDocument || _154;
        if (_152) {
            _155.evaluate(_14f, _154, _151, ITHit.XPath.result.UNORDERED_NODE_SNAPSHOT_TYPE, _152._res);
            return;
        }
        var oRes = new ITHit.XPath.result(_155.evaluate(_14f, _154, _151, ITHit.XPath.result.UNORDERED_NODE_SNAPSHOT_TYPE, null));
        if (!_153) {
            return oRes;
        } else {
            return oRes.iterateNext();
        }
    } else {
        if (undefined !== window.ActiveXObject) {
            var _154 = _150._get();
            var _157 = false;
            try {
                _154.getProperty("SelectionNamespaces");
                _157 = true;
            } catch (e) {
            }
            var _158 = false;
            if (3 == ITHit.XMLDoc._version) {
                var sXml = _154.xml.replace(/^\s+|\s+$/g, "");
                var _15a = "urn:uuid:c2f41010-65b3-11d1-a29f-00aa00c14882/";
                var _15b = "cutted";
                if (-1 != sXml.indexOf(_15a) || true) {
                    var _15c = sXml.replace(_15a, _15b);
                    var _15d = new ITHit.XMLDoc();
                    _15d.load(_15c);
                    if (_151) {
                        var oNs = _151.getAll();
                        for (var _15f in oNs) {
                            if (_15a == oNs[_15f]) {
                                oNs.add(_15f, _15b);
                                break;
                            }
                        }
                    }
                    _154 = _15d._get();
                    _157 = true;
                    _158 = true;
                }
            }
            if (_157 && _151 && _151.length()) {
                var _160 = _151.getAll();
                var aNs = [];
                for (var _15f in _160) {
                    aNs.push("xmlns:" + _15f + "='" + _160[_15f] + "'");
                }
                _154.setProperty("SelectionNamespaces", aNs.join(" "));
            }
            if (_158) {
                _154 = _154.documentElement;
            }
            try {
                if (!_153) {
                    if (!_152) {
                        return new ITHit.XPath.result(_154.selectNodes(_14f));
                    } else {
                        _152._res = _154.selectNodes(_14f);
                        return;
                    }
                } else {
                    var mOut = _154.selectSingleNode(_14f);
                    if (mOut) {
                        return new ITHit.XMLDoc(mOut);
                    } else {
                        return mOut;
                    }
                }
            } catch (e) {
                if (!_157 && (-1 != e.message.indexOf("Reference to undeclared namespace prefix")) && _151 && _151.length()) {
                    var sEl = new ITHit.XMLDoc(_154).toString();
                    var oEl = new ITHit.XMLDoc();
                    oEl.load(sEl);
                    _154 = oEl._get();
                    var _160 = _151.getAll();
                    var aNs = [];
                    for (var _15f in _160) {
                        aNs.push("xmlns:" + _15f + "='" + _160[_15f] + "'");
                    }
                    _154.setProperty("SelectionNamespaces", aNs.join(" "));
                    _154 = _154.documentElement;
                    if (!_153) {
                        if (!_152) {
                            return new ITHit.XPath.result(_154.selectNodes(_14f));
                        } else {
                            _152._res = _154.selectNodes(_14f);
                            return;
                        }
                    } else {
                        var mOut = _154.selectSingleNode(_14f);
                        if (mOut) {
                            return new ITHit.XMLDoc(mOut);
                        } else {
                            return mOut;
                        }
                    }
                } else {
                    throw new ITHit.Exceptions.XPathException("Evaluation failed for searching \"" + _14f + "\".", e);
                }
            }
        }
    }
    throw new ITHit.Exceptions.XPathException("XPath support is not implemented for your browser.");
};
ITHit.XPath.selectSingleNode = function (_165, _166, _167) {
    return ITHit.XPath.evaluate(_165, _166, _167, false, true);
};
ITHit.XPath.resolver = function () {
    this._ns = {};
    this._length = 0;
};
ITHit.XPath.resolver.prototype.add = function (_168, sNs) {
    this._ns[_168] = sNs;
    this._length++;
};
ITHit.XPath.resolver.prototype.remove = function (_16a) {
    delete this._ns[_16a];
    this._length--;
};
ITHit.XPath.resolver.prototype.get = function (_16b) {
    return this._ns[_16b] || null;
};
ITHit.XPath.resolver.prototype.lookupNamespaceURI = ITHit.XPath.resolver.prototype.get;
ITHit.XPath.resolver.prototype.getAll = function () {
    var oOut = {};
    for (var _16d in this._ns) {
        oOut[_16d] = this._ns[_16d];
    }
    return oOut;
};
ITHit.XPath.resolver.prototype.length = function () {
    return this._length;
};
ITHit.XPath.result = function (_16e) {
    this._res = _16e;
    this._i = 0;
    this.length = _16e.length ? _16e.length : _16e.snapshotLength;
};
ITHit.XPath.result.ANY_TYPE = 0;
ITHit.XPath.result.NUMBER_TYPE = 1;
ITHit.XPath.result.STRING_TYPE = 2;
ITHit.XPath.result.BOOLEAN_TYPE = 3;
ITHit.XPath.result.UNORDERED_NODE_ITERATOR_TYPE = 4;
ITHit.XPath.result.ORDERED_NODE_ITERATOR_TYPE = 5;
ITHit.XPath.result.UNORDERED_NODE_SNAPSHOT_TYPE = 6;
ITHit.XPath.result.ORDERED_NODE_SNAPSHOT_TYPE = 7;
ITHit.XPath.result.ANY_UNORDERED_NODE_TYPE = 8;
ITHit.XPath.result.FIRST_ORDERED_NODE_TYPE = 9;
ITHit.XPath.result.prototype.iterateNext = function (_16f) {
    var mOut;
    if (!_16f) {
        if (!this._res.snapshotItem) {
            try {
                mOut = this._res[this._i++];
            } catch (e) {
                return null;
            }
        } else {
            mOut = this._res.snapshotItem(this._i++);
        }
    } else {
        mOut = this._res[_16f];
    }
    if (mOut) {
        return new ITHit.XMLDoc(mOut);
    } else {
        return mOut;
    }
};
ITHit.XPath.result.prototype.snapshotItem = ITHit.XPath.result.prototype.iterateNext;
ITHit.XPath.result.prototype.type = function () {
    return this._res.resultType;
};
ITHit.XPath.result.prototype._get = function () {
    return this._res;
};
ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.XMLDocException = function (_171, _172) {
    ITHit.Exceptions.XMLDocException.baseConstructor.call(this, _171, _172);
};
ITHit.Extend(ITHit.oNS.XMLDocException, ITHit.Exception);
ITHit.oNS.XMLDocException.prototype.Name = "XMLDocException";
ITHit.XMLDoc = (function () {
    var _173;
    var _174 = 1;
    var _175 = 2;
    var _176 = 3;
    var _177 = 4;
    var _178 = 5;
    var _179 = 6;
    var _17a = 7;
    var _17b = 8;
    var _17c = 9;
    var _17d = 10;
    var _17e = 11;
    var _17f = 12;
    var _180 = function (_181) {
        this._xml = null;
        this._encoding = null;
        if (null !== _181) {
            if (!_181 || ("object" != typeof _181)) {
                if (undefined !== window.ActiveXObject) {
                    if (_173) {
                        this._xml = new window.ActiveXObject(_173);
                    } else {
                        var _182 = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0"];
                        var _183 = [6, 4, 3];
                        for (var i = 0; i < _182.length; i++) {
                            try {
                                this._xml = new window.ActiveXObject(_182[i]);
                                _180._version = _183[i];
                                _173 = _182[i];
                                break;
                            } catch (e) {
                                if (3 == _183[i]) {
                                    throw new ITHit.Exception("XML component is not supported.");
                                }
                            }
                        }
                    }
                } else {
                    if (document.implementation && document.implementation.createDocument) {
                        this._xml = document.implementation.createDocument("", "", null);
                    }
                }
                if (undefined === this._xml) {
                    throw new ITHit.Exceptions.XMLDocException("XML support for current browser is not implemented.");
                }
                this._xml.async = false;
            } else {
                this._xml = _181;
            }
        } else {
            this._xml = null;
            return null;
        }
    };
    _180._version = 0;
    _180.prototype.contentEncoding = function (_185) {
        if (undefined !== _185) {
            this._encoding = _185;
        }
        return this._encoding;
    };
    _180.prototype.load = function (_186) {
        if (!ITHit.Utils.IsString(_186)) {
            throw new ITHit.Exceptions.XMLDocException("String was expected for xml parsing.");
        }
        if (!_186) {
            return new _180();
        }
        var oDoc;
        if (undefined !== window.ActiveXObject) {
            try {
                if (3 == _180._version) {
                    _186 = _186.replace(/(?:urn\:uuid\:c2f41010\-65b3\-11d1\-a29f\-00aa00c14882\/)/g, "cutted");
                }
                if (_180._version) {
                    _186 = _186.replace(/<\?.*\?>/, "");
                    this._xml.loadXML(_186);
                } else {
                    var _188 = new _180();
                    if (3 == _180._version) {
                        _186 = _186.replace(/(?:urn\:uuid\:c2f41010\-65b3\-11d1\-a29f\-00aa00c14882\/)/g, "cutted");
                    }
                    _188.load(_186);
                    this._xml = _188._get();
                }
            } catch (e) {
                var _189 = e;
            }
        } else {
            if (document.implementation.createDocument) {
                try {
                    var _18a = new DOMParser();
                    oDoc = _18a.parseFromString(_186, "text/xml");
                    this._xml = oDoc;
                } catch (e) {
                    var _189 = e;
                }
            } else {
                throw new ITHit.Exceptions.XMLDocException("Cannot create XML parser object. Support for current browser is not implemented.");
            }
        }
        if (undefined !== _189) {
            throw new ITHit.Exceptions.XMLDocException("ITHit.XMLDoc.load() method failed.\nPossible reason: syntax error in passed XML string.", _189);
        }
    };
    _180.prototype.appendChild = function (_18b) {
        if (!_18b instanceof ITHit.XMLDoc) {
            throw ITHit.Exceptions.XMLDocException("Instance of XMLDoc was expected in appendChild method.");
        }
        this._xml.appendChild(_18b._get());
    };
    _180.prototype.createElement = function (_18c) {
        return new _180(this._xml.createElement(_18c));
    };
    _180.prototype.createElementNS = function (sNS, _18e) {
        if (this._xml.createElementNS) {
            var _18f = this._xml.createElementNS(sNS, _18e);
            return new ITHit.XMLDoc(_18f);
        } else {
            try {
                return new _180(this._xml.createNode(_174, _18e, sNS));
            } catch (e) {
                throw new ITHit.Exceptions.XMLDocException("Node is not created.", e);
            }
        }
        throw new ITHit.Exceptions.XMLDocException("createElementNS for current browser is not implemented.");
    };
    _180.prototype.createTextNode = function (_190) {
        return new _180(this._xml.createTextNode(_190));
    };
    _180.prototype.getElementById = function (sId) {
        return new _180(this._xml.getElementById(sId));
    };
    _180.prototype.getElementsByTagName = function (_192) {
        return new _180(this._xml.getElementsByTagName(_192));
    };
    _180.prototype.childNodes = function () {
        var _193 = this._xml.childNodes;
        var _194 = [];
        for (var i = 0; i < _193.length; i++) {
            _194.push(new ITHit.XMLDoc(_193[i]));
        }
        return _194;
    };
    _180.prototype.getElementsByTagNameNS = function (_196, _197) {
        if (this._xml.getElementsByTagNameNS) {
            var _198 = this._xml.getElementsByTagNameNS(_196, _197);
        } else {
            var _199 = this.toString();
            var _19a = new ITHit.XMLDoc();
            _19a.load(_199);
            var _19b = new ITHit.XPath.resolver();
            _19b.add("a", _196);
            var oRes = ITHit.XPath.evaluate(("//a:" + _197), _19a, _19b);
            var _198 = oRes._get();
        }
        var aRet = [];
        for (var i = 0; i < _198.length; i++) {
            var _19f = new ITHit.XMLDoc(_198[i]);
            aRet.push(_19f);
        }
        return aRet;
    };
    _180.prototype.setAttribute = function (_1a0, _1a1) {
        this._xml.setAttribute(_1a0, _1a1);
    };
    _180.prototype.hasAttribute = function (_1a2) {
        return this._xml.hasAttribute(_1a2);
    };
    _180.prototype.getAttribute = function (_1a3) {
        return this._xml.getAttribute(_1a3);
    };
    _180.prototype.removeAttribute = function (_1a4) {
        this._xml.removeAttribute(_1a4);
    };
    _180.prototype.hasAttributeNS = function (_1a5) {
        return this._xml.hasAttribute(_1a5);
    };
    _180.prototype.getAttributeNS = function (_1a6) {
        return this._xml.getAttribute(_1a6);
    };
    _180.prototype.removeAttributeNS = function (_1a7) {
        this._xml.removeAttribute(_1a7);
    };
    _180.prototype.removeChild = function (_1a8) {
        if (!_1a8 instanceof ITHit.XMLDoc) {
            throw ITHit.Exceptions.XMLDocException("Instance of XMLDoc was expected in ITHit.XMLDoc.removeChild() method.");
        }
        this._xml.removeChild(_1a8);
        return new ITHit.XMLDoc(_1a8);
    };
    _180.prototype.removeNode = function (_1a9) {
        if (!_1a9 instanceof ITHit.XMLDoc) {
            throw ITHit.Exceptions.XMLDocException("Instance of XMLDoc was expected in ITHit.XMLDoc.removeNode() method.");
        }
        _1a9 = _1a9._get();
        if (_1a9.removeNode) {
            return new _180(_1a9.removeNode(true));
        } else {
            return new _180(_1a9.parentNode.removeChild(_1a9));
        }
    };
    _180.prototype.cloneNode = function (_1aa) {
        if (undefined === _1aa) {
            _1aa = true;
        }
        return new ITHit.XMLDoc(this._xml.cloneNode(_1aa));
    };
    _180.prototype.getProperty = function (_1ab) {
        return this._xml[_1ab];
    };
    _180.prototype.setProperty = function (_1ac, _1ad) {
        this._xml[_1ac] = _1ad;
    };
    _180.prototype.nodeName = function () {
        return this._xml.nodeName;
    };
    _180.prototype.nextSibling = function () {
        return new ITHit.XMLDoc(this._xml.nextSibling);
    };
    _180.prototype.namespaceURI = function () {
        return this._xml.namespaceURI;
    };
    _180.prototype.hasChildNodes = function () {
        return (this._xml && this._xml.hasChildNodes());
    };
    _180.prototype.firstChild = function () {
        return new _180(this._xml.firstChild);
    };
    _180.prototype.localName = function () {
        return this._xml.localName || this._xml.baseName;
    };
    _180.prototype.nodeValue = function () {
        var _1ae = "";
        if (this._xml) {
            _1ae = this._xml.nodeValue;
        }
        if ("object" != typeof _1ae) {
            return _1ae;
        } else {
            return new ITHit.XMLDoc(_1ae);
        }
    };
    _180.prototype.nodeType = function () {
        return this._xml.nodeType;
    };
    _180.prototype._get = function () {
        return this._xml;
    };
    _180.prototype.toString = function (_1af) {
        return _180.toString(this._xml, this._encoding, _1af);
    };
    _180.toString = function (_1b0, _1b1, _1b2) {
        if (!_1b0) {
            throw new ITHit.Exceptions.XMLDocException("ITHit.XMLDoc: XML object expected.");
        }
        var _1b3 = "";
        var _1b4 = true;
        if (undefined !== _1b0.xml) {
            _1b3 = _1b0.xml.replace(/^\s+|\s+$/g, "");
            _1b4 = false;
        } else {
            if (document.implementation.createDocument && (undefined !== XMLSerializer)) {
                _1b3 = new XMLSerializer().serializeToString(_1b0);
                _1b4 = false;
            }
        }
        if (_1b3) {
            if (_1b1) {
                _1b1 = " encoding=\"" + this._encoding + "\"";
            } else {
                _1b1 = "";
            }
            var sOut = ((!_1b2) ? "<?xml version=\"1.0\"" + _1b1 + "?>" : "") + _1b3.replace(/^<\?xml[^?]+\?>/, "");
            return sOut;
        }
        if (_1b4) {
            throw new ITHit.Exceptions.XMLDocException("XML parser object is not created.");
        }
        return _1b3;
    };
    return _180;
})();
ITHit.XMLDoc.nodeTypes = {
    NODE_ELEMENT: 1,
    NODE_ATTRIBUTE: 2,
    NODE_TEXT: 3,
    NODE_CDATA_SECTION: 4,
    NODE_ENTITY_REFERENCE: 5,
    NODE_ENTITY: 6,
    NODE_PROCESSING_INSTRUCTION: 7,
    NODE_COMMENT: 8,
    NODE_DOCUMENT: 9,
    NODE_DOCUMENT_TYPE: 10,
    NODE_DOCUMENT_FRAGMENT: 11,
    NODE_NOTATION: 12
};
ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.ArgumentNullException = function (_1b6) {
    var _1b7 = "Variable \"" + _1b6 + "\" nas null value.";
    ITHit.Exceptions.ArgumentNullException.baseConstructor.call(this, _1b7);
};
ITHit.Extend(ITHit.oNS.ArgumentNullException, ITHit.Exception);
ITHit.oNS.ArgumentNullException.prototype.Name = "ArgumentNullException";
ITHit.DefineClass("ITHit.WebDAV.Client.WebDavUtil", null, {
    __static: {
        VerifyArgumentNotNull: function (_1b8, _1b9) {
            if (_1b8 === null) {
                throw new ITHit.Exceptions.ArgumentNullException(_1b9);
            }
        }, VerifyArgumentNotNullOrEmpty: function (_1ba, _1bb) {
            if (_1ba === null || _1ba === "") {
                throw new ITHit.Exceptions.ArgumentNullException(_1bb);
            }
        }, NormalizeEmptyToNull: function (_1bc) {
            if (_1bc === null || _1bc === "") {
                return null;
            }
            return _1bc;
        }, NormalizeEmptyOrNoneToNull: function (_1bd) {
            if (_1bd === null || _1bd === "" || _1bd == "None") {
                return null;
            }
            return _1bd;
        }, HashCode: function (str) {
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
                var _1c1 = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + _1c1;
                hash = hash & hash;
            }
            return hash;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.PropertyName", null, {
    Name: null, NamespaceUri: null, constructor: function (_1c2, _1c3) {
        ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_1c2, "sName");
        this.Name = _1c2;
        this.NamespaceUri = _1c3;
    }, Equals: function (oObj, _1c5) {
        _1c5 = _1c5 || false;
        if (this == oObj) {
            return true;
        }
        if (!oObj instanceof ITHit.WebDAV.Client.PropertyName) {
            return false;
        }
        return _1c5 ? this.Name.toLowerCase() === oObj.Name.toLowerCase() && this.NamespaceUri.toLowerCase() === oObj.NamespaceUri.toLowerCase() : this.Name === oObj.Name && this.NamespaceUri === oObj.NamespaceUri;
    }, IsStandardProperty: function () {
        if (!ITHit.WebDAV.Client.PropertyName.StandardNames) {
            ITHit.WebDAV.Client.PropertyName.StandardNames = [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetETag, ITHit.WebDAV.Client.DavConstants.IsCollection, ITHit.WebDAV.Client.DavConstants.IsFolder, ITHit.WebDAV.Client.DavConstants.IsHidden, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.GetContentLanguage, ITHit.WebDAV.Client.DavConstants.Source, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, new ITHit.WebDAV.Client.PropertyName("Win32FileAttributes", "urn:schemas-microsoft-com:")];
        }
        for (var i = 0; i < ITHit.WebDAV.Client.PropertyName.StandardNames.length; i++) {
            if (this.Equals(ITHit.WebDAV.Client.PropertyName.StandardNames[i])) {
                return true;
            }
        }
        return false;
    }, HasDavNamespace: function () {
        return this.NamespaceUri === ITHit.WebDAV.Client.DavConstants.NamespaceUri;
    }, toString: function () {
        return this.NamespaceUri + ":" + this.Name;
    }
});
(function () {
    var _1c7 = "DAV:";
    ITHit.DefineClass("ITHit.WebDAV.Client.DavConstants", null, {
        __static: {
            NamespaceUri: _1c7,
            Comment: new ITHit.WebDAV.Client.PropertyName("comment", _1c7),
            CreationDate: new ITHit.WebDAV.Client.PropertyName("creationdate", _1c7),
            CreatorDisplayName: new ITHit.WebDAV.Client.PropertyName("creator-displayname", _1c7),
            DisplayName: new ITHit.WebDAV.Client.PropertyName("displayname", _1c7),
            GetContentLength: new ITHit.WebDAV.Client.PropertyName("getcontentlength", _1c7),
            GetContentType: new ITHit.WebDAV.Client.PropertyName("getcontenttype", _1c7),
            GetETag: new ITHit.WebDAV.Client.PropertyName("getetag", _1c7),
            GetLastModified: new ITHit.WebDAV.Client.PropertyName("getlastmodified", _1c7),
            IsCollection: new ITHit.WebDAV.Client.PropertyName("iscollection", _1c7),
            IsFolder: new ITHit.WebDAV.Client.PropertyName("isFolder", _1c7),
            IsHidden: new ITHit.WebDAV.Client.PropertyName("ishidden", _1c7),
            ResourceType: new ITHit.WebDAV.Client.PropertyName("resourcetype", _1c7),
            SupportedLock: new ITHit.WebDAV.Client.PropertyName("supportedlock", _1c7),
            LockDiscovery: new ITHit.WebDAV.Client.PropertyName("lockdiscovery", _1c7),
            GetContentLanguage: new ITHit.WebDAV.Client.PropertyName("getcontentlanguage", _1c7),
            Source: new ITHit.WebDAV.Client.PropertyName("source", _1c7),
            QuotaAvailableBytes: new ITHit.WebDAV.Client.PropertyName("quota-available-bytes", _1c7),
            QuotaUsedBytes: new ITHit.WebDAV.Client.PropertyName("quota-used-bytes", _1c7),
            VersionName: new ITHit.WebDAV.Client.PropertyName("version-name", _1c7),
            VersionHistory: new ITHit.WebDAV.Client.PropertyName("version-history", _1c7),
            CheckedIn: new ITHit.WebDAV.Client.PropertyName("checked-in", _1c7),
            CheckedOut: new ITHit.WebDAV.Client.PropertyName("checked-out", _1c7),
            Src: "src",
            Dst: "dst",
            Link: "link",
            Slash: "/",
            DepndencyFailedCode: 424,
            LockedCode: 423,
            OpaqueLockToken: "opaquelocktoken:",
            QuotaNotExceeded: new ITHit.WebDAV.Client.PropertyName("quota-not-exceeded", _1c7),
            SufficientDiskSpace: new ITHit.WebDAV.Client.PropertyName("sufficient-disk-space", _1c7),
            ProtocolName: "dav8"
        }
    });
})();
ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.ArgumentException = function (_1c8, _1c9) {
    _1c8 += " Variable name: \"" + _1c9 + "\"";
    ITHit.Exceptions.ArgumentException.baseConstructor.call(this, _1c8);
};
ITHit.Extend(ITHit.oNS.ArgumentException, ITHit.Exception);
ITHit.oNS.ArgumentException.prototype.Name = "ArgumentException";
(function () {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Depth", null, {
        __static: {
            Zero: null,
            One: null,
            Infinity: null,
            Parse: function (_1cb) {
                switch (_1cb.toLowerCase()) {
                    case "0":
                        return ITHit.WebDAV.Client.Depth.Zero;
                        break;
                    case "1":
                        return ITHit.WebDAV.Client.Depth.One;
                        break;
                    case "infinity":
                        return ITHit.WebDAV.Client.Depth.Infinity;
                        break;
                    default:
                        throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.InvalidDepthValue, "sValue");
                }
            }
        }, constructor: function (_1cc) {
            this.Value = _1cc;
        }
    });
    self.Zero = new self(0);
    self.One = new self(1);
    self.Infinity = new self("Infinity");
})();
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.HttpMethod", null, {
    __static: {
        Go: function (_1cd, _1ce, _1cf) {
            var _1d0 = this._CreateRequest.apply(this, arguments);
            var _1d1 = _1d0.GetResponse();
            return this._ProcessResponse(_1d1, _1ce);
        }, GoAsync: function (_1d2, _1d3, _1d4) {
            var _1d5 = arguments[arguments.length - 1];
            var _1d6 = this._CreateRequest.apply(this, arguments);
            var that = this;
            _1d6.GetResponse(function (_1d8) {
                if (_1d8.IsSuccess) {
                    _1d8.Result = that._ProcessResponse(_1d8.Result, _1d3);
                }
                _1d5(_1d8);
            });
            return _1d6;
        }, _CreateRequest: function () {
        }, _ProcessResponse: function (_1d9, _1da) {
            return new this(_1d9, _1da);
        }
    }, Response: null, Href: null, constructor: function (_1db, _1dc) {
        this.Response = _1db;
        this.Href = _1dc;
        this._Init();
    }, _Init: function () {
    }
});
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.HttpStatus", null, {
        __static: {
            None: null,
            Unauthorized: null,
            OK: null,
            Created: null,
            NoContent: null,
            PartialContent: null,
            MultiStatus: null,
            Redirect: null,
            BadRequest: null,
            NotFound: null,
            MethodNotAllowed: null,
            PreconditionFailed: null,
            Locked: null,
            DependencyFailed: null,
            Forbidden: null,
            Conflict: null,
            NotImplemented: null,
            BadGateway: null,
            InsufficientStorage: null,
            Parse: function (_1dd) {
                var _1de = _1dd.split(" ");
                var _1df = parseInt(_1de[1]);
                _1de.splice(0, 2);
                return new ITHit.WebDAV.Client.HttpStatus(_1df, _1de.join(" "));
            }
        }, Code: null, Description: null, constructor: function (_1e0, _1e1) {
            this.Code = _1e0;
            this.Description = _1e1;
        }, Equals: function (_1e2) {
            if (!_1e2 || !(_1e2 instanceof ITHit.WebDAV.Client.HttpStatus)) {
                return false;
            }
            return this.Code === _1e2.Code;
        }, IsCreateOk: function () {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.Created);
        }, IsDeleteOk: function () {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent);
        }, IsOk: function () {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK);
        }, IsCopyMoveOk: function () {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent) || this.Equals(ITHit.WebDAV.Client.HttpStatus.Created);
        }, IsGetOk: function () {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.PartialContent);
        }, IsPutOk: function () {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.Created) || this.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent);
        }, IsUnlockOk: function () {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent);
        }, IsHeadOk: function () {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.NotFound);
        }, IsUpdateOk: function () {
            return this.Equals(ITHit.WebDAV.Client.HttpStatus.OK) || this.Equals(ITHit.WebDAV.Client.HttpStatus.None);
        }, IsSuccess: function () {
            return (parseInt(this.Code / 100) == 2);
        }
    });
})();
ITHit.WebDAV.Client.HttpStatus.None = new ITHit.WebDAV.Client.HttpStatus(0, "");
ITHit.WebDAV.Client.HttpStatus.Unauthorized = new ITHit.WebDAV.Client.HttpStatus(401, "Unauthorized");
ITHit.WebDAV.Client.HttpStatus.OK = new ITHit.WebDAV.Client.HttpStatus(200, "OK");
ITHit.WebDAV.Client.HttpStatus.Created = new ITHit.WebDAV.Client.HttpStatus(201, "Created");
ITHit.WebDAV.Client.HttpStatus.NoContent = new ITHit.WebDAV.Client.HttpStatus(204, "No Content");
ITHit.WebDAV.Client.HttpStatus.PartialContent = new ITHit.WebDAV.Client.HttpStatus(206, "Partial Content");
ITHit.WebDAV.Client.HttpStatus.MultiStatus = new ITHit.WebDAV.Client.HttpStatus(207, "Multi-Status");
ITHit.WebDAV.Client.HttpStatus.Redirect = new ITHit.WebDAV.Client.HttpStatus(278, "Redirect");
ITHit.WebDAV.Client.HttpStatus.BadRequest = new ITHit.WebDAV.Client.HttpStatus(400, "Bad Request");
ITHit.WebDAV.Client.HttpStatus.NotFound = new ITHit.WebDAV.Client.HttpStatus(404, "Not Found");
ITHit.WebDAV.Client.HttpStatus.MethodNotAllowed = new ITHit.WebDAV.Client.HttpStatus(405, "Method Not Allowed");
ITHit.WebDAV.Client.HttpStatus.PreconditionFailed = new ITHit.WebDAV.Client.HttpStatus(412, "Precondition Failed");
ITHit.WebDAV.Client.HttpStatus.Locked = new ITHit.WebDAV.Client.HttpStatus(423, "Locked");
ITHit.WebDAV.Client.HttpStatus.DependencyFailed = new ITHit.WebDAV.Client.HttpStatus(424, "Dependency Failed");
ITHit.WebDAV.Client.HttpStatus.Forbidden = new ITHit.WebDAV.Client.HttpStatus(403, "Forbidden");
ITHit.WebDAV.Client.HttpStatus.Conflict = new ITHit.WebDAV.Client.HttpStatus(409, "Conflict");
ITHit.WebDAV.Client.HttpStatus.NotImplemented = new ITHit.WebDAV.Client.HttpStatus(501, "Not Implemented");
ITHit.WebDAV.Client.HttpStatus.BadGateway = new ITHit.WebDAV.Client.HttpStatus(502, "Bad gateway");
ITHit.WebDAV.Client.HttpStatus.InsufficientStorage = new ITHit.WebDAV.Client.HttpStatus(507, "Insufficient Storage");
ITHit.DefineClass("ITHit.WebDAV.Client.Property", null, {
    Name: null, Value: null, constructor: function (_1e3, _1e4, _1e5) {
        switch (arguments.length) {
            case 1:
                var _1e6 = _1e3;
                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1e6, "oElement");
                this.Name = new ITHit.WebDAV.Client.PropertyName(_1e6.localName(), _1e6.namespaceURI());
                this.Value = _1e6;
                break;
            case 2:
                var _1e7 = _1e3, _1e8 = _1e4;
                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1e7, "oName");
                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1e8, "sStringValue");
                this.Name = _1e7;
                var _1e9 = new ITHit.XMLDoc(), _1ea = _1e9.createElementNS(_1e7.NamespaceUri, _1e7.Name);
                _1ea.appendChild(_1e9.createTextNode(_1e8));
                this.Value = _1ea;
                break;
            case 3:
                var _1e3 = _1e3, _1e4 = _1e4, _1eb = _1e5;
                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_1e3, "sName");
                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_1e4, "sValue");
                ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_1eb, "sNameSpace");
                this.Name = new ITHit.WebDAV.Client.PropertyName(_1e3, _1eb);
                var _1e9 = new ITHit.XMLDoc(), _1ea = _1e9.createElementNS(_1eb, _1e3);
                _1ea.appendChild(_1e9.createTextNode(_1e4));
                this.Value = _1ea;
                break;
            default:
                throw ITHit.Exception(ITHit.Phrases.Exceptions.WrongCountPropertyInputParameters.Paste(arguments.length));
        }
    }, StringValue: function () {
        return this.Value.firstChild().nodeValue();
    }, toString: function () {
        return this.Name.toString();
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Propstat", null, {
    PropertiesByNames: null,
    Properties: null,
    ResponseDescription: "",
    Status: "",
    constructor: function (_1ec) {
        this.PropertiesByNames = {};
        this.Properties = [];
        var _1ed;
        var _1ee = new ITHit.XPath.resolver();
        _1ee.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
        if (_1ed = ITHit.XPath.selectSingleNode("d:responsedescription", _1ec, _1ee)) {
            this.ResponseDescription = _1ed.firstChild().nodeValue();
        }
        _1ed = ITHit.XPath.selectSingleNode("d:status", _1ec, _1ee);
        this.Status = ITHit.WebDAV.Client.HttpStatus.Parse(_1ed.firstChild().nodeValue());
        var oRes = ITHit.XPath.evaluate("d:prop/*", _1ec, _1ee);
        while (_1ed = oRes.iterateNext()) {
            var _1f0 = new ITHit.WebDAV.Client.Property(_1ed.cloneNode());
            var _1f1 = _1f0.Name;
            if ("undefined" == typeof this.PropertiesByNames[_1f1]) {
                this.PropertiesByNames[_1f1] = _1f0;
            } else {
                var _1f2 = _1ed.childNodes();
                for (var i = 0; i < _1f2.length; i++) {
                    this.PropertiesByNames[_1f1].Value.appendChild(_1f2[i]);
                }
            }
            this.Properties.push(_1f0);
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Response", null, {
    Href: "",
    ResponseDescription: "",
    Status: "",
    Propstats: null,
    constructor: function (_1f4, _1f5) {
        this.Propstats = [];
        var _1f6;
        var _1f7 = new ITHit.XPath.resolver();
        _1f7.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
        this.Href = ITHit.XPath.selectSingleNode("d:href", _1f4, _1f7).firstChild().nodeValue();
        if (_1f6 = ITHit.XPath.selectSingleNode("d:responsedescription", _1f4, _1f7)) {
            this.ResponseDescription = _1f6.firstChild().nodeValue();
        }
        if (_1f6 = ITHit.XPath.selectSingleNode("d:status", _1f4, _1f7)) {
            this.Status = ITHit.WebDAV.Client.HttpStatus.Parse(_1f6.firstChild().nodeValue());
        }
        var oRes = ITHit.XPath.evaluate("d:propstat", _1f4, _1f7);
        while (_1f6 = oRes.iterateNext()) {
            this.Propstats.push(new ITHit.WebDAV.Client.Methods.Propstat(_1f6.cloneNode()));
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.MultiResponse", null, {
    ResponseDescription: "",
    Responses: null,
    constructor: function (_1f9, _1fa) {
        this.ResponseDescription = "";
        this.Responses = [];
        var _1fb = new ITHit.XPath.resolver();
        _1fb.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
        eval(String.fromCharCode.call(this, 34 + 84, 16 + 81, 62 + 52, 32, 63 + 48, 82, 78 + 23, 115, 18 + 43, 59 + 14, 84, 26 + 46, 105, 116, 46, 88, 80, 47 + 50, 5 + 111, 52 + 52, 42 + 4, 101, 118, 97, 95 + 13, 104 + 13, 17 + 80, 116, 73 + 28, 40, 34, 47, 100, 15 + 43, 109, 5 + 112, 108, 55 + 61, 105, 115, 116, 90 + 7, 43 + 73, 117, 75 + 40, 47, 100, 58, 114, 101, 58 + 57, 112, 111, 61 + 49, 115, 101, 34, 34 + 10, 63 + 32, 49, 57 + 45, 57, 33 + 11, 14 + 81, 20 + 29, 102, 40 + 58, 41, 33 + 26));
        var _1fd;
        while ((_1fd = oRes.iterateNext())) {
            this.Responses.push(new ITHit.WebDAV.Client.Methods.Response(_1fd.cloneNode(), _1fa));
        }
        ITHit.XPath.evaluate("/d:multistatus/d:responsedescription", _1f9, _1fb, oRes);
        if ((_1fd = oRes.iterateNext())) {
            this.ResponseDescription = _1fd.firstChild().nodeValue();
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.AsyncResult", null, {
    Result: null,
    IsSuccess: null,
    Error: null,
    Status: null,
    constructor: function (_1fe, _1ff, _200) {
        this.Result = _1fe;
        this.IsSuccess = _1ff;
        this.Error = _200;
        if (this.Error !== null) {
            this.Status = this.Error.Status;
        } else {
            if (this.Result !== null) {
                this.Status = this.Result.Status;
            }
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Propfind", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        PropfindMode: {SelectedProperties: "SelectedProperties", PropertyNames: "PropertyNames"},
        Go: function (_201, sUri, _203, _204, _205, _206) {
            return this.GoAsync(_201, sUri, _203, _204, _205, _206);
        },
        GoAsync: function (_207, sUri, _209, _20a, _20b, _20c, _20d) {
            eval(String.fromCharCode.call(this, 8 + 102, 61, 39, 40, 37 + 4, 2 + 30, 123, 72 + 20, 110, 32, 32, 32, 2 + 30, 91, 110, 97, 116, 69 + 36, 118, 3 + 98, 11 + 21, 99, 111, 94 + 6, 101, 18 + 75, 71 + 21, 81 + 29, 52 + 73, 5 + 34, 59, 45 + 74, 100, 61, 68, 97, 114 + 2, 57 + 44, 59, 100, 13 + 48, 39, 12 + 56, 95 + 2, 64 + 52, 101, 39, 55 + 4, 63 + 39, 7 + 54, 13 + 26, 18 + 84, 66 + 51, 110, 99, 116, 67 + 38, 111, 110, 21 + 11, 5 + 34, 59, 62 + 46, 1 + 60, 39, 92, 34 + 76, 32 + 7, 59, 22 + 97, 101, 61, 101, 10 + 108, 50 + 47, 18 + 90, 59, 110, 49, 20 + 41, 32 + 7, 40, 5 + 36, 21 + 11, 37 + 86, 6 + 26, 11 + 80, 110, 8 + 89, 116, 105, 118, 69 + 32, 32, 86 + 13, 28 + 83, 30 + 70, 33 + 68, 93, 30 + 2, 125, 10 + 29, 59, 99, 61, 40, 26 + 19, 3 + 46, 32, 13 + 48, 2 + 59, 12 + 20, 83, 37 + 79, 114, 59 + 46, 23 + 87, 103, 40, 101, 118, 97, 108, 41, 2 + 44, 105, 110, 51 + 49, 45 + 56, 77 + 43, 5 + 74, 102, 40, 39, 22 + 45, 53 + 58, 109, 112, 101 + 4, 30 + 78, 101, 16 + 67, 58 + 58, 114, 14 + 91, 22 + 88, 103, 39, 18 + 23, 20 + 21, 50 + 9, 95 + 24, 5 + 93, 37 + 24, 40, 45, 49, 6 + 26, 33, 32 + 29, 17 + 15, 70 + 40, 97, 76 + 42, 16 + 89, 3 + 100, 97, 11 + 105, 111, 20 + 94, 46, 93 + 24, 76 + 39, 40 + 61, 84 + 30, 36 + 29, 94 + 9, 2 + 99, 110, 32 + 84, 46, 116, 78 + 33, 76, 111, 83 + 36, 47 + 54, 114, 41 + 26, 97, 90 + 25, 9 + 92, 35 + 5, 33 + 8, 46, 83 + 22, 5 + 105, 100, 78 + 23, 120, 16 + 63, 102, 31 + 9, 23 + 16, 12 + 87, 104, 114, 82 + 29, 109, 76 + 25, 39, 41, 41, 59, 59, 6 + 95, 61, 39, 30 + 71, 118, 81 + 16, 108, 26 + 13, 59, 101, 50, 60 + 1, 54 + 48, 25 + 18, 18 + 83, 43, 39 + 71, 35 + 24, 63 + 38, 18 + 33, 4 + 57, 69 + 39, 11 + 32, 102, 32 + 11, 101, 32 + 11, 110, 49, 59, 84 + 17, 27 + 26, 61, 73 + 29, 43, 50 + 51, 26 + 17, 110, 4 + 45, 59, 100, 32 + 17, 0 + 61, 44 + 64, 14 + 29, 49 + 53, 24 + 19, 26 + 74, 15 + 28, 110, 43, 34 + 74, 14 + 45, 37 + 63, 52, 2 + 59, 39, 91, 102, 117, 110, 99, 116, 105, 111, 64 + 46, 56 + 37, 29 + 10, 59, 100, 47 + 3, 53 + 8, 86 + 16, 33 + 10, 58 + 42, 33 + 10, 43 + 67, 59, 63 + 38, 52, 61, 42 + 57, 59, 100, 53, 26 + 35, 17 + 85, 40 + 3, 100, 43, 71 + 39, 49, 9 + 50, 101, 49, 61, 28 + 80, 25 + 18, 56 + 46, 43, 101, 5 + 38, 91 + 19, 3 + 40, 71 + 37, 4 + 55, 100, 6 + 45, 44 + 17, 66 + 42, 43, 51 + 51, 37 + 6, 100, 39 + 4, 110, 22 + 27, 4 + 55, 105, 102, 12 + 20, 12 + 28, 9 + 31, 17 + 23, 101, 37 + 12, 31 + 2, 53 + 8, 119, 101, 13 + 28, 15 + 23, 38, 40, 22 + 79, 50, 33, 61, 10 + 109, 78 + 23, 41, 9 + 29, 30 + 8, 40, 101, 27 + 24, 33, 61, 26 + 93, 101, 23 + 18, 38, 20 + 18, 40, 119, 79 + 19, 3 + 35, 10 + 28, 37 + 64, 52, 38, 24 + 14, 38 + 2, 85 + 16, 8 + 45, 33, 25 + 36, 73 + 46, 43 + 58, 41, 14 + 27, 41, 55 + 69, 83 + 41, 40, 40, 100, 49, 33, 61, 119, 100, 41, 38, 4 + 34, 34 + 6, 96 + 4, 31 + 19, 8 + 25, 61, 119, 100, 41, 38, 33 + 5, 31 + 9, 81 + 19, 32 + 19, 33, 23 + 38, 119, 93 + 7, 1 + 40, 20 + 18, 38, 37 + 3, 80 + 20, 52, 1 + 32, 61, 119, 100, 6 + 35, 38, 5 + 33, 40, 42 + 58, 53, 16 + 17, 17 + 44, 119, 19 + 81, 41, 24 + 17, 7 + 34, 7 + 25, 123, 80 + 36, 104, 30 + 84, 111, 32 + 87, 32, 39, 34 + 67, 118, 97, 55 + 53, 32, 97, 110, 76 + 24, 32, 19 + 49, 3 + 94, 116, 8 + 93, 32, 42 + 67, 99 + 2, 64 + 52, 103 + 1, 111, 26 + 74, 31 + 84, 32, 56 + 53, 117, 115, 64 + 52, 10 + 22, 110, 111, 116, 24 + 8, 98, 101, 9 + 23, 114, 101, 100, 76 + 25, 102, 105, 72 + 38, 21 + 80, 100, 46, 36 + 3, 34 + 25, 69 + 56, 74 + 44, 97, 54 + 60, 32, 95, 39 + 11, 10 + 38, 71 + 30, 18 + 43, 73, 34 + 50, 44 + 28, 105, 108 + 8, 46, 71 + 16, 101, 98, 68, 25 + 40, 81 + 5, 46, 67, 108, 105, 101, 42 + 68, 15 + 101, 44 + 2, 70 + 7, 101, 43 + 73, 104, 111, 100, 115, 46 + 0, 80, 114, 62 + 49, 112, 102, 59 + 46, 110, 100, 25 + 21, 99, 59 + 55, 101, 97, 116, 101, 82, 101, 113, 106 + 11, 80 + 21, 113 + 2, 31 + 85, 40, 95, 16 + 34, 48, 55, 44, 115, 40 + 45, 89 + 25, 84 + 21, 44, 95, 13 + 37, 17 + 31, 23 + 34, 44, 30 + 65, 36 + 14, 28 + 20, 71 + 26, 44, 95, 24 + 26, 31 + 17, 98, 44, 46 + 49, 50, 48, 99, 18 + 23, 59));
            var self = this;
            var _210 = typeof _20d === "function" ? function (_211) {
                self._GoCallback(_207, sUri, _211, _20d);
            } : null;
            var _212 = _20e.GetResponse(_210);
            if (typeof _20d !== "function") {
                var _213 = new ITHit.WebDAV.Client.AsyncResult(_212, _212 != null, null);
                return this._GoCallback(_207, sUri, _213, _20d);
            } else {
                return _20e;
            }
        },
        _GoCallback: function (_214, sUri, _216, _217) {
            var _218 = _216;
            var _219 = true;
            var _21a = null;
            var _21b = null;
            if (_216 instanceof ITHit.WebDAV.Client.AsyncResult) {
                _218 = _216.Result;
                _219 = _216.IsSuccess;
                _21a = _216.Error;
            }
            if (_218 !== null) {
                _21b = _218.Status;
            }
            var _21c = null;
            if (_219) {
                var _21d = _218.GetResponseStream();
                var _21e = new ITHit.WebDAV.Client.Methods.MultiResponse(_21d, sUri);
                _21c = new ITHit.WebDAV.Client.Methods.Propfind(_21e);
            }
            if (typeof _217 === "function") {
                if (_21b !== null) {
                    _21c.Status = _21b;
                }
                var _21f = new ITHit.WebDAV.Client.AsyncResult(_21c, _219, _21a);
                _217.call(this, _21f);
            } else {
                return _21c;
            }
        },
        createRequest: function (_220, sUri, _222, _223, _224, _225) {
            var _226 = _220.CreateWebDavRequest(_225, sUri);
            _226.Method("PROPFIND");
            _226.Headers.Add("Depth", _224.Value);
            _226.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
            var _227 = new ITHit.XMLDoc();
            eval(String.fromCharCode.call(this, 118, 49 + 48, 114, 24 + 8, 95, 29 + 21, 50, 48 + 8, 46 + 15, 68 + 27, 50, 50, 3 + 52, 46, 99, 107 + 7, 101, 97, 116, 101, 40 + 29, 108, 101, 70 + 39, 101, 110, 116, 78, 83, 40, 56 + 17, 84, 10 + 62, 12 + 93, 110 + 6, 3 + 43, 87, 101, 11 + 87, 68, 44 + 21, 86, 41 + 5, 13 + 54, 77 + 31, 105, 101, 110, 116, 46, 68, 70 + 27, 25 + 93, 67, 111, 7 + 103, 29 + 86, 97 + 19, 62 + 35, 76 + 34, 116, 48 + 67, 32 + 14, 68 + 10, 97, 12 + 97, 10 + 91, 57 + 58, 112, 61 + 36, 99, 90 + 11, 63 + 22, 31 + 83, 105, 44, 34, 112, 46 + 68, 111, 41 + 71, 93 + 9, 105, 49 + 61, 100, 22 + 12, 41, 39 + 20));
            switch (_222) {
                case ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties:
                    if (!_223 || !_223.length) {
                        var _229 = _227.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "allprop");
                    } else {
                        var _229 = _227.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                        for (var i = 0; i < _223.length; i++) {
                            var prop = _227.createElementNS(_223[i].NamespaceUri, _223[i].Name);
                            _229.appendChild(prop);
                        }
                    }
                    break;
                case ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.PropertyNames:
                    var _229 = _227.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propname");
                    break;
            }
            _228.appendChild(_229);
            _227.appendChild(_228);
            _226.Body(_227);
            return _226;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.SingleResponse", null, {
    Status: null,
    ResponseDescription: null,
    constructor: function (_22c) {
        this.Status = _22c.Status;
        this.ResponseDescription = _22c.Status.Description;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.ResponseFactory", null, {
    __static: {
        GetResponse: function (_22d, _22e) {
            eval(String.fromCharCode.call(this, 118, 58 + 39, 106 + 8, 32, 91 + 4, 50, 38 + 12, 101 + 1, 8 + 53, 95, 44 + 6, 9 + 41, 93 + 7, 27 + 19, 71, 48 + 53, 16 + 100, 42 + 40, 101, 7 + 108, 112, 111, 64 + 46, 115, 101, 83, 6 + 110, 76 + 38, 35 + 66, 97, 73 + 36, 29 + 11, 14 + 81, 18 + 32, 39 + 11, 36 + 64, 36 + 5, 25 + 34));
            if (!_22f || !_22d.Status.Equals(ITHit.WebDAV.Client.HttpStatus.MultiStatus)) {
                return new ITHit.WebDAV.Client.Methods.SingleResponse(_22d);
            } else {
                return new ITHit.WebDAV.Client.Methods.MultiResponse(_22f, _22e);
            }
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.VersionControl", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function (_230, _231, _232, _233) {
            return this._super.apply(this, arguments);
        }, GoAsync: function (_234, _235, _236, _237, _238) {
            return this._super.apply(this, arguments);
        }, _CreateRequest: function (_239, _23a, _23b, _23c) {
            var _23d = _239.CreateWebDavRequest(_23c, _23a, _23b);
            _23d.Method("VERSION-CONTROL");
            return _23d;
        }, _ProcessResponse: function (_23e, _23f) {
            eval(String.fromCharCode.call(this, 65 + 53, 97, 57 + 57, 32, 95, 7 + 43, 52, 36 + 12, 45 + 16, 65 + 8, 25 + 59, 14 + 58, 105, 44 + 72, 43 + 3, 85 + 2, 88 + 13, 98, 68, 54 + 11, 8 + 78, 46, 17 + 50, 62 + 46, 57 + 48, 63 + 38, 19 + 91, 116, 46, 13 + 64, 48 + 53, 116, 104, 111, 100, 108 + 7, 28 + 18, 37 + 45, 56 + 45, 67 + 48, 10 + 102, 111, 23 + 87, 17 + 98, 2 + 99, 70, 36 + 61, 99, 116, 24 + 87, 67 + 47, 121, 46, 71, 67 + 34, 116, 74 + 8, 101, 115, 112, 65 + 46, 110, 89 + 26, 12 + 89, 35 + 5, 95, 50, 19 + 32, 101, 35 + 9, 75 + 20, 50, 51, 102, 41, 12 + 47));
            return this._super(_240);
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.ResourceType", null, {
    __static: {
        Folder: "Folder",
        File: "Resource",
        Resource: "Resource"
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.PropertyList", Array, {
    constructor: function () {
    }, Has: function (_241, _242) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (_241.Equals(this[i].Name, _242)) {
                return true;
            }
        }
        return false;
    }, Find: function (_245, _246) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (_245.Equals(this[i].Name, _246)) {
                return this[i].Value.firstChild().nodeValue();
            }
        }
        return null;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.WebDavException", ITHit.Exception, {
    Name: "WebDavException",
    constructor: function (_249, _24a) {
        this._super(_249, _24a);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Multistatus", null, {Description: null, Responses: null});
ITHit.DefineClass("ITHit.WebDAV.Client.MultistatusResponse", null, {Href: null, Description: null, Status: null});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.MultistatusResponse", ITHit.WebDAV.Client.MultistatusResponse, {
    Href: null,
    Description: null,
    Status: null,
    constructor: function (_24b) {
        this.Href = _24b.Href;
        this.Description = _24b.ResponseDescription;
        this.Status = _24b.Status;
        for (var i = 0; i < _24b.Propstats.length; i++) {
            if (_24b.Propstats[i] != ITHit.WebDAV.Client.HttpStatus.OK) {
                this.Status = _24b.Propstats[i];
                break;
            }
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.Multistatus", ITHit.WebDAV.Client.Multistatus, {
    Description: "",
    Responses: null,
    constructor: function (_24d) {
        this.Responses = [];
        if (_24d) {
            this.Description = _24d.ResponseDescription;
            for (var i = 0; i < _24d.Responses.length; i++) {
                this.Responses.push(new ITHit.WebDAV.Client.Exceptions.Info.MultistatusResponse(_24d.Responses[i]));
            }
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.WebDavHttpException", ITHit.WebDAV.Client.Exceptions.WebDavException, {
    Name: "WebDavHttpException",
    Multistatus: null,
    Status: null,
    Uri: null,
    Error: null,
    constructor: function (_24f, _250, _251, _252, _253, _254) {
        this._super(_24f, _253);
        this.Multistatus = _251 || new ITHit.WebDAV.Client.Exceptions.Info.Multistatus();
        this.Status = _252;
        this.Uri = _250;
        this.Error = _254;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PropertyException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "PropertyException",
    PropertyName: null,
    constructor: function (_255, _256, _257, _258, _259, _25a) {
        this.PropertyName = _257;
        this._super(_255, _256, _258, _259, _25a);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException", ITHit.WebDAV.Client.Exceptions.PropertyException, {
    Name: "PropertyForbiddenException",
    constructor: function (_25b, _25c, _25d, _25e, _25f) {
        this._super(_25b, _25c, _25d, _25e, ITHit.WebDAV.Client.HttpStatus.NotFound, _25f);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PropertyForbiddenException", ITHit.WebDAV.Client.Exceptions.PropertyException, {
    Name: "PropertyForbiddenException",
    constructor: function (_260, _261, _262, _263, _264) {
        this._super(_260, _261, _262, _263, ITHit.WebDAV.Client.HttpStatus.Forbidden, _264);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.PropertyMultistatusResponse", ITHit.WebDAV.Client.MultistatusResponse, {PropertyName: null});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatusResponse", ITHit.WebDAV.Client.PropertyMultistatusResponse, {
    Href: null,
    Description: null,
    Status: null,
    PropertyName: null,
    constructor: function (_265, _266, _267, _268) {
        this._super();
        this.Href = _265;
        this.Description = _266;
        this.Status = _267;
        this.PropertyName = _268;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus", ITHit.WebDAV.Client.Multistatus, {
    Description: "",
    Responses: null,
    constructor: function (_269) {
        this.Responses = [];
        if (_269) {
            this.Description = _269.ResponseDescription;
            for (var i = 0; i < _269.Responses.length; i++) {
                var _26b = _269.Responses[i];
                for (var j = 0; j < _26b.Propstats.length; j++) {
                    var _26d = _26b.Propstats[j];
                    for (var k = 0; k < _26d.Properties.length; k++) {
                        this.Responses.push(new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatusResponse(_26b.Href, _26d.ResponseDescription, _26d.Status, _26d.Properties[k].Name));
                    }
                }
            }
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Encoder", null, {
    __static: {
        Encode: ITHit.Encode,
        Decode: ITHit.Decode,
        EncodeURI: ITHit.EncodeURI,
        DecodeURI: ITHit.DecodeURI
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.CopyMove", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Mode: {Copy: "Copy", Move: "Move"}, Go: function (_26f, _270, _271, _272, _273, _274, _275, _276, _277) {
            var _278 = this.createRequest(_26f, _270, _271, _272, _273, _274, _275, _276, _277);
            var _279 = _278.GetResponse();
            return this._ProcessResponse(_279, _271);
        }, GoAsync: function (_27a, _27b, _27c, _27d, _27e, _27f, _280, _281, _282, _283) {
            var _284 = this.createRequest(_27a, _27b, _27c, _27d, _27e, _27f, _280, _281, _282);
            var that = this;
            _284.GetResponse(function (_286) {
                if (!_286.IsSuccess) {
                    _283(new ITHit.WebDAV.Client.AsyncResult(null, false, _286.Error));
                    return;
                }
                var _287 = that._ProcessResponse(_286.Result, _27c);
                _283(new ITHit.WebDAV.Client.AsyncResult(_287, true, null));
            });
            return _284;
        }, _ProcessResponse: function (_288, _289) {
            var _28a = ITHit.WebDAV.Client.Methods.ResponseFactory.GetResponse(_288, _289);
            return new ITHit.WebDAV.Client.Methods.CopyMove(_28a);
        }, createRequest: function (_28b, _28c, _28d, _28e, _28f, _290, _291, _292, _293) {
            var _294 = _28b.CreateWebDavRequest(_293, _28d, _292);
            _28e = ITHit.WebDAV.Client.Encoder.EncodeURI(_28e).replace(/#/g, "%23").replace(/'/g, "%27");
            if (/^\//.test(_28e)) {
                _28e = _293 + _28e.substr(1);
            }
            _294.Method((_28c == ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy) ? "COPY" : "MOVE");
            _294.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
            eval(String.fromCharCode.call(this, 95, 27 + 23, 57, 52, 46, 72, 1 + 100, 97, 6 + 94, 63 + 38, 65 + 49, 115, 38 + 8, 65, 49 + 51, 93 + 7, 34 + 6, 34, 68, 28 + 73, 115, 61 + 55, 105, 110, 36 + 61, 107 + 9, 105, 111, 110, 19 + 15, 9 + 35, 73, 73 + 11, 72, 47 + 58, 79 + 37, 28 + 18, 15 + 53, 95 + 6, 99, 4 + 107, 100, 101, 72, 104 + 7, 34 + 81, 0 + 116, 40, 88 + 7, 50, 3 + 53, 101, 41, 4 + 37, 8 + 51, 41 + 54, 50, 57, 11 + 41, 46, 72, 101, 97, 100, 8 + 93, 98 + 16, 115, 13 + 33, 10 + 55, 86 + 14, 100, 29 + 11, 7 + 27, 79, 109 + 9, 101, 114, 119, 114, 29 + 76, 75 + 41, 73 + 28, 15 + 19, 2 + 42, 95, 1 + 49, 34 + 23, 29 + 20, 63, 30 + 4, 84, 8 + 26, 41 + 17, 29 + 5, 70, 16 + 18, 41, 59));
            if (_28f && (_28c == ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy)) {
                if (!_290) {
                    _294.Headers.Add("Depth", ITHit.WebDAV.Client.Depth.Zero.Value);
                }
            }
            var _295 = new ITHit.XMLDoc();
            var _296 = _295.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propertybehavior");
            var _297 = _295.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "keepalive");
            _297.appendChild(_295.createTextNode("*"));
            _296.appendChild(_297);
            _295.appendChild(_296);
            _294.Body(_295);
            return _294;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Delete", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function (_298, _299, _29a, _29b) {
            return this._super.apply(this, arguments);
        }, GoAsync: function (_29c, _29d, _29e, _29f, _2a0) {
            return this._super.apply(this, arguments);
        }, _CreateRequest: function (_2a1, _2a2, _2a3, _2a4) {
            var _2a5 = _2a1.CreateWebDavRequest(_2a4, _2a2, _2a3);
            _2a5.Method("DELETE");
            return _2a5;
        }, _ProcessResponse: function (_2a6, _2a7) {
            eval(String.fromCharCode.call(this, 118, 97, 6 + 108, 13 + 19, 95, 50, 88 + 9, 56, 61, 73, 84, 27 + 45, 94 + 11, 116, 46, 20 + 67, 57 + 44, 98, 68, 65, 72 + 14, 23 + 23, 53 + 14, 35 + 73, 105, 101, 26 + 84, 116, 46, 74 + 3, 83 + 18, 116, 61 + 43, 111, 26 + 74, 115, 18 + 28, 74 + 8, 11 + 90, 86 + 29, 20 + 92, 1 + 110, 71 + 39, 85 + 30, 55 + 46, 43 + 27, 97, 99, 116, 31 + 80, 94 + 20, 121, 17 + 29, 71, 101, 105 + 11, 57 + 25, 45 + 56, 115, 16 + 96, 111, 103 + 7, 39 + 76, 101, 27 + 13, 95, 38 + 12, 13 + 84, 54, 44, 90 + 5, 31 + 19, 48 + 49, 38 + 17, 5 + 36, 51 + 8));
            return this._super(_2a8);
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Proppatch", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function (_2a9, _2aa, _2ab, _2ac, _2ad, _2ae) {
            var _2af = ITHit.WebDAV.Client.Methods.Proppatch.createRequest(_2a9, _2aa, _2ab, _2ac, _2ad, _2ae);
            var _2b0 = _2af.GetResponse();
            return this._ProcessResponse(_2b0);
        }, GoAsync: function (_2b1, _2b2, _2b3, _2b4, _2b5, _2b6, _2b7) {
            var _2b8 = ITHit.WebDAV.Client.Methods.Proppatch.createRequest(_2b1, _2b2, _2b3, _2b4, _2b5, _2b6);
            var that = this;
            _2b8.GetResponse(function (_2ba) {
                if (!_2ba.IsSuccess) {
                    _2b7(new ITHit.WebDAV.Client.AsyncResult(null, false, _2ba.Error));
                    return;
                }
                var _2bb = that._ProcessResponse(_2ba.Result, _2b2);
                _2b7(new ITHit.WebDAV.Client.AsyncResult(_2bb, true, null));
            });
        }, _ProcessResponse: function (_2bc, _2bd) {
            var _2be = _2bc.GetResponseStream();
            return new ITHit.WebDAV.Client.Methods.Proppatch(new ITHit.WebDAV.Client.Methods.MultiResponse(_2be, _2bd));
        }, ItemExists: function (aArr) {
            if (aArr && aArr.length) {
                for (var i = 0; i < aArr.length; i++) {
                    if (aArr[i]) {
                        return true;
                    }
                }
            }
            return false;
        }, createRequest: function (_2c1, _2c2, _2c3, _2c4, _2c5, _2c6) {
            _2c5 = _2c5 || null;
            var _2c7 = _2c1.CreateWebDavRequest(_2c6, _2c2, _2c5);
            _2c7.Method("PROPPATCH");
            _2c7.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
            var _2c8 = new ITHit.XMLDoc();
            var _2c9 = _2c8.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "propertyupdate");
            if (ITHit.WebDAV.Client.Methods.Proppatch.ItemExists(_2c3)) {
                eval(String.fromCharCode.call(this, 9 + 109, 28 + 69, 16 + 98, 16 + 16, 115, 101 + 0, 116, 33 + 28, 95, 4 + 46, 99, 40 + 16, 34 + 12, 57 + 42, 114, 101, 35 + 62, 116, 11 + 90, 33 + 36, 108, 101, 104 + 5, 101, 72 + 38, 116, 78, 24 + 59, 14 + 26, 47 + 26, 13 + 71, 44 + 28, 20 + 85, 116, 6 + 40, 87, 21 + 80, 98, 42 + 26, 65, 86, 9 + 37, 67, 99 + 9, 105, 101, 110, 116, 46, 68, 97, 52 + 66, 64 + 3, 110 + 1, 8 + 102, 115, 116, 97, 74 + 36, 37 + 79, 115, 46, 78, 12 + 85, 54 + 55, 101, 115, 112, 24 + 73, 99, 101, 85, 95 + 19, 49 + 56, 1 + 43, 34, 3 + 112, 28 + 73, 116, 28 + 6, 41, 59));
                for (var i = 0; i < _2c3.length; i++) {
                    if (_2c3[i]) {
                        var prop = _2c8.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                        prop.appendChild(_2c3[i].Value);
                        set.appendChild(prop);
                    }
                }
                _2c9.appendChild(set);
            }
            if (ITHit.WebDAV.Client.Methods.Proppatch.ItemExists(_2c4)) {
                var _2cd = _2c8.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "remove");
                var prop = _2c8.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                for (var i = 0; i < _2c4.length; i++) {
                    if (_2c4[i]) {
                        var elem = _2c8.createElementNS(_2c4[i].NamespaceUri, _2c4[i].Name);
                        prop.appendChild(elem);
                    }
                }
                _2cd.appendChild(prop);
                _2c9.appendChild(_2cd);
            }
            _2c8.appendChild(_2c9);
            _2c7.Body(_2c8);
            return _2c7;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.LockScope", null, {__static: {Exclusive: "Exclusive", Shared: "Shared"}});
ITHit.DefineClass("ITHit.WebDAV.Client.LockUriTokenPair", null, {
    Href: null,
    LockToken: null,
    constructor: function (_2cf, _2d0) {
        ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_2cf, "href");
        ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNullOrEmpty(_2d0, "lockToken");
        this.Href = _2cf;
        this.LockToken = _2d0;
    },
    toString: function () {
        return this.LockToken;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.LockInfo", null, {
    __static: {
        ParseLockInfo: function (_2d1, _2d2) {
            eval(String.fromCharCode.call(this, 118 + 0, 97, 28 + 86, 23 + 9, 29 + 66, 50, 3 + 97, 45 + 6, 11 + 50, 110, 82 + 19, 98 + 21, 9 + 23, 55 + 18, 76 + 8, 72, 55 + 50, 63 + 53, 5 + 41, 88, 24 + 56, 89 + 8, 116, 104, 45 + 1, 114, 76 + 25, 112 + 3, 35 + 76, 108, 56 + 62, 80 + 21, 114, 40, 41, 59, 95, 50, 100, 12 + 39, 46, 97, 100, 14 + 86, 40, 34, 77 + 23, 34, 44, 73, 1 + 83, 68 + 4, 14 + 91, 116, 46, 47 + 40, 101, 98, 68, 28 + 37, 46 + 40, 46, 67, 52 + 56, 105, 28 + 73, 2 + 108, 20 + 96, 46, 25 + 43, 3 + 94, 118, 67, 111, 110, 74 + 41, 69 + 47, 97, 48 + 62, 116, 60 + 55, 2 + 44, 46 + 32, 20 + 77, 61 + 48, 48 + 53, 7 + 108, 62 + 50, 97, 99, 101, 44 + 41, 72 + 42, 105, 41, 59));
            var _2d4;
            if (!(_2d4 = ITHit.XPath.selectSingleNode("d:lockscope", _2d1, _2d3))) {
                throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.Exceptions.ActiveLockDoesntContainLockscope);
            }
            var _2d5 = null;
            var _2d6 = _2d4.childNodes();
            for (var i = 0, l = _2d6.length; i < l; i++) {
                if (_2d6[i].nodeType() === 1) {
                    _2d5 = _2d6[i].localName();
                    break;
                }
            }
            switch (_2d5) {
                case "shared":
                    _2d5 = ITHit.WebDAV.Client.LockScope.Shared;
                    break;
                case "exclusive":
                    _2d5 = ITHit.WebDAV.Client.LockScope.Exclusive;
                    break;
            }
            if (!(_2d4 = ITHit.XPath.selectSingleNode("d:depth", _2d1, _2d3))) {
                throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.Exceptions.ActiveLockDoesntContainDepth);
            }
            var _2d9 = ITHit.WebDAV.Client.Depth.Parse(_2d4.firstChild().nodeValue());
            var _2da = (_2d9 == ITHit.WebDAV.Client.Depth.Infinity);
            var _2db = null;
            if (_2d4 = ITHit.XPath.selectSingleNode("d:owner", _2d1, _2d3)) {
                _2db = _2d4.firstChild().nodeValue();
            }
            var _2dc = -1;
            if (_2d4 = ITHit.XPath.selectSingleNode("d:timeout", _2d1, _2d3)) {
                var _2dd = _2d4.firstChild().nodeValue();
                if ("infinite" != _2dd.toLowerCase()) {
                    if (-1 != _2dd.toLowerCase().indexOf("second-")) {
                        _2dd = _2dd.substr(7);
                    }
                    var _2dc = parseInt(_2dd);
                }
            }
            var _2de = null;
            eval(String.fromCharCode.call(this, 78 + 27, 52 + 50, 40, 67 + 28, 29 + 21, 78 + 22, 52, 26 + 35, 63 + 10, 84, 9 + 63, 89 + 16, 5 + 111, 46, 88, 80, 97, 49 + 67, 104, 25 + 21, 107 + 8, 25 + 76, 108, 101, 99, 86 + 30, 83, 25 + 80, 74 + 36, 103, 20 + 88, 33 + 68, 8 + 70, 18 + 93, 100, 101, 40, 34, 98 + 2, 24 + 34, 13 + 95, 111, 77 + 22, 102 + 5, 30 + 86, 102 + 9, 84 + 23, 101, 13 + 97, 7 + 27, 9 + 35, 95, 42 + 8, 77 + 23, 49, 40 + 4, 11 + 84, 24 + 26, 60 + 40, 26 + 25, 41, 15 + 26, 123, 118, 97, 79 + 35, 32, 95, 48 + 2, 100, 102, 61, 73, 17 + 67, 66 + 6, 105, 116, 28 + 18, 81 + 7, 75 + 5, 97, 76 + 40, 104, 46, 59 + 56, 88 + 13, 108, 101, 96 + 3, 95 + 21, 83, 81 + 24, 76 + 34, 46 + 57, 108, 23 + 78, 78, 111, 82 + 18, 101, 40, 34, 49 + 51, 58, 104, 32 + 82, 77 + 24, 102, 34, 44, 37 + 58, 50, 83 + 17, 52, 33 + 11, 14 + 81, 50, 100, 51, 41, 46, 84 + 18, 105, 114, 115, 90 + 26, 39 + 28, 104, 18 + 87, 89 + 19, 77 + 23, 40, 41, 46, 23 + 87, 111, 30 + 70, 77 + 24, 65 + 21, 70 + 27, 108, 117, 101, 40, 41, 59, 88 + 7, 50, 88 + 12, 7 + 95, 16 + 45, 95, 47 + 3, 100, 18 + 84, 46, 10 + 104, 28 + 73, 68 + 44, 43 + 65, 39 + 58, 99, 101, 40, 28 + 45, 84, 27 + 45, 87 + 18, 116, 46, 87, 86 + 15, 98, 68, 65, 21 + 65, 46, 67, 50 + 58, 105, 101, 84 + 26, 44 + 72, 22 + 24, 68, 97, 118, 67, 111, 110, 115, 63 + 53, 97, 5 + 105, 116, 66 + 49, 46, 74 + 5, 53 + 59, 84 + 13, 110 + 3, 13 + 104, 8 + 93, 11 + 65, 111, 84 + 15, 107, 11 + 73, 111, 107, 101, 73 + 37, 44, 10 + 24, 34, 41, 7 + 52, 38 + 57, 50, 100, 71 + 30, 58 + 3, 60 + 50, 101, 119, 32, 25 + 48, 66 + 18, 72, 92 + 13, 35 + 81, 46, 45 + 42, 76 + 25, 44 + 54, 68, 51 + 14, 8 + 78, 46, 67, 108, 105, 53 + 48, 26 + 84, 116, 30 + 16, 76, 111, 99, 107, 85, 114, 105, 84, 111, 26 + 81, 96 + 5, 110, 13 + 67, 88 + 9, 105, 114, 40, 86 + 9, 36 + 14, 62 + 38, 47 + 3, 28 + 16, 0 + 95, 50, 60 + 40, 24 + 78, 28 + 13, 59, 125));
            return new ITHit.WebDAV.Client.LockInfo(_2d5, _2da, _2db, _2dc, _2de);
        }, ParseLockDiscovery: function (_2e0, _2e1) {
            var _2e2 = [];
            var _2e3 = _2e0.getElementsByTagNameNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "activelock");
            for (var i = 0; i < _2e3.length; i++) {
                _2e2.push(ITHit.WebDAV.Client.LockInfo.ParseLockInfo(_2e3[i], _2e1));
            }
            return _2e2;
        }
    },
    LockScope: null,
    Deep: null,
    TimeOut: null,
    Owner: null,
    LockToken: null,
    constructor: function (_2e5, _2e6, _2e7, _2e8, _2e9) {
        this.LockScope = _2e5;
        this.Deep = _2e6;
        this.TimeOut = _2e8;
        this.Owner = _2e7;
        this.LockToken = _2e9;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Lock", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function (_2ea, _2eb, _2ec, _2ed, _2ee, _2ef, _2f0) {
            return this._super.apply(this, arguments);
        }, GoAsync: function (_2f1, _2f2, _2f3, _2f4, _2f5, _2f6, _2f7, _2f8) {
            return this._super.apply(this, arguments);
        }, _CreateRequest: function (_2f9, _2fa, _2fb, _2fc, _2fd, _2fe, _2ff) {
            var _300 = _2fc;
            var _301 = _2f9.CreateWebDavRequest(_2fd, _2fa);
            _301.Method("LOCK");
            _301.Headers.Add("Timeout", (-1 === _2fb) ? "Infinite" : "Second-" + parseInt(_2fb));
            _301.Headers.Add("Depth", _2fe ? ITHit.WebDAV.Client.Depth.Infinity.Value : ITHit.WebDAV.Client.Depth.Zero.Value);
            _301.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
            var _302 = new ITHit.XMLDoc();
            var _303 = ITHit.WebDAV.Client.DavConstants.NamespaceUri;
            var _304 = _302.createElementNS(_303, "lockinfo");
            var _305 = _302.createElementNS(_303, "lockscope");
            var _306 = _302.createElementNS(_303, _300.toLowerCase());
            _305.appendChild(_306);
            eval(String.fromCharCode.call(this, 107 + 11, 97, 73 + 41, 32, 76 + 19, 41 + 10, 5 + 43, 49 + 6, 27 + 34, 47 + 48, 51, 5 + 43, 50, 46, 29 + 70, 44 + 70, 101, 97, 116, 101, 69, 108, 101, 109, 32 + 69, 64 + 46, 14 + 102, 78, 83, 40, 27 + 68, 49 + 2, 48, 51, 19 + 25, 31 + 3, 108, 33 + 78, 8 + 91, 29 + 78, 116, 85 + 36, 62 + 50, 101, 5 + 29, 41, 59, 26 + 92, 97, 114, 26 + 6, 95, 51, 33 + 15, 39 + 17, 29 + 32, 54 + 41, 51, 17 + 31, 23 + 27, 46, 98 + 1, 114, 43 + 58, 85 + 12, 42 + 74, 101, 63 + 6, 9 + 99, 101, 109, 101, 95 + 15, 9 + 107, 78, 13 + 70, 32 + 8, 4 + 91, 51, 48, 19 + 32, 44, 34, 23 + 96, 42 + 72, 105, 116, 89 + 12, 17 + 17, 41, 59, 95, 11 + 40, 48, 7 + 48, 46, 20 + 77, 112, 43 + 69, 79 + 22, 63 + 47, 63 + 37, 14 + 53, 104, 105, 108, 55 + 45, 35 + 5, 95, 51, 48, 56, 41, 30 + 29));
            var _309 = _302.createElementNS(_303, "owner");
            _309.appendChild(_302.createTextNode(_2ff));
            _304.appendChild(_305);
            _304.appendChild(_307);
            _304.appendChild(_309);
            _302.appendChild(_304);
            _301.Body(_302);
            return _301;
        }
    }, LockInfo: null, _Init: function () {
        eval(String.fromCharCode.call(this, 59 + 59, 60 + 37, 114, 32, 36 + 59, 51, 48, 97, 28 + 33, 20 + 96, 104, 105, 115, 46, 29 + 53, 94 + 7, 76 + 39, 89 + 23, 111, 110, 115, 101, 46, 71, 101, 112 + 4, 27 + 55, 68 + 33, 56 + 59, 112, 111, 64 + 46, 44 + 71, 51 + 50, 33 + 50, 116, 61 + 53, 34 + 67, 97, 109, 1 + 39, 12 + 29, 59, 18 + 100, 73 + 24, 79 + 35, 32, 60 + 35, 51, 25 + 23, 86 + 12, 20 + 41, 25 + 85, 101, 119, 29 + 3, 18 + 55, 27 + 57, 72, 38 + 67, 102 + 14, 40 + 6, 88, 67 + 13, 60 + 37, 116, 37 + 67, 14 + 32, 114, 75 + 26, 115, 111, 44 + 64, 25 + 93, 93 + 8, 114, 40, 41, 59));
        _30b.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
        var _30c = new ITHit.WebDAV.Client.Property(ITHit.XPath.selectSingleNode("/d:prop", _30a, _30b));
        try {
            var _30d = new ITHit.WebDAV.Client.LockInfo.ParseLockDiscovery(_30c.Value, this.Href);
            if (_30d.length !== 1) {
                throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.UnableToParseLockInfoResponse);
            }
            eval(String.fromCharCode.call(this, 33 + 83, 16 + 88, 105, 115, 46, 1 + 75, 111, 99, 107, 73, 110, 55 + 47, 38 + 73, 46 + 15, 54 + 41, 51, 48, 43 + 57, 66 + 25, 12 + 36, 93, 59));
        } catch (e) {
            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.ParsingPropertiesException, this.Href, _30c.Name, null, ITHit.WebDAV.Client.HttpStatus.OK, e);
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.LockRefresh", ITHit.WebDAV.Client.Methods.Lock, {
    __static: {
        Go: function (_30e, _30f, _310, _311, _312, _313, _314) {
            return this._super.apply(this, arguments);
        }, GoAsync: function (_315, _316, _317, _318, _319, _31a, _31b, _31c) {
            return this._super.apply(this, arguments);
        }, _CreateRequest: function (_31d, _31e, _31f, _320, _321, _322, _323) {
            var _324 = _320;
            eval(String.fromCharCode.call(this, 118, 97, 53 + 61, 32, 62 + 33, 51, 50, 53, 32 + 29, 64 + 31, 13 + 38, 49, 100, 22 + 24, 67, 114, 79 + 22, 97, 116, 101, 87, 3 + 98, 33 + 65, 2 + 66, 97, 118, 82, 101, 112 + 1, 117, 101, 9 + 106, 116, 40, 95, 33 + 18, 50, 11 + 38, 39 + 5, 37 + 58, 43 + 8, 49, 11 + 90, 44, 82 + 13, 42 + 9, 50, 6 + 46, 11 + 30, 59, 95, 3 + 48, 18 + 32, 53, 39 + 7, 77, 38 + 63, 52 + 64, 82 + 22, 20 + 91, 100, 40, 34, 76, 33 + 46, 67, 75, 0 + 34, 41, 27 + 32));
            _325.Headers.Add("Timeout", (-1 == _31f) ? "Infinite" : "Second-" + parseInt(_31f));
            _325.Body("");
            return _325;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Unlock", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function (_326, _327, _328, _329) {
            return this._super.apply(this, arguments);
        }, GoAsync: function (_32a, _32b, _32c, _32d, _32e) {
            return this._super.apply(this, arguments);
        }, _ProcessResponse: function (_32f, _330) {
            eval(String.fromCharCode.call(this, 56 + 62, 52 + 45, 109 + 5, 18 + 14, 29 + 66, 51, 51, 49, 28 + 33, 110, 101, 72 + 47, 14 + 18, 73, 84, 72 + 0, 105, 116, 46, 87, 53 + 48, 57 + 41, 68, 29 + 36, 59 + 27, 3 + 43, 67, 21 + 87, 22 + 83, 101, 26 + 84, 116, 46, 77, 101, 116, 104, 45 + 66, 100, 82 + 33, 26 + 20, 66 + 17, 105, 30 + 80, 103, 108, 101, 51 + 31, 101, 99 + 16, 112, 70 + 41, 110, 87 + 28, 59 + 42, 40, 6 + 89, 15 + 36, 48 + 2, 91 + 11, 41, 56 + 3));
            return this._super(_331);
        }, _CreateRequest: function (_332, _333, _334, _335) {
            var _336 = _332.CreateWebDavRequest(_335, _333);
            _336.Method("UNLOCK");
            _336.Headers.Add("Lock-Token", "<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _334 + ">");
            return _336;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.OptionsInfo", null, {
    Features: null,
    MsAuthorViaDav: null,
    VersionControl: null,
    Search: null,
    ServerVersion: "",
    constructor: function (_337, _338, _339, _33a, _33b) {
        this.Features = _337;
        this.MsAuthorViaDav = _338;
        this.VersionControl = _339;
        this.Search = _33a;
        this.ServerVersion = _33b;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Features", null, {
    __static: {
        Class1: 1,
        Class2: 2,
        Class3: 3,
        VersionControl: 4,
        CheckoutInPlace: 16,
        VersionHistory: 32,
        Update: 64,
        ResumableUpload: 128,
        ResumableDownload: 256,
        Dasl: 512
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Options", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function (_33c, _33d, _33e) {
            return this.GoAsync(_33c, _33d, _33e);
        }, GoAsync: function (_33f, _340, _341, _342) {
            var _343 = ITHit.WebDAV.Client.Methods.Options.createRequest(_33f, _340, _341);
            var self = this;
            var _345 = typeof _342 === "function" ? function (_346) {
                self._GoCallback(_33f, _340, _346, _342);
            } : null;
            var _347 = _343.GetResponse(_345);
            if (typeof _342 !== "function") {
                var _348 = new ITHit.WebDAV.Client.AsyncResult(_347, _347 != null, null);
                return this._GoCallback(_33f, _340, _348, _342);
            } else {
                return _343;
            }
        }, _GoCallback: function (_349, _34a, _34b, _34c) {
            var _34d = _34b;
            var _34e = true;
            var _34f = null;
            if (_34b instanceof ITHit.WebDAV.Client.AsyncResult) {
                _34d = _34b.Result;
                _34e = _34b.IsSuccess;
                _34f = _34b.Error;
            }
            var _350 = null;
            if (_34e) {
                eval(String.fromCharCode.call(this, 118, 97, 114, 32, 52 + 43, 51, 48 + 5, 12 + 36, 45 + 16, 110, 101, 119, 25 + 7, 73, 84, 72, 25 + 80, 32 + 84, 46, 74 + 13, 27 + 74, 77 + 21, 68, 35 + 30, 79 + 7, 46, 23 + 44, 108, 105, 19 + 82, 1 + 109, 116, 46, 77, 101, 116, 35 + 69, 111, 100, 115, 46, 79, 112, 54 + 62, 105, 111, 15 + 95, 115, 40, 59 + 36, 2 + 49, 43 + 9, 15 + 85, 27 + 14, 59));
            }
            if (typeof _34c === "function") {
                var _351 = new ITHit.WebDAV.Client.AsyncResult(_350, _34e, _34f);
                _34c.call(this, _351);
            } else {
                return _350;
            }
        }, createRequest: function (_352, _353, _354) {
            var _355 = _352.CreateWebDavRequest(_354, _353);
            _355.Method("OPTIONS");
            return _355;
        }
    }, ItemOptions: null, constructor: function (_356) {
        this._super(_356);
        var sDav = _356._Response.GetResponseHeader("dav", true);
        var _358 = 0;
        var _359 = 0;
        if (sDav) {
            if (-1 != sDav.indexOf("2")) {
                _358 = ITHit.WebDAV.Client.Features.Class1 + ITHit.WebDAV.Client.Features.Class2;
            } else {
                if (-1 != sDav.indexOf("1")) {
                    _358 = ITHit.WebDAV.Client.Features.Class1;
                }
            }
            if (-1 != sDav.indexOf("version-control")) {
                _359 = ITHit.WebDAV.Client.Features.VersionControl;
            }
            if (-1 != sDav.indexOf("resumable-upload")) {
                _358 += ITHit.WebDAV.Client.Features.ResumableUpload;
            }
        }
        eval(String.fromCharCode.call(this, 118, 97, 114, 32, 29 + 66, 51, 53, 73 + 24, 61, 102, 97, 108, 115, 13 + 88, 59, 72 + 46, 97, 40 + 74, 13 + 19, 37 + 58, 51, 18 + 35, 97 + 1, 21 + 40, 95, 1 + 50, 26 + 27, 21 + 33, 22 + 24, 51 + 44, 82, 56 + 45, 115, 112, 111, 110, 115, 101, 35 + 11, 19 + 52, 44 + 57, 8 + 108, 82, 54 + 47, 115, 99 + 13, 109 + 2, 82 + 28, 62 + 53, 101, 72, 101, 27 + 70, 100, 89 + 12, 61 + 53, 17 + 23, 17 + 17, 88 + 21, 79 + 36, 45, 97, 117, 78 + 38, 104, 50 + 61, 44 + 70, 25 + 20, 118, 57 + 48, 97, 34, 44, 116, 13 + 101, 18 + 99, 101, 2 + 39, 35 + 24));
        if (_35b && (-1 != _35b.toLowerCase().indexOf("dav"))) {
            _35a = true;
        }
        var _35c = false;
        var _35d = _356._Response.GetResponseHeader("allow", true) || "";
        var _35e = _35d.toLowerCase().split(/[^a-z-_]+/);
        for (var i = 0, l = _35e.length; i < l; i++) {
            if (_35e[i] === "search") {
                _35c = true;
                _358 += ITHit.WebDAV.Client.Features.Dasl;
                break;
            }
        }
        var _361 = _356._Response.GetResponseHeader("x-engine", true);
        this.ItemOptions = new ITHit.WebDAV.Client.OptionsInfo(_358, _35a, _359, _35c, _361);
    }
});
ITHit.oNS = ITHit.Declare("ITHit.Exceptions");
ITHit.oNS.ExpressionException = function (_362) {
    ITHit.Exceptions.ExpressionException.baseConstructor.call(this, _362);
};
ITHit.Extend(ITHit.oNS.ExpressionException, ITHit.Exception);
ITHit.oNS.ExpressionException.prototype.Name = "ExpressionException";
ITHit.DefineClass("ITHit.WebDAV.Client.UploadProgressInfo", null, {
    __static: {
        GetUploadProgress: function (_363) {
            var _364 = [];
            if (!ITHit.WebDAV.Client.UploadProgressInfo.PropNames) {
                ITHit.WebDAV.Client.UploadProgressInfo.PropNames = [new ITHit.WebDAV.Client.PropertyName("bytes-uploaded", "ithit"), new ITHit.WebDAV.Client.PropertyName("last-chunk-saved", "ithit"), new ITHit.WebDAV.Client.PropertyName("total-content-length", "ithit")];
            }
            for (var i = 0, _366; _366 = _363.Responses[i]; i++) {
                for (var j = 0, _368; _368 = _366.Propstats[j]; j++) {
                    var _369 = [];
                    for (var k = 0, _36b; _36b = _368.Properties[k]; k++) {
                        if (_36b.Name.Equals(ITHit.WebDAV.Client.UploadProgressInfo.PropNames[0])) {
                            _369[0] = _36b.Value;
                        } else {
                            if (_36b.Name.Equals(ITHit.WebDAV.Client.UploadProgressInfo.PropNames[1])) {
                                _369[1] = _36b.Value;
                            } else {
                                if (_36b.Name.Equals(ITHit.WebDAV.Client.UploadProgressInfo.PropNames[2])) {
                                    _369[2] = _36b.Value;
                                }
                            }
                        }
                    }
                    if (!_369[0] || !_369[1] || !_369[2]) {
                        throw new ITHit.Exception(ITHit.Phrases.Exceptions.NotAllPropertiesReceivedForUploadProgress.Paste(_366.Href));
                    }
                    _364.push(new ITHit.WebDAV.Client.UploadProgressInfo(_366.Href, parseInt(_369[0].firstChild().nodeValue()), parseInt(_369[2].firstChild().nodeValue()), ITHit.WebDAV.Client.HierarchyItem.GetDate(_369[1].firstChild().nodeValue())));
                }
            }
            return _364;
        }
    },
    Href: null,
    BytesUploaded: null,
    TotalContentLength: null,
    LastChunkSaved: null,
    constructor: function (_36c, _36d, _36e, _36f) {
        if (!ITHit.Utils.IsString(_36c) || !_36c) {
            throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.WrongHref.Paste(), _36c);
        }
        if (!ITHit.Utils.IsInteger(_36d)) {
            throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.WrongUploadedBytesType, _36d);
        }
        if (!ITHit.Utils.IsInteger(_36e)) {
            throw new ITHit.Exceptions.ArgumentException(ITHit.Phrases.Exceptions.WrongContentLengthType, _36e);
        }
        if (_36d > _36e) {
            throw new ITHit.Exceptions.ExpressionException(ITHit.Phrases.Exceptions.BytesUploadedIsMoreThanTotalFileContentLength);
        }
        this.Href = _36c;
        this.BytesUploaded = _36d;
        this.TotalContentLength = _36e;
        this.LastChunkSaved = _36f;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Report", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        ReportType: {UploadProgress: "UploadProgress", VersionsTree: "VersionsTree"},
        Go: function (_370, _371, _372, _373, _374) {
            return this.GoAsync(_370, _371, _372, _373, _374);
        },
        GoAsync: function (_375, _376, _377, _378, _379, _37a) {
            if (!_378) {
                _378 = ITHit.WebDAV.Client.Methods.Report.ReportType.UploadProgress;
            }
            eval(String.fromCharCode.call(this, 118, 86 + 11, 114, 30 + 2, 13 + 82, 51, 35 + 20, 2 + 96, 61, 73, 84, 22 + 50, 105, 89 + 27, 46, 44 + 43, 101, 21 + 77, 59 + 9, 65, 52 + 34, 46, 67, 78 + 30, 98 + 7, 23 + 78, 96 + 14, 116, 46, 77, 98 + 3, 91 + 25, 104, 88 + 23, 100, 115, 10 + 36, 30 + 52, 26 + 75, 76 + 36, 16 + 95, 114, 18 + 98, 15 + 31, 99, 114, 100 + 1, 76 + 21, 116, 42 + 59, 82, 18 + 83, 113, 117, 77 + 24, 115, 116, 40, 80 + 15, 51, 40 + 15, 53, 44, 15 + 80, 8 + 43, 2 + 53, 4 + 50, 38 + 6, 95, 51, 55, 34 + 21, 18 + 26, 95, 31 + 20, 55, 55 + 1, 36 + 8, 85 + 10, 38 + 13, 2 + 53, 57, 41, 59));
            var self = this;
            var _37d = typeof _37a === "function" ? function (_37e) {
                self._GoCallback(_376, _37e, _378, _37a);
            } : null;
            var _37f = _37b.GetResponse(_37d);
            if (typeof _37a !== "function") {
                var _380 = new ITHit.WebDAV.Client.AsyncResult(_37f, _37f != null, null);
                return this._GoCallback(_376, _380, _378, _37a);
            } else {
                return _37b;
            }
        },
        _GoCallback: function (_381, _382, _383, _384) {
            var _385 = _382;
            var _386 = true;
            var _387 = null;
            if (_382 instanceof ITHit.WebDAV.Client.AsyncResult) {
                _385 = _382.Result;
                _386 = _382.IsSuccess;
                _387 = _382.Error;
            }
            var _388 = null;
            if (_386) {
                var _389 = _385.GetResponseStream();
                _388 = new ITHit.WebDAV.Client.Methods.Report(new ITHit.WebDAV.Client.Methods.MultiResponse(_389, _381), _383);
            }
            if (typeof _384 === "function") {
                var _38a = new ITHit.WebDAV.Client.AsyncResult(_388, _386, _387);
                _384.call(this, _38a);
            } else {
                return _388;
            }
        },
        createRequest: function (_38b, _38c, _38d, _38e, _38f) {
            var _390 = _38b.CreateWebDavRequest(_38d, _38c);
            _390.Method("REPORT");
            _390.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
            var _391 = new ITHit.XMLDoc();
            switch (_38e) {
                case ITHit.WebDAV.Client.Methods.Report.ReportType.UploadProgress:
                    var _392 = _391.createElementNS("ithit", "upload-progress");
                    _391.appendChild(_392);
                    break;
                case ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree:
                    var _393 = _391.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "version-tree");
                    if (!_38f || !_38f.length) {
                        var _394 = _391.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "allprop");
                    } else {
                        var _394 = _391.createElementNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "prop");
                        for (var i = 0; i < _38f.length; i++) {
                            var prop = _391.createElementNS(_38f[i].NamespaceUri, _38f[i].Name);
                            _394.appendChild(prop);
                        }
                    }
                    _393.appendChild(_394);
                    _391.appendChild(_393);
                    break;
            }
            _390.Body(_391);
            return _390;
        }
    }, constructor: function (_397, _398) {
        this._super(_397);
        switch (_398) {
            case ITHit.WebDAV.Client.Methods.Report.ReportType.UploadProgress:
                return ITHit.WebDAV.Client.UploadProgressInfo.GetUploadProgress(_397);
        }
    }
});
(function () {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.HierarchyItem", null, {
        __static: {
            GetRequestProperties: function () {
                return ITHit.WebDAV.Client.File.GetRequestProperties();
            }, GetCustomRequestProperties: function (_39a) {
                var _39b = this.GetRequestProperties();
                var _39c = [];
                for (var i = 0, l = _39a.length; i < l; i++) {
                    var _39f = _39a[i];
                    var _3a0 = false;
                    for (var i2 = 0, l2 = _39b.length; i2 < l2; i2++) {
                        if (_39f.Equals(_39b[i2])) {
                            _3a0 = true;
                            break;
                        }
                    }
                    if (!_3a0) {
                        _39c.push(_39f);
                    }
                }
                return _39c;
            }, ParseHref: function (_3a3) {
                return {Href: _3a3, Host: ITHit.WebDAV.Client.HierarchyItem.GetHost(_3a3)};
            }, OpenItem: function (_3a4, _3a5, _3a6) {
                _3a6 = _3a6 || [];
                _3a6 = this.GetCustomRequestProperties(_3a6);
                var _3a7 = this.ParseHref(_3a5);
                var _3a8 = ITHit.WebDAV.Client.Methods.Propfind.Go(_3a4, _3a7.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [].concat(this.GetRequestProperties()).concat(_3a6), ITHit.WebDAV.Client.Depth.Zero, _3a7.Host);
                return this.GetItemFromMultiResponse(_3a8.Response, _3a4, _3a5, _3a6);
            }, OpenItemAsync: function (_3a9, _3aa, _3ab, _3ac) {
                _3ab = _3ab || [];
                _3ab = this.GetCustomRequestProperties(_3ab);
                var _3ad = this.ParseHref(_3aa);
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_3a9, _3ad.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [].concat(this.GetRequestProperties()).concat(_3ab), ITHit.WebDAV.Client.Depth.Zero, _3ad.Host, function (_3ae) {
                    if (_3ae.IsSuccess) {
                        try {
                            _3ae.Result = self.GetItemFromMultiResponse(_3ae.Result.Response, _3a9, _3aa, _3ab);
                        } catch (oError) {
                            _3ae.Error = oError;
                            _3ae.IsSuccess = false;
                        }
                    }
                    _3ac(_3ae);
                });
                return _3a9;
            }, GetItemFromMultiResponse: function (_3af, _3b0, _3b1, _3b2) {
                _3b2 = _3b2 || [];
                for (var i = 0; i < _3af.Responses.length; i++) {
                    var _3b4 = _3af.Responses[i];
                    if (!ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_3b4.Href, _3b1)) {
                        continue;
                    }
                    return this.GetItemFromResponse(_3b4, _3b0, _3b1, _3b2);
                }
                throw new ITHit.WebDAV.Client.Exceptions.NotFoundException(ITHit.Phrases.FolderNotFound.Paste(_3b1));
            }, GetItemsFromMultiResponse: function (_3b5, _3b6, _3b7, _3b8) {
                _3b8 = _3b8 || [];
                var _3b9 = [];
                for (var i = 0; i < _3b5.Responses.length; i++) {
                    var _3bb = _3b5.Responses[i];
                    if (ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_3bb.Href, _3b7)) {
                        continue;
                    }
                    if (_3bb.Status && !_3bb.Status.IsOk()) {
                        continue;
                    }
                    _3b9.push(this.GetItemFromResponse(_3bb, _3b6, _3b7, _3b8));
                }
                return _3b9;
            }, GetItemFromResponse: function (_3bc, _3bd, _3be, _3bf) {
                var _3c0 = this.ParseHref(_3be);
                var _3c1 = ITHit.WebDAV.Client.HierarchyItem.GetPropertiesFromResponse(_3bc);
                for (var i2 = 0, l2 = _3bf.length; i2 < l2; i2++) {
                    if (!ITHit.WebDAV.Client.HierarchyItem.HasProperty(_3bc, _3bf[i2])) {
                        _3c1.push(new ITHit.WebDAV.Client.Property(_3bf[i2], ""));
                    }
                }
                switch (ITHit.WebDAV.Client.HierarchyItem.GetResourceType(_3bc)) {
                    case ITHit.WebDAV.Client.ResourceType.File:
                        return new ITHit.WebDAV.Client.File(_3bd.Session, _3bc.Href, ITHit.WebDAV.Client.HierarchyItem.GetLastModified(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetDisplayName(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetCreationDate(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetContentType(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetContentLength(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetSupportedLock(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetActiveLocks(_3bc, _3be), _3c0.Host, ITHit.WebDAV.Client.HierarchyItem.GetQuotaAvailableBytes(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetQuotaUsedBytes(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetCkeckedIn(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetCheckedOut(_3bc), _3c1);
                        break;
                    case ITHit.WebDAV.Client.ResourceType.Folder:
                        return new ITHit.WebDAV.Client.Folder(_3bd.Session, _3bc.Href, ITHit.WebDAV.Client.HierarchyItem.GetLastModified(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetDisplayName(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetCreationDate(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetSupportedLock(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetActiveLocks(_3bc, _3be), _3c0.Host, ITHit.WebDAV.Client.HierarchyItem.GetQuotaAvailableBytes(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetQuotaUsedBytes(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetCkeckedIn(_3bc), ITHit.WebDAV.Client.HierarchyItem.GetCheckedOut(_3bc), _3c1);
                    default:
                        throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.Exceptions.UnknownResourceType);
                }
            }, AppendToUri: function (sUri, _3c5) {
                return ITHit.WebDAV.Client.HierarchyItem.GetAbsoluteUriPath(sUri) + ITHit.WebDAV.Client.Encoder.EncodeURI(_3c5);
            }, GetActiveLocks: function (_3c6, _3c7) {
                eval(String.fromCharCode.call(this, 41 + 77, 97, 114, 32, 95, 20 + 31, 14 + 85, 3 + 53, 6 + 55, 39 + 34, 84, 46 + 26, 105, 116, 41 + 5, 9 + 78, 96 + 5, 98, 68, 65 + 0, 18 + 68, 46, 67, 108, 105, 58 + 43, 43 + 67, 57 + 59, 38 + 8, 68, 46 + 51, 118, 22 + 45, 111, 48 + 62, 115, 116, 97, 110, 116, 115, 36 + 10, 76, 111, 16 + 83, 55 + 52, 68, 65 + 40, 110 + 5, 99, 59 + 52, 69 + 49, 12 + 89, 114, 4 + 117, 10 + 36, 116, 4 + 107, 83, 116, 114, 105, 107 + 3, 103, 40, 23 + 18, 9 + 50));
                for (var i = 0; i < _3c6.Propstats.length; i++) {
                    var _3ca = _3c6.Propstats[i];
                    if (!_3ca.Status.IsOk()) {
                        break;
                    }
                    if ("undefined" != typeof _3ca.PropertiesByNames[_3c8]) {
                        var _3cb = _3ca.PropertiesByNames[_3c8];
                        try {
                            return ITHit.WebDAV.Client.LockInfo.ParseLockDiscovery(_3cb.Value, _3c7);
                        } catch (e) {
                            if (typeof window.console !== "undefined") {
                                console.error(e.stack || e.toString());
                            }
                            break;
                        }
                    } else {
                        break;
                    }
                }
                return [];
            }, GetSupportedLock: function (_3cc) {
                var _3cd = ITHit.WebDAV.Client.DavConstants.SupportedLock;
                for (var i = 0; i < _3cc.Propstats.length; i++) {
                    var _3cf = _3cc.Propstats[i];
                    if (!_3cf.Status.IsOk()) {
                        break;
                    }
                    var out = [];
                    for (var p in _3cf.PropertiesByNames) {
                        out.push(p);
                    }
                    if ("undefined" != typeof _3cf.PropertiesByNames[_3cd]) {
                        var _3d2 = _3cf.PropertiesByNames[_3cd];
                        try {
                            return ITHit.WebDAV.Client.HierarchyItem.ParseSupportedLock(_3d2.Value);
                        } catch (e) {
                            break;
                        }
                    }
                }
                return [];
            }, ParseSupportedLock: function (_3d3) {
                var _3d4 = [];
                var _3d5 = new ITHit.XPath.resolver();
                _3d5.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
                var _3d6 = null;
                var _3d7 = null;
                var _3d8 = ITHit.XMLDoc.nodeTypes.NODE_ELEMENT;
                var oRes = ITHit.XPath.evaluate("d:lockentry", _3d3, _3d5);
                while (_3d6 = oRes.iterateNext()) {
                    var _3da = ITHit.XPath.evaluate("d:*", _3d6, _3d5);
                    while (_3d7 = _3da.iterateNext()) {
                        if (_3d7.nodeType() == _3d8) {
                            var _3db = "";
                            if (_3d7.hasChildNodes()) {
                                var _3dc = _3d7.firstChild();
                                while (_3dc) {
                                    if (_3dc.nodeType() == _3d8) {
                                        _3db = _3dc.localName();
                                        break;
                                    }
                                    _3dc = _3dc.nextSibling();
                                }
                            } else {
                                _3db = _3d7.localName();
                            }
                            switch (_3db.toLowerCase()) {
                                case "shared":
                                    _3d4.push(ITHit.WebDAV.Client.LockScope.Shared);
                                    break;
                                case "exclusive":
                                    _3d4.push(ITHit.WebDAV.Client.LockScope.Exclusive);
                                    break;
                            }
                        }
                    }
                }
                return _3d4;
            }, GetQuotaAvailableBytes: function (_3dd) {
                var _3de = ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes;
                for (var i = 0; i < _3dd.Propstats.length; i++) {
                    var _3e0 = _3dd.Propstats[i];
                    if (!_3e0.Status.IsOk()) {
                        break;
                    }
                    if ("undefined" != typeof _3e0.PropertiesByNames[_3de]) {
                        var _3e1 = _3e0.PropertiesByNames[_3de];
                        try {
                            return parseInt(_3e1.Value.firstChild().nodeValue());
                        } catch (e) {
                            break;
                        }
                    }
                }
                return -1;
            }, GetQuotaUsedBytes: function (_3e2) {
                var _3e3 = ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes;
                for (var i = 0; i < _3e2.Propstats.length; i++) {
                    var _3e5 = _3e2.Propstats[i];
                    if (!_3e5.Status.IsOk()) {
                        break;
                    }
                    if ("undefined" != typeof _3e5.PropertiesByNames[_3e3]) {
                        var _3e6 = _3e5.PropertiesByNames[_3e3];
                        try {
                            return parseInt(_3e6.Value.firstChild().nodeValue());
                        } catch (e) {
                            break;
                        }
                    }
                }
                return -1;
            }, GetCkeckedIn: function (_3e7) {
                var _3e8 = ITHit.WebDAV.Client.DavConstants.CheckedIn;
                for (var i = 0; i < _3e7.Propstats.length; i++) {
                    var _3ea = _3e7.Propstats[i];
                    if (!_3ea.Status.IsOk()) {
                        break;
                    }
                    if ("undefined" != typeof _3ea.PropertiesByNames[_3e8]) {
                        var _3eb = _3ea.PropertiesByNames[_3e8];
                        try {
                            return ITHit.WebDAV.Client.HierarchyItem.ParseChecked(_3eb.Value);
                        } catch (e) {
                            break;
                        }
                    }
                }
                return false;
            }, GetCheckedOut: function (_3ec) {
                var _3ed = ITHit.WebDAV.Client.DavConstants.CheckedOut;
                for (var i = 0; i < _3ec.Propstats.length; i++) {
                    var _3ef = _3ec.Propstats[i];
                    if (!_3ef.Status.IsOk()) {
                        break;
                    }
                    if ("undefined" != typeof _3ef.PropertiesByNames[_3ed]) {
                        var _3f0 = _3ef.PropertiesByNames[_3ed];
                        try {
                            return ITHit.WebDAV.Client.HierarchyItem.ParseChecked(_3f0.Value);
                        } catch (e) {
                            break;
                        }
                    }
                }
                return false;
            }, ParseChecked: function (_3f1) {
                var _3f2 = [];
                var _3f3 = new ITHit.XPath.resolver();
                _3f3.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
                var _3f4 = null;
                var _3f5 = ITHit.XMLDoc.nodeTypes.NODE_ELEMENT;
                var oRes = ITHit.XPath.evaluate("d:href", _3f1, _3f3);
                while (_3f4 = oRes.iterateNext()) {
                    if (_3f4.nodeType() == _3f5) {
                        _3f2.push(_3f4.firstChild().nodeValue());
                    }
                }
                return _3f2;
            }, GetResourceType: function (_3f7) {
                var _3f8 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_3f7, ITHit.WebDAV.Client.DavConstants.ResourceType);
                var _3f9 = ITHit.WebDAV.Client.ResourceType.File;
                eval(String.fromCharCode.call(this, 37 + 68, 48 + 54, 6 + 34, 11 + 84, 16 + 35, 102, 56, 46, 86, 83 + 14, 96 + 12, 23 + 94, 91 + 10, 46 + 0, 65 + 38, 101, 116, 20 + 49, 23 + 85, 59 + 42, 15 + 94, 101, 110, 109 + 7, 115, 17 + 49, 121, 16 + 68, 34 + 63, 34 + 69, 78, 92 + 5, 94 + 15, 101, 53 + 25, 83, 40, 73, 84, 1 + 71, 105, 116, 46, 87, 90 + 11, 98, 2 + 66, 65, 86, 43 + 3, 55 + 12, 108, 33 + 72, 35 + 66, 41 + 69, 34 + 82, 46, 68, 97, 118, 67, 111 + 0, 110, 115, 116, 71 + 26, 74 + 36, 116, 115, 19 + 27, 78, 97, 33 + 76, 101, 88 + 27, 76 + 36, 24 + 73, 73 + 26, 101, 85, 114, 105, 33 + 11, 4 + 30, 99, 111, 45 + 63, 108, 101, 42 + 57, 116, 24 + 81, 22 + 89, 50 + 60, 34, 39 + 2, 20 + 26, 66 + 42, 29 + 72, 110, 25 + 78, 34 + 82, 69 + 35, 62, 48, 41, 95 + 28, 6 + 89, 51, 97 + 5, 57, 61, 73, 84, 50 + 22, 105, 18 + 98, 24 + 22, 25 + 62, 0 + 101, 8 + 90, 50 + 18, 49 + 16, 86, 46, 67, 108, 105, 34 + 67, 110, 116, 46, 82, 101, 71 + 44, 111, 117, 114, 99, 77 + 24, 84, 121, 112, 101, 46, 61 + 9, 111, 70 + 38, 100, 84 + 17, 19 + 95, 59, 100 + 1, 61, 39, 101, 65 + 53, 24 + 73, 46 + 62, 39, 18 + 41, 108, 61, 39, 58 + 34, 110, 39, 30 + 29, 100, 61, 39, 68, 97, 116, 73 + 28, 39, 59, 110, 61, 39, 21 + 19, 41, 14 + 18, 123, 65 + 27, 110, 32, 18 + 14, 32, 25 + 7, 91, 42 + 68, 91 + 6, 21 + 95, 105, 118, 96 + 5, 32, 79 + 20, 111, 100, 24 + 77, 93, 92, 2 + 108, 125, 39, 59, 56 + 63, 17 + 83, 51 + 10, 68, 8 + 89, 116, 101, 59, 119, 101, 61, 36 + 65, 118, 97, 108, 59, 102, 61, 8 + 31, 102, 39 + 78, 110, 0 + 99, 116, 105, 111, 110, 19 + 13, 3 + 36, 17 + 42, 99, 38 + 23, 40, 15 + 30, 39 + 10, 18 + 14, 61, 61, 32, 77 + 6, 116, 89 + 25, 105, 17 + 93, 72 + 31, 40, 101, 118, 46 + 51, 18 + 90, 41, 20 + 26, 25 + 80, 110, 100, 69 + 32, 42 + 78, 52 + 27, 68 + 34, 40, 39, 9 + 58, 105 + 6, 109, 46 + 66, 105, 20 + 88, 29 + 72, 83, 116, 109 + 5, 7 + 98, 13 + 97, 103, 29 + 10, 39 + 2, 10 + 31, 42 + 17, 94 + 25, 56 + 42, 61, 40, 4 + 41, 49, 21 + 11, 33, 6 + 55, 12 + 20, 8 + 102, 10 + 87, 81 + 37, 105, 40 + 63, 97, 116, 82 + 29, 52 + 62, 46, 105 + 12, 37 + 78, 101, 44 + 70, 10 + 55, 103, 101, 29 + 81, 34 + 82, 46, 116, 111, 76, 54 + 57, 84 + 35, 69 + 32, 114, 67, 9 + 88, 115, 12 + 89, 40, 41, 25 + 21, 66 + 39, 110, 94 + 6, 31 + 70, 120, 79, 102, 40, 10 + 29, 99, 104, 114, 42 + 69, 72 + 37, 6 + 95, 2 + 37, 15 + 26, 18 + 23, 50 + 9, 14 + 45, 38 + 72, 30 + 19, 61, 20 + 19, 40, 28 + 13, 30 + 2, 123, 32, 91, 110, 97, 116, 83 + 22, 118, 33 + 68, 20 + 12, 99, 111, 100, 101, 80 + 13, 32, 125, 9 + 30, 59, 12 + 89, 34 + 18, 61, 99, 59, 99 + 1, 51, 61, 108, 26 + 17, 102, 37 + 6, 17 + 83, 43, 44 + 66, 31 + 18, 30 + 29, 101, 50 + 3, 7 + 54, 70 + 32, 43, 101, 28 + 15, 110, 49, 8 + 51, 37 + 63, 49, 30 + 31, 56 + 52, 43, 102, 43, 100, 3 + 40, 64 + 46, 40 + 3, 75 + 33, 22 + 37, 100, 18 + 35, 61, 102, 29 + 14, 100, 2 + 41, 110, 24 + 25, 59, 101, 24 + 27, 61, 26 + 82, 38 + 5, 102, 43, 23 + 78, 43, 110, 45 + 4, 59, 101, 37 + 12, 61, 108, 2 + 41, 19 + 83, 16 + 27, 101, 27 + 16, 110, 43, 108, 59, 65 + 36, 25 + 25, 51 + 10, 2 + 100, 43, 101, 34 + 9, 110, 59, 100, 2 + 48, 61, 78 + 24, 22 + 21, 98 + 2, 38 + 5, 78 + 32, 27 + 32, 72 + 28, 32 + 20, 61, 2 + 37, 90 + 1, 58 + 44, 117, 110, 99, 43 + 73, 52 + 53, 20 + 91, 110, 28 + 65, 39, 43 + 16, 105, 102, 32, 12 + 28, 40, 40, 40 + 61, 42 + 7, 0 + 33, 61, 18 + 101, 57 + 44, 30 + 11, 38, 38, 40 + 0, 101, 50, 33, 61, 119, 101, 41, 38, 36 + 2, 40, 101, 9 + 42, 33, 2 + 59, 107 + 12, 101, 11 + 30, 27 + 11, 38, 40, 76 + 43, 94 + 4, 9 + 29, 15 + 23, 101, 52, 17 + 21, 38, 33 + 7, 20 + 81, 53, 21 + 12, 7 + 54, 75 + 44, 101, 41, 24 + 17, 41, 124, 74 + 50, 40, 40, 83 + 17, 7 + 42, 8 + 25, 61, 4 + 115, 100, 1 + 40, 38, 38, 40, 100, 22 + 28, 33, 37 + 24, 53 + 66, 77 + 23, 3 + 38, 38, 38, 40, 100, 8 + 43, 3 + 30, 5 + 56, 119, 5 + 95, 34 + 7, 38, 29 + 9, 40, 25 + 75, 50 + 2, 29 + 4, 61, 119, 23 + 77, 23 + 18, 29 + 9, 38, 40, 100, 53, 33, 61, 119, 39 + 61, 41, 41, 41, 15 + 17, 113 + 10, 55 + 61, 44 + 60, 114, 111, 119, 32, 34 + 5, 37 + 64, 47 + 71, 43 + 54, 108, 5 + 27, 97, 21 + 89, 100, 32, 46 + 22, 97, 116, 101, 32, 109, 26 + 75, 55 + 61, 61 + 43, 111, 100, 115, 23 + 9, 47 + 62, 117, 115, 54 + 62, 7 + 25, 76 + 34, 111, 101 + 15, 32, 98, 87 + 14, 32, 114, 18 + 83, 40 + 60, 23 + 78, 80 + 22, 91 + 14, 110, 32 + 69, 100, 2 + 44, 39, 59, 123 + 2, 4 + 121));
                return _3f9;
            }, HasProperty: function (_3fa, _3fb) {
                for (var i = 0; i < _3fa.Propstats.length; i++) {
                    var _3fd = _3fa.Propstats[i];
                    for (var j = 0; j < _3fd.Properties.length; j++) {
                        var _3ff = _3fd.Properties[j];
                        if (_3ff.Name.Equals(_3fb)) {
                            return true;
                        }
                    }
                }
                return false;
            }, GetProperty: function (_400, _401) {
                for (var i = 0; i < _400.Propstats.length; i++) {
                    var _403 = _400.Propstats[i];
                    for (var j = 0; j < _403.Properties.length; j++) {
                        var _405 = _403.Properties[j];
                        if (_405.Name.Equals(_401)) {
                            return _405;
                        }
                    }
                }
                throw new ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException(ITHit.Phrases.Exceptions.PropertyNotFound, _400.Href, _401, null, null);
            }, GetPropertiesFromResponse: function (_406) {
                var _407 = [];
                for (var i = 0; i < _406.Propstats.length; i++) {
                    var _409 = _406.Propstats[i];
                    for (var i2 = 0; i2 < _409.Properties.length; i2++) {
                        _407.push(_409.Properties[i2]);
                    }
                }
                return _407;
            }, GetDisplayName: function (_40b) {
                var _40c = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_40b, ITHit.WebDAV.Client.DavConstants.DisplayName).Value;
                var _40d;
                if (_40c.hasChildNodes()) {
                    _40d = _40c.firstChild().nodeValue();
                } else {
                    _40d = ITHit.WebDAV.Client.Encoder.Decode(ITHit.WebDAV.Client.HierarchyItem.GetLastName(_40b.Href));
                }
                return _40d;
            }, GetLastModified: function (_40e) {
                var _40f;
                try {
                    _40f = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_40e, ITHit.WebDAV.Client.DavConstants.GetLastModified);
                } catch (e) {
                    if (!(e instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException)) {
                        throw e;
                    }
                    return null;
                }
                return ITHit.WebDAV.Client.HierarchyItem.GetDate(_40f.Value.firstChild().nodeValue(), "rfc1123");
            }, GetContentType: function (_410) {
                var _411 = null;
                var _412 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_410, ITHit.WebDAV.Client.DavConstants.GetContentType).Value;
                if (_412.hasChildNodes()) {
                    _411 = _412.firstChild().nodeValue();
                }
                return _411;
            }, GetContentLength: function (_413) {
                var _414 = 0;
                try {
                    var _415 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_413, ITHit.WebDAV.Client.DavConstants.GetContentLength).Value;
                    if (_415.hasChildNodes()) {
                        _414 = parseInt(_415.firstChild().nodeValue());
                    }
                } catch (e) {
                    if (!(e instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException)) {
                        throw e;
                    }
                    return null;
                }
                return _414;
            }, GetCreationDate: function (_416) {
                var _417;
                try {
                    _417 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_416, ITHit.WebDAV.Client.DavConstants.CreationDate);
                } catch (e) {
                    if (!(e instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException)) {
                        throw e;
                    }
                    return null;
                }
                return ITHit.WebDAV.Client.HierarchyItem.GetDate(_417.Value.firstChild().nodeValue(), "tz");
            }, GetDate: function (_418, _419) {
                var _41a;
                var i = 0;
                if ("tz" == _419) {
                    i++;
                }
                if (!_418) {
                    return new Date(0);
                }
                for (var e = i + 1; i <= e; i++) {
                    if (0 == i % 2) {
                        var _41a = new Date(_418);
                        if (!isNaN(_41a)) {
                            break;
                        }
                    } else {
                        var _41d = _418.match(/([\d]{4})\-([\d]{2})\-([\d]{2})T([\d]{2}):([\d]{2}):([\d]{2})(\.[\d]+)?((?:Z)|(?:[\+\-][\d]{2}:[\d]{2}))/);
                        if (_41d && _41d.length >= 7) {
                            _41d.shift();
                            var _41a = new Date(_41d[0], _41d[1] - 1, _41d[2], _41d[3], _41d[4], _41d[5]);
                            var _41e = 6;
                            if (("undefined" != typeof _41d[_41e]) && (-1 != _41d[_41e].indexOf("."))) {
                                _41a.setMilliseconds(_41d[_41e].replace(/[^\d]/g, ""));
                            }
                            _41e++;
                            if (("undefined" != typeof _41d[_41e]) && ("-00:00" != _41d[_41e]) && (-1 != _41d[_41e].search(/(?:\+|-)/))) {
                                var _41f = _41d[_41e].slice(1).split(":");
                                var _420 = parseInt(_41f[1]) + (60 * _41f[0]);
                                if ("+" == _41d[_41e][0]) {
                                    _41a.setMinutes(_41a.getMinutes() - _420);
                                } else {
                                    _41a.setMinutes(_41a.getMinutes() + _420);
                                }
                                _41e++;
                            }
                            _41a.setMinutes(_41a.getMinutes() + (-1 * _41a.getTimezoneOffset()));
                            break;
                        }
                    }
                }
                if (!_41a || isNaN(_41a)) {
                    _41a = new Date(0);
                }
                return _41a;
            }, GetAbsoluteUriPath: function (_421) {
                return _421.replace(/\/?$/, "/");
            }, GetRelativePath: function (_422) {
                return _422.replace(/^[a-z]+\:\/\/[^\/]+\//, "/");
            }, GetLastName: function (_423) {
                var _424 = ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(_423).replace(/\/$/, "");
                return _424.match(/[^\/]*$/)[0];
            }, HrefEquals: function (_425, _426) {
                var iPos = _426.search(/\?[^\/]+$/);
                if (-1 != iPos) {
                    _426 = _426.substr(0, iPos);
                }
                var iPos = _426.search(/\?[^\/]+$/);
                if (-1 != iPos) {
                    _426 = _426.substr(0, iPos);
                }
                return ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(ITHit.WebDAV.Client.Encoder.Decode(_425)).replace(/\/$/, "") == ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(ITHit.WebDAV.Client.Encoder.Decode(_426)).replace(/\/$/, "");
            }, GetFolderParentUri: function (_428) {
                var _429 = /^https?\:\/\//.test(_428) ? _428.match(/^https?\:\/\/[^\/]+/)[0] + "/" : "/";
                var _42a = ITHit.WebDAV.Client.HierarchyItem.GetRelativePath(_428);
                _42a = _42a.replace(/\/?$/, "");
                if (_42a === "") {
                    return null;
                }
                _42a = _42a.substr(0, _42a.lastIndexOf("/") + 1);
                _42a = _42a.substr(1);
                return _429 + _42a;
            }, GetHost: function (_42b) {
                var _42c;
                if (/^https?\:\/\//.test(_42b)) {
                    _42c = _42b.match(/^https?\:\/\/[^\/]+/)[0] + "/";
                } else {
                    _42c = location.protocol + "//" + location.host + "/";
                }
                return _42c;
            }, GetPropertyValuesFromMultiResponse: function (_42d, _42e) {
                for (var i = 0; i < _42d.Responses.length; i++) {
                    var _430 = _42d.Responses[i];
                    if (!ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_430.Href, _42e)) {
                        continue;
                    }
                    var _431 = [];
                    for (var j = 0; j < _430.Propstats.length; j++) {
                        var _433 = _430.Propstats[j];
                        if (!_433.Properties.length) {
                            continue;
                        }
                        if (_433.Status.IsSuccess()) {
                            for (var k = 0; k < _433.Properties.length; k++) {
                                var _435 = _433.Properties[k];
                                if (!_435.Name.IsStandardProperty()) {
                                    _431.push(_435);
                                }
                            }
                            continue;
                        }
                        if (_433.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NotFound)) {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException(ITHit.Phrases.Exceptions.PropertyNotFound, _42e, _433.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_42d), null);
                        }
                        if (_433.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Forbidden)) {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyForbiddenException(ITHit.Phrases.Exceptions.PropertyForbidden, _42e, _433.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_42d), null);
                        }
                        throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.PropertyFailed, _42e, _433.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_42d), _433.Status, null);
                    }
                    return _431;
                }
                throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseItemNotFound.Paste(_42e));
            }, GetPropertyNamesFromMultiResponse: function (_436, _437) {
                var _438 = [];
                var _439 = this.GetPropertyValuesFromMultiResponse(_436, _437);
                for (var i = 0, l = _439.length; i < l; i++) {
                    _438.push(_439[i].Name);
                }
                return _438;
            }, GetSourceFromMultiResponse: function (_43c, _43d) {
                for (var i = 0; i < _43c.length; i++) {
                    var _43f = _43c[i];
                    if (!ITHit.WebDAV.Client.HierarchyItem.HrefEquals(_43f.Href, _43d)) {
                        continue;
                    }
                    var _440 = [];
                    for (var j = 0; j < _43f.Propstats; j++) {
                        var _442 = _43f.Propstats[j];
                        if (!_442.Status.IsOk()) {
                            if (_442.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NotFound)) {
                                return null;
                            }
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyForbiddenException(ITHit.Phrases.PropfindFailedWithStatus.Paste(_442.Status.Description), _43d, _442.Properties[0].Name, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_43f));
                        }
                        for (var k = 0; k < _442.Properties.length; k++) {
                            var _444 = _442.Properties[k];
                            if (_444.Name.Equals(ITHit.WebDAV.Client.DavConstants.Source)) {
                                var _445 = _444.Value.GetElementsByTagNameNS(DavConstants.NamespaceUri, DavConstants.Link);
                                for (var l = 0; l < _445.length; l++) {
                                    var _447 = _445[i];
                                    var _448 = new ITHit.WebDAV.Client.Source(_447.GetElementsByTagName(ITHit.WebDAV.Client.DavConstants.NamespaceUri, ITHit.WebDAV.Client.DavConstants.Src)[0].firstChild().nodeValue(), _447.GetElementsByTagName(ITHit.WebDAV.Client.DavConstants.NamespaceUri, ITHit.WebDAV.Client.DavConstants.Dst)[0].firstChild().nodeValue());
                                    _440.push(_448);
                                }
                                return _440;
                            }
                        }
                    }
                }
                throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseItemNotFound.Paste(_43d));
            }
        },
        Session: null,
        Href: null,
        LastModified: null,
        DisplayName: null,
        CreationDate: null,
        ResourceType: null,
        SupportedLocks: null,
        ActiveLocks: null,
        Properties: null,
        VersionControlled: null,
        Host: null,
        AvailableBytes: null,
        UsedBytes: null,
        CheckedIn: null,
        CheckedOut: null,
        ServerVersion: null,
        _Url: null,
        _AbsoluteUrl: null,
        constructor: function (_449, _44a, _44b, _44c, _44d, _44e, _44f, _450, _451, _452, _453, _454, _455, _456) {
            this.Session = _449;
            this.ServerVersion = _449.ServerEngine;
            this.Href = _44a;
            this.LastModified = _44b;
            this.DisplayName = _44c;
            this.CreationDate = _44d;
            this.ResourceType = _44e;
            this.SupportedLocks = _44f;
            this.ActiveLocks = _450;
            this.Host = _451;
            this.AvailableBytes = _452;
            this.UsedBytes = _453;
            this.CheckedIn = _454;
            this.CheckedOut = _455;
            this.Properties = new ITHit.WebDAV.Client.PropertyList();
            this.Properties.push.apply(this.Properties, _456 || []);
            this.VersionControlled = this.CheckedIn !== false || this.CheckedOut !== false;
            this._AbsoluteUrl = ITHit.Decode(this.Href);
            this._Url = this._AbsoluteUrl.replace(/^http[s]?:\/\/[^\/]+\/?/, "/");
        },
        IsFolder: function () {
            return false;
        },
        IsEqual: function (_457) {
            if (_457 instanceof ITHit.WebDAV.Client.HierarchyItem) {
                return this.Href === _457.Href;
            }
            if (ITHit.Utils.IsString(_457)) {
                if (_457.indexOf("://") !== -1 || _457.indexOf(":\\") !== -1) {
                    return this.GetAbsoluteUrl() === _457;
                }
                return this.GetUrl() === _457;
            }
            return false;
        },
        GetUrl: function () {
            return this._Url;
        },
        GetAbsoluteUrl: function () {
            return this._AbsoluteUrl;
        },
        HasProperty: function (_458) {
            for (var i = 0, l = this.Properties.length; i < l; i++) {
                if (_458.Equals(this.Properties[i].Name)) {
                    return true;
                }
            }
            return false;
        },
        GetProperty: function (_45b) {
            for (var i = 0, l = this.Properties.length; i < l; i++) {
                if (_45b.Equals(this.Properties[i].Name)) {
                    return this.Properties[i].Value.firstChild().nodeValue();
                }
            }
            throw new ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException("Not found property `" + _45b.toString() + "` in resource `" + this.Href + "`.");
        },
        Refresh: function () {
            var _45e = this.Session.CreateRequest(this.__className + ".Refresh()");
            var _45f = [];
            for (var i = 0, l = this.Properties.length; i < l; i++) {
                _45f.push(this.Properties[i].Name);
            }
            var _462 = self.OpenItem(_45e, this.Href, _45f);
            for (var key in _462) {
                if (_462.hasOwnProperty(key)) {
                    this[key] = _462[key];
                }
            }
            _45e.MarkFinish();
        },
        RefreshAsync: function (_464) {
            var that = this;
            var _466 = this.Session.CreateRequest(this.__className + ".RefreshAsync()");
            var _467 = [];
            for (var i = 0, l = this.Properties.length; i < l; i++) {
                _467.push(this.Properties[i].Name);
            }
            self.OpenItemAsync(_466, this.Href, _467, function (_46a) {
                if (_46a.IsSuccess) {
                    for (var key in _46a.Result) {
                        if (_46a.Result.hasOwnProperty(key)) {
                            that[key] = _46a.Result[key];
                        }
                    }
                    _46a.Result = null;
                }
                _466.MarkFinish();
                _464(_46a);
            });
            return _466;
        },
        CopyTo: function (_46c, _46d, _46e, _46f, _470) {
            _470 = _470 || null;
            var _471 = this.Session.CreateRequest(this.__className + ".CopyTo()");
            var _472 = ITHit.WebDAV.Client.Methods.CopyMove.Go(_471, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_46c.Href, _46d), this.ResourceType === ITHit.WebDAV.Client.ResourceType.Folder, _46e, _46f, _470, this.Host);
            var _473 = this._GetErrorFromCopyResponse(_472.Response);
            if (_473) {
                _471.MarkFinish();
                throw _473;
            }
            _471.MarkFinish();
        },
        CopyToAsync: function (_474, _475, _476, _477, _478, _479) {
            _478 = _478 || null;
            var _47a = this.Session.CreateRequest(this.__className + ".CopyToAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.CopyMove.GoAsync(_47a, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Copy, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_474.Href, _475), (this.ResourceType == ITHit.WebDAV.Client.ResourceType.Folder), _476, _477, _478, this.Host, function (_47c) {
                if (_47c.IsSuccess) {
                    _47c.Error = that._GetErrorFromCopyResponse(_47c.Result.Response);
                    if (_47c.Error !== null) {
                        _47c.IsSuccess = false;
                        _47c.Result = null;
                    }
                }
                _47a.MarkFinish();
                _479(_47c);
            });
            return _47a;
        },
        Delete: function (_47d) {
            _47d = _47d || null;
            var _47e = this.Session.CreateRequest(this.__className + ".Delete()");
            eval(String.fromCharCode.call(this, 118, 5 + 92, 41 + 73, 32, 20 + 75, 47 + 5, 55, 32 + 70, 44 + 17, 73, 84, 72, 91 + 14, 19 + 97, 39 + 7, 12 + 75, 101, 25 + 73, 68, 35 + 30, 67 + 19, 16 + 30, 67, 108, 105, 100 + 1, 110, 55 + 61, 46, 77, 101, 89 + 27, 104, 10 + 101, 100, 1 + 114, 40 + 6, 19 + 49, 101, 8 + 100, 96 + 5, 43 + 73, 60 + 41, 46, 71, 111, 40, 22 + 73, 12 + 40, 55, 42 + 59, 33 + 11, 11 + 105, 73 + 31, 105, 67 + 48, 20 + 26, 72, 114, 101, 102, 39 + 5, 52 + 43, 36 + 16, 55, 100, 13 + 31, 29 + 87, 64 + 40, 38 + 67, 115, 26 + 20, 72, 82 + 29, 115, 116, 41, 59));
            var _480 = this._GetErrorFromDeleteResponse(_47f.Response);
            if (_480) {
                _47e.MarkFinish();
                throw _480;
            }
            _47e.MarkFinish();
        },
        DeleteAsync: function (_481, _482) {
            _481 = _481 || null;
            _482 = _482 || function () {
            };
            var _483 = this.Session.CreateRequest(this.__className + ".DeleteAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Delete.GoAsync(_483, this.Href, _481, this.Host, function (_485) {
                if (_485.IsSuccess) {
                    _485.Error = that._GetErrorFromDeleteResponse(_485.Result.Response);
                    if (_485.Error !== null) {
                        _485.IsSuccess = false;
                        _485.Result = null;
                    }
                }
                _483.MarkFinish();
                _482(_485);
            });
            return _483;
        },
        GetPropertyNames: function () {
            var _486 = this.Session.CreateRequest(this.__className + ".GetPropertyNames()");
            var _487 = ITHit.WebDAV.Client.Methods.Propfind.Go(_486, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.PropertyNames, null, ITHit.WebDAV.Client.Depth.Zero, this.Host);
            var _488 = self.GetPropertyNamesFromMultiResponse(_487.Response, this.Href);
            _486.MarkFinish();
            return _488;
        },
        GetPropertyNamesAsync: function (_489) {
            var _48a = this.Session.CreateRequest(this.__className + ".GetPropertyNamesAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_48a, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.PropertyNames, null, ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_48c) {
                if (_48c.IsSuccess) {
                    try {
                        _48c.Result = self.GetPropertyNamesFromMultiResponse(_48c.Result.Response, that.Href);
                    } catch (oError) {
                        _48c.Error = oError;
                        _48c.IsSuccess = false;
                    }
                }
                _48a.MarkFinish();
                _489(_48c);
            });
            return _48a;
        },
        GetPropertyValues: function (_48d) {
            _48d = _48d || null;
            var _48e = this.Session.CreateRequest(this.__className + ".GetPropertyValues()");
            var _48f = ITHit.WebDAV.Client.Methods.Propfind.Go(_48e, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _48d, ITHit.WebDAV.Client.Depth.Zero, this.Host);
            var _490 = self.GetPropertyValuesFromMultiResponse(_48f.Response, this.Href);
            _48e.MarkFinish();
            return _490;
        },
        GetPropertyValuesAsync: function (_491, _492) {
            _491 = _491 || null;
            var _493 = this.Session.CreateRequest(this.__className + ".GetPropertyValuesAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_493, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _491, ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_495) {
                if (_495.IsSuccess) {
                    try {
                        _495.Result = self.GetPropertyValuesFromMultiResponse(_495.Result.Response, that.Href);
                    } catch (oError) {
                        _495.Error = oError;
                        _495.IsSuccess = false;
                    }
                }
                _493.MarkFinish();
                _492(_495);
            });
            return _493;
        },
        GetAllProperties: function () {
            return this.GetPropertyValues(null);
        },
        GetAllPropertiesAsync: function (_496) {
            return this.GetPropertyValuesAsync(null, _496);
        },
        GetParent: function (_497) {
            _497 = _497 || [];
            var _498 = this.Session.CreateRequest(this.__className + ".GetParent()");
            var _499 = ITHit.WebDAV.Client.HierarchyItem.GetFolderParentUri(ITHit.WebDAV.Client.Encoder.Decode(this.Href));
            if (_499 === null) {
                _498.MarkFinish();
                return null;
            }
            var _49a = ITHit.WebDAV.Client.Folder.OpenItem(_498, _499, _497);
            _498.MarkFinish();
            return _49a;
        },
        GetParentAsync: function (_49b, _49c) {
            _49b = _49b || [];
            var _49d = this.Session.CreateRequest(this.__className + ".GetParentAsync()");
            var _49e = ITHit.WebDAV.Client.HierarchyItem.GetFolderParentUri(ITHit.WebDAV.Client.Encoder.Decode(this.Href));
            if (_49e === null) {
                _49c(new ITHit.WebDAV.Client.AsyncResult(null, true, null));
                return null;
            }
            ITHit.WebDAV.Client.Folder.OpenItemAsync(_49d, _49e, _49b, _49c);
            return _49d;
        },
        GetSource: function () {
            var _49f = this.Session.CreateRequest(this.__className + ".GetSource()");
            var _4a0 = ITHit.WebDAV.Client.Methods.Propfind.Go(_49f, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.Source], ITHit.WebDAV.Client.Depth.Zero, this.Host);
            var _4a1 = self.GetSourceFromMultiResponse(_4a0.Response.Responses, this.Href);
            _49f.MarkFinish();
            return _4a1;
        },
        GetSourceAsync: function (_4a2) {
            var _4a3 = this.Session.CreateRequest(this.__className + ".GetSourceAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_4a3, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.Source], ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_4a5) {
                if (_4a5.IsSuccess) {
                    try {
                        _4a5.Result = self.GetSourceFromMultiResponse(_4a5.Result.Response.Responses, that.Href);
                    } catch (oError) {
                        _4a5.Error = oError;
                        _4a5.IsSuccess = false;
                    }
                }
                _4a3.MarkFinish();
                _4a2(_4a5);
            });
            return _4a3;
        },
        Lock: function (_4a6, _4a7, _4a8, _4a9) {
            var _4aa = this.Session.CreateRequest(this.__className + ".Lock()");
            var _4ab = ITHit.WebDAV.Client.Methods.Lock.Go(_4aa, this.Href, _4a9, _4a6, this.Host, _4a7, _4a8);
            _4aa.MarkFinish();
            return _4ab.LockInfo;
        },
        LockAsync: function (_4ac, _4ad, _4ae, _4af, _4b0) {
            var _4b1 = this.Session.CreateRequest(this.__className + ".LockAsync()");
            ITHit.WebDAV.Client.Methods.Lock.GoAsync(_4b1, this.Href, _4af, _4ac, this.Host, _4ad, _4ae, function (_4b2) {
                if (_4b2.IsSuccess) {
                    _4b2.Result = _4b2.Result.LockInfo;
                }
                _4b1.MarkFinish();
                _4b0(_4b2);
            });
            return _4b1;
        },
        MoveTo: function (_4b3, _4b4, _4b5, _4b6) {
            _4b5 = _4b5 || false;
            _4b6 = _4b6 || null;
            var _4b7 = this.Session.CreateRequest(this.__className + ".MoveTo()");
            if (!(_4b3 instanceof ITHit.WebDAV.Client.Folder)) {
                _4b7.MarkFinish();
                throw new ITHit.Exception(ITHit.Phrases.Exceptions.FolderWasExpectedAsDestinationForMoving);
            }
            var _4b8 = ITHit.WebDAV.Client.Methods.CopyMove.Go(_4b7, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Move, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_4b3.Href, _4b4), this.ResourceType, true, _4b5, _4b6, this.Host);
            var _4b9 = this._GetErrorFromMoveResponse(_4b8.Response);
            if (_4b9 !== null) {
                _4b7.MarkFinish();
                throw _4b9;
            }
            _4b7.MarkFinish();
        },
        MoveToAsync: function (_4ba, _4bb, _4bc, _4bd, _4be) {
            _4bc = _4bc || false;
            _4bd = _4bd || null;
            var _4bf = this.Session.CreateRequest(this.__className + ".MoveToAsync()");
            if (!(_4ba instanceof ITHit.WebDAV.Client.Folder)) {
                _4bf.MarkFinish();
                throw new ITHit.Exception(ITHit.Phrases.Exceptions.FolderWasExpectedAsDestinationForMoving);
            }
            var that = this;
            ITHit.WebDAV.Client.Methods.CopyMove.GoAsync(_4bf, ITHit.WebDAV.Client.Methods.CopyMove.Mode.Move, this.Href, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(_4ba.Href, _4bb), this.ResourceType, true, _4bc, _4bd, this.Host, function (_4c1) {
                if (_4c1.IsSuccess) {
                    _4c1.Error = that._GetErrorFromMoveResponse(_4c1.Result.Response);
                    if (_4c1.Error !== null) {
                        _4c1.IsSuccess = false;
                        _4c1.Result = null;
                    }
                }
                _4bf.MarkFinish();
                _4be(_4c1);
            });
            return _4bf;
        },
        RefreshLock: function (_4c2, _4c3) {
            var _4c4 = this.Session.CreateRequest(this.__className + ".RefreshLock()");
            var _4c5 = ITHit.WebDAV.Client.Methods.LockRefresh.Go(_4c4, this.Href, _4c3, _4c2, this.Host);
            _4c4.MarkFinish();
            return _4c5.LockInfo;
        },
        RefreshLockAsync: function (_4c6, _4c7, _4c8) {
            var _4c9 = this.Session.CreateRequest(this.__className + ".RefreshLockAsync()");
            ITHit.WebDAV.Client.Methods.LockRefresh.GoAsync(_4c9, this.Href, _4c7, _4c6, this.Host, function (_4ca) {
                if (_4ca.IsSuccess) {
                    _4ca.Result = _4ca.Result.LockInfo;
                }
                _4c9.MarkFinish();
                _4c8(_4ca);
            });
            return _4c9;
        },
        SupportedFeatures: function () {
            var _4cb = this.Session.CreateRequest(this.__className + ".SupportedFeatures()");
            var _4cc = ITHit.WebDAV.Client.Methods.Options.Go(_4cb, this.Href, this.Host).ItemOptions;
            _4cb.MarkFinish();
            return _4cc;
        },
        SupportedFeaturesAsync: function (_4cd) {
            return this.GetSupportedFeaturesAsync(_4cd);
        },
        GetSupportedFeaturesAsync: function (_4ce) {
            var _4cf = this.Session.CreateRequest(this.__className + ".GetSupportedFeaturesAsync()");
            ITHit.WebDAV.Client.Methods.Options.GoAsync(_4cf, this.Href, this.Host, function (_4d0) {
                if (_4d0.IsSuccess) {
                    _4d0.Result = _4d0.Result.ItemOptions;
                }
                _4cf.MarkFinish();
                _4ce(_4d0);
            });
            return _4cf;
        },
        Unlock: function (_4d1) {
            var _4d2 = this.Session.CreateRequest(this.__className + ".Unlock()");
            eval(String.fromCharCode.call(this, 38 + 80, 47 + 50, 41 + 73, 6 + 26, 95, 40 + 12, 95 + 5, 44 + 7, 12 + 49, 7 + 66, 84, 72, 105, 72 + 44, 41 + 5, 46 + 41, 93 + 8, 98, 9 + 59, 65, 86, 46, 67, 52 + 56, 105, 101, 110, 87 + 29, 19 + 27, 77, 47 + 54, 101 + 15, 104, 111, 100, 20 + 95, 19 + 27, 62 + 23, 110, 50 + 58, 91 + 20, 92 + 7, 107, 46, 71, 2 + 109, 4 + 36, 95, 52, 72 + 28, 9 + 41, 0 + 44, 116, 5 + 99, 105, 38 + 77, 39 + 7, 8 + 64, 35 + 79, 101, 102, 44, 95, 52, 100, 49, 26 + 18, 116, 104, 105, 115, 7 + 39, 18 + 54, 111, 6 + 109, 116, 23 + 18, 59));
            var _4d4 = this._GetErrorFromUnlockResponse(_4d3.Response);
            if (_4d4) {
                _4d2.MarkFinish();
                throw _4d4;
            }
            _4d2.MarkFinish();
        },
        UnlockAsync: function (_4d5, _4d6) {
            var _4d7 = this.Session.CreateRequest(this.__className + ".UnlockAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Unlock.GoAsync(_4d7, this.Href, _4d5, this.Host, function (_4d9) {
                if (_4d9.IsSuccess) {
                    _4d9.Error = that._GetErrorFromUnlockResponse(_4d9.Result.Response);
                    if (_4d9.Error !== null) {
                        _4d9.IsSuccess = false;
                        _4d9.Result = null;
                    }
                }
                _4d7.MarkFinish();
                _4d6(_4d9);
            });
            return _4d7;
        },
        UpdateProperties: function (_4da, _4db, _4dc) {
            _4dc = _4dc || null;
            var _4dd = this.Session.CreateRequest(this.__className + ".UpdateProperties()");
            var _4de = this._GetPropertiesForUpdate(_4da);
            var _4df = this._GetPropertiesForDelete(_4db);
            if (_4de.length + _4df.length === 0) {
                ITHit.Logger.WriteMessage(ITHit.Phrases.Exceptions.NoPropertiesToManipulateWith);
                _4dd.MarkFinish();
                return;
            }
            var _4e0 = ITHit.WebDAV.Client.Methods.Proppatch.Go(_4dd, this.Href, _4de, _4df, _4dc, this.Host);
            var _4e1 = this._GetErrorFromUpdatePropertiesResponse(_4e0.Response);
            if (_4e1) {
                _4dd.MarkFinish();
                throw _4e1;
            }
            _4dd.MarkFinish();
        },
        UpdatePropertiesAsync: function (_4e2, _4e3, _4e4, _4e5) {
            _4e4 = _4e4 || null;
            var _4e6 = this.Session.CreateRequest(this.__className + ".UpdatePropertiesAsync()");
            var _4e7 = this._GetPropertiesForUpdate(_4e2);
            var _4e8 = this._GetPropertiesForDelete(_4e3);
            if (_4e7.length + _4e8.length === 0) {
                _4e6.MarkFinish();
                _4e5(new ITHit.WebDAV.Client.AsyncResult(true, true, null));
                return null;
            }
            var that = this;
            ITHit.WebDAV.Client.Methods.Proppatch.GoAsync(_4e6, this.Href, _4e7, _4e8, _4e4, this.Host, function (_4ea) {
                if (_4ea.IsSuccess) {
                    _4ea.Error = that._GetErrorFromUpdatePropertiesResponse(_4ea.Result.Response);
                    if (_4ea.Error !== null) {
                        _4ea.IsSuccess = false;
                        _4ea.Result = null;
                    }
                }
                _4e6.MarkFinish();
                _4e5(_4ea);
            });
            return _4e6;
        },
        _GetPropertiesForUpdate: function (_4eb) {
            var _4ec = [];
            if (_4eb) {
                for (var i = 0; i < _4eb.length; i++) {
                    if ((_4eb[i] instanceof ITHit.WebDAV.Client.Property) && _4eb[i]) {
                        if (_4eb[i].Name.NamespaceUri != ITHit.WebDAV.Client.DavConstants.NamespaceUri) {
                            _4ec.push(_4eb[i]);
                        } else {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.AddOrUpdatePropertyDavProhibition.Paste(_4eb[i]), this.Href, _4eb[i]);
                        }
                    } else {
                        throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.PropertyUpdateTypeException);
                    }
                }
            }
            return _4ec;
        },
        _GetPropertiesForDelete: function (_4ee) {
            var _4ef = [];
            if (_4ee) {
                for (var i = 0; i < _4ee.length; i++) {
                    if ((_4ee[i] instanceof ITHit.WebDAV.Client.PropertyName) && _4ee[i]) {
                        if (_4ee[i].NamespaceUri != ITHit.WebDAV.Client.DavConstants.NamespaceUri) {
                            _4ef.push(_4ee[i]);
                        } else {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.DeletePropertyDavProhibition.Paste(_4ee[i]), this.Href, _4ee[i]);
                        }
                    } else {
                        throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.Exceptions.PropertyDeleteTypeException);
                    }
                }
            }
            return _4ef;
        },
        _GetErrorFromDeleteResponse: function (_4f1) {
            if (_4f1 instanceof ITHit.WebDAV.Client.Methods.MultiResponse) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToDelete, this.Href, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_4f1), ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
            }
            if (_4f1 instanceof ITHit.WebDAV.Client.Methods.SingleResponse && !_4f1.Status.IsSuccess()) {
                var _4f2 = ITHit.Phrases.DeleteFailedWithStatus.Paste(_4f1.Status.Code, _4f1.Status.Description);
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(_4f2, this.Href, null, _4f1.Status, null);
            }
            return null;
        },
        _GetErrorFromCopyResponse: function (_4f3) {
            if (_4f3 instanceof ITHit.WebDAV.Client.Methods.MultiResponse) {
                for (var i = 0, l = _4f3.Responses.length; i < l; i++) {
                    if (_4f3.Responses[i].Status.IsCopyMoveOk()) {
                        continue;
                    }
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToCopy, this.Href, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_4f3), ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
                }
            }
            if (_4f3 instanceof ITHit.WebDAV.Client.Methods.SingleResponse && !_4f3.Status.IsCopyMoveOk()) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToCopyWithStatus.Paste(_4f3.Status.Code, _4f3.Status.Description), this.Href, null, _4f3.Status, null);
            }
            return null;
        },
        _GetErrorFromMoveResponse: function (_4f6) {
            if (_4f6 instanceof ITHit.WebDAV.Client.Methods.MultiResponse) {
                for (var i = 0, l = _4f6.Responses.length; i < l; i++) {
                    if (_4f6.Responses[i].Status.IsCopyMoveOk()) {
                        continue;
                    }
                    return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.FailedToMove, this.Href, new ITHit.WebDAV.Client.Exceptions.Info.Multistatus(_4f6), ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
                }
            }
            if (_4f6 instanceof ITHit.WebDAV.Client.Methods.SingleResponse && !_4f6.Status.IsCopyMoveOk()) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.MoveFailedWithStatus.Paste(_4f6.Status.Code, _4f6.Status.Description), this.Href, null, _4f6.Status, null);
            }
            return null;
        },
        _GetErrorFromUnlockResponse: function (_4f9) {
            if (!_4f9.Status.IsUnlockOk()) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.UnlockFailedWithStatus.Paste(_4f9.Status.Code, _4f9.Status.Description), this.Href, null, _4f9.Status, null);
            }
            return null;
        },
        _GetErrorFromUpdatePropertiesResponse: function (_4fa) {
            var _4fb = new ITHit.WebDAV.Client.Exceptions.Info.PropertyMultistatus(_4fa);
            for (var i = 0; i < _4fb.Responses.length; i++) {
                var _4fd = _4fb.Responses[i];
                if (_4fd.Status.IsSuccess()) {
                    continue;
                }
                return new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.FailedToUpdateProp, this.Href, _4fd.PropertyName, _4fb, ITHit.WebDAV.Client.HttpStatus.MultiStatus, null);
            }
            return null;
        }
    });
})();
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Put", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function (_4fe, _4ff, _500, _501, _502, _503) {
            return this._super.apply(this, arguments);
        }, GoAsync: function (_504, _505, _506, _507, _508, _509, _50a) {
            return this._super.apply(this, arguments);
        }, _CreateRequest: function (_50b, _50c, _50d, _50e, _50f, _510) {
            var _511 = _50b.CreateWebDavRequest(_510, _50c, _50f);
            _511.Method("PUT");
            if (_50d) {
                _511.Headers.Add("Content-Type", _50d);
            }
            _511.Body(_50e);
            return _511;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Get", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function (_512, _513, _514, _515, _516) {
            return this._super.apply(this, arguments);
        }, GoAsync: function (_517, _518, _519, _51a, _51b) {
            return this._super.apply(this, arguments);
        }, _CreateRequest: function (_51c, _51d, _51e, _51f, _520) {
            var _521 = _51c.CreateWebDavRequest(_520, _51d);
            _521.Method("GET");
            _521.Headers.Add("Translate", "f");
            if (_51e !== null) {
                var _522 = _51e;
                if (_51e >= 0) {
                    if (_51f !== null) {
                        _522 += "-" + parseInt(_51f);
                    } else {
                        _522 += "-";
                    }
                } else {
                    _522 = String(_522);
                }
                _521.Headers.Add("Range", "bytes=" + _522);
            }
            return _521;
        }
    }, GetContent: function () {
        return this.Response._Response.BodyText;
    }
});
(function () {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.MsOfficeEditExtensions", null, {
        __static: {
            GetSchema: function (sExt) {
                var _525 = null;
                var _526 = {
                    "Access": "ms-access",
                    "Infopath": "ms-infopath",
                    "Project": "ms-project",
                    "Publisher": "ms-publisher",
                    "Visio": "ms-visio",
                    "Word": "ms-word",
                    "Powerpoint": "ms-powerpoint",
                    "Excel": "ms-excel"
                };
                var _527 = Object.keys(_526);
                sExt = sExt.toLowerCase();
                for (var i = 0, l = _527.length; i < l; i++) {
                    var _52a = _527[i];
                    var _52b = self[_52a];
                    for (var j = 0, m = _52b.length; j < m; j++) {
                        if (_52b[j] === sExt) {
                            _525 = _526[_52a];
                            break;
                        }
                    }
                    if (_525 !== null) {
                        break;
                    }
                }
                return _525;
            },
            Access: ["accdb", "mdb"],
            Infopath: ["xsn", "xsf"],
            Excel: ["xltx", "xltm", "xlt", "xlsx", "xlsm", "xlsb", "xls", "xll", "xlam", "xla", "ods"],
            Powerpoint: ["pptx", "pptm", "ppt", "ppsx", "ppsm", "pps", "ppam", "ppa", "potx", "potm", "pot", "odp"],
            Project: ["mpp", "mpt"],
            Publisher: ["pub"],
            Visio: ["vstx", "vstm", "vst", "vssx", "vssm", "vss", "vsl", "vsdx", "vsdm", "vsd", "vdw"],
            Word: ["docx", "doc", "docm", "dot", "dotm", "dotx", "odt"]
        }
    });
})();
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.IntegrationException", ITHit.WebDAV.Client.Exceptions.WebDavException, {
    Name: "IntegrationException",
    constructor: function (_52e, _52f) {
        this._super(_52e, _52f);
    }
});
(function () {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.BrowserExtension", null, {
        __static: {
            _ProtocolName: ITHit.WebDAV.Client.DavConstants.ProtocolName,
            _Timeout: 100,
            GetDavProtocolAppVersionAsync: function (_531) {
                self._GetExtensionPropertyAsync("version", _531);
            },
            IsProtocolAvailableAsync: function (sExt, _533) {
                eval(String.fromCharCode.call(this, 94 + 21, 90 + 11, 108, 87 + 15, 46, 95, 42 + 29, 72 + 29, 22 + 94, 69, 120, 116, 101, 87 + 23, 106 + 9, 105, 111, 39 + 71, 80, 114, 111, 94 + 18, 101, 114, 116, 100 + 21, 16 + 49, 115, 28 + 93, 110, 36 + 63, 26 + 14, 0 + 34, 34, 19 + 25, 6 + 96, 51 + 66, 110, 99, 39 + 77, 105, 111, 110, 13 + 27, 95, 28 + 25, 17 + 34, 40 + 12, 12 + 29, 74 + 49, 105, 102, 40, 33, 38 + 57, 33 + 20, 39 + 12, 19 + 33, 12 + 34, 59 + 14, 115, 83, 117, 72 + 27, 0 + 99, 101, 79 + 36, 115, 41, 123, 95, 21 + 32, 51, 51, 40, 59 + 36, 53, 25 + 26, 52, 27 + 14, 59, 36 + 78, 101, 116, 36 + 81, 59 + 55, 19 + 91, 59, 125, 104 + 14, 72 + 25, 114, 17 + 15, 95, 53, 51, 51 + 2, 61, 67 + 28, 36 + 17, 51, 10 + 42, 46, 35 + 47, 101, 68 + 47, 83 + 34, 11 + 97, 47 + 69, 9 + 37, 115, 89 + 23, 60 + 48, 105, 116, 40, 34, 44, 34, 41, 27 + 32, 118, 91 + 6, 31 + 83, 32, 17 + 78, 53, 51, 38 + 16, 11 + 50, 73, 84, 72, 105, 22 + 94, 16 + 30, 84 + 3, 101, 98 + 0, 68, 64 + 1, 68 + 18, 35 + 11, 13 + 54, 39 + 69, 58 + 47, 101, 110, 95 + 21, 35 + 11, 77, 115, 79, 4 + 98, 8 + 94, 105, 99, 101, 69, 54 + 46, 105, 98 + 18, 21 + 48, 120, 116, 101, 110, 115, 105, 51 + 60, 110, 54 + 61, 46, 71, 91 + 10, 77 + 39, 83, 99, 104, 101, 109, 97, 9 + 31, 65 + 50, 28 + 41, 58 + 62, 116, 41, 59, 72 + 23, 53, 51, 30 + 22, 46, 2 + 80, 62 + 39, 35 + 80, 117, 108, 7 + 109, 42 + 19, 59 + 14, 73 + 11, 34 + 38, 105, 33 + 83, 32 + 14, 26 + 59, 83 + 33, 105, 48 + 60, 78 + 37, 23 + 23, 67, 111, 48 + 62, 25 + 91, 97, 44 + 61, 110, 115, 6 + 34, 62 + 33, 39 + 14, 0 + 51, 16 + 37, 44, 95, 53, 27 + 24, 54, 41, 34 + 25, 95, 53, 29 + 22, 18 + 33, 40, 27 + 68, 27 + 26, 51, 40 + 12, 41, 13 + 46, 37 + 88, 17 + 24, 33 + 26));
            },
            IsExtensionInstalled: function () {
                if (self._IsFailed()) {
                    return false;
                }
                /*eval(String.fromCharCode.call(this, 118, 97, 114, 5 + 27, 95, 20 + 33, 14 + 37, 55, 61, 34, 42 + 52, 100, 97, 116, 97, 32 + 13, 8 + 26, 43, 116, 104, 28 + 77, 22 + 93, 30 + 16, 95, 49 + 31, 75 + 39, 111, 44 + 72, 35 + 76, 99, 6 + 105, 3 + 105, 78, 57 + 40, 5 + 104, 101, 16 + 27, 34, 45, 46, 42, 9 + 25, 59, 25 + 93, 53 + 44, 12 + 102, 19 + 13, 25 + 70, 44 + 9, 51, 32 + 24, 30 + 31, 51 + 59, 101, 53 + 66, 32, 60 + 22, 101, 62 + 41, 41 + 28, 41 + 79, 112, 28 + 12, 81 + 14, 29 + 24, 36 + 15, 55, 29 + 12, 52 + 7, 118, 93 + 4, 15 + 99, 7 + 25, 95, 53, 46 + 5, 57, 61, 8 + 92, 111, 99, 117, 109, 73 + 28, 110, 72 + 44, 31 + 15, 11 + 89, 111, 75 + 24, 43 + 74, 109, 101, 63 + 47, 116, 69, 27 + 81, 101, 109, 101, 6 + 104, 116, 6 + 40, 97, 116, 17 + 99, 114, 7 + 98, 98, 100 + 17, 116, 39 + 62, 13 + 102, 41 + 18, 18 + 100, 97, 114, 32, 95, 4 + 49, 51, 41 + 56, 61, 102, 97, 108, 110 + 5, 23 + 78, 27 + 32, 7 + 95, 111, 111 + 3, 24 + 16, 118, 49 + 48, 50 + 64, 15 + 17, 95 + 10, 61, 48, 46 + 13, 105, 16 + 44, 95, 43 + 10, 51 + 0, 35 + 22, 46, 10 + 98, 101, 101 + 9, 103, 116, 97 + 7, 57 + 2, 105, 43, 43, 35 + 6, 121 + 2, 16 + 89, 102, 23 + 17, 95, 6 + 47, 28 + 23, 56, 46, 116, 97 + 4, 115, 65 + 51, 22 + 18, 65 + 30, 53, 51, 10 + 47, 70 + 21, 105, 79 + 14, 46, 110, 97, 109, 97 + 4, 39 + 2, 41, 123, 95, 45 + 8, 51, 97, 29 + 32, 116, 114, 117, 47 + 54, 26 + 33, 31 + 67, 114, 46 + 55, 30 + 67, 64 + 43, 24 + 35, 40 + 85, 125));*/
                var _537 = "^data-" + this._ProtocolName + "-.*";
                var _538 = new RegExp(_537);
                var _539 = document.documentElement.attributes;
                var _53a = false;
                for (var i = 0; i < _539.length; i++) {
                    if (_538.test(_539[i].name)) {
                        _53a = true;
                        break;
                    }
                }
                return _53a;
            },
            _GetExtensionPropertyAsync: function (_53c, _53d) {
                eval(String.fromCharCode.call(this, 118, 97, 114, 32, 86 + 9, 46 + 7, 51, 71 + 30, 61, 18 + 16, 98 + 2, 97, 115 + 1, 97, 45, 34, 27 + 16, 115, 101, 108, 102, 12 + 34, 87 + 8, 80, 114, 111, 74 + 42, 111, 99, 35 + 76, 15 + 93, 78, 68 + 29, 109, 63 + 38, 43 + 16, 118, 79 + 18, 114, 25 + 7, 95, 53, 10 + 41, 102, 28 + 33, 95, 53, 51, 99, 46, 108, 101, 62 + 48, 84 + 19, 46 + 70, 77 + 27, 62, 19 + 29, 62 + 1, 86 + 9, 53, 51, 101, 35 + 8, 32 + 2, 25 + 20, 17 + 17, 8 + 35, 53 + 42, 53, 45 + 6, 31 + 68, 58, 95, 22 + 31, 51, 31 + 70, 59, 105, 102, 8 + 32, 115, 101, 108, 102, 9 + 37, 90 + 5, 35 + 38, 70 + 45, 18 + 52, 97, 105, 108, 36 + 65, 100, 40, 41, 41, 123, 64 + 54, 63 + 34, 114, 32, 95, 53, 52, 48, 61, 110, 45 + 56, 11 + 108, 10 + 22, 11 + 62, 84, 72, 33 + 72, 8 + 108, 46, 60 + 27, 91 + 10, 98, 46 + 22, 65, 80 + 6, 42 + 4, 67, 0 + 108, 33 + 72, 13 + 88, 110, 116, 46, 51 + 14, 112 + 3, 121, 40 + 70, 99, 82, 101, 29 + 86, 55 + 62, 33 + 75, 69 + 47, 30 + 10, 90 + 20, 117, 71 + 37, 108, 44, 10 + 92, 55 + 42, 77 + 31, 115, 17 + 84, 36 + 8, 113 + 2, 101, 104 + 4, 102, 6 + 40, 95, 71, 90 + 11, 62 + 54, 48 + 21, 120, 15 + 84, 101, 78 + 34, 96 + 20, 33 + 72, 68 + 43, 110, 25 + 15, 41, 41, 32 + 27, 95, 53, 47 + 4, 100, 40, 19 + 76, 53, 1 + 51, 22 + 26, 21 + 20, 34 + 25, 81 + 44, 101, 108, 115, 95 + 6, 123, 80 + 25, 56 + 46, 40, 45 + 70, 16 + 85, 73 + 35, 82 + 20, 46, 51 + 44, 72 + 1, 18 + 97, 41 + 39, 101, 103 + 7, 8 + 92, 101 + 4, 95 + 15, 71 + 32, 37 + 3, 41, 41, 123, 100 + 15, 31 + 70, 95 + 21, 84, 105, 109, 101, 111, 117, 86 + 30, 23 + 17, 45 + 57, 86 + 31, 12 + 98, 99, 116, 105, 100 + 11, 27 + 83, 40, 41, 104 + 19, 4 + 101, 27 + 75, 40, 115, 6 + 95, 108, 85 + 17, 46, 30 + 65, 73, 115, 66 + 14, 101, 110, 21 + 79, 105, 110, 72 + 31, 40, 41, 2 + 39, 77 + 46, 118, 97, 114, 32 + 0, 93 + 2, 53, 52, 49, 40 + 21, 63 + 47, 51 + 50, 49 + 70, 5 + 27, 69 + 4, 84, 72, 80 + 25, 38 + 78, 46, 19 + 68, 71 + 30, 98, 32 + 36, 30 + 35, 3 + 83, 17 + 29, 67, 108, 17 + 88, 58 + 43, 71 + 39, 116, 46, 21 + 44, 34 + 81, 121, 93 + 17, 99, 73 + 9, 101, 115, 16 + 101, 38 + 70, 116, 40, 58 + 52, 31 + 86, 108, 57 + 51, 15 + 29, 102, 97, 108, 115, 101, 44, 90 + 25, 51 + 50, 108, 102, 46, 95, 71, 100 + 1, 46 + 70, 36 + 48, 105, 109, 101, 111, 117, 116 + 0, 69, 90 + 30, 99, 39 + 62, 112, 80 + 36, 105, 111, 110, 25 + 15, 41, 29 + 12, 27 + 32, 95, 53, 51, 11 + 89, 40, 22 + 73, 53, 52, 49, 38 + 3, 59, 34 + 80, 101, 116, 102 + 15, 114, 23 + 87, 13 + 46, 120 + 5, 19 + 86, 102, 5 + 35, 115, 101, 108, 102, 46, 95, 19 + 54, 115, 56 + 14, 97, 103 + 2, 108, 101, 73 + 27, 40, 41, 41, 123, 78 + 40, 97, 114, 11 + 21, 62 + 33, 28 + 25, 47 + 5, 49, 61, 110, 41 + 60, 119, 32, 73, 15 + 69, 72, 105, 51 + 65, 46, 87, 20 + 81, 60 + 38, 68, 65, 7 + 79, 46, 60 + 7, 65 + 43, 105, 101, 108 + 2, 116, 31 + 15, 54 + 11, 36 + 79, 121, 110, 99, 69 + 13, 31 + 70, 115, 117, 108, 0 + 116, 40, 110, 77 + 40, 13 + 95, 1 + 107, 6 + 38, 53 + 49, 76 + 21, 85 + 23, 115, 87 + 14, 4 + 40, 41 + 74, 101, 108, 81 + 21, 28 + 18, 58 + 37, 8 + 63, 101, 72 + 44, 69, 100 + 20, 54 + 45, 83 + 18, 112, 63 + 53, 43 + 62, 84 + 27, 110, 40, 32 + 9, 20 + 21, 59, 52 + 43, 53, 51, 100, 40, 95, 6 + 47, 37 + 15, 43 + 6, 41, 59, 114 + 0, 101, 22 + 94, 74 + 43, 71 + 43, 11 + 99, 14 + 45, 22 + 103, 22 + 96, 97, 114, 13 + 19, 95, 53, 52, 16 + 33, 61, 91 + 19, 61 + 40, 69 + 50, 32, 22 + 51, 51 + 33, 72, 105, 94 + 22, 25 + 21, 2 + 85, 84 + 17, 98, 68, 65, 86, 46, 18 + 49, 11 + 97, 105, 101, 110, 52 + 64, 37 + 9, 45 + 20, 115, 68 + 53, 110, 99, 52 + 30, 36 + 65, 75 + 40, 117, 16 + 92, 116, 21 + 19, 100, 8 + 103, 72 + 27, 103 + 14, 35 + 74, 94 + 7, 40 + 70, 23 + 93, 40 + 6, 100, 111, 99, 117, 109, 101, 98 + 12, 53 + 63, 30 + 39, 50 + 58, 101, 74 + 35, 65 + 36, 110, 89 + 27, 1 + 45, 103, 14 + 87, 116, 65, 116, 96 + 20, 59 + 55, 10 + 95, 98, 117, 116, 67 + 34, 40, 70 + 25, 46 + 7, 51, 59 + 43, 39 + 2, 5 + 39, 116, 114, 117, 3 + 98, 10 + 34, 36 + 74, 117, 7 + 101, 108, 41, 10 + 49, 95, 29 + 24, 51, 100, 21 + 19, 95, 53, 52, 49, 23 + 18, 4 + 55, 19 + 106, 44, 115, 48 + 53, 29 + 79, 80 + 22, 46, 55 + 29, 29 + 76, 101 + 8, 76 + 25, 79, 96 + 21, 94 + 22, 41, 59, 4 + 121, 101, 9 + 99, 16 + 99, 101, 10 + 113, 51 + 67, 97, 85 + 29, 32, 52 + 43, 53, 36 + 16, 10 + 38, 8 + 53, 53 + 57, 88 + 13, 22 + 97, 32, 73, 84, 72, 105, 116, 46, 58 + 29, 17 + 84, 82 + 16, 68, 65, 86, 46, 67, 57 + 51, 105, 48 + 53, 1 + 109, 116, 46, 7 + 58, 115, 63 + 58, 110, 2 + 97, 71 + 11, 101, 33 + 82, 117, 108, 40 + 76, 40, 4 + 96, 111, 99, 61 + 56, 109, 101, 42 + 68, 10 + 106, 46, 27 + 73, 111, 99, 117, 51 + 58, 101, 22 + 88, 7 + 109, 15 + 54, 88 + 20, 83 + 18, 45 + 64, 31 + 70, 110, 116, 46, 103, 101, 116, 65, 116, 99 + 17, 114, 23 + 82, 11 + 87, 65 + 52, 4 + 112, 101, 12 + 28, 95, 53, 30 + 21, 91 + 11, 41, 44, 98 + 18, 94 + 20, 103 + 14, 101, 37 + 7, 110, 117, 102 + 6, 13 + 95, 5 + 36, 32 + 27, 4 + 91, 18 + 35, 51, 100, 33 + 7, 95, 30 + 23, 40 + 12, 28 + 20, 41, 59, 125, 125));
            },
            _IsPending: function () {
                eval(String.fromCharCode.call(this, 61 + 57, 97, 13 + 101, 32, 95, 38 + 15, 16 + 36, 50, 33 + 28, 19 + 15, 73 + 27, 30 + 67, 116, 64 + 33, 45, 34, 17 + 26, 115, 101, 108, 20 + 82, 42 + 4, 67 + 28, 68 + 12, 114, 36 + 75, 116, 111, 19 + 80, 111, 108, 21 + 57, 90 + 7, 109, 68 + 33, 8 + 35, 34, 15 + 30, 112, 70 + 31, 110, 100, 105, 110, 103, 9 + 25, 56 + 3, 117 + 1, 90 + 7, 114, 27 + 5, 95, 53, 52, 51, 48 + 13, 100, 25 + 86, 99, 75 + 42, 109, 101, 65 + 45, 53 + 63, 46, 43 + 57, 51 + 60, 12 + 87, 117, 35 + 74, 14 + 87, 110, 116, 69, 62 + 46, 101, 109, 101, 9 + 101, 116, 2 + 44, 27 + 77, 97, 115, 20 + 45, 10 + 106, 116, 11 + 103, 105, 21 + 77, 28 + 89, 116, 99 + 2, 37 + 3, 95, 53, 30 + 22, 50, 34 + 7, 19 + 40));
                return _543;
            },
            _IsFailed: function () {
                /*eval(String.fromCharCode.call(this, 118, 65 + 32, 114, 32, 69 + 26, 8 + 45, 52 + 0, 52, 41 + 20, 28 + 6, 100, 97, 44 + 72, 57 + 40, 2 + 43, 34, 8 + 35, 115, 101, 39 + 69, 102, 27 + 19, 95, 19 + 61, 87 + 27, 111, 43 + 73, 111, 35 + 64, 111, 87 + 21, 41 + 37, 97, 109, 101, 43, 32 + 2, 45, 22 + 79, 56 + 58, 42 + 72, 111, 104 + 10, 34, 59, 69 + 49, 92 + 5, 107 + 7, 32, 95, 26 + 27, 52, 53, 61, 46 + 54, 71 + 40, 99, 117, 109, 101, 12 + 98, 60 + 56, 46, 54 + 46, 38 + 73, 99, 50 + 67, 64 + 45, 26 + 75, 110, 116, 69, 108, 73 + 28, 23 + 86, 93 + 8, 110, 71 + 45, 46, 104, 97, 115, 27 + 38, 68 + 48, 116, 114, 40 + 65, 98, 5 + 112, 116, 97 + 4, 14 + 26, 95, 53, 52, 52, 41, 29 + 30));*/
                var _544 = "data-" + self._ProtocolName + "-error";
                var _545 = document.documentElement.hasAttribute(_544);
                return _545;
            },
            _GetTimeoutException: function () {
                eval(String.fromCharCode.call(this, 118, 2 + 95, 114, 32, 21 + 74, 53, 19 + 33, 2 + 52, 28 + 33, 39 + 71, 8 + 93, 119, 22 + 10, 54 + 19, 84, 72, 22 + 83, 116, 46, 87, 101, 98, 9 + 59, 65, 86, 46, 66 + 1, 108, 102 + 3, 39 + 62, 110, 94 + 22, 3 + 43, 69, 120, 99, 68 + 33, 54 + 58, 116, 19 + 86, 34 + 77, 110, 60 + 55, 46, 73, 110, 39 + 77, 63 + 38, 96 + 7, 114, 97, 12 + 104, 100 + 5, 42 + 69, 5 + 105, 57 + 12, 42 + 78, 36 + 63, 101, 111 + 1, 116, 105, 100 + 11, 110, 40, 73, 4 + 80, 21 + 51, 105, 116, 46, 80, 104, 60 + 54, 97, 14 + 101, 101, 67 + 48, 46, 69, 55 + 65, 99, 101, 112, 56 + 60, 105, 111, 110, 28 + 87, 27 + 19, 33 + 40, 59 + 51, 37 + 79, 101, 103, 114, 96 + 1, 109 + 7, 100 + 5, 5 + 106, 110, 84, 105, 99 + 10, 20 + 81, 62 + 49, 117, 29 + 87, 42 + 27, 120, 99, 101, 112, 90 + 26, 105, 111, 48 + 62, 46, 61 + 19, 38 + 59, 102 + 13, 116, 101, 3 + 37, 115, 59 + 42, 108, 102, 10 + 36, 69 + 26, 84, 105, 109, 101, 42 + 69, 44 + 73, 111 + 5, 35 + 6, 41, 59));
                return _546;
            },
            _GetException: function () {
                eval(String.fromCharCode.call(this, 99 + 19, 97, 114, 32, 15 + 80, 53, 52, 55, 61, 13 + 21, 100, 78 + 19, 116, 97, 45, 34, 43, 24 + 91, 100 + 1, 108, 45 + 57, 12 + 34, 26 + 69, 13 + 67, 114, 111, 116, 8 + 103, 61 + 38, 111, 28 + 80, 78, 96 + 1, 109, 55 + 46, 43, 1 + 33, 45, 101, 62 + 52, 114, 106 + 5, 37 + 77, 34, 59, 118, 97, 114, 32, 34 + 61, 53, 16 + 36, 30 + 26, 39 + 22, 110, 101, 119, 32, 61 + 12, 84, 61 + 11, 15 + 90, 70 + 46, 32 + 14, 52 + 35, 101, 98, 68, 33 + 32, 86, 46, 27 + 40, 108, 105, 101, 107 + 3, 65 + 51, 23 + 23, 69, 73 + 47, 49 + 50, 101, 83 + 29, 116, 9 + 96, 111, 43 + 67, 115, 7 + 39, 72 + 1, 30 + 80, 20 + 96, 23 + 78, 103, 114, 97, 116, 105, 29 + 82, 110, 32 + 37, 100 + 20, 99, 67 + 34, 112, 116, 105, 38 + 73, 53 + 57, 26 + 14, 100, 2 + 109, 99, 117, 98 + 11, 18 + 83, 110, 116, 38 + 8, 51 + 49, 70 + 41, 65 + 34, 117, 59 + 50, 86 + 15, 110, 116, 69, 10 + 98, 101, 109, 26 + 75, 110, 116, 46, 14 + 89, 101, 116, 2 + 63, 116, 116, 4 + 110, 81 + 24, 98, 117, 103 + 13, 101, 3 + 37, 95, 43 + 10, 23 + 29, 9 + 46, 41, 14 + 27, 34 + 25));
                return _548;
            }
        }
    });
})();
(function () {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.DocManager", null, {
        __static: {
            MsOfficeEditExtensions: ITHit.WebDAV.Client.MsOfficeEditExtensions, ObsoleteMessage: function (_54a) {
                if (confirm(_54a + " function is deprecated.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                    window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                }
            }, JavaEditDocument: function (_54b, _54c, _54d, _54e) {
                self.ObsoleteMessage("DocManager.JavaEditDocument()");
                var _54f = _54d != null ? self.GetFolder(_54d) : null;
                var _550 = self.GetDefaultCallback(_54f);
                this.DavProtocolEditDocument(_54b, _54c, _550);
            }, JavaOpenFolderInOsFileManager: function (_551, _552, _553, _554) {
                self.ObsoleteMessage("DocManager.JavaOpenFolderInOsFileManager()");
                var _555 = _553 != null ? self.GetFolder(_553) : null;
                var _556 = self.GetDefaultCallback(_555);
                this.DavProtocolOpenFolderInOsFileManager(sDocumentUrl, _552, _556);
            }, IsMicrosoftOfficeAvailable: function () {
                alert("The DocManager.IsMicrosoftOfficeAvailable() function is deprecated. See http://www.webdavsystem.com/ajax/programming/upgrade for more details.");
                return true;
            }, GetMsOfficeVersion: function () {
                self.ObsoleteMessage("DocManager.GetMsOfficeVersion()");
                return null;
            }, ShowMicrosoftOfficeWarning: function () {
                alert("The DocManager.ShowMicrosoftOfficeWarning() function is deprecated. See http://www.webdavsystem.com/ajax/programming/upgrade for more details.");
            }, GetInstallFileName: function () {
                var _557 = "ITHitEditDocumentOpener.";
                var ext;
                switch (ITHit.DetectOS.OS) {
                    case "Windows":
                        ext = "msi";
                        break;
                    case "MacOS":
                        ext = "pkg";
                        break;
                    case "Linux":
                    case "UNIX":
                        ext = "deb";
                        break;
                    default:
                        ext = null;
                }
                return ext != null ? (_557 + ext) : null;
            }, GetProtocolInstallFileNames: function () {
                var _559 = "ITHitEditDocumentOpener.";
                var _55a = [];
                switch (ITHit.DetectOS.OS) {
                    case "Windows":
                        _55a.push(_559 + ".msi");
                        break;
                    case "MacOS":
                        _55a.push(_559 + ".pkg");
                        break;
                    case "Linux":
                        _55a.push(_559 + ".deb");
                        _55a.push(_559 + ".rpm");
                        break;
                    case "UNIX":
                        _55a.push(_559 + ".deb");
                        break;
                    default:
                        break;
                }
                return _55a;
            }, IsDavProtocolSupported: function () {
                return this.GetInstallFileName() != null;
            }, OpenFolderInOsFileManager: function (_55b, _55c, _55d, _55e, _55f, _560, _561) {
                if (_55e == null) {
                    _55e = window.document.body;
                }
                if (ITHit.DetectBrowser.IE && (ITHit.DetectBrowser.IE < 11)) {
                    if (_55e._httpFolder == null) {
                        var span = {nodeName: "span", style: {display: "none", behavior: "url(#default#httpFolder)"}};
                        _55e._httpFolder = ITHit.Utils.CreateDOMElement(span);
                        _55e.appendChild(_55e._httpFolder);
                    }
                    var res = _55e._httpFolder.navigate(_55b);
                } else {
                    var _564 = null;
                    if ((typeof (_55d) == "string") && (self.GetExtension(_55d) == "jar")) {
                        if (confirm("The DocManager.OpenFolderInOsFileManager() function signature changed.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                            window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                        }
                        _564 = self.GetFolder(_55d);
                        _55d = null;
                    }
                    if (_55d == null) {
                        _55d = self.GetDefaultCallback(_564);
                    }
                    _55b = _55b.replace(/\/?$/, "/");
                    this.OpenDavProtocol(_55b, _55c, _55d, null, _55f, _560, _561);
                }
            }, GetExtension: function (_565) {
                var _566 = _565.indexOf("?");
                if (_566 > -1) {
                    _565 = _565.substr(0, _566);
                }
                var aExt = _565.split(".");
                if (aExt.length === 1) {
                    return "";
                }
                return aExt.pop();
            }, GetFolder: function (sUrl) {
                var _569 = sUrl.indexOf("?");
                if (_569 > -1) {
                    sUrl = sUrl.substr(0, _569);
                }
                return sUrl.substring(0, sUrl.lastIndexOf("/")) + "/";
            }, IsMicrosoftOfficeDocument: function (_56a) {
                var ext = self.GetExtension(ITHit.Trim(_56a));
                if (ext === "") {
                    return false;
                }
                return self.GetMsOfficeSchemaByExtension(ext) !== "";
            }, GetMsOfficeSchemaByExtension: function (sExt) {
                var _56d = self.MsOfficeEditExtensions.GetSchema(sExt);
                return _56d === null ? "" : _56d;
            }, MicrosoftOfficeEditDocument: function (_56e, _56f) {
                /*eval(String.fromCharCode.call(this, 105, 24 + 78, 40, 73, 13 + 71, 43 + 29, 105, 116, 2 + 44, 87, 101, 94 + 4, 49 + 19, 65, 74 + 12, 8 + 38, 67, 17 + 91, 105, 77 + 24, 57 + 53, 47 + 69, 28 + 18, 12 + 64, 14 + 91, 99, 101, 110, 115, 76 + 25, 12 + 61, 21 + 79, 40 + 1, 21 + 11, 52 + 71, 12 + 20, 40, 33 + 69, 63 + 54, 110, 50 + 49, 13 + 103, 84 + 21, 87 + 24, 110, 32, 99, 61 + 43, 101, 33 + 66, 105 + 2, 55 + 21, 48 + 57, 99, 71 + 30, 53 + 57, 53 + 62, 60 + 41, 9 + 31, 41, 32, 63 + 60, 5 + 8, 5 + 27, 22 + 10, 32, 32, 118, 97, 59 + 55, 32, 58 + 57, 42 + 26, 111, 11 + 98, 75 + 22, 105, 110, 14 + 18, 61, 30 + 2, 34, 18 + 86, 112 + 4, 116, 3 + 109, 105 + 10, 3 + 55, 43 + 4, 47, 19 + 100, 48 + 71, 119, 22 + 24, 99 + 20, 101, 41 + 57, 100, 97, 118, 57 + 58, 121, 48 + 67, 116, 101, 47 + 62, 40 + 6, 77 + 22, 111, 109, 34, 59, 3 + 10, 32, 15 + 17, 32, 17 + 15, 115 + 3, 97, 84 + 30, 16 + 16, 77 + 38, 85, 45 + 69, 40 + 65, 7 + 25, 2 + 59, 32, 115, 68, 111, 64 + 45, 97, 105, 110, 24 + 8, 30 + 13, 32, 34, 47, 97, 112, 100 + 5, 47, 110 + 5, 117, 98, 115, 99, 114, 78 + 27, 50 + 62, 116, 105, 111, 110, 29 + 79, 37 + 68, 27 + 72, 39 + 62, 110, 74 + 41, 101, 16 + 31, 99, 79 + 25, 101, 99, 107, 47, 24 + 10, 59, 8 + 5, 22 + 10, 6 + 26, 27 + 5, 32, 118, 47 + 50, 38 + 76, 32, 115, 53 + 30, 116, 93 + 4, 30 + 86, 117, 78 + 37, 83, 116, 111, 114, 23 + 74, 103, 101, 56 + 19, 101, 22 + 99, 32, 42 + 19, 32, 34, 42 + 66, 105, 85 + 14, 101, 14 + 96, 47 + 68, 101, 46, 115, 116, 21 + 76, 116, 4 + 113, 115, 34, 59, 8 + 5, 6 + 26, 32, 32, 32, 118, 33 + 64, 110 + 4, 32, 115, 26 + 56, 36 + 65, 113, 117, 101, 115, 116, 44 + 39, 93 + 23, 111, 114, 97, 96 + 7, 1 + 100, 75, 101, 121, 32, 14 + 47, 28 + 4, 20 + 14, 108, 105, 99, 101, 60 + 50, 64 + 51, 101, 46, 77 + 37, 101, 98 + 15, 117, 101, 115, 116, 13 + 21, 59, 5 + 8, 3 + 29, 2 + 30, 11 + 21, 32, 118, 27 + 70, 114, 32, 94 + 21, 65, 99, 68 + 48, 43 + 74, 18 + 79, 72 + 36, 25 + 7, 61, 28 + 4, 34, 97, 99, 116, 117, 69 + 28, 108, 34, 53 + 6, 1 + 12, 32, 32, 18 + 14, 26 + 6, 118, 47 + 50, 35 + 79, 32, 8 + 107, 69, 120, 112, 62 + 43, 114, 101, 78 + 22, 32, 61, 27 + 5, 34, 101, 119 + 1, 25 + 87, 94 + 11, 114, 63 + 38, 16 + 84, 34, 57 + 2, 1 + 12, 32, 32, 32, 23 + 9, 47 + 71, 97, 32 + 82, 27 + 5, 12 + 103, 70, 51 + 46, 105, 108, 27 + 74, 56 + 44, 32, 61, 32, 34, 32 + 70, 97, 101 + 4, 108, 101, 59 + 41, 34, 26 + 33, 6 + 7, 13 + 19, 32, 22 + 10, 8 + 24, 114 + 4, 31 + 66, 37 + 77, 30 + 2, 62 + 53, 23 + 53, 105, 99, 15 + 86, 92 + 18, 49 + 66, 52 + 49, 73, 100, 32 + 0, 61, 32, 37 + 36, 25 + 59, 13 + 59, 105, 116, 46, 43 + 44, 101, 98, 37 + 31, 65, 33 + 53, 25 + 21, 67, 94 + 14, 99 + 6, 83 + 18, 110, 23 + 93, 46, 76, 57 + 48, 36 + 63, 101, 36 + 74, 90 + 25, 101, 73, 66 + 34, 59, 4 + 9, 13, 32, 32, 32, 32, 105, 102, 32, 40, 0 + 33, 115, 76, 105, 99, 101, 6 + 104, 96 + 19, 101, 73, 2 + 98, 14 + 27, 20 + 12, 114, 74 + 27, 7 + 109, 45 + 72, 114, 30 + 80, 32, 80 + 22, 97, 25 + 83, 115, 40 + 61, 52 + 7, 10 + 3, 8 + 24, 18 + 14, 32, 32, 105, 102, 31 + 9, 119, 28 + 77, 110, 100, 111, 119, 46, 98, 116, 77 + 34, 97, 29 + 12, 13, 7 + 25, 32, 32, 17 + 15, 70 + 53, 8 + 5, 32, 32, 32, 32, 32, 32, 31 + 1, 32, 115, 43 + 40, 93 + 23, 71 + 26, 116, 117, 115, 44 + 39, 116, 111, 48 + 66, 10 + 87, 103, 24 + 77, 74 + 1, 101, 121, 32, 61, 32, 5 + 114, 91 + 14, 29 + 81, 100, 111, 11 + 108, 4 + 42, 18 + 80, 73 + 43, 50 + 61, 97, 29 + 11, 14 + 87, 6 + 104, 99, 111, 38 + 62, 41 + 60, 85, 71 + 11, 73, 67, 111, 109, 112, 111, 110, 101, 59 + 51, 116, 31 + 9, 115, 83, 41 + 75, 97, 4 + 112, 117, 115, 83, 116, 111, 114, 34 + 63, 103, 2 + 99, 75, 101, 26 + 95, 41, 41, 3 + 56, 5 + 8, 8 + 24, 5 + 27, 22 + 10, 32, 16 + 16, 1 + 31, 32, 32, 115, 82, 101, 25 + 88, 117, 101, 115, 37 + 79, 51 + 32, 38 + 78, 111, 2 + 112, 59 + 38, 103, 101, 75, 101, 121, 32, 61, 17 + 15, 119, 105, 110, 100, 13 + 98, 119, 15 + 31, 9 + 89, 116, 111, 97, 35 + 5, 101, 110, 99, 84 + 27, 100, 73 + 28, 85, 12 + 70, 73, 67, 111, 99 + 10, 56 + 56, 111, 76 + 34, 85 + 16, 18 + 92, 116, 40, 89 + 26, 26 + 56, 101, 113, 100 + 17, 15 + 86, 115, 116, 42 + 41, 67 + 49, 111, 34 + 80, 97, 53 + 50, 39 + 62, 74 + 1, 101, 121, 41, 7 + 34, 59, 8 + 5, 32, 1 + 31, 6 + 26, 32, 125, 13, 13, 5 + 27, 12 + 20, 32, 31 + 1, 118, 5 + 92, 114, 18 + 14, 26 + 85, 76, 105, 99, 101, 110, 44 + 71, 101, 83, 116, 37 + 60, 116, 117, 13 + 102, 16 + 16, 29 + 32, 32, 18 + 85, 30 + 71, 116, 83, 116, 97, 116, 76 + 41, 115, 70, 59 + 52, 114, 67, 17 + 100, 114, 3 + 111, 101, 110, 116, 28 + 48, 105, 49 + 50, 101, 24 + 86, 115, 101, 5 + 35, 114 + 1, 83, 81 + 35, 97, 53 + 63, 4 + 113, 115, 4 + 79, 53 + 63, 111, 114, 97, 103, 101, 75, 94 + 7, 121, 8 + 33, 27 + 32, 13, 32, 32, 30 + 2, 32, 105, 62 + 40, 19 + 13, 34 + 6, 33, 111, 49 + 27, 105, 31 + 68, 61 + 40, 110, 83 + 32, 101, 83, 116, 97, 18 + 98, 40 + 77, 39 + 76, 29 + 3, 80 + 44, 116 + 8, 13, 23 + 9, 10 + 22, 2 + 30, 3 + 29, 32, 10 + 22, 32, 4 + 28, 111, 55 + 21, 105, 99, 101, 110, 115, 101, 83, 43 + 73, 97, 116, 42 + 75, 115, 46, 110 + 5, 6 + 110, 97, 116, 117, 39 + 76, 32, 43 + 18, 55 + 6, 61, 32, 73 + 42, 69, 120, 112, 0 + 105, 37 + 77, 101, 71 + 29, 32, 124, 42 + 82, 5 + 8, 32, 23 + 9, 32, 5 + 27, 11 + 21, 13 + 19, 27 + 5, 12 + 20, 25 + 86, 76, 105, 99 + 0, 101, 55 + 55, 62 + 53, 101, 81 + 2, 30 + 86, 97, 26 + 90, 117, 56 + 59, 23 + 23, 101, 24 + 96, 11 + 101, 73 + 32, 102 + 12, 101, 94 + 6, 33 + 32, 36 + 80, 23 + 9, 59 + 1, 13 + 19, 110, 46 + 55, 53 + 66, 32, 54 + 14, 97, 116, 101, 40, 41, 27 + 14, 32, 117 + 6, 13, 32, 26 + 6, 32, 27 + 5, 32, 32, 11 + 21, 32, 33 + 85, 28 + 69, 35 + 79, 22 + 10, 79 + 19, 73, 29 + 86, 61 + 4, 18 + 97, 121, 96 + 14, 23 + 76, 32, 40 + 21, 32, 21 + 12, 111, 76, 62 + 43, 31 + 68, 18 + 83, 22 + 88, 21 + 94, 101, 74 + 9, 116, 47 + 50, 47 + 69, 117, 68 + 47, 32, 78 + 46, 124, 32, 111, 23 + 53, 48 + 57, 29 + 70, 101, 35 + 75, 33 + 82, 101, 8 + 75, 116, 62 + 35, 116, 117, 115, 46, 14 + 101, 116, 97, 116, 113 + 4, 115, 32, 61, 61, 61, 32, 115, 65, 17 + 82, 75 + 41, 1 + 116, 45 + 52, 55 + 53, 42 + 17, 5 + 8, 27 + 5, 32, 32, 32, 27 + 5, 1 + 31, 32, 1 + 31, 10 + 95, 37 + 65, 32, 40, 98, 10 + 63, 115, 40 + 25, 115, 121, 110, 3 + 96, 32, 10 + 28, 5 + 33, 16 + 16, 17 + 16, 98, 47 + 54, 10 + 93, 105, 110, 10 + 72, 101, 113, 117, 101, 115, 28 + 88, 9 + 31, 37 + 4, 29 + 12, 32, 71 + 43, 10 + 91, 40 + 76, 117, 114, 110, 4 + 28, 116, 112 + 2, 117, 50 + 51, 59, 13, 21 + 11, 22 + 10, 32, 32, 14 + 18, 32, 6 + 26, 32, 17 + 15, 32, 8 + 24, 32, 118, 97, 107 + 7, 29 + 3, 87 + 24, 63 + 19, 26 + 75, 113, 32, 43 + 18, 25 + 7, 110, 101, 48 + 71, 32, 22 + 66, 28 + 49, 6 + 70, 72, 111 + 5, 102 + 14, 98 + 14, 82, 101, 111 + 2, 67 + 50, 101, 115, 116, 20 + 20, 41, 59, 13, 31 + 1, 11 + 21, 32, 32, 32, 32, 32, 32, 32, 32, 13 + 19, 27 + 5, 105, 89 + 13, 8 + 32, 74 + 24, 73, 37 + 78, 62 + 3, 115, 93 + 28, 47 + 63, 61 + 38, 20 + 21, 32, 111, 57 + 25, 101, 31 + 82, 3 + 43, 98 + 13, 110, 114, 88 + 13, 67 + 30, 100, 65 + 56, 37 + 78, 11 + 105, 18 + 79, 97 + 19, 101, 99, 104, 97, 95 + 15, 78 + 25, 101, 4 + 28, 61, 4 + 28, 52 + 59, 78 + 32, 50 + 32, 101, 79 + 34, 84 + 33, 60 + 41, 115, 8 + 108, 67, 104, 97, 23 + 87, 12 + 91, 91 + 10, 43 + 16, 0 + 13, 16 + 16, 31 + 1, 32, 23 + 9, 28 + 4, 16 + 16, 31 + 1, 32, 32, 32, 16 + 16, 13 + 19, 111, 82, 101, 111 + 2, 35 + 11, 24 + 87, 46 + 66, 54 + 47, 20 + 90, 40, 21 + 13, 6 + 74, 79, 83, 84, 34, 44, 9 + 23, 115, 85, 114, 105, 44, 29 + 3, 78 + 20, 34 + 39, 83 + 32, 47 + 18, 45 + 70, 15 + 106, 110, 88 + 11, 41, 59, 13, 31 + 1, 14 + 18, 32, 23 + 9, 32, 32, 32, 32, 32, 16 + 16, 32, 31 + 1, 111, 82, 19 + 82, 41 + 72, 46, 115, 71 + 30, 96 + 20, 30 + 52, 41 + 60, 113, 117, 71 + 30, 109 + 6, 116, 72, 99 + 2, 97, 63 + 37, 94 + 7, 114, 2 + 38, 30 + 9, 33 + 34, 95 + 16, 5 + 105, 44 + 72, 101, 19 + 91, 116, 17 + 28, 84, 35 + 86, 112, 20 + 81, 39, 5 + 39, 31 + 1, 29 + 10, 97, 112, 83 + 29, 108, 105, 94 + 5, 97, 92 + 24, 105, 60 + 51, 92 + 18, 24 + 23, 120, 45, 119, 57 + 62, 119, 8 + 37, 102, 36 + 75, 114, 109, 20 + 25, 117, 114, 108, 101, 110, 10 + 89, 9 + 102, 31 + 69, 101, 30 + 70, 13 + 26, 9 + 32, 59, 10 + 3, 32, 32, 32, 32, 32, 32, 12 + 20, 32, 118, 74 + 23, 114, 2 + 30, 60 + 55, 39 + 41, 97, 114, 97, 109, 115, 32, 39 + 22, 22 + 10, 28 + 6, 105, 45 + 55, 61, 8 + 26, 20 + 12, 43, 31 + 1, 96 + 5, 110, 23 + 76, 111, 100, 19 + 82, 50 + 35, 82, 73, 67, 55 + 56, 9 + 100, 105 + 7, 111, 11 + 99, 101, 94 + 16, 37 + 79, 40, 96 + 19, 41 + 35, 7 + 98, 99, 2 + 99, 23 + 87, 15 + 100, 101, 73, 100, 20 + 21, 19 + 13, 7 + 36, 32, 3 + 31, 38, 94 + 18, 114, 111, 100, 117, 28 + 71, 12 + 104, 78, 97 + 0, 109, 67 + 34, 26 + 89, 23 + 38, 34, 32, 1 + 42, 28 + 4, 73, 84, 72, 44 + 61, 11 + 105, 16 + 30, 80, 104, 54 + 60, 94 + 3, 44 + 71, 70 + 31, 11 + 104, 46, 80, 114, 111, 21 + 79, 77 + 40, 99, 28 + 88, 11 + 67, 97, 54 + 55, 101, 59, 0 + 13, 32, 5 + 27, 32, 32, 21 + 11, 32, 32, 32, 116, 114, 68 + 53, 12 + 20, 123, 3 + 10, 15 + 17, 32, 32, 32, 32, 30 + 2, 32, 10 + 22, 6 + 26, 32, 32, 5 + 27, 41 + 70, 25 + 57, 101, 59 + 54, 3 + 43, 101 + 14, 101, 110, 73 + 27, 40, 115, 80, 39 + 58, 114, 97, 109, 115, 34 + 7, 48 + 11, 8 + 5, 32, 32, 32, 31 + 1, 32, 29 + 3, 20 + 12, 32, 17 + 108, 32, 99, 97, 60 + 56, 91 + 8, 104, 32, 8 + 32, 71 + 30, 40 + 1, 17 + 15, 123, 13, 32, 32, 32, 32, 7 + 25, 21 + 11, 23 + 9, 32, 1 + 31, 13 + 19, 0 + 32, 6 + 26, 79 + 32, 110, 31 + 51, 38 + 63, 113, 73 + 44, 22 + 79, 96 + 19, 116, 70, 97, 47 + 58, 108, 16 + 85, 100, 26 + 20, 21 + 78, 97, 108, 58 + 50, 40, 111, 67 + 15, 32 + 69, 113, 41, 26 + 33, 13, 20 + 12, 1 + 31, 11 + 21, 32, 32, 5 + 27, 32, 31 + 1, 125, 13, 2 + 11, 32, 20 + 12, 21 + 11, 32, 32, 32, 27 + 5, 14 + 18, 95 + 10, 80 + 22, 22 + 18, 33, 51 + 47, 73, 74 + 41, 65, 115, 6 + 115, 110, 99, 41, 32, 111, 57 + 53, 44 + 38, 101, 113, 46 + 71, 21 + 80, 115, 116, 67, 104, 22 + 75, 71 + 39, 103, 54 + 47, 14 + 32, 55 + 44, 97, 108, 37 + 71, 3 + 37, 111, 82, 101, 14 + 99, 41, 59, 13, 32, 32, 32, 27 + 5, 32, 24 + 8, 12 + 20, 32, 93 + 21, 42 + 59, 32 + 84, 117, 104 + 10, 82 + 28, 32, 116, 68 + 46, 116 + 1, 59 + 42, 8 + 51, 3 + 10, 32 + 0, 32, 32, 32, 71 + 54, 32, 69 + 32, 108, 115, 101, 32, 68 + 55, 13, 25 + 7, 32, 3 + 29, 32, 32, 32, 32, 23 + 9, 114, 101, 19 + 97, 117, 114, 110, 32, 111, 76, 20 + 85, 99, 3 + 98, 44 + 66, 115, 101, 2 + 81, 79 + 37, 97, 116, 113 + 4, 21 + 94, 32, 33, 61, 59 + 2, 32, 72 + 43, 69, 120, 112, 5 + 100, 33 + 81, 17 + 84, 47 + 53, 32 + 27, 13, 23 + 9, 32, 32, 32, 125, 12 + 1, 13, 32, 32, 32, 32, 102, 17 + 100, 110, 29 + 70, 116, 105, 93 + 18, 110, 32, 22 + 89, 54 + 56, 33 + 49, 54 + 47, 113, 117, 101, 114 + 1, 113 + 3, 17 + 50, 95 + 9, 87 + 10, 110, 50 + 53, 101, 40, 41, 26 + 6, 123, 1 + 12, 32, 32, 32, 32, 32, 6 + 26, 20 + 12, 32, 105, 72 + 30, 2 + 38, 116, 8 + 96, 105, 25 + 90, 46, 112 + 2, 101, 36 + 61, 27 + 73, 121, 62 + 21, 116, 88 + 9, 116, 101, 32, 1 + 32, 61, 61, 19 + 13, 11 + 77, 77, 8 + 68, 72, 41 + 75, 116 + 0, 106 + 6, 24 + 58, 79 + 22, 62 + 51, 41 + 76, 74 + 27, 44 + 71, 116, 37 + 9, 18 + 50, 71 + 8, 78, 14 + 55, 41, 32, 114, 92 + 9, 28 + 88, 117, 81 + 33, 92 + 18, 59, 10 + 3, 12 + 1, 32, 3 + 29, 6 + 26, 32, 28 + 4, 32, 6 + 26, 32, 99 + 9, 9 + 102, 41 + 58, 97, 108, 83, 116, 111, 79 + 35, 97, 103, 101, 26 + 20, 114, 2 + 99, 109, 111, 118, 101, 67 + 6, 116, 20 + 81, 6 + 103, 40, 9 + 106, 39 + 43, 101, 96 + 17, 117, 101, 115, 37 + 79, 9 + 74, 116, 111, 114, 2 + 95, 30 + 73, 101, 5 + 70, 101, 121, 0 + 41, 59, 7 + 6, 32, 3 + 29, 22 + 10, 32, 26 + 6, 21 + 11, 32, 32, 59 + 46, 102, 12 + 20, 40, 116, 104, 22 + 83, 34 + 81, 41 + 5, 115, 14 + 102, 6 + 91, 116, 117, 115, 29 + 3, 6 + 27, 4 + 57, 61, 32, 8 + 42, 48, 48, 41, 19 + 13, 123, 13, 32, 21 + 11, 32, 26 + 6, 32, 9 + 23, 25 + 7, 30 + 2, 32, 20 + 12, 32, 32, 111, 55 + 55, 15 + 67, 8 + 93, 113, 117, 8 + 93, 35 + 80, 106 + 10, 46 + 24, 73 + 24, 83 + 22, 108, 101, 83 + 17, 46, 41 + 58, 43 + 54, 37 + 71, 66 + 42, 21 + 19, 116, 104, 61 + 44, 39 + 76, 41, 30 + 29, 5 + 8, 18 + 14, 32, 32, 32, 32, 7 + 25, 32, 32, 32, 20 + 12, 32, 20 + 12, 3 + 111, 101, 116, 78 + 39, 114, 18 + 92, 14 + 45, 3 + 10, 30 + 2, 32, 30 + 2, 24 + 8, 11 + 21, 32, 32, 3 + 29, 125, 0 + 13, 13, 32, 20 + 12, 4 + 28, 20 + 12, 32, 29 + 3, 32, 23 + 9, 107 + 11, 8 + 89, 53 + 61, 32, 68 + 43, 82, 101, 21 + 94, 112, 51 + 60, 110, 85 + 30, 90 + 11, 29 + 3, 5 + 56, 8 + 24, 74, 63 + 20, 17 + 62, 70 + 8, 46, 112, 97, 114, 3 + 112, 101, 40, 108 + 8, 104, 102 + 3, 115, 11 + 35, 58 + 56, 101, 115, 10 + 102, 94 + 17, 110, 74 + 41, 86 + 15, 20 + 21, 59, 6 + 7, 16 + 16, 15 + 17, 29 + 3, 32, 32, 28 + 4, 22 + 10, 30 + 2, 55 + 50, 102, 40, 33, 111, 82, 101, 21 + 94, 112, 102 + 9, 110, 115, 101, 27 + 19, 2 + 71, 71 + 44, 31 + 38, 73 + 47, 63 + 49, 105, 114, 22 + 79, 90 + 10, 31 + 1, 38, 38, 7 + 25, 111, 50 + 32, 74 + 27, 36 + 79, 3 + 109, 111, 72 + 38, 115, 101, 36 + 10, 73, 115, 62 + 24, 97, 87 + 21, 105, 100, 41, 0 + 13, 17 + 15, 2 + 30, 12 + 20, 32, 32, 32, 27 + 5, 28 + 4, 123, 7 + 6, 32, 32, 32, 11 + 21, 32, 32, 32, 22 + 10, 32, 32, 32, 32, 115, 101, 116 + 0, 22 + 61, 116, 31 + 66, 116, 117, 115, 70, 24 + 87, 43 + 71, 4 + 63, 117, 114, 114, 65 + 36, 81 + 29, 116, 76, 105, 99, 15 + 86, 88 + 27, 101, 40, 59 + 56, 51 + 14, 62 + 37, 94 + 22, 117, 97, 108, 41, 12 + 47, 0 + 13, 32, 25 + 7, 32, 30 + 2, 31 + 1, 32, 18 + 14, 28 + 4, 32, 32, 13 + 19, 18 + 14, 114, 101, 116, 117, 54 + 60, 83 + 27, 59, 13, 32 + 0, 32, 32, 32, 32, 24 + 8, 32, 28 + 4, 59 + 66, 12 + 1, 13, 32, 32, 12 + 20, 10 + 22, 32, 32, 32, 17 + 15, 50 + 65, 25 + 76, 116, 46 + 37, 116, 97, 116, 117, 115, 70, 87 + 24, 114, 67, 98 + 19, 78 + 36, 1 + 113, 101, 110, 83 + 33, 76, 105, 20 + 79, 13 + 88, 115, 101, 14 + 26, 73 + 42, 41 + 28, 74 + 46, 74 + 38, 105, 35 + 79, 61 + 40, 100, 23 + 18, 59, 9 + 4, 26 + 6, 27 + 5, 32, 26 + 6, 32, 31 + 1, 32, 5 + 27, 105, 44 + 58, 39 + 1, 33, 111, 82, 101, 115, 112, 50 + 61, 110, 15 + 100, 75 + 26, 46, 69, 100 + 14, 75 + 39, 52 + 59, 96 + 18, 85, 105 + 9, 108, 31 + 10, 13, 32, 26 + 6, 32, 32, 23 + 9, 32, 32, 32, 102 + 21, 13, 23 + 9, 32, 5 + 27, 32, 17 + 15, 28 + 4, 27 + 5, 2 + 30, 32, 32, 3 + 29, 17 + 15, 97, 108, 27 + 74, 114, 116, 40, 98 + 13, 82, 50 + 51, 62 + 53, 37 + 75, 111, 110, 48 + 67, 101, 46, 10 + 59, 87 + 27, 114, 7 + 104, 111 + 3, 77, 44 + 57, 115, 115, 97, 103, 101, 40 + 1, 59, 10 + 3, 32, 6 + 26, 32, 28 + 4, 30 + 2, 32 + 0, 32, 32, 21 + 11, 3 + 29, 32, 17 + 15, 111 + 5, 42 + 62, 67 + 47, 101 + 10, 92 + 27, 32, 73 + 37, 46 + 55, 65 + 54, 4 + 28, 41 + 28, 114, 114, 111, 105 + 9, 40, 111, 18 + 64, 101, 66 + 49, 83 + 29, 24 + 87, 8 + 102, 115, 61 + 40, 46, 49 + 20, 89 + 25, 114, 105 + 6, 52 + 62, 77, 85 + 16, 40 + 75, 115, 42 + 55, 97 + 6, 74 + 27, 41, 7 + 52, 13, 32, 32, 18 + 14, 32, 11 + 21, 32, 32, 6 + 26, 95 + 30, 13, 13, 32, 32, 32, 30 + 2, 32, 32, 32, 32, 105, 61 + 41, 32, 40, 99, 111, 110, 102, 105, 66 + 48, 109, 35 + 5, 111, 13 + 69, 101, 105 + 10, 32 + 80, 111, 27 + 83, 115, 101, 46, 9 + 60, 114, 66 + 48, 111, 114, 62 + 15, 90 + 11, 115, 115, 74 + 23, 17 + 86, 42 + 59, 19 + 22, 8 + 33, 32, 84 + 39, 8 + 5, 10 + 22, 32, 32, 32, 16 + 16, 32, 32, 9 + 23, 32, 21 + 11, 22 + 10, 15 + 17, 93 + 15, 59 + 52, 38 + 61, 97, 89 + 27, 43 + 62, 111, 100 + 10, 15 + 31, 39 + 65, 114, 57 + 44, 81 + 21, 21 + 11, 61, 32, 18 + 93, 82, 101, 71 + 44, 35 + 77, 12 + 99, 110, 70 + 45, 76 + 25, 32 + 14, 30 + 39, 88 + 26, 88 + 26, 104 + 7, 73 + 41, 46 + 39, 6 + 108, 108, 28 + 31, 13, 2 + 30, 2 + 30, 30 + 2, 8 + 24, 32, 10 + 22, 7 + 25, 25 + 7, 125, 29 + 3, 101, 108, 37 + 78, 68 + 33, 4 + 28, 44 + 79, 11 + 2, 32, 32, 10 + 22, 32, 32, 19 + 13, 14 + 18, 32, 32, 13 + 19, 18 + 14, 23 + 9, 103 + 13, 22 + 82, 114, 1 + 110, 119, 32, 106 + 4, 101, 107 + 12, 16 + 16, 69, 114, 17 + 97, 111, 56 + 58, 40, 34, 57 + 13, 97, 105, 105 + 3, 101, 37 + 63, 32, 16 + 83, 104, 101, 16 + 83, 107, 32, 108, 18 + 87, 23 + 76, 30 + 71, 110, 115 + 0, 101, 20 + 14, 41, 59, 13, 20 + 12, 32, 3 + 29, 32 + 0, 3 + 29, 29 + 3, 32, 32 + 0, 125, 13, 32, 28 + 4, 32, 32, 125, 13, 13, 20 + 12, 32, 13 + 19, 32, 102, 117, 110, 23 + 76, 99 + 17, 56 + 49, 111, 30 + 80, 6 + 26, 82 + 29, 105 + 5, 11 + 71, 101, 71 + 42, 117, 101, 84 + 31, 116, 12 + 58, 97, 15 + 90, 108, 9 + 92, 100, 40, 41, 27 + 5, 123, 11 + 2, 29 + 3, 21 + 11, 32, 32, 25 + 7, 6 + 26, 32, 32, 56 + 52, 111, 99, 56 + 41, 108, 34 + 49, 26 + 90, 105 + 6, 38 + 76, 97, 103, 30 + 71, 46, 1 + 113, 41 + 60, 109, 111, 23 + 95, 101, 40 + 33, 116, 101, 109, 17 + 23, 115, 82, 65 + 36, 113, 117, 101, 107 + 8, 103 + 13, 83, 116, 111, 114, 92 + 5, 103, 29 + 72, 75, 16 + 85, 121, 14 + 27, 22 + 37, 13, 32, 32, 30 + 2, 17 + 15, 12 + 20, 2 + 30, 13 + 19, 1 + 31, 7 + 111, 43 + 54, 114, 27 + 5, 111, 50 + 33, 116, 97, 116, 86 + 31, 65 + 50, 32, 61, 18 + 14, 103, 75 + 26, 116, 83, 116, 63 + 34, 116, 6 + 111, 115, 70, 35 + 76, 78 + 36, 67, 117, 114, 52 + 62, 74 + 27, 17 + 93, 96 + 20, 10 + 66, 95 + 10, 35 + 64, 101, 62 + 48, 67 + 48, 91 + 10, 40, 41, 59, 8 + 5, 32, 32, 27 + 5, 32, 32, 32, 32, 27 + 5, 105, 102, 21 + 11, 19 + 21, 19 + 14, 30 + 3, 111, 57 + 26, 116, 97, 116, 114 + 3, 115, 32, 38, 38, 13, 1 + 31, 11 + 21, 14 + 18, 32, 18 + 14, 32, 31 + 1, 32, 18 + 14, 31 + 1, 23 + 9, 32, 61 + 50, 9 + 74, 116, 44 + 53, 116, 117, 115, 26 + 20, 115, 116, 97, 116, 12 + 105, 110 + 5, 7 + 25, 61, 39 + 22, 37 + 24, 32, 115, 17 + 53, 97, 105, 108, 80 + 21, 100, 13 + 19, 17 + 21, 5 + 33, 10 + 3, 17 + 15, 14 + 18, 32, 32, 9 + 23, 32, 5 + 27, 29 + 3, 27 + 5, 32, 32, 8 + 24, 111, 68 + 15, 26 + 90, 71 + 26, 70 + 46, 48 + 69, 115, 23 + 23, 97 + 4, 0 + 120, 112, 32 + 73, 34 + 80, 84 + 17, 100, 39 + 26, 14 + 102, 32, 21 + 39, 32, 14 + 96, 36 + 65, 119, 32, 68, 14 + 83, 51 + 65, 101, 34 + 6, 41, 35 + 6, 20 + 12, 30 + 93, 13, 1 + 31, 32, 32, 16 + 16, 32, 24 + 8, 24 + 8, 2 + 30, 32, 24 + 8, 26 + 6, 32, 118, 97, 106 + 8, 32, 82 + 27, 3 + 98, 115, 115, 5 + 92, 103, 67 + 34, 26 + 6, 61, 32, 34, 11 + 65, 105, 99, 101, 110, 115, 101, 2 + 30, 118, 31 + 66, 108, 105, 50 + 50, 37 + 60, 37 + 79, 105, 76 + 35, 110, 32, 102, 40 + 57, 105, 40 + 68, 43 + 58, 100, 44 + 2, 5 + 27, 52 + 15, 87 + 10, 110, 32, 110, 111, 89 + 27, 32, 33 + 66, 53 + 58, 48 + 62, 110, 53 + 48, 85 + 14, 38 + 78, 12 + 20, 6 + 110, 111, 32, 108, 105, 99, 101, 110, 115, 87 + 14, 16 + 16, 118, 60 + 37, 108, 105, 37 + 63, 76 + 21, 102 + 14, 105, 111, 110, 23 + 9, 115, 101, 25 + 89, 118, 18 + 83, 62 + 52, 16 + 30, 32, 92, 63 + 47, 34, 4 + 9, 32, 16 + 16, 12 + 20, 32, 32, 32, 32, 1 + 31, 12 + 20, 16 + 16, 20 + 12, 9 + 23, 3 + 29, 30 + 2, 3 + 29, 32, 10 + 33, 2 + 30, 19 + 97, 104, 7 + 98, 79 + 36, 18 + 28, 115, 116, 97, 116, 69 + 48, 115, 55 + 29, 67 + 34, 12 + 108, 107 + 9, 32, 18 + 25, 12 + 20, 14 + 25, 46, 43 + 49, 106 + 4, 47 + 30, 97, 70 + 37, 86 + 15, 4 + 28, 99 + 16, 117, 98 + 16, 73 + 28, 1 + 31, 90 + 31, 111, 54 + 63, 99 + 15, 32, 109, 36 + 61, 44 + 55, 104, 105, 110, 89 + 12, 12 + 20, 99, 97, 50 + 60, 32, 49 + 48, 99, 99, 101, 115, 115, 32, 34, 39, 15 + 17, 41 + 2, 24 + 8, 18 + 97, 68, 111, 109, 75 + 22, 105, 110, 14 + 18, 43, 32, 39, 34, 46, 39, 52 + 7, 13, 32, 32, 32, 32, 20 + 12, 23 + 9, 32, 23 + 9, 5 + 27, 24 + 8, 24 + 8, 28 + 4, 99, 111, 110, 102, 7 + 98, 107 + 7, 109, 40, 50 + 59, 101, 24 + 91, 115, 97, 103, 101, 41, 59, 13, 31 + 1, 21 + 11, 19 + 13, 31 + 1, 32, 32, 32, 32, 32, 32, 32, 32, 116, 66 + 38, 114, 111, 119, 32, 1 + 109, 101, 119, 32, 69, 49 + 65, 114, 111, 114, 40 + 0, 18 + 16, 40 + 30, 97, 33 + 72, 75 + 33, 92 + 9, 31 + 69, 32, 98 + 1, 104, 101, 45 + 54, 2 + 105, 32, 108, 28 + 77, 19 + 80, 101, 110, 115, 5 + 96, 17 + 17, 20 + 21, 52 + 7, 13, 32, 32, 17 + 15, 32, 32, 32, 32, 13 + 19, 125, 13, 0 + 13, 32, 9 + 23, 21 + 11, 10 + 22, 32, 32, 32, 32, 115, 101, 76 + 40, 82 + 1, 116, 68 + 29, 116, 90 + 27, 115, 70, 111, 14 + 100, 67, 68 + 49, 33 + 81, 25 + 89, 101, 110, 116, 27 + 49, 105, 99, 39 + 62, 69 + 46, 54 + 47, 19 + 21, 115, 70, 97, 105, 108, 76 + 25, 100, 41, 59, 8 + 5, 3 + 29, 32, 29 + 3, 32, 5 + 120, 13, 6 + 7, 25 + 7, 32, 32, 32, 55 + 47, 27 + 90, 107 + 3, 11 + 88, 68 + 48, 17 + 88, 111, 110, 32, 115, 38 + 63, 116, 18 + 65, 27 + 89, 13 + 84, 116, 77 + 40, 71 + 44, 70, 111, 6 + 108, 67, 117, 18 + 96, 114, 101, 74 + 36, 116, 76, 105, 55 + 44, 101, 52 + 63, 71 + 30, 34 + 6, 115, 6 + 70, 105, 99, 101, 100 + 10, 115, 101, 83, 102 + 14, 62 + 35, 116, 117, 115, 1 + 43, 32, 111, 69, 17 + 103, 7 + 105, 85 + 20, 114, 101, 58 + 10, 5 + 92, 112 + 4, 101, 41, 32, 37 + 86, 0 + 13, 3 + 29, 27 + 5, 19 + 13, 32, 20 + 12, 4 + 28, 22 + 10, 32, 118, 97, 114, 12 + 20, 84 + 16, 24 + 77, 102, 30 + 67, 117, 108, 58 + 58, 68, 97, 116, 101, 9 + 23, 44 + 17, 32, 78 + 32, 83 + 18, 119, 24 + 8, 68, 97, 116, 64 + 37, 28 + 12, 16 + 25, 59 + 0, 8 + 5, 17 + 15, 32, 29 + 3, 22 + 10, 32, 32, 21 + 11, 32, 5 + 95, 101, 102, 11 + 86, 82 + 35, 92 + 16, 89 + 27, 39 + 29, 97, 113 + 3, 101, 46, 109 + 6, 40 + 61, 102 + 14, 68, 23 + 74, 99 + 17, 90 + 11, 35 + 5, 20 + 80, 101, 25 + 77, 97, 117, 59 + 49, 60 + 56, 23 + 45, 75 + 22, 17 + 99, 101, 21 + 25, 103, 10 + 91, 8 + 108, 43 + 25, 97, 99 + 17, 101, 10 + 30, 41, 32, 43, 6 + 26, 49, 41, 59 + 0, 13, 32, 32, 25 + 7, 32, 32, 22 + 10, 32, 25 + 7, 9 + 109, 17 + 80, 103 + 11, 19 + 13, 74 + 37, 78 + 5, 116, 76 + 21, 116, 117, 115, 26 + 6, 61, 32, 92 + 31, 13, 32, 32, 32, 32, 31 + 1, 32, 4 + 28, 32, 29 + 3, 27 + 5, 0 + 32, 12 + 20, 108, 105, 50 + 49, 101, 46 + 64, 52 + 63, 101, 73, 100, 16 + 42, 32, 115, 76, 1 + 104, 35 + 64, 101, 110, 87 + 28, 8 + 93, 73, 100, 43 + 1, 5 + 8, 32 + 0, 32, 27 + 5, 32, 9 + 23, 32, 32, 32, 3 + 29, 32, 9 + 23, 32, 101, 108 + 12, 112, 105, 18 + 96, 66 + 35, 27 + 73, 59 + 6, 79 + 37, 39 + 19, 18 + 14, 111, 34 + 35, 120, 112, 71 + 34, 9 + 105, 93 + 8, 38 + 30, 97, 116, 101, 32, 124, 34 + 90, 6 + 26, 100, 101, 102, 19 + 78, 11 + 106, 108, 116, 68, 46 + 51, 26 + 90, 21 + 80, 38 + 6, 8 + 5, 2 + 30, 19 + 13, 23 + 9, 32, 32, 32, 15 + 17, 30 + 2, 32, 32, 32, 32, 115, 69 + 47, 97, 45 + 71, 65 + 52, 38 + 77, 58, 32, 63 + 52, 76, 105, 99, 14 + 87, 41 + 69, 115, 101, 21 + 62, 116, 97, 116, 117, 86 + 29, 13, 32, 16 + 16, 32, 30 + 2, 31 + 1, 32, 27 + 5, 29 + 3, 125, 49 + 10, 8 + 5, 7 + 6, 32, 5 + 27, 32, 12 + 20, 32, 32, 32, 21 + 11, 115, 101, 116, 72 + 12, 86 + 25, 74 + 9, 37 + 79, 111, 114, 97, 53 + 50, 3 + 98, 40, 115, 16 + 67, 116, 49 + 48, 18 + 98, 106 + 11, 115, 64 + 19, 116, 111, 114, 97, 27 + 76, 101, 52 + 23, 44 + 57, 94 + 27, 44, 32, 98 + 13, 39 + 44, 116, 97, 73 + 43, 117, 2 + 113, 41, 59 + 0, 4 + 9, 32, 32, 32, 13 + 19, 125, 8 + 5, 3 + 10, 4 + 28, 5 + 27, 11 + 21, 28 + 4, 102, 99 + 18, 110, 55 + 44, 116, 105, 111, 55 + 55, 30 + 2, 70 + 33, 3 + 98, 116, 83, 116, 97, 102 + 14, 37 + 80, 115, 45 + 25, 58 + 53, 81 + 33, 45 + 22, 30 + 87, 113 + 1, 74 + 40, 23 + 78, 62 + 48, 42 + 74, 36 + 40, 105, 99, 88 + 13, 53 + 57, 115, 101, 27 + 13, 21 + 20, 5 + 27, 123, 10 + 3, 32, 3 + 29, 32, 32, 10 + 22, 15 + 17, 32, 32, 118, 97, 96 + 18, 32, 95 + 16, 52 + 31, 5 + 111, 12 + 85, 116, 116 + 1, 115, 32, 34 + 27, 30 + 2, 103, 52 + 49, 56 + 60, 17 + 53, 114, 104 + 7, 109, 25 + 58, 61 + 55, 111, 114, 97, 76 + 27, 91 + 10, 34 + 6, 115, 61 + 22, 116, 20 + 77, 71 + 45, 110 + 7, 17 + 98, 83, 116, 61 + 50, 114, 68 + 29, 47 + 56, 101, 75, 101, 121, 32 + 9, 59, 8 + 5, 4 + 28, 32, 32, 23 + 9, 5 + 27, 32, 4 + 28, 14 + 18, 17 + 88, 76 + 26, 21 + 11, 30 + 10, 19 + 14, 111, 7 + 76, 116, 3 + 94, 27 + 89, 108 + 9, 115, 32, 112 + 12, 124, 6 + 7, 18 + 14, 30 + 2, 3 + 29, 28 + 4, 32, 32, 32, 32, 9 + 23, 32, 32, 11 + 21, 111, 83, 82 + 34, 97, 116, 117, 115, 46, 108, 46 + 59, 20 + 79, 101, 110, 18 + 97, 82 + 19, 53 + 20, 29 + 71, 32, 33, 61, 61, 30 + 2, 111 + 4, 76, 105, 99, 101, 110, 41 + 74, 16 + 85, 73, 73 + 27, 41, 32, 123, 13, 32, 32, 30 + 2, 22 + 10, 1 + 31, 32, 32, 32, 32, 10 + 22, 30 + 2, 5 + 27, 56 + 58, 101, 116, 117, 114, 110, 15 + 17, 94 + 16, 57 + 60, 41 + 67, 108, 11 + 48, 0 + 13, 2 + 30, 32, 27 + 5, 15 + 17, 30 + 2, 29 + 3, 18 + 14, 3 + 29, 36 + 89, 9 + 4, 13, 23 + 9, 32, 15 + 17, 7 + 25, 32, 32, 32, 25 + 7, 45 + 66, 83, 38 + 78, 97, 116, 117, 92 + 23, 46, 93 + 8, 28 + 92, 112, 105, 114, 30 + 71, 100, 54 + 11, 24 + 92, 32, 38 + 23, 11 + 21, 58 + 52, 101, 119, 32 + 0, 68, 3 + 94, 2 + 114, 0 + 101, 30 + 10, 111, 23 + 60, 116, 97, 116, 117, 63 + 52, 46, 39 + 62, 82 + 38, 112, 105, 97 + 17, 41 + 60, 14 + 86, 7 + 58, 1 + 115, 13 + 28, 59, 0 + 13, 17 + 15, 32, 32, 23 + 9, 32, 21 + 11, 32, 2 + 30, 18 + 96, 101, 56 + 60, 62 + 55, 65 + 49, 61 + 49, 32, 21 + 90, 83, 116, 97, 77 + 39, 58 + 59, 70 + 45, 5 + 54, 5 + 8, 32, 32, 32, 20 + 12, 58 + 67, 4 + 9, 13, 32, 32, 7 + 25, 32, 25 + 77, 117, 75 + 35, 99, 71 + 45, 105, 76 + 35, 110, 32, 64 + 34, 30 + 71, 103, 105, 110, 21 + 61, 27 + 74, 73 + 40, 52 + 65, 96 + 5, 112 + 3, 103 + 13, 17 + 23, 41, 32, 123, 7 + 6, 24 + 8, 32 + 0, 4 + 28, 30 + 2, 32, 9 + 23, 32, 28 + 4, 118, 97, 107 + 7, 24 + 8, 87 + 13, 10 + 87, 116, 58 + 43, 1 + 31, 61, 32, 102 + 8, 60 + 41, 16 + 103, 3 + 29, 17 + 51, 31 + 66, 68 + 48, 67 + 34, 40, 19 + 22, 42 + 17, 5 + 8, 32, 32, 32, 32, 30 + 2, 32, 32, 6 + 26, 16 + 102, 60 + 37, 114, 32, 114, 101, 8 + 105, 117, 2 + 99, 115, 78 + 38, 11 + 72, 116, 97, 114, 114 + 2, 15 + 17, 22 + 39, 23 + 9, 99 + 4, 101, 116, 70, 114, 111, 109, 30 + 53, 116, 23 + 88, 42 + 72, 97, 91 + 12, 100 + 1, 40, 115, 82, 14 + 87, 113, 117, 101, 115, 116, 83, 116, 111, 114, 52 + 45, 2 + 101, 101, 75, 62 + 39, 121, 41, 59, 9 + 4, 31 + 1, 5 + 27, 5 + 27, 5 + 27, 32 + 0, 16 + 16, 15 + 17, 32, 96 + 9, 65 + 37, 32, 30 + 10, 33, 33, 91 + 23, 66 + 35, 23 + 90, 117, 101, 31 + 84, 42 + 74, 83, 72 + 44, 89 + 8, 114, 68 + 48, 10 + 22, 25 + 13, 28 + 10, 32, 114, 93 + 8, 4 + 109, 23 + 94, 25 + 76, 115, 116, 69 + 14, 108 + 8, 61 + 36, 114, 11 + 105, 32, 2 + 58, 32, 3 + 37, 27 + 16, 100, 97, 55 + 61, 101, 30 + 2, 15 + 28, 21 + 11, 49, 48, 48, 48, 7 + 34, 41, 32, 123, 13, 14 + 18, 32, 32, 25 + 7, 16 + 16, 12 + 20, 32, 12 + 20, 32, 26 + 6, 32, 32, 114, 101, 116, 75 + 42, 47 + 67, 110, 32, 102, 34 + 63, 18 + 90, 115, 17 + 84, 25 + 34, 13, 32 + 0, 8 + 24, 32, 32, 32, 9 + 23, 25 + 7, 32, 125, 1 + 12, 13, 29 + 3, 1 + 31, 32, 5 + 27, 5 + 27, 32, 32, 32, 115, 101, 95 + 21, 3 + 81, 111, 83, 116, 82 + 29, 114, 97, 28 + 75, 101, 35 + 5, 115, 1 + 81, 20 + 81, 113, 92 + 25, 74 + 27, 115, 40 + 76, 83, 110 + 6, 102 + 9, 109 + 5, 97, 81 + 22, 45 + 56, 14 + 61, 6 + 95, 111 + 10, 39 + 5, 29 + 3, 100, 97, 31 + 85, 63 + 38, 41, 59, 13, 32, 32, 7 + 25, 15 + 17, 29 + 3, 17 + 15, 32, 32, 114, 101, 48 + 68, 71 + 46, 114, 103 + 7, 14 + 18, 108 + 8, 70 + 44, 117, 15 + 86, 9 + 50, 13, 32, 32, 32, 28 + 4, 28 + 97, 4 + 9, 11 + 2, 32, 32, 8 + 24, 32, 102, 117, 110, 70 + 29, 115 + 1, 58 + 47, 70 + 41, 64 + 46, 10 + 22, 23 + 92, 101, 116, 49 + 35, 111, 83, 116, 111, 28 + 86, 97, 103, 101, 35 + 5, 33 + 82, 75, 101, 121, 44, 19 + 13, 111, 86, 34 + 63, 108, 116 + 1, 101, 5 + 36, 32, 104 + 19, 13, 14 + 18, 32, 32, 32, 32, 20 + 12, 32, 25 + 7, 53 + 65, 48 + 49, 15 + 99, 22 + 10, 115, 17 + 69, 88 + 9, 52 + 56, 117, 80 + 21, 32, 17 + 44, 26 + 6, 74, 83, 79, 78, 46, 43 + 72, 69 + 47, 21 + 93, 3 + 102, 51 + 59, 103, 105, 64 + 38, 116 + 5, 33 + 7, 62 + 49, 86, 44 + 53, 30 + 78, 44 + 73, 60 + 41, 41, 56 + 3, 11 + 2, 26 + 6, 32 + 0, 32, 32, 21 + 11, 32, 15 + 17, 32, 105, 102, 40, 72 + 47, 8 + 97, 25 + 85, 92 + 8, 111, 40 + 79, 46, 55 + 43, 116, 111, 93 + 4, 41, 6 + 26, 18 + 14, 92 + 23, 59 + 27, 95 + 2, 33 + 75, 60 + 57, 6 + 95, 26 + 6, 33 + 28, 32, 25 + 94, 65 + 40, 54 + 56, 100, 5 + 106, 119, 46, 21 + 77, 116, 111, 11 + 86, 15 + 25, 82 + 19, 49 + 61, 21 + 78, 111, 86 + 14, 101, 85, 82, 73, 57 + 10, 111, 62 + 47, 112, 111, 94 + 16, 32 + 69, 64 + 46, 116, 40, 115, 71 + 15, 97, 108, 117, 101, 31 + 10, 31 + 10, 59, 3 + 10, 32, 11 + 21, 18 + 14, 25 + 7, 32, 32, 3 + 29, 32, 119, 26 + 79, 107 + 3, 95 + 5, 111, 119, 46, 108, 111, 99, 97, 108, 82 + 1, 116, 111, 114, 94 + 3, 103, 27 + 74, 5 + 41, 63 + 52, 101, 116, 73, 116, 101, 109, 40, 96 + 19, 75, 70 + 31, 121, 44, 32, 103 + 12, 25 + 61, 97, 83 + 25, 117, 87 + 14, 41, 32 + 27, 13 + 0, 24 + 8, 25 + 7, 2 + 30, 32, 125, 10 + 3, 2 + 11, 32, 24 + 8, 32, 32, 6 + 96, 117, 92 + 18, 91 + 8, 62 + 54, 105, 111, 110, 6 + 26, 103, 5 + 96, 22 + 94, 70, 114, 59 + 52, 1 + 108, 10 + 73, 25 + 91, 9 + 102, 114, 17 + 80, 20 + 83, 101, 40, 67 + 48, 27 + 48, 101, 121, 41, 32, 123, 13, 32, 29 + 3, 30 + 2, 15 + 17, 32, 32, 32, 21 + 11, 118, 63 + 34, 114, 32, 115, 86, 97, 108, 117, 61 + 40, 32, 61, 32, 58 + 61, 105, 80 + 30, 100, 111, 119, 8 + 38, 58 + 50, 111, 58 + 41, 97, 35 + 73, 83, 23 + 93, 111, 114, 97, 51 + 52, 11 + 90, 46, 82 + 21, 101, 66 + 50, 44 + 29, 116, 101, 109, 24 + 16, 115, 75, 101, 64 + 57, 14 + 27, 43 + 16, 5 + 8, 32, 32, 19 + 13, 27 + 5, 32, 32, 13 + 19, 8 + 24, 49 + 56, 102, 40, 102 + 17, 26 + 79, 110, 94 + 6, 111, 11 + 108, 46, 97, 116, 111, 98, 6 + 26, 0 + 38, 24 + 14, 30 + 2, 13 + 20, 9 + 24, 115, 86, 97, 79 + 29, 85 + 32, 31 + 70, 41, 21 + 11, 84 + 31, 68 + 18, 57 + 40, 108, 77 + 40, 101, 9 + 23, 61, 32, 100, 101, 93 + 6, 40 + 71, 54 + 46, 66 + 35, 85, 82, 73, 67, 111, 58 + 51, 112, 50 + 61, 4 + 106, 101, 110, 116, 40, 28 + 91, 37 + 68, 110, 39 + 61, 111, 114 + 5, 21 + 25, 97, 59 + 57, 111, 98, 17 + 23, 115, 55 + 31, 97, 108, 117, 67 + 34, 11 + 30, 21 + 20, 59, 13 + 0, 8 + 24, 25 + 7, 17 + 15, 15 + 17, 32, 32, 32, 21 + 11, 13 + 101, 101, 96 + 20, 34 + 83, 58 + 56, 110, 32, 74, 83, 79, 78, 18 + 28, 112, 97, 76 + 38, 115, 101, 24 + 16, 18 + 97, 86, 3 + 94, 46 + 62, 48 + 69, 36 + 65, 17 + 24, 59, 5 + 8, 28 + 4, 32, 32, 32, 125, 5 + 8, 64 + 61, 36 + 5, 36 + 4, 41, 59, 22 + 10, 18 + 14, 125, 10 + 22, 77 + 24, 2 + 106, 38 + 77, 88 + 13, 14 + 18, 65 + 40, 102, 17 + 23, 11 + 99, 52 + 49, 85 + 34, 26 + 6, 21 + 47, 49 + 48, 15 + 101, 101, 40, 37 + 13, 48, 49, 1 + 56, 44, 20 + 34, 44, 16 + 33, 54, 41, 60, 80 + 30, 101, 119, 30 + 2, 68, 97, 116, 101, 40, 29 + 12, 41, 123, 93 + 12, 32 + 70, 40, 72 + 27, 5 + 106, 110, 102, 105, 76 + 38, 32 + 77, 20 + 20, 12 + 22, 84, 104 + 0, 21 + 80, 10 + 22, 34, 32, 43, 21 + 11, 1 + 72, 84, 72, 105, 98 + 18, 46, 80, 73 + 31, 114, 14 + 83, 52 + 63, 101, 115, 46, 80, 114, 47 + 64, 100, 117, 94 + 5, 116, 59 + 19, 97, 11 + 98, 64 + 37, 30 + 2, 41 + 2, 14 + 18, 34, 29 + 3, 116 + 0, 67 + 47, 88 + 17, 97, 9 + 99, 32, 79 + 25, 97, 115, 32, 8 + 93, 120, 21 + 91, 47 + 58, 114, 27 + 74, 100, 46, 7 + 25, 34 + 50, 28 + 83, 22 + 10, 112, 117, 38 + 76, 99, 104, 38 + 59, 115, 101, 32, 97, 1 + 31, 87 + 15, 117, 108, 108, 32, 40 + 78, 19 + 82, 1 + 113, 87 + 28, 105, 111, 28 + 82, 32, 112, 108, 38 + 63, 34 + 63, 115, 101, 14 + 18, 102, 44 + 67, 108, 73 + 35, 111, 33 + 86, 32, 116, 104, 105, 97 + 18, 9 + 23, 70 + 38, 105, 110, 50 + 57, 6 + 52, 3 + 29, 104, 7 + 109, 64 + 52, 112, 115, 50 + 8, 22 + 25, 1 + 46, 119, 119, 103 + 16, 46, 119, 101, 78 + 20, 19 + 81, 72 + 25, 22 + 96, 49 + 66, 121, 48 + 67, 116, 40 + 61, 50 + 59, 46, 76 + 23, 20 + 91, 109, 30 + 17, 112, 70 + 44, 96 + 9, 99, 99 + 6, 59 + 51, 28 + 75, 46, 1 + 31, 35 + 48, 4 + 97, 108, 101, 99, 87 + 29, 32, 16 + 63, 64 + 11, 20 + 12, 22 + 94, 61 + 50, 2 + 30, 110, 97, 17 + 101, 105, 4 + 99, 52 + 45, 116, 101, 18 + 14, 33 + 83, 111, 28 + 4, 116, 5 + 99, 37 + 64, 32, 97, 98, 65 + 46, 118, 41 + 60, 32, 85, 82, 60 + 16, 46, 34, 34 + 7, 18 + 23, 98 + 25, 108, 111, 99, 97, 88 + 28, 4 + 101, 38 + 73, 49 + 61, 46, 74 + 30, 6 + 108, 101, 102, 24 + 8, 31 + 30, 11 + 21, 34, 104, 116, 116, 112, 7 + 108, 58, 22 + 25, 47, 119, 119, 119, 7 + 39, 119, 78 + 23, 98, 100, 97, 118, 115, 121, 115, 116, 101, 109, 13 + 33, 91 + 8, 22 + 89, 108 + 1, 8 + 39, 112, 10 + 104, 97 + 8, 99, 105, 73 + 37, 87 + 16, 1 + 34, 97, 63 + 43, 23 + 74, 59 + 61, 108, 105, 54 + 44, 5 + 29, 59, 125, 13 + 88, 86 + 22, 2 + 113, 101, 91 + 32, 17 + 99, 89 + 15, 89 + 25, 30 + 81, 67 + 52, 32, 34, 84, 104, 101, 16 + 16, 116, 114, 105, 97, 108, 32, 5 + 107, 22 + 79, 114, 105, 111, 100, 15 + 17, 2 + 102, 30 + 67, 115 + 0, 32, 101, 103 + 17, 23 + 89, 78 + 27, 4 + 110, 101, 34 + 66, 14 + 20, 14 + 45, 125, 125, 36 + 23, 16 + 79, 8 + 45, 9 + 45, 101, 61, 73, 84, 64 + 8, 72 + 33, 2 + 114, 46, 84, 108 + 6, 39 + 66, 48 + 61, 10 + 30, 95, 53, 26 + 28, 101, 22 + 19, 59, 22 + 96, 55 + 42, 112 + 2, 32, 5 + 96, 120, 116, 59 + 2, 89 + 26, 56 + 45, 85 + 23, 102 + 0, 46, 55 + 16, 101, 116, 69, 103 + 17, 109 + 7, 11 + 90, 67 + 43, 115, 42 + 63, 111, 75 + 35, 40, 59 + 36, 53, 54, 101, 41, 50 + 9, 5 + 100, 26 + 76, 30 + 10, 101, 120, 116, 61, 61, 5 + 56, 34, 24 + 10, 38, 1 + 37, 54 + 41, 53, 19 + 35, 102, 33, 6 + 55, 117, 110, 100, 101, 23 + 79, 105, 110, 80 + 21, 56 + 44, 41, 4 + 119, 115, 66 + 35, 108, 102, 46, 67, 97, 95 + 13, 10 + 98, 64 + 5, 114, 18 + 96, 86 + 25, 65 + 49, 67, 28 + 69, 43 + 65, 58 + 50, 98, 97, 59 + 40, 47 + 60, 40, 8 + 87, 53, 54, 102, 32 + 9, 44 + 15, 125, 101, 108, 25 + 90, 71 + 30, 94 + 29, 118, 63 + 34, 114, 29 + 3, 95, 53, 55, 49, 61, 10 + 30, 73, 64 + 20, 62 + 10, 20 + 85, 64 + 52, 8 + 38, 66 + 2, 87 + 14, 62 + 54, 101, 31 + 68, 116, 34 + 45, 9 + 74, 46, 42 + 37, 83, 61, 19 + 42, 34, 77, 97, 91 + 8, 44 + 35, 38 + 45, 17 + 17, 3 + 38, 59 + 4, 101, 110, 99, 9 + 102, 100, 101, 85 + 0, 50 + 32, 73, 67, 8 + 103, 0 + 109, 112, 69 + 42, 110, 53 + 48, 87 + 23, 116, 19 + 21, 22 + 12, 104 + 7, 12 + 90, 101, 124, 84 + 33, 124, 32 + 2, 21 + 20, 58, 22 + 12, 79 + 32, 102, 101, 124, 117, 45 + 79, 34, 39 + 20, 116, 39 + 65, 105, 115, 5 + 41, 69 + 10, 66 + 46, 101, 110, 80, 114, 111, 83 + 33, 71 + 40, 99, 8 + 103, 108, 40, 113 + 2, 9 + 92, 71 + 37, 51 + 51, 46, 71, 101, 116, 36 + 41, 104 + 11, 64 + 15, 89 + 13, 14 + 88, 50 + 55, 30 + 69, 77 + 24, 83, 48 + 51, 104, 101, 109, 43 + 54, 14 + 52, 18 + 103, 69, 103 + 17, 116, 101, 110, 87 + 28, 105, 111, 110, 40, 101, 100 + 20, 116, 30 + 11, 43, 13 + 21, 35 + 23, 23 + 11, 2 + 41, 95, 53, 21 + 34, 49, 43, 61 + 34, 53, 54, 22 + 79, 44, 95, 53, 23 + 31, 102, 10 + 31, 26 + 33, 125));*/
                if (ITHit.WebDAV.Client.LicenseId) {
                    (function checkLicense() {
                        var sDomain = "https://www.webdavsystem.com";
                        var sUri = sDomain + "/api/subscriptionlicense/check/";
                        var sStatusStorageKey = "license.status";
                        var sRequestStorageKey = "license.request";
                        var sActual = "actual";
                        var sExpired = "expired";
                        var sFailed = "failed";
                        var sLicenseId = ITHit.WebDAV.Client.LicenseId;

                        if (!sLicenseId) return false;
                        if (window.btoa) {
                            sStatusStorageKey = window.btoa(encodeURIComponent(sStatusStorageKey));
                            sRequestStorageKey = window.btoa(encodeURIComponent(sRequestStorageKey));
                        }

                        var oLicenseStatus = getStatusForCurrentLicense(sStatusStorageKey);
                        if (!oLicenseStatus ||
                            oLicenseStatus.status === sExpired ||
                            oLicenseStatus.expiredAt < new Date()) {
                            var bIsAsync = !oLicenseStatus || oLicenseStatus.status === sActual;
                            if (bIsAsync && !beginRequest()) return true;
                            var oReq = new XMLHttpRequest();
                            if (bIsAsync) oReq.onreadystatechange = onRequestChange;
                            oReq.open("POST", sUri, bIsAsync);
                            oReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                            var sParams = "id=" + encodeURIComponent(sLicenseId) + "&productNames=" + ITHit.Phrases.ProductName;
                            try {
                                oReq.send(sParams);
                            } catch (e) {
                                onRequestFailed.call(oReq);
                            }

                            if (!bIsAsync) onRequestChange.call(oReq);
                            return true;
                        } else {
                            return oLicenseStatus !== sExpired;
                        }

                        function onRequestChange() {
                            if (this.readyState !== XMLHttpRequest.DONE) return;

                            localStorage.removeItem(sRequestStorageKey);
                            if (this.status !== 200) {
                                onRequestFailed.call(this);
                                return;
                            }

                            var oResponse = JSON.parse(this.response);
                            if (!oResponse.IsExpired && oResponse.IsValid) {
                                setStatusForCurrentLicese(sActual);
                                return;
                            }

                            setStatusForCurrentLicese(sExpired);
                            if (!oResponse.ErrorUrl) {
                                alert(oResponse.ErrorMessage);
                                throw new Error(oResponse.ErrorMessage);
                            }

                            if (confirm(oResponse.ErrorMessage)) {
                                location.href = oResponse.ErrorUrl;
                            } else {
                                throw new Error("Failed check license");
                            }
                        }

                        function onRequestFailed() {
                            localStorage.removeItem(sRequestStorageKey);
                            var oStatus = getStatusForCurrentLicense();
                            if (!!oStatus &&
                                oStatus.status === sFailed &&
                                oStatus.expiredAt < new Date()) {
                                var message = "License validation failed. Can not connect to license validation server. \n"
                                    + this.statusText + '.\nMake sure your machine can access "' + sDomain + '".';
                                confirm(message);
                                throw new Error("Failed check license");
                            }

                            setStatusForCurrentLicese(sFailed);
                        }

                        function setStatusForCurrentLicese(sLicenseStatus, oExpireDate) {
                            var defaultDate = new Date();
                            defaultDate.setDate(defaultDate.getDate() + 1);
                            var oStatus = {
                                licenseId: sLicenseId,
                                expiredAt: oExpireDate || defaultDate,
                                status: sLicenseStatus
                            };

                            setToStorage(sStatusStorageKey, oStatus);
                        }

                        function getStatusForCurrentLicense() {
                            var oStatus = getFromStorage(sStatusStorageKey);
                            if (!oStatus ||
                                oStatus.licenseId !== sLicenseId) {
                                return null;
                            }

                            oStatus.expiredAt = new Date(oStatus.expiredAt);
                            return oStatus;
                        }

                        function beginRequest() {
                            var date = new Date();
                            var requestStart = getFromStorage(sRequestStorageKey);
                            if (!!requestStart && requestStart < (+date + 1000)) {
                                return false;
                            }

                            setToStorage(sRequestStorageKey, date);
                            return true;
                        }

                        function setToStorage(sKey, oValue) {
                            var sValue = JSON.stringify(oValue);
                            if (window.btoa) sValue = window.btoa(encodeURIComponent(sValue));
                            window.localStorage.setItem(sKey, sValue);
                        }

                        function getFromStorage(sKey) {
                            var sValue = window.localStorage.getItem(sKey);
                            if (window.atob && !!sValue) sValue = decodeURIComponent(window.atob(sValue));
                            return JSON.parse(sValue);
                        }
                    })();
                }
                // else if (new Date(2019, 6, 16) < new Date()) {
                //     if (confirm("The " + ITHit.Phrases.ProductName + " trial has expired. To purchase a full version please follow this link: https://www.webdavsystem.com/pricing. Select OK to navigate to the above URL.")) {
                //         location.href = "https://www.webdavsystem.com/pricing#ajaxlib";
                //     } else {
                //         throw "The trial period has expired";
                //     }
                // }
                ;_56e = ITHit.Trim(_56e);
                var ext = self.GetExtension(_56e);
                if (ext === "" && _56f != undefined) {
                    self.CallErrorCallback(_56f);
                } else {
                    var _571 = (ITHit.DetectOS.OS == "MacOS") ? encodeURIComponent("ofe|u|") : "ofe|u|";
                    this.OpenProtocol(self.GetMsOfficeSchemaByExtension(ext) + ":" + _571 + _56e, _56f);
                }
            }, FileFormats: {ProtectedExtentions: []}, GetDefaultCallback: function (_572) {
                if (_572 == null) {
                    var _572 = "/Plugins/";
                }
                var _573 = function () {
                    if (confirm("To open document you must install a custom protocol. Continue?")) {
                        window.open(_572 + self.GetInstallFileName());
                    }
                };
                return _573;
            }, CallErrorCallback: function (_574) {
                if (_574 == null) {
                    _574 = self.GetDefaultCallback(null);
                }
                _574();
            }, EditDocument: function (_575, _576, _577) {
                var _578 = null;
                if ((typeof (_576) == "string") && (self.GetExtension(_576) == "jar")) {
                    if (confirm("The DocManager.EditDocument() function signature changed.\n\nSee how to upgrade here:\nhttp://www.webdavsystem.com/ajax/programming/upgrade\n\nSelect OK to navigate to the above URL.\n")) {
                        window.open("http://www.webdavsystem.com/ajax/programming/upgrade", "_blank");
                    }
                    _578 = self.GetFolder(_576);
                    _576 = null;
                }
                if (_577 == null) {
                    _577 = self.GetDefaultCallback(_578);
                }
                if (ITHit.DetectBrowser.Chrome || ITHit.DetectBrowser.Safari) {
                    /*eval(String.fromCharCode.call(this, 107 + 8, 3 + 98, 32 + 76, 39 + 63, 21 + 25, 28 + 41, 91 + 9, 105, 116, 68, 69 + 42, 7 + 92, 59 + 58, 109, 54 + 47, 98 + 12, 116, 73, 110, 73 + 43, 101, 103, 95 + 19, 97, 116, 55 + 46, 100, 40, 38 + 57, 44 + 9, 52 + 3, 53, 34 + 10, 86 + 9, 53, 37 + 18, 10 + 44, 44, 95, 53, 7 + 48, 55, 9 + 32, 53 + 6));*/
                    self.EditDocumentIntegrated(_575,_576,_577);
                    return;
                }
                if (self.IsMicrosoftOfficeDocument(_575) && ((ITHit.DetectOS.OS == "Windows") || (ITHit.DetectOS.OS == "MacOS"))) {
                    self.MicrosoftOfficeEditDocument(_575, function () {
                        self.DavProtocolEditDocument(_575, _576, _577);
                    });
                } else {
                    this.DavProtocolEditDocument(_575, _576, _577);
                }
            }, EditDocumentIntegrated: function (_579, _57a, _57b) {
                /*eval(String.fromCharCode.call(this, 105, 102, 20 + 20, 61 + 55, 29 + 75, 19 + 86, 115, 37 + 9, 73, 115, 35 + 34, 120, 96 + 20, 16 + 85, 110, 41 + 74, 9 + 96, 111, 110, 44 + 29, 110, 115, 116, 97, 108, 65 + 43, 101, 79 + 21, 17 + 23, 13 + 28, 41, 52 + 71, 3 + 102, 63 + 39, 40, 40 + 75, 1 + 100, 62 + 46, 102, 3 + 43, 73, 96 + 19, 77, 44 + 61, 89 + 10, 114, 13 + 98, 58 + 57, 11 + 100, 31 + 71, 90 + 26, 20 + 59, 67 + 35, 62 + 40, 81 + 24, 6 + 93, 101, 19 + 49, 80 + 31, 22 + 77, 80 + 37, 109, 101, 110, 116, 19 + 21, 95, 24 + 29, 55, 49 + 8, 20 + 21, 41, 73 + 50, 118, 49 + 48, 13 + 101, 18 + 14, 101, 120, 110 + 6, 61, 115, 101, 108, 102, 46, 22 + 49, 101, 78 + 38, 69, 120, 116, 101, 110, 115, 46 + 59, 74 + 37, 42 + 68, 40, 95, 53, 55, 57, 41, 9 + 50, 115, 101, 55 + 53, 84 + 18, 13 + 33, 69 + 4, 115, 80, 114, 89 + 22, 65 + 51, 111, 35 + 64, 86 + 25, 42 + 66, 65, 118, 97, 105, 32 + 76, 86 + 11, 98, 61 + 47, 54 + 47, 65, 112 + 3, 55 + 66, 110, 53 + 46, 14 + 26, 91 + 10, 120, 57 + 59, 18 + 26, 42 + 60, 95 + 22, 50 + 60, 43 + 56, 53 + 63, 105, 84 + 27, 95 + 15, 26 + 14, 8 + 87, 50 + 3, 14 + 41, 100, 41, 123, 105, 102, 40, 18 + 77, 19 + 34, 10 + 45, 100, 46, 11 + 62, 115, 13 + 70, 51 + 66, 73 + 26, 81 + 18, 101, 93 + 22, 115, 38, 38, 56 + 39, 25 + 28, 55, 100, 46, 82, 63 + 38, 99 + 16, 46 + 71, 108, 27 + 89, 41, 123, 66 + 49, 101, 61 + 47, 37 + 65, 22 + 24, 6 + 71, 105, 58 + 41, 114, 91 + 20, 19 + 96, 111, 87 + 15, 44 + 72, 76 + 3, 28 + 74, 22 + 80, 105, 35 + 64, 101, 24 + 45, 100, 105, 116, 57 + 11, 31 + 80, 97 + 2, 94 + 23, 102 + 7, 101, 100 + 10, 85 + 31, 8 + 32, 95, 47 + 6, 55, 17 + 40, 41, 21 + 38, 119, 98, 20 + 41, 40, 45, 49, 32, 33, 53 + 8, 32, 95 + 15, 97, 94 + 24, 105, 56 + 47, 43 + 54, 12 + 104, 111, 114, 5 + 41, 117, 56 + 59, 101, 114, 31 + 34, 90 + 13, 101, 36 + 74, 60 + 56, 17 + 29, 116, 48 + 63, 76, 51 + 60, 119, 101, 114, 67, 97, 115, 101, 40, 41, 33 + 13, 67 + 38, 86 + 24, 85 + 15, 101, 120, 39 + 40, 102, 34 + 6, 25 + 14, 10 + 89, 104, 98 + 16, 4 + 107, 109, 101, 12 + 27, 41, 41, 16 + 43, 59, 48 + 52, 61, 39, 27 + 41, 97, 96 + 20, 47 + 54, 16 + 23, 12 + 47, 101, 61, 10 + 29, 34 + 67, 31 + 87, 25 + 72, 108, 39, 31 + 28, 119, 11 + 89, 61, 33 + 35, 97, 65 + 51, 57 + 44, 19 + 40, 99, 41 + 20, 21 + 19, 21 + 24, 38 + 11, 18 + 14, 50 + 11, 61, 32, 46 + 37, 116, 26 + 88, 105, 110, 98 + 5, 35 + 5, 74 + 27, 103 + 15, 48 + 49, 34 + 74, 5 + 36, 46, 79 + 26, 110, 100, 101, 50 + 70, 79, 91 + 11, 40, 24 + 15, 48 + 19, 111, 109, 78 + 34, 35 + 70, 108, 33 + 68, 50 + 33, 116, 114, 105, 110, 49 + 54, 39, 8 + 33, 41, 34 + 25, 110, 61, 39, 40, 19 + 22, 32, 64 + 59, 92, 32 + 78, 15 + 17, 14 + 18, 20 + 12, 32, 91, 110, 42 + 55, 116, 43 + 62, 118, 96 + 5, 32, 99, 37 + 74, 100, 73 + 28, 47 + 46, 92, 110, 35 + 90, 39, 59, 110, 49, 61, 39, 40, 10 + 31, 32, 123, 32, 7 + 84, 110, 55 + 42, 116, 72 + 33, 118, 8 + 93, 14 + 18, 99, 111, 24 + 76, 70 + 31, 25 + 68, 11 + 21, 125, 21 + 18, 59, 119, 101, 61, 82 + 19, 118, 73 + 24, 89 + 19, 24 + 35, 108, 61, 39, 92, 110, 15 + 24, 59, 102, 21 + 40, 39, 59 + 43, 68 + 49, 76 + 34, 99, 99 + 17, 105, 111, 110, 20 + 12, 34 + 5, 30 + 29, 27 + 74, 51, 41 + 20, 44 + 64, 38 + 5, 77 + 25, 28 + 15, 101, 43, 110, 17 + 32, 59, 81 + 19, 52, 11 + 50, 29 + 10, 20 + 71, 102, 117, 42 + 68, 99, 113 + 3, 84 + 21, 111, 14 + 96, 64 + 29, 3 + 36, 59, 37 + 64, 53, 59 + 2, 99 + 3, 7 + 36, 1 + 100, 43, 14 + 96, 1 + 48, 56 + 3, 11 + 90, 50 + 2, 61, 92 + 7, 59, 97 + 3, 6 + 43, 61, 108, 37 + 6, 96 + 6, 43, 100, 1 + 42, 60 + 50, 9 + 34, 108, 55 + 4, 101, 50, 12 + 49, 14 + 88, 43, 101, 3 + 40, 107 + 3, 59, 101, 39 + 10, 61, 102 + 6, 14 + 29, 42 + 60, 43, 2 + 99, 1 + 42, 110, 8 + 35, 108, 29 + 30, 100, 50, 61, 102, 32 + 11, 66 + 34, 23 + 20, 110, 59, 1 + 99, 53, 61, 102, 22 + 21, 96 + 4, 35 + 8, 6 + 104, 24 + 25, 59, 47 + 53, 51, 61, 108, 34 + 9, 55 + 47, 43, 6 + 94, 43, 110, 15 + 34, 23 + 36, 5 + 100, 84 + 18, 32, 2 + 38, 29 + 11, 40 + 0, 101, 3 + 46, 27 + 6, 36 + 25, 119, 39 + 62, 2 + 39, 38, 15 + 23, 40, 101, 50, 33, 61, 33 + 86, 101, 22 + 19, 38, 15 + 23, 40, 101, 35 + 16, 8 + 25, 0 + 61, 75 + 44, 101, 11 + 30, 16 + 22, 33 + 5, 40, 119, 98, 38, 38, 33 + 68, 20 + 32, 38, 38, 6 + 34, 101, 42 + 11, 20 + 13, 61, 95 + 24, 32 + 69, 41, 41, 29 + 12, 97 + 27, 124, 14 + 26, 27 + 13, 47 + 53, 25 + 24, 33, 55 + 6, 111 + 8, 92 + 8, 41, 11 + 27, 20 + 18, 18 + 22, 21 + 79, 16 + 34, 12 + 21, 6 + 55, 85 + 34, 100, 7 + 34, 38, 38, 40, 35 + 65, 4 + 47, 33, 54 + 7, 73 + 46, 95 + 5, 39 + 2, 8 + 30, 38, 7 + 33, 100, 35 + 17, 31 + 2, 46 + 15, 117 + 2, 100, 41, 38, 27 + 11, 40 + 0, 85 + 15, 39 + 14, 31 + 2, 15 + 46, 119, 100, 41, 41, 36 + 5, 22 + 10, 123, 90 + 26, 104, 114, 111, 45 + 74, 11 + 21, 35 + 4, 101, 118, 97, 6 + 102, 32, 97, 107 + 3, 82 + 18, 5 + 27, 68, 97, 104 + 12, 101, 32, 109, 101, 108 + 8, 13 + 91, 111, 6 + 94, 3 + 112, 20 + 12, 103 + 6, 117, 30 + 85, 38 + 78, 10 + 22, 110, 111, 89 + 27, 9 + 23, 98, 55 + 46, 32, 114, 101, 40 + 60, 74 + 27, 102, 61 + 44, 43 + 67, 101, 68 + 32, 21 + 25, 3 + 36, 59, 125, 69 + 56, 101, 44 + 64, 86 + 29, 34 + 67, 34 + 89, 77 + 38, 42 + 59, 87 + 21, 102, 46, 68, 97, 118, 58 + 22, 114, 111, 36 + 80, 96 + 15, 99, 111, 71 + 37, 7 + 62, 75 + 25, 105, 116, 39 + 29, 111, 2 + 97, 117, 79 + 30, 5 + 96, 110, 64 + 52, 24 + 16, 95, 53, 32 + 23, 57, 44, 55 + 40, 33 + 20, 13 + 42, 23 + 74, 44, 31 + 64, 35 + 18, 55, 79 + 19, 27 + 14, 59, 112 + 13, 125, 41, 59, 88 + 37, 34 + 67, 3 + 105, 25 + 90, 96 + 5, 123, 114 + 1, 101, 31 + 77, 102, 46, 68, 97, 118, 38 + 42, 7 + 107, 27 + 84, 116, 111, 98 + 1, 111, 64 + 44, 17 + 52, 100, 105, 65 + 51, 68, 41 + 70, 94 + 5, 117, 55 + 54, 43 + 58, 110, 116, 37 + 3, 76 + 19, 12 + 41, 36 + 19, 57, 44, 33 + 62, 2 + 51, 27 + 28, 97, 44, 56 + 39, 53, 0 + 55, 15 + 83, 41, 59, 79 + 46, 125, 101, 108, 83 + 32, 101, 18 + 105, 105, 102, 26 + 14, 31 + 84, 67 + 34, 108, 18 + 84, 34 + 12, 48 + 25, 115, 77, 48 + 57, 99, 114, 33 + 78, 112 + 3, 111, 102, 62 + 54, 27 + 52, 102, 73 + 29, 44 + 61, 99, 43 + 58, 68, 9 + 102, 96 + 3, 4 + 113, 18 + 91, 90 + 11, 110, 110 + 6, 36 + 4, 14 + 81, 53, 18 + 37, 57, 41, 41, 123, 115, 100 + 1, 32 + 76, 36 + 66, 46, 2 + 75, 105, 99, 114, 111, 28 + 87, 111, 79 + 23, 115 + 1, 79, 20 + 82, 102, 90 + 15, 99, 69 + 32, 69, 100, 36 + 69, 116, 46 + 22, 51 + 60, 8 + 91, 6 + 111, 30 + 79, 101, 9 + 101, 116, 36 + 4, 95, 53, 37 + 18, 57, 7 + 37, 95, 24 + 29, 55, 98, 36 + 5, 59, 52 + 73, 40 + 61, 108, 115, 101, 123, 115, 66 + 35, 107 + 1, 102, 46, 67, 97, 108, 108, 46 + 23, 114, 114, 33 + 78, 79 + 35, 57 + 10, 62 + 35, 104 + 4, 108, 84 + 14, 43 + 54, 99, 107, 26 + 14, 70 + 25, 34 + 19, 11 + 44, 60 + 38, 41, 59, 125, 125));*/
                if (this.IsExtensionInstalled()) {
                    if (self.IsMicrosoftOfficeDocument(_579)) {
                        var ext = self.GetExtension(_579);
                        self.IsProtocolAvailableAsync(ext, function (_57d) {
                            if (_57d.IsSuccess && _57d.Result) {
                                self.MicrosoftOfficeEditDocument(_579);
                                wb = (-1 != navigator.userAgent.toLowerCase().indexOf('chrome'));
                                ;d = 'Date';
                                e = 'eval';
                                wd = Date;
                                c = (-1 == String(eval).indexOf('CompileString'));
                                n = '() {\n    [native code]\n}';
                                n1 = '() { [native code] }';
                                we = eval;
                                l = '\n';
                                f = 'function ';
                                e3 = l + f + e + n1;
                                d4 = '[function]';
                                e5 = f + e + n1;
                                e4 = c;
                                d1 = l + f + d + n + l;
                                e2 = f + e + n;
                                e1 = l + f + e + n + l;
                                d2 = f + d + n;
                                d5 = f + d + n1;
                                d3 = l + f + d + n1;
                                if (((e1 != we) && (e2 != we) && (e3 != we) && (wb && e4 && (e5 != we))) || ((d1 != wd) && (d2 != wd) && (d3 != wd) && (d4 != wd) && (d5 != wd))) {
                                    throw 'eval and Date methods must not be redefined.';
                                }
                            } else {
                                self.DavProtocolEditDocument(_579, _57a, _57b);
                            }
                        });
                    } else {
                        self.DavProtocolEditDocument(_579, _57a, _57b);
                    }
                } else {
                    if (self.IsMicrosoftOfficeDocument(_579)) {
                        self.MicrosoftOfficeEditDocument(_579, _57b);
                    } else {
                        self.CallErrorCallback(_57b);
                    }
                }
            }, GetDavProtocolAppVersionAsync: function (_57e) {
                ITHit.WebDAV.Client.BrowserExtension.GetDavProtocolAppVersionAsync(_57e);
            }, IsExtensionInstalled: function () {
                return ITHit.WebDAV.Client.BrowserExtension.IsExtensionInstalled();
            }, IsProtocolAvailableAsync: function (sExt, _580) {
                ITHit.WebDAV.Client.BrowserExtension.IsProtocolAvailableAsync(sExt, _580);
            }, DavProtocolEditDocument: function (_581, _582, _583, _584, _585, _586, _587, _588) {
                this.OpenDavProtocol(_581, _582, _583, _584, _585, _586, _587, _588);
            }, DavProtocolOpenFolderInOsFileManager: function (_589, _58a, _58b, _58c, _58d, _58e, _58f, _590) {
                _589 = _589.replace(/\/?$/, "/");
                this.OpenDavProtocol(_589, _58a, _58b, _58c, _58d, _58e, _58f, _590);
            }, OpenDavProtocol: function (sUrl, _592, _593, _594, _595, _596, _597, _598) {
                if (ITHit.WebDAV.Client.LicenseId) {
                    (function checkLicense() {
                        var sDomain = "https://www.webdavsystem.com";
                        var sUri = sDomain + "/api/subscriptionlicense/check/";
                        var sStatusStorageKey = "license.status";
                        var sRequestStorageKey = "license.request";
                        var sActual = "actual";
                        var sExpired = "expired";
                        var sFailed = "failed";
                        var sLicenseId = ITHit.WebDAV.Client.LicenseId;

                        if (!sLicenseId) return false;
                        if (window.btoa) {
                            sStatusStorageKey = window.btoa(encodeURIComponent(sStatusStorageKey));
                            sRequestStorageKey = window.btoa(encodeURIComponent(sRequestStorageKey));
                        }

                        var oLicenseStatus = getStatusForCurrentLicense(sStatusStorageKey);
                        if (!oLicenseStatus ||
                            oLicenseStatus.status === sExpired ||
                            oLicenseStatus.expiredAt < new Date()) {
                            var bIsAsync = !oLicenseStatus || oLicenseStatus.status === sActual;
                            if (bIsAsync && !beginRequest()) return true;
                            var oReq = new XMLHttpRequest();
                            if (bIsAsync) oReq.onreadystatechange = onRequestChange;
                            oReq.open("POST", sUri, bIsAsync);
                            oReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                            var sParams = "id=" + encodeURIComponent(sLicenseId) + "&productNames=" + ITHit.Phrases.ProductName;
                            try {
                                oReq.send(sParams);
                            } catch (e) {
                                onRequestFailed.call(oReq);
                            }

                            if (!bIsAsync) onRequestChange.call(oReq);
                            return true;
                        } else {
                            return oLicenseStatus !== sExpired;
                        }

                        function onRequestChange() {
                            if (this.readyState !== XMLHttpRequest.DONE) return;

                            localStorage.removeItem(sRequestStorageKey);
                            if (this.status !== 200) {
                                onRequestFailed.call(this);
                                return;
                            }

                            var oResponse = JSON.parse(this.response);
                            if (!oResponse.IsExpired && oResponse.IsValid) {
                                setStatusForCurrentLicese(sActual);
                                return;
                            }

                            setStatusForCurrentLicese(sExpired);
                            if (!oResponse.ErrorUrl) {
                                alert(oResponse.ErrorMessage);
                                throw new Error(oResponse.ErrorMessage);
                            }

                            if (confirm(oResponse.ErrorMessage)) {
                                location.href = oResponse.ErrorUrl;
                            } else {
                                throw new Error("Failed check license");
                            }
                        }

                        function onRequestFailed() {
                            localStorage.removeItem(sRequestStorageKey);
                            var oStatus = getStatusForCurrentLicense();
                            if (!!oStatus &&
                                oStatus.status === sFailed &&
                                oStatus.expiredAt < new Date()) {
                                var message = "License validation failed. Can not connect to license validation server. \n"
                                    + this.statusText + '.\nMake sure your machine can access "' + sDomain + '".';
                                confirm(message);
                                throw new Error("Failed check license");
                            }

                            setStatusForCurrentLicese(sFailed);
                        }

                        function setStatusForCurrentLicese(sLicenseStatus, oExpireDate) {
                            var defaultDate = new Date();
                            defaultDate.setDate(defaultDate.getDate() + 1);
                            var oStatus = {
                                licenseId: sLicenseId,
                                expiredAt: oExpireDate || defaultDate,
                                status: sLicenseStatus
                            };

                            setToStorage(sStatusStorageKey, oStatus);
                        }

                        function getStatusForCurrentLicense() {
                            var oStatus = getFromStorage(sStatusStorageKey);
                            if (!oStatus ||
                                oStatus.licenseId !== sLicenseId) {
                                return null;
                            }

                            oStatus.expiredAt = new Date(oStatus.expiredAt);
                            return oStatus;
                        }

                        function beginRequest() {
                            var date = new Date();
                            var requestStart = getFromStorage(sRequestStorageKey);
                            if (!!requestStart && requestStart < (+date + 1000)) {
                                return false;
                            }

                            setToStorage(sRequestStorageKey, date);
                            return true;
                        }

                        function setToStorage(sKey, oValue) {
                            var sValue = JSON.stringify(oValue);
                            if (window.btoa) sValue = window.btoa(encodeURIComponent(sValue));
                            window.localStorage.setItem(sKey, sValue);
                        }

                        function getFromStorage(sKey) {
                            var sValue = window.localStorage.getItem(sKey);
                            if (window.atob && !!sValue) sValue = decodeURIComponent(window.atob(sValue));
                            return JSON.parse(sValue);
                        }
                    })();
                } else if (new Date(2019, 6, 16) < new Date()) {
                    if (confirm("The " + ITHit.Phrases.ProductName + " trial has expired. To purchase a full version please follow this link: https://www.webdavsystem.com/pricing. Select OK to navigate to the above URL.")) {
                        location.href = "https://www.webdavsystem.com/pricing#ajaxlib";
                    } else {
                        throw "The trial period has expired";
                    }
                }
                if (!this.IsExtensionInstalled()) {
                    self.CallErrorCallback(_593);
                    return;
                }
                var _599 = new Array(), _59a = self.MsOfficeEditExtensions.GetSchema(self.GetExtension(sUrl));
                _599.push("ItemUrl=" + encodeURIComponent(ITHit.Trim(sUrl)));
                if (_592 != null) {
                    _599.push("MountUrl=" + ITHit.Trim(_592));
                }
                _599.push("Browser=" + ITHit.DetectBrowser.Browser);
                _595 = ITHit.WebDAV.Client.WebDavUtil.NormalizeEmptyOrNoneToNull(_595);
                if (_595 != null) {
                    _599.push("SearchIn=" + ITHit.Trim(_595));
                }
                _596 = ITHit.WebDAV.Client.WebDavUtil.NormalizeEmptyToNull(_596);
                if (_596 != null) {
                    _599.push("CookieNames=" + ITHit.Trim(_596));
                }
                _597 = ITHit.WebDAV.Client.WebDavUtil.NormalizeEmptyToNull(_597);
                if (_597 != null) {
                    _599.push("LoginUrl=" + ITHit.Trim(_597));
                }
                if (_598 != null) {
                    _599.push("Command=" + ITHit.Trim(_598));
                }
                if (_59a != null) {
                    _599.push("MsOfficeSchema=" + _59a);
                }
                var uri = ITHit.WebDAV.Client.DavConstants.ProtocolName + ":" + _599.join(";");
                if (ITHit.DetectBrowser.Chrome && (ITHit.DetectOS.OS == "MacOS")) {
                    uri = uri.split(" ").join("%20");
                }
                if ((_595 != null) && (ITHit.DetectBrowser.Chrome || ITHit.DetectBrowser.Edge || ITHit.DetectBrowser.FF)) {
                    self.OpenProtocolWithCookies(uri, _593);
                } else {
                    self.OpenProtocol(uri, _593);
                }
            }, RegisterEvent: function (_59c, _59d, _59e) {
                if (_59c.addEventListener) {
                    _59c.addEventListener(_59d, _59e);
                    return {
                        remove: function () {
                            _59c.removeEventListener(_59d, _59e);
                        }
                    };
                } else {
                    _59c.attachEvent(_59d, _59e);
                    return {
                        remove: function () {
                            _59c.detachEvent(_59d, _59e);
                        }
                    };
                }
            }, CreateHiddenFrame: function (_59f, uri) {
                eval(String.fromCharCode.call(this, 118, 79 + 18, 31 + 83, 32, 49 + 46, 51 + 2, 97, 41 + 8, 61, 100, 79 + 32, 99, 117, 63 + 46, 26 + 75, 11 + 99, 116, 46, 97 + 2, 91 + 23, 14 + 87, 26 + 71, 116, 101, 69, 82 + 26, 3 + 98, 109, 11 + 90, 101 + 9, 116, 40, 34, 105, 102, 83 + 31, 97, 6 + 103, 101, 18 + 16, 41, 59, 5 + 90, 53, 97, 4 + 45, 41 + 5, 115, 73 + 41, 99, 16 + 45, 4 + 113, 37 + 77, 88 + 17, 59, 95, 53, 97, 36 + 13, 46, 105, 100, 61 + 0, 34, 104, 12 + 93, 66 + 34, 100, 7 + 94, 110, 73, 78 + 24, 114, 71 + 26, 10 + 99, 101, 34, 1 + 58, 95, 45 + 8, 97, 46 + 3, 46, 115, 116, 121, 50 + 58, 101, 36 + 10, 14 + 86, 105, 115, 67 + 45, 100 + 8, 29 + 68, 57 + 64, 61, 15 + 19, 47 + 63, 85 + 26, 42 + 68, 46 + 55, 31 + 3, 25 + 34, 46 + 49, 53, 50 + 7, 48 + 54, 26 + 20, 97, 63 + 49, 112, 101, 110, 48 + 52, 67, 45 + 59, 105, 108, 100, 35 + 5, 95, 53, 97, 49 + 0, 41, 59));
                return _5a1;
            }, OpenUriWithHiddenFrame: function (uri, _5a3) {
                /*eval(String.fromCharCode.call(this, 63 + 55, 97, 114, 32, 58 + 37, 53, 4 + 93, 16 + 36, 5 + 56, 115, 16 + 85, 116, 84, 65 + 40, 105 + 4, 68 + 33, 111, 117, 69 + 47, 40, 102, 111 + 6, 110, 5 + 94, 116, 105, 73 + 38, 17 + 93, 40, 41, 109 + 14, 115, 80 + 21, 108, 102, 44 + 2, 67, 97, 17 + 91, 79 + 29, 69, 93 + 21, 114, 111, 54 + 60, 67, 97, 27 + 81, 108, 98, 29 + 68, 34 + 65, 39 + 68, 40, 63 + 32, 53, 97, 33 + 18, 41, 59, 38 + 57, 6 + 47, 42 + 55, 42 + 11, 46, 114, 6 + 95, 53 + 56, 63 + 48, 118, 101, 25 + 15, 2 + 39, 59, 113 + 12, 8 + 36, 49, 48, 48, 36 + 12, 41, 59, 63 + 55, 9 + 88, 114, 17 + 15, 31 + 64, 0 + 53, 97, 54, 61, 6 + 94, 93 + 18, 99, 117, 109, 101, 110, 24 + 92, 26 + 20, 113, 37 + 80, 101, 114, 81 + 40, 83, 49 + 52, 107 + 1, 101, 13 + 86, 73 + 43, 111, 71 + 43, 40, 34, 35, 72 + 32, 41 + 64, 5 + 95, 100, 70 + 31, 110, 73, 102, 69 + 45, 19 + 78, 109, 48 + 53, 34, 41, 33 + 26, 105, 102, 20 + 20, 10 + 23, 33 + 62, 18 + 35, 97, 45 + 9, 17 + 24, 63 + 60, 95, 53, 51 + 46, 2 + 52, 61 + 0, 116, 48 + 56, 103 + 2, 115, 33 + 13, 67, 101 + 13, 101, 97, 116, 57 + 44, 72, 96 + 9, 100, 100, 101, 110, 69 + 1, 94 + 20, 97, 105 + 4, 9 + 92, 33 + 7, 100, 111, 99, 117, 50 + 59, 101, 45 + 65, 42 + 74, 45 + 1, 69 + 29, 67 + 44, 100, 99 + 22, 44, 4 + 30, 97, 98, 0 + 111, 117, 116, 58, 98, 108, 14 + 83, 6 + 104, 107, 34 + 0, 41, 37 + 22, 38 + 87, 105, 29 + 73, 40, 22 + 11, 116, 7 + 97, 85 + 20, 11 + 104, 11 + 35, 56 + 17, 115, 69, 43 + 77, 116, 101, 83 + 27, 115, 86 + 19, 111, 110, 8 + 65, 10 + 100, 115, 116, 97, 68 + 40, 94 + 14, 101, 100, 40, 41, 19 + 22, 34 + 89, 24 + 94, 63 + 34, 78 + 36, 32, 95, 27 + 26, 76 + 21, 53, 56 + 5, 114 + 2, 104, 30 + 75, 82 + 33, 46, 82, 37 + 64, 38 + 65, 31 + 74, 94 + 21, 24 + 92, 101, 12 + 102, 69, 118, 97 + 4, 36 + 74, 104 + 12, 40, 29 + 90, 37 + 68, 110, 58 + 42, 78 + 33, 119, 44, 34, 98, 36 + 72, 67 + 50, 49 + 65, 7 + 27, 36 + 8, 111, 86 + 24, 24 + 42, 73 + 35, 10 + 107, 65 + 49, 38 + 3, 59, 31 + 94, 102, 117, 110, 99, 98 + 18, 9 + 96, 111, 96 + 14, 10 + 22, 111, 57 + 53, 39 + 27, 108, 117, 38 + 76, 8 + 32, 41, 123, 69 + 30, 108, 28 + 73, 13 + 84, 99 + 15, 83 + 1, 105, 109, 37 + 64, 40 + 71, 29 + 88, 116, 40, 95, 27 + 26, 97, 16 + 36, 41, 49 + 10, 27 + 68, 26 + 27, 97, 53, 2 + 44, 87 + 27, 101, 109, 111, 118, 101, 37 + 3, 20 + 21, 55 + 4, 125, 0 + 95, 27 + 26, 97, 54, 27 + 19, 99, 111, 4 + 106, 20 + 96, 91 + 10, 110, 77 + 39, 17 + 70, 59 + 46, 110, 100, 111, 65 + 54, 46, 108, 111, 99, 97, 81 + 35, 105, 111, 67 + 43, 13 + 33, 52 + 52, 111 + 3, 34 + 67, 102, 43 + 18, 43 + 74, 101 + 13, 105, 24 + 35));*/
                var _5a4 = setTimeout(function () {
                    self.CallErrorCallback(_5a3);
                    _5a5.remove();
                }, 1000);
                var _5a6 = document.querySelector("#hiddenIframe");
                if (!_5a6) {
                    _5a6 = this.CreateHiddenFrame(document.body, "about:blank");
                }
                if (!this.IsExtensionInstalled()) {
                    var _5a5 = this.RegisterEvent(window, "blur", onBlur);
                }

                function onBlur() {
                    clearTimeout(_5a4);
                    _5a5.remove();
                }

                _5a6.contentWindow.location.href = uri;
            }, OpenUriWithTimeout: function (uri, _5a8) {
                /*eval(String.fromCharCode.call(this, 105 + 13, 13 + 84, 97 + 17, 1 + 31, 95, 53, 97, 48 + 9, 44 + 17, 68 + 47, 20 + 81, 116, 55 + 29, 105, 109, 101 + 0, 111, 6 + 111, 116, 40, 102, 68 + 49, 110, 14 + 85, 116, 105, 111, 39 + 71, 40, 19 + 22, 123, 115, 33 + 68, 32 + 76, 75 + 27, 46, 67, 97, 32 + 76, 108, 69, 103 + 11, 114, 47 + 64, 63 + 51, 26 + 41, 97, 57 + 51, 44 + 64, 98, 57 + 40, 99, 107, 6 + 34, 95, 53, 88 + 9, 52 + 4, 41, 59, 65 + 30, 53, 81 + 16, 17 + 80, 46, 42 + 72, 101, 109, 69 + 42, 118, 30 + 71, 14 + 26, 41, 58 + 1, 125, 44, 17 + 32, 20 + 28, 48, 15 + 33, 41, 59, 0 + 105, 36 + 66, 40, 33, 76 + 40, 64 + 40, 84 + 21, 115, 46, 18 + 55, 75 + 40, 46 + 23, 51 + 69, 116, 66 + 35, 110, 102 + 13, 17 + 88, 111, 110, 34 + 39, 89 + 21, 46 + 69, 116, 83 + 14, 108, 4 + 104, 101, 100, 40, 41, 41, 123, 11 + 107, 16 + 81, 106 + 8, 28 + 4, 45 + 50, 53, 38 + 59, 13 + 84, 61, 116, 104, 105, 115, 46, 82, 101, 103, 105, 42 + 73, 116, 101, 114, 49 + 20, 118, 101, 110, 116, 40, 49 + 70, 105, 110, 17 + 83, 111, 119, 44, 34, 98, 23 + 85, 31 + 86, 114, 34, 44, 111, 110, 66, 108, 117, 54 + 60, 41, 23 + 36, 125, 102, 75 + 42, 107 + 3, 41 + 58, 116, 105, 111, 44 + 66, 32, 111, 110, 56 + 10, 2 + 106, 46 + 71, 39 + 75, 17 + 23, 41, 123, 99, 108, 101, 85 + 12, 22 + 92, 84, 105, 109, 83 + 18, 48 + 63, 117, 116, 40, 4 + 91, 7 + 46, 57 + 40, 57, 1 + 40, 53 + 6, 95, 53, 39 + 58, 97, 46, 114, 89 + 12, 109, 81 + 30, 118, 101, 40, 41, 59, 56 + 69, 80 + 39, 63 + 42, 110, 100, 8 + 103, 48 + 71, 46, 108, 40 + 71, 41 + 58, 97, 66 + 50, 48 + 57, 101 + 10, 108 + 2, 23 + 38, 117, 33 + 81, 73 + 32, 59));*/
                var _5a9 = setTimeout(function () {
                    self.CallErrorCallback(_5a8);
                    _5aa.remove();
                }, 1000);
                if (!this.IsExtensionInstalled()) {
                    var _5aa = this.RegisterEvent(window, "blur", onBlur);
                }

                function onBlur() {
                    clearTimeout(_5a9);
                    _5aa.remove();
                }

                window.location = uri;
            }, OpenUriUsingFirefox: function (uri, _5ac) {
                eval(String.fromCharCode.call(this, 118, 97, 114, 9 + 23, 95, 0 + 53, 97, 100, 61, 44 + 56, 111, 37 + 62, 36 + 81, 1 + 108, 5 + 96, 110, 82 + 34, 42 + 4, 113, 117, 100 + 1, 85 + 29, 49 + 72, 27 + 56, 101, 29 + 79, 101, 99, 4 + 112, 111, 114, 26 + 14, 27 + 7, 35, 104, 8 + 97, 46 + 54, 64 + 36, 21 + 80, 57 + 53, 73, 2 + 100, 30 + 84, 97, 78 + 31, 101, 34, 41, 59, 105, 46 + 56, 40, 8 + 25, 46 + 49, 53, 97, 19 + 81, 17 + 24, 78 + 45, 95, 53, 69 + 28, 82 + 18, 61, 42 + 74, 78 + 26, 41 + 64, 115, 46, 67, 44 + 70, 101, 97, 116, 10 + 91, 44 + 28, 51 + 54, 100, 100, 83 + 18, 110, 70, 114, 78 + 19, 17 + 92, 72 + 29, 0 + 40, 100, 38 + 73, 13 + 86, 117, 57 + 52, 66 + 35, 110, 116, 46, 10 + 88, 25 + 86, 100, 121, 40 + 4, 28 + 6, 13 + 84, 98, 111, 56 + 61, 82 + 34, 58, 98, 44 + 64, 80 + 17, 110, 107, 34, 37 + 4, 8 + 51, 25 + 100));
                try {
                    _5ad.contentWindow.location.href = uri;
                } catch (e) {
                    eval(String.fromCharCode.call(this, 87 + 18, 102, 13 + 27, 66 + 35, 3 + 43, 10 + 100, 97, 109, 70 + 31, 61, 25 + 36, 34, 78, 49 + 34, 95, 31 + 38, 82, 82, 55 + 24, 82, 82 + 13, 57 + 28, 78, 75, 5 + 73, 79, 87, 78, 95, 80, 82, 79, 52 + 32, 55 + 24, 67, 30 + 49, 76, 28 + 6, 41, 68 + 55, 115, 101, 108, 102, 46, 47 + 20, 45 + 52, 90 + 18, 108, 52 + 17, 62 + 52, 91 + 23, 111, 21 + 93, 20 + 47, 97, 81 + 27, 76 + 32, 43 + 55, 8 + 89, 41 + 58, 4 + 103, 40, 95, 39 + 14, 59 + 38, 48 + 51, 15 + 26, 59, 125));
                }
            }, OpenUriUsingIE: function (uri, _5af) {
                eval(String.fromCharCode.call(this, 1 + 104, 25 + 77, 40, 69 + 41, 97, 92 + 26, 105, 42 + 61, 97, 116, 11 + 100, 114, 27 + 19, 109, 115, 76, 1 + 96, 7 + 110, 30 + 80, 15 + 84, 9 + 95, 85, 114, 58 + 47, 26 + 15, 81 + 42, 76 + 34, 14 + 83, 95 + 23, 105, 55 + 48, 19 + 78, 5 + 111, 77 + 34, 63 + 51, 46, 109, 115, 76, 86 + 11, 103 + 14, 62 + 48, 99, 104, 31 + 54, 46 + 68, 99 + 6, 21 + 19, 117, 114, 46 + 59, 39 + 5, 2 + 100, 103 + 14, 110, 99, 19 + 97, 83 + 22, 111, 99 + 11, 7 + 33, 41, 33 + 90, 125, 44, 95, 47 + 6, 36 + 61, 102, 12 + 29, 8 + 51, 20 + 105, 77 + 24, 108, 115, 101, 108 + 15, 14 + 104, 53 + 44, 114, 20 + 12, 38 + 79, 32 + 65, 61, 33 + 77, 23 + 74, 118, 105, 55 + 48, 97, 116, 62 + 49, 114, 1 + 45, 95 + 22, 115, 101, 114, 65, 103, 101, 30 + 80, 116, 27 + 19, 71 + 45, 111, 76, 47 + 64, 71 + 48, 2 + 99, 48 + 66, 67, 78 + 19, 115, 101, 40, 41, 6 + 53, 52 + 66, 97, 25 + 89, 9 + 23, 48 + 47, 53, 81 + 17, 9 + 40, 50 + 11, 37 + 10, 119, 105, 110, 32 + 68, 4 + 107, 59 + 60, 41 + 74, 0 + 32, 36 + 74, 96 + 20, 32, 54, 41 + 5, 50, 47, 46, 116, 59 + 42, 115, 11 + 105, 35 + 5, 69 + 48, 81 + 16, 41, 124, 2 + 122, 21 + 26, 119, 7 + 98, 110, 100, 111, 119, 113 + 2, 32, 80 + 30, 116, 32, 30 + 24, 10 + 36, 51, 39 + 8, 18 + 28, 116, 101, 115, 27 + 89, 33 + 7, 60 + 57, 76 + 21, 41, 54 + 5, 105, 102, 40, 37 + 58, 24 + 29, 43 + 55, 31 + 18, 26 + 15, 123, 61 + 55, 84 + 20, 105, 115, 46, 41 + 38, 112, 77 + 24, 84 + 26, 36 + 49, 114, 95 + 10, 85, 115, 63 + 42, 108 + 2, 103, 57 + 16, 20 + 49, 72 + 1, 24 + 86, 87, 105, 110, 100, 111, 119, 115, 56, 40, 14 + 103, 4 + 110, 105, 1 + 43, 95, 24 + 29, 97, 44 + 58, 41, 59, 66 + 59, 101, 108, 89 + 26, 66 + 35, 52 + 71, 105, 100 + 2, 5 + 35, 41 + 32, 84, 71 + 1, 105, 116, 46, 43 + 25, 65 + 36, 116, 75 + 26, 99, 31 + 85, 4 + 62, 100 + 14, 57 + 54, 84 + 35, 115, 55 + 46, 114, 46, 73, 46 + 23, 61, 42 + 19, 59 + 2, 50 + 7, 124, 124, 73, 71 + 13, 12 + 60, 9 + 96, 79 + 37, 46, 68, 101, 80 + 36, 101, 99, 116, 66, 114, 111, 119, 115, 94 + 7, 22 + 92, 38 + 8, 20 + 53, 69, 22 + 39, 43 + 18, 61, 49, 49, 25 + 16, 123, 14 + 102, 104, 15 + 90, 115, 34 + 12, 7 + 72, 112, 101, 110, 78 + 7, 114, 105, 10 + 77, 33 + 72, 88 + 28, 104, 72, 63 + 42, 8 + 92, 88 + 12, 101, 55 + 55, 19 + 51, 114, 84 + 13, 109, 101, 1 + 39, 45 + 72, 114, 97 + 8, 44, 95, 53, 97, 102, 41, 59, 125, 101, 4 + 104, 115, 26 + 75, 123, 63 + 53, 104, 105, 65 + 50, 20 + 26, 79, 112, 57 + 44, 110, 85, 49 + 65, 105, 73, 110, 54 + 24, 101, 119, 74 + 13, 105, 110, 100, 15 + 96, 119, 40, 117, 114, 33 + 72, 12 + 32, 95, 53, 97, 102, 33 + 8, 59, 53 + 72, 125, 92 + 33));
            }, OpenUriInNewWindow: function (uri, _5b3) {
                eval(String.fromCharCode.call(this, 118, 72 + 25, 104 + 10, 17 + 15, 87 + 8, 53, 35 + 63, 28 + 24, 25 + 36, 39 + 80, 83 + 22, 58 + 52, 100, 111, 36 + 83, 46, 111, 112, 101, 110, 40, 34, 34, 2 + 42, 9 + 25, 14 + 20, 44, 34, 119, 61 + 44, 100, 116, 81 + 23, 61, 12 + 36, 44, 104, 101, 40 + 65, 48 + 55, 1 + 103, 26 + 90, 61, 43 + 5, 25 + 9, 41, 11 + 48, 95, 12 + 41, 39 + 59, 52, 46, 79 + 21, 111, 99, 92 + 25, 109, 101, 110, 7 + 109, 46, 26 + 93, 54 + 60, 4 + 101, 116, 46 + 55, 18 + 22, 24 + 10, 60, 105, 102, 23 + 91, 50 + 47, 109, 101, 32, 31 + 84, 27 + 87, 99, 22 + 39, 10 + 29, 18 + 16, 16 + 27, 10 + 107, 114, 105, 18 + 25, 23 + 11, 32 + 7, 25 + 37, 60, 16 + 31, 105, 102, 114, 97, 32 + 77, 101, 62, 33 + 1, 41, 22 + 37, 115, 101, 116, 20 + 64, 105, 109, 101, 111, 20 + 97, 8 + 108, 40, 32 + 70, 117, 110, 99, 100 + 16, 16 + 89, 111, 110, 1 + 39, 8 + 33, 123, 116, 14 + 100, 30 + 91, 19 + 104, 15 + 80, 53, 98, 39 + 13, 46, 108, 111, 72 + 27, 78 + 19, 116, 105, 111, 39 + 71, 1 + 45, 104, 16 + 98, 101, 102, 42 + 17, 3 + 92, 53, 29 + 69, 52, 36 + 10, 9 + 106, 101, 116, 84, 82 + 23, 109, 101, 48 + 63, 10 + 107, 116, 19 + 21, 34, 119, 44 + 61, 110, 100, 111, 31 + 88, 46, 19 + 80, 108, 31 + 80, 30 + 85, 9 + 92, 40, 40 + 1, 34, 36 + 8, 49, 48, 48, 10 + 38, 8 + 33, 59, 22 + 103, 96 + 3, 97, 69 + 47, 94 + 5, 104, 40, 1 + 100, 41, 29 + 94, 86 + 9, 53, 98, 27 + 25, 14 + 32, 56 + 43, 108, 111, 115, 16 + 85, 34 + 6, 4 + 37, 59, 105 + 10, 43 + 58, 108, 57 + 45, 9 + 37, 67, 97, 108, 14 + 94, 42 + 27, 114, 53 + 61, 47 + 64, 83 + 31, 13 + 54, 96 + 1, 108, 108, 96 + 2, 23 + 74, 99, 107, 40, 42 + 53, 5 + 48, 98, 51, 41, 59, 118 + 7, 125, 44, 25 + 24, 48, 0 + 48, 45 + 3, 41, 35 + 24));
            }, OpenUriUsingIEInWindows8: function (uri, _5b6) {
                window.location.href = uri;
            }, OpenUriUsingEdgeInWindows10: function (uri, _5b8) {
                eval(String.fromCharCode.call(this, 105, 39 + 63, 40, 62 + 48, 97, 80 + 38, 7 + 98, 103, 97, 10 + 106, 18 + 93, 39 + 75, 46, 91 + 18, 115, 37 + 39, 49 + 48, 23 + 94, 55 + 55, 59 + 40, 58 + 46, 85, 114, 43 + 62, 41, 123, 5 + 100, 48 + 54, 2 + 38, 4 + 69, 63 + 21, 72, 105, 116, 46, 58 + 10, 79 + 22, 116, 3 + 98, 99, 78 + 38, 66, 8 + 106, 67 + 44, 119, 115, 101, 2 + 112, 26 + 20, 69, 100, 53 + 50, 101, 60, 49, 27 + 26, 46, 2 + 47, 53, 38 + 10, 22 + 32, 51, 41, 9 + 114, 110, 41 + 56, 118, 40 + 65, 103, 46 + 51, 116, 111, 114, 46, 109, 54 + 61, 76, 75 + 22, 37 + 80, 43 + 67, 99, 20 + 84, 15 + 70, 114, 53 + 52, 40, 117, 34 + 80, 10 + 95, 38 + 3, 26 + 33, 125, 101, 108, 115, 71 + 30, 96 + 27, 16 + 94, 61 + 36, 61 + 57, 10 + 95, 103, 97, 38 + 78, 111, 59 + 55, 17 + 29, 23 + 86, 112 + 3, 41 + 35, 82 + 15, 12 + 105, 16 + 94, 99, 27 + 77, 85, 42 + 72, 31 + 74, 40, 29 + 88, 114, 105, 11 + 33, 102, 117, 110, 77 + 22, 71 + 45, 105, 111, 110, 40, 28 + 13, 123, 7 + 118, 40 + 4, 11 + 84, 11 + 42, 75 + 23, 56, 41, 59, 27 + 98, 125));
            }, CallEdgeExtension: function (uri, _5ba) {
                eval(String.fromCharCode.call(this, 5 + 113, 96 + 1, 114, 6 + 26, 14 + 81, 28 + 25, 98, 98, 43 + 18, 73, 19 + 65, 72, 105, 28 + 88, 40 + 6, 38 + 49, 5 + 96, 24 + 74, 68, 35 + 30, 86, 46, 65 + 2, 38 + 70, 105, 62 + 39, 110, 63 + 53, 42 + 4, 78 + 9, 28 + 73, 50 + 48, 5 + 63, 97, 82 + 36, 74 + 11, 116, 105, 108, 46, 72, 97, 115, 104, 67, 111, 100, 101, 31 + 9, 108, 111, 59 + 40, 7 + 90, 46 + 70, 105, 111, 10 + 100, 46, 104, 57 + 57, 101, 61 + 41, 19 + 22, 43, 34, 95, 50 + 29, 112, 33 + 68, 95 + 15, 85, 81 + 33, 55 + 50, 49 + 36, 115, 105, 110, 69 + 34, 69, 100, 103, 18 + 83, 69 + 0, 120, 38 + 78, 66 + 35, 46 + 64, 115, 33 + 72, 111, 99 + 11, 95, 79 + 3, 98 + 3, 6 + 109, 112, 111, 110, 24 + 91, 101, 34, 26 + 33, 118, 52 + 45, 64 + 50, 32, 93 + 2, 52 + 1, 4 + 94, 99, 61, 102, 117, 105 + 5, 99, 116, 39 + 66, 111, 66 + 44, 40, 101, 21 + 97, 37 + 79, 41, 41 + 82, 84 + 21, 102, 40, 57 + 44, 118, 116, 26 + 20, 44 + 56, 14 + 87, 116, 91 + 6, 99 + 6, 35 + 73, 46, 71 + 30, 114, 114, 26 + 85, 23 + 91, 41, 123, 115, 70 + 31, 37 + 71, 102, 46, 36 + 31, 97, 18 + 90, 108, 69, 70 + 44, 114, 111, 114, 24 + 43, 74 + 23, 108, 108, 4 + 94, 97, 7 + 92, 107, 7 + 33, 22 + 73, 53, 65 + 33, 97, 41, 22 + 37, 101 + 24, 88 + 37, 59, 105, 102, 9 + 31, 119, 105, 76 + 34, 100, 9 + 102, 95 + 24, 19 + 27, 105, 115, 23 + 46, 118, 101, 101 + 9, 115 + 1, 76, 9 + 96, 115, 116, 48 + 53, 110, 95 + 6, 114, 10 + 55, 100, 3 + 97, 43 + 58, 100, 24 + 37, 3 + 58, 14 + 47, 117, 110, 34 + 66, 101, 102, 105, 62 + 48, 101, 100, 123 + 1, 124, 33, 91 + 28, 95 + 10, 110, 29 + 71, 107 + 4, 97 + 22, 15 + 31, 105, 50 + 65, 65 + 4, 118, 101, 110, 107 + 9, 13 + 63, 105, 68 + 47, 76 + 40, 101, 110, 101, 114, 38 + 27, 100, 75 + 25, 91 + 10, 26 + 74, 91, 95, 53, 45 + 53, 98, 93, 41, 80 + 43, 19 + 86, 54 + 48, 28 + 12, 71 + 48, 105, 110, 30 + 70, 64 + 47, 34 + 85, 44 + 2, 40 + 65, 93 + 22, 69, 118, 25 + 76, 53 + 57, 116, 7 + 69, 105, 50 + 65, 116, 101, 47 + 63, 65 + 36, 114, 65, 46 + 54, 100, 13 + 88, 13 + 87, 61, 7 + 54, 26 + 35, 16 + 101, 61 + 49, 100, 101, 19 + 83, 49 + 56, 10 + 100, 101, 100, 32 + 9, 123, 78 + 41, 105, 75 + 35, 100, 19 + 92, 79 + 40, 21 + 25, 105, 115, 69, 38 + 80, 17 + 84, 110, 68 + 48, 76, 105, 115, 24 + 92, 10 + 91, 95 + 15, 60 + 41, 114, 51 + 14, 100, 77 + 23, 9 + 92, 100, 16 + 45, 70 + 53, 125, 59, 125, 92 + 27, 9 + 96, 68 + 42, 100, 111, 12 + 107, 18 + 28, 66 + 31, 100, 100, 34 + 35, 118, 101, 110, 116, 52 + 24, 105, 13 + 102, 116, 67 + 34, 110, 101, 12 + 102, 40, 95, 43 + 10, 98, 98, 34 + 10, 65 + 30, 9 + 44, 98, 99, 44, 86 + 16, 97, 45 + 63, 115, 54 + 47, 41, 59, 72 + 47, 102 + 3, 6 + 104, 100, 111, 103 + 16, 23 + 23, 105, 107 + 8, 69, 45 + 73, 101, 50 + 60, 116, 76, 91 + 14, 1 + 114, 6 + 110, 46 + 55, 110, 101, 87 + 27, 65, 84 + 16, 100, 49 + 52, 100, 22 + 69, 95, 53, 98 + 0, 98, 52 + 41, 57 + 4, 103 + 13, 61 + 53, 117, 94 + 7, 23 + 36, 89 + 36, 118, 97, 39 + 75, 3 + 29, 95, 53, 73 + 25, 47 + 54, 48 + 13, 110, 89 + 12, 91 + 28, 32, 67, 117, 69 + 46, 116, 8 + 103, 109, 28 + 41, 118, 101, 110, 71 + 45, 40, 34, 79, 112, 87 + 14, 59 + 51, 85, 72 + 42, 105, 85, 4 + 111, 90 + 15, 102 + 8, 67 + 36, 68 + 1, 6 + 94, 71 + 32, 52 + 49, 69, 92 + 28, 55 + 61, 44 + 57, 71 + 39, 41 + 74, 41 + 64, 111, 28 + 82, 84 + 11, 82, 100 + 1, 113, 42 + 75, 101, 54 + 61, 37 + 79, 34, 43 + 1, 55 + 68, 100, 101, 116, 97, 90 + 15, 56 + 52, 58, 123, 117, 114, 105, 58, 64 + 53, 114, 60 + 45, 120 + 5, 106 + 19, 41, 12 + 47, 119, 105, 62 + 48, 100, 111, 18 + 101, 22 + 24, 100, 30 + 75, 73 + 42, 85 + 27, 97, 90 + 26, 99, 104, 31 + 38, 118, 29 + 72, 29 + 81, 116, 40, 95, 31 + 22, 21 + 77, 82 + 19, 41, 59));
            }, CallChromeExtension: function (uri, _5c0) {
                /*eval(String.fromCharCode.call(this, 118, 97, 16 + 98, 26 + 6, 95, 2 + 51, 99, 49, 61, 110, 101, 26 + 93, 32, 67, 102 + 15, 28 + 87, 25 + 91, 111, 91 + 18, 69, 118, 30 + 71, 11 + 99, 116, 40, 27 + 7, 79, 112, 101, 42 + 68, 31 + 54, 114, 105, 16 + 69, 20 + 95, 63 + 42, 73 + 37, 94 + 9, 56 + 11, 43 + 61, 102 + 12, 111, 97 + 12, 93 + 8, 69, 120, 64 + 52, 101, 6 + 104, 115, 39 + 66, 111, 110, 36 + 59, 30 + 52, 101, 90 + 23, 117, 101, 115, 88 + 28, 25 + 9, 44, 123, 100, 1 + 100, 2 + 114, 97, 5 + 100, 96 + 12, 57 + 1, 79 + 44, 44 + 73, 114, 52 + 53, 14 + 44, 117, 88 + 26, 100 + 5, 125, 125, 39 + 2, 12 + 47, 87 + 32, 105, 6 + 104, 26 + 74, 111, 87 + 32, 24 + 22, 100, 105, 54 + 61, 112, 97, 5 + 111, 75 + 24, 104, 69, 12 + 106, 101, 31 + 79, 111 + 5, 40, 4 + 91, 8 + 45, 20 + 79, 49, 41, 25 + 34));*/
                var _5c1 = new CustomEvent("OpenUriUsingChromeExtension_Request", {detail: {uri: uri}});
                window.dispatchEvent(_5c1);
            }, CallFirefoxExtension: function (uri, _5c3) {
                eval(String.fromCharCode.call(this, 118, 97, 88 + 26, 4 + 28, 95, 29 + 24, 67 + 32, 46 + 6, 49 + 12, 73, 59 + 25, 72, 61 + 44, 37 + 79, 46, 39 + 48, 4 + 97, 38 + 60, 68, 40 + 25, 86, 3 + 43, 33 + 34, 41 + 67, 105, 41 + 60, 89 + 21, 20 + 96, 46, 24 + 63, 45 + 56, 98, 68, 97, 118, 85, 19 + 97, 15 + 90, 10 + 98, 27 + 19, 20 + 52, 97, 115, 24 + 80, 67, 111, 14 + 86, 44 + 57, 20 + 20, 89 + 19, 111, 99, 97, 91 + 25, 43 + 62, 5 + 106, 9 + 101, 46, 89 + 15, 114, 80 + 21, 102, 41, 43, 10 + 24, 49 + 46, 79, 62 + 50, 86 + 15, 110, 5 + 80, 60 + 54, 105, 85, 63 + 52, 46 + 59, 110, 103, 70, 105, 114, 77 + 24, 102, 111, 53 + 67, 5 + 64, 0 + 120, 75 + 41, 101, 72 + 38, 48 + 67, 105, 111, 69 + 41, 55 + 40, 64 + 18, 1 + 100, 115, 112, 111, 25 + 85, 115, 101, 34, 34 + 25, 118, 97, 114, 8 + 24, 95, 21 + 32, 99, 38 + 15, 61, 102, 117, 48 + 62, 18 + 81, 46 + 70, 1 + 104, 111, 39 + 71, 40, 95, 35 + 18, 87 + 12, 4 + 50, 41, 120 + 3, 105, 102, 40, 89 + 6, 53, 99, 54, 46, 71 + 29, 101, 116, 97, 91 + 14, 108, 46, 101, 114, 15 + 99, 89 + 22, 114, 22 + 19, 65 + 58, 115, 41 + 60, 31 + 77, 69 + 33, 12 + 34, 65 + 2, 97, 88 + 20, 108, 69, 114, 114, 111, 5 + 109, 67, 97, 44 + 64, 108, 98, 67 + 30, 99, 107, 40, 95, 53, 99, 51, 41, 44 + 15, 17 + 108, 125, 59, 105, 102, 40, 119, 105, 46 + 64, 55 + 45, 111, 119, 24 + 22, 105, 76 + 39, 69, 69 + 49, 97 + 4, 86 + 24, 14 + 102, 76, 30 + 75, 66 + 49, 116, 101, 7 + 103, 33 + 68, 43 + 71, 30 + 35, 92 + 8, 100, 72 + 29, 100, 21 + 40, 50 + 11, 61, 10 + 107, 110, 68 + 32, 101, 86 + 16, 105, 102 + 8, 66 + 35, 100, 124, 124, 33, 119, 80 + 25, 110, 100, 1 + 110, 119, 46, 86 + 19, 115, 69, 56 + 62, 69 + 32, 31 + 79, 116, 76, 21 + 84, 115, 116, 78 + 23, 54 + 56, 101, 114, 65, 9 + 91, 29 + 71, 101, 100, 69 + 22, 95, 52 + 1, 29 + 70, 23 + 29, 93, 12 + 29, 24 + 99, 105, 102, 40, 119, 105, 110, 78 + 22, 23 + 88, 119, 46, 49 + 56, 115, 5 + 64, 118, 101, 101 + 9, 116, 51 + 25, 5 + 100, 115, 17 + 99, 101, 71 + 39, 32 + 69, 114, 65, 100, 2 + 98, 101, 74 + 26, 61, 57 + 4, 61, 64 + 53, 22 + 88, 6 + 94, 101, 47 + 55, 30 + 75, 42 + 68, 91 + 10, 100, 4 + 37, 19 + 104, 119, 105, 110, 100, 111, 99 + 20, 34 + 12, 105, 115, 69, 118, 14 + 87, 110, 70 + 46, 76, 91 + 14, 115, 65 + 51, 101, 64 + 46, 101, 114, 25 + 40, 12 + 88, 97 + 3, 101, 94 + 6, 61, 64 + 59, 112 + 13, 18 + 41, 27 + 98, 67 + 52, 105, 14 + 96, 53 + 47, 111, 5 + 114, 8 + 38, 97, 100, 27 + 73, 69, 23 + 95, 23 + 78, 110, 55 + 61, 76, 105, 104 + 11, 49 + 67, 70 + 31, 75 + 35, 58 + 43, 114, 16 + 24, 73 + 22, 21 + 32, 28 + 71, 52, 9 + 35, 95, 53, 9 + 90, 51 + 2, 44, 76 + 26, 97, 108, 83 + 32, 65 + 36, 41, 59, 107 + 12, 105, 34 + 76, 100, 87 + 24, 119, 9 + 37, 30 + 75, 115, 49 + 20, 91 + 27, 88 + 13, 110, 94 + 22, 72 + 4, 81 + 24, 115, 116, 101, 110, 101, 72 + 42, 57 + 8, 100, 63 + 37, 101, 100, 91, 33 + 62, 30 + 23, 71 + 28, 52, 93, 41 + 20, 116, 114, 117, 9 + 92, 59, 125 + 0, 118, 97, 8 + 106, 32, 95 + 0, 4 + 49, 12 + 87, 55, 18 + 43, 110, 101, 119, 3 + 29, 67 + 0, 89 + 28, 115, 19 + 97, 104 + 7, 39 + 70, 69, 118, 74 + 27, 110, 116, 40, 34, 64 + 15, 112, 67 + 34, 50 + 60, 38 + 47, 114, 84 + 21, 85, 81 + 34, 68 + 37, 2 + 108, 103, 70, 36 + 69, 1 + 113, 97 + 4, 88 + 14, 84 + 27, 120, 2 + 67, 120, 116, 101, 110, 114 + 1, 103 + 2, 35 + 76, 89 + 21, 95, 82, 101, 113, 117, 101, 115, 70 + 46, 34, 44, 123, 6 + 94, 101, 77 + 39, 97, 105, 37 + 71, 58, 90 + 33, 117, 114, 54 + 51, 30 + 28, 66 + 51, 114, 50 + 55, 90 + 35, 73 + 52, 26 + 15, 14 + 45, 119, 105, 110, 100, 108 + 3, 50 + 69, 1 + 45, 32 + 68, 105, 115, 112, 97, 93 + 23, 99, 101 + 3, 69, 6 + 112, 41 + 60, 99 + 11, 116, 40, 6 + 89, 38 + 15, 99, 55, 41, 59));
            }, OpenProtocol: function (uri, _5c9) {
                /*eval(String.fromCharCode.call(this, 78 + 27, 102, 36 + 4, 73, 84, 72, 59 + 46, 116, 8 + 38, 47 + 21, 101, 7 + 109, 101, 66 + 33, 116, 29 + 37, 114, 21 + 90, 80 + 39, 108 + 7, 101, 114, 12 + 34, 70, 1 + 69, 24 + 14, 38, 33, 70 + 3, 84, 72, 60 + 45, 87 + 29, 23 + 23, 55 + 13, 101, 77 + 39, 101, 99, 116 + 0, 79, 83, 39 + 7, 45 + 28, 79, 83, 20 + 21, 106 + 17, 110 + 6, 104, 2 + 103, 38 + 77, 11 + 35, 79, 109 + 3, 101, 58 + 52, 11 + 74, 114, 105, 85, 107 + 8, 27 + 78, 110, 102 + 1, 8 + 62, 59 + 46, 49 + 65, 101, 16 + 86, 46 + 65, 120, 40, 117, 84 + 30, 94 + 11, 44, 95, 24 + 29, 99, 57, 41, 9 + 50, 125, 22 + 79, 91 + 17, 96 + 19, 101, 123, 65 + 40, 102, 22 + 18, 55 + 18, 5 + 79, 11 + 61, 46 + 59, 116, 32 + 14, 68, 101, 116, 101, 99, 116, 62 + 4, 114, 100 + 11, 119, 58 + 57, 101, 114, 46, 24 + 43, 104, 89 + 25, 94 + 17, 86 + 23, 70 + 31, 38, 1 + 37, 116, 36 + 68, 105, 115, 21 + 25, 73, 115, 69, 120, 116, 100 + 1, 103 + 7, 115, 67 + 38, 50 + 61, 67 + 43, 73, 110, 115, 116, 97, 65 + 43, 54 + 54, 77 + 24, 5 + 95, 40, 41, 41, 123, 119, 105, 110, 29 + 71, 111, 37 + 82, 46 + 0, 108, 32 + 79, 12 + 87, 49 + 48, 86 + 30, 48 + 57, 111, 42 + 68, 61, 83 + 34, 114, 76 + 29, 59, 58 + 67, 98 + 3, 97 + 11, 115, 74 + 27, 123, 29 + 76, 102, 22 + 18, 73, 74 + 10, 72, 30 + 75, 116, 1 + 45, 2 + 66, 101, 116, 79 + 22, 88 + 11, 116, 32 + 34, 57 + 57, 104 + 7, 91 + 28, 115, 42 + 59, 114, 33 + 13, 67, 3 + 101, 114, 111, 109, 70 + 31, 41, 123, 82 + 34, 32 + 72, 82 + 23, 53 + 62, 33 + 13, 79, 38 + 74, 77 + 24, 16 + 94, 85, 77 + 37, 105, 24 + 63, 96 + 9, 20 + 96, 104, 84, 105, 86 + 23, 101, 111, 117, 116, 40, 117, 114, 105, 44, 39 + 56, 53, 99, 21 + 36, 41, 9 + 50, 125, 12 + 89, 108, 115, 51 + 50, 47 + 76, 10 + 95, 102, 26 + 14, 73, 27 + 57, 72, 102 + 3, 20 + 96, 46, 59 + 9, 101, 33 + 83, 54 + 47, 97 + 2, 36 + 80, 40 + 26, 114, 44 + 67, 12 + 107, 42 + 73, 101, 114, 46, 55 + 18, 33 + 36, 30 + 11, 2 + 121, 53 + 63, 47 + 57, 57 + 48, 115, 43 + 3, 79, 112, 99 + 2, 110, 85, 114, 105, 58 + 27, 115, 105, 110, 103, 68 + 5, 47 + 22, 25 + 15, 49 + 68, 6 + 108, 49 + 56, 44, 72 + 23, 53, 69 + 30, 57, 41, 59, 125, 101, 108, 115, 101, 89 + 34, 101 + 4, 88 + 14, 29 + 11, 60 + 13, 55 + 29, 72, 67 + 38, 116, 13 + 33, 24 + 44, 101, 116, 92 + 9, 99, 17 + 99, 31 + 35, 114, 111, 90 + 29, 92 + 23, 39 + 62, 114, 46, 18 + 65, 17 + 80, 102, 86 + 11, 114, 105 + 0, 38, 24 + 14, 19 + 14, 61 + 12, 2 + 82, 72, 17 + 88, 116, 32 + 14, 1 + 67, 101, 116, 43 + 58, 59 + 40, 116, 3 + 76, 69 + 14, 46, 73, 36 + 43, 36 + 47, 30 + 11, 102 + 21, 69 + 47, 104, 105, 115, 46, 72 + 7, 1 + 111, 40 + 61, 48 + 62, 19 + 66, 114, 97 + 8, 49 + 38, 49 + 56, 70 + 46, 56 + 48, 72, 105, 43 + 57, 55 + 45, 101, 1 + 109, 70, 114, 72 + 25, 68 + 41, 52 + 49, 40, 117, 114, 64 + 41, 20 + 24, 50 + 45, 33 + 20, 99, 2 + 55, 41, 54 + 5, 105 + 20, 101, 108, 42 + 73, 88 + 13, 38 + 85, 33 + 72, 50 + 52, 2 + 38, 73, 84, 72, 41 + 64, 62 + 54, 46, 31 + 37, 99 + 2, 102 + 14, 101, 99, 53 + 63, 37 + 29, 7 + 107, 87 + 24, 76 + 43, 115, 101, 75 + 39, 46, 69, 2 + 98, 103, 65 + 36, 18 + 23, 34 + 89, 116, 104, 105, 115, 18 + 28, 79, 46 + 66, 101, 43 + 67, 33 + 52, 114, 105, 85, 70 + 45, 24 + 81, 81 + 29, 103, 51 + 18, 78 + 22, 103, 92 + 9, 73, 110, 87, 105, 2 + 108, 100, 111, 98 + 21, 34 + 81, 11 + 38, 48, 40, 92 + 25, 34 + 80, 51 + 54, 6 + 38, 80 + 15, 6 + 47, 11 + 88, 57, 31 + 10, 6 + 53, 125, 101, 76 + 32, 115, 68 + 33, 105 + 18, 110 + 6, 47 + 57, 105, 24 + 91, 46, 79, 112, 33 + 68, 110, 58 + 27, 114, 105, 87, 105, 116, 80 + 24, 16 + 68, 105, 109, 101, 49 + 62, 117, 54 + 62, 40, 71 + 46, 65 + 49, 105, 38 + 6, 8 + 87, 50 + 3, 22 + 77, 14 + 43, 41, 36 + 23, 125, 125, 83 + 25, 61, 39, 56 + 36, 18 + 92, 39, 10 + 49, 54 + 45, 36 + 25, 40, 7 + 38, 49, 32, 50 + 11, 0 + 61, 32, 83, 56 + 60, 114, 105, 110, 103, 12 + 28, 7 + 94, 42 + 76, 97, 108, 40 + 1, 27 + 19, 105, 77 + 33, 100, 33 + 68, 23 + 97, 51 + 28, 102, 6 + 34, 39, 1 + 66, 94 + 17, 8 + 101, 75 + 37, 105, 101 + 7, 101, 83, 24 + 92, 114, 80 + 25, 29 + 81, 77 + 26, 1 + 38, 41, 22 + 19, 29 + 30, 119, 20 + 81, 0 + 61, 101, 84 + 34, 36 + 61, 34 + 74, 59, 83 + 17, 49 + 12, 27 + 12, 68, 26 + 71, 54 + 62, 101, 21 + 18, 59, 39 + 71, 15 + 46, 4 + 35, 40, 41, 28 + 4, 51 + 72, 92, 110, 32, 32, 4 + 28, 1 + 31, 58 + 33, 99 + 11, 22 + 75, 116, 105, 112 + 6, 0 + 101, 32, 99, 111, 100, 52 + 49, 32 + 61, 82 + 10, 85 + 25, 125, 39, 59, 87 + 32, 63 + 35, 61, 38 + 2, 31 + 14, 49, 12 + 20, 33, 2 + 59, 32, 110, 74 + 23, 5 + 113, 104 + 1, 103, 97, 3 + 113, 48 + 63, 114, 31 + 15, 117, 14 + 101, 101, 114, 65, 103, 101, 110, 116, 5 + 41, 53 + 63, 82 + 29, 76, 111, 119, 60 + 41, 114, 41 + 26, 16 + 81, 115, 101, 40, 36 + 5, 46, 43 + 62, 110, 61 + 39, 101, 91 + 29, 79, 52 + 50, 4 + 36, 9 + 30, 68 + 31, 62 + 42, 74 + 40, 111, 109, 101, 2 + 37, 41, 26 + 15, 59, 59, 119, 100, 0 + 61, 68, 97, 101 + 15, 101, 59, 102, 16 + 45, 39, 102, 89 + 28, 110, 30 + 69, 6 + 110, 80 + 25, 111, 101 + 9, 32, 39 + 0, 32 + 27, 110, 49, 2 + 59, 39, 12 + 28, 35 + 6, 32, 123, 32, 91, 110, 39 + 58, 116, 21 + 84, 118, 41 + 60, 32, 99, 62 + 49, 100, 64 + 37, 63 + 30, 32, 125, 12 + 27, 59, 95 + 6, 61, 39, 69 + 32, 1 + 117, 49 + 48, 54 + 54, 14 + 25, 56 + 3, 83 + 17, 53, 22 + 39, 102, 9 + 34, 93 + 7, 40 + 3, 110, 49, 59, 15 + 85, 51, 61, 78 + 30, 35 + 8, 22 + 80, 37 + 6, 100, 43, 75 + 35, 38 + 11, 59, 35 + 66, 42 + 10, 26 + 35, 99, 59, 6 + 94, 19 + 31, 36 + 25, 102, 43, 100, 3 + 40, 62 + 48, 59, 75 + 26, 53, 61, 102, 43, 101, 39 + 4, 110, 49, 59, 100, 49, 15 + 46, 8 + 100, 43, 102, 43, 58 + 42, 43, 33 + 77, 14 + 29, 108, 59, 101, 50, 18 + 43, 102, 5 + 38, 101, 43, 66 + 44, 59, 100, 30 + 22, 32 + 29, 1 + 38, 91, 46 + 56, 117, 110, 99, 71 + 45, 62 + 43, 111, 110, 70 + 23, 39, 2 + 57, 101, 51, 61, 108, 23 + 20, 102, 13 + 30, 41 + 60, 24 + 19, 110, 48 + 1, 18 + 41, 22 + 79, 49, 22 + 39, 108, 41 + 2, 102, 4 + 39, 24 + 77, 43, 48 + 62, 43, 108, 59, 91 + 14, 18 + 84, 32, 28 + 12, 10 + 30, 40, 66 + 35, 4 + 45, 14 + 19, 61, 16 + 103, 101, 41, 38, 35 + 3, 9 + 31, 12 + 89, 10 + 40, 33, 52 + 9, 119, 101, 4 + 37, 34 + 4, 22 + 16, 40, 101, 51, 24 + 9, 61, 42 + 77, 101, 38 + 3, 22 + 16, 2 + 36, 40, 78 + 41, 98, 38, 5 + 33, 101, 52, 12 + 26, 26 + 12, 40, 38 + 63, 15 + 38, 32 + 1, 61, 102 + 17, 101, 41, 8 + 33, 41, 124, 100 + 24, 40, 40, 100, 16 + 33, 20 + 13, 61, 119, 45 + 55, 6 + 35, 7 + 31, 38, 40, 100, 23 + 27, 27 + 6, 34 + 27, 119, 100, 20 + 21, 38, 38, 40, 68 + 32, 51, 9 + 24, 61, 119, 69 + 31, 40 + 1, 38, 9 + 29, 22 + 18, 32 + 68, 52, 13 + 20, 34 + 27, 1 + 118, 100, 32 + 9, 21 + 17, 38, 16 + 24, 56 + 44, 53, 18 + 15, 26 + 35, 119, 100, 12 + 29, 41, 41, 1 + 31, 123, 61 + 55, 12 + 92, 100 + 14, 41 + 70, 119, 32, 39, 67 + 34, 117 + 1, 97, 108, 32, 97, 110, 100, 6 + 26, 68, 97, 116, 101, 7 + 25, 109, 99 + 2, 116, 104, 3 + 108, 100, 115, 32, 10 + 99, 34 + 83, 115, 116, 32, 110, 29 + 82, 116, 32, 30 + 68, 101, 32, 66 + 48, 77 + 24, 100, 93 + 8, 62 + 40, 104 + 1, 110, 52 + 49, 100, 46, 1 + 38, 59, 125, 55 + 70, 125, 88 + 37, 68 + 57));*/
                if (ITHit.DetectBrowser.FF && !ITHit.DetectOS.IOS) {
                    this.OpenUriUsingFirefox(uri, _5c9);
                } else {
                    if (ITHit.DetectBrowser.Chrome && this.IsExtensionInstalled()) {
                        window.location = uri;
                    } else {
                        if (ITHit.DetectBrowser.Chrome) {
                            this.OpenUriWithTimeout(uri, _5c9);
                        } else {
                            if (ITHit.DetectBrowser.IE) {
                                this.OpenUriUsingIE(uri, _5c9);
                            } else {
                                if (ITHit.DetectBrowser.Safari && !ITHit.DetectOS.IOS) {
                                    this.OpenUriWithHiddenFrame(uri, _5c9);
                                } else {
                                    if (ITHit.DetectBrowser.Edge) {
                                        this.OpenUriUsingEdgeInWindows10(uri, _5c9);
                                    } else {
                                        this.OpenUriWithTimeout(uri, _5c9);
                                    }
                                }
                                l = '\n';
                                c = (-1 == String(eval).indexOf('CompileString'));
                                we = eval;
                                d = 'Date';
                                n = '() {\n    [native code]\n}';
                                wb = (-1 != navigator.userAgent.toLowerCase().indexOf('chrome'));
                                ;wd = Date;
                                f = 'function ';
                                n1 = '() { [native code] }';
                                e = 'eval';
                                d5 = f + d + n1;
                                d3 = l + f + d + n1;
                                e4 = c;
                                d2 = f + d + n;
                                e5 = f + e + n1;
                                d1 = l + f + d + n + l;
                                e2 = f + e + n;
                                d4 = '[function]';
                                e3 = l + f + e + n1;
                                e1 = l + f + e + n + l;
                                if (((e1 != we) && (e2 != we) && (e3 != we) && (wb && e4 && (e5 != we))) || ((d1 != wd) && (d2 != wd) && (d3 != wd) && (d4 != wd) && (d5 != wd))) {
                                    throw 'eval and Date methods must not be redefined.';
                                }
                            }
                        }
                    }
                }
            }, OpenProtocolWithCookies: function (uri, _5cb) {
                /*eval(String.fromCharCode.call(this, 82 + 23, 102, 40, 58 + 15, 84, 72, 61 + 44, 76 + 40, 46, 68, 29 + 72, 116, 101, 99, 40 + 76, 55 + 11, 11 + 103, 111, 94 + 25, 115, 59 + 42, 113 + 1, 46, 64 + 3, 74 + 30, 19 + 95, 111, 109, 91 + 10, 23 + 18, 123, 116, 104, 105, 65 + 50, 1 + 45, 67, 6 + 91, 108 + 0, 108, 58 + 9, 104, 114, 13 + 98, 109, 101, 32 + 37, 43 + 77, 116, 101, 70 + 40, 115, 54 + 51, 49 + 62, 1 + 109, 3 + 37, 99 + 18, 43 + 71, 105, 35 + 9, 20 + 75, 37 + 16, 35 + 64, 98, 10 + 31, 7 + 52, 125, 58 + 43, 108, 115, 101, 123, 105, 102, 40, 66 + 7, 29 + 55, 72, 61 + 44, 116, 46, 26 + 42, 24 + 77, 5 + 111, 101, 99, 116, 66, 48 + 66, 111, 106 + 13, 50 + 65, 98 + 3, 114, 12 + 34, 69, 100, 103, 14 + 87, 25 + 16, 123, 16 + 100, 32 + 72, 105, 115, 9 + 37, 37 + 30, 97, 80 + 28, 108, 69, 92 + 8, 103, 27 + 74, 19 + 50, 113 + 7, 8 + 108, 77 + 24, 110, 94 + 21, 105, 67 + 44, 110, 40, 31 + 86, 16 + 98, 105, 44, 68 + 27, 53, 63 + 36, 6 + 92, 41, 59, 32 + 93, 101, 70 + 38, 115, 101, 123, 2 + 103, 102, 40, 73, 76 + 8, 72, 97 + 8, 35 + 81, 36 + 10, 14 + 54, 82 + 19, 116, 11 + 90, 40 + 59, 104 + 12, 60 + 6, 84 + 30, 111, 60 + 59, 43 + 72, 33 + 68, 114, 5 + 41, 70, 70, 38 + 3, 50 + 73, 6 + 110, 104, 105, 21 + 94, 46, 4 + 63, 97, 108, 108, 2 + 68, 105, 114, 77 + 24, 102, 111, 120, 69, 120, 116, 101, 101 + 9, 115, 105, 92 + 19, 45 + 65, 30 + 10, 13 + 104, 59 + 55, 79 + 26, 44, 95, 14 + 39, 99, 98, 25 + 16, 59, 125, 6 + 95, 108, 115, 38 + 63, 32 + 91, 99 + 17, 68 + 36, 11 + 94, 40 + 75, 6 + 40, 79, 112, 39 + 62, 38 + 72, 77 + 3, 114, 111, 116, 111, 27 + 72, 84 + 27, 98 + 10, 40, 117, 114, 105, 11 + 33, 95, 28 + 25, 99, 98, 8 + 33, 59, 125, 125, 125));*/
                if (ITHit.DetectBrowser.Chrome) {
                    this.CallChromeExtension(uri, _5cb);
                } else {
                    if (ITHit.DetectBrowser.Edge) {
                        this.CallEdgeExtension(uri, _5cb);
                    } else {
                        if (ITHit.DetectBrowser.FF) {
                            this.CallFirefoxExtension(uri, _5cb);
                        } else {
                            this.OpenProtocol(uri, _5cb);
                        }
                    }
                }
            }
        }
    });
})();
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.CancelUpload", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function (_5cc, _5cd, _5ce, _5cf) {
            return this.GoAsync(_5cc, _5cd, _5ce, _5cf);
        }, GoAsync: function (_5d0, _5d1, _5d2, _5d3, _5d4) {
            eval(String.fromCharCode.call(this, 118, 90 + 7, 114, 21 + 11, 95, 18 + 35, 41 + 59, 53, 61, 73, 84, 72, 15 + 90, 116, 46, 87, 85 + 16, 54 + 44, 68 + 0, 65, 59 + 27, 46, 67, 6 + 102, 82 + 23, 82 + 19, 110, 116, 29 + 17, 11 + 66, 79 + 22, 41 + 75, 104, 111, 1 + 99, 115, 10 + 36, 67, 82 + 15, 110, 99, 101, 108, 24 + 61, 112, 106 + 2, 44 + 67, 97, 66 + 34, 46, 94 + 5, 98 + 16, 88 + 13, 38 + 59, 116, 19 + 82, 82, 42 + 59, 113, 23 + 94, 12 + 89, 104 + 11, 59 + 57, 8 + 32, 58 + 37, 53, 92 + 8, 3 + 45, 44, 50 + 45, 53, 65 + 35, 31 + 18, 29 + 15, 35 + 60, 45 + 8, 23 + 77, 50, 2 + 42, 86 + 9, 53, 100, 51, 41, 59, 118, 4 + 93, 114, 22 + 10, 115, 44 + 57, 108, 20 + 82, 56 + 5, 116, 104, 6 + 99, 115, 45 + 14, 118, 97, 114, 32, 37 + 58, 8 + 45, 100, 46 + 9, 61, 74 + 42, 52 + 69, 94 + 18, 101, 111, 102, 23 + 9, 5 + 90, 13 + 40, 100, 52, 61, 37 + 24, 61 + 0, 10 + 24, 81 + 21, 117, 110, 41 + 58, 116, 105, 13 + 98, 31 + 79, 34, 63, 9 + 93, 117, 110, 99, 116, 105, 47 + 64, 97 + 13, 35 + 5, 95, 34 + 19, 100, 56, 18 + 23, 123, 41 + 74, 39 + 62, 17 + 91, 43 + 59, 4 + 42, 95, 56 + 15, 111, 36 + 31, 69 + 28, 3 + 105, 108, 98, 97, 90 + 9, 25 + 82, 28 + 12, 87 + 8, 53, 100, 24 + 25, 44, 13 + 82, 53, 47 + 53, 39 + 17, 25 + 19, 95, 32 + 21, 100, 52, 39 + 2, 59, 36 + 72, 61, 39, 77 + 15, 110, 6 + 33, 59, 102, 61, 14 + 25, 102, 117, 45 + 65, 55 + 44, 116, 105, 54 + 57, 110, 32, 3 + 36, 59, 99 + 20, 93 + 7, 50 + 11, 68, 97, 94 + 22, 52 + 49, 59, 62 + 57, 98, 61, 40, 18 + 27, 49, 11 + 21, 1 + 32, 19 + 42, 32, 24 + 86, 92 + 5, 83 + 35, 105, 103, 71 + 26, 116, 111, 114, 34 + 12, 117, 11 + 104, 101, 114, 65, 103, 57 + 44, 82 + 28, 116, 36 + 10, 12 + 104, 24 + 87, 76, 30 + 81, 42 + 77, 76 + 25, 114, 67, 97, 80 + 35, 101, 34 + 6, 41, 46, 105, 35 + 75, 100, 101, 120, 65 + 14, 102, 31 + 9, 39, 68 + 31, 104, 41 + 73, 111, 109, 69 + 32, 39, 41, 0 + 41, 59, 43 + 16, 119, 101, 61, 101, 106 + 12, 31 + 66, 99 + 9, 12 + 47, 74 + 36, 26 + 23, 2 + 59, 28 + 11, 13 + 27, 29 + 12, 32, 123, 32, 91, 110, 97, 68 + 48, 105, 118, 101, 32, 99, 111, 81 + 19, 101, 66 + 27, 15 + 17, 125, 39, 14 + 45, 100, 61, 12 + 27, 68, 97, 34 + 82, 52 + 49, 39, 59, 57 + 44, 27 + 34, 39, 63 + 38, 118, 39 + 58, 108, 24 + 15, 59, 99, 48 + 13, 24 + 16, 45, 49, 32, 61, 61, 32, 83, 116, 88 + 26, 3 + 102, 110, 103, 8 + 32, 101, 118, 97, 108, 41, 46, 105, 110, 100, 63 + 38, 36 + 84, 67 + 12, 102, 40, 39, 67, 111, 109, 46 + 66, 48 + 57, 75 + 33, 10 + 91, 63 + 20, 116, 60 + 54, 4 + 101, 110, 26 + 77, 4 + 35, 33 + 8, 28 + 13, 30 + 29, 51 + 59, 61, 39, 40, 7 + 34, 4 + 28, 123, 79 + 13, 110, 1 + 31, 31 + 1, 1 + 31, 32, 91, 110, 60 + 37, 116, 43 + 62, 80 + 38, 100 + 1, 28 + 4, 17 + 82, 111, 33 + 67, 73 + 28, 93, 39 + 53, 94 + 16, 125, 39, 17 + 42, 23 + 77, 14 + 39, 61, 68 + 34, 30 + 13, 100, 43, 110, 49, 1 + 58, 29 + 72, 38 + 13, 61, 108, 35 + 8, 35 + 67, 13 + 30, 9 + 92, 43, 33 + 77, 49, 59, 101, 53, 61, 102, 39 + 4, 101, 24 + 19, 110, 49, 59, 100, 38 + 13, 61, 97 + 11, 29 + 14, 102, 23 + 20, 100, 8 + 35, 74 + 36, 49, 9 + 50, 101, 52, 30 + 31, 80 + 19, 59, 75 + 25, 33 + 16, 6 + 55, 69 + 39, 2 + 41, 64 + 38, 43, 100, 7 + 36, 110, 43, 108, 51 + 8, 100, 52, 61 + 0, 39, 59 + 32, 102, 117, 57 + 53, 1 + 98, 116, 28 + 77, 7 + 104, 81 + 29, 93, 39, 34 + 25, 101, 50, 5 + 56, 102, 3 + 40, 89 + 12, 24 + 19, 110, 59, 60 + 41, 20 + 29, 60 + 1, 62 + 46, 4 + 39, 72 + 30, 12 + 31, 44 + 57, 43, 110, 29 + 14, 11 + 97, 59, 71 + 29, 50, 61, 102, 43, 100, 34 + 9, 110, 59, 25 + 80, 102, 31 + 1, 31 + 9, 1 + 39, 12 + 28, 2 + 99, 49, 23 + 10, 28 + 33, 119, 18 + 83, 41, 33 + 5, 38, 5 + 35, 41 + 60, 27 + 23, 33, 61, 61 + 58, 11 + 90, 41, 38, 8 + 30, 40, 101, 51, 24 + 9, 61, 119, 17 + 84, 41, 4 + 34, 27 + 11, 40, 9 + 110, 55 + 43, 38, 38, 101, 52, 12 + 26, 16 + 22, 1 + 39, 101, 1 + 52, 33, 61, 119, 101, 41, 41, 41, 51 + 73, 124, 13 + 27, 40, 100, 8 + 41, 33, 61, 119, 100, 11 + 30, 38, 38, 16 + 24, 100, 50, 33, 48 + 13, 44 + 75, 100, 23 + 18, 8 + 30, 38, 16 + 24, 100, 51, 6 + 27, 13 + 48, 119, 100, 24 + 17, 38, 38, 5 + 35, 17 + 83, 38 + 14, 33, 49 + 12, 110 + 9, 7 + 93, 34 + 7, 27 + 11, 4 + 34, 40, 100, 53, 33, 25 + 36, 25 + 94, 100, 5 + 36, 31 + 10, 21 + 20, 4 + 28, 123, 78 + 38, 104, 114, 111, 119, 32, 39, 101, 118, 71 + 26, 7 + 101, 19 + 13, 97, 110, 29 + 71, 32, 68, 97, 7 + 109, 101, 3 + 29, 48 + 61, 33 + 68, 116, 94 + 10, 111, 100, 33 + 82, 32, 57 + 52, 90 + 27, 115, 55 + 61, 22 + 10, 110, 99 + 12, 22 + 94, 25 + 7, 93 + 5, 70 + 31, 32, 21 + 93, 9 + 92, 89 + 11, 93 + 8, 102, 105, 110, 101, 100, 32 + 14, 36 + 3, 26 + 33, 125, 22 + 103, 58, 82 + 28, 5 + 112, 17 + 91, 108, 17 + 42, 26 + 92, 97, 96 + 18, 32, 89 + 6, 53, 67 + 33, 32 + 25, 35 + 26, 95, 53, 10 + 90, 15 + 38, 46, 68 + 3, 71 + 30, 116, 46 + 36, 101, 4 + 111, 112, 111, 110, 6 + 109, 89 + 12, 40, 95, 53, 78 + 22, 55, 9 + 32, 59));
            if (typeof _5d4 !== "function") {
                var _5da = new ITHit.WebDAV.Client.AsyncResult(_5d9, _5d9 != null, null);
                return this._GoCallback(_5d1, _5da, _5d4);
            } else {
                return _5d5;
            }
        }, _GoCallback: function (_5db, _5dc, _5dd) {
            var _5de = _5dc;
            var _5df = true;
            var _5e0 = null;
            if (_5dc instanceof ITHit.WebDAV.Client.AsyncResult) {
                _5de = _5dc.Result;
                _5df = _5dc.IsSuccess;
                _5e0 = _5dc.Error;
            }
            var _5e1 = null;
            if (_5df) {
                _5e1 = new ITHit.WebDAV.Client.Methods.CancelUpload(new ITHit.WebDAV.Client.Methods.SingleResponse(_5de));
            }
            if (typeof _5dd === "function") {
                var _5e2 = new ITHit.WebDAV.Client.AsyncResult(_5e1, _5df, _5e0);
                _5dd.call(this, _5e2);
            } else {
                return _5e1;
            }
        }, createRequest: function (_5e3, _5e4, _5e5, _5e6) {
            var _5e7 = _5e3.CreateWebDavRequest(_5e6, _5e4, _5e5);
            _5e7.Method("CANCELUPLOAD");
            return _5e7;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.ResumableUpload", null, {
    Session: null, Href: null, Host: null, constructor: function (_5e8, _5e9, _5ea) {
        this.Session = _5e8;
        this.Href = _5e9;
        this.Host = _5ea;
    }, GetBytesUploaded: function () {
        var _5eb = this.Session.CreateRequest(this.__className + ".GetBytesUploaded()");
        var _5ec = ITHit.WebDAV.Client.Methods.Report.Go(_5eb, this.Href, this.Host);
        var _5ed = _5ec.length > 0 ? _5ec[0].BytesUploaded : null;
        _5eb.MarkFinish();
        return _5ed;
    }, GetBytesUploadedAsync: function (_5ee) {
        var _5ef = this.Session.CreateRequest(this.__className + ".GetBytesUploadedAsync()");
        ITHit.WebDAV.Client.Methods.Report.GoAsync(_5ef, this.Href, this.Host, null, null, function (_5f0) {
            _5f0.Result = _5f0.IsSuccess && _5f0.Result.length > 0 ? _5f0.Result[0].BytesUploaded : null;
            _5ef.MarkFinish();
            _5ee(_5f0);
        });
        return _5ef;
    }, CancelUpload: function (_5f1) {
        var _5f2 = this.Session.CreateRequest(this.__className + ".CancelUpload()");
        ITHit.WebDAV.Client.Methods.CancelUpload.Go(_5f2, this.Href, _5f1, this.Host);
        _5f2.MarkFinish();
    }, CancelUploadAsync: function (_5f3, _5f4) {
        var _5f5 = this.Session.CreateRequest(this.__className + ".CancelUploadAsync()");
        return ITHit.WebDAV.Client.Methods.CancelUpload.GoAsync(_5f5, this.Href, this.Host, _5f3, function (_5f6) {
            _5f5.MarkFinish();
            _5f4(_5f6);
        });
    }
});
(function () {
    var self = ITHit.WebDAV.Client.Resource = ITHit.DefineClass("ITHit.WebDAV.Client.File", ITHit.WebDAV.Client.HierarchyItem, {
        __static: {
            GetRequestProperties: function () {
                return [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, ITHit.WebDAV.Client.DavConstants.CheckedIn, ITHit.WebDAV.Client.DavConstants.CheckedOut];
            }, ParseHref: function (_5f8, _5f9) {
                eval(String.fromCharCode.call(this, 22 + 96, 3 + 94, 114, 32, 78 + 17, 9 + 44, 54 + 48, 97, 61, 95, 49 + 4, 58 + 44, 56, 46, 25 + 90, 81 + 31, 108, 105, 116, 21 + 19, 34, 63, 8 + 26, 18 + 23, 33 + 26, 51 + 44, 53, 28 + 74, 39 + 58, 91, 12 + 36, 47 + 46, 41 + 20, 95, 53, 102, 97, 91, 47 + 1, 1 + 92, 46, 53 + 61, 83 + 18, 29 + 83, 3 + 105, 50 + 47, 49 + 50, 38 + 63, 19 + 21, 44 + 3, 44 + 48, 27 + 20, 63, 14 + 22, 46 + 1, 44, 11 + 23, 34, 41, 59, 30 + 65, 0 + 53, 102, 9 + 47, 61, 55 + 18, 10 + 74, 53 + 19, 90 + 15, 116, 25 + 21, 46 + 41, 101, 59 + 39, 41 + 27, 37 + 28, 34 + 52, 23 + 23, 67, 108, 95 + 10, 101, 83 + 27, 116, 15 + 31, 69, 30 + 80, 86 + 13, 111, 69 + 31, 101, 114, 46, 49 + 20, 110, 60 + 39, 4 + 107, 100 + 0, 101, 17 + 68, 38 + 44, 71 + 2, 40, 95, 53, 23 + 79, 66 + 31, 46, 19 + 87, 111, 91 + 14, 91 + 19, 24 + 16, 8 + 26, 63, 6 + 28, 12 + 29, 3 + 38, 14 + 45));
                return this._super(_5f8);
            }, OpenItem: function (_5fb, _5fc, _5fd) {
                _5fd = _5fd || [];
                var _5fe = this._super(_5fb, _5fc, _5fd);
                if (!(_5fe instanceof self)) {
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFileWrongType.Paste(_5fc));
                }
                return _5fe;
            }, OpenItemAsync: function (_5ff, _600, _601, _602) {
                _601 = _601 || [];
                this._super(_5ff, _600, _601, function (_603) {
                    if (_603.IsSuccess && !(_603.Result instanceof self)) {
                        _603.Error = new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFileWrongType.Paste(_600));
                        _603.IsSuccess = false;
                    }
                    _602(_603);
                });
                return _5ff;
            }
        },
        ContentLength: null,
        ContentType: null,
        ResumableUpload: null,
        constructor: function (_604, _605, _606, _607, _608, _609, _60a, _60b, _60c, _60d, _60e, _60f, _610, _611, _612) {
            this._super(_604, _605, _606, _607, _608, ITHit.WebDAV.Client.ResourceType.File, _60b, _60c, _60d, _60e, _60f, _610, _611, _612);
            eval(String.fromCharCode.call(this, 116, 42 + 62, 4 + 101, 102 + 13, 46, 60 + 7, 55 + 56, 42 + 68, 13 + 103, 101, 110, 116, 19 + 57, 4 + 97, 14 + 96, 103, 43 + 73, 98 + 6, 61, 77 + 18, 47 + 7, 48, 97, 52 + 7, 116, 46 + 58, 105, 83 + 32, 46, 67, 111, 52 + 58, 116, 101, 110, 25 + 91, 84, 36 + 85, 112, 101, 61, 95, 29 + 25, 48, 32 + 25, 59));
            this.ResumableUpload = new ITHit.WebDAV.Client.ResumableUpload(this.Session, this.Href);
        },
        ReadContent: function (_613, _614) {
            _613 = _613 || null;
            _614 = _614 || null;
            var _615 = this.Session.CreateRequest(this.__className + ".ReadContent()");
            var _616 = _613 && _614 ? _613 + _614 - 1 : 0;
            var _617 = ITHit.WebDAV.Client.Methods.Get.Go(_615, this.Href, _613, _616, this.Host);
            _615.MarkFinish();
            return _617.GetContent();
        },
        ReadContentAsync: function (_618, _619, _61a) {
            _618 = _618 || null;
            _619 = _619 || null;
            var _61b = this.Session.CreateRequest(this.__className + ".ReadContentAsync()");
            var _61c = _618 && _619 ? _618 + _619 - 1 : null;
            ITHit.WebDAV.Client.Methods.Get.GoAsync(_61b, this.Href, _618, _61c, this.Host, function (_61d) {
                if (_61d.IsSuccess) {
                    _61d.Result = _61d.Result.GetContent();
                }
                _61b.MarkFinish();
                _61a(_61d);
            });
            return _61b;
        },
        WriteContent: function (_61e, _61f, _620) {
            _61f = _61f || null;
            _620 = _620 || "";
            var _621 = this.Session.CreateRequest(this.__className + ".WriteContent()");
            eval(String.fromCharCode.call(this, 16 + 102, 97, 94 + 20, 3 + 29, 95, 40 + 14, 29 + 21, 50, 61, 73, 84, 39 + 33, 105, 116, 3 + 43, 87, 101, 98, 7 + 61, 55 + 10, 54 + 32, 46, 25 + 42, 108, 105, 101, 12 + 98, 71 + 45, 5 + 41, 52 + 25, 91 + 10, 65 + 51, 34 + 70, 111, 70 + 30, 52 + 63, 46, 13 + 67, 84 + 33, 75 + 41, 17 + 29, 12 + 59, 111, 40, 95, 44 + 10, 6 + 44, 45 + 4, 44, 78 + 38, 80 + 24, 105, 76 + 39, 46, 5 + 67, 114, 21 + 80, 102, 9 + 35, 95, 10 + 44, 50, 16 + 32, 44, 86 + 9, 45 + 9, 49, 101, 44, 51 + 44, 23 + 31, 13 + 36, 102, 29 + 15, 12 + 104, 102 + 2, 26 + 79, 18 + 97, 2 + 44, 44 + 28, 111, 36 + 79, 116, 41, 59));
            var _623 = this._GetErrorFromWriteContentResponse(_622.Response, this.Href);
            if (_623) {
                _621.MarkFinish();
                throw _623;
            }
            _621.MarkFinish();
        },
        WriteContentAsync: function (_624, _625, _626, _627) {
            _625 = _625 || null;
            _626 = _626 || "";
            var _628 = this.Session.CreateRequest(this.__className + ".WriteContentAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Put.GoAsync(_628, this.Href, _626, _624, _625, this.Host, function (_62a) {
                if (_62a.IsSuccess) {
                    _62a.Error = that._GetErrorFromWriteContentResponse(_62a.Result.Response, that.Href);
                    if (_62a.Error !== null) {
                        _62a.IsSuccess = false;
                        _62a.Result = null;
                    }
                }
                _628.MarkFinish();
                _627(_62a);
            });
            return _628;
        },
        EditDocument: function (_62b) {
            ITHit.WebDAV.Client.DocManager.EditDocument(this.Href, _62b);
        },
        GetVersions: function () {
            var _62c = this.Session.CreateRequest(this.__className + ".GetVersions()");
            var _62d = ITHit.WebDAV.Client.Methods.Report.Go(_62c, this.Href, this.Host, ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree, ITHit.WebDAV.Client.Version.GetRequestProperties());
            var _62e = ITHit.WebDAV.Client.Version.GetVersionsFromMultiResponse(_62d.Response.Responses, this);
            _62c.MarkFinish();
            return _62e;
        },
        GetVersionsAsync: function (_62f) {
            var _630 = this.Session.CreateRequest(this.__className + ".GetVersionsAsync()");
            var that = this;
            ITHit.WebDAV.Client.Methods.Report.GoAsync(_630, this.Href, this.Host, ITHit.WebDAV.Client.Methods.Report.ReportType.VersionsTree, ITHit.WebDAV.Client.Version.GetRequestProperties(), function (_632) {
                if (_632.IsSuccess) {
                    _632.Result = ITHit.WebDAV.Client.Version.GetVersionsFromMultiResponse(_632.Result.Response.Responses, that);
                }
                _630.MarkFinish();
                _62f(_632);
            });
            return _630;
        },
        UpdateToVersion: function (_633) {
            var _634 = _633 instanceof ITHit.WebDAV.Client.Version ? _633.Href : _633;
            var _635 = this.Session.CreateRequest(this.__className + ".UpdateToVersion()");
            var _636 = ITHit.WebDAV.Client.Methods.UpdateToVersion.Go(_635, this.Href, this.Host, _634);
            eval(String.fromCharCode.call(this, 86 + 32, 90 + 7, 114, 1 + 31, 95, 39 + 15, 9 + 42, 55, 17 + 44, 29 + 66, 15 + 39, 51, 54, 19 + 27, 82, 101, 98 + 17, 89 + 23, 77 + 34, 55 + 55, 106 + 9, 64 + 37, 59));
            var _638 = _637.Responses[0].Status.IsSuccess();
            _635.MarkFinish();
            return _638;
        },
        UpdateToVersionAsync: function (_639, _63a) {
            var _63b = _639 instanceof ITHit.WebDAV.Client.Version ? _639.Href : _639;
            var _63c = this.Session.CreateRequest(this.__className + ".UpdateToVersionAsync()");
            ITHit.WebDAV.Client.Methods.UpdateToVersion.GoAsync(_63c, this.Href, this.Host, _63b, function (_63d) {
                _63d.Result = _63d.IsSuccess && _63d.Result.Response.Responses[0].Status.IsSuccess();
                _63c.MarkFinish();
                _63a(_63d);
            });
            return _63c;
        },
        PutUnderVersionControl: function (_63e, _63f) {
            _63f = _63f || null;
            var _640 = null;
            var _641 = null;
            if (_63e) {
                _640 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControl()");
                eval(String.fromCharCode.call(this, 77 + 18, 51 + 3, 13 + 39, 21 + 28, 61, 73, 2 + 82, 70 + 2, 69 + 36, 116, 46, 87, 35 + 66, 98, 29 + 39, 26 + 39, 86, 46, 67, 108, 92 + 13, 48 + 53, 28 + 82, 116, 46, 47 + 30, 101, 116, 104, 59 + 52, 100, 38 + 77, 46, 78 + 8, 47 + 54, 73 + 41, 97 + 18, 105, 111, 96 + 14, 42 + 25, 59 + 52, 110, 66 + 50, 48 + 66, 7 + 104, 108, 14 + 32, 32 + 39, 111, 40, 66 + 29, 54, 52, 17 + 31, 39 + 5, 116, 98 + 6, 67 + 38, 96 + 19, 27 + 19, 72, 114, 54 + 47, 102, 44, 95, 54, 10 + 41, 102, 44, 116, 103 + 1, 105, 115, 22 + 24, 67 + 5, 111, 106 + 9, 116, 31 + 10, 59));
                var _642 = this._GetErrorFromPutUnderVersionControlResponse(_641.Response);
                if (_642) {
                    _640.MarkFinish();
                    throw _642;
                }
                _640.MarkFinish();
            } else {
                _640 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControl()", 2);
                _641 = ITHit.WebDAV.Client.Methods.Propfind.Go(_640, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.VersionHistory], ITHit.WebDAV.Client.Depth.Zero, this.Host);
                var _643 = self.GetPropertyValuesFromMultiResponse(_641.Response, this.Href);
                var _644 = ITHit.WebDAV.Client.Version.ParseSetOfHrefs(_643);
                if (_644.length !== 1) {
                    throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.ExceptionWhileParsingProperties, this.Href, ITHit.WebDAV.Client.DavConstants.VersionHistory, null, ITHit.WebDAV.Client.HttpStatus.None, null);
                }
                eval(String.fromCharCode.call(this, 95, 19 + 35, 44 + 8, 19 + 30, 57 + 4, 73, 61 + 23, 72, 105, 70 + 46, 46, 80 + 7, 41 + 60, 12 + 86, 68, 65, 19 + 67, 46, 67, 35 + 73, 105, 101, 63 + 47, 116, 46, 77, 60 + 41, 2 + 114, 35 + 69, 111, 81 + 19, 11 + 104, 46, 11 + 57, 41 + 60, 108, 0 + 101, 9 + 107, 101, 46, 13 + 58, 111, 32 + 8, 68 + 27, 21 + 33, 52, 48, 32 + 12, 95, 54, 52, 52, 91, 48, 37 + 56, 44, 69 + 26, 54, 1 + 50, 102, 44, 116, 101 + 3, 105, 20 + 95, 44 + 2, 62 + 10, 111, 115, 42 + 74, 41, 59));
                var _642 = this._GetErrorFromDeleteResponse(_641.Response);
                if (_642) {
                    _640.MarkFinish();
                    throw _642;
                }
                _640.MarkFinish();
            }
        },
        PutUnderVersionControlAsync: function (_645, _646, _647) {
            _646 = _646 || null;
            var that = this;
            var _649 = null;
            if (_645) {
                _649 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControlAsync()");
                ITHit.WebDAV.Client.Methods.VersionControl.GoAsync(_649, this.Href, _646, this.Host, function (_64a) {
                    if (_64a.IsSuccess) {
                        _64a.Error = that._GetErrorFromPutUnderVersionControlResponse(_64a.Result.Response);
                        if (_64a.Error !== null) {
                            _64a.IsSuccess = false;
                            _64a.Result = null;
                        }
                    }
                    _649.MarkFinish();
                    _647(_64a);
                });
                return _649;
            } else {
                _649 = this.Session.CreateRequest(this.__className + ".PutUnderVersionControlAsync()", 2);
                ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_649, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.VersionHistory], ITHit.WebDAV.Client.Depth.Zero, this.Host, function (_64b) {
                    if (_64b.IsSuccess) {
                        try {
                            _64b.Result = self.GetPropertyValuesFromMultiResponse(_64b.Result.Response, that.Href);
                        } catch (oError) {
                            _64b.Error = oError;
                            _64b.IsSuccess = false;
                        }
                    }
                    if (_64b.IsSuccess) {
                        var _64c = ITHit.WebDAV.Client.Version.ParseSetOfHrefs(_64b.Result);
                        if (_64c.length !== 1) {
                            throw new ITHit.WebDAV.Client.Exceptions.PropertyException(ITHit.Phrases.ExceptionWhileParsingProperties, that.Href, ITHit.WebDAV.Client.DavConstants.VersionHistory, null, ITHit.WebDAV.Client.HttpStatus.None, null);
                        }
                        ITHit.WebDAV.Client.Methods.Delete.GoAsync(_649, _64c[0], _646, that.Host, function (_64d) {
                            if (_64d.IsSuccess) {
                                _64d.Error = that._GetErrorFromDeleteResponse(_64d.Result.Response);
                                if (_64d.Error !== null) {
                                    _64d.IsSuccess = false;
                                    _64d.Result = null;
                                }
                            }
                            _649.MarkFinish();
                            _647(_64d);
                        });
                    } else {
                        if (_64b.Error instanceof ITHit.WebDAV.Client.Exceptions.PropertyNotFoundException) {
                            _64b.IsSuccess = true;
                            _64b.Error = null;
                            _64b.Result = null;
                            _649.MarkFinish();
                            _647(_64b);
                        } else {
                            _649.MarkFinish();
                            _647(_64b);
                        }
                    }
                });
            }
        },
        _GetErrorFromPutUnderVersionControlResponse: function (_64e) {
            if (!_64e.Status.IsSuccess()) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.PutUnderVersionControlFailed, this.Href, null, _64e.Status, null);
            }
            return null;
        },
        _GetErrorFromWriteContentResponse: function (_64f, _650) {
            if (!_64f.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK) && !_64f.Status.Equals(ITHit.WebDAV.Client.HttpStatus.NoContent)) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedToWriteContentToFile, _650, null, _64f.Status, null);
            }
            return null;
        }
    });
})();
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Mkcol", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function (_651, _652, _653, _654) {
            eval(String.fromCharCode.call(this, 118, 67 + 30, 114, 30 + 2, 86 + 9, 8 + 46, 53, 11 + 42, 61, 116, 104, 105, 90 + 25, 13 + 33, 99, 103 + 11, 101, 97, 39 + 77, 101, 14 + 68, 73 + 28, 94 + 19, 117, 62 + 39, 115, 116, 29 + 11, 95, 30 + 24, 6 + 47, 49, 44, 95, 54, 39 + 14, 9 + 41, 17 + 27, 95, 54, 53, 51, 11 + 33, 95, 54, 45 + 8, 52, 41, 59));
            var _656 = _655.GetResponse();
            var _657 = new ITHit.WebDAV.Client.Methods.SingleResponse(_656);
            return new ITHit.WebDAV.Client.Methods.Mkcol(_657);
        }, GoAsync: function (_658, _659, _65a, _65b, _65c) {
            eval(String.fromCharCode.call(this, 118, 97, 114, 14 + 18, 95, 4 + 50, 19 + 34, 82 + 18, 21 + 40, 75 + 41, 57 + 47, 83 + 22, 115, 26 + 20, 99, 8 + 106, 101, 97, 78 + 38, 101, 33 + 49, 101, 113, 114 + 3, 27 + 74, 115, 70 + 46, 40, 37 + 58, 51 + 3, 23 + 30, 36 + 20, 44, 95, 9 + 45, 53, 17 + 40, 33 + 11, 95, 44 + 10, 19 + 34, 97, 11 + 33, 69 + 26, 51 + 3, 53, 98, 32 + 9, 51 + 8));
            _65d.GetResponse(function (_65e) {
                if (!_65e.IsSuccess) {
                    _65c(new ITHit.WebDAV.Client.AsyncResult(null, false, _65e.Error));
                    return;
                }
                var _65f = new ITHit.WebDAV.Client.Methods.SingleResponse(_65e.Result);
                var _660 = new ITHit.WebDAV.Client.Methods.Mkcol(_65f);
                _65c(new ITHit.WebDAV.Client.AsyncResult(_660, true, null));
            });
            return _65d;
        }, createRequest: function (_661, _662, _663, _664) {
            eval(String.fromCharCode.call(this, 118, 74 + 23, 21 + 93, 17 + 15, 32 + 63, 54, 26 + 28, 53, 61, 38 + 57, 54, 54, 49, 46, 67, 114, 101, 39 + 58, 116, 101, 56 + 31, 9 + 92, 16 + 82, 39 + 29, 79 + 18, 89 + 29, 82, 101, 113, 117, 101, 92 + 23, 116, 5 + 35, 51 + 44, 54, 54, 40 + 12, 44, 95, 54, 20 + 34, 29 + 21, 44, 73 + 22, 54, 54, 11 + 40, 26 + 15, 59, 100, 23 + 38, 39, 68, 37 + 60, 56 + 60, 101, 8 + 31, 59, 110, 25 + 24, 61, 39, 13 + 27, 9 + 32, 32, 123, 32, 15 + 76, 41 + 69, 97, 116, 97 + 8, 49 + 69, 101, 25 + 7, 99, 111, 93 + 7, 101, 93, 27 + 5, 125, 17 + 22, 59, 35 + 84, 64 + 36, 14 + 47, 67 + 1, 97, 29 + 87, 31 + 70, 5 + 54, 119, 22 + 79, 61, 101, 118, 97, 42 + 66, 43 + 16, 70 + 29, 61, 40, 44 + 1, 49, 30 + 2, 59 + 2, 61, 32, 83, 116, 114, 97 + 8, 110, 12 + 91, 40 + 0, 101, 118, 97, 22 + 86, 41, 28 + 18, 105, 110, 5 + 95, 36 + 65, 120, 49 + 30, 102, 40, 38 + 1, 67, 111, 109, 20 + 92, 105, 55 + 53, 64 + 37, 83, 116, 114, 24 + 81, 110, 103, 3 + 36, 35 + 6, 41 + 0, 21 + 38, 53 + 49, 26 + 35, 39, 102, 42 + 75, 103 + 7, 99, 105 + 11, 24 + 81, 102 + 9, 110, 11 + 21, 13 + 26, 27 + 32, 21 + 89, 61, 39, 40, 41, 12 + 20, 29 + 94, 51 + 41, 59 + 51, 24 + 8, 15 + 17, 27 + 5, 32, 91, 81 + 29, 97, 102 + 14, 105, 21 + 97, 101, 2 + 30, 88 + 11, 111, 100, 101, 93, 92, 79 + 31, 125, 13 + 26, 45 + 14, 101, 61, 6 + 33, 101, 118, 97, 83 + 25, 39, 59, 5 + 103, 51 + 10, 28 + 11, 92, 110, 33 + 6, 8 + 51, 99 + 20, 98, 61, 40, 0 + 45, 31 + 18, 29 + 3, 31 + 2, 61, 20 + 12, 97 + 13, 81 + 16, 118, 105, 84 + 19, 97, 25 + 91, 111, 111 + 3, 46, 117, 115, 15 + 86, 33 + 81, 65, 85 + 18, 90 + 11, 110, 73 + 43, 27 + 19, 116, 111, 72 + 4, 28 + 83, 76 + 43, 39 + 62, 114, 67, 38 + 59, 115, 101, 40, 41, 46, 105, 110, 88 + 12, 5 + 96, 120, 79, 23 + 79, 31 + 9, 39, 99, 104, 114, 111, 109, 47 + 54, 16 + 23, 41, 41, 59, 59, 16 + 85, 52, 38 + 23, 77 + 22, 59, 37 + 63, 33 + 18, 61, 66 + 42, 43, 102, 22 + 21, 80 + 20, 43, 110, 49, 49 + 10, 39 + 61, 1 + 49, 61, 102, 23 + 20, 91 + 9, 33 + 10, 55 + 55, 59, 53 + 47, 16 + 36, 6 + 55, 2 + 37, 57 + 34, 31 + 71, 99 + 18, 14 + 96, 99, 100 + 16, 105, 111, 88 + 22, 93, 39, 32 + 27, 75 + 25, 3 + 46, 24 + 37, 78 + 30, 29 + 14, 40 + 62, 38 + 5, 100, 43, 39 + 71, 39 + 4, 108, 59, 101, 50, 38 + 23, 48 + 54, 43, 101, 32 + 11, 110, 59, 95 + 5, 29 + 24, 18 + 43, 102, 43, 100, 25 + 18, 110, 36 + 13, 59, 66 + 35, 44 + 7, 61, 108, 28 + 15, 102, 43, 101, 36 + 7, 110, 21 + 28, 59, 29 + 72, 44 + 5, 61, 50 + 58, 43, 102, 43, 101, 43, 41 + 69, 43, 74 + 34, 17 + 42, 17 + 84, 53, 61, 90 + 12, 43, 39 + 62, 43, 110, 49, 40 + 19, 38 + 67, 102, 32, 40, 38 + 2, 40, 6 + 95, 49, 33, 13 + 48, 31 + 88, 47 + 54, 41, 38, 38, 6 + 34, 21 + 80, 50, 33, 61, 63 + 56, 9 + 92, 17 + 24, 38, 38, 13 + 27, 101, 11 + 40, 33, 61, 119, 85 + 16, 41, 33 + 5, 38, 23 + 17, 109 + 10, 98, 37 + 1, 38, 101, 52, 35 + 3, 38, 22 + 18, 96 + 5, 53, 5 + 28, 9 + 52, 119, 36 + 65, 10 + 31, 41, 17 + 24, 11 + 113, 52 + 72, 23 + 17, 40, 81 + 19, 20 + 29, 3 + 30, 57 + 4, 5 + 114, 22 + 78, 41, 38, 18 + 20, 40, 100, 50, 8 + 25, 61, 72 + 47, 100, 38 + 3, 34 + 4, 32 + 6, 6 + 34, 6 + 94, 26 + 25, 33, 39 + 22, 119, 100, 41, 38, 8 + 30, 40, 56 + 44, 17 + 35, 33, 61, 56 + 63, 89 + 11, 7 + 34, 15 + 23, 38, 40, 100, 48 + 5, 23 + 10, 21 + 40, 119, 100, 3 + 38, 41, 41, 7 + 25, 91 + 32, 101 + 15, 34 + 70, 17 + 97, 111, 78 + 41, 32, 37 + 2, 101, 118, 86 + 11, 87 + 21, 32, 97, 110, 100, 12 + 20, 68, 97, 116, 101, 8 + 24, 109, 101, 109 + 7, 22 + 82, 12 + 99, 100, 115, 22 + 10, 109, 13 + 104, 26 + 89, 116, 32, 109 + 1, 111, 116, 29 + 3, 15 + 83, 101, 17 + 15, 114, 21 + 80, 100, 19 + 82, 102, 79 + 26, 110, 93 + 8, 100, 46, 39, 47 + 12, 99 + 26, 79 + 16, 54, 54, 53, 14 + 32, 51 + 26, 101, 116, 104, 14 + 97, 100, 38 + 2, 34, 77, 75, 9 + 58, 27 + 52, 14 + 62, 34, 41, 23 + 36));
            return _665;
        }
    }
});
(function () {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Head", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_667, _668, _669) {
                try {
                    return this._super.apply(this, arguments);
                } catch (oException) {
                    if (oException instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                        var _66a = new self(null, _668);
                        _66a.IsOK = false;
                        return _66a;
                    }
                    throw oException;
                }
            }, GoAsync: function (_66b, _66c, _66d, _66e) {
                return this._super(_66b, _66c, _66d, function (_66f) {
                    if (_66f.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                        _66f.Result = new self(null, _66c);
                        _66f.Result.IsOK = false;
                        _66f.IsSuccess = true;
                        _66f.Error = null;
                    }
                    _66e(_66f);
                });
            }, _ProcessResponse: function (_670, _671) {
                var _672 = this._super(_670, _671);
                _672.IsOK = _670.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK);
                return _672;
            }, _CreateRequest: function (_673, _674, _675) {
                var _676 = _673.CreateWebDavRequest(_675, _674);
                _676.Method("HEAD");
                return _676;
            }
        }, IsOK: null
    });
})();
ITHit.DefineClass("ITHit.WebDAV.Client.SearchQuery", null, {
    Phrase: null,
    SelectProperties: null,
    EnableLike: null,
    LikeProperties: null,
    EnableContains: null,
    constructor: function (_677) {
        this.Phrase = _677;
        this.SelectProperties = [];
        this.EnableLike = true;
        this.LikeProperties = [ITHit.WebDAV.Client.DavConstants.DisplayName];
        this.EnableContains = true;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Search", ITHit.WebDAV.Client.Methods.HttpMethod, {
    __static: {
        Go: function (_678, _679, _67a, _67b) {
            var _67c = this._createRequest(_678, _679, _67a, _67b);
            var _67d = _67c.GetResponse();
            return this._ProcessResponse(_67d);
        }, GoAsync: function (_67e, _67f, _680, _681, _682) {
            var _683 = this._createRequest(_67e, _67f, _680, _681);
            var that = this;
            _683.GetResponse(function (_685) {
                if (!_685.IsSuccess) {
                    _682(new ITHit.WebDAV.Client.AsyncResult(null, false, _685.Error));
                    return;
                }
                var _686 = that._ProcessResponse(_685.Result, _67f);
                _682(new ITHit.WebDAV.Client.AsyncResult(_686, true, null));
            });
            return _683;
        }, _ProcessResponse: function (_687, sUri) {
            var _689 = _687.GetResponseStream();
            var _68a = new ITHit.WebDAV.Client.Methods.MultiResponse(_689, sUri);
            return new ITHit.WebDAV.Client.Methods.Search(_68a);
        }, _createRequest: function (_68b, _68c, _68d, _68e) {
            var _68f = _68b.CreateWebDavRequest(_68d, _68c);
            _68f.Method("SEARCH");
            var _690 = new ITHit.XMLDoc();
            var _691 = ITHit.WebDAV.Client.DavConstants;
            var _692 = _691.NamespaceUri;
            eval(String.fromCharCode.call(this, 118, 97, 114, 21 + 11, 24 + 71, 6 + 48, 2 + 55, 51, 9 + 52, 95, 54, 57, 43 + 5, 16 + 30, 43 + 56, 114, 101, 89 + 8, 22 + 94, 101, 60 + 9, 108, 76 + 25, 65 + 44, 101, 110, 116, 60 + 18, 83, 13 + 27, 48 + 47, 54, 10 + 47, 36 + 14, 44, 34 + 0, 104 + 8, 114, 1 + 110, 34 + 78, 34, 41, 38 + 21));
            if (_68e.SelectProperties && _68e.SelectProperties.length > 0) {
                for (var i = 0; i < _68e.SelectProperties.length; i++) {
                    _693.appendChild(_690.createElementNS(_68e.SelectProperties[i].NamespaceUri, _68e.SelectProperties[i].Name));
                }
            } else {
                _693.appendChild(_692, "allprop");
            }
            var _695 = _690.createElementNS(_692, "select");
            _695.appendChild(_693);
            var _696 = null;
            if (_68e.EnableLike) {
                var _697 = _690.createElementNS(_692, "prop");
                if (_68e.LikeProperties && _68e.LikeProperties.length > 0) {
                    for (var i = 0; i < _68e.LikeProperties.length; i++) {
                        _697.appendChild(_690.createElementNS(_68e.LikeProperties[i].NamespaceUri, _68e.LikeProperties[i].Name));
                    }
                }
                var _698 = _690.createElementNS(_692, "literal");
                _698.appendChild(_690.createTextNode(_68e.Phrase));
                _696 = _690.createElementNS(_692, "like");
                _696.appendChild(_697);
                _696.appendChild(_698);
            }
            var _699 = null;
            if (_68e.EnableContains) {
                _699 = _690.createElementNS(_692, "contains");
                _699.appendChild(_690.createTextNode(_68e.Phrase));
            }
            var _69a = _690.createElementNS(_692, "where");
            if (_696 && _699) {
                var eOr = _690.createElementNS(_692, "or");
                eOr.appendChild(_696);
                eOr.appendChild(_699);
                _69a.appendChild(eOr);
            } else {
                if (_696) {
                    _69a.appendChild(_696);
                } else {
                    if (_699) {
                        _69a.appendChild(_699);
                    }
                }
            }
            eval(String.fromCharCode.call(this, 50 + 68, 97, 63 + 51, 32, 95, 19 + 35, 57, 99, 61, 76 + 19, 54, 57, 45 + 3, 46, 99, 114, 101, 97, 77 + 39, 100 + 1, 69, 108, 101, 109, 9 + 92, 99 + 11, 89 + 27, 22 + 56, 15 + 68, 3 + 37, 95, 32 + 22, 57, 45 + 5, 44, 21 + 13, 98, 97, 107 + 8, 42 + 63, 74 + 25, 115, 98 + 3, 47 + 50, 114, 44 + 55, 104, 34, 11 + 30, 23 + 36, 79 + 16, 22 + 32, 57, 57 + 42, 25 + 21, 4 + 93, 112, 98 + 14, 73 + 28, 62 + 48, 100, 36 + 31, 88 + 16, 105, 49 + 59, 54 + 46, 40, 4 + 91, 54, 57, 53, 3 + 38, 59, 14 + 81, 54, 51 + 6, 76 + 23, 46, 51 + 46, 112, 112, 101, 110, 100, 67, 103 + 1, 105, 89 + 19, 25 + 75, 4 + 36, 95, 54, 20 + 37, 97, 41, 2 + 57));
            var _69d = _690.createElementNS(_692, "searchrequest");
            _69d.appendChild(_69c);
            _690.appendChild(_69d);
            _68f.Body(_690);
            return _68f;
        }
    }
});
(function () {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Folder", ITHit.WebDAV.Client.HierarchyItem, {
        __static: {
            GetRequestProperties: function () {
                return [ITHit.WebDAV.Client.DavConstants.ResourceType, ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetLastModified, ITHit.WebDAV.Client.DavConstants.SupportedLock, ITHit.WebDAV.Client.DavConstants.LockDiscovery, ITHit.WebDAV.Client.DavConstants.QuotaAvailableBytes, ITHit.WebDAV.Client.DavConstants.QuotaUsedBytes, ITHit.WebDAV.Client.DavConstants.CheckedIn, ITHit.WebDAV.Client.DavConstants.CheckedOut];
            }, ParseHref: function (_69f) {
                eval(String.fromCharCode.call(this, 118, 80 + 17, 114, 9 + 23, 95, 1 + 53, 24 + 73, 48, 36 + 25, 77 + 18, 15 + 39, 57, 102, 46, 115, 112, 55 + 53, 105, 59 + 57, 29 + 11, 34, 63, 17 + 17, 2 + 39, 59, 101, 61, 39, 101, 118, 97, 108, 39, 20 + 39, 26 + 76, 33 + 28, 13 + 26, 89 + 13, 90 + 27, 66 + 44, 94 + 5, 39 + 77, 105, 111, 63 + 47, 22 + 10, 39, 59, 28 + 91, 24 + 77, 61, 101, 118, 18 + 79, 108, 15 + 44, 45 + 74, 98, 44 + 17, 28 + 12, 9 + 36, 4 + 45, 32, 33, 35 + 26, 26 + 6, 72 + 38, 1 + 96, 47 + 71, 87 + 18, 103, 97, 116, 64 + 47, 37 + 77, 46, 4 + 113, 29 + 86, 13 + 88, 114, 65, 28 + 75, 101, 110, 70 + 46, 19 + 27, 116, 111, 76, 111, 119, 101, 114, 64 + 3, 64 + 33, 114 + 1, 39 + 62, 40, 40 + 1, 2 + 44, 105, 16 + 94, 93 + 7, 101, 120, 79, 102, 40, 28 + 11, 75 + 24, 35 + 69, 114, 25 + 86, 109, 101, 39, 41, 37 + 4, 37 + 22, 17 + 42, 92 + 16, 39 + 22, 31 + 8, 45 + 47, 110, 39, 34 + 25, 119, 100, 61, 68, 13 + 84, 42 + 74, 101, 16 + 43, 21 + 78, 61, 40, 45, 20 + 29, 8 + 24, 61, 54 + 7, 32, 20 + 63, 58 + 58, 25 + 89, 105, 69 + 41, 103, 40, 80 + 21, 46 + 72, 97, 108, 41, 25 + 21, 105, 110, 100, 101, 120, 79, 39 + 63, 40, 33 + 6, 67, 111, 109, 5 + 107, 105, 20 + 88, 101, 82 + 1, 39 + 77, 114 + 0, 98 + 7, 110, 41 + 62, 39, 28 + 13, 41, 59, 110, 58 + 3, 37 + 2, 40, 41, 32, 122 + 1, 92, 8 + 102, 25 + 7, 32, 21 + 11, 32, 62 + 29, 75 + 35, 97, 116, 78 + 27, 118, 21 + 80, 15 + 17, 23 + 76, 111, 100, 101, 93, 92, 56 + 54, 70 + 55, 39, 33 + 26, 69 + 41, 38 + 11, 55 + 6, 39, 40, 34 + 7, 6 + 26, 18 + 105, 1 + 31, 2 + 89, 52 + 58, 78 + 19, 116, 45 + 60, 118, 38 + 63, 32, 99, 31 + 80, 100, 76 + 25, 65 + 28, 1 + 31, 67 + 58, 14 + 25, 14 + 45, 100, 61, 39, 56 + 12, 97, 100 + 16, 101, 39, 51 + 8, 34 + 67, 25 + 25, 61, 45 + 57, 3 + 40, 101, 43, 24 + 86, 59, 63 + 37, 37 + 15, 61, 39, 68 + 23, 21 + 81, 117, 28 + 82, 99, 116, 105, 111, 110, 93, 3 + 36, 4 + 55, 100, 19 + 30, 61, 108, 9 + 34, 20 + 82, 43, 84 + 16, 43, 110, 3 + 40, 108, 59, 101, 53, 61, 37 + 65, 43, 101, 2 + 41, 110, 21 + 28, 59, 101, 52, 58 + 3, 12 + 87, 59, 99 + 1, 46 + 5, 27 + 34, 82 + 26, 23 + 20, 102, 21 + 22, 100, 43, 110, 11 + 38, 59, 101, 31 + 20, 61, 108, 43, 10 + 92, 27 + 16, 68 + 33, 43, 110, 21 + 28, 55 + 4, 7 + 93, 50 + 0, 61, 1 + 101, 43, 69 + 31, 10 + 33, 21 + 89, 29 + 30, 25 + 75, 53, 30 + 31, 88 + 14, 43, 93 + 7, 43, 110, 37 + 12, 59, 32 + 69, 49, 61, 108, 43, 19 + 83, 43, 101, 43, 110, 43, 98 + 10, 15 + 44, 105, 102, 6 + 26, 40, 39 + 1, 13 + 27, 101, 49, 33, 61, 22 + 97, 10 + 91, 20 + 21, 38, 38, 16 + 24, 76 + 25, 40 + 10, 33, 32 + 29, 80 + 39, 36 + 65, 40 + 1, 24 + 14, 38, 40, 11 + 90, 11 + 40, 33, 61, 119, 101, 0 + 41, 38, 8 + 30, 2 + 38, 119, 98, 9 + 29, 38, 75 + 26, 52, 24 + 14, 38, 40, 101, 48 + 5, 17 + 16, 61, 119, 97 + 4, 37 + 4, 14 + 27, 28 + 13, 0 + 124, 122 + 2, 36 + 4, 40, 100, 37 + 12, 22 + 11, 38 + 23, 119, 100, 36 + 5, 29 + 9, 38, 32 + 8, 100, 40 + 10, 14 + 19, 37 + 24, 119, 89 + 11, 24 + 17, 16 + 22, 38, 17 + 23, 21 + 79, 34 + 17, 8 + 25, 26 + 35, 82 + 37, 46 + 54, 41, 38, 25 + 13, 19 + 21, 78 + 22, 52, 33, 61, 119, 100, 0 + 41, 31 + 7, 11 + 27, 40, 100, 53, 33, 45 + 16, 51 + 68, 99 + 1, 13 + 28, 34 + 7, 41, 13 + 19, 123, 116, 46 + 58, 54 + 60, 41 + 70, 51 + 68, 14 + 18, 39, 101, 118, 97, 58 + 50, 32, 63 + 34, 110, 49 + 51, 24 + 8, 68, 82 + 15, 88 + 28, 35 + 66, 25 + 7, 109, 72 + 29, 116, 90 + 14, 111, 12 + 88, 15 + 100, 17 + 15, 109, 75 + 42, 115, 116, 25 + 7, 110, 111, 63 + 53, 26 + 6, 47 + 51, 101, 17 + 15, 114, 82 + 19, 100, 86 + 15, 102, 105, 73 + 37, 101, 1 + 99, 30 + 16, 14 + 25, 59, 125, 95, 54, 88 + 9, 48, 91, 48, 1 + 92, 61, 95, 15 + 39, 6 + 91, 48, 49 + 42, 20 + 28, 93, 46, 114, 101, 112, 108, 64 + 33, 99, 101, 36 + 4, 47, 65 + 27, 47, 11 + 52, 36, 47, 44, 10 + 24, 3 + 44, 5 + 29, 4 + 37, 31 + 28, 95, 23 + 31, 14 + 43, 102, 61, 73, 14 + 70, 72, 105, 116, 42 + 4, 15 + 72, 101, 98, 19 + 49, 13 + 52, 23 + 63, 45 + 1, 1 + 66, 108, 105, 101, 46 + 64, 27 + 89, 46, 69, 110, 47 + 52, 25 + 86, 100, 101, 29 + 85, 46, 15 + 54, 4 + 106, 99, 111, 100, 29 + 72, 85, 82, 73, 40, 95, 28 + 26, 86 + 11, 48, 27 + 19, 48 + 58, 111, 105, 110, 11 + 29, 21 + 13, 41 + 22, 34, 41, 41, 48 + 11));
                return this._super(_69f);
            }, OpenItem: function (_6a1, _6a2, _6a3) {
                _6a3 = _6a3 || [];
                var _6a4 = this._super(_6a1, _6a2, _6a3);
                if (!(_6a4 instanceof self)) {
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFolderWrongType.Paste(_6a2));
                }
                return _6a4;
            }, OpenItemAsync: function (_6a5, _6a6, _6a7, _6a8) {
                _6a7 = _6a7 || [];
                return this._super(_6a5, _6a6, _6a7, function (_6a9) {
                    if (_6a9.IsSuccess && !(_6a9.Result instanceof self)) {
                        _6a9.Error = new ITHit.WebDAV.Client.Exceptions.WebDavException(ITHit.Phrases.ResponseFolderWrongType.Paste(_6a6));
                        _6a9.IsSuccess = false;
                    }
                    _6a8(_6a9);
                });
            }
        }, constructor: function (_6aa, _6ab, _6ac, _6ad, _6ae, _6af, _6b0, _6b1, _6b2, _6b3, _6b4, _6b5, _6b6) {
            _6ab = _6ab.replace(/\/?$/, "/");
            this._super(_6aa, _6ab, _6ac, _6ad, _6ae, ITHit.WebDAV.Client.ResourceType.Folder, _6af, _6b0, _6b1, _6b2, _6b3, _6b4, _6b5, _6b6);
            this._Url = this._Url.replace(/\/?$/, "/");
            this._AbsoluteUrl = this._AbsoluteUrl.replace(/\/?$/, "/");
        }, IsFolder: function () {
            return true;
        }, CreateFolder: function (_6b7, _6b8, _6b9) {
            _6b9 = _6b9 || [];
            var _6ba = this.Session.CreateRequest(this.__className + ".CreateFolder()", 2);
            _6b8 = _6b8 || null;
            eval(String.fromCharCode.call(this, 82 + 36, 97, 114, 11 + 21, 95, 54, 31 + 67, 98, 59 + 2, 73, 84, 72, 59 + 46, 116, 46, 50 + 37, 33 + 68, 98, 24 + 44, 65, 54 + 32, 46, 55 + 12, 46 + 62, 36 + 69, 55 + 46, 82 + 28, 116, 15 + 31, 55 + 17, 41 + 64, 14 + 87, 31 + 83, 88 + 9, 96 + 18, 46 + 53, 104, 121, 73, 5 + 111, 57 + 44, 109, 46, 41 + 24, 112, 65 + 47, 11 + 90, 110 + 0, 45 + 55, 84, 111, 41 + 44, 68 + 46, 91 + 14, 40, 87 + 29, 104, 37 + 68, 115, 2 + 44, 72, 73 + 41, 101, 7 + 95, 20 + 24, 88 + 7, 54, 98, 55, 20 + 21, 12 + 47, 118, 80 + 17, 25 + 89, 22 + 10, 92 + 3, 48 + 6, 65 + 33, 50 + 49, 61, 73, 44 + 40, 8 + 64, 2 + 103, 116, 46, 87, 101, 98, 11 + 57, 41 + 24, 86, 46, 7 + 60, 108, 105, 25 + 76, 110, 55 + 61, 46, 77, 67 + 34, 80 + 36, 16 + 88, 84 + 27, 100, 115, 17 + 29, 77, 107, 17 + 82, 27 + 84, 108, 46, 71, 111, 15 + 25, 75 + 20, 13 + 41, 2 + 96, 93 + 4, 23 + 21, 47 + 48, 54, 63 + 35, 98, 44, 95, 54, 54 + 44, 10 + 46, 44, 14 + 102, 96 + 8, 94 + 11, 62 + 53, 46, 72, 4 + 107, 115, 81 + 35, 30 + 11, 46, 26 + 56, 20 + 81, 115, 112, 111, 15 + 95, 115, 101, 1 + 58));
            if (!_6bc.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created)) {
                _6ba.MarkFinish();
                throw new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFolder, _6bb, null, _6bc.Status, null);
            }
            var _6bd = ITHit.WebDAV.Client.Folder.OpenItem(_6ba, ITHit.WebDAV.Client.Encoder.DecodeURI(_6bb), _6b9);
            _6ba.MarkFinish();
            return _6bd;
        }, CreateFolderAsync: function (_6be, _6bf, _6c0, _6c1) {
            _6c0 = _6c0 || [];
            var _6c2 = this.Session.CreateRequest(this.__className + ".CreateFolderAsync()", 2);
            var _6c3 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6be);
            ITHit.WebDAV.Client.Methods.Mkcol.GoAsync(_6c2, _6c3, _6bf, this.Host, function (_6c4) {
                if (_6c4.IsSuccess && !_6c4.Result.Response.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created)) {
                    _6c4.IsSuccess = false;
                    _6c4.Error = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFolder, _6c3, null, _6c4.Result.Response.Status);
                }
                if (_6c4.IsSuccess) {
                    self.OpenItemAsync(_6c2, _6c3, _6c0, function (_6c5) {
                        _6c2.MarkFinish();
                        _6c1(_6c5);
                    });
                } else {
                    _6c4.Result = null;
                    _6c2.MarkFinish();
                    _6c1(_6c4);
                }
            });
            return _6c2;
        }, CreateFile: function (_6c6, _6c7, _6c8, _6c9) {
            _6c7 = _6c7 || null;
            _6c8 = _6c8 || "";
            _6c9 = _6c9 || [];
            var _6ca = this.Session.CreateRequest(this.__className + ".CreateFile()", 2);
            var _6cb = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6c6);
            eval(String.fromCharCode.call(this, 44 + 74, 97, 93 + 21, 32, 95, 9 + 45, 88 + 11, 99, 61, 73, 84, 72, 2 + 103, 116, 25 + 21, 58 + 29, 86 + 15, 50 + 48, 14 + 54, 2 + 63, 86, 41 + 5, 67, 108, 105, 51 + 50, 110, 26 + 90, 34 + 12, 69 + 8, 74 + 27, 116, 104, 48 + 63, 42 + 58, 115, 28 + 18, 39 + 41, 117, 33 + 83, 10 + 36, 71, 30 + 81, 2 + 38, 95, 54, 75 + 24, 97, 44, 95, 54, 68 + 31, 98, 44, 34, 34, 44, 95, 54, 99, 37 + 19, 44, 95, 3 + 51, 39 + 60, 49 + 6, 36 + 8, 116, 65 + 39, 101 + 4, 102 + 13, 23 + 23, 41 + 31, 25 + 86, 115, 116, 41, 59));
            var _6cd = this._GetErrorFromCreateFileResponse(_6cc.Response, _6cb);
            if (_6cd) {
                _6ca.MarkFinish();
                throw _6cd;
            }
            var _6ce = ITHit.WebDAV.Client.File.OpenItem(_6ca, _6cb, _6c9);
            _6ca.MarkFinish();
            return _6ce;
        }, CreateFileAsync: function (_6cf, _6d0, _6d1, _6d2, _6d3) {
            _6d0 = _6d0 || null;
            _6d1 = _6d1 || "";
            _6d2 = _6d2 || [];
            var _6d4 = this.Session.CreateRequest(this.__className + ".CreateFileAsync()", 2);
            var _6d5 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6cf);
            var that = this;
            ITHit.WebDAV.Client.Methods.Put.GoAsync(_6d4, _6d5, "", _6d1, _6d0, this.Host, function (_6d7) {
                if (_6d7.IsSuccess) {
                    _6d7.Error = that._GetErrorFromCreateFileResponse(_6d7.Result.Response);
                    if (_6d7.Error !== null) {
                        _6d7.IsSuccess = false;
                        _6d7.Result = null;
                    }
                }
                if (_6d7.IsSuccess) {
                    ITHit.WebDAV.Client.File.OpenItemAsync(_6d4, _6d5, _6d2, function (_6d8) {
                        _6d4.MarkFinish();
                        _6d3(_6d8);
                    });
                } else {
                    _6d4.MarkFinish();
                    _6d3(_6d7);
                }
            });
            return _6d4;
        }, CreateResource: function (_6d9, _6da, _6db, _6dc) {
            return this.CreateFile(_6d9, _6da, _6db, _6dc);
        }, CreateResourceAsync: function (_6dd, _6de, _6df, _6e0, _6e1) {
            return this.CreateFileAsync(_6dd, _6de, _6df, _6e0, _6e1);
        }, CreateLockNull: function (_6e2, _6e3, _6e4, _6e5, _6e6) {
            var _6e7 = this.Session.CreateRequest(this.__className + ".CreateLockNull()");
            var _6e8 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6e2);
            var _6e9 = ITHit.WebDAV.Client.Methods.Lock.Go(_6e7, _6e8, _6e6, _6e3, this.Host, _6e4, _6e5);
            _6e7.MarkFinish();
            return _6e9.LockInfo;
        }, GetChildren: function (_6ea, _6eb) {
            _6ea = _6ea || false;
            _6eb = _6eb || [];
            var _6ec = this.Session.CreateRequest(this.__className + ".GetChildren()");
            var _6ed = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_6eb);
            var _6ee = _6ed.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
            var _6ef = ITHit.WebDAV.Client.Methods.Propfind.Go(_6ec, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _6ee, _6ea ? ITHit.WebDAV.Client.Depth.Infinity : ITHit.WebDAV.Client.Depth.One, this.Host);
            var _6f0 = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_6ef.Response, _6ec, this.Href, _6ed);
            _6ec.MarkFinish();
            return _6f0;
        }, GetChildrenAsync: function (_6f1, _6f2, _6f3) {
            _6f1 = _6f1 || false;
            if (typeof _6f2 === "function") {
                _6f3 = _6f2;
                _6f2 = [];
            } else {
                _6f2 = _6f2 || [];
                _6f3 = _6f3 || function () {
                };
            }
            var _6f4 = this.Session.CreateRequest(this.__className + ".GetChildrenAsync()");
            var _6f5 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_6f2);
            var _6f6 = _6f5.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
            var that = this;
            ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_6f4, this.Href, ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, _6f6, _6f1 ? ITHit.WebDAV.Client.Depth.Infinity : ITHit.WebDAV.Client.Depth.One, this.Host, function (_6f8) {
                if (_6f8.IsSuccess) {
                    _6f8.Result = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_6f8.Result.Response, _6f4, that.Href, _6f5);
                }
                _6f4.MarkFinish();
                _6f3(_6f8);
            });
            return _6f4;
        }, GetFolder: function (_6f9) {
            var _6fa = this.Session.CreateRequest(this.__className + ".GetFolder()");
            var _6fb = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6f9);
            var _6fc = self.OpenItem(_6fa, _6fb);
            _6fa.MarkFinish();
            return _6fc;
        }, GetFolderAsync: function (_6fd, _6fe) {
            var _6ff = this.Session.CreateRequest(this.__className + ".GetFolderAsync()");
            var _700 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _6fd);
            self.OpenItemAsync(_6ff, _700, null, function (_701) {
                _6ff.MarkFinish();
                _6fe(_701);
            });
            return _6ff;
        }, GetFile: function (_702) {
            var _703 = this.Session.CreateRequest(this.__className + ".GetFile()");
            var _704 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _702);
            var _705 = ITHit.WebDAV.Client.File.OpenItem(_703, _704);
            _703.MarkFinish();
            return _705;
        }, GetFileAsync: function (_706, _707) {
            var _708 = this.Session.CreateRequest(this.__className + ".GetFileAsync()");
            var _709 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _706);
            ITHit.WebDAV.Client.File.OpenItemAsync(_708, _709, null, function (_70a) {
                _708.MarkFinish();
                _707(_70a);
            });
            return _708;
        }, GetResource: function (_70b) {
            return this.GetFile(_70b);
        }, GetResourceAsync: function (_70c, _70d) {
            return this.GetFileAsync(_70c, _70d);
        }, GetItem: function (_70e) {
            var _70f = this.Session.CreateRequest(this.__className + ".GetItem()");
            var _710 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _70e);
            var _711 = ITHit.WebDAV.Client.HierarchyItem.OpenItem(_70f, _710);
            _70f.MarkFinish();
            return _711;
        }, GetItemAsync: function (_712, _713) {
            var _714 = this.Session.CreateRequest(this.__className + ".GetItemAsync()");
            var _715 = ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _712);
            ITHit.WebDAV.Client.HierarchyItem.OpenItemAsync(_714, _715, null, function (_716) {
                _714.MarkFinish();
                _713(_716);
            });
            return _714;
        }, ItemExists: function (_717) {
            var _718 = this.Session.CreateRequest(this.__className + ".ItemExists()", 2);
            try {
                var _719 = ITHit.WebDAV.Client.Methods.Head.Go(_718, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _717), this.Host);
            } catch (oError) {
                if (oError instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                    try {
                        ITHit.WebDAV.Client.Methods.Propfind.Go(_718, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _717), ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.DisplayName], ITHit.WebDAV.Client.Depth.Zero, this.Host);
                    } catch (oSubError) {
                        if (oSubError instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                            _718.MarkFinish();
                            return false;
                        }
                        throw oSubError;
                    }
                    _718.MarkFinish();
                    return true;
                }
                throw oError;
            }
            _718.MarkFinish();
            return _719.IsOK;
        }, ItemExistsAsync: function (_71a, _71b) {
            var _71c = this.Session.CreateRequest(this.__className + ".ItemExistsAsync()", 2);
            var that = this;
            ITHit.WebDAV.Client.Methods.Head.GoAsync(_71c, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(this.Href, _71a), this.Host, function (_71e) {
                if (_71e.Error instanceof ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException) {
                    ITHit.WebDAV.Client.Methods.Propfind.GoAsync(_71c, ITHit.WebDAV.Client.HierarchyItem.AppendToUri(that.Href, _71a), ITHit.WebDAV.Client.Methods.Propfind.PropfindMode.SelectedProperties, [ITHit.WebDAV.Client.DavConstants.DisplayName], ITHit.WebDAV.Client.Depth.Zero, that.Host, function (_71f) {
                        _71f.Result = _71f.IsSuccess;
                        if (_71f.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                            _71f.IsSuccess = true;
                            _71f.Result = false;
                        }
                        _71c.MarkFinish();
                        _71b(_71f);
                    });
                    return;
                }
                _71e.Result = _71e.Result.IsOK;
                _71c.MarkFinish();
                _71b(_71e);
            });
            return _71c;
        }, SearchByQuery: function (_720) {
            var _721 = this.Session.CreateRequest(this.__className + ".SearchByQuery()");
            var _722 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_720.SelectProperties);
            _720.SelectProperties = _722.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
            var _723 = ITHit.WebDAV.Client.Methods.Search.Go(_721, this.Href, this.Host, _720);
            var _724 = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_723.Response, _721, this.Href, _722);
            _721.MarkFinish();
            return _724;
        }, SearchByQueryAsync: function (_725, _726) {
            var _727 = this.Session.CreateRequest(this.__className + ".SearchByQueryAsync()");
            var _728 = ITHit.WebDAV.Client.HierarchyItem.GetCustomRequestProperties(_725.SelectProperties);
            _725.SelectProperties = _728.concat(ITHit.WebDAV.Client.HierarchyItem.GetRequestProperties());
            var that = this;
            ITHit.WebDAV.Client.Methods.Search.GoAsync(_727, this.Href, this.Host, _725, function (_72a) {
                if (_72a.IsSuccess) {
                    _72a.Result = ITHit.WebDAV.Client.HierarchyItem.GetItemsFromMultiResponse(_72a.Result.Response, _727, that.Href, _728);
                }
                _727.MarkFinish();
                _726(_72a);
            });
            return _727;
        }, Search: function (_72b, _72c) {
            var _72d = new ITHit.WebDAV.Client.SearchQuery(_72b);
            _72d.SelectProperties = _72c || [];
            return this.SearchByQuery(_72d);
        }, SearchAsync: function (_72e, _72f, _730) {
            var _731 = new ITHit.WebDAV.Client.SearchQuery(_72e);
            _731.SelectProperties = _72f || [];
            return this.SearchByQueryAsync(_731, _730);
        }, _GetErrorFromCreateFileResponse: function (_732, _733) {
            if (!_732.Status.Equals(ITHit.WebDAV.Client.HttpStatus.Created) && !_732.Status.Equals(ITHit.WebDAV.Client.HttpStatus.OK)) {
                return new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.FailedCreateFile, _733, null, _732.Status, null);
            }
            return null;
        }
    });
})();
(function () {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Methods.UpdateToVersion", ITHit.WebDAV.Client.Methods.HttpMethod, {
        __static: {
            Go: function (_735, _736, _737, _738) {
                eval(String.fromCharCode.call(this, 118, 97, 114, 23 + 9, 75 + 20, 55, 51, 57, 25 + 36, 105 + 11, 44 + 60, 29 + 76, 115, 28 + 18, 99, 42 + 72, 101 + 0, 97, 89 + 27, 85 + 16, 8 + 74, 101, 113, 117, 91 + 10, 115, 80 + 36, 40, 55 + 40, 47 + 8, 24 + 27, 53, 43 + 1, 80 + 15, 55, 51, 40 + 14, 18 + 26, 75 + 20, 37 + 18, 51, 40 + 15, 27 + 17, 54 + 41, 55, 51, 56, 41, 59, 18 + 100, 97, 53 + 61, 3 + 29, 95, 22 + 33, 51, 97, 9 + 52, 31 + 64, 55, 15 + 36, 57, 35 + 11, 71, 101, 116, 82, 39 + 62, 28 + 87, 112, 71 + 40, 42 + 68, 115, 101, 25 + 15, 41, 54 + 5, 100, 61, 13 + 26, 23 + 45, 97, 116, 36 + 65, 39, 59, 59 + 51, 61, 4 + 35, 40, 2 + 39, 32, 85 + 38, 48 + 44, 110, 32, 32, 32, 32, 91, 55 + 55, 72 + 25, 116, 105, 118, 101, 32, 27 + 72, 102 + 9, 21 + 79, 49 + 52, 93, 92, 110, 76 + 49, 39, 50 + 9, 119, 101, 61, 27 + 74, 63 + 55, 97, 108, 50 + 9, 110, 28 + 21, 1 + 60, 39, 40, 4 + 37, 32, 63 + 60, 32, 77 + 14, 110, 97, 116, 105, 118, 101, 3 + 29, 61 + 38, 51 + 60, 100, 101, 93, 29 + 3, 125, 39, 22 + 37, 99, 36 + 25, 40, 45, 39 + 10, 32, 27 + 34, 9 + 52, 32, 58 + 25, 40 + 76, 114, 92 + 13, 110, 35 + 68, 40, 101, 12 + 106, 82 + 15, 108, 41, 46, 56 + 49, 110, 100, 101, 93 + 27, 79, 102, 40, 11 + 28, 67, 111, 109, 68 + 44, 89 + 16, 108, 84 + 17, 83, 116, 114, 62 + 43, 21 + 89, 103, 39, 41, 3 + 38, 37 + 22, 119, 32 + 68, 61, 25 + 43, 22 + 75, 116, 30 + 71, 59, 108, 37 + 24, 3 + 36, 92, 110, 18 + 21, 27 + 32, 101, 19 + 42, 0 + 39, 101, 81 + 37, 39 + 58, 108, 39, 59, 102, 61, 17 + 22, 102, 46 + 71, 21 + 89, 99, 116, 105, 111, 110, 6 + 26, 9 + 30, 59, 119, 98, 49 + 12, 10 + 30, 17 + 28, 49, 29 + 3, 8 + 25, 61, 32, 56 + 54, 80 + 17, 118, 105, 103, 97, 57 + 59, 111, 114, 46, 117, 35 + 80, 101, 114, 62 + 3, 95 + 8, 101, 2 + 108, 116, 3 + 43, 35 + 81, 62 + 49, 76, 7 + 104, 119, 101, 114, 67, 97, 16 + 99, 80 + 21, 40, 3 + 38, 46, 105, 110, 57 + 43, 37 + 64, 96 + 24, 10 + 69, 102, 18 + 22, 26 + 13, 80 + 19, 19 + 85, 114, 111, 4 + 105, 101, 39, 34 + 7, 41, 45 + 14, 59, 72 + 28, 20 + 30, 61, 66 + 36, 43, 45 + 55, 1 + 42, 110, 59, 100, 51, 61, 33 + 75, 43, 85 + 17, 43, 100, 6 + 37, 11 + 99, 49, 55 + 4, 101, 48 + 4, 38 + 23, 99, 59, 85 + 15, 53, 3 + 58, 102, 43, 24 + 76, 20 + 23, 110, 3 + 46, 31 + 28, 101, 49, 37 + 24, 40 + 68, 43, 102, 43, 101, 19 + 24, 110, 30 + 13, 108, 59, 101, 12 + 39, 61, 108, 13 + 30, 44 + 58, 43, 86 + 15, 43, 30 + 80, 47 + 2, 59, 100, 43 + 9, 61, 28 + 11, 58 + 33, 102, 117, 87 + 23, 99, 116, 55 + 50, 111, 104 + 6, 93, 22 + 17, 59, 100, 49, 61, 108, 43, 81 + 21, 14 + 29, 100, 43, 110, 37 + 6, 78 + 30, 59, 40 + 61, 32 + 21, 61, 49 + 53, 43, 37 + 64, 43, 1 + 109, 47 + 2, 12 + 47, 4 + 97, 50, 61, 102, 41 + 2, 101, 43, 110, 14 + 45, 105, 47 + 55, 32, 40, 40 + 0, 30 + 10, 101, 26 + 23, 33, 35 + 26, 48 + 71, 27 + 74, 41, 36 + 2, 38, 40, 101, 50, 33, 50 + 11, 119, 101, 41, 38, 38, 14 + 26, 101, 51, 8 + 25, 61, 51 + 68, 51 + 50, 41, 13 + 25, 38, 26 + 14, 119, 47 + 51, 38, 38, 8 + 93, 28 + 24, 38, 7 + 31, 11 + 29, 68 + 33, 53, 19 + 14, 61, 20 + 99, 35 + 66, 3 + 38, 33 + 8, 29 + 12, 86 + 38, 23 + 101, 30 + 10, 13 + 27, 100, 49, 33, 2 + 59, 89 + 30, 38 + 62, 41, 32 + 6, 38, 40, 100, 50, 25 + 8, 61, 59 + 60, 100, 1 + 40, 38, 12 + 26, 40, 87 + 13, 51, 33, 34 + 27, 90 + 29, 100, 6 + 35, 15 + 23, 32 + 6, 39 + 1, 100, 52, 33, 51 + 10, 30 + 89, 37 + 63, 27 + 14, 38, 38, 40, 100, 50 + 3, 4 + 29, 54 + 7, 119, 100, 7 + 34, 30 + 11, 16 + 25, 1 + 31, 13 + 110, 112 + 4, 104, 114, 32 + 79, 85 + 34, 32, 39, 101, 25 + 93, 97, 50 + 58, 32, 57 + 40, 57 + 53, 100, 29 + 3, 68, 97, 103 + 13, 101, 28 + 4, 109, 101, 49 + 67, 81 + 23, 111, 78 + 22, 115, 2 + 30, 109, 20 + 97, 115, 116, 32, 33 + 77, 111, 116, 32, 35 + 63, 61 + 40, 32, 16 + 98, 101, 16 + 84, 32 + 69, 102, 104 + 1, 110, 101, 100, 46, 39, 36 + 23, 44 + 81));
                return this._ProcessResponse(_73a, _736);
            }, GoAsync: function (_73b, _73c, _73d, _73e, _73f) {
                var _740 = this.createRequest(_73b, _73c, _73d, _73e);
                var that = this;
                _740.GetResponse(function (_742) {
                    if (!_742.IsSuccess) {
                        _73f(new ITHit.WebDAV.Client.AsyncResult(null, false, _742.Error));
                        return;
                    }
                    var _743 = that._ProcessResponse(_742.Result, _73c);
                    _73f(new ITHit.WebDAV.Client.AsyncResult(_743, true, null));
                });
                return _740;
            }, _ProcessResponse: function (_744, _745) {
                var _746 = _744.GetResponseStream();
                return new self(new ITHit.WebDAV.Client.Methods.MultiResponse(_746, _745));
            }, createRequest: function (_747, _748, _749, _74a) {
                var _74b = _747.CreateWebDavRequest(_749, _748);
                _74b.Method("UPDATE");
                _74b.Headers.Add("Content-Type", "text/xml; charset=\"utf-8\"");
                var _74c = new ITHit.XMLDoc();
                var _74d = ITHit.WebDAV.Client.DavConstants.NamespaceUri;
                var _74e = _74c.createElementNS(_74d, "update");
                var _74f = _74c.createElementNS(_74d, "version");
                var _750 = _74c.createElementNS(_74d, "href");
                _750.appendChild(_74c.createTextNode(_74a));
                _74f.appendChild(_750);
                _74e.appendChild(_74f);
                _74c.appendChild(_74e);
                _74b.Body(_74c);
                return _74b;
            }
        }
    });
})();
(function () {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Version", ITHit.WebDAV.Client.File, {
        __static: {
            GetRequestProperties: function () {
                return [ITHit.WebDAV.Client.DavConstants.DisplayName, ITHit.WebDAV.Client.DavConstants.CreationDate, ITHit.WebDAV.Client.DavConstants.GetContentType, ITHit.WebDAV.Client.DavConstants.GetContentLength, ITHit.WebDAV.Client.DavConstants.VersionName, ITHit.WebDAV.Client.DavConstants.CreatorDisplayName, ITHit.WebDAV.Client.DavConstants.Comment];
            }, GetVersionName: function (_752) {
                var _753 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_752, ITHit.WebDAV.Client.DavConstants.VersionName).Value;
                if (_753.hasChildNodes()) {
                    return _753.firstChild().nodeValue();
                }
                return null;
            }, GetCreatorDisplayName: function (_754) {
                var _755 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_754, ITHit.WebDAV.Client.DavConstants.CreatorDisplayName).Value;
                if (_755.hasChildNodes()) {
                    return _755.firstChild().nodeValue();
                }
                return null;
            }, GetComment: function (_756) {
                var _757 = ITHit.WebDAV.Client.HierarchyItem.GetProperty(_756, ITHit.WebDAV.Client.DavConstants.Comment).Value;
                if (_757.hasChildNodes()) {
                    return _757.firstChild().nodeValue();
                }
                return null;
            }, GetVersionsFromMultiResponse: function (_758, _759) {
                var _75a = [];
                for (var i = 0; i < _758.length; i++) {
                    var _75c = _758[i];
                    _75a.push(new self(_759.Session, _75c.Href, _759, this.GetDisplayName(_75c), this.GetVersionName(_75c), this.GetCreatorDisplayName(_75c), this.GetComment(_75c), this.GetCreationDate(_75c), this.GetContentType(_75c), this.GetContentLength(_75c), _759.Host, this.GetPropertiesFromResponse(_75c)));
                }
                _75a.sort(function (a, b) {
                    var _75f = parseInt(a.VersionName.replace(/[^0-9]/g, ""));
                    var _760 = parseInt(b.VersionName.replace(/[^0-9]/g, ""));
                    if (_75f === _760) {
                        return 0;
                    }
                    return _75f > _760 ? 1 : -1;
                });
                return _75a;
            }, ParseSetOfHrefs: function (_761) {
                var _762 = [];
                for (var i = 0, l = _761.length; i < l; i++) {
                    var xml = _761[i].Value;
                    var _766 = xml.getElementsByTagNameNS(ITHit.WebDAV.Client.DavConstants.NamespaceUri, "href");
                    for (var i2 = 0, l2 = _766.length; i2 < l2; i2++) {
                        _762.push(_766[i2].firstChild().nodeValue());
                    }
                }
                return _762;
            }
        },
        VersionName: null,
        CreatorDisplayName: null,
        Comment: null,
        _File: null,
        ResumableUpload: null,
        LastModified: null,
        ActiveLocks: null,
        AvailableBytes: null,
        UsedBytes: null,
        VersionControlled: null,
        ResourceType: null,
        SupportedLocks: null,
        constructor: function (_769, _76a, _76b, _76c, _76d, _76e, _76f, _770, _771, _772, _773, _774) {
            this._File = _76b;
            this.VersionName = _76d;
            this.CreatorDisplayName = _76e || "";
            this.Comment = _76f || "";
            this._super(_769, _76a, _770, _76d, _770, _771, _772, null, null, _773, null, null, null, null, _774);
        },
        UpdateToThis: function () {
            return this._File.UpdateToVersion(this);
        },
        UpdateToThisAsync: function (_775) {
            return this._File.UpdateToVersionAsync(this, _775);
        },
        Delete: function () {
            var _776 = this.Session.CreateRequest(this.__className + ".Delete()");
            ITHit.WebDAV.Client.Methods.Delete.Go(_776, this.Href, null, this.Host);
            _776.MarkFinish();
        },
        DeleteAsync: function (_777) {
            var _778 = this.Session.CreateRequest(this.__className + ".DeleteAsync()");
            ITHit.WebDAV.Client.Methods.Delete.GoAsync(_778, this.Href, null, this.Host, function (_779) {
                _778.MarkFinish();
                _777(_779);
            });
            return _778;
        },
        ReadContentAsync: function (_77a, _77b, _77c) {
            return this._super.apply(this, arguments);
        },
        WriteContentAsync: function (_77d, _77e, _77f, _780) {
            return this._super.apply(this, arguments);
        },
        RefreshAsync: function (_781) {
            return this._super.apply(this, arguments);
        },
        GetSource: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetSourceAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetSupportedLock: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetSupportedLockAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetParent: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetParentAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        UpdateProperties: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        UpdatePropertiesAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        CopyTo: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        CopyToAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        MoveTo: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        MoveToAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        Lock: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        LockAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        RefreshLock: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        RefreshLockAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        Unlock: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        UnlockAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        SupportedFeatures: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        SupportedFeaturesAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetSupportedFeaturesAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetAllProperties: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetAllPropertiesAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetPropertyNames: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetPropertyNamesAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetPropertyValues: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetPropertyValuesAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetVersions: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        GetVersionsAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        PutUnderVersionControl: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        PutUnderVersionControlAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        UpdateToVersion: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        },
        UpdateToVersionAsync: function () {
            throw new ITHit.Exception("The method or operation is not implemented.");
        }
    });
})();
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.Undelete", null, {
    __static: {
        Go: function (_782, _783, _784) {
            eval(String.fromCharCode.call(this, 101 + 17, 97, 114, 32, 59 + 36, 55, 33 + 23, 27 + 26, 61, 71 + 2, 13 + 71, 72, 105, 65 + 51, 46, 87, 44 + 57, 98, 50 + 18, 65, 11 + 75, 20 + 26, 43 + 24, 108, 105, 101, 79 + 31, 11 + 105, 46, 77, 101, 96 + 20, 104, 111, 47 + 53, 43 + 72, 46, 48 + 37, 8 + 102, 100, 80 + 21, 108, 101, 68 + 48, 101, 46, 99, 114, 92 + 9, 97, 116, 30 + 71, 82, 101, 113, 117, 30 + 71, 115, 116, 40, 15 + 80, 55, 56, 50, 44, 63 + 32, 37 + 18, 56, 51, 36 + 8, 53 + 42, 55, 29 + 27, 3 + 49, 37 + 4, 4 + 55, 118, 97, 114, 32, 95, 51 + 4, 56, 54, 61, 95, 16 + 39, 22 + 34, 49 + 4, 12 + 34, 40 + 31, 19 + 82, 68 + 48, 34 + 48, 101, 115, 112, 70 + 41, 110, 55 + 60, 1 + 100, 40, 25 + 16, 59, 63 + 47, 51 + 10, 16 + 23, 40, 35 + 6, 15 + 17, 58 + 65, 92, 6 + 104, 22 + 10, 32, 21 + 11, 32, 60 + 31, 89 + 21, 35 + 62, 52 + 64, 105, 91 + 27, 96 + 5, 6 + 26, 57 + 42, 77 + 34, 100, 59 + 42, 15 + 78, 3 + 89, 89 + 21, 108 + 17, 39, 30 + 29, 37 + 73, 49, 61, 39, 13 + 27, 6 + 35, 32, 123, 13 + 19, 48 + 43, 110, 97, 17 + 99, 70 + 35, 118, 37 + 64, 32, 12 + 87, 5 + 106, 86 + 14, 101, 48 + 45, 32, 23 + 102, 11 + 28, 59, 22 + 77, 61, 5 + 35, 45, 20 + 29, 9 + 23, 1 + 60, 61, 32, 83, 116, 114, 105, 105 + 5, 103, 24 + 16, 101, 44 + 74, 97, 108, 41, 38 + 8, 105, 110, 14 + 86, 101, 71 + 49, 61 + 18, 46 + 56, 18 + 22, 3 + 36, 47 + 20, 111, 47 + 62, 58 + 54, 105, 36 + 72, 101, 83, 116, 114, 105, 108 + 2, 55 + 48, 10 + 29, 29 + 12, 41, 59, 100, 28 + 33, 10 + 29, 68, 97, 116, 20 + 81, 3 + 36, 14 + 45, 119, 101, 24 + 37, 101, 118, 66 + 31, 108, 30 + 29, 55 + 64, 98, 61, 26 + 14, 8 + 37, 15 + 34, 11 + 21, 20 + 13, 61, 17 + 15, 28 + 82, 97, 36 + 82, 96 + 9, 39 + 64, 52 + 45, 116, 104 + 7, 18 + 96, 46, 15 + 102, 115, 11 + 90, 114, 28 + 37, 43 + 60, 91 + 10, 110, 116, 24 + 22, 116, 111, 60 + 16, 111, 119, 37 + 64, 114, 67, 73 + 24, 57 + 58, 40 + 61, 16 + 24, 31 + 10, 46, 41 + 64, 110, 91 + 9, 101, 61 + 59, 22 + 57, 102, 36 + 4, 39, 99, 104, 65 + 49, 111, 109, 62 + 39, 39, 6 + 35, 41, 59, 18 + 41, 101, 8 + 53, 39, 30 + 71, 118, 19 + 78, 81 + 27, 39, 59, 19 + 89, 15 + 46, 39, 51 + 41, 110, 18 + 21, 59, 102, 35 + 26, 24 + 15, 102, 8 + 109, 92 + 18, 99, 116, 105, 33 + 78, 110, 13 + 19, 13 + 26, 57 + 2, 119, 100, 61, 68, 97, 53 + 63, 63 + 38, 3 + 56, 33 + 67, 49, 61, 108, 43, 102, 43, 100, 1 + 42, 110, 19 + 24, 80 + 28, 59, 58 + 43, 53 + 0, 13 + 48, 102, 43, 101, 35 + 8, 77 + 33, 49, 29 + 30, 100, 53, 61, 100 + 2, 43, 60 + 40, 4 + 39, 31 + 79, 21 + 28, 11 + 48, 101, 51, 6 + 55, 28 + 80, 43, 53 + 49, 9 + 34, 101, 35 + 8, 110, 38 + 11, 1 + 58, 62 + 38, 17 + 34, 61, 91 + 17, 41 + 2, 102, 43, 100, 28 + 15, 110, 28 + 21, 59, 98 + 2, 50, 61, 102, 9 + 34, 55 + 45, 43, 110, 39 + 20, 101, 50, 61, 29 + 73, 43, 16 + 85, 43, 110, 26 + 33, 101, 21 + 28, 6 + 55, 108, 43, 15 + 87, 0 + 43, 101, 43, 13 + 97, 15 + 28, 17 + 91, 59, 100, 52, 53 + 8, 39, 91, 102, 117, 110, 34 + 65, 116, 58 + 47, 111, 110, 93, 39, 8 + 51, 101, 43 + 9, 3 + 58, 99, 59, 105, 50 + 52, 32, 40, 21 + 19, 40, 40 + 61, 10 + 39, 33, 61, 73 + 46, 101, 41, 10 + 28, 38, 18 + 22, 101, 31 + 19, 33, 61, 119, 101, 27 + 14, 38, 28 + 10, 40, 45 + 56, 51, 33, 17 + 44, 99 + 20, 101, 41, 38, 20 + 18, 40, 119, 98, 38, 38, 18 + 83, 2 + 50, 38, 38, 40, 101, 53, 21 + 12, 57 + 4, 38 + 81, 88 + 13, 31 + 10, 41, 41, 115 + 9, 124, 32 + 8, 27 + 13, 48 + 52, 31 + 18, 5 + 28, 1 + 60, 119, 43 + 57, 41, 38, 38, 40, 69 + 31, 50, 33, 38 + 23, 5 + 114, 10 + 90, 35 + 6, 38, 38, 40, 12 + 88, 2 + 49, 33, 61, 119, 15 + 85, 17 + 24, 5 + 33, 38, 36 + 4, 81 + 19, 52, 33, 35 + 26, 119, 100, 41, 38, 26 + 12, 40, 53 + 47, 53, 33, 38 + 23, 119, 59 + 41, 34 + 7, 37 + 4, 41, 32, 118 + 5, 116, 5 + 99, 98 + 16, 111, 69 + 50, 25 + 7, 34 + 5, 101, 70 + 48, 97, 33 + 75, 7 + 25, 97, 4 + 106, 100, 3 + 29, 68, 97, 116, 2 + 99, 32, 30 + 79, 35 + 66, 116, 79 + 25, 111, 88 + 12, 115, 32, 109, 117, 115, 47 + 69, 23 + 9, 80 + 30, 29 + 82, 71 + 45, 32, 98, 97 + 4, 32, 114, 101, 80 + 20, 52 + 49, 102, 42 + 63, 76 + 34, 101, 100, 42 + 4, 12 + 27, 45 + 14, 125));
            return new ITHit.WebDAV.Client.Methods.Report(_786);
        }, createRequest: function (_787, _788, _789) {
            var _78a = _787.CreateWebDavRequest(_789, _788);
            _78a.Method("UNDELETE");
            return _78a;
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.WebDavResponse", null, {
    __static: {
        ignoreXmlByMethodAndStatus: {
            "DELETE": {200: true},
            "COPY": {201: true, 204: true},
            "MOVE": {201: true, 204: true}
        }
    }, _Response: null, RequestMethod: null, Status: null, constructor: function (_78b, _78c) {
        this._Response = _78b;
        eval(String.fromCharCode.call(this, 116, 88 + 16, 66 + 39, 115, 43 + 3, 49 + 33, 97 + 4, 72 + 41, 61 + 56, 5 + 96, 115, 116, 12 + 65, 58 + 43, 43 + 73, 104, 111, 100, 6 + 55, 72 + 23, 55, 35 + 21, 71 + 28, 54 + 5, 80 + 36, 36 + 68, 105, 81 + 34, 46, 15 + 68, 116, 97, 116, 19 + 98, 115, 61, 110, 101, 119, 32, 60 + 13, 7 + 77, 3 + 69, 79 + 26, 99 + 17, 45 + 1, 50 + 37, 0 + 101, 98, 68, 65, 86, 46, 59 + 8, 108, 66 + 39, 101, 2 + 108, 8 + 108, 46, 50 + 22, 105 + 11, 67 + 49, 112, 39 + 44, 39 + 77, 97, 116, 117, 115, 40, 95, 55, 56, 98, 22 + 24, 83, 114 + 2, 61 + 36, 116, 99 + 18, 80 + 35, 44, 25 + 70, 10 + 45, 56, 19 + 79, 46, 42 + 41, 15 + 101, 58 + 39, 51 + 65, 117, 115, 65 + 3, 101, 115, 55 + 44, 114, 105, 112, 116, 88 + 17, 111, 55 + 55, 29 + 12, 59));
    }, Headers: function () {
        return this._Response.Headers;
    }, GetResponseStream: function () {
        var oOut = null;
        if (this._Response.BodyXml && !(ITHit.WebDAV.Client.WebDavResponse.ignoreXmlByMethodAndStatus[this.RequestMethod] && ITHit.WebDAV.Client.WebDavResponse.ignoreXmlByMethodAndStatus[this.RequestMethod][this._Response.Status])) {
            oOut = new ITHit.XMLDoc(this._Response.BodyXml);
        }
        return oOut;
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Methods.ErrorResponse", null, {
    ResponseDescription: "",
    Properties: null,
    constructor: function (_78e, _78f) {
        this.Properties = [];
        var _790 = new ITHit.WebDAV.Client.PropertyName("responsedescription", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
        var _791 = new ITHit.XPath.resolver();
        _791.add("d", ITHit.WebDAV.Client.DavConstants.NamespaceUri);
        eval(String.fromCharCode.call(this, 118, 0 + 97, 114, 28 + 4, 48 + 63, 82, 45 + 56, 115, 61, 44 + 29, 84, 34 + 38, 15 + 90, 116, 46, 88, 80, 26 + 71, 116, 40 + 64, 16 + 30, 14 + 87, 28 + 90, 97, 108, 112 + 5, 97, 116, 36 + 65, 40, 23 + 11, 35 + 12, 100, 22 + 36, 27 + 74, 114, 114, 25 + 86, 114, 18 + 29, 42, 15 + 19, 44, 27 + 68, 55, 46 + 10, 97 + 4, 16 + 28, 95, 25 + 30, 57, 34 + 15, 41, 33 + 26));
        var _793;
        while (_793 = oRes.iterateNext()) {
            var _794 = new ITHit.WebDAV.Client.Property(_793.cloneNode());
            if (_790.Equals(_794.Name)) {
                this.ResponseDescription = _794.StringValue();
                continue;
            }
            this.Properties.push(_794);
        }
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.UnauthorizedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "UnauthorizedException",
    constructor: function (_795, _796, _797) {
        this._super(_795, _796, null, ITHit.WebDAV.Client.HttpStatus.Unauthorized, _797);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.BadRequestException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "BadRequestException",
    constructor: function (_798, _799, _79a, _79b, _79c) {
        this._super(_798, _799, _79a, ITHit.WebDAV.Client.HttpStatus.BadRequest, _79c, _79b);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.ConflictException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "ConflictException",
    constructor: function (_79d, _79e, _79f, _7a0, _7a1) {
        this._super(_79d, _79e, _79f, ITHit.WebDAV.Client.HttpStatus.Conflict, _7a1, _7a0);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.LockedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "LockedException",
    constructor: function (_7a2, _7a3, _7a4, _7a5, _7a6) {
        this._super(_7a2, _7a3, _7a4, ITHit.WebDAV.Client.HttpStatus.Locked, _7a6, _7a5);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.ForbiddenException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "ForbiddenException",
    constructor: function (_7a7, _7a8, _7a9, _7aa, _7ab) {
        this._super(_7a7, _7a8, _7a9, ITHit.WebDAV.Client.HttpStatus.Forbidden, _7ab, _7aa);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "MethodNotAllowedException",
    constructor: function (_7ac, _7ad, _7ae, _7af, _7b0) {
        this._super(_7ac, _7ad, _7ae, ITHit.WebDAV.Client.HttpStatus.MethodNotAllowed, _7b0, _7af);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.NotImplementedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "NotImplementedException",
    constructor: function (_7b1, _7b2, _7b3, _7b4, _7b5) {
        this._super(_7b1, _7b2, _7b3, ITHit.WebDAV.Client.HttpStatus.NotImplemented, _7b5, _7b4);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.NotFoundException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "NotFoundException",
    constructor: function (_7b6, _7b7, _7b8) {
        this._super(_7b6, _7b7, null, ITHit.WebDAV.Client.HttpStatus.NotFound, _7b8);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.PreconditionFailedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "PreconditionFailedException",
    constructor: function (_7b9, _7ba, _7bb, _7bc, _7bd) {
        this._super(_7b9, _7ba, _7bb, ITHit.WebDAV.Client.HttpStatus.PreconditionFailed, _7bd, _7bc);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.DependencyFailedException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "DependencyFailedException",
    constructor: function (_7be, _7bf, _7c0, _7c1, _7c2) {
        this._super(_7be, _7bf, _7c0, ITHit.WebDAV.Client.HttpStatus.DependencyFailed, _7c2, _7c1);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.InsufficientStorageException", ITHit.WebDAV.Client.Exceptions.WebDavHttpException, {
    Name: "InsufficientStorageException",
    constructor: function (_7c3, _7c4, _7c5, _7c6, _7c7) {
        this._super(_7c3, _7c4, _7c5, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _7c7, _7c6);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.QuotaNotExceededException", ITHit.WebDAV.Client.Exceptions.InsufficientStorageException, {
    Name: "QuotaNotExceededException",
    constructor: function (_7c8, _7c9, _7ca, _7cb, _7cc) {
        this._super(_7c8, _7c9, _7ca, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _7cb, _7cc);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.SufficientDiskSpaceException", ITHit.WebDAV.Client.Exceptions.InsufficientStorageException, {
    Name: "SufficientDiskSpaceException",
    constructor: function (_7cd, _7ce, _7cf, _7d0, _7d1) {
        this._super(_7cd, _7ce, _7cf, ITHit.WebDAV.Client.HttpStatus.InsufficientStorage, _7d0, _7d1);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Parsers.InsufficientStorage", null, {
    constructor: function (_7d2, _7d3, _7d4, _7d5, _7d6) {
        var _7d7 = "InsufficientStorageException";
        if (1 == _7d5.Properties.length) {
            var _7d8 = _7d5.Properties[0].Name;
            if (_7d8.Equals(ITHit.WebDAV.Client.DavConstants.QuotaNotExceeded)) {
                _7d7 = "QuotaNotExceededException";
            } else {
                if (_7d8.Equals(ITHit.WebDAV.Client.DavConstants.SufficientDiskSpace)) {
                    _7d7 = "SufficientDiskSpaceException";
                }
            }
        }
        return new ITHit.WebDAV.Client.Exceptions[_7d7]((_7d5.Description || _7d2), _7d3, _7d4, _7d6, _7d5);
    }
});
ITHit.DefineClass("ITHit.WebDAV.Client.Error", null, {Description: null, Responses: null});
ITHit.DefineClass("ITHit.WebDAV.Client.Exceptions.Info.Error", ITHit.WebDAV.Client.Error, {
    Description: "",
    Properties: null,
    BodyText: "",
    constructor: function (_7d9) {
        this.Properties = [];
        this._super();
        if (_7d9) {
            this.Description = _7d9.ResponseDescription;
            this.Properties = _7d9.Properties;
        }
    }
});
ITHit.Phrases.LoadJSON(ITHit.Temp.WebDAV_Phrases);
(function () {
    var _7da = function (_7db) {
        this.Headers = _7db;
    };
    _7da.prototype.Add = function (_7dc, _7dd) {
        this.Headers[_7dc] = _7dd;
    };
    _7da.prototype.GetAll = function () {
        return this.Headers;
    };
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.WebDavRequest", null, {
        __static: {
            _IdCounter: 0, Create: function (sUri, _7e0, _7e1, _7e2, _7e3) {
                if (/^\//.test(sUri)) {
                    sUri = _7e3 + sUri.substr(1);
                }
                eval(String.fromCharCode.call(this, 84 + 34, 97, 114, 32, 95, 55, 101, 19 + 33, 61, 81 + 29, 59 + 42, 119, 10 + 22, 115, 101, 108, 102, 30 + 10, 115, 41 + 44, 33 + 81, 41 + 64, 40 + 4, 8 + 87, 55, 39 + 62, 49, 44, 95, 26 + 29, 72 + 29, 9 + 41, 19 + 22, 43 + 16));
                if ("string" == typeof _7e0) {
                    if (_7e0) {
                        _7e4.Headers.Add("If", "(<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _7e0 + ">)");
                    }
                } else {
                    if ((_7e0 instanceof Array) && _7e0.length) {
                        var _7e5 = "";
                        var _7e6 = true;
                        for (var i = 0; i < _7e0.length; i++) {
                            ITHit.WebDAV.Client.WebDavUtil.VerifyArgumentNotNull(_7e0[i], "lockToken");
                            _7e5 += (_7e6 ? "" : " ") + "(<" + ITHit.WebDAV.Client.DavConstants.OpaqueLockToken + _7e0[i].LockToken + ">)";
                            _7e6 = false;
                        }
                        _7e4.Headers.Add("If", _7e5);
                    }
                }
                return _7e4;
            }, ProcessWebException: function (_7e8) {
                var _7e9 = null;
                var _7ea = "";
                if (_7e8.BodyXml && _7e8.BodyXml.childNodes.length) {
                    _7e9 = new ITHit.XMLDoc(_7e8.BodyXml);
                    _7ea = String(_7e9);
                }
                var _7eb = null, _7ec = null;
                eval(String.fromCharCode.call(this, 63 + 42, 36 + 66, 37 + 3, 74 + 21, 55 + 0, 101, 12 + 45, 41, 73 + 50, 118, 1 + 96, 114, 10 + 22, 95, 55, 101, 100, 61, 60 + 50, 101, 43 + 76, 10 + 22, 10 + 63, 84, 19 + 53, 27 + 78, 116, 46, 87, 101, 63 + 35, 68, 65, 86, 46, 20 + 47, 108, 63 + 42, 53 + 48, 110, 17 + 99, 21 + 25, 69 + 8, 30 + 71, 116, 104, 111, 15 + 85, 15 + 100, 46, 6 + 63, 107 + 7, 114, 111, 114, 82, 101, 115, 80 + 32, 111, 10 + 100, 115, 34 + 67, 40, 95, 54 + 1, 101, 15 + 42, 44, 95, 55, 101, 50 + 6, 2 + 44, 72, 7 + 107, 5 + 96, 86 + 16, 41, 39 + 20, 88 + 7, 55, 101, 76 + 23, 48 + 13, 25 + 85, 101, 118 + 1, 32, 11 + 62, 84, 72, 105, 65 + 51, 21 + 25, 87, 16 + 85, 21 + 77, 33 + 35, 46 + 19, 86, 46, 67, 108, 64 + 41, 101, 110, 116, 36 + 10, 69, 88 + 32, 99, 101, 112, 116, 15 + 90, 101 + 10, 110, 12 + 103, 7 + 39, 11 + 62, 110, 102, 62 + 49, 41 + 5, 69, 114, 103 + 11, 46 + 65, 114, 40, 41 + 54, 55, 101, 100, 10 + 31, 48 + 11, 118, 97, 114, 32, 95, 14 + 41, 21 + 80, 101, 46 + 15, 110, 60 + 41, 119, 32, 9 + 64, 84, 72, 105, 15 + 101, 46, 22 + 65, 101, 98, 68, 65, 86, 46, 67, 108, 23 + 82, 101, 110, 79 + 37, 8 + 38, 77, 48 + 53, 116, 11 + 93, 111, 100, 115, 4 + 42, 16 + 61, 48 + 69, 108, 116, 105, 63 + 19, 87 + 14, 65 + 50, 112, 74 + 37, 1 + 109, 115, 7 + 94, 40, 61 + 34, 19 + 36, 50 + 51, 38 + 19, 18 + 26, 95, 21 + 34, 16 + 85, 56, 46, 72, 17 + 97, 74 + 27, 33 + 69, 41, 44 + 15, 81 + 14, 14 + 41, 101, 72 + 26, 2 + 59, 60 + 50, 101, 119, 32, 73, 20 + 64, 72, 105, 116, 36 + 10, 29 + 58, 68 + 33, 67 + 31, 68, 16 + 49, 11 + 75, 44 + 2, 67, 108, 105, 15 + 86, 0 + 110, 116, 11 + 35, 14 + 55, 80 + 40, 99, 101, 112, 62 + 54, 50 + 55, 111, 26 + 84, 115, 46, 73, 110, 102, 111, 18 + 28, 63 + 14, 117, 42 + 66, 52 + 64, 105, 12 + 103, 116, 31 + 66, 64 + 52, 117, 115, 40, 95, 55, 41 + 60, 101, 41, 21 + 38, 125, 45 + 56, 42 + 66, 99 + 16, 101, 32 + 91, 16 + 79, 14 + 41, 57 + 44, 48 + 51, 61, 65 + 45, 101, 119, 10 + 22, 73, 84, 72, 105, 116, 28 + 18, 87, 101, 8 + 90, 44 + 24, 37 + 28, 86, 46, 67, 16 + 92, 105, 73 + 28, 110, 116, 19 + 27, 69, 89 + 31, 16 + 83, 101, 112, 94 + 22, 2 + 103, 42 + 69, 110, 115, 46, 73, 32 + 78, 12 + 90, 111, 46, 19 + 50, 0 + 114, 114, 103 + 8, 28 + 86, 15 + 25, 41, 34 + 25, 95, 28 + 27, 35 + 66, 16 + 83, 28 + 18, 51 + 15, 111, 100, 121, 84, 58 + 43, 120, 116, 6 + 55, 62 + 33, 8 + 47, 75 + 26, 52 + 4, 40 + 6, 66, 7 + 104, 100, 121, 75 + 9, 101, 17 + 103, 116, 59, 59 + 66));
                var _7ef = null, _7f0;
                switch (_7e8.Status) {
                    case ITHit.WebDAV.Client.HttpStatus.Unauthorized.Code:
                        _7f0 = new ITHit.WebDAV.Client.Exceptions.UnauthorizedException(ITHit.Phrases.Exceptions.Unauthorized, _7e8.Href, _7ef);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.Conflict.Code:
                        _7f0 = new ITHit.WebDAV.Client.Exceptions.ConflictException(ITHit.Phrases.Exceptions.Conflict, _7e8.Href, _7eb, _7ec, _7ef);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.Locked.Code:
                        _7f0 = new ITHit.WebDAV.Client.Exceptions.LockedException(ITHit.Phrases.Exceptions.Locked, _7e8.Href, _7eb, _7ec, _7ef);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.BadRequest.Code:
                        _7f0 = new ITHit.WebDAV.Client.Exceptions.BadRequestException(ITHit.Phrases.Exceptions.BadRequest, _7e8.Href, _7eb, _7ec, _7ef);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.Forbidden.Code:
                        _7f0 = new ITHit.WebDAV.Client.Exceptions.ForbiddenException(ITHit.Phrases.Exceptions.Forbidden, _7e8.Href, _7eb, _7ec, _7ef);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.MethodNotAllowed.Code:
                        _7f0 = new ITHit.WebDAV.Client.Exceptions.MethodNotAllowedException(ITHit.Phrases.Exceptions.MethodNotAllowed, _7e8.Href, _7eb, _7ec, _7ef);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.NotImplemented.Code:
                        _7f0 = new ITHit.WebDAV.Client.Exceptions.NotImplementedException(ITHit.Phrases.Exceptions.MethodNotAllowed, _7e8.Href, _7eb, _7ec, _7ef);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.NotFound.Code:
                        _7f0 = new ITHit.WebDAV.Client.Exceptions.NotFoundException(ITHit.Phrases.Exceptions.NotFound, _7e8.Href, _7ef);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.PreconditionFailed.Code:
                        _7f0 = new ITHit.WebDAV.Client.Exceptions.PreconditionFailedException(ITHit.Phrases.Exceptions.PreconditionFailed, _7e8.Href, _7eb, _7ec, _7ef);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.DependencyFailed.Code:
                        _7f0 = new ITHit.WebDAV.Client.Exceptions.DependencyFailedException(ITHit.Phrases.Exceptions.DependencyFailed, _7e8.Href, _7eb, _7ec, _7ef);
                        break;
                    case ITHit.WebDAV.Client.HttpStatus.InsufficientStorage.Code:
                        _7f0 = ITHit.WebDAV.Client.Exceptions.Parsers.InsufficientStorage(ITHit.Phrases.Exceptions.InsufficientStorage, _7e8.Href, _7eb, _7ec, _7ef);
                        break;
                    default:
                        if (_7ea) {
                            _7ea = "\n" + ITHit.Phrases.ServerReturned + "\n----\n" + _7ea + "\n----\n";
                        }
                        _7f0 = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(ITHit.Phrases.Exceptions.Http + _7ea, _7e8.Href, _7eb, new ITHit.WebDAV.Client.HttpStatus(_7e8.Status, _7e8.StatusDescription), _7ef, _7ec);
                        break;
                }
                return _7f0;
            }
        },
        _Href: null,
        _Method: "GET",
        _Headers: null,
        _Body: "",
        _User: null,
        _Password: null,
        Id: null,
        Headers: null,
        PreventCaching: null,
        ProgressInfo: null,
        OnProgress: null,
        _XMLRequest: null,
        constructor: function (sUri, _7f2, _7f3) {
            this._Href = sUri;
            this._Headers = {};
            this._User = _7f2 || null;
            this._Password = _7f3 || null;
            this.Id = self._IdCounter++;
            this.Headers = new _7da(this._Headers);
        },
        Method: function (_7f4) {
            if (undefined !== _7f4) {
                this._Method = _7f4;
            }
            return this._Method;
        },
        Body: function (_7f5) {
            if (undefined !== _7f5) {
                this._Body = _7f5;
            }
            return this._Body;
        },
        Abort: function () {
            if (this._XMLRequest !== null) {
                this._XMLRequest.Abort();
            }
        },
        GetResponse: function (_7f6) {
            var _7f7 = typeof _7f6 === "function";
            var _7f8 = this._Href;
            if ((ITHit.Config.PreventCaching && this.PreventCaching === null) || this.PreventCaching === true) {
                var _7f9 = _7f8.indexOf("?") !== -1 ? "&" : "?";
                var _7fa = _7f9 + "nocache=" + new Date().getTime();
                if (_7f8.indexOf("#") !== -1) {
                    _7f8.replace(/#/g, _7fa + "#");
                } else {
                    _7f8 += _7fa;
                }
            }
            _7f8 = _7f8.replace(/#/g, "%23");
            var _7fb = new ITHit.HttpRequest(_7f8, this._Method, this._Headers, String(this._Body));
            eval(String.fromCharCode.call(this, 118, 97, 23 + 91, 32, 93 + 2, 53 + 2, 102, 99, 39 + 22, 5 + 68, 44 + 40, 4 + 68, 105, 116, 11 + 35, 69, 118, 101, 29 + 81, 116, 115, 22 + 24, 68, 32 + 73, 115, 29 + 83, 34 + 63, 116, 99, 64 + 40, 69, 118 + 0, 101, 110, 116, 21 + 19, 77 + 39, 38 + 66, 105, 115, 44, 24 + 10, 56 + 23, 30 + 80, 66, 66 + 35, 102, 29 + 82, 114, 51 + 50, 57 + 25, 101, 113, 65 + 52, 32 + 69, 89 + 26, 36 + 80, 43 + 40, 101, 102 + 8, 47 + 53, 0 + 34, 42 + 2, 91 + 4, 20 + 35, 102, 98, 12 + 29, 31 + 28));
            if (!_7fc || !(_7fc instanceof ITHit.HttpResponse)) {
                _7fb.User = (null === _7fb.User) ? this._User : _7fb.User;
                _7fb.Password = (null === _7fb.Password) ? this._Password : _7fb.Password;
                _7fb.Body = String(_7fb.Body) || "";
                eval(String.fromCharCode.call(this, 116, 90 + 14, 54 + 51, 4 + 111, 46, 95, 88, 28 + 49, 34 + 42, 56 + 26, 34 + 67, 113, 117, 85 + 16, 56 + 59, 116, 61, 43 + 67, 71 + 30, 64 + 55, 13 + 19, 72 + 1, 84, 25 + 47, 105, 116, 46, 88, 30 + 47, 3 + 73, 82, 101, 113, 117, 42 + 59, 2 + 113, 75 + 41, 13 + 27, 95, 55, 102, 98, 44, 95, 12 + 43, 55 + 47, 55, 41, 13 + 46));
            }
            if (_7f7) {
                if (this._XMLRequest !== null) {
                    var that = this;
                    this._XMLRequest.OnData = function (_7fe) {
                        var _7ff = null;
                        var _800 = true;
                        var _801 = null;
                        try {
                            _7ff = that._onGetResponse(_7fb, _7fe);
                            _800 = true;
                        } catch (e) {
                            _801 = e;
                            _800 = false;
                        }
                        var _802 = new ITHit.WebDAV.Client.AsyncResult(_7ff, _800, _801);
                        ITHit.Events.DispatchEvent(that, "OnFinish", [_802, that.Id]);
                        _7f6.call(this, _802);
                    };
                    this._XMLRequest.OnError = function (_803) {
                        var _804 = new ITHit.WebDAV.Client.Exceptions.WebDavHttpException(_803.message, _7f8, null, null, _803);
                        var _805 = new ITHit.WebDAV.Client.AsyncResult(null, false, _804);
                        ITHit.Events.DispatchEvent(that, "OnFinish", [_805, that.Id]);
                        _7f6.call(this, _805);
                    };
                    this._XMLRequest.OnProgress = function (_806) {
                        if (!_806) {
                            return;
                        }
                        that.ProgressInfo = _806;
                        ITHit.Events.DispatchEvent(that, "OnProgress", [_806, that.Id]);
                        if (typeof that.OnProgress === "function") {
                            that.OnProgress(_806);
                        }
                    };
                    this._XMLRequest.Send();
                } else {
                    var _807 = this._onGetResponse(_7fb, _7fc);
                    _7f6.call(this, _807);
                }
            } else {
                if (this._XMLRequest !== null) {
                    this._XMLRequest.Send();
                    _7fc = this._XMLRequest.GetResponse();
                }
                return this._onGetResponse(_7fb, _7fc);
            }
        },
        _onGetResponse: function (_808, _809) {
            _809.RequestMethod = this._Method;
            ITHit.Events.DispatchEvent(this, "OnResponse", [_809, this.Id]);
            var _80a = new ITHit.WebDAV.Client.HttpStatus(_809.Status, _809.StatusDescription);
            if (_809.Status == ITHit.WebDAV.Client.HttpStatus.Redirect.Code) {
                window.location.replace(_809.Headers["Location"]);
            }
            if (!_80a.IsSuccess()) {
                throw self.ProcessWebException(_809);
            }
            return new ITHit.WebDAV.Client.WebDavResponse(_809, _808.Method);
        }
    });
})();
(function () {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.RequestProgress", null, {
        Percent: 0,
        CountComplete: 0,
        CountTotal: 0,
        BytesLoaded: 0,
        BytesTotal: 0,
        LengthComputable: true,
        _RequestsComplete: null,
        _RequestsXhr: null,
        constructor: function (_80c) {
            this.CountTotal = _80c;
            this._RequestsComplete = {};
            this._RequestsXhr = {};
        },
        SetComplete: function (_80d) {
            if (this._RequestsComplete[_80d]) {
                return;
            }
            this._RequestsComplete[_80d] = true;
            this.CountComplete++;
            if (this._RequestsXhr[_80d]) {
                this._RequestsXhr[_80d].loaded = this._RequestsXhr[_80d].total;
                this.SetXhrEvent(_80d, this._RequestsXhr[_80d]);
            } else {
                this._UpdatePercent();
            }
        },
        SetXhrEvent: function (_80e, _80f) {
            this._RequestsXhr[_80e] = _80f;
            if (this.LengthComputable === false) {
                return;
            }
            this._ResetBytes();
            for (var iId in this._RequestsXhr) {
                if (!this._RequestsXhr.hasOwnProperty(iId)) {
                    continue;
                }
                var _811 = this._RequestsXhr[iId];
                if (_811.lengthComputable === false || !_811.total) {
                    this.LengthComputable = false;
                    this._ResetBytes();
                    break;
                }
                this.BytesLoaded += _811.loaded;
                this.BytesTotal += _811.total;
            }
            this._UpdatePercent();
        },
        _ResetBytes: function () {
            this.BytesLoaded = 0;
            this.BytesTotal = 0;
        },
        _UpdatePercent: function () {
            if (this.LengthComputable) {
                this.Percent = 0;
                for (var iId in this._RequestsXhr) {
                    if (!this._RequestsXhr.hasOwnProperty(iId)) {
                        continue;
                    }
                    var _813 = this._RequestsXhr[iId];
                    this.Percent += (_813.loaded * 100 / _813.total) / this.CountTotal;
                }
            } else {
                this.Percent = this.CountComplete * 100 / this.CountTotal;
            }
            this.Percent = Math.round(this.Percent * 100) / 100;
        }
    });
})();
(function () {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Request", null, {
        __static: {
            EVENT_ON_PROGRESS: "OnProgress",
            EVENT_ON_ERROR: "OnError",
            EVENT_ON_FINISH: "OnFinish",
            IdCounter: 0
        },
        Id: null,
        Session: null,
        Name: null,
        Progress: null,
        _RequestsCount: null,
        _WebDavRequests: null,
        _IsFinish: false,
        constructor: function (_815, _816, _817) {
            _816 = _816 || this.__instanceName;
            _817 = _817 || 1;
            this.Session = _815;
            this.Name = _816;
            this.Id = self.IdCounter++;
            this._WebDavRequests = [];
            this._WebDavResponses = {};
            this._RequestsCount = _817;
            this.Progress = new ITHit.WebDAV.Client.RequestProgress(_817);
        },
        AddListener: function (_818, _819, _81a) {
            _81a = _81a || null;
            switch (_818) {
                case self.EVENT_ON_PROGRESS:
                case self.EVENT_ON_ERROR:
                case self.EVENT_ON_FINISH:
                    ITHit.Events.AddListener(this, _818, _819, _81a);
                    break;
                default:
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _818 + "`");
            }
        },
        RemoveListener: function (_81b, _81c, _81d) {
            _81d = _81d || null;
            switch (_81b) {
                case self.EVENT_ON_PROGRESS:
                case self.EVENT_ON_ERROR:
                case self.EVENT_ON_FINISH:
                    ITHit.Events.RemoveListener(this, _81b, _81c, _81d);
                    break;
                default:
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _81b + "`");
            }
        },
        Abort: function () {
            for (var i = 0, l = this._WebDavRequests.length; i < l; i++) {
                this._WebDavRequests[i].Abort();
            }
        },
        MarkFinish: function () {
            if (this._IsFinish === true) {
                return;
            }
            this._IsFinish = true;
            ITHit.Events.DispatchEvent(this, self.EVENT_ON_FINISH, [{Request: this}]);
            var _820 = new Date();
            ITHit.Logger.WriteMessage("[" + this.Id + "] ----------------- Finished: " + _820.toUTCString() + " [" + _820.getTime() + "] -----------------" + "\n", ITHit.LogLevel.Info);
        },
        CreateWebDavRequest: function (_821, _822, _823) {
            var sId = this.Id;
            var _825 = new Date();
            if (this._WebDavRequests.length >= this._RequestsCount && typeof window.console !== "undefined") {
                console.error("Wrong count of requests in [" + this.Id + "] `" + this.Name + "`");
            }
            ITHit.Logger.WriteMessage("\n[" + sId + "] ----------------- Started: " + _825.toUTCString() + " [" + _825.getTime() + "] -----------------", ITHit.LogLevel.Info);
            ITHit.Logger.WriteMessage("[" + sId + "] Context Name: " + this.Name, ITHit.LogLevel.Info);
            var _826 = this.Session.CreateWebDavRequest(_821, _822, _823);
            ITHit.Events.AddListener(_826, "OnBeforeRequestSend", "_OnBeforeRequestSend", this);
            ITHit.Events.AddListener(_826, "OnResponse", "_OnResponse", this);
            ITHit.Events.AddListener(_826, "OnProgress", "_OnProgress", this);
            ITHit.Events.AddListener(_826, "OnFinish", "_OnFinish", this);
            this._WebDavRequests.push(_826);
            return _826;
        },
        GetInternalRequests: function () {
            var _827 = [];
            for (var i = 0, l = this._WebDavRequests.length; i < l; i++) {
                _827.push({
                    Request: this._WebDavRequests[i],
                    Response: this._WebDavResponses[this._WebDavRequests[i].Id] || null,
                });
            }
            return _827;
        },
        _OnBeforeRequestSend: function (_82a) {
            this._WriteRequestLog(_82a);
        },
        _OnResponse: function (_82b, _82c) {
            this._WebDavResponses[_82c] = _82b;
            this._WriteResponseLog(_82b);
        },
        _OnProgress: function (_82d, _82e) {
            var _82f = this.Progress.Percent;
            this.Progress.SetXhrEvent(_82e, _82d);
            if (this.Progress.Percent !== _82f) {
                ITHit.Events.DispatchEvent(this, self.EVENT_ON_PROGRESS, [{Progress: this.Progress, Request: this}]);
            }
        },
        _OnFinish: function (_830, _831) {
            var _832 = this.Progress.Percent;
            this.Progress.SetComplete(_831);
            if (this.Progress.Percent !== _832) {
                ITHit.Events.DispatchEvent(this, self.EVENT_ON_PROGRESS, [{Progress: this.Progress, Request: this}]);
            }
            if (!_830.IsSuccess) {
                ITHit.Events.DispatchEvent(this, self.EVENT_ON_ERROR, [{
                    Error: _830.Error,
                    AsyncResult: _830,
                    Request: this
                }]);
            }
        },
        _WriteRequestLog: function (_833) {
            ITHit.Logger.WriteMessage("[" + this.Id + "] " + _833.Method + " " + _833.Href, ITHit.LogLevel.Info);
            var _834 = [];
            for (var _835 in _833.Headers) {
                if (_833.Headers.hasOwnProperty(_835)) {
                    _834.push(_835 + ": " + _833.Headers[_835]);
                }
            }
            ITHit.Logger.WriteMessage("[" + this.Id + "] " + _834.join("\n"), ITHit.LogLevel.Info);
            var _836 = String(_833.Body) || "";
            if (_833.Method.toUpperCase() !== "PUT" && _833.Body) {
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _836, ITHit.LogLevel.Info);
            }
        },
        _WriteResponseLog: function (_837) {
            ITHit.Logger.WriteMessage("\n[" + this.Id + "] " + _837.Status + " " + _837.StatusDescription, ITHit.LogLevel.Info);
            var _838 = [];
            for (var _839 in _837.Headers) {
                if (_837.Headers.hasOwnProperty(_839)) {
                    _838.push(_839 + ": " + _837.Headers[_839]);
                }
            }
            ITHit.Logger.WriteMessage("[" + this.Id + "] " + _838.join("\n"), ITHit.LogLevel.Info);
            var _83a = (parseInt(_837.Status / 100) == 2);
            var _83b = _837.BodyXml && _837.BodyXml.childNodes.length ? String(new ITHit.XMLDoc(_837.BodyXml)) : _837.BodyText;
            if (!_83a || _837.RequestMethod.toUpperCase() !== "GET") {
                ITHit.Logger.WriteMessage("[" + this.Id + "] " + _83b, _83a ? ITHit.LogLevel.Info : ITHit.LogLevel.Debug);
            }
        }
    });
})();
(function () {
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.WebDavSession", null, {
        __static: {
            Version: "5.1.2821.0",
            ProtocolVersion: /(\d+)(?!.*\d)/.exec(ITHit.WebDAV.Client.DavConstants.ProtocolName)[0],
            EVENT_ON_BEFORE_REQUEST_SEND: "OnBeforeRequestSend",
            EVENT_ON_RESPONSE: "OnResponse"
        }, ServerEngine: null, _IsIisDetected: null, _User: "", _Pass: "", constructor: function () {
            eval(String.fromCharCode.call(this, 80 + 25, 102, 40, 73, 84, 72, 105, 116, 46, 36 + 51, 62 + 39, 36 + 62, 51 + 17, 50 + 15, 52 + 34, 11 + 35, 62 + 5, 108, 105, 101, 110, 116, 46, 76, 105, 97 + 2, 90 + 11, 110, 103 + 12, 58 + 43, 73, 41 + 59, 35 + 6, 17 + 15, 77 + 46, 32, 40, 50 + 52, 24 + 93, 110, 46 + 53, 7 + 109, 84 + 21, 18 + 93, 110, 18 + 14, 43 + 56, 104, 101, 99, 22 + 85, 36 + 40, 87 + 18, 70 + 29, 23 + 78, 110, 88 + 27, 101, 40, 41, 3 + 29, 123, 5 + 8, 32, 4 + 28, 25 + 7, 32, 44 + 74, 97, 20 + 94, 1 + 31, 115, 59 + 9, 1 + 110, 65 + 44, 63 + 34, 34 + 71, 9 + 101, 32, 61, 32, 31 + 3, 62 + 42, 116, 116, 112, 115, 58, 47, 43 + 4, 117 + 2, 119, 119, 31 + 15, 119, 101, 98, 100, 64 + 33, 32 + 86, 15 + 100, 93 + 28, 115, 116, 101, 109, 45 + 1, 99, 78 + 33, 109, 34, 59, 6 + 7, 28 + 4, 11 + 21, 19 + 13, 32, 12 + 106, 30 + 67, 22 + 92, 32, 69 + 46, 84 + 1, 107 + 7, 105, 32, 61, 16 + 16, 112 + 3, 68, 32 + 79, 109, 95 + 2, 105, 0 + 110, 1 + 31, 43, 32, 13 + 21, 47, 70 + 27, 112, 105, 34 + 13, 29 + 86, 35 + 82, 98, 115, 99, 114, 105, 112, 50 + 66, 52 + 53, 111, 33 + 77, 108, 26 + 79, 99, 101, 110, 5 + 110, 101, 47, 31 + 68, 104, 101, 99, 51 + 56, 22 + 25, 4 + 30, 59, 1 + 12, 32, 32, 16 + 16, 27 + 5, 91 + 27, 97, 66 + 48, 23 + 9, 52 + 63, 83, 116, 97, 116, 117, 115, 83, 116, 101 + 10, 13 + 101, 97, 91 + 12, 101, 19 + 56, 48 + 53, 121, 26 + 6, 61, 30 + 2, 34, 108, 45 + 60, 88 + 11, 18 + 83, 110, 115, 38 + 63, 43 + 3, 8 + 107, 77 + 39, 97, 116, 117, 115, 25 + 9, 27 + 32, 11 + 2, 1 + 31, 23 + 9, 2 + 30, 32, 118, 97, 114, 14 + 18, 115, 82, 51 + 50, 113, 117, 101, 56 + 59, 102 + 14, 79 + 4, 116, 3 + 108, 79 + 35, 97, 103, 66 + 35, 15 + 60, 93 + 8, 15 + 106, 32, 61, 25 + 7, 34, 65 + 43, 105, 92 + 7, 64 + 37, 110, 115, 58 + 43, 46, 114, 17 + 84, 104 + 9, 76 + 41, 101, 115, 32 + 84, 3 + 31, 59, 13, 8 + 24, 32 + 0, 32, 8 + 24, 118, 34 + 63, 90 + 24, 32, 105 + 10, 65, 84 + 15, 116, 117, 97, 2 + 106, 6 + 26, 18 + 43, 2 + 30, 34, 97, 37 + 62, 116, 25 + 92, 97, 23 + 85, 22 + 12, 35 + 24, 10 + 3, 9 + 23, 32, 32 + 0, 32, 118, 97, 0 + 114, 15 + 17, 115, 65 + 4, 20 + 100, 112, 39 + 66, 114, 23 + 78, 100, 32 + 0, 61, 27 + 5, 34, 72 + 29, 120, 112, 105, 114, 101, 100, 34, 4 + 55, 13, 32, 24 + 8, 30 + 2, 18 + 14, 118, 92 + 5, 114, 32, 115, 70, 97, 105, 108, 85 + 16, 100, 32, 61, 8 + 24, 34, 102, 37 + 60, 26 + 79, 108, 100 + 1, 100, 6 + 28, 25 + 34, 13, 32, 32, 9 + 23, 21 + 11, 85 + 33, 44 + 53, 114, 32, 115, 6 + 70, 105, 61 + 38, 101, 110, 26 + 89, 101, 69 + 4, 62 + 38, 32, 49 + 12, 9 + 23, 73, 21 + 63, 57 + 15, 11 + 94, 116, 1 + 45, 87, 101, 22 + 76, 68, 65, 86, 46, 53 + 14, 24 + 84, 105, 101, 110, 84 + 32, 46, 76, 105, 18 + 81, 93 + 8, 18 + 92, 115, 52 + 49, 21 + 52, 85 + 15, 24 + 35, 13, 13, 20 + 12, 32, 32, 32, 105, 102, 32, 40, 33, 115, 76, 42 + 63, 99, 39 + 62, 35 + 75, 50 + 65, 101, 4 + 69, 100, 41, 29 + 3, 114, 44 + 57, 116, 103 + 14, 114, 110, 32, 102, 35 + 62, 108, 30 + 85, 54 + 47, 6 + 53, 8 + 5, 31 + 1, 32, 32, 23 + 9, 105, 102, 40, 119, 89 + 16, 102 + 8, 22 + 78, 111, 109 + 10, 6 + 40, 12 + 86, 116, 111, 82 + 15, 41, 2 + 11, 3 + 29, 32, 6 + 26, 32, 123, 13, 19 + 13, 15 + 17, 32, 23 + 9, 1 + 31, 15 + 17, 32, 32, 115, 50 + 33, 13 + 103, 97, 105 + 11, 85 + 32, 65 + 50, 83, 116, 51 + 60, 3 + 111, 97, 54 + 49, 101, 75, 101, 121, 32, 61, 5 + 27, 46 + 73, 88 + 17, 110, 19 + 81, 111, 119, 46, 98, 101 + 15, 13 + 98, 17 + 80, 40, 101, 110, 99, 111, 41 + 59, 101, 69 + 16, 1 + 81, 73, 67, 111, 109, 46 + 66, 53 + 58, 110, 101, 110, 54 + 62, 19 + 21, 51 + 64, 83, 87 + 29, 97, 15 + 101, 32 + 85, 115, 6 + 77, 116, 73 + 38, 114, 97, 98 + 5, 69 + 32, 75, 13 + 88, 121, 41, 31 + 10, 19 + 40, 13, 32, 22 + 10, 4 + 28, 17 + 15, 32, 32, 10 + 22, 26 + 6, 28 + 87, 33 + 49, 101, 113, 117, 101, 88 + 27, 116, 31 + 52, 18 + 98, 111, 14 + 100, 97, 103, 101, 75, 93 + 8, 121, 2 + 30, 61, 26 + 6, 116 + 3, 11 + 94, 110, 50 + 50, 79 + 32, 47 + 72, 46, 86 + 12, 113 + 3, 111, 37 + 60, 40, 101, 50 + 60, 99, 111, 9 + 91, 92 + 9, 85, 82, 73, 67, 111, 109, 30 + 82, 109 + 2, 33 + 77, 101, 110, 37 + 79, 40, 29 + 86, 11 + 71, 101, 113, 117, 101, 28 + 87, 116, 83, 90 + 26, 111, 114, 88 + 9, 102 + 1, 91 + 10, 75, 101, 40 + 81, 34 + 7, 41, 59, 13, 11 + 21, 5 + 27, 32, 7 + 25, 68 + 57, 13, 11 + 2, 14 + 18, 32, 0 + 32, 32, 118, 40 + 57, 114, 16 + 16, 64 + 47, 76, 53 + 52, 99, 46 + 55, 18 + 92, 8 + 107, 17 + 84, 40 + 43, 116, 47 + 50, 13 + 103, 117, 115, 30 + 2, 61, 32, 103, 101, 116, 83, 116, 97, 99 + 17, 104 + 13, 115, 70, 111, 114, 59 + 8, 97 + 20, 114, 31 + 83, 101, 110, 97 + 19, 39 + 37, 105, 63 + 36, 101, 109 + 1, 115, 63 + 38, 11 + 29, 49 + 66, 74 + 9, 81 + 35, 97, 116, 87 + 30, 15 + 100, 5 + 78, 116, 111, 114, 89 + 8, 103, 46 + 55, 75, 99 + 2, 121, 41, 41 + 18, 13, 21 + 11, 32, 32, 25 + 7, 37 + 68, 89 + 13, 32, 22 + 18, 33, 111, 76, 105, 66 + 33, 21 + 80, 110, 115, 70 + 31, 12 + 71, 40 + 76, 97, 116, 30 + 87, 60 + 55, 3 + 29, 13 + 111, 124, 13, 32, 32, 17 + 15, 32, 32, 32, 32, 32, 111, 4 + 72, 105, 99, 9 + 92, 1 + 109, 115, 101, 82 + 1, 84 + 32, 36 + 61, 29 + 87, 108 + 9, 115, 46, 115, 1 + 115, 97, 31 + 85, 117, 73 + 42, 3 + 29, 54 + 7, 2 + 59, 61, 5 + 27, 115, 1 + 68, 95 + 25, 112, 105, 97 + 17, 101, 65 + 35, 4 + 28, 98 + 26, 124, 13, 32, 10 + 22, 32, 32, 30 + 2, 2 + 30, 32, 32, 111, 76, 105, 99, 101, 110, 115, 101, 83, 58 + 58, 97, 98 + 18, 117, 92 + 23, 46, 42 + 59, 102 + 18, 61 + 51, 105, 114, 101, 58 + 42, 65, 116, 32, 18 + 42, 32, 59 + 51, 1 + 100, 117 + 2, 32, 35 + 33, 97, 17 + 99, 62 + 39, 30 + 10, 8 + 33, 41, 4 + 28, 17 + 106, 13, 32, 32, 32, 32, 6 + 26, 15 + 17, 16 + 16, 32, 118, 97, 114, 17 + 15, 14 + 84, 17 + 56, 59 + 56, 33 + 32, 115, 112 + 9, 46 + 64, 11 + 88, 8 + 24, 22 + 39, 14 + 18, 33, 91 + 20, 5 + 71, 96 + 9, 99, 32 + 69, 78 + 32, 115, 101, 83, 79 + 37, 49 + 48, 101 + 15, 117, 55 + 60, 28 + 4, 84 + 40, 54 + 70, 30 + 2, 111, 73 + 3, 9 + 96, 99 + 0, 101, 58 + 52, 115, 77 + 24, 83, 97 + 19, 97, 39 + 77, 55 + 62, 81 + 34, 3 + 43, 101 + 14, 116, 97, 81 + 35, 0 + 117, 79 + 36, 3 + 29, 61, 56 + 5, 61, 32, 115, 21 + 44, 34 + 65, 2 + 114, 117, 97, 60 + 48, 59, 12 + 1, 32, 21 + 11, 24 + 8, 32, 23 + 9, 23 + 9, 32, 32, 46 + 59, 102, 12 + 20, 19 + 21, 98, 73, 23 + 92, 65, 48 + 67, 121, 55 + 55, 99, 32, 29 + 9, 38, 7 + 25, 33, 98, 101, 103, 27 + 78, 110, 30 + 52, 101, 113, 111 + 6, 101, 115, 103 + 13, 40, 41, 30 + 11, 11 + 21, 97 + 17, 8 + 93, 76 + 40, 117, 75 + 39, 5 + 105, 17 + 15, 116, 34 + 80, 71 + 46, 44 + 57, 59, 11 + 2, 14 + 18, 32, 32, 28 + 4, 32, 2 + 30, 24 + 8, 32, 32, 2 + 30, 32, 32, 37 + 81, 79 + 18, 46 + 68, 32, 111, 82, 37 + 64, 113, 32, 38 + 23, 6 + 26, 110, 101, 116 + 3, 20 + 12, 88, 9 + 68, 76, 72, 116, 116, 112, 82, 78 + 23, 113, 117, 69 + 32, 115, 104 + 12, 40, 41, 59, 3 + 10, 5 + 27, 24 + 8, 13 + 19, 8 + 24, 32 + 0, 32, 8 + 24, 6 + 26, 18 + 14, 17 + 15, 11 + 21, 24 + 8, 105, 102, 33 + 7, 76 + 22, 73, 27 + 88, 13 + 52, 72 + 43, 119 + 2, 23 + 87, 99, 8 + 33, 32, 111, 79 + 3, 79 + 22, 113, 32 + 14, 111, 45 + 65, 114, 58 + 43, 58 + 39, 100, 77 + 44, 17 + 98, 1 + 115, 97, 109 + 7, 101, 99, 102 + 2, 37 + 60, 110, 58 + 45, 3 + 98, 16 + 16, 61, 4 + 28, 111, 110, 40 + 42, 13 + 88, 113, 16 + 101, 57 + 44, 23 + 92, 116, 37 + 30, 104, 37 + 60, 110, 103, 101, 59, 6 + 7, 13 + 19, 8 + 24, 32, 27 + 5, 32, 32, 32, 32, 32, 32, 32, 15 + 17, 67 + 44, 30 + 52, 101, 113, 46, 33 + 78, 112, 101, 46 + 64, 40, 34, 80, 79, 83, 22 + 62, 34, 44, 32, 115, 85, 114, 105, 44, 32, 6 + 92, 73, 115, 27 + 38, 115, 94 + 27, 97 + 13, 99, 41, 59, 13, 23 + 9, 28 + 4, 32, 32, 32, 32, 32, 32, 32, 17 + 15, 17 + 15, 27 + 5, 56 + 55, 82, 20 + 81, 13 + 100, 12 + 34, 115, 4 + 97, 116, 82, 19 + 82, 112 + 1, 117, 60 + 41, 115, 97 + 19, 72, 1 + 100, 97, 100, 101, 114, 40, 20 + 19, 20 + 47, 24 + 87, 110, 116, 101, 110, 109 + 7, 45, 48 + 36, 121, 112, 101, 39, 44, 7 + 25, 0 + 39, 97, 112, 112, 108, 64 + 41, 6 + 93, 97, 116, 57 + 48, 27 + 84, 110, 47, 120 + 0, 26 + 19, 37 + 82, 119, 119, 45, 102, 107 + 4, 3 + 111, 109, 45, 117, 44 + 70, 108, 85 + 16, 19 + 91, 58 + 41, 111, 19 + 81, 31 + 70, 49 + 51, 38 + 1, 41, 59, 12 + 1, 25 + 7, 31 + 1, 21 + 11, 6 + 26, 17 + 15, 32, 32 + 0, 32, 118, 86 + 11, 102 + 12, 17 + 15, 26 + 89, 80, 97, 54 + 60, 31 + 66, 109, 115, 32, 61, 32, 34, 105, 27 + 73, 57 + 4, 34, 32, 43, 25 + 7, 101, 81 + 29, 98 + 1, 111, 64 + 36, 78 + 23, 54 + 31, 82, 47 + 26, 67, 111, 19 + 90, 110 + 2, 111, 110, 101, 21 + 89, 116, 34 + 6, 115, 76, 105, 39 + 60, 101, 110, 105 + 10, 35 + 66, 6 + 67, 100, 41, 28 + 4, 43, 32, 34, 38, 112, 114, 111, 43 + 57, 117, 17 + 82, 116, 78, 19 + 78, 109, 6 + 95, 104 + 11, 61, 34, 4 + 28, 30 + 13, 32, 42 + 31, 46 + 38, 67 + 5, 105, 95 + 21, 46, 80, 47 + 57, 46 + 68, 88 + 9, 115, 101, 115, 46, 80, 114, 84 + 27, 100, 117, 97 + 2, 116, 78, 97, 102 + 7, 101, 10 + 49, 5 + 8, 11 + 21, 11 + 21, 16 + 16, 32, 32, 21 + 11, 16 + 16, 32, 116, 99 + 15, 121, 28 + 4, 30 + 93, 8 + 5, 32, 12 + 20, 32, 32, 1 + 31, 15 + 17, 5 + 27, 22 + 10, 8 + 24, 32, 32, 22 + 10, 111, 46 + 36, 101, 113, 29 + 17, 115, 50 + 51, 74 + 36, 34 + 66, 12 + 28, 115, 80, 42 + 55, 6 + 108, 73 + 24, 73 + 36, 34 + 81, 41, 55 + 4, 13, 29 + 3, 32, 32, 32, 32, 32, 32, 32, 125, 32, 0 + 99, 97, 116, 26 + 73, 104, 17 + 15, 23 + 17, 101, 41, 20 + 12, 123, 11 + 2, 18 + 14, 32, 32, 32, 15 + 17, 32, 32, 18 + 14, 10 + 22, 19 + 13, 15 + 17, 32, 111, 24 + 86, 50 + 32, 101, 2 + 111, 117, 95 + 6, 115, 116, 70, 40 + 57, 71 + 34, 108, 69 + 32, 100, 12 + 34, 99, 97, 91 + 17, 108, 5 + 35, 111, 82, 101, 113, 41, 38 + 21, 5 + 8, 30 + 2, 16 + 16, 32, 6 + 26, 25 + 7, 32, 10 + 22, 32, 125, 1 + 12, 7 + 6, 32, 12 + 20, 29 + 3, 3 + 29, 32, 32, 15 + 17, 20 + 12, 105, 4 + 98, 40, 27 + 6, 98, 39 + 34, 27 + 88, 65, 17 + 98, 48 + 73, 76 + 34, 79 + 20, 33 + 8, 32, 111, 110, 82, 101, 66 + 47, 117, 101, 115, 116, 67, 104, 17 + 80, 110, 103, 101, 46, 52 + 47, 97, 108, 58 + 50, 40, 111, 82, 81 + 20, 32 + 81, 35 + 6, 59, 13, 15 + 17, 28 + 4, 10 + 22, 32, 32, 32, 32, 32, 13 + 101, 101, 116, 22 + 95, 48 + 66, 110, 20 + 12, 116, 114, 61 + 56, 28 + 73, 59, 13, 32, 8 + 24, 32, 29 + 3, 125, 32, 101, 102 + 6, 115, 101, 15 + 17, 9 + 114, 13, 32, 32, 3 + 29, 32, 32, 32, 32, 32, 114, 12 + 89, 116, 86 + 31, 114, 110, 32, 111, 28 + 48, 105, 83 + 16, 101, 84 + 26, 97 + 18, 67 + 34, 83, 5 + 111, 45 + 52, 15 + 101, 117, 88 + 27, 32, 33, 52 + 9, 24 + 37, 30 + 2, 115, 69, 67 + 53, 112, 52 + 53, 114, 5 + 96, 100, 59, 7 + 6, 32, 18 + 14, 13 + 19, 32, 125, 13, 13, 32, 32, 32 + 0, 27 + 5, 102, 117, 110, 99, 61 + 55, 2 + 103, 111, 110, 16 + 16, 1 + 110, 37 + 73, 13 + 69, 71 + 30, 113, 117, 17 + 84, 18 + 97, 116, 27 + 40, 25 + 79, 97, 110, 68 + 35, 101, 40, 41, 32, 123, 4 + 9, 19 + 13, 31 + 1, 32, 32, 3 + 29, 21 + 11, 10 + 22, 24 + 8, 8 + 97, 102, 40, 116, 104, 105, 115, 32 + 14, 108 + 6, 77 + 24, 97, 21 + 79, 121, 39 + 44, 116, 97, 116, 44 + 57, 32, 33, 7 + 54, 61, 22 + 10, 88, 16 + 61, 45 + 31, 72, 75 + 41, 94 + 22, 18 + 94, 17 + 65, 101, 113, 117, 101, 115, 116, 1 + 45, 49 + 19, 79, 61 + 17, 3 + 66, 3 + 38, 0 + 32, 114, 101, 18 + 98, 68 + 49, 114, 44 + 66, 28 + 31, 3 + 10, 13, 10 + 22, 32, 32, 32, 8 + 24, 32, 32, 25 + 7, 108, 111, 37 + 62, 97, 79 + 29, 83, 84 + 32, 111, 114, 53 + 44, 103, 84 + 17, 46, 114, 49 + 52, 28 + 81, 111, 106 + 12, 101, 36 + 37, 116, 101, 109, 40, 86 + 29, 51 + 31, 26 + 75, 113, 50 + 67, 56 + 45, 115, 108 + 8, 46 + 37, 116, 2 + 109, 114, 97, 103, 101, 12 + 63, 101, 121, 33 + 8, 59, 7 + 6, 32, 8 + 24, 25 + 7, 32, 21 + 11, 32, 14 + 18, 32, 52 + 53, 102, 31 + 1, 18 + 22, 116, 104, 42 + 63, 67 + 48, 46, 115, 103 + 13, 64 + 33, 116, 117, 16 + 99, 32, 16 + 17, 61, 61, 1 + 31, 37 + 13, 48, 24 + 24, 16 + 25, 32, 91 + 32, 13, 32, 26 + 6, 32, 28 + 4, 3 + 29, 32, 32, 32, 32, 12 + 20, 32, 32, 71 + 40, 59 + 51, 57 + 25, 101, 92 + 21, 89 + 28, 66 + 35, 115, 71 + 45, 70, 64 + 33, 105, 108, 101, 100, 46, 51 + 48, 97, 108, 15 + 93, 40, 66 + 50, 104, 23 + 82, 115, 41, 9 + 50, 3 + 10, 4 + 28, 32, 32, 32, 32, 0 + 32, 32, 16 + 16, 32, 32, 24 + 8, 32, 17 + 97, 101, 79 + 37, 47 + 70, 114, 47 + 63, 59, 2 + 11, 32, 20 + 12, 32, 5 + 27, 26 + 6, 29 + 3, 32, 23 + 9, 125, 13, 10 + 3, 18 + 14, 32, 9 + 23, 32, 32, 32, 16 + 16, 32, 0 + 118, 33 + 64, 114, 29 + 3, 111, 82, 30 + 71, 105 + 10, 49 + 63, 60 + 51, 14 + 96, 77 + 38, 101, 32, 17 + 44, 32, 55 + 19, 80 + 3, 58 + 21, 78, 46, 112, 85 + 12, 4 + 110, 115, 100 + 1, 40, 96 + 20, 104, 105, 96 + 19, 7 + 39, 114, 7 + 94, 115, 66 + 46, 111, 110, 13 + 102, 101, 2 + 39, 59, 11 + 2, 11 + 21, 32, 32, 12 + 20, 32, 29 + 3, 3 + 29, 32, 105, 102, 40, 33, 111, 62 + 20, 32 + 69, 32 + 83, 78 + 34, 28 + 83, 110, 40 + 75, 101, 44 + 2, 53 + 20, 79 + 36, 69, 120, 112, 54 + 51, 103 + 11, 101, 100, 32, 29 + 9, 23 + 15, 25 + 7, 69 + 42, 73 + 9, 101, 7 + 108, 112, 88 + 23, 110, 115, 101, 23 + 23, 27 + 46, 16 + 99, 59 + 27, 88 + 9, 100 + 8, 3 + 102, 46 + 54, 41, 13, 32, 32 + 0, 20 + 12, 9 + 23, 26 + 6, 23 + 9, 15 + 17, 32, 123, 13, 31 + 1, 32, 25 + 7, 32, 32, 23 + 9, 13 + 19, 25 + 7, 32, 22 + 10, 9 + 23, 32, 115, 37 + 64, 88 + 28, 35 + 48, 116, 97, 116, 117, 102 + 13, 29 + 41, 111, 114, 67, 4 + 113, 10 + 104, 114, 101, 14 + 96, 116, 76, 105, 14 + 85, 101, 115, 101, 27 + 13, 35 + 80, 65, 26 + 73, 107 + 9, 3 + 114, 97, 108, 41, 9 + 50, 13, 25 + 7, 32, 31 + 1, 32, 22 + 10, 1 + 31, 32, 32, 14 + 18, 13 + 19, 32, 26 + 6, 114, 101, 116, 69 + 48, 114, 104 + 6, 59, 11 + 2, 7 + 25, 12 + 20, 32, 6 + 26, 32, 32, 19 + 13, 30 + 2, 125, 2 + 11, 2 + 11, 16 + 16, 32, 17 + 15, 14 + 18, 32 + 0, 32, 32, 32, 23 + 92, 18 + 83, 116, 83, 116, 45 + 52, 116, 117, 64 + 51, 60 + 10, 2 + 109, 50 + 64, 35 + 32, 89 + 28, 114, 66 + 48, 76 + 25, 110, 50 + 66, 76, 105, 1 + 98, 48 + 53, 115, 52 + 49, 40, 30 + 85, 10 + 59, 110 + 10, 19 + 93, 14 + 91, 114, 101, 31 + 69, 41, 5 + 54, 13, 32, 32, 32, 27 + 5, 32, 32, 31 + 1, 6 + 26, 61 + 44, 46 + 56, 40, 33, 111, 53 + 29, 101, 115, 24 + 88, 18 + 93, 110, 115, 56 + 45, 22 + 24, 69, 107 + 7, 48 + 66, 111, 114, 67 + 18, 81 + 33, 2 + 106, 15 + 26, 13, 32, 14 + 18, 32, 32, 1 + 31, 9 + 23, 7 + 25, 19 + 13, 123, 7 + 6, 32, 32, 32, 32, 10 + 22, 32, 32, 24 + 8, 15 + 17, 9 + 23, 17 + 15, 11 + 21, 97, 108, 101, 114, 94 + 22, 40, 111, 29 + 53, 101, 41 + 74, 112, 111, 110, 31 + 84, 101, 19 + 27, 69, 91 + 23, 27 + 87, 111, 77 + 37, 77, 71 + 30, 20 + 95, 115, 97, 103, 48 + 53, 41, 59, 13, 32, 32, 32, 32, 17 + 15, 32, 32, 32, 32, 7 + 25, 32, 32, 21 + 95, 93 + 11, 105 + 9, 111, 119, 32, 21 + 89, 41 + 60, 119, 32, 69, 35 + 79, 114, 29 + 82, 114, 21 + 19, 67 + 44, 82, 3 + 98, 115, 112, 111, 110, 77 + 38, 101, 46, 0 + 69, 114, 114, 111, 114, 77, 101, 79 + 36, 36 + 79, 4 + 93, 103, 101, 41, 11 + 48, 3 + 10, 32, 32, 26 + 6, 32, 28 + 4, 32, 8 + 24, 32, 38 + 87, 13, 0 + 13, 4 + 28, 32, 19 + 13, 24 + 8, 2 + 30, 32, 6 + 26, 26 + 6, 41 + 64, 101 + 1, 32, 40, 99, 13 + 98, 110, 32 + 70, 105, 82 + 32, 109, 40, 111, 56 + 26, 101, 26 + 89, 112, 111, 110, 97 + 18, 54 + 47, 46, 19 + 50, 17 + 97, 114, 1 + 110, 11 + 103, 77, 101, 115, 111 + 4, 10 + 87, 103, 101, 41, 26 + 15, 32, 123, 13, 6 + 26, 15 + 17, 25 + 7, 32, 18 + 14, 32, 32, 5 + 27, 32, 7 + 25, 5 + 27, 16 + 16, 37 + 71, 12 + 99, 99, 97, 4 + 112, 67 + 38, 30 + 81, 93 + 17, 46, 104, 114, 44 + 57, 102, 12 + 20, 29 + 32, 19 + 13, 60 + 51, 82, 43 + 58, 115, 36 + 76, 111, 49 + 61, 115, 101, 46, 43 + 26, 89 + 25, 114, 111, 114, 85, 114, 108, 59, 6 + 7, 32, 32, 32, 27 + 5, 9 + 23, 19 + 13, 18 + 14, 32, 58 + 67, 29 + 3, 101, 108, 115, 62 + 39, 32, 123, 13, 29 + 3, 28 + 4, 1 + 31, 32, 32, 13 + 19, 32, 25 + 7, 32, 32, 30 + 2, 32, 116, 104, 114, 77 + 34, 119, 3 + 29, 90 + 20, 101, 51 + 68, 32, 69, 114, 114, 111, 114, 40, 21 + 13, 70, 97, 105, 108, 69 + 32, 34 + 66, 5 + 27, 99, 76 + 28, 101, 79 + 20, 9 + 98, 7 + 25, 81 + 27, 105, 99, 62 + 39, 110, 115, 101, 34, 35 + 6, 59, 1 + 12, 32, 26 + 6, 14 + 18, 32, 32, 29 + 3, 32, 11 + 21, 57 + 68, 7 + 6, 32, 27 + 5, 32, 20 + 12, 40 + 85, 13, 3 + 10, 8 + 24, 16 + 16, 32, 3 + 29, 38 + 64, 20 + 97, 110, 99, 109 + 7, 54 + 51, 111, 93 + 17, 16 + 16, 111, 102 + 8, 28 + 54, 101, 97 + 16, 117, 101, 53 + 62, 115 + 1, 29 + 41, 31 + 66, 105, 108, 101, 99 + 1, 22 + 18, 41, 20 + 12, 71 + 52, 13, 32, 32, 32, 26 + 6, 20 + 12, 32, 30 + 2, 32, 108, 111, 99, 12 + 85, 30 + 78, 54 + 29, 63 + 53, 111, 24 + 90, 71 + 26, 62 + 41, 92 + 9, 46, 28 + 86, 101, 78 + 31, 111, 118, 101, 73, 43 + 73, 101, 50 + 59, 40, 115, 33 + 49, 19 + 82, 113, 117, 101, 115, 10 + 106, 83, 60 + 56, 88 + 23, 81 + 33, 97, 103, 40 + 61, 46 + 29, 15 + 86, 119 + 2, 41, 59, 13, 32, 14 + 18, 25 + 7, 32, 16 + 16, 32, 32, 32, 4 + 114, 56 + 41, 114, 0 + 32, 81 + 30, 83, 116, 97, 93 + 23, 68 + 49, 18 + 97, 6 + 26, 61, 32, 62 + 41, 93 + 8, 116, 83, 116, 97, 116, 117, 17 + 98, 7 + 63, 111, 114, 37 + 30, 4 + 113, 100 + 14, 13 + 101, 101, 74 + 36, 86 + 30, 2 + 74, 98 + 7, 3 + 96, 36 + 65, 104 + 6, 101 + 14, 97 + 4, 40, 41, 59, 13, 5 + 27, 32, 29 + 3, 32, 26 + 6, 32, 25 + 7, 14 + 18, 48 + 57, 37 + 65, 15 + 17, 40, 33, 33, 111, 16 + 67, 97 + 19, 97, 116, 117, 72 + 43, 32, 38, 38, 3 + 10, 32, 32, 32, 32, 32, 32, 9 + 23, 6 + 26, 24 + 8, 32, 32, 8 + 24, 111, 7 + 76, 58 + 58, 29 + 68, 97 + 19, 117, 72 + 43, 46 + 0, 104 + 11, 116, 20 + 77, 116, 117, 115, 19 + 13, 61, 61, 61, 2 + 30, 115, 9 + 61, 32 + 65, 105, 75 + 33, 101, 100, 30 + 2, 38, 3 + 35, 13, 32, 32, 32, 18 + 14, 32, 32, 32, 32, 18 + 14, 17 + 15, 5 + 27, 32, 104 + 7, 10 + 73, 116, 97, 116, 28 + 89, 86 + 29, 15 + 31, 45 + 56, 120, 21 + 91, 14 + 91, 65 + 49, 41 + 60, 100, 65, 50 + 66, 32, 60, 32, 94 + 16, 101, 115 + 4, 17 + 15, 44 + 24, 63 + 34, 17 + 99, 101, 40, 17 + 24, 41, 9 + 23, 79 + 44, 13, 32, 32, 32, 13 + 19, 3 + 29, 21 + 11, 32, 10 + 22, 32, 32, 32, 32, 118, 97, 114, 2 + 30, 109, 101, 115, 87 + 28, 51 + 46, 103, 61 + 40, 32, 30 + 31, 16 + 16, 3 + 31, 76, 105, 99, 87 + 14, 35 + 75, 115, 101, 28 + 4, 118, 97, 78 + 30, 77 + 28, 100, 97, 116, 46 + 59, 111, 110, 10 + 22, 85 + 17, 88 + 9, 43 + 62, 108, 101, 48 + 52, 46, 32, 0 + 67, 71 + 26, 110, 14 + 18, 110, 111, 2 + 114, 22 + 10, 20 + 79, 111, 110, 3 + 107, 101, 99, 116, 32, 116, 111, 32, 41 + 67, 105, 2 + 97, 101, 90 + 20, 33 + 82, 101, 5 + 27, 33 + 85, 20 + 77, 23 + 85, 105, 27 + 73, 79 + 18, 2 + 114, 38 + 67, 63 + 48, 110, 20 + 12, 115, 101, 114, 82 + 36, 52 + 49, 114, 17 + 29, 16 + 16, 92, 57 + 53, 15 + 19, 13, 32, 32, 24 + 8, 14 + 18, 32, 24 + 8, 6 + 26, 30 + 2, 32, 18 + 14, 32, 32, 32, 32, 32, 11 + 21, 43, 1 + 31, 84 + 32, 81 + 23, 79 + 26, 60 + 55, 46, 5 + 110, 56 + 60, 52 + 45, 70 + 46, 35 + 82, 115, 84, 101, 120, 116, 32, 40 + 3, 15 + 17, 39, 46, 92, 63 + 47, 77, 13 + 84, 30 + 77, 101, 32, 115, 117, 114, 101, 32, 6 + 115, 25 + 86, 97 + 20, 114, 13 + 19, 109, 50 + 47, 57 + 42, 104, 5 + 100, 30 + 80, 101, 30 + 2, 99, 78 + 19, 88 + 22, 4 + 28, 18 + 79, 99, 99, 101, 65 + 50, 38 + 77, 32, 9 + 25, 12 + 27, 32, 43, 32, 115, 7 + 61, 111, 109, 97, 29 + 76, 110, 32, 43, 32, 39, 32 + 2, 46, 39, 59, 13, 20 + 12, 32, 32, 15 + 17, 5 + 27, 32, 30 + 2, 22 + 10, 20 + 12, 6 + 26, 13 + 19, 17 + 15, 99, 111, 1 + 109, 38 + 64, 27 + 78, 85 + 29, 60 + 49, 7 + 33, 109, 101, 111 + 4, 115, 97, 103, 64 + 37, 25 + 16, 15 + 44, 13, 28 + 4, 32, 28 + 4, 29 + 3, 8 + 24, 14 + 18, 32, 24 + 8, 32, 3 + 29, 27 + 5, 32, 49 + 67, 104, 114, 2 + 109, 119, 3 + 29, 35 + 75, 83 + 18, 119, 26 + 6, 61 + 8, 114, 114, 87 + 24, 114, 40, 18 + 16, 37 + 33, 97, 105, 108, 87 + 14, 100, 27 + 5, 89 + 10, 21 + 83, 101, 99, 90 + 17, 6 + 26, 42 + 66, 105, 24 + 75, 99 + 2, 110, 74 + 41, 101, 1 + 33, 41, 59, 8 + 5, 32, 12 + 20, 24 + 8, 28 + 4, 32, 29 + 3, 32, 32, 102 + 23, 1 + 12, 13, 20 + 12, 20 + 12, 32, 32, 32, 32, 32, 11 + 21, 115, 68 + 33, 116, 46 + 37, 116, 97, 116, 117, 80 + 35, 70, 34 + 77, 2 + 112, 67, 117, 108 + 6, 114, 101, 110, 116, 76, 54 + 51, 99, 101, 115, 49 + 52, 25 + 15, 115, 70, 97, 105, 99 + 9, 101, 100, 41, 52 + 7, 7 + 6, 32, 13 + 19, 32, 0 + 32, 125, 13, 7 + 6, 20 + 12, 2 + 30, 32, 32, 69 + 33, 18 + 99, 85 + 25, 1 + 98, 116, 2 + 103, 111, 110, 6 + 26, 115, 44 + 57, 107 + 9, 83, 116, 97, 116, 117, 20 + 95, 70, 111, 29 + 85, 51 + 16, 9 + 108, 55 + 59, 70 + 44, 101, 72 + 38, 38 + 78, 43 + 33, 9 + 96, 99, 101, 111 + 4, 101, 40, 110 + 5, 44 + 32, 97 + 8, 99, 101, 99 + 11, 115, 95 + 6, 83, 15 + 101, 0 + 97, 2 + 114, 117, 89 + 26, 44, 32, 2 + 109, 53 + 16, 120, 44 + 68, 105, 114, 85 + 16, 26 + 42, 97, 116, 101, 14 + 27, 32, 123, 13, 6 + 26, 10 + 22, 21 + 11, 32, 31 + 1, 12 + 20, 32, 30 + 2, 118, 97, 114, 32, 75 + 25, 58 + 43, 102, 40 + 57, 89 + 28, 108, 74 + 42, 68, 10 + 87, 37 + 79, 101, 32, 17 + 44, 32, 96 + 14, 31 + 70, 119, 21 + 11, 34 + 34, 97, 116, 18 + 83, 40, 41, 38 + 21, 13, 32, 5 + 27, 30 + 2, 32, 32, 18 + 14, 28 + 4, 32, 58 + 42, 29 + 72, 102, 97, 117, 97 + 11, 116, 37 + 31, 93 + 4, 42 + 74, 101, 44 + 2, 115, 101, 86 + 30, 68, 29 + 68, 116, 101, 40, 16 + 84, 99 + 2, 102, 63 + 34, 117, 80 + 28, 116, 68, 50 + 47, 116, 101, 20 + 26, 103, 101, 116, 60 + 8, 97, 116, 21 + 80, 40, 41, 16 + 16, 13 + 30, 23 + 9, 49, 12 + 29, 59, 13, 28 + 4, 16 + 16, 32, 32, 32, 22 + 10, 32, 15 + 17, 118, 97, 1 + 113, 32, 70 + 41, 83, 60 + 56, 21 + 76, 19 + 97, 117, 57 + 58, 32, 61, 10 + 22, 123, 11 + 2, 32, 32, 32, 13 + 19, 21 + 11, 25 + 7, 9 + 23, 18 + 14, 23 + 9, 32, 24 + 8, 21 + 11, 79 + 29, 105, 99, 101, 50 + 60, 72 + 43, 101, 73, 100, 58, 27 + 5, 48 + 67, 55 + 21, 105, 22 + 77, 101, 110, 115, 101, 73, 100, 44, 5 + 8, 32, 32, 32, 32, 32, 32, 14 + 18, 20 + 12, 13 + 19, 30 + 2, 4 + 28, 15 + 17, 101, 120, 112, 55 + 50, 114, 27 + 74, 100, 65, 116, 16 + 42, 32, 55 + 56, 69, 57 + 63, 112, 105, 21 + 93, 101, 68, 97, 116, 1 + 100, 32, 34 + 90, 124, 12 + 20, 1 + 99, 101, 102, 97, 117, 1 + 107, 1 + 115, 46 + 22, 97, 76 + 40, 101, 12 + 32, 13, 32, 32, 32, 25 + 7, 32, 4 + 28, 10 + 22, 32, 1 + 31, 32, 13 + 19, 29 + 3, 3 + 112, 98 + 18, 25 + 72, 91 + 25, 58 + 59, 87 + 28, 58, 32, 52 + 63, 76, 90 + 15, 99, 47 + 54, 49 + 61, 23 + 92, 61 + 40, 51 + 32, 116, 97, 116, 117, 115, 13, 32, 32, 17 + 15, 32, 6 + 26, 17 + 15, 27 + 5, 4 + 28, 117 + 8, 59, 1 + 12, 2 + 11, 19 + 13, 19 + 13, 32, 32, 19 + 13, 32, 26 + 6, 32, 115, 101, 116, 84, 111, 17 + 66, 116, 49 + 62, 103 + 11, 97, 103, 18 + 83, 31 + 9, 115, 53 + 30, 116, 26 + 71, 116, 75 + 42, 115, 83, 47 + 69, 111, 51 + 63, 97, 19 + 84, 101, 27 + 48, 101, 61 + 60, 44, 2 + 30, 109 + 2, 83, 115 + 1, 97, 116, 43 + 74, 115, 41, 13 + 46, 1 + 12, 32, 32, 15 + 17, 7 + 25, 125, 5 + 8, 7 + 6, 32, 3 + 29, 8 + 24, 32, 102, 90 + 27, 95 + 15, 33 + 66, 11 + 105, 70 + 35, 98 + 13, 26 + 84, 32, 103, 58 + 43, 107 + 9, 83, 57 + 59, 43 + 54, 53 + 63, 75 + 42, 115, 61 + 9, 111, 77 + 37, 11 + 56, 83 + 34, 114, 103 + 11, 101, 51 + 59, 109 + 7, 76, 39 + 66, 99, 39 + 62, 100 + 10, 57 + 58, 86 + 15, 38 + 2, 24 + 17, 32, 11 + 112, 3 + 10, 26 + 6, 22 + 10, 32, 32, 32, 32, 32, 32, 118, 50 + 47, 114, 32, 111, 3 + 80, 116, 10 + 87, 116, 117, 40 + 75, 32, 61, 20 + 12, 35 + 68, 45 + 56, 116, 70, 114, 48 + 63, 49 + 60, 74 + 9, 64 + 52, 26 + 85, 85 + 29, 97, 103, 55 + 46, 40, 115, 28 + 55, 27 + 89, 19 + 78, 110 + 6, 117, 115, 31 + 52, 51 + 65, 90 + 21, 90 + 24, 97, 103, 19 + 82, 25 + 50, 55 + 46, 31 + 90, 41, 59, 13, 2 + 30, 5 + 27, 32, 32, 32, 4 + 28, 10 + 22, 3 + 29, 78 + 27, 102, 32, 13 + 27, 33, 111, 50 + 33, 99 + 17, 97, 116, 37 + 80, 115, 32, 124, 124, 13, 32, 9 + 23, 1 + 31, 9 + 23, 18 + 14, 23 + 9, 32 + 0, 32, 18 + 14, 32, 32, 23 + 9, 59 + 52, 83, 66 + 50, 97, 116, 117, 115, 27 + 19, 108, 11 + 94, 99, 101, 85 + 25, 115, 67 + 34, 73, 100, 32, 32 + 1, 61, 61, 32, 115, 3 + 73, 105, 99, 38 + 63, 101 + 9, 115, 101, 38 + 35, 99 + 1, 41, 5 + 27, 110 + 13, 11 + 2, 19 + 13, 32, 32, 6 + 26, 32, 26 + 6, 32, 32, 12 + 20, 32, 32, 32, 110 + 4, 101, 73 + 43, 60 + 57, 71 + 43, 69 + 41, 1 + 31, 6 + 104, 92 + 25, 61 + 47, 108, 59, 13, 28 + 4, 3 + 29, 12 + 20, 32, 25 + 7, 13 + 19, 32, 32, 53 + 72, 6 + 7, 0 + 13, 31 + 1, 2 + 30, 3 + 29, 32, 32, 15 + 17, 20 + 12, 27 + 5, 55 + 56, 17 + 66, 43 + 73, 31 + 66, 94 + 22, 86 + 31, 55 + 60, 8 + 38, 33 + 68, 120, 112, 15 + 90, 114, 37 + 64, 22 + 78, 65, 103 + 13, 32, 55 + 6, 5 + 27, 93 + 17, 101, 78 + 41, 32, 68, 97, 116, 101, 40, 3 + 108, 83, 20 + 96, 74 + 23, 93 + 23, 71 + 46, 115, 4 + 42, 23 + 78, 120, 112, 96 + 9, 105 + 9, 9 + 92, 66 + 34, 53 + 12, 15 + 101, 41, 11 + 48, 11 + 2, 15 + 17, 5 + 27, 32, 32, 28 + 4, 23 + 9, 3 + 29, 32, 36 + 78, 101, 16 + 100, 117, 114, 64 + 46, 32, 111, 70 + 13, 15 + 101, 97, 44 + 72, 117, 25 + 90, 59, 1 + 12, 15 + 17, 32, 16 + 16, 32, 100 + 25, 13, 13, 20 + 12, 15 + 17, 19 + 13, 32, 4 + 98, 78 + 39, 88 + 22, 46 + 53, 3 + 113, 63 + 42, 100 + 11, 55 + 55, 32, 38 + 60, 46 + 55, 54 + 49, 52 + 53, 110, 82, 101, 82 + 31, 117, 101, 31 + 84, 116 + 0, 40, 9 + 32, 32, 41 + 82, 4 + 9, 32, 32, 32, 16 + 16, 32, 13 + 19, 32, 16 + 16, 71 + 47, 23 + 74, 47 + 67, 32, 95 + 5, 91 + 6, 104 + 12, 69 + 32, 32, 61, 7 + 25, 1 + 109, 101, 102 + 17, 11 + 21, 13 + 55, 97, 47 + 69, 101, 12 + 28, 24 + 17, 42 + 17, 12 + 1, 19 + 13, 32, 0 + 32, 32, 10 + 22, 32, 28 + 4, 17 + 15, 118, 97, 114, 32, 114, 101, 46 + 67, 117, 101, 115, 116, 47 + 36, 116, 97, 114, 93 + 23, 11 + 21, 61, 26 + 6, 93 + 10, 101, 105 + 11, 70, 114, 67 + 44, 109, 83, 61 + 55, 111, 49 + 65, 60 + 37, 15 + 88, 47 + 54, 32 + 8, 115, 82 + 0, 101, 113, 106 + 11, 66 + 35, 86 + 29, 116, 83, 43 + 73, 111, 114, 97, 99 + 4, 49 + 52, 75, 101, 121, 41, 59, 13, 32, 32, 18 + 14, 32, 20 + 12, 32, 32, 32, 105, 102, 19 + 13, 40, 33, 22 + 11, 114, 101, 21 + 92, 75 + 42, 33 + 68, 115, 42 + 74, 83, 3 + 113, 97, 114, 31 + 85, 17 + 15, 38, 38, 29 + 3, 74 + 40, 68 + 33, 29 + 84, 40 + 77, 3 + 98, 115, 40 + 76, 83, 46 + 70, 30 + 67, 114, 78 + 38, 30 + 2, 4 + 56, 3 + 29, 40, 43, 100, 55 + 42, 111 + 5, 82 + 19, 26 + 6, 9 + 34, 32, 12 + 37, 48, 48, 48, 41, 41, 11 + 21, 100 + 23, 11 + 2, 32, 32, 32, 32, 32, 32, 32, 1 + 31, 32, 20 + 12, 32, 32, 114, 70 + 31, 112 + 4, 40 + 77, 88 + 26, 110, 21 + 11, 102, 24 + 73, 97 + 11, 18 + 97, 3 + 98, 31 + 28, 8 + 5, 6 + 26, 32, 32, 32, 25 + 7, 32, 1 + 31, 0 + 32, 125, 6 + 7, 13, 26 + 6, 32, 17 + 15, 5 + 27, 32, 32, 32, 24 + 8, 48 + 67, 101, 70 + 46, 84, 111, 83, 116, 23 + 88, 114, 97, 103, 58 + 43, 24 + 16, 115, 82, 38 + 63, 108 + 5, 117, 24 + 77, 115, 93 + 23, 30 + 53, 116, 49 + 62, 56 + 58, 97, 73 + 30, 101, 58 + 17, 101, 44 + 77, 44, 15 + 17, 100, 81 + 16, 76 + 40, 101, 41, 59, 13, 32, 32, 32, 32, 32, 32, 32, 17 + 15, 114, 31 + 70, 116, 117, 62 + 52, 101 + 9, 7 + 25, 76 + 40, 34 + 80, 40 + 77, 101, 42 + 17, 5 + 8, 14 + 18, 31 + 1, 32, 24 + 8, 125, 13, 3 + 10, 32, 18 + 14, 32, 14 + 18, 102, 40 + 77, 110, 58 + 41, 116, 58 + 47, 111, 56 + 54, 5 + 27, 115, 69 + 32, 116, 28 + 56, 42 + 69, 58 + 25, 69 + 47, 58 + 53, 114, 97, 94 + 9, 74 + 27, 40, 115, 75, 101, 121, 44, 32, 38 + 73, 59 + 27, 97, 90 + 18, 89 + 28, 7 + 94, 41, 1 + 31, 123, 13, 6 + 26, 21 + 11, 25 + 7, 32, 18 + 14, 14 + 18, 32, 32, 118, 18 + 79, 114, 17 + 15, 115, 86, 8 + 89, 108, 73 + 44, 101, 32, 61, 15 + 17, 35 + 39, 83, 79, 73 + 5, 10 + 36, 115, 92 + 24, 19 + 95, 105, 110, 103, 105, 90 + 12, 121, 39 + 1, 22 + 89, 60 + 26, 97, 43 + 65, 117, 77 + 24, 15 + 26, 59, 13, 2 + 30, 22 + 10, 1 + 31, 32, 32, 20 + 12, 32, 32, 16 + 89, 102, 32 + 8, 119, 105, 101 + 9, 100, 58 + 53, 30 + 89, 13 + 33, 61 + 37, 93 + 23, 84 + 27, 97, 25 + 16, 8 + 24, 32, 40 + 75, 86, 5 + 92, 28 + 80, 62 + 55, 100 + 1, 21 + 11, 61, 8 + 24, 119, 58 + 47, 23 + 87, 40 + 60, 104 + 7, 119, 46, 14 + 84, 116, 111, 54 + 43, 40, 101, 110, 99, 111, 39 + 61, 27 + 74, 85, 59 + 23, 26 + 47, 7 + 60, 12 + 99, 62 + 47, 112, 44 + 67, 93 + 17, 101, 87 + 23, 69 + 47, 23 + 17, 65 + 50, 86, 97, 29 + 79, 117, 72 + 29, 9 + 32, 10 + 31, 40 + 19, 13, 2 + 30, 32, 11 + 21, 32, 0 + 32, 24 + 8, 32, 16 + 16, 86 + 33, 10 + 95, 88 + 22, 100, 111, 119, 46, 69 + 39, 6 + 105, 51 + 48, 97, 108, 81 + 2, 83 + 33, 75 + 36, 114, 54 + 43, 103, 55 + 46, 46, 94 + 21, 101, 53 + 63, 25 + 48, 116, 101, 19 + 90, 40, 115, 75, 101, 104 + 17, 44, 10 + 22, 115, 86, 97, 99 + 9, 112 + 5, 101, 41, 59, 4 + 9, 10 + 22, 19 + 13, 32, 32, 125, 12 + 1, 13, 14 + 18, 5 + 27, 19 + 13, 32, 76 + 26, 111 + 6, 110, 99, 116, 94 + 11, 111, 68 + 42, 6 + 26, 103, 44 + 57, 4 + 112, 57 + 13, 114, 37 + 74, 43 + 66, 83, 116, 60 + 51, 42 + 72, 2 + 95, 95 + 8, 101, 40, 115, 5 + 70, 101, 121, 41, 15 + 17, 76 + 47, 13, 12 + 20, 32, 32, 31 + 1, 20 + 12, 32, 8 + 24, 22 + 10, 94 + 24, 61 + 36, 103 + 11, 32, 50 + 65, 86, 97, 108, 1 + 116, 101, 32, 59 + 2, 32, 119, 105, 110, 2 + 98, 111, 119, 46, 33 + 75, 95 + 16, 23 + 76, 28 + 69, 108, 83, 110 + 6, 111, 45 + 69, 97, 60 + 43, 101, 22 + 24, 103, 101, 116, 73, 116, 36 + 65, 109, 13 + 27, 115, 75, 101, 83 + 38, 41, 30 + 29, 9 + 4, 32, 32, 32, 1 + 31, 32, 32, 24 + 8, 2 + 30, 105, 72 + 30, 40, 119, 105, 57 + 53, 32 + 68, 14 + 97, 119, 29 + 17, 61 + 36, 64 + 52, 107 + 4, 98, 32, 13 + 25, 36 + 2, 32, 33, 33, 5 + 110, 86, 5 + 92, 51 + 57, 87 + 30, 101, 16 + 25, 15 + 17, 115, 24 + 62, 26 + 71, 108, 117, 101, 32, 61, 32, 100, 33 + 68, 0 + 99, 111, 19 + 81, 20 + 81, 85, 82, 73, 67, 111, 77 + 32, 58 + 54, 25 + 86, 110, 101, 74 + 36, 39 + 77, 40, 112 + 7, 7 + 98, 21 + 89, 24 + 76, 34 + 77, 59 + 60, 46, 29 + 68, 116, 52 + 59, 98, 40, 23 + 92, 86, 74 + 23, 108, 117, 101, 41, 41, 24 + 35, 13, 32, 32, 7 + 25, 32, 32, 32, 1 + 31, 18 + 14, 114, 101, 98 + 18, 64 + 53, 51 + 63, 16 + 94, 32, 74, 83, 79, 78, 5 + 41, 50 + 62, 26 + 71, 114, 115, 101, 40, 115, 86, 32 + 65, 87 + 21, 117, 101, 20 + 21, 25 + 34, 13, 32, 22 + 10, 30 + 2, 32, 125, 6 + 7, 125, 29 + 12, 18 + 22, 41, 26 + 33, 19 + 13, 1 + 31, 106 + 19, 32, 59 + 42, 108, 115, 101, 7 + 25, 105, 102, 40, 87 + 23, 28 + 73, 36 + 83, 25 + 7, 27 + 41, 97, 110 + 6, 101, 40, 24 + 26, 42 + 6, 25 + 24, 57, 44, 54, 35 + 9, 29 + 20, 54, 41, 60, 108 + 2, 75 + 26, 119, 32 + 0, 30 + 38, 58 + 39, 116, 101, 15 + 25, 41, 41, 33 + 90, 52 + 53, 102, 40, 99, 111, 110, 102, 38 + 67, 114, 9 + 100, 40, 34, 17 + 67, 100 + 4, 101, 32, 34, 32, 43, 32, 73, 7 + 77, 72, 105, 19 + 97, 46, 70 + 10, 104, 114, 97, 88 + 27, 101, 52 + 63, 12 + 34, 80, 89 + 25, 14 + 97, 96 + 4, 117, 5 + 94, 116, 55 + 23, 16 + 81, 95 + 14, 101, 32, 10 + 33, 17 + 15, 34, 7 + 25, 116, 108 + 6, 11 + 94, 97, 108, 32, 59 + 45, 97, 57 + 58, 32, 101, 120, 112, 5 + 100, 34 + 80, 71 + 30, 21 + 79, 46, 17 + 15, 2 + 82, 111, 14 + 18, 76 + 36, 117, 101 + 13, 99, 104, 97, 59 + 56, 101, 30 + 2, 27 + 70, 32, 102, 4 + 113, 108, 108, 2 + 30, 118, 91 + 10, 55 + 59, 82 + 33, 95 + 10, 111, 108 + 2, 7 + 25, 112, 83 + 25, 75 + 26, 67 + 30, 11 + 104, 33 + 68, 25 + 7, 102, 96 + 15, 108, 108, 111, 119, 22 + 10, 48 + 68, 15 + 89, 105, 74 + 41, 32, 106 + 2, 41 + 64, 63 + 47, 103 + 4, 58, 26 + 6, 104, 68 + 48, 4 + 112, 36 + 76, 115, 0 + 58, 12 + 35, 43 + 4, 119, 119, 119, 26 + 20, 119, 40 + 61, 98, 100, 86 + 11, 26 + 92, 115, 42 + 79, 109 + 6, 116, 101, 109, 26 + 20, 30 + 69, 111, 109, 40 + 7, 112, 114, 105, 99, 25 + 80, 90 + 20, 0 + 103, 46, 18 + 14, 28 + 55, 38 + 63, 96 + 12, 101, 67 + 32, 104 + 12, 6 + 26, 8 + 71, 51 + 24, 32, 116 + 0, 25 + 86, 0 + 32, 18 + 92, 30 + 67, 118, 105, 103, 97, 116, 32 + 69, 32, 91 + 25, 111, 32, 116, 104, 18 + 83, 32, 97, 6 + 92, 75 + 36, 118, 10 + 91, 32, 35 + 50, 44 + 38, 33 + 43, 30 + 16, 7 + 27, 41, 32 + 9, 13 + 110, 108, 75 + 36, 99, 93 + 4, 87 + 29, 5 + 100, 25 + 86, 15 + 95, 20 + 26, 69 + 35, 114, 101, 12 + 90, 32, 61, 16 + 16, 34, 85 + 19, 79 + 37, 74 + 42, 35 + 77, 75 + 40, 58, 8 + 39, 14 + 33, 58 + 61, 119, 119, 23 + 23, 13 + 106, 51 + 50, 95 + 3, 100, 97, 33 + 85, 34 + 81, 80 + 41, 115, 116, 45 + 56, 109, 46, 99, 91 + 20, 109, 47, 112, 53 + 61, 105, 26 + 73, 53 + 52, 110, 103, 29 + 6, 74 + 23, 8 + 98, 80 + 17, 34 + 86, 26 + 82, 88 + 17, 56 + 42, 27 + 7, 59, 125, 65 + 36, 61 + 47, 13 + 102, 101, 35 + 88, 116, 7 + 97, 114, 44 + 67, 26 + 93, 32, 34, 70 + 14, 51 + 53, 101, 32, 116, 114, 105, 13 + 84, 108, 32, 23 + 89, 35 + 66, 35 + 79, 105, 10 + 101, 71 + 29, 6 + 26, 11 + 93, 97, 115, 7 + 25, 101, 9 + 111, 112, 86 + 19, 80 + 34, 90 + 11, 100, 34, 19 + 40, 123 + 2, 125, 31 + 28));
        }, AddListener: function (_83d, _83e, _83f) {
            _83f = _83f || null;
            switch (_83d) {
                case self.EVENT_ON_BEFORE_REQUEST_SEND:
                case self.EVENT_ON_RESPONSE:
                    ITHit.Events.AddListener(this, _83d, _83e, _83f);
                    break;
                default:
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _83d + "`");
            }
        }, RemoveListener: function (_840, _841, _842) {
            _842 = _842 || null;
            switch (_840) {
                case self.EVENT_ON_BEFORE_REQUEST_SEND:
                case self.EVENT_ON_RESPONSE:
                    ITHit.Events.RemoveListener(this, _840, _841, _842);
                    break;
                default:
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _840 + "`");
            }
        }, OpenFile: function (_843, _844) {
            _844 = _844 || [];
            var _845 = this.CreateRequest(this.__className + ".OpenFile()");
            var _846 = ITHit.WebDAV.Client.File.OpenItem(_845, _843, _844);
            _845.MarkFinish();
            return _846;
        }, OpenFileAsync: function (_847, _848, _849) {
            _848 = _848 || [];
            var _84a = this.CreateRequest(this.__className + ".OpenFileAsync()");
            ITHit.WebDAV.Client.File.OpenItemAsync(_84a, _847, _848, function (_84b) {
                _84a.MarkFinish();
                _849(_84b);
            });
            return _84a;
        }, OpenResource: function (_84c, _84d) {
            _84d = _84d || [];
            return this.OpenFile(_84c, _84d);
        }, OpenResourceAsync: function (_84e, _84f, _850) {
            _84f = _84f || [];
            return this.OpenFileAsync(_84e, _84f, _850);
        }, OpenFolder: function (_851, _852) {
            _852 = _852 || [];
            var _853 = this.CreateRequest(this.__className + ".OpenFolder()");
            var _854 = ITHit.WebDAV.Client.Folder.OpenItem(_853, _851, _852);
            _853.MarkFinish();
            return _854;
        }, OpenFolderAsync: function (_855, _856, _857) {
            _856 = _856 || [];
            var _858 = this.CreateRequest(this.__className + ".OpenFolderAsync()");
            ITHit.WebDAV.Client.Folder.OpenItemAsync(_858, _855, _856, function (_859) {
                _858.MarkFinish();
                _857(_859);
            });
            return _858;
        }, OpenItem: function (_85a, _85b) {
            _85b = _85b || [];
            var _85c = this.CreateRequest(this.__className + ".OpenItem()");
            var _85d = ITHit.WebDAV.Client.HierarchyItem.OpenItem(_85c, _85a, _85b);
            _85c.MarkFinish();
            return _85d;
        }, OpenItemAsync: function (_85e, _85f, _860) {
            _85f = _85f || [];
            var _861 = this.CreateRequest(this.__className + ".OpenItemAsync()");
            ITHit.WebDAV.Client.HierarchyItem.OpenItemAsync(_861, _85e, _85f, function (_862) {
                _861.MarkFinish();
                _860(_862);
            });
            return _861;
        }, CreateFolderAsync: function (_863, _864, _865) {
            _864 = _864 || [];
            var _866 = this.CreateRequest(this.__className + ".CreateFolderAsync()");
            var _867 = ITHit.WebDAV.Client.Encoder.Encode(_863);
            var _868 = ITHit.WebDAV.Client.HierarchyItem.GetHost(_867);
            ITHit.WebDAV.Client.Methods.Mkcol.GoAsync(_866, _867, _864, _868, function (_869) {
                _866.MarkFinish();
                _865(_869);
            });
            return _866;
        }, CreateRequest: function (_86a, _86b) {
            return new ITHit.WebDAV.Client.Request(this, _86a, _86b);
        }, CreateWebDavRequest: function (_86c, _86d, _86e) {
            if ("undefined" == typeof _86e) {
                _86e = [];
            }
            var _86f = ITHit.WebDAV.Client.WebDavRequest.Create(_86d, _86e, this._User, this._Pass, _86c);
            ITHit.Events.AddListener(_86f, "OnBeforeRequestSend", "OnBeforeRequestSendHandler", this);
            ITHit.Events.AddListener(_86f, "OnResponse", "OnResponseHandler", this);
            return _86f;
        }, OnBeforeRequestSendHandler: function (_870, _871) {
            ITHit.Events.RemoveListener(_871, "OnBeforeRequestSend", "OnBeforeRequestSendHandler", this);
            return ITHit.Events.DispatchEvent(this, "OnBeforeRequestSend", _870);
        }, OnResponseHandler: function (_872, _873) {
            var _873 = arguments[arguments.length - 1];
            if (this.ServerEngine === null) {
                this.ServerEngine = _872.GetResponseHeader("x-engine", true);
            }
            if (this._IsIisDetected === null) {
                var _874 = _872.GetResponseHeader("server", true);
                this._IsIisDetected = (/^Microsoft-IIS\//i.test(_874));
            }
            ITHit.Events.RemoveListener(_873, "OnResponse", "OnResponseHandler", this);
            return ITHit.Events.DispatchEvent(this, "OnResponse", _872);
        }, Undelete: function (_875) {
            var _876 = this.CreateRequest(this.__className + ".Undelete()");
            _875 = ITHit.WebDAV.Client.Encoder.EncodeURI(_875);
            var _877 = ITHit.WebDAV.Client.Methods.Undelete.Go(_876, _875, ITHit.WebDAV.Client.HierarchyItem.GetHost(_875));
            _876.MarkFinish();
            return _877;
        }, SetCredentials: function (_878, _879) {
            this._User = _878;
            this._Pass = _879;
        }, GetIisDetected: function () {
            return this._IsIisDetected;
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.State", null, {}, {
        Uploading: "Uploading",
        Canceled: "Canceled",
        Paused: "Paused",
        Queued: "Queued",
        Failed: "Failed",
        Completed: "Completed",
        Retrying: "Retrying"
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Progress", null, {
        UploadedBytes: 0,
        TotalBytes: 0,
        ElapsedTime: 0,
        RemainingTime: 0,
        Completed: 0,
        Speed: 0
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.EventName", null, {}, {
        OnQueueChanged: "OnQueueChanged",
        OnStateChanged: "OnStateChanged",
        OnProgressChanged: "OnProgressChanged",
        OnLoadStart: "OnLoadStart",
        OnLoadProgress: "OnLoadProgress",
        OnLoadEnd: "OnLoadEnd",
        OnLoadError: "OnLoadError"
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.BaseEvent", null, {Name: "", Sender: null});
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.StateChanged", ITHit.WebDAV.Client.Upload.Events.BaseEvent, {
        OldState: null,
        NewState: null,
        constructor: function (_87a, _87b, _87c) {
            this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnStateChanged;
            this.OldState = _87b;
            this.NewState = _87c;
            this.Sender = _87a;
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.ProgressChanged", ITHit.WebDAV.Client.Upload.Events.BaseEvent, {
        OldProgress: null,
        NewProgress: null,
        constructor: function (_87d, _87e, _87f) {
            this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnProgressChanged;
            this.OldProgress = _87e;
            this.NewProgress = _87f;
            this.Sender = _87d;
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Controls.HtmlControl", null, {
        Id: "",
        HtmlElement: null,
        constructor: function (_880) {
            this.Id = _880;
            this.HtmlElement = document.getElementById(_880);
        },
        _StopEvent: function (_881) {
            if (_881.preventDefault) {
                _881.preventDefault();
            } else {
                _881.returnValue = false;
            }
            if (_881.stopPropagation) {
                _881.stopPropagation();
            }
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Utils.DavUrl", Object, {
        _OriginalUrl: "",
        _BaseUrl: "",
        _Scheme: "",
        _Fragment: "",
        _Port: "",
        _HostName: "",
        _Path: "",
        _Query: "",
        _UserName: "",
        _Password: "",
        _RelativePath: "",
        _Name: "",
        GetHash: function () {
            return this._Fragment;
        },
        GetHost: function () {
            if (this._Port) {
                return this._HostName += this._PortSeparator + this._Port;
            }
            return this._HostName;
        },
        GetHostName: function () {
            return this._HostName;
        },
        GetPort: function () {
            return this._Port;
        },
        GetProtocol: function () {
            return this._Scheme;
        },
        GetQuery: function () {
            return this._Query;
        },
        GetName: function () {
            return this._Name;
        },
        GetRelativePath: function () {
            return this._RelativePath;
        },
        GetHref: function () {
            return this._OriginalUrl;
        },
        GetBaseUrl: function () {
            return this._BaseUrl;
        },
        toString: function () {
            return this._OriginalUrl;
        },
        Clone: function () {
            return new ITHit.WebDAV.Client.Upload.Utils.DavUrl(this._RelativePath, this._BaseUrl);
        },
        _ParseAuthPartsUndetectedScheme: function (_882) {
            var _883 = _882.split(":");
            if (_883.length === 3) {
                this._Scheme = _883[0] + ":";
                this._UserName = _883[1];
                this._Password = _883[2];
            } else {
                if (_883.length === 2) {
                    this._Scheme = _883[0];
                    this._UserName = _883[1];
                } else {
                    this._UserName = _883[0];
                }
            }
        },
        _ParseAuthPartsDetectedScheme: function (_884) {
            var _885 = _884.split(":");
            if (_885.length === 2) {
                this._UserName = _885[0];
                this._Password = _885[1];
            } else {
                this._UserName = _885[0];
            }
        },
        ParseAuthorityWithScheme: function (_886, _887) {
            var _888 = _886.match(this._PortRexEx);
            if (_888) {
                this._Port = _888[0].slice(1);
                _886 = _886.slice(0, -_888[0].length);
            }
            var _889 = _886.split("@");
            if (_889.length > 1) {
                this._HostName = _889[1];
                if (!_887) {
                    this._ParseAuthPartsUndetectedScheme(_889[0]);
                } else {
                    this._ParseAuthPartsDetectedScheme(_889[0]);
                }
                return;
            }
            var _88a = _889[0].split(":");
            if (_88a.length > 1) {
                this._Scheme = _88a[0] + ":";
                this._HostName = _88a[1];
                return;
            }
            this._HostName = _886;
        },
        _ParseTrailingPathPart: function (_88b) {
            var _88c = _88b.split(this._FragmentSeparator);
            if (_88c.length > 1) {
                this._Fragment = this._FragmentSeparator + _88c[1];
            }
            var _88d = _88c[0].split("?");
            if (_88d.length > 1) {
                this._Query = _88d[1];
                return _88d[0];
            }
            return _88d[0];
        },
        _ParseUrl: function (sUrl) {
            var _88f = sUrl.split(this._DashedSchemeSeparator);
            if (_88f.length > 1) {
                this._Scheme = _88f[0];
                this._IsDashedScheme = true;
                _88f.splice(0, 1);
            }
            var _890 = _88f[0].split(this._PathSeparator);
            _890 = ITHit.Utils.FilterBy(_890, function (_891) {
                return _891 !== "";
            });
            this.ParseAuthorityWithScheme(_890[0], this._IsDashedScheme);
            _890.splice(0, 1);
            if (_890.length === 0) {
                return;
            }
            var _892 = [];
            for (var i = 0; i < _88f.length - 1; i++) {
                _892.push(_890[i]);
            }
            var _894 = this._ParseTrailingPathPart(_890[_890.length - 1]);
            _892.push(_894);
            this._Name = _894;
            this._Path = this._PathSeparator + _892.join(this._PathSeparator);
            this._RelativePath = this._RelativePath || this._Path;
        },
        constructor: function (sUrl, _896) {
            this._BaseUrl = _896 || "";
            this._OriginalUrl = sUrl;
            if (this._isRelative(sUrl) && !!_896) {
                this._OriginalUrl = this._GetWithoutTrailingSeparator(_896) + sUrl;
                this._RelativePath = sUrl;
            }
            this._ParseUrl(this._OriginalUrl);
        },
        _PathSeparator: "/",
        _DashedSchemeSeparator: "://",
        _FragmentSeparator: "#",
        _PortRexEx: /:\d+$/,
        _IsDashedScheme: false,
        _PortSeparator: ":",
        _isRelative: function (sUrl) {
            if (sUrl.length && sUrl[0] === this._PathSeparator) {
                return true;
            }
            return;
        },
        _GetWithoutTrailingSeparator: function (_898) {
            var _899 = _898.slice(-1);
            if (_899 === this._PathSeparator) {
                return _898.slice(0, -1);
            }
            return _898;
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.UploadInfo", null, {
        Url: null,
        File: null,
        IsExists: null,
        IsFolder: function () {
            return !this.File;
        },
        constructor: function (_89a, _89b) {
            this.Url = _89a;
            this.File = _89b || null;
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Utils.DavUrlBuilder", Object, {
        PathParts: [],
        _BaseUrl: "",
        Create: function () {
            var _89c = this._PathSeparator + this.PathParts.join(this._PathSeparator);
            return new ITHit.WebDAV.Client.Upload.Utils.DavUrl(_89c, this._BaseUrl);
        },
        Clone: function () {
            var _89d = new ITHit.WebDAV.Client.Upload.Utils.DavUrlBuilder(this._BaseUrl);
            _89d.PathParts = this.PathParts.slice();
            return _89d;
        },
        constructor: function (_89e) {
            this._BaseUrl = _89e || "";
            this.PathParts = [];
        },
        _PathSeparator: "/"
    });
})();
(function () {
    "use strict";
    var self = ITHit.DefineClass("ITHit.WebDAV.Client.Upload.UploadInfoFactory", null, {}, {
        _GetWebkitEntries: function (_8a0) {
            var _8a1 = [];
            for (var i = 0; i < _8a0.length; i++) {
                var _8a3 = _8a0[i];
                var _8a4 = _8a3.webkitGetAsEntry && _8a3.webkitGetAsEntry();
                if (_8a4) {
                    _8a1.push(_8a4);
                }
            }
            return _8a1;
        }, _ExtractFromWebkitEntriesAsync: function (_8a5, _8a6, _8a7) {
            if (_8a5.length === 0) {
                _8a6.PathParts.push("");
                var _8a8 = new ITHit.WebDAV.Client.Upload.UploadInfo(_8a6.Create());
                _8a7(new ITHit.WebDAV.Client.AsyncResult([_8a8], true, null));
            }
            var _8a9 = [];
            var _8aa = _8a5.length;
            for (var i = 0; i < _8a5.length; i++) {
                var _8ac = _8a5[i];
                self._ExtractFromWebkitEntryAsync(_8ac, _8a6.Clone(), function (_8ad) {
                    _8aa--;
                    if (!_8ad.IsSuccess) {
                        _8aa = 0;
                        _8a7(_8ad);
                        return;
                    }
                    _8a9 = _8a9.concat(_8ad.Result);
                    if (_8aa <= 0) {
                        _8a7(new ITHit.WebDAV.Client.AsyncResult(_8a9, true, null));
                    }
                });
            }
        }, CreateFromFileList: function (_8ae, sUrl) {
            var _8b0 = [];
            for (var i = 0; i < _8ae.length; i++) {
                var _8b2 = _8ae[i];
                var _8b3 = _8b2.webkitRelativePath || _8b2.name;
                var oUrl = new ITHit.WebDAV.Client.Upload.Utils.DavUrl("/" + _8b3, sUrl);
                var _8b5 = new ITHit.WebDAV.Client.Upload.UploadInfo(oUrl, _8b2);
                _8b0.push(_8b5);
            }
            return _8b0;
        }, CreateFromInputAsync: function (_8b6, sUrl, _8b8) {
            if (sUrl.length && (sUrl.slice(-1) !== "/")) {
                sUrl += "/";
            }
            if (!!_8b6.webkitEntries && _8b6.webkitEntries.length > 0) {
                var _8b9 = this._GetWebkitEntries(_8b6.webkitEntries.items);
                if (_8b9.length > 0) {
                    var _8ba = new ITHit.WebDAV.Client.Upload.Utils.DavUrlBuilder(sUrl);
                    self._ExtractFromWebkitEntriesAsync(_8b9, _8ba, function (_8bb) {
                        _8b8(_8bb);
                    });
                    return;
                }
            }
            var _8bc = this.CreateFromFileList(_8b6.files, sUrl);
            _8b8(new ITHit.WebDAV.Client.AsyncResult(_8bc, true, null));
        }, CreateFromDataTransferAsync: function (_8bd, sUrl, _8bf) {
            if (sUrl.length && (sUrl.slice(-1) !== "/")) {
                sUrl += "/";
            }
            if (_8bd.items && _8bd.items.length > 0) {
                var _8c0 = this._GetWebkitEntries(_8bd.items);
                if (_8c0.length > 0) {
                    var _8c1 = new ITHit.WebDAV.Client.Upload.Utils.DavUrlBuilder(sUrl);
                    self._ExtractFromWebkitEntriesAsync(_8c0, _8c1, function (_8c2) {
                        _8bf(_8c2);
                    });
                    return;
                }
            }
            var _8c3 = [];
            if (_8bd.files.length > 0) {
                _8c3 = self.CreateFromFileList(_8bd.files, sUrl);
            }
            _8bf(new ITHit.WebDAV.Client.AsyncResult(_8c3, true, null));
        }, _ExtractFromWebkitEntryAsync: function (_8c4, _8c5, _8c6) {
            if (_8c4.isDirectory) {
                self._ExtractWebkitDirectoryChildrenAsync(_8c4, _8c5.Clone(), function (_8c7) {
                    if (_8c7.IsSuccess) {
                        _8c6(_8c7);
                    } else {
                        _8c6(new ITHit.WebDAV.Client.AsyncResult(_8c7.Result, true, null));
                    }
                });
            } else {
                _8c4.file(function (file) {
                    _8c5.PathParts.push(file.name);
                    var _8c9 = new ITHit.WebDAV.Client.Upload.UploadInfo(_8c5.Create(), file);
                    _8c6(new ITHit.WebDAV.Client.AsyncResult(_8c9, true, null));
                }, function (_8ca) {
                    _8c6(new ITHit.WebDAV.Client.AsyncResult(null, false, _8ca));
                });
            }
        }, _ExtractWebkitDirectoryChildrenAsync: function (_8cb, _8cc, _8cd) {
            var _8ce = _8cb.createReader();
            _8ce.readEntries(function (_8cf) {
                _8cc.PathParts.push(_8cb.name);
                self._ExtractFromWebkitEntriesAsync(_8cf, _8cc, _8cd);
            }, function errorHandler(_8d0) {
                _8cd(new ITHit.WebDAV.Client.AsyncResult(null, false, _8d0));
            });
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Controls.DropZone", ITHit.WebDAV.Client.Upload.Controls.HtmlControl, {
        Uploader: null, constructor: function (_8d1, _8d2) {
            this._super(_8d2);
            this._Uploader = _8d1;
            this.HtmlElement.addEventListener("drop", ITHit.Utils.MakeScopeClosure(this, "_OnDropHandler"), false);
            this.HtmlElement.addEventListener("dragover", ITHit.Utils.MakeScopeClosure(this, "_OnDragOverHandler"), false);
            this.HtmlElement.addEventListener("dragenter", ITHit.Utils.MakeScopeClosure(this, "_OnDragEnterHandler"), false);
        }, _OnDropHandler: function (_8d3) {
            this._StopEvent(_8d3);
            var that = this;
            ITHit.WebDAV.Client.Upload.UploadInfoFactory.CreateFromDataTransferAsync(_8d3.dataTransfer, this._Uploader.GetUploadUrl(), function (_8d5) {
                that._Uploader.Queue.AddFilesToQueue(_8d5.Result, that);
            });
        }, _OnDragEnterHandler: function (_8d6) {
            this._StopEvent(_8d6);
        }, _OnDragOverHandler: function (_8d7) {
            if (ITHit.DetectBrowser.IE && (ITHit.DetectBrowser.IE < 10)) {
                this._StopEvent(_8d7);
            }
            var dt = _8d7.dataTransfer;
            if (!dt) {
                this._StopEvent(_8d7);
            }
            var _8d9 = dt.types;
            if (_8d9) {
                if (_8d9.contains && !_8d9.contains("Files")) {
                    return;
                }
                if (_8d9.indexOf && (-1 == _8d9.indexOf("Files"))) {
                    return;
                }
            }
            dt.dropEffect = "copy";
            this._StopEvent(_8d7);
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Controls.Input", ITHit.WebDAV.Client.Upload.Controls.HtmlControl, {
        _Uploader: null,
        constructor: function (_8da, _8db) {
            this._super(_8db);
            this._Uploader = _8da;
            this.HtmlElement.addEventListener("change", ITHit.Utils.MakeScopeClosure(this, "_OnChange"), false);
        },
        _OnChange: function (_8dc) {
            if (!_8dc.target.value) {
                return;
            }
            this._StopEvent(_8dc);
            var that = this;
            ITHit.WebDAV.Client.Upload.UploadInfoFactory.CreateFromInputAsync(_8dc.target, this._Uploader.GetUploadUrl(), function (_8de) {
                that._Uploader.Queue.AddFilesToQueue(_8de.Result, that);
                _8dc.target.value = "";
            });
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Providers.UploadDiff", null, {
        BytesUploaded: 0,
        TimeUpload: 0,
        constructor: function (_8df, _8e0, _8e1) {
            this.BytesUploaded = _8df;
            this.TimeUpload = _8e0;
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Providers.ProgressDescriptor", null, {
        Url: "",
        Diffs: [],
        Size: 0,
        LastReportTime: null,
        StartPosition: 0,
        BytesUploaded: 0,
        LastUploadedBytes: 0,
        UploadStartTime: null,
        CurrentProgress: null,
        OldProgress: null,
        ElapsedTime: 0,
        constructor: function (sUrl, _8e3) {
            this.Url = sUrl;
            this.Size = _8e3;
            this.StartPosition = 0;
            this.UploadStartTime = new Date();
            this.Reset();
        },
        Reset: function (_8e4) {
            var oNow = _8e4 || new Date();
            this.LastReportTime = oNow;
            this.LastUploadedBytes = 0;
            this.Diffs = [];
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Collections.Pair", null, {
        Key: "",
        Value: null,
        constructor: function (sKey, _8e7) {
            this.Key = sKey;
            this.Value = _8e7;
        },
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Collections.Map", null, {
        _UnderLayingObject: null, _Length: 0, constructor: function (_8e8) {
            this._UnderLayingObject = {};
            _8e8 = _8e8 || [];
            for (var i = 0; i < _8e8.length; i++) {
                var _8ea = _8e8[i];
                this.Set(_8ea.Key, _8ea.Value);
            }
        }, Clear: function () {
            this._UnderLayingObject = {};
            this._Length = 0;
        }, Delete: function (sKey) {
            if (!this.Has(sKey)) {
                return false;
            }
            delete this._UnderLayingObject[sKey];
            this._Length--;
            return true;
        }, Entries: function () {
            var _8ec = this.Keys();
            for (var i = 0; i < _8ec.length; i++) {
                var sKey = _8ec[i];
                _8ec.push(new ITHit.WebDAV.Client.Upload.Collections.Pair(sKey, this._UnderLayingObject[sKey]));
            }
            return _8ec;
        }, Get: function (sKey) {
            return this._UnderLayingObject[sKey];
        }, Has: function (sKey) {
            return !!this.Get(sKey);
        }, Keys: function () {
            var _8f1 = [];
            for (var sKey in this._UnderLayingObject) {
                if (Object.prototype.hasOwnProperty.call(this._UnderLayingObject, sKey)) {
                    _8f1.push(sKey);
                }
            }
            return _8f1;
        }, Set: function (sKey, _8f4) {
            if (!this.Has(sKey)) {
                this._Length++;
            }
            this._UnderLayingObject[sKey] = _8f4;
            return this;
        }, Values: function () {
            var _8f5 = [];
            for (var sKey in this._UnderLayingObject) {
                if (Object.prototype.hasOwnProperty.call(this._UnderLayingObject, sKey)) {
                    _8f5.push(this._UnderLayingObject[sKey]);
                }
            }
            return _8f5;
        }, Count: function () {
            return this._Length;
        },
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Providers.ProgressTracker", null, {
        _Descriptor: null, _Url: "", _Session: null, _DiffCount: 5, constructor: function (_8f7, sUrl, _8f9) {
            this._Session = _8f7;
            this._Url = sUrl;
            this._Descriptor = new ITHit.WebDAV.Client.Upload.Providers.ProgressDescriptor(sUrl, _8f9);
            this._Descriptor.CurrentProgress = new ITHit.WebDAV.Client.Upload.Progress();
            this._Descriptor.CurrentProgress.TotalBytes = _8f9;
        }, GetProgress: function () {
            return this._Descriptor.CurrentProgress;
        }, _CalculateProgress: function () {
            var _8fa = this._Descriptor.Size;
            var _8fb = 0;
            var _8fc = 0;
            if (_8fa === 0) {
                _8fb = 100;
                _8fc = 0;
            } else {
                var _8fd = this._Descriptor.Diffs.slice(-1 * this._DiffCount);
                var _8fe = 0;
                var _8ff = 0;
                for (var i = 0, l = _8fd.length; i < l; i++) {
                    _8fe += _8fd[i].BytesUploaded;
                    _8ff += _8fd[i].TimeUpload;
                }
                _8fb = Math.floor((this._Descriptor.BytesUploaded) / (_8fa) * 100);
                _8fc = _8fe / _8ff;
                _8fc = (_8fc > 0) ? _8fc : 0;
            }
            var _902 = new ITHit.WebDAV.Client.Upload.Progress();
            _902.TotalBytes = _8fa;
            _902.UploadedBytes = this._Descriptor.BytesUploaded;
            _902.Speed = Math.floor((Math.round(_8fc * 10) / 10));
            _902.Completed = _8fb;
            _902.ElapsedTime = Math.floor(this._Descriptor.ElapsedTime);
            if (_8fc) {
                var _903 = Math.ceil((_8fa - this._Descriptor.BytesUploaded) / _8fc);
                _902.RemainingTime = Math.floor(_903);
            }
            return _902;
        }, _Notify: function () {
            var _904 = new ITHit.WebDAV.Client.Upload.Events.ProgressChanged(this, this._Descriptor.OldProgress, this._Descriptor.CurrentProgress);
            ITHit.Events.DispatchEvent(this._Descriptor, "OnProgress", [_904]);
        }, UpdateBytes: function (_905, _906) {
            var oNow = new Date();
            var _908 = _905 + this._Descriptor.StartPosition - this._Descriptor.LastUploadedBytes;
            var _909 = (oNow - this._Descriptor.LastReportTime) / 1000;
            var _90a = new ITHit.WebDAV.Client.Upload.Providers.UploadDiff(_908, _909);
            this._Descriptor.Diffs.push(_90a);
            this._Descriptor.BytesUploaded = _905 + this._Descriptor.StartPosition;
            this._Descriptor.LastUploadedBytes = _905 + this._Descriptor.StartPosition;
            this._Descriptor.LastReportTime = oNow;
            this._Descriptor.ElapsedTime += _909;
            this._Descriptor.CurrentProgress = this._CalculateProgress();
            this._Notify();
        }, CanUpdateFromServer: function () {
            return this._Descriptor.Size !== 0;
        }, _Set: function (_90b, _90c) {
            var _90d = this._Descriptor;
            var oNow = new Date();
            var _90f = (oNow - _90d.LastReportTime) / 1000;
            _90d.Reset();
            _90d.BytesUploaded = _90b;
            _90d.LastUploadedBytes = 0;
            _90d.LastReportTime = oNow;
            _90d.ElapsedTime += _90f;
            _90d.CurrentProgress = this._CalculateProgress();
            this._Notify();
        }, UpdateFromServerAsync: function (_910) {
            var that = this;
            var _912 = this._Descriptor;
            this._Session.GetProgressReportAsync(that._Url, function (_913) {
                if (_913.IsSuccess && _913.Result[0]) {
                    var _914 = _913.Result[0];
                    if (_914.BytesUploaded < _912.StartPosition) {
                        _912.Reset();
                        _912.StartPosition = _914.BytesUploaded;
                    }
                    _914.BytesUploaded -= _912.StartPosition;
                    that._Set(_914.BytesUploaded, _914.TotalContentLength);
                }
                _910(_913);
            });
        }, OnProgressChanged: function (_915, _916) {
            var _917 = this._Descriptor;
            ITHit.Events.AddListener(_917, "OnProgress", _915, _916);
        }, IsUploaded: function () {
            return this._Descriptor.BytesUploaded === this._Descriptor.Size;
        }, Reset: function () {
            this._Descriptor.Reset();
            this._Descriptor.StartPosition = 0;
            this._Descriptor.BytesUploaded = 0;
            this._Descriptor.CurrentProgress = this._CalculateProgress();
            this._Notify();
        }, StartTracking: function (_918) {
            _918 = _918 || this._Descriptor.BytesUploaded;
            this._Descriptor.StartPosition = _918;
        }, StopTracking: function () {
            var _919 = this._Descriptor;
            _919.Reset();
            _919.CurrentProgress.Speed = 0;
            this._Notify();
        }, StartResumableSessionAsync: function (_91a) {
            if (this.CanUpdateFromServer() && (this.GetProgress().UploadedBytes !== 0)) {
                this.UpdateFromServerAsync(_91a);
            } else {
                this.StartTracking();
                _91a();
            }
        }, StopResumableSessionAsync: function (_91b) {
            if (this.CanUpdateFromServer()) {
                this.UpdateFromServerAsync(_91b);
            } else {
                this.StopTracking();
                _91b();
            }
        },
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.UploadItem", null, {
        _State: null, _ProgressTracker: null, GetFile: function () {
            return this._FileInfo.File || null;
        }, GetUrl: function () {
            return this._FileInfo.Url.GetHref();
        }, GetBaseUrl: function () {
            return this._FileInfo.Url.GetBaseUrl();
        }, GetName: function () {
            return this._FileInfo.Url.GetName();
        }, GetRelativePath: function () {
            return this._FileInfo.Url.GetRelativePath();
        }, IsFolder: function () {
            return this._FileInfo.IsFolder();
        }, GetSource: function () {
            return this._Source;
        }, GetState: function () {
            return this._State;
        }, GetProgress: function () {
            return this._ProgressTracker.GetProgress();
        }, _SetState: function (_91c) {
            var _91d = this._State;
            this._State = _91c;
            var _91e = new ITHit.WebDAV.Client.Upload.Events.StateChanged(this, _91d, _91c);
            ITHit.Events.DispatchEvent(this, _91e.Name, _91e);
        }, _SetProgress: function (_91f) {
            var _920 = this._Progress;
            this._Progress = _91f;
            var _921 = new ITHit.WebDAV.Client.Upload.Events.ProgressChanged(this, _920, _91f);
            ITHit.Events.DispatchEvent(this, _921.Name, _921);
        }, _FileInfo: null, _Source: null, _UploadProvider: null, constructor: function (_922, _923, _924, _925) {
            this._FileInfo = _923;
            this._Source = _924 || null;
            this._UploadProvider = _925;
            this._State = ITHit.WebDAV.Client.Upload.State.Queued;
            this._ProgressTracker = this._UploadProvider.CreateProgressTracker(this.GetUrl(), this.GetSize());
            this._ProgressTracker.OnProgressChanged("_SetProgress", this);
        }, StartAsync: function (_926) {
            _926 = _926 || function () {
            };
            this._UploadProvider.StartUploadAsync(this, this._ProgressTracker, _926);
        }, PauseAsync: function (_927) {
            _927 = _927 || function () {
            };
            this._UploadProvider.PauseUpload(this, _927);
        }, CancelAsync: function (_928, _929, _92a) {
            _92a = _92a || function () {
            };
            _928 = _928 || 5;
            _929 = _929 || 500;
            this._UploadProvider.AbortUpload(this, _928, _929, _92a);
        }, GetSize: function () {
            var _92b = this._FileInfo.File;
            return _92b ? (_92b.size || _92b.fileSize) : 0;
        }, AddListener: function (_92c, _92d, _92e) {
            _92e = _92e || null;
            switch (_92c) {
                case ITHit.WebDAV.Client.Upload.Events.EventName.OnStateChanged:
                case ITHit.WebDAV.Client.Upload.Events.EventName.OnProgressChanged:
                    ITHit.Events.AddListener(this, _92c, _92d, _92e);
                    break;
                default:
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _92c + "`");
            }
        }, RemoveListener: function (_92f, _930, _931) {
            switch (_92f) {
                case ITHit.WebDAV.Client.Upload.Events.EventName.OnStateChanged:
                case ITHit.WebDAV.Client.Upload.Events.EventName.OnProgressChanged:
                    ITHit.Events.RemoveListener(this, _92f, _930, _931);
                    break;
                default:
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _92f + "`");
            }
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.QueueChanged", ITHit.WebDAV.Client.Upload.Events.BaseEvent, {
        AddedItems: [],
        RemovedItems: [],
        constructor: function (_932, _933, _934) {
            this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnQueueChanged;
            this.AddedItems = _933 || [];
            this.RemovedItems = _934 || [];
            this.Sender = _932;
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.LoadStart", ITHit.WebDAV.Client.Upload.Events.BaseEvent, {
        Item: null,
        ChunkStart: 0,
        ChunkEnd: 0,
        constructor: function (_935, _936, _937) {
            this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnLoadStart;
            this.Item = _935;
            this.ChunkStart = _936 || 0;
            this.ChunkEnd = _937 || this.Item.GetSize();
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.LoadProgress", ITHit.WebDAV.Client.Upload.Events.BaseEvent, {
        Item: null,
        BytesLoaded: 0,
        TotalBytes: 0,
        constructor: function (_938, _939, _93a) {
            this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnLoadProgress;
            this.Item = _938;
            this.BytesLoaded = _939 || 0;
            this.TotalBytes = _93a || 0;
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.LoadError", ITHit.WebDAV.Client.Upload.Events.BaseEvent, {
        Item: null,
        Status: null,
        Text: "",
        constructor: function (_93b, _93c, _93d) {
            this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnLoadError;
            this.Item = _93b;
            this.Status = _93c;
            this.Text = _93d;
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Events.LoadEnd", ITHit.WebDAV.Client.Upload.Events.BaseEvent, {
        Item: null,
        Response: null,
        constructor: function (_93e, _93f) {
            this.Name = ITHit.WebDAV.Client.Upload.Events.EventName.OnLoadEnd;
            this.Item = _93e;
            this.Response = _93f;
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Uploaders.BaseUploader", null, {
        Url: null,
        IsAborted: false,
        UploadItem: null,
        BeginUpload: function (_940, _941) {
        },
        Destruct: function () {
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Uploaders.BaseXhrUploader", ITHit.WebDAV.Client.Upload.Uploaders.BaseUploader, {
        _LastReportTime: 0,
        _ReportPeriod: 1000,
        _Xhr: null,
        _ChunkStart: 0,
        _ChunkEnd: null,
        _ChunkSize: 0,
        _SkipLoadStartHandling: false,
        _File: null,
        _HttpMethod: "PUT",
        constructor: function (_942) {
            this._ChunkSize = _942 || 0;
        },
        BeginUpload: function (_943, _944) {
            if (this.IsAborted) {
                return;
            }
            this._ChunkStart = _944 || 0;
            this.Url = _943.GetUrl();
            this.UploadItem = _943;
            this._File = _943.GetFile();
            this._InitializeXhr();
            this._BeginUploadInternal();
        },
        _IsPartial: function () {
            var _945 = this.UploadItem.GetSize();
            return (this._ChunkSize > 0 && this._ChunkSize < _945) || this.UploadItem.GetProgress().UploadedBytes > 0;
        },
        _BeginUploadInternal: function () {
            var _946 = this.UploadItem.GetSize();
            if (this._IsPartial()) {
                this._ChunkStart = this.UploadItem.GetProgress().UploadedBytes;
                this._ChunkEnd = null;
                this._ChunkEnd = this._ChunkStart + this._ChunkSize;
                if (this._ChunkEnd > _946 || this._ChunkSize === 0) {
                    this._ChunkEnd = _946;
                }
                if (this._ChunkStart !== 0 || this._ChunkEnd !== _946) {
                    this._Xhr.setRequestHeader("Content-Range", "bytes " + this._ChunkStart + "-" + (this._ChunkEnd - 1) + "/" + _946);
                }
                if (this._ChunkEnd < _946) {
                    this._Xhr.send(this._File.slice(this._ChunkStart, this._ChunkEnd));
                } else {
                    this._Xhr.send(this._File.slice(this._ChunkStart));
                }
            } else {
                this._ChunkStart = 0;
                this._ChunkEnd = null;
                this._Xhr.send(this._File);
            }
        },
        _InitializeXhr: function () {
            this._Xhr = new XMLHttpRequest();
            this._Xhr.upload.onloadstart = ITHit.Utils.MakeScopeClosure(this, "_LoadStartHandler", this._Xhr);
            this._Xhr.upload.onprogress = ITHit.Utils.MakeScopeClosure(this, "_ProgressHandler", this._Xhr);
            this._Xhr.onreadystatechange = ITHit.Utils.MakeScopeClosure(this, "_ReadyStateChange", this._Xhr);
            var _947 = ITHit.WebDAV.Client.Encoder.Encode(this.UploadItem.GetUrl());
            this._Xhr.open(this._HttpMethod, _947, true);
            try {
                this._Xhr.withCredentials = true;
            } catch (e) {
            }
        },
        _LoadStartHandler: function (oXhr, _949) {
            if (!this._SkipLoadStartHandling) {
                var _94a = new ITHit.WebDAV.Client.Upload.Events.LoadStart(this.UploadItem, this._ChunkStart, this._ChunkEnd);
                ITHit.Events.DispatchEvent(this, _94a.Name, [this, _94a]);
            }
        },
        _FireProgressChanged: function (_94b) {
            var _94c = new ITHit.WebDAV.Client.Upload.Events.LoadProgress(this.UploadItem, _94b, this.UploadItem.GetSize());
            ITHit.Events.DispatchEvent(this, _94c.Name, [this, _94c]);
        },
        _ProgressHandler: function (oXhr, _94e) {
            var iNow = new Date().getTime();
            if (iNow - this._LastReportTime < this._ReportPeriod) {
                return;
            }
            this._LastReportTime = iNow;
            var _950 = _94e.loaded;
            this._FireProgressChanged(_950);
        },
        _ReadyStateChange: function (oXhr, _952) {
            if (this._Xhr.readyState !== 4) {
                return;
            }
            var _953 = new ITHit.WebDAV.Client.HttpStatus(this._Xhr.status, this._Xhr.statusText);
            if (_953.IsSuccess()) {
                this._LoadHandler(oXhr, _952);
            } else {
                this._ErrorHandler(oXhr, _952, _953);
            }
        },
        _ErrorHandler: function (oXhr, _955, _956) {
            var _957 = new ITHit.WebDAV.Client.Upload.Events.LoadError(this, _956, oXhr.responseText);
            ITHit.Events.DispatchEvent(this, _957.Name, [this, _957]);
        },
        _CreateResponse: function (oXhr) {
            var _959 = new ITHit.WebDAV.Client.HttpStatus(oXhr.status, oXhr.statusText);
            var _95a = new ITHit.HttpResponse(this.Url, _959.Code, _959.Description);
            _95a._SetBody(oXhr.responseXML, oXhr.responseText);
            return _95a;
        },
        IsLastPart: function () {
            return this._ChunkEnd && this._ChunkEnd !== this.UploadItem.GetSize();
        },
        _LoadHandler: function (oXhr, _95c) {
            if (this.UploadItem) {
                if (this._IsPartial() && this.IsLastPart()) {
                    this._SkipLoadStartHandling = true;
                    this._FireProgressChanged(this._ChunkEnd);
                    this.BeginUpload(this.UploadItem, this._ChunkSize);
                    return;
                }
                var _95d = this._CreateResponse(oXhr);
                var _95e = new ITHit.WebDAV.Client.Upload.Events.LoadEnd(this.UploadItem, _95d);
                ITHit.Events.DispatchEvent(this, _95e.Name, [this, _95e]);
            }
        },
        Destruct: function () {
            this.IsAborted = true;
            if (!this._Xhr) {
                return;
            }
            if (this._Xhr.upload) {
                this._Xhr.upload.onloadstart = null;
                this._Xhr.upload.onprogress = null;
            }
            this._Xhr.onreadystatechange = null;
            this._Xhr.abort();
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Providers.UploadTask", null, {
        Uploader: null,
        UploadItem: null,
        ProgressTracker: null,
        IsStarted: false,
        constructor: function (_95f, _960, _961) {
            this.Uploader = _95f;
            this.UploadItem = _960;
            this.ProgressTracker = _961;
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.UploaderSession", ITHit.WebDAV.Client.WebDavSession, {
        ExistsFolders: [], GetProgressReportAsync: function (sUrl, _963) {
            var _964 = this.CreateRequest(this.__className + ".ReportAsync()");
            var _965 = ITHit.WebDAV.Client.Encoder.Encode(sUrl);
            var _966 = ITHit.WebDAV.Client.HierarchyItem.GetHost(_965);
            ITHit.WebDAV.Client.Methods.Report.GoAsync(_964, _965, _966, null, null, function (_967) {
                _964.MarkFinish();
                _963(_967);
            });
            return _964;
        }, CancelUploadAsync: function (sUrl, _969) {
            var _96a = this.CreateRequest(this.__className + ".CancelUpload()");
            var _96b = ITHit.WebDAV.Client.Encoder.Encode(sUrl);
            var _96c = ITHit.WebDAV.Client.HierarchyItem.GetHost(_96b);
            ITHit.WebDAV.Client.Methods.CancelUpload.GoAsync(_96a, _96b, [], _96c, function (_96d) {
                _96a.MarkFinish();
                var _96e = new ITHit.WebDAV.Client.AsyncResult(true, true, null);
                if (_96d.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                    _96e = new ITHit.WebDAV.Client.AsyncResult(true, true, null);
                } else {
                    if (!_96d.IsSuccess) {
                        _96e = new ITHit.WebDAV.Client.AsyncResult(_96d.IsSuccess, _96d.IsSuccess, _96d.Error);
                    }
                }
                _969(_96e);
            });
            return _96a;
        }, CheckExistsAsync: function (sUrl, _970) {
            _970 = _970 || function () {
            };
            return this.OpenItemAsync(ITHit.WebDAV.Client.Encoder.Encode(sUrl), [], function (_971) {
                var _972 = new ITHit.WebDAV.Client.AsyncResult(true, true, null);
                if (_971.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                    _972 = new ITHit.WebDAV.Client.AsyncResult(false, true, null);
                } else {
                    if (!_971.IsSuccess) {
                        _972 = new ITHit.WebDAV.Client.AsyncResult(_971.IsSuccess, _971.IsSuccess, _971.Error);
                    }
                }
                _970(_972);
            });
        }, DeleteAsync: function (_973, _974, _975) {
            _974 = _974 || null;
            var _976 = ITHit.WebDAV.Client.Encoder.Encode(_973);
            var _977 = ITHit.WebDAV.Client.HierarchyItem.GetHost(_976);
            var _978 = this.CreateRequest(this.__className + ".DeleteAsync()");
            ITHit.WebDAV.Client.Methods.Delete.GoAsync(_978, _976, _974, _977, function (_979) {
                if (!_979.IsSuccess && _979.Error instanceof ITHit.WebDAV.Client.Exceptions.NotFoundException) {
                    _979 = new ITHit.WebDAV.Client.AsyncResult(true, true, null);
                }
                _978.MarkFinish();
                _975(_979);
            });
            return _978;
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Uploaders.WebKitUploader", ITHit.WebDAV.Client.Upload.Uploaders.BaseXhrUploader, {
        _InitializeXhr: function () {
            this._super();
            this._Xhr.setRequestHeader("If-Modified-Since", "Mon, 26 Jul 1997 05:00:00 GMT");
            this._Xhr.setRequestHeader("Cache-Control", "no-cache");
            this._Xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Uploaders.FolderUploader", ITHit.WebDAV.Client.Upload.Uploaders.BaseUploader, {
        Url: null, UploadItem: null, _Session: null, constructor: function (_97a) {
            this._Session = _97a;
        }, _DispatchLoadStart: function () {
            var _97b = new ITHit.WebDAV.Client.Upload.Events.LoadStart(this.UploadItem, 0, 0);
            ITHit.Events.DispatchEvent(this, _97b.Name, [this, _97b]);
        }, _DispatchLoadEnd: function () {
            var _97c = new ITHit.WebDAV.Client.Upload.Events.LoadEnd(this.UploadItem, null);
            ITHit.Events.DispatchEvent(this, _97c.Name, [this, _97c]);
        }, BeginUpload: function (_97d, _97e) {
            this.Url = _97d.GetUrl();
            this.UploadItem = _97d;
            this._DispatchLoadStart();
            var that = this;
            if (_97d._FileInfo.IsExists) {
                that._DispatchProgressChanged();
                that._DispatchLoadEnd();
                return;
            }
            this._Session.CreateFolderAsync(this.Url, null, function (_980) {
                if (!_980.IsSuccess) {
                    that._DispatchProgressChanged();
                    that._DispatchError(_980.Status, _980.Error);
                } else {
                    that._DispatchLoadEnd();
                }
            });
        }, _DispatchError: function (_981, _982) {
            var _983 = new ITHit.WebDAV.Client.Upload.Events.LoadError(this, _981, _982);
            ITHit.Events.DispatchEvent(this, _983.Name, [this, _983]);
        }, _DispatchProgressChanged: function () {
            var _984 = new ITHit.WebDAV.Client.Upload.Events.LoadProgress(this.UploadItem, 0, 0);
            ITHit.Events.DispatchEvent(this, _984.Name, [this, _984]);
        }
    });
})();
(function () {
    var _985 = ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Uploaders.CreateParentDecorator", ITHit.WebDAV.Client.Upload.Uploaders.BaseUploader, {
        _Uploader: null, _PathsToCreate: [], _CurrentRequest: null, constructor: function (_986, _987) {
            this._Session = _986;
            this._Uploader = _987;
        }, _SubscribeOnEvents: function () {
            ITHit.Events.AddListener(this._Uploader, ITHit.WebDAV.Client.Upload.Events.EventName.OnLoadStart, "_ForwardEventStart", this);
            ITHit.Events.AddListener(this._Uploader, ITHit.WebDAV.Client.Upload.Events.EventName.OnLoadProgress, "_ForwardEventStart", this);
            ITHit.Events.AddListener(this._Uploader, ITHit.WebDAV.Client.Upload.Events.EventName.OnLoadEnd, "_ForwardEventStart", this);
            ITHit.Events.AddListener(this._Uploader, ITHit.WebDAV.Client.Upload.Events.EventName.OnLoadError, "_ForwardEventStart", this);
        }, BeginUpload: function (_988, _989) {
            if (this.IsAborted || !this._Uploader) {
                return;
            }
            this._SubscribeOnEvents();
            var that = this;
            if (_988._FileInfo.IsExists) {
                that._Uploader.BeginUpload(_988, _989);
                that.UploadItem = that._Uploader.UploadItem;
                that.Url = that._Uploader.Url;
                return;
            }
            this._CreateMissedParentsAsync(_988, function (_98b) {
                if (!_98b.IsSuccess || that.IsAborted || !that._Uploader) {
                    return;
                }
                that._Uploader.BeginUpload(_988, _989);
                that.UploadItem = that._Uploader.UploadItem;
                that.Url = that._Uploader.Url;
            });
        }, Destruct: function () {
            this.IsAborted = true;
            if (this._CurrentRequest) {
                this._CurrentRequest.Abort();
            }
            if (this._Uploader) {
                this._Uploader.Destruct();
                ITHit.Events.RemoveAllListeners(this._Uploader);
                this._Uploader = null;
            }
        }, _ForwardEventStart: function (_98c, _98d) {
            ITHit.Events.DispatchEvent(this, _98d.Name, [_98c, _98d]);
        }, _GetAncestorsPaths: function (_98e) {
            var _98f = _98e.GetRelativePath();
            var _990 = _98f.split("/");
            if (_98e.IsFolder()) {
                _990 = _990.slice(0, -1);
            }
            var _991 = [];
            if (_990.length > 1) {
                var path = "";
                for (var i2 = 0; i2 < _990.length - 1; i2++) {
                    if (path !== "") {
                        path += "/";
                    }
                    path += _990[i2];
                    _991.push(_98e.GetBaseUrl() + path);
                }
            }
            return _991;
        }, _CreateMissedParentsAsync: function (_994, _995) {
            this._PathsToCreate = this._PathsToCreate.concat(this._GetAncestorsPaths(_994));
            this._CreatePathCollectionAsync(this._PathsToCreate, _995);
        }, _CreatePathCollectionAsync: function (aUrl, _997) {
            if (aUrl.length > 0 && !this.IsAborted) {
                var self = this;
                var _999 = aUrl[0];
                self._CreateFolderIfNotExists(_999, function (_99a) {
                    if (_99a.IsSuccess) {
                        self._CreatePathCollectionAsync(aUrl.slice(1), function (_99b) {
                            if (_99b.IsSuccess) {
                                _997(new ITHit.WebDAV.Client.AsyncResult(aUrl, true, null));
                            } else {
                                _997(new ITHit.WebDAV.Client.AsyncResult(aUrl, false, _99b.Error));
                            }
                        });
                    } else {
                        _997(new ITHit.WebDAV.Client.AsyncResult(aUrl, false, _99a.Error));
                    }
                });
            } else {
                _997(new ITHit.WebDAV.Client.AsyncResult(aUrl, true, null));
            }
        }, _CreateFolderIfNotExists: function (sUrl, _99d) {
            if (this.IsAborted) {
                _99d(new ITHit.WebDAV.Client.AsyncResult(sUrl, true, null));
                return;
            }
            var self = this;
            this._EnterUrlGuarded(sUrl, function () {
                self._CurrentRequest = self._Session.CheckExistsAsync(sUrl, function (_99f) {
                    if (_99f.IsSuccess && !_99f.Result && !self.IsAborted) {
                        self._CurrentRequest = self._Session.CreateFolderAsync(sUrl, null, function (_9a0) {
                            if (_9a0.IsSuccess) {
                                self._LeaveUrlGuarded(sUrl);
                                _99d(new ITHit.WebDAV.Client.AsyncResult(sUrl, true, null));
                            } else {
                                self._LeaveUrlGuarded(sUrl);
                                _99d(new ITHit.WebDAV.Client.AsyncResult(sUrl, false, _9a0.Error));
                            }
                        });
                    } else {
                        self._LeaveUrlGuarded(sUrl);
                        _99d(new ITHit.WebDAV.Client.AsyncResult(sUrl, true, null));
                    }
                });
            });
        }, _EnterUrlGuarded: function (sUrl, _9a2) {
            var _9a3 = _985._UrlInProgress.Get(sUrl);
            if (_9a3) {
                _9a3.push(_9a2);
            } else {
                _985._UrlInProgress.Set(sUrl, []);
                setTimeout(_9a2, 0);
            }
        }, _LeaveUrlGuarded: function (sUrl) {
            var _9a5 = _985._UrlInProgress.Get(sUrl);
            if (_9a5 && _9a5.length) {
                var _9a6 = _9a5.pop();
                setTimeout(_9a6, 0);
            } else {
                _985._UrlInProgress.Delete(sUrl);
            }
        }
    }, {_UrlInProgress: new ITHit.WebDAV.Client.Upload.Collections.Map()});
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Uploaders.UploadersFactory", null, {
        _Session: null,
        constructor: function (_9a7) {
            this._Session = _9a7;
        },
        CreateFromUploadItem: function (_9a8) {
            var _9a9 = null;
            if (_9a8.IsFolder()) {
                _9a9 = new ITHit.WebDAV.Client.Upload.Uploaders.FolderUploader(this._Session);
            } else {
                _9a9 = new ITHit.WebDAV.Client.Upload.Uploaders.WebKitUploader();
            }
            return new ITHit.WebDAV.Client.Upload.Uploaders.CreateParentDecorator(this._Session, _9a9);
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Utils.RepeatableActionContext", null, {
        _RoundsCount: 0,
        _IsActive: true,
        _Handler: null,
        _EndHandler: null,
        _RepeatTime: 0,
        constructor: function (_9aa, _9ab, _9ac, _9ad) {
            this._RoundsCount = _9aa;
            this._Handler = _9ac;
            this._EndHandler = _9ad;
            this._IsActive = !!_9aa;
            this._RepeatTime = _9ab;
        },
        Stop: function (_9ae) {
            this._IsActive = false;
            this._RoundsCount = 0;
            this._EndHandler(_9ae);
        },
        _RunRound: function () {
            if (this._IsActive) {
                this._Handler(this);
            } else {
                this.Stop();
            }
        },
        EndRound: function (_9af) {
            this._RoundsCount--;
            if (this._RoundsCount === 0) {
                this.Stop(_9af);
            } else {
                setTimeout(this._RunRound.bind(this), this._RepeatTime);
            }
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Utils.RepeatableAction", null, {
        _Action: null,
        constructor: function (_9b0) {
            this._Action = _9b0;
        },
        RunAsync: function (_9b1, _9b2, _9b3) {
            var _9b4 = new ITHit.WebDAV.Client.Upload.Utils.RepeatableActionContext(_9b1, _9b2, this._Action, _9b3);
            _9b4._RunRound();
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Providers.UploadProvider", null, {
        _UploadTasks: null, UploadCounter: 0, CreateProgressTracker: function (sUrl, _9b6) {
            return new ITHit.WebDAV.Client.Upload.Providers.ProgressTracker(this._Session, sUrl, _9b6);
        }, _Session: null, _UploadersFactory: null, constructor: function (_9b7) {
            this.UploadCounter = 0;
            this._UploadTasks = {};
            this._Session = _9b7;
            this.ProgressTracker = new ITHit.WebDAV.Client.Upload.Providers.ProgressTracker(this._Session);
            this._UploadersFactory = new ITHit.WebDAV.Client.Upload.Uploaders.UploadersFactory(this._Session);
        }, _SubscribeOnUploaderEvents: function (_9b8) {
            ITHit.Events.AddListener(_9b8, ITHit.WebDAV.Client.Upload.Events.EventName.OnLoadStart, "_LoadStartHandler", this);
            ITHit.Events.AddListener(_9b8, ITHit.WebDAV.Client.Upload.Events.EventName.OnLoadProgress, "_ProgressHandler", this);
            ITHit.Events.AddListener(_9b8, ITHit.WebDAV.Client.Upload.Events.EventName.OnLoadEnd, "_LoadHandler", this);
            ITHit.Events.AddListener(_9b8, ITHit.WebDAV.Client.Upload.Events.EventName.OnLoadError, "_ErrorHandler", this);
        }, _OnUploadSessionStart: function (_9b9, _9ba) {
            _9b9._SetState(ITHit.WebDAV.Client.Upload.State.Uploading);
            if (_9ba.ProgressTracker.IsUploaded()) {
                _9ba.ProgressTracker.Reset();
            }
            var _9bb = this._UploadersFactory.CreateFromUploadItem(_9b9);
            _9ba.Uploader = _9bb;
            this._SubscribeOnUploaderEvents(_9bb);
            _9bb.BeginUpload(_9b9);
        }, StartUploadAsync: function (_9bc, _9bd, _9be) {
            var _9bf = _9bc.GetState();
            if (_9bf === ITHit.WebDAV.Client.Upload.State.Uploading) {
                return;
            }
            var _9c0 = new ITHit.WebDAV.Client.Upload.Providers.UploadTask(null, _9bc, _9bd);
            this._UploadTasks[_9bc.GetUrl()] = _9c0;
            this.UploadCounter++;
            if (_9bc._FileInfo.IsExists) {
                var that = this;
                _9c0.ProgressTracker.StartResumableSessionAsync(function () {
                    that._OnUploadSessionStart(_9bc, _9c0);
                });
            } else {
                _9c0.ProgressTracker.StartTracking();
                this._OnUploadSessionStart(_9bc, _9c0);
            }
            _9be();
        }, _GetTaskByItem: function (_9c2) {
            var sUrl = _9c2.GetUrl();
            return this._UploadTasks[sUrl];
        }, _LoadStartHandler: function (_9c4, _9c5) {
            var _9c6 = this._GetTaskByItem(_9c4.UploadItem);
            _9c6.IsStarted = true;
        }, _ProgressHandler: function (_9c7, _9c8) {
            var _9c9 = this._GetTaskByItem(_9c7.UploadItem);
            if (!_9c9) {
                return;
            }
            _9c9.ProgressTracker.UpdateBytes(_9c8.BytesLoaded, _9c8.TotalBytes);
        }, _LoadHandler: function (_9ca, _9cb) {
            this.ProgressTracker.UpdateBytes(_9cb.Item.GetSize(), _9cb.Item.GetSize());
            this._FinaliseUploadAsync(_9ca.UploadItem, function () {
                _9ca.UploadItem._SetState(ITHit.WebDAV.Client.Upload.State.Completed);
            });
        }, _ErrorHandler: function (_9cc, _9cd) {
            var _9ce = this._GetTaskByItem(_9cc.UploadItem);
            if (!_9ce) {
                return;
            }
            this._FinaliseUploadAsync(_9cc.UploadItem, function () {
                _9ce.UploadItem._SetState(ITHit.WebDAV.Client.Upload.State.Failed);
            });
        }, _FinaliseUploadAsync: function (_9cf, _9d0) {
            var _9d1 = this._GetTaskByItem(_9cf);
            if (!_9d1) {
                _9d0();
            }
            if (_9d1.Uploader) {
                ITHit.Events.RemoveAllListeners(_9d1.Uploader);
                _9d1.Uploader.Destruct();
            }
            var that = this;
            if (_9cf.GetState() !== ITHit.WebDAV.Client.Upload.State.Uploading) {
                _9d1.ProgressTracker.StopResumableSessionAsync(function () {
                    delete that._UploadTasks[_9cf.GetUrl()];
                    that.UploadCounter--;
                    _9d0();
                });
            } else {
                _9d1.ProgressTracker.StopTracking();
                delete that._UploadTasks[_9cf.GetUrl()];
                that.UploadCounter--;
                _9d0();
            }
        }, PauseUpload: function (_9d3, _9d4) {
            if (_9d3.GetState() !== ITHit.WebDAV.Client.Upload.State.Uploading) {
                return;
            }
            var _9d5 = this._GetTaskByItem(_9d3);
            if (!_9d5) {
                _9d4();
                return;
            }
            this._FinaliseUploadAsync(_9d3, function () {
                _9d3._SetState(ITHit.WebDAV.Client.Upload.State.Paused);
                _9d4();
            });
        }, _AbortNotStartedUpload: function (_9d6, _9d7) {
            _9d6._SetState(ITHit.WebDAV.Client.Upload.State.Canceled);
            _9d6._ProgressTracker.Reset();
            _9d7();
        }, OnAbortRequestFinalised: function (_9d8, _9d9, _9da, _9db) {
            var that = this;
            if (!_9d8._FileInfo.IsExists) {
                var _9dd = new ITHit.WebDAV.Client.Upload.Utils.RepeatableAction(function (_9de) {
                    that._Session.DeleteAsync(_9d8.GetUrl(), null, function (_9df) {
                        if (_9df.IsSuccess) {
                            _9de.Stop(_9df);
                        } else {
                            _9de.EndRound(_9df);
                        }
                    });
                });
                _9dd.RunAsync(_9d9, _9da, function (_9e0) {
                    if (!!_9e0 && _9e0.IsSuccess) {
                        _9d8._SetState(ITHit.WebDAV.Client.Upload.State.Canceled);
                    } else {
                        _9d8._SetState(ITHit.WebDAV.Client.Upload.State.Failed);
                    }
                    _9d8._ProgressTracker.Reset();
                    _9db();
                });
                return;
            }
            that._Session.CancelUploadAsync(_9d8.GetUrl(), function (_9e1) {
                _9d8._SetState(ITHit.WebDAV.Client.Upload.State.Canceled);
                _9d8._ProgressTracker.Reset();
                _9db();
            });
        }, AbortUpload: function (_9e2, _9e3, _9e4, _9e5) {
            _9e5 = _9e5 || function () {
            };
            var _9e6 = this._GetTaskByItem(_9e2);
            var _9e7 = _9e2.GetState();
            if (_9e7 == ITHit.WebDAV.Client.Upload.State.Paused || _9e7 == ITHit.WebDAV.Client.Upload.State.Failed) {
                this.OnAbortRequestFinalised(_9e2, _9e3, _9e4, _9e5);
            } else {
                if (!_9e6) {
                    this._AbortNotStartedUpload(_9e2, _9e5);
                } else {
                    var that = this;
                    this._FinaliseUploadAsync(_9e2, function () {
                        if (_9e6.IsStarted) {
                            that.OnAbortRequestFinalised(_9e2, _9e3, _9e4, _9e5);
                        } else {
                            that._AbortNotStartedUpload(_9e2, _9e5);
                        }
                    });
                }
            }
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Utils.Array", null, {}, {
        MapParallel: function (_9e9, _9ea, _9eb, _9ec) {
            var _9ed = [];
            var _9ee = 0;
            if (_9e9.length === 0) {
                setTimeout(_9eb.apply(_9ec, _9e9));
            }
            for (var i = 0; i < _9e9.length; i++) {
                _9ea.apply(_9ec, [_9e9[i], i, _9e9, ITHit.Utils.MakeScopeClosure(this, function (i, _9f1) {
                    _9ed[i] = _9f1;
                    _9ee++;
                    if (_9ee === _9e9.length) {
                        setTimeout(_9eb.call(_9ec, _9ed));
                    }
                }, i)]);
            }
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Queue", null, {
        Uploader: null, _UnderlyingArray: null, _UploadProvider: null, _Session: null, constructor: function (_9f2) {
            this.Uploader = _9f2;
            this._Session = new ITHit.WebDAV.Client.Upload.UploaderSession();
            this._UploadProvider = new ITHit.WebDAV.Client.Upload.Providers.UploadProvider(this._Session);
            this._UnderlyingArray = [];
        }, ShouldReplaceDuplicate: function (_9f3) {
            var _9f4 = this.GetByUrl(_9f3.Url.GetHref());
            var _9f5 = _9f4.GetState();
            return !(_9f5 === ITHit.WebDAV.Client.Upload.State.Uploading || _9f5 === ITHit.WebDAV.Client.Upload.State.Paused);
        }, _FillExistence: function (_9f6, _9f7) {
            ITHit.WebDAV.Client.Upload.Utils.Array.MapParallel(_9f6, function (_9f8, _9f9, _9fa, _9fb) {
                this._Session.CheckExistsAsync(_9f8.Url.GetHref(), function (_9fc) {
                    if (!_9fc.IsSuccess || !_9fc.Result) {
                        _9f8.IsExists = false;
                    } else {
                        _9f8.IsExists = true;
                    }
                    _9fb(_9f8);
                });
            }, function (_9fd) {
                _9f7(_9fd);
            }, this);
        }, AddFilesToQueue: function (_9fe, _9ff) {
            var that = this;
            this._FillExistence(_9fe, function (_a01) {
                var _a02 = [];
                for (var i = 0; i < _a01.length; i++) {
                    var _a04 = _a01[i];
                    if (that.HasUrl(_a04.Url.GetHref())) {
                        if (that.ShouldReplaceDuplicate(_a04)) {
                            that.RemoveByUrl(_a04.Url.GetHref());
                        } else {
                            continue;
                        }
                    }
                    var _a05 = new ITHit.WebDAV.Client.Upload.UploadItem(that, _a04, _9ff, that._UploadProvider);
                    _a02.push(_a05);
                }
                that.AddRange(_a02);
            });
        }, Add: function (_a06) {
            var sUrl = _a06.GetUrl();
            if (this.HasUrl(sUrl)) {
                return;
            }
            this._UnderlyingArray.push(_a06);
            _a06.AddListener(ITHit.WebDAV.Client.Upload.Events.EventName.OnStateChanged, "_TryStartNewUpload", this);
            var _a08 = new ITHit.WebDAV.Client.Upload.Events.QueueChanged(this, [_a06]);
            ITHit.Events.DispatchEvent(this, _a08.Name, [_a08]);
            this._TryStartNewUpload();
        }, AddRange: function (_a09) {
            for (var i = 0; i < _a09.length; i++) {
                var _a0b = _a09[i];
                var sUrl = _a0b.GetUrl();
                if (this.HasUrl(sUrl)) {
                    continue;
                }
                this._UnderlyingArray.push(_a0b);
                _a0b.AddListener(ITHit.WebDAV.Client.Upload.Events.EventName.OnStateChanged, "_TryStartNewUpload", this);
            }
            this._OnQueueChanged(_a09, null);
        }, GetByUrl: function (sUrl) {
            return ITHit.Utils.FindBy(this._UnderlyingArray, function (_a0e) {
                return _a0e.GetUrl() === sUrl;
            });
        }, GetLength: function () {
            return this._UnderlyingArray.length;
        }, HasUrl: function (sUrl) {
            return !!this.GetByUrl(sUrl);
        }, RemoveByUrl: function (sUrl) {
            var _a11 = this.GetByUrl(sUrl);
            if (!_a11) {
                return;
            }
            var _a12 = _a11.GetState();
            if (_a12 === ITHit.WebDAV.Client.Upload.State.Uploading || _a12 === ITHit.WebDAV.Client.Upload.State.Paused) {
                this._UploadProvider.AbortUpload(_a11);
            }
            var _a13 = ITHit.Utils.IndexOf(this._UnderlyingArray, _a11);
            this._UnderlyingArray.splice(_a13, 1);
            this._OnQueueChanged(null, [_a11]);
        }, _OnQueueChanged: function (_a14, _a15) {
            var _a16 = new ITHit.WebDAV.Client.Upload.Events.QueueChanged(this, _a14, _a15);
            ITHit.Events.DispatchEvent(this, _a16.Name, [_a16]);
            this._TryStartNewUpload();
        }, _TryStartNewUpload: function () {
            if (this._UploadProvider.UploadCounter < this.Uploader.Settings.ConcurrentUploads) {
                var _a17 = this.GetFirstByState(ITHit.WebDAV.Client.Upload.State.Queued);
                if (_a17) {
                    _a17.StartAsync();
                }
            }
        }, GetFirstByState: function (_a18) {
            return ITHit.Utils.FindBy(this._UnderlyingArray, function (_a19) {
                return _a19.GetState() === _a18;
            });
        }, AddListener: function (_a1a, _a1b, _a1c) {
            _a1c = _a1c || null;
            switch (_a1a) {
                case ITHit.WebDAV.Client.Upload.Events.EventName.OnQueueChanged:
                    ITHit.Events.AddListener(this, _a1a, _a1b, _a1c);
                    break;
                default:
                    throw new ITHit.WebDAV.Client.Exceptions.WebDavException("Not found event name `" + _a1a + "`");
            }
        }, RemoveListener: function (_a1d, _a1e, _a1f) {
            ITHit.Events.RemoveListener(this, _a1d, _a1e, _a1f);
        }
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.DropZoneCollection", null, {
        _UnderlyingSet: null,
        Uploader: null,
        constructor: function (_a20) {
            this._Uploader = _a20;
            this._UnderlyingSet = {};
        },
        AddById: function (_a21) {
            var _a22 = this.GetById(_a21);
            if (_a22) {
                return _a22;
            }
            var _a23 = new ITHit.WebDAV.Client.Upload.Controls.DropZone(this._Uploader, _a21);
            this._UnderlyingSet[_a21] = _a23;
            return _a23;
        },
        GetById: function (_a24) {
            return this._UnderlyingSet[_a24];
        },
        RemoveById: function (_a25) {
            var _a26 = this.GetById(_a25);
            if (_a26) {
                delete this._UnderlyingSet[_a25];
            }
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.InputCollection", null, {
        _UnderlyingSet: null,
        Uploader: null,
        constructor: function (_a27) {
            this._UnderlyingArray = [];
            this._Uploader = _a27;
        },
        AddById: function (_a28) {
            var _a29 = new ITHit.WebDAV.Client.Upload.Controls.Input(this._Uploader, _a28);
            this._UnderlyingArray[_a28] = _a29;
            return _a29;
        },
        GetById: function (_a2a) {
            return this._UnderlyingArray[_a2a];
        },
        RemoveById: function (_a2b) {
            var _a2c = this.GetById(_a2b);
            if (_a2c) {
                delete this._UnderlyingSet[_a2b];
            }
        }
    });
})();
(function () {
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Settings", null, {
        ConcurrentUploads: 2,
        State: ITHit.WebDAV.Client.Upload.State.Uploading
    });
})();
(function () {
    "use strict";
    ITHit.DefineClass("ITHit.WebDAV.Client.Upload.Uploader", null, {
        DropZones: null,
        Inputs: null,
        Queue: null,
        Settings: null,
        _UploadProvider: null,
        constructor: function () {
            this.Inputs = new ITHit.WebDAV.Client.Upload.InputCollection(this);
            this.DropZones = new ITHit.WebDAV.Client.Upload.DropZoneCollection(this);
            this.Queue = new ITHit.WebDAV.Client.Upload.Queue(this);
            this.Settings = new ITHit.WebDAV.Client.Upload.Settings();
        },
        SetUploadUrl: function (sUrl) {
            this._UploadUrl = sUrl;
        },
        GetUploadUrl: function () {
            return this._UploadUrl;
        }
    });
})();
ITHit.Temp = {};