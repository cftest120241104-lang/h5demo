window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AdBuffPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d485ao7UX9MBrY+vbRR1hy7", "AdBuffPanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const u = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    const EnabledBtn_1 = require("./EnabledBtn");
    var s, f;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AdBuffPanel = class AdBuffPanel extends cc.Component {
      constructor() {
        super(...arguments);
        this.anim = null;
        this.bgSpr = null;
        this.bgSFS = null;
        this.iconSpr = null;
        this.iconSFS = null;
        this.lvStr = null;
        this.expStr = null;
        this.expBar = null;
        this.nameStr = null;
        this.descStr = null;
        this.remainTimeStr = null;
        this.getBtn = null;
        this.AdBuffConfig = null;
        this.isOn = null;
      }
      getEnableBtnComp() {
        return this.getBtn ? this.getBtn.getComponent(EnabledBtn_1.default) : null;
      }
      getFallbackBtnNode() {
        if (!this.getBtn || !this.getBtn.parent) return null;
        var c = this.getBtn.parent.getComponentInChildren(cc.Button);
        return c ? c.node : null;
      }
      setBtnState(c, t) {
        var i = this.getEnableBtnComp();
        if (i) {
          i.setEnable(c);
          c || i.setRule(1, {
            tillTime: t
          });
          return;
        }
        this.btnEnabled = c;
        var e = this.getBtn ? this.getBtn.getChildByName("text") : null, s = this.getBtn ? this.getBtn.getChildByName("num") : null, f = this.getBtn && this.getBtn.parent ? this.getBtn.parent.getChildByName("text2") : null, r = this.getBtn ? this.getBtn.getComponent(cc.Sprite) : null, h = this.getFallbackBtnNode();
        e && (e.active = c);
        s && (s.active = !c);
        f && (f.active = !c);
        h && h.getComponent(cc.Button) && (h.getComponent(cc.Button).interactable = c);
        r && (r.node.opacity = c ? 255 : 180);
        if (!c && s) {
          var a = s.getComponent(cc.Label);
          a && (a.string = Tool_1.default.formatCountDown(Math.max(0, Math.floor(t - Date.now() / 1e3)), true));
        }
      }
      init(c) {
        this.idx = c;
        this.iconSpr.spriteFrame = this.iconSFS[c];
        this.nameStr.string = this.AdBuffConfig.json[c].name;
        this.refresh();
      }
      refresh() {
        var c, t;
        t = cc.player.ADBattleBuff[this.idx];
        this.lvStr.string = "Lv." + t.lv;
        u.Datas.ADBattleBuffData[t.lv].need > 0 ? (this.expStr.string = t.exp + "/" + u.Datas.ADBattleBuffData[t.lv].need, 
        this.expBar.progress = t.exp / u.Datas.ADBattleBuffData[t.lv].need) : (this.expStr.string = "\u5df2\u6ee1\u7ea7", 
        this.expBar.progress = 1);
        c = u.Datas.ADBattleBuffData[t.lv].eqParm;
        this.descStr.string = Tool_1.default.getRicktextStr(this.AdBuffConfig.json[this.idx].desc, 0, [ [ c ] ], [ "" ], [ "%" ], [ "<color = " + this.AdBuffConfig.json[this.idx].color + ">", "</c>" ]);
        this.refreshBtn();
        this.refreshRemainTime();
      }
      refreshRemainTime() {
        var c, t;
        t = cc.player.ADBattleBuff[this.idx];
        (c = Math.floor(t.tillTime - Date.now() / 1e3)) > 0 ? (this.isOn.active = true, 
        this.remainTimeStr.string = "" + Tool_1.default.formatCountDown(c, c >= 3600), this.bgSpr.spriteFrame = this.bgSFS[0]) : (this.isOn.active = false, 
        this.remainTimeStr.string = "", this.bgSpr.spriteFrame = this.bgSFS[1]);
      }
      refreshBtn() {
        var c, s = 1e3;
        (c = cc.player.ADBattleBuff[this.idx]).tillTime - Date.now() / s > 7200 ? this.getBtn.active = false : (this.getBtn.active = true, 
        c.nextAdTime < Date.now() / s ? this.setBtnState(true, c.nextAdTime) : this.setBtnState(false, c.nextAdTime));
      }
      showAd(c, t) {
        this.inGame ? cc.pvz.AdUtils.showAdRewardVideoOrTicket(c, t) : cc.pvz.AdUtils.willShowAdRewardVideo(c, t);
      }
      doGetBuff() {
        var c;
        c = this;
        this.showAd(cc.pvz.GameConst.AdType["\u795d\u798f"], function(t) {
          var i, n, f = 1e3;
          t && (n = cc.player.ADBattleBuff[c.idx], i = u.Datas.ADBattleBuffData[n.lv], n.lv, 
          i.need > 0 && (n.exp++, n.exp >= i.need && (n.exp = 0, n.lv++)), n.nextAdTime = Math.floor(Date.now() / f + 60), 
          n.tillTime = Math.max(n.tillTime, Math.floor(Date.now() / f)) + i.time, n.getTime = Math.floor(Date.now() / f), 
          n.getLv = n.lv, cc.pvz.PlayerData.increaseMissionProg(1001 + c.idx, 1), cc.pvz.PlayerData.increaseMissionProg(1004, 1), 
          c.inGame || Tool_1.default.displayBPChange(), cc.pvz.PlayerData.saveData(), c.refresh());
        });
      }
      getBuff() {
        var c = this.getEnableBtnComp();
        (c ? c.flag : this.btnEnabled) && this.doGetBuff();
      }
      start() {
        var c = this.getFallbackBtnNode();
        c && c.on(cc.Node.EventType.TOUCH_END, this.getBuff, this);
      }
      onDestroy() {
        var c = this.getFallbackBtnNode();
        c && c.off(cc.Node.EventType.TOUCH_END, this.getBuff, this);
      }
      update() {
        this.refreshRemainTime();
        !this.getEnableBtnComp() && this.getBtn && this.getBtn.active && this.refreshBtn();
      }
    };
    __decorate([ property(cc.Animation) ], AdBuffPanel.prototype, "anim", void 0);
    __decorate([ property(cc.Sprite) ], AdBuffPanel.prototype, "bgSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], AdBuffPanel.prototype, "bgSFS", void 0);
    __decorate([ property(cc.Sprite) ], AdBuffPanel.prototype, "iconSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], AdBuffPanel.prototype, "iconSFS", void 0);
    __decorate([ property(cc.Label) ], AdBuffPanel.prototype, "lvStr", void 0);
    __decorate([ property(cc.Label) ], AdBuffPanel.prototype, "expStr", void 0);
    __decorate([ property(cc.ProgressBar) ], AdBuffPanel.prototype, "expBar", void 0);
    __decorate([ property(cc.Label) ], AdBuffPanel.prototype, "nameStr", void 0);
    __decorate([ property(cc.RichText) ], AdBuffPanel.prototype, "descStr", void 0);
    __decorate([ property(cc.Label) ], AdBuffPanel.prototype, "remainTimeStr", void 0);
    __decorate([ property(cc.Node) ], AdBuffPanel.prototype, "getBtn", void 0);
    __decorate([ property(cc.JsonAsset) ], AdBuffPanel.prototype, "AdBuffConfig", void 0);
    __decorate([ property(cc.Node) ], AdBuffPanel.prototype, "isOn", void 0);
    AdBuffPanel = __decorate([ ccclass ], AdBuffPanel);
    exports.default = AdBuffPanel;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./EnabledBtn": "EnabledBtn",
    "./Tool": "Tool"
  } ],
  AdBuffWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "88225QcvnxKeYvHNZPBPiiz", "AdBuffWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const AdBuffPanel_1 = require("./AdBuffPanel");
    const Tool_1 = require("./Tool");
    const s = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AdBuffWindow = class AdBuffWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.panelPre = null;
        this.panelContainer = null;
      }
      init() {}
      initBy() {
        this.init();
        this.inGame = true;
        this.show();
        this.inGame = true;
      }
      show() {
        this.refresh();
        this.inGame = false;
      }
      refresh() {
        for (var u = 0; u < cc.player.ADBattleBuff.length; u++) {
          var v;
          (v = Tool_1.default.getPrefab(this.panelContainer[u], this.panelPre, "adPanel").getComponent(AdBuffPanel_1.default)).init(u);
          v.inGame = this.inGame;
          v.anim.play(v.anim.getClips()[0].name);
        }
      }
      hide() {
        this.inGame ? cc.popupManager.removePopup(this) : cc.SubwindowManager.hideWindow(s.UIStatus.AdBuff);
      }
      start() {}
    };
    __decorate([ property(cc.Prefab) ], AdBuffWindow.prototype, "panelPre", void 0);
    __decorate([ property(cc.Node) ], AdBuffWindow.prototype, "panelContainer", void 0);
    AdBuffWindow = __decorate([ ccclass ], AdBuffWindow);
    exports.default = AdBuffWindow;
    cc._RF.pop();
  }, {
    "./AdBuffPanel": "AdBuffPanel",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  AdTicketWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7f2e2CE4UJLHKZOwfVU6v50", "AdTicketWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const NetworkManager_1 = require("../main/NetworkManager");
    const o = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var u = "../utils/Tool";
    let AdTicketWindow = class AdTicketWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.item13Num = null;
        this.willAutoUse = null;
      }
      init() {}
      initBy(c, t) {
        this.init();
        this.show({
          type: c,
          cb: t
        });
        this.inGame = true;
      }
      show(c) {
        void 0 === c && (c = {
          type: null,
          cb: function() {}
        });
        this.using = 0;
        this.type = c.type;
        this.cb = c.cb;
        this.item13Num.string = "" + cc.pvz.PlayerData.itemNum(13);
        this.inGame = false;
      }
      use() {
        var c;
        c = this;
        this.using || (this.using = 1, NetworkManager_1.default.checkTicketNum(-1, function() {
          c.cb(1);
          cc.pvz.PlayerData.saveData();
          c.noCallbackClose();
        }, function() {
          c.using = 0;
          cc.popupManager.showToast("\u5e7f\u544a\u5238\u9a8c\u8bc1\u5931\u8d25");
          c.cb(0);
        }));
      }
      onToggleChange() {
        u.showAdTicketWindow = !this.willAutoUse.isChecked;
      }
      showAd() {
        var c;
        c = this;
        this.using || (this.using = 1, cc.pvz.AdUtils.showAdRewardVideo(this.type, function(t) {
          c.using = 0;
          t && (c.cb(t), c.noCallbackClose());
        }));
      }
      noCallbackClose() {
        this.inGame ? cc.popupManager.removePopup(this) : cc.SubwindowManager.hideWindow(o.UIStatus.AdTicket);
      }
      hide() {
        this.using || (this.inGame && this.cb(false), this.noCallbackClose());
      }
    };
    __decorate([ property(cc.Label) ], AdTicketWindow.prototype, "item13Num", void 0);
    __decorate([ property(cc.Toggle) ], AdTicketWindow.prototype, "willAutoUse", void 0);
    AdTicketWindow = __decorate([ ccclass ], AdTicketWindow);
    exports.default = AdTicketWindow;
    cc._RF.pop();
  }, {
    "../main/NetworkManager": "NetworkManager",
    "./SubwindowManager": "SubwindowManager"
  } ],
  AdUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bfcf7Hm/JhJBYVXZ9QTUVLs", "AdUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MyRequest_1 = require("./MyRequest");
    const NetworkManager_1 = require("./NetworkManager");
    var g, m, p, A, S, s, f, a, M;
    var h = "default";
    [ h ];
    [ h ];
    g = null;
    m = null;
    p = null;
    A = [ 0 ];
    S = {
      initAllAds: function() {
        this.initSystemInfo();
        this.initAdInfo();
      },
      initAdInfo: function() {
        this.initRewardVideo();
      },
      initSystemInfo: function() {
        cc.sys.platform != cc.sys.WECHAT_GAME && cc.sys.platform != cc.sys.BYTEDANCE_GAME || (g = wx.getLaunchOptionsSync());
      },
      getLaunchOptions: function() {
        return g;
      },
      isWhiteList: function() {
        return cc.sys.platform == cc.sys.BYTEDANCE_GAME && (cc.sys.platform != cc.sys.WECHAT_GAME || this.isWhiteListSceneId() || cc.pvz.TAUtils.getTwtraceidSwitch(cc.pvz.GameConst.Twtraceid_YXBN) || cc.pvz.TAUtils.getTwtraceidSwitch(cc.pvz.GameConst.Twtraceid_YXSP));
      },
      isWhiteListSceneId: function() {
        return cc.sys.platform == cc.sys.BYTEDANCE_GAME && (cc.sys.platform != cc.sys.WECHAT_GAME || -1 != [ 1095 ].findIndex(function(t) {
          return t == g.scene;
        }));
      },
      getTwtraceidFrom: function(t) {
        if (Object.keys(t.query).length > 0) for (var c in t.query) {
          if ("?twtraceid" == c) return t.query[c];
          if ("twtraceid" == c) return t.query[c];
        }
        return "";
      },
      getTwtraceid: function() {
        return cc.sys.platform != cc.sys.WECHAT_GAME ? "" : this.getTwtraceidFrom(g);
      },
      callRewardAdCallback: function(t) {
        var v = this;
        cc.director.resume();
        this.hasCalledCB ? console.log("callRewardAdCallback but hascalled") : (t && (cc.player.adWatchTimes.times++, 
        cc.pvz.PlayerData.increaseMissionProg(201, 1), cc.pvz.PlayerData.increaseMissionProg(202, 1), 
        this.videoSData && NetworkManager_1.default.confirmVideoAdInfo(this.videoSData.rewardItem, this.videoSData.rewardAmount, function() {
          console.warn("\u5df2\u9a8c\u8bc1\u5e7f\u544a\uff1a", v.videoSData.rewardItem);
        })), this.cb(t), this.hasCalledCB = true);
      },
      createRewardAd: function(t) {
        var c = this, e = wx.createRewardedVideoAd({
          adUnitId: cc.pvz.GameConst.AD_UNITS_REWARD[t]
        });
        return e.onLoad(function() {
          console.log("RewardedVideoAd onLoad", t);
        }), e.onError(function(n) {
          console.log("RewardedVideoAd onError", t, n);
        }), e.onClose(function(n) {
          console.log("RewardedVideoAd onClose", t, c.rewardVideoIndex, n, n ? n.isEnded : "");
          n && n.isEnded || void 0 === n ? (c.callRewardAdCallback(true), cc.pvz.TAUtils.trackAdClose(c.rewardVideoIndex, true)) : (c.callRewardAdCallback(false), 
          cc.pvz.TAUtils.trackAdClose(c.rewardVideoIndex, false));
        }), e;
      },
      createPublicRewardAd: function(t) {
        var c = this, e = !p;
        p = wx.createRewardedVideoAd({
          adUnitId: cc.pvz.GameConst.AD_UNITS_REWARD[t]
        });
        e && (p.onLoad(function() {
          console.log("showAdRewardVideo onLoad");
        }), p.onError(function(t) {
          console.log("showAdRewardVideo onError", t);
        }), p.onClose(function(t) {
          console.log("onClose", t, t ? t.isEnded : "");
          t && t.isEnded || void 0 === t ? (c.callRewardAdCallback(true), cc.pvz.TAUtils.trackAdClose(c.rewardVideoIndex, true)) : (c.callRewardAdCallback(false), 
          cc.pvz.TAUtils.trackAdClose(c.rewardVideoIndex, false));
        }));
      },
      initRewardVideo: function() {
        var e = this;
        cc.sys.platform != cc.sys.WECHAT_GAME && cc.sys.platform != cc.sys.BYTEDANCE_GAME || (m = new Array(cc.pvz.GameConst.AD_UNITS_REWARD.length).fill(null), 
        A.forEach(function(t) {
          m[t] = e.createRewardAd(t);
        }), console.log("initRewardVideo ended"));
      },
      willShowWindow: function() {},
      willShowAdRewardVideo: function(n, r) {
        var u = "SubwindowManager", s = require("../lobby/AdTicketWindow").default, f = require("../lobby/SubwindowManager");
        cc.pvz.PlayerData.itemNum(13) > 0 ? s.showAdTicketWindow ? cc.SubwindowManager.showWindow(f.UIStatus.AdTicket, {
          type: n,
          cb: r
        }) : NetworkManager_1.default.checkTicketNum(-1, function() {
          r(true);
        }, function() {
          cc.popupManager.showToast("\u5e7f\u544a\u5238\u9a8c\u8bc1\u5931\u8d25");
        }) : this.showAdRewardVideo(n, r);
      },
      showAdRewardVideoOrTicket: function(n, r) {
        var o = "AdTicketWindow", a = require("../lobby/AdTicketWindow").default;
        cc.pvz.PlayerData.itemNum(13) > 0 ? a.showAdTicketWindow ? cc.popupManager.popup("lobby", "subwindowPre/ADj_tip", o, {
          scale: false,
          showModal: true,
          opacity: 0
        }, n, r) : NetworkManager_1.default.checkTicketNum(-1, function() {
          r(true);
        }, function() {
          r(false);
          cc.popupManager.showToast("\u5e7f\u544a\u5238\u9a8c\u8bc1\u5931\u8d25");
        }) : this.showAdRewardVideo(n, r);
      },
      showAdRewardVideo: function(t, n) {
        console.log("showAdRewardVideo", t);
        var y = this;
        if (y.cb = n, y.rewardVideoIndex = t, y.hasCalledCB = false, cc.pvz.TAUtils.trackAdBtnClick(t), 
        cc.sys.platform == cc.sys.WIN32 || cc.sys.platform == cc.sys.MACOS || cc.sys.platform == cc.sys.DESKTOP_BROWSER) return cc.popupManager.showToast("\u5e7f\u544a"), 
        void this.callRewardAdCallback(true);
        cc.director.pause();
        var C = m[0];
        C || (this.createPublicRewardAd(0), C = p);
        var B = Math.floor(Date.now() / 1e3), M = "" + B + MyRequest_1.default.userInfo.uid + t;
        this.videoSData = {
          userId: "" + MyRequest_1.default.userInfo.uid,
          rewardItem: M,
          rewardAmount: B,
          customData: MyRequest_1.default.appName
        };
        C.setServerSideVerificationData && C.setServerSideVerificationData(this.videoSData);
        C.show()["catch"](function() {
          console.log("\u81ea\u52a8\u52a0\u8f7d\u5931\u8d25", t);
          C.load().then(function() {
            C.show();
          })["catch"](function() {
            cc.popupManager.showToast("\u6682\u65e0\u5e7f\u544a\u53ef\u770b");
            cc.pvz.TAUtils.trackAdEnd(y.rewardVideoIndex, -1);
            y.callRewardAdCallback(false);
          });
        });
      }
    };
    cc.pvz || (cc.pvz = {});
    cc.pvz.AdUtils = S;
    module.exports.exports = S;
    module.exports.default = module.exports;
    cc._RF.pop();
  }, {
    "../lobby/AdTicketWindow": "AdTicketWindow",
    "../lobby/SubwindowManager": "SubwindowManager",
    "./MyRequest": "MyRequest",
    "./NetworkManager": "NetworkManager"
  } ],
  AlertWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8b86a/594xP/6Td179kATza", "AlertWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const r = require("./SubwindowManager");
    var c;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AlertWindow = class AlertWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.content = null;
      }
      init() {}
      show(c) {
        void 0 === c && (c = {
          text: "",
          onOk: function() {}
        });
        this.onOk = c.onOk;
        this.content.string = c.text;
      }
      onOkClick() {
        this.hide();
        this.onOk();
      }
      hide() {
        cc.SubwindowManager.hideWindow(r.UIStatus.Alert);
      }
      start() {}
    };
    __decorate([ property(cc.Label) ], AlertWindow.prototype, "content", void 0);
    AlertWindow = __decorate([ ccclass ], AlertWindow);
    exports.default = AlertWindow;
    cc._RF.pop();
  }, {
    "./SubwindowManager": "SubwindowManager"
  } ],
  ArchieveWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b783955GGZL2pkYNUJmKioO", "ArchieveWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const s = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const MissionPanel_1 = require("./MissionPanel");
    const Tool_1 = require("./Tool");
    const r = require("./SubwindowManager");
    var f;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var i = "score";
    let ArchieveWindow = class ArchieveWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.titleStr = null;
        this.mpContainer = null;
        this.mpPre = null;
        this.mainSV = null;
        this.btns = null;
      }
      init() {
        for (var e in s.Datas.TaskArchieve) this.archieveTypes[s.Datas.TaskArchieve[e].kind] = 1;
      }
      show() {
        cc.pvz.PlayerData.resetDailyData();
        this.doChangePageTo(1);
        RedPointManager_1.default.check("DailyTask");
        RedPointManager_1.default.check("ArchieveTask");
      }
      refreshAsDaily() {
        var c, u = 1e3;
        for (var I in this.titleStr.string = "\u6bcf\u65e5\u4efb\u52a1", c = [], s.Datas.TaskDaily) {
          var k, C, M, P;
          if (C = {
            id: parseInt(I),
            score: 0
          }, !(k = s.Datas.TaskDaily[I]).pass) {
            P = [ cc.player.dailyInfo.prog[k.kind] ? cc.player.dailyInfo.prog[k.kind] : 0, k.need ];
            M = 1 === cc.player.dailyInfo.get[C.id - 1];
            C.score = M ? 1e4 - C.id : u + C.id + (P[0] >= P[1] ? -u : 1);
            c.push(C);
          }
        }
        for (c.sort(function(c, t) {
          return c.score - t.score;
        }), I = 0; I < c.length; I++) Tool_1.default.getPrefab(this.mpContainer, this.mpPre, "" + (I + 1)).getComponent(MissionPanel_1.default).initAsDaily(c[I].id);
        this.mainSV.stopAutoScroll();
        this.mainSV.scrollToTop();
      }
      refreshAsArchieve() {
        var c, f = 1e3;
        for (var I in this.titleStr.string = "\u6210\u5c31\u4efb\u52a1", c = [], this.archieveTypes) {
          var k, C, M, P, x;
          if (C = {
            id: parseInt(I),
            score: 0
          }, P = cc.player.archieveGet[C.id] ? cc.player.archieveGet[C.id] : 0, M = false, 
          (k = s.Datas.TaskArchieve[f * C.id + P + 1]) || (k = s.Datas.TaskArchieve[f * C.id + P], 
          M = true), !k.pass) {
            x = [ cc.player.archieveProg[C.id] ? cc.player.archieveProg[C.id] : 0, k.need ];
            C.score = M ? 1e8 - C.id : 1e7 + C.id + (x[0] >= x[1] ? -1e6 : 1);
            c.push(C);
          }
        }
        for (c.sort(function(c, t) {
          return c.score - t.score;
        }), I = 0; I < c.length; I++) Tool_1.default.getPrefab(this.mpContainer, this.mpPre, "" + (I + 1)).getComponent(MissionPanel_1.default).initAsArchieve(c[I].id);
        this.mainSV.stopAutoScroll();
        this.mainSV.scrollToTop();
      }
      getAllDailyBonus() {
        var c, t;
        for (var I in c = {}, s.Datas.TaskDaily) {
          var k, C;
          C = parseInt(I);
          void 0 === cc.player.dailyInfo.get[C - 1] && (cc.player.dailyInfo.get[C - 1] = 0);
          k = s.Datas.TaskDaily[I];
          cc.player.dailyInfo.prog[k.kind] >= k.need && 1 !== cc.player.dailyInfo.get[C - 1] && (cc.player.dailyInfo.get[C - 1] = 1, 
          c[k.rwd[1]] = (c[k.rwd[1]] ? c[k.rwd[1]] : 0) + k.rwd[2]);
        }
        for (var I in t = [], c) {
          t.push(1);
          t.push(parseInt(I));
          t.push(c[I]);
          cc.pvz.PlayerData.getRewardBonus(1, parseInt(I), c[I]);
        }
        for (cc.player.dailyInfo.lastUpdateTime = Math.floor(Date.now() / 1e3), I = 0; I < t.length; I += 3) cc.MainUI.showBonus(cc.find("Canvas"), t[I + 1], t[I + 2]);
        cc.pvz.PlayerData.saveData();
        RedPointManager_1.default.check("DailyTask");
        this.refreshAsDaily();
      }
      getAllArchieveBonus() {
        var c, t, a = 1e3;
        for (var I in c = {}, cc.player.archieveProg) for (var k = parseInt(I), C = s.Datas.TaskArchieve[a * k + (cc.player.archieveGet[I] ? cc.player.archieveGet[I] : 0) + 1]; C && cc.player.archieveProg[I] >= C.need; ) {
          c[C.rwd[1]] = (c[C.rwd[1]] ? c[C.rwd[1]] : 0) + C.rwd[2];
          cc.player.archieveGet[I] = C.id % a;
          C = s.Datas.TaskArchieve[C.id + 1];
        }
        for (var I in t = [], c) {
          t.push(1);
          t.push(parseInt(I));
          t.push(c[I]);
          cc.pvz.PlayerData.getRewardBonus(1, parseInt(I), c[I]);
        }
        for (I = 0; I < t.length; I += 3) cc.MainUI.showBonus(cc.find("Canvas"), t[I + 1], t[I + 2]);
        RedPointManager_1.default.check("ArchieveTask");
        cc.pvz.PlayerData.saveData();
        this.refreshAsArchieve();
      }
      doChangePageTo(c) {
        void 0 === c && (c = 0);
        this.page = c;
        this.mpContainer.children.map(function(c) {
          return c.active = false;
        });
        this.btns[0].active = 2 === this.page;
        this.btns[1].active = 1 === this.page;
        1 === c ? this.refreshAsDaily() : this.refreshAsArchieve();
      }
      changePageTo(_c, t) {
        var i;
        i = parseInt(t);
        this.doChangePageTo(i);
      }
      refreshPage() {}
      hide() {
        cc.SubwindowManager.hideWindow(r.UIStatus.Archieve);
      }
      start() {}
    };
    __decorate([ property(cc.Label) ], ArchieveWindow.prototype, "titleStr", void 0);
    __decorate([ property(cc.Node) ], ArchieveWindow.prototype, "mpContainer", void 0);
    __decorate([ property(cc.Prefab) ], ArchieveWindow.prototype, "mpPre", void 0);
    __decorate([ property(cc.ScrollView) ], ArchieveWindow.prototype, "mainSV", void 0);
    __decorate([ property(cc.Node) ], ArchieveWindow.prototype, "btns", void 0);
    ArchieveWindow = __decorate([ ccclass ], ArchieveWindow);
    exports.default = ArchieveWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./MissionPanel": "MissionPanel",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  AuthWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e01f2OaBZdCE6d1bCcskDMY", "AuthWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MyRequest_1 = require("../main/MyRequest");
    const WXAuthBtn_1 = require("./WXAuthBtn");
    const r = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var n = "active";
    let AuthWindow = class AuthWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.haveBonus = null;
        this.uidStr = null;
        this.isGet = null;
        this.btnHandle = null;
      }
      init() {
        var c;
        c = this;
        WXAuthBtn_1.default.init(this.btnHandle);
        WXAuthBtn_1.default.authCb = function() {
          var u = 100;
          console.log("Auth cb!");
          cc.player.isAuth || (cc.player.isAuth = 1, c.haveBonus.active = false, c.isGet.map(function(t) {
            return t.active = !c.haveBonus.active;
          }), cc.pvz.PlayerData.itemNum(3, u), cc.SubwindowManager.showWindow(r.UIStatus.GetItem, {
            items: [ 1, 3, u ],
            showFlyTo: 1
          }), cc.MainUI.refreshUserInfo(), cc.pvz.PlayerData.saveData());
        };
      }
      show() {
        var c;
        c = this;
        this.haveBonus.active = 0 === MyRequest_1.default.userInfo.avatar.length;
        this.isGet.map(function(t) {
          return t.active = !c.haveBonus.active;
        });
        this.uidStr.string = MyRequest_1.default.userInfo.uid < 1e6 ? "\u672a\u767b\u5f55" : "" + MyRequest_1.default.userInfo.uid;
        WXAuthBtn_1.default.wxButton && WXAuthBtn_1.default.wxButton.show();
      }
      hide() {
        WXAuthBtn_1.default.wxButton && WXAuthBtn_1.default.wxButton.hide();
        cc.SubwindowManager.hideWindow(r.UIStatus.Auth);
      }
      start() {}
    };
    __decorate([ property(cc.Node) ], AuthWindow.prototype, "haveBonus", void 0);
    __decorate([ property(cc.Label) ], AuthWindow.prototype, "uidStr", void 0);
    __decorate([ property(cc.Node) ], AuthWindow.prototype, "isGet", void 0);
    __decorate([ property(cc.Node) ], AuthWindow.prototype, "btnHandle", void 0);
    AuthWindow = __decorate([ ccclass ], AuthWindow);
    exports.default = AuthWindow;
    cc._RF.pop();
  }, {
    "../main/MyRequest": "MyRequest",
    "./SubwindowManager": "SubwindowManager",
    "./WXAuthBtn": "WXAuthBtn"
  } ],
  AutoScale: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b417c+7JH5G7K3duq0qQ0vW", "AutoScale");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var s, f;
    const {ccclass: ccclass} = cc._decorator;
    let AutoScale = class AutoScale extends cc.Component {
      onLoad() {
        this.initBy(this.usingInitSize ? this.w : this.node.width, this.usingInitSize ? this.h : this.node.height);
      }
      setNodeSize(t, n) {
        this.usingInitSize = true;
        this.w = t;
        this.h = n;
      }
      initBy(t, n) {
        var u = Math.min(cc.view.getCanvasSize().width / t, cc.view.getCanvasSize().height / n), s = t * u, f = n * u;
        this.node.scale = Math.max(cc.view.getCanvasSize().width / s, cc.view.getCanvasSize().height / f);
      }
    };
    AutoScale = __decorate([ ccclass ], AutoScale);
    exports.default = AutoScale;
    cc._RF.pop();
  }, {} ],
  BpChange: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8f8dkclJ9DKahm4wUXBter", "BpChange");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Tool_1 = require("./Tool");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let BpChange = class BpChange extends cc.Component {
      constructor() {
        super(...arguments);
        this.mainAnim = null;
        this.pn = null;
        this.strs = null;
      }
      init() {}
      show(c, t) {
        c !== t && (this.node.active = true, this.strs[0].string = "" + Tool_1.default.formatNum2(t), 
        t > c ? (this.pn[0].active = true, this.pn[1].active = false, this.strs[1].string = "+" + Tool_1.default.formatNum2(t - c)) : (this.pn[0].active = false, 
        this.pn[1].active = true, this.strs[2].string = "-" + Tool_1.default.formatNum2(Math.abs(t - c))), 
        this.mainAnim.play(this.mainAnim.getClips()[0].name));
      }
      start() {
        var c;
        c = this;
        this.node.active = false;
        this.mainAnim.on("finished", function() {
          c.node.active = false;
        });
      }
    };
    __decorate([ property(cc.Animation) ], BpChange.prototype, "mainAnim", void 0);
    __decorate([ property(cc.Node) ], BpChange.prototype, "pn", void 0);
    __decorate([ property(cc.Label) ], BpChange.prototype, "strs", void 0);
    BpChange = __decorate([ ccclass ], BpChange);
    exports.default = BpChange;
    cc._RF.pop();
  }, {
    "./Tool": "Tool"
  } ],
  Bullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0996ojEKJIwLLMf5QPw5x6", "Bullet");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameComponent_1 = require("./GameComponent");
    var d = "x";
    var f = "Normal: \u666e\u901a\nPenetrating\u7a7f\u900f\nBouncing\u5f39\u5c04\nScatter\u6563\u5c04";
    var v = "\u5b50\u5f39\u81f4\u6b7b\u540e\u7684\u6b7b\u4ea1\u52a8\u753b\u7c7b\u578b\n 0\u6b63\u5e38\n 1\u7535\n 2\u706b\n";
    var B = "\u52fe\u9009\u540e\u72ec\u5360\uff0c\u540c\u65f6\u53ea\u64ad\u653e\u4e00\u4e2a";
    var S = cc.Enum({
      Normal: 0,
      Penetrating: 1,
      Bouncing: 2,
      Scatter: 3
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Bullet = class Bullet extends GameComponent_1.default {
      constructor() {
        super(...arguments);
        this.type = S.Normal;
        this.fixedRotation = false;
        this.speed = 400;
        this.life = 5;
        this.eventTimes = 1;
        this.spine = null;
        this.collider = null;
        this.subBulletAttP = 0;
        this.opSound = null;
        this.opSoundExclusive = false;
        this.hitSounds = [];
        this.hitSoundExclusive = false;
        this.hitEffectAni = "";
        this.hitEffectAngle = false;
        this.dieType = 0;
      }
      onLoad() {
        this.spine && (this.defaultSpineAni = this.spine.animation, this.defaultSpineLoop = this.spine.loop);
      }
      initBy(t, i, c, s) {
        this.scene = t;
        this.a = i;
        this.isNear = c;
        this.buffId = 0;
        this.movDelta = cc.v2(this.speed * Math.cos(s), this.speed * Math.sin(s));
        this.spine && this.spine.setAnimation(0, this.defaultSpineAni, this.defaultSpineLoop);
        this.collider && (this.collider.enabled = true);
        this.remainTimes = this.eventTimes;
        this.hitCounter = 0;
        this.lifeTime = 0;
        this.poisonRate = 0;
      }
      onLifeEnd() {
        this.collider && (this.collider.enabled = false);
        this.scene.delBullet(this);
      }
      update2(t) {
        this.lifeTime += t;
        this.lifeTime >= this.life ? this.onLifeEnd() : this.movDelta && (this.node.position = cc.v2(this.node[d] + this.movDelta[d] * t, this.node.y + this.movDelta.y * t));
      }
      onLifeEnd2() {
        this.collider && (this.collider.enabled = false);
        this.scene.delBullet(this);
      }
      onHitWith() {
        if (this.hitCounter++, this.type != S.Scatter) {
          if (this.remainTimes--, this.remainTimes <= 0 && this.onLifeEnd2(), this.hitEffectAni && this.scene.showHitEffect(this.node.position, this.hitEffectAni, null, null, this.hitEffectAngle ? this.node.angle : 0), 
          this.hitSounds && this.hitSounds.length > 0) {
            var u = cc.pvz.utils.randomInArr(this.hitSounds);
            cc.butler.playEffect(u, this.hitSoundExclusive);
          }
        } else {
          if (this.hitCounter > 1) return;
          this.onLifeEnd2();
        }
      }
    };
    __decorate([ property({
      type: S,
      tooltip: f
    }) ], Bullet.prototype, "type", void 0);
    __decorate([ property ], Bullet.prototype, "fixedRotation", void 0);
    __decorate([ property ], Bullet.prototype, "speed", void 0);
    __decorate([ property ], Bullet.prototype, "life", void 0);
    __decorate([ property({
      tooltip: "\u653b\u51fb\u51e0\u6b21\u76ee\u6807"
    }) ], Bullet.prototype, "eventTimes", void 0);
    __decorate([ property(sp.Skeleton) ], Bullet.prototype, "spine", void 0);
    __decorate([ property(cc.Collider) ], Bullet.prototype, "collider", void 0);
    __decorate([ property({
      tooltip: "\u5b50\u5b50\u5f39\u7684\u653b\u51fb\u529b\u52a0\u6210",
      visible: false
    }) ], Bullet.prototype, "subBulletAttP", void 0);
    __decorate([ property(cc.AudioClip) ], Bullet.prototype, "opSound", void 0);
    __decorate([ property({
      tooltip: B
    }) ], Bullet.prototype, "opSoundExclusive", void 0);
    __decorate([ property({
      type: [ cc.AudioClip ]
    }) ], Bullet.prototype, "hitSounds", void 0);
    __decorate([ property({
      tooltip: B
    }) ], Bullet.prototype, "hitSoundExclusive", void 0);
    __decorate([ property({
      tooltip: "\u88ab\u51fb\u7279\u6548 \u52a8\u753b\u540d\u79f0"
    }) ], Bullet.prototype, "hitEffectAni", void 0);
    __decorate([ property({
      tooltip: "\u88ab\u51fb\u7279\u6548\u662f\u5426\u8ddf\u968f\u5b50\u5f39\u89d2\u5ea6"
    }) ], Bullet.prototype, "hitEffectAngle", void 0);
    __decorate([ property({
      tooltip: v
    }) ], Bullet.prototype, "dieType", void 0);
    Bullet = __decorate([ ccclass ], Bullet);
    exports.default = Bullet;
    cc._RF.pop();
  }, {
    "./GameComponent": "GameComponent"
  } ],
  Butler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2ea01mWfhFUqhZWXpl3KFV", "Butler");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    if (!cc.pvz) {
      var _pvzHandler = {
        get: function(t, p) {
          if (p === Symbol.toPrimitive || "valueOf" === p || "toString" === p) return function() {
            return "";
          };
          if ("symbol" === typeof p) return;
          if (p in t) return t[p];
          return new Proxy(function() {}, _pvzHandler);
        },
        apply: function() {
          return new Proxy(function() {}, _pvzHandler);
        },
        set: function(t, p, v) {
          t[p] = v;
          return true;
        }
      };
      cc.pvz = new Proxy({}, _pvzHandler);
    }
    const PrefabInfo_1 = require("./PrefabInfo");
    var S, y, C, B, M, b, E, I, T, k, D, R, N, _, L, P, a;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Butler = class Butler extends cc.Component {
      constructor() {
        super(...arguments);
        this.loadingBar = null;
        this.loadingSpine = null;
        this.cutRoot = null;
        this.cutSpine = null;
        this.clickPrefab = null;
      }
      onLoad() {
        cc.butler = this;
        this.cutRoot && (this.cutRoot.active = false);
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        this.node.x = this.node.width / 2;
        this.node.y = this.node.height / 2;
        cc.pvz.time = 0;
        cc.pvz.timeScaleLevel = 0;
        cc.pvz.timeScale = 1;
        cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, this.beforeDirectorUpdate, this);
        this.listenTouch();
        this.hackSpine();
        cc.sys.platform != cc.sys.BYTEDANCE_GAME && cc.sys.platform != cc.sys.WECHAT_GAME || this.polyfillSafeArea();
      }
      listenTouch() {
        var e = this, i = cc.EventListener.create({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: false,
          owner: this,
          onTouchBegan: function(t) {
            if (e.clickPrefab) {
              var clickNode = e.clickPrefab.addNodeToByWorldPos(cc.Canvas.instance.node, t.getLocation());
              clickNode.zIndex = cc.macro.MAX_ZINDEX;
              var clickSpine = clickNode.getComponent(sp.Skeleton);
              if (clickSpine) {
                clickSpine.setCompleteListener(function() {
                  clickNode.parent = null;
                });
                clickSpine.setAnimation(0, "click", false);
              }
            }
            cc.butler.playEffectAsync("music", "click");
          }
        });
        cc.internal.eventManager.addListener(i, -1);
      }
      hackSpine() {
        var _orig_update = sp.Skeleton.prototype.update;
        sp.Skeleton.prototype.update = function(dt) {
          if (!this.isValid || !this.node || !this.node.isValid) return;
          if (!this.paused) {
            this.____game && (dt *= cc.pvz.timeScale);
            _orig_update.call(this, dt);
          }
        };
        var _orig_lateUpdate = cc.MotionStreak.prototype.lateUpdate;
        cc.MotionStreak.prototype.lateUpdate = function(dt) {
          if (!this.isValid || !this.node || !this.node.isValid) return;
          var r = dt * cc.pvz.timeScale;
          _orig_lateUpdate.call(this, r);
        };
      }
      polyfillSafeArea() {
        var n = window.__globalAdapter;
        n.getSafeArea = function() {
          var t, S = wx.getSystemInfoSync(), y = wx.getWindowInfo ? wx.getWindowInfo() : S, C = wx.getDeviceInfo ? wx.getDeviceInfo() : S, B = y.windowWidth, M = y.windowHeight, b = y.safeArea || {
            top: 0,
            bottom: M,
            height: M,
            left: 0,
            right: B,
            width: B
          }, E = b.top, I = b.left, T = b.bottom, k = b.right, D = b.width, R = b.height;
          if ("ios" === C.platform && !n.isDevTool && ((t = wx.getSystemSetting ? wx.getSystemSetting() : S).deviceOrientation ? "landscape" === t.deviceOrientation : y.screenWidth > y.screenHeight)) {
            var x = E, N = I, _ = T, L = R, P = B - _;
            E = M - k;
            I = x;
            T = M - N - P;
            k = _;
            R = D - P;
            D = L;
          }
          return {
            top: E,
            left: I,
            bottom: T,
            right: k,
            width: D,
            height: R
          };
        };
      }
      beforeDirectorUpdate() {
        this.checkToHandleGameHide && this.handleGameHide();
        var c = 1e3 * cc.director.getDeltaTime();
        cc.pvz.time += c * cc.director.getScheduler().getTimeScale();
      }
      start() {
        var h = this;
        cc.game.addPersistRootNode(this.node);
        cc.sys.platform == cc.sys.WECHAT_GAME ? (wx.onWindowStateChange && wx.onWindowStateChange(function(t) {
          var e = "minimize", s = "normalize";
          e == t.state ? (console.log(e), cc.game.emit(cc.game.EVENT_HIDE)) : s == t.state && (console.log(s), 
          cc.game.emit(cc.game.EVENT_SHOW));
        }), wx.onHide(function() {
          console.log("wx.onHide");
          h.handleGameHide();
        }), wx.onShow(function() {
          console.log("wx.onShow");
          h.handleGameShow();
        })) : cc.sys.platform == cc.sys.BYTEDANCE_GAME ? (cc.fromSideBar = false, tt.onHide(function() {
          console.log("tt.onHide");
          h.handleGameHide();
        }), tt.onShow(function(t) {
          var c = "fromSideBar";
          console.log("tt.onShow", t);
          h.handleGameShow();
          "sidebar_card" == t.location && (cc.fromSideBar = true, cc.butler.node.emit(c));
        })) : (cc.game.on(cc.game.EVENT_HIDE, function() {
          console.log("cc.game.EVENT_HIDE, frame:", cc.director.getTotalFrames());
          h.handleGameHide();
        }), cc.game.on(cc.game.EVENT_SHOW, function() {
          console.log("cc.game.EVENT_SHOW, frame:", cc.director.getTotalFrames());
          h.handleGameShow();
        }));
        cc.pvz.TAUtils.onCheckGameVersion();
      }
      handleGameHide() {
        console.log("handleGameHide");
        this.pauseMusic();
        cc.audioEngine.stopAllEffects();
      }
      handleGameShow() {
        this.resumeMusic();
      }
      playMusic(t) {
        this.music = t;
        cc.player && (0 == cc.player.musicVolume || cc.player.isMusicMute) || (this.playingMusic = t, 
        t && (this.musicId = cc.audioEngine.playMusic(t, true), cc.audioEngine.setVolume(this.musicId, cc.player.musicVolume)));
      }
      playMusicAsync(t, n) {
        var c = this;
        cc.pvz.utils.useBundleAsset(t, n, cc.AudioClip, function(t) {
          c.playMusic(t);
        });
      }
      updateMusicVolume() {
        this.musicId && cc.audioEngine.setVolume(this.musicId, cc.player.musicVolume);
      }
      pauseMusic() {
        cc.audioEngine.pauseMusic();
      }
      resumeMusic() {
        !cc.player || 0 != cc.player.musicVolume && !cc.player.isMusicMute ? this.music != this.playingMusic ? (console.log("resumeMusic play new"), 
        this.playMusic(this.music)) : (console.log("resumeMusic resume old"), cc.audioEngine.resumeMusic()) : console.log("resumeMusic return");
      }
      stopMusic() {
        cc.audioEngine.stopMusic();
      }
      _playEffect(t, n) {
        void 0 === n && (n = false);
        var e = cc.audioEngine.playEffect(t, n);
        return cc.audioEngine.setVolume(e, cc.player.soundVolume), e;
      }
      playEffect(t, n, r) {
        var u = this;
        if (void 0 === n && (n = false), void 0 === r && (r = false), !t) return -1;
        if (cc.player && (0 == cc.player.soundVolume || cc.player.isSoundMute)) return -1;
        if (r) {
          this.exclusiveMap || (this.exclusiveMap = {});
          var s = t._uuid;
          if (this.exclusiveMap[s]) return -1;
          var f = this._playEffect(t, n);
          return -1 == f ? this.exclusiveMap[s] = false : (this.exclusiveMap[s] = true, cc.audioEngine.setFinishCallback(f, function() {
            u.exclusiveMap[s] = false;
          })), -1;
        }
        return this._playEffect(t, n);
      }
      resumeEffect(t) {
        if (cc.player && 0 == cc.player.soundVolume) return -1;
        cc.audioEngine.resumeEffect(t);
      }
      playEffectAsync(t, n, r) {
        var o = this;
        void 0 === r && (r = false);
        cc.player && (0 == cc.player.soundVolume || cc.player.isSoundMute) || cc.pvz.utils.useBundleAsset(t, n, cc.AudioClip, function(t) {
          o.playEffect(t, false, r);
        });
      }
      playEffectAsync2(t) {
        if (!cc.player || 0 != cc.player.soundVolume && !cc.player.isSoundMute) {
          var i = t.indexOf(",");
          this.playEffectAsync(t.substring(0, i), t.substring(i + 1));
        }
      }
      setMusicSwitch(t) {
        cc.player.isMusicMute != t && this.node.emit("music-switch", t);
        this.setMusicMute(t);
        cc.player.isMusicMute ? this.pauseMusic() : this.resumeMusic();
      }
      setSoundSwitch(t) {
        this.setSoundMute(t);
        cc.player.isSoundMute && cc.audioEngine.stopAllEffects();
      }
      saveData() {
        cc.pvz.PlayerData.saveData();
      }
      setMusicMute(t) {
        cc.player.isMusicMute = t;
        cc.pvz.PlayerData.onDataChanged();
      }
      setSoundMute(t) {
        cc.player.isSoundMute = t;
        cc.pvz.PlayerData.onDataChanged();
      }
      onToggleMusic(t) {
        console.log("onToggleMusic", t.isChecked);
        this.setMusicSwitch(!t.isChecked);
        this.setSoundSwitch(!t.isChecked);
      }
      loadBundles(t, n, r) {
        var u = this;
        this.loadingBar && (this.loadingBar.progress = 0);
        this.loadedBundle = 0;
        cc.assetManager.loadBundle(t[0], null, function c(e, i) {
          e ? console.log("load subpackage  fail:", e) : (console.log("load bundle " + i.name + " successfully."), 
          u.loadedBundle++, u.loadedBundle == t.length ? r && r() : cc.assetManager.loadBundle(t[u.loadedBundle], null, c), 
          u.loadingBar && cc.tween(u.loadingBar).to(.2, {
            progress: (u.loadedBundle + 1) / n
          }).start());
        });
        this.loadingBar && cc.tween(this.loadingBar).to(.2, {
          progress: (this.loadedBundle + 1) / n
        }).start();
      }
      loadScene(t) {
        console.log("[Butler] loadScene:", t);
        var e = this, i = false, o = null, a = function() {
          if (!i || !o) return;
          var spineOk = e.cutSpine && e.cutSpine.skeletonData && e.cutSpine.skeletonData.skeletonJson && e.cutSpine.skeletonData.skeletonJson.animations && Object.keys(e.cutSpine.skeletonData.skeletonJson.animations).length > 0;
          if (spineOk) {
            e.cutSpine.setCompleteListener(function() {
              e.cutRoot.active = false;
              e.node.emit("cutSceneEnded");
            });
            e.cutSpine.setAnimation(0, "act_out", false);
          } else {
            e.cutRoot && (e.cutRoot.active = false);
            e.node.emit("cutSceneEnded");
          }
          cc.director.runSceneImmediate(o);
        };
        var doLoadScene = function() {
          i = true;
          a();
          var bundle = cc.assetManager.bundles.find(function(n) {
            return n.getSceneInfo(t);
          });
          if (!bundle) {
            console.error("[Butler] \u627e\u4e0d\u5230\u5305\u542b\u573a\u666f " + t + " \u7684 bundle\uff0c\u964d\u7ea7 cc.director.loadScene");
            cc.director.loadScene(t);
            return;
          }
          console.log("[Butler] \u627e\u5230 bundle\uff0c\u5f00\u59cb\u52a0\u8f7d\u573a\u666f:", t);
          bundle.loadScene(t, function(_t, n) {
            if (_t) {
              console.error("[Butler] \u52a0\u8f7d\u573a\u666f\u5931\u8d25:", _t);
              return;
            }
            console.log("[Butler] \u573a\u666f\u52a0\u8f7d\u5b8c\u6210:", t);
            o = n;
            a();
          });
        };
        var spineReady = this.cutSpine && this.cutSpine.skeletonData && this.cutSpine.skeletonData.skeletonJson && this.cutSpine.skeletonData.skeletonJson.animations && Object.keys(this.cutSpine.skeletonData.skeletonJson.animations).length > 0;
        if (spineReady) {
          this.cutRoot.active = true;
          this.cutSpine.setCompleteListener(function() {
            doLoadScene();
          });
          this.cutSpine.setAnimation(0, "act_in", false);
        } else {
          console.log("[Butler] cutSpine \u4e0d\u53ef\u7528\uff0c\u8df3\u8fc7\u8fc7\u573a\u52a8\u753b\u76f4\u63a5\u52a0\u8f7d\u573a\u666f");
          doLoadScene();
        }
      }
    };
    __decorate([ property(cc.ProgressBar) ], Butler.prototype, "loadingBar", void 0);
    __decorate([ property(sp.Skeleton) ], Butler.prototype, "loadingSpine", void 0);
    __decorate([ property(cc.Node) ], Butler.prototype, "cutRoot", void 0);
    __decorate([ property(sp.Skeleton) ], Butler.prototype, "cutSpine", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Butler.prototype, "clickPrefab", void 0);
    Butler = __decorate([ ccclass ], Butler);
    exports.default = Butler;
    cc._RF.pop();
  }, {
    "./PrefabInfo": "PrefabInfo"
  } ],
  CDKeyWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "76dc1dlG1hIxrFiq99NdIT7", "CDKeyWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const NetworkManager_1 = require("../main/NetworkManager");
    const r = require("./ConfigCtrl");
    const e = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var g = 0;
    let CDKeyWindow = class CDKeyWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.editBoxHandle = null;
      }
      init() {}
      show() {
        this.editBoxHandle.string = "";
      }
      submit() {
        for (var i = this, n = this.editBoxHandle.string.toLowerCase(), s = "", o = 0; o < n.length; o++) " " !== n[o] && (s += n[o]);
        0 !== "".length && NetworkManager_1.default.submitBonusCode(s, function(c) {
          var t;
          if (cc.player.bonusCodeUsing || (cc.player.bonusCodeUsing = []), t = c[0], 1 !== cc.player.bonusCodeUsing[t]) {
            var w;
            if (t >= 0) {
              for (var g = 0; g < t; g++) cc.player.bonusCodeUsing[g] || (cc.player.bonusCodeUsing[g] = 0);
              cc.player.bonusCodeUsing[t] = 1;
            }
            for (w = [], g = 1; g < c.length; g++) w.push(c[g]);
            for (g = 0; g < w.length; g += 3) cc.pvz.PlayerData.getRewardBonus(w[g], w[g + 1], w[g + 2]);
            cc.SubwindowManager.showWindow(e.UIStatus.GetItem, {
              items: w
            });
            i.editBoxHandle.string = "";
            cc.pvz.PlayerData.saveData();
          } else cc.popupManager.showToast(r.Datas.Tips[13].v);
        });
      }
      hide() {
        cc.SubwindowManager.hideWindow(e.UIStatus.CDKey);
      }
      start() {}
    };
    __decorate([ property(cc.EditBox) ], CDKeyWindow.prototype, "editBoxHandle", void 0);
    CDKeyWindow = __decorate([ ccclass ], CDKeyWindow);
    exports.default = CDKeyWindow;
    cc._RF.pop();
  }, {
    "../main/NetworkManager": "NetworkManager",
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager"
  } ],
  CheckGuideProg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dddb2aSsY1MsZjGb7iDhKNG", "CheckGuideProg");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass} = cc._decorator;
    let CheckGuideProg = class CheckGuideProg extends cc.Component {
      onClickEnd() {
        for (var i = 0; i < this.guideId.length; i++) console.log("Here:", this.guideId[i]);
      }
      start() {}
    };
    CheckGuideProg = __decorate([ ccclass ], CheckGuideProg);
    exports.default = CheckGuideProg;
    cc._RF.pop();
  }, {} ],
  ClearDataWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e08f0DQP7VNPLn3VsNSkWyC", "ClearDataWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const NetworkManager_1 = require("../main/NetworkManager");
    const a = require("./ConfigCtrl");
    const o = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ClearDataWindow = class ClearDataWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.confirmText = null;
      }
      init() {}
      show() {
        this.confirmText.string = "";
      }
      hide() {
        cc.SubwindowManager.hideWindow(o.UIStatus.ClearData);
      }
      do() {
        if ("\u5220\u9664\u5b58\u6863" !== this.confirmText.string) return cc.popupManager.showToast(a.Datas.Tips[23].v), 
        void (this.confirmText.string = "");
        NetworkManager_1.default.clearDataSelf(function(c) {
          if (c.lastTime) cc.popupManager.showToast(a.Datas.Tips[22].v); else if (window["wx"]) window.wx.showModal({
            title: "\u63d0\u793a",
            content: "\u5df2\u91cd\u7f6e\u6e38\u620f\u5b58\u6863\u8fdb\u5ea6\uff0c\u8bf7\u91cd\u65b0\u8fdb\u5165\u6e38\u620f",
            showCancel: false,
            success: function(c) {
              c.confirm && window.wx.exitMiniProgram();
            }
          }); else {
            alert("\u5df2\u91cd\u7f6e\u6e38\u620f\u5b58\u6863\u8fdb\u5ea6\uff0c\u8bf7\u91cd\u65b0\u8fdb\u5165\u6e38\u620f");
            location.reload();
          }
        });
      }
      start() {}
    };
    __decorate([ property(cc.EditBox) ], ClearDataWindow.prototype, "confirmText", void 0);
    ClearDataWindow = __decorate([ ccclass ], ClearDataWindow);
    exports.default = ClearDataWindow;
    cc._RF.pop();
  }, {
    "../main/NetworkManager": "NetworkManager",
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager"
  } ],
  ColliderProxy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "741ceQCQalF7I4qJREFAbhj", "ColliderProxy");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ColliderProxy = class ColliderProxy extends cc.Component {
      constructor() {
        super(...arguments);
        this.onEnter = null;
        this.onStay = null;
        this.onExit = null;
      }
      onCollisionEnter(t, i) {
        this.onEnter && this.onEnter.emit([ t, i ]);
      }
      onCollisionStay(t, i) {
        this.onStay && this.onStay.emit([ t, i ]);
      }
      onCollisionExit(t, i) {
        this.onExit && this.onExit.emit([ t, i ]);
      }
    };
    __decorate([ property(cc.Component.EventHandler) ], ColliderProxy.prototype, "onEnter", void 0);
    __decorate([ property(cc.Component.EventHandler) ], ColliderProxy.prototype, "onStay", void 0);
    __decorate([ property(cc.Component.EventHandler) ], ColliderProxy.prototype, "onExit", void 0);
    ColliderProxy = __decorate([ ccclass ], ColliderProxy);
    exports.default = ColliderProxy;
    cc._RF.pop();
  }, {} ],
  ColorAss2D: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "94788h28qVJsa0RC2HeZlRJ", "ColorAss2D");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property, executeInEditMode: executeInEditMode, requireComponent: requireComponent} = cc._decorator;
    let ColorAss2D = class ColorAss2D extends cc.Component {
      constructor() {
        super(...arguments);
        this.colors = null;
      }
      onEnable() {
        cc.director.once(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
      }
      onDisable() {
        cc.director.off(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
        this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR;
      }
      _updateColors() {
        var c, t, i;
        if (!this.colors || !Array.isArray(this.colors) || 0 === this.colors.length) return;
        if ((c = this.getComponent(cc.RenderComponent)) && (t = c._assembler) instanceof cc.Assembler2D && (i = t._renderData.uintVDatas[0])) for (var h = this.node.color, a = t.floatsPerVert, u = 0, v = t.colorOffset, f = i.length; v < f; v += a) {
          var color = this.colors[u++] || h;
          color && void 0 !== color._val && (i[v] = color._val);
        }
      }
    };
    __decorate([ property ], ColorAss2D.prototype, "colors", void 0);
    ColorAss2D = __decorate([ ccclass, executeInEditMode, requireComponent(cc.RenderComponent) ], ColorAss2D);
    exports.default = ColorAss2D;
    cc._RF.pop();
  }, {} ],
  ConfigCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4c2aeKcd1xDNrJNYQqGTBy/", "ConfigCtrl");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.initDatas = exports.Datas = void 0;
    const {ccclass: ccclass} = cc._decorator;
    function arrayToMap(arr) {
      var map = {};
      if (Array.isArray(arr)) for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        item && void 0 !== item.id && (map[item.id] = item);
      }
      return map;
    }
    exports.Datas = {};
    var lobbyJsonMap = {
      Tips: "Tips_9181165e",
      Config: "Config_a07e0e05",
      Skill: "Skill_693f025d",
      LabLv: "IdleBoxLv_e46be74c",
      Equip: "Equip_3c81877c",
      LevelInfo: "LevelInfo_bea76a8e",
      Item: "item_709aff76",
      SkinInfo: "SkinInfo_34711e19",
      Weapon: "WeaponRank_a2370f36",
      SlotGame: "TGame_af480365",
      SkillExp: "SkillExp_5d00e26e",
      GrowRoadUnlockInfo: "SysOpen_da8462da",
      GrowRoad: "GrowRwd_2390da04",
      WeaponStar: "WeaponStar_e2f7bd97",
      TaskArchieve: "TaskAcc_7f265244",
      EquipPro: "EquipCt_d7468879",
      TaskDaily: "TaskDaily_34aaaeda",
      Mail: "mail_748ad20b",
      WeaponExp: "WeaponEXP_9a7a2dff",
      TowerSet: "Plant_0d198bf6",
      Shop: "ShopDaily_2e266a1d",
      LabBox: "IdleBox_05e37d86",
      ADBattleBuffData: "ADBatBuffData_3a6fce3e",
      WeaponRandomPro: "WeaponPerk_5a88b045",
      StageBoxReward: "StageReward_f63d7993",
      PlayerPro3: "LvSliver_7bc5d814",
      PlayerPro4: "LvCritical_481863a7",
      PlayerPro5: "LvCritDMG_ed37ae3e",
      PlayerPro6: "LvLeech_c7144839",
      EquipLv: "EquipLv_d217b5e9",
      TaskMain: "TaskMain_66b168cf",
      TaskDesc: "TaskDesc_dcd63f3b",
      MetaStageInfo: "FB_538b224a",
      TaskAD: "TaskAD_88201082",
      Sign: "Sign_03d9625e",
      EnemyBuff: "MonsterBuff_49fd3a76",
      LabBoxQ: "IdleBoxQuality_e6c9ad45",
      EquipSuit: "EquipCt2_a5b26821",
      ProKey: "HeroAttKey_ab417ad1",
      GoldStage: "TJInfo_88ff729b",
      EquipStage: "MJInfo_f4f6f5de",
      MetaStage1: "FBGold_d869b9a9",
      MetaStage2: "FBDiamond_91927bd8",
      MetaStage3: "FBFormation_4902b489",
      MetaStage4: "FBEnhance_1cf021c6",
      MetaStage5: "FBRandom_7157c636"
    };
    var gameJsonMap = {
      PlayerPro0: "LvATK_faf1ef81"
    };
    function loadJsonFromBundle(bundleName, map, callback) {
      var bundle = cc.assetManager.getBundle(bundleName);
      if (!bundle) {
        console.error("[ConfigCtrl] bundle not found: " + bundleName);
        for (var key in map) exports.Datas[key] = exports.Datas[key] || {};
        callback();
        return;
      }
      var keys = Object.keys(map);
      var remaining = keys.length;
      if (0 === remaining) {
        callback();
        return;
      }
      for (var k = 0; k < keys.length; k++) (function(propName, fileName) {
        var path = "__pack_only__/json/" + fileName;
        bundle.load(path, cc.JsonAsset, function(err, asset) {
          if (err || !asset) {
            console.warn("[ConfigCtrl] load failed: " + bundleName + "/" + path, err);
            exports.Datas[propName] = exports.Datas[propName] || {};
          } else exports.Datas[propName] = arrayToMap(asset.json);
          remaining--;
          remaining <= 0 && callback();
        });
      })(keys[k], map[keys[k]]);
    }
    function initDatas(callback) {
      loadJsonFromBundle("lobby", lobbyJsonMap, function() {
        loadJsonFromBundle("game", gameJsonMap, function() {
          console.log("[ConfigCtrl] all config data loaded, keys:", Object.keys(exports.Datas).length);
          callback();
        });
      });
    }
    exports.initDatas = initDatas;
    let ConfigCtrl = class ConfigCtrl extends cc.Component {};
    ConfigCtrl.isInit = false;
    ConfigCtrl = __decorate([ ccclass ], ConfigCtrl);
    exports.default = ConfigCtrl;
    cc._RF.pop();
  }, {} ],
  ContentAdapter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2ee2c/caHxMG5letS6nY3qY", "ContentAdapter");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var v, l;
    const {ccclass: ccclass} = cc._decorator;
    let ContentAdapter = class ContentAdapter extends cc.Component {
      onLoad() {
        var f = 1, v = cc.find("Canvas").getComponent(cc.Canvas);
        v.fitHeight && v.fitWidth ? f = Math.min(cc.view.getCanvasSize().width / this.node.width, cc.view.getCanvasSize().height / this.node.height) : v.fitWidth ? f = cc.view.getCanvasSize().width / this.node.width : v.height && (f = cc.view.getCanvasSize().height / this.node.height);
        var h = this.node.width * f, l = this.node.height * f;
        this.node.width = this.node.width * (cc.view.getCanvasSize().width / h);
        this.node.height = this.node.height * (cc.view.getCanvasSize().height / l);
      }
    };
    ContentAdapter = __decorate([ ccclass ], ContentAdapter);
    exports.default = ContentAdapter;
    cc._RF.pop();
  }, {} ],
  Coor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac4bbI65+NNv62SdbaNVVP0", "Coor");
    var i = module.exports;
    i.CoordinateUtils = void 0;
    i.CoordinateUtils = function() {};
    module.exports.default = module.exports;
    cc._RF.pop();
  }, {} ],
  CustomSafeArea: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "735bf2BULpLxIi1eXeSapKI", "CustomSafeArea");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _, L, P, W, H;
    var v = cc.Enum({
      WIN: 0,
      PARENT: 1,
      CANVAS: 2
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let CustomSafeArea = class CustomSafeArea extends cc.SafeArea {
      constructor() {
        super(...arguments);
        this.fitTarget = v.WIN;
        this.ensureLeft = true;
        this.ensureRight = true;
        this.ensureTop = true;
        this.ensureBottom = true;
      }
      updateArea() {
        var x = this.getComponent(cc.Widget);
        if (x) {
          x.updateAlignment();
          var N = this.node.position, _ = this.node.getAnchorPoint(), L = 0, P = 0;
          switch (this.fitTarget) {
           case v.WIN:
            L = cc.winSize.width;
            P = cc.winSize.height;
            break;

           case v.PARENT:
            L = this.node.parent.width;
            P = this.node.parent.height;
            break;

           case v.CANVAS:
            L = cc.view.getCanvasSize().width;
            P = cc.view.getCanvasSize().height;
          }
          var F = cc.sys.getSafeAreaRect();
          if (this.ensureLeft) {
            if (x.isAlignLeft = true, cc.sys.platform == cc.sys.WECHAT_GAME) {
              var O = wx.getSystemInfoSync();
              O.safeArea ? x.left = 1600 * O.safeArea.left / O.screenWidth : x.left = 0;
            } else x.left = 0;
            console.log("ensureLeft:", x.left);
          }
          this.ensureRight && (x.isAlignRight = true, x.right = L - F.x - F.width, console.log("ensureRight:", x.right));
          this.ensureTop && (x.isAlignTop = true, x.top = P - F.y - F.height, x.top = Math.max(20, x.top), 
          console.log("ensureTop:", x.top));
          this.ensureBottom && (x.isAlignBottom = true, x.bottom = F.y, console.log("ensureBottom:", x.bottom));
          x.updateAlignment();
          var U = this.node.position, W = _.x - (U.x - N.x) / this.node.width, H = _.y - (U.y - N.y) / this.node.height;
          this.node.setAnchorPoint(W, H);
          console.log("anchorX:", W, "anchorY:", H);
          cc._widgetManager.add(x);
        }
      }
    };
    __decorate([ property(v) ], CustomSafeArea.prototype, "fitTarget", void 0);
    __decorate([ property ], CustomSafeArea.prototype, "ensureLeft", void 0);
    __decorate([ property ], CustomSafeArea.prototype, "ensureRight", void 0);
    __decorate([ property ], CustomSafeArea.prototype, "ensureTop", void 0);
    __decorate([ property ], CustomSafeArea.prototype, "ensureBottom", void 0);
    CustomSafeArea = __decorate([ ccclass ], CustomSafeArea);
    exports.default = CustomSafeArea;
    cc._RF.pop();
  }, {} ],
  DataProbe: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9d6dfzVmcNHeIIN7qQZcYIu", "DataProbe");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const NetworkManager_1 = require("../main/NetworkManager");
    var Q;
    var we = 1;
    we && (Q = "needVerifyItemId");
    we = 0;
    var n;
    var n = function() {
      let i;
      return i = function() {}, i.init = function() {
        [ 2, 3 ].map(function(c) {
          var t;
          t = cc.player.items[c] ? cc.player.items[c] : 3;
          t = Math.floor((t - 3) / 4);
          i.items[c] = t;
        });
      }, i.changeItemNumAndCheck = function(c, t) {
        var i, n, s;
        n = this;
        this.items[c] += t;
        (i = this.items[c]) !== (s = Math.floor((cc.player.items[c] - 3) / 4)) && (console.warn(c + ": \u7406\u8bba\u503c:" + i + ", \u5185\u5b58\u503c:" + s), 
        NetworkManager_1.default.userMayCheat(c, i, s, function() {
          console.warn("\u5df2\u6807\u8bb0");
          n.items[c] = 4 * cc.player.items[c] + 3;
        }));
      }, i.getVerify = function() {
        for (var n = [ 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59 ], e = 10000079, s = 0, o = 0; o < i[Q].length; o++) {
          var r;
          r = i[Q][o];
          s += cc.pvz.PlayerData.itemNum(r) % e * n[o] % e;
        }
        return s % e;
      }, i.getVerifyItems = function() {
        var c;
        for (var r in c = [], this[Q]) c.push(cc.pvz.PlayerData.itemNum(r));
        return c.push(cc.pvz.PlayerData.itemNum(499)), c;
      }, i.items = {
        2: 0,
        3: 0
      }, i[Q] = [ 2, 3, 34, 36, 37, 38, 39, 41 ], i;
    }();
    exports.default = n;
    cc._RF.pop();
  }, {
    "../main/NetworkManager": "NetworkManager"
  } ],
  DynamicScrollView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7e69aJDfT9K47lz9adib+8A", "DynamicScrollView");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass} = cc._decorator;
    let DynamicScrollView = class DynamicScrollView extends cc.Component {
      onScrollView() {
        this.checkIfBottom();
        this.checkIfTop();
      }
      checkIfBottom() {
        this.state > 0 || this.mainSV.getScrollOffset().y + this.node.height >= this.mainSV.content.height && (this.state = 1, 
        this.cb && this.cb());
      }
      checkIfTop() {
        this.state;
      }
      start() {
        this.mainSV = this.node.getComponent(cc.ScrollView);
      }
    };
    DynamicScrollView = __decorate([ ccclass ], DynamicScrollView);
    exports.default = DynamicScrollView;
    cc._RF.pop();
  }, {} ],
  EffSpine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6c81br715VBG5Dz6QFjhkAc", "EffSpine");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass} = cc._decorator;
    var i = "playTimes";
    let EffSpine = class EffSpine extends cc.Component {
      play(c) {
        void 0 === c && (c = 1);
        this.node.active = true;
        this.playTimes = c;
        this.getComponent(sp.Skeleton).setAnimation(0, this.aName, true);
      }
      start() {
        var c;
        c = this;
        this.aName = this.getComponent(sp.Skeleton).animation;
        this.node.active = false;
        this.getComponent(sp.Skeleton).setCompleteListener(function() {
          c.playTimes--;
          c.playTimes <= 0 && (c.node.active = false);
        });
      }
    };
    EffSpine = __decorate([ ccclass ], EffSpine);
    exports.default = EffSpine;
    cc._RF.pop();
  }, {} ],
  EnabledBtn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a4177LUKShHYJDmMFbrpzsX", "EnabledBtn");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Tool_1 = require("./Tool");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EnabledBtn = class EnabledBtn extends cc.Component {
      constructor() {
        super(...arguments);
        this.btnBg = null;
        this.metas = null;
        this.enableNode = null;
        this.disableNode = null;
        this.countDownStr = null;
      }
      asNodeList(c) {
        return Array.isArray(c) ? c.filter(Boolean) : c ? [ c ] : [];
      }
      setEnable(c) {
        this.flag = c;
        var t = Array.isArray(this.metas) ? this.metas : this.metas ? [ this.metas ] : [];
        this.btnBg && t.length >= 2 && (c ? this.btnBg.setMaterial(0, t[0]) : this.btnBg.setMaterial(0, t[1]));
        this.asNodeList(this.enableNode).map(function(t) {
          return t.active = c;
        });
        this.asNodeList(this.disableNode).map(function(t) {
          return t.active = !c;
        });
      }
      setRule(c, t) {
        this.rule = c;
        this.info = t;
        this.update(0);
      }
      start() {}
      update() {
        var c;
        1 === this.rule && !this.flag && this.info && this.countDownStr && ((c = this.info.tillTime - Math.floor(Date.now() / 1e3)) <= 0 && (c = 0), 
        this.countDownStr.string = Tool_1.default.formatCountDown(c, true), c <= 0 && this.setEnable(true));
      }
    };
    __decorate([ property(cc.Sprite) ], EnabledBtn.prototype, "btnBg", void 0);
    __decorate([ property(cc.Material) ], EnabledBtn.prototype, "metas", void 0);
    __decorate([ property(cc.Node) ], EnabledBtn.prototype, "enableNode", void 0);
    __decorate([ property(cc.Node) ], EnabledBtn.prototype, "disableNode", void 0);
    __decorate([ property(cc.Label) ], EnabledBtn.prototype, "countDownStr", void 0);
    EnabledBtn = __decorate([ ccclass ], EnabledBtn);
    exports.default = EnabledBtn;
    cc._RF.pop();
  }, {
    "./Tool": "Tool"
  } ],
  EnemyPoison: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "954e3ALtD9Ch7LS3nESxcia", "EnemyPoison");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameComponent_1 = require("./GameComponent");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EnemyPoison = class EnemyPoison extends GameComponent_1.default {
      constructor() {
        super(...arguments);
        this.atkCd = 1;
        this.timeLabel = null;
      }
      initBy(t, i, c) {
        this.scene = t;
        this.att = i;
        this.atkTimer = 0;
        this.remainTime = c;
        this.timeLabel.string = cc.pvz.utils.formatSeconds3(this.remainTime);
      }
      update2(t) {
        this.atkTimer += t;
        this.atkTimer >= this.atkCd && (this.atkTimer -= this.atkCd, this.scene.hurtBy(this, this.att));
        this.remainTime = Math.max(0, this.remainTime - t);
        this.timeLabel.string = cc.pvz.utils.formatSeconds3(Math.floor(this.remainTime));
        this.remainTime <= 0 && this.scene.doGameEndedLogic(true);
      }
      hurtBy() {}
    };
    __decorate([ property ], EnemyPoison.prototype, "atkCd", void 0);
    __decorate([ property(cc.Label) ], EnemyPoison.prototype, "timeLabel", void 0);
    EnemyPoison = __decorate([ ccclass ], EnemyPoison);
    exports.default = EnemyPoison;
    cc._RF.pop();
  }, {
    "./GameComponent": "GameComponent"
  } ],
  EnemyTower: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bef10S552VL7LTjbIe+ukEV", "EnemyTower");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Enemy_1 = require("./Enemy");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EnemyTower = class EnemyTower extends Enemy_1.default {
      constructor() {
        super(...arguments);
        this.prefix = "";
      }
      getAniName(t) {
        return "atk" == t || "idle" == t ? this.prefix + t : "";
      }
      playHitAni() {}
      moveTo() {
        var i = this;
        this.scene.startTimer(function() {
          i.isMoving = true;
          i.onReachRoom();
        }, 1);
      }
      storm() {}
      update2() {}
      onDie() {
        this.clearNodes();
        this.scene.delEnemy(this);
      }
    };
    __decorate([ property ], EnemyTower.prototype, "prefix", void 0);
    EnemyTower = __decorate([ ccclass ], EnemyTower);
    exports.default = EnemyTower;
    cc._RF.pop();
  }, {
    "./Enemy": "Enemy"
  } ],
  Enemy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dcbdbgugg9PIb/N/E3n7yo0", "Enemy");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameComponent_1 = require("./GameComponent");
    var d = "x";
    var n, R, A, F, N, x, _, H;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Enemy = class Enemy extends GameComponent_1.default {
      constructor() {
        super(...arguments);
        this.spine = null;
        this.assetFaceRight = false;
        this.assetHasDownAni = false;
        this.aimPos = new cc.Vec2(0, 0);
        this.hpBarPos = null;
        this.yunPos = null;
        this.hurtNumPos = null;
        this.walkAni = "walk";
        this.atkRate = 1;
        this.atkCd = 1e3;
        this.atkRange = 40;
        this.hpRate = 1;
        this.moveSpeed = 160;
        this.assetHeight = 120;
        this.energyRate = 1;
        this.coinRate = 1;
        this.diaRate = 1;
        this.dieScaleElec = .7;
      }
      initBy(t, i, c) {
        if (this.scene = t, this.maxHp = i * this.hpRate, 0 == cc.pvz.runtimeData.mode) if (this.isBoss()) {
          var T = this.scene.cal(cc.pvz.runtimeData.wave + 1, this.scene.emitRow.BossHp);
          this.maxHp *= T;
        } else if (this.isElite()) {
          var S = this.scene.cal(cc.pvz.runtimeData.wave + 1, this.scene.emitRow.eliteHp);
          this.maxHp *= S;
        }
        this.hp = this.maxHp;
        this.atk = c * this.atkRate;
        this.hasReachRoom = false;
        this.dizzyTimer = 0;
        this.usingSpeed = this.moveSpeed;
        this.slowDowns = [];
        6 == cc.pvz.runtimeData.mode && (this.usingSpeed *= 1 + this.scene.eBuffValues[9], 
        this.atkRange += this.scene.eBuffValues[10]);
        this.atkRR = this.atkRange * this.atkRange;
        this.isStorming = false;
        this.hasRoarBack = false;
        this.moveTo(cc.v2(this.scene.eX, this.scene.eY));
      }
      getAniName(t) {
        return (!this.assetHasDownAni || this.node.y > this.scene.eY ? "d_" : "u_") + t;
      }
      setAnimation(t, i, c) {
        if (!(this.hp <= 0 && "die1" != t && "die2" != t && "die3" != t)) {
          var r = this.spine.setAnimation(0, this.getAniName(t), i);
          return c && r && this.spine.setTrackCompleteListener(r, c), r;
        }
        cc.pvz.utils.trace("set Animation after die, ani:" + t);
      }
      isEliteOrBoss() {
        return this.isBoss() || this.isElite();
      }
      isElite() {
        return this.id > 100;
      }
      isBoss() {
        return this.id > 1e3;
      }
      moveTo(t) {
        var a = cc.pvz.utils.getRotationRadians(this.node.position, t);
        this.moveStep = cc.v2(Math.cos(a) * this.usingSpeed, Math.sin(a) * this.usingSpeed);
        this.isMoving = true;
        this.node.scaleX = t[d] > this.node[d] ? 1 : -1;
        this.setAnimation(this.walkAni, true);
      }
      onReachRoom() {
        this.hp <= 0 || this.isMoving && (this.isMoving = false, this.attOnce());
      }
      attOnce() {
        var s = this;
        if (!(this.hp <= 0 || this.isMoving || this.isReverseMoving || this.isStorming)) {
          var h = this.setAnimation("atk", false, function() {
            s.setAnimation("idle", true);
          }), n = false;
          this.spine.setTrackEventListener(h, function() {
            var a = 19;
            if (!n) {
              n = true;
              var u = s.atk;
              s.scene.tryHurtBy(s, u) && cc.pvz.runtimeData.props[a] > 0 && s.hurtBy({
                isNear: false,
                dieType: 0,
                node: {
                  angle: 0
                }
              }, cc.pvz.runtimeData.props[a] * u, 0);
            }
          });
          this.scene.startTimer(function() {
            s.attOnce();
          }, .001 * this.atkCd);
        }
      }
      update2(t) {
        if (!(this.hp <= 0 || this.isStorming)) {
          if (this.dizzyTimer > 0) return this.dizzyTimer -= t, void (this.dizzyTimer <= 0 && (this.dizzyNode.parent = null, 
          this.dizzyNode = null));
          if (this.isReverseMoving) {
            var w = this.node[d];
            this.node.position = cc.v2(w + this.moveStep2[d] * t, this.node.y + this.moveStep2.y * t);
            this.node.zIndex = -this.node.y;
            this.reverseMoveTime -= t;
            this.reverseMoveTime <= 0 && (this.isReverseMoving = false, this.isMoving = true, 
            this.setAnimation(this.walkAni, true));
          } else if (this.isMoving) {
            var B = t * this.getMoveSpeed(), T = this.node[d];
            this.node.position = cc.v2(T + this.moveStep[d] * B, this.node.y + this.moveStep.y * B);
            this.node.zIndex = -this.node.y;
            var E = this.node[d] - this.scene.eX, R = this.node.y - this.scene.eY;
            E * E + R * R < this.atkRR && this.onReachRoom();
          }
        }
      }
      update3() {
        this.hpBar && (this.hpBar.node.position = this.node.position);
        this.dizzyNode && (this.dizzyNode.position = this.node.position);
        this.slowNode && (this.slowNode.position = this.node.position);
      }
      clearNodes() {
        var r = this;
        this.slowDowns.forEach(function(t) {
          r.scene.removeTimer(t.timer);
        });
        this.slowDowns.length = 0;
        this.slowNode && (this.slowNode.parent = null, this.slowNode = null);
        this.hpBar && (this.hpBar.node.parent = null, this.hpBar = null);
        this.dizzyNode && (this.dizzyNode.parent = null, this.dizzyNode = null);
      }
      onDie(t, i, c) {
        var v = 180, A = this;
        if (this.clearNodes(), i > 0) {
          var L = "dieEff" + i + "_";
          return this.scene.showDieEffect(this.node.position, L, this.node.scaleX < 0 ? -this.dieScaleElec : this.dieScaleElec), 
          void this.scene.delEnemy(this);
        }
        var P = t && 0 == cc.pvz.runtimeData.mode && this.scene.isEnemyInKickoffRange(this.node.position);
        this.inDie1 = P;
        var I = this.setAnimation(P ? "die1" : Math.random() < .5 ? "die2" : "die3", false, function() {
          A.scene.delEnemy(A);
        });
        if (P) this.spine.setTrackEventListener(I, function() {
          A.inDie1 = false;
        }); else {
          var D = (c - 10) * Math.PI / v, F = (c + 10) * Math.PI / v, N = cc.math.randomRange(100, 500), x = cc.v2(Math.cos(D) * N, Math.sin(D) * N), _ = cc.v2(Math.cos(F) * N, Math.sin(F) * N), H = cc.math.randomRange(x[d], _[d]);
          cc.pvz.utils.IKtoLocalPos(this.spine, this.node.scaleX < 0 ? -H : H, cc.math.randomRange(x.y, _.y));
        }
      }
      tryKickoff() {
        var c = this;
        this.inDie1 && (this.inDie1 = false, this.setAnimation("die2", false, function() {
          c.scene.delEnemy(c);
        }));
      }
      playHitAni() {
        var c = this, s = this.spine.setAnimation(1, "a_hit", false);
        this.spine.setTrackCompleteListener(s, function() {
          c.spine.clearTrack(1);
        });
      }
      tryHurtBy(t, i, c) {
        if (6 != cc.pvz.runtimeData.mode) return this.hurtBy(t, i, c), true;
        var o = 1 + cc.pvz.runtimeData.props[17] - this.scene.eBuffValues[8];
        return o >= 1 || Math.random() < o ? (this.hurtBy(t, i, c), true) : (this.scene.showDodge(this.node.position), 
        false);
      }
      hurtBy(t, i, c) {
        if (!(this.hp <= 0)) {
          var m = 1;
          if (6 == cc.pvz.runtimeData.mode) {
            var k = this.scene.eBuffValues[4];
            k > 0 && (m -= k);
          }
          var b = i * Math.max(.1, m);
          if (this.playHitAni(), this.isStorming && (cc.find("anim", this.node).y = 0), b = Math.max(1, b), 
          this.hp -= b, this.hp <= 0) {
            this.onDie(t.isNear, t.dieType, t.node.angle);
            this.scene.onEnemyDie();
            this.scene.doEnemyDropLogic(this);
          } else switch (this.updateHpBar(), t.buffId) {
           case 1:
            this.storm();
            break;

           case 2:
            this.onRoarBack(this.scene.heroRoot, 200);
          }
          void 0 !== c && this.scene.showHurtNum(this.node.position.add(this.hurtNumPos), c, b);
        }
      }
      updateHpBar() {
        this.hpBar || this.scene.addHpBarFor(this, this.hpBarPos);
        this.hpBar.progress = this.hp / this.maxHp;
      }
      onCollisionEnter(t, i) {
        if (1 != i.tag && !(this.hp <= 0)) {
          var s = t.getComponent("Bullet");
          s && (s.remainTimes <= 0 ? s.onHitWith(this) : s.a.doBulletAttLogic(s, this));
        }
      }
      getAimPos() {
        return this.node.position.add(this.aimPos);
      }
      onRoarBack(t, i) {
        var r = 300;
        if (!this.scene.checkMode6Chance(13)) {
          var u = this.hasRoarBack ? i / 2 : i;
          this.isReverseMoving = true;
          this.reverseMoveTime = u / r;
          var f = cc.pvz.utils.getRotationRadians(t.position, this.node.position);
          this.moveStep2 = cc.v2(r * Math.cos(f), r * Math.sin(f));
          this.setAnimation(this.walkAni, true, function() {});
          this.hasRoarBack = true;
        }
      }
      slowDownEnded(t) {
        var a = this.slowDowns.findIndex(function(i) {
          return i.type == t;
        });
        -1 != a && (this.slowDowns.splice(a, 1), 0 == this.slowDowns.length && (this.spine.node.color = cc.Color.WHITE, 
        this.slowNode && (this.slowNode.parent = null, this.slowNode = null)));
      }
      slowDown(t, i, c) {
        if (!this.scene.checkMode6Chance(14)) {
          var f = this.slowDowns.find(function(i) {
            return i.type == t;
          });
          f ? (f.value = i, this.scene.removeTimer(f.timer)) : (f = {
            type: t,
            value: i
          }, this.slowDowns.push(f));
          f.timer = this.scene.startTimer(this.slowDownEnded.bind(this, t), c);
          this.spine.node.color = cc.pvz.utils.getRGBColor("#5574FF");
        }
      }
      getMoveSpeed() {
        var i = 1;
        return this.slowDowns.forEach(function(t) {
          return i *= t.value;
        }), i;
      }
      addBuff() {}
      dizzy(_t, i) {
        this.hp <= 0 || this.scene.checkMode6Chance(12) || (this.dizzyTimer = i, this.dizzyNode || (this.dizzyNode = this.scene.dizzyPrefab.addNode(this.node.position), 
        cc.find("pos", this.dizzyNode).position = this.yunPos));
      }
      storm() {
        var s = this;
        if (!(this.hp <= 0)) {
          this.isStorming = true;
          var h = cc.find("anim", this.node).getComponent(cc.Animation);
          h.once("finished", function() {
            s.isStorming = false;
            s.hp > 0 && (s.isMoving = true, s.setAnimation(s.walkAni, true));
          });
          h.play();
          this.setAnimation("die1", false);
        }
      }
    };
    __decorate([ property(sp.Skeleton) ], Enemy.prototype, "spine", void 0);
    __decorate([ property ], Enemy.prototype, "assetFaceRight", void 0);
    __decorate([ property ], Enemy.prototype, "assetHasDownAni", void 0);
    __decorate([ property({
      tooltip: "\u88ab\u7784\u51c6\u70b9"
    }) ], Enemy.prototype, "aimPos", void 0);
    __decorate([ property(cc.Vec2) ], Enemy.prototype, "hpBarPos", void 0);
    __decorate([ property(cc.Vec2) ], Enemy.prototype, "yunPos", void 0);
    __decorate([ property(cc.Vec2) ], Enemy.prototype, "hurtNumPos", void 0);
    __decorate([ property ], Enemy.prototype, "walkAni", void 0);
    __decorate([ property ], Enemy.prototype, "atkRate", void 0);
    __decorate([ property ], Enemy.prototype, "atkCd", void 0);
    __decorate([ property ], Enemy.prototype, "atkRange", void 0);
    __decorate([ property ], Enemy.prototype, "hpRate", void 0);
    __decorate([ property ], Enemy.prototype, "moveSpeed", void 0);
    __decorate([ property ], Enemy.prototype, "assetHeight", void 0);
    __decorate([ property ], Enemy.prototype, "energyRate", void 0);
    __decorate([ property ], Enemy.prototype, "coinRate", void 0);
    __decorate([ property ], Enemy.prototype, "diaRate", void 0);
    __decorate([ property ], Enemy.prototype, "dieScaleElec", void 0);
    Enemy = __decorate([ ccclass ], Enemy);
    exports.default = Enemy;
    cc._RF.pop();
  }, {
    "./GameComponent": "GameComponent"
  } ],
  EquipDecompWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1563drnUoZDhbAB8FycfZvp", "EquipDecompWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const n = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const r = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var t = "par";
    var k = 0;
    let EquipDecompWindow = class EquipDecompWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.toggles = null;
      }
      init() {
        cc.player.equips.equipsDecompSelectFlag || (cc.player.equips.equipsDecompSelectFlag = new Array(10).fill(0));
        for (var o = 0; o < this.toggles.length; o++) cc.player.equips.equipsDecompSelectFlag[o] ? this.toggles[o].check() : this.toggles[o].uncheck();
      }
      show(c) {
        void 0 === c && (c = {
          par: null
        });
        this.par = c.par;
      }
      onToggleChanged() {}
      do() {
        for (var c, t, m = this, S = 0; S < this.toggles.length; S++) cc.player.equips.equipsDecompSelectFlag[S] = this.toggles[S].isChecked ? 1 : 0;
        for (var S in c = [], t = 0, cc.player.equips.equips) {
          var b, I;
          b = 0;
          cc.player.equips.equips[S][1] && (b = 1);
          for (var k = 0; k < cc.player.equips.using.length; k++) if (cc.player.equips.using[k] === parseInt(S)) {
            b = 1;
            break;
          }
          if (!b) {
            I = n.Datas.Equip[cc.player.equips.equips[S][0]];
            cc.player.equips.equipsDecompSelectFlag[I.quality - 1] && (c.push(parseInt(S)), 
            I.quality >= 9 && (t = 1));
          }
        }
        t ? cc.SubwindowManager.showWindow(r.UIStatus.Alert, {
          text: n.Datas.Config[10003].v,
          onOk: function() {
            m.decompEquips(c);
            m.hide();
          }
        }) : (this.decompEquips(c), this.hide());
      }
      decompEquips(c) {
        var f = 41;
        console.log("here:", c);
        for (var g = 0, m = 0; m < c.length; m++) {
          g += n.Datas.Equip[cc.player.equips.equips[c[m]][0]].item;
          delete cc.player.equips.equips[c[m]];
        }
        g > 0 ? (cc.pvz.PlayerData.getRewardBonus(1, f, g), this.par.showEquipList(), cc.SubwindowManager.showWindow(r.UIStatus.GetItem, {
          items: [ 1, f, g ]
        }), RedPointManager_1.default.check("EquipLvUp"), cc.pvz.PlayerData.saveData(), 
        this.hide()) : cc.popupManager.showToast(n.Datas.Tips[16].v);
      }
      hide() {
        cc.SubwindowManager.hideWindow(r.UIStatus.EquipDecomp);
      }
      start() {}
    };
    __decorate([ property(cc.Toggle) ], EquipDecompWindow.prototype, "toggles", void 0);
    EquipDecompWindow = __decorate([ ccclass ], EquipDecompWindow);
    exports.default = EquipDecompWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager"
  } ],
  EquipIcon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fac2fGeolpAD7pHDNyA6WoT", "EquipIcon");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const h = require("./ConfigCtrl");
    const r = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    var d;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EquipIcon = class EquipIcon extends cc.Component {
      constructor() {
        super(...arguments);
        this.iconSpr = null;
        this.bgSpr = null;
        this.isLock = null;
        this.updownArrow = null;
        this.bgSFS = null;
      }
      initByEquipIdx(c) {
        var t, i, e, s;
        this.eIdx = c, this.initByEquipInfo(cc.player.equips.equips[this.eIdx]), t = h.Datas.Equip[cc.player.equips.equips[this.eIdx][0]], 
        cc.player.equips.using[t.buwei - 1] === this.eIdx ? this.updownArrow.map(function(c) {
          return c.active = false;
        }) : (i = null, cc.player.equips.using[t.buwei - 1] > 0 && (i = h.Datas.Equip[cc.player.equips.equips[cc.player.equips.using[t.buwei - 1]][0]]), 
        i && i.quality === t.quality ? (e = Tool_1.default.getEquipProScore(cc.player.equips.equips[cc.player.equips.using[t.buwei - 1]]), 
        s = Tool_1.default.getEquipProScore(cc.player.equips.equips[this.eIdx]), this.updownArrow[0].active = s > e, 
        this.updownArrow[1].active = s < e) : (this.updownArrow[0].active = !i || i.quality < t.quality, 
        this.updownArrow[1].active = i && i.quality > t.quality));
      }
      initByEquipInfo(c) {
        var t, d = "image";
        void 0 === c && (c = []);
        this.updownArrow.map(function(c) {
          return c.active = false;
        });
        this.eId = c[0];
        t = h.Datas.Equip[this.eId];
        cc.pvz.utils.setSpriteFrame(this.bgSpr, d, "pz/LQua" + t.quality);
        cc.pvz.utils.setSpriteFrame(this.iconSpr, d, "equip_icon/" + t.icon);
        this.isLock.active = 1 === c[1];
      }
      onClick() {
        this.clickAble && cc.SubwindowManager.showWindow(r.UIStatus.EquipInfo, {
          eIdx: this.eIdx
        });
      }
      start() {}
    };
    __decorate([ property(cc.Sprite) ], EquipIcon.prototype, "iconSpr", void 0);
    __decorate([ property(cc.Sprite) ], EquipIcon.prototype, "bgSpr", void 0);
    __decorate([ property(cc.Node) ], EquipIcon.prototype, "isLock", void 0);
    __decorate([ property(cc.Node) ], EquipIcon.prototype, "updownArrow", void 0);
    __decorate([ property(cc.SpriteFrame) ], EquipIcon.prototype, "bgSFS", void 0);
    EquipIcon = __decorate([ ccclass ], EquipIcon);
    exports.default = EquipIcon;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  EquipInfoWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b86fqnnp1KBJNcjZFfIkiA", "EquipInfoWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const r = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const EquipIcon_1 = require("./EquipIcon");
    const EquipRandomPro_1 = require("./EquipRandomPro");
    const Tool_1 = require("./Tool");
    const o = require("./SubwindowManager");
    var b, K, n, s, f, _;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EquipInfoWindow = class EquipInfoWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.body = null;
        this.panels = null;
        this.eiPre = null;
        this.eiContainer = null;
        this.bgSpr = null;
        this.nameStr = null;
        this.mainProStr = null;
        this.ranProNodes = null;
        this.ranProPre = null;
        this.lockNode = null;
        this.suitLine = null;
        this.suitNode = null;
        this.suitColors = new cc.Color(255, 255, 255, 255);
        this.btnS = null;
      }
      init() {}
      show(c) {
        var t, i;
        void 0 === c && (c = {
          eIdx: 0
        });
        i = [];
        this.eIdx = c.eIdx;
        this.body.y = 0;
        c.eIdx > 0 && (i = cc.player.equips.equips[c.eIdx], this.showPanel(1, i));
        t = r.Datas.Equip[cc.player.equips.equips[c.eIdx][0]];
        cc.player.equips.using[t.buwei - 1] > 0 && cc.player.equips.using[t.buwei - 1] !== c.eIdx ? (this.panels[0].active = true, 
        this.eIdxE = cc.player.equips.using[t.buwei - 1], this.showPanel(0, cc.player.equips.equips[cc.player.equips.using[t.buwei - 1]])) : this.panels[0].active = false;
        this.needSave = false;
      }
      showPanel(c, t) {
        var i, n, s, b = 1e3, K = "/6)";
        if (n = r.Datas.Equip[t[0]], cc.pvz.utils.setSpriteFrame(this.bgSpr[c], "image", "windowquabg/equip_title" + n.quality), 
        this.nameStr[c].string = n.name, (s = Tool_1.default.getPrefab(this.eiContainer[c], this.eiPre, "ei").getComponent(EquipIcon_1.default)).initByEquipInfo(t), 
        s.clickAble = false, s.isLock.active = false, i = (1 === n.type ? "\u653b\u51fb" : "\u751f\u547d") + "+" + Tool_1.default.formatNum2((n.epsBase + n.epsAdd * (cc.player.equips.lv[n.buwei - 1] - 1)) / 100) + "%", 
        this.mainProStr[c].string = i, 1 === n.quality) {
          this.ranProNodes[2 * c].active = false;
          this.ranProNodes[2 * c + 1].active = true;
        } else {
          this.ranProNodes[2 * c].active = true;
          this.ranProNodes[2 * c + 1].active = false;
          this.ranProNodes[2 * c].children.map(function(c) {
            return c.active = false;
          });
          for (var Q = 2; Q < t.length; Q += 2) Tool_1.default.getPrefab(this.ranProNodes[2 * c], this.ranProPre, "" + Q).getComponent(EquipRandomPro_1.default).initBy(t[Q], t[Q + 1]);
        }
        if (0 === c ? (this.lockNode[0].active = !!cc.player.equips.equips[this.eIdxE][1], 
        this.lockNode[1].active = !this.lockNode[0].active) : (this.lockNode[2].active = !!cc.player.equips.equips[this.eIdx][1], 
        this.lockNode[3].active = !this.lockNode[2].active), 1 === c && (cc.player.equips.using[n.buwei - 1] === this.eIdx ? (this.btnS[0].active = false, 
        this.btnS[1].active = true, this.btnS[2].active = false) : (this.btnS[0].active = true, 
        this.btnS[1].active = false, this.btnS[2].active = true)), n.tzType > 0) {
          var X, $;
          for (this.suitLine[c].active = true, this.suitNode[2 * c].active = true, this.body.y = 190, 
          $ = 0, X = [ 0, 0, 0, 0, 0, 0 ], Q = 0; Q < cc.player.equips.using.length; Q++) if (!(cc.player.equips.using[Q] <= 0)) {
            var tc;
            tc = cc.player.equips.equips[cc.player.equips.using[Q]];
            r.Datas.Equip[tc[0]].tzType === n.tzType && ($++, X[Q] = 1);
          }
          for (0 === $ && ($ = 1, X[n.buwei - 1] = 1), Q = 0; Q < this.suitNode[2 * c + 1].children.length; Q++) {
            var ic;
            ic = this.suitNode[2 * c + 1].children[Q];
            0 === Q ? (ic.getComponent(cc.Label).string = r.Datas.EquipSuit[2 * n.tzType].tzName + "(" + $ + K, 
            ic.color = this.suitColors[$ >= 3 ? 1 : 0]) : Q >= 1 && Q <= 6 ? (ic.getComponent(cc.Label).string = r.Datas.Equip[b * Math.floor(n.id / b) + Q].name, 
            ic.color = this.suitColors[X[Q - 1]]) : Q >= 7 && Q <= 8 && (ic.getComponent(cc.Label).string = "(" + (7 === Q ? 3 : 6) + K + r.Datas.EquipSuit[2 * n.tzType + (Q - 8)].desc, 
            ic.color = this.suitColors[$ >= (7 === Q ? 3 : 6) ? 1 : 0]);
          }
        } else {
          this.suitLine[c].active = false;
          this.suitNode[2 * c].active = false;
        }
      }
      doLock(_c, t) {
        var i;
        0 === (i = parseInt(t)) ? (cc.player.equips.equips[this.eIdxE][1] = cc.player.equips.equips[this.eIdxE][1] ? 0 : 1, 
        this.lockNode[0].active = !this.lockNode[0].active, this.lockNode[1].active = !this.lockNode[1].active) : 1 === i && (cc.player.equips.equips[this.eIdx][1] = cc.player.equips.equips[this.eIdx][1] ? 0 : 1, 
        this.lockNode[2].active = !this.lockNode[2].active, this.lockNode[3].active = !this.lockNode[3].active);
        cc.MainUI.pageContainer[3].getComponentInChildren("Page4").showEquipList();
        this.needSave = true;
      }
      doDecomp_() {
        var c, t, f = 41;
        c = cc.player.equips.equips[this.eIdx];
        t = r.Datas.Equip[c[0]];
        cc.pvz.PlayerData.getRewardBonus(1, f, t.item);
        cc.SubwindowManager.showWindow(o.UIStatus.GetItem, {
          items: [ 1, f, t.item ]
        });
        delete cc.player.equips.equips[this.eIdx];
        cc.MainUI.pageContainer[3].getComponentInChildren("Page4").showEquipList();
        RedPointManager_1.default.check("EquipLvUp");
        this.hide();
      }
      doDecomp() {
        var c, t;
        c = this;
        1 === (t = cc.player.equips.equips[this.eIdx])[1] ? cc.popupManager.showToast(r.Datas.Tips[17].v) : r.Datas.Equip[t[0]].quality >= 9 ? cc.SubwindowManager.showWindow(o.UIStatus.Alert, {
          text: r.Datas.Config[10003].v,
          onOk: function() {
            c.doDecomp_();
          }
        }) : this.doDecomp_();
      }
      doEquip() {
        var c, t, _ = "Page4";
        t = cc.player.equips.equips[this.eIdx];
        c = r.Datas.Equip[t[0]];
        cc.player.equips.using[c.buwei - 1] = this.eIdx;
        cc.MainUI.pageContainer[3].getComponentInChildren(_).showEquipList();
        cc.MainUI.pageContainer[3].getComponentInChildren(_).equipBpStr.string = Tool_1.default.formatNum2(cc.pvz.PlayerData.getFinalPro().bp);
        this.needSave = true;
        Tool_1.default.displayBPChange();
        this.hide();
      }
      doUnequip() {
        var c, t, _ = "Page4";
        c = cc.player.equips.equips[this.eIdx];
        t = r.Datas.Equip[c[0]];
        cc.player.equips.using[t.buwei - 1] = 0;
        cc.MainUI.pageContainer[3].getComponentInChildren(_).showEquipList();
        cc.MainUI.pageContainer[3].getComponentInChildren(_).equipBpStr.string = Tool_1.default.formatNum2(cc.pvz.PlayerData.getFinalPro().bp);
        this.needSave = true;
        Tool_1.default.displayBPChange();
        this.hide();
      }
      hide() {
        cc.SubwindowManager.hideWindow(o.UIStatus.EquipInfo);
        this.needSave && cc.pvz.PlayerData.saveData();
      }
      start() {}
    };
    __decorate([ property(cc.Node) ], EquipInfoWindow.prototype, "body", void 0);
    __decorate([ property(cc.Node) ], EquipInfoWindow.prototype, "panels", void 0);
    __decorate([ property(cc.Prefab) ], EquipInfoWindow.prototype, "eiPre", void 0);
    __decorate([ property(cc.Node) ], EquipInfoWindow.prototype, "eiContainer", void 0);
    __decorate([ property(cc.Sprite) ], EquipInfoWindow.prototype, "bgSpr", void 0);
    __decorate([ property(cc.Label) ], EquipInfoWindow.prototype, "nameStr", void 0);
    __decorate([ property(cc.Label) ], EquipInfoWindow.prototype, "mainProStr", void 0);
    __decorate([ property(cc.Node) ], EquipInfoWindow.prototype, "ranProNodes", void 0);
    __decorate([ property(cc.Prefab) ], EquipInfoWindow.prototype, "ranProPre", void 0);
    __decorate([ property(cc.Node) ], EquipInfoWindow.prototype, "lockNode", void 0);
    __decorate([ property(cc.Node) ], EquipInfoWindow.prototype, "suitLine", void 0);
    __decorate([ property(cc.Node) ], EquipInfoWindow.prototype, "suitNode", void 0);
    __decorate([ property(cc.Color) ], EquipInfoWindow.prototype, "suitColors", void 0);
    __decorate([ property(cc.Node) ], EquipInfoWindow.prototype, "btnS", void 0);
    EquipInfoWindow = __decorate([ ccclass ], EquipInfoWindow);
    exports.default = EquipInfoWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./EquipIcon": "EquipIcon",
    "./EquipRandomPro": "EquipRandomPro",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  EquipRandomPro: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5cf6fve9RlE45nfrkmPo7y1", "EquipRandomPro");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const n = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EquipRandomPro = class EquipRandomPro extends cc.Component {
      constructor() {
        super(...arguments);
        this.quaSpr = null;
        this.quaSprSFS = null;
        this.descStrs = null;
      }
      initBy(c, t) {
        var i;
        i = n.Datas.EquipPro[c];
        this.quaSpr[0].spriteFrame = this.quaSprSFS[2 * i.quality - 2];
        this.quaSpr[1].spriteFrame = this.quaSprSFS[2 * i.quality - 1];
        this.descStrs[0].string = i.explain;
        this.descStrs[1].string = "+" + (i.type <= 2 ? t : Tool_1.default.formatNum2(t / 100) + "%");
      }
      start() {}
    };
    __decorate([ property(cc.Sprite) ], EquipRandomPro.prototype, "quaSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], EquipRandomPro.prototype, "quaSprSFS", void 0);
    __decorate([ property(cc.Label) ], EquipRandomPro.prototype, "descStrs", void 0);
    EquipRandomPro = __decorate([ ccclass ], EquipRandomPro);
    exports.default = EquipRandomPro;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./Tool": "Tool"
  } ],
  EquipStageBuff: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "14bf9MRYGtPXbyWSpSwcfzw", "EquipStageBuff");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const s = require("./ConfigCtrl");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EquipStageBuff = class EquipStageBuff extends cc.Component {
      constructor() {
        super(...arguments);
        this.nameStr = null;
      }
      init(c, t) {
        var i;
        this.eIdx = c;
        this.par = t;
        i = s.Datas.EnemyBuff[c];
        this.nameStr.string = i.name;
      }
      showDesc() {
        this.par.showESBuffDesc(this.eIdx, this.node);
      }
      start() {}
    };
    __decorate([ property(cc.Label) ], EquipStageBuff.prototype, "nameStr", void 0);
    EquipStageBuff = __decorate([ ccclass ], EquipStageBuff);
    exports.default = EquipStageBuff;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl"
  } ],
  EquipStageInfoWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "702fcMMJDtNQ5iO2Yy5zha1", "EquipStageInfoWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const n = require("./ConfigCtrl");
    const EquipStageBuff_1 = require("./EquipStageBuff");
    const Tool_1 = require("./Tool");
    const u = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EquipStageInfoWindow = class EquipStageInfoWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.typePanel = null;
        this.eBuffPre = null;
        this.eBuffContainer = null;
        this.buffDesc = null;
        this.buffDescStrs = null;
      }
      init() {}
      show(c) {
        var t;
        void 0 === c && (c = {
          sIdx: 0
        });
        console.log("Here:", c.sIdx);
        t = n.Datas.EquipStage[c.sIdx];
        this.typePanel[1].active = false;
        this.eBuffContainer[0].children.map(function(c) {
          return c.active = false;
        });
        this.eBuffContainer[1].children.map(function(c) {
          return c.active = false;
        });
        for (var k = [ 0, 0 ], C = 0; C < t.mBuff.length; C++) t.mBuff[C] >= 1e3 ? (this.typePanel[1].active = true, 
        Tool_1.default.getPrefab(this.eBuffContainer[1], this.eBuffPre, "" + k[1]++).getComponent(EquipStageBuff_1.default).init(t.mBuff[C], this)) : Tool_1.default.getPrefab(this.eBuffContainer[0], this.eBuffPre, "" + k[0]++).getComponent(EquipStageBuff_1.default).init(t.mBuff[C], this);
      }
      hideESBuffDesc() {
        this.buffDesc.active = false;
      }
      showESBuffDesc(c, t) {
        this.buffDesc.active = true;
        this.buffDescStrs[0].string = n.Datas.EnemyBuff[c].name;
        this.buffDescStrs[1].string = n.Datas.EnemyBuff[c].desc;
        this.buffDesc.setPosition(this.buffDesc.parent.convertToNodeSpaceAR(t.convertToWorldSpaceAR(new cc.Vec2(0, 0))));
      }
      hide() {
        cc.SubwindowManager.hideWindow(u.UIStatus.EquipStageInfo);
      }
      start() {}
    };
    __decorate([ property(cc.Node) ], EquipStageInfoWindow.prototype, "typePanel", void 0);
    __decorate([ property(cc.Prefab) ], EquipStageInfoWindow.prototype, "eBuffPre", void 0);
    __decorate([ property(cc.Node) ], EquipStageInfoWindow.prototype, "eBuffContainer", void 0);
    __decorate([ property(cc.Node) ], EquipStageInfoWindow.prototype, "buffDesc", void 0);
    __decorate([ property(cc.Label) ], EquipStageInfoWindow.prototype, "buffDescStrs", void 0);
    EquipStageInfoWindow = __decorate([ ccclass ], EquipStageInfoWindow);
    exports.default = EquipStageInfoWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./EquipStageBuff": "EquipStageBuff",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  EquipStagePanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fc07ev3+XVLyKvr957Wn/CJ", "EquipStagePanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const o = require("./ConfigCtrl");
    const s = require("./SubwindowManager");
    var v, S;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EquipStagePanel = class EquipStagePanel extends cc.Component {
      constructor() {
        super(...arguments);
        this.stageName = null;
        this.isLock = null;
        this.hint = null;
        this.hintSFS = null;
      }
      init(c, t) {
        var i, v = 2001, S = "spr";
        this.stageIdx = c;
        this.par = t;
        i = o.Datas.EquipStage[this.stageIdx];
        this.stageName.map(function(c) {
          return c.string = i.name;
        });
        this.isLock.active = cc.player.equips.stageProg + v < this.stageIdx;
        this.node.y = -this.node.height / 2 - 20 - (c - v) * (this.node.height + 10);
        c === o.Datas.Config[13].v[0] ? (this.hint.active = true, this.hint.getChildByName(S).getComponent(cc.Sprite).spriteFrame = this.hintSFS[10]) : i.e > 100 ? this.hint.getChildByName(S).getComponent(cc.Sprite).spriteFrame = this.hintSFS[i.e - 101] : this.hint.active = false;
      }
      onClick() {
        this.isLock.active || this.par.selectEquipStage(this.stageIdx);
      }
      showHint() {
        cc.SubwindowManager.showWindow(s.UIStatus.EquipStageInfo, {
          sIdx: this.stageIdx
        });
      }
      start() {}
    };
    __decorate([ property(cc.Label) ], EquipStagePanel.prototype, "stageName", void 0);
    __decorate([ property(cc.Node) ], EquipStagePanel.prototype, "isLock", void 0);
    __decorate([ property(cc.Node) ], EquipStagePanel.prototype, "hint", void 0);
    __decorate([ property(cc.SpriteFrame) ], EquipStagePanel.prototype, "hintSFS", void 0);
    EquipStagePanel = __decorate([ ccclass ], EquipStagePanel);
    exports.default = EquipStagePanel;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager"
  } ],
  EventCollider: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9db9bEvNslK+4vmMmw/JrC8", "EventCollider");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let EventCollider = class EventCollider extends cc.Component {
      constructor() {
        super(...arguments);
        this.spine = null;
        this.event = "fire";
        this.collider = null;
      }
      onLoad() {
        var i = this;
        this.collider.enabled = false;
        this.spine.setEventListener(function(t, c) {
          c.data.name == i.event && cc.pvz.utils.manuallyCheckCollider(i.collider);
        });
      }
    };
    __decorate([ property(sp.Skeleton) ], EventCollider.prototype, "spine", void 0);
    __decorate([ property ], EventCollider.prototype, "event", void 0);
    __decorate([ property(cc.Collider) ], EventCollider.prototype, "collider", void 0);
    EventCollider = __decorate([ ccclass ], EventCollider);
    exports.default = EventCollider;
    cc._RF.pop();
  }, {} ],
  ExitLevelBonusWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5d055T5vDlFFZ3H9W4UCDPl", "ExitLevelBonusWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const e = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    const a = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var u = "prototype";
    let ExitLevelBonusWindow = class ExitLevelBonusWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.infoStrs = null;
        this.adBtn = null;
      }
      init() {}
      show(c) {
        void 0 === c && (c = {
          name: "",
          mode: 0,
          level: 0,
          wave: 0,
          rec: 0,
          rate: 0,
          coin: 0,
          diamond: 0
        });
        this.infoStrs[0].string = c.name;
        this.infoStrs[1].string = "" + c.wave;
        0 == c.mode ? (this.infoStrs[2].node.parent.active = true, this.infoStrs[2].string = "" + (c.level >= cc.player.levelProg[0] ? Math.max(cc.player.levelProg[1], c.wave) : e.Datas.LevelInfo[c.level].wave)) : this.infoStrs[2].node.parent.active = false;
        c.rate > 1 ? (this.infoStrs[3].node.parent.active = true, this.infoStrs[3].string = "x" + c.rate) : this.infoStrs[3].node.parent.active = false;
        c.coin > 0 ? (this.infoStrs[4].node.parent.parent.active = true, this.infoStrs[4].string = Tool_1.default.formatNum2(c.coin)) : this.infoStrs[4].node.parent.parent.active = false;
        c.diamond > 0 ? (this.infoStrs[5].node.parent.parent.active = true, this.infoStrs[5].string = Tool_1.default.formatNum2(c.diamond)) : this.infoStrs[5].node.parent.parent.active = false;
        this.adBtn.active = c.coin + c.diamond > 0;
        this.coin = c.coin;
        this.diamond = c.diamond;
        cc.pvz.TAUtils.trackEndLevel(c.mode, c.level, 2);
      }
      willExit() {
        this.hide();
      }
      exitByAd() {
        var c;
        c = this;
        cc.pvz.AdUtils.willShowAdRewardVideo(cc.pvz.GameConst.AdType["\u4e2d\u65ad\u53cc\u500d"], function(t) {
          t && (c.getRate = 2, c.hide());
        });
      }
      hide() {
        this.coin > 0 && (cc.pvz.PlayerData.itemNum(2, this.coin * this.getRate), cc.MainUI.showBonus(this.infoStrs[4].node.parent.parent, 2, this.coin * this.getRate));
        this.diamond > 0 && (cc.pvz.PlayerData.itemNum(3, this.diamond * this.getRate), 
        cc.MainUI.showBonus(this.infoStrs[5].node.parent.parent, 3, this.diamond * this.getRate));
        cc.pvz.PlayerData.saveData();
        cc.SubwindowManager.hideWindow(a.UIStatus.ExitLevelBonus);
      }
    };
    __decorate([ property(cc.Label) ], ExitLevelBonusWindow.prototype, "infoStrs", void 0);
    __decorate([ property(cc.Node) ], ExitLevelBonusWindow.prototype, "adBtn", void 0);
    ExitLevelBonusWindow = __decorate([ ccclass ], ExitLevelBonusWindow);
    exports.default = ExitLevelBonusWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  FakeBattleground: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "388c1JbUbFA/YNld1bxCXY7", "FakeBattleground");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Pool_1 = require("./Pool");
    const SpineCtrl_1 = require("./SpineCtrl");
    const Tool_1 = require("./Tool");
    const FakeEnemy_1 = require("./FakeEnemy");
    const FakeGoldCoin_1 = require("./FakeGoldCoin");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var i = "nextEnemySpawnTime";
    var kc = [ [ "atk11", "atk12" ], [ "atk21", "atk22" ] ];
    let FakeBattleground = class FakeBattleground extends cc.Component {
      constructor() {
        super(...arguments);
        this.hero = null;
        this.fakeEnemyPool = null;
        this.fakeCoinPool = null;
        this.newEnemyTime0 = 0;
        this.newEnemyTime1 = 0;
      }
      newFakeEnemyReady() {
        var c, t, i;
        (c = this.fakeEnemyPool.getNewPoolItem()).active = true;
        i = c.getComponent(SpineCtrl_1.default) || c.addComponent(SpineCtrl_1.default);
        i.spineHandle || (i.spineHandle = c.getComponent(sp.Skeleton) || c.getComponentInChildren(sp.Skeleton));
        t = c.getComponent(FakeEnemy_1.default) || c.addComponent(FakeEnemy_1.default);
        t.init(this);
        this.nextEnemySpawnTime = Tool_1.default.randomRange(this.newEnemyTime0, this.newEnemyTime1);
      }
      kickOutEnemies(c, t) {
        if (void 0 === c && (c = 0), void 0 === t && (t = 0), c) {
          for (var a in this.heroNearbyEnemies.left) this.heroNearbyEnemies.left[a].getComponent(FakeEnemy_1.default).beKickOut();
          this.heroNearbyEnemies.left = {};
        }
        if (t) {
          for (var a in this.heroNearbyEnemies.right) this.heroNearbyEnemies.right[a].getComponent(FakeEnemy_1.default).beKickOut();
          this.heroNearbyEnemies.right = {};
        }
      }
      heroAtk() {
        var c, t, i, e;
        t = this, c = Object.keys(this.heroNearbyEnemies.left).length, i = Object.keys(this.heroNearbyEnemies.right).length, 
        c > 0 && i > 0 ? (this.hero.getComponent(SpineCtrl_1.default).setAnimation(0, Tool_1.default.randomFromArray(kc[1], 1)[0], false, function() {
          t.hero.getComponent(SpineCtrl_1.default).setAnimation(0, "stand", true);
        }), this.kickLr = [ 1, 1 ]) : (e = i > 0 ? 1 : -1, this.hero.setScale(e, 1), this.hero.getComponent(SpineCtrl_1.default).setAnimation(0, Tool_1.default.randomFromArray(kc[0], 1)[0], false, function() {
          t.hero.getComponent(SpineCtrl_1.default).setAnimation(0, "stand", true);
        }), this.kickLr = [ 1 === e ? 0 : 1, 1 === e ? 1 : 0 ]);
      }
      createNewFakeCoin(c, t) {
        var i = this.fakeCoinPool.getNewPoolItem(), e = i.getComponent(FakeGoldCoin_1.default) || i.addComponent(FakeGoldCoin_1.default);
        e.init(c, t);
      }
      start() {
        var c;
        c = this;
        this.heroNearbyEnemies = {
          left: {},
          right: {}
        };
        this.kickLr = [ 0, 0 ];
        this.nextEnemySpawnTime = 1;
        this.hero.getComponent(SpineCtrl_1.default).setEventListener("hit", function() {
          c.kickOutEnemies(c.kickLr[0], c.kickLr[1]);
        });
      }
      update(c) {
        this.nextEnemySpawnTime > 0 && (this.nextEnemySpawnTime -= c, this.nextEnemySpawnTime <= 0 && this.newFakeEnemyReady());
      }
    };
    __decorate([ property(cc.Node) ], FakeBattleground.prototype, "hero", void 0);
    __decorate([ property(Pool_1.default) ], FakeBattleground.prototype, "fakeEnemyPool", void 0);
    __decorate([ property(Pool_1.default) ], FakeBattleground.prototype, "fakeCoinPool", void 0);
    __decorate([ property(cc.Float) ], FakeBattleground.prototype, "newEnemyTime0", void 0);
    __decorate([ property(cc.Float) ], FakeBattleground.prototype, "newEnemyTime1", void 0);
    FakeBattleground = __decorate([ ccclass ], FakeBattleground);
    exports.default = FakeBattleground;
    cc._RF.pop();
  }, {
    "./FakeEnemy": "FakeEnemy",
    "./FakeGoldCoin": "FakeGoldCoin",
    "./Pool": "Pool",
    "./SpineCtrl": "SpineCtrl",
    "./Tool": "Tool"
  } ],
  FakeEnemy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa012PjufJDqqu7A27F2ph4", "FakeEnemy");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const SpineCtrl_1 = require("./SpineCtrl");
    const Tool_1 = require("./Tool");
    var a, u;
    const {ccclass: ccclass} = cc._decorator;
    var i = "node";
    let FakeEnemy = class FakeEnemy extends cc.Component {
      init(c) {
        var h = 380, a = 50;
        this.par = c;
        this.dieDestXY = cc.v2(0, 0);
        this.node.x = Math.random() < .5 ? -h : h;
        this.node.y = Tool_1.default.randomRange(-h, 266);
        this.v = Math.random() < .5 ? a : 200;
        this.vVec = new cc.Vec2(-this.node.x, -this.node.y).normalizeSelf().mul(this.v);
        this.vVec.x > 0 ? this.node.setScale(1, 1) : this.node.setScale(-1, 1);
        a === this.v ? this.node.getComponent(SpineCtrl_1.default).setAnimation(0, "d_walk", true) : this.node.getComponent(SpineCtrl_1.default).setAnimation(0, "d_walk2", true);
        this.state = 1;
      }
      beKickOut() {
        var c, t, i, u = 100;
        (c = this, 4 !== this.state) && (this.state = 4, this.node.getComponent(SpineCtrl_1.default).setAnimation(1, "a_hit", false), 
        this.node.getComponent(SpineCtrl_1.default).setAnimation(0, "d_die" + Tool_1.default.randomInt(2, 3), false, function() {
          c.node.active = false;
        }), i = Tool_1.default.randomRange(u, 200) * (this.vVec.x > 0 ? -1 : 1), t = Tool_1.default.randomRange(-u, u), 
        this.dieDestXY.x = i, this.dieDestXY.y = t, this.node.getComponent(SpineCtrl_1.default).setBoneHandleTo("IK", cc.find("Canvas"), new cc.Vec2(i, t)));
      }
      move(c) {
        var t;
        this.state <= 2 ? (this.node.x += this.vVec.x * c, this.node.y += this.vVec.y * c, 
        t = Tool_1.default.getDist(this.node.x, this.node.y, this.par.hero.x, this.par.hero.y, false), 
        1 === this.state ? t < 1e4 && (this.node.x < 0 ? this.par.heroNearbyEnemies.left[this.name] = this.node : this.par.heroNearbyEnemies.right[this.name] = this.node, 
        this.state = 2) : 2 === this.state && t < 4900 && (this.state = 3, this.node.getComponent(SpineCtrl_1.default).setAnimation(0, "d_atk", false), 
        this.par.heroAtk())) : this.state;
      }
      start() {
        var c;
        c = this;
        this.node.getComponent(SpineCtrl_1.default).lockBoneHandle("IK");
        this.node.getComponent(SpineCtrl_1.default).setEventListener("coin", function() {
          c.par.createNewFakeCoin(c.dieDestXY.x, c.dieDestXY.y);
        });
      }
      update(c) {
        this.move(c);
        this.node.zIndex = 1e3 - this.node.y;
      }
    };
    FakeEnemy = __decorate([ ccclass ], FakeEnemy);
    exports.default = FakeEnemy;
    cc._RF.pop();
  }, {
    "./SpineCtrl": "SpineCtrl",
    "./Tool": "Tool"
  } ],
  FakeGoldCoin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b9e48Pm1K1HgY6TyJj/J2c0", "FakeGoldCoin");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Pool_1 = require("./Pool");
    const SpineCtrl_1 = require("./SpineCtrl");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var i = "node";
    let FakeGoldCoin = class FakeGoldCoin extends cc.Component {
      constructor() {
        super(...arguments);
        this.spBody = null;
      }
      init(c, t) {
        this.node.setPosition(new cc.Vec2(c, t));
        this.spBody.node.active = true;
        this.spBody.setAnimations(0, [ "jingbi1", "jingbi3" ], false);
      }
      start() {
        var c;
        c = this;
        this.spBody.setCompleteListener(0, "jingbi3", function() {
          c.node.parent.getComponent(Pool_1.default).destroyPoolItem(c.node);
        });
      }
    };
    __decorate([ property(SpineCtrl_1.default) ], FakeGoldCoin.prototype, "spBody", void 0);
    FakeGoldCoin = __decorate([ ccclass ], FakeGoldCoin);
    exports.default = FakeGoldCoin;
    cc._RF.pop();
  }, {
    "./Pool": "Pool",
    "./SpineCtrl": "SpineCtrl"
  } ],
  FingerPosRecord: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3d078X8mcBG56J/1j/hj7ms", "FingerPosRecord");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let FingerPosRecord = class FingerPosRecord extends cc.Component {
      constructor() {
        super(...arguments);
        this.fId = null;
      }
      start() {
        cc.MainUI.FingerPos[this.fId] = this.node;
      }
    };
    __decorate([ property ], FingerPosRecord.prototype, "fId", void 0);
    FingerPosRecord = __decorate([ ccclass ], FingerPosRecord);
    exports.default = FingerPosRecord;
    cc._RF.pop();
  }, {} ],
  FitToBottom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65036wWaAlBoLLBtVvBSwYa", "FitToBottom");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var h, t, n, i;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let FitToBottom = class FitToBottom extends cc.Component {
      constructor() {
        super(...arguments);
        this.type = 0;
        this.bottomSpace = 0;
        this.topSpace = 0;
      }
      init() {
        var c, t, i, n, h = "Canvas";
        0 === this.type ? (t = cc.find(h).convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0))), 
        c = cc.find(h).height / 2 + t.y, this.node.height = c - this.bottomSpace) : (t = cc.find(h).convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0))), 
        n = cc.find(h).height / 2 - t.y, i = cc.find("Canvas/mainControlUI/top/safeTop"), 
        this.node.height = n - this.topSpace - i.getComponent(cc.Widget).top);
      }
      start() {
        this.init();
      }
    };
    __decorate([ property(cc.Integer) ], FitToBottom.prototype, "type", void 0);
    __decorate([ property(cc.Float) ], FitToBottom.prototype, "bottomSpace", void 0);
    __decorate([ property(cc.Float) ], FitToBottom.prototype, "topSpace", void 0);
    FitToBottom = __decorate([ ccclass ], FitToBottom);
    exports.default = FitToBottom;
    cc._RF.pop();
  }, {} ],
  FlyingBonus: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e3c7fuJfT5LrZ8paT4q/d/8", "FlyingBonus");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Pool_1 = require("./Pool");
    const SpineCtrl_1 = require("./SpineCtrl");
    const Tool_1 = require("./Tool");
    var d, s;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var t = "node";
    let FlyingBonus = class FlyingBonus extends cc.Component {
      constructor() {
        super(...arguments);
        this.iContainer = null;
        this.bodySpine = null;
      }
      init(c, t, i) {
        var n, s, d = "IK";
        s = this;
        n = "huobi" + Tool_1.default.randomInt(1, 3);
        cc.pvz.utils.setSpriteFrames(this.iContainer.map(function(c) {
          return c.getComponent(cc.Sprite);
        }), "image", "Item/item" + c);
        this.bodySpine.lockBoneHandle(d);
        this.bodySpine.setBoneHandleTo(d, i, new cc.Vec2(0, 0));
        this.bodySpine.setAnimation(0, n, false, function() {
          s.node.parent.getComponent(Pool_1.default).destroyPoolItem(s.node);
        });
      }
    };
    __decorate([ property(cc.Node) ], FlyingBonus.prototype, "iContainer", void 0);
    __decorate([ property(SpineCtrl_1.default) ], FlyingBonus.prototype, "bodySpine", void 0);
    FlyingBonus = __decorate([ ccclass ], FlyingBonus);
    exports.default = FlyingBonus;
    cc._RF.pop();
  }, {
    "./Pool": "Pool",
    "./SpineCtrl": "SpineCtrl",
    "./Tool": "Tool"
  } ],
  GameBirds: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8ceePFDNxPooy+pL6V3d35", "GameBirds");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const PrefabInfo_1 = require("../main/PrefabInfo");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameBirds = class GameBirds extends cc.Component {
      constructor() {
        super(...arguments);
        this.posRoot = null;
        this.birdRoots = [ cc.Node ];
        this.birdPrefab = null;
        this.anis = [ cc.Animation ];
      }
      initBy(t, i, c) {
        this.scene = t;
        this.attRate = i;
        this.maxCount = c;
        this.birdNodes = [];
        this.posFlags = new Array(c).fill(0);
        this.oriPositions = this.birdRoots.map(function(t) {
          return t.position;
        });
      }
      addBird() {
        if (!(this.birdNodes.length >= this.maxCount)) {
          var r = [];
          this.posFlags.forEach(function(t, i) {
            0 == t && r.push(i);
          });
          var e = cc.pvz.utils.randomInArr(r), o = this.birdRoots[e];
          o.position = this.oriPositions[e];
          var u = this.birdPrefab.addNodeTo(o, cc.Vec2.ZERO);
          u.angle = -90;
          this.birdNodes.push(u);
          this.posFlags[e] = 1;
        }
      }
      onBirdCollision(t, i) {
        if (!this.scene.isPaused && 1 != t.tag) {
          var o = t.getComponent("Enemy");
          if (o) {
            var u = this.scene.getAtt() * this.attRate;
            o.tryHurtBy({
              isNear: false,
              node: i.node,
              dieType: 3
            }, u, 0);
            this.scene.showHitEffect(o.node.position, "skl26_hit");
          }
        }
      }
      birdCount() {
        return this.birdNodes.length;
      }
      releaseBirds() {
        this.birdNodes.forEach(function(t) {
          return t.parent = null;
        });
        this.birdNodes.length = 0;
        this.anis.forEach(function(t) {
          return t.resume();
        });
        this.posFlags.fill(0);
      }
      eatBirds(t, i) {
        var r = [];
        this.birdNodes.forEach(function(i) {
          i.angle = -180;
          r.push(cc.targetedAction(i.parent, cc.moveTo(t, cc.Vec2.ZERO)));
        });
        this.node.runAction(cc.sequence(1 == r.length ? r[0] : cc.spawn(r), cc.callFunc(i)));
        this.anis.forEach(function(t) {
          return t.pause();
        });
      }
    };
    __decorate([ property(cc.Node) ], GameBirds.prototype, "posRoot", void 0);
    __decorate([ property ], GameBirds.prototype, "birdRoots", void 0);
    __decorate([ property(PrefabInfo_1.default) ], GameBirds.prototype, "birdPrefab", void 0);
    __decorate([ property ], GameBirds.prototype, "anis", void 0);
    GameBirds = __decorate([ ccclass ], GameBirds);
    exports.default = GameBirds;
    cc._RF.pop();
  }, {
    "../main/PrefabInfo": "PrefabInfo"
  } ],
  GameClubPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4ecd8+vXSpClKFaCJzYm+JD", "GameClubPanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const n = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const d = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    const EnabledBtn_1 = require("./EnabledBtn");
    const ItemIcon_1 = require("./ItemIcon");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameClubPanel = class GameClubPanel extends cc.Component {
      constructor() {
        super(...arguments);
        this.nameStr = null;
        this.iiPre = null;
        this.iiContainer = null;
        this.progBar = null;
        this.progStr = null;
        this.btn = null;
        this.isGet = null;
      }
      init(c) {
        var t, i;
        this.idx = c;
        this.nameStr.string = n.Datas.Config[11].v[c];
        i = n.Datas.Config[10].v[c];
        Tool_1.default.getPrefab(this.iiContainer, this.iiPre, "ii").getComponent(ItemIcon_1.default).init(i[0], i[1], i[2]);
        t = [ 2, 1, 1, 1 ][c];
        cc.player.gameClub.bonusGet[c] ? (this.btn.active = false, this.isGet.active = true, 
        this.progStr.string = t + "/" + t, this.progBar.progress = 1) : (this.btn.active = true, 
        this.isGet.active = false, this.progStr.string = Math.min(t, cc.player.gameClub.prog[this.idx]) + "/" + t, 
        this.progBar.progress = Math.min(1, cc.player.gameClub.prog[this.idx] / t), this.btn.getComponent(EnabledBtn_1.default).setEnable(this.progBar.progress >= 1));
      }
      getBonus() {
        var c;
        this.btn.getComponent(EnabledBtn_1.default).flag && (c = n.Datas.Config[10].v[this.idx], 
        cc.pvz.PlayerData.getRewardBonus(c[0], c[1], c[2]), cc.SubwindowManager.showWindow(d.UIStatus.GetItem, {
          items: c
        }), cc.player.gameClub.bonusGet[this.idx] = 1, cc.pvz.PlayerData.saveData(), this.btn.active = false, 
        this.isGet.active = true, RedPointManager_1.default.check("GameClub"));
      }
      start() {}
    };
    __decorate([ property(cc.Label) ], GameClubPanel.prototype, "nameStr", void 0);
    __decorate([ property(cc.Prefab) ], GameClubPanel.prototype, "iiPre", void 0);
    __decorate([ property(cc.Node) ], GameClubPanel.prototype, "iiContainer", void 0);
    __decorate([ property(cc.ProgressBar) ], GameClubPanel.prototype, "progBar", void 0);
    __decorate([ property(cc.Label) ], GameClubPanel.prototype, "progStr", void 0);
    __decorate([ property(cc.Node) ], GameClubPanel.prototype, "btn", void 0);
    __decorate([ property(cc.Node) ], GameClubPanel.prototype, "isGet", void 0);
    GameClubPanel = __decorate([ ccclass ], GameClubPanel);
    exports.default = GameClubPanel;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./EnabledBtn": "EnabledBtn",
    "./ItemIcon": "ItemIcon",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  GameClubWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ff42bpmR8xEhbRgmRF2uyb0", "GameClubWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const NetworkManager_1 = require("../main/NetworkManager");
    const v = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const GameClubPanel_1 = require("./GameClubPanel");
    const Tool_1 = require("./Tool");
    const o = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameClubWindow = class GameClubWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.panelPre = null;
        this.panelContainer = null;
        this.fetchingHint = null;
        this.wxClubBtn = null;
      }
      init() {}
      fetchData() {
        var c;
        c = this;
        this.refresh();
        window.wx && window.wx.getGameClubData({
          dataTypeList: [ {
            type: 4
          }, {
            type: 5
          }, {
            type: 6
          }, {
            type: 7
          } ],
          success: function(t) {
            var i, n;
            (console.log(t), "getGameClubData:ok" == t.errMsg) && (i = t.encryptedData, n = t.iv, 
            NetworkManager_1.default.decodeGameClubInfo(i, n, function(t) {
              for (var f = 0; f < t.dataList.length; f++) cc.player.gameClub.prog[t.dataList[f].dataType.type - 4] = t.dataList[f].value;
              console.log(t.dataList);
              console.log(cc.player.gameClub.prog);
              c.refresh();
              RedPointManager_1.default.check("GameClub");
            }));
          },
          fail: function(c) {
            console.log(c);
          }
        });
      }
      show() {
        cc.player.gameClubEnter = 1;
        RedPointManager_1.default.check("GameClub");
        window.wx && window.wx.getSetting({
          success: function(c) {
            c.authSetting["scope.gameClubData"] || window.wx.authorize({
              scope: "scope.gameClubData",
              success: function() {
                console.log("\u5df2\u6388\u6743");
              }
            });
          }
        });
        this.fetchingHint.active = false;
        this.fetchData();
        this.wxClubBtn.getComponent("WxClubBtn").setVisible(true);
      }
      enterGameClub() {}
      refresh() {
        for (var s = 0; s < v.Datas.Config[10].v.length; s++) Tool_1.default.getPrefab(this.panelContainer, this.panelPre, "GameClub" + s).getComponent(GameClubPanel_1.default).init(s);
      }
      hide() {
        this.wxClubBtn.getComponent("WxClubBtn").setVisible(false);
        cc.SubwindowManager.hideWindow(o.UIStatus.GameClub);
      }
      start() {}
    };
    __decorate([ property(cc.Prefab) ], GameClubWindow.prototype, "panelPre", void 0);
    __decorate([ property(cc.Node) ], GameClubWindow.prototype, "panelContainer", void 0);
    __decorate([ property(cc.Node) ], GameClubWindow.prototype, "fetchingHint", void 0);
    __decorate([ property(cc.Node) ], GameClubWindow.prototype, "wxClubBtn", void 0);
    GameClubWindow = __decorate([ ccclass ], GameClubWindow);
    exports.default = GameClubWindow;
    cc._RF.pop();
  }, {
    "../main/NetworkManager": "NetworkManager",
    "./ConfigCtrl": "ConfigCtrl",
    "./GameClubPanel": "GameClubPanel",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  GameComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "18e068VunFFzZ+MxGn/S6Pn", "GameComponent");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var t;
    const {ccclass: ccclass} = cc._decorator;
    let GameComponent = class GameComponent extends cc.Component {
      update(t) {
        t > 1 && (console.log("-----------------------------", t), t = .016);
        var h = t * cc.pvz.timeScale;
        this.update3(h);
        this.scene.isPaused || this.update2(h, t);
      }
      update2() {}
      update3() {}
    };
    GameComponent = __decorate([ ccclass ], GameComponent);
    exports.default = GameComponent;
    cc._RF.pop();
  }, {} ],
  GameConst: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7ea3bc4MHxCQKS2vl7uaNUP", "GameConst");
    var T = "https://yiyouzan.cn/manager/game/v2/status.do?game_id=100137&game_version=2.0.16";
    var k = "https://mmocgame.qpic.cn/wechatgame/mtrAAd3hBBs2bImjicr6OwFricdwdkYb2FIZUibNpGLbKXicLNLzTO6vDiafgQXO7icsoO/0";
    var D = "https://mmocgame.qpic.cn/wechatgame/sW73CibMKz65m1dBgYVarR6QKOL3MzV1W7LlfxeyicmNib5BMtNLAeOVP3oEUCtNNKh/0";
    var R = "https://mmocgame.qpic.cn/wechatgame/CtdTjibicUbjJib66qebiaicZ5Ayic03YK2ys9rAFvjj4747Q9CYmRgkicEL7EUlqaFQeNQ/0";
    var x = "https://mmocgame.qpic.cn/wechatgame/HtZEGtPOIe5uR8icAjymxaIaHaIrjBW4ibRtFP2t3bWdzicEp0R5VGI0QnPP4bHb16p/0";
    var A = {
      wxappId: "",
      ttappId: "",
      GAME_VERSION: "0.0.24",
      SERVER_CONFIG_URL: T,
      AD_UNITS_REWARD: [ "adunit-c054cada1ac4ba74" ],
      SUBSCRIBE_TEMPID: [ "QzhVEMgTqcmGotVQEmX-SYI6opfdy6wAel0XlNeB6jc" ],
      Twtraceid_YXBN: "yxbn",
      Twtraceid_YXSP: "yxsp",
      SHARE_TITLE: "\u529f\u592b",
      SHARE_TITLES: [],
      SHARE_IDS: [ "pOp4QEJ2QK60xkREdxHZ9g==", "0yRq7r8MR9GNN5FkBV5TUA==", "J/N0qHGxQMaU8IrBQ3PWAA==", "PUZwF4uOTwSuHTqxvjhWFA==" ],
      SHARE_URLS: [ k, D, R, x ],
      AdType: cc.Enum({
        "\u5c0f\u6e38\u620f\u6e05\u9664CD": 1,
        "\u6253\u9f99BUff\u5237\u65b0": 2,
        "\u6253\u9f99BUff\u5168\u90fd\u8981": 3,
        "\u6218\u5c40\u79d8\u7c4d\u5237\u65b0": 4,
        "\u6b7b\u4ea1\u590d\u6d3b": 5,
        "\u7ed3\u7b97\u53cc\u500d": 6,
        "\u795d\u798f": 7,
        "\u5c0f\u6e38\u620f\u7ed3\u7b97\u53cc\u500d": 8,
        "\u4e2d\u65ad\u53cc\u500d": 9,
        "\u5b66\u4e60\u6280\u80fd": 10,
        "\u53cc\u500d\u5de1\u903b": 11,
        "\u8f6c\u76d8\u62bd\u5956": 12,
        "\u83b7\u53d6\u4f53\u529b": 13,
        "\u83b7\u5f97\u6b66\u5668": 14,
        "\u7b7e\u5230": 15,
        "\u83b7\u53d6\u6750\u6599\u526f\u672c\u6b21\u6570": 16,
        "\u7a7a\u6295": 17,
        "\u52a0\u901f\u4f20\u9001\u5e26": 18,
        "\u5237\u65b0\u5b9e\u9a8c\u5ba4": 19
      })
    };
    cc.pvz || (cc.pvz = {});
    cc.pvz.GameConst = A;
    module.exports.exports = A;
    module.exports.default = module.exports;
    cc._RF.pop();
  }, {} ],
  GameDropKt: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bd00bHrM3BKM524QLavfH9Y", "GameDropKt");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameDropKt = class GameDropKt extends cc.Component {
      constructor() {
        super(...arguments);
        this.spine = null;
      }
      initBy(t, i) {
        var h = this;
        this.scene = t;
        this.id = i;
        cc.pvz.utils.doWhenSpineReady(this.spine, function() {
          h.spine.____game = true;
          h.spine.setAnimation(0, "fly", false);
          h.spine.setCompleteListener(function() {
            h.spine.setAnimation(0, "stand", true);
            h.spine.setCompleteListener(null);
          });
        });
      }
      onClickKt() {
        cc.popupManager.popup("game", "KongTou", "UIGameKt", {
          scale: false
        }, this.scene, this.id);
      }
    };
    __decorate([ property(sp.Skeleton) ], GameDropKt.prototype, "spine", void 0);
    GameDropKt = __decorate([ ccclass ], GameDropKt);
    exports.default = GameDropKt;
    cc._RF.pop();
  }, {} ],
  GameLaser: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "722002+dTVFpbzJRxa4PawW", "GameLaser");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameLaser = class GameLaser extends cc.Component {
      constructor() {
        super(...arguments);
        this.spine = null;
        this.collider = null;
      }
      initBy(t, i, c) {
        this.scene = t;
        this.icon = i;
        this.att = c;
        this.spine.____game = 1;
        this.spine.setAnimation(0, this.spine.animation, false);
      }
      onCollisionEnter(t) {
        var h = t.getComponent("Enemy");
        if (h) {
          if (1 == t.tag) return;
          h.tryHurtBy({
            isNear: false,
            node: this.node
          }, this.att, 0);
        }
      }
    };
    __decorate([ property(sp.Skeleton) ], GameLaser.prototype, "spine", void 0);
    __decorate([ property(cc.Collider) ], GameLaser.prototype, "collider", void 0);
    GameLaser = __decorate([ ccclass ], GameLaser);
    exports.default = GameLaser;
    cc._RF.pop();
  }, {} ],
  GameMine: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "26ef2jgvnNBP6/JDzb18Ajb", "GameMine");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameMine = class GameMine extends cc.Component {
      constructor() {
        super(...arguments);
        this.spine = null;
        this.life = 15;
      }
      initBy(t, i) {
        var e = this;
        this.scene = t;
        this.att = i;
        this.scene.startTimer(this.onLifeEnded.bind(this), this.life);
        this.spine.setAnimation(0, "skl22_atk1", false);
        this.spine.setCompleteListener(function() {
          e.spine.setAnimation(0, "skl22_atk2", true);
          e.spine.setCompleteListener(null);
        });
      }
      onLifeEnded() {
        this.node.parent = null;
      }
      onCollisionEnter(t) {
        if (0 != t.tag) {
          var o = t.getComponent("Enemy");
          if (o) {
            var u = o.isEliteOrBoss() ? this.att : o.hp;
            o.tryHurtBy({
              isNear: false,
              node: this.node
            }, u, 0);
            this.scene.onSecKillHappen(o);
            cc.butler.playEffectAsync("music", "s22_hit");
            this.scene.showHitEffect(this.node.position, "skl22_atk3");
            this.node.parent = null;
          }
        }
      }
    };
    __decorate([ property(sp.Skeleton) ], GameMine.prototype, "spine", void 0);
    __decorate([ property ], GameMine.prototype, "life", void 0);
    GameMine = __decorate([ ccclass ], GameMine);
    exports.default = GameMine;
    cc._RF.pop();
  }, {} ],
  GamePlane: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6a7aaQA7/VCKZf97Q4MAS9h", "GamePlane");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameComponent_1 = require("./GameComponent");
    var d = "x";
    var E, A, b;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GamePlane = class GamePlane extends GameComponent_1.default {
      constructor() {
        super(...arguments);
        this.spine = null;
        this.zd = null;
        this.tail = null;
        this.planeRowjsonFile = null;
      }
      initBy(t, i) {
        this.scene = t;
        this.id = i;
        this.bornPos = this.node.position;
        this.json = this.scene.planeJsonFile.json.find(function(t) {
          return t.id == i;
        });
        this.qua = this.json.quality;
        cc.player.weaponInfo[i] ? this.data = cc.player.weaponInfo[i] : (this.data = new Array(18).fill(0), 
        this.data[0] = 1);
        var S = this.data[0], E = this.data[1];
        this.spine.setAnimation(0, "wp" + i, true);
        this.atkRate = 1e-4 * (this.json.atk_add * (S - 1) + this.json.atk);
        this.atkPlusConst = 0;
        this.critChange = 0;
        this.critRate = 1.5;
        this.speed = this.json.speed_add * (E - 1) + this.json.speed;
        this.param = 1e-4 * this.json.param;
        for (var R = 0; R < 5; R++) {
          var y = this.data[3 * R + 3], A = this.data[3 * R + 4];
          if (A > 0) switch (this.planeRowjsonFile.json[y - 1].epsKey) {
           case 1:
            this.atkPlusConst += A;
            break;

           case 2:
            this.atkRate += 1e-4 * A;
            break;

           case 3:
            this.critChange += 1e-4 * A;
            break;

           case 4:
            this.critRate += 1e-4 * A;
            break;

           case 5:
            this.speed += A;
          }
        }
        this.tail.color = cc.pvz.utils.getRGBColor(this.json.tailColor);
        this.tail.stroke = this.json.tailSrroke;
        this.type = -1;
        this.eSet = new Set();
        this.preTarget = null;
        this.chooseTarget();
      }
      chooseTarget() {
        this.type = -1;
        this.speedVec = null;
        var v = this.scene.findRandomEnemy(this.preTarget);
        if (v != this.preTarget) {
          this.eSet.clear();
          var l = null;
          v ? (this.type = 1, l = v.node.position) : (this.type = 0, l = this.bornPos);
          var d = cc.pvz.utils.getRotationRadians(this.node.position, l);
          this.speedVec = cc.v2(Math.cos(d) * this.speed, Math.sin(d) * this.speed);
          this.node.angle = 180 * d / Math.PI;
          this.preTarget = v;
        }
      }
      update2(t) {
        switch (this.speedVec && (this.node.position = cc.v2(this.node[d] + this.speedVec[d] * t, this.node.y + this.speedVec.y * t), 
        this.node.zIndex = -this.node.y), this.type) {
         case -1:
          this.chooseTarget();
          break;

         case 0:
          this.bornPos.sub(this.node.position).lengthSqr() <= 2500 ? this.chooseTarget() : this.scene.isInPlaneRect(this.node.position) || this.chooseTarget();
          break;

         case 1:
          this.scene.isInPlaneRect(this.node.position) || this.chooseTarget();
        }
      }
      initZd(t) {
        this.prefabInfo || (this.prefabInfo = this.scene.usePoolPrefab(this.zd, this.scene.bulletsRoot));
        t();
      }
      getAtt() {
        return this.scene.getAtt() * this.atkRate + this.atkPlusConst;
      }
      onCollisionEnter(t) {
        var s = this;
        if (1 != t.tag) {
          var h = t.getComponent("Enemy");
          h && (this.eSet.add(h), this.initZd(function() {
            if (h && !(h.hp <= 0) && cc.isValid(h)) {
              var u = cc.pvz.utils.getRotationRadians(s.node.position, h.node.position), f = s.prefabInfo.addNode(s.node.position);
              f.angle = 180 * u / Math.PI;
              f.runAction(cc.sequence(cc.moveTo(.1, h.node.position), cc.callFunc(function() {
                if (h && !(h.hp <= 0) && cc.isValid(h)) {
                  var k = s.getAtt(), b = 0;
                  switch (s.critChange > 0 && Math.random() < s.critChange && (k *= s.critRate, b = 1), 
                  s.json.id) {
                   case 17:
                    Math.random() < s.param && (k = h.hp, s.scene.onSecKillHappen(h));
                  }
                  var M = h.tryHurtBy({
                    isNear: true,
                    node: f
                  }, k, b);
                  switch (s.json.id) {
                   case 13:
                    M && h.hp > 0 && Math.random() < s.param && h.dizzy(s, s.json.paramHide);
                    break;

                   case 14:
                    h.hp > 0 && h.slowDown(2, 1 - s.param, s.json.paramHide);
                    break;

                   case 15:
                    s.scene.addHp(k * s.param);
                  }
                }
              }), cc.removeSelf()));
            }
          }));
        }
      }
    };
    __decorate([ property(sp.Skeleton) ], GamePlane.prototype, "spine", void 0);
    __decorate([ property(cc.Prefab) ], GamePlane.prototype, "zd", void 0);
    __decorate([ property(cc.MotionStreak) ], GamePlane.prototype, "tail", void 0);
    __decorate([ property(cc.JsonAsset) ], GamePlane.prototype, "planeRowjsonFile", void 0);
    GamePlane = __decorate([ ccclass ], GamePlane);
    exports.default = GamePlane;
    cc._RF.pop();
  }, {
    "./GameComponent": "GameComponent"
  } ],
  GamePoison: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "29607X7NuNDZbM3PhqsQg2d", "GamePoison");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GamePoison = class GamePoison extends cc.Component {
      constructor() {
        super(...arguments);
        this.spine = null;
        this.collider = null;
        this.checkInterval = 1;
      }
      initBy(t, i, c) {
        var f = this;
        this.scene = t;
        this.att = c;
        this.eSet = new Set();
        this.scene.startTimer(this.onLifeEnded.bind(this), i);
        this.attTimerId = this.scene.startTimer(this.poisonReset.bind(this), this.checkInterval, true);
        this.spine.setAnimation(0, "skl26_atk2_1", false);
        this.spine.setCompleteListener(function() {
          f.spine.setAnimation(0, "skl26_atk2_2", true);
          f.spine.setCompleteListener(null);
        });
      }
      poisonReset() {
        this.eSet.clear();
      }
      onLifeEnded() {
        this.scene.removeTimer(this.attTimerId);
        this.node.parent = null;
      }
      onCollisionEnter(t) {
        if (0 != t.tag) {
          var a = t.getComponent("Enemy");
          a && (this.eSet.has(a) || (this.eSet.add(a), a.tryHurtBy({
            isNear: false,
            dieType: 3,
            node: this.node
          }, this.att, 0)));
        }
      }
      onCollisionStay(t, i) {
        this.onCollisionEnter(t, i);
      }
    };
    __decorate([ property(sp.Skeleton) ], GamePoison.prototype, "spine", void 0);
    __decorate([ property(cc.CircleCollider) ], GamePoison.prototype, "collider", void 0);
    __decorate([ property ], GamePoison.prototype, "checkInterval", void 0);
    GamePoison = __decorate([ ccclass ], GamePoison);
    exports.default = GamePoison;
    cc._RF.pop();
  }, {} ],
  GameRoar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe324txpCtMoYPITVtDKiHc", "GameRoar");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameRoar = class GameRoar extends cc.Component {
      constructor() {
        super(...arguments);
        this.spine = null;
        this.collider = null;
      }
      initBy(t, i, c) {
        this.scene = t;
        this.radius = i;
        this.att = c;
        this.spine.setAnimation(0, this.spine.animation, false);
        this.collider.enabled = false;
        this.collider.radius = i;
        cc.pvz.utils.manuallyCheckCollider(this.collider);
      }
      onCollisionEnter(t) {
        if (0 != t.tag) {
          var a = t.getComponent("Enemy");
          a && a.tryHurtBy({
            isNear: false,
            node: this.node
          }, this.att, 0) && (a.hp > 0 && a.onRoarBack(this.node, 200), this.scene.showHitEffect(a.node.position, "skl23_hit"));
        }
      }
    };
    __decorate([ property(sp.Skeleton) ], GameRoar.prototype, "spine", void 0);
    __decorate([ property(cc.CircleCollider) ], GameRoar.prototype, "collider", void 0);
    GameRoar = __decorate([ ccclass ], GameRoar);
    exports.default = GameRoar;
    cc._RF.pop();
  }, {} ],
  GameSkin8Line: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a65b1GWot9EVb/M4oo4ARE9", "GameSkin8Line");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var d = "x";
    var T, E, R;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameSkin8Line = class GameSkin8Line extends cc.Component {
      constructor() {
        super(...arguments);
        this.spine = null;
        this.boxCollider = null;
        this.life = 5;
      }
      initBy(t, i, c) {
        var f = 360, T = this;
        this.scene = t;
        this.slowRate = i;
        this.slowTime = c;
        var S = this.scene.heroRoot.position, E = cc.v2(S[d] + cc.math.randomRange(-f, f), S.y + cc.math.randomRange(-f, f)), R = cc.v2(S[d] + cc.math.randomRange(-f, f), S.y + cc.math.randomRange(-f, f));
        this.node.position = E;
        var y = R.sub(E);
        cc.pvz.utils.IKtoLocalPos(this.spine, y[d], y.y);
        var A = y.len();
        this.boxCollider.offset[d] = A / 2;
        this.boxCollider.size.width = A;
        this.boxCollider.node.angle = 180 * cc.pvz.utils.getRotationRadians(E, R) / Math.PI;
        this.spine.setAnimation(0, "skin8_1", false);
        this.spine.setCompleteListener(function() {
          T.spine.setAnimation(0, "skin8_2", true);
          T.spine.setCompleteListener(null);
        });
        this.scene.startTimer(function() {
          T.node.parent = null;
        }, this.life);
      }
      onCollisionEnter(t) {
        if (1 != t.tag) {
          var s = t.getComponent("Enemy");
          s && s.slowDown(5, this.slowRate, this.slowTime);
        }
      }
      onCollisionExit() {}
    };
    __decorate([ property(sp.Skeleton) ], GameSkin8Line.prototype, "spine", void 0);
    __decorate([ property(cc.BoxCollider) ], GameSkin8Line.prototype, "boxCollider", void 0);
    __decorate([ property ], GameSkin8Line.prototype, "life", void 0);
    GameSkin8Line = __decorate([ ccclass ], GameSkin8Line);
    exports.default = GameSkin8Line;
    cc._RF.pop();
  }, {} ],
  GameSkin9Stick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b3c45NtdjBE1aylaeuBz3xA", "GameSkin9Stick");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameSkin9Stick = class GameSkin9Stick extends cc.Component {
      constructor() {
        super(...arguments);
        this.spine = null;
      }
      initBy(t, i) {
        this.scene = t;
        this.dizzyTime = i;
        this.spine.____game = 1;
      }
      onCollisionEnter(t) {
        if (1 != t.tag) {
          var s = t.getComponent("Enemy");
          s && s.dizzy(this, this.dizzyTime);
        }
      }
    };
    __decorate([ property(sp.Skeleton) ], GameSkin9Stick.prototype, "spine", void 0);
    GameSkin9Stick = __decorate([ ccclass ], GameSkin9Stick);
    exports.default = GameSkin9Stick;
    cc._RF.pop();
  }, {} ],
  GameTestSkills: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3dcbaeuvLlF2J3If9vN30pL", "GameTestSkills");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var g, n;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameTestSkills = class GameTestSkills extends cc.Component {
      constructor() {
        super(...arguments);
        this.node0 = null;
        this.skillJsonFile = null;
      }
      initBy(t) {
        var c = this;
        this.scene = t;
        this.skillJsonFile.json.forEach(function(t, i) {
          var b = c.node0;
          i > 0 && ((b = cc.instantiate(c.node0)).parent = c.node0.parent);
          cc.find("name", b).getComponent(cc.Label).string = t.name;
          var M = c.scene.getSkill(t.id), g = M ? M.lv : 0;
          cc.find("lv", b).getComponent(cc.Label).string = "lv" + g;
          b.getComponent(cc.Button).clickEvents[0].customEventData = t.id;
        });
      }
      onClickBuy(t, i) {
        var h = parseInt(i), n = this.skillJsonFile.json.find(function(t) {
          return t.id == h;
        });
        this.scene.addSkill(h, n, 1, false);
        cc.popupManager.removePopup(this);
      }
      onClickClose() {
        cc.popupManager.removePopup(this);
      }
    };
    __decorate([ property(cc.Node) ], GameTestSkills.prototype, "node0", void 0);
    __decorate([ property(cc.JsonAsset) ], GameTestSkills.prototype, "skillJsonFile", void 0);
    GameTestSkills = __decorate([ ccclass ], GameTestSkills);
    exports.default = GameTestSkills;
    cc._RF.pop();
  }, {} ],
  GameTestSkins: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3a8396K25hNuJELkv6TzEhC", "GameTestSkins");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var u, n;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameTestSkins = class GameTestSkins extends cc.Component {
      constructor() {
        super(...arguments);
        this.node0 = null;
      }
      initBy(t) {
        var c = this;
        this.scene = t;
        t.skinJsonFile.json.forEach(function(t, i) {
          var e = "name", u = c.node0;
          i > 0 && ((u = cc.instantiate(c.node0)).parent = c.node0.parent);
          cc.find(e, u).getComponent(cc.Label).string = t.name;
          u.getComponent(cc.Button).clickEvents[0].customEventData = t.id;
        });
      }
      onClickBuy(t, i) {
        var h = this, n = parseInt(i);
        cc.pvz.utils.useBundleAsset("skins", "h" + n, cc.Prefab, function(t) {
          h.scene.testUsingSkin(t);
          cc.popupManager.removePopup(h);
        });
      }
      onClickClose() {
        cc.popupManager.removePopup(this);
      }
    };
    __decorate([ property(cc.Node) ], GameTestSkins.prototype, "node0", void 0);
    GameTestSkins = __decorate([ ccclass ], GameTestSkins);
    exports.default = GameTestSkins;
    cc._RF.pop();
  }, {} ],
  GameTowerUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9d464pnYt5MKpwUBk7l6MRe", "GameTowerUI");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var u, f, v, l;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameTowerUI = class GameTowerUI extends cc.Component {
      constructor() {
        super(...arguments);
        this.titleNew = null;
        this.titleLvup = [ cc.Node ];
        this.iconL = null;
        this.iconR = null;
        this.countL = null;
        this.countR = null;
        this.colorRed = null;
        this.colorWhite = null;
      }
      initBy(t, i) {
        var o = "image", u = "Item/item", f = cc.pvz.runtimeData.towers[i], v = f && 0 == f.id ? 1 : 0, l = 1 - v;
        this.scene = t;
        this.tPos = i;
        this.lId = v;
        this.rId = l;
        this.titleNew.active = !f;
        this.titleLvup.forEach(function(t) {
          return t.active = f;
        });
        cc.pvz.utils.setSpriteFrame(this.iconL, o, u + (5 + v));
        cc.pvz.utils.setSpriteFrame(this.iconR, o, u + (5 + l));
        this.updateCountLabels();
      }
      updateCountLabels() {
        var o = "/10";
        this.countL.string = cc.pvz.runtimeData.towerCoin[this.lId] + o;
        this.countR.string = cc.pvz.runtimeData.towerCoin[this.rId] + o;
        this.countL.node.color = cc.pvz.runtimeData.towerCoin[this.lId] < 10 ? this.colorRed : this.colorWhite;
        this.countR.node.color = cc.pvz.runtimeData.towerCoin[this.rId] < 10 ? this.colorRed : this.colorWhite;
      }
      onClickLeft() {
        this.scene.addOrLvupTower(this.lId, this.tPos);
      }
      onClickRight() {
        this.scene.addOrLvupTower(this.rId, this.tPos);
      }
    };
    __decorate([ property(cc.Node) ], GameTowerUI.prototype, "titleNew", void 0);
    __decorate([ property ], GameTowerUI.prototype, "titleLvup", void 0);
    __decorate([ property(cc.Sprite) ], GameTowerUI.prototype, "iconL", void 0);
    __decorate([ property(cc.Sprite) ], GameTowerUI.prototype, "iconR", void 0);
    __decorate([ property(cc.Label) ], GameTowerUI.prototype, "countL", void 0);
    __decorate([ property(cc.Label) ], GameTowerUI.prototype, "countR", void 0);
    __decorate([ property(cc.Color) ], GameTowerUI.prototype, "colorRed", void 0);
    __decorate([ property(cc.Color) ], GameTowerUI.prototype, "colorWhite", void 0);
    GameTowerUI = __decorate([ ccclass ], GameTowerUI);
    exports.default = GameTowerUI;
    cc._RF.pop();
  }, {} ],
  GameTower: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "89be5BT/ERItrnRI80xO4xd", "GameTower");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const PrefabInfo_1 = require("../main/PrefabInfo");
    const GameComponent_1 = require("./GameComponent");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GameTower = class GameTower extends GameComponent_1.default {
      constructor() {
        super(...arguments);
        this.zd = null;
        this.zdPos = null;
        this.r = 1600;
        this.spine = null;
        this.aniPrefix = "";
        this.lvLabel = null;
      }
      initBy(t, i, c) {
        this.scene = t;
        this.pos = i;
        this.id = c;
        this.zd.root = this.scene.bulletsRoot;
        this.rr = this.r * this.r;
        this.data = cc.pvz.runtimeData.towers[this.pos];
        this.attTimer = 0;
        this.initProps(c);
      }
      initProps(t) {
        this.props = new Array(4).fill(0);
        for (var a = cc.player.towerInfo["t" + t], r = 0; r < 4; r++) {
          var e = a[r];
          this.props[r] = cc.pvz.PlayerData.getTowerPro(t, r, e);
        }
        this.atkCd = 1 / this.props[1];
        this.lvLabel.string = "Lv." + this.data.lv;
      }
      lvup() {
        var n = this.data.id + 1, a = cc.player.towerInfo["t" + n][0] + this.data.lv;
        this.props[0] = cc.pvz.PlayerData.getTowerPro(n, 0, a);
        this.lvLabel.string = "Lv." + this.data.lv;
      }
      checkToShoot() {
        var c = this.scene.findEnemy(this.node.position, this.rr);
        return !!c && (this.attOnce(c), true);
      }
      attOnce(t) {
        var a = this;
        this.scene.newBulletTo(this, this.zd, this.node.position.add(this.zdPos), t, false).fixedAtt = this.props[0];
        this.spine.setAnimation(0, this.aniPrefix + "atk", false);
        this.spine.setCompleteListener(function() {
          a.spine.setAnimation(0, a.aniPrefix + "idle", false);
          a.spine.setCompleteListener(null);
        });
      }
      update2(t) {
        this.attTimer += t;
        this.attTimer >= this.atkCd && this.checkToShoot() && (this.attTimer = 0);
      }
      doBulletAttLogic(t, i) {
        i.tryHurtBy(t, t.fixedAtt, 0) && this.isValid && 2 == this.id && i.hp > 0 && i.slowDown(4, 1 - .01 * this.props[2], this.props[3]);
        t.onHitWith(i);
      }
    };
    __decorate([ property(PrefabInfo_1.default) ], GameTower.prototype, "zd", void 0);
    __decorate([ property(cc.Vec2) ], GameTower.prototype, "zdPos", void 0);
    __decorate([ property ], GameTower.prototype, "r", void 0);
    __decorate([ property(sp.Skeleton) ], GameTower.prototype, "spine", void 0);
    __decorate([ property ], GameTower.prototype, "aniPrefix", void 0);
    __decorate([ property(cc.Label) ], GameTower.prototype, "lvLabel", void 0);
    GameTower = __decorate([ ccclass ], GameTower);
    exports.default = GameTower;
    cc._RF.pop();
  }, {
    "../main/PrefabInfo": "PrefabInfo",
    "./GameComponent": "GameComponent"
  } ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dcd8b5kdzlE/KWEYYNKn0Zu", "Game");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const PrefabInfo_1 = require("../main/PrefabInfo");
    const PropNode_1 = require("./PropNode");
    const GameTowerUI_1 = require("./GameTowerUI");
    const Bullet_1 = require("./Bullet");
    const ConfigCtrl_1 = require("../lobby/ConfigCtrl");
    var J, K, Z, V, q;
    var kt = Math.E;
    var r = "Cannot find module '";
    var d = "x";
    var p = "y";
    var j = "+";
    var ct = "%";
    var H = [ 21, 20, 16, 14, 10, 2 ], z = [ 11, 10, 8, 7, 6, 5 ], G = [ 1, 1.3, 1.6, 1.9, 2.2, 2.5, 2.8, 3.1, 3.4, 3.7, 4 ], J = cc.Enum({
      Energy: 0,
      Atk: -1,
      MaxHp: -1,
      AtkSpeed: -1,
      LifeSteal: -1,
      CritChance: -1,
      CritDamage: -1,
      LifeResume: -1,
      DamageReduction: -1,
      MultiShotChance: -1,
      MultiShotRate: -1,
      RangePlus: -1,
      AtkRate: -1,
      HpRate: -1,
      AtkSpeedRate: -1,
      CritDamageRate: -1,
      DamageReductionRate: -1,
      HitChance: -1,
      DodgeChance: -1,
      DamageReflect: -1,
      COUNT: -1
    }), K = cc.Class({
      name: "BlessBtn",
      properties: {
        valueLabel: cc.Label,
        icon: cc.Sprite,
        dot: cc.Node
      }
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Game = class Game extends cc.Component {
      constructor() {
        super(...arguments);
        this.HAS_TOWER = true;
        this.CAN_LVUP = true;
        this.HAS_EQUIP = true;
        this.HAS_KT = true;
        this.bg1Sp = null;
        this.bg2Sp = null;
        this.lockNode = null;
        this.skillNode0 = null;
        this.itemCountLabels = [ cc.Label ];
        this.nameLabel = null;
        this.maxWaveRoot = null;
        this.maxWaveLabel = null;
        this.waveLabel = null;
        this.speedLabel = null;
        this.unlockSpeedAni = null;
        this.maxSpeedLabel = null;
        this.propNodes = [ PropNode_1.default ];
        this.propAddEff = null;
        this.propLockRoot = null;
        this.propLockLabel = null;
        this.lvupSpine = null;
        this.fingerSp = null;
        this.heroRoot = null;
        this.heroRangeNode = null;
        this.heroRangeCollider = null;
        this.niuCollider = null;
        this.kickoffRangeNode = null;
        this.objsRoot = null;
        this.bulletsRoot = null;
        this.buffsBackRoot = null;
        this.buffsForeRoot = null;
        this.enemyCircleNode = null;
        this.planeRangeNode = null;
        this.heroHpBar = null;
        this.addEnergyPrefab = null;
        this.addCoinPrefab = null;
        this.addDiamondPrefab = null;
        this.enemyHpPrefabs = [ PrefabInfo_1.default ];
        this.hurtNumPrefab = null;
        this.hurtNumCPrefab = null;
        this.addHpPrefab = null;
        this.dodgePrefab = null;
        this.levelDataJsonFile = null;
        this.skillDropPrefab = null;
        this.skillIconPrefab = null;
        this.skillJsonFile = null;
        this.skillExpJsonFile = null;
        this.skillInfoPanel = null;
        this.zdSkill11Prefab = null;
        this.zdSkill15Prefab = null;
        this.hitEffPrefab = null;
        this.dieEffPrefab = null;
        this.slowPrefab = null;
        this.dizzyPrefab = null;
        this.zdThurderPrefab = null;
        this.prefabInfoRoot = null;
        this.buyTowerPanel = null;
        this.towerPrefabs = [ cc.Prefab ];
        this.towerZhenNode = null;
        this.towerTeamBtnNode = null;
        this.towerTeamSp = null;
        this.towerTeamJsonFile = null;
        this.towerTeamInfo = null;
        this.towerTeamIcon = null;
        this.towerPosNodes = [ cc.Node ];
        this.towerCanPlace = null;
        this.towerPopup = null;
        this.blessBtns = [ K ];
        this.testRoot = null;
        this.towerNodes = [ cc.Node ];
        this.buffRoot = null;
        this.buffNodes = [ cc.Node ];
        this.buffJsonFile = null;
        this.buffInfoPanel = null;
        this.buffInfoName = null;
        this.buffInfoDesc = null;
        this.suitNodes = [ cc.Node ];
        this.zdSuit1Prefab = null;
        this.equipJsonFile = null;
        this.equipPropJsonFile = null;
        this.equipSuitJsonFile = null;
        this.planeJsonFile = null;
        this.planeLvJsonFile = null;
        this.funcJsonFile = null;
        this.skinJsonFile = null;
        this.ktBtnRoot = null;
        this.ktTimeLabel = null;
        this.ktJsonFile = null;
        this.ktBuffNodes = [ cc.Node ];
      }
      onLoad() {
        var z = "game", W = "map/map", Z = this;
        this.eX = this.enemyCircleNode[d];
        this.eY = this.enemyCircleNode[p];
        this.eR = this.enemyCircleNode.width / 2;
        this.eR2 = 450;
        this.planeRect = this.planeRangeNode.getBoundingBox();
        this.kickoffPos = this.kickoffRangeNode.position;
        this.kickoffRR = .25 * this.kickoffRangeNode.width * this.kickoffRangeNode.width;
        this.heroHpBar.node.active = false;
        this.heroRoot.zIndex = -this.heroRoot[p];
        this.testRoot && (this.testRoot.active = false);
        this.fingerSp && (this.fingerSp.node.active = false);
        this.HAS_TOWER && (this.towerNodes.forEach(function(t) {
          return t.active = false;
        }), this.buyTowerPanel.active = false, this.towerZhenNode.active = false, this.towerTeamBtnNode.active = false, 
        this.towerTeamInfo.active = false, this.towerCanPlace.active = false);
        this.HAS_EQUIP && (this.buffRoot.active = false, this.buffInfoPanel.active = false);
        this.HAS_KT && (this.ktBtnRoot.active = false, this.ktBuffNodes.forEach(function(t) {
          return t.active = false;
        }));
        this.unlockSpeedAni.node.active = false;
        this.lvupSpine.node.active = false;
        this.lvupSpine.setCompleteListener(function() {
          Z.lvupSpine.node.active = false;
        });
        this.skillInfoPanel.active = false;
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchBg, this, false);
        this.itemCountLabels[0] && (this.itemCountLabels[0].node.parent.active = 0 == cc.pvz.runtimeData.mode || 6 == cc.pvz.runtimeData.mode || 7 == cc.pvz.runtimeData.mode);
        this.itemCountLabels[5] && (this.itemCountLabels[5].node.parent.active = 6 == cc.pvz.runtimeData.mode);
        var Q = 1;
        if (0 == cc.pvz.runtimeData.mode) {
          this.emitRow = this.levelDataJsonFile.json[cc.pvz.runtimeData.level - 1];
          Q = this.emitRow.map;
          var j = cc.pvz.utils.getRGBColor(this.emitRow.TColor);
          this.towerPosNodes.forEach(function(t) {
            return t.color = j;
          });
        } else if (6 == cc.pvz.runtimeData.mode) this.fillBuffBoxInfo(); else if (7 == cc.pvz.runtimeData.mode) ; else {
          var Q = ConfigCtrl_1.Datas.MetaStageInfo[cc.pvz.runtimeData.mode].map;
          this.towerPosNodes.forEach(function(t) {
            return t.color = cc.Color.WHITE;
          });
        }
        cc.pvz.utils.setSpriteFrame(this.bg1Sp, z, W + Q);
        cc.pvz.utils.setSpriteFrame(this.bg2Sp, z, W + Q + "other1");
        0 == cc.pvz.runtimeData.mode ? (this.waveCount = this.emitRow.wave, cc.pvz.runtimeData.level == cc.player.levelProg[0] ? this.maxWaveLabel.string = cc.player.levelProg[1] : this.maxWaveLabel.string = this.waveCount) : 7 == cc.pvz.runtimeData.mode ? cc.pvz.runtimeData.level == cc.player.goldLevelProg[0] ? this.maxWaveLabel.string = cc.player.goldLevelProg[1] : this.maxWaveLabel.string = 300 : (this.waveCount = 1, 
        this.maxWaveRoot && (this.maxWaveRoot.active = false));
        this.showGameMode();
      }
      showGameMode() {
        var r = "Game/anim";
        cc.find(r, this.node).getComponent(cc.Animation).play("range_in");
        cc.find(r, this.node).getComponent(cc.Animation).playAdditive("atkRange");
        cc.find("UI", this.node).getComponent(cc.Animation).play();
        cc.pvz.utils.useBundleAsset("music", "bat", cc.AudioClip, function(t) {
          cc.butler.playMusic(t);
        });
      }
      onTouchBg() {
        this.skillInfoPanel.active = false;
        this.HAS_TOWER && (this.buyTowerPanel.active = false, this.towerTeamInfo.active = false);
        this.HAS_EQUIP && (this.buffInfoPanel.active = false);
      }
      start() {
        var h = this;
        this.isPaused = false;
        this.timerId = 0;
        this.timers = [];
        this.hasEnded = false;
        this.start2();
        cc.pvz.utils.useBundleAsset("skins", "h" + cc.player.skinUsing, cc.Prefab, function(t) {
          h.useSkin(t);
          h.emitWaveEntry();
        });
      }
      useSkin(t) {
        var v = this, l = cc.instantiate(t);
        switch (l.position = cc.Vec2.ZERO, l.zIndex = cc.macro.MIN_ZINDEX, l.parent = this.heroRoot, 
        this.hero = l.getComponent("Hero"), this.hero.initBy(this), this.skinJson = this.skinJsonFile.json.find(function(t) {
          return t.id == v.hero.skin;
        }), this.hero.skin) {
         case 1:
          this.propNodes[J.MaxHp].fillValueLabels();
          break;

         case 2:
          this.propNodes[J.Atk].fillValueLabels();
          break;

         case 7:
         case 9:
          this.hero.skinSkillCd = this.getSkinArg();
        }
      }
      addPropByExcelType(t, i) {
        switch (t) {
         case 1:
          cc.pvz.runtimeData.props[J.Atk] += i;
          break;

         case 2:
          cc.pvz.runtimeData.props[J.MaxHp] += i;
          break;

         case 4:
          cc.pvz.runtimeData.props[J.LifeSteal] += i;
          break;

         case 5:
          cc.pvz.runtimeData.props[J.CritChance] += i;
          break;

         case 6:
          cc.pvz.runtimeData.props[J.CritDamage] += i;
          break;

         case 11:
          cc.pvz.runtimeData.props[J.HitChance] += 1e-4 * i;
          break;

         case 12:
          cc.pvz.runtimeData.props[J.DodgeChance] += 1e-4 * i;
          break;

         case 13:
          cc.pvz.runtimeData.props[J.DamageReflect] += 1e-4 * i;
          break;

         case 14:
          cc.pvz.runtimeData.props[J.DamageReduction] += 1e-4 * i;
          break;

         case 101:
          cc.pvz.runtimeData.props[J.AtkRate] += i;
          break;

         case 102:
          cc.pvz.runtimeData.props[J.HpRate] += i;
        }
      }
      initAsNewGame() {
        var l = 1e3, T = this;
        cc.pvz.runtimeData.propLvs = new Array(J.COUNT).fill(0);
        for (var S = 0; S < 7; S++) {
          cc.pvz.runtimeData.propCostLvs[S] = 0;
          cc.pvz.runtimeData.propLvs[S] = cc.player.baseProLv[S] - 1;
        }
        cc.pvz.runtimeData.props = new Array(J.COUNT).fill(0);
        cc.pvz.runtimeData.props[J.MultiShotRate] = .5;
        Object.keys(cc.player.weaponInfo).forEach(function(t) {
          var s = 1e3 * t + cc.player.weaponInfo[t][0], h = T.planeLvJsonFile.json.find(function(t) {
            return t.id == s;
          });
          T.addPropByExcelType(h.type, h.value);
        });
        this.HAS_TOWER && this.towerTeamJsonFile.json.forEach(function(t) {
          var s = cc.player.towerInfo.set[t.id - 1];
          s > 0 && T.addPropByExcelType(t.type2, t.valu2[s - 1]);
        });
        var E = require("../main/MyRequest").default.userInfo.inviteCount;
        E > 0 && (cc.pvz.runtimeData.props[J.AtkRate] += l * E, cc.pvz.runtimeData.props[J.HpRate] += l * E, 
        cc.pvz.runtimeData.coinRateF = .1 * E);
        for (var y in cc.player.growUpUnlock) {
          var A = ConfigCtrl_1.Datas.GrowRoad[y];
          this.addPropByExcelType(A.type, A.value);
        }
        cc.pvz.runtimeData.skills = [];
        cc.player.skillUsing.forEach(function(t) {
          t > 0 && T.addSkill(t, T.skillJsonFile.json.find(function(i) {
            return i.id == t;
          }), 0, false);
        });
        this.skillJsonFile.json.forEach(function(t) {
          var h = t.id;
          if (cc.player.skillInfo[h]) {
            var n = cc.player.skillInfo[h][0];
            if (0 != n) {
              var a = t.valu.map(function(t) {
                return t[n - 1];
              });
              T.addSkillInitValue(h, a);
            }
          }
        });
        this.skinJsonFile.json.forEach(function(t) {
          var h = cc.player.skinProLv[t.id];
          if (h) for (var a = 1e-4 * t.baseLv[h[0]], r = 1; r < 7; r++) if (h[r] > 0) {
            var e = T.propNodes[r].getJsonValueByLv(r, h[r]);
            cc.pvz.runtimeData.props[r] += e * a;
          }
        });
        var L = [];
        cc.player.equips.using.forEach(function(t, i) {
          if (!(t <= 0)) {
            var b = cc.player.equips.equips[t], M = b[0], g = cc.player.equips.lv[i], w = T.equipJsonFile.json.find(function(t) {
              return t.id == M;
            });
            1 == w.type ? cc.pvz.runtimeData.props[J.AtkRate] += w.epsBase + w.epsAdd * (g - 1) : 2 == w.type && (cc.pvz.runtimeData.props[J.HpRate] += w.epsBase + w.epsAdd * (g - 1));
            for (var C = (b.length - 2) / 2, B = function() {
              var c = b[2 + 2 * S], s = b[3 + 2 * S], h = T.equipPropJsonFile.json.find(function(t) {
                return t.id == c;
              });
              T.addPropByExcelType(h.type, s);
            }, S = 0; S < C; S++) B();
            if (w.tzType > 0) {
              var E = L.find(function(t) {
                return t.id == w.tzType;
              });
              E ? E.count++ : L.push({
                id: w.tzType,
                count: 1
              });
            }
          }
        });
        L.forEach(function(t) {
          if (t.count >= 3) {
            var l = T.equipSuitJsonFile.json.find(function(i) {
              return i.tzType == t.id && 3 == i.need;
            });
            7 != l.id && 15 != l.id || (cc.pvz.runtimeData.props[J.DamageReflect] += 1e-4 * l.value[0]);
            cc.pvz.runtimeData.tzIds.push(l.id);
          }
          if (t.count >= 6) {
            var d = T.equipSuitJsonFile.json.find(function(i) {
              return i.tzType == t.id && 6 == i.need;
            });
            cc.pvz.runtimeData.tzIds.push(d.id);
          }
        });
        cc.pvz.runtimeData.towerCoin = [ 0, 0 ];
        cc.pvz.runtimeData.towers = [ null, null, null ];
        cc.pvz.runtimeData.bookCount = 0;
        cc.pvz.runtimeData.rBuffs = [];
      }
      start2() {
        var M = 17, g = 100, y = "BatOdds", tt = this;
        cc.director.getCollisionManager().enabled = true;
        this.initFunc();
        cc.pvz.runtimeData.coinRateF = 0;
        this.blessValues = [ 0, 0, 0 ];
        this.towerTeamRow = null;
        this.towerCanPlaceNodes = [ null, null, null ];
        this.towerTeamInterval = 1;
        this.skillDrops = [];
        this.skillWeights = cc.pvz.utils.normalizeWeights(this.skillJsonFile.json, y);
        this.suitDodge = 0;
        this.suitDodgeLayer = 0;
        this.suitDodgeEndTime = 0;
        this.suitThurderTime = 0;
        this.suitCrit = 0;
        this.suitCritLayer = 0;
        this.suitCritEndTime = 0;
        this.suitKillCount = 0;
        this.suitRebornTime = 0;
        this.shield = 0;
        this.shieldTime = 0;
        this.suitFlags = [];
        this.equipSuitJsonFile.json.forEach(function(t) {
          tt.suitFlags[t.id] = [ 0, null ];
        });
        var it = false;
        if (cc.pvz.runtimeData.propLvs) {
          if (M == cc.pvz.runtimeData.propLvs.length && (cc.pvz.runtimeData.propLvs.push(0, 0, 0), 
          cc.pvz.runtimeData.props.push(0, 0, 0)), cc.pvz.runtimeData.skills.forEach(function(t) {
            var n = tt.skillIconPrefab.addNode().getComponent("SkillIcon");
            t.json = tt.skillJsonFile.json.find(function(i) {
              return i.id == t.id;
            });
            t.icon = n;
            t.icon.initBy(tt, t.id, false);
          }), cc.pvz.runtimeData.skills.length >= 10) {
            var ct = cc.pvz.runtimeData.skills.map(function(t) {
              return t.json;
            });
            this.skillWeights = cc.pvz.utils.normalizeWeights(ct, y);
          }
          if (cc.pvz.runtimeData.towers.forEach(function(t, i) {
            t && (t.t = tt.newTower(t.id, i));
          }), cc.pvz.runtimeData.towers.some(function(t) {
            return !t;
          }) || this.checkTowerTeam(), cc.pvz.runtimeData.bookCount > 0) for (var st = 0; st < cc.pvz.runtimeData.bookCount; st++) {
            var ht = this.heroRoot.position, nt = cc.math.randomRange(-Math.PI, Math.PI), at = cc.v2(ht[d] + g * Math.cos(nt), ht[p] + g * Math.sin(nt)), rt = this.skillDropPrefab.addNode(at);
            this.skillDrops.push(rt);
          }
          this.HAS_KT && (this.ktBuffNodes[0].active = cc.pvz.runtimeData.ktSpeed > 1, this.ktBuffNodes[1].active = cc.pvz.runtimeData.ktCoinRate > 1);
        } else {
          it = true;
          this.initAsNewGame();
        }
        this.funcId >= M && this.checkOpenTower();
        var et = new Set();
        cc.pvz.runtimeData.tzIds.forEach(function(t) {
          var e = tt.equipSuitJsonFile.json.find(function(i) {
            return i.id == t;
          });
          tt.suitFlags[t] = [ 1, e.value ];
          var o = e.tzType > 4 ? e.tzType - 4 : e.tzType;
          et.has(o) || (tt.suitNodes[et.size].getComponent(sp.Skeleton).setAnimation(0, "ZB_skill" + o + "_zhu", true), 
          et.add(o));
        });
        this.suitNodes.forEach(function(t, i) {
          return t.active = i < et.size;
        });
        this.propNodes.forEach(function(t, i) {
          t.initBy(tt, i, it);
        });
        this.propNodes[J.CritChance].node.active ? (this.propLockRoot.active = false, this.atkCd = this.getAtkCd()) : this.propNodes[J.AtkSpeed].node.active ? (this.propLockRoot.active = true, 
        this.propLockLabel.string = "\u767d\u94f61\u661f", this.atkCd = this.getAtkCd()) : (this.propLockRoot.active = true, 
        this.propLockLabel.string = "\u9752\u94dc4\u661f", this.atkCd = 1);
        this.fillBlessItems();
        this.showBlessDots();
        this.updateMaxSpeed();
        "number" == typeof cc.player.timeScaleLevel && cc.player.timeScaleLevel >= 0 && cc.player.timeScaleLevel < G.length || (cc.player.timeScaleLevel = 2);
        cc.pvz.timeScaleLevel = cc.player.timeScaleLevel;
        this.updateSpeed();
        this.heroRangeNode.width = this.heroRangeNode.height = 2 * this.getZwRange();
        this.heroRangeCollider.radius = this.getZwRange();
        this.hp = this.maxHp = this.getMaxHp();
        this.invinceTime = 0;
        this.coinTimer = 0;
        this.hpResumeTimer = 0;
        this.towerTeamTimer = 0;
        this.enemys = [];
        this.emitEnded = false;
        this.fillCoinInfo();
        this.fillDiamondInfo();
        this.fillEnergyInfo();
        this.fillTowerCoin();
        0 != cc.pvz.runtimeData.mode && 6 != cc.pvz.runtimeData.mode && 7 != cc.pvz.runtimeData.mode || (this.planeCounter = 0, 
        cc.player.weaponUsing.forEach(function(t) {
          t > 0 && tt.addPlane(t);
        }));
      }
      onPopup1st() {
        this.isPaused = true;
      }
      onAllClosed() {
        this.isPaused = false;
        this.hideBlessDots();
        this.fillBlessItems();
      }
      getZwRange() {
        return 200 + cc.pvz.runtimeData.props[J.RangePlus];
      }
      isEnemyInKickoffRange(t) {
        return t.sub(this.kickoffPos).lengthSqr() < this.kickoffRR;
      }
      isEnemyInYeRange(t) {
        return t.sub(this.kickoffPos).lengthSqr() < 32400;
      }
      hasEnemy(t, i) {
        return this.enemys.some(function(c) {
          return c.hp > 0 && c.node.position.sub(t).lengthSqr() < i;
        });
      }
      findEnemy(t, i, c) {
        var n = this.enemys.filter(function(t) {
          return t.hp > 0 && t != c;
        });
        if (n.length > 0) {
          var a = null, r = i;
          return n.forEach(function(i) {
            var s = i.node.position.sub(t).lengthSqr();
            s < r && (r = s, a = i);
          }), a;
        }
        return null;
      }
      findEnemyExclude(t, i, c) {
        var n = this.enemys.filter(function(s) {
          var h = zt, n = h[1];
          return s.hp > 0 && !c.has(s) && s.node.position.sub(t).lengthSqr() < i;
        });
        return n.length > 0 ? cc.pvz.utils.randomInArr(n) : null;
      }
      findEnemyN(t, i, c, s) {
        var a = this.enemys.filter(function(s) {
          var h = zt;
          return s.hp > 0 && s != c && s.node.position.sub(t).lengthSqr() < i;
        });
        return cc.pvz.utils.randomInArrN(a, s);
      }
      findRandomEnemy(t) {
        var s = this.enemys.filter(function(i) {
          return i.hp > 0 && i != t;
        });
        return cc.pvz.utils.randomInArr(s);
      }
      findRandomEnemyInRange(t, i) {
        var h = this.enemys.filter(function(c) {
          var s = zt;
          return c.hp > 0 && c.node.position.sub(t).lengthSqr() < i;
        });
        return cc.pvz.utils.randomInArr(h);
      }
      findRandomEnemys(t) {
        var s = this.enemys.filter(function(t) {
          return t.hp > 0;
        });
        return cc.pvz.utils.randomInArrN(s, t);
      }
      update(t) {
        if (!this.isPaused) {
          t > 1 && (console.log("-----------------------------", t), t = .016);
          var s = t * cc.pvz.timeScale;
          this.update2(s, t);
        }
      }
      update2(t) {
        var D = this;
        if (this.hero) {
          if (this.hpResumeTimer += t, this.hpResumeTimer >= 1 && (this.hpResumeTimer -= 1, 
          cc.pvz.runtimeData.props[J.LifeResume] > 0 && this.resumeHp(cc.pvz.runtimeData.props[J.LifeResume])), 
          this.invinceTime > 0 && (this.invinceTime -= t, this.invinceTime <= 0 && this.reviveNode && (this.reviveNode.active = false)), 
          0 == cc.pvz.runtimeData.mode || 6 == cc.pvz.runtimeData.mode || 7 == cc.pvz.runtimeData.mode) {
            if (this.coinTimer += t, this.coinTimer >= 1) {
              this.coinTimer -= 1;
              var F = cc.pvz.runtimeData.props[J.Energy] * (1 + this.getTowerArgsP(1, 0, 0));
              this.addEnergy(F, this.hero.addEnergyPos);
            }
            if (this.towerTeamTimer += t, this.towerTeamTimer > this.towerTeamInterval) switch (this.towerTeamTimer = 0, 
            this.getTowerTeamId()) {
             case 3:
              var N = this.getAtt() * this.getTowerArgsP(3, 0, 0);
              this.enemys.forEach(function(t) {
                t.inBattleField && t.tryHurtBy(D, N, 0);
              });
              break;

             case 4:
              var x = this.enemys.filter(function(t) {
                return t.hp > 0 && t.inBattleField;
              });
              if (x.length > 0) {
                var _ = cc.pvz.utils.randomInArr(x);
                this.zdThurderPrefab.addNode(_.node.position).getComponent(sp.Skeleton).setEventListener(function() {
                  var s = D.getTowerArgsP(4, 1, 0) * D.getAtt();
                  _.tryHurtBy({
                    isNear: false,
                    dieType: 1,
                    node: D.node
                  }, s, 0);
                });
              }
              break;

             case 7:
              var H = this.getTowerArgsP(5, 0, 0);
              Math.random() < H && this.enemys.forEach(function(t) {
                t.inBattleField && t.dizzy(D, 1);
              });
            }
            this.nxtWaveCD > 0 && (this.nxtWaveCD -= t, this.waveLabel.string = "\u7b2c" + (cc.pvz.runtimeData.wave + 2) + "\u6ce2\u5373\u5c06\u6765\u4e34 " + Math.ceil(this.nxtWaveCD) + "s");
          }
          this.HAS_KT && this.ktBtnRoot.active && (this.ktTime -= t, this.ktTime <= 0 ? this.removeDropKt() : this.ktTimeLabel.string = cc.pvz.utils.formatSeconds3(Math.floor(this.ktTime), false));
          this.updateTimers(t);
          this.updateSuitDodge(t);
          this.suitThurderTime -= t;
          this.updateSuitCrit(t);
          this.suitRebornTime -= t;
          this.updateSuitShield(t);
        }
      }
      getSkillIconPos(t) {
        var s = t.icon.node.convertToWorldSpaceAR(cc.v2(0, 66));
        return this.addEnergyPrefab.root.convertToNodeSpaceAR(s);
      }
      addEnergy(t, i, c) {
        if (void 0 === c && (c = false), cc.pvz.runtimeData.energy += t, this.fillEnergyInfo(), 
        this.propNodes.forEach(function(t) {
          t.node.active && t.onCoinChanged();
        }), i && (c || 1 != cc.player.noHurtNum)) {
          var g = this.addEnergyPrefab.addNode(i);
          cc.find("anim/num", g).getComponent(cc.Label).string = j + Math.floor(t);
          var w = g.getComponent(cc.Animation);
          w.once("finished", function() {
            g.parent = null;
          });
          w.play();
        }
        1 == cc.player.levelProg[0] && (cc.is1st && cc.pvz.runtimeData.propLvs[0] < 4 ? this.propNodes[0].dot.active && this.guidePropLvup(0) : cc.pvz.runtimeData.propLvs[1] < 3 && this.propNodes[1].dot.active && this.guidePropLvup(1));
      }
      useEnergy(t, i) {
        this.addEnergy(-t, i);
        1 == cc.player.levelProg[0] && (cc.is1st && cc.pvz.runtimeData.propLvs[0] < 4 ? this.propNodes[0].dot.active || (this.fingerSp.node.active = false) : (cc.pvz.runtimeData.propLvs[1] >= 3 || !this.propNodes[1].dot.active) && (this.fingerSp.node.active = false));
      }
      showCostEnergyEff(t, i) {
        var r = this.addEnergyPrefab.addNodeByWorldPos(t);
        cc.find("anim/num", r).getComponent(cc.Label).string = Math.floor(i);
        var e = r.getComponent(cc.Animation);
        e.once("finished", function() {
          r.parent = null;
        });
        e.play();
      }
      fillEnergyInfo() {
        this.CAN_LVUP && (this.itemCountLabels[0].string = cc.pvz.utils.formatNumInGame(Math.floor(cc.pvz.runtimeData.energy)));
      }
      addCoin(t, i) {
        var o = t * cc.pvz.runtimeData.coinRate;
        if (cc.pvz.runtimeData.coin += o, this.fillCoinInfo(), i) {
          var u = this.addCoinPrefab.addNode(i);
          cc.find("anim/num", u).getComponent(cc.Label).string = j + Math.floor(o);
          var f = u.getComponent(cc.Animation);
          f.once("finished", function() {
            u.parent = null;
          });
          f.play();
        }
      }
      fillCoinInfo() {
        this.itemCountLabels[1].string = cc.pvz.utils.formatNumInGame(Math.floor(cc.pvz.runtimeData.coin));
      }
      addDiamond(t, i) {
        var u = t * cc.pvz.runtimeData.coinRate;
        if (cc.pvz.runtimeData.diamond += u, this.fillDiamondInfo(), i) {
          var f = this.addDiamondPrefab.addNode(i);
          cc.find("anim/num", f).getComponent(cc.Label).string = j + Math.floor(u);
          var v = f.getComponent(cc.Animation);
          v.once("finished", function() {
            f.parent = null;
          });
          v.play();
        }
      }
      fillDiamondInfo() {
        this.itemCountLabels[2].string = cc.pvz.utils.formatNumInGame(cc.pvz.runtimeData.diamond);
      }
      addTowerCoin(t, i) {
        var a = this;
        cc.pvz.runtimeData.towerCoin[t] += i;
        this.fillTowerCoin();
        cc.pvz.runtimeData.towerCoin[t] < 10 || cc.pvz.runtimeData.towers.forEach(function(t, i) {
          if (!t && !a.towerCanPlaceNodes[i]) {
            var e = cc.instantiate(a.towerCanPlace);
            e.position = a.towerPosNodes[i].position;
            e.parent = a.towerPosNodes[0].parent;
            e.active = true;
            a.towerCanPlaceNodes[i] = e;
          }
        });
      }
      costTowerCoin(t, i) {
        var a = this;
        cc.pvz.runtimeData.towerCoin[t] -= i;
        this.fillTowerCoin();
        cc.pvz.runtimeData.towerCoin[0] < 10 && cc.pvz.runtimeData.towerCoin[1] < 10 && cc.pvz.runtimeData.towers.forEach(function(t, i) {
          t || a.towerCanPlaceNodes[i] && (a.towerCanPlaceNodes[i].destroy(), a.towerCanPlaceNodes[i] = null);
        });
      }
      fillTowerCoin() {
        this.HAS_TOWER && (this.itemCountLabels[3].string = cc.pvz.utils.formatNumInGame(cc.pvz.runtimeData.towerCoin[0]), 
        this.itemCountLabels[4].string = cc.pvz.utils.formatNumInGame(cc.pvz.runtimeData.towerCoin[1]), 
        this.towerPopup.node.active && this.towerPopup.updateCountLabels());
      }
      onPropLvup(t, i) {
        switch (t) {
         case 0:
          this.propNodes.forEach(function(t) {
            t.node.active || t.checkToUnlock(true);
          });
          cc.pvz.runtimeData.propLvs[J.Energy] >= 10 ? this.propLockRoot.active = false : cc.pvz.runtimeData.propLvs[J.Energy] >= 3 ? (this.propLockRoot.active = true, 
          this.propLockLabel.string = "\u767d\u94f61\u661f") : (this.propLockRoot.active = true, 
          this.propLockLabel.string = "\u9752\u94dc4\u661f");
          break;

         case 3:
          this.atkCd = this.getAtkCd();
        }
        var M = this.propNodes[t].node.convertToWorldSpaceAR(cc.v2(0 == t ? -80 : -105, 0)), g = 0 == t ? "\u7cd6\u679c" : this.propNodes[t].nameLabel.string, w = j + this.propNodes[t].formatValue(i) + (0 == t ? "/s" : "");
        this.showPropChange(M, g, w);
        this.lvupSpine.node.active = true;
        this.lvupSpine.setAnimation(0, this.lvupSpine.animation, false);
      }
      showPropChange(t, i, c) {
        var o = this.propAddEff.addNodeByWorldPos(t);
        cc.find("anim/proName", o).getComponent(cc.Label).string = i;
        cc.find("anim/proVal", o).getComponent(cc.Label).string = c;
        var u = cc.find("anim", o).getComponent(cc.Animation);
        u.once("finished", function() {
          o.parent = null;
        });
        u.play();
      }
      cal(t, i) {
        var c = 0;
        return i.forEach(function(s, h) {
          c += s * Math.pow(t, i.length - h - 1);
        }), c;
      }
      emitEnemy(t, i, c, s, h, n) {
        var r = this;
        cc.pvz.utils.useBundleAsset("game", "enemy/Monster" + t, cc.Prefab, function(a) {
          var m = cc.instantiate(a);
          if (void 0 !== n) m.position = n; else {
            var k = void 0 !== s ? s : cc.math.randomRange(-Math.PI, Math.PI), b = void 0 !== h ? h : cc.math.randomRange(r.eR2, r.eR);
            m.position = cc.v2(r.eX + Math.cos(k) * b, r.eY + Math.sin(k) * b);
          }
          m.parent = r.objsRoot;
          var M = m.getComponent("Enemy");
          M.id = t;
          M.initBy(r, i, c, 1);
          M.inBattleField = false;
          r.enemys.push(M);
        });
      }
      checkGameWin() {
        this.emitEnded && 0 == this.enemys.length && this.doGameEndedLogic(true);
      }
      delEnemy(t) {
        var h = this.enemys.findIndex(function(i) {
          return i == t;
        });
        -1 != h && (cc.js.array.fastRemoveAt(this.enemys, h), t.node.parent = null, this.checkGameWin());
      }
      onEmitEnded() {
        this.emitEnded = true;
        this.checkGameWin();
      }
      doGameEndedLogic(t) {
        this.hasEnded || (this.hasEnded = true, this.isSucc = t, t ? (this.checkFinishWaveMission(), 
        cc.pvz.timeScale = 1, cc.director.getScheduler().setTimeScale(1), this.doWinLogic()) : this.doFailLogic());
      }
      doWinLogic() {
        if (cc.pvz.runtimeData.removeData(), 0 == cc.pvz.runtimeData.mode) {
          var g = ConfigCtrl_1.Datas.LevelInfo[cc.pvz.runtimeData.level];
          cc.pvz.PlayerData.refreshPatrolData(g);
          cc.pvz.runtimeData.level == cc.player.levelProg[0] && (cc.pvz.runtimeData.level == this.levelDataJsonFile.json.length ? cc.player.levelProg[1] = this.waveCount : (cc.player.levelProg[0] = cc.pvz.runtimeData.level + 1, 
          cc.player.levelProg[1] = 0));
          cc.pvz.PlayerData.saveData();
        } else 6 == cc.pvz.runtimeData.mode ? cc.player.equips.stageProg == this.emitRowIndex && (cc.player.equips.stageProg++, 
        cc.pvz.PlayerData.saveData()) : 7 == cc.pvz.runtimeData.mode && cc.player.goldLevelProg[0] == cc.pvz.runtimeData.level && (cc.player.goldLevelProg[0]++, 
        cc.player.goldLevelProg[1] = 0, cc.pvz.PlayerData.saveData());
        (0 == cc.pvz.runtimeData.mode || 7 == cc.pvz.runtimeData.mode) && (cc.player.levelBoxCounter || 0) < 10 ? cc.popupManager.popup("game", "StageRwdBox", "UIGameWin", {
          scale: false
        }, this) : this.showWinUI();
      }
      doFailLogic() {
        var u = this;
        if (this.suitRebornTime <= 0 && this.birdsRoot) {
          var f = this.getSuitValue(14, 6);
          if (f) {
            var v = this.birdsRoot.birdCount();
            if (v > 0) return void this.birdsRoot.eatBirds(3, function() {
              u.birdsRoot.releaseBirds();
              u.onRevive(5, 1e-4 * f[0] * v);
              u.suitRebornTime = f[1];
            });
          }
        }
        if (10 == this.hero.skin && 0 == cc.pvz.runtimeData.skin10Reborn) return cc.pvz.runtimeData.skin10Reborn = 1, 
        void this.onRevive(this.getSkinArg());
        cc.pvz.runtimeData.rebornCount <= 0 || cc.pvz.runtimeData.wave < 9 ? this.showFailUI(false) : cc.popupManager.popup("game", "Revive", "UIGameRevive", {
          scale: false
        }, this);
      }
      getArrValueByWave(t, i) {
        for (var s = t[0].length; --s >= 0; ) if (i >= t[0][s]) return t[1][s];
        return 0;
      }
      emitWaveEntry() {
        var e = this;
        if (0 == cc.pvz.runtimeData.mode) return this.nameLabel.string = this.emitRow.name, 
        void this.emitWaveMode0();
        cc.pvz.utils.useBundleAsset("game", "config/" + [ "LevelDate", "FBGold", "FBDiamond", "FBFormation", "FBEnhance", "FBRandom", "MJDate", "TJDate" ][cc.pvz.runtimeData.mode], cc.JsonAsset, function(t) {
          var R = "game", y = "map/map", L = "other1";
          switch (e.emitRowIndex = t.json.findIndex(function(t) {
            return t.id == cc.pvz.runtimeData.level;
          }), e.emitRow = t.json[e.emitRowIndex], e.nameLabel.string = e.emitRow.name, cc.pvz.runtimeData.mode) {
           case 1:
            e.emitWaveMode1();
            break;

           case 2:
            e.emitWaveMode2();
            break;

           case 3:
            e.emitWaveMode3();
            break;

           case 4:
            e.emitWaveMode4();
            break;

           case 5:
            e.emitWaveMode5();
            break;

           case 6:
            e.waveCount = e.emitRow.wave;
            var I = cc.pvz.utils.getRGBColor(e.emitRow.TColor);
            e.towerPosNodes.forEach(function(t) {
              return t.color = I;
            });
            var D = e.emitRow.map;
            cc.pvz.utils.setSpriteFrame(e.bg1Sp, R, y + D);
            cc.pvz.utils.setSpriteFrame(e.bg2Sp, R, y + D + L);
            e.eBuffValues = [];
            e.buffJsonFile.json.forEach(function(t) {
              e.eBuffValues[t.id] = 0;
            });
            0 == cc.pvz.runtimeData.rBuffs.length && (cc.pvz.runtimeData.rBuffs = cc.pvz.utils.randomInArrN(e.emitRow.mBuff, 2));
            cc.pvz.runtimeData.rBuffs.forEach(function(t) {
              var h = 50, a = e.buffJsonFile.json.find(function(i) {
                return i.id == t;
              }), r = t > h ? t - h : t;
              e.eBuffValues[r] += 10 == r || 6 == r ? a.v1 : 1e-4 * a.v1;
            });
            e.showMode6Buffs();
            e.emitWaveMode6();
            break;

           case 7:
            e.waveCount = e.emitRow.wave;
            var F = cc.pvz.utils.getRGBColor(e.emitRow.TColor);
            e.towerPosNodes.forEach(function(t) {
              return t.color = F;
            });
            var N = e.emitRow.map;
            cc.pvz.utils.setSpriteFrame(e.bg1Sp, R, y + N);
            cc.pvz.utils.setSpriteFrame(e.bg2Sp, R, y + N + L);
            e.emitWaveMode7();
          }
        });
      }
      emitWaveMode1() {
        this.waveLabel.string = "\u7b2c1\u6ce2";
        cc.pvz.PlayerData.clearData();
        for (var e = this.emitRow.baseHp, o = this.emitRow.baseAttack, u = this.emitRow.count, f = this.emitRow.mids, v = cc.math.randomRange(-Math.PI, Math.PI), l = 2 * Math.PI / u, d = this.eR, p = 0; p < u; p++) this.emitEnemy(f, e, o, v + p * l, d);
        this.emitEnded = true;
      }
      emitWaveMode2() {
        var e = this;
        this.waveLabel.string = "\u7b2c1\u6ce2";
        for (var o = this.emitRow.baseHp, u = this.emitRow.baseAttack, f = this.emitRow.mids.length, v = 0; v < f; v++) {
          var l = this.emitRow.mids[v];
          v == f - 1 ? this.startTimer(this.emitEnemy.bind(this, l, 5 * o, 5 * u), 2 * v) : this.startTimer(this.emitEnemy.bind(this, l, o, u), 2 * v);
        }
        this.startTimer(function() {
          e.emitEnded = true;
        }, f);
      }
      emitWaveMode3() {
        var h = 30002;
        this.waveLabel.string = "\u7b2c1\u6ce2";
        var o = this.emitRow.baseHp, u = this.emitRow.baseAttack;
        this.emitEnemy(30001, o, u, void 0, void 0, this.towerPosNodes[0].position);
        this.emitEnemy(h, o, u, void 0, void 0, this.towerPosNodes[1].position);
        this.emitEnemy(h, o, u, void 0, void 0, this.towerPosNodes[2].position);
        this.emitEnded = true;
      }
      emitWaveMode4() {
        var a = this;
        this.waveLabel.string = "\u7b2c1\u6ce2";
        for (var r = this.emitRow.baseHp, e = this.emitRow.baseAttack, o = this.emitRow.count, u = this.emitRow.mids, f = 0; f < o; f++) this.startTimer(this.emitEnemy.bind(this, u, r, e), f);
        this.startTimer(function() {
          a.emitEnded = true;
        }, o);
      }
      emitWaveMode5() {
        var h = this;
        cc.pvz.utils.useBundleAsset("game", "enemy/Monster" + this.emitRow.mids, cc.Prefab, function(t) {
          var o = cc.instantiate(t);
          o.position = h.heroRoot.position;
          o.parent = h.buffsBackRoot;
          var u = o.getComponent("EnemyPoison");
          u.timeLabel = h.waveLabel;
          u.initBy(h, this.emitRow.atk, this.emitRow.time);
        });
      }
      checkDropKt(t) {
        if (this.emitRow.ktbuff) for (var n = this.emitRow.ktbuff.length / 2, a = 0; a < n; a++) if (this.emitRow.ktbuff[2 * a] == t) {
          var r = this.emitRow.ktbuff[2 * a + 1];
          this.dropKt(r, this.emitRow.ktbuffTime);
          break;
        }
      }
      emitNxtWave(t) {
        var e = t * this.emitRow.baseGold + 10 * (this.emitRow.baseGold + this.blessValues[0] + this.getTowerArgsP(8, 0, 0) + cc.pvz.runtimeData.coinRateF);
        this.addCoin(e);
        this.checkFuncs();
        this.checkFinishWaveMission();
        cc.pvz.runtimeData.wave = t;
        this.saveData();
        0 == cc.pvz.runtimeData.mode ? this.emitWaveMode0() : 6 == cc.pvz.runtimeData.mode ? (this.fillBuffBoxInfo(), 
        this.emitWaveMode6()) : 7 == cc.pvz.runtimeData.mode && this.emitWaveMode7();
      }
      emitWaveMode0() {
        var v = 20, F = this, N = cc.pvz.runtimeData.wave + 1;
        this.waveLabel.string = "\u7b2c" + N + "/" + this.waveCount + "\u6ce2";
        var x = this.cal(N, this.emitRow.hp) * this.emitRow.baseHp, _ = this.cal(N, this.emitRow.atk) * this.emitRow.baseAtk, H = 0;
        if (this.emitRow.time2[0].some(function(t) {
          return t == N;
        })) {
          for (var z = this.emitRow.Mid[0], W = cc.math.randomRange(-Math.PI, Math.PI), G = 2 * Math.PI / v, J = this.eR2, K = 0; K < v; K++) this.emitEnemy(z, x, _, W + K * G, J);
          H += this.emitRow.time2[1][0];
        }
        for (var U = this.emitRow.waveTime[0], V = Math.min(this.emitRow.mCount[0] * N + this.emitRow.mCount[1], this.emitRow.mCount[2]), O = this.emitRow.mTime[0] / V, q = 0; q < V; q++) {
          var Q = cc.pvz.utils.randomInArr(this.emitRow.Mid);
          this.startEmitTimer(this.emitEnemy.bind(this, Q, x, _), H + q * O);
        }
        var j = this.emitRow.eliteWave;
        if ((N - j[0]) % j[1] == j[1] - 1) for (var Y = j[2] + this.getArrValueByWave(this.emitRow.eliteAdd, N), X = cc.math.randomRange(this.emitRow.eTime[0], this.emitRow.eTime[1]) / (Y + 1), tt = 0; tt < Y; tt++) {
          var it = cc.pvz.utils.randomInArr(this.emitRow.eliteId);
          this.startEmitTimer(this.emitEnemy.bind(this, it, x, _), H + X * (tt + 1));
        }
        var ct = this.emitRow.bossWave;
        if ((N - ct[0]) % ct[1] == 0) for (var st = ct[2], ht = cc.math.randomRange(this.emitRow.bTime[0], this.emitRow.bTime[1]) / (st + 1), nt = 0; nt < st; nt++) {
          var at = cc.pvz.utils.randomInArr(this.emitRow.bossId);
          this.startEmitTimer(this.emitEnemy.bind(this, at, x, _), H + ht * (nt + 1));
        }
        this.nxtWaveCD = -1;
        this.startEmitTimer(function() {
          N >= F.waveCount ? F.onEmitEnded() : (F.nxtWaveCD = 5, F.startEmitTimer(F.emitNxtWave.bind(F, N), 5));
        }, U - 5 + H);
        this.energyRate = 1;
        this.coinRate = 1;
        for (var rt = 0; rt < this.emitRow.waveItem1Drop.length && !(N < this.emitRow.waveItem1Drop[rt]); rt += 2) this.energyRate = this.emitRow.waveItem1Drop[rt + 1];
        for (var et = 0; et < this.emitRow.waveItem2Drop.length && !(N < this.emitRow.waveItem2Drop[et]); et += 2) this.coinRate = this.emitRow.waveItem2Drop[et + 1];
        this.checkDropKt(N);
      }
      emitWaveMode7() {
        var v = 20, F = this, N = cc.pvz.runtimeData.wave + 1;
        this.waveLabel.string = "\u7b2c" + N + "/" + this.waveCount + "\u6ce2";
        var x = this.cal(N, this.emitRow.hp) * this.emitRow.baseHp, _ = this.cal(N, this.emitRow.atk) * this.emitRow.baseAtk, H = 0;
        if (N % this.emitRow.time3[0] == 0) {
          for (var z = this.emitRow.Mid[0], W = cc.math.randomRange(-Math.PI, Math.PI), G = 2 * Math.PI / v, J = this.eR2, K = 0; K < v; K++) this.emitEnemy(z, x, _, W + K * G, J);
          H += this.emitRow.time3[1];
        }
        for (var U = this.emitRow.waveTime[0], V = Math.min(this.emitRow.mCount[0] * N + this.emitRow.mCount[1], this.emitRow.mCount[2]), O = this.emitRow.mTime[0] / V, q = 0; q < V; q++) {
          var Q = cc.pvz.utils.randomInArr(this.emitRow.Mid);
          this.startEmitTimer(this.emitEnemy.bind(this, Q, x, _), H + q * O);
        }
        var j = this.emitRow.eliteWave;
        if ((N - j[0]) % j[1] == j[1] - 1) for (var Y = j[2] + this.getArrValueByWave(this.emitRow.eliteAdd, N), X = cc.math.randomRange(this.emitRow.eTime[0], this.emitRow.eTime[1]) / (Y + 1), tt = 0; tt < Y; tt++) {
          var it = cc.pvz.utils.randomInArr(this.emitRow.eliteId);
          this.startEmitTimer(this.emitEnemy.bind(this, it, x, _), H + X * (tt + 1));
        }
        var ct = this.emitRow.bossWave;
        if ((N - ct[0]) % ct[1] == 0) for (var st = ct[2], ht = cc.math.randomRange(this.emitRow.bTime[0], this.emitRow.bTime[1]) / (st + 1), nt = 0; nt < st; nt++) {
          var at = cc.pvz.utils.randomInArr(this.emitRow.bossId);
          this.startEmitTimer(this.emitEnemy.bind(this, at, x, _), H + ht * (nt + 1));
        }
        this.nxtWaveCD = -1;
        this.startEmitTimer(function() {
          N >= F.waveCount ? F.onEmitEnded() : (F.nxtWaveCD = 5, F.startEmitTimer(F.emitNxtWave.bind(F, N), 5));
        }, U - 5 + H);
        this.energyRate = 1;
        this.coinRate = 1;
        for (var rt = 0; rt < this.emitRow.waveItem1Drop.length && !(N < this.emitRow.waveItem1Drop[rt]); rt += 2) this.energyRate = this.emitRow.waveItem1Drop[rt + 1];
        for (var et = 0; et < this.emitRow.waveItem2Drop.length && !(N < this.emitRow.waveItem2Drop[et]); et += 2) this.coinRate = this.emitRow.waveItem2Drop[et + 1];
        this.checkDropKt(N);
      }
      emitWaveMode6() {
        var l = 20, x = this, _ = cc.pvz.runtimeData.wave + 1;
        this.waveLabel.string = "\u7b2c" + _ + "/" + this.waveCount + "\u6ce2";
        var H = this.cal(_, this.emitRow.hp) * this.emitRow.baseHp, z = this.cal(_, this.emitRow.atk) * this.emitRow.baseAtk;
        H *= 1 + this.eBuffValues[2];
        z *= 1 + this.eBuffValues[1];
        var W = 0;
        if (this.emitRow.time2[0].some(function(t) {
          return t == _;
        })) {
          for (var G = this.emitRow.Mid[0], J = cc.math.randomRange(-Math.PI, Math.PI), K = 2 * Math.PI / l, U = this.eR2, V = 0; V < l; V++) this.emitEnemy(G, H, z, J + V * K, U);
          W += this.emitRow.time2[1][0];
        }
        for (var O = this.emitRow.waveTime[0], q = Math.min(this.emitRow.mCount[0] * _ + this.emitRow.mCount[1], this.emitRow.mCount[2]), Q = this.emitRow.mTime[0] / q, j = 0; j < q; j++) {
          var Y = cc.pvz.utils.randomInArr(this.emitRow.Mid);
          this.startTimer(this.emitEnemy.bind(this, Y, H, z), W + j * Q);
        }
        var X = this.emitRow.eliteWave;
        if ((_ - X[0]) % X[1] == X[1] - 1) for (var tt = X[2] + this.getArrValueByWave(this.emitRow.eliteAdd, _), it = cc.math.randomRange(this.emitRow.eTime[0], this.emitRow.eTime[1]) / (tt + 1), ct = 0; ct < tt; ct++) {
          var st = cc.pvz.utils.randomInArr(this.emitRow.eliteId);
          this.startTimer(this.emitEnemy.bind(this, st, H, z), W + it * (ct + 1));
        }
        var ht = this.emitRow.bossWave;
        if ((_ - ht[0]) % ht[1] == 0) for (var nt = ht[2], at = cc.math.randomRange(this.emitRow.bTime[0], this.emitRow.bTime[1]) / (nt + 1), rt = 0; rt < nt; rt++) {
          var et = cc.pvz.utils.randomInArr(this.emitRow.bossId);
          this.startTimer(this.emitEnemy.bind(this, et, H, z), W + at * (rt + 1));
        }
        this.nxtWaveCD = -1;
        this.startTimer(function() {
          _ >= x.waveCount ? x.onEmitEnded() : (x.nxtWaveCD = 5, x.startTimer(x.emitNxtWave.bind(x, _), 5));
        }, O - 5 + W);
        this.energyRate = 1;
        this.coinRate = 1;
        for (var ot = 0; ot < this.emitRow.waveItem1Drop.length && !(_ < this.emitRow.waveItem1Drop[ot]); ot += 2) this.energyRate = this.emitRow.waveItem1Drop[ot + 1];
        for (var ut = 0; ut < this.emitRow.waveItem2Drop.length && !(_ < this.emitRow.waveItem2Drop[ut]); ut += 2) this.coinRate = this.emitRow.waveItem2Drop[ut + 1];
        this.checkDropKt(_);
      }
      showMode6Buffs() {
        var s = this;
        this.buffRoot.active || (this.buffRoot.active = true, this.buffNodes.forEach(function(t, i) {
          var o = cc.pvz.runtimeData.rBuffs[i], u = s.buffJsonFile.json.find(function(t) {
            return t.id == o;
          });
          cc.find("name", t).getComponent(cc.Label).string = u.name;
        }));
      }
      checkFinishWaveMission() {
        var s = cc.pvz.runtimeData.wave + 1, h = [ 10, 20, 30, 40, 50, 60, 70, 80 ].findIndex(function(t) {
          return t == s;
        });
        if (-1 != h) {
          var n = [ 501, 502, 503, 504, 505, 506, 507, 508 ][h];
          cc.pvz.PlayerData.increaseMissionProg(n, 1);
        }
      }
      doEnemyDropLogic(t) {
        var o = 40;
        if (0 == cc.pvz.runtimeData.mode || 6 == cc.pvz.runtimeData.mode || 7 == cc.pvz.runtimeData.mode) {
          var I = cc.v2(t.node[d], t.node[p]);
          if (t.energyRate > 0) {
            var D = Math.ceil(this.energyRate * t.energyRate);
            D > 0 && (this.addEnergy(D, I), I[p] += o);
          }
          var F = this.getSkill(18);
          if (F && Math.random() < 1e-4 * F.args[0] && (F.icon.showUseOnce(), this.addEnergy(F.args[1], this.getSkillIconPos(F), true)), 
          t.coinRate > 0) {
            var N = Math.ceil(this.coinRate * t.coinRate * (this.emitRow.baseGold + this.blessValues[0] + this.getTowerArgsP(8, 0, 0) + cc.pvz.runtimeData.coinRateF));
            N > 0 && (this.addCoin(N, I), I[p] += o);
          } else if (7 == cc.pvz.runtimeData.mode) {
            var x = Math.ceil((this.emitRow.baseCoin + this.coinRate) * (1 + this.getTowerArgsP(8, 0, 0)) * (1 + this.blessValues[0] + cc.pvz.runtimeData.coinRateF));
            x > 0 && (this.addCoin(x, I), I[p] += o);
          }
          var _ = this.getSkill(19);
          if (_ && Math.random() < 1e-4 * _.args[0]) {
            _.icon.showUseOnce();
            var H = _.args[1] * (1 + this.blessValues[0]);
            this.addCoin(H, this.getSkillIconPos(_));
          }
          if (t.diaRate > 0) {
            var z = Math.ceil(t.diaRate);
            z > 0 && (this.addDiamond(z, I), I[p] += o);
          }
          t.isBoss() && cc.pvz.runtimeData.wave + 1 < this.waveCount && this.dropBook(t.node.position);
          this.funcId >= 17 && t.isEliteOrBoss() && this.addTowerCoin(Math.random() < .5 ? 0 : 1, 1);
        }
      }
      startEmitTimer(t, i) {
        return this.startTimer(t, i, false, true);
      }
      startTimer(t, i, c, s) {
        return void 0 === c && (c = false), void 0 === s && (s = false), this.timerId++, 
        this.timers.push({
          id: this.timerId,
          loop: c,
          t1: 0,
          t2: i,
          cb: t,
          _r: 0,
          isE: s ? 1 : 0
        }), this.timerId;
      }
      removeTimer(t) {
        var s = this.timers.findIndex(function(i) {
          return i.id == t;
        });
        -1 != s && cc.js.array.fastRemoveAt(this.timers, s);
      }
      updateTimers(t) {
        for (var f = this.timers.map(function(t) {
          return t;
        }), v = 0; v < f.length; ) {
          var l = f[v];
          l.isE ? l.t1 += t * cc.pvz.runtimeData.ktSpeed : l.t1 += t;
          l.t1 >= l.t2 ? (l.cb && l.cb(), l.loop ? (l.t1 = 0, v++) : (f.splice(v, 1), l._r = 1)) : v++;
        }
        for (var d = 0; d < this.timers.length; ) this.timers[d]._r ? this.timers.splice(d, 1) : d++;
      }
      addBullet(t, i) {
        void 0 === i && (i = true);
        t.node.parent = this.bulletsRoot;
      }
      delBullet(t) {
        t.node.parent = null;
      }
      showAddHpNum(t) {
        var r = this.addHpPrefab.addNode(this.hero.hurtNumPos);
        cc.find("anim/num", r).getComponent(cc.Label).string = j + cc.pvz.utils.formatNumInGame(Math.floor(t));
        var e = r.getComponent(cc.Animation);
        e.once("finished", function() {
          r.parent = null;
        });
        e.play();
      }
      showHurtNum(t, i, c) {
        var u = 50, f = 25;
        if (!cc.player.noHurtNum) {
          var k = (1 == i ? this.hurtNumCPrefab : this.hurtNumPrefab).addNode(cc.v2(t[d] + cc.math.randomRange(-u, u), t[p] + cc.math.randomRange(-f, f)));
          cc.find("anim/num", k).getComponent(cc.Label).string = "-" + cc.pvz.utils.formatNumInGame(Math.floor(c));
          var b = k.getComponent(cc.Animation);
          b.once("finished", function() {
            k.parent = null;
          });
          b.play();
        }
      }
      showDodge(t) {
        var n = 50, a = 25;
        if (!cc.player.noHurtNum) {
          var o = this.dodgePrefab.addNode(cc.v2(t[d] + cc.math.randomRange(-n, n), t[p] + cc.math.randomRange(-a, a))), u = o.getComponent(cc.Animation);
          u.once("finished", function() {
            o.parent = null;
          });
          u.play();
        }
      }
      addHpBarFor(t, i) {
        var n = t.isEliteOrBoss() ? 1 : 0, a = this.enemyHpPrefabs[n].addNode(t.node.position);
        t.hpBar = a.getComponent(cc.ProgressBar);
        cc.find("bg", a).position = i;
      }
      onClickSpeed() {
        var r = 1e3, b = this, M = (cc.pvz.timeScaleLevel + 1) % this.maxTimeScaleLv;
        if (M == this.maxTimeScaleLv - 1 && this.unlockSpeedAni.node.active && (this.unlockSpeedAni.node.active = false), 
        0 == M && this.maxTimeScaleLv < 11) {
          if (!this.hasShowSpeedToast) {
            this.hasShowSpeedToast = true;
            var g = H.findIndex(function(t) {
              return t <= b.funcId;
            }), w = -1 == g ? H.length - 1 : g - 1, C = H[w], B = this.funcJsonFile.json.find(function(t) {
              return t.id == C;
            }), T = B.type2s, S = T % r, E = (T - S) / r, R = this.levelDataJsonFile.json.find(function(t) {
              return t.id == E;
            }).name;
            return void cc.popupManager.showToast("\u901a\u5173" + R + S + "\u6ce2 \u89e3\u9501 " + B.name);
          }
          this.hasShowSpeedToast = false;
        }
        cc.pvz.timeScaleLevel = M;
        cc.player.timeScaleLevel = M;
        this.updateSpeed();
      }
      updateSpeed() {
        cc.pvz.timeScale = G[cc.pvz.timeScaleLevel];
        cc.director.getScheduler().setTimeScale(cc.pvz.timeScale);
        var n = 1 + .5 * cc.pvz.timeScaleLevel;
        this.speedLabel.string = d + parseFloat(n.toFixed(1));
      }
      addMaxHp(t) {
        this.maxHp += t;
        this.addHp(t);
      }
      addHp(t) {
        var e = this;
        if (!(this.hp >= this.maxHp)) {
          this.hp = Math.min(this.maxHp, this.hp + t);
          var o = this.hp / this.maxHp;
          this.heroHpBar.node.active && (o >= .99 && this.heroHpBar.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function() {
            e.heroHpBar.progress >= .99 && (e.heroHpBar.node.active = false);
          }))), this.heroHpBar.progress = o);
        }
      }
      tryHurtBy(t, i) {
        var o = 1 - cc.pvz.runtimeData.props[J.DodgeChance] - this.suitDodge;
        return 6 == cc.pvz.runtimeData.mode && (o += this.eBuffValues[7]), (o = Math.max(.1, o)) >= 1 || Math.random() < o ? (this.hurtBy(t, i), 
        true) : (this.showDodge(this.heroRoot.position), this.onDodgeHappen(), false);
      }
      hurtBy(t, _i) {
        if (!(this.hasEnded || this.invinceTime > 0)) {
          var m = 1;
          cc.pvz.runtimeData.props[J.DamageReduction] > 0 && (m -= cc.pvz.runtimeData.props[J.DamageReduction] * (1 + cc.pvz.runtimeData.props[J.DamageReductionRate]));
          6 == cc.pvz.runtimeData.mode && (m += this.eBuffValues[3]);
          _i *= Math.max(.1, m);
          this.showHurtNum(this.hero.hurtNumPos, 0, _i);
          var k = this.useShield(t, _i);
          k <= 0 || (this.hp -= k, this.heroHpBar.progress = this.hp / this.maxHp, this.heroHpBar.node.active = true, 
          this.hero.spine.setAnimation(1, "hit", false), this.hp <= 0 && this.doGameEndedLogic(false));
        }
      }
      showWinUI() {
        var s = 6 == cc.pvz.runtimeData.mode ? "OverEquip" : "Over";
        cc.popupManager.popup("game", s, "UIGameOver", {
          scale: false
        }, this, 0);
      }
      showFailUI(i) {
        if (cc.pvz.timeScale = 1, cc.director.getScheduler().setTimeScale(1), cc.pvz.runtimeData.removeData(), 
        0 == cc.pvz.runtimeData.mode) {
          var b = ConfigCtrl_1.Datas.LevelInfo[cc.pvz.runtimeData.level];
          if (cc.pvz.PlayerData.refreshPatrolData(b), cc.pvz.runtimeData.level == cc.player.levelProg[0]) {
            var M = cc.pvz.runtimeData.wave;
            M > cc.player.levelProg[1] && (cc.player.levelProg[1] = M);
          }
          cc.pvz.PlayerData.saveData();
        } else if (7 == cc.pvz.runtimeData.mode) {
          if (cc.pvz.runtimeData.level == cc.player.goldLevelProg[0]) {
            var g = cc.pvz.runtimeData.wave;
            g > cc.player.goldLevelProg[1] && (cc.player.goldLevelProg[1] = g);
          }
          cc.pvz.PlayerData.saveData();
        }
        var w = 6 == cc.pvz.runtimeData.mode ? "OverEquip" : "Over";
        cc.popupManager.popup("game", w, "UIGameOver", {
          scale: false
        }, this, i ? 2 : 1);
      }
      showRevive(t) {
        var n = this;
        this.isPaused = false;
        this.reviveNode.zIndex = cc.macro.MAX_ZINDEX;
        var a = this.reviveNode.getComponent(sp.Skeleton);
        a.____game = true;
        cc.pvz.utils.doWhenSpineReady(a, function() {
          a.setAnimation(0, "fuhuo", false);
          a.setCompleteListener(function() {
            t > 0 ? (n.reviveNode.zIndex = cc.macro.MIN_ZINDEX, a.setAnimation(0, "wudi", true), 
            a.setCompleteListener(null)) : n.reviveNode.active = false;
          });
        });
      }
      onRevive(t, i) {
        var o = this;
        void 0 === i && (i = 1);
        this.hasEnded = false;
        this.invinceTime = t;
        this.maxHp = this.getMaxHp();
        this.hp = this.maxHp * i;
        this.heroHpBar.node.active = false;
        this.reviveNode ? (this.reviveNode.active = true, this.showRevive(t)) : cc.pvz.utils.useBundleAsset("game", "fuhuo", cc.Prefab, function(i) {
          var a = cc.instantiate(i);
          a.position = cc.Vec2.ZERO;
          a.parent = o.heroRoot;
          o.reviveNode = a;
          o.showRevive(t);
        });
        this.checkGameWin();
      }
      getPropValue(t) {
        switch (t) {
         case J.Atk:
          return this.getAtt();

         case J.MaxHp:
          return this.getMaxHp();

         case J.AtkSpeed:
          return this.getAttSpeed();

         case J.LifeSteal:
         case J.CritChance:
          break;

         case J.CritDamage:
          return cc.pvz.runtimeData.props[J.CritDamage] * (1 + 1e-4 * cc.pvz.runtimeData.props[J.CritDamageRate]);
        }
        return cc.pvz.runtimeData.props[t];
      }
      getAtt() {
        var n = cc.pvz.runtimeData.props[J.AtkRate] + this.blessValues[1];
        return this.hero && 2 == this.hero.skin && (n += this.getSkinArg()), cc.pvz.runtimeData.props[J.Atk] * (1 + 1e-4 * n);
      }
      getAttSpeed() {
        var n = cc.pvz.runtimeData.props[J.AtkSpeedRate];
        return n += this.getTowerArgs(5, 0, 0), cc.pvz.runtimeData.props[J.AtkSpeed] * (1 + 1e-4 * n);
      }
      getCritChance() {
        return cc.pvz.runtimeData.props[J.CritChance];
      }
      isCritHappen() {
        var c = 1e-4 * this.getCritChance();
        return 6 == cc.pvz.runtimeData.mode && (c -= this.eBuffValues[5]), c > 0 && Math.random() < c;
      }
      getCritDamage() {
        var s = this.getPropValue(J.CritDamage) + this.suitCrit;
        return 6 == cc.pvz.runtimeData.mode && (s = Math.max(1, s - this.eBuffValues[6])), 
        1e-4 * s;
      }
      getLifestealRate() {
        return 1e-4 * cc.pvz.runtimeData.props[J.LifeSteal];
      }
      getAtkCd() {
        var i = this.getPropValue(J.AtkSpeed);
        return 1 / Math.min(i, 25);
      }
      getMaxHp() {
        var n = cc.pvz.runtimeData.props[J.HpRate] + this.blessValues[2];
        return this.hero && 1 == this.hero.skin && (n += this.getSkinArg()), cc.pvz.runtimeData.props[J.MaxHp] * (1 + 1e-4 * n);
      }
      addHpOrHpRate(t, i) {
        var o = this.getMaxHp();
        cc.pvz.runtimeData.props[J.MaxHp] += t;
        cc.pvz.runtimeData.props[J.HpRate] += i;
        var u = this.getMaxHp() - o;
        this.addMaxHp(u);
        this.propNodes[J.MaxHp].fillValueLabels();
      }
      setBlessValue2(t) {
        var s = this.getMaxHp();
        this.blessValues[2] = t;
        var h = this.getMaxHp() - s;
        this.addMaxHp(h);
        this.propNodes[J.MaxHp].fillValueLabels();
      }
      addSkillInitValue(t, i) {
        switch (t) {
         case 1:
          this.addHpOrHpRate(0, i[2]);
          break;

         case 2:
          cc.pvz.runtimeData.props[J.LifeResume] += i[1];
          break;

         case 3:
          cc.pvz.runtimeData.props[J.AtkRate] += i[2];
          this.propNodes[J.Atk].fillValueLabels();
          break;

         case 4:
          cc.pvz.runtimeData.props[J.AtkSpeedRate] += i[2];
          this.propNodes[J.AtkSpeed].fillValueLabels();
          break;

         case 5:
          cc.pvz.runtimeData.props[J.DamageReductionRate] += 1e-4 * i[1];
          break;

         case 6:
          cc.pvz.runtimeData.props[J.CritChance] += i[1];
          this.propNodes[J.CritChance].fillValueLabels();
          break;

         case 7:
          cc.pvz.runtimeData.props[J.CritDamage] += i[2];
          this.propNodes[J.CritDamage].fillValueLabels();
          break;

         case 8:
          cc.pvz.runtimeData.props[J.LifeSteal] += i[1];
          this.propNodes[J.LifeSteal].fillValueLabels();
          break;

         case 9:
         case 10:
         case 11:
         case 12:
         case 13:
         case 14:
         case 15:
         case 17:
          cc.pvz.runtimeData.props[J.AtkRate] += i[2];
          this.propNodes[J.Atk].fillValueLabels();
          break;

         case 21:
         case 22:
         case 23:
         case 25:
         case 26:
         case 27:
          cc.pvz.runtimeData.props[J.AtkRate] += i[3];
          this.propNodes[J.Atk].fillValueLabels();
          break;

         case 18:
         case 19:
          this.addHpOrHpRate(0, i[2]);
          break;

         case 20:
          this.addHpOrHpRate(0, i[3]);
          break;

         case 16:
          cc.pvz.runtimeData.props[J.MultiShotRate] += 1e-4 * i[1];
          break;

         case 24:
          cc.pvz.runtimeData.props[J.RangePlus] += i[1];
          this.heroRangeNode.width = this.heroRangeNode.height = 2 * this.getZwRange();
          this.heroRangeCollider.radius = this.getZwRange();
        }
      }
      addSkillValue(t, i, c, s) {
        var E = s.map(function(t, i) {
          return t - c[i];
        }), R = i ? s : E;
        switch (t) {
         case 1:
          this.addHpOrHpRate(R[0], R[1] + E[2]);
          break;

         case 2:
          cc.pvz.runtimeData.props[J.LifeResume] += R[0] + E[1];
          break;

         case 3:
          cc.pvz.runtimeData.props[J.Atk] += R[0];
          cc.pvz.runtimeData.props[J.AtkRate] += R[1] + E[2];
          this.propNodes[J.Atk].fillValueLabels();
          break;

         case 4:
          cc.pvz.runtimeData.props[J.AtkSpeed] += R[0];
          cc.pvz.runtimeData.props[J.AtkSpeedRate] += R[1] + E[2];
          this.propNodes[J.AtkSpeed].fillValueLabels();
          break;

         case 5:
          cc.pvz.runtimeData.props[J.DamageReduction] += 1e-4 * R[0];
          cc.pvz.runtimeData.props[J.DamageReductionRate] += 1e-4 * E[1];
          break;

         case 6:
          cc.pvz.runtimeData.props[J.CritChance] += R[0] + E[1];
          this.propNodes[J.CritChance].fillValueLabels();
          break;

         case 7:
          cc.pvz.runtimeData.props[J.CritDamage] += R[0] + E[2];
          cc.pvz.runtimeData.props[J.CritDamageRate] += R[1];
          this.propNodes[J.CritDamage].fillValueLabels();
          break;

         case 8:
          cc.pvz.runtimeData.props[J.LifeSteal] += R[0] + E[1];
          this.propNodes[J.LifeSteal].fillValueLabels();
          break;

         case 9:
         case 10:
         case 11:
         case 12:
         case 13:
         case 14:
         case 15:
         case 17:
          cc.pvz.runtimeData.props[J.AtkRate] += E[2];
          this.propNodes[J.Atk].fillValueLabels();
          break;

         case 21:
         case 22:
         case 23:
         case 25:
         case 26:
         case 27:
          cc.pvz.runtimeData.props[J.AtkRate] += E[3];
          this.propNodes[J.Atk].fillValueLabels();
          break;

         case 18:
         case 19:
          this.addHpOrHpRate(0, E[2]);
          break;

         case 20:
          this.addHpOrHpRate(0, E[3]);
          break;

         case 16:
          cc.pvz.runtimeData.props[J.MultiShotChance] += R[0];
          cc.pvz.runtimeData.props[J.MultiShotRate] += 1e-4 * E[1];
          break;

         case 24:
          cc.pvz.runtimeData.props[J.RangePlus] += R[0] + E[1];
          this.heroRangeNode.width = this.heroRangeNode.height = 2 * this.getZwRange();
          this.heroRangeCollider.radius = this.getZwRange();
        }
      }
      addSkill(t, i, c, s) {
        var R = 0, y = 0, A = null, L = cc.pvz.runtimeData.skills.find(function(i) {
          return i.id == t;
        });
        if (L) {
          R = L.lv;
          y = L.exp + c;
          A = L.args;
        } else {
          var P = cc.player.skillInfo[t];
          R = P ? P[0] : 0;
          y = (P ? P[1] : 0) + c;
          A = R > 0 ? i.valu.map(function(t) {
            return t[R - 1];
          }) : new Array(i.valu.length).fill(0);
        }
        var I, D = 0;
        if (R == this.skillExpJsonFile.json.length + 1) D = 99999999; else if (R == this.skillExpJsonFile.json.length) D = 20; else {
          var F = R + 1;
          D = this.skillExpJsonFile.json.find(function(t) {
            return t.id == F;
          })["qua" + i.qua];
        }
        if (y >= D && (R++, y = 0), I = R == this.skillExpJsonFile.json.length + 1 ? i.lv11 : i.valu.map(function(t) {
          return t[R - 1];
        }), L) {
          L.lv != R && this.addSkillValue(t, false, A, I);
          L.lv = R;
          L.exp = y;
          L.args = I;
          L.icon.updateNodes();
        } else {
          var N = this.skillIconPrefab.addNode().getComponent("SkillIcon");
          if (this.addSkillValue(t, true, A, I), cc.pvz.runtimeData.skills.push({
            id: t,
            lv: R,
            exp: y,
            args: I,
            icon: N,
            json: i
          }), cc.pvz.runtimeData.skills.length >= 10) {
            var x = cc.pvz.runtimeData.skills.map(function(t) {
              return t.json;
            });
            this.skillWeights = cc.pvz.utils.normalizeWeights(x, "BatOdds");
          }
          N.initBy(this, t, s);
        }
      }
      learnSkill(t, i) {
        if (this.addSkill(t, i, 1, false), this.skillDrops.length > 0) {
          var h = this.skillDrops[0];
          this.onClickFallenSkill2(h);
        }
      }
      getSkill(t) {
        return cc.pvz.runtimeData.skills.find(function(i) {
          return i.id == t;
        });
      }
      getMultiShotRate() {
        return cc.pvz.runtimeData.props[J.MultiShotChance] > 0 && Math.random() < 1e-4 * cc.pvz.runtimeData.props[J.MultiShotChance] ? cc.pvz.runtimeData.props[J.MultiShotRate] : 0;
      }
      addPlane(t) {
        var n = 100, a = 180, o = this, u = 72 * this.planeCounter, f = this.heroRoot.position, v = cc.v2(f[d] + n * Math.cos(u * Math.PI / a), f[p] + n * Math.sin(u * Math.PI / a));
        this.planeCounter++;
        cc.pvz.utils.useBundleAsset("game", "plane/FJ1", cc.Prefab, function(i) {
          var n = cc.instantiate(i);
          n.parent = o.objsRoot;
          n.position = v;
          n.getComponent("GamePlane").initBy(o, t);
        });
      }
      isInPlaneRect(t) {
        return this.planeRect.contains(t);
      }
      checkOpenTower() {
        0 != cc.pvz.runtimeData.mode && 6 != cc.pvz.runtimeData.mode && 7 != cc.pvz.runtimeData.mode || this.towerNodes.forEach(function(t) {
          return t.active = !t.active;
        });
      }
      testAddEnergy() {
        this.addEnergy(5e6);
      }
      testDropSkill() {
        var i = 300, h = this.skillDropPrefab.addNode(cc.v2(cc.math.randomRange(-i, i), cc.math.randomRange(-i, i)));
        this.skillDrops.push(h);
      }
      testSkillUI() {
        cc.popupManager.popup("game", "skills", "GameTestSkills", {
          scale: false
        }, this);
      }
      testSkinUI() {
        cc.popupManager.popup("game", "skins", "GameTestSkins", {
          scale: false
        }, this);
      }
      testUsingSkin(t) {
        this.hero && (this.hero.node.destroy(), this.hero = null);
        this.useSkin(t);
      }
      testOpenTower() {
        this.checkOpenTower();
      }
      testAddRed() {
        this.addTowerCoin(0, 10);
      }
      testAddBlue() {
        this.addTowerCoin(1, 10);
      }
      testPause() {
        this.isPaused = !this.isPaused;
      }
      testWin() {
        cc.pvz.runtimeData.wave = this.waveCount - 1;
        this.doGameEndedLogic(true);
      }
      testDie() {
        this.hurtBy(null, 11 * this.hp);
      }
      showFloatPercent(t) {
        return parseFloat((t / 100).toFixed(2)) + ct;
      }
      testGM() {
        require("../main/MyRequest").default.userInfo.access >= 90 && (this.testRoot.active = !this.testRoot.active, 
        cc.find("atk", this.testRoot).getComponent(cc.Label).string = cc.pvz.runtimeData.props[J.Atk], 
        cc.find("atk-up", this.testRoot).getComponent(cc.Label).string = this.showFloatPercent(cc.pvz.runtimeData.props[J.AtkRate] + this.blessValues[1]), 
        cc.find("hp", this.testRoot).getComponent(cc.Label).string = cc.pvz.runtimeData.props[J.MaxHp], 
        cc.find("hp-up", this.testRoot).getComponent(cc.Label).string = this.showFloatPercent(cc.pvz.runtimeData.props[J.HpRate] + this.blessValues[2]));
      }
      saveData() {
        if (0 == cc.pvz.runtimeData.mode || 6 == cc.pvz.runtimeData.mode || 7 == cc.pvz.runtimeData.mode) {
          if (6 == cc.pvz.runtimeData.mode && cc.pvz.runtimeData.mode6Sta > 0) {
            if (!cc.pvz.PlayerData.staminaValue(-cc.pvz.runtimeData.mode6Sta)) return void this.doGameEndedLogic(false);
            cc.pvz.PlayerData.saveData();
            cc.pvz.runtimeData.mode6Sta = 0;
          }
          cc.pvz.runtimeData.name = this.nameLabel.string;
          cc.pvz.runtimeData.bookCount = this.skillDrops.length;
          cc.pvz.runtimeData.saveData();
        }
      }
      isSkillLvMax(t) {
        var c = this.getSkill(t);
        return !!c && 11 == c.lv;
      }
      randomSkills() {
        var f = new Array(3).fill(null);
        if (1 == cc.pvz.runtimeData.level && 0 == cc.pvz.runtimeData.skills.length) {
          var v = Math.random() < .5 ? 9 : 11, l = this.skillJsonFile.json.find(function(t) {
            return t.id == v;
          });
          f[0] = l;
        }
        if (7 == cc.pvz.runtimeData.mode && !this.isSkillLvMax(19)) {
          var d = this.skillJsonFile.json.find(function(t) {
            return 19 == t.id;
          });
          f[cc.math.randomRangeInt(0, 3)] = d;
        }
        for (var p = null, m = 0; m < 3; m++) if (!f[m]) {
          do {
            p = cc.pvz.utils.randomFrom(this.skillWeights);
          } while (f.some(function(t) {
            return t && t.id == p.id;
          }) || this.isSkillLvMax(p.id));
          f[m] = p;
        }
        return f;
      }
      onClickFallenSkill2(t) {
        cc.popupManager.popup("game", "getSkill", "UIGameBuff", {
          scale: false
        }, this, this.randomSkills());
        var r = this.skillDrops.findIndex(function(i) {
          return i == t;
        });
        this.skillDrops.splice(r, 1);
        t.parent = null;
        this.saveData();
      }
      onClickFallenSkill(t) {
        this.hasEnded || this.onClickFallenSkill2(t.target);
      }
      showSkillInfo(t) {
        this.skillInfoPanel.active = true;
        this.skillInfoPanel.getComponent("UIGameBuffItem").fillNodes(this, false, t.json, t.lv, t.exp);
      }
      newBulletTo(t, i, c, s, h) {
        var o = s.node.position.add(s.aimPos), u = cc.pvz.utils.getRotationRadians(c, o), f = i.addNode(c), v = f.getComponent(Bullet_1.default);
        if (!v) {
          v = f.addComponent(Bullet_1.default);
          v.collider = f.getComponent(cc.Collider);
          v.spine = f.getComponent(sp.Skeleton) || f.getComponentInChildren(sp.Skeleton);
          v.opSound = null;
          v.hitSounds = [];
        }
        return v.fixedRotation || (f.angle = 180 * u / Math.PI), v.initBy(this, t, h, u), 
        this.addBullet(v), v;
      }
      newBounceBullet(t, i, c, s, h, n, a) {
        var e = new Set();
        e.add(s);
        this.newBounceBullet2(t, i, c, e, h, n, a);
      }
      newBounceBullet2(t, i, c, s, h, n, a) {
        var f = this, v = this.findEnemyExclude(c, 16e4, s);
        if (v) {
          var l = v.node.position.add(v.aimPos), d = t.addNode(c).getComponent(sp.Skeleton);
          cc.pvz.utils.doWhenSpineReady(d, function() {
            cc.pvz.utils.IKToWorldPos(d, v.node.convertToWorldSpaceAR(v.aimPos));
            d.setAnimation(0, i, false);
            d.setEventListener(function() {
              var u = h * n;
              f.hero.doBulletAttLogic({
                fixedAtt: u,
                isNear: false,
                node: {
                  angle: 0
                },
                numType: 0,
                onHitWith: function() {}
              }, v);
              a > 1 && (s.add(v), f.newBounceBullet2(t, i, l, s, u, n, a - 1));
              f.showHitEffect(l, "skl11_hit");
            });
          });
        }
      }
      newScatterBullet(t, i, c, s, h) {
        for (var d = 60 / (h - 1), p = t.node.angle - 30, m = 0; m < h; m++) {
          var k = this.zdSkill15Prefab.addNode(t.node.position);
          k.angle = p + d * m;
          var b = k.angle * Math.PI / 180, M = k.getComponent("Bullet");
          M.fixedAtt = s;
          M.numType = c;
          M.initBy(this, t.a, t.isNear, b);
          M.excludeEnemy = i;
          this.addBullet(M);
        }
      }
      onClickTower(_t, i) {
        var e = parseInt(i);
        this.towerPopup.node.active = true;
        this.towerPopup.node.position = this.towerPosNodes[e].position.add(cc.v2(0, 110));
        this.towerPopup.initBy(this, e);
        this.towerTeamInfo.active = false;
      }
      newTower(t, i) {
        var a = cc.instantiate(this.towerPrefabs[t]);
        a.position = this.towerPosNodes[i].position;
        a.parent = this.objsRoot;
        var r = a.getComponent("GameTower");
        return r.initBy(this, i, t + 1), r;
      }
      addOrLvupTower(t, i) {
        if (cc.pvz.runtimeData.towerCoin[t] < 10) cc.popupManager.showToast("\u4e0d\u8db3"); else {
          this.costTowerCoin(t, 10);
          this.towerCanPlaceNodes[i] && (this.towerCanPlaceNodes[i].destroy(), this.towerCanPlaceNodes[i] = null);
          var k = true, b = cc.pvz.runtimeData.towers[i];
          b ? b.id != t ? (b.id = t, b.t.node.destroy(), b.t = this.newTower(t, i), this.buyTowerPanel.active = false) : (b.lv++, 
          b.t.lvup(), k = false) : (cc.pvz.runtimeData.towers[i] = {
            id: t,
            lv: 1
          }, cc.pvz.runtimeData.towers[i].t = this.newTower(t, i), this.buyTowerPanel.active = false);
          k && !cc.pvz.runtimeData.towers.some(function(t) {
            return !t;
          }) && this.checkTowerTeam();
        }
      }
      checkTowerTeam() {
        var C = this;
        this.towerZhenNode.active = true;
        this.towerTeamBtnNode.active = true;
        this.towerTeamInfo.active = false;
        var B = this.getTowerTeamId(), T = cc.pvz.runtimeData.towers.map(function(t) {
          return t.id + 1;
        }), S = this.towerTeamJsonFile.json.find(function(t) {
          return t.position.every(function(t, i) {
            return t == T[i];
          });
        });
        this.towerTeamRow = S;
        this.towerTeamSp.setAnimation(1, "z" + S.id, true);
        var E = this.towerTeamSp.setAnimation(0, "start", false);
        switch (this.towerTeamSp.setTrackCompleteListener(E, function() {
          C.towerTeamSp.setAnimation(0, "loop", true);
        }), cc.pvz.utils.setSpriteFrame(this.towerTeamIcon, "image", "team/FansTeam" + S.id), 
        this.towerTeamRow.id) {
         case 3:
         case 7:
          this.towerTeamInterval = 1;
          break;

         case 4:
          this.towerTeamInterval = this.getTowerArgs(4, 0, 1);
        }
        5 != this.towerTeamRow.id && 5 != B || (this.propNodes[J.AtkSpeed].fillValueLabels(), 
        this.atkCd = this.getAtkCd());
        cc.pvz.PlayerData.increaseMissionProg(901, 1);
        var R = this.towerTeamRow.id - 1;
        0 == cc.player.towerInfo.set[R] && (cc.player.towerInfo.set[R] = 1, cc.pvz.PlayerData.saveData(), 
        cc.pvz.PlayerData.increaseMissionProg(911 + R, 1));
      }
      getTowerTeamId() {
        return this.towerTeamRow ? this.towerTeamRow.id : 0;
      }
      getTowerArgs(t, i, c) {
        if (this.getTowerTeamId() != t) return c;
        var e = this.towerTeamRow.id - 1;
        if (0 == cc.player.towerInfo.set[e]) return c;
        var o = cc.player.towerInfo.set[e];
        return this.towerTeamRow.valu[i][o - 1];
      }
      getTowerArgsP(t, i, c) {
        if (this.getTowerTeamId() != t) return c;
        var e = this.towerTeamRow.id - 1;
        if (0 == cc.player.towerInfo.set[e]) return c;
        var o = cc.player.towerInfo.set[e];
        return 1e-4 * this.towerTeamRow.valu[i][o - 1];
      }
      getSkinArg() {
        if (this.hero) {
          var c = cc.player.skinProLv[this.skinJson.id], s = c ? c[0] : 0;
          return this.skinJson.otherLv[s];
        }
        return 0;
      }
      usePoolPrefab(t, _i) {
        this.prefabs || (this.prefabs = {});
        var n = t.name;
        if (this.prefabs[n]) return this.prefabs[n];
        var a = new cc.Node(n);
        a.parent = this.prefabInfoRoot;
        var r = a.addComponent("PrefabInfo");
        return this.prefabs[n] = r, r;
      }
      showHitEffect(t, i, c, s, h) {
        var o = "ended";
        if (c || !cc.player.noHitEff) {
          var u = s ? this.hitEffPrefab.addNodeTo(s, t) : this.hitEffPrefab.addNode(t);
          u.getComponent(sp.Skeleton).setAnimation(0, i, false);
          c ? u.once(o, c) : u.off(o);
          u.angle = null != h ? h : 0;
        }
      }
      showDieEffect(t, i, c) {
        var f = Math.random() < .5 ? 1 : 2, v = this.dieEffPrefab.addNode(t);
        v.scaleX = c;
        v.scaleY = Math.abs(c);
        v.zIndex = -v[p];
        var l = v.getComponent(sp.Skeleton);
        if (l.setAnimation(0, i + f, false), 2 == f) {
          var m = cc.math.randomRange(-Math.PI, Math.PI), k = cc.math.randomRange(100, 500), b = cc.v2(Math.cos(m) * k, Math.sin(m) * k);
          cc.pvz.utils.IKtoLocalPos(l, b[d], b[p]);
        }
      }
      showTeamInfo() {
        var e = this;
        this.towerTeamInfo.active = true;
        var o = this.towerTeamRow.id - 1, u = cc.player.towerInfo.set[o], f = cc.pvz.utils.formatStr(this.towerTeamRow.desc, this.towerTeamRow.valu.map(function(t, i) {
          var a = 1 == e.towerTeamRow.percent[i] ? t[u - 1] / 100 : t[u - 1];
          return 1 == e.towerTeamRow.percent[i] && (a = parseFloat(a.toFixed(2)) + ct), "<color=" + e.towerTeamRow.color + ">" + a + "</c>";
        }));
        cc.find("desc", this.towerTeamInfo).getComponent(cc.RichText).string = "<outline color=#000000 width=2>" + f + "</outline>";
      }
      onClickTempBuffs() {
        cc.popupManager.popup("lobby", "subwindowPre/blessing", "AdBuffWindow", {
          scale: false,
          showModal: true,
          opacity: 0
        });
      }
      onClickBack() {
        cc.popupManager.popup("game", "Back", "UIGameBack", {
          scale: false
        }, this);
      }
      fillBlessItems() {
        for (var i = 0; i < 3; i++) this.fillBlessItem(i);
      }
      fillBlessItem(i) {
        var w = cc.player.ADBattleBuff[i], C = this.blessBtns[i];
        if (1e3 * w.tillTime > Date.now()) {
          var B = ConfigCtrl_1.Datas.ADBattleBuffData[w.getLv].eqParm;
          switch (C.valueLabel.string = B / 100 + "%", C.valueLabel.node.active = true, C.dot.active = false, 
          i) {
           case 0:
            this.blessValues[i] = B / 1e4;
            break;

           case 1:
            this.blessValues[i] = B;
            this.propNodes[J.Atk].fillValueLabels();
            break;

           case 2:
            this.setBlessValue2(B);
          }
          var T = cc.assetManager.internal.get("materials/builtin-2d-sprite", cc.Material);
          C.icon.setMaterial(0, T);
        } else {
          C.valueLabel.node.active = false;
          this.blessValues[i] = [ 0, 0, 0 ][i];
          var S = cc.assetManager.internal.get("materials/builtin-2d-gray-sprite", cc.Material);
          C.icon.setMaterial(0, S);
        }
      }
      showBlessDots() {
        this.blessBtns.forEach(function(t) {
          return t.dot.active = true;
        });
      }
      hideBlessDots() {
        this.blessBtns.forEach(function(t) {
          return t.dot.active = false;
        });
      }
      onEnemyEnterRange(t) {
        if (this.towerTeamRow && 0 != t.tag) {
          var n = t.getComponent("Enemy");
          if (n) {
            switch (this.towerTeamRow.id) {
             case 2:
              n.slowDown(1, 1 - this.getTowerArgsP(2, 0, 0));
              break;

             case 6:
              var a = this.getTowerArgsP(6, 0, 0);
              n.hurtBy(this, n.maxHp * a, 0);
            }
            n.inBattleField = true;
          }
        }
      }
      getLevelWave() {
        var r = 1, e = 0;
        return 0 != cc.pvz.runtimeData.mode || cc.pvz.runtimeData.level < cc.player.levelProg[0] ? (r = cc.player.levelProg[0], 
        e = cc.player.levelProg[1]) : cc.pvz.runtimeData.level == cc.player.levelProg[0] ? (r = cc.pvz.runtimeData.level, 
        e = Math.max(cc.pvz.runtimeData.wave + 1, cc.player.levelProg[1])) : (r = cc.pvz.runtimeData.level, 
        e = cc.pvz.runtimeData.wave + 1), 1e3 * r + e;
      }
      getFuncId() {
        for (var h = this.funcJsonFile.json.length, n = 0; n < h && !(this.maxLevelWave < this.funcJsonFile.json[n].type2s); n++) ;
        return this.funcJsonFile.json[n - 1].id;
      }
      initFunc() {
        this.maxLevelWave = this.getLevelWave();
        this.funcId = this.getFuncId();
      }
      checkFuncs() {
        var e = this.getLevelWave();
        if (e > this.maxLevelWave) {
          this.maxLevelWave = e;
          var o = this.getFuncId();
          if (o > this.funcId) {
            this.funcId = o;
            if (this.updateMaxSpeed(), this.maxTimeScaleLv > this.maxTimeScaleLv) {
              var f = .5 + .5 * this.maxTimeScaleLv;
              this.maxSpeedLabel.string = f + "\u500d\u901f";
              this.unlockSpeedAni.node.active = true;
              this.unlockSpeedAni.play();
            }
          }
        }
      }
      updateMaxSpeed() {
        var c = this;
        this.maxTimeScaleLv = 4;
        var s = H.findIndex(function(t) {
          return c.funcId >= t;
        });
        -1 != s && (this.maxTimeScaleLv = z[s]);
      }
      guidePropLvup(t) {
        var i = this;
        setTimeout(function() {
          i.fingerSp.node.active = true;
          var r = i.propNodes[t].btnNode.convertToWorldSpaceAR(cc.v2(16, -31)), e = i.fingerSp.node.parent.convertToNodeSpaceAR(r);
          i.fingerSp.node.position = e;
        });
      }
      onNiuCollisionEnter(t, i) {
        this.hero.onNiuCollisionEnter(t, i);
      }
      checkMode6Chance(t) {
        if (6 != cc.pvz.runtimeData.mode) return false;
        var s = this.eBuffValues[t];
        return !(s <= 0) && Math.random() < s;
      }
      fillWaveLabels() {
        this.waveLabel.string = "\u7b2c" + wave1 + "/" + this.waveCount + "\u6ce2";
      }
      onClickBuff(t, i) {
        var r = parseInt(i), e = cc.pvz.runtimeData.rBuffs[r], o = this.buffJsonFile.json.find(function(t) {
          return t.id == e;
        });
        this.buffInfoName.string = o.name;
        this.buffInfoDesc.string = o.desc;
        this.buffInfoPanel.active = true;
      }
      fillBuffBoxInfo() {
        if (this.HAS_EQUIP) {
          var s = Math.floor(cc.pvz.runtimeData.wave / 5) * cc.player.equips.levelRate;
          this.itemCountLabels[5].string = s;
        }
      }
      dropBook(t) {
        var n = 100, a = this.heroRoot.position;
        if (t.sub(a).lengthSqr() > 1e4) {
          var r = cc.pvz.utils.getRotationRadians(a, t);
          t = cc.v2(a[d] + n * Math.cos(r), a[p] + n * Math.sin(r));
        }
        var e = this.skillDropPrefab.addNode(t);
        this.skillDrops.push(e);
      }
      dropKt(t, i) {
        var s = this;
        cc.pvz.utils.useBundleAsset("game", "kt", cc.Prefab, function(c) {
          var f = 270, l = s.heroRoot.position, m = cc.math.randomRange(-Math.PI, 0), k = cc.instantiate(c);
          k.parent = s.skillDropPrefab.root;
          k.position = cc.v2(l[d] + f * Math.cos(m), l[p] + f * Math.sin(m));
          k.getComponent("GameDropKt").initBy(s, t);
          s.ktId = t;
          s.ktNode = k;
          s.ktBtnRoot.active = true;
          s.ktTimeLabel.string = cc.pvz.utils.formatSeconds3(i);
          s.ktTime = i;
        });
      }
      removeDropKt() {
        this.ktBtnRoot.active && (this.ktBtnRoot.active = false, this.ktNode.destroy(), 
        this.ktNode = null);
      }
      enableKt(t, i) {
        var a = 30;
        switch (t) {
         case 1:
          cc.pvz.runtimeData.ktSpeed = 1 + 1e-4 * i;
          this.ktBuffNodes[0].active = true;
          break;

         case 2:
         case 3:
          cc.pvz.runtimeData.ktCoinRate = 1 + 1e-4 * i;
          this.ktBuffNodes[1].active = true;
          break;

         case 4:
          var v = cc.pvz.runtimeData.props[0];
          this.addEnergy(v * i, this.hero.addEnergyPos);
          break;

         case 5:
          this.addTowerCoin(0, a);
          this.addTowerCoin(1, a);
        }
        this.removeDropKt();
      }
      onClickKtBtn() {
        cc.popupManager.popup("game", "KongTou", "UIGameKt", {
          scale: false
        }, this, this.ktId, this.ktNode);
      }
      getSuitValue(t, i) {
        var s = null;
        return this.suitFlags[t] && this.suitFlags[t][0] ? s = this.suitFlags[t][1] : this.suitFlags[i] && this.suitFlags[i][0] && (s = this.suitFlags[i][1]), 
        s;
      }
      addSuitDodge() {
        var c = this.getSuitValue(9, 1);
        c && (this.suitDodgeLayer < c[2] && (this.suitDodgeLayer++, this.suitDodge += 1e-4 * c[0]), 
        this.suitDodgeEndTime = c[1]);
      }
      updateSuitDodge(t) {
        this.suitDodgeLayer <= 0 || (this.suitDodgeEndTime -= t, this.suitDodgeEndTime <= 0 && (this.suitDodgeLayer = 0, 
        this.suitDodge = 0, this.suitDodgeEndTime = 0));
      }
      onDodgeHappen() {
        var s = this.getSuitValue(10, 2);
        s && (this.suitThurderTime > 0 || (this.suitThurderTime = 400, this.newBounceBullet(this.zdSuit1Prefab, "ZB_skill1", this.heroRoot.position, null, 14 * this.getAtt() * 1e-4, 1, 118)));
      }
      trySecKill(t, i) {
        var h = this.getSuitValue(11, 3);
        if (h) {
          var n = 1e-4 * h[0];
          if (Math.random() < n) return [ 1, i.isBoss() ? (h[1] + 1) * t : i.hp ];
        }
        return [ 0, t ];
      }
      onSecKillHappen(t) {
        var h = this.getSuitValue(12, 4);
        h && (this.suitCritLayer < h[2] && (this.suitCritLayer++, this.suitCrit += h[0]), 
        this.suitCritEndTime = h[1], this.showHitEffect(t.node.position, "ZB_skill2"));
      }
      updateSuitCrit(t) {
        this.suitCritLayer <= 0 || (this.suitCritEndTime -= t, this.suitCritEndTime <= 0 && (this.suitCritLayer = 0, 
        this.suitCrit = 0, this.suitCritEndTime = 0));
      }
      onEnemyDie() {
        var h = this, n = this.getSuitValue(13, 5);
        if (n && (this.suitKillCount++, this.suitKillCount % n[0] == 0)) if (this.birdsRoot) for (var a = 0; a < n[1]; a++) this.birdsRoot.addBird(); else cc.pvz.utils.useBundleAsset("game", "suit3birds", cc.Prefab, function(t) {
          var a = cc.instantiate(t);
          a.parent = h.heroRoot;
          var r = a.getComponent("GameBirds");
          r.initBy(h, 1e-4 * n[2], n[3]);
          h.birdsRoot = r;
          for (var e = 0; e < n[1]; e++) h.birdsRoot.addBird();
        });
      }
      addShield(t, i) {
        var r = "shield", o = this;
        this.shield = Math.min(this.shield + t, i * this.maxHp);
        this.shieldSpine ? this.shieldSpine.node.parent.active = true : cc.pvz.utils.useBundleAsset("game", r, cc.Prefab, function(t) {
          var h = cc.instantiate(t);
          h.parent = o.heroRoot;
          o.shieldSpine = cc.find("spine", h).getComponent(sp.Skeleton);
        });
      }
      resumeHp(t) {
        this.addHp(t);
        var c = this.getSuitValue(16, 8);
        c && this.addShield(1e-4 * c[0] * t, 1e-4 * c[1]);
      }
      updateSuitShield(t) {
        var s = this.getSuitValue(15, 7);
        s && (this.shieldTime += t, this.shieldTime >= 118 && (this.shieldTime = 0, this.addShield(.04 * this.maxHp, .25)));
      }
      useShield(t, i) {
        if (this.shield > 0) {
          this.shieldSpine && this.shieldSpine.setAnimation(1, "ZB_skill4_hit", false);
          var f = this.getSuitValue(15, 7);
          if (f) {
            var v = cc.pvz.runtimeData.props[J.DamageReflect] * f[3] * 1e-4;
            t.hurtBy({
              isNear: false,
              dieType: 0,
              node: {
                angle: 0
              }
            }, i * v, 0);
          }
          var l = Math.min(i, this.shield);
          i -= l;
          this.shield -= l;
          this.shield <= 0 && this.shieldSpine && (this.shieldSpine.node.parent.active = false);
        }
        return i;
      }
    };
    __decorate([ property ], Game.prototype, "HAS_TOWER", void 0);
    __decorate([ property ], Game.prototype, "CAN_LVUP", void 0);
    __decorate([ property ], Game.prototype, "HAS_EQUIP", void 0);
    __decorate([ property ], Game.prototype, "HAS_KT", void 0);
    __decorate([ property(cc.Sprite) ], Game.prototype, "bg1Sp", void 0);
    __decorate([ property(cc.Sprite) ], Game.prototype, "bg2Sp", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "lockNode", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "skillNode0", void 0);
    __decorate([ property ], Game.prototype, "itemCountLabels", void 0);
    __decorate([ property(cc.Label) ], Game.prototype, "nameLabel", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "maxWaveRoot", void 0);
    __decorate([ property(cc.Label) ], Game.prototype, "maxWaveLabel", void 0);
    __decorate([ property(cc.Label) ], Game.prototype, "waveLabel", void 0);
    __decorate([ property(cc.Label) ], Game.prototype, "speedLabel", void 0);
    __decorate([ property(cc.Animation) ], Game.prototype, "unlockSpeedAni", void 0);
    __decorate([ property(cc.Label) ], Game.prototype, "maxSpeedLabel", void 0);
    __decorate([ property ], Game.prototype, "propNodes", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "propAddEff", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "propLockRoot", void 0);
    __decorate([ property(cc.Label) ], Game.prototype, "propLockLabel", void 0);
    __decorate([ property(sp.Skeleton) ], Game.prototype, "lvupSpine", void 0);
    __decorate([ property(sp.Skeleton) ], Game.prototype, "fingerSp", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "heroRoot", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "heroRangeNode", void 0);
    __decorate([ property(cc.CircleCollider) ], Game.prototype, "heroRangeCollider", void 0);
    __decorate([ property(cc.Collider) ], Game.prototype, "niuCollider", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "kickoffRangeNode", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "objsRoot", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "bulletsRoot", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "buffsBackRoot", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "buffsForeRoot", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "enemyCircleNode", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "planeRangeNode", void 0);
    __decorate([ property(cc.ProgressBar) ], Game.prototype, "heroHpBar", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "addEnergyPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "addCoinPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "addDiamondPrefab", void 0);
    __decorate([ property ], Game.prototype, "enemyHpPrefabs", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "hurtNumPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "hurtNumCPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "addHpPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "dodgePrefab", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "levelDataJsonFile", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "skillDropPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "skillIconPrefab", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "skillJsonFile", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "skillExpJsonFile", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "skillInfoPanel", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "zdSkill11Prefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "zdSkill15Prefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "hitEffPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "dieEffPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "slowPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "dizzyPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "zdThurderPrefab", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "prefabInfoRoot", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "buyTowerPanel", void 0);
    __decorate([ property ], Game.prototype, "towerPrefabs", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "towerZhenNode", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "towerTeamBtnNode", void 0);
    __decorate([ property(sp.Skeleton) ], Game.prototype, "towerTeamSp", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "towerTeamJsonFile", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "towerTeamInfo", void 0);
    __decorate([ property(cc.Sprite) ], Game.prototype, "towerTeamIcon", void 0);
    __decorate([ property ], Game.prototype, "towerPosNodes", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "towerCanPlace", void 0);
    __decorate([ property(GameTowerUI_1.default) ], Game.prototype, "towerPopup", void 0);
    __decorate([ property ], Game.prototype, "blessBtns", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "testRoot", void 0);
    __decorate([ property ], Game.prototype, "towerNodes", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "buffRoot", void 0);
    __decorate([ property ], Game.prototype, "buffNodes", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "buffJsonFile", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "buffInfoPanel", void 0);
    __decorate([ property(cc.Label) ], Game.prototype, "buffInfoName", void 0);
    __decorate([ property(cc.Label) ], Game.prototype, "buffInfoDesc", void 0);
    __decorate([ property ], Game.prototype, "suitNodes", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Game.prototype, "zdSuit1Prefab", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "equipJsonFile", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "equipPropJsonFile", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "equipSuitJsonFile", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "planeJsonFile", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "planeLvJsonFile", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "funcJsonFile", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "skinJsonFile", void 0);
    __decorate([ property(cc.Node) ], Game.prototype, "ktBtnRoot", void 0);
    __decorate([ property(cc.Label) ], Game.prototype, "ktTimeLabel", void 0);
    __decorate([ property(cc.JsonAsset) ], Game.prototype, "ktJsonFile", void 0);
    __decorate([ property ], Game.prototype, "ktBuffNodes", void 0);
    Game = __decorate([ ccclass ], Game);
    exports.default = Game;
    cc._RF.pop();
  }, {
    "../lobby/ConfigCtrl": "ConfigCtrl",
    "../main/MyRequest": "MyRequest",
    "../main/PrefabInfo": "PrefabInfo",
    "./Bullet": "Bullet",
    "./GameTowerUI": "GameTowerUI",
    "./PropNode": "PropNode"
  } ],
  GetItemWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "73471ojxEtOVbYzebdDHy8R", "GetItemWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const ItemIcon_1 = require("./ItemIcon");
    const Tool_1 = require("./Tool");
    const h = require("./SubwindowManager");
    var w;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var v = 0;
    let GetItemWindow = class GetItemWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.iiContainer = null;
        this.iiGridContainer = null;
        this.iiPre = null;
      }
      init() {}
      show(c) {
        var t;
        if (t = this, void 0 === c && (c = {
          items: [],
          showFlyTo: 0
        }), console.log("===>", "open getitem"), this.state = 0, this.tCount = 0, this.timeoutHandles = [], 
        c.items.length <= 12) {
          this.iiContainer.active = true;
          this.iiGridContainer.active = false;
          this.iiContainer.children.map(function(c) {
            return c.active = false;
          });
          for (var _ = function(i) {
            var a = Tool_1.default.getPrefab(p.iiContainer, p.iiPre, "i" + i / 3).getComponent(ItemIcon_1.default);
            a.init(c.items[i], c.items[i + 1], c.items[i + 2]);
            a.hide();
            p.timeoutHandles.push({
              t: 1 + i / 3 * 150,
              cb: function() {
                a.showAnim();
                i + c.items.length === 3 && (t.state = 1);
              }
            });
          }, p = this, w = 0; w < c.items.length; w += 3) _(w);
        } else {
          var g, m;
          for (this.iiContainer.active = false, this.iiGridContainer.active = true, this.iiGridContainer.children.map(function(c) {
            return c.active = false;
          }), g = function(i) {
            var e;
            (e = Tool_1.default.getPrefab(m.iiGridContainer, m.iiPre, "i" + i / 3).getComponent(ItemIcon_1.default)).init(c.items[i], c.items[i + 1], c.items[i + 2]);
            e.hide();
            m.timeoutHandles.push({
              t: 1 + i / 3 * 150,
              cb: function() {
                e.showAnim();
                i + c.items.length === 3 && (t.state = 1);
              }
            });
          }, m = this, w = 0; w < c.items.length; w += 3) g(w);
        }
        this.items = c.items;
        this.showFlyTo = 0;
        c.showFlyTo && (this.showFlyTo = 1);
      }
      onClose() {}
      hide() {
        var s = 1e4;
        if (1 === this.state) {
          if (this.showFlyTo) for (var v = 0; v < this.items.length; v += 3) cc.MainUI.showBonus((this.items.length <= 12 ? this.iiContainer : this.iiGridContainer).getChildByName("i" + v / 3), this.items[v + 1], this.items[v + 2]);
          cc.SubwindowManager.hideWindow(h.UIStatus.GetItem);
          this.state = 2;
        } else {
          for (v = 0; v < this.timeoutHandles.length; v++) this.timeoutHandles[v].t <= -s || (this.timeoutHandles[v].cb(), 
          this.timeoutHandles[v].t = -s);
          this.state = 1;
        }
      }
      start() {}
      update(c) {
        if (0 === this.state) for (var o = 0; o < this.timeoutHandles.length; o++) this.timeoutHandles[o].t > 0 && (this.timeoutHandles[o].t -= 1e3 * c, 
        this.timeoutHandles[o].t <= 0 && (this.timeoutHandles[o].cb(), this.timeoutHandles[o].t = -1e4, 
        o === this.timeoutHandles.length - 1 && (this.state = 1)));
      }
    };
    __decorate([ property(cc.Node) ], GetItemWindow.prototype, "iiContainer", void 0);
    __decorate([ property(cc.Node) ], GetItemWindow.prototype, "iiGridContainer", void 0);
    __decorate([ property(cc.Prefab) ], GetItemWindow.prototype, "iiPre", void 0);
    GetItemWindow = __decorate([ ccclass ], GetItemWindow);
    exports.default = GetItemWindow;
    cc._RF.pop();
  }, {
    "./ItemIcon": "ItemIcon",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  GetNewSkillWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c2239sa4hJJFIbs3v3f3C+X", "GetNewSkillWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const e = require("./ConfigCtrl");
    const SkillCard_1 = require("./SkillCard");
    const Tool_1 = require("./Tool");
    const r = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var t = "par";
    let GetNewSkillWindow = class GetNewSkillWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.skillCardPre = null;
        this.skillCardContainer = null;
        this.choosingLight = null;
        this.operBtns = null;
        this.autoDoing = null;
      }
      init() {}
      show(c) {
        void 0 === c && (c = {
          par: null
        });
        this.par = c.par;
        for (var o = 0, r = 0, h = 0; h < cc.player.newSkillList.length; h++) {
          o += cc.player.newSkillList[h][0];
          r += cc.player.newSkillList[h][1];
        }
        0 === o || 3 === r ? this.refresh3NewSkills() : this.autoDoing.active = 0 === r;
        this.refresh();
      }
      refresh3NewSkills() {
        for (var c, t, i, s, o, r, C = 0; C < cc.player.newSkillList.length; C++) cc.player.newSkillList[C] = [ 0, 0 ];
        for (var C in cc.player.newSkillTimes || (cc.player.newSkillTimes = 0), c = [], 
        s = [], t = [], r = [], e.Datas.Skill) cc.player.skillInfo[C] && 10 === cc.player.skillInfo[C][0] || (c.push(parseInt(C)), 
        s.push(e.Datas.Skill[C].odds), 3 === e.Datas.Skill[C].qua && (t.push(parseInt(C)), 
        r.push(e.Datas.Skill[C].odds)));
        for (0 === (i = Tool_1.default.randomIntsByWeight(s, 3)).length && (c.push(1), i.push(0)); i.length < 3; ) i.push(0);
        for (o = 0, C = 0; C < i.length; C++) {
          cc.player.newSkillList[C][0] = c[i[C]];
          3 === e.Datas.Skill[c[i[C]]].qua && (o = 1);
        }
        if (0 === o && r.length > 0) if (9 === cc.player.newSkillTimes) {
          var M;
          M = t[Tool_1.default.randomByWeight(r)];
          cc.player.newSkillList[Tool_1.default.randomInt(0, 2)][0] = M;
        } else cc.player.newSkillTimes++; else cc.player.newSkillTimes = 0;
        this.autoDoing.active = true;
      }
      refresh() {
        for (var _ = 0, p = 0; p < cc.player.newSkillList.length; p++) {
          var w, g;
          if (0 === (w = cc.player.newSkillList[p][0])) this.skillCardContainer[p].active = false; else {
            this.skillCardContainer[p].active = true;
            (g = Tool_1.default.getPrefab(this.skillCardContainer[p], this.skillCardPre, "skillCard").getComponent(SkillCard_1.default)).initAsInGetNewSKill(w, this);
            g.anim.play(g.anim.getClips()[0].name);
            _ += cc.player.newSkillList[p][1];
            cc.player.newSkillList[p][1] ? (this.choosingLight[p].active = true, g.showIsGot()) : (this.choosingLight[p].active = false, 
            g.gotPanel.active = false);
          }
        }
        this.refreshBtns(_);
      }
      refreshBtns(c) {
        if (0 === c) for (var o = 0; o < this.operBtns.length; o++) this.operBtns[o].active = 0 === o; else if (1 === c) for (o = 0; o < this.operBtns.length; o++) this.operBtns[o].active = 1 === o || 3 === o; else if (2 === c) for (o = 0; o < this.operBtns.length; o++) this.operBtns[o].active = 2 === o || 3 === o || 4 === o;
      }
      hide() {
        this.par.refreshUsing();
        this.par.refreshStorage();
        cc.SubwindowManager.hideWindow(r.UIStatus.GetNewSkill);
      }
      spawnNewSkillList() {
        var c;
        c = this;
        cc.SubwindowManager.showWindow(r.UIStatus.Alert, {
          text: e.Datas.Config[10001].v,
          onOk: function() {
            c.refresh3NewSkills();
            c.refresh();
          }
        });
      }
      incPlayerSkillExp() {
        var c;
        c = cc.player.newSkillList[this.skillWillGetIdx][0];
        cc.pvz.PlayerData.getRewardBonus(3, c, 1);
        cc.player.newSkillList[this.skillWillGetIdx][1] = 1;
        for (var p = 0, w = 0; w < cc.player.newSkillList.length; w++) p += cc.player.newSkillList[w][1];
        Tool_1.default.displayBPChange();
        Tool_1.default.getPrefab(this.skillCardContainer[this.skillWillGetIdx], this.skillCardPre, "skillCard").getComponent(SkillCard_1.default).showIsGot();
        this.refreshBtns(p);
        cc.pvz.PlayerData.increaseMissionProg(701, 1);
        cc.pvz.PlayerData.increaseMissionProg(702, 1);
        this.node.getChildByName("ClickMask").active = false;
      }
      tryGetNewSkill() {
        for (var b = this, I = [], k = 0; k < cc.player.newSkillList.length; k++) 0 === cc.player.newSkillList[k][1] && I.push(k);
        0 !== I.length && (this.node.getChildByName("ClickMask").active = true, 1 === I.length ? (this.skillWillGetIdx = I[0], 
        this.choosingLight[I[0]].active = true, this.incPlayerSkillExp(), Tool_1.default.getPrefab(this.skillCardContainer[this.skillWillGetIdx], this.skillCardPre, "skillCard").getComponent(SkillCard_1.default).showIsGot(), 
        setTimeout(function() {
          b.refresh3NewSkills();
          b.refresh();
          cc.pvz.PlayerData.saveData();
        }, 800)) : (this.skillWillGetIdx = Tool_1.default.randomFromArray(I)[0], this.skillChoosing = 1, 
        this.showChoosingLightInfo.tCount = 0, this.showChoosingLightInfo.lIdx = Tool_1.default.randomFromArray(I)[0], 
        3 === I.length ? this.showChoosingLightInfo.times = this.skillWillGetIdx - this.showChoosingLightInfo.lIdx + 15 : 2 === I.length && (this.showChoosingLightInfo.times = this.skillWillGetIdx === this.showChoosingLightInfo.lIdx ? 14 : 13), 
        console.log("Do:", this.showChoosingLightInfo.lIdx, this.showChoosingLightInfo.times, this.skillWillGetIdx), 
        this.choosingLight[this.showChoosingLightInfo.lIdx].active = true));
      }
      chooseSkill(c, t) {
        var i, n, s, o;
        if (i = this, n = 0, o = 0, 0 === (s = parseInt(t))) {
          for (var I = 0; I < cc.player.newSkillList.length; I++) o += cc.player.newSkillList[I][1];
          if (o >= 3) return;
          var k;
          if (n = [ 50, 100, 200 ][o], cc.pvz.PlayerData.itemNum(3) < n) {
            k = e.Datas.Tips[2].v.replace("{1}", e.Datas.Item[3].name);
            cc.popupManager.showToast(k);
          } else {
            0 === o && !1 === this.autoDoing.getComponent(cc.Toggle).isChecked && (this.autoDoing.active = false);
            cc.pvz.PlayerData.itemNum(3, -n);
            this.tryGetNewSkill();
          }
        } else 1 === s && cc.pvz.AdUtils.willShowAdRewardVideo(cc.pvz.GameConst.AdType["\u5b66\u4e60\u6280\u80fd"], function(c) {
          c && i.tryGetNewSkill();
        });
      }
      showNextLightBg() {
        var c;
        if (c = this, !(this.showChoosingLightInfo.times <= 0)) {
          this.showChoosingLightInfo.tCount = 0;
          this.showChoosingLightInfo.times--;
          this.choosingLight[this.showChoosingLightInfo.lIdx].active = false;
          do {
            this.showChoosingLightInfo.lIdx++;
            this.showChoosingLightInfo.lIdx %= this.choosingLight.length;
          } while (1 === cc.player.newSkillList[this.showChoosingLightInfo.lIdx][1]);
          this.choosingLight[this.showChoosingLightInfo.lIdx].active = true;
          0 === this.showChoosingLightInfo.times && setTimeout(function() {
            c.skillChoosing = 0;
            c.incPlayerSkillExp();
            Tool_1.default.canGetSkill() || (c.autoDoing.getComponent(cc.Toggle).uncheck(), 
            cc.popupManager.showToast(e.Datas.Tips[14].v));
            !1 === c.autoDoing.getComponent(cc.Toggle).isChecked ? c.autoDoing.active = false : (console.log("Will auto!"), 
            c.autoDoing.getComponent(cc.Toggle).isChecked && (c.refresh3NewSkills(), c.refresh(), 
            c.chooseSkill(null, "0")));
            cc.pvz.PlayerData.saveData();
          }, 500);
        }
      }
      onClickmaskClicked() {
        if (1 === this.skillChoosing) for (;this.showChoosingLightInfo.times > 0; ) this.showNextLightBg();
      }
      start() {}
      update(c) {
        1 === this.skillChoosing && (this.showChoosingLightInfo.tCount += c, this.showChoosingLightInfo.tCount >= (this.showChoosingLightInfo.times >= 5 ? .08 : .25) && this.showNextLightBg());
      }
    };
    __decorate([ property(cc.Prefab) ], GetNewSkillWindow.prototype, "skillCardPre", void 0);
    __decorate([ property(cc.Node) ], GetNewSkillWindow.prototype, "skillCardContainer", void 0);
    __decorate([ property(cc.Node) ], GetNewSkillWindow.prototype, "choosingLight", void 0);
    __decorate([ property(cc.Node) ], GetNewSkillWindow.prototype, "operBtns", void 0);
    __decorate([ property(cc.Node) ], GetNewSkillWindow.prototype, "autoDoing", void 0);
    GetNewSkillWindow = __decorate([ ccclass ], GetNewSkillWindow);
    exports.default = GetNewSkillWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SkillCard": "SkillCard",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  GetNewSkinWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a6865V6iF5KuL+rmSG9n6Rj", "GetNewSkinWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const o = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GetNewSkinWindow = class GetNewSkinWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.eff = null;
        this.hero = null;
      }
      init() {}
      show(c) {
        var t;
        t = this;
        void 0 === c && (c = {
          idx: 0
        });
        this.eff.getComponent(sp.Skeleton).setAnimation(0, "jiesuoEf_1", false);
        this.eff.getComponent(sp.Skeleton).setAnimation(0, "jiesuoEf_2", true);
        cc.pvz.utils.useBundleAsset("skins", "spine/character" + c.idx, sp.SkeletonData, function(c) {
          t.hero.getComponent(sp.Skeleton).skeletonData = c;
          t.hero.getComponent(sp.Skeleton).setAnimation(0, "stand", true);
        });
      }
      hide() {
        cc.SubwindowManager.hideWindow(o.UIStatus.GetNewSkin);
      }
      start() {}
    };
    __decorate([ property(cc.Node) ], GetNewSkinWindow.prototype, "eff", void 0);
    __decorate([ property(cc.Node) ], GetNewSkinWindow.prototype, "hero", void 0);
    GetNewSkinWindow = __decorate([ ccclass ], GetNewSkinWindow);
    exports.default = GetNewSkinWindow;
    cc._RF.pop();
  }, {
    "./SubwindowManager": "SubwindowManager"
  } ],
  GetSkinWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7b60adQhBOl6F8BRtoEp5v", "GetSkinWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const h = require("./ConfigCtrl");
    const SpineCtrl_1 = require("./SpineCtrl");
    const Tool_1 = require("./Tool");
    const s = require("./SubwindowManager");
    var l, i;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GetSkinWindow = class GetSkinWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.carSp = null;
      }
      init() {}
      show(c) {
        void 0 === c && (c = {
          par: null
        });
        this.par = c.par;
        this.carSp.node.active = false;
      }
      drawByTimes(c) {
        var t, i, l = 500;
        void 0 === c && (c = 1);
        cc.pvz.PlayerData.itemNum(3, -100 * c);
        for (var P = {}, x = 0; x < c; x++) {
          for (var D, B = Tool_1.default.randomFromArr(this.skinIds), y = h.Datas.SkinInfo[B], T = [], A = [], O = 0; O < y.spProb.length; O += 2) {
            A.push(y.spProb[O]);
            T.push(y.spProb[O + 1]);
          }
          D = A[Tool_1.default.randomByWeight(T)];
          P[B] = P[B] ? P[B] + D : D;
        }
        for (var O in i = [], t = false, P) {
          i.push(1);
          i.push(parseInt(O) + l);
          i.push(P[O]);
          cc.pvz.PlayerData.itemNum(parseInt(O) + l, P[O]);
          cc.pvz.PlayerData.itemNum(parseInt(O) + l) >= h.Datas.SkinInfo[O].merge[2] && (cc.player.skinProLv[O] = [ 0, 1, 1, 1, 1, 1, 1 ], 
          cc.SubwindowManager.showWindow(s.UIStatus.GetNewSkin, {
            idx: parseInt(O)
          }), t = true, cc.pvz.PlayerData.increaseMissionProg(1302, 1), Tool_1.default.displayBPChange(), 
          delete cc.player.items[parseInt(O) + 500]);
        }
        t || cc.SubwindowManager.showWindow(s.UIStatus.GetItem, {
          items: i
        });
        cc.pvz.PlayerData.saveData();
        this.par.refreshAllSkinInfo();
      }
      draw1Times() {
        if (cc.pvz.PlayerData.itemNum(3) >= 100) {
          var k, C, M;
          for (var P in C = [], M = 1e3 * cc.player.levelProg[0] + cc.player.levelProg[1], 
          h.Datas.SkinInfo) M >= h.Datas.SkinInfo[P].unlock && !cc.player.skinProLv[P] && C.push(parseInt(P));
          if (0 === C.length) return void cc.popupManager.showToast(h.Datas.Tips[12].v);
          this.skinIds = C;
          this.carSp.node.active = true;
          cc.find("Canvas/ClickMask").active = true;
          this.carSp.setAnimation(0, "1", false);
          (k = cc.find("Canvas/EffLight/bodySpine")).active = true;
          k.getComponent(SpineCtrl_1.default).setAnimation(0, "2", false, function() {
            k.active = false;
          });
        } else cc.popupManager.showToast(h.Datas.Tips[2].v.replace("{1}", h.Datas.Item[3].name));
      }
      hide() {
        cc.SubwindowManager.hideWindow(s.UIStatus.GetSkin);
      }
      start() {
        var c;
        c = this;
        this.carSp.setEventListener(function() {});
        this.carSp.setCompleteListener(function() {
          c.carSp.node.active = false;
        });
        cc.find("Canvas/EffLight/bodySpine").getComponent(SpineCtrl_1.default).setEventListener("hit", function() {
          c.drawByTimes(1);
          cc.find("Canvas/ClickMask").active = false;
        });
      }
    };
    __decorate([ property(sp.Skeleton) ], GetSkinWindow.prototype, "carSp", void 0);
    GetSkinWindow = __decorate([ ccclass ], GetSkinWindow);
    exports.default = GetSkinWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SpineCtrl": "SpineCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  GoldStageInfoWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3fee4YdcWpKy7btb9vYeWlJ", "GoldStageInfoWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const e = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    const h = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GoldStageInfoWindow = class GoldStageInfoWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.stageTitle = null;
        this.maxWave = null;
        this.goldRate = null;
        this.staminaCost = null;
        this.levelRateBtn = null;
        this.itemPanels = null;
      }
      init() {
        this.nowStage = cc.player.goldLevelProg[0];
        cc.player.goldLevelRate || (cc.player.goldLevelRate = 1);
        this.maxStage = Object.keys(e.Datas.GoldStage).length;
        this.nowStage > this.maxStage && (this.nowStage = this.maxStage);
        this.itemPanels[0].setPosition(this.itemPanels[0].parent.convertToNodeSpaceAR(cc.MainUI.topUIShow[3].convertToWorldSpaceAR(cc.Vec2.ZERO)));
        this.itemPanels[1].setPosition(this.itemPanels[1].parent.convertToNodeSpaceAR(cc.MainUI.topUIShow[4].convertToWorldSpaceAR(cc.Vec2.ZERO)));
      }
      show() {
        this.refresh();
      }
      refresh() {
        var c;
        c = e.Datas.GoldStage[this.nowStage];
        this.stageTitle.string = c.name;
        this.goldRate.string = "x" + c.goldPer;
        this.staminaCost.string = "" + c.tiliNeed * cc.player.goldLevelRate;
        this.levelRateBtn.getComponentInChildren(cc.Label).string = cc.player.goldLevelRate + "\u500d\u5f00\u542f";
        this.maxWave.string = (this.nowStage < cc.player.goldLevelProg[0] ? e.Datas.GoldStage[this.nowStage].wave : cc.player.goldLevelProg[1]) + "\u6ce2";
      }
      changeRate() {
        var c;
        cc.player.goldLevelRate++;
        cc.player.goldLevelRate > 3 && (cc.player.goldLevelRate = 1);
        cc.player.goldLevelRate > 2 && (1e3 * cc.player.levelProg[0] + cc.player.levelProg[1] >= e.Datas.GrowRoadUnlockInfo[40].type2s ? cc.player.goldLevelRate = 3 : cc.player.goldLevelRate = 1);
        this.levelRateBtn.getComponentInChildren(cc.Label).string = cc.player.goldLevelRate + "\u500d\u5f00\u542f";
        c = e.Datas.GoldStage[this.nowStage];
        this.staminaCost.string = "" + c.tiliNeed * cc.player.goldLevelRate;
      }
      changeStage(_c, t) {
        var i;
        i = parseInt(t);
        this.nowStage += i;
        this.nowStage < 1 ? (this.nowStage = cc.player.goldLevelProg[0], this.nowStage > this.maxStage && (this.nowStage = this.maxStage)) : (this.nowStage > cc.player.goldLevelProg[0] || this.nowStage > this.maxStage) && (this.nowStage = 1);
        this.refresh();
      }
      showStaminaAdGetWindow() {
        this.hide();
        cc.SubwindowManager.showWindow(h.UIStatus.StaminaAdGet, {});
      }
      enterStage() {
        var c;
        if (c = e.Datas.GoldStage[this.nowStage].tiliNeed * cc.player.goldLevelRate, !cc.pvz.PlayerData.staminaValue(-c)) return cc.popupManager.showToast("\u4f53\u529b\u4e0d\u8db3"), 
        void (cc.player.staminaAdGet.times < 5 && (this.hide(), cc.SubwindowManager.showWindow(h.UIStatus.StaminaAdGet, {})));
        Tool_1.default.onSceneChange();
        cc.pvz.PlayerData.increaseMissionProg(481, 1);
        cc.pvz.PlayerData.increaseMissionProg(482, 1);
        cc.pvz.PlayerData.increaseMissionProg(1606, 1);
        this.hide();
        cc.pvz.runtimeData.init(7, this.nowStage, cc.player.goldLevelRate);
        cc.butler.loadScene("game");
      }
      hide() {
        cc.SubwindowManager.hideWindow(h.UIStatus.GoldStageInfo);
      }
    };
    __decorate([ property(cc.Label) ], GoldStageInfoWindow.prototype, "stageTitle", void 0);
    __decorate([ property(cc.Label) ], GoldStageInfoWindow.prototype, "maxWave", void 0);
    __decorate([ property(cc.Label) ], GoldStageInfoWindow.prototype, "goldRate", void 0);
    __decorate([ property(cc.Label) ], GoldStageInfoWindow.prototype, "staminaCost", void 0);
    __decorate([ property(cc.Node) ], GoldStageInfoWindow.prototype, "levelRateBtn", void 0);
    __decorate([ property(cc.Node) ], GoldStageInfoWindow.prototype, "itemPanels", void 0);
    GoldStageInfoWindow = __decorate([ ccclass ], GoldStageInfoWindow);
    exports.default = GoldStageInfoWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  GrowRoadLevelInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac95bAotFhB3oXVsOHDUr2G", "GrowRoadLevelInfo");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const e = require("./ConfigCtrl");
    const r = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    var l, c, d, k, M, B, E, N;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var u = "prototype";
    var w = 1;
    let GrowRoadLevelInfo = class GrowRoadLevelInfo extends cc.Component {
      constructor() {
        super(...arguments);
        this.levelTitle = null;
        this.levelBonusPanel = null;
        this.iconSFS = null;
      }
      initLevelInfoAs(c) {
        var t, h = 1e3, l = "hint";
        void 0 === c && (c = 1);
        this.lId = c;
        t = 100 * this.lId + 1;
        this.levelTitle.string = e.Datas.LevelInfo[this.lId].name;
        for (var w = 1; w < h && this.node.getChildByName(l + w); w++) this.node.getChildByName(l + w).active = false;
        for (var w in e.Datas.GrowRoadUnlockInfo) {
          var g;
          (g = e.Datas.GrowRoadUnlockInfo[w].type2s) >= h * c && g < h * (c + 1) && e.Datas.GrowRoadUnlockInfo[w].show && (this.sysOpenInfo[g] = w);
        }
        for (this.panelPos = [], w = t; e.Datas.GrowRoad[w]; w++) this.refreshSinglePanel(w);
        for (this.node.getComponent(cc.Layout).updateLayout(), w = 1; ;w++) {
          var m;
          if (!(m = this.levelBonusPanel.parent.getChildByName(l + w))) break;
          this.panelPos.push(m.y);
        }
      }
      refreshSinglePanel(c) {
        var t, i, d = 100, l = 1e3, k = "lock", M = "redp", B = "bgLock", E = "sys", N = "bg";
        return t = e.Datas.GrowRoad[c], (i = Tool_1.default.getPrefab(this.levelBonusPanel.parent, this.levelBonusPanel, "hint" + c % d)).getChildByName("title").getComponent(cc.Label).string = "" + this.levelTitle.string + t.wave + "\u6ce2", 
        i.getChildByName(k).active = false, i.getChildByName(M).active = false, l * cc.player.levelProg[0] + cc.player.levelProg[1] >= l * this.lId + t.wave ? cc.player.growUpUnlock[c] ? i.getChildByName(B).getComponent(cc.Sprite).spriteFrame = this.iconSFS[3] : (i.getChildByName(B).getComponent(cc.Sprite).spriteFrame = this.iconSFS[2], 
        i.getChildByName(M).active = true) : (i.getChildByName(B).getComponent(cc.Sprite).spriteFrame = this.iconSFS[2], 
        i.getChildByName(k).active = true), i.getChildByName("icon").getComponent(cc.Sprite).spriteFrame = this.iconSFS[t.type % d - 1], 
        this.sysOpenInfo[l * this.lId + t.wave] ? (i.getChildByName(E).active = true, i.getChildByName(E).getChildByName("name").getComponent(cc.Label).string = e.Datas.GrowRoadUnlockInfo[this.sysOpenInfo[l * this.lId + t.wave]].name, 
        l * cc.player.levelProg[0] + cc.player.levelProg[1] >= l * this.lId + t.wave ? i.getChildByName(E).getChildByName(N).getComponent(cc.Sprite).spriteFrame = this.iconSFS[5] : i.getChildByName(E).getChildByName(N).getComponent(cc.Sprite).spriteFrame = this.iconSFS[4]) : i.getChildByName(E).active = false, 
        i;
      }
      playSinglePanelAnim(c, t) {
        var i;
        (i = Tool_1.default.getPrefab(this.levelBonusPanel.parent, this.levelBonusPanel, "hint" + c).getComponent(cc.Animation)).play(i.getClips()[t].name);
        i.once("finished", function() {});
      }
      unlockClick(c) {
        var t;
        t = parseInt(c.target.parent.name.substring(4));
        cc.SubwindowManager.showWindow(r.UIStatus.GrowRoadUnlock, {
          id: 100 * this.lId + t,
          from: this
        });
      }
      checkAnim(c) {
        void 0 === c && (c = {
          cy: 0,
          h: 0,
          dy: 0
        });
        for (var a = 1; a < 1e3; a++) {
          if (!e.Datas.GrowRoad[100 * this.lId + a]) return;
          Tool_1.default.getPrefab(this.levelBonusPanel.parent, this.levelBonusPanel, "hint" + a).y;
          this.node.y;
          c.cy;
        }
      }
      start() {}
      update() {}
    };
    __decorate([ property(cc.Label) ], GrowRoadLevelInfo.prototype, "levelTitle", void 0);
    __decorate([ property(cc.Node) ], GrowRoadLevelInfo.prototype, "levelBonusPanel", void 0);
    __decorate([ property(cc.SpriteFrame) ], GrowRoadLevelInfo.prototype, "iconSFS", void 0);
    GrowRoadLevelInfo = __decorate([ ccclass ], GrowRoadLevelInfo);
    exports.default = GrowRoadLevelInfo;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  GrowRoadUnlockWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b7153IXPDtOV5iXlZaSwckH", "GrowRoadUnlockWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const a = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const Tool_1 = require("./Tool");
    const h = require("./SubwindowManager");
    var _, p, c, n, i;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let GrowRoadUnlockWindow = class GrowRoadUnlockWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.unlockInfo = null;
        this.descStr = null;
        this.iconSpr = null;
        this.bgSpr = null;
        this.iconSFS = null;
      }
      init() {}
      show(c) {
        var t, i, n, _ = 1e3, p = 100;
        void 0 === c && (c = {
          id: 0,
          from: null
        });
        this.id = c.id;
        this.from = c.from;
        n = a.Datas.GrowRoad[c.id];
        t = _ * cc.player.levelProg[0] + cc.player.levelProg[1];
        i = _ * n.lv + n.wave;
        this.iconSpr.spriteFrame = this.iconSFS[n.type % p - 1];
        this.descStr.string = [ "\u653b\u51fb+", "\u751f\u547d+" ][n.type % p - 1] + (n.type > p ? n.value / p + f : n.value);
        this.unlockInfo[0].active = false;
        this.unlockInfo[1].active = false;
        this.unlockInfo[2].active = false;
        cc.player.growUpUnlock[c.id] ? (this.unlockInfo[2].active = true, this.bgSpr.spriteFrame = this.iconSFS[3]) : t >= i ? (this.unlockInfo[1].active = true, 
        this.bgSpr.spriteFrame = this.iconSFS[2]) : (this.unlockInfo[0].active = true, this.unlockInfo[0].getComponent(cc.Label).string = "\u8fbe\u5230" + a.Datas.LevelInfo[n.lv].name + n.wave + "\u6ce2\u53ef\u89e3\u9501", 
        this.bgSpr.spriteFrame = this.iconSFS[2]);
      }
      unlock() {
        cc.player.growUpUnlock[this.id] = 1;
        cc.pvz.PlayerData.saveData();
        this.show({
          id: this.id,
          from: this.from
        });
        RedPointManager_1.default.check("GrowUpRoad");
        this.from.refreshSinglePanel(this.id);
        Tool_1.default.displayBPChange();
        this.hide();
      }
      hide() {
        cc.SubwindowManager.hideWindow(h.UIStatus.GrowRoadUnlock);
      }
      start() {}
    };
    __decorate([ property(cc.Node) ], GrowRoadUnlockWindow.prototype, "unlockInfo", void 0);
    __decorate([ property(cc.Label) ], GrowRoadUnlockWindow.prototype, "descStr", void 0);
    __decorate([ property(cc.Sprite) ], GrowRoadUnlockWindow.prototype, "iconSpr", void 0);
    __decorate([ property(cc.Sprite) ], GrowRoadUnlockWindow.prototype, "bgSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], GrowRoadUnlockWindow.prototype, "iconSFS", void 0);
    GrowRoadUnlockWindow = __decorate([ ccclass ], GrowRoadUnlockWindow);
    exports.default = GrowRoadUnlockWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  GrowRoadWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "aa202s95E1N6q45zgJtxGMW", "GrowRoadWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const e = require("./ConfigCtrl");
    const GrowRoadLevelInfo_1 = require("./GrowRoadLevelInfo");
    const Tool_1 = require("./Tool");
    const a = require("./SubwindowManager");
    var f, d, l, _;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var g = 1;
    var x = 0;
    var t = 0;
    let GrowRoadWindow = class GrowRoadWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.progBarStar = null;
        this.progBar = null;
        this.mainSV = null;
        this.levelInfos = null;
        this.bars = null;
      }
      calHeight(c) {
        for (var v = this.levelInfos[0].getChildByName("title").height, f = this.levelInfos[0].getChildByName("hint1").height, d = this.levelInfos[0].getComponent(cc.Layout).spacingY, l = 0, _ = 1; _ < c; _++) {
          var p, w;
          if (w = false, p = v, !e.Datas.LevelInfo[_]) break;
          for (var g = 1; g <= 1e3 && e.Datas.GrowRoad[100 * _ + g]; g++) {
            p += f;
            p += d;
            w = true;
          }
          if (!w) break;
          l += p;
        }
        return l;
      }
      init() {}
      doInit() {
        var v = 1e3;
        if (!this.initOk) {
          var M, P;
          for (this.showLevelIds = [ cc.player.levelProg[0] - 2, cc.player.levelProg[0] - 1, cc.player.levelProg[0] ]; this.showLevelIds[0] < 1; ) {
            this.showLevelIds[0]++;
            this.showLevelIds[1]++;
            this.showLevelIds[2]++;
          }
          this.mainSV.content.height = this.calHeight(v);
          this.bars[0].height = this.mainSV.content.height;
          for (var x = 0; x < this.levelInfos.length; x++) {
            this.levelInfos[x] = Tool_1.default.getPrefab(this.levelInfos[0].parent, this.levelInfos[0], "Level" + (x + 1));
            this.levelInfos[x].getComponent(GrowRoadLevelInfo_1.default).initLevelInfoAs(this.showLevelIds[x]);
            this.levelInfos[x].y = this.calHeight(this.showLevelIds[x]);
          }
          for (M = 0, x = 0; x < this.showLevelIds.length; x++) {
            for (var D = false, B = 1; B <= v; B++) {
              var y;
              if (!(y = e.Datas.GrowRoad[100 * this.showLevelIds[x] + B])) break;
              if (!(v * cc.player.levelProg[0] + cc.player.levelProg[1] >= v * y.lv + y.wave)) break;
              M = this.levelInfos[x].getComponent(GrowRoadLevelInfo_1.default).panelPos[B - 1] + this.levelInfos[x].y;
              D = true;
            }
            if (!D) break;
          }
          this.bars[1].height = M;
          this.bars[2].y = M;
          P = this.mainSV.content.y;
          this.mainSV.content.y = Math.min(P, -M - 200);
          this.mainSV.stopAutoScroll();
          this.contentY0 = this.mainSV.content.y;
          this.bars[0].y = this.mainSV.content.y;
          this.initOk = true;
        }
      }
      show() {
        this.doInit();
      }
      refreshLevelInfo() {
        for (var t = 0; t < this.showLevelIds.length; t++) ;
      }
      setProgBarPos() {}
      onMainSVScroll() {
        var c, t, i;
        this.bars[0].y = this.mainSV.content.y;
        for (var C = 0, M = 1, P = 2, x = 0; x < this.levelInfos.length; x++) {
          this.levelInfos[x].y < this.levelInfos[C].y && (C = x);
          this.levelInfos[x].y > this.levelInfos[P].y && (P = x);
        }
        for (x = 0; x < this.levelInfos.length; x++) if (x !== C && x !== P) {
          M = x;
          break;
        }
        (t = this.mainSV.content.y - this.contentY0, this.contentY0 = this.mainSV.content.y, 
        c = this.mainSV.node.height, t < 0 && this.mainSV.content.y + this.levelInfos[M].y < -c) && (i = this.levelInfos[C].getComponent(GrowRoadLevelInfo_1.default).lId, 
        e.Datas.LevelInfo[i + 3] && (this.levelInfos[C].getComponent(GrowRoadLevelInfo_1.default).initLevelInfoAs(i + 3), 
        this.levelInfos[C].y = this.levelInfos[P].y + this.levelInfos[P].height));
        for (t > 0 && this.mainSV.content.y + this.levelInfos[M].y + this.levelInfos[M].height > 20 && (i = this.levelInfos[P].getComponent(GrowRoadLevelInfo_1.default).lId, 
        e.Datas.LevelInfo[i - 3] && (this.levelInfos[P].getComponent(GrowRoadLevelInfo_1.default).initLevelInfoAs(i - 3), 
        this.levelInfos[P].y = this.levelInfos[C].y - this.levelInfos[P].height)), x = 0; x < this.levelInfos.length; x++) this.levelInfos[x].getComponent(GrowRoadLevelInfo_1.default).checkAnim({
          cy: this.contentY0,
          h: c,
          dy: t
        });
      }
      hide() {
        cc.SubwindowManager.hideWindow(a.UIStatus.GrowRoad);
      }
      start() {}
    };
    __decorate([ property(cc.Node) ], GrowRoadWindow.prototype, "progBarStar", void 0);
    __decorate([ property(cc.ProgressBar) ], GrowRoadWindow.prototype, "progBar", void 0);
    __decorate([ property(cc.ScrollView) ], GrowRoadWindow.prototype, "mainSV", void 0);
    __decorate([ property(cc.Node) ], GrowRoadWindow.prototype, "levelInfos", void 0);
    __decorate([ property(cc.Node) ], GrowRoadWindow.prototype, "bars", void 0);
    GrowRoadWindow = __decorate([ ccclass ], GrowRoadWindow);
    exports.default = GrowRoadWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./GrowRoadLevelInfo": "GrowRoadLevelInfo",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  HeroSkin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "95819RhY/9M4YWFap+a7D7f", "HeroSkin");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const SpineCtrl_1 = require("./SpineCtrl");
    var h;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var t = "skinUsing";
    var t = "skinUsing";
    let HeroSkin = class HeroSkin extends cc.Component {
      constructor() {
        super(...arguments);
        this.autoSync = null;
      }
      setSkinTo(c) {
        var t, h = "skins";
        t = this.node.getComponent(SpineCtrl_1.default);
        0 === c ? cc.pvz.utils.useBundleAsset(h, "spine/hero1", sp.SkeletonData, function(c) {
          t.setSkeletonData(c, false);
          t.setAnimation(0, "stand", true);
        }) : cc.pvz.utils.useBundleAsset(h, "spine/character" + c, sp.SkeletonData, function(c) {
          t.setSkeletonData(c, false);
          t.setAnimation(0, "stand", true);
        });
      }
      refresh() {
        console.log("Change hero skin to :", this.skinUsing);
        this.setSkinTo(this.skinUsing);
      }
      start() {
        1 === this.autoSync && (this.skinUsing = cc.player.skinUsing, this.refresh());
      }
      update() {
        1 === this.autoSync && this.skinUsing !== cc.player.skinUsing && (this.skinUsing = cc.player.skinUsing, 
        this.refresh());
      }
    };
    __decorate([ property ], HeroSkin.prototype, "autoSync", void 0);
    HeroSkin = __decorate([ ccclass ], HeroSkin);
    exports.default = HeroSkin;
    cc._RF.pop();
  }, {
    "./SpineCtrl": "SpineCtrl"
  } ],
  Hero: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9b94fhxW/FHMYIONocJeKHm", "Hero");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameComponent_1 = require("./GameComponent");
    const PrefabInfo_1 = require("../main/PrefabInfo");
    var d = "x";
    var O, Z, B, E, R, f, w, C;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Hero = class Hero extends GameComponent_1.default {
      constructor() {
        super(...arguments);
        this.skin = 0;
        this.skinSkillCd = 0;
        this.spine = null;
        this.hurtNumPos = null;
        this.addEnergyPos = null;
        this.zdOffet = null;
        this.zdNormalPrefab = null;
        this.zdCritPrefab = null;
        this.zdSkinPrefab = null;
      }
      initBy(t) {
        this.scene = t;
        this.zdNormalPrefab.root = this.scene.bulletsRoot;
        this.zdCritPrefab.root = this.scene.bulletsRoot;
        this.zdSkinPrefab && (this.zdSkinPrefab.root = this.scene.bulletsRoot);
        this.zdPos = this.node.parent.position.add(this.zdOffet);
        this.attTime = 0;
        this.attCd = 1;
        this.skinSkillTimer = 0;
        this.lastAttPos = cc.Vec2.ZERO;
      }
      update2(t) {
        if (this.attTime += t, this.attTime >= this.scene.atkCd) {
          var a = this.scene.getZwRange() + 1;
          this.checkToShoot(a) && (this.attTime = 0);
        }
        this.skinSkillCd > 0 && (this.skinSkillTimer += t, this.skinSkillTimer >= this.skinSkillCd && (this.skinSkillTimer -= this.skinSkillCd, 
        this.doSkinSkillLogic()));
      }
      checkToShoot(t) {
        return (!this.target || this.target.hp <= 0 || !cc.isValid(this.target)) && (this.target = this.scene.findEnemy(this.node.parent.position, t * t)), 
        !!this.target && (this.attOnce(this.target), true);
      }
      needAvoidBreak() {
        return 4 == this.skin && 2 == this.atkType;
      }
      attOnce(t) {
        var L = this, P = t.node[d] > this.node[d];
        this.node.scaleX = P ? Math.abs(this.node.scaleX) : -Math.abs(this.node.scaleX);
        this.lastAttPos[d] = t.node[d];
        this.lastAttPos.y = t.node.y;
        for (var I = cc.math.randomRangeInt(1, 4); I == this.atkType; ) I = cc.math.randomRangeInt(1, 4);
        var D = I < 2, F = 0, N = this.zdNormalPrefab, x = this.scene.getAtt(), _ = x, H = x, z = 1, W = this.scene.getSkill(17);
        if (W && cc.pvz.runtimeData.energy >= W.args[0] && (this.scene.useEnergy(W.args[0]), 
        W.icon.showUseOnce(), this.scene.showCostEnergyEff(W.icon.node.convertToWorldSpaceAR(cc.v2(0, 0)), "-" + W.args[0]), 
        z += 1e-4 * W.args[1]), 5 == this.skin && this.scene.isEnemyInYeRange(t.node.position) && (z += 1e-4 * this.scene.getSkinArg()), 
        H *= z, !this.isSkillAni && !this.needAvoidBreak()) {
          this.atkType = I;
          var G = this.spine.setAnimation(0, [ "atk11", "atk12", "atk21", "atk22" ][I], false);
          this.spine.setTrackCompleteListener(G, function() {
            2 == L.atkType && (L.atkType = -1);
            L.spine.setAnimation(0, "stand", true);
          });
          this.needAvoidBreak() && this.spine.setTrackEventListener(G, function() {
            var s = L.scene.newBulletTo(L, L.zdSkinPrefab, L.zdPos, t, false);
            s.fixedAtt = _ * L.scene.getSkinArg() * 1e-4;
            s.numType = 0;
            s.isMain = false;
          });
        }
        if (this.scene.isCritHappen()) {
          N = this.zdCritPrefab;
          var J = this.scene.getCritDamage();
          _ *= J;
          H *= J;
          F = 1;
        }
        var K = this.scene.newBulletTo(this, N, this.zdPos, t, D);
        K.fixedAtt = H;
        K.isMain = true;
        K.numType = F;
        this.isNear || this.scene.enemys.find(function(t) {
          t.node[d] > L.node[d] == P && L.scene.isEnemyInKickoffRange(t.node.position) && t.tryKickoff();
        });
        var U = this.scene.getSkill(9);
        if (U) {
          var V = U.args[0], O = _ * U.args[1] * 1e-4, Z = this.scene.getZwRange();
          this.scene.findEnemyN(this.node.parent.position, Z * Z, t, V).forEach(function(t) {
            var s = L.scene.newBulletTo(L, N, L.zdPos, t, D);
            s.fixedAtt = O;
            s.isMain = false;
            s.numType = F;
          });
        }
        var Q = this.scene.getMultiShotRate();
        Q && this.scene.startTimer(function() {
          var s = L.scene.newBulletTo(L, N, L.zdPos, t, D);
          s.fixedAtt = _ * Q;
          s.isMain = false;
          s.numType = F;
        }, .08);
      }
      getAtt(t) {
        var s = this.scene.getAtt();
        return t.isMain ? s : s * Math.pow(t.subBulletAttP, t.hitCounter);
      }
      doBulletAttLogic(t, i) {
        var p = 11;
        if (t.excludeEnemy != i) {
          var y = t.fixedAtt, A = y, L = t.numType;
          t.fixedAtt || (L = 0, A = y = this.getAtt(t, i), this.scene.isCritHappen() && (L = 1, 
          A *= this.scene.getCritDamage()));
          var P = [ 0, A ];
          1 == L && t.isMain && (P = this.scene.trySecKill(A, i));
          var I = i.tryHurtBy(t, P[1], L);
          if (t.onHitWith(i), t.isMain) {
            if (I) {
              6 == cc.pvz.runtimeData.mode && this.scene.eBuffValues[p] > 0 && this.scene.hurtBy(i, this.scene.eBuffValues[p] * A);
              var D = this.scene.getLifestealRate();
              if (D > 0) {
                var F = D * A;
                this.scene.addHp(F);
              }
              P[0] && this.scene.onSecKillHappen(i);
            }
            var N = this.scene.getSkill(p);
            if (N && this.scene.newBounceBullet(this.scene.zdSkill11Prefab, "skl11_atk1", t.node.position, i, this.scene.getAtt(), 1 - 1e-4 * N.args[1], N.args[0]), 
            I && i.hp > 0) {
              var x = this.scene.getSkill(14);
              x && Math.random() < 1e-4 * x.args[0] && i.dizzy(this, x.args[1]);
              var _ = this.scene.getSkill(12);
              _ && i.slowDown(0, 1 - 1e-4 * _.args[0], _.args[1]);
            }
            var H = this.scene.getSkill(15);
            H && this.scene.newScatterBullet(t, i, L, this.scene.getAtt() * H.args[1] * 1e-4, H.args[0]);
            var z = this.scene.getSkill(10);
            if (z) {
              var W = z.args[0], G = 1e-4 * z.args[1];
              this.scene.findEnemyN(i.node.position, W * W, i, 999).forEach(function(i) {
                i.tryHurtBy(t, y * G, 0);
              });
            }
            var J = this.scene.getSkill(13);
            J && (this.scene.niuCollider.node.angle = t.node.angle, this.niuExcludeEnemy = i, 
            this.niuCounter = J.args[0], this.niuAtt = 1e-4 * J.args[1] * y, cc.pvz.utils.manuallyCheckCollider(this.scene.niuCollider));
          }
        }
      }
      onNiuCollisionEnter(t) {
        if (!(this.niuCounter <= 0) && 1 != t.tag && t.node[d] < this.niuExcludeEnemy.node[d] == this.niuExcludeEnemy.node[d] < this.node[d] && t.node.y < this.niuExcludeEnemy.node.y == this.niuExcludeEnemy.node.y < this.node.y) {
          var a = t.getComponent("Enemy");
          if (a) {
            if (a == this.niuExcludeEnemy) return;
            a.tryHurtBy({
              isNear: false,
              node: this.node
            }, this.niuAtt, 0);
            this.niuCounter--;
          }
        }
      }
      showSkillAni(t) {
        var s = this;
        if (!this.needAvoidBreak()) {
          this.isSkillAni = true;
          var h = this.spine.setAnimation(0, t, false);
          this.spine.setTrackCompleteListener(h, function() {
            s.spine.setAnimation(0, "stand", true);
            s.isSkillAni = false;
          });
        }
      }
      doSkinSkillLogic() {
        var e = 12, B = this;
        switch (this.skin) {
         case 3:
          if (this.scene.hp < this.scene.maxHp) {
            var T = this.scene.maxHp * this.scene.getSkinArg() * 1e-4;
            this.scene.resumeHp(T, this.hurtNumPos);
            this.scene.showAddHpNum(T);
          }
          break;

         case 6:
          for (var S = cc.math.randomRange(-Math.PI, Math.PI), E = 2 * Math.PI / 3, R = this.scene.heroRoot.position, y = this.scene.getAtt() * this.scene.getSkinArg() * 1e-4, A = function() {
            var u = 260, f = 100, w = S + E * L, C = cc.v2(R[d] + u * Math.cos(w), R.y + u * Math.sin(w)), T = cc.math.randomRange(-Math.PI, Math.PI), A = B.zdSkinPrefab.addNode(cc.v2(C[d] + f * Math.cos(T), C.y + f * Math.sin(T))), P = A.getComponent("Bullet");
            P.scene = B.scene;
            P.a = B;
            P.isNear = false;
            P.fixedAtt = y;
            P.numType = 0;
            A.____t = T;
            var I = T + Math.PI * (Math.random() < .5 ? -2 : 2);
            cc.tween(A).to(P.life, {
              ____t: I
            }, {
              progress: function(t, i, _c, s) {
                var r = 100, e = t + (i - t) * s;
                return A.position = cc.v2(C[d] + r * Math.cos(e), C.y + r * Math.sin(e)), e;
              }
            }).removeSelf().start();
          }, L = 0; L < 3; L++) A();
          this.showSkillAni("skl2");
          break;

         case 7:
          for (var P = 2 * Math.PI / e, I = this.scene.heroRoot.position, D = .3 * this.scene.getAtt(), F = function() {
            var i = 0 + P * N;
            B.scene.startTimer(function() {
              var a = B.zdSkinPrefab.addNode(I);
              a.angle = 180 * i / Math.PI;
              var r = a.getComponent("Bullet");
              r.initBy(B.scene, B, false, i);
              B.scene.addBullet(r);
            }, .06 * N);
          }, N = 0; N < e; N++) F();
          break;

         case 8:
          this.zdSkinPrefab.addNode(cc.Vec2.ZERO).getComponent("GameSkin8Line").initBy(this.scene, 1 - 1e-4 * this.scene.getSkinArg(), 2);
          break;

         case 9:
          var x = this.zdSkinPrefab.addNode(this.scene.heroRoot.position), _ = x.getComponent("GameSkin9Stick"), H = this.scene.findEnemy(this.scene.heroRoot.position, 64e4), z = H ? H.node.position : this.lastAttPos;
          x.angle = 180 * cc.pvz.utils.getRotationRadians(this.scene.heroRoot.position, z) / Math.PI;
          _.initBy(this.scene, 2);
        }
      }
    };
    __decorate([ property ], Hero.prototype, "skin", void 0);
    __decorate([ property ], Hero.prototype, "skinSkillCd", void 0);
    __decorate([ property(sp.Skeleton) ], Hero.prototype, "spine", void 0);
    __decorate([ property(cc.Vec2) ], Hero.prototype, "hurtNumPos", void 0);
    __decorate([ property(cc.Vec2) ], Hero.prototype, "addEnergyPos", void 0);
    __decorate([ property(cc.Vec2) ], Hero.prototype, "zdOffet", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Hero.prototype, "zdNormalPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Hero.prototype, "zdCritPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], Hero.prototype, "zdSkinPrefab", void 0);
    Hero = __decorate([ ccclass ], Hero);
    exports.default = Hero;
    cc._RF.pop();
  }, {
    "../main/PrefabInfo": "PrefabInfo",
    "./GameComponent": "GameComponent"
  } ],
  InviteKeyWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ccc8y0QgtOtqngTOe31IlE", "InviteKeyWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const NetworkManager_1 = require("../main/NetworkManager");
    const e = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let InviteKeyWindow = class InviteKeyWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.editBoxHandle = null;
      }
      init() {}
      show() {
        this.editBoxHandle.string = "";
        this.inputingText = "";
      }
      onChange() {
        this.inputingText = this.editBoxHandle.string;
      }
      submit() {
        var c, t;
        c = this, 5 === this.inputingText.length ? (t = this.inputingText.toUpperCase(), 
        NetworkManager_1.default.submitInviteCode(t, function(t) {
          0 === t.do ? t.toomany ? cc.popupManager.showToast("\u8fd9\u4e2a\u7528\u6237\u7684\u9080\u8bf7\u540d\u989d\u5df2\u6ee1") : t.invited ? cc.popupManager.showToast("\u5df2\u8f93\u5165\u8fc7\u5176\u5b83\u7528\u6237\u7684\u9080\u8bf7\u7801") : cc.popupManager.showToast("\u9080\u8bf7\u7801\u65e0\u6548") : (cc.popupManager.showToast("\u5df2\u6210\u529f\u586b\u5199\u9080\u8bf7\u7801"), 
          c.hide());
        }), console.log("Will submit:", t)) : cc.popupManager.showToast("\u8bf7\u8f93\u5165\u7b26\u5408\u683c\u5f0f\u7684\u9080\u8bf7\u7801");
      }
      hide() {
        cc.SubwindowManager.hideWindow(e.UIStatus.InviteKey);
      }
      start() {}
    };
    __decorate([ property(cc.EditBox) ], InviteKeyWindow.prototype, "editBoxHandle", void 0);
    InviteKeyWindow = __decorate([ ccclass ], InviteKeyWindow);
    exports.default = InviteKeyWindow;
    cc._RF.pop();
  }, {
    "../main/NetworkManager": "NetworkManager",
    "./SubwindowManager": "SubwindowManager"
  } ],
  InviteWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7fa84P749tIWpGO7lRKM6d0", "InviteWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MyRequest_1 = require("../main/MyRequest");
    const NetworkManager_1 = require("../main/NetworkManager");
    const UserIcon_1 = require("./UserIcon");
    const Tool_1 = require("./Tool");
    const s = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var g = 0;
    let InviteWindow = class InviteWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.userContainer = null;
        this.userPre = null;
        this.inviteKey = null;
        this.noFriend = null;
        this.friendInfoStr = null;
      }
      init() {}
      refresh(c, t) {
        if (void 0 === c && (c = []), void 0 === t && (t = {}), this.friendInfoStr[0].string = "" + c.length, 
        this.friendInfoStr[1].string = "\u653b\u51fb+" + 10 * c.length + "%\u3001\u751f\u547d+" + 10 * c.length + "%\u3001\u91d1\u5e01+" + 10 * c.length + "%", 
        0 !== c.length) {
          this.noFriend.active = false;
          for (var g = 0; g < c.length; g++) Tool_1.default.getPrefab(this.userContainer, this.userPre, "user" + g).getComponent(UserIcon_1.default).show({
            uid: c[g],
            name: t[c[g]].name,
            avatar: t[c[g]].avatarUrl
          });
        } else this.noFriend.active = true;
      }
      showInputKeyWindow() {
        cc.SubwindowManager.showWindow(s.UIStatus.InviteKey, {});
      }
      show() {
        var c;
        c = this;
        NetworkManager_1.default.getInviteUsers(function(t) {
          c.refresh(t.uids, t.uInfos);
        });
        this.inviteKey.string = MyRequest_1.default.userInfo.myIntiveCode;
      }
      share() {
        cc.pvz.TAUtils.share(function() {});
      }
      hide() {
        cc.SubwindowManager.hideWindow(s.UIStatus.Invite);
      }
      start() {}
    };
    __decorate([ property(cc.Node) ], InviteWindow.prototype, "userContainer", void 0);
    __decorate([ property(cc.Prefab) ], InviteWindow.prototype, "userPre", void 0);
    __decorate([ property(cc.Label) ], InviteWindow.prototype, "inviteKey", void 0);
    __decorate([ property(cc.Node) ], InviteWindow.prototype, "noFriend", void 0);
    __decorate([ property(cc.Label) ], InviteWindow.prototype, "friendInfoStr", void 0);
    InviteWindow = __decorate([ ccclass ], InviteWindow);
    exports.default = InviteWindow;
    cc._RF.pop();
  }, {
    "../main/MyRequest": "MyRequest",
    "../main/NetworkManager": "NetworkManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool",
    "./UserIcon": "UserIcon"
  } ],
  ItemIcon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7d773WUfnZHxq10HYsqWgGa", "ItemIcon");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const h = require("./ConfigCtrl");
    const e = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    var b, s;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var i = "icon";
    var i = "icon";
    var i = "anim";
    let ItemIcon = class ItemIcon extends cc.Component {
      constructor() {
        super(...arguments);
        this.anim = null;
        this.quaBg = null;
        this.quaBgSFS = null;
        this.icon = null;
        this.numStr = null;
        this.shining = null;
      }
      init(c, t, i) {
        var e, s, b = "image";
        if (e = this, this.type = c, this.id = t, this.num = i, this.shining && (this.shining.active = false), 
        this.quaBg.spriteFrame = this.quaBgSFS[cc.pvz.PlayerData.getItemQua(c, t) - 1], 
        1 === c) {
          s = h.Datas.Item[t];
          cc.pvz.utils.useBundleAsset(b, "Item/item" + t, cc.SpriteFrame, function(c) {
            e.icon.node.scale = 1;
            e.icon.spriteFrame = c;
          });
          this.shining && (this.shining.active = s.qua >= 5);
        } else if (2 === c) {
          var M;
          M = h.Datas.Weapon[t];
          cc.pvz.utils.useBundleAsset(b, "weapon_icon/weapon_" + t, cc.SpriteFrame, function(c) {
            e.icon.node.scale = .65;
            e.icon.spriteFrame = c;
          });
          this.shining && (this.shining.active = M.quality >= 3);
        } else if (3 === c) {
          var P;
          P = h.Datas.Skill[t];
          cc.pvz.utils.useBundleAsset(b, "skills/skill" + t, cc.SpriteFrame, function(c) {
            e.icon.node.scale = .65;
            e.icon.spriteFrame = c;
          });
          this.shining && (this.shining.active = P.qua >= 3);
        }
        this.numStr && (this.numStr.string = "" + Tool_1.default.formatNum2(i));
      }
      showInfo() {
        this.willShowInfo && cc.SubwindowManager.showWindow(e.UIStatus.ItemInfo, {
          item: [ this.type, this.id, this.num ],
          tags: [ 0, 0, 0 ],
          shopId: -1
        });
      }
      hide() {
        this.anim.node.active = false;
      }
      showAnim() {
        this.anim.node.active = true;
        this.anim.play(this.anim.getClips()[0].name);
      }
    };
    __decorate([ property(cc.Animation) ], ItemIcon.prototype, "anim", void 0);
    __decorate([ property(cc.Sprite) ], ItemIcon.prototype, "quaBg", void 0);
    __decorate([ property(cc.SpriteFrame) ], ItemIcon.prototype, "quaBgSFS", void 0);
    __decorate([ property(cc.Sprite) ], ItemIcon.prototype, "icon", void 0);
    __decorate([ property(cc.Label) ], ItemIcon.prototype, "numStr", void 0);
    __decorate([ property(cc.Node) ], ItemIcon.prototype, "shining", void 0);
    ItemIcon = __decorate([ ccclass ], ItemIcon);
    exports.default = ItemIcon;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  ItemInfoWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6ba63NbJ8tKA4ec3ACcm6u+", "ItemInfoWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const o = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const ItemIcon_1 = require("./ItemIcon");
    const Tool_1 = require("./Tool");
    const ShopWindow_1 = require("./ShopWindow");
    const e = require("./SubwindowManager");
    var P;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var W = 0;
    let ItemInfoWindow = class ItemInfoWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.bgSpr = null;
        this.bgSFS = null;
        this.descStrs = null;
        this.descStrs2 = null;
        this.iiPre = null;
        this.iiContainer = null;
        this.exNodes = null;
        this.tag2SFS = null;
        this.buyBtn = null;
        this.buyCost = null;
      }
      init() {}
      show(c) {
        var t, P = "\u5e93\u5b58:";
        if (void 0 === c && (c = {
          item: [ 0, 0, 0 ],
          tags: [ 0, 0, 0 ],
          shopId: 0
        }), Tool_1.default.getPrefab(this.iiContainer, this.iiPre, "itemIcon").getComponent(ItemIcon_1.default).init(c.item[0], c.item[1], c.item[2]), 
        this.bgSpr.spriteFrame = this.bgSFS[cc.pvz.PlayerData.getItemQua(c.item[0], c.item[1]) - 2], 
        1 === c.item[0]) {
          t = o.Datas.Item[c.item[1]];
          this.descStrs[0].string = t.name;
          this.descStrs[1].string = P + Math.floor(cc.pvz.PlayerData.itemNum(c.item[1]));
          this.descStrs2.string = t.desc;
        } else if (2 === c.item[0]) {
          var j;
          j = o.Datas.Weapon[c.item[1]];
          this.descStrs[0].string = j.name;
          this.descStrs[1].string = P + (cc.player.weaponInfo[c.item[1]] ? Math.min(1, cc.player.weaponInfo[c.item[1]][0]) : 0);
          this.descStrs2.string = Tool_1.default.getRicktextStr(j.desc, 0, [ [ j.atk ] ], [], [ "%" ], [ "", "" ]);
        } else if (3 === c.item[0]) {
          var G;
          G = o.Datas.Skill[c.item[1]];
          this.descStrs[0].string = G.name;
          this.descStrs[1].string = P + (cc.player.skillInfo[c.item[1]] ? Math.min(1, cc.player.skillInfo[c.item[1]][0]) : 0);
          this.descStrs2.string = Tool_1.default.getRicktextStr(G.desc, 0, G.valu, [], G.percent.map(function(c) {
            return c ? "%" : "";
          }), [ "", "" ]);
        }
        for (var W = 0; W < c.tags.length; W++) {
          this.exNodes[W].active = c.tags[W] > 0;
          2 === W && (this.exNodes[2].getComponent(cc.Sprite).spriteFrame = this.tag2SFS[c.tags[2] - 1]);
        }
        c.shopId >= 0 ? (this.shopId = c.shopId, this.buyBtn.active = true, this.buyCost.string = "" + o.Datas.Shop[cc.player.shop.inShop[c.shopId]].need) : this.buyBtn.active = false;
      }
      buy() {
        var c;
        c = o.Datas.Shop[cc.player.shop.inShop[this.shopId]];
        cc.pvz.PlayerData.itemNum(3) >= c.need ? (cc.pvz.PlayerData.itemNum(3, -c.need), 
        cc.pvz.PlayerData.getRewardBonus(c.item[0], c.item[1], c.item[2]), cc.player.shop.buy[this.shopId] = 1, 
        cc.pvz.PlayerData.increaseMissionProg(1601, 1), cc.pvz.PlayerData.increaseMissionProg(1602, 1), 
        cc.SubwindowManager.getWindowHandle(e.UIStatus.Shop).getComponent(ShopWindow_1.default).refreshInShop(), 
        this.hide(), cc.SubwindowManager.showWindow(e.UIStatus.GetItem, {
          items: c.item
        }), cc.pvz.PlayerData.saveData(), RedPointManager_1.default.check("DailyTask"), 
        RedPointManager_1.default.check("ArchieveTask"), 2 === c.item[1] && RedPointManager_1.default.check("WeaponStarUp")) : cc.popupManager.showToast(o.Datas.Tips[2].v.replace("{1}", o.Datas.Item[3].name));
      }
      hide() {
        cc.SubwindowManager.hideWindow(e.UIStatus.ItemInfo);
      }
      start() {}
    };
    __decorate([ property(cc.Sprite) ], ItemInfoWindow.prototype, "bgSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], ItemInfoWindow.prototype, "bgSFS", void 0);
    __decorate([ property(cc.Label) ], ItemInfoWindow.prototype, "descStrs", void 0);
    __decorate([ property(cc.RichText) ], ItemInfoWindow.prototype, "descStrs2", void 0);
    __decorate([ property(cc.Prefab) ], ItemInfoWindow.prototype, "iiPre", void 0);
    __decorate([ property(cc.Node) ], ItemInfoWindow.prototype, "iiContainer", void 0);
    __decorate([ property(cc.Node) ], ItemInfoWindow.prototype, "exNodes", void 0);
    __decorate([ property(cc.SpriteFrame) ], ItemInfoWindow.prototype, "tag2SFS", void 0);
    __decorate([ property(cc.Node) ], ItemInfoWindow.prototype, "buyBtn", void 0);
    __decorate([ property(cc.Label) ], ItemInfoWindow.prototype, "buyCost", void 0);
    ItemInfoWindow = __decorate([ ccclass ], ItemInfoWindow);
    exports.default = ItemInfoWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./ItemIcon": "ItemIcon",
    "./RedPointManager": "RedPointManager",
    "./ShopWindow": "ShopWindow",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  ItemNumStr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e171ea4iMBE74M27VacdEij", "ItemNumStr");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Tool_1 = require("./Tool");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ItemNumStr = class ItemNumStr extends cc.Component {
      constructor() {
        super(...arguments);
        this.iid = null;
      }
      start() {
        this.itemId = parseInt(this.iid);
        this.lastINum = cc.pvz.PlayerData.itemNum(this.itemId);
        this.node.getComponent(cc.Label).string = Tool_1.default.formatNum2(this.lastINum);
      }
      update() {
        cc.pvz.PlayerData.itemNum(this.itemId) !== this.lastINum && (this.lastINum = cc.pvz.PlayerData.itemNum(this.itemId), 
        this.node.getComponent(cc.Label).string = Tool_1.default.formatNum2(this.lastINum));
      }
    };
    __decorate([ property ], ItemNumStr.prototype, "iid", void 0);
    ItemNumStr = __decorate([ ccclass ], ItemNumStr);
    exports.default = ItemNumStr;
    cc._RF.pop();
  }, {
    "./Tool": "Tool"
  } ],
  LabInfoWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2295Sg2SpA8ad9xOduUwjF", "LabInfoWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const r = require("./ConfigCtrl");
    const h = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var M = 0;
    var n = "curLevel";
    var t = "curLevel";
    let LabInfoWindow = class LabInfoWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.infoStrs = null;
        this.strNodes = null;
        this.progBar = null;
        this.lrArrows = null;
      }
      init() {}
      show() {
        this.curLevel = cc.player.labBoxLv[0];
        r.Datas.LabLv[this.curLevel + 1] || this.curLevel--;
        this.refresh();
      }
      refresh() {
        var c;
        this.infoStrs[0].string = "" + this.curLevel;
        this.infoStrs[1].string = "" + (this.curLevel + 1);
        this.infoStrs[2].string = r.Datas.LabLv[this.curLevel].num;
        this.infoStrs[3].string = r.Datas.LabLv[this.curLevel + 1].num;
        c = this.curLevel < cc.player.labBoxLv[0] ? [ r.Datas.LabLv[this.curLevel].exp, r.Datas.LabLv[this.curLevel].exp ] : this.curLevel === cc.player.labBoxLv[0] ? [ cc.player.labBoxLv[1], r.Datas.LabLv[this.curLevel].exp ] : [ 0, r.Datas.LabLv[this.curLevel].exp ];
        this.infoStrs[4].string = c[0] + "/" + c[1];
        this.progBar.progress = c[0] / c[1];
        for (var M = 0; M < this.strNodes.length; M++) {
          this.strNodes[M].getChildByName("lv1").getComponent(cc.Label).string = "" + r.Datas.LabLv[this.curLevel].weight[M];
          this.strNodes[M].getChildByName("lv2").getComponent(cc.Label).string = "" + r.Datas.LabLv[this.curLevel + 1].weight[M];
        }
        this.lrArrows[0].active = this.curLevel > 1;
        this.lrArrows[1].active = !!r.Datas.LabLv[this.curLevel + 2];
      }
      showNext() {
        this.curLevel++;
        r.Datas.LabLv[this.curLevel + 1] || this.curLevel--;
        this.refresh();
      }
      showPrev() {
        this.curLevel--;
        this.curLevel < 1 && (this.curLevel = 1);
        this.refresh();
      }
      hide() {
        cc.SubwindowManager.hideWindow(h.UIStatus.LabInfo);
      }
      start() {}
    };
    __decorate([ property(cc.Label) ], LabInfoWindow.prototype, "infoStrs", void 0);
    __decorate([ property(cc.Node) ], LabInfoWindow.prototype, "strNodes", void 0);
    __decorate([ property(cc.ProgressBar) ], LabInfoWindow.prototype, "progBar", void 0);
    __decorate([ property(cc.Node) ], LabInfoWindow.prototype, "lrArrows", void 0);
    LabInfoWindow = __decorate([ ccclass ], LabInfoWindow);
    exports.default = LabInfoWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager"
  } ],
  LabItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a645doH1vJGNbNSbuV6OGDc", "LabItem");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const NetworkManager_1 = require("../main/NetworkManager");
    const u = require("./ConfigCtrl");
    const a = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    var I, s;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LabItem = class LabItem extends cc.Component {
      constructor() {
        super(...arguments);
        this.bgSpr = null;
        this.bgSFS = null;
        this.anims = null;
        this.boxPos = null;
        this.boxNode = null;
        this.remainTimeStr = null;
        this.btns = null;
        this.isOver = null;
      }
      init(c, t) {
        var i, n, e;
        i = this;
        this.idx = c;
        this.par = t;
        e = cc.player.labBoxInfo[this.idx];
        n = u.Datas.LabBox[e[0]];
        this.bgSpr.spriteFrame = this.bgSFS[n.quality - 1];
        cc.pvz.utils.useBundleAsset("image", "Item/item" + n.reward[1], cc.SpriteFrame, function(c) {
          i.boxNode.getChildByName("anim").getChildByName("icon").getComponent(cc.Sprite).spriteFrame = c;
        });
        this.boxNode.getChildByName("anim").getChildByName("num").getComponent(cc.Label).string = n.reward[2];
        this.refresh();
      }
      playAnim(c) {
        void 0 === c && (c = 1);
        1 === c ? 0 === this.animState && (this.anims.map(function(c) {
          return c.play(c.getClips()[0].name);
        }), this.animState = 1) : 0 === c && 1 === this.animState && (this.anims.map(function(c) {
          return c.stop();
        }), this.animState = 0);
      }
      refresh() {
        var c, t, i, e, s, I = "\u5269\u4f59\u65f6\u95f4 ";
        i = cc.player.labBoxInfo[this.idx], t = u.Datas.LabBox[i[0]], this.btns.map(function(c) {
          return c.active = false;
        }), this.isOver.active = false, c = u.Datas.LabBoxQ[t.quality].time, 0 === i[1] ? (this.btns[0].active = true, 
        this.remainTimeStr[0].string = I + Tool_1.default.formatCountDown(c, true), this.remainTimeStr[1].string = "0%", 
        this.boxNode.x = this.boxPos[0].x, this.playAnim(0)) : (this.playAnim(1), s = Math.floor(Date.now() / 1e3), 
        e = Math.max(0, c - (s - i[1]) - i[2]), this.boxNode.x = this.boxPos[0].x + (this.boxPos[1].x - this.boxPos[0].x) * (c - e) / c, 
        e > 0 ? (this.btns[1].active = true, this.btns[3].active = true, this.remainTimeStr[0].string = I + Tool_1.default.formatCountDown(e, true), 
        this.remainTimeStr[1].string = Math.floor(100 * (c - e) / c) + "%") : (this.btns[2].active = true, 
        this.btns[3].active = true, this.isOver.active = true, this.remainTimeStr[0].string = "\u5df2\u5b8c\u6210", 
        this.remainTimeStr[1].string = "100%"));
      }
      startGetBox() {
        var c;
        c = this;
        cc.player.labBoxLv[4] >= u.Datas.LabLv[cc.player.labBoxLv[0]].num ? cc.popupManager.showToast(u.Datas.Tips[24].v) : NetworkManager_1.default.timeCheck(function() {
          cc.player.labBoxInfo[c.idx][1] = Math.floor(Date.now() / 1e3);
          cc.player.labBoxLv[4]++;
          c.par.refreshTexts();
          c.refresh();
        }, function() {
          cc.popupManager.showToast("\u7f51\u7edc\u8fde\u63a5\u5931\u8d25");
        });
      }
      accrBox() {
        var c;
        c = this;
        cc.pvz.AdUtils.willShowAdRewardVideo(cc.pvz.GameConst.AdType["\u52a0\u901f\u4f20\u9001\u5e26"], function(t) {
          t && (cc.player.labBoxInfo[c.idx][2] += 3600, cc.pvz.PlayerData.saveData(), c.refresh());
        });
      }
      abandonBox() {
        cc.player.labBoxInfo[this.idx][1] = 0;
        cc.player.labBoxInfo[this.idx][2] = 0;
        cc.player.labBoxLv[4]--;
        this.par.refreshTexts();
        this.refresh();
      }
      doGetBox() {
        var c, t;
        if (c = cc.player.labBoxInfo[this.idx], t = u.Datas.LabBox[c[0]], cc.pvz.PlayerData.getRewardBonus(t.reward[0], t.reward[1], t.reward[2]), 
        cc.SubwindowManager.showWindow(a.UIStatus.GetItem, {
          items: t.reward
        }), u.Datas.LabLv[cc.player.labBoxLv[0] + 1]) for (cc.player.labBoxLv[1] += u.Datas.LabBoxQ[t.quality].exp; cc.player.labBoxLv[1] > u.Datas.LabLv[cc.player.labBoxLv[0]].exp; ) {
          cc.player.labBoxLv[1] -= u.Datas.LabLv[cc.player.labBoxLv[0]].exp;
          cc.player.labBoxLv[0]++;
        }
        cc.pvz.PlayerData.createNewLabBox(this.idx);
        this.par.refreshTexts();
        this.init(this.idx, this.par);
        cc.pvz.PlayerData.saveData();
      }
      start() {}
      update(c) {
        this.tCount += c;
        this.tCount >= .5 && (this.tCount -= .5, this.refresh());
      }
    };
    __decorate([ property(cc.Sprite) ], LabItem.prototype, "bgSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], LabItem.prototype, "bgSFS", void 0);
    __decorate([ property(cc.Animation) ], LabItem.prototype, "anims", void 0);
    __decorate([ property(cc.Node) ], LabItem.prototype, "boxPos", void 0);
    __decorate([ property(cc.Node) ], LabItem.prototype, "boxNode", void 0);
    __decorate([ property(cc.Label) ], LabItem.prototype, "remainTimeStr", void 0);
    __decorate([ property(cc.Node) ], LabItem.prototype, "btns", void 0);
    __decorate([ property(cc.Node) ], LabItem.prototype, "isOver", void 0);
    LabItem = __decorate([ ccclass ], LabItem);
    exports.default = LabItem;
    cc._RF.pop();
  }, {
    "../main/NetworkManager": "NetworkManager",
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  LabWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "983d7xI4yNBB4hwGw4Osa/S", "LabWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const u = require("./ConfigCtrl");
    const EnabledBtn_1 = require("./EnabledBtn");
    const LabItem_1 = require("./LabItem");
    const Tool_1 = require("./Tool");
    const n = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LabWindow = class LabWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.LabItemPre = null;
        this.LabItemContainer = null;
        this.lvInfoStrs = null;
        this.lvProgBar = null;
        this.getTimesStr = null;
        this.btnNode = null;
        this.refAdIcon = null;
        this.refStr = null;
      }
      init() {}
      show() {
        cc.pvz.PlayerData.resetDailyData();
        for (var o = false, r = 0; r < cc.player.labBoxInfo.length; r++) 0 === cc.player.labBoxInfo[r][0] && (cc.pvz.PlayerData.createNewLabBox(r), 
        o = true);
        o && cc.pvz.PlayerData.saveData();
        this.refresh();
      }
      refresh() {
        for (var s = 0; s < cc.player.labBoxInfo.length; s++) Tool_1.default.getPrefab(this.LabItemContainer, this.LabItemPre, "l" + s).getComponent(LabItem_1.default).init(s, this);
        this.refreshTexts();
        this.refreshBtn();
      }
      refreshTexts() {
        this.lvInfoStrs[0].string = "" + cc.player.labBoxLv[0];
        u.Datas.LabLv[cc.player.labBoxLv[0] + 1] ? (this.lvInfoStrs[1].string = cc.player.labBoxLv[1] + "/" + u.Datas.LabLv[cc.player.labBoxLv[0]].exp, 
        this.lvProgBar.progress = cc.player.labBoxLv[1] / u.Datas.LabLv[cc.player.labBoxLv[0]].exp) : (this.lvInfoStrs[1].string = "\u5df2\u6ee1\u7ea7", 
        this.lvProgBar.progress = 1);
        this.getTimesStr.string = u.Datas.LabLv[cc.player.labBoxLv[0]].num - cc.player.labBoxLv[4] + "/" + u.Datas.LabLv[cc.player.labBoxLv[0]].num;
      }
      refreshBtn() {
        cc.player.labBoxLv[2] < 3 ? (this.btnNode.getComponent(EnabledBtn_1.default).setEnable(true), 
        this.refAdIcon.active = false, this.refStr.string = "\u5237\u65b0(" + (3 - cc.player.labBoxLv[2]) + ")") : cc.player.labBoxLv[3] < 10 ? (this.btnNode.getComponent(EnabledBtn_1.default).setEnable(true), 
        this.refAdIcon.active = true, this.refStr.string = "\u5237\u65b0(" + (10 - cc.player.labBoxLv[3]) + ")") : (this.btnNode.getComponent(EnabledBtn_1.default).setEnable(false), 
        this.refAdIcon.active = false, this.refStr.string = "\u5237\u65b0");
      }
      doRefresh() {
        var c;
        if (c = this, false !== this.btnNode.getComponent(EnabledBtn_1.default).enabled) {
          for (var _ = 0, p = 0; p < cc.player.labBoxInfo.length; p++) 0 === cc.player.labBoxInfo[p][1] && (_ = 1);
          _ ? cc.player.labBoxLv[2] < 3 ? (cc.player.labBoxLv[2]++, this._doRefresh()) : cc.player.labBoxLv[3] < 10 && cc.pvz.AdUtils.willShowAdRewardVideo(cc.pvz.GameConst.AdType["\u5237\u65b0\u5b9e\u9a8c\u5ba4"], function(t) {
            t && (cc.player.labBoxLv[3]++, c._doRefresh());
          }) : cc.popupManager.showToast(u.Datas.Tips[25].v);
        }
      }
      _doRefresh() {
        for (var o = 0; o < cc.player.labBoxInfo.length; o++) 0 === cc.player.labBoxInfo[o][1] && cc.pvz.PlayerData.createNewLabBox(o);
        cc.pvz.PlayerData.saveData();
        this.refresh();
      }
      showLabInfo() {
        cc.SubwindowManager.showWindow(n.UIStatus.LabInfo, {});
      }
      hide() {
        cc.SubwindowManager.hideWindow(n.UIStatus.Lab);
      }
      start() {}
    };
    __decorate([ property(cc.Prefab) ], LabWindow.prototype, "LabItemPre", void 0);
    __decorate([ property(cc.Node) ], LabWindow.prototype, "LabItemContainer", void 0);
    __decorate([ property(cc.Label) ], LabWindow.prototype, "lvInfoStrs", void 0);
    __decorate([ property(cc.ProgressBar) ], LabWindow.prototype, "lvProgBar", void 0);
    __decorate([ property(cc.Label) ], LabWindow.prototype, "getTimesStr", void 0);
    __decorate([ property(cc.Node) ], LabWindow.prototype, "btnNode", void 0);
    __decorate([ property(cc.Node) ], LabWindow.prototype, "refAdIcon", void 0);
    __decorate([ property(cc.Label) ], LabWindow.prototype, "refStr", void 0);
    LabWindow = __decorate([ ccclass ], LabWindow);
    exports.default = LabWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./EnabledBtn": "EnabledBtn",
    "./LabItem": "LabItem",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  MailInfo2Window: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1208cPfXgVLYbBctL4xsCP/", "MailInfo2Window");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const RedPointManager_1 = require("./RedPointManager");
    const MailWindow_1 = require("./MailWindow");
    const n = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MailInfo2Window = class MailInfo2Window extends cc.Component {
      constructor() {
        super(...arguments);
        this.mailConfig = null;
        this.btns = null;
      }
      init() {}
      show(c) {
        void 0 === c && (c = {});
        this.btns[0].active = 2 !== cc.player.mailGetInfo[2];
      }
      getBonus() {
        var c;
        c = this.mailConfig.json[this.idx - 1];
        cc.pvz.PlayerData.getRewardBonus(c.reward[0], c.reward[1], c.reward[2]);
        cc.player.mailGetInfo[this.idx] = 2;
        cc.SubwindowManager.showWindow(n.UIStatus.GetItem, {
          items: c.reward,
          showFlyTo: 1
        });
        cc.SubwindowManager.getWindowHandle(n.UIStatus.Mail).getComponent(MailWindow_1.default).refresh();
        this.btns[0].active = false;
        this.hide();
        RedPointManager_1.default.check("Mail");
        cc.pvz.PlayerData.saveData();
      }
      hide() {
        cc.SubwindowManager.hideWindow(n.UIStatus.MailInfo2);
      }
      start() {}
    };
    __decorate([ property(cc.JsonAsset) ], MailInfo2Window.prototype, "mailConfig", void 0);
    __decorate([ property(cc.Node) ], MailInfo2Window.prototype, "btns", void 0);
    MailInfo2Window = __decorate([ ccclass ], MailInfo2Window);
    exports.default = MailInfo2Window;
    cc._RF.pop();
  }, {
    "./MailWindow": "MailWindow",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager"
  } ],
  MailInfoWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "28878IirK5G2IJ7A6/fulu6", "MailInfoWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const r = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const ItemIcon_1 = require("./ItemIcon");
    const Tool_1 = require("./Tool");
    const MailWindow_1 = require("./MailWindow");
    const s = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var m = 0;
    let MailInfoWindow = class MailInfoWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.iiPre = null;
        this.iiContainer = null;
        this.mailContent = null;
        this.getBtn = null;
        this.isGot = null;
      }
      init() {}
      show(c) {
        var t;
        void 0 === c && (c = {
          idx: 1
        });
        this.idx = c.idx;
        t = r.Datas.Mail[c.idx];
        this.iiContainer.children.map(function(c) {
          return c.active = false;
        });
        this.isGot.map(function(c) {
          return c.active = false;
        });
        this.getBtn.active = 2 !== cc.player.mailGetInfo[this.idx];
        for (var m = 0; m < t.reward.length; m += 3) {
          Tool_1.default.getPrefab(this.iiContainer, this.iiPre, "ii" + m / 3).getComponent(ItemIcon_1.default).init(t.reward[m], t.reward[m + 1], t.reward[m + 2]);
          this.isGot[m / 3].active = !this.getBtn.active;
        }
        this.mailContent.string = t.desc;
      }
      getBonus() {
        for (var g = r.Datas.Mail[this.idx], m = 0; m < g.reward.length; m += 3) {
          cc.pvz.PlayerData.getRewardBonus(g.reward[m], g.reward[m + 1], g.reward[m + 2]);
          this.isGot[m / 3].active = true;
        }
        cc.player.mailGetInfo[this.idx] = 2;
        cc.SubwindowManager.showWindow(s.UIStatus.GetItem, {
          items: g.reward,
          showFlyTo: 1
        });
        cc.SubwindowManager.getWindowHandle(s.UIStatus.Mail).getComponent(MailWindow_1.default).refresh();
        this.getBtn.active = false;
        this.hide();
        RedPointManager_1.default.check("Mail");
        cc.pvz.PlayerData.saveData();
      }
      hide() {
        cc.SubwindowManager.hideWindow(s.UIStatus.MailInfo);
      }
      start() {}
    };
    __decorate([ property(cc.Prefab) ], MailInfoWindow.prototype, "iiPre", void 0);
    __decorate([ property(cc.Node) ], MailInfoWindow.prototype, "iiContainer", void 0);
    __decorate([ property(cc.RichText) ], MailInfoWindow.prototype, "mailContent", void 0);
    __decorate([ property(cc.Node) ], MailInfoWindow.prototype, "getBtn", void 0);
    __decorate([ property(cc.Node) ], MailInfoWindow.prototype, "isGot", void 0);
    MailInfoWindow = __decorate([ ccclass ], MailInfoWindow);
    exports.default = MailInfoWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./ItemIcon": "ItemIcon",
    "./MailWindow": "MailWindow",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  MailPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0a0c91cXTxD46cR4o6HIg8a", "MailPanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const r = require("./ConfigCtrl");
    const o = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MailPanel = class MailPanel extends cc.Component {
      constructor() {
        super(...arguments);
        this.title = null;
        this.isGet = null;
        this.mailIcon = null;
      }
      init(c) {
        var t;
        this.mailId = c;
        (t = cc.player.mailGetInfo[this.mailId]) || (t = 0);
        this.title.string = r.Datas.Mail[this.mailId].title;
        this.mailIcon[0].active = 0 === t;
        this.mailIcon[1].active = 0 !== t;
        this.mailIcon[2].active = 2 !== t;
        this.node.getChildByName("");
        this.isGet.active = 2 === t;
      }
      onClick() {
        cc.player.mailGetInfo[this.mailId] || (cc.player.mailGetInfo[this.mailId] = 1, this.init(this.mailId));
        2 == this.mailId ? cc.SubwindowManager.showWindow(o.UIStatus.MailInfo2, {
          idx: this.mailId
        }) : cc.SubwindowManager.showWindow(o.UIStatus.MailInfo, {
          idx: this.mailId
        });
      }
      start() {}
    };
    __decorate([ property(cc.Label) ], MailPanel.prototype, "title", void 0);
    __decorate([ property(cc.Node) ], MailPanel.prototype, "isGet", void 0);
    __decorate([ property(cc.Node) ], MailPanel.prototype, "mailIcon", void 0);
    MailPanel = __decorate([ ccclass ], MailPanel);
    exports.default = MailPanel;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager"
  } ],
  MailWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b4e61d6v79OyqEribkzr+9M", "MailWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const u = require("./ConfigCtrl");
    const MailPanel_1 = require("./MailPanel");
    const Tool_1 = require("./Tool");
    const e = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MailWindow = class MailWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.mailNodePre = null;
        this.mailNodeContainer = null;
      }
      init() {}
      show() {
        this.refresh();
      }
      refresh() {
        for (var o in u.Datas.Mail) u.Datas.Mail[o].show && Tool_1.default.getPrefab(this.mailNodeContainer, this.mailNodePre, "" + o).getComponent(MailPanel_1.default).init(parseInt(o));
      }
      hide() {
        cc.SubwindowManager.hideWindow(e.UIStatus.Mail);
      }
      start() {}
    };
    __decorate([ property(cc.Prefab) ], MailWindow.prototype, "mailNodePre", void 0);
    __decorate([ property(cc.Node) ], MailWindow.prototype, "mailNodeContainer", void 0);
    MailWindow = __decorate([ ccclass ], MailWindow);
    exports.default = MailWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./MailPanel": "MailPanel",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  MainUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "63961RsII1BuaY508reiQY1", "MainUI");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MyRequest_1 = require("../main/MyRequest");
    const s = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const Nevigator_1 = require("./Nevigator");
    const f = require("./SubwindowManager");
    const EffSpine_1 = require("./EffSpine");
    const FlyingBonus_1 = require("./FlyingBonus");
    const MissionMain_1 = require("./MissionMain");
    const Pool_1 = require("./Pool");
    const Tool_1 = require("./Tool");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var c = "clickMaskCb";
    let MainUI = class MainUI extends cc.Component {
      constructor() {
        super(...arguments);
        this.bgMusic = null;
        this.mainNegivator = null;
        this.topUIShow = null;
        this.pageContainer = null;
        this.pagePre = null;
        this.tipPre = null;
        this.tipContainer = null;
        this.bonusItemFlyDest = null;
        this.flyItemPool = null;
        this.userNameStr = null;
        this.userAvatar = null;
        this.mainMissionPanel = null;
        this.bpChange = null;
        this.willLockBtnNodes = null;
        this.grayMater = null;
        this.finger = null;
        this.authHint = null;
      }
      showTopUIBy(c) {
        var t;
        t = this;
        void 0 === c && (c = []);
        this.topUIShow.map(function(c) {
          return c && (c.active = false);
        });
        c.map(function(c) {
          return t.topUIShow[c - 1].active = true;
        });
      }
      showPage(c) {
        for (var u = "Page", f = 0; f < this.pageContainer.length; f++) {
          this.pageContainer[f].active = f === c - 1;
          this.pageContainer[f].active && (this.pagePre[f] && Tool_1.default.getPrefab(this.pageContainer[f], this.pagePre[f], u + (f + 1) + "Body"), 
          this.pageContainer[f].getComponentInChildren(u + (f + 1)), this.pageContainer[f].getComponentInChildren(u + (f + 1)).refresh());
        }
        this.showTopUIBy(s.Datas.Config[c + 3].v);
      }
      showTip(c) {
        for (var t, i, n, s, d = [], l = 1; l < arguments.length; l++) d[l - 1] = arguments[l];
        (t = (s = Tool_1.default.getPrefab(this.tipContainer, this.tipPre, "tip")).getComponentInChildren(cc.Animation)).play(t.getClips()[0].name);
        t.once("finished", function() {
          s.active = false;
        });
        n = 0;
        i = c.replace(/\{[0-9]\}/g, function() {
          return d[n++];
        });
        s.getComponentInChildren(cc.Label).string = i;
      }
      showBonus(c, t, i, n) {
        var e;
        if (void 0 === n && (n = -1), -1 === n) {
          if (void 0 === (n = {
            4: 0,
            3: 1,
            2: 2,
            36: 3,
            37: 4,
            38: 5,
            39: 6
          }[t])) return;
          !1 === this.bonusItemFlyDest[n].parent.active && (n = this.bonusItemFlyDest.length - 1);
        }
        e = this.flyItemPool.getNewPoolItem();
        c ? e.setPosition(this.flyItemPool.node.convertToNodeSpaceAR(c.convertToWorldSpaceAR(new cc.Vec2(0, 0)))) : e.setPosition(new cc.Vec2(0, 0));
        e.getComponent(FlyingBonus_1.default).init(t, i, this.bonusItemFlyDest[n]);
      }
      showAuthWindow() {
        cc.SubwindowManager.showWindow(f.UIStatus.Auth, {});
        this.authHint.active = false;
      }
      showStaminaAdGetWindow() {
        cc.SubwindowManager.showWindow(f.UIStatus.StaminaAdGet, {});
      }
      refreshUserInfo() {
        var c;
        c = this;
        MyRequest_1.default.userInfo.nick.length > 0 && (this.userNameStr.string = "NONAME" == MyRequest_1.default.userInfo.nick ? "\u529f\u592b\u5b97\u5e08" : MyRequest_1.default.userInfo.nick);
        MyRequest_1.default.userInfo.avatar.length > 0 && cc.assetManager.loadRemote(MyRequest_1.default.userInfo.avatar, {
          ext: ".jpg"
        }, function(_t, i) {
          var n;
          c.isValid ? ((n = new cc.SpriteFrame()).setTexture(i), c.userAvatar.spriteFrame = n) : cc.pvz.TAUtils.trackWarn("set avatar after destroy");
        });
      }
      onClickClickMask() {
        this.clickMaskCb && (this.clickMaskCb(), this.clickMaskCb = null);
      }
      refreshMainMission() {
        this.mainMissionPanel.getComponent(MissionMain_1.default).refreshProg();
      }
      refreshAllLockInfo() {
        for (var n = 14, h = [ 3, 4, 5, 6, 8, 12, 13, 15, 17, 22, 36, n, n, 19 ], a = 0; a < h.length; a++) {
          var u;
          u = s.Datas.GrowRoadUnlockInfo[h[a]];
          1e3 * cc.player.levelProg[0] + cc.player.levelProg[1] >= u.type2s || this.willLockBtnNodes[a] && (this.willLockBtnNodes[a].active = false);
        }
      }
      checkFuncUnlock(c, t) {
        var i, n, u = 1e3;
        if (void 0 === t && (t = true), i = s.Datas.GrowRoadUnlockInfo[c], u * cc.player.levelProg[0] + cc.player.levelProg[1] >= i.type2s) return true;
        t && (n = s.Datas.Tips[10].v.replace("{1}", "" + s.Datas.LevelInfo[Math.floor(i.type2s / u)].name + i.type2s % u), 
        cc.popupManager.showToast(n));
        return false;
      }
      showFingerAt(c, t) {
        var i;
        (c || (this.finger.active = false), t >= 17 && t <= 41 && (t = 1), this.FingerPos[t]) && (this.finger.active = true, 
        i = this.FingerPos[t], this.finger.setPosition(this.finger.parent.convertToNodeSpaceAR(i.convertToWorldSpaceAR(new cc.Vec2(0, 0)))), 
        this.finger.getChildByName("Finger").getComponent(EffSpine_1.default).play(2));
      }
      onLoad() {
        cc.MainUI = this;
        this.FingerPos = {};
        this.tCount = 0;
        this.tCount2 = 0;
        this.lastBuffEff = [];
      }
      start() {
        var c;
        if (c = this, this.showTopUIBy(s.Datas.Config[6].v), this.refreshUserInfo(), this.refreshAllLockInfo(), 
        Tool_1.default.displayBPChange(), RedPointManager_1.default.init(), this.authHint.active = !!window["wx"] && 0 === MyRequest_1.default.userInfo.avatar.length, 
        cc.pvz.exitMode && cc.pvz.exitMode > 0 && setTimeout(function() {
          c.mainNegivator.getComponent(Nevigator_1.default).onBtnClick(null, "5");
        }, 0), cc.pvz.gameRewards && cc.pvz.gameRewards.length > 0 && setTimeout(function() {
          for (var s = 0; s < cc.pvz.gameRewards.length; s++) {
            var o, r;
            o = cc.pvz.gameRewards[s].id;
            (r = cc.pvz.gameRewards[s].count) > 0 && c.showBonus(cc.find("Canvas"), o, r);
          }
          cc.pvz.gameRewards = [];
        }, 100), cc.butler.playMusic(this.bgMusic), cc.pvz.gifts) {
          if (cc.pvz.gifts.length > 0) {
            for (var k = "\u83b7\u5f97\u989d\u5916\u5956\u52b1\uff1a", C = 0; C < cc.pvz.gifts.length; C += 3) {
              cc.pvz.PlayerData.getRewardBonus(cc.pvz.gifts[C], cc.pvz.gifts[C + 1], cc.pvz.gifts[C + 2]);
              k += s.Datas.Item[cc.pvz.gifts[C + 1]].name + "x" + cc.pvz.gifts[C + 2] + " ";
            }
            cc.popupManager.showToast(k);
            cc.pvz.PlayerData.saveData();
          }
          delete cc.pvz.gifts;
        }
      }
      checkAdBuffDis() {
        var n = 1e3;
        if (0 === this.lastBuffEff.length) for (var f = 0; f < cc.player.ADBattleBuff.length; f++) cc.player.ADBattleBuff[f].tillTime > Date.now() / n ? this.lastBuffEff.push(1) : this.lastBuffEff.push(0); else for (f = 0; f < cc.player.ADBattleBuff.length; f++) cc.player.ADBattleBuff[f].tillTime > Date.now() / n ? this.lastBuffEff[f] = 1 : (1 === this.lastBuffEff[f] && Tool_1.default.displayBPChange(), 
        this.lastBuffEff[f] = 0);
      }
      refreshAllTimerRedP() {
        cc.MainUI && (RedPointManager_1.default.check("WeaponGet"), RedPointManager_1.default.check("Page5"), 
        RedPointManager_1.default.check("SlotGame"), RedPointManager_1.default.check("ExGame1"), 
        RedPointManager_1.default.check("ExGame2"), RedPointManager_1.default.check("FreeStamina"));
      }
      update(c) {
        this.tCount += c;
        this.tCount2 += c;
        this.tCount >= 5 && (this.tCount -= 5, this.refreshAllTimerRedP());
        this.tCount2 >= 1 && this.checkAdBuffDis();
      }
    };
    __decorate([ property(cc.AudioClip) ], MainUI.prototype, "bgMusic", void 0);
    __decorate([ property(cc.Node) ], MainUI.prototype, "mainNegivator", void 0);
    __decorate([ property(cc.Node) ], MainUI.prototype, "topUIShow", void 0);
    __decorate([ property(cc.Node) ], MainUI.prototype, "pageContainer", void 0);
    __decorate([ property(cc.Prefab) ], MainUI.prototype, "pagePre", void 0);
    __decorate([ property(cc.Prefab) ], MainUI.prototype, "tipPre", void 0);
    __decorate([ property(cc.Node) ], MainUI.prototype, "tipContainer", void 0);
    __decorate([ property(cc.Node) ], MainUI.prototype, "bonusItemFlyDest", void 0);
    __decorate([ property(Pool_1.default) ], MainUI.prototype, "flyItemPool", void 0);
    __decorate([ property(cc.Label) ], MainUI.prototype, "userNameStr", void 0);
    __decorate([ property(cc.Sprite) ], MainUI.prototype, "userAvatar", void 0);
    __decorate([ property(cc.Node) ], MainUI.prototype, "mainMissionPanel", void 0);
    __decorate([ property(cc.Node) ], MainUI.prototype, "bpChange", void 0);
    __decorate([ property(cc.Node) ], MainUI.prototype, "willLockBtnNodes", void 0);
    __decorate([ property(cc.Material) ], MainUI.prototype, "grayMater", void 0);
    __decorate([ property(cc.Node) ], MainUI.prototype, "finger", void 0);
    __decorate([ property(cc.Node) ], MainUI.prototype, "authHint", void 0);
    MainUI = __decorate([ ccclass ], MainUI);
    exports.default = MainUI;
    cc._RF.pop();
  }, {
    "../main/MyRequest": "MyRequest",
    "./ConfigCtrl": "ConfigCtrl",
    "./EffSpine": "EffSpine",
    "./FlyingBonus": "FlyingBonus",
    "./MissionMain": "MissionMain",
    "./Nevigator": "Nevigator",
    "./Pool": "Pool",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  MetaStageInfoWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f31aaMV4sJNzpZLYyA22Nqs", "MetaStageInfoWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const h = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    const a = require("./SubwindowManager");
    var g, M, P, p, n;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MetaStageInfoWindow = class MetaStageInfoWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.icon = null;
        this.iconSFS = null;
        this.titleStr = null;
        this.levelStr = null;
        this.bonusNodes = null;
        this.lastStage = null;
        this.remainTimesStr = null;
        this.quickPassBtn = null;
        this.lrBtn = null;
      }
      init() {}
      show(c) {
        var t, i, g = "MetaStage", M = "image", P = "Item/item";
        t = this;
        void 0 === c && (c = {
          type: 0
        });
        this.type = c.type;
        this.curLevel = cc.player.metaStageInfo[this.type][0] + 1;
        this.icon.spriteFrame = this.iconSFS[c.type - 1];
        this.titleStr.string = h.Datas.MetaStageInfo[this.type].name;
        (i = h.Datas[g + this.type][this.curLevel]) || (this.curLevel = Object.keys(h.Datas[g + this.type]).length, 
        i = h.Datas[g + this.type][this.curLevel]);
        cc.pvz.utils.setSpriteFrame(this.bonusNodes[0].getComponentInChildren(cc.Sprite), M, P + i.rwd[1]);
        3 === this.type ? (this.bonusNodes[1].active = true, cc.pvz.utils.setSpriteFrame(this.bonusNodes[1].getComponentInChildren(cc.Sprite), M, P + (i.rwd[1] + 1))) : this.bonusNodes[1].active = false;
        this.changeCurLevel(null, "0");
        this.remainTimesStr.string = "\u6b21\u6570:" + Math.floor(cc.player.metaStageInfo[this.type][1]);
        cc.player.metaStageInfo[this.type][0] < 20 ? this.quickPassBtn.active = false : this.quickPassBtn.active = true;
        this.lrBtn.map(function(c) {
          return c.active = t.curLevel > 1;
        });
      }
      changeCurLevel(_c, t) {
        var i, n, p = "MetaStage";
        i = parseInt(t);
        this.curLevel += i;
        this.curLevel < 1 ? (this.curLevel = cc.player.metaStageInfo[this.type][0] + 1, 
        h.Datas[p + this.type][this.curLevel] || (this.curLevel = Object.keys(h.Datas[p + this.type]).length)) : (this.curLevel > cc.player.metaStageInfo[this.type][0] + 1 || !h.Datas[p + this.type][this.curLevel]) && (this.curLevel = 1);
        this.levelStr.string = "\u96be\u5ea6" + this.curLevel;
        this.lastStage.active = this.curLevel === cc.player.metaStageInfo[this.type][0] + 1;
        n = h.Datas[p + this.type][this.curLevel];
        this.bonusNodes[0].getComponentInChildren(cc.Label).string = Tool_1.default.formatNum2(n.rwd[2]);
        3 === this.type && (this.bonusNodes[1].getComponentInChildren(cc.Label).string = Tool_1.default.formatNum2(n.rwd[2]));
      }
      getStageBonus(c) {
        var t, i;
        i = [ (t = h.Datas["MetaStage" + this.type][c]).rwd[0], t.rwd[1], t.rwd[2] ];
        cc.pvz.PlayerData.getRewardBonus(t.rwd[0], t.rwd[1], t.rwd[2]);
        3 === this.type && (cc.pvz.PlayerData.getRewardBonus(t.rwd[0], t.rwd[1] + 1, t.rwd[2]), 
        i.push(t.rwd[0]), i.push(t.rwd[1] + 1), i.push(t.rwd[2]));
        cc.player.metaStageInfo[this.type][1]--;
        cc.SubwindowManager.showWindow(a.UIStatus.GetItem, {
          items: i,
          showFlyTo: 1
        });
        this.remainTimesStr.string = "\u6b21\u6570:" + Math.floor(cc.player.metaStageInfo[this.type][1]);
        cc.pvz.PlayerData.saveData();
      }
      doQuickPass() {
        var c;
        cc.player.metaStageInfo[this.type][1] < 1 ? cc.popupManager.showToast(h.Datas.Tips[1].v) : ((c = this.curLevel) > cc.player.metaStageInfo[this.type][0] && (c = cc.player.metaStageInfo[this.type][0]), 
        cc.pvz.PlayerData.increaseMissionProg(482, 1), cc.pvz.PlayerData.increaseMissionProg(1200 + this.type, 1), 
        cc.pvz.PlayerData.increaseMissionProg(1210 + this.type, 1), this.getStageBonus(c));
      }
      gotoStage() {
        console.log("Goto stage:", this.type, this.curLevel);
        cc.player.metaStageInfo[this.type][1] < 1 ? cc.popupManager.showToast(h.Datas.Tips[1].v) : (cc.pvz.PlayerData.increaseMissionProg(481, 1), 
        cc.pvz.PlayerData.increaseMissionProg(482, 1), cc.pvz.PlayerData.increaseMissionProg(1200 + this.type, 1), 
        cc.pvz.PlayerData.increaseMissionProg(1606, 1), Tool_1.default.onSceneChange(), 
        this.hide(), cc.pvz.runtimeData.init(this.type, this.curLevel, 1), cc.butler.loadScene("dungeon"));
      }
      hide() {
        cc.SubwindowManager.hideWindow(a.UIStatus.MetaStageInfo);
      }
    };
    __decorate([ property(cc.Sprite) ], MetaStageInfoWindow.prototype, "icon", void 0);
    __decorate([ property(cc.SpriteFrame) ], MetaStageInfoWindow.prototype, "iconSFS", void 0);
    __decorate([ property(cc.Label) ], MetaStageInfoWindow.prototype, "titleStr", void 0);
    __decorate([ property(cc.Label) ], MetaStageInfoWindow.prototype, "levelStr", void 0);
    __decorate([ property(cc.Node) ], MetaStageInfoWindow.prototype, "bonusNodes", void 0);
    __decorate([ property(cc.Node) ], MetaStageInfoWindow.prototype, "lastStage", void 0);
    __decorate([ property(cc.Label) ], MetaStageInfoWindow.prototype, "remainTimesStr", void 0);
    __decorate([ property(cc.Node) ], MetaStageInfoWindow.prototype, "quickPassBtn", void 0);
    __decorate([ property(cc.Node) ], MetaStageInfoWindow.prototype, "lrBtn", void 0);
    MetaStageInfoWindow = __decorate([ ccclass ], MetaStageInfoWindow);
    exports.default = MetaStageInfoWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  MetaStagePanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9224au+PqVMnqSsOEzyAUE5", "MetaStagePanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const h = require("./ConfigCtrl");
    const a = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var l = 0;
    let MetaStagePanel = class MetaStagePanel extends cc.Component {
      constructor() {
        super(...arguments);
        this.iconSpr = null;
        this.iconSFS = null;
        this.nameStr = null;
        this.descStr = null;
        this.descIcons = null;
        this.timesStr = null;
        this.countdownStr = null;
        this.btns = null;
        this.redP = null;
      }
      initAs(c) {
        var t;
        this.type = c;
        this.iconSpr.spriteFrame = this.iconSFS[c - 1];
        t = h.Datas.MetaStageInfo[this.type];
        this.nameStr.string = t.name;
        this.descStr.string = t.text;
        for (var l = 0; l < this.descIcons.length; l++) {
          var _;
          (_ = t.icon[l]) ? (this.descIcons[l].node.parent.active = true, cc.pvz.utils.setSpriteFrame(this.descIcons[l], "image", "Item/item" + _)) : this.descIcons[l].node.parent.active = false;
        }
        this.refresh();
      }
      refresh() {
        var c, t, i;
        c = h.Datas.MetaStageInfo[this.type], this.timesStr.string = Math.floor(cc.player.metaStageInfo[this.type][1]) + "/" + c.max, 
        cc.player.metaStageInfo[this.type][1] >= 5 ? this.countdownStr.node.active = false : (this.countdownStr.node.active = true, 
        t = 1 - (cc.player.metaStageInfo[this.type][1] - Math.floor(cc.player.metaStageInfo[this.type][1])), 
        i = c.time * t, this.countdownStr.string = Tool_1.default.formatCountDown(Math.floor(i), true));
        cc.player.metaStageInfo[this.type][1] >= 1 || 0 === cc.player.metaStageInfo[this.type][2] ? (this.btns[0].active = true, 
        this.btns[1].active = false, this.redP.active = cc.player.metaStageInfo[this.type][1] >= 1) : (this.btns[0].active = false, 
        this.btns[1].active = true);
      }
      onBtnAdClick() {
        var c;
        c = this;
        cc.player.metaStageInfo[this.type][2] >= 1 ? (console.log("\u83b7\u53d6\u6750\u6599\u526f\u672c\u6b21\u6570", this.type), 
        cc.pvz.AdUtils.willShowAdRewardVideo(cc.pvz.GameConst.AdType["\u83b7\u53d6\u6750\u6599\u526f\u672c\u6b21\u6570"], function(t) {
          t && (cc.pvz.PlayerData.refreshMetaStageInfo(), cc.player.metaStageInfo[c.type][2] -= 1, 
          cc.player.metaStageInfo[c.type][1] += 1, c.refresh(), cc.pvz.PlayerData.saveData());
        })) : cc.popupManager.showToast(h.Datas.Tips[1].v);
      }
      onBtnClick() {
        cc.player.metaStageInfo[this.type][1] >= 1 ? cc.SubwindowManager.showWindow(a.UIStatus.MetaStageInfo, {
          type: this.type
        }) : cc.popupManager.showToast(h.Datas.Tips[1].v);
      }
    };
    __decorate([ property(cc.Sprite) ], MetaStagePanel.prototype, "iconSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], MetaStagePanel.prototype, "iconSFS", void 0);
    __decorate([ property(cc.Label) ], MetaStagePanel.prototype, "nameStr", void 0);
    __decorate([ property(cc.Label) ], MetaStagePanel.prototype, "descStr", void 0);
    __decorate([ property(cc.Sprite) ], MetaStagePanel.prototype, "descIcons", void 0);
    __decorate([ property(cc.Label) ], MetaStagePanel.prototype, "timesStr", void 0);
    __decorate([ property(cc.Label) ], MetaStagePanel.prototype, "countdownStr", void 0);
    __decorate([ property(cc.Node) ], MetaStagePanel.prototype, "btns", void 0);
    __decorate([ property(cc.Node) ], MetaStagePanel.prototype, "redP", void 0);
    MetaStagePanel = __decorate([ ccclass ], MetaStagePanel);
    exports.default = MetaStagePanel;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  MissionMain: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9a14283zX9LnoSZU3UdvHen", "MissionMain");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const o = require("./ConfigCtrl");
    const Nevigator_1 = require("./Nevigator");
    const a = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    const ItemIcon_1 = require("./ItemIcon");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MissionMain = class MissionMain extends cc.Component {
      constructor() {
        super(...arguments);
        this.iiPre = null;
        this.iiContainer = null;
        this.missionProg = [];
        this.btn = null;
        this.redP = null;
        this.colors = [];
      }
      init() {}
      refresh() {
        var c;
        (c = o.Datas.TaskMain[cc.player.mainMission.id]) ? (Tool_1.default.getPrefab(this.iiContainer, this.iiPre, "ii").getComponent(ItemIcon_1.default).init(c.rwd[0], c.rwd[1], c.rwd[2]), 
        this.missionProg[0].string = Tool_1.default.getMissionDesc(c.kind, c.need), this.refreshProg()) : this.node.active = false;
      }
      refreshProg() {
        var c;
        if (c = o.Datas.TaskMain[cc.player.mainMission.id]) {
          var g, m;
          if (g = 0, c.kind >= 401 && c.kind <= 450) {
            m = [ c.kind - 400, c.need ];
            g = cc.player.levelProg[0] === m[0] ? Math.min(cc.player.levelProg[1], c.need) : cc.player.levelProg[0] > m[0] ? c.need : 0;
          } else g = 641 === c.kind ? cc.player.baseProLv[0] : 1 === c.type ? cc.player.archieveProg[c.kind] ? cc.player.archieveProg[c.kind] : 0 : cc.player.mainMission.prog[1];
          this.missionProg[1].string = g + "/" + c.need;
          this.redP.active = g >= c.need;
          if (this.colors && this.colors.length > 2 && this.missionProg[0] && this.missionProg[1]) {
            this.missionProg[0].node.color = this.colors[g >= c.need ? 1 : 2];
            this.missionProg[1].node.color = this.colors[g >= c.need ? 1 : 0];
          }
        }
      }
      getBonus() {
        var c;
        if (c = o.Datas.TaskMain[cc.player.mainMission.id], this.redP.active) {
          cc.pvz.PlayerData.getRewardBonus(c.rwd[0], c.rwd[1], c.rwd[2]);
          cc.MainUI.showBonus(this.iiContainer, c.rwd[1], c.rwd[2]);
          cc.player.mainMission.id++;
          (c = o.Datas.TaskMain[cc.player.mainMission.id]) && (0 === c.type ? cc.player.mainMission.prog = [ c.kind, 0 ] : cc.player.mainMission.prog = [ 0, 0 ]);
          this.refresh();
          cc.pvz.PlayerData.saveData();
        } else {
          var A, O;
          switch (A = o.Datas.TaskDesc[c.kind].jumpId, O = o.Datas.TaskDesc[c.kind].jumpId2, 
          console.log("jumpto:", A), A) {
           case 1:
            break;

           case 2:
            cc.MainUI.mainNegivator.getComponent(Nevigator_1.default).nevigateTo(4);
            break;

           case 3:
            if (!cc.MainUI.checkFuncUnlock(8)) return;
            cc.MainUI.mainNegivator.getComponent(Nevigator_1.default).nevigateTo(2);
            break;

           case 4:
            if (!cc.MainUI.checkFuncUnlock(22)) return;
            cc.MainUI.mainNegivator.getComponent(Nevigator_1.default).nevigateTo(4);
            cc.SubwindowManager.showWindow(a.UIStatus.Weapon, {});
            break;

           case 5:
            cc.MainUI.mainNegivator.getComponent(Nevigator_1.default).nevigateTo(1);
            break;

           case 6:
            cc.SubwindowManager.showWindow(a.UIStatus.AdBuff, {});
            break;

           case 7:
            if (!cc.MainUI.checkFuncUnlock(6)) return;
            cc.MainUI.mainNegivator.getComponent(Nevigator_1.default).nevigateTo(5);
            break;

           case 8:
            cc.MainUI.mainNegivator.getComponent(Nevigator_1.default).nevigateTo(4);
            break;

           case 9:
            if (!cc.MainUI.checkFuncUnlock(15)) return;
            cc.SubwindowManager.showWindow(a.UIStatus.Shop, {});
            break;

           case 10:
            if (!cc.MainUI.checkFuncUnlock(12)) return;
            cc.SubwindowManager.showWindow(a.UIStatus.Slots, {});
          }
          O > 0 && setTimeout(function() {
            cc.MainUI.showFingerAt(O);
          }, 100);
        }
      }
      start() {
        this.refresh();
      }
    };
    __decorate([ property(cc.Prefab) ], MissionMain.prototype, "iiPre", void 0);
    __decorate([ property(cc.Node) ], MissionMain.prototype, "iiContainer", void 0);
    __decorate([ property([ cc.Label ]) ], MissionMain.prototype, "missionProg", void 0);
    __decorate([ property(cc.Node) ], MissionMain.prototype, "btn", void 0);
    __decorate([ property(cc.Node) ], MissionMain.prototype, "redP", void 0);
    __decorate([ property([ cc.Color ]) ], MissionMain.prototype, "colors", void 0);
    MissionMain = __decorate([ ccclass ], MissionMain);
    exports.default = MissionMain;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./ItemIcon": "ItemIcon",
    "./Nevigator": "Nevigator",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  MissionPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5df77AzPQNFuKsyQD+6yVmD", "MissionPanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const a = require("./ConfigCtrl");
    const Nevigator_1 = require("./Nevigator");
    const ArchieveWindow_1 = require("./ArchieveWindow");
    const o = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    const ItemIcon_1 = require("./ItemIcon");
    var n, i;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MissionPanel = class MissionPanel extends cc.Component {
      constructor() {
        super(...arguments);
        this.bg = null;
        this.bgSFS = null;
        this.isFinish = null;
        this.iiPre = null;
        this.iiConainter = null;
        this.textStr = null;
        this.progStr = null;
        this.progBar = null;
        this.btns = null;
      }
      initAsDaily(c) {
        var t;
        this.type = 1;
        this.id = c;
        this.tConfig = a.Datas.TaskDaily[c];
        t = [ cc.player.dailyInfo.prog[this.tConfig.kind] ? cc.player.dailyInfo.prog[this.tConfig.kind] : 0, this.tConfig.need ];
        this.initByTConfig(t, 1 === cc.player.dailyInfo.get[this.id - 1]);
      }
      initAsArchieve(c) {
        var t, i, n, u = 1e3;
        this.type = 2;
        this.id = c;
        n = cc.player.archieveGet[this.id] ? cc.player.archieveGet[this.id] : 0;
        i = false;
        this.tConfig = a.Datas.TaskArchieve[u * this.id + n + 1];
        this.tConfig || (this.tConfig = a.Datas.TaskArchieve[u * this.id + n], i = true);
        t = [ cc.player.archieveProg[this.id] ? cc.player.archieveProg[this.id] : 0, this.tConfig.need ];
        this.initByTConfig(t, i);
      }
      initByTConfig(c, t) {
        var u = 1e3;
        Tool_1.default.getPrefab(this.iiConainter, this.iiPre, "ii").getComponent(ItemIcon_1.default).init(this.tConfig.rwd[0], this.tConfig.rwd[1], this.tConfig.rwd[2]);
        this.textStr.string = Tool_1.default.getMissionDesc(this.tConfig.kind, this.tConfig.need);
        this.progStr.string = c[0] + "/" + c[1];
        this.progBar.progress = Math.min(1, c[0] / c[1]);
        t ? (this.isFinish.active = true, this.btns.map(function(c) {
          return c.active = false;
        }), this.bg.spriteFrame = this.bgSFS[1], this.zz = 1e4) : (this.isFinish.active = false, 
        this.btns[0].active = c[0] < c[1], this.btns[1].active = c[0] >= c[1], this.bg.spriteFrame = this.bgSFS[c[0] >= c[1] ? 1 : 0], 
        this.zz = u + this.id + (c[0] >= c[1] ? -u : 1));
      }
      getBonus() {
        1 === this.type ? cc.SubwindowManager.getWindowHandle(o.UIStatus.Archieve).getComponent(ArchieveWindow_1.default).getAllDailyBonus() : cc.SubwindowManager.getWindowHandle(o.UIStatus.Archieve).getComponent(ArchieveWindow_1.default).getAllArchieveBonus();
      }
      GoTo() {
        var c;
        switch (c = a.Datas.TaskDesc[this.tConfig.kind].jumpId, cc.SubwindowManager.hideWindow(o.UIStatus.Archieve), 
        c) {
         case 1:
          break;

         case 2:
          cc.MainUI.mainNegivator.getComponent(Nevigator_1.default).nevigateTo(4);
          break;

         case 3:
          if (!cc.MainUI.checkFuncUnlock(8)) return;
          cc.MainUI.mainNegivator.getComponent(Nevigator_1.default).nevigateTo(2);
          break;

         case 4:
          if (!cc.MainUI.checkFuncUnlock(22)) return;
          cc.MainUI.mainNegivator.getComponent(Nevigator_1.default).nevigateTo(4);
          cc.SubwindowManager.showWindow(o.UIStatus.Weapon, {});
          break;

         case 5:
          cc.MainUI.mainNegivator.getComponent(Nevigator_1.default).nevigateTo(1);
          break;

         case 6:
          cc.SubwindowManager.showWindow(o.UIStatus.AdBuff, {});
          break;

         case 7:
          if (!cc.MainUI.checkFuncUnlock(6)) return;
          cc.MainUI.mainNegivator.getComponent(Nevigator_1.default).nevigateTo(5);
          break;

         case 8:
          cc.MainUI.mainNegivator.getComponent(Nevigator_1.default).nevigateTo(4);
          break;

         case 9:
          if (!cc.MainUI.checkFuncUnlock(15)) return;
          cc.SubwindowManager.showWindow(o.UIStatus.Shop, {});
          break;

         case 10:
          if (!cc.MainUI.checkFuncUnlock(12)) return;
          cc.SubwindowManager.showWindow(o.UIStatus.Slots, {});
        }
      }
      start() {}
    };
    __decorate([ property(cc.Sprite) ], MissionPanel.prototype, "bg", void 0);
    __decorate([ property(cc.SpriteFrame) ], MissionPanel.prototype, "bgSFS", void 0);
    __decorate([ property(cc.Node) ], MissionPanel.prototype, "isFinish", void 0);
    __decorate([ property(cc.Prefab) ], MissionPanel.prototype, "iiPre", void 0);
    __decorate([ property(cc.Node) ], MissionPanel.prototype, "iiConainter", void 0);
    __decorate([ property(cc.Label) ], MissionPanel.prototype, "textStr", void 0);
    __decorate([ property(cc.Label) ], MissionPanel.prototype, "progStr", void 0);
    __decorate([ property(cc.ProgressBar) ], MissionPanel.prototype, "progBar", void 0);
    __decorate([ property(cc.Node) ], MissionPanel.prototype, "btns", void 0);
    MissionPanel = __decorate([ ccclass ], MissionPanel);
    exports.default = MissionPanel;
    cc._RF.pop();
  }, {
    "./ArchieveWindow": "ArchieveWindow",
    "./ConfigCtrl": "ConfigCtrl",
    "./ItemIcon": "ItemIcon",
    "./Nevigator": "Nevigator",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  MyRequest: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a909wDOX9Lp4DMyykRCRNm", "MyRequest");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const i = require("./NetworkManager");
    var d;
    var o = function() {
      var h = "https://yiyouzan.cn/xsapi/cloudex";
      function l(t) {
        void 0 === t && (t = "");
        this.queues = [];
        this.taskIdx = 0;
        this.urlBase = "";
        this.finishCb = null;
        this.dev = true;
        0 === t.length ? window.wx ? this.urlBase = l.urlBases.wx : cc.sys.platform === cc.sys.ANDROID ? this.urlBase = l.urlBases.android : this.urlBase = l.urlBases.pc : this.urlBase = t;
        this.reset();
      }
      return l.prototype.reset = function() {
        this.queues = [];
        this.taskIdx = 0;
      }, l.prototype.willPost = function(t, n, r, c) {
        return void 0 === c && (c = null), n.app = l.appName, this.queues.push({
          method: "POST",
          url: t,
          body: n,
          cb: r,
          cb2: c
        }), this;
      }, l.prototype.willGet = function(t, n, r) {
        return void 0 === r && (r = null), this.queues.push({
          method: "GET",
          url: t,
          cb: n,
          cb2: r
        }), this;
      }, l.prototype.finish = function(t) {
        return this.finishCb = t, this;
      }, l.prototype.doIfNotOk = function(t, n) {
        console.log("http request failed: ", t);
        console.log(n.data);
      }, l.prototype.showIfMsg = function(t) {
        console.warn(t);
      }, l.prototype.doIfMsg = function(t) {
        cc.MainUI && cc.popupManager.showToast(t);
      }, l.prototype.doHttpRequestInPC = function(t) {
        if ("undefined" !== typeof window && !window["wx"]) {
          console.log("[MyRequest] H5 mock \u8bf7\u6c42:", t.url);
          var mockData = {
            ok: 1
          };
          if ("/game/info" === t.url) {
            mockData.baseData = "";
            mockData.coverLv = 0;
            mockData.ticketNum = 0;
            mockData.gifts = [];
            mockData.willClearData = false;
            mockData.iCode = "";
            mockData.iNum = 0;
          } else if ("/game/setbaseinfo" === t.url) mockData.timeStampErr = false; else if ("/game/checkticketnum" === t.url) mockData.num = cc.player && cc.player.items && cc.player.items[13] || 0; else if ("/game/ranklist" === t.url) mockData.ret = []; else if ("/game/myrank" === t.url) {
            mockData.rank = 0;
            mockData.score = 0;
          } else "/game/inviteinfo" === t.url && (mockData.uids = []);
          t.cb && t.cb(mockData);
          this.taskIdx++;
          this.taskIdx < this.queues.length ? this.doHttpRequest(this.taskIdx) : this.finishCb && this.finishCb();
          return;
        }
        var v = "utoken", d = this;
        if (l.ReqDoing[t.url]) console.log("A same request doing.", t.url); else {
          var w = new XMLHttpRequest();
          w.onreadystatechange = function() {
            if (4 == w.readyState && w.status >= 200 && w.status < 400) {
              var A = JSON.parse(w.responseText);
              if (d.dev && console.log("Http res:", A), A.ok) {
                if (l.ReqDoing[t.url] = 0, A.msgId && A.msg) return void (A.msgId <= 31e4 ? d.showIfMsg(A.msg) : d.doIfMsg(A.msg));
                if (t.cb(A), d.taskIdx++, d.taskIdx === d.queues.length) return void (d.finishCb && d.finishCb());
                d.doHttpRequest(d.taskIdx);
              } else {
                d.doIfNotOk(t.url, {
                  data: A
                });
                l.ReqDoing[t.url] = 0;
              }
            }
          };
          w.onerror = function() {
            l.ReqDoing[t.url] = 0;
          };
          w.open(t.method, 0 === t.url.indexOf("http") ? t.url : this.urlBase + t.url, true);
          w.setRequestHeader("uid", l.userInfo.uid + "");
          w.setRequestHeader(v, l.utoken);
          t.body && w.setRequestHeader("Content-Type", "application/json");
          l.ReqDoing[t.url] = 1;
          w.send(t.body ? JSON.stringify(t.body) : "");
          this.dev && console.log("Http req:", t.url, t.body);
        }
      }, l.prototype.doHttpRequestInWX = function(t) {
        var g = this;
        if (this.dev && console.log("Http req:", t.url, t.body), l.ReqDoing[t.url]) console.log("A same request doing.", t.url); else {
          var m = {
            uid: l.userInfo.uid,
            utoken: l.utoken
          };
          t.body && (m["Content-Type"] = "application/json");
          var p = {
            url: 0 === t.url.indexOf("http") ? t.url : this.urlBase + t.url,
            method: t.method,
            header: m,
            success: function(n) {
              if (cc.pvz.TAUtils.trackReq(t.url, n.statusCode), l.ReqDoing[t.url] = 0, g.dev && console.log("Http res:", n.data), 
              0 !== t.url.indexOf("http")) if (n.data.ok) {
                if (n.data.msgId && n.data.msg) return void (n.data.msgId <= 31e4 ? g.showIfMsg(n.data.msg) : (g.doIfMsg(n.data.msg), 
                400001 === n.data.msgId && window.wx && ("DEFAULTTOKEN" === l.utoken || 0 === l.utoken.length || (cc.CantSaveInLocal = 1, 
                window.wx.showModal({
                  title: "\u63d0\u793a",
                  content: "\u767b\u5f55\u5df2\u5931\u6548\uff0c\u8bf7\u91cd\u542f\u6e38\u620f",
                  showCancel: false,
                  success: function(t) {
                    t.confirm && window.wx.exitMiniProgram();
                  }
                })))));
                if (t.cb(n.data), g.taskIdx++, g.taskIdx === g.queues.length) return void (g.finishCb && g.finishCb());
                g.doHttpRequest(g.taskIdx);
              } else g.doIfNotOk(t.url, n); else t.cb(n.data);
            },
            fail: function(n) {
              cc.pvz.TAUtils.trackReq(t.url, n.errno || -1, n.errMsg);
              l.ReqDoing[t.url] = 0;
              console.log(t.url, "Fail");
              "/user/login" === t.url && (i.LoginAndLoadDataOk = -1);
              t.cb2 && t.cb2(n);
            },
            complete: function() {}
          };
          t.body && (p.data = t.body);
          l.ReqDoing[t.url] = 1;
          window.wx.request(p);
          cc.pvz.TAUtils.trackReq(t.url, 0);
        }
      }, l.prototype.doHttpRequest = function(t) {
        var c = this.queues[t];
        window.wx ? this.doHttpRequestInWX(c) : this.doHttpRequestInPC(c);
      }, l.prototype.start = function() {
        this.doHttpRequest(0);
      }, l.appName = "kongfu", l.urlBases = {
        pc: "http://192.168.1.213:4000",
        android: h,
        wx: h
      }, l.ReqDoing = {}, l.userInfo = {
        uid: 100001,
        avatar: "",
        nick: "NONAME",
        sign: "",
        access: 0,
        myIntiveCode: "",
        inviteCount: 0,
        createTime: 0
      }, l.qrCodeUrl = "", l.utoken = "DEFAULTTOKEN", l;
    }();
    exports.default = o;
    cc._RF.pop();
  }, {
    "./NetworkManager": "NetworkManager"
  } ],
  NetworkManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "295cbNBRwNGdIFcvJZO+uWM", "NetworkManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MyRequest_1 = require("./MyRequest");
    var O, I, h, C, M;
    var P = "\u60a8\u7684\u8d26\u53f7\u5df2\u88ab\u5c01\u7981\nID:";
    var vn = 1;
    var Tn = 1;
    var kn = 1;
    Tn && vn && (O = "weaponIn");
    Tn = 0;
    var u = function() {
      kn && vn && (O += "fo");
      kn = 0;
      function v() {}
      return v.ExitByTimeErr = function() {
        window.wx ? window.wx.showModal({
          title: "\u63d0\u793a",
          content: "\u60a8\u7684\u672c\u5730\u65f6\u95f4\u4e0e\u670d\u52a1\u5668\u65f6\u95f4\u76f8\u5dee\u8fc7\u5927\uff0c\u8bf7\u8c03\u6574\u672c\u5730\u65f6\u95f4\u540e\u91cd\u65b0\u8fdb\u5165\u6e38\u620f",
          showCancel: false,
          success: function(t) {
            t.confirm && window.wx.exitMiniProgram();
          }
        }) : console.log("?");
      }, v.login = function(t) {
        if (console.log("Will login!"), !window.wx) {
          console.log("[NetworkManager] H5 \u5355\u673a\u6a21\u5f0f\u767b\u5f55");
          var localUid = cc.sys.localStorage.getItem("h5_local_uid");
          if (!localUid) {
            localUid = "" + (1e5 + Math.floor(9e5 * Math.random()));
            cc.sys.localStorage.setItem("h5_local_uid", localUid);
          }
          MyRequest_1.default.userInfo.uid = parseInt(localUid);
          MyRequest_1.default.userInfo.access = 90;
          MyRequest_1.default.userInfo.nick = "\u5355\u673a\u73a9\u5bb6";
          MyRequest_1.default.userInfo.avatar = "";
          MyRequest_1.default.userInfo.createTime = Math.floor(Date.now() / 1e3);
          MyRequest_1.default.utoken = "H5_LOCAL_TOKEN";
          console.log("[NetworkManager] H5 \u767b\u5f55\u5b8c\u6210, uid=" + localUid);
          return void t(true);
        }
        var u = function(n) {
          if (MyRequest_1.default.userInfo.uid = n.uid, MyRequest_1.default.userInfo.access = n.access, 
          MyRequest_1.default.utoken = n.token, MyRequest_1.default.userInfo.nick = n.name, 
          MyRequest_1.default.userInfo.avatar = n.avatarUrl, MyRequest_1.default.qrCodeUrl = n.qrCodeUrl, 
          n.access < 0) window.wx && window.wx.showModal({
            title: "\u63d0\u793a",
            content: P + n.uid,
            showCancel: false,
            success: function(t) {
              t.confirm && window.wx.exitMiniProgram();
            }
          }); else {
            if (window.wx) {
              var m = window.wx.getLaunchOptionsSync().query;
              m.fromUid && (console.log("FromUid:", m.fromUid), new MyRequest_1.default().willPost("/game/setrelation", {
                uid2: parseInt(m.fromUid)
              }, function() {
                console.log(m.fromUid + "\u5df2\u9080\u8bf7\u6b64\u7528\u6237");
              }).start());
            }
            t(true);
          }
        };
        window.zlGame ? window.zlGame.login().then(function(t) {
          new MyRequest_1.default().willPost("/user/loginByChannel", {
            loginCode1: t.user_token,
            loginCode2: t.user_id,
            loginCode3: t.open_id,
            channel: "zl"
          }, function(t) {
            u(t);
          }).start();
        })["catch"](function(t) {
          console.log("\u767b\u5f55\u5931\u8d25,\u5931\u8d25\u539f\u56e0:", t);
        }) : window.wx.login({
          success: function(t) {
            t.code ? (console.log(" WX Login : " + t.code), new MyRequest_1.default().willPost("/user/login", {
              loginCode1: t.code,
              loginCode2: "wx"
            }, function(t) {
              u(t);
            }).start()) : console.warn("\u767b\u5f55\u5931\u8d25\uff01");
          },
          fail: function() {
            v.LoginAndLoadDataOk = -1;
          }
        });
      }, v.clearData = function(t) {
        window.wx ? new MyRequest_1.default().willPost("/game/cleardata", {}, function() {
          t(1);
        }).start() : t(1);
      }, v.loadData = function(t) {
        if (window.wx) new MyRequest_1.default().willPost("/game/info", {}, function(n) {
          if (console.log("LoadData:", n), MyRequest_1.default.userInfo.myIntiveCode = n.iCode, 
          MyRequest_1.default.userInfo.inviteCount = n.iNum, n.baseData && n.baseData.length > 0) try {
            cc.is1st = false;
            var E = JSON.parse(n.baseData), I = n.coverLv;
            cc.player.coverLv || (cc.player.coverLv = 0);
            console.log("\u672c\u5730/\u4e91 : " + cc.player.saveDataTimes + "/" + E.saveDataTimes);
            E.saveDataTimes >= cc.player.saveDataTimes ? (console.warn("\u9002\u7528\u4e91\u5b58\u6863\uff1a\u5b58\u6863\u6b21\u6570\u66f4\u591a"), 
            cc.pvz.PlayerData.initPlayerDataBy(E)) : I > cc.player.coverLv ? (console.warn("\u9002\u7528\u4e91\u5b58\u6863\uff1a\u8986\u76d6\u7b49\u7ea7\u66f4\u5927"), 
            E.coverLv = I, cc.pvz.PlayerData.initPlayerDataBy(E)) : console.warn("\u4e0d\u9002\u7528\u4e91\u5b58\u6863");
          } catch (_t) {}
          n.willClearData && (console.warn("\u6b64\u7528\u6237\u7684\u5b58\u6863\u5df2\u88ab\u6e05\u7a7a."), 
          cc.pvz.PlayerData.newData(), cc.is1st = true, cc.pvz.PlayerData.postLoadData());
          cc.player.items[13] = n.ticketNum;
          cc.pvz.gifts = n.gifts;
          t(n);
        }).start(); else {
          console.log("[NetworkManager] H5 loadData \u4ece localStorage \u8bfb\u53d6");
          var ticketNum = 0;
          try {
            ticketNum = cc.player && cc.player.items && cc.player.items[13] || 0;
          } catch (_t) {}
          cc.pvz.gifts = [];
          cc.player.items = cc.player.items || {};
          cc.player.items[13] = ticketNum;
          console.log("[NetworkManager] H5 loadData \u5b8c\u6210, is1st=" + cc.is1st);
          t({});
        }
      }, v.needCheck = function() {
        var r = 9999, i = [ 60, 100, r, 80, r, 70, r ], o = Date.now() / 1e3 - MyRequest_1.default.userInfo.createTime;
        if (o > 0 && o < 86400) {
          for (var u = 0, s = 0; s < cc.player.baseProLv.length; s++) cc.player.baseProLv[s] > i[s] && u++;
          if (u >= 2) return 1;
        }
        return 0;
      }, v.saveData = function(t, n, r) {
        if (!window.wx) {
          cc.sys.localStorage.setItem("80day-2", t);
          console.log("[NetworkManager] H5 saveData \u5df2\u4fdd\u5b58\u5230 localStorage");
          r && r(1);
          return;
        }
        if ("DEFAULTTOKEN" !== MyRequest_1.default.utoken && 0 !== MyRequest_1.default.utoken.length) {
          var p = cc.pvz.PlayerData.itemNum(2), A = cc.pvz.PlayerData.itemNum(3), S = 0;
          p >= 1e8 && (S = 1);
          A >= 2e5 && (S = 1);
          v.needCheck() && (S = 1);
          var y = Date.now();
          new MyRequest_1.default().willPost("/game/setbaseinfo", {
            info: t,
            lv: n,
            i3: A,
            now: y,
            needCheck: S
          }, function(t) {
            t.timeStampErr ? (t.servtime, cc.player.saveDataTimes -= 100, cc.pvz.PlayerData.saveToLocal(), 
            v.ExitByTimeErr()) : r(1);
          }).start();
        } else v.login(function() {
          console.log("\u5df2\u91cd\u65b0\u767b\u5f55");
        });
      }, v.checkTicketNum = function(t, n, r) {
        var o = 13, u = 497;
        if (!window.wx) {
          cc.player.items[o] = (cc.player.items[o] || 0) + t;
          return void n(1);
        }
        var v = cc.player.items[o], h = 0;
        t < 0 && (cc.player.items[u] || (cc.player.items[u] = 0), cc.player.items[u] > 0 && cc.player.items[u] % 23 == 0 && (h = 1));
        new MyRequest_1.default().willPost("/game/checkticketnum", {
          delta: t,
          f: h
        }, function(r) {
          cc.player.items[13] = r.num;
          t < 0 && cc.player.items[497]++;
          n(1);
          cc.pvz.TAUtils.trackAdTicket(v, t, r.num);
        }, function() {
          r();
        }).start();
      }, v.decodeGameClubInfo = function(t, n, r) {
        window.wx && new MyRequest_1.default().willPost("/game/decodegameclubdata", {
          data: t,
          iv: n
        }, function(t) {
          r(t.str);
        }).start();
      }, v.submitInviteCode = function(t, n) {
        window.wx && new MyRequest_1.default().willPost("/game/useinvitecode", {
          code: t
        }, function(t) {
          n(t);
        }).start();
      }, v.submitBonusCode = function(t, n) {
        window.wx && new MyRequest_1.default().willPost("/game/usebonuscode", {
          code: t
        }, function(t) {
          n(t.bonus);
        }).start();
      }, v.getInviteUsers = function(t) {
        window.wx && new MyRequest_1.default().willPost("/game/inviteinfo", {}, function(n) {
          MyRequest_1.default.userInfo.inviteCount = n.uids.length;
          t(n);
        }).start();
      }, v.auth = function(t, n, r) {
        if (!window["wx"]) {
          r && r(1);
          return;
        }
        new MyRequest_1.default().willPost("/game/auth", {
          name: t,
          avatarUrl: n,
          note: ""
        }, function(t) {
          MyRequest_1.default.userInfo.nick = t.name;
          MyRequest_1.default.userInfo.avatar = n;
          r(1);
        }).start();
      }, v.updateScore = function(t, n, r, c) {
        if (!window["wx"]) {
          c && c();
          return;
        }
        if (1 === t && n <= 1e3) c(); else if (2 === t && n <= 5e4) c(); else if (3 === t && n <= 0) c(); else if (r) {
          for (var A = [], S = 0; S < cc.player.skillUsing.length; S++) {
            A.push(cc.player.skillUsing[S]);
            cc.player.skillUsing[S] > 0 ? A.push(cc.player.skillInfo[cc.player.skillUsing[S]][0]) : A.push(0);
          }
          for (S = 0; S < cc.player.towerInfo.set.length; S++) A.push(cc.player.towerInfo.set[S]);
          A.push(cc.player.skinUsing);
          var y = [], C = 0;
          for (S = 0; S < cc.player.weaponUsing.length; S++) {
            y.push(cc.player.weaponUsing[S]);
            cc.player.weaponUsing[S] > 0 ? (y.push(cc.player[O][cc.player.weaponUsing[S]][0]), 
            y.push(cc.player[O][cc.player.weaponUsing[S]][1])) : (y.push(0), y.push(0));
          }
          for (var S in cc.player[O]) cc.player[O][S][0] >= 80 && (C += cc.player[O][S][0]);
          var B = JSON.stringify(A), M = JSON.stringify(y);
          new MyRequest_1.default().willPost("/game/updatescore", {
            type: t,
            score: n,
            exInfo1: B,
            exInfo2: M,
            wLvSum: C
          }, function(t) {
            var e = t.updated, i = t.rank0, o = t.rank1;
            c(e, i, o);
          }).start();
        } else c();
      }, v.ranklistInfo = function(t, n, r, c) {
        if (!window["wx"]) {
          r && r([]);
          return;
        }
        new MyRequest_1.default().willPost("/game/ranklist", {
          type: t,
          fromIdx: n
        }, function(t) {
          r(t.ret);
        }, function() {
          c();
        }).start();
      }, v.sudoRanklistInfo = function(t, n, r, c, e) {
        new MyRequest_1.default().willPost("/sys/ranklistex", {
          type: t,
          tarSector: n,
          fromIdx: r
        }, function(t) {
          c(t.ret);
        }, function() {
          e();
        }).start();
      }, v.myRanklist = function(t, n) {
        if (!window["wx"]) {
          n && n({});
          return;
        }
        new MyRequest_1.default().willPost("/game/myrank", {
          type: t
        }, function(t) {
          n(t);
        }).start();
      }, v.setCheat = function(t, n, r) {
        MyRequest_1.default.userInfo.access < 95 || new MyRequest_1.default().willPost("/sys/setcheat", {
          uid: t,
          flag: n
        }, function() {
          r();
        }).start();
      }, v.userInfoEx = function(t, n) {
        MyRequest_1.default.userInfo.access < 95 || new MyRequest_1.default().willPost("/sys/userinfoex", {
          tarUid: t
        }, function(t) {
          try {
            var s = JSON.parse(t.info);
            s.ticketNum = t.ticketNum;
            s.createTime = t.createTime;
            s.cheatRecord = t.cheatRecord;
            s.score1 = t.score1;
            s.score2 = t.score2;
            n(s);
          } catch (_t) {
            n(null);
          }
        }).start();
      }, v.sudoUpdateUserCache = function(t, n) {
        MyRequest_1.default.userInfo.access < 95 || new MyRequest_1.default().willPost("/sys/updateusercache", {
          tarUid: t
        }, function() {
          n(1);
        }).start();
      }, v.confirmVideoAdInfo = function(t, n, r) {
        window.wx && new MyRequest_1.default().willPost("/game/confirmvideoad", {
          uniqueId: t,
          time: n
        }, function() {
          r();
        }).start();
      }, v.userMayCheat = function(t, n, r, c) {
        if (!window["wx"]) {
          c && c(1);
          return;
        }
        new MyRequest_1.default().willPost("/sys/dataprobe", {
          itemId: t,
          c: n,
          d: r
        }, function() {
          c(1);
        }).start();
      }, v.userMayCheat2 = function(t) {
        if (window.wx) {
          for (var i = [ 2, 3, 34, 36, 37, 38, 39, 41, 499 ], o = [], u = 0; u < i.length; u++) o.push(cc.pvz.PlayerData.itemNum(i[u]));
          new MyRequest_1.default().willPost("/sys/dataverify", {
            items: o
          }, function() {
            t(1);
          }).start();
        }
      }, v.subscribe = function(t, n, r) {
        if (!window["wx"]) {
          r && r({});
          return;
        }
        new MyRequest_1.default().willPost("/game/subscribe", {
          tmpIdx: t,
          flag: n
        }, function(t) {
          r(t);
        }).start();
      }, v.timeCheck = function(t, n) {
        window.wx ? new MyRequest_1.default().willGet("/sys/timecheck", function(n) {
          var e = Date.now();
          Math.abs(n.servTime - e) >= 18e5 ? v.ExitByTimeErr() : t(1);
        }, function() {
          n();
        }).start() : t(1);
      }, v.clearDataSelf = function(t) {
        if (!window["wx"]) {
          t && t({});
          return;
        }
        new MyRequest_1.default().willPost("/sys/usercleardataself", {
          moveToSector: 1
        }, function(n) {
          t(n);
        }).start();
      }, v.LoginAndLoadDataOk = 0, v;
    }();
    exports.default = u;
    cc._RF.pop();
  }, {
    "./MyRequest": "MyRequest"
  } ],
  Nevigator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2913dzaxqFENoLdZ3yLYkOf", "Nevigator");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const o = require("./ConfigCtrl");
    const SpineCtrl_1 = require("./SpineCtrl");
    var u, v;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var Ht = "R";
    let Nevigator = class Nevigator extends cc.Component {
      constructor() {
        super(...arguments);
        this.neviSpine = null;
        this.neviBtns = null;
      }
      onChangeBtnAni() {
        var c, u = "anniu", v = "_4_";
        c = this;
        this.state = 1;
        for (var _ = 1; _ <= 5; _++) if (!(_ < Math.min(this.lastPage, this.curPage) || _ > Math.max(this.lastPage, this.curPage))) if (_ === this.curPage) {
          var p;
          p = this.curPage < this.lastPage ? Ht : "L";
          this.neviSpine[_ - 1].setAnimations(0, [ u + _ + "_1_" + p, u + _ + "_3" ], false);
        } else _ === this.lastPage ? (p = this.curPage > this.lastPage ? Ht : "L", this.neviSpine[_ - 1].setAnimations(0, [ u + _ + "_2_" + p, u + _ + v + p ], false, function() {
          c.lastPage = c.curPage;
          c.state = 0;
        })) : this.isUnlock[_ - 1] ? (p = this.curPage > this.lastPage ? Ht : "L", this.neviSpine[_ - 1].setAnimation(0, u + _ + v + p, false)) : this.neviSpine[_ - 1].setAnimation(0, u + _ + "_1", false);
        for (this.lastPage = this.curPage, _ = 0; _ < this.neviBtns.length; _ += 2) {
          this.neviBtns[_].active = _ / 2 != this.curPage - 1;
          this.neviBtns[_ + 1].active = _ / 2 == this.curPage - 1;
        }
        cc.MainUI.showPage(this.curPage);
      }
      nevigateTo(c) {
        1 !== this.state && this.curPage !== c && (this.curPage = c, this.onChangeBtnAni());
      }
      onBtnClick(_c, t) {
        var i;
        (1 !== (i = parseInt(t)) || cc.MainUI.checkFuncUnlock(17)) && (2 !== i || cc.MainUI.checkFuncUnlock(8)) && (5 !== i || cc.MainUI.checkFuncUnlock(6)) && this.nevigateTo(i);
      }
      start() {
        this.curPage = 3;
        this.lastPage = 3;
        this.state = 0;
        this.isUnlock = [ 0, 0, 0, 0, 0 ];
        for (var c, l = 0; l < this.neviBtns.length; l += 2) {
          this.neviBtns[l].active = l / 2 != this.curPage - 1;
          this.neviBtns[l + 1].active = l / 2 == this.curPage - 1;
        }
        for (c = [ 17, 8, -1, -1, 6 ], l = 0; l < c.length; l++) {
          (c[l] < 0 || 1e3 * cc.player.levelProg[0] + cc.player.levelProg[1] >= o.Datas.GrowRoadUnlockInfo[c[l]].type2s) && (this.isUnlock[l] = 1);
          0 === this.isUnlock[l] && this.neviSpine[l].setAnimation(0, "anniu" + (l + 1) + "_1", false);
        }
        console.log(this.isUnlock);
      }
    };
    __decorate([ property(SpineCtrl_1.default) ], Nevigator.prototype, "neviSpine", void 0);
    __decorate([ property(cc.Node) ], Nevigator.prototype, "neviBtns", void 0);
    Nevigator = __decorate([ ccclass ], Nevigator);
    exports.default = Nevigator;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SpineCtrl": "SpineCtrl"
  } ],
  Page1: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "55c25v3oN5La4ncE4/LCywD", "Page1");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const u = require("./ConfigCtrl");
    const EffSpine_1 = require("./EffSpine");
    const TowerProPanel_1 = require("./TowerProPanel");
    const TowerSetPanel_1 = require("./TowerSetPanel");
    const UpgradeProNum_1 = require("./UpgradeProNum");
    const Tool_1 = require("./Tool");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Page1 = class Page1 extends cc.Component {
      constructor() {
        super(...arguments);
        this.towerProPre = null;
        this.towerProContainer = null;
        this.towerSetPre = null;
        this.towerSetContainer = null;
        this.upgradeProNum = null;
        this.SV = null;
        this.lvUpEffs = null;
      }
      init() {
        this.refreshTowerPanel();
        this.refreshTowerSetPanel();
      }
      refreshTowerPanel() {
        for (var u = 0; u < 4; u++) {
          Tool_1.default.getPrefab(this.towerProContainer[0], this.towerProPre, "" + u).getComponent(TowerProPanel_1.default).initAsTower(1, u, this);
          Tool_1.default.getPrefab(this.towerProContainer[1], this.towerProPre, "" + u).getComponent(TowerProPanel_1.default).initAsTower(2, u, this);
        }
      }
      showLvUpEff(c) {
        this.lvUpEffs[c - 1].getComponent(EffSpine_1.default).play();
      }
      refreshTowerSetPanel() {
        var c, t, i;
        for (var e in i = [], u.Datas.TowerSet) i.push(parseInt(e));
        for (c = function(c) {
          var n;
          (n = Tool_1.default.getPrefab(t.towerSetContainer, t.towerSetPre, "" + c).getComponent(TowerSetPanel_1.default)).init(c + 1);
          n.anim.play(n.anim.getClips()[1].name);
          setTimeout(function() {
            n.anim.play(n.anim.getClips()[0].name);
            i.length;
          }, 70 * c);
        }, t = this, e = 0; e < i.length; e++) c(e);
      }
      showUpgradeNum(c, t, i, n, e) {
        void 0 === n && (n = 0);
        void 0 === e && (e = 0);
        this.upgradeProNum.getComponent(UpgradeProNum_1.default).showAt(c, t, i, n, e);
      }
      refresh() {
        this.SV.scrollToTop();
        this.refreshTowerPanel();
        this.refreshTowerSetPanel();
      }
      start() {
        this.init();
      }
    };
    __decorate([ property(cc.Prefab) ], Page1.prototype, "towerProPre", void 0);
    __decorate([ property(cc.Node) ], Page1.prototype, "towerProContainer", void 0);
    __decorate([ property(cc.Prefab) ], Page1.prototype, "towerSetPre", void 0);
    __decorate([ property(cc.Node) ], Page1.prototype, "towerSetContainer", void 0);
    __decorate([ property(cc.Node) ], Page1.prototype, "upgradeProNum", void 0);
    __decorate([ property(cc.ScrollView) ], Page1.prototype, "SV", void 0);
    __decorate([ property(cc.Node) ], Page1.prototype, "lvUpEffs", void 0);
    Page1 = __decorate([ ccclass ], Page1);
    exports.default = Page1;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./EffSpine": "EffSpine",
    "./Tool": "Tool",
    "./TowerProPanel": "TowerProPanel",
    "./TowerSetPanel": "TowerSetPanel",
    "./UpgradeProNum": "UpgradeProNum"
  } ],
  Page2: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "62fa3k1809NDpgCTtfdn3I8", "Page2");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const h = require("./ConfigCtrl");
    const v = require("./SubwindowManager");
    const SkillCard_1 = require("./SkillCard");
    const Tool_1 = require("./Tool");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Page2 = class Page2 extends cc.Component {
      constructor() {
        super(...arguments);
        this.skillCardPre = null;
        this.skillUsing = null;
        this.skillsContainer = null;
        this.countStr = null;
      }
      init() {
        this.refreshUsing();
        this.refreshStorage();
      }
      refreshUsing() {
        for (var h = 0, a = 0; a < this.skillUsing.length; a++) {
          Tool_1.default.getPrefab(this.skillUsing[a], this.skillCardPre, "" + a).getComponent(SkillCard_1.default).initAsUsing(a, this);
          cc.player.skillUsing[a] > 0 && h++;
        }
        this.countStr[0].string = h + "/" + this.skillUsing.length;
      }
      refreshStorage() {
        var c;
        for (var o in c = [ 0, 0 ], h.Datas.Skill) {
          cc.player.skillInfo[o] && cc.player.skillInfo[o][0] > 0 && c[0]++;
          c[1]++;
          this.refreshStorageCardById(parseInt(o));
        }
        this.countStr[1].string = c[0] + "/" + c[1];
      }
      refreshAfterDeploy() {
        for (var e in h.Datas.Skill) Tool_1.default.getPrefab(this.skillsContainer, this.skillCardPre, "" + e).getComponent(SkillCard_1.default).refreshDeployBtns();
      }
      refreshStorageCardById(c) {
        var t;
        (t = Tool_1.default.getPrefab(this.skillsContainer, this.skillCardPre, "" + c).getComponent(SkillCard_1.default)).initAsInStorage(c, this);
        t.refreshDeployBtns();
      }
      showGetNewSkillWindow() {
        Tool_1.default.canGetSkill() ? cc.SubwindowManager.showWindow(v.UIStatus.GetNewSkill, {
          par: this
        }) : cc.popupManager.showToast(h.Datas.Tips[14].v);
      }
      refresh() {
        this.refreshUsing();
        this.refreshStorage();
      }
      start() {}
    };
    __decorate([ property(cc.Prefab) ], Page2.prototype, "skillCardPre", void 0);
    __decorate([ property(cc.Node) ], Page2.prototype, "skillUsing", void 0);
    __decorate([ property(cc.Node) ], Page2.prototype, "skillsContainer", void 0);
    __decorate([ property(cc.Label) ], Page2.prototype, "countStr", void 0);
    Page2 = __decorate([ ccclass ], Page2);
    exports.default = Page2;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SkillCard": "SkillCard",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  Page3: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6cae6QDY4FP6Llnt1YlDxLo", "Page3");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const u = require("./ConfigCtrl");
    const e = require("./SubwindowManager");
    const ItemIcon_1 = require("./ItemIcon");
    const UnlockNewFunc_1 = require("./UnlockNewFunc");
    const SpineCtrl_1 = require("./SpineCtrl");
    const Tool_1 = require("./Tool");
    var I, o, r, s, d, y, l;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var x = require("./RedPointManager").default || require("./RedPointManager");
    var t = "active";
    var t = "isLoad";
    var t = "isLoad";
    let Page3 = class Page3 extends cc.Component {
      constructor() {
        super(...arguments);
        this.stageInfoStr = null;
        this.ticketInfoStr = null;
        this.ticketProgBar = null;
        this.ticketSp = null;
        this.stageBoxes = null;
        this.adBuffCountdownStr = null;
        this.adBuffHint = null;
        this.slotFreeTimes = null;
        this.patrolProgBar = null;
        this.boxBubble = null;
        this.iiPre = null;
        this.lrBtn = null;
        this.levelRateBtn = null;
        this.newFuncEff = null;
        this.dogSpine = null;
      }
      init() {}
      showSlots() {
        cc.MainUI.checkFuncUnlock(12) && cc.SubwindowManager.showWindow(e.UIStatus.Slots, {});
      }
      showAdBuff() {
        cc.SubwindowManager.showWindow(e.UIStatus.AdBuff, {});
        this.adBuffHint.active = false;
      }
      showSign() {
        cc.SubwindowManager.showWindow(e.UIStatus.Sign, {});
      }
      showLab() {
        cc.SubwindowManager.showWindow(e.UIStatus.Lab, {});
      }
      showGameClub() {
        cc.SubwindowManager.showWindow(e.UIStatus.GameClub, {});
      }
      showInvite() {
        cc.MainUI.checkFuncUnlock(5) && cc.SubwindowManager.showWindow(e.UIStatus.Invite, {});
      }
      showSet() {
        cc.SubwindowManager.showWindow(e.UIStatus.Set, {});
      }
      showMail() {
        var c;
        (console.log("Will subscribt update"), window.wx) && (c = "SYS_MSG_TYPE_WHATS_NEW", 
        window.wx.requestSubscribeSystemMessage({
          msgTypeList: [ c ],
          success: function(t) {
            "requestSubscribeMessage:ok" === t.errMsg && t[c] && "accept" === t[c] && cc.popupManager.showToast("\u5df2\u6210\u529f\u8ba2\u9605");
          },
          fail: function(c) {
            console.log(c);
          }
        }));
        cc.SubwindowManager.showWindow(e.UIStatus.Mail, {});
      }
      showRanklist() {
        cc.MainUI.checkFuncUnlock(13) && cc.SubwindowManager.showWindow(e.UIStatus.Ranklist, {
          type: -1
        });
      }
      showArchieve() {
        cc.SubwindowManager.showWindow(e.UIStatus.Archieve, {});
      }
      showPatrol() {
        cc.MainUI.checkFuncUnlock(3) && cc.SubwindowManager.showWindow(e.UIStatus.Patrol, {});
      }
      showShop() {
        cc.MainUI.checkFuncUnlock(15) && cc.SubwindowManager.showWindow(e.UIStatus.Shop, {});
      }
      showGrowRoad() {
        cc.MainUI.checkFuncUnlock(4) && cc.SubwindowManager.showWindow(e.UIStatus.GrowRoad, {});
      }
      showCode() {
        cc.MainUI.checkFuncUnlock(19) && cc.SubwindowManager.showWindow(e.UIStatus.QRCode, {});
      }
      changeCurStage(_c, t) {
        var i;
        i = parseInt(t);
        this.curLevel += i;
        0 === this.curLevel && (this.curLevel = cc.player.levelProg[0]);
        this.curLevel > cc.player.levelProg[0] && (this.curLevel = 1);
        this.refreshStageInfo();
      }
      refreshStageInfo() {
        var c;
        c = u.Datas.LevelInfo[this.curLevel];
        this.stageInfoStr[0].string = c.name;
        this.stageInfoStr[1].string = "" + (this.curLevel === cc.player.levelProg[0] ? cc.player.levelProg[1] : c.wave);
        this.stageInfoStr[2].string = "x" + c.goldPer;
        this.stageInfoStr[3].string = "" + c.tiliNeed * cc.player.levelRate;
      }
      refreshTicketProgBar() {
        var c;
        c = u.Datas.TaskAD[cc.player.adWatchTimes.prog];
        this.lastAdTimes = cc.player.adWatchTimes.times;
        this.ticketInfoStr[0].string = Math.min(c.need, cc.player.adWatchTimes.times) + "/" + c.need;
        this.ticketInfoStr[1].string = "x" + c.rwd[2];
        this.ticketProgBar.progress = Math.min(1, cc.player.adWatchTimes.times / c.need);
        this.ticketSp.setAnimation(0, this.ticketProgBar.progress >= 1 ? "quan2" : "quan1", true);
      }
      refreshBoxInfo() {
        for (var w = cc.player.levelBoxProg, g = [ 0, 0, 0 ], m = w + 1; ;m++) {
          if (!(b = u.Datas.StageBoxReward[m])) {
            g = [ m - 3, m - 2, m - 1 ];
            break;
          }
          if (b.level > cc.player.levelProg[0] || b.level === cc.player.levelProg[0] && b.wave > cc.player.levelProg[1]) {
            g = [ m - 2, m - 1, m ];
            w === m - 1 && u.Datas.StageBoxReward[m + 1] && (g = [ m - 1, m, m + 1 ]);
            break;
          }
        }
        for (g[0] <= 0 && (g = [ 1, 2, 3 ]), this.showBoxIds = g, m = 0; m < g.length; m++) {
          var S, b;
          S = this.stageBoxes[m];
          b = u.Datas.StageBoxReward[g[m]];
          S.getComponentInChildren(cc.Label).string = "\u901a\u5173" + b.level + "-" + b.wave;
          b.level > cc.player.levelProg[0] || b.level === cc.player.levelProg[0] && b.wave > cc.player.levelProg[1] ? S.getComponent(SpineCtrl_1.default).setAnimation(0, "baoxiang1", true) : g[m] <= w ? S.getComponent(SpineCtrl_1.default).setAnimation(0, "baoxiang4", true) : S.getComponent(SpineCtrl_1.default).setAnimation(0, "baoxiang2", true);
        }
      }
      onBoxClick(_c, t) {
        var i, s, o, r, a, I = "baoxiang2", E = "Canvas/ClickMask";
        if (i = this, o = parseInt(t), console.log(o, "clicked"), I !== this.stageBoxes[o].getComponent(SpineCtrl_1.default).spineHandle.animation) return this.boxBubble.active = true, 
        this.boxBubble.x = this.stageBoxes[o].x, a = u.Datas.StageBoxReward[this.showBoxIds[o]], 
        console.log(a), Tool_1.default.getPrefab(this.boxBubble.children[1], this.iiPre, "ii").getComponent(ItemIcon_1.default).init(a.reward[0], a.reward[1], a.reward[2]), 
        cc.find(E).active = true, void (cc.MainUI.clickMaskCb = function() {
          i.boxBubble.active = false;
          cc.find("Canvas/ClickMask").active = false;
        });
        for (var q = {}, U = cc.player.levelBoxProg + 1; !((a = u.Datas.StageBoxReward[U]).level > cc.player.levelProg[0] || a.level === cc.player.levelProg[0] && a.wave > cc.player.levelProg[1]); U++) {
          var V;
          q[(V = a.reward)[1]] || (q[V[1]] = 0);
          q[V[1]] += V[2];
          cc.player.levelBoxProg = U;
        }
        for (var U in r = [], q) {
          r.push(1);
          r.push(parseInt(U));
          r.push(q[U]);
          cc.pvz.PlayerData.getRewardBonus(1, parseInt(U), q[U]);
        }
        for (cc.find(E).active = true, s = 0, U = 0; U < this.stageBoxes.length; U++) I === this.stageBoxes[U].getComponent(SpineCtrl_1.default).spineHandle.animation && this.stageBoxes[U].getComponent(SpineCtrl_1.default).setAnimation(0, "baoxiang3", false, function() {
          0 === s && (s = 1, cc.find("Canvas/ClickMask").active = false, cc.SubwindowManager.showWindow(e.UIStatus.GetItem, {
            items: r,
            showFlyTo: 1
          }), i.refreshBoxInfo());
        });
        cc.pvz.PlayerData.saveData();
      }
      getADTicketBonus() {
        var c;
        c = u.Datas.TaskAD[cc.player.adWatchTimes.prog];
        cc.player.adWatchTimes.times >= c.need ? (cc.pvz.PlayerData.getRewardBonus(c.rwd[0], c.rwd[1], c.rwd[2]), 
        cc.SubwindowManager.showWindow(e.UIStatus.GetItem, {
          items: c.rwd
        }), cc.player.adWatchTimes.times = 0, u.Datas.TaskAD[cc.player.adWatchTimes.prog + 1] && cc.player.adWatchTimes.prog++, 
        cc.pvz.PlayerData.saveData(), this.refreshTicketProgBar()) : cc.SubwindowManager.showWindow(e.UIStatus.ItemInfo, {
          item: [ c.rwd[0], c.rwd[1], c.rwd[2] ],
          tags: [ 0, 0, 0 ],
          shopId: -1
        });
      }
      refresh() {
        this.refreshTimerInfo(0);
      }
      refreshTimerInfo(c) {
        var f = 1e3, d = 86400, y = "gj1", O = "gj2";
        if (this.adBuffTCount += c, this.adBuffTCount > 1) {
          var E, L;
          this.adBuffTCount -= 1;
          for (var N = 0, j = 0; j < cc.player.ADBattleBuff.length; j++) cc.player.ADBattleBuff[j].tillTime > N && (N = cc.player.ADBattleBuff[j].tillTime);
          N > Date.now() / f ? (this.adBuffCountdownStr.node.active = true, this.adBuffCountdownStr.string = Tool_1.default.formatCountDown(Math.floor(N - Date.now() / f), false)) : this.adBuffCountdownStr.node.active = false;
          (E = cc.pvz.PlayerData.getSlotGameDrawTimes(0)) >= 1 && (this.slotFreeTimes.getComponent(cc.Label).string = "" + Math.floor(E));
          L = Math.min(d, Math.floor(Date.now() / f) - cc.player.patrol[3]);
          this.patrolProgBar.getComponent(cc.ProgressBar).progress = Math.min(1, L / d);
          cc.pvz.PlayerData.refreshPatrolData(u.Datas.LevelInfo[cc.player.levelProg[0]]);
          Math.floor(cc.player.patrol[1]) > 0 ? y === this.dogSpine.animation && (this.dogSpine.animation = O) : O === this.dogSpine.animation && (this.dogSpine.animation = y);
        }
      }
      onLevelRateBtnClick() {
        cc.player.levelRate++;
        cc.player.levelRate > 3 && (cc.player.levelRate = 1);
        cc.player.levelRate > 2 && (1e3 * cc.player.levelProg[0] + cc.player.levelProg[1] >= u.Datas.GrowRoadUnlockInfo[40].type2s ? cc.player.levelRate = 3 : cc.player.levelRate = 1);
        this.levelRateBtn.getComponentInChildren(cc.Label).string = cc.player.levelRate + "\u500d\u5f00\u542f";
        this.refreshStageInfo();
      }
      start() {
        var c, t, i, l = 1e3;
        this.adBuffTCount = 0;
        if (t = this, this.isLoad = false, i = [], c = l * cc.player.levelProg[0] + cc.player.levelProg[1], 
        x.lastLevelProg > 0) {
          for (var T = [ 17, 8, -1, -1, 6 ], A = 0; A < T.length; A++) if (!(T[A] <= 0)) {
            var O;
            O = u.Datas.GrowRoadUnlockInfo[T[A]].type2s;
            x.lastLevelProg < O && c >= O && i.push(A + 1);
          }
          x.lastLevelProg = c;
        }
        if (i.length > 0 && setTimeout(function() {
          t.newFuncEff.active = true;
          t.newFuncEff.getComponent(UnlockNewFunc_1.default).showTo(i);
        }), 0 === x.adBuffHintShow ? (this.adBuffHint.active = true, x.adBuffHintShow++) : this.adBuffHint.active = false, 
        this.curLevel = cc.player.levelProg[0], this.refreshStageInfo(), this.refreshTicketProgBar(), 
        this.refreshBoxInfo(), this.adBuffCountdownStr.node.active = false, this.refreshTimerInfo(1), 
        this.lrBtn.map(function(c) {
          return c.active = cc.player.levelProg[0] > 1;
        }), this.levelRateBtn.getComponentInChildren(cc.Label).string = cc.player.levelRate + "\u500d\u5f00\u542f", 
        cc.pvz.runtimeData.hasPreGame()) cc.SubwindowManager.showWindow(e.UIStatus.PreGame, {}); else if (Math.floor(Date.now() / l) - cc.player.patrol[3] >= 86400) {
          if (c < u.Datas.GrowRoadUnlockInfo[3].type2s) return;
          cc.patrolWindowPop || (cc.patrolWindowPop = 1, cc.SubwindowManager.showWindow(e.UIStatus.Patrol, {}));
        }
      }
      startGame() {
        var c;
        if (c = this, !cc.pvz.PlayerData.staminaValue(-u.Datas.LevelInfo[this.curLevel].tiliNeed * cc.player.levelRate)) return cc.popupManager.showToast("\u4f53\u529b\u4e0d\u8db3"), 
        void (cc.player.staminaAdGet.times < 5 && cc.SubwindowManager.showWindow(e.UIStatus.StaminaAdGet, {}));
        x.lastLevelProg = 1e3 * cc.player.levelProg[0] + cc.player.levelProg[1];
        cc.pvz.PlayerData.saveData();
        cc.assetManager.loadBundle("game", function() {
          Tool_1.default.onSceneChange();
          cc.pvz.PlayerData.increaseMissionProg(481, 1);
          cc.pvz.PlayerData.increaseMissionProg(1606, 1);
          cc.pvz.runtimeData.init(0, c.curLevel, cc.player.levelRate);
          cc.butler.loadScene("game");
        });
      }
      update(c) {
        cc.player.adWatchTimes.times !== this.lastAdTimes && this.refreshTicketProgBar();
        this.refreshTimerInfo(c);
      }
      onCrazyStart() {
        this.isLoad || (this.onCheckMiniGameCD(0) ? (this.isLoad = true, cc.assetManager.loadBundle("Daifu", function(c, t) {
          t && (Tool_1.default.onSceneChange(), cc.director.loadScene("Daifu"), cc.player.miniGTimes[0] = Date.now(), 
          cc.pvz.PlayerData.saveData());
        })) : this.onShowCDMiniGameUI(0));
      }
      onCrazyDragon() {
        this.isLoad || (this.onCheckMiniGameCD(1) ? (this.isLoad = true, cc.assetManager.loadBundle("Game3", function(c, t) {
          t && (Tool_1.default.onSceneChange(), cc.director.loadScene("game3"), cc.player.miniGTimes[1] = Date.now(), 
          cc.pvz.PlayerData.saveData());
        })) : this.onShowCDMiniGameUI(1));
      }
      onCheckMiniGameCD(c) {
        var t;
        return -1 == (t = cc.player.miniGTimes[c]) || Math.floor(1800 - (Date.now() - t) / 1e3) <= 0;
      }
      onShowCDMiniGameUI(c) {
        cc.popupManager.popup("lobby", "subwindowPre/xyx_tip", "UIADMiniGame", {
          scale: false
        }, c);
      }
    };
    __decorate([ property(cc.Label) ], Page3.prototype, "stageInfoStr", void 0);
    __decorate([ property(cc.Label) ], Page3.prototype, "ticketInfoStr", void 0);
    __decorate([ property(cc.ProgressBar) ], Page3.prototype, "ticketProgBar", void 0);
    __decorate([ property(sp.Skeleton) ], Page3.prototype, "ticketSp", void 0);
    __decorate([ property(cc.Node) ], Page3.prototype, "stageBoxes", void 0);
    __decorate([ property(cc.Label) ], Page3.prototype, "adBuffCountdownStr", void 0);
    __decorate([ property(cc.Node) ], Page3.prototype, "adBuffHint", void 0);
    __decorate([ property(cc.Node) ], Page3.prototype, "slotFreeTimes", void 0);
    __decorate([ property(cc.Node) ], Page3.prototype, "patrolProgBar", void 0);
    __decorate([ property(cc.Node) ], Page3.prototype, "boxBubble", void 0);
    __decorate([ property(cc.Prefab) ], Page3.prototype, "iiPre", void 0);
    __decorate([ property(cc.Node) ], Page3.prototype, "lrBtn", void 0);
    __decorate([ property(cc.Node) ], Page3.prototype, "levelRateBtn", void 0);
    __decorate([ property(cc.Node) ], Page3.prototype, "newFuncEff", void 0);
    __decorate([ property(sp.Skeleton) ], Page3.prototype, "dogSpine", void 0);
    Page3 = __decorate([ ccclass ], Page3);
    exports.default = Page3;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./ItemIcon": "ItemIcon",
    "./RedPointManager": "RedPointManager",
    "./SpineCtrl": "SpineCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool",
    "./UnlockNewFunc": "UnlockNewFunc"
  } ],
  Page4: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ec28u9yHVENq2/vkHjrTYD", "Page4");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const v = require("./ConfigCtrl");
    const HeroSkin_1 = require("./HeroSkin");
    const RedPointManager_1 = require("./RedPointManager");
    const n = require("./SubwindowManager");
    const EffSpine_1 = require("./EffSpine");
    const EquipIcon_1 = require("./EquipIcon");
    const SkinIcon_1 = require("./SkinIcon");
    const TowerProPanel_1 = require("./TowerProPanel");
    const UpgradeProNum_1 = require("./UpgradeProNum");
    const SpineCtrl_1 = require("./SpineCtrl");
    const Tool_1 = require("./Tool");
    var _, P;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var t = "curPage";
    var j = 0;
    var t = "equipMenuNodes";
    var i = 3600;
    let Page4 = class Page4 extends cc.Component {
      constructor() {
        super(...arguments);
        this.panel1 = null;
        this.panel2 = null;
        this.panel3 = null;
        this.proPanel = null;
        this.panelBtns = null;
        this.panel2LockIcon = null;
        this.panel3LockIcon = null;
        this.heroSpine = null;
        this.proPanelPre = null;
        this.pro0Node = null;
        this.proPanelContainer = null;
        this.proLockPanel = null;
        this.bpStr = null;
        this.upgradeProNum = null;
        this.weaponBtn = null;
        this.proUpEff = null;
        this.siContainer = null;
        this.siPre = null;
        this.skinName = null;
        this.skinStars = null;
        this.skinStarSFS = null;
        this.skinBtns = null;
        this.skinSP = null;
        this.skinProStrs = null;
        this.skinStarUpCost = null;
        this.starUpEff = null;
        this.noSkinPanel = null;
        this.skinHero = null;
        this.btnGroups = null;
        this.btnGroupPos = null;
        this.equipMenuNodes = null;
        this.equipMenuDisplay = null;
        this.equipTypeIcons = null;
        this.equipHero = null;
        this.equipBpStr = null;
        this.equipLvStrs = null;
        this.equipIconPre = null;
        this.equipBoard = null;
        this.equipCount = null;
      }
      init() {
        this.refresh();
      }
      playEff() {
        this.proUpEff.getComponent(EffSpine_1.default).play();
      }
      playEff2() {
        this.starUpEff.getComponent(EffSpine_1.default).play();
      }
      refresh() {
        1 === this.curPage ? this.refreshAsPro() : this.showPro();
        cc.MainUI.checkFuncUnlock(25, false) && (this.panel2LockIcon.active = false);
        cc.MainUI.checkFuncUnlock(38, false) && (this.panel3LockIcon.active = false);
      }
      refreshAsPro() {
        var c;
        RedPointManager_1.default.check("PlayerProLvUp");
        (c = this.pro0Node.getComponent(TowerProPanel_1.default)).initAsPlayer(0, cc.pvz.PlayerData.getPlayerPro(0, cc.player.baseProLv[0]), this);
        !1 === c.upgradeBtn.active && (this.pro0Node.getChildByName("layout").children[0].x = 0);
        for (var k = cc.pvz.PlayerData.getFinalPro(), C = 0; C < this.proPanelContainer.length; C++) Tool_1.default.getPrefab(this.proPanelContainer[C], this.proPanelPre, "proPanel").getComponent(TowerProPanel_1.default).initAsPlayer(C + 1, k.final[C + 1], this);
        this.proLockPanel[0].active = cc.player.baseProLv[0] < 4;
        this.proLockPanel[1].active = cc.player.baseProLv[0] < 11;
        this.proLockPanel[2].active = this.proLockPanel[0].active;
        this.bpStr.string = Tool_1.default.formatNum2(k.bp);
      }
      refreshAsSkin() {
        if (cc.player.skinProLv[this.selectingSkin]) {
          this.noSkinPanel.active = false;
          for (var h = 0; h < this.proPanelContainer.length; h++) Tool_1.default.getPrefab(this.proPanelContainer[h], this.proPanelPre, "proPanel").getComponent(TowerProPanel_1.default).initAsSkin(this.selectingSkin, h + 1, this);
        } else this.noSkinPanel.active = true;
      }
      showUpgradeNum(c, t, i, n, e) {
        void 0 === n && (n = 0);
        void 0 === e && (e = 0);
        this.upgradeProNum.getComponent(UpgradeProNum_1.default).showAt(c, t, i, n, e);
      }
      showProInfo() {
        cc.SubwindowManager.showWindow(n.UIStatus.ProInfoAll, {});
      }
      showPanelsByPage() {
        var c;
        c = this;
        this.panel1.map(function(t) {
          return t.active = 1 === c.curPage;
        });
        this.panel2.map(function(t) {
          return t.active = 2 === c.curPage;
        });
        this.panel3.map(function(t) {
          return t.active = 3 === c.curPage;
        });
        this.proPanel.active = 3 !== this.curPage;
        for (var u = 0; u < this.panelBtns.length / 2; u++) {
          this.panelBtns[u].active = u + this.curPage === 1;
          this.panelBtns[u + 3].active = !this.panelBtns[u].active;
        }
        cc.MainUI.topUIShow[7].active = 2 === this.curPage;
        cc.MainUI.topUIShow[9].active = 3 === this.curPage;
      }
      showPro() {
        1 !== this.curPage && (this.curPage = 1, this.showPanelsByPage(), this.noSkinPanel.active = false, 
        this.refreshAsPro());
      }
      refreshAllSkinInfo() {
        var c;
        for (var h in c = this, v.Datas.SkinInfo) Tool_1.default.getPrefab(this.siContainer, this.siPre, "" + h).getComponent(SkinIcon_1.default).init(parseInt(h), this);
        this.skinInit || (this.siContainer.getComponent(cc.Layout).updateLayout(), setTimeout(function() {
          c.siContainer.parent.parent.getComponent(cc.ScrollView).scrollToTop();
        }, 1), this.skinInit = true);
        this.refreshSelectingSkin();
        this.refreshAsSkin();
      }
      showSkin() {
        var c;
        c = this;
        2 !== this.curPage && cc.MainUI.checkFuncUnlock(25) && (this.curPage = 2, this.showPanelsByPage(), 
        setTimeout(function() {
          c.btnGroups.y = c.btnGroupPos.y + c.btnGroupPos.height - 50;
        }), this.refreshAllSkinInfo());
      }
      showEquip() {
        3 !== this.curPage && cc.MainUI.checkFuncUnlock(38) && (this.curPage = 3, this.showPanelsByPage(), 
        this.hideEquipTypeMenu(null, "99"), this.showEquipList(), this.noSkinPanel.active = false, 
        this.equipBpStr.string = Tool_1.default.formatNum2(cc.pvz.PlayerData.getFinalPro().bp));
      }
      refreshSelectingSkin() {
        var c, t, _ = 12, P = "text1";
        t = v.Datas.SkinInfo[this.selectingSkin];
        this.skinName.string = t.name;
        c = 0;
        cc.player.skinProLv[this.selectingSkin] ? (c = cc.player.skinProLv[this.selectingSkin][0], 
        this.skinBtns.map(function(c) {
          return c.active = true;
        }), this.skinBtns[0].getChildByName(P).active = this.selectingSkin !== cc.player.skinUsing, 
        this.skinBtns[0].getChildByName("text2").active = this.selectingSkin === cc.player.skinUsing, 
        cc.player.skinProLv[this.selectingSkin][0] < v.Datas.Config[_].v.length ? (this.skinBtns[1].getChildByName(P).getComponent(cc.Label).string = "\u5347\u661f", 
        this.skinStarUpCost.node.parent.active = true, this.skinStarUpCost.string = "" + v.Datas.Config[_].v[cc.player.skinProLv[this.selectingSkin][0]]) : (this.skinBtns[1].getChildByName(P).getComponent(cc.Label).string = "\u5df2\u6ee1\u661f", 
        this.skinStarUpCost.node.parent.active = false)) : this.skinBtns.map(function(c) {
          return c.active = false;
        });
        for (var j = 0; j < 5; j++) {
          var G;
          G = 0;
          c > 5 ? c - 5 > j && (G = 2) : c > j && (G = 1);
          this.skinStars[j].spriteFrame = this.skinStarSFS[G];
        }
        this.skinProStrs[0].string = Tool_1.default.getRicktextStr(t.base, c, [ t.baseLv ], [], [ "%" ], [ "", "" ]);
        this.skinProStrs[1].string = Tool_1.default.getRicktextStr(t.other, c, [ t.otherLv ], [], [ t.percent ? "%" : "" ], [ "", "" ]);
        this.skinHero.getComponent(HeroSkin_1.default).setSkinTo(this.selectingSkin);
      }
      showWeapon() {
        cc.MainUI.checkFuncUnlock(22) && cc.SubwindowManager.showWindow(n.UIStatus.Weapon, {
          par: this
        });
      }
      heroAction() {
        this.heroSpine.node.setScale((Math.random() < .5 ? 1 : -1) * Math.abs(this.heroSpine.node.scaleX), this.heroSpine.node.scaleY);
        this.heroSpine.setAnimation(0, Tool_1.default.randomFromArray([ "atk11", "atk12", "atk21", "atk22", "skl1", "skl2" ]), false);
      }
      useSkin() {
        for (var r in cc.player.skinUsing === this.selectingSkin ? cc.player.skinUsing = 0 : cc.player.skinUsing = this.selectingSkin, 
        v.Datas.SkinInfo) Tool_1.default.getPrefab(this.siContainer, this.siPre, "" + r).getComponent(SkinIcon_1.default).init(parseInt(r), this);
        this.refreshSelectingSkin();
        Tool_1.default.displayBPChange();
      }
      starUpSkin() {
        var c, o = 34;
        (c = v.Datas.Config[12].v[cc.player.skinProLv[this.selectingSkin][0]]) && (cc.pvz.PlayerData.itemNum(o) >= c ? (cc.pvz.PlayerData.itemNum(o, -c), 
        cc.player.skinProLv[this.selectingSkin][0]++, this.playEff2(), Tool_1.default.displayBPChange(), 
        cc.pvz.PlayerData.saveData(), this.refreshSelectingSkin()) : cc.popupManager.showToast(v.Datas.Tips[2].v.replace("{1}", v.Datas.Item[o].name)));
      }
      refreshEquipMenuDisplay() {
        0 === this.selectingEquipType ? (this.equipMenuDisplay[0].active = true, this.equipMenuDisplay[1].active = false) : (this.equipMenuDisplay[0].active = false, 
        this.equipMenuDisplay[1].active = true, this.equipMenuDisplay[1].getComponent(cc.Sprite).spriteFrame = this.equipTypeIcons[this.selectingEquipType - 1]);
      }
      showEquipTypeMenu() {
        !1 === this.equipMenuNodes[0].active ? this.equipMenuNodes.map(function(c) {
          return c.active = true;
        }) : this.hideEquipTypeMenu(null, "99");
      }
      hideEquipTypeMenu(c, t) {
        var i;
        i = parseInt(t);
        99 !== i && i !== this.selectingEquipType && (this.selectingEquipType = i, this.refreshEquipMenuDisplay(), 
        this.showEquipList());
        this.equipMenuNodes.map(function(c) {
          return c.active = false;
        });
      }
      showEquipList() {
        for (var c, t, i, C = "eIcon", L = 0; L < this.equipLvStrs.length; L++) {
          this.equipLvStrs[L].string = "Lv." + cc.player.equips.lv[L];
          cc.player.equips.using[L] > 0 ? (this.equipLvStrs[L].node.parent.getChildByName(C).active = true, 
          this.equipLvStrs[L].node.parent.getChildByName(C).active = true, Tool_1.default.getPrefab(this.equipLvStrs[L].node.parent.getChildByName(C), this.equipIconPre, "equip").getComponent(EquipIcon_1.default).initByEquipIdx(cc.player.equips.using[L])) : this.equipLvStrs[L].node.parent.getChildByName(C).active = false;
        }
        for (this.equipBoard.children.map(function(c) {
          return c.active = false;
        }), i = [], c = {}, L = 0; L < cc.player.equips.using.length; L++) c[cc.player.equips.using[L]] = 1;
        for (var L in cc.player.equips.equips) if (!c[L]) {
          var N;
          N = v.Datas.Equip[cc.player.equips.equips[L][0]];
          0 !== this.selectingEquipType && N.buwei !== this.selectingEquipType || i.push(parseInt(L));
        }
        for (i.sort(function(c, t) {
          var l = v.Datas.Equip[cc.player.equips.equips[c][0]], _ = v.Datas.Equip[cc.player.equips.equips[t][0]];
          return l.quality === _.quality ? l.id === _.id ? c - t : l.id - _.id : _.quality - l.quality;
        }), L = 0; L < i.length; L++) Tool_1.default.getPrefab(this.equipBoard, this.equipIconPre, "e" + L).getComponent(EquipIcon_1.default).initByEquipIdx(i[L]);
        for (t = Object.keys(cc.player.equips.equips).length, L = 0; L < cc.player.equips.using.length; L++) cc.player.equips.using[L] > 0 && t--;
        this.equipCount.string = t + "/100";
        this.equipCount.node.color = t >= 100 ? cc.Color.RED : cc.Color.WHITE;
        console.log("show equips:", this.selectingEquipType);
      }
      equipGridLvUp() {
        for (var h = 41, x = this, D = true, B = 0; B < cc.player.equips.lv.length; B++) {
          var y;
          y = cc.player.equips.lv[B];
          v.Datas.EquipLv[y + 1] && (D = false);
        }
        if (D) cc.popupManager.showToast(v.Datas.Tips[18].v); else {
          var T, A, O;
          for (A = cc.pvz.PlayerData.itemNum(h), O = 0, T = 0, B = 0; B < 6; B++) cc.player.equips.lv[B] < cc.player.equips.lv[T] && (T = B);
          for (var E = []; v.Datas.EquipLv[cc.player.equips.lv[T] + 1]; ) {
            var L;
            if (!(A >= (L = v.Datas.EquipLv[cc.player.equips.lv[T]].need))) break;
            A -= L;
            O += L;
            cc.player.equips.lv[T]++;
            E.length < 6 && E.push(T);
            T++;
            T %= cc.player.equips.lv.length;
          }
          if (O > 0) {
            var N;
            for (B = 0; B < this.equipLvStrs.length; B++) this.equipLvStrs[B].string = "Lv." + cc.player.equips.lv[B];
            for (N = function(c) {
              setTimeout(function() {
                x.equipLvStrs[E[c]].node.parent.getChildByName("eff").getComponent(EffSpine_1.default).play();
              }, 100 * c);
            }, B = 0; B < E.length; B++) N(B);
            cc.pvz.PlayerData.itemNum(h, -O);
            Tool_1.default.displayBPChange();
            RedPointManager_1.default.check("EquipLvUp");
            this.equipBpStr.string = Tool_1.default.formatNum2(cc.pvz.PlayerData.getFinalPro().bp);
            cc.pvz.PlayerData.saveData();
          } else cc.popupManager.showToast(v.Datas.Tips[2].v.replace("{1}", v.Datas.Item[h].name));
        }
      }
      showGetSkinWindow() {
        cc.SubwindowManager.showWindow(n.UIStatus.GetSkin, {
          par: this
        });
      }
      showSkinProWindow() {
        cc.SubwindowManager.showWindow(n.UIStatus.SkinPro, {});
      }
      showDecomposeWindow() {
        cc.SubwindowManager.showWindow(n.UIStatus.EquipDecomp, {
          par: this
        });
      }
      start() {
        var c;
        c = this;
        this.selectingSkin = cc.player.skinUsing;
        0 === this.selectingSkin && (this.selectingSkin = 1);
        this.heroSpine.setCompleteListener(0, "", function() {
          var i = "stand";
          i !== c.heroSpine.spineHandle.animation && c.heroSpine.setAnimation(0, i, true);
        });
        cc.MainUI.checkFuncUnlock(22, false) || (this.weaponBtn.active = false);
      }
    };
    __decorate([ property(cc.Node) ], Page4.prototype, "panel1", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "panel2", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "panel3", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "proPanel", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "panelBtns", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "panel2LockIcon", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "panel3LockIcon", void 0);
    __decorate([ property(SpineCtrl_1.default) ], Page4.prototype, "heroSpine", void 0);
    __decorate([ property(cc.Prefab) ], Page4.prototype, "proPanelPre", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "pro0Node", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "proPanelContainer", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "proLockPanel", void 0);
    __decorate([ property(cc.Label) ], Page4.prototype, "bpStr", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "upgradeProNum", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "weaponBtn", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "proUpEff", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "siContainer", void 0);
    __decorate([ property(cc.Prefab) ], Page4.prototype, "siPre", void 0);
    __decorate([ property(cc.Label) ], Page4.prototype, "skinName", void 0);
    __decorate([ property(cc.Sprite) ], Page4.prototype, "skinStars", void 0);
    __decorate([ property(cc.SpriteFrame) ], Page4.prototype, "skinStarSFS", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "skinBtns", void 0);
    __decorate([ property(SpineCtrl_1.default) ], Page4.prototype, "skinSP", void 0);
    __decorate([ property(cc.Label) ], Page4.prototype, "skinProStrs", void 0);
    __decorate([ property(cc.Label) ], Page4.prototype, "skinStarUpCost", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "starUpEff", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "noSkinPanel", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "skinHero", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "btnGroups", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "btnGroupPos", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "equipMenuNodes", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "equipMenuDisplay", void 0);
    __decorate([ property(cc.SpriteFrame) ], Page4.prototype, "equipTypeIcons", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "equipHero", void 0);
    __decorate([ property(cc.Label) ], Page4.prototype, "equipBpStr", void 0);
    __decorate([ property(cc.Label) ], Page4.prototype, "equipLvStrs", void 0);
    __decorate([ property(cc.Prefab) ], Page4.prototype, "equipIconPre", void 0);
    __decorate([ property(cc.Node) ], Page4.prototype, "equipBoard", void 0);
    __decorate([ property(cc.Label) ], Page4.prototype, "equipCount", void 0);
    Page4 = __decorate([ ccclass ], Page4);
    exports.default = Page4;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./EffSpine": "EffSpine",
    "./EquipIcon": "EquipIcon",
    "./HeroSkin": "HeroSkin",
    "./RedPointManager": "RedPointManager",
    "./SkinIcon": "SkinIcon",
    "./SpineCtrl": "SpineCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool",
    "./TowerProPanel": "TowerProPanel",
    "./UpgradeProNum": "UpgradeProNum"
  } ],
  Page5: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f595bIjOdRG0JWkRYOxQ7td", "Page5");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const s = require("./ConfigCtrl");
    const r = require("./SubwindowManager");
    const EquipStagePanel_1 = require("./EquipStagePanel");
    const MetaStagePanel_1 = require("./MetaStagePanel");
    const Tool_1 = require("./Tool");
    var d, a, u;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var M = "AlertWindow";
    var f = 1;
    var o = "default";
    var i = "tCount";
    let Page5 = class Page5 extends cc.Component {
      constructor() {
        super(...arguments);
        this.panel1 = null;
        this.panel2 = null;
        this.panelBtns = null;
        this.panel2LockIcon = null;
        this.MainSV = null;
        this.metaPanelPre = null;
        this.metaPanelContainer = null;
        this.EquipStageSV = null;
        this.equipStagePanel = null;
        this.equipStageContainer = null;
        this.selectingEquipStage = null;
        this.eStageDescStrs = null;
        this.equipQImgs = null;
        this.equipLevelRateBtn = null;
        this.costStaStr = null;
        this.goldStageNode = null;
        this.goldStageInfoStr = null;
      }
      init() {}
      refresh() {
        var c, t, i;
        cc.pvz.exitMode >= 1 || (this.MainSV.scrollToOffset(new cc.Vec2(0, 0)), 2 === this.curPage && this.showMetaStages());
        cc.MainUI.checkFuncUnlock(39, false) && (this.panel2LockIcon.active = false);
        cc.MainUI.checkFuncUnlock(41, false) || (this.goldStageNode.active = false);
        t = Object.keys(s.Datas.GoldStage).length;
        if (t > 0) {
          i = cc.player.goldLevelProg[0];
          c = cc.player.goldLevelProg[1];
          i > t && (i = t, c = s.Datas.GoldStage[t].wave);
          this.goldStageInfoStr[0].string = s.Datas.GoldStage[i].name;
          this.goldStageInfoStr[1].string = c + "\u6ce2";
        } else this.goldStageNode.active = false;
      }
      refreshAllMetaInfo() {
        var c;
        c = this;
        cc.pvz.PlayerData.refreshMetaStageInfo();
        for (var f = 1; f <= 5; f++) Tool_1.default.isDungeonOn(f) && Tool_1.default.getPrefab(this.metaPanelContainer, this.metaPanelPre, "MetaStage" + f).getComponent(MetaStagePanel_1.default).initAs(f);
        this.MainSV.content.getComponent(cc.Layout).updateLayout();
        cc.pvz.exitMode >= 1 && (6 === cc.pvz.exitMode ? this.showDungeon() : setTimeout(function() {
          c.MainSV.stopAutoScroll();
          c.MainSV.scrollToOffset(new cc.Vec2(0, M.ScrollOffsetY));
        }), cc.pvz.exitMode = 0);
      }
      autoScrollView() {}
      onScrollView() {
        M.ScrollOffsetY = this.MainSV.getScrollOffset().y;
      }
      refreshByTime() {
        for (var s = 1; s <= 5; s++) Tool_1.default.isDungeonOn(s) && Tool_1.default.getPrefab(this.metaPanelContainer, this.metaPanelPre, "MetaStage" + s).getComponent(MetaStagePanel_1.default).refresh();
      }
      showPanelsByPage() {
        var c;
        c = this;
        this.panel1.map(function(t) {
          return t.active = 1 === c.curPage;
        });
        this.panel2.map(function(t) {
          return t.active = 2 === c.curPage;
        });
        for (var o = 0; o < this.panelBtns.length / 2; o++) {
          this.panelBtns[o].active = o + this.curPage === 1;
          this.panelBtns[o + 2].active = !this.panelBtns[o].active;
        }
      }
      showMetaStages() {
        1 !== this.curPage && (this.curPage = 1, this.showPanelsByPage(), cc.MainUI.showTopUIBy(s.Datas.Config[8].v));
      }
      showDungeon() {
        2 !== this.curPage && cc.MainUI.checkFuncUnlock(39) && (this.curPage = 2, this.showPanelsByPage(), 
        this.dsPanelInit ? this.autoScrollToEquipStage() : (this.dungeonStagePanelInit(), 
        this.dsPanelInit = true), cc.MainUI.showTopUIBy([ 1, 2, 3 ]));
      }
      dungeonStagePanelInit() {
        var c, t, i, d = 2e3;
        this.showEStages = [ 0, 0 ];
        t = [];
        c = cc.player.equips.stageProg;
        this.esCount = Object.keys(s.Datas.EquipStage).length;
        for (var x = c + 2001; !s.Datas.EquipStage[x]; ) x--;
        for (var D = c - 10; D < c + 10; D++) D > 0 && s.Datas.EquipStage[d + D] && t.push(d + D);
        for (i = 0, D = 0; D < t.length; D++) {
          var B;
          i = (B = Tool_1.default.getPrefab(this.equipStageContainer, this.equipStagePanel, "" + t[D])).height;
          B.getComponent(EquipStagePanel_1.default).init(t[D], this);
          t[D] === x && (this.eDefaultStageY = B.y);
        }
        this.equipStageContainer.height = 40 + this.esCount * (i + 10);
        this.showEStages[0] = t[0];
        this.showEStages[1] = t[t.length - 1];
        this.equipLevelRateBtn.active = x >= s.Datas.Config[13].v[0];
        this.equipLevelRateBtn.getComponentInChildren(cc.Label).string = cc.player.equips.levelRate + "\u500d\u5f00\u542f";
        this.costStaStr.string = "" + 5 * cc.player.equips.levelRate;
        this.autoScrollToEquipStage();
      }
      autoScrollToEquipStage() {
        for (var e = this, o = cc.player.equips.stageProg + 2001; !s.Datas.EquipStage[o]; ) o--;
        this.EquipStageSV.scrollToOffset(new cc.Vec2(0, -this.eDefaultStageY - 240));
        setTimeout(function() {
          e.selectEquipStage(o);
        }, 1);
      }
      onDungeonStageScrolling() {
        var c, t, i, a = 2001, u = 15, f = 2e3;
        if ((c = Tool_1.default.getPrefab(this.equipStageContainer, this.equipStagePanel, "" + this.selectingEquipStageIdx), 
        this.selectingEquipStage.setPosition(this.selectingEquipStage.parent.convertToNodeSpaceAR(c.convertToWorldSpaceAR(new cc.Vec2(0, 0)))), 
        this.showEStages[0] > a) && (t = Tool_1.default.getPrefab(this.equipStageContainer, this.equipStagePanel, "" + this.showEStages[0])).y + t.parent.y >= 0) {
          for (var k = this.showEStages[0], C = this.showEStages[0] - 1; C >= this.showEStages[0] - u && !(C < a); C--) {
            Tool_1.default.getPrefab(this.equipStageContainer, this.equipStagePanel, "" + C).getComponent(EquipStagePanel_1.default).init(C, this);
            k = C;
          }
          this.showEStages[0] = k;
        }
        if (this.showEStages[1] < f + this.esCount && (i = Tool_1.default.getPrefab(this.equipStageContainer, this.equipStagePanel, "" + this.showEStages[1])).y + i.parent.y >= -this.EquipStageSV.node.height) {
          for (k = this.showEStages[1], C = this.showEStages[1] + 1; C <= this.showEStages[1] + u && !(C > f + this.esCount); C++) {
            Tool_1.default.getPrefab(this.equipStageContainer, this.equipStagePanel, "" + C).getComponent(EquipStagePanel_1.default).init(C, this);
            k = C;
          }
          this.showEStages[1] = k;
        }
      }
      selectEquipStage(c) {
        var t, i;
        t = Tool_1.default.getPrefab(this.equipStageContainer, this.equipStagePanel, "" + c);
        this.selectingEquipStage.setPosition(this.selectingEquipStage.parent.convertToNodeSpaceAR(t.convertToWorldSpaceAR(new cc.Vec2(0, 0))));
        this.selectingEquipStageIdx = c;
        (i = s.Datas.EquipStage[c]).e > 100 ? (this.eStageDescStrs[0].active = true, this.eStageDescStrs[1].active = false, 
        this.eStageDescStrs[0].getComponentInChildren(cc.Sprite).spriteFrame = this.equipQImgs[i.e - 101]) : (this.eStageDescStrs[0].active = false, 
        this.eStageDescStrs[1].active = true, this.eStageDescStrs[1].getComponentInChildren(cc.Sprite).spriteFrame = this.equipQImgs[i.e - 1]);
      }
      enterEquipStage() {
        for (var g = this, m = Object.keys(cc.player.equips.equips).length, S = 0; S < cc.player.equips.using.length; S++) cc.player.equips.using[S] > 0 && m--;
        if (m >= 100) cc.popupManager.showToast(s.Datas.Tips[19].v); else {
          var b;
          if (b = 5 * cc.player.equips.levelRate, cc.pvz.PlayerData.staminaValue()[0] < b) return cc.popupManager.showToast("\u4f53\u529b\u4e0d\u8db3"), 
          void (cc.player.staminaAdGet.times < 5 && cc.SubwindowManager.showWindow(r.UIStatus.StaminaAdGet, {}));
          console.log(this.selectingEquipStageIdx);
          cc.assetManager.loadBundle("game", function() {
            Tool_1.default.onSceneChange();
            cc.pvz.PlayerData.increaseMissionProg(481, 1);
            cc.pvz.PlayerData.increaseMissionProg(1606, 1);
            cc.pvz.runtimeData.init(6, g.selectingEquipStageIdx, cc.player.equips.levelRate);
            cc.pvz.runtimeData.mode6Sta = b;
            cc.butler.loadScene("game");
          });
        }
      }
      onLevelRateBtnClick() {
        cc.player.equips.levelRate++;
        cc.player.equips.levelRate > 2 && (cc.player.equips.levelRate = 1);
        this.equipLevelRateBtn.getComponentInChildren(cc.Label).string = cc.player.equips.levelRate + "\u500d\u5f00\u542f";
        this.costStaStr.string = "" + 5 * cc.player.equips.levelRate;
      }
      showEquipStageRank() {
        cc.player.equips.stageProg > 0 ? cc.SubwindowManager.showWindow(r.UIStatus.Ranklist, {
          type: 3
        }) : cc.popupManager.showToast(s.Datas.Tips[20].v);
      }
      showGoldStageWindow() {
        cc.SubwindowManager.showWindow(r.UIStatus.GoldStageInfo, {});
      }
      start() {
        this.tCount = 0;
        this.refreshAllMetaInfo();
      }
      update(c) {
        this.tCount += c;
        this.tCount >= 1 && (cc.pvz.PlayerData.refreshMetaStageInfo(), this.refreshAllMetaInfo(), 
        this.tCount -= 1);
      }
    };
    __decorate([ property(cc.Node) ], Page5.prototype, "panel1", void 0);
    __decorate([ property(cc.Node) ], Page5.prototype, "panel2", void 0);
    __decorate([ property(cc.Node) ], Page5.prototype, "panelBtns", void 0);
    __decorate([ property(cc.Node) ], Page5.prototype, "panel2LockIcon", void 0);
    __decorate([ property(cc.ScrollView) ], Page5.prototype, "MainSV", void 0);
    __decorate([ property(cc.Prefab) ], Page5.prototype, "metaPanelPre", void 0);
    __decorate([ property(cc.Node) ], Page5.prototype, "metaPanelContainer", void 0);
    __decorate([ property(cc.ScrollView) ], Page5.prototype, "EquipStageSV", void 0);
    __decorate([ property(cc.Prefab) ], Page5.prototype, "equipStagePanel", void 0);
    __decorate([ property(cc.Node) ], Page5.prototype, "equipStageContainer", void 0);
    __decorate([ property(cc.Node) ], Page5.prototype, "selectingEquipStage", void 0);
    __decorate([ property(cc.Node) ], Page5.prototype, "eStageDescStrs", void 0);
    __decorate([ property(cc.SpriteFrame) ], Page5.prototype, "equipQImgs", void 0);
    __decorate([ property(cc.Node) ], Page5.prototype, "equipLevelRateBtn", void 0);
    __decorate([ property(cc.Label) ], Page5.prototype, "costStaStr", void 0);
    __decorate([ property(cc.Node) ], Page5.prototype, "goldStageNode", void 0);
    __decorate([ property(cc.Label) ], Page5.prototype, "goldStageInfoStr", void 0);
    Page5 = __decorate([ ccclass ], Page5);
    exports.default = Page5;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./EquipStagePanel": "EquipStagePanel",
    "./MetaStagePanel": "MetaStagePanel",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  PanelNevigator: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "614c4VQN9VP2qJ1SZBroX3b", "PanelNevigator");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PanelNevigator = class PanelNevigator extends cc.Component {
      constructor() {
        super(...arguments);
        this.unselectBtns = null;
        this.selectingBtns = null;
        this.panels = null;
        this.par = null;
      }
      onTagClick(_c, t) {
        var i;
        i = parseInt(t);
        this.selecting !== i && this.refreshPage(i);
      }
      refreshPage(c) {
        this.selecting = c;
        for (var o = 0; o < this.unselectBtns.length; o++) {
          this.unselectBtns[o].active = o !== c;
          this.selectingBtns[o].active = o === c;
          this.panels[o].active = false;
        }
        this.panels[c].active = true;
        this.par["refreshPanel" + (c + 1)]();
      }
      start() {}
    };
    __decorate([ property(cc.Node) ], PanelNevigator.prototype, "unselectBtns", void 0);
    __decorate([ property(cc.Node) ], PanelNevigator.prototype, "selectingBtns", void 0);
    __decorate([ property(cc.Node) ], PanelNevigator.prototype, "panels", void 0);
    __decorate([ property(cc.Component) ], PanelNevigator.prototype, "par", void 0);
    PanelNevigator = __decorate([ ccclass ], PanelNevigator);
    exports.default = PanelNevigator;
    cc._RF.pop();
  }, {} ],
  PatrolWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f6f6eKsf3BJCKD40CP9guwR", "PatrolWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const NetworkManager_1 = require("../main/NetworkManager");
    const Tool_1 = require("./Tool");
    const s = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PatrolWindow = class PatrolWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.getNum = null;
        this.timeStr = null;
        this.timeBar = null;
        this.isMax = null;
      }
      init() {}
      show() {
        this.refresh();
      }
      hide() {
        cc.SubwindowManager.hideWindow(s.UIStatus.Patrol);
      }
      refresh() {
        for (var c, r = 86400, S = [ cc.player.patrol[0], Math.floor(cc.player.patrol[1]) ], b = 0; b < S.length; b++) S[b] > 0 ? (this.getNum[b].node.parent.active = true, 
        this.getNum[b].string = "" + Tool_1.default.formatNum2(S[b])) : this.getNum[b].node.parent.active = false;
        this.getNum[2].node.active = S[0] + S[1] === 0;
        (c = Math.min(r, Math.floor(Date.now() / 1e3) - cc.player.patrol[3])) >= r ? (this.isMax.active = true, 
        this.timeStr.string = "") : (this.isMax.active = false, this.timeStr.string = Tool_1.default.formatCountDown(c));
        this.timeBar.progress = c / r;
      }
      getBonus(c) {
        var t;
        t = this;
        void 0 === c && (c = 1);
        Date.now() / 1e3 < cc.player.patrol[3] ? NetworkManager_1.default.ExitByTimeErr() : NetworkManager_1.default.timeCheck(function() {
          var i, n, e;
          n = cc.player.patrol[0] * c;
          e = Math.floor(cc.player.patrol[1] * c);
          i = [];
          n > 0 && (i.push(1), i.push(2), i.push(n), cc.pvz.PlayerData.getRewardBonus(i[0], i[1], i[2]));
          e > 0 && (i.push(1), i.push(3), i.push(e), cc.pvz.PlayerData.getRewardBonus(i[3], i[4], i[5]));
          cc.pvz.PlayerData.itemNum(498, cc.player.patrol[2]);
          cc.player.patrol = [ 0, 0, 0, Math.floor(Date.now() / 1e3) ];
          cc.SubwindowManager.showWindow(s.UIStatus.GetItem, {
            items: i,
            showFlyTo: 1
          });
          t.tCount = 0;
          cc.pvz.PlayerData.saveData();
          t.hide();
        }, function() {
          cc.popupManager.showToast("\u7f51\u7edc\u8fde\u63a5\u5931\u8d25");
        });
      }
      getBonus0() {
        0 !== cc.player.patrol[0] ? this.getBonus(1) : cc.popupManager.showToast("\u6682\u65e0\u5956\u52b1");
      }
      getBonusByAd() {
        var c;
        c = this;
        0 !== cc.player.patrol[0] ? cc.pvz.AdUtils.willShowAdRewardVideo(cc.pvz.GameConst.AdType["\u53cc\u500d\u5de1\u903b"], function(t) {
          t && c.getBonus(2);
        }) : cc.popupManager.showToast("\u6682\u65e0\u5956\u52b1");
      }
      start() {}
      update(c) {
        this.tCount += c;
        this.tCount >= 1 && (this.refresh(), this.tCount -= 1);
      }
    };
    __decorate([ property(cc.Label) ], PatrolWindow.prototype, "getNum", void 0);
    __decorate([ property(cc.Label) ], PatrolWindow.prototype, "timeStr", void 0);
    __decorate([ property(cc.ProgressBar) ], PatrolWindow.prototype, "timeBar", void 0);
    __decorate([ property(cc.Node) ], PatrolWindow.prototype, "isMax", void 0);
    PatrolWindow = __decorate([ ccclass ], PatrolWindow);
    exports.default = PatrolWindow;
    cc._RF.pop();
  }, {
    "../main/NetworkManager": "NetworkManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  PlayerData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c87cb8ck1hKt65Xv5WE+z0b", "PlayerData");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MyRequest_1 = require("../main/MyRequest");
    const NetworkManager_1 = require("../main/NetworkManager");
    const b = require("./ConfigCtrl");
    const DataProbe_1 = require("./DataProbe");
    const RedPointManager_1 = require("./RedPointManager");
    const Tool_1 = require("./Tool");
    var j, R, $, tc, ic, ac, fc;
    var w = "default", g = "pvz";
    [ w ];
    [ w ];
    [ w ];
    [ w ];
    [ w ];
    [ w ];
    M = null;
    P = {
      getDate: function() {
        var i = new Date();
        return 1e4 * i.getFullYear() + 100 * i.getMonth() + i.getDate();
      },
      newData: function() {
        var l = 12, _ = 14, D = {
          dataVersion: 23,
          isMusicMute: false,
          isSoundMute: false,
          soundVolume: 1,
          musicVolume: 1,
          noHurtNum: 0,
          noHitEff: 0
        };
        D.date = this.getDate();
        D.levelProg = [ 1, 0 ];
        D.levelBoxProg = 0;
        D.levelBoxCounter = 0;
        D.patrol = [ 0, 0, 0, Math.floor(Date.now() / 1e3) ];
        D.levelRate = 1;
        D.timeScaleLevel = 0;
        D.stamina = {
          value: 0,
          lastUpdateTime: 0
        };
        D.staminaAdGet = {
          times: 0,
          lastUpdateTime: 0
        };
        D.adWatchTimes = {
          prog: 1,
          times: 0
        };
        D.towerInfo = {
          t1: [ 1, 1, 1, 1 ],
          t2: [ 1, 1, 1, 1 ],
          set: [ 0, 0, 0, 0, 0, 0, 0, 0 ]
        };
        D.skillInfo = {};
        D.skillUsing = [ -1, -1, -1, -1, -1 ];
        D.newSkillList = [ [ 0, 0 ], [ 0, 0 ], [ 0, 0 ] ];
        D.newSkillTimes = 0;
        D.weaponInfo = {};
        D.weaponUsing = [ -1, -1, -1, -1, -1 ];
        D.weaponGetLastTime = [ 0, 0 ];
        D.ADBattleBuff = [ {
          lv: 1,
          exp: 0,
          getLv: 1,
          nextAdTime: 0,
          getTime: 0,
          tillTime: 0
        }, {
          lv: 1,
          exp: 0,
          getLv: 1,
          nextAdTime: 0,
          getTime: 0,
          tillTime: 0
        }, {
          lv: 1,
          exp: 0,
          getLv: 1,
          nextAdTime: 0,
          getTime: 0,
          tillTime: 0
        } ];
        D.baseProLv = [ 1, 1, 1, 1, 1, 1, 1 ];
        D.skinProLv = {};
        D.skinUsing = 0;
        D.slotGameInfo = {
          rewards: new Array(l).fill(0),
          getTimes: new Array(l).fill(0),
          drawTimes: [ 5, 5 ],
          lastUpdateTime: 0,
          nextEXBonusTimes: 10
        };
        D.metaStageInfo = {
          1: [ 0, 5, 5, 0 ],
          2: [ 0, 5, 5, 0 ],
          3: [ 0, 5, 5, 0 ],
          4: [ 0, 5, 5, 0 ],
          5: [ 0, 5, 5, 0 ]
        };
        D.signInfo = {
          today: 1,
          sign: 0,
          lastSignTime: 0,
          AdProg: [ 0, 0, 0, 0, 0, 0, 0 ]
        };
        D.mailGetInfo = {};
        D.dailyInfo = {
          prog: {},
          get: [],
          lastUpdateTime: 0
        };
        D.archieveProg = {};
        D.archieveGet = {};
        D.mainMission = {
          id: 1,
          prog: [ 0, 0 ]
        };
        D.growUpUnlock = {};
        D.shop = {
          inShop: new Array(_).fill(0),
          buy: new Array(_).fill(0),
          rTimes: 0,
          lastUpdateTime: 0
        };
        D.items = {};
        D.equips = {
          stageProg: 0,
          levelRate: 1,
          lv: [ 1, 1, 1, 1, 1, 1 ],
          using: [ 0, 0, 0, 0, 0, 0 ],
          equips: {}
        };
        D.freeAdGet = [ 0, 0, 0, 0 ];
        D.goldLevelProg = [ 1, 0 ];
        D.goldLevelRate = 1;
        D.labBoxLv = [ 1, 0, 0, 0, 0 ];
        D.labBoxInfo = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ];
        D.isAuth = 0;
        D.saveDataTimes = 0;
        D.gameClub = {
          prog: [ 0, 0, 0, 0 ],
          bonusGet: [ 0, 0, 0, 0 ]
        };
        D.maxDkill = 0;
        D.miniGTimes = [ -1, -1 ];
        D.preCheck = [ 0, 0, 0, 0 ];
        D.adCounts = {};
        cc.player = D;
      },
      staminaValue: function(c) {
        void 0 === c && (c = 0);
        var d = b.Datas.LevelInfo[cc.player.levelProg[0]].tiliMax, l = cc.player.stamina.value;
        if (cc.player.stamina.value < d && (l = cc.player.stamina.value + (Date.now() - cc.player.stamina.lastUpdateTime) / 1e3 / b.Datas.Config[9].v[0]) > d && (l = d), 
        c < 0 && l + c < 0) return null;
        (l += c) >= d && (l = Math.floor(l));
        cc.player.stamina.value = l;
        cc.player.stamina.lastUpdateTime = Date.now();
        var _ = -1;
        return l < d && (_ = (1 - (l - Math.floor(l))) * b.Datas.Config[9].v[0]), [ l, d, _ ];
      },
      getItemQua: function(c, t) {
        return 1 === c ? b.Datas.Item[t].qua : 2 === c ? [ 2, 4, 5 ][b.Datas.Weapon[t].quality - 1] : 3 === c ? [ 2, 4, 5 ][b.Datas.Skill[t].qua - 1] : void 0;
      },
      itemNum: function(c, t) {
        var o = 499;
        return void 0 === t && (t = 0), 4 === c ? this.staminaValue(t)[0] : (cc.player.items[c] || (cc.player.items[c] = 2 === c || 3 === c ? 3 : 0), 
        13 !== c || 0 === t ? (2 === c && (t > 0 ? (this.increaseMissionProg(302, t), this.increaseMissionProg(304, t), 
        cc.player.preCheck[0] += t) : t < 0 && (this.increaseMissionProg(313, -t), cc.player.preCheck[1] += -t)), 
        3 === c && (t > 0 ? (this.increaseMissionProg(301, t), this.increaseMissionProg(303, t), 
        cc.player.preCheck[2] += t) : t < 0 && (this.increaseMissionProg(311, -t), this.increaseMissionProg(312, -t), 
        cc.player.preCheck[3] += -t)), 0 !== t && (DataProbe_1.default.getVerify() !== cc.player.items[o] && NetworkManager_1.default.userMayCheat2(function() {
          console.log("verify not pass.");
        }), 2 === c || 3 === c ? (cc.player.items[c] += 4 * t, DataProbe_1.default.changeItemNumAndCheck(c, t), 
        2 === c && t > 0 && cc.MainUI && RedPointManager_1.default.check("PlayerProLvUp")) : cc.player.items[c] += t, 
        cc.player.items[o] = DataProbe_1.default.getVerify()), 2 === c || 3 === c ? Math.floor((cc.player.items[c] - 3) / 4) : cc.player.items[c]) : void NetworkManager_1.default.checkTicketNum(t, function() {
          console.log("\u5e7f\u544a\u5238\u66f4\u65b0\u5b8c\u6210");
        }, function() {}));
      },
      getRewardBonus: function(c, t, i) {
        if (1 === c) this.itemNum(t, i); else if (2 === c) cc.player.weaponInfo[t] && 0 !== cc.player.weaponInfo[t][0] ? cc.player.weaponInfo[t][2] += i : (cc.player.weaponInfo[t] = [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
        this.increaseMissionProg(807, Object.keys(cc.player.weaponInfo).length, 1)); else if (3 === c) if (cc.player.skillInfo[t] && 0 !== cc.player.skillInfo[t][0]) {
          if (!b.Datas.SkillExp[cc.player.skillInfo[t][0] + 1]) return;
          cc.player.skillInfo[t][1] += i;
          cc.player.skillInfo[t][1] >= b.Datas.SkillExp[cc.player.skillInfo[t][0] + 1]["qua" + b.Datas.Skill[t].qua] && (cc.player.skillInfo[t][0]++, 
          cc.player.skillInfo[t][1] = 0);
        } else {
          cc.player.skillInfo[t] = [ 1, 0 ];
          cc.pvz.PlayerData.increaseMissionProg(703, 1);
        } else if (4 === c) for (var l = 1, _ = 0; _ < i; _++) {
          for (;cc.player.equips.equips[l]; ) l++;
          cc.player.equips.equips[l] = this.getANewEquip(t);
        }
      },
      getANewEquip: function(c) {
        var u = [ c, 0 ], v = b.Datas.Equip[c], f = [], d = [];
        for (var l in b.Datas.EquipPro) v.quality >= b.Datas.EquipPro[l].quaCon && (f.push(parseInt(l)), 
        d.push(b.Datas.EquipPro[l].prob));
        for (var _ = 0; _ < v.ctNum; _++) {
          var p = Tool_1.default.randomByWeight(d), w = b.Datas.EquipPro[f[p]];
          if (w.only > 0) for (var g = 0; g < f.length; g++) b.Datas.EquipPro[f[g]].only === w.only && (d[g] = 0);
          var m = Tool_1.default.randomInt(w.min, w.max);
          u.push(f[p]);
          u.push(m);
        }
        return u;
      },
      refreshMetaStageInfo: function() {
        var s = Date.now();
        for (var o in cc.player.metaStageInfo) {
          var r = b.Datas.MetaStageInfo[o], h = cc.player.metaStageInfo[o], a = Math.min(r.max, h[1] + (s - h[3]) / 1e3 * (1 / r.time));
          h[1] = a;
          h[3] = s;
        }
      },
      refreshSignInfo: function() {
        cc.player.signInfo.lastSignTime < Tool_1.default.today() && cc.player.signInfo.sign && (cc.player.signInfo.today++, 
        cc.player.signInfo.sign = 0, cc.player.signInfo.today % 7 == 1 && (cc.player.signInfo.AdProg = new Array(7).fill(0)));
      },
      createNewLabBox: function(c) {
        var a = Tool_1.default.randomByWeight(b.Datas.LabLv[cc.player.labBoxLv[0]].weight) + 1, u = [], v = [];
        for (var f in b.Datas.LabBox) b.Datas.LabBox[f].quality === a && (u.push(parseInt(f)), 
        v.push(b.Datas.LabBox[f].weight));
        var d = u[Tool_1.default.randomByWeight(v)];
        cc.player.labBoxInfo[c] = [ d, 0, 0 ];
      },
      getTowerLvUpCost: function(c, t, i) {
        if (1 === c) switch (t) {
         case 0:
         case 1:
         case 2:
         case 3:
          return [ 1, 36, 10 * i ];
        } else if (2 === c) switch (t) {
         case 0:
         case 1:
         case 2:
         case 3:
          return [ 1, 37, 10 * i ];
        }
      },
      getTowerPro: function(c, t, i) {
        var e = 30, s = 11, o = 100, r = 50;
        if (1 === c) switch (t) {
         case 0:
          return 10 * (i - 1) * (i - 1) + e * (i - 1) + 300;

         case 1:
          return i <= 10 ? .1 * (i - 1) + 1 : .02 * (i - s) + 2;

         case 2:
          return (i <= 10 ? o * (i - 1) + 2e3 : r * (i - s) + 3e3) / o;

         case 3:
          return (i <= 10 ? 500 * (i - 1) + 15e3 : 200 * (i - s) + 2e4) / o;
        } else if (2 === c) switch (t) {
         case 0:
          return 5 * (i - 1) * (i - 1) + 5 * (i - 1) + e;

         case 1:
          return i <= 10 ? .1 * (i - 1) + 1 : .02 * (i - s) + 2;

         case 2:
          return (r * (i - 1) + 1e3) / o;

         case 3:
          return .1 * (i - 1) + 1;
        }
      },
      getPlayerLvUpCost: function(c, t) {
        switch (c) {
         case 0:
          return [ 1, 2, b.Datas.PlayerPro0[t].gold ];

         case 1:
         case 2:
          return [ 1, 2, 4 * t * t + 4 * t + 28 ];

         case 3:
          return [ 1, 2, b.Datas.PlayerPro3[t].gold ];

         case 4:
          return [ 1, 2, b.Datas.PlayerPro4[t].gold ];

         case 5:
          return [ 1, 2, b.Datas.PlayerPro5[t].gold ];

         case 6:
          return t <= 355 ? [ 1, 2, b.Datas.PlayerPro6[t].gold ] : [ 1, 2, 10 * t * t + 10 * t + 60 ];
        }
      },
      getPlayerPro: function(c, t) {
        var s = 30, o = 355;
        switch (c) {
         case 0:
          return b.Datas.PlayerPro0[t].valu;

         case 1:
          return t * t - t + s;

         case 2:
          return 5 * t * t - 5 * t + s;

         case 3:
          return b.Datas.PlayerPro3[t].valu;

         case 4:
          return b.Datas.PlayerPro4[t].valu;

         case 5:
          return b.Datas.PlayerPro5[t].valu;

         case 6:
          return t <= o ? b.Datas.PlayerPro6[t].valu : 100 * (t - o) + b.Datas.PlayerPro6[o].valu;
        }
      },
      getAllAddValue: function() {
        var v = 1e3, f = 100, d = 1e4, l = 102, _ = 101, j = {};
        for (var G in b.Datas.ProKey) j[G] = 0;
        for (var W in b.Datas.TowerSet) {
          var F = b.Datas.TowerSet[W], R = cc.player.towerInfo.set[parseInt(W) - 1];
          R > 0 && (j[F.type2] += F.valu2[R - 1]);
        }
        for (var q = 0; q < cc.player.skillUsing.length; q++) if (cc.player.skillUsing[q] > 0) for (var U = b.Datas.Skill[cc.player.skillUsing[q]], V = 0; V < U.type.length - 1; V++) j[U.type[V]] += U.valu[V][cc.player.skillInfo[cc.player.skillUsing[q]][0] - 1];
        for (var H in cc.player.skillInfo) if (cc.player.skillInfo[H][0] > 0) {
          var J = b.Datas.Skill[H];
          j[J.type[J.type.length - 1]] += J.valu[J.valu.length - 1][cc.player.skillInfo[H][0] - 1];
        }
        for (var K in cc.player.weaponInfo) if (cc.player.weaponInfo[K][0] > 0) {
          var Y = b.Datas.WeaponExp[v * parseInt(K) + cc.player.weaponInfo[K][0]];
          j[Y.type] += Y.value;
        }
        for (var z = 1; z < cc.player.ADBattleBuff.length; z++) if (cc.player.ADBattleBuff[z].tillTime > Date.now() / v) {
          if (cc.player.ADBattleBuff[z].getTime && cc.player.ADBattleBuff[z].getTime > Date.now() / v) {
            console.warn("\u83b7\u53d6BUFF" + z + "\u7684\u65f6\u95f4\u9519\u8bef");
            continue;
          }
          var Q = b.Datas.ADBattleBuffData[cc.player.ADBattleBuff[z].getLv];
          j[f + z] += Q.eqParm;
        }
        for (var X in cc.player.skinProLv) {
          for (var Z = b.Datas.SkinInfo[parseInt(X)], $ = Z.baseLv[cc.player.skinProLv[X][0]], tc = Z.otherLv[cc.player.skinProLv[X][0]], ic = 1; ic <= 6; ic++) {
            var nc = cc.pvz.PlayerData.getPlayerPro(ic, cc.player.skinProLv[X][ic]);
            j[ic] += nc * $ / d;
          }
          "1" === X && 1 === cc.player.skinUsing && (j[l] += tc);
          "2" === X && 2 === cc.player.skinUsing && (j[_] += tc);
        }
        var ec = MyRequest_1.default.userInfo.inviteCount;
        for (var sc in j[_] += Math.min(v * ec, d), j[l] += Math.min(v * ec, d), cc.player.growUpUnlock) {
          var oc = b.Datas.GrowRoad[sc];
          j[oc.type] += oc.value;
        }
        for (var rc = 0; rc < cc.player.equips.using.length; rc++) if (0 !== cc.player.equips.using[rc]) {
          var hc = cc.player.equips.equips[cc.player.equips.using[rc]], ac = b.Datas.Equip[hc[0]];
          j[ac.type + f] += ac.epsBase + (cc.player.equips.lv[rc] - 1) * ac.epsAdd;
          for (var uc = 2; uc < hc.length; uc += 2) {
            var vc = hc[uc], fc = hc[uc + 1];
            j[b.Datas.EquipPro[vc].type] += fc;
          }
        }
        return j;
      },
      getFinalPro: function(c) {
        var e = 100, s = 30, o = 1e3;
        void 0 === c && (c = []);
        var a = [ 0, 0, 0, 0, 0, 0, 0 ];
        0 === c.length && (c = cc.player.baseProLv);
        for (var u = 0; u < a.length; u++) a[u] = this.getPlayerPro(u, c[u]);
        for (var v = this.getAllAddValue(), f = 1; f < a.length; f++) a[f] = (a[f] + v[f]) * (1 + v[f + e] / 1e4);
        return a[1] = Math.floor(a[1]), a[2] = Math.floor(a[2]), a[4] /= e, a[5] /= e, a[6] /= e, 
        {
          final: a,
          bp: Math.floor(5e4 + 5 * (a[1] - s) + (a[2] - s) + 2e3 * (a[3] - 1) + o * a[4] + o * a[5] + e * (a[6] - 150)),
          exInfo: v
        };
      },
      createNewWeaponRandomPro: function(c, t) {
        if (!(t > 4)) {
          var h = [];
          for (var a in b.Datas.WeaponRandomPro) h.push(parseInt(a));
          var u = Tool_1.default.randomFromArray(h)[0], v = Tool_1.default.randomInt(b.Datas.WeaponRandomPro[u].value1, b.Datas.WeaponRandomPro[u].value2);
          cc.player.weaponInfo[c][3 + 3 * t] = u;
          cc.player.weaponInfo[c][4 + 3 * t] = v;
          cc.player.weaponInfo[c][5 + 3 * t] = 0;
        }
      },
      refreshSlotGameRewards: function() {
        var r = 1e3;
        if (0 === cc.player.slotGameInfo.lastUpdateTime || cc.player.slotGameInfo.lastUpdateTime < Tool_1.default.today() / r) {
          var w = [ 1, 4, 3, 3, 1 ], g = [ [], [], [], [], [] ], m = [ [], [], [], [], [] ], S = r * cc.player.levelProg[0] + cc.player.levelProg[1];
          for (var I in b.Datas.SlotGame) S >= b.Datas.SlotGame[I].isOpen && (g[b.Datas.SlotGame[I].kid - 1].push(parseInt(I)), 
          m[b.Datas.SlotGame[I].kid - 1].push(b.Datas.SlotGame[I].prob1));
          for (var k = [], M = [], P = function(c) {
            Tool_1.default.randomIntsByWeight(m[c], w[c]).map(function(t) {
              0 === c || 4 === c ? k.push(g[c][t]) : M.push(g[c][t]);
            });
          }, x = 0; x < w.length; x++) P(x);
          return Tool_1.default.shuffle(M), M.splice(1, 0, k[0]), M.splice(7, 0, k[1]), cc.player.slotGameInfo.rewards = M, 
          cc.player.slotGameInfo.getTimes = new Array(12).fill(0), cc.player.slotGameInfo.drawTimes = [ 5, 5 ], 
          cc.player.slotGameInfo.lastUpdateTime = Math.floor(Date.now() / r), cc.player.slotGameInfo.nextEXBonusTimes = 10, 
          cc.pvz.PlayerData.saveData(), 1;
        }
        return 0;
      },
      getSlotGameDrawTimes: function(c, t) {
        var e = 1e3;
        if (void 0 === t && (t = 0), this.refreshSlotGameRewards(), 0 === c) {
          var u = cc.player.slotGameInfo.drawTimes[0] + (Date.now() / e - cc.player.slotGameInfo.lastUpdateTime) / 5400;
          if (u >= 5 && (u = 5), 0 !== t) {
            if (!(u + t >= 0)) return -1;
            u += t;
            cc.player.slotGameInfo.drawTimes[0] = u;
            cc.player.slotGameInfo.lastUpdateTime = Math.floor(Date.now() / e);
          }
          return u;
        }
        if (1 === c) {
          var v = cc.player.slotGameInfo.drawTimes[1];
          if (0 !== t) {
            if (!(v + t >= 0)) return -1;
            v += t;
            cc.player.slotGameInfo.drawTimes[1] = v;
          }
          return v;
        }
        return 1;
      },
      slotGameDraw: function() {
        for (var d = [], l = [], _ = [], p = [], w = 0; w < cc.player.slotGameInfo.rewards.length; w++) {
          var g = cc.player.slotGameInfo.rewards[w], m = b.Datas.SlotGame[g];
          d.push(g);
          0 === m.limit || m.limit > cc.player.slotGameInfo.getTimes[w] ? (l.push(m.prob1), 
          m.dj && (_.push(g), p.push(m.prob1))) : l.push(0);
        }
        if (!(0 === cc.player.slotGameInfo.nextEXBonusTimes && _.length > 0)) {
          var S = Tool_1.default.randomByWeight(l);
          cc.player.slotGameInfo.nextEXBonusTimes--;
          for (var I = 0; I < _.length; I++) if (_[I] === d[S]) {
            cc.player.slotGameInfo.nextEXBonusTimes = 10;
            break;
          }
          return S;
        }
        var k = Tool_1.default.randomByWeight(p);
        cc.player.slotGameInfo.nextEXBonusTimes = 10;
        for (var M = 0; M < cc.player.slotGameInfo.rewards.length; M++) if (cc.player.slotGameInfo.rewards[M] === _[k]) return M;
      },
      getSlotBonus: function(c) {
        var o = b.Datas.SlotGame[cc.player.slotGameInfo.rewards[c]];
        return this.getRewardBonus(o.rwd[0], o.rwd[1], o.rwd[2]), cc.player.slotGameInfo.getTimes[c]++, 
        o.rwd;
      },
      refreshPatrolData: function(c) {
        var s = 1440, o = 1e3;
        if (!(cc.player.patrol[2] >= s || Date.now() / o < cc.player.patrol[3])) {
          var u = Math.floor((Date.now() / o - cc.player.patrol[3]) / 60);
          if (u >= s && (u = s), u > cc.player.patrol[2]) {
            var v = u - cc.player.patrol[2];
            cc.player.patrol[0] += c.gjGode * v;
            cc.player.patrol[1] += c.gjGem * v;
            cc.player.patrol[2] = u;
          }
        }
      },
      increaseMissionProg: function(c, t, i) {
        void 0 === i && (i = 0);
        var _ = 0;
        Tool_1.default.checkMissionEvent(2, c) && (cc.player.archieveProg[c] || (cc.player.archieveProg[c] = 0), 
        0 === i ? cc.player.archieveProg[c] += t : cc.player.archieveProg[c] = t, cc.MainUI && RedPointManager_1.default.check("ArchieveTask", {
          id: c
        }), _ = 1);
        Tool_1.default.checkMissionEvent(1, c) && (cc.player.dailyInfo.prog[c] || (cc.player.dailyInfo.prog[c] = 0), 
        0 === i ? cc.player.dailyInfo.prog[c] += t : cc.player.dailyInfo.prog[c] = t, cc.MainUI && RedPointManager_1.default.check("DailyTask", {
          id: c
        }), _ = 1);
        cc.player.mainMission.prog[0] === c ? (0 === i ? cc.player.mainMission.prog[1] += t : cc.player.mainMission.prog[1] = t, 
        _ = 1, cc.MainUI && cc.MainUI.refreshMainMission()) : 0 === cc.player.mainMission.prog[0] && cc.MainUI && cc.MainUI.refreshMainMission();
        _ && this.saveData();
      },
      refreshShop: function() {
        var o = 1e3, r = 12;
        if (cc.player.shop.lastUpdateTime < Tool_1.default.today() / o) {
          cc.player.shop.rTimes = 0;
          cc.player.shop.lastUpdateTime = Math.floor(Date.now() / o);
          for (var g = 0; g <= 15; g++) {
            cc.player.shop.buy[g] = 0;
            cc.player.shop.inShop[g] = 0;
          }
        }
        for (var m = [], S = [], I = 0; I < 16; I++) {
          m.push([]);
          S.push([]);
        }
        for (var k in b.Datas.Shop) {
          var M = b.Datas.Shop[k];
          m[M.gz - 1].push(parseInt(k));
          S[M.gz - 1].push(M.prob);
        }
        for (var P = [], x = 0; x < m.length; x++) if (x >= r && cc.player.shop.inShop[x]) P.push(cc.player.shop.inShop[x]); else {
          var D = m[x][Tool_1.default.randomByWeight(S[x])];
          P.push(D);
        }
        for (var B = 0; B < P.length - 4; B++) cc.player.shop.buy[B] = 0;
        for (var y = P.length - 4; y < P.length; y++) cc.player.shop.buy[y] || (cc.player.shop.buy[y] = 0);
        cc.player.shop.inShop = P;
        cc.pvz.PlayerData.saveData();
      },
      postLoadData: function() {
        var l = 23, _ = 12, p = 14, w = 15, g = 18, m = 1e3;
        if (cc.player.dataVersion < l) {
          if (cc.player.dataVersion < 2 && (cc.player.staminaAdGet = {
            times: 0,
            lastUpdateTime: 0
          }), cc.player.dataVersion < 3 && (cc.player.dailyInfo = {
            prog: {},
            get: [],
            lastUpdateTime: 0
          }, cc.player.archieveProg = {}, cc.player.archieveGet = {}, cc.player.mainMission = {
            id: 1,
            prog: [ 0, 0 ]
          }), cc.player.dataVersion < 4 && (cc.player.growUpUnlock = {}), cc.player.dataVersion < 5 && (cc.player.levelRate = 1), 
          cc.player.dataVersion < 6 && (cc.player.skinProLv = {}), cc.player.dataVersion < 7 && (cc.player.shop = {
            inShop: new Array(_).fill(0),
            buy: new Array(_).fill(0),
            rTimes: 0,
            lastUpdateTime: 0
          }), cc.player.dataVersion < 8 && (cc.player.timeScaleLevel = 0), cc.player.dataVersion < 10 && (cc.player.maxDkill = 0, 
          cc.player.miniGTimes = [ -1, -1 ]), cc.player.dataVersion < 11 && (cc.player.timeScaleLevel = 0), 
          cc.player.dataVersion < _ && (cc.player.preCheck = [ 0, 0, 0, 0 ]), cc.player.dataVersion < 13) {
            var U = 0;
            for (var V in cc.player.skillInfo) cc.player.skillInfo[V][0] > 0 && U++;
            cc.pvz.PlayerData.increaseMissionProg(703, U, 1);
          }
          if (cc.player.dataVersion < p) for (var H = 0; H < cc.player.towerInfo.set.length; H++) cc.pvz.PlayerData.increaseMissionProg(911 + H, cc.player.towerInfo.set[H], 1);
          cc.player.dataVersion < w && (cc.player.items[2] && (cc.player.items[2] = 4 * cc.player.items[2] + 3), 
          cc.player.items[3] && (cc.player.items[3] = 4 * cc.player.items[3] + 3));
          cc.player.dataVersion < 16 && (cc.player.noHurtNum = 0, cc.player.noHitEff = 0);
          cc.player.dataVersion < 17 && (cc.player.items[499] = DataProbe_1.default.getVerify());
          cc.player.dataVersion < g && (cc.player.equips = {
            stageProg: 0,
            levelRate: 1,
            lv: [ 1, 1, 1, 1, 1, 1 ],
            using: [ 0, 0, 0, 0, 0, 0 ],
            equips: {}
          });
          cc.player.dataVersion < 19 && (cc.player.adCounts = {});
          cc.player.dataVersion < 20 && p == cc.player.levelProg[0] && 450 == cc.player.levelProg[1] && (cc.player.levelProg[0] = w, 
          cc.player.levelProg[1] = 0);
          cc.player.dataVersion < 21 && (cc.player.freeAdGet = [ 0, 0, 0, 0 ]);
          cc.player.dataVersion < 22 && (cc.player.goldLevelProg = [ 1, 0 ], cc.player.goldLevelRate = 1);
          cc.player.dataVersion < l && (cc.player.labBoxLv = [ 1, 0, 0, 0, 0 ], cc.player.labBoxInfo = [ [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ] ]);
          cc.player.dataVersion = l;
        }
        for (var J in cc.player.inviteFriends = [], cc.player.weaponInfo) {
          (cc.player.weaponInfo[J].length < g || 0 === cc.player.weaponInfo[J][0]) && delete cc.player.weaponInfo[J];
          cc.player.weaponInfo[J][1] > 10 && (cc.player.weaponInfo[J][1] = 10);
        }
        cc.player.skinUsing || (cc.player.skinUsing = 0);
        for (var K = 0; K < cc.player.ADBattleBuff.length; K++) cc.player.ADBattleBuff[K].getTime > Date.now() / m && (cc.player.ADBattleBuff[K].tillTime = Math.floor(Date.now() / m));
        cc.player.equips.levelRate || (cc.player.equips.levelRate = 1);
        cc.player.freeAdGet.length < 4 && cc.player.freeAdGet.push(0);
        this.resetDailyData();
        DataProbe_1.default.init();
      },
      resetDailyData: function() {
        var f = this.getDate(), d = parseInt(cc.player.date);
        if (parseInt(f) > d) {
          for (var l in cc.player.date = f, cc.player.levelBoxCounter = 0, cc.player.dailyInfo.prog = {}, 
          cc.player.dailyInfo.get = [], cc.player.adCounts = {}, cc.player.metaStageInfo) cc.player.metaStageInfo[l][2] = 5;
          cc.player.staminaAdGet.times = 0;
          cc.player.staminaAdGet.lastUpdateTime = Math.floor(Date.now() / 1e3);
          cc.player.freeAdGet = [ 0, 0, 0, 0 ];
          cc.player.labBoxLv[2] = 0;
          cc.player.labBoxLv[3] = 0;
          cc.player.labBoxLv[4] = 0;
          this.increaseMissionProg(101, 1, 1);
          this.increaseMissionProg(102, 1, 0);
          this.refreshSignInfo();
        }
      },
      initPlayerData: function() {
        var e = cc.sys.localStorage.getItem("80day-2");
        e ? (cc.player = JSON.parse(e), cc.is1st = false) : (this.newData(), cc.is1st = true);
        this.postLoadData();
      },
      initPlayerDataBy: function(c) {
        cc.player = c;
        this.postLoadData();
      },
      saveToLocal: function() {
        var o = 0;
        cc.player.baseProLv.map(function(c) {
          return o += c;
        });
        cc.player.saveDataTimes++;
        delete cc.player.sCode;
        var r = JSON.stringify(cc.player);
        return cc.player.sCode = Tool_1.default.strHash(r), r = r.slice(0, -1) + ',"sCode":' + cc.player.sCode + "}", 
        cc.sys.localStorage.setItem("80day-2", r), {
          savingStr: r,
          lv: o
        };
      },
      saveData: function() {
        if (cc.player) if (cc.CantSaveInLocal) console.warn("\u56e0\u767b\u5f55\u5931\u6548\u5bfc\u81f4\u65e0\u6cd5\u7ee7\u7eed\u5728\u672c\u5730\u5b58\u6863."); else {
          var t = this.saveToLocal();
          this.willPostDataToCloud(t.savingStr, t.lv);
        }
      },
      willPostDataToCloud: function(c, t) {
        if (!window.wx) {
          cc.sys.localStorage.setItem("cloud-archive", c);
          return;
        }
        M && (console.info("\u4e0a\u4e00\u6b21\u63d0\u4ea4\u4e91\u5b58\u6863\u7684\u8bf7\u6c42\u53d6\u6d88"), 
        clearTimeout(M));
        M = setTimeout(function() {
          console.info("\u5373\u5c06\u63d0\u4ea4\u4e91\u5b58\u6863");
          M = null;
          NetworkManager_1.default.saveData(c, t, function() {
            console.info("\u5df2\u63d0\u4ea4\u4e91\u5b58\u6863");
          });
        }, 1e3);
      },
      clearData: function() {
        cc.sys.localStorage.removeItem("80day-2");
      },
      onDataChanged: function() {},
      saveWhiteList: function() {
        cc.player.isAllWhiteList || (cc.player.isAllWhiteList = true, this.saveData());
      }
    };
    cc[g] || (cc[g] = {});
    cc[g].PlayerData = P;
    module.exports.exports = P;
    module.exports.default = module.exports;
    cc._RF.pop();
  }, {
    "../main/MyRequest": "MyRequest",
    "../main/NetworkManager": "NetworkManager",
    "./ConfigCtrl": "ConfigCtrl",
    "./DataProbe": "DataProbe",
    "./RedPointManager": "RedPointManager",
    "./Tool": "Tool"
  } ],
  Pool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8bd80TFXLJNToo2T642QD2r", "Pool");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var r, t;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Pool = class Pool extends cc.Component {
      constructor() {
        super(...arguments);
        this.inPool = null;
        this.inPools = null;
        this.poolIdx = 0;
        this.size = 0;
      }
      createPool(c) {
        this.size = c;
      }
      getNewPoolItem() {
        var c, t, r = 1e5;
        for (var d in t = Date.now(), this.sleeps) if (!(t <= this.sleeps[d])) {
          var l;
          return delete this.sleeps[d], this.actives[d] = 1, l = parseInt(d) - r * this.poolIdx, 
          this.pool[l].active = true, this.pool[l];
        }
        return (c = cc.instantiate(this.inPool)).setParent(this.node), this.pool.push(c), 
        c.inPoolIdx = this.pool.length - 1 + r * this.poolIdx, c.name = "pool" + c.inPoolIdx, 
        this.actives[c.inPoolIdx] = 1, c;
      }
      destroyPoolItem(c) {
        this.pool[c.inPoolIdx - 1e5 * this.poolIdx].active = false;
        delete this.actives[c.inPoolIdx];
        this.sleeps[c.inPoolIdx] = Date.now() + 1e3;
      }
      destroyAllPoolItem(c) {
        void 0 === c && (c = false);
        for (var s = 0; s < this.node.children.length; s++) this.node.children[s].active && this.destroyPoolItem(this.node.children[s]);
      }
      getAllActiveItem() {
        var c;
        for (var s in c = [], this.actives) {
          var o;
          o = parseInt(s) - 1e5 * this.poolIdx;
          c.push(this.pool[o]);
        }
        return c;
      }
      onLoad() {
        this.pool = [];
        this.sleeps = {};
        this.actives = {};
      }
      start() {}
    };
    __decorate([ property(cc.Prefab) ], Pool.prototype, "inPool", void 0);
    __decorate([ property(cc.Prefab) ], Pool.prototype, "inPools", void 0);
    __decorate([ property(cc.Integer) ], Pool.prototype, "poolIdx", void 0);
    __decorate([ property(cc.Integer) ], Pool.prototype, "size", void 0);
    Pool = __decorate([ ccclass ], Pool);
    exports.default = Pool;
    cc._RF.pop();
  }, {} ],
  PopupManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1f46aROMcZBAKSIrLVXbx2j", "PopupManager");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const PrefabInfo_1 = require("./PrefabInfo");
    var S, y, C, B, M, b, E, I, T, k, D, R, x;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PopupManager = class PopupManager extends cc.Component {
      constructor() {
        super(...arguments);
        this.default_sprite_splash = null;
        this.onPopup1st = null;
        this.onAllClosed = null;
        this.taskToastPrfefab = null;
        this.toastPrefab = null;
        this.effectPrefab = null;
        this.effectBattlePrefab = null;
        this.adToastNode = null;
      }
      onLoad() {
        cc.popupManager = this;
        this.adToastNode && (this.adToastNode.active = false, this.adToastNode.zIndex = cc.macro.MAX_ZINDEX - 2);
        this.popups = [];
        this.showModals = [];
        this.isAutoPop = false;
      }
      nonePopupUI() {
        return !this.modal || !this.modal.active;
      }
      createModal() {
        if (!this.modal) {
          var f = new cc.Node();
          f.width = 4 * this.node.width;
          f.height = 4 * this.node.height;
          f.color = cc.Color.BLACK;
          f.opacity = 210;
          f.addComponent(cc.BlockInputEvents);
          var v = f.addComponent(cc.Sprite);
          v.sizeMode = cc.Sprite.SizeMode.CUSTOM;
          v.spriteFrame = this.default_sprite_splash;
          this.modal = f;
          this.modal.parent = this.node;
        }
      }
      onAllPopupClosed() {
        this.modal && (this.modal.active = false);
        this.onAllClosed && this.onAllClosed.emit();
      }
      removeAllPopups() {
        this.popups.forEach(function(t) {
          t.node.destroy();
        });
        this.popups = [];
        this.onAllPopupClosed();
      }
      popup(t, n, r, c) {
        for (var A = this, S = c.ad, y = void 0 === S || S, C = c.scale, B = void 0 === C || C, M = c.adLeft, b = void 0 !== M && M, E = c.showModal, I = void 0 === E || E, T = c.opacity, k = void 0 === T ? 210 : T, D = arguments.length, R = new Array(D > 4 ? D - 4 : 0), x = 4; x < D; x++) R[x - 4] = arguments[x];
        if (this.popups.length > 0 && this.popups[this.popups.length - 1].onPopupUI && this.popups[this.popups.length - 1].onPopupUI(), 
        this.nonePopupUI() && (this.createModal(), this.modal.active = true, this.onPopup1st && this.onPopup1st.emit()), 
        I || this.showModals.some(function(t) {
          return t;
        })) {
          var N = I ? this.popups.length : this.showModals.findIndex(function(t) {
            return t;
          });
          this.createModal();
          this.modal.opacity = k;
          this.modal.zIndex = 2 * N + 1;
        } else this.modal && (this.modal.opacity = 0);
        this.showModals.push(I);
        cc.pvz.utils.useBundleAsset(t, n, cc.Prefab, function(t) {
          var h = cc.instantiate(t), l = h.getComponent(r);
          h.parent = A.node;
          h.zIndex = 2 * A.popups.length + 2;
          B ? (h.scale = .5, h.runAction(cc.sequence(cc.scaleTo(1, 1).easing(cc.easeElasticOut(3)), cc.callFunc(function() {
            l.showFinish && l.showFinish.apply(l);
          }, A)))) : h.runAction(cc.sequence(cc.delayTime(.032), cc.callFunc(function() {
            l.showFinish && l.showFinish.apply(l);
          }, A)));
          l.__showAd = y;
          l.__showAdAlignLeft = b;
          A.popups.push(l);
          l.initBy && l.initBy.apply(l, R);
        });
      }
      removePopup(t) {
        var l = this.popups.findIndex(function(n) {
          return n == t;
        });
        if (-1 != l) {
          if (-1 != l) {
            this.popups.splice(l, 1);
            this.showModals.splice(l, 1);
            l > 0 && this.popups[l - 1].onPopupClosed && this.popups[l - 1].onPopupClosed();
            for (var d = -1, w = this.showModals.length; --w >= 0; ) if (this.showModals[w]) {
              d = w;
              break;
            }
            -1 !== d ? (this.createModal(), this.modal.opacity = 210, this.modal.zIndex = 2 * d + 1) : this.modal && (this.modal.active = false);
          }
          if (t.__showAd) for (var g = this.popups.length - 1; g >= 0 && !this.popups[g].__showAd; g--) ;
          t.node.destroy();
          this.nonePopupUI() && this.onAllPopupClosed();
        }
      }
      showToast(t) {
        var u = this.toastPrefab.addNode();
        u.y = 0;
        u.opacity = 255;
        u.zIndex = cc.macro.MAX_ZINDEX - 3;
        u.runAction(cc.sequence(cc.moveBy(.3, 0, 80), cc.delayTime(.8), cc.fadeOut(.3), cc.removeSelf()));
        cc.find("tip", u).getComponent(cc.Label).string = t;
      }
      showEffectFly2(t, n, r, c, e) {
        void 0 === c && (c = 1);
        void 0 === e && (e = 10);
        var o = this.effectPrefab.addEffectNode2(t, n, r, c, e);
        return o.zIndex = cc.macro.MAX_ZINDEX, o;
      }
      showAdToast(t) {
        this.adToastNode.active = 2 != t;
        this.adToastNode.active && (cc.find("blockTouch", this.adToastNode).active = 0 == t, 
        cc.find("tip", this.adToastNode).getComponent(cc.Label).string = [ "\u62c9\u53d6\u5e7f\u544a\u4e2d...", "\u770b\u5b8c\u5e7f\u544a\u624d\u6709\u5956\u52b1", null, "\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25" ][t], 
        this.adToastNode.y = 0, this.adToastNode.opacity = 255, this.adToastNode.stopAllActions(), 
        0 != t && this.adToastNode.runAction(cc.sequence(cc.moveBy(.3, 0, 80), cc.delayTime(.8), cc.fadeOut(.3))));
      }
    };
    __decorate([ property(cc.SpriteFrame) ], PopupManager.prototype, "default_sprite_splash", void 0);
    __decorate([ property(cc.Component.EventHandler) ], PopupManager.prototype, "onPopup1st", void 0);
    __decorate([ property(cc.Component.EventHandler) ], PopupManager.prototype, "onAllClosed", void 0);
    __decorate([ property(PrefabInfo_1.default) ], PopupManager.prototype, "taskToastPrfefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], PopupManager.prototype, "toastPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], PopupManager.prototype, "effectPrefab", void 0);
    __decorate([ property(PrefabInfo_1.default) ], PopupManager.prototype, "effectBattlePrefab", void 0);
    __decorate([ property(cc.Node) ], PopupManager.prototype, "adToastNode", void 0);
    PopupManager = __decorate([ ccclass ], PopupManager);
    exports.default = PopupManager;
    cc._RF.pop();
  }, {
    "./PrefabInfo": "PrefabInfo"
  } ],
  PreGameWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "896d3QxH3xNI6OyOz3nkJuM", "PreGameWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const e = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    const n = require("./SubwindowManager");
    var c;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PreGameWindow = class PreGameWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.levelLabel = null;
        this.waveLabel = null;
        this.maxWaveLabel = null;
        this.coinLabel = null;
        this.diamondLabel = null;
        this.rateRoot = null;
        this.rateLabel = null;
      }
      init() {}
      show(c) {
        var t, i, n, s, o;
        (void 0 === c && (c = {}), n = (t = cc.pvz.runtimeData.preData).wave + 1, i = t.name, 
        t.name) || (s = t.level, i = e.Datas.LevelInfo[s].name);
        this.levelLabel.string = (6 == t.mode ? "\u63a2\u5b9d-" : "") + i;
        t.coin = Math.floor(t.coin);
        t.diamond = Math.floor(t.diamond);
        this.waveLabel.string = "" + n;
        this.coinLabel.string = Tool_1.default.formatNum2(t.coin);
        this.diamondLabel.string = Tool_1.default.formatNum2(t.diamond);
        o = 0 == t.mode ? cc.player.levelRate : cc.player.equips.levelRate;
        this.rateRoot.active = o > 1;
        this.rateRoot.active && (this.rateLabel.string = "x" + o);
        this.info = {
          name: i,
          mode: t.mode,
          level: t.level,
          wave: n,
          rec: 0,
          rate: o,
          coin: t.coin,
          diamond: t.diamond
        };
      }
      onOkClick() {
        this.hide();
        Tool_1.default.onSceneChange();
        cc.pvz.runtimeData.initByPreData();
        cc.butler.loadScene("game");
      }
      onQuitClick() {
        this.hide();
        cc.pvz.runtimeData.removeData();
        cc.SubwindowManager.showWindow(n.UIStatus.ExitLevelBonus, this.info);
      }
      hide() {
        cc.SubwindowManager.hideWindow(n.UIStatus.PreGame);
      }
    };
    __decorate([ property(cc.Label) ], PreGameWindow.prototype, "levelLabel", void 0);
    __decorate([ property(cc.Label) ], PreGameWindow.prototype, "waveLabel", void 0);
    __decorate([ property(cc.Label) ], PreGameWindow.prototype, "maxWaveLabel", void 0);
    __decorate([ property(cc.Label) ], PreGameWindow.prototype, "coinLabel", void 0);
    __decorate([ property(cc.Label) ], PreGameWindow.prototype, "diamondLabel", void 0);
    __decorate([ property(cc.Node) ], PreGameWindow.prototype, "rateRoot", void 0);
    __decorate([ property(cc.Label) ], PreGameWindow.prototype, "rateLabel", void 0);
    PreGameWindow = __decorate([ ccclass ], PreGameWindow);
    exports.default = PreGameWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  PrefabInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b969bx+7YhL9p7F4HPdvrXY", "PrefabInfo");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PrefabInfo = class PrefabInfo extends cc.Component {
      constructor() {
        super(...arguments);
        this.prefab = null;
        this.prefabAsset = null;
        this.clazz = "";
        this.count = 0;
        this.root = null;
      }
      onLoad() {
        this.init();
        cc.hasHackNode || (cc.hasHackNode = true, cc.Node.prototype._onSetParent = function(t) {
          null == t && this.__pool && (this.__poolCounter++, this.__isInPool = true, this.__pool.put(this));
        });
      }
      onDestroy() {
        if (this.hasInit) for (var c = 0, e = this.pool.size(); c < e; c++) this.pool.get().destroy();
      }
      lazyInit() {
        this.hasInit || (this.hasInit = true, this.prefab && (this.prefab.__isInPool = false, 
        this.prefab.active = false, this.prefab.position = cc.Vec2.ZERO), this.pool = this.clazz.length > 0 ? new cc.NodePool(this.clazz) : new cc.NodePool());
      }
      init() {
        if (this.count >= 0) {
          this.lazyInit();
          for (var i = this.prefab || this.prefabAsset, o = 0; o < this.count; o++) {
            var a = cc.instantiate(i);
            a.__poolCounter = 0;
            a.__isInPool = true;
            a.__pool = this.pool;
            this.pool.put(a);
          }
        }
      }
      newNode() {
        this.lazyInit();
        var e = null;
        return this.pool && this.pool.size() > 0 ? e = this.pool.get() : (e = cc.instantiate(this.prefab || this.prefabAsset)).__poolCounter = 0, 
        e.__isInPool = false, e.__pool = this.pool, e;
      }
      addNodeToByWorldPos(t, n) {
        return this.addNodeTo(t, t.convertToNodeSpaceAR(n));
      }
      addNodeByWorldPos(t) {
        return this.addNode(this.root.convertToNodeSpaceAR(t));
      }
      addNode(t) {
        return this.addNodeTo(this.root, t);
      }
      addNodeTo(t, n) {
        var e = this.newNode();
        return n && (e.position = n), e.parent = t, e.active = true, e._calculWorldMatrix(), 
        e;
      }
      addEffectNode(t, n) {
        var e = this.newNode();
        return e.parent = this.root, e.active = true, e.getComponent("EffectFly").initEffect(t, n), 
        e._calculWorldMatrix(), e;
      }
      addEffectNode2(t, n, r, c, e) {
        void 0 === c && (c = 1);
        void 0 === e && (e = 10);
        var a = this.newNode();
        return a.position = n, a.parent = this.root, a.active = true, a.getComponent("EffectFly").initEffect(t, r, c, e), 
        a._calculWorldMatrix(), a;
      }
      addBattleEffectNode(t, n) {
        var e = this.newNode();
        return e.parent = this.root, e.active = true, e.getComponent("EffectBattleNum").initEffect(t, n), 
        e._calculWorldMatrix(), e;
      }
    };
    __decorate([ property(cc.Node) ], PrefabInfo.prototype, "prefab", void 0);
    __decorate([ property(cc.Prefab) ], PrefabInfo.prototype, "prefabAsset", void 0);
    __decorate([ property ], PrefabInfo.prototype, "clazz", void 0);
    __decorate([ property ], PrefabInfo.prototype, "count", void 0);
    __decorate([ property(cc.Node) ], PrefabInfo.prototype, "root", void 0);
    PrefabInfo = __decorate([ ccclass ], PrefabInfo);
    exports.default = PrefabInfo;
    cc._RF.pop();
  }, {} ],
  ProInfoAllWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2bd4dqs2bFONKTrPZs9pkkl", "ProInfoAllWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const s = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    const n = require("./SubwindowManager");
    var u, v, d, l, _, k, E, L;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var W = 0;
    let ProInfoAllWindow = class ProInfoAllWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.attValueContainer = null;
      }
      init() {}
      show() {
        for (var h = 11, u = 14, v = 1e4, d = 100, l = 9e3, _ = 16, k = "num", E = cc.pvz.PlayerData.getFinalPro(), L = 0; L < this.attValueContainer.children.length; L++) if (this.attValueContainer.children[L].name.indexOf("att") >= 0) {
          var N, j;
          if ((N = parseInt(this.attValueContainer.children[L].name.substring(3))) <= 6) {
            j = Tool_1.default.formatNum2(E.final[N]) + (N >= 4 ? "%" : "");
            3 === N && (j += "\u6b21/\u79d2");
            this.attValueContainer.children[L].getChildByName(k).getComponent(cc.Label).string = j;
          } else if (N >= h && N <= u) {
            var G;
            G = E.exInfo[N];
            h === N && (G += v);
            G *= 1 + E.exInfo[N + d] / v;
            12 !== N && u !== N || G > l && (G = l);
            this.attValueContainer.children[L].getChildByName(k).getComponent(cc.Label).string = Tool_1.default.formatNum2(G / d) + "%";
          } else if (20 === N) {
            if (G = 0, cc.player.skillInfo[_] && cc.player.skillInfo[_][0] > 0) for (var W = 0; W < cc.player.skillUsing.length; W++) _ === cc.player.skillUsing[W] && (G += s.Datas.Skill[_].valu[0][cc.player.skillInfo[_][0] - 1]);
            this.attValueContainer.children[L].getChildByName(k).getComponent(cc.Label).string = Tool_1.default.formatNum2(G / d) + "%";
          } else 21 === N && (G = 0, cc.player.skillInfo[_] && cc.player.skillInfo[_][0] > 0 && (G += s.Datas.Skill[_].valu[1][cc.player.skillInfo[_][0] - 1]), 
          this.attValueContainer.children[L].getChildByName(k).getComponent(cc.Label).string = Tool_1.default.formatNum2(G / d) + "%");
        }
      }
      hide() {
        cc.SubwindowManager.hideWindow(n.UIStatus.ProInfoAll);
      }
      start() {}
    };
    __decorate([ property(cc.Node) ], ProInfoAllWindow.prototype, "attValueContainer", void 0);
    ProInfoAllWindow = __decorate([ ccclass ], ProInfoAllWindow);
    exports.default = ProInfoAllWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  PropNode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3dc72emRmhCQ7g2pYb6JRLE", "PropNode");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameComponent_1 = require("./GameComponent");
    var d = "x";
    var t, f, h;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let PropNode = class PropNode extends GameComponent_1.default {
      constructor() {
        super(...arguments);
        this.unlockLv = 0;
        this.lvupJson = null;
        this.priceLabel = null;
        this.valueLabel = null;
        this.valueSuffix = "";
        this.dot = null;
        this.dotNumLabel = null;
        this.nameLabel = null;
        this.dynamicName = false;
        this.btnNode = null;
        this.descRoot = null;
        this.costRoot = null;
      }
      initBy(t, i, c) {
        this.scene = t;
        this.propIndex = i;
        this.costKey = "sliver1";
        cc.is1st && 0 == i && 1 == cc.pvz.runtimeData.level && (this.costKey = "sliver2");
        this.checkToUnlock(c);
      }
      checkToUnlock(t) {
        cc.pvz.runtimeData.propLvs[0] >= this.unlockLv ? (this.updateLv(t), this.onCoinChanged(), 
        this.node.active = true, 0 == cc.pvz.runtimeData.mode || 6 == cc.pvz.runtimeData.mode || 7 == cc.pvz.runtimeData.mode ? (this.btnNode.on(cc.Node.EventType.TOUCH_START, this.onLvupTouchStart, this), 
        this.btnNode.on(cc.Node.EventType.TOUCH_END, this.onLvupTouchEnded, this), this.btnNode.on(cc.Node.EventType.TOUCH_CANCEL, this.onLvupTouchEnded, this)) : (0 == this.propIndex && (this.descRoot[d] = 0), 
        this.costRoot && (this.costRoot.active = false))) : this.node.active = false;
      }
      isMaxLv(t) {
        switch (void 0 === t && (t = 0), this.propIndex) {
         case 1:
         case 2:
         case 6:
          return false;
        }
        return cc.pvz.runtimeData.propLvs[this.propIndex] + t >= this.lvupJson.json.length - 1;
      }
      getJsonCost(t) {
        switch (this.propIndex) {
         case 1:
         case 2:
          return 4 * t * t + 4 * t + 28;

         case 6:
          return 4.5 * t * t + 4.5 * t + 9;

         default:
          return this.lvupJson.json[t - 1][this.costKey];
        }
      }
      getJsonValue() {
        var c = cc.pvz.runtimeData.propLvs[this.propIndex] + 1;
        return this.getJsonValueByLv(this.propIndex, c);
      }
      getJsonValueByLv(t, i) {
        var n = 30;
        switch (t) {
         case 1:
          return i * i - i + n;

         case 2:
          return 5 * i * i - 5 * i + n;

         case 6:
          return i <= this.lvupJson.json.length ? this.lvupJson.json[i - 1].valu : this.lvupJson.json[this.lvupJson.json.length - 1].valu + 100 * (i - this.lvupJson.json.length);

         default:
          return this.lvupJson.json[i - 1].valu;
        }
      }
      updateLv(t) {
        if (this.isMaxLv() && (0 == this.propIndex && (this.descRoot[d] = 0), this.costRoot.active = false), 
        t && (cc.pvz.runtimeData.props[this.propIndex] += this.getJsonValue()), this.dynamicName) {
          var u = cc.pvz.runtimeData.propLvs[this.propIndex], f = this.lvupJson.json[u];
          this.nameLabel.string = f.name;
        }
        var v = cc.pvz.runtimeData.propCostLvs[this.propIndex];
        this.cost = this.getJsonCost(v + 1);
        this.fillCostLabels();
        this.fillValueLabels();
      }
      fillCostLabels() {
        var c = 1e3, s = 1e6;
        if (this.scene.CAN_LVUP) {
          var a = this.cost;
          if (a > c) {
            var r = a > s ? et : "K";
            a /= a > s ? s : c;
            this.priceLabel.string = parseFloat(a.toFixed(2)) + r;
          } else this.priceLabel.string = a;
        }
      }
      fillValueLabels() {
        this.scene && (this.valueLabel.string = this.getValueStr());
      }
      getValueStr() {
        var i = this.scene.getPropValue(this.propIndex);
        return this.formatValue(i);
      }
      formatValue(t) {
        var s = 1e3, h = 1e6, e = 4 == this.propIndex || 5 == this.propIndex || 6 == this.propIndex ? t / 100 : t;
        if (e > s) {
          var o = e > h ? et : "K";
          return e /= e > h ? h : s, parseFloat(e.toFixed(2)) + o + this.valueSuffix;
        }
        var u = 1 == this.propIndex || 2 == this.propIndex ? 0 : 2;
        return parseFloat(e.toFixed(u)) + this.valueSuffix;
      }
      update2(_t, i) {
        this.autoLvup && (this.autoLvupTime += i, this.autoLvupTime >= .12 && this.tryLvup());
      }
      onLvupTouchStart() {
        this.isMaxLv() || this.tryLvup();
      }
      onLvupTouchEnded() {
        this.autoLvup = false;
      }
      tryLvup() {
        if (!this.isMaxLv() && cc.pvz.runtimeData.energy >= this.cost) {
          this.scene.useEnergy(this.cost);
          var o = this.getJsonValue();
          cc.pvz.runtimeData.propLvs[this.propIndex]++;
          cc.pvz.runtimeData.propCostLvs[this.propIndex]++;
          var u = this.getJsonValue() - o;
          cc.pvz.runtimeData.props[this.propIndex] += u;
          2 == this.propIndex && this.scene.addMaxHp(u);
          this.updateLv(false);
          this.scene.onPropLvup(this.propIndex, u);
          this.autoLvup = true;
          this.autoLvupTime = 0;
        }
      }
      onCoinChanged() {
        if (this.scene.CAN_LVUP) {
          var r = cc.pvz.runtimeData.energy >= this.cost;
          if (this.dot.active = r, r) {
            for (var e = cc.pvz.runtimeData.propCostLvs[this.propIndex], o = cc.pvz.runtimeData.energy, u = 0, f = this.cost; o >= f && (o -= f, 
            u++, !this.isMaxLv(u)); ) f = this.getJsonCost(e + u + 1);
            this.dotNumLabel.string = u;
          }
        }
      }
    };
    __decorate([ property ], PropNode.prototype, "unlockLv", void 0);
    __decorate([ property(cc.JsonAsset) ], PropNode.prototype, "lvupJson", void 0);
    __decorate([ property(cc.Label) ], PropNode.prototype, "priceLabel", void 0);
    __decorate([ property(cc.Label) ], PropNode.prototype, "valueLabel", void 0);
    __decorate([ property ], PropNode.prototype, "valueSuffix", void 0);
    __decorate([ property(cc.Node) ], PropNode.prototype, "dot", void 0);
    __decorate([ property(cc.Label) ], PropNode.prototype, "dotNumLabel", void 0);
    __decorate([ property(cc.Label) ], PropNode.prototype, "nameLabel", void 0);
    __decorate([ property ], PropNode.prototype, "dynamicName", void 0);
    __decorate([ property(cc.Node) ], PropNode.prototype, "btnNode", void 0);
    __decorate([ property(cc.Node) ], PropNode.prototype, "descRoot", void 0);
    __decorate([ property(cc.Node) ], PropNode.prototype, "costRoot", void 0);
    PropNode = __decorate([ ccclass ], PropNode);
    exports.default = PropNode;
    cc._RF.pop();
  }, {
    "./GameComponent": "GameComponent"
  } ],
  QRCodeWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "15a3fCRmxhF5bhrarql8qtu", "QRCodeWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MyRequest_1 = require("../main/MyRequest");
    const e = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var wx = 1;
    var a = "prototype";
    var g = 0;
    let QRCodeWindow = class QRCodeWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.codeSpr = null;
      }
      generateQRCode(t) {
        var i, n, a = 200;
        (i = require("./qrcode")(0, "L")).addData(t);
        i.make();
        (n = document.createElement("canvas")).width = a;
        n.height = a;
        for (var l = n.getContext("2d"), _ = a / i.getModuleCount(), p = a / i.getModuleCount(), w = 0; w < i.getModuleCount(); w++) for (var g = 0; g < i.getModuleCount(); g++) {
          var m, S;
          l.fillStyle = i.isDark(w, g) ? "#000000" : "#ffffff";
          m = Math.ceil((g + 1) * _) - Math.floor(g * _);
          S = Math.ceil((w + 1) * p) - Math.floor(w * p);
          l.fillRect(Math.round(g * _), Math.round(w * p), m, S);
        }
        return n;
      }
      init() {}
      show() {
        var c;
        (c = MyRequest_1.default.qrCodeUrl) && c.length > 0 && this.initCode(c);
      }
      initCode(c) {
        var t, i, n, e;
        (t = this, this.canvas) || (e = (n = this.generateQRCode(c)).toDataURL("image/png"), 
        (i = new Image()).src = e, i.onload = function() {
          var c;
          (c = new cc.Texture2D()).initWithElement(i);
          c.handleLoadedTexture();
          t.codeSpr.spriteFrame = new cc.SpriteFrame(c);
        }, this.canvas = n);
      }
      wxPreview(c) {
        window.wx && wx.previewImage({
          showmenu: true,
          current: c,
          urls: [ c ]
        });
      }
      showCode() {
        var c, t;
        window.wx && (c = this, this.canvas ? this.canvas.toTempFilePath({
          success: function(t) {
            var i;
            i = t.tempFilePath;
            c.wxPreview(i);
          }
        }) : (t = this.codeSpr.spriteFrame.getTexture().nativeUrl, c.wxPreview(t)));
      }
      hide() {
        cc.SubwindowManager.hideWindow(e.UIStatus.QRCode);
      }
    };
    __decorate([ property(cc.Sprite) ], QRCodeWindow.prototype, "codeSpr", void 0);
    QRCodeWindow = __decorate([ ccclass ], QRCodeWindow);
    exports.default = QRCodeWindow;
    cc._RF.pop();
  }, {
    "../main/MyRequest": "MyRequest",
    "./SubwindowManager": "SubwindowManager",
    "./qrcode": void 0
  } ],
  RankUserInfo: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f9322ceEoxDkLgv8vNhd37y", "RankUserInfo");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const h = require("./ConfigCtrl");
    const HeroSkin_1 = require("./HeroSkin");
    const e = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    var l, t;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let RankUserInfo = class RankUserInfo extends cc.Component {
      constructor() {
        super(...arguments);
        this.hero = null;
        this.bg = null;
        this.bgSFS = null;
        this.rankIcon = null;
        this.rankStr = null;
        this.rankIconBg = null;
        this.uNameStr = null;
        this.uScoreStr = null;
      }
      init(c, t) {
        var i, l = 1e3;
        if (void 0 === t && (t = {
          uid: 0,
          rank: 1,
          name: "",
          score: 0,
          exInfo1: "",
          exInfo2: "",
          isMe: 0
        }), this.info = t, this.bg && (this.bg.spriteFrame = this.bgSFS[t.isMe ? 1 : 0]), 
        this.rankIcon && (this.rankIcon.spriteFrame = this.rankIconBg[Math.min(t.rank, 4) - 1], 
        this.rankStr.string = "" + (t.rank > 100 ? "100+" : t.rank)), this.uNameStr.string = t.name, 
        1 === c) {
          i = Math.floor(t.score / l);
          0 === t.score % l && i > 1 && h.Datas.LevelInfo[i - 1] && (i--, h.Datas.LevelInfo[i].wave);
          this.uScoreStr.string = Math.floor(t.score / l) + "\u5173" + t.score % l + "\u6ce2";
        } else if (3 === c) {
          var T;
          T = 2e3 + t.score;
          h.Datas.EquipStage[T] || (T = 2001);
          this.uScoreStr.string = "" + h.Datas.EquipStage[T].name;
        } else this.uScoreStr.string = "" + Tool_1.default.formatNum2(t.score);
        if (this.hero) {
          var A;
          A = 0;
          try {
            (A = JSON.parse(t.exInfo1)[18]) || (A = 0);
          } catch (_c) {}
          this.hero.getComponent(HeroSkin_1.default).setSkinTo(A);
        }
      }
      showUserInfo() {
        this.info.isMe || cc.SubwindowManager.showWindow(e.UIStatus.RankUser, {
          info: this.info
        });
      }
      start() {}
    };
    __decorate([ property(cc.Node) ], RankUserInfo.prototype, "hero", void 0);
    __decorate([ property(cc.Sprite) ], RankUserInfo.prototype, "bg", void 0);
    __decorate([ property(cc.SpriteFrame) ], RankUserInfo.prototype, "bgSFS", void 0);
    __decorate([ property(cc.Sprite) ], RankUserInfo.prototype, "rankIcon", void 0);
    __decorate([ property(cc.Label) ], RankUserInfo.prototype, "rankStr", void 0);
    __decorate([ property(cc.SpriteFrame) ], RankUserInfo.prototype, "rankIconBg", void 0);
    __decorate([ property(cc.Label) ], RankUserInfo.prototype, "uNameStr", void 0);
    __decorate([ property(cc.Label) ], RankUserInfo.prototype, "uScoreStr", void 0);
    RankUserInfo = __decorate([ ccclass ], RankUserInfo);
    exports.default = RankUserInfo;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./HeroSkin": "HeroSkin",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  RankUserWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "38294WReYZCZJopU5qAAA8M", "RankUserWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MyRequest_1 = require("../main/MyRequest");
    const NetworkManager_1 = require("../main/NetworkManager");
    const HeroSkin_1 = require("./HeroSkin");
    const SkillCard_1 = require("./SkillCard");
    const TowerSetCard_1 = require("./TowerSetCard");
    const WeaponCard_1 = require("./WeaponCard");
    const Tool_1 = require("./Tool");
    const l = require("./SubwindowManager");
    var v;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var Ci = "}\n{\u5173\u5361/\u6218\u529b}:";
    var Mi = "\n{\u91d1\u5e01:";
    var Pi = "}\n{\u94bb\u77f3(\u73b0\u5b58/\u6d88\u8017):";
    var xi = "}\n{\u57fa\u7840\u5c5e\u6027\u7b49\u7ea7:";
    var Di = "}\n{\u5e7f\u544a\u6b21\u6570/\u5e7f\u544a\u5238/\u5e7f\u544a\u5238\u6d88\u8017:";
    var Bi = "\n{\u89d2\u8272\u5df2\u521b\u5efa:";
    var Ai = "===\u53ef\u80fd\u7684\u4f5c\u5f0a\u8bb0\u5f55===\n";
    var Ei = "===================\n";
    var x = 0;
    let RankUserWindow = class RankUserWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.hero = null;
        this.nameStr = null;
        this.skillPre = null;
        this.weaponPre = null;
        this.towerSetPre = null;
        this.skillContainer = null;
        this.weaponContainer = null;
        this.towerSetContainer = null;
        this.noStr = null;
        this.suNode = null;
        this.suUserInfo = null;
      }
      init() {}
      show(c) {
        void 0 === c && (c = {
          info: {
            uid: 0,
            name: "",
            exInfo1: "",
            exInfo2: ""
          }
        });
        this.uid = c.info.uid;
        this.nameStr.string = c.info.name;
        this.suUserInfo.string = "";
        this.exInfo1 = [];
        this.exInfo2 = [];
        try {
          this.exInfo1 = JSON.parse(c.info.exInfo1);
          this.exInfo2 = JSON.parse(c.info.exInfo2);
          this.refreshExInfo();
        } catch (_c) {
          this.exInfo1 = [];
          this.exInfo2 = [];
          this.refreshExInfo();
        }
      }
      refreshExInfo() {
        var c, t, i, v = 18;
        this.skillContainer.children.map(function(c) {
          return c.active = false;
        });
        this.weaponContainer.children.map(function(c) {
          return c.active = false;
        });
        this.towerSetContainer.children.map(function(c) {
          return c.active = false;
        });
        for (var y = 0, T = 0; T < 10; T += 2) {
          var A, O, E;
          if (A = this.exInfo1[T], O = this.exInfo1[T + 1], A > 0 && O > 0) {
            y++;
            (E = Tool_1.default.getPrefab(this.skillContainer, this.skillPre, "skill" + T / 2).getComponent(SkillCard_1.default)).node.scale = .4;
            E.initAsInRankuser(A, O);
          }
        }
        for (this.noStr[0].active = 0 === y, i = 0, T = 0; T < 15; T += 3) {
          var L, N, j, G;
          if (L = this.exInfo2[T], N = this.exInfo2[T + 1], j = this.exInfo2[T + 2], L > 0) {
            (G = Tool_1.default.getPrefab(this.weaponContainer, this.weaponPre, "weapon" + T / 3).getComponent(WeaponCard_1.default)).node.scale = .4;
            i++;
            G.initAsInRankuser(L, N, j);
          }
        }
        for (this.noStr[1].active = 0 === i, t = 0, T = 10; T < v; T++) {
          var W, F;
          F = T - 9;
          (W = this.exInfo1[T]) > 0 && (t++, Tool_1.default.getPrefab(this.towerSetContainer, this.towerSetPre, "tower" + (T - 9)).getComponent(TowerSetCard_1.default).init(F, W));
        }
        this.noStr[2].active = 0 === t;
        (c = this.exInfo1[v]) || (c = 0);
        this.hero.getComponent(HeroSkin_1.default).setSkinTo(c);
      }
      setCheat() {
        NetworkManager_1.default.setCheat(this.uid, 1, function() {
          cc.popupManager.showToast("\u5df2\u6807\u8bb0");
        });
      }
      getUserExInfo() {
        var c;
        c = this;
        NetworkManager_1.default.userInfoEx(this.uid, function(t) {
          var f = 86400, d = 202, l = 497;
          if (t) {
            var k, C, M, P;
            if (k = Date.now() / 1e3 - t.createTime, C = Math.floor(k / f), M = Math.floor((k - f * C) / 3600), 
            P = "{UID:" + c.uid + Ci + t.score1 + " " + t.score2 + Mi + Math.floor((t.items[2] - 3) / 4) + Pi + Math.floor((t.items[3] - 3) / 4) + "/" + t.archieveProg[311] + xi + JSON.stringify(t.baseProLv) + Di + (t.archieveProg[d] ? t.archieveProg[d] : 0) + "/" + t.ticketNum + "}/" + (t.items[l] ? t.items[l] : 0) + Bi + (0 === t.createTime ? "\u672a\u8bb0\u5f55" : C + "\u5929" + M + "\u5c0f\u65f6") + "}\n", 
            t.cheatRecord.length > 0) {
              P += Ai;
              for (var x = 0; x < t.cheatRecord.length; x++) {
                var D;
                P += (D = t.cheatRecord[x]).item + " " + D.realv + " -> " + D.memv + "\n";
              }
              P += Ei;
            }
            c.suUserInfo.string = P;
          } else c.suUserInfo.string = "\u83b7\u53d6\u7528\u6237\u5b58\u6863\u5931\u8d25";
        });
      }
      forceRefreshUserInfo() {
        NetworkManager_1.default.sudoUpdateUserCache(this.uid, function() {
          cc.popupManager.showToast(Li);
        });
      }
      hide() {
        cc.SubwindowManager.hideWindow(l.UIStatus.RankUser);
      }
      start() {
        this.suNode.map(function(c) {
          return c.active = MyRequest_1.default.userInfo.access >= 95;
        });
      }
    };
    __decorate([ property(cc.Node) ], RankUserWindow.prototype, "hero", void 0);
    __decorate([ property(cc.Label) ], RankUserWindow.prototype, "nameStr", void 0);
    __decorate([ property(cc.Prefab) ], RankUserWindow.prototype, "skillPre", void 0);
    __decorate([ property(cc.Prefab) ], RankUserWindow.prototype, "weaponPre", void 0);
    __decorate([ property(cc.Prefab) ], RankUserWindow.prototype, "towerSetPre", void 0);
    __decorate([ property(cc.Node) ], RankUserWindow.prototype, "skillContainer", void 0);
    __decorate([ property(cc.Node) ], RankUserWindow.prototype, "weaponContainer", void 0);
    __decorate([ property(cc.Node) ], RankUserWindow.prototype, "towerSetContainer", void 0);
    __decorate([ property(cc.Node) ], RankUserWindow.prototype, "noStr", void 0);
    __decorate([ property(cc.Node) ], RankUserWindow.prototype, "suNode", void 0);
    __decorate([ property(cc.Label) ], RankUserWindow.prototype, "suUserInfo", void 0);
    RankUserWindow = __decorate([ ccclass ], RankUserWindow);
    exports.default = RankUserWindow;
    cc._RF.pop();
  }, {
    "../main/MyRequest": "MyRequest",
    "../main/NetworkManager": "NetworkManager",
    "./HeroSkin": "HeroSkin",
    "./SkillCard": "SkillCard",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool",
    "./TowerSetCard": "TowerSetCard",
    "./WeaponCard": "WeaponCard"
  } ],
  RanklistWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "878c5MInUtCwYa1Sg3/ofx0", "RanklistWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MyRequest_1 = require("../main/MyRequest");
    const NetworkManager_1 = require("../main/NetworkManager");
    const DynamicScrollView_1 = require("./DynamicScrollView");
    const RankUserInfo_1 = require("./RankUserInfo");
    const e = require("./Tool");
    const u = require("./SubwindowManager");
    var f;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var _ = "ConfigCtrl";
    var S = "./SubwindowManager";
    var t = "MainSV";
    var p = 0;
    var i = "map";
    var i = "MainSV";
    let RanklistWindow = class RanklistWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.btns = null;
        this.rankTitle = null;
        this.rankType = null;
        this.MainSV = null;
        this.rankUserPre = null;
        this.rankContainer = null;
        this.myRank = null;
        this.topUsers = null;
        this.suNode = null;
        this.suSector = null;
      }
      init() {
        var c;
        c = this;
        this.MainSV.node.getComponent(DynamicScrollView_1.default).cb = function() {
          c.getRankList(c.type, c["rankList" + c.type].length, function() {
            c.MainSV.node.getComponent(DynamicScrollView_1.default).state = 0;
          });
        };
      }
      changeRankType(c, t) {
        var i, n, p = "\u6392\u884c\u699c";
        i = this;
        n = parseInt(t);
        this.type = n;
        this.type < 3 && (this.btns[0].active = 1 === n, this.btns[1].active = 2 === n);
        this.rankType.string = [ "\u6ce2\u6b21", "\u6218\u529b", "\u63a2\u5b9d" ][n - 1];
        this.rankTitle.string = [ p, p, "\u63a2\u5b9d\u6392\u884c" ][n - 1];
        this.rankContainer.children.map(function(c) {
          return c.active = false;
        });
        2 === this.type && 0 === this.rankList2.length ? this.getRankList(2, 0, function() {
          i.refreshTop();
          i.refreshRanklist(0);
          i.refreshMeInfo();
          i.MainSV.stopAutoScroll();
          i.MainSV.scrollToTop();
        }) : (this.refreshTop(), this.refreshRanklist(0), this.refreshMeInfo(), this.MainSV.stopAutoScroll(), 
        this.MainSV.scrollToTop());
      }
      fetchRanklistData(c, t, i) {
        var e;
        e = this;
        0 === this.sectorId ? NetworkManager_1.default.ranklistInfo(c, t, function(c) {
          i(c);
        }, function() {
          e.MainSV.node.getComponent(DynamicScrollView_1.default).state = 0;
        }) : NetworkManager_1.default.sudoRanklistInfo(c, this.sectorId, t, function(c) {
          i(c);
        }, function() {
          e.MainSV.node.getComponent(DynamicScrollView_1.default).state = 0;
        });
      }
      getRankList(c, t, i) {
        var n, a = 1e7, u = "rankList";
        if (n = this, this[u + this.type].length >= this.rankMaxUserCount[c - 1]) i && i(); else if (window.wx) this.fetchRanklistData(c, t, function(e) {
          var a = "rankList";
          if (0 === e.length) return n.rankMaxUserCount[c - 1] = n[a + n.type].length, void (i && i());
          for (var p = 0; p < e.length; p++) n[a + c][t + p] = {
            uid: e[p].uInfo.uid,
            name: e[p].uInfo.name,
            score: e[p].uInfo.score[c - 1],
            exInfo1: e[p].uInfo.exInfo1,
            exInfo2: e[p].uInfo.exInfo2
          };
          n.refreshRanklist(t);
          i && i();
        }); else {
          if (this[u + c][t]) return void (i && i());
          for (v < t + 20; v++; ) this[u + c].push({
            uid: a + v,
            name: "\u73a9\u5bb6" + (a + v),
            score: 10001,
            exInfo1: "[1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 1, 2, 3, 4, 5, 6, 7, 8]",
            exInfo2: "[1, 2, 3, 12, 3, 4, 3, 4, 5, 4, 5, 6, 5, 6, 7]"
          });
          this.refreshRanklist(t);
          i();
        }
      }
      refreshRanklist(_c) {
        for (var s = "rankList"; _ < this[s + this.type].length; _++) {
          var p;
          p = this[s + this.type][_];
          e.getPrefab(this.rankContainer, this.rankUserPre, "rank" + _).getComponent(RankUserInfo_1.default).init(this.type, {
            uid: p.uid,
            rank: _ + 1,
            name: p.name,
            score: p.score,
            isMe: 0,
            exInfo1: p.exInfo1,
            exInfo2: p.exInfo2
          });
        }
      }
      refreshTop() {
        for (var s = "rankList", l = 0; l < this.topUsers.length; l++) this[s + this.type][l] ? (this.topUsers[l].active = true, 
        this.topUsers[l].getComponent(RankUserInfo_1.default).init(this.type, {
          uid: this[s + this.type][l].uid,
          rank: l + 1,
          name: this[s + this.type][l].name,
          score: this[s + this.type][l].score,
          isMe: 0,
          exInfo1: this[s + this.type][l].exInfo1,
          exInfo2: this[s + this.type][l].exInfo2
        })) : this.topUsers[l].active = false;
      }
      refreshMeInfo() {
        var c;
        c = this;
        window.wx ? NetworkManager_1.default.myRanklist(this.type, function(t) {
          e.getPrefab(c.myRank, c.rankUserPre, "me").getComponent(RankUserInfo_1.default).init(c.type, {
            uid: MyRequest_1.default.userInfo.uid,
            rank: t.rank + 1,
            name: MyRequest_1.default.userInfo.nick,
            score: c["myScore" + c.type],
            isMe: 1,
            exInfo1: "",
            exInfo2: ""
          });
        }) : e.getPrefab(this.myRank, this.rankUserPre, "me").getComponent(RankUserInfo_1.default).init(this.type, {
          uid: MyRequest_1.default.userInfo.uid,
          rank: 101,
          name: MyRequest_1.default.userInfo.nick,
          score: this["myScore" + this.type],
          isMe: 1,
          exInfo1: "",
          exInfo2: ""
        });
      }
      prepare() {
        this.topUsers.map(function(c) {
          return c.active = false;
        });
        this.rankContainer.children.map(function(c) {
          return c.active = false;
        });
      }
      show(c) {
        var t, f = 100;
        t = this;
        void 0 === c && (c = {
          type: 0
        });
        this.rankMaxUserCount = [ f, f, f ];
        this.rankList1 = [];
        this.rankList2 = [];
        this.rankList3 = [];
        this.prepare();
        this.myScore1 = 1e3 * cc.player.levelProg[0] + cc.player.levelProg[1];
        this.myScore2 = cc.pvz.PlayerData.getFinalPro().bp;
        this.myScore3 = cc.player.equips.stageProg;
        this.btns[0].parent.active = true;
        this.btns[1].parent.active = true;
        c.type > 0 ? (this.type = c.type, this.btns[0].parent.active = false, this.btns[1].parent.active = false, 
        this.rankType.string = "\u79d8\u5883") : (this.type = 1, this.btns[0].active = true, 
        this.btns[1].active = false, this.rankType.string = "\u6ce2\u6b21");
        this.type >= 3 ? window.wx ? NetworkManager_1.default.updateScore(3, this.myScore3, this.myScore1 !== S.lastScore3, function() {
          S.lastScore3 = t.myScore3;
          t.changeRankType(null, "3");
          t.getRankList(3, 0, function() {
            t.refreshRanklist(0);
            t.refreshTop();
          });
        }) : (this.changeRankType(null, "3"), this.getRankList(3, 0, function() {}), this.refreshTop(), 
        this.refreshMeInfo()) : window.wx ? NetworkManager_1.default.updateScore(1, this.myScore1, this.myScore1 !== S.lastScore1, function() {
          S.lastScore1 = t.myScore1;
          NetworkManager_1.default.updateScore(2, t.myScore2, t.myScore2 !== S.lastScore2, function() {
            S.lastScore2 = t.myScore2;
            t.changeRankType(null, "1");
            t.getRankList(1, 0, function() {
              t.refreshRanklist(0);
              t.refreshTop();
            });
          });
        }) : (this.changeRankType(null, "1"), this.getRankList(1, 0, function() {}), this.getRankList(2, 0, function() {}), 
        this.refreshTop(), this.refreshMeInfo());
      }
      changeSector(_c, t) {
        var i;
        i = parseInt(t);
        this.sectorId += i;
        this.sectorId < 0 && (this.sectorId = 0);
        this.suSector.string = "" + this.sectorId;
      }
      showSelectSectorRanklist() {
        var c;
        c = this;
        this.getRankList(this.type, 0, function() {
          c.rankContainer.children.map(function(c) {
            return c.active = false;
          });
          c.refreshTop();
          c.refreshRanklist(0);
          c.MainSV.stopAutoScroll();
          c.MainSV.scrollToTop();
        });
      }
      hide() {
        this.rankList1 = [];
        this.rankList2 = [];
        cc.SubwindowManager.hideWindow(u.UIStatus.Ranklist);
      }
      start() {
        this.suNode.map(function(c) {
          return c.active = MyRequest_1.default.userInfo.access >= 95;
        });
      }
    };
    __decorate([ property(cc.Node) ], RanklistWindow.prototype, "btns", void 0);
    __decorate([ property(cc.Label) ], RanklistWindow.prototype, "rankTitle", void 0);
    __decorate([ property(cc.Label) ], RanklistWindow.prototype, "rankType", void 0);
    __decorate([ property(cc.ScrollView) ], RanklistWindow.prototype, "MainSV", void 0);
    __decorate([ property(cc.Prefab) ], RanklistWindow.prototype, "rankUserPre", void 0);
    __decorate([ property(cc.Node) ], RanklistWindow.prototype, "rankContainer", void 0);
    __decorate([ property(cc.Node) ], RanklistWindow.prototype, "myRank", void 0);
    __decorate([ property(cc.Node) ], RanklistWindow.prototype, "topUsers", void 0);
    __decorate([ property(cc.Node) ], RanklistWindow.prototype, "suNode", void 0);
    __decorate([ property(cc.Label) ], RanklistWindow.prototype, "suSector", void 0);
    RanklistWindow = __decorate([ ccclass ], RanklistWindow);
    exports.default = RanklistWindow;
    cc._RF.pop();
  }, {
    "../main/MyRequest": "MyRequest",
    "../main/NetworkManager": "NetworkManager",
    "./DynamicScrollView": "DynamicScrollView",
    "./RankUserInfo": "RankUserInfo",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  RedPointManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3b1c1p2G5tOrog3zkm0eYSR", "RedPointManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const s = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    var n;
    var n = function() {
      let v;
      return v = function() {}, v.reset = function() {
        this.handles = {};
        this.parRec = {};
        this.rpStates = {};
      }, v.init = function() {
        var e = "TaskBtn", s = "Page4", o = "Weapon";
        this.setParRec("DailyTask", e);
        this.setParRec("ArchieveTask", e);
        this.setParRec("PlayerProLvUp", s);
        this.setParRec(o, s);
        this.setParRec("EquipLvUp", s);
        this.setParRec("WeaponStarUp", o);
        this.setParRec("WeaponGet", o);
      }, v.setParRec = function(c, t) {
        this.parRec[c] || (this.parRec[c] = {
          par: {},
          child: {}
        });
        this.parRec[c].par[t] = 1;
        this.parRec[t] || (this.parRec[t] = {
          par: {},
          child: {}
        });
        this.parRec[t].child[c] = 1;
      }, v.addInfo = function(c, t) {
        var i;
        void 0 === t && (t = [ "" ]);
        i = t[t.length - 1];
        this.handles[i] || (this.handles[i] = [], this.rpStates[i] = false);
        this.handles[i].push(c);
        for (var o = t.length - 1; o >= 1; o--) this.setParRec(t[o], t[o - 1]);
      }, v.rpOn = function(c) {
        if (void 0 === c && (c = ""), this.rpStates[c] = true, this.handles[c] && this.handles[c].map(function(c) {
          return c.active = true;
        }), this.parRec[c]) for (var s in this.parRec[c].par) this.rpOn(s);
      }, v.rpOff = function(c) {
        if (void 0 === c && (c = ""), this.rpStates[c] = false, this.handles[c] && this.handles[c].map(function(c) {
          return c.active = false;
        }), this.parRec[c]) for (var r in this.parRec[c].par) {
          var h;
          for (var a in h = true, this.parRec[r].child) if (this.rpStates[a]) {
            h = false;
            break;
          }
          h && this.rpOff(r);
        }
      }, v.check = function(c, t) {
        void 0 === c && (c = "");
        void 0 === t && (t = {});
        this.checker[c](t) ? this.rpOn(c) : this.rpOff(c);
      }, v.justCheck = function(c, t) {
        return void 0 === c && (c = ""), void 0 === t && (t = {}), this.checker[c](t);
      }, v.checkSingleNode = function(c, t) {
        var i;
        void 0 === t && (t = {});
        i = this.checker[c.name](t);
        c.node.active = !!i;
      }, v.handles = {}, v.parRec = {}, v.rpStates = {}, v.checker = {
        Page1: function(c) {
          if (void 0 === c && (c = {}), cc.MainUI.checkFuncUnlock(17, false)) {
            for (var o = 1; o <= 2; o++) for (var r = 0; r < 4; r++) {
              var h;
              if (h = cc.pvz.PlayerData.getTowerLvUpCost(o, r, cc.player.towerInfo["t" + o][r]), 
              cc.pvz.PlayerData.itemNum(h[1]) >= h[2]) return true;
            }
            return false;
          }
        },
        Page3: function(c) {
          void 0 === c && (c = {});
        },
        Page4: function(c) {
          return void 0 === c && (c = {}), v.checker.PlayerProLvUp({}) || v.checker.WeaponGet({}) || v.checker.WeaponStarUp({}) || v.checker.EquipLvUp({});
        },
        FreeStamina: function(c) {
          var t;
          if ((void 0 === c && (c = {}), 1e3 * cc.player.levelProg[0] + cc.player.levelProg[1] >= 12450) && (t = Tool_1.default.canGetFreeStamina()) % 10 == 1 && 0 === cc.player.freeAdGet[Math.floor(t / 10) - 1]) return true;
          return false;
        },
        Shop: function(c) {
          return void 0 === c && (c = {}), false;
        },
        GameClub: function(c) {
          if (void 0 === c && (c = {}), !cc.player.gameClubEnter) return true;
          for (var s = 0; s < cc.player.gameClub.prog.length; s++) if (cc.player.gameClub.prog[s] >= [ 2, 1, 1, 1 ][s] && 0 === cc.player.gameClub.bonusGet[s]) return true;
          return false;
        },
        Mail: function(c) {
          for (var o in void 0 === c && (c = {}), s.Datas.Mail) if (s.Datas.Mail[o].show && 2 !== cc.player.mailGetInfo[parseInt(o)]) return true;
          return false;
        },
        ExGame1: function(c) {
          return void 0 === c && (c = {}), false;
        },
        ExGame2: function(c) {
          return void 0 === c && (c = {}), false;
        },
        SlotGame: function(c) {
          return void 0 === c && (c = {}), !!cc.MainUI.checkFuncUnlock(12, false) && cc.pvz.PlayerData.getSlotGameDrawTimes(0) >= 1;
        },
        Sign: function(c) {
          return void 0 === c && (c = {}), 0 === cc.player.signInfo.sign;
        },
        GrowUpRoad: function(c) {
          var t, n = 1e3;
          for (var u in void 0 === c && (c = {}), t = n * cc.player.levelProg[0] + cc.player.levelProg[1], 
          s.Datas.GrowRoad) {
            if (!(t >= n * s.Datas.GrowRoad[u].lv + s.Datas.GrowRoad[u].wave)) break;
            if (!cc.player.growUpUnlock[u]) return true;
          }
          return false;
        },
        TaskBtn: function(c) {
          return void 0 === c && (c = {}), v.checker.DailyTask({}) || v.checker.ArchieveTask({});
        },
        DailyTask: function(c) {
          for (var u in void 0 === c && (c = {}), s.Datas.TaskDaily) {
            var v;
            if (v = s.Datas.TaskDaily[u], !cc.player.dailyInfo.get[parseInt(u) - 1] && cc.player.dailyInfo.prog[v.kind] >= v.need) return true;
          }
          return false;
        },
        ArchieveTask: function(c) {
          var t;
          for (var a in void 0 === c && (c = {}), t = {}, c.id ? t[c.id] = 1 : t = cc.player.archieveProg, 
          t) {
            var u;
            if ((u = s.Datas.TaskArchieve[1e3 * parseInt(a) + (cc.player.archieveGet[a] ? cc.player.archieveGet[a] : 0) + 1]) && cc.player.archieveProg[a] >= u.need) return true;
          }
          return false;
        },
        MainMissionTask: function(c) {
          void 0 === c && (c = {});
        },
        PlayerProLvUp: function(c) {
          void 0 === c && (c = {});
          for (var r = 0; r < cc.player.baseProLv.length; r++) {
            var h;
            if (h = cc.pvz.PlayerData.getPlayerLvUpCost(r, cc.player.baseProLv[r]), r >= 3 && r <= 4) {
              if (cc.player.baseProLv[0] < 4) continue;
            } else if (r >= 5 && r <= 6 && cc.player.baseProLv[0] < 11) continue;
            if (cc.pvz.PlayerData.itemNum(h[1]) >= h[2]) return true;
          }
          return false;
        },
        Weapon: function(c) {
          return void 0 === c && (c = {}), v.checker.WeaponGet(c) || v.checker.WeaponStarUp(c);
        },
        WeaponGet: function(c) {
          var s = 1e3;
          return void 0 === c && (c = {}), !!cc.MainUI.checkFuncUnlock(22, false) && !!Tool_1.default.canGetWeapon() && (cc.player.weaponGetLastTime[1] < Tool_1.default.today() / s || Math.floor(3600 - (Date.now() / s - cc.player.weaponGetLastTime[0])) <= 0);
        },
        WeaponStarUp: function(c) {
          if (void 0 === c && (c = {}), !cc.MainUI.checkFuncUnlock(22, false)) return false;
          for (var r in cc.player.weaponInfo) {
            var h, a;
            if (h = parseInt(r), (a = s.Datas.WeaponStar[100 * h + cc.player.weaponInfo[r][1] + 1]) && 0 !== a.exp && cc.player.weaponInfo[r][2] >= a.exp) return true;
          }
          return false;
        },
        EquipLvUp: function(c) {
          if (void 0 === c && (c = {}), !cc.MainUI.checkFuncUnlock(38, false)) return false;
          for (var a = cc.pvz.PlayerData.itemNum(41), u = 0; u < 6; u++) {
            var v;
            if (v = cc.player.equips.lv[u], s.Datas.EquipLv[v + 1] && a >= s.Datas.EquipLv[v].need) return true;
          }
          return false;
        },
        Page5: function(c) {
          if (void 0 === c && (c = {}), !cc.MainUI.checkFuncUnlock(6, false)) return false;
          for (var s in cc.player.metaStageInfo) if (Tool_1.default.isDungeonOn(parseInt(s)) && cc.player.metaStageInfo[s][1] >= 1) return true;
          return false;
        }
      }, v.lastLevelProg = 0, v.adBuffHintShow = 0, v;
    }();
    exports.default = n;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./Tool": "Tool"
  } ],
  RedPoint: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "934d20b8TlK44ZBf2N5TNCt", "RedPoint");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const RedPointManager_1 = require("./RedPointManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var t = "name";
    let RedPoint = class RedPoint extends cc.Component {
      constructor() {
        super(...arguments);
        this.path = null;
      }
      onLoad() {
        var c;
        c = this.path.split("/");
        this.name = c[c.length - 1];
        RedPointManager_1.default.addInfo(this.node, c);
      }
      start() {
        console.log("will check", this.name);
        RedPointManager_1.default.check(this.name, {});
      }
    };
    __decorate([ property ], RedPoint.prototype, "path", void 0);
    RedPoint = __decorate([ ccclass ], RedPoint);
    exports.default = RedPoint;
    cc._RF.pop();
  }, {
    "./RedPointManager": "RedPointManager"
  } ],
  RemoveWhenComplete: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dace2p4R3RLfYgcmFlF+SSd", "RemoveWhenComplete");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let RemoveWhenComplete = class RemoveWhenComplete extends cc.Component {
      constructor() {
        super(...arguments);
        this.spine = null;
        this.fixedScale = true;
      }
      onLoad() {
        var n = this;
        this.spine.setCompleteListener(function() {
          n.node.emit("ended");
          n.node.parent = null;
        });
      }
    };
    __decorate([ property(sp.Skeleton) ], RemoveWhenComplete.prototype, "spine", void 0);
    __decorate([ property ], RemoveWhenComplete.prototype, "fixedScale", void 0);
    RemoveWhenComplete = __decorate([ ccclass ], RemoveWhenComplete);
    exports.default = RemoveWhenComplete;
    cc._RF.pop();
  }, {} ],
  RuntimeData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0885+oCPJBKa6AE7raczBC", "RuntimeData");
    var a;
    var m = {
      mode: 0,
      level: 1,
      wave: 0,
      coinRate: 1,
      name: "",
      rebornCount: 1,
      coinRateF: 0,
      guide: -1,
      energy: 0,
      coin: 0,
      diamond: 0,
      propLvs: [],
      props: [],
      propCostLvs: [],
      skills: [ {
        id: 1,
        lv: 1,
        exp: 0,
        args: [ 0, 0, 0, 0 ],
        icon: null,
        json: {}
      } ],
      towers: [ {
        id: 0,
        lv: 1,
        t: null
      } ],
      towerCoin: [ 0, 0 ],
      timeScaleLevel: 0,
      skin10Reborn: 0,
      bookCount: 0,
      ktSpeed: 1,
      ktCoinRate: 1,
      mode6Sta: 0,
      rBuffs: [ 0, 0 ],
      tzIds: [],
      init: function(t, n, r) {
        this.removeData();
        this.mode = t;
        this.level = n;
        this.coinRate = r;
        this.wave = 0;
        this.mode6Sta = 0;
        this.energy = 0;
        this.coin = 0;
        this.diamond = 0;
        this.coinRateF = 0;
        this.rebornCount = 1;
        this.skin10Reborn = 0;
        this.ktSpeed = 1;
        this.ktCoinRate = 1;
        this.bookCount = 0;
        this.propLvs = null;
        this.props = null;
        this.propCostLvs = new Array(7).fill(0);
        this.skills = null;
        this.tzIds.length = 0;
        this.rBuffs.length = 0;
        cc.pvz.TAUtils.trackLevel(t, n);
      },
      hasPreGame: function() {
        delete this.preData;
        var r = cc.sys.localStorage.getItem("80day-rt1");
        return !!r && (this.preData = JSON.parse(r), true);
      },
      saveData: function() {
        delete this.preData;
        var o = [], a = [];
        this.skills.forEach(function(t, n) {
          o[n] = {
            icon: t.icon,
            json: t.json
          };
          delete t.icon;
          delete t.json;
        });
        this.towers.forEach(function(t, n) {
          t && (a[n] = {
            t: t.t
          }, delete t.t);
        });
        cc.sys.localStorage.setItem("80day-rt1", JSON.stringify(this));
        this.skills.forEach(function(t, n) {
          t.icon = o[n].icon;
          t.json = o[n].json;
        });
        this.towers.forEach(function(t, n) {
          t && (t.t = a[n].t);
        });
      },
      removeData: function() {
        cc.sys.localStorage.removeItem("80day-rt1");
        delete this.preData;
      },
      initByPreData: function() {
        var r = this;
        Object.keys(this.preData).forEach(function(t) {
          r[t] = r.preData[t];
        });
      }
    };
    cc.pvz || (cc.pvz = {});
    cc.pvz.runtimeData = m;
    module.exports.exports = m;
    module.exports.default = module.exports;
    cc._RF.pop();
  }, {} ],
  SetWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0be367TO/xBprjdOTK8piR7", "SetWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MyRequest_1 = require("../main/MyRequest");
    const NetworkManager_1 = require("../main/NetworkManager");
    const r = require("./ConfigCtrl");
    const u = require("./SubwindowManager");
    var l, e, o;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var C = 1;
    let SetWindow = class SetWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.switches = null;
        this.infoStrs = null;
        this.cheatBtn = null;
        this.equipQEBox = null;
      }
      init() {
        this.cheatBtn.map(function(c) {
          c.active = MyRequest_1.default.userInfo.access >= 90;
        });
      }
      show() {
        this.state = 0;
        this.infoStrs[0].string = "UID:" + MyRequest_1.default.userInfo.uid;
        this.infoStrs[1].string = "v" + cc.pvz.GameConst.GAME_VERSION;
        this.refresh();
      }
      refresh() {
        this.switches[1].active = cc.player.isMusicMute;
        this.switches[3].active = cc.player.isSoundMute;
        this.switches[5].active = cc.player.noHurtNum;
        this.switches[7].active = cc.player.noHitEff;
      }
      hide() {
        this.state && cc.pvz.PlayerData.saveData();
        cc.SubwindowManager.hideWindow(u.UIStatus.Set);
      }
      getAddItem(_c, t) {
        var i, e, s, o, l = 1e3;
        if ((i = t.split("_"), e = parseInt(i[0]), s = parseInt(i[1]), 4e6 === e && (cc.player.equips.stageProg++, 
        r.Datas.EquipStage[2001 + cc.player.equips.stageProg] || cc.player.equips.stageProg--), 
        3e6 === e) && (o = parseInt(this.equipQEBox.string)) > 0) {
          for (var C = 1; C < 10; C++) r.Datas.Equip[l * o + C] && cc.pvz.PlayerData.getRewardBonus(4, l * o + C, 1);
          cc.popupManager.showToast("\u5df2\u83b7\u53d6\u5957\u88c5" + o);
        }
        2e6 !== e ? (1e6 === e ? r.Datas.LevelInfo[cc.player.levelProg[0] + 1] && cc.player.levelProg[0]++ : cc.pvz.PlayerData.getRewardBonus(1, e, s), 
        cc.pvz.PlayerData.saveData()) : NetworkManager_1.default.clearData(function() {
          cc.pvz.PlayerData.clearData();
          cc.popupManager.showToast("\u5b58\u6863\u5df2\u5220\u9664\uff0c\u9700\u7acb\u5373\u91cd\u542f");
        });
      }
      showBonusCode() {
        cc.SubwindowManager.showWindow(u.UIStatus.CDKey, {});
      }
      showClearData() {
        cc.player.levelProg[0] < 11 ? cc.popupManager.showToast(r.Datas.Tips[21].v) : cc.SubwindowManager.showWindow(u.UIStatus.ClearData, {});
      }
      onMusicClick() {
        this.state = 1;
        cc.butler.setMusicSwitch(!cc.player.isMusicMute);
        this.refresh();
      }
      onSeClick() {
        this.state = 1;
        cc.butler.setSoundSwitch(!cc.player.isSoundMute);
        this.refresh();
      }
      onNumClick() {
        this.state = 1;
        cc.player.noHurtNum = cc.player.noHurtNum ? 0 : 1;
        this.refresh();
      }
      onEffClick() {
        this.state = 1;
        cc.player.noHitEff = cc.player.noHitEff ? 0 : 1;
        this.refresh();
      }
    };
    __decorate([ property(cc.Node) ], SetWindow.prototype, "switches", void 0);
    __decorate([ property(cc.Label) ], SetWindow.prototype, "infoStrs", void 0);
    __decorate([ property(cc.Node) ], SetWindow.prototype, "cheatBtn", void 0);
    __decorate([ property(cc.EditBox) ], SetWindow.prototype, "equipQEBox", void 0);
    SetWindow = __decorate([ ccclass ], SetWindow);
    exports.default = SetWindow;
    cc._RF.pop();
  }, {
    "../main/MyRequest": "MyRequest",
    "../main/NetworkManager": "NetworkManager",
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager"
  } ],
  ShopItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e53bf3wvnVGyIwA8SNoZBow", "ShopItem");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const o = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const h = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    const ItemIcon_1 = require("./ItemIcon");
    var l, _, p;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let ShopItem = class ShopItem extends cc.Component {
      constructor() {
        super(...arguments);
        this.tags = null;
        this.tagsSFS = null;
        this.costNode = null;
        this.numStr = null;
        this.iiNode = null;
        this.bought = null;
      }
      init(c) {
        var t, i;
        this.sIdx = c;
        this.bought[0].active = c >= 12 ? cc.player.shop.buy[this.sIdx] >= this.maxTimes[c] : cc.player.shop.buy[this.sIdx] > 0;
        t = (i = o.Datas.Shop[cc.player.shop.inShop[c]]).item[2];
        244 === i.id && (t = Math.max(1e3, 60 * o.Datas.LevelInfo[cc.player.levelProg[0]].gjGode));
        245 === i.id && 0 === cc.player.shop.buy[this.sIdx] && (t = 50);
        this.iiNode.getComponent(ItemIcon_1.default).init(i.item[0], i.item[1], t);
        this.costNode[2].active = false;
        i.need > 0 ? (this.costNode[0].active = true, this.costNode[1].active = false, this.numStr.string = Tool_1.default.formatNum2(i.need)) : 13 === this.sIdx && 0 === cc.player.shop.buy[this.sIdx] ? (this.costNode[0].active = false, 
        this.costNode[1].active = false, this.costNode[2].active = true) : (this.costNode[0].active = false, 
        this.costNode[1].active = true, this.costNode[1].getComponentInChildren(cc.Label).string = "\u514d\u8d39(" + (this.maxTimes[this.sIdx] - cc.player.shop.buy[this.sIdx]) + ")", 
        this.costNode[2].active = false);
        this.tags[2].getComponent(cc.Sprite).spriteFrame = this.tagsSFS[i.off - 1];
        this.tags[0].active = 1 === i.sample;
        this.tags[1].active = 2 === i.sample;
        this.bought[1].active = i.sample > 0 && cc.player.shop.buy[this.sIdx] > 0;
        i.off > 0 ? (this.tags[2].active = true, this.tags[2].getComponent(cc.Sprite).spriteFrame = this.tagsSFS[i.off - 1], 
        this.bought[2].active = cc.player.shop.buy[this.sIdx] > 0) : (this.tags[2].active = false, 
        this.bought[2].active = false);
      }
      onClickShow() {
        var c, t, l = 13, _ = 11, p = 50;
        if (t = this, (c = o.Datas.Shop[cc.player.shop.inShop[this.sIdx]]).need < 0) {
          var E;
          if (E = 3, l === this.sIdx ? E = 4 : this.sIdx >= 14 && (E = 1), cc.player.shop.buy[this.sIdx] >= E) return void cc.popupManager.showToast(o.Datas.Tips[_].v);
          l === this.sIdx && 0 === cc.player.shop.buy[this.sIdx] ? (cc.pvz.PlayerData.getRewardBonus(c.item[0], c.item[1], p), 
          cc.player.shop.buy[this.sIdx]++, this.init(this.sIdx), cc.SubwindowManager.showWindow(h.UIStatus.GetItem, {
            items: [ c.item[0], c.item[1], p ]
          }), RedPointManager_1.default.check("Shop"), cc.pvz.PlayerData.saveData()) : cc.pvz.AdUtils.showAdRewardVideo("\u5546\u5e97\u8d2d\u4e70", function(i) {
            var n;
            i && (n = c.item[2], 244 === c.id && (n = Math.max(1e3, 60 * o.Datas.LevelInfo[cc.player.levelProg[0]].gjGode)), 
            cc.pvz.PlayerData.getRewardBonus(c.item[0], c.item[1], n), cc.player.shop.buy[t.sIdx]++, 
            t.init(t.sIdx), cc.SubwindowManager.showWindow(h.UIStatus.GetItem, {
              items: [ c.item[0], c.item[1], n ]
            }), cc.pvz.PlayerData.saveData());
          });
        } else {
          if (cc.player.shop.buy[this.sIdx]) return void cc.popupManager.showToast(o.Datas.Tips[_].v);
          cc.SubwindowManager.showWindow(h.UIStatus.ItemInfo, {
            item: c.item,
            tags: [ 1 === c.sample ? 1 : 0, 2 == c.sample ? 1 : 0, c.off ],
            shopId: this.sIdx
          });
        }
      }
      start() {}
    };
    __decorate([ property(cc.Node) ], ShopItem.prototype, "tags", void 0);
    __decorate([ property(cc.SpriteFrame) ], ShopItem.prototype, "tagsSFS", void 0);
    __decorate([ property(cc.Node) ], ShopItem.prototype, "costNode", void 0);
    __decorate([ property(cc.Label) ], ShopItem.prototype, "numStr", void 0);
    __decorate([ property(cc.Node) ], ShopItem.prototype, "iiNode", void 0);
    __decorate([ property(cc.Node) ], ShopItem.prototype, "bought", void 0);
    ShopItem = __decorate([ ccclass ], ShopItem);
    exports.default = ShopItem;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./ItemIcon": "ItemIcon",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  ShopWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d7643aplNVLNoCRwxNswLSo", "ShopWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const o = require("./ConfigCtrl");
    const EnabledBtn_1 = require("./EnabledBtn");
    const ShopItem_1 = require("./ShopItem");
    const Tool_1 = require("./Tool");
    const r = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var d = 0;
    let ShopWindow = class ShopWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.scContainer = null;
        this.scPre = null;
        this.cdTime = null;
        this.rCost = null;
        this.refreshBtn = null;
      }
      init() {}
      show() {
        (cc.player.shop.lastUpdateTime < Tool_1.default.today() / 1e3 || cc.player.shop.inShop.length < 16 || !cc.player.shop.inShop[0]) && cc.pvz.PlayerData.refreshShop();
        this.refreshInShop();
        this.refreshTimes();
      }
      refreshInShop() {
        var c;
        c = [ 13, 14, 15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
        console.log("==>", cc.player.shop.inShop);
        for (var d = 0; d < 4; d++) Tool_1.default.getPrefab(this.scContainer[0], this.scPre, "" + d).getComponent(ShopItem_1.default).init(c[d] - 1);
        for (d = 4; d < c.length; d++) Tool_1.default.getPrefab(this.scContainer[1], this.scPre, "" + d).getComponent(ShopItem_1.default).init(c[d] - 1);
      }
      refreshTimes() {
        var o = 1e3;
        cc.player.shop.rTimes >= 5 ? (this.rCost.string = "50", this.refreshBtn.getComponent(EnabledBtn_1.default).setEnable(false)) : (this.rCost.string = "" + 10 * (cc.player.shop.rTimes + 1), 
        this.refreshBtn.getComponent(EnabledBtn_1.default).setEnable(true));
        this.cdTime.string = Tool_1.default.formatCountDown(Tool_1.default.today() / o + 86400 - Math.floor(Date.now() / o), true);
      }
      doRefresh() {
        if (false !== this.refreshBtn.getComponent(EnabledBtn_1.default).flag) if (cc.pvz.PlayerData.itemNum(3) >= 10 * (cc.player.shop.rTimes + 1)) {
          cc.pvz.PlayerData.refreshShop();
          cc.pvz.PlayerData.itemNum(3, 10 * -(cc.player.shop.rTimes + 1));
          cc.player.shop.rTimes++;
          this.refreshInShop();
          this.refreshTimes();
          cc.pvz.PlayerData.saveData();
        } else {
          var g;
          g = o.Datas.Tips[2].v.replace("{1}", o.Datas.Item[3].name);
          cc.popupManager.showToast(g);
        } else cc.popupManager.showToast(o.Datas.Tips[1].v);
      }
      hide() {
        cc.SubwindowManager.hideWindow(r.UIStatus.Shop);
      }
      start() {}
      update(c) {
        this.tCount += c;
        this.tCount >= 1 && (this.refreshTimes(), this.tCount -= 1);
      }
    };
    __decorate([ property(cc.Node) ], ShopWindow.prototype, "scContainer", void 0);
    __decorate([ property(cc.Prefab) ], ShopWindow.prototype, "scPre", void 0);
    __decorate([ property(cc.Label) ], ShopWindow.prototype, "cdTime", void 0);
    __decorate([ property(cc.Label) ], ShopWindow.prototype, "rCost", void 0);
    __decorate([ property(cc.Node) ], ShopWindow.prototype, "refreshBtn", void 0);
    ShopWindow = __decorate([ ccclass ], ShopWindow);
    exports.default = ShopWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./EnabledBtn": "EnabledBtn",
    "./ShopItem": "ShopItem",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  SignPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "df702AiKclFu7V62/DmaBE2", "SignPanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const n = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const u = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    const ItemIcon_1 = require("./ItemIcon");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var A = 0;
    let SignPanel = class SignPanel extends cc.Component {
      constructor() {
        super(...arguments);
        this.dayStr = null;
        this.iiPre = null;
        this.iiContainer = null;
        this.btns = null;
        this.mask = null;
        this.isGet = null;
      }
      init(c) {
        this.dayIdx = c;
        this.dayStr.string = "\u7b2c" + c % 100 + "\u5929";
        this.refresh();
      }
      refresh() {
        var c, t, b = "item";
        t = n.Datas.Sign[this.dayIdx + (cc.player.signInfo.today > 7 ? 100 : 0)];
        0 === (c = cc.player.signInfo.today % 7) && (c = 7);
        for (var A = 0; A < t.reward.length; A++) Tool_1.default.getPrefab(this.iiContainer[A], this.iiPre, b + A).getComponent(ItemIcon_1.default).init(t.reward[A][0], t.reward[A][1], t.reward[A][2]);
        for (A = 0; A < t.adreward.length; A++) Tool_1.default.getPrefab(this.iiContainer[A + 2], this.iiPre, b + (A + 2)).getComponent(ItemIcon_1.default).init(t.adreward[A][0], t.adreward[A][1], t.adreward[A][2]);
        this.dayIdx < c ? (this.mask.map(function(c) {
          return c.active = false;
        }), this.isGet[0].active = true, this.isGet[1].active = true, this.isGet[2].active = !!cc.player.signInfo.AdProg[this.dayIdx - 1], 
        this.isGet[3].active = !!cc.player.signInfo.AdProg[this.dayIdx - 1], this.btns[0].active = false, 
        this.btns[1].active = !this.isGet[2].active) : this.dayIdx === c ? (this.mask[0].active = false, 
        this.isGet[0].active = 1 === cc.player.signInfo.sign, this.isGet[1].active = 1 === cc.player.signInfo.sign, 
        this.mask[1].active = 0 === cc.player.signInfo.sign, this.isGet[2].active = !!cc.player.signInfo.AdProg[this.dayIdx - 1], 
        this.isGet[3].active = !!cc.player.signInfo.AdProg[this.dayIdx - 1], this.btns[0].active = !this.isGet[0].active, 
        this.btns[1].active = !this.mask[1].active && !this.isGet[2].active) : (this.mask.map(function(c) {
          return c.active = true;
        }), this.isGet.map(function(c) {
          return c.active = false;
        }), this.btns[0].active = false, this.btns[1].active = false);
      }
      doSign() {
        if (!1 === this.mask[0].active && !1 === this.isGet[0].active) {
          for (var m = n.Datas.Sign[this.dayIdx + (cc.player.signInfo.today > 7 ? 100 : 0)], S = [], b = 0; b < m.reward.length; b++) {
            cc.pvz.PlayerData.getRewardBonus(m.reward[b][0], m.reward[b][1], m.reward[b][2]);
            m.reward[b].map(function(c) {
              return S.push(c);
            });
          }
          cc.player.signInfo.sign = 1;
          cc.player.signInfo.lastSignTime = Date.now();
          cc.pvz.PlayerData.saveData();
          RedPointManager_1.default.check("Sign");
          cc.SubwindowManager.showWindow(u.UIStatus.GetItem, {
            items: S,
            showFlyTo: 1
          });
          cc.pvz.TAUtils.subscribeWxMessage(0);
          this.refresh();
        }
      }
      doAdSign() {
        var c;
        c = this;
        !1 === this.mask[1].active && !1 === this.isGet[2].active && cc.pvz.AdUtils.willShowAdRewardVideo(cc.pvz.GameConst.AdType["\u7b7e\u5230"], function(t) {
          var a = 100;
          if (t) {
            for (var g = n.Datas.Sign[c.dayIdx + (cc.player.signInfo.today > 7 ? a : 0)], m = [], S = 0; S < g.adreward.length; S++) {
              cc.pvz.PlayerData.getRewardBonus(g.adreward[S][0], g.adreward[S][1], g.adreward[S][2]);
              g.adreward[S].map(function(c) {
                return m.push(c);
              });
            }
            cc.player.signInfo.AdProg[c.dayIdx % a - 1] = 1;
            c.refresh();
            cc.pvz.PlayerData.saveData();
            cc.SubwindowManager.showWindow(u.UIStatus.GetItem, {
              items: m,
              showFlyTo: 1
            });
          }
        });
      }
      start() {}
    };
    __decorate([ property(cc.Label) ], SignPanel.prototype, "dayStr", void 0);
    __decorate([ property(cc.Prefab) ], SignPanel.prototype, "iiPre", void 0);
    __decorate([ property(cc.Node) ], SignPanel.prototype, "iiContainer", void 0);
    __decorate([ property(cc.Node) ], SignPanel.prototype, "btns", void 0);
    __decorate([ property(cc.Node) ], SignPanel.prototype, "mask", void 0);
    __decorate([ property(cc.Node) ], SignPanel.prototype, "isGet", void 0);
    SignPanel = __decorate([ ccclass ], SignPanel);
    exports.default = SignPanel;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./ItemIcon": "ItemIcon",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  SignWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "edec2LOHu9ORIClaSxki3bx", "SignWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const SignPanel_1 = require("./SignPanel");
    const Tool_1 = require("./Tool");
    const s = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SignWindow = class SignWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.signPanelPre = null;
        this.signPanelContainer = null;
      }
      init() {}
      show() {
        cc.pvz.PlayerData.refreshSignInfo();
        this.refresh();
      }
      refresh() {
        for (var n = 0; n < 7; n++) Tool_1.default.getPrefab(this.signPanelContainer, this.signPanelPre, "d" + (n + 1)).getComponent(SignPanel_1.default).init(n + 1);
      }
      hide() {
        cc.SubwindowManager.hideWindow(s.UIStatus.Sign);
      }
      start() {}
    };
    __decorate([ property(cc.Prefab) ], SignWindow.prototype, "signPanelPre", void 0);
    __decorate([ property(cc.Node) ], SignWindow.prototype, "signPanelContainer", void 0);
    SignWindow = __decorate([ ccclass ], SignWindow);
    exports.default = SignWindow;
    cc._RF.pop();
  }, {
    "./SignPanel": "SignPanel",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  SkillCard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0a38abygtFGlrDQl717oES6", "SkillCard");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MyRequest_1 = require("../main/MyRequest");
    const o = require("./ConfigCtrl");
    const f = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    const EffSpine_1 = require("./EffSpine");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var d = 0;
    let SkillCard = class SkillCard extends cc.Component {
      constructor() {
        super(...arguments);
        this.bgSpr = null;
        this.bgSFS = null;
        this.anim = null;
        this.icon = null;
        this.buyPosPanels = null;
        this.skillStrInfo = null;
        this.skillNameStr = null;
        this.unlockCostStr = null;
        this.tagStr = null;
        this.lockPanel = null;
        this.gotPanel = null;
        this.expProg = null;
        this.deployBtn = null;
        this.unlockEff = null;
      }
      initAsUsing(c, t) {
        this.type = 1;
        this.idx = c;
        this.par = t;
        for (var d = 0; d < this.buyPosPanels.length; d++) this.buyPosPanels[d].active = false;
        -1 === cc.player.skillUsing[c] ? (this.buyPosPanels[1].active = true, 0 === c || cc.player.skillUsing[c - 1] >= 0 ? (this.unlockCostStr.node.parent.active = true, 
        this.unlockCostStr.string = "" + o.Datas.Config[1].v[c]) : this.unlockCostStr.node.parent.active = false) : 0 === cc.player.skillUsing[c] ? this.buyPosPanels[0].active = true : (this.buyPosPanels[2].active = true, 
        this.initBySkillIdx(cc.player.skillUsing[c]), this.refreshDeployBtns());
      }
      initAsInStorage(c, t) {
        void 0 === t && (t = null);
        this.type = 2;
        this.idx = c;
        this.par = t;
        this.buyPosPanels[0].active = false;
        this.buyPosPanels[1].active = false;
        this.buyPosPanels[2].active = true;
        this.initBySkillIdx(this.idx);
      }
      initAsInGame(c, t) {
        void 0 === t && (t = [ 0, 0, 0 ]);
        this.type = 2;
        this.idx = c;
        this.buyPosPanels[0].active = false;
        this.buyPosPanels[1].active = false;
        this.buyPosPanels[2].active = true;
        this.initBySkillIdx(this.idx, t);
      }
      initAsInGetNewSKill(c, t) {
        void 0 === t && (t = null);
        this.type = 3;
        this.idx = c;
        this.initBySkillIdx(this.idx);
        this.deployBtn.map(function(c) {
          return c.active = false;
        });
      }
      hideAllSkillStrInfo() {
        this.skillStrInfo.map(function(c) {
          return c.node.active = false;
        });
      }
      initAsInRankuser(c, t) {
        var i;
        this.type = 5;
        this.idx = c;
        this.buyPosPanels[0].active = false;
        this.buyPosPanels[1].active = false;
        this.buyPosPanels[2].active = true;
        this.deployBtn.map(function(c) {
          return c.active = false;
        });
        this.hideAllSkillStrInfo();
        this.skillStrInfo[0].node.active = true;
        this.skillStrInfo[0].string = Tool_1.default.trancNumberToChar(t) + "\u5c42";
        i = o.Datas.Skill[c];
        this.skillNameStr.string = i.name;
        this.bgSpr.spriteFrame = this.bgSFS[i.qua - 1];
        cc.pvz.utils.setSpriteFrame(this.icon, "image", "skills/skill" + c);
        this.expProg.node.parent.active = false;
      }
      initBySkillIdx(c, t) {
        var i, n, l = "qua";
        if (void 0 === t && (t = []), i = o.Datas.Skill[c], this.bgSpr.spriteFrame = this.bgSFS[i.qua - 1], 
        this.skillNameStr.string = i.name, cc.pvz.utils.setSpriteFrame(this.icon, "image", "skills/skill" + c), 
        this.tagStr.string = i.typeLab, this.deployBtn[0].active = false, this.deployBtn[1].active = false, 
        cc.player.skillInfo[c] || (cc.player.skillInfo[c] = [ 0, 0 ]), n = cc.player.skillInfo[c] ? cc.player.skillInfo[c][0] : 0, 
        t[0] && (n = t[0]), this.hideAllSkillStrInfo(), 0 === n && 3 !== this.type) {
          this.lockPanel.active = true;
          this.expProg.node.parent.active = false;
        } else {
          var D, B, y;
          D = 0;
          B = 0;
          t[0] ? (D = t[1], B = t[2]) : o.Datas.SkillExp[n + 1] ? (D = cc.player.skillInfo[c] ? cc.player.skillInfo[c][1] : 0, 
          B = o.Datas.SkillExp[n + 1][l + i.qua]) : (D = 1, B = 1);
          this.lockPanel.active = false;
          this.skillStrInfo[0].node.parent.active = true;
          y = n;
          this.expProg.node.parent.active = true;
          this.showExpProg(0, n, D, B);
          3 === this.type && (0 === n ? (n = 1, D = 0, B = 3) : (D++, o.Datas.SkillExp[n + 1] && D >= o.Datas.SkillExp[n + 1][l + i.qua] && (D = 0, 
          n++, B = o.Datas.SkillExp[n + 1] ? o.Datas.SkillExp[n + 1][l + i.qua] : 1)), this.showExpProg(1, n, D, B, n !== y));
          for (var T = 0, A = 0; A < cc.player.skillUsing.length; A++) cc.player.skillUsing[A] >= 0 && T++;
          this.deployBtn[0].active = T > 0;
        }
      }
      showExpProg0() {
        var c, t, i, n, e, s, r;
        (e = cc.player.skillInfo[this.idx] ? cc.player.skillInfo[this.idx][0] : 0, i = 1, 
        c = 1, o.Datas.SkillExp[e + 1]) && (r = o.Datas.Skill[this.idx], i = cc.player.skillInfo[this.idx] ? cc.player.skillInfo[this.idx][1] : 0, 
        c = o.Datas.SkillExp[e + 1]["qua" + r.qua]);
        n = e;
        t = c;
        (s = i - 1) < 0 && (r = o.Datas.Skill[this.idx], n--, (s = o.Datas.SkillExp[n + 1]["qua" + r.qua] - 1) < 0 && (s = 0), 
        t = o.Datas.SkillExp[n + 1]["qua" + r.qua]);
        this.showExpProg(0, n, s, t);
        this.showExpProg(1, e, i, c, e !== n);
      }
      showExpProg(c, t, i, n, e) {
        void 0 === e && (e = false);
        0 === c ? (this.skillStrInfo[0].node.active = true, this.skillStrInfo[0].string = Tool_1.default.trancNumberToChar(t) + "\u5c42") : 1 === c && (e ? (this.skillStrInfo[1].node.active = true, 
        this.skillStrInfo[2].node.active = true, this.skillStrInfo[2].string = Tool_1.default.trancNumberToChar(t) + "\u5c42") : (this.skillStrInfo[1].node.active = false, 
        this.skillStrInfo[2].node.active = false));
        0 === c ? (this.skillStrInfo[3].node.active = true, t < 10 ? (this.skillStrInfo[3].string = i + "/" + n, 
        this.expProg.progress = i / n) : (this.skillStrInfo[3].string = "\u5df2\u6ee1\u7ea7", 
        this.expProg.progress = 1)) : 1 === c && (e ? (this.skillStrInfo[3].node.active = false, 
        this.skillStrInfo[4].node.active = false) : this.skillStrInfo[4].node.active = true, 
        this.skillStrInfo[5].node.active = true, t < 10 ? (this.skillStrInfo[5].string = i + "/" + n, 
        this.expProg.progress = i / n) : (this.skillStrInfo[5].string = "\u5df2\u6ee1\u7ea7", 
        this.expProg.progress = 1));
      }
      showIsGot() {
        this.gotPanel.active = true;
        this.hideAllSkillStrInfo();
        this.showExpProg0();
      }
      refreshDeployBtns() {
        if (1 === this.type) {
          this.deployBtn[0].active = false;
          this.deployBtn[1].active = true;
        } else for (var o = 0; o < cc.player.skillUsing.length; o++) cc.player.skillUsing[o] === this.idx && (this.deployBtn[0].active = false, 
        this.deployBtn[1].active = true);
      }
      onClick() {
        var c;
        1 === this.type ? (c = cc.player.skillUsing[this.idx]) > 0 && cc.SubwindowManager.showWindow(f.UIStatus.SkillInfo, {
          type: 1,
          idx: c
        }) : 2 === this.type && cc.SubwindowManager.showWindow(f.UIStatus.SkillInfo, {
          type: 1,
          idx: this.idx
        });
      }
      deploy() {
        for (var l = 0; l < cc.player.skillUsing.length; l++) if (0 === cc.player.skillUsing[l]) return cc.player.skillUsing[l] = this.idx, 
        this.par.refreshUsing(), this.par.refreshStorageCardById(this.idx), cc.pvz.PlayerData.increaseMissionProg(704, 1), 
        Tool_1.default.displayBPChange(), void cc.pvz.PlayerData.saveData();
        cc.popupManager.showToast(o.Datas.Tips[8].v);
      }
      undeploy() {
        var c;
        if (1 === this.type) {
          c = cc.player.skillUsing[this.idx];
          cc.player.skillUsing[this.idx] = 0;
          this.par.refreshUsing();
          this.par.refreshStorageCardById(c);
        } else if (2 === this.type) {
          for (var v = 0; v < cc.player.skillUsing.length; v++) if (cc.player.skillUsing[v] === this.idx) {
            cc.player.skillUsing[v] = 0;
            break;
          }
          this.par.refreshUsing();
          this.par.refreshStorageCardById(this.idx);
        }
        Tool_1.default.displayBPChange();
        cc.pvz.PlayerData.saveData();
      }
      unlockPosition() {
        if (0 === this.idx || cc.player.skillUsing[this.idx - 1] >= 0) if (cc.pvz.PlayerData.itemNum(3) >= o.Datas.Config[1].v[this.idx]) {
          cc.pvz.PlayerData.itemNum(3, -o.Datas.Config[1].v[this.idx]);
          cc.player.skillUsing[this.idx] = 0;
          this.par.refreshUsing();
          0 === this.idx && this.par.refreshStorage();
          this.unlockEff.getComponent(EffSpine_1.default).play();
          cc.pvz.PlayerData.saveData();
        } else {
          var S;
          S = o.Datas.Tips[2].v.replace("{1}", o.Datas.Item[3].name);
          cc.popupManager.showToast(S);
        }
      }
      getAsCheat() {
        MyRequest_1.default.userInfo.access >= 90 && (cc.pvz.PlayerData.getRewardBonus(3, this.idx, 1e4), 
        console.log("Add skill exp"));
      }
    };
    __decorate([ property(cc.Sprite) ], SkillCard.prototype, "bgSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], SkillCard.prototype, "bgSFS", void 0);
    __decorate([ property(cc.Animation) ], SkillCard.prototype, "anim", void 0);
    __decorate([ property(cc.Sprite) ], SkillCard.prototype, "icon", void 0);
    __decorate([ property(cc.Node) ], SkillCard.prototype, "buyPosPanels", void 0);
    __decorate([ property(cc.Label) ], SkillCard.prototype, "skillStrInfo", void 0);
    __decorate([ property(cc.Label) ], SkillCard.prototype, "skillNameStr", void 0);
    __decorate([ property(cc.Label) ], SkillCard.prototype, "unlockCostStr", void 0);
    __decorate([ property(cc.Label) ], SkillCard.prototype, "tagStr", void 0);
    __decorate([ property(cc.Node) ], SkillCard.prototype, "lockPanel", void 0);
    __decorate([ property(cc.Node) ], SkillCard.prototype, "gotPanel", void 0);
    __decorate([ property(cc.ProgressBar) ], SkillCard.prototype, "expProg", void 0);
    __decorate([ property(cc.Node) ], SkillCard.prototype, "deployBtn", void 0);
    __decorate([ property(cc.Node) ], SkillCard.prototype, "unlockEff", void 0);
    SkillCard = __decorate([ ccclass ], SkillCard);
    exports.default = SkillCard;
    cc._RF.pop();
  }, {
    "../main/MyRequest": "MyRequest",
    "./ConfigCtrl": "ConfigCtrl",
    "./EffSpine": "EffSpine",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  SkillIcon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1ac3amggQJM8apegyFGIsTd", "SkillIcon");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const GameComponent_1 = require("./GameComponent");
    var d = "x";
    var w, C, B, E, e, i, f, M;
    var t = "charAt";
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SkillIcon = class SkillIcon extends GameComponent_1.default {
      constructor() {
        super(...arguments);
        this.quaSp = null;
        this.icon = null;
        this.cdBar = null;
        this.lvLabel = null;
        this.useAni = null;
      }
      initBy(t, i, c) {
        var l = "image";
        this.scene = t;
        this.skill = this.scene.getSkill(i);
        this.initCdTime(c);
        cc.pvz.utils.setSpriteFrame(this.quaSp, l, "pz/SQua" + [ 0, 2, 4, 5 ][this.skill.json.qua]);
        cc.pvz.utils.setSpriteFrame(this.icon, l, "skills/skill" + i);
        this.cdTime > 0 ? (this.cdBar.node.active = true, this.cdBar.progress = 0) : this.cdBar.node.active = false;
        this.inCoolDown = false;
        this.updateNodes();
      }
      updateNodes() {
        this.lvLabel.string = this.skill.lv;
      }
      getJsonValue(t) {
        return this.skill.args[t];
      }
      initCdTime(t) {
        switch (this.skill.id) {
         case 20:
         case 21:
         case 22:
         case 23:
         case 25:
         case 26:
         case 27:
          this.cdTime = this.getJsonValue(2);
          this.cdTimer = t ? 0 : this.cdTime - .01;
          break;

         default:
          this.cdTime = 0;
        }
      }
      canUse() {
        return !this.isCoolDown;
      }
      initZd(t, i) {
        var n = this;
        this.prefabInfo ? t() : cc.pvz.utils.useBundleAsset("game", "bullet/SKL" + this.skill.id, cc.Prefab, function(c) {
          var a = i || n.scene.bulletsRoot;
          n.prefabInfo = n.scene.usePoolPrefab(c, a);
          t();
        });
      }
      playEmitSound() {
        this.skill.json.seOp && cc.butler.playEffectAsync("music", this.skill.json.seOp, this.skill.json.seOpEx);
      }
      useOnce() {
        var g = this, w = this.scene.hero, C = this.scene.heroRoot.position, B = this.scene.getAtt();
        switch (this.skill.id) {
         case 20:
          var T = this.scene.findRandomEnemyInRange(C, 122500);
          if (!T) return;
          this.initZd(function() {
            var n = 100, a = g.prefabInfo.addNode(T.node.position).getComponent(sp.Skeleton);
            cc.pvz.utils.IKtoLocalPos(a, cc.math.randomRange(-n, n), 0);
            a.setAnimation(0, a.animation, false);
            a.setEventListener(function() {
              var a = 1e-4 * g.skill.args[T.isEliteOrBoss() ? 1 : 0] * B;
              T.tryHurtBy({
                isNear: false,
                node: {
                  angle: cc.math.randomRange(0, 360)
                }
              }, a, 0);
              g.scene.showHitEffect(T.node.position, "skl20_hit");
            });
            g.playEmitSound();
          });
          break;

         case 21:
          var S = this.skill.args[0], E = this.scene.findRandomEnemys(S);
          if (0 == E.length) return;
          var R = this.scene.getAtt() * this.skill.args[1] * 1e-4;
          this.scene.showHitEffect(C, "skl21_atk1", function() {
            g.initZd(function() {
              for (var t = function() {
                var c = i < E.length ? E[i] : null;
                g.scene.startTimer(function() {
                  var r = 300, e = 50, v = c ? c.node.position : cc.v2(C[d] + cc.math.randomRange(-r, r), C.y + cc.math.randomRange(-r, r)), l = g.prefabInfo.addNode(v).getComponent(sp.Skeleton);
                  l.setAnimation(0, Math.random() < .5 ? "skl21_atk2" : "skl21_atk3", false);
                  cc.pvz.utils.boneToNodePos(l, "IK", cc.v2(cc.math.randomRange(-e, e), cc.math.randomRange(-e, e)));
                  l.setEventListener(function() {
                    c && c.tryHurtBy({
                      isNear: false,
                      node: {
                        angle: cc.math.randomRange(0, 360)
                      }
                    }, R, 0);
                  });
                  g.playEmitSound();
                }, .1 * i);
              }, i = 0; i < S; i++) t();
            });
          }, this.scene.buffsForeRoot);
          break;

         case 22:
          this.initZd(function() {
            for (var o = g.skill.args[0], u = g.scene.towerZhenNode.width / 2, f = cc.math.randomRange(-Math.PI, Math.PI), v = 2 * Math.PI / o, l = 0; l < o; l++) {
              var m = f + v * l, k = g.prefabInfo.addNode(cc.v2(g.scene.towerZhenNode[d] + Math.cos(m) * u, g.scene.towerZhenNode.y + Math.sin(m) * u));
              k.zIndex = -k.y;
              k.getComponent("GameMine").initBy(g.scene, 1e-4 * g.skill.args[1] * B);
            }
            g.playEmitSound();
          }, this.scene.objsRoot);
          break;

         case 23:
          if (!this.scene.hasEnemy(C, this.skill.args[0] * this.skill.args[0])) return;
          this.initZd(function() {
            g.prefabInfo.addNode(C).getComponent("GameRoar").initBy(g.scene, g.skill.args[0], 1e-4 * g.skill.args[1] * B);
          });
          break;

         case 25:
          this.initZd(function() {
            for (var r = 20, v = g.skill.args[0], l = 2 * Math.PI / v, m = 1e-4 * g.skill.args[1] * B, k = 0; k < v; k++) {
              var b = l * k, M = g.prefabInfo.addNode(cc.v2(C[d] + r * Math.cos(b), C.y + r * Math.sin(b))), w = M.getComponent("Bullet");
              w.fixedRotation || (M.angle = 180 * b / Math.PI);
              w.fixedAtt = m;
              w.initBy(g.scene, g, false, b);
              w.buffId = 1;
              w.spine.setAnimation(0, "skl25_atk1", true);
              g.scene.addBullet(w);
            }
          });
          break;

         case 26:
          var y = this.scene.findRandomEnemyInRange(C, 102400);
          if (!y) return;
          this.initZd(function() {
            var u = g.prefabInfo.addNode(y.node.position).getComponent("GamePoison"), f = g.skill.args[0];
            u.initBy(g.scene, f, 1e-4 * g.skill.args[1] * B);
            g.scene.showHitEffect(y.node.position, "skl26_atk1_1");
          }, this.scene.buffsBackRoot);
          break;

         case 27:
          var A = this.scene.findEnemy(C, 64e4);
          if (!A) return;
          var L = cc.pvz.utils.getRotationRadians(w.zdPos, A.node.position);
          this.initZd(function() {
            var c = g.prefabInfo.addNode(w.zdPos);
            c.angle = 180 * L / Math.PI;
            c.getComponent("GameLaser").initBy(g.scene, g, 1e-4 * g.skill.args[0] * B);
          });
        }
        this.useAni.play();
        this.cdTime > 0 && (this.cdTimer = 0, this.cdBar.progress = 1, this.inCoolDown = true);
        this.skill.json.anim && w.showSkillAni(this.skill.json.anim);
        this.scene.addSuitDodge();
      }
      showUseOnce() {
        this.useAni.play();
      }
      update2(t) {
        if (this.cdTime > 0) {
          if (!this.scene.hero) return;
          this.cdTimer < this.cdTime && (this.cdTimer += t, this.cdBar.progress = 1 - this.cdTimer / this.cdTime);
          this.cdTimer >= this.cdTime && (this.inCoolDown = false, this.useOnce());
        }
      }
      onClick() {
        this.scene.showSkillInfo(this.skill);
      }
      doBulletAttLogic(t, i) {
        i.tryHurtBy(t, t.fixedAtt, 0);
        t.onHitWith(i);
      }
    };
    __decorate([ property(cc.Sprite) ], SkillIcon.prototype, "quaSp", void 0);
    __decorate([ property(cc.Sprite) ], SkillIcon.prototype, "icon", void 0);
    __decorate([ property(cc.ProgressBar) ], SkillIcon.prototype, "cdBar", void 0);
    __decorate([ property(cc.Label) ], SkillIcon.prototype, "lvLabel", void 0);
    __decorate([ property(cc.Animation) ], SkillIcon.prototype, "useAni", void 0);
    SkillIcon = __decorate([ ccclass ], SkillIcon);
    exports.default = SkillIcon;
    exports.default = t;
    cc._RF.pop();
  }, {
    "./GameComponent": "GameComponent"
  } ],
  SkillInfoWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a102acq/95DdIzsIr9ZJ8gu", "SkillInfoWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const s = require("./ConfigCtrl");
    const SkillCard_1 = require("./SkillCard");
    const Tool_1 = require("./Tool");
    const e = require("./SubwindowManager");
    var A, O, G, i;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var W = 0;
    let SkillInfoWindow = class SkillInfoWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.siPre = null;
        this.siContainer = null;
        this.SV = null;
        this.title = null;
        this.quaColors = new cc.Color(255, 255, 255, 255);
        this.skillDesc0 = null;
        this.skillDescStr = null;
        this.skillDescColors = new cc.Color(255, 255, 255, 255);
      }
      init() {}
      initBy(c, t, i, n, e) {
        this.init();
        this.show({
          type: c,
          idx: t,
          lv: i,
          exp: n,
          expNeeded: e
        });
        this.inGame = true;
      }
      show(c) {
        void 0 === c && (c = {
          type: 1,
          idx: 1,
          lv: 0,
          exp: 0,
          expNeeded: 0
        });
        this.type = c.type;
        this.idx = c.idx;
        c.lv ? this.showInGame = [ c.lv, c.exp, c.expNeeded ] : this.showInGame = [ -1, -1, -1 ];
        this.siContainer.children.map(function(c) {
          return c.active = false;
        });
        this.SV.scrollToTop();
        this.showAsSkill(this.idx);
        this.inGame = false;
      }
      showAsSkill(c) {
        var t, i, e, A = "<color = ", O = "</c>", G = "Lv";
        e = Tool_1.default.getPrefab(this.siContainer, this.siPre, "SkillIcon").getComponent(SkillCard_1.default);
        this.showInGame[0] > 0 ? e.initAsInGame(c, this.showInGame) : e.initAsInStorage(c);
        e.type = 3;
        e.deployBtn.map(function(c) {
          return c.active = false;
        });
        e.skillNameStr.node.parent.active = false;
        t = s.Datas.Skill[c];
        this.title.color = this.quaColors[t.qua - 1];
        this.title.getComponent(cc.Label).string = t.name;
        i = cc.player.skillInfo[c][0];
        this.showInGame[0] >= 0 && (i = this.showInGame[0]);
        this.skillDesc0.string = Tool_1.default.getRicktextStr(t.desc, i - 1, t.valu, [], t.percent.map(function(c) {
          return c ? f : "";
        }), [ A + t.color + ">", O ]);
        for (var W = 0; W < t.valu[0].length; W++) {
          var F;
          (F = Tool_1.default.getPrefab(this.skillDescStr.parent, this.skillDescStr, "LvDesc" + (W + 1))).color = this.skillDescColors[W + 1 <= i ? 0 : 1];
          F.getComponent(cc.RichText).string = "";
          F.getComponent(cc.RichText).string = Tool_1.default.getRicktextStr(t.desc, W, t.valu, [], t.percent.map(function(c) {
            return c ? f : "";
          }), W + 1 <= i ? [ A + t.color + ">", O ] : [ "", "" ]);
          F.getChildByName(G).getComponent(cc.Label).string = "Lv." + (W + 1);
          F.getChildByName(G).color = this.skillDescColors[W + 1 <= i ? 0 : 1];
        }
      }
      hide() {
        this.inGame ? cc.popupManager.removePopup(this) : cc.SubwindowManager.hideWindow(e.UIStatus.SkillInfo);
      }
      start() {}
    };
    __decorate([ property(cc.Prefab) ], SkillInfoWindow.prototype, "siPre", void 0);
    __decorate([ property(cc.Node) ], SkillInfoWindow.prototype, "siContainer", void 0);
    __decorate([ property(cc.ScrollView) ], SkillInfoWindow.prototype, "SV", void 0);
    __decorate([ property(cc.Node) ], SkillInfoWindow.prototype, "title", void 0);
    __decorate([ property(cc.Color) ], SkillInfoWindow.prototype, "quaColors", void 0);
    __decorate([ property(cc.RichText) ], SkillInfoWindow.prototype, "skillDesc0", void 0);
    __decorate([ property(cc.Node) ], SkillInfoWindow.prototype, "skillDescStr", void 0);
    __decorate([ property(cc.Color) ], SkillInfoWindow.prototype, "skillDescColors", void 0);
    SkillInfoWindow = __decorate([ ccclass ], SkillInfoWindow);
    exports.default = SkillInfoWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SkillCard": "SkillCard",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  SkinIcon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3db9c6eXRlMIq/X6g6q+tcs", "SkinIcon");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const o = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    var v, t;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var p = "Tool";
    let SkinIcon = class SkinIcon extends cc.Component {
      constructor() {
        super(...arguments);
        this.bg = null;
        this.bgSFS = null;
        this.icon = null;
        this.iconSFS = null;
        this.fragIcon = null;
        this.selecting = null;
        this.using = null;
        this.locked = null;
        this.unlocked = null;
      }
      init(c, t) {
        var i;
        this.sId = c;
        this.par = t;
        this.icon.spriteFrame = this.iconSFS[c - 1];
        i = o.Datas.SkinInfo[this.sId];
        this.bg.spriteFrame = this.bgSFS[i.quality - 1];
        1e3 * cc.player.levelProg[0] + cc.player.levelProg[1] < i.unlock ? (this.state = 0, 
        this.initAsLock()) : cc.player.skinProLv[this.sId] ? (this.state = 2, this.initAsInStorage()) : (this.state = 1, 
        this.initAsUnget());
        this.selecting.active = this.par.selectingSkin === this.sId;
        this.using.active = cc.player.skinUsing === this.sId;
      }
      initAsLock() {
        this.icon.node.color = cc.Color.BLACK;
        this.locked[0].active = true;
        this.locked[1].active = true;
        this.locked[2].active = false;
        this.unlocked.map(function(c) {
          return c.active = false;
        });
      }
      initAsUnget() {
        var c, v = 500;
        this.icon.node.color = cc.Color.WHITE;
        this.locked[0].active = true;
        this.locked[1].active = false;
        this.locked[2].active = true;
        c = o.Datas.SkinInfo[this.sId];
        this.locked[2].getComponent(cc.ProgressBar).progress = cc.pvz.PlayerData.itemNum(v + this.sId) / c.merge[2];
        this.locked[2].getChildByName("progStr").getComponent(cc.Label).string = cc.pvz.PlayerData.itemNum(v + this.sId) + "/" + c.merge[2];
        cc.pvz.utils.setSpriteFrame(this.locked[2].getChildByName("fragIcon").getComponent(cc.Sprite), "image", "Item/item" + (v + this.sId));
        this.unlocked.map(function(c) {
          return c.active = false;
        });
      }
      initAsInStorage() {
        this.icon.node.color = cc.Color.WHITE;
        this.locked.map(function(c) {
          return c.active = false;
        });
      }
      select() {
        var c, t, v = 1e3;
        if (0 !== this.state) {
          if (this.par.selectingSkin !== this.sId) {
            for (var S in this.par.selectingSkin = this.sId, o.Datas.SkinInfo) Tool_1.default.getPrefab(this.par.siContainer, this.par.siPre, "" + S).getComponent(p).selecting.active = parseInt(S) === this.sId;
            this.par.refreshSelectingSkin();
            this.par.refreshAsSkin();
          }
        } else {
          t = o.Datas.SkinInfo[this.sId];
          c = o.Datas.Tips[10].v.replace("{1}", "" + o.Datas.LevelInfo[Math.floor(t.unlock / v)].name + t.unlock % v);
          cc.popupManager.showToast(c);
        }
      }
    };
    __decorate([ property(cc.Sprite) ], SkinIcon.prototype, "bg", void 0);
    __decorate([ property(cc.SpriteFrame) ], SkinIcon.prototype, "bgSFS", void 0);
    __decorate([ property(cc.Sprite) ], SkinIcon.prototype, "icon", void 0);
    __decorate([ property(cc.SpriteFrame) ], SkinIcon.prototype, "iconSFS", void 0);
    __decorate([ property(cc.Sprite) ], SkinIcon.prototype, "fragIcon", void 0);
    __decorate([ property(cc.Node) ], SkinIcon.prototype, "selecting", void 0);
    __decorate([ property(cc.Node) ], SkinIcon.prototype, "using", void 0);
    __decorate([ property(cc.Node) ], SkinIcon.prototype, "locked", void 0);
    __decorate([ property(cc.Node) ], SkinIcon.prototype, "unlocked", void 0);
    SkinIcon = __decorate([ ccclass ], SkinIcon);
    exports.default = SkinIcon;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./Tool": "Tool"
  } ],
  SkinProWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2aa385y82tEfpNtSzWxGGlI", "SkinProWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const a = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    const s = require("./SubwindowManager");
    var r, h, g, m, S;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SkinProWindow = class SkinProWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.pros = null;
      }
      init() {}
      show() {
        var c, r = 101, h = 102;
        for (var p in c = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          [r]: 0,
          [h]: 0
        }, cc.player.skinProLv) {
          for (var w = a.Datas.SkinInfo[parseInt(p)], g = w.baseLv[cc.player.skinProLv[p][0]], m = w.otherLv[cc.player.skinProLv[p][0]], S = 1; S <= 6; S++) {
            var b;
            b = cc.pvz.PlayerData.getPlayerPro(S, cc.player.skinProLv[p][S]);
            c[S] += b * g / 1e4;
          }
          "1" === p ? c[r] += m : "2" === p && (c[h] += m);
        }
        for (S = 0; S < this.pros.length; S++) {
          var I;
          I = "";
          S <= 2 ? (I = Tool_1.default.formatNum2(S <= 1 ? Math.floor(c[S + 1]) : c[S + 1]), 
          2 === S && (I += "\u6b21/\u79d2")) : I = Tool_1.default.formatNum2(c[S + 1] / 100) + "%";
          this.pros[S].string = "";
        }
      }
      hide() {
        cc.SubwindowManager.hideWindow(s.UIStatus.SkinPro);
      }
      start() {}
    };
    __decorate([ property(cc.Label) ], SkinProWindow.prototype, "pros", void 0);
    SkinProWindow = __decorate([ ccclass ], SkinProWindow);
    exports.default = SkinProWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  SlotGrid: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe0dcVgSHFK/L8ErBiMLAI+", "SlotGrid");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const a = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    const ItemIcon_1 = require("./ItemIcon");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SlotGrid = class SlotGrid extends cc.Component {
      constructor() {
        super(...arguments);
        this.iiPre = null;
        this.iiContainer = null;
        this.remainTimes = null;
        this.timesOut = null;
        this.timesOut2 = null;
      }
      init(c) {
        var t, i;
        this.idx = c;
        i = a.Datas.SlotGame[cc.player.slotGameInfo.rewards[c]];
        (t = Tool_1.default.getPrefab(this.iiContainer, this.iiPre, "ii").getComponent(ItemIcon_1.default)).init(i.rwd[0], i.rwd[1], i.rwd[2]);
        t.quaBg.spriteFrame = t.quaBgSFS[i.qua];
        this.remainTimes.string = "" + (0 === i.limit ? "\u65e0\u9650" : i.limit - cc.player.slotGameInfo.getTimes[this.idx]);
        1 === i.dj ? (this.timesOut2.active = i.limit > 0 && i.limit - cc.player.slotGameInfo.getTimes[this.idx] <= 0, 
        this.timesOut.active = false) : (this.timesOut.active = i.limit > 0 && i.limit - cc.player.slotGameInfo.getTimes[this.idx] <= 0, 
        this.timesOut2.active = false);
      }
      start() {}
    };
    __decorate([ property(cc.Prefab) ], SlotGrid.prototype, "iiPre", void 0);
    __decorate([ property(cc.Node) ], SlotGrid.prototype, "iiContainer", void 0);
    __decorate([ property(cc.Label) ], SlotGrid.prototype, "remainTimes", void 0);
    __decorate([ property(cc.Node) ], SlotGrid.prototype, "timesOut", void 0);
    __decorate([ property(cc.Node) ], SlotGrid.prototype, "timesOut2", void 0);
    SlotGrid = __decorate([ ccclass ], SlotGrid);
    exports.default = SlotGrid;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./ItemIcon": "ItemIcon",
    "./Tool": "Tool"
  } ],
  SlotsWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "63dcdRoofZJTo8v5gCm06Vx", "SlotsWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const a = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const SlotGrid_1 = require("./SlotGrid");
    const SpineCtrl_1 = require("./SpineCtrl");
    const Tool_1 = require("./Tool");
    const o = require("./SubwindowManager");
    var p, w, g, m, d;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var S = 0;
    let SlotsWindow = class SlotsWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.getRewardSpine = null;
        this.gridPre = null;
        this.gridPos = null;
        this.selectingGrid = null;
        this.drawTypeStr = null;
        this.drawInfoStr = null;
        this.countDownStr = null;
        this.btns = null;
      }
      init() {}
      show() {
        cc.pvz.PlayerData.refreshSlotGameRewards();
        this.getRewardSpine[0].setAnimation(0, "idle", true);
        this.getRewardSpine[1].node.active = false;
        this.selectingGrid.node.active = false;
        cc.pvz.PlayerData.getSlotGameDrawTimes(0) >= 1 && setTimeout(function() {
          cc.MainUI.showFingerAt(107);
        }, 50);
        this.refreshAllGrid();
        this.refreshCountdownTime();
        this.refreshExBonusTime();
      }
      refreshAllGrid() {
        for (var o = 0; o < cc.player.slotGameInfo.rewards.length; o++) Tool_1.default.getPrefab(this.gridPos.getChildByName("" + (o + 1)), this.gridPre, "SlotGrid").getComponent(SlotGrid_1.default).init(o);
      }
      drawFree() {
        cc.pvz.PlayerData.getSlotGameDrawTimes(0, -1) > 0 ? (this.refreshCountdownTime(), 
        this.doDraw(), RedPointManager_1.default.check("SlotGame")) : cc.popupManager.showToast(a.Datas.Tips[1].v);
      }
      drawByAd() {
        var c;
        c = this;
        cc.pvz.PlayerData.getSlotGameDrawTimes(1, 0) >= 1 ? cc.pvz.AdUtils.willShowAdRewardVideo(cc.pvz.GameConst.AdType["\u8f6c\u76d8\u62bd\u5956"], function(t) {
          t && (cc.pvz.PlayerData.getSlotGameDrawTimes(1, -1), c.doDraw());
        }) : cc.popupManager.showToast(a.Datas.Tips[1].v);
      }
      doDraw(c) {
        var t, a = 12;
        void 0 === c && (c = 0);
        this.node.getChildByName("ClickMask").active = true;
        for (var _ = cc.pvz.PlayerData.slotGameDraw(), p = [ 300, 200, 100, 70, 30, 20 ], w = [ 1, 1, 3, 5, 7, 24 ], g = [], m = 0; m < p.length; m++) for (var S = 0; S < w[m]; S++) g.push(p[m]);
        for (t = 0, this.selectingPos + g.length % a < _ ? t = _ - (this.selectingPos + g.length % a) : this.selectingPos + g.length % a > _ && (t = a - (this.selectingPos + g.length % a - _)), 
        m = 0; m < t; m++) g.push(p[p.length - 1]);
        g.reverse();
        this.displayDrawIdx = 0;
        this.tCount = 0;
        this.displayDrawTime = g;
        this.selectingGrid.node.active = true;
        this.moveSelectingGridTo(this.selectingPos);
        this.getRewardSpine[0].setAnimation(0, "run", true);
      }
      hide() {
        cc.SubwindowManager.hideWindow(o.UIStatus.Slots);
      }
      moveSelectingGridTo(c) {
        var t, i, f = 12;
        c %= f, 1 === a.Datas.SlotGame[cc.player.slotGameInfo.rewards[c]].dj ? this.selectingGrid.setAnimation(0, "rwd1_run", true) : (i = a.Datas.SlotGame[cc.player.slotGameInfo.rewards[this.displayDrawIdx % f]].rwd, 
        t = cc.pvz.PlayerData.getItemQua(i[0], i[1]), this.selectingGrid.setAnimation(0, "rwd" + (7 - t) + "_run", true));
        this.selectingGrid.node.setPosition(this.gridPos.getChildByName("" + (c + 1)).position);
      }
      getReward() {
        var c, t, i, d = 12;
        c = this, 1 === a.Datas.SlotGame[cc.player.slotGameInfo.rewards[this.displayDrawIdx % d]].dj ? (this.selectingGrid.setAnimation(0, "rwd1_idle", true), 
        this.getRewardSpine[0].setAnimation(0, "getRwd2", true), this.getRewardSpine[1].node.active = true) : (i = a.Datas.SlotGame[cc.player.slotGameInfo.rewards[this.displayDrawIdx % d]].rwd, 
        t = cc.pvz.PlayerData.getItemQua(i[0], i[1]), this.selectingGrid.setAnimation(0, "rwd" + (7 - t) + "_idle", true), 
        this.getRewardSpine[0].setAnimation(0, "getRwd1", true));
        setTimeout(function() {
          var t, i;
          i = c.displayDrawIdx % 12;
          t = cc.pvz.PlayerData.getSlotBonus(i);
          cc.SubwindowManager.showWindow(o.UIStatus.GetItem, {
            items: t
          });
          Tool_1.default.getPrefab(c.gridPos.getChildByName("" + (i + 1)), c.gridPre, "SlotGrid").getComponent(SlotGrid_1.default).init(i);
          c.refreshExBonusTime();
          cc.pvz.PlayerData.increaseMissionProg(1603, 1);
          cc.pvz.PlayerData.increaseMissionProg(1604, 1);
          cc.pvz.PlayerData.saveData();
          c.displayDrawIdx = -1;
        }, 800);
      }
      refreshExBonusTime() {
        var c;
        cc.player.slotGameInfo.getTimes[1] + cc.player.slotGameInfo.getTimes[7] !== 4 ? (c = cc.player.slotGameInfo.nextEXBonusTimes) >= 10 ? this.drawInfoStr[1].string = "0" + c : c >= 0 && (this.drawInfoStr[1].string = "00" + c) : this.drawInfoStr[1].string = ":::";
      }
      refreshCountdownTime() {
        var c, t, i;
        t = cc.pvz.PlayerData.getSlotGameDrawTimes(0);
        i = cc.pvz.PlayerData.getSlotGameDrawTimes(1);
        c = 0;
        t < 5 && (c = 5400 * (1 - (t - Math.floor(t))));
        t < 1 && i > 0 ? (this.btns[0].active = false, this.btns[1].active = true, this.drawTypeStr.string = "\u5e7f\u544a\u6b21\u6570", 
        this.drawInfoStr[0].string = "00" + Math.floor(i)) : (this.btns[0].active = true, 
        this.btns[1].active = false, this.drawTypeStr.string = "\u514d\u8d39\u6b21\u6570", 
        this.drawInfoStr[0].string = "00" + Math.floor(t));
        this.countDownStr.string = Tool_1.default.formatCountDown(Math.floor(c), true);
      }
      start() {
        var c, t;
        c = this;
        this.getRewardSpine[1].setCompleteListener(0, "", function() {});
        t = function() {
          c.rptCount++;
          c.rptCount < 5 || (c.getRewardSpine[1].node.active = false, c.getRewardSpine[0].setAnimation(0, "idle", true), 
          c.node.getChildByName("ClickMask").active = false, c.rptCount = 0);
        };
        this.getRewardSpine[0].setCompleteListener(0, "getRwd1", function() {
          t();
        });
        this.getRewardSpine[0].setCompleteListener(0, "getRwd2", function() {
          t();
        });
      }
      update(c) {
        this.displayDrawIdx >= 0 && (this.tCount += 1e3 * c, this.tCount > this.displayDrawTime[this.displayDrawIdx] && (this.tCount = 0, 
        this.moveSelectingGridTo(this.displayDrawIdx + 1), this.displayDrawIdx++, this.displayDrawIdx === this.displayDrawTime.length && this.getReward()));
        this.countDownTCount += c;
        this.countDownTCount >= 1 && (this.countDownTCount -= 1, this.refreshCountdownTime());
      }
    };
    __decorate([ property(SpineCtrl_1.default) ], SlotsWindow.prototype, "getRewardSpine", void 0);
    __decorate([ property(cc.Prefab) ], SlotsWindow.prototype, "gridPre", void 0);
    __decorate([ property(cc.Node) ], SlotsWindow.prototype, "gridPos", void 0);
    __decorate([ property(SpineCtrl_1.default) ], SlotsWindow.prototype, "selectingGrid", void 0);
    __decorate([ property(cc.Label) ], SlotsWindow.prototype, "drawTypeStr", void 0);
    __decorate([ property(cc.Label) ], SlotsWindow.prototype, "drawInfoStr", void 0);
    __decorate([ property(cc.Label) ], SlotsWindow.prototype, "countDownStr", void 0);
    __decorate([ property(cc.Node) ], SlotsWindow.prototype, "btns", void 0);
    SlotsWindow = __decorate([ ccclass ], SlotsWindow);
    exports.default = SlotsWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./RedPointManager": "RedPointManager",
    "./SlotGrid": "SlotGrid",
    "./SpineCtrl": "SpineCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  SpineCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25355fWTSlETYMwuMmjM+cO", "SpineCtrl");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let SpineCtrl = class SpineCtrl extends cc.Component {
      constructor() {
        super(...arguments);
        this.spineHandle = null;
        this.spineHandleSDS = null;
        this.completeListeners = [];
        this.defaultCompleteListeners = [];
        this.eventListeners = {};
        this.bones = {};
      }
      pause() {}
      resume() {}
      lockBoneHandle(c) {
        this.bones[c] = this.spineHandle.findBone(c);
      }
      setBoneHandleTo(c, t, i) {
        var n;
        n = this.spineHandle.node.convertToNodeSpaceAR(t.convertToWorldSpaceAR(i));
        this.bones[c].x = n.x;
        this.bones[c].y = n.y;
      }
      setBoneHandleToBone(c, t, i, n) {
        var e, s;
        e = t.getBoneHandleWorldPos(i, null);
        s = this.spineHandle.node.convertToNodeSpaceAR(new cc.Vec2(e.x + n.x, e.y + n.y));
        this.bones[c].x = s.x;
        this.bones[c].y = s.y;
      }
      getBoneNode() {}
      setNodeToBoneHandle() {}
      getBoneHandleWorldPos(c) {
        return this.node.convertToWorldSpaceAR(new cc.Vec2(this.bones[c].x, this.bones[c].y));
      }
      getBoneHandleScenePos(c, t) {
        return void 0 === t && (t = cc.Vec2.ZERO), cc.find("Canvas").convertToNodeSpaceAR(this.getBoneHandleWorldPos(c, t));
      }
      setSkeletonData(c, t) {
        void 0 === t && (t = true);
        this.spineHandle.skeletonData = c;
        t && (this.completeListeners = [], this.defaultCompleteListeners = [], this.eventListeners = {});
      }
      setSkeletonDataByIdx(c, t) {
        void 0 === t && (t = true);
        this.setSkeletonData(this.spineHandleSDS[c], t);
      }
      setTimeScale() {}
      setAnimation(c, t, i, n) {
        var e;
        e = this;
        void 0 === n && (n = null);
        this.spineHandle.setAnimation(c, t, i);
        n && (this.completeListeners[c] || (this.completeListeners[c] = {}), this.completeListeners[c][t] = function() {
          n();
          delete e.completeListeners[c][t];
        });
      }
      setAnimations(c, t, i, n) {
        var e, s;
        e = this;
        void 0 === n && (n = null);
        this.spineHandle.setAnimation(c, t[0], false);
        for (var v = 1; v < t.length; v++) this.spineHandle.addAnimation(c, t[v], v === t.length - 1 && i);
        n && (this.completeListeners[c] || (this.completeListeners[c] = {}), s = t[t.length - 1], 
        this.completeListeners[c][s] = function() {
          n();
          delete e.completeListeners[c][s];
        });
      }
      clearTrack(c) {
        this.spineHandle.clearTrack(c);
        this.spineHandle.setToSetupPose();
      }
      clearAllTrack() {
        this.spineHandle.clearTracks();
        this.spineHandle.setToSetupPose();
      }
      setCompleteListener(c, t, i) {
        for (var o = this.completeListeners.length; o <= c; o++) this.completeListeners[o] = {};
        0 === t.length ? this.defaultCompleteListeners[c] = i : this.completeListeners[c][t] = i;
      }
      setCompleteListeners(c, t, i) {
        for (var o = this.completeListeners.length; o <= c; o++) this.completeListeners[o] = {};
        for (o = 0; o < t.length; o++) this.completeListeners[c][t[o]] = i;
      }
      setEventListener(c, t) {
        this.eventListeners[c] = t;
      }
      start() {
        var c;
        c = this;
        this.completeListeners.push({});
        this.spineHandle.setCompleteListener(function(t) {
          c.completeListeners[t.trackIndex] || (c.completeListeners[t.trackIndex] = {});
          c.completeListeners[t.trackIndex][t.animation.name] ? c.completeListeners[t.trackIndex][t.animation.name](t) : c.defaultCompleteListeners[t.trackIndex] && c.defaultCompleteListeners[t.trackIndex](t);
        });
        this.spineHandle.setEventListener(function(t, i) {
          var n = i && i.data ? i.data.name : t && t.data ? t.data.name : "";
          n && c.eventListeners[n] && c.eventListeners[n](t, i);
        });
      }
    };
    __decorate([ property(sp.Skeleton) ], SpineCtrl.prototype, "spineHandle", void 0);
    __decorate([ property(sp.SkeletonData) ], SpineCtrl.prototype, "spineHandleSDS", void 0);
    SpineCtrl = __decorate([ ccclass ], SpineCtrl);
    exports.default = SpineCtrl;
    cc._RF.pop();
  }, {} ],
  StaminaAdGetWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f451ftQRF5P8ahVemwxKL5T", "StaminaAdGetWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const NetworkManager_1 = require("../main/NetworkManager");
    const RedPointManager_1 = require("./RedPointManager");
    const EnabledBtn_1 = require("./EnabledBtn");
    const SpineCtrl_1 = require("./SpineCtrl");
    const Tool_1 = require("./Tool");
    const e = require("./SubwindowManager");
    var C, M, B, O, N;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var j = 1;
    let StaminaAdGetWindow = class StaminaAdGetWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.remainTimes = null;
        this.getBtn = null;
        this.freeBonusNode = null;
        this.freeBonusTexts = null;
        this.freeBonusGetBtn = null;
        this.nextGetTime = null;
        this.boxSpine = null;
        this.timeTextColors = new cc.Color(255, 255, 255, 255);
      }
      init() {}
      show() {
        cc.pvz.PlayerData.resetDailyData();
        this.refresh();
      }
      refresh() {
        var c, t, i, n, C = "18:00", M = "22:00", B = "Times", O = "hefan1", N = "hefan2_loop";
        if (this.remainTimes.string = "" + (5 - cc.player.staminaAdGet.times), this.getBtn.getComponent(EnabledBtn_1.default).setEnable(cc.player.staminaAdGet.times < 5), 
        this.freeBonusNode.active = 1e3 * cc.player.levelProg[0] + cc.player.levelProg[1] >= 12450, 
        this.freeBonusNode.active) if (i = Tool_1.default.canGetFreeStamina(), t = Math.floor(i / 10), 
        c = i % 10, this.freeBonusTexts.map(function(c) {
          return c.active = false;
        }), n = [ [ "06:00", "10:00" ], [ "11:00", "14:00" ], [ C, M ], [ C, M ] ], 1 === c) if (0 === cc.player.freeAdGet[t - 1]) {
          this.freeBonusGetBtn.active = true;
          this.freeBonusTexts[1].active = true;
          this.freeBonusTexts[1].getChildByName(B).getComponent(cc.Label).string = n[t - 1][0] + "~" + n[t - 1][1];
          this.boxSpine.setAnimation(0, O, true);
        } else {
          this.freeBonusGetBtn.active = false;
          this.freeBonusTexts[0].active = true;
          for (var j = 1; j <= 3; j++) {
            var G;
            G = 3 === t ? 1 : t + 1;
            this.freeBonusTexts[0].getChildByName("t" + j).color = this.timeTextColors[j === G ? 1 : 0];
          }
          this.boxSpine.setAnimation(0, N, true);
        } else if (2 === c) if (0 === cc.player.freeAdGet[t - 1]) {
          this.freeBonusGetBtn.active = true;
          this.freeBonusTexts[2].active = true;
          this.freeBonusTexts[2].getChildByName(B).getComponent(cc.Label).string = n[t - 1][0] + "~" + n[t - 1][1];
          this.boxSpine.setAnimation(0, O, true);
        } else {
          for (this.freeBonusGetBtn.active = false, this.freeBonusTexts[0].active = true, 
          j = 1; j <= 3; j++) {
            G = t >= 3 ? 1 : t + 1;
            this.freeBonusTexts[0].getChildByName("t" + j).color = this.timeTextColors[j === G ? 1 : 0];
          }
          this.boxSpine.setAnimation(0, 1 === cc.player.freeAdGet[t - 1] ? N : "hefan3_loop", true);
        }
      }
      getStamina() {
        var c;
        c = this;
        this.getBtn.getComponent(EnabledBtn_1.default).flag && cc.pvz.AdUtils.willShowAdRewardVideo(cc.pvz.GameConst.AdType["\u83b7\u53d6\u4f53\u529b"], function(t) {
          var h = 25;
          t && (cc.pvz.PlayerData.itemNum(4, h), cc.player.staminaAdGet.times++, cc.SubwindowManager.showWindow(e.UIStatus.GetItem, {
            items: [ 1, 4, h ],
            showFlyTo: 1
          }), cc.pvz.PlayerData.saveData(), c.hide());
        });
      }
      getFreeStamina() {
        var c;
        c = this;
        this.freeBonusGetBtn.active && NetworkManager_1.default.timeCheck(function() {
          var t, i, n;
          cc.find("Canvas/ClickMask").active = true;
          n = Tool_1.default.canGetFreeStamina();
          i = Math.floor(n / 10);
          t = n % 10;
          c.freeStaIdx = i - 1;
          1 === t ? c.boxSpine.setAnimation(0, "hefan2", false, function() {
            c.boxSpine.setAnimation(0, "hefan2_loop", true);
          }) : c.boxSpine.setAnimation(0, "hefan3", false, function() {
            cc.find("Canvas/ClickMask").active = false;
            cc.player.freeAdGet[c.freeStaIdx] = -1;
            c.refresh();
          });
        }, function() {
          cc.popupManager.showToast("\u7f51\u7edc\u8fde\u63a5\u5931\u8d25");
        });
      }
      hide() {
        cc.SubwindowManager.hideWindow(e.UIStatus.StaminaAdGet);
      }
      start() {
        var c;
        c = this;
        this.boxSpine.setEventListener("end", function() {
          cc.find("Canvas/ClickMask").active = false;
          cc.pvz.PlayerData.getRewardBonus(1, 4, 10);
          cc.player.freeAdGet[c.freeStaIdx] = 1;
          cc.SubwindowManager.showWindow(e.UIStatus.GetItem, {
            items: [ 1, 4, 10 ],
            showFlyTo: 1
          });
          c.refresh();
          RedPointManager_1.default.check("FreeStamina");
          cc.pvz.PlayerData.saveData();
        });
      }
    };
    __decorate([ property(cc.Label) ], StaminaAdGetWindow.prototype, "remainTimes", void 0);
    __decorate([ property(cc.Node) ], StaminaAdGetWindow.prototype, "getBtn", void 0);
    __decorate([ property(cc.Node) ], StaminaAdGetWindow.prototype, "freeBonusNode", void 0);
    __decorate([ property(cc.Node) ], StaminaAdGetWindow.prototype, "freeBonusTexts", void 0);
    __decorate([ property(cc.Node) ], StaminaAdGetWindow.prototype, "freeBonusGetBtn", void 0);
    __decorate([ property(cc.Label) ], StaminaAdGetWindow.prototype, "nextGetTime", void 0);
    __decorate([ property(SpineCtrl_1.default) ], StaminaAdGetWindow.prototype, "boxSpine", void 0);
    __decorate([ property(cc.Color) ], StaminaAdGetWindow.prototype, "timeTextColors", void 0);
    StaminaAdGetWindow = __decorate([ ccclass ], StaminaAdGetWindow);
    exports.default = StaminaAdGetWindow;
    cc._RF.pop();
  }, {
    "../main/NetworkManager": "NetworkManager",
    "./EnabledBtn": "EnabledBtn",
    "./RedPointManager": "RedPointManager",
    "./SpineCtrl": "SpineCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  StaminaFreeGetWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2c09czOSHNNULJnC4Xct//i", "StaminaFreeGetWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const NetworkManager_1 = require("../main/NetworkManager");
    const Tool_1 = require("./Tool");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let StaminaFreeGetWindow = class StaminaFreeGetWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.label = null;
        this.text = null;
      }
      init() {}
      show() {
        this.refresh();
      }
      refresh() {
        Tool_1.default.canGetFreeStamina();
      }
      getStamina() {
        var c;
        c = this;
        NetworkManager_1.default.timeCheck(function() {
          c.refresh();
        }, function() {});
      }
      hide() {}
      start() {}
    };
    __decorate([ property(cc.Label) ], StaminaFreeGetWindow.prototype, "label", void 0);
    __decorate([ property ], StaminaFreeGetWindow.prototype, "text", void 0);
    StaminaFreeGetWindow = __decorate([ ccclass ], StaminaFreeGetWindow);
    exports.default = StaminaFreeGetWindow;
    cc._RF.pop();
  }, {
    "../main/NetworkManager": "NetworkManager",
    "./Tool": "Tool"
  } ],
  StaminaPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "429ecjAVbdDiIfmaNXLG8WP", "StaminaPanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Tool_1 = require("./Tool");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let StaminaPanel = class StaminaPanel extends cc.Component {
      constructor() {
        super(...arguments);
        this.valueStr = null;
        this.countDownStr = null;
      }
      refresh() {
        var c;
        c = cc.pvz.PlayerData.staminaValue();
        this.valueStr.string = Math.floor(c[0]) + "/" + c[1];
        c[2] > 0 ? (this.countDownStr.node.active = true, this.countDownStr.string = "" + Tool_1.default.formatCountDown(Math.floor(c[2]))) : this.countDownStr.node.active = false;
      }
      start() {
        this.refresh();
      }
      update(c) {
        this.tCount += c;
        this.tCount >= 1 && (this.refresh(), this.tCount = 0);
      }
    };
    __decorate([ property(cc.Label) ], StaminaPanel.prototype, "valueStr", void 0);
    __decorate([ property(cc.Label) ], StaminaPanel.prototype, "countDownStr", void 0);
    StaminaPanel = __decorate([ ccclass ], StaminaPanel);
    exports.default = StaminaPanel;
    cc._RF.pop();
  }, {
    "./Tool": "Tool"
  } ],
  SubwindowManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0f332rQD9hKN78kyYyP/SMs", "SubwindowManager");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UIStatus = void 0;
    exports.UIStatus = {
      AdTicket: "AdTicket",
      AdBuff: "AdBuff",
      Alert: "Alert",
      Archieve: "Archieve",
      Auth: "Auth",
      CDKey: "CDKey",
      ClearData: "ClearData",
      EquipDecomp: "EquipDecomp",
      EquipInfo: "EquipInfo",
      EquipStageInfo: "EquipStageInfo",
      ExitLevelBonus: "ExitLevelBonus",
      GameClub: "GameClub",
      GetItem: "GetItem",
      GetNewSkin: "GetNewSkin",
      GetNewSkill: "GetNewSkill",
      GetSkin: "GetSkin",
      GoldStageInfo: "GoldStageInfo",
      GrowRoad: "GrowRoad",
      GrowRoadUnlock: "GrowRoadUnlock",
      Invite: "Invite",
      InviteKey: "InviteKey",
      ItemInfo: "ItemInfo",
      Lab: "Lab",
      LabInfo: "LabInfo",
      Mail: "Mail",
      MailInfo: "MailInfo",
      MailInfo2: "MailInfo2",
      MetaStageInfo: "MetaStageInfo",
      Patrol: "Patrol",
      PreGame: "PreGame",
      ProInfoAll: "ProInfoAll",
      QRCode: "QRCode",
      Ranklist: "Ranklist",
      RankUser: "RankUser",
      Set: "Set",
      Shop: "Shop",
      Sign: "Sign",
      SkillInfo: "SkillInfo",
      SkinPro: "SkinPro",
      Slots: "Slots",
      StaminaAdGet: "StaminaAdGet",
      TowerSetInfo: "TowerSetInfo",
      Weapon: "Weapon",
      WeaponGet: "WeaponGet",
      WeaponInfo: "WeaponInfo",
      WeaponPro: "WeaponPro"
    };
    var PREFAB_MAP = {
      AdTicket: [ "subwindowPre/ADj_tip", "AdTicketWindow" ],
      AdBuff: [ "subwindowPre/blessing", "AdBuffWindow" ],
      Alert: [ "subwindowPre/UItips", "AlertWindow" ],
      Archieve: [ "subwindowPre/Achievement", "ArchieveWindow" ],
      Auth: [ "subwindowPre/shouquan", "AuthWindow" ],
      CDKey: [ "subwindowPre/cdk", "CDKeyWindow" ],
      ClearData: [ "subwindowPre/del", "ClearDataWindow" ],
      EquipDecomp: [ "subwindowPre/equip_disassemble", "EquipDecompWindow" ],
      EquipInfo: [ "subwindowPre/equip_info", "EquipInfoWindow" ],
      EquipStageInfo: [ "subwindowPre/challenge_info", "EquipStageInfoWindow" ],
      ExitLevelBonus: [ "subwindowPre/BatContinue", "ExitLevelBonusWindow" ],
      GameClub: [ "subwindowPre/GameCircle", "GameClubWindow" ],
      GetItem: [ "subwindowPre/GetItem", "GetItemWindow" ],
      GetNewSkin: [ "subwindowPre/zhaomu_new", "GetNewSkinWindow" ],
      GetNewSkill: [ "subwindowPre/GetNewSkill", "GetNewSkillWindow" ],
      GetSkin: [ "subwindowPre/zhaomu", "GetSkinWindow" ],
      GoldStageInfo: [ "subwindowPre/challenge_info2", "GoldStageInfoWindow" ],
      GrowRoad: [ "subwindowPre/GrowupRoad", "GrowRoadWindow" ],
      GrowRoadUnlock: [ "subwindowPre/GrowupRoadTip", "GrowRoadUnlockWindow" ],
      Invite: [ "subwindowPre/Invitation", "InviteWindow" ],
      InviteKey: [ "subwindowPre/Invitation_cdk", "InviteKeyWindow" ],
      ItemInfo: [ "subwindowPre/ItemInfo", "ItemInfoWindow" ],
      Lab: [ "subwindowPre/Idle", "LabWindow" ],
      LabInfo: [ "subwindowPre/idle_info", "LabInfoWindow" ],
      Mail: [ "subwindowPre/mail", "MailWindow" ],
      MailInfo: [ "subwindowPre/mailinfo", "MailInfoWindow" ],
      MailInfo2: [ "subwindowPre/mailinfo2", "MailInfo2Window" ],
      MetaStageInfo: [ "subwindowPre/FormationInfo", "MetaStageInfoWindow" ],
      Patrol: [ "subwindowPre/Patrol", "PatrolWindow" ],
      PreGame: [ "subwindowPre/Over_Main", "PreGameWindow" ],
      ProInfoAll: [ "subwindowPre/hero_attribute", "ProInfoAllWindow" ],
      QRCode: [ "subwindowPre/code", "QRCodeWindow" ],
      Ranklist: [ "subwindowPre/Rank", "RanklistWindow" ],
      RankUser: [ "subwindowPre/RankInfo", "RankUserWindow" ],
      Set: [ "subwindowPre/setting", "SetWindow" ],
      Shop: [ "subwindowPre/shop", "ShopWindow" ],
      Sign: [ "subwindowPre/Sign", "SignWindow" ],
      SkillInfo: [ "subwindowPre/SkillInfo", "SkillInfoWindow" ],
      SkinPro: [ "subwindowPre/hero2_attribute", "SkinProWindow" ],
      Slots: [ "subwindowPre/spin", "SlotsWindow" ],
      StaminaAdGet: [ "subwindowPre/power", "StaminaAdGetWindow" ],
      TowerSetInfo: [ "subwindowPre/equip_perk", "TowerSetInfoWindow" ],
      Weapon: [ "subwindowPre/weapon", "WeaponWindow" ],
      WeaponGet: [ "subwindowPre/GetWeapon", "WeaponGetWindow" ],
      WeaponInfo: [ "subwindowPre/WeaponInfo", "WeaponInfoWindow" ],
      WeaponPro: [ "subwindowPre/weapon_attribute", "WeaponProWindow" ]
    };
    const {ccclass: ccclass} = cc._decorator;
    let SubwindowManager = class SubwindowManager extends cc.Component {
      onLoad() {
        cc.SubwindowManager = this;
        this._windows = {};
      }
      showWindow(status, params) {
        var self = this;
        var entry = PREFAB_MAP[status];
        if (!entry) return void console.warn("SubwindowManager: unknown UIStatus", status);
        var prefabPath = entry[0];
        var compName = entry[1];
        if (this._windows[status]) {
          var comp = this._windows[status].getComponent(compName);
          comp && comp.show && comp.show(params);
          return;
        }
        cc.pvz.utils.useBundleAsset("lobby", prefabPath, cc.Prefab, function(prefab) {
          var node = cc.instantiate(prefab);
          node.parent = self.node.parent;
          node.zIndex = cc.macro.MAX_ZINDEX - 10;
          self._windows[status] = node;
          var comp = node.getComponent(compName);
          comp && comp.show && comp.show(params);
        });
      }
      hideWindow(status) {
        var node = this._windows[status];
        if (node) {
          node.destroy();
          delete this._windows[status];
        }
      }
      getWindowHandle(status) {
        return this._windows[status] || null;
      }
      onDestroy() {
        cc.SubwindowManager === this && (cc.SubwindowManager = null);
      }
    };
    SubwindowManager = __decorate([ ccclass ], SubwindowManager);
    exports.default = SubwindowManager;
    cc._RF.pop();
  }, {} ],
  TAUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e3acb77MT1DP6aUvE7gVltW", "TAUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MyRequest_1 = require("./MyRequest");
    const NetworkManager_1 = require("./NetworkManager");
    cc.gameGlobalConfig || (cc.gameGlobalConfig = {});
    var h;
    var m = "default";
    [ m ];
    [ m ];
    y = (require("./GameConst"), {
      init: function() {},
      subscribeWxMessage: function(t) {
        if (window.wx) {
          var e = cc.pvz.GameConst.SUBSCRIBE_TEMPID[t];
          console.log(e);
          wx.requestSubscribeMessage({
            tmplIds: [ e ],
            success: function(n) {
              console.log("Here:", n);
              "requestSubscribeMessage:ok" === n.errMsg && n[e] && "accept" === n[e] && NetworkManager_1.default.subscribe(t, 1, function() {
                cc.popupManager.showToast("\u5df2\u6210\u529f\u8ba2\u9605");
              });
            },
            fail: function(t) {
              console.error("wx requestSubscribeMessage fail:", t);
              cc.popupManager.showToast("\u8ba2\u9605\u5931\u8d25");
            }
          });
        }
      },
      initShareConfig: function() {
        cc.sys.platform == cc.sys.WECHAT_GAME && (wx.onShareAppMessage(function() {
          var o = cc.math.randomRangeInt(0, cc.pvz.GameConst.SHARE_IDS.length);
          return {
            imageUrl: cc.pvz.GameConst.SHARE_URLS[o],
            imageUrlId: cc.pvz.GameConst.SHARE_IDS[o]
          };
        }), wx.showShareMenu({
          withShareTicket: true,
          menus: [ "shareAppMessage", "shareTimeline" ]
        }));
      },
      share: function(t) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
          var v = cc.math.randomRangeInt(0, cc.pvz.GameConst.SHARE_IDS.length), h = {
            query: "fromUid=" + MyRequest_1.default.userInfo.uid,
            imageUrl: cc.pvz.GameConst.SHARE_URLS[v],
            imageUrlId: cc.pvz.GameConst.SHARE_IDS[v]
          };
          this.isFromShare = true;
          this.shareCB = t;
          wx.shareAppMessage(h);
        } else t(true);
      },
      onWxShow: function() {
        this.isFromShare && this.shareCB && this.shareCB();
        this.isFromShare = false;
      },
      getGlobalConfig: function() {
        return cc.pvz.utils.sendMsg(cc.pvz.GameConst.SERVER_CONFIG_URL, null, "GET").then(function(t) {
          return Promise.resolve(t);
        })["catch"](function(t) {
          return console.log("getGlobalConfig data error", t), Promise.resolve({});
        });
      },
      getSwitch: function(t) {
        var o = cc.gameGlobalConfig.buttonCfgList ? cc.gameGlobalConfig.buttonCfgList.find(function(n) {
          return n.button_name == t;
        }) : null;
        return o ? (console.log("getSwitch", t, !!o.flag && 1 == o.flag), !!o.flag && 1 == o.flag) : (console.log("getSwitch using default", t, false), 
        false);
      },
      getAllAd: function() {
        return this.getSwitch("pvzall");
      },
      getPvzTwtraceidAd: function() {
        return this.getSwitch("pvztwtraceid") && (cc.player.isAllWhiteList || this.getTwtraceidSwitch(cc.pvz.GameConst.Twtraceid_YXBN) || this.getTwtraceidSwitch(cc.pvz.GameConst.Twtraceid_YXSP));
      },
      getPvz1095Ad: function() {
        return this.getSwitch("pvz1095") && (cc.player.isAllWhiteList || cc.pvz.AdUtils.isWhiteListSceneId());
      },
      checkWxScenceIdSwitch: function() {
        return true;
      },
      getSwitchGameAd: function() {
        return true;
      },
      getTwtraceidSwitch: function(t) {
        return void 0 === t && (t = "yxbn"), cc.sys.platform != cc.sys.WECHAT_GAME || (cc.Twtraceid = this.getTwtraceidFrom(wx.getLaunchOptionsSync()), 
        cc.Twtraceid == t);
      },
      getThreshold: function(t, n) {
        if (cc.gameGlobalConfig.valueCfgList) {
          var a = cc.gameGlobalConfig.valueCfgList.find(function(n) {
            return n.value_name == t;
          });
          if (a) return console.log("getThreshold", t, a.value_num), a.value_num;
        }
        return console.log("getThreshold using default", t, n), n;
      },
      userEnter: function() {},
      onCheckGameVersion: function() {
        if (console.log("onCheckGameVersion"), cc.sys.platform == cc.sys.WECHAT_GAME) {
          var u = wx.getUpdateManager();
          u.onCheckForUpdate(function(t) {
            console.log("\u8bf7\u6c42\u5b8c\u65b0\u7248\u672c\u4fe1\u606f\u7684\u56de\u8c03 : ", t.hasUpdate);
          });
          u.onUpdateReady(function() {
            wx.showModal({
              title: "\u66f4\u65b0\u63d0\u793a",
              content: "\u65b0\u7248\u672c\u5df2\u51c6\u5907\u5c31\u7eea\uff0c\u8bf7\u91cd\u542f\u6e38\u620f\uff01",
              confirmText: "\u91cd\u542f\u6e38\u620f",
              showCancel: false,
              success: function(t) {
                t.confirm && u.applyUpdate();
              }
            });
          });
          u.onUpdateFailed(function() {});
        } else if (cc.sys.platform == cc.sys.BYTEDANCE_GAME) {
          var s = tt.getUpdateManager();
          s.onCheckForUpdate(function(t) {
            console.log("\u8bf7\u6c42\u5b8c\u65b0\u7248\u672c\u4fe1\u606f\u7684\u56de\u8c03 : ", t.hasUpdate);
          });
          s.onUpdateReady(function() {
            tt.showModal({
              title: "\u66f4\u65b0\u63d0\u793a",
              content: "\u65b0\u7248\u672c\u5df2\u7ecf\u51c6\u5907\u597d\uff0c\u662f\u5426\u91cd\u542f\u5c0f\u6e38\u620f\uff1f",
              success: function(t) {
                t.confirm && s.applyUpdate();
              }
            });
          });
          s.onUpdateFailed(function(t) {
            console.log("\u7248\u672c\u4e0b\u8f7d\u5931\u8d25\u539f\u56e0", t);
          });
        }
      },
      getTwtraceidFrom: function(t) {
        if (Object.keys(t.query).length > 0) for (var c in t.query) {
          if ("?twtraceid" == c) return t.query[c];
          if ("twtraceid" == c) return t.query[c];
        }
        return "";
      },
      track: function(t, n) {
        cc.sys.platform == cc.sys.WECHAT_GAME ? wx.uma.trackEvent(t, n) : console.log("TGA:", t, n);
      },
      zlTrack: function(t, n) {
        window.zlGame && zlGame.track(t, n);
      },
      adId2WxAdId: function(t) {
        switch (t) {
         case 4:
          return 25;

         case 5:
          return 1;

         case 6:
          return 10;

         case 7:
          return 3;

         case 17:
          return 9;
        }
        return 13;
      },
      trackLogin: function(t) {
        this.userEnter(t);
        this.track("Login", {
          If_new: t ? 1 : 0
        });
      },
      trackLoading: function(t, n) {
        void 0 === n && (n = 0);
        cc.sys.platform == cc.sys.WECHAT_GAME && this.track("Loading", {
          loading_step: t,
          state: n
        });
      },
      trackLevel: function(t, n) {
        this.track("LevelBegan", {
          mode: t,
          level: n
        });
        0 == t && (cc.player.ad_cnt = 0, this.zlTrack("LEVEL_ENTER", {
          level_id: n
        }));
      },
      trackEndLevel: function(t, n, r) {
        if (this.track("Level", {
          mode: t,
          level: n,
          isWin: 0 == r ? 1 : 0
        }), 0 == t) {
          var a = [ "LEVEL_PASS", "LEVEL_LOSE", "LEVEL_EXIT" ][r];
          this.zlTrack(a, {
            level_id: n,
            ad_cnt: cc.player.ad_cnt
          });
        }
      },
      trackAdTicket: function() {},
      trackAdUIShow: function(t) {
        this.track("AdsExposure", {
          adsid: t
        });
        this.zlTrack("AD_PLACEMENT_SHOW", {
          ad_placement_name: this.adId2WxAdId(t)
        });
      },
      trackAdBtnClick: function(t) {
        this.track("AdsButtonClick", {
          adsid: t
        });
        this.zlTrack("AD_CLICK", {
          ad_placement_name: this.adId2WxAdId(t)
        });
      },
      trackAdClose: function(t, n) {
        this.trackAdEnd(t, n ? 0 : 1);
      },
      trackAdEnd: function(t, n) {
        this.track("AdsPlayRet", {
          adsid: t,
          playret: n
        });
        0 == n && this.zlTrack("AD_VIDEO_FINISH", {
          ad_placement_name: this.adId2WxAdId(t)
        });
      },
      trackReq: function(t, n, r) {
        if (0 != n) {
          var i = {
            url: t,
            status: n
          };
          r && (i.errMsg = r);
          this.track("Request", i);
        }
      },
      trackError: function(t) {
        cc.pvz.TAUtils.track("error", {
          msg: t
        });
      },
      trackWarn: function(t) {
        cc.pvz.TAUtils.track("warn", {
          msg: t
        });
      }
    });
    cc.pvz || (cc.pvz = {});
    cc.pvz.TAUtils = y;
    module.exports.exports = y;
    module.exports.default = module.exports;
    cc._RF.pop();
  }, {
    "./GameConst": "GameConst",
    "./MyRequest": "MyRequest",
    "./NetworkManager": "NetworkManager"
  } ],
  Tool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c5213ci9/dNKYZPmxGHCZ6E", "Tool");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const s = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const BpChange_1 = require("./BpChange");
    var r = "'";
    var Uc = "0", pn = "\u4e07";
    var n;
    var n = function() {
      let w;
      return w = function() {}, w.getPrefab = function(c, t, i) {
        var n;
        return (n = c.getChildByName(i)) || ((n = cc.instantiate(t)).setParent(c), n.name = i), 
        n.active = true, n;
      }, w.formatJson = function(c) {
        for (var n = {}, e = 0; e < c.json.length; e++) n[c.json[e].id] = c.json[e];
        return n;
      }, w.setValueTo = function(c, t, i) {
        var n;
        t > i && (n = t, t = i, i = n);
        return c < t ? t : c > i ? i : c;
      }, w.randomInt = function(c, t) {
        return Math.floor(Math.random() * (t - c + 1)) + c;
      }, w.randomRange = function(c, t) {
        return Math.random() * (t - c) + c;
      }, w.randomFloat = function(c, t) {
        return Math.random() * (t - c) + c;
      }, w.randomInts1 = function(c, t, i) {
        for (var n, o = []; r <= t; r++) o[r - c] = r;
        for (n = [], r = 0; r < i; r++) {
          var h;
          h = Math.floor(Math.random() * (o.length - r));
          n.push(o[h]);
          o[h] = o[o.length - 1 - r];
        }
        return n;
      }, w.randomFromArray = function(c, t) {
        if (void 0 === t && (t = 1), c.length <= t) return c;
        if (t <= 0) return [];
        if (1 === t) return [ c[w.randomInt(0, c.length - 1)] ];
        for (var e = [], s = c.map(function(c) {
          return c;
        }), o = 0; o < t; o++) {
          var r;
          r = Math.floor(Math.random() * (s.length - o));
          e.push(s[r]);
          s[r] = s[s.length - 1 - o];
        }
        return e;
      }, w.randomByWeight = function(c, t) {
        var i, n, e, s;
        void 0 === t && (t = []);
        i = [];
        n = 0;
        s = {};
        t.map(function(c) {
          s[c] = 1;
        });
        for (var u = 0; u < c.length; u++) s[u] || (i.push({
          idx: u,
          w: c[u]
        }), n += c[u]);
        for (e = Math.random() * n, u = 0; u < i.length; u++) {
          if (e < i[u].w) return i[u].idx;
          e -= i[u].w;
        }
        console.log("Tools.randombyWeight\u53d1\u751f\u672a\u77e5\u9519\u8bef\uff1a", i, n, e);
      }, w.randomIntsByWeight = function(c, t) {
        var i, n, e;
        if (c.length <= t) {
          for (var a = [], u = 0; u < c.length; u++) a.push(u);
          return a;
        }
        for (i = [], n = 0, u = 0; u < c.length; u++) {
          i.push({
            idx: u,
            w: c[u]
          });
          n += c[u];
        }
        for (e = [], u = 0; u < t; u++) for (var v = Math.random() * n, f = 0; f < i.length; f++) {
          if (v < i[f].w) {
            e.push(i[f].idx);
            n -= i[f].w;
            i[f].w = 0;
            break;
          }
          v -= i[f].w;
        }
        return e;
      }, w.getDist = function(c, t, i, n, e) {
        var s;
        return void 0 === e && (e = false), s = (c - i) * (c - i) + (t - n) * (t - n), e ? Math.sqrt(s) : s;
      }, w.isPointInRect = function(c, t, i, n, e, s) {
        return c >= i - e / 2 && c <= i + e / 2 && t >= n - s / 2 && t <= n + s / 2;
      }, w.outOfScreen = function(c, t, i) {
        var e = 320, s = 1e3;
        return void 0 === i && (i = 50), c < -i - e || c > i + e || t < -s - i || t > s + i;
      }, w.shuffle = function(c) {
        for (var n = 0; n < c.length; n++) {
          var e, s;
          e = Math.floor(Math.random() * (c.length - n)) + n;
          s = c[n];
          c[n] = c[e];
          c[e] = s;
        }
        return c;
      }, w.getAngleBy = function(c, t) {
        var i, n;
        return 0 === (n = c * c + t * t) ? 0 : (i = Math.acos(t / Math.sqrt(n)), c > 0 ? i : 2 * Math.PI - i);
      }, w.rotVectorByA = function(c, t) {
        var i, n, e, s, o;
        return s = t * Math.PI / 180, n = c.x, o = c.y, i = n * Math.cos(s) - o * Math.sin(s), 
        e = n * Math.sin(s) + o * Math.cos(s), new cc.Vec2(i, e);
      }, w.AnaDescStr = function(c) {
        for (var n = [], e = 1; e < arguments.length; e++) n[e - 1] = arguments[e];
        for (var s = "", o = 0; o < c.length; o++) "{" === c[o] ? (c[o + 3], s += n[parseInt(c[o + 1]) - 1], 
        o += 2) : s += c[o];
        return s;
      }, w.formatCountDown = function(c, t) {
        var i, n, e, s, h = 3600, a = 60;
        return void 0 === t && (t = false), n = Math.floor(c / h), s = Math.floor((c - h * n) / a), 
        n > 0 && (t = true), i = "", t && (i += (n < 10 ? Uc : "") + n + ":"), (i += (s < 10 ? Uc : "") + s + ":") + ((e = c - h * n - a * s) < 10 ? Uc : "") + e;
      }, w.formatNum = function(c) {
        var i = 1e4;
        if (Math.floor(c) === c) return c > i ? (c / i).toFixed(2) + pn : "" + c;
      }, w.formatNum2 = function(c) {
        var t, i, n, r = 1e9, h = 1e6, a = 1e3;
        return t = c, n = "", c >= r ? (t = c / r, n = "B") : c >= h ? (t = c / h, n = "M") : c >= a && (t = c / a, 
        n = "K"), i = "", t >= 100 ? i = "" + Math.floor(t) : i += t >= 10 ? t.toFixed(1) : t.toFixed(2), 
        i.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "") + n;
      }, w.showTip = function(c) {
        for (var t, n = [], e = 1; e < arguments.length; e++) n[e - 1] = arguments[e];
        (t = cc.find("Canvas/Tip").getComponent("Tip")).showTip.apply(t, __spreadArrays([ cc._decorator.ccclass ], n));
      }, w.today = function() {
        var c;
        return (c = new Date()).setHours(0, 0, 0, 0), c.getTime();
      }, w.toweek = function() {
        var c, t, i, n;
        return n = 0 === (c = (i = new Date()).getDay()) ? 6 : c - 1, (t = new Date(i)).setDate(i.getDate() - n), 
        t.setHours(0, 0, 0, 0), t.getTime();
      }, w.trancNumberToChar = function(c) {
        return this.nChar[c];
      }, w.getRicktextStr = function(c, t, i, n, e, s) {
        void 0 === i && (i = [ [ 0 ], [ 0 ] ]);
        void 0 === n && (n = [ "" ]);
        void 0 === e && (e = [ "" ]);
        void 0 === s && (s = [ "", "" ]);
        for (var h = "", a = 0; a < c.length; a++) if ("{" === c[a]) {
          var u, v;
          u = parseInt(c[a + 1]);
          h += s[0];
          v = i[u][t];
          "%" === e[u] && (v = w.formatNum2(v / 100));
          h += "" + (n[u] ? n[u] : "") + v + (e[u] ? e[u] : "");
          h += s[1];
          a += 2;
        } else h += c[a];
        return h;
      }, w.onSceneChange = function() {
        RedPointManager_1.default.reset();
        cc.MainUI = null;
      }, w.checkMissionEvent = function(c, t) {
        var i, s = 101, o = 503, r = 505, h = 507;
        return i = this, this.dailyMissionEvents[s] || ([ s, 481, o, r, h, 701, 611, 901, 103, 201, 621, 801, 803, 805, 1001, 1002, 1003, 1201, 1202, 1203, 1204, 1205, 1601, 1603, 1303, 482 ].map(function(c) {
          return i.dailyMissionEvents[c] = 1;
        }), [ 501, 502, o, 504, r, 506, h, 508, 702, 703, 911, 912, 913, 914, 915, 916, 917, 918, 641, 642, 643, 644, 645, 646, 647, 311, 202, 622, 623, 624, 625, 626, 627, 802, 807, 1004, 1211, 1212, 1213, 1214, 1215, 1602, 1604, 1302, 1301 ].map(function(c) {
          return i.archieveMissionEvents[c] = 1;
        })), 1 === c ? this.dailyMissionEvents[t] : 2 === c ? this.archieveMissionEvents[t] : void 0;
      }, w.isDungeonOn = function(c) {
        var t;
        return t = s.Datas.GrowRoadUnlockInfo[[ 7, 11, 18, 23, 24 ][c - 1]], 1e3 * cc.player.levelProg[0] + cc.player.levelProg[1] >= t.type2s;
      }, w.getMissionDesc = function(c, t) {
        var i;
        return i = s.Datas.TaskDesc[c].name, 641 === c ? i.replace(/\{0\}/g, "" + s.Datas.PlayerPro0[t].name) : i.replace(/\{0\}/g, "" + t);
      }, w.canGetSkill = function() {
        var c;
        for (var o in c = 0, s.Datas.Skill) cc.player.skillInfo[o] && 10 === cc.player.skillInfo[o][0] || c++;
        return c > 0;
      }, w.canGetWeapon = function() {
        var c;
        for (var e in c = 0, s.Datas.Weapon) cc.player.weaponInfo[e] && 10 === cc.player.weaponInfo[e][1] || c++;
        return c > 0;
      }, w.getDis = function(c, t, i, n) {
        return (c - t) * (c - t) + (i - n) * (i - n);
      }, w.pauseGame = function() {
        w.gamePause = 1;
      }, w.resumeGame = function() {
        w.gamePause = 0;
      }, w.randomFromArr = function(c) {
        return c[Math.floor(Math.random() * c.length)];
      }, w.randomFromArr2 = function(c, t) {
        if (c.length <= t) return c;
        if (t <= 0) return [];
        for (var e = [], s = c.map(function(c) {
          return c;
        }), o = 0; o < t; o++) {
          var r;
          r = Math.floor(Math.random() * (s.length - o));
          e.push(s[r]);
          s[r] = s[s.length - 1 - o];
        }
        return e;
      }, w.strHash = function(c) {
        for (var n = 0, e = 100000007, s = 0; s < c.length; s++) n = (233 * n + c.charCodeAt(s)) % e;
        return n % e;
      }, w.displayBPChange = function() {
        var c;
        0 === this.lastBp && (this.lastBp = cc.pvz.PlayerData.getFinalPro().bp);
        c = cc.pvz.PlayerData.getFinalPro().bp;
        this.lastBp !== c && (cc.MainUI && cc.MainUI.bpChange.getComponent(BpChange_1.default).show(this.lastBp, c), 
        this.lastBp = c);
      }, w.getEquipProScore = function(c) {
        for (var e = 0, o = 2; o < c.length; o += 2) {
          var r, h;
          r = s.Datas.EquipPro[c[o]];
          h = c[o + 1];
          e += r.p + h / (5 * h + 1);
        }
        return Math.floor(1e4 * e);
      }, w.canGetFreeStamina = function() {
        var t = 42, i = 11, n = 21, e = 22, s = 31;
        return [ t, t, t, t, t, t, i, i, i, i, 12, n, n, n, e, e, e, e, s, s, s, s, s, 32 ][new Date().getHours()];
      }, w.nChar = [ "\u96f6", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341" ], 
      w.dailyMissionEvents = {}, w.archieveMissionEvents = {}, w.gameTimeScale = 1, w.gamePause = 0, 
      w.lastBp = 0, w;
    }();
    exports.default = n;
    cc._RF.pop();
  }, {
    "./BpChange": "BpChange",
    "./ConfigCtrl": "ConfigCtrl",
    "./RedPointManager": "RedPointManager"
  } ],
  TowerProPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "90d87dZQQhIFZG1l70VkTtE", "TowerProPanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const a = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const Tool_1 = require("./Tool");
    var s, d, l, t, p, W;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var R = " ";
    var F = 0;
    var i = "touchState";
    let TowerProPanel = class TowerProPanel extends cc.Component {
      constructor() {
        super(...arguments);
        this.anim = null;
        this.nameStr = null;
        this.proStr = null;
        this.iconSpr = null;
        this.iconSFS = null;
        this.costSpr = null;
        this.costSFS = null;
        this.costStr = null;
        this.upgradeTimes = null;
        this.upgradeBtn = null;
      }
      initAsTower(c, t, i) {
        this.type = 1;
        this.tId = c;
        this.pId = t;
        this.par = i;
        this.nameStr.string = a.Datas.Config[1001].v[4 * (c - 1) + t];
        this.iconSpr.spriteFrame = this.iconSFS[a.Datas.Config[1003].v[4 * (c - 1) + t] - 1];
        this.proStr.string = Tool_1.default.formatNum2(cc.pvz.PlayerData.getTowerPro(this.tId, this.pId, cc.player.towerInfo["t" + this.tId][t])) + a.Datas.Config[1002].v[4 * (c - 1) + t];
        this.calLvUpTimes();
      }
      initAsPlayer(c, t, i) {
        this.type = 2;
        this.par = i;
        this.pId = c;
        this.costSpr.spriteFrame = this.costSFS[2];
        0 === this.pId ? this.nameStr.string = a.Datas.PlayerPro0[cc.player.baseProLv[this.pId]].name : (this.nameStr.string = a.Datas.Config[2001].v[c], 
        this.iconSpr.spriteFrame = this.iconSFS[a.Datas.Config[2003].v[c] - 1]);
        this.proStr.string = Tool_1.default.formatNum2(c <= 2 ? Math.floor(t) : t) + a.Datas.Config[2002].v[this.pId];
        this.calLvUpTimes();
      }
      initAsSkin(c, t, i) {
        var n;
        this.type = 3;
        this.par = i;
        this.sId = c;
        this.pId = t;
        this.costSpr.spriteFrame = this.costSFS[2];
        n = cc.pvz.PlayerData.getPlayerPro(t, cc.player.skinProLv[c][t]);
        t >= 4 && (n /= 100);
        this.proStr.string = Tool_1.default.formatNum2(t <= 2 ? Math.floor(n) : n) + a.Datas.Config[2002].v[this.pId];
        this.calLvUpTimes();
      }
      checkIfLvMax() {
        var e = 1e3, s = 261, d = "PlayerPro";
        if (1 === this.type) {
          if (cc.player.towerInfo["t" + this.tId][this.pId] >= [ [ e, s, 111, 411 ], [ e, s, 61, 31 ] ][this.tId - 1][this.pId]) return true;
        } else if (2 === this.type) {
          if (1 !== this.pId && 2 !== this.pId && 6 !== this.pId && !a.Datas[d + this.pId][cc.player.baseProLv[this.pId] + 1]) return true;
        } else if (3 === this.type && 1 !== this.pId && 2 !== this.pId && 6 !== this.pId && !a.Datas[d + this.pId][cc.player.skinProLv[this.sId][this.pId] + 1]) return true;
        return false;
      }
      calLvUpTimes() {
        var c, t, i, l = 2004;
        switch (1 === this.type ? this.checkIfLvMax() ? (this.upgradeBtn.active = false, 
        this.costStr.node.parent.active = false) : (this.lvUpCost = cc.pvz.PlayerData.getTowerLvUpCost(this.tId, this.pId, cc.player.towerInfo["t" + this.tId][this.pId]), 
        this.costSpr.spriteFrame = this.costSFS[this.tId - 1], this.costStr.string = "" + this.lvUpCost[2]) : 2 === this.type ? this.checkIfLvMax() ? (this.upgradeBtn.active = false, 
        this.costStr.node.parent.active = false) : (this.upgradeBtn.active = true, this.costStr.node.parent.active = true, 
        this.lvUpCost = cc.pvz.PlayerData.getPlayerLvUpCost(this.pId, cc.player.baseProLv[this.pId]), 
        this.costStr.string = Tool_1.default.formatNum2(this.lvUpCost[2])) : 3 === this.type && (this.checkIfLvMax() ? (this.upgradeBtn.active = false, 
        this.costStr.node.parent.active = false) : (this.upgradeBtn.active = true, this.costStr.node.parent.active = true, 
        this.lvUpCost = cc.pvz.PlayerData.getPlayerLvUpCost(this.pId, cc.player.skinProLv[this.sId][this.pId]), 
        this.costStr.string = Tool_1.default.formatNum2(this.lvUpCost[2]))), c = cc.pvz.PlayerData.itemNum(1 === this.type ? 1 === this.tId ? 36 : 37 : 2), 
        t = 0, i = 0, this.type) {
         case 1:
          t = cc.player.towerInfo["t" + this.tId][this.pId];
          i = a.Datas.Config[1004].v[4 * (this.tId - 1) + this.pId];
          break;

         case 2:
          t = cc.player.baseProLv[this.pId];
          i = a.Datas.Config[l].v[this.pId];
          break;

         case 3:
          t = cc.player.skinProLv[this.sId][this.pId];
          i = a.Datas.Config[l].v[this.pId];
        }
        for (var F = 0; t < i; t++) {
          var U;
          if (U = 0, 1 === this.type ? U = cc.pvz.PlayerData.getTowerLvUpCost(this.tId, this.pId, t)[2] : (2 === this.type || 3 === this.type) && (U = cc.pvz.PlayerData.getPlayerLvUpCost(this.pId, t)[2]), 
          !(c >= U)) break;
          F++;
          c -= U;
        }
        F > 0 ? (this.upgradeTimes.node.parent.active = true, this.upgradeTimes.string = "" + F) : this.upgradeTimes.node.parent.active = false;
      }
      doUpgrade() {
        var _ = 2002, p = 641, W = "PlayerProLvUp";
        if (cc.pvz.PlayerData.itemNum(this.lvUpCost[1]) >= this.lvUpCost[2]) {
          var V, H, J;
          if (cc.pvz.PlayerData.itemNum(this.lvUpCost[1], -this.lvUpCost[2]), V = "", 1 === this.type) {
            H = cc.pvz.PlayerData.getTowerPro(this.tId, this.pId, cc.player.towerInfo["t" + this.tId][this.pId]);
            J = cc.pvz.PlayerData.getTowerPro(this.tId, this.pId, cc.player.towerInfo["t" + this.tId][this.pId] + 1);
            V = Tool_1.default.formatNum2(J - H) + a.Datas.Config[1002].v[4 * (this.tId - 1) + this.pId];
            cc.player.towerInfo["t" + this.tId][this.pId]++;
            cc.pvz.PlayerData.increaseMissionProg(902, 1);
            this.par.showLvUpEff(this.tId);
            this.par.refreshTowerPanel();
          } else if (2 === this.type) {
            var K, Y, z;
            if (z = cc.pvz.PlayerData.getFinalPro().final, cc.player.baseProLv[this.pId]++, 
            Y = cc.pvz.PlayerData.getFinalPro().final, 0 === this.pId) for (var Q = 0; Q < a.Datas.Config[3].v.length; Q++) cc.player.baseProLv[this.pId] >= a.Datas.Config[3].v[Q] && -1 === cc.player.weaponUsing[Q] && (cc.player.weaponUsing[Q] = 0);
            K = Y[this.pId] - z[this.pId];
            1 !== this.pId && 2 !== this.pId || (K = Math.floor(K));
            V = Tool_1.default.formatNum2(K) + a.Datas.Config[_].v[this.pId];
            this.par.refreshAsPro();
            this.par.playEff();
            cc.pvz.PlayerData.increaseMissionProg(611, 1);
            cc.pvz.PlayerData.increaseMissionProg(621 + this.pId, 1);
            0 === this.pId ? cc.pvz.PlayerData.increaseMissionProg(p, cc.player.baseProLv[0], 1) : cc.pvz.PlayerData.increaseMissionProg(p + this.pId, 1);
            Tool_1.default.displayBPChange();
            RedPointManager_1.default.check(W);
          } else 3 === this.type && (z = cc.pvz.PlayerData.getPlayerPro(this.pId, cc.player.skinProLv[this.sId][this.pId]), 
          cc.player.skinProLv[this.sId][this.pId]++, K = (Y = cc.pvz.PlayerData.getPlayerPro(this.pId, cc.player.skinProLv[this.sId][this.pId])) - z, 
          this.pId >= 4 && (K /= 100), V = Tool_1.default.formatNum2(K) + a.Datas.Config[_].v[this.pId], 
          this.par.refreshAsSkin(), this.par.playEff2(), cc.pvz.PlayerData.increaseMissionProg(1301, 1), 
          cc.pvz.PlayerData.increaseMissionProg(1303, 1), Tool_1.default.displayBPChange(), 
          RedPointManager_1.default.check(W));
          this.par.showUpgradeNum(2 === this.type && 0 === this.pId ? "\u7cd6\u679c" : this.nameStr.string, V, this.proStr.node, 0, 20);
          cc.pvz.PlayerData.saveData();
        } else {
          var X;
          X = a.Datas.Tips[2].v.replace("{1}", a.Datas.Item[this.lvUpCost[1]].name);
          cc.popupManager.showToast(X);
        }
      }
      upgrade() {}
      start() {
        var c;
        c = this;
        this.upgradeBtn.on(cc.Node.EventType.TOUCH_START, function() {
          c.touchState = 1;
          c.touchTCount = 0;
        });
        this.upgradeBtn.on(cc.Node.EventType.TOUCH_END, function() {
          1 === c.touchState && c.doUpgrade();
          c.touchState = 0;
        });
        this.upgradeBtn.on(cc.Node.EventType.TOUCH_CANCEL, function() {
          1 === c.touchState && c.doUpgrade();
          c.touchState = 0;
        });
      }
      update(c) {
        this.touchState > 0 && (this.touchTCount += c, this.touchTCount >= .12 && (this.touchState = 2, 
        this.checkIfLvMax() ? this.touchState = 0 : (this.doUpgrade(), this.touchTCount = 0)));
      }
    };
    __decorate([ property(cc.Animation) ], TowerProPanel.prototype, "anim", void 0);
    __decorate([ property(cc.Label) ], TowerProPanel.prototype, "nameStr", void 0);
    __decorate([ property(cc.Label) ], TowerProPanel.prototype, "proStr", void 0);
    __decorate([ property(cc.Sprite) ], TowerProPanel.prototype, "iconSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], TowerProPanel.prototype, "iconSFS", void 0);
    __decorate([ property(cc.Sprite) ], TowerProPanel.prototype, "costSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], TowerProPanel.prototype, "costSFS", void 0);
    __decorate([ property(cc.Label) ], TowerProPanel.prototype, "costStr", void 0);
    __decorate([ property(cc.Label) ], TowerProPanel.prototype, "upgradeTimes", void 0);
    __decorate([ property(cc.Node) ], TowerProPanel.prototype, "upgradeBtn", void 0);
    TowerProPanel = __decorate([ ccclass ], TowerProPanel);
    exports.default = TowerProPanel;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./RedPointManager": "RedPointManager",
    "./Tool": "Tool"
  } ],
  TowerSetCard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d14b7eviSdNY6Kynos82Mle", "TowerSetCard");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const r = require("./ConfigCtrl");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let TowerSetCard = class TowerSetCard extends cc.Component {
      constructor() {
        super(...arguments);
        this.iconSpr = null;
        this.typeSpr = null;
        this.iconSFS = null;
        this.typeSFS = null;
        this.nameStr = null;
        this.lvStr = null;
      }
      init(c, t) {
        var i;
        i = r.Datas.TowerSet[c];
        this.nameStr.string = i.name;
        this.lvStr.string = "Lv." + t;
        this.iconSpr.spriteFrame = this.iconSFS[c - 1];
        this.typeSpr.spriteFrame = this.typeSFS[c - 1];
      }
      start() {}
    };
    __decorate([ property(cc.Sprite) ], TowerSetCard.prototype, "iconSpr", void 0);
    __decorate([ property(cc.Sprite) ], TowerSetCard.prototype, "typeSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], TowerSetCard.prototype, "iconSFS", void 0);
    __decorate([ property(cc.SpriteFrame) ], TowerSetCard.prototype, "typeSFS", void 0);
    __decorate([ property(cc.Label) ], TowerSetCard.prototype, "nameStr", void 0);
    __decorate([ property(cc.Label) ], TowerSetCard.prototype, "lvStr", void 0);
    TowerSetCard = __decorate([ ccclass ], TowerSetCard);
    exports.default = TowerSetCard;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl"
  } ],
  TowerSetInfoWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0d5c/yn+5LdbyrSFhAv1Dz", "TowerSetInfoWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const e = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    const r = require("./SubwindowManager");
    var b, x, B, N, t;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var j = 0;
    let TowerSetInfoWindow = class TowerSetInfoWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.sIcon = null;
        this.sIconSFS = null;
        this.SV = null;
        this.title = null;
        this.lvStr = null;
        this.skillDesc0 = null;
        this.skillDescStr = null;
        this.skillDescColors = new cc.Color(255, 255, 255, 255);
      }
      init() {}
      show(c) {
        void 0 === c && (c = {
          idx: 1,
          dLevel: 0
        });
        this.idx = c.idx;
        this.dLevel = c.dLevel ? c.dLevel : 0;
        this.SV.scrollToTop();
        this.showAsTowerSet(this.idx);
        this.inGame = false;
      }
      showAsTowerSet() {
        var c, t, b = "Lv.", x = "<color = ", B = "</c>", N = "Lv";
        t = e.Datas.TowerSet[this.idx];
        this.title.getComponent(cc.Label).string = t.name;
        this.sIcon.spriteFrame = this.sIconSFS[this.idx - 1];
        c = cc.player.towerInfo.set[this.idx - 1] + this.dLevel;
        this.lvStr.string = b + c;
        this.skillDesc0.string = Tool_1.default.getRicktextStr(t.desc, c - 1, t.valu, [], t.percent.map(function(c) {
          return c ? "%" : "";
        }), [ x + t.color + ">", B ]) + "\r\n" + Tool_1.default.getRicktextStr(t.desc2, c - 1, [ t.valu2 ], [ "+" ], [ "%" ], [ x + t.color + ">", B ]);
        for (var j = 0; j < t.valu[0].length; j++) {
          var W;
          (W = Tool_1.default.getPrefab(this.skillDescStr.parent, this.skillDescStr, "LvDesc" + (j + 1))).color = this.skillDescColors[j + 1 <= c ? 0 : 1];
          W.getComponent(cc.RichText).string = "";
          W.getComponent(cc.RichText).string = Tool_1.default.getRicktextStr(t.desc, j, t.valu, [], t.percent.map(function(c) {
            return c ? "%" : "";
          }), j + 1 <= c ? [ x + t.color + ">", B ] : [ "", "" ]) + "\r\n" + Tool_1.default.getRicktextStr(t.desc2, j, [ t.valu2 ], [ "+" ], [ "%" ], j + 1 <= c ? [ x + t.color + ">", B ] : [ "", "" ]);
          W.getChildByName(N).getComponent(cc.Label).string = b + (j + 1);
          W.getChildByName(N).color = this.skillDescColors[j + 1 <= c ? 0 : 1];
        }
      }
      hide() {
        this.inGame ? cc.popupManager.removePopup(this) : cc.SubwindowManager.hideWindow(r.UIStatus.TowerSetInfo);
      }
      start() {}
    };
    __decorate([ property(cc.Sprite) ], TowerSetInfoWindow.prototype, "sIcon", void 0);
    __decorate([ property(cc.SpriteFrame) ], TowerSetInfoWindow.prototype, "sIconSFS", void 0);
    __decorate([ property(cc.ScrollView) ], TowerSetInfoWindow.prototype, "SV", void 0);
    __decorate([ property(cc.Node) ], TowerSetInfoWindow.prototype, "title", void 0);
    __decorate([ property(cc.Label) ], TowerSetInfoWindow.prototype, "lvStr", void 0);
    __decorate([ property(cc.RichText) ], TowerSetInfoWindow.prototype, "skillDesc0", void 0);
    __decorate([ property(cc.Node) ], TowerSetInfoWindow.prototype, "skillDescStr", void 0);
    __decorate([ property(cc.Color) ], TowerSetInfoWindow.prototype, "skillDescColors", void 0);
    TowerSetInfoWindow = __decorate([ ccclass ], TowerSetInfoWindow);
    exports.default = TowerSetInfoWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  TowerSetPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "becf2rFE89HRbOQnErTwEdt", "TowerSetPanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const h = require("./ConfigCtrl");
    const s = require("./SubwindowManager");
    const Tool_1 = require("./Tool");
    const EffSpine_1 = require("./EffSpine");
    var x, B;
    const {ccclass: ccclass, property: property} = cc._decorator;
    var t = "idx";
    let TowerSetPanel = class TowerSetPanel extends cc.Component {
      constructor() {
        super(...arguments);
        this.anim = null;
        this.iconSpr = null;
        this.iconSFS = null;
        this.posSpr = null;
        this.posSFS = null;
        this.nameStr = null;
        this.showPanel = null;
        this.passiveStr = null;
        this.mainStr = null;
        this.lvStr = null;
        this.costBtn = null;
        this.costStr = null;
        this.lvUpEff = null;
      }
      init(c) {
        var t, x = "<color = ", B = "</c>";
        this.idx = c, cc.player.towerInfo.set[c - 1] > 0 ? (this.showPanel[0].active = true, 
        this.showPanel[1].active = false, this.lvStr.string = "Lv." + cc.player.towerInfo.set[c - 1], 
        cc.player.towerInfo.set[c - 1] >= h.Datas.Config[2].v.length + 1 ? this.costBtn.active = false : (this.costBtn.active = true, 
        this.costStr.string = "" + h.Datas.Config[2].v[cc.player.towerInfo.set[c - 1] - 1]), 
        this.iconSpr.spriteFrame = this.iconSFS[c - 1], this.posSpr[0].spriteFrame = this.posSFS[c - 1], 
        t = h.Datas.TowerSet[c], this.nameStr.string = t.name, this.passiveStr.string = Tool_1.default.getRicktextStr(t.desc2, cc.player.towerInfo.set[c - 1] - 1, [ t.valu2 ], [ "+" ], [ "%" ], [ x + t.color + ">", B ]), 
        this.mainStr.string = Tool_1.default.getRicktextStr(t.desc, cc.player.towerInfo.set[c - 1] - 1, t.valu, [], t.percent.map(function(c) {
          return c ? "%" : "";
        }), [ x + t.color + ">", B ])) : (this.showPanel[0].active = false, this.showPanel[1].active = true, 
        this.posSpr[1].spriteFrame = this.posSFS[c - 1]);
      }
      doUpgrade() {
        var c, t;
        c = h.Datas.Config[2].v[cc.player.towerInfo.set[this.idx - 1] - 1], cc.pvz.PlayerData.itemNum(3) >= c ? (cc.pvz.PlayerData.itemNum(3, -c), 
        cc.player.towerInfo.set[this.idx - 1]++, cc.pvz.PlayerData.increaseMissionProg(910 + this.idx, 1), 
        cc.pvz.PlayerData.saveData(), this.lvUpEff.getComponent(EffSpine_1.default).play(), 
        Tool_1.default.displayBPChange(), this.init(this.idx)) : (t = h.Datas.Tips[2].v.replace("{1}", h.Datas.Item[3].name), 
        cc.popupManager.showToast(t));
      }
      showInfo() {
        cc.SubwindowManager.showWindow(s.UIStatus.TowerSetInfo, {
          idx: this.idx
        });
      }
      start() {}
    };
    __decorate([ property(cc.Animation) ], TowerSetPanel.prototype, "anim", void 0);
    __decorate([ property(cc.Sprite) ], TowerSetPanel.prototype, "iconSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], TowerSetPanel.prototype, "iconSFS", void 0);
    __decorate([ property(cc.Sprite) ], TowerSetPanel.prototype, "posSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], TowerSetPanel.prototype, "posSFS", void 0);
    __decorate([ property(cc.Label) ], TowerSetPanel.prototype, "nameStr", void 0);
    __decorate([ property(cc.Node) ], TowerSetPanel.prototype, "showPanel", void 0);
    __decorate([ property(cc.RichText) ], TowerSetPanel.prototype, "passiveStr", void 0);
    __decorate([ property(cc.RichText) ], TowerSetPanel.prototype, "mainStr", void 0);
    __decorate([ property(cc.Label) ], TowerSetPanel.prototype, "lvStr", void 0);
    __decorate([ property(cc.Node) ], TowerSetPanel.prototype, "costBtn", void 0);
    __decorate([ property(cc.Label) ], TowerSetPanel.prototype, "costStr", void 0);
    __decorate([ property(cc.Node) ], TowerSetPanel.prototype, "lvUpEff", void 0);
    TowerSetPanel = __decorate([ ccclass ], TowerSetPanel);
    exports.default = TowerSetPanel;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./EffSpine": "EffSpine",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  UIADMiniGame: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3e7027UpLJPF5RcX3Tte/F1", "UIADMiniGame");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Tool_1 = require("./Tool");
    var o;
    var n;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let UIADMiniGame = class UIADMiniGame extends cc.Component {
      constructor() {
        super(...arguments);
        this.nextTime = null;
        this.adIcon = null;
        this.gongfuTitle = null;
        this.dragonTitle = null;
      }
      initBy(c) {
        this.miniGameType = c;
        this.gongfuTitle.active = 0 == this.miniGameType;
        this.dragonTitle.active = 1 == this.miniGameType;
        this.lTime = cc.player.miniGTimes[c];
        this.showCountDownTime();
        this.isLookAd = false;
      }
      playMiniGame() {
        this.isLookAd = true;
        0 == this.miniGameType ? cc.assetManager.loadBundle("Daifu", function(_c, t) {
          t && (Tool_1.default.onSceneChange(), cc.director.loadScene("Daifu"), cc.player.miniGTimes[0] = Date.now(), 
          cc.pvz.PlayerData.saveData());
        }) : cc.assetManager.loadBundle("Game3", function(_c, t) {
          t && (Tool_1.default.onSceneChange(), cc.director.loadScene("game3"), cc.player.miniGTimes[1] = Date.now(), 
          cc.pvz.PlayerData.saveData());
        });
      }
      onClickAd() {
        var c;
        c = this;
        this.isLookAd || (this.adIcon.active ? (this.isLookAd = true, cc.pvz.AdUtils.showAdRewardVideoOrTicket(cc.pvz.GameConst.AdType["\u5c0f\u6e38\u620f\u6e05\u9664CD"], function(t) {
          c.isLookAd = false;
          t && c.playMiniGame();
        })) : this.playMiniGame());
      }
      showCountDownTime() {
        var c, t, i, o = 60;
        (t = Math.floor(1800 - (Date.now() - this.lTime) / 1e3)) <= 0 ? (t = 0, this.adIcon.active = false) : this.adIcon.active = true;
        i = Math.floor(t / o);
        c = t % o;
        this.nextTime.string = i + ":" + (c < 10 ? Uc : "") + c;
      }
      onCloseUI() {
        this.isLookAd || cc.popupManager.removePopup(this);
      }
      update() {
        this.showCountDownTime();
      }
    };
    __decorate([ property(cc.Label) ], UIADMiniGame.prototype, "nextTime", void 0);
    __decorate([ property(cc.Node) ], UIADMiniGame.prototype, "adIcon", void 0);
    __decorate([ property(cc.Node) ], UIADMiniGame.prototype, "gongfuTitle", void 0);
    __decorate([ property(cc.Node) ], UIADMiniGame.prototype, "dragonTitle", void 0);
    UIADMiniGame = __decorate([ ccclass ], UIADMiniGame);
    exports.default = UIADMiniGame;
    cc._RF.pop();
  }, {
    "./Tool": "Tool"
  } ],
  UIDaifuOver: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4dff6LUSoJGmpypLVatLzfP", "UIDaifuOver");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let UIDaifuOver = class UIDaifuOver extends cc.Component {
      constructor() {
        super(...arguments);
        this.killLabel = null;
        this.maxKillLabel = null;
        this.snakeLabel = null;
        this.coinLabel = null;
        this.diamondLabel = null;
        this.coinItem = null;
        this.diamondItem = null;
      }
      initBy(c, t) {
        var i, n, e;
        this.type = c, this.killLabel.node.parent.active = 0 == this.type, this.maxKillLabel.node.parent.active = 0 == this.type, 
        this.snakeLabel.node.parent.active = 1 == this.type, this.rewardData = [ 0, 0 ], 
        0 == this.type ? (this.killLabel.string = t, this.rewardData = cc.DaifuControl.rewardData, 
        t > cc.player.maxDkill && (cc.player.maxDkill = t, cc.pvz.PlayerData.saveData()), 
        this.maxKillLabel.string = cc.player.maxDkill) : (this.snakeLabel.string = t, n = (n = t / 2) < 1 ? 1 : Math.floor(n), 
        this.rewardData[1] = n, i = (e = cc.player.levelProg[0]) * (.05 * e + 1) * 60 * t, 
        i = (i = Math.floor(i + 10)) < 1 ? 1 : i, this.rewardData[0] = i);
        this.coinLabel.string = this.rewardData[0];
        this.diamondLabel.string = this.rewardData[1];
        this.coinItem.active = this.rewardData[0] > 0;
        this.diamondItem.active = this.rewardData[1] > 0;
        this.isAding = false;
        cc.pvz.gameRewards = [];
      }
      addItemsAndClose(t) {
        var i, n;
        i = Math.ceil(this.rewardData[0]) * t;
        n = Math.ceil(this.rewardData[1]) * t;
        cc.pvz.PlayerData.itemNum(2, i);
        cc.pvz.PlayerData.itemNum(3, n);
        cc.pvz.PlayerData.saveData();
        (i > 0 || n > 0) && (i > 0 && cc.pvz.gameRewards.push({
          id: 2,
          count: i
        }), n > 0 && cc.pvz.gameRewards.push({
          id: 3,
          count: n
        }));
        cc.macro.ENABLE_MULTI_TOUCH = false;
        cc.assetManager.loadBundle("lobby", function() {
          require("./ConfigCtrl").default.isInit = false;
          cc.butler.loadScene("main");
        });
      }
      onClickClose() {
        this.isAding || (this.isAding = true, this.addItemsAndClose(1));
      }
      onClickAd() {
        var c;
        c = this;
        this.isAding || (this.isAding = true, cc.pvz.AdUtils.showAdRewardVideoOrTicket(cc.pvz.GameConst.AdType["\u5c0f\u6e38\u620f\u7ed3\u7b97\u53cc\u500d"], function(t) {
          c.isAding = false;
          t && c.addItemsAndClose(2);
        }));
      }
    };
    __decorate([ property(cc.Label) ], UIDaifuOver.prototype, "killLabel", void 0);
    __decorate([ property(cc.Label) ], UIDaifuOver.prototype, "maxKillLabel", void 0);
    __decorate([ property(cc.Label) ], UIDaifuOver.prototype, "snakeLabel", void 0);
    __decorate([ property(cc.Label) ], UIDaifuOver.prototype, "coinLabel", void 0);
    __decorate([ property(cc.Label) ], UIDaifuOver.prototype, "diamondLabel", void 0);
    __decorate([ property(cc.Node) ], UIDaifuOver.prototype, "coinItem", void 0);
    __decorate([ property(cc.Node) ], UIDaifuOver.prototype, "diamondItem", void 0);
    UIDaifuOver = __decorate([ ccclass ], UIDaifuOver);
    exports.default = UIDaifuOver;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl"
  } ],
  UIDaifuPause: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b4021v2nVZFyLQ7oGLbq8ct", "UIDaifuPause");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Tool_1 = require("./Tool");
    var i;
    const {ccclass: ccclass} = cc._decorator;
    let UIDaifuPause = class UIDaifuPause extends cc.Component {
      initBy(c) {
        this.type = c;
      }
      onClickClose() {
        0 == this.type ? cc.DaifuControl.onResumeGame() : Tool_1.default.resumeGame();
        cc.popupManager.removePopup(this);
      }
      onClickBack() {
        cc.popupManager.removePopup(this);
        cc.macro.ENABLE_MULTI_TOUCH = false;
        cc.assetManager.loadBundle("lobby", function() {
          require("./ConfigCtrl").default.isInit = false;
          cc.butler.loadScene("main");
        });
      }
    };
    UIDaifuPause = __decorate([ ccclass ], UIDaifuPause);
    exports.default = UIDaifuPause;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./Tool": "Tool"
  } ],
  UIGameBack: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1e536ElVd9E0L7AL3pT/Gaq", "UIGameBack");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass} = cc._decorator;
    let UIGameBack = class UIGameBack extends cc.Component {
      initBy(t) {
        this.scene = t;
      }
      onClickClose() {
        cc.popupManager.removePopup(this);
      }
      onClickBack() {
        this.scene.showFailUI(true);
        cc.popupManager.removePopup(this);
      }
    };
    UIGameBack = __decorate([ ccclass ], UIGameBack);
    exports.default = UIGameBack;
    cc._RF.pop();
  }, {} ],
  UIGameBuffItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "65aecbrHVJIf5xTvxEaMJWD", "UIGameBuffItem");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var b, M;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let UIGameBuffItem = class UIGameBuffItem extends cc.Component {
      constructor() {
        super(...arguments);
        this.quaSp = null;
        this.icon = null;
        this.nameLabel = null;
        this.descLabel = null;
        this.typeLabel = null;
        this.lvLabel = null;
        this.expLabel = null;
        this.expBar = null;
      }
      initBy(t, i, c, s) {
        this.scene = t;
        this.ui = i;
        this.json = s;
        var k = this.scene.getSkill(s.id), b = 0, M = 1;
        if (k) {
          b = k.lv;
          M = k.exp + 1;
        } else {
          var g = cc.player.skillInfo[s.id];
          b = g ? g[0] : 0;
          M = (g ? g[1] : 0) + 1;
        }
        var w = 0;
        if (b == this.scene.skillExpJsonFile.json.length + 1) w = 99999999; else if (b == this.scene.skillExpJsonFile.json.length) w = 20; else {
          var C = b + 1;
          w = this.scene.skillExpJsonFile.json.find(function(t) {
            return t.id == C;
          })["qua" + s.qua];
        }
        M >= w && (b += 1, M = 0);
        this.lv = b;
        this.exp = M;
        this.expNeed = w;
        this.fillNodes(this.scene, true, s, b, M);
      }
      fillNodes(t, i, c, s, h) {
        var L = "image";
        if (this.nameLabel.string = c.name, this.descLabel) {
          var P = 11 == s ? c.lv11 : c.valu.map(function(t) {
            return t[s - 1];
          });
          this.descLabel.string = cc.pvz.utils.formatStr(c.desc, P.map(function(t, i) {
            var a = 1 == c.percent[i] ? t / 100 : t;
            return 1 == c.percent[i] && (a = parseFloat(a.toFixed(2)) + "%"), "<color=" + c.color + ">" + a + "</c>";
          }));
        }
        if (this.typeLabel && (this.typeLabel.string = c.typeLab), this.lvLabel.string = cc.pvz.utils.numberToChinese(s) + ut, 
        s == t.skillExpJsonFile.json.length + 1) {
          this.expBar.progress = 1;
          this.expLabel.string = "\u5df2\u6ee1\u7ea7";
        } else {
          var I = 20;
          if (s < t.skillExpJsonFile.json.length) {
            var D = s + 1;
            I = t.skillExpJsonFile.json.find(function(t) {
              return t.id == D;
            })["qua" + c.qua];
          }
          this.expBar.progress = h / I;
          this.expLabel.string = h + "/" + I;
        }
        var F = [ 0, 2, 4, 5 ];
        i ? cc.pvz.utils.setSpriteFrame(this.quaSp, L, "pz/pz" + F[c.qua]) : cc.pvz.utils.setSpriteFrame(this.quaSp, L, "pz/SQua" + F[c.qua]);
        cc.pvz.utils.setSpriteFrame(this.icon, L, "skills/skill" + c.id);
      }
      onClickBuy() {
        this.scene.learnSkill(this.json.id, this.json);
        cc.popupManager.removePopup(this.ui);
      }
      onClickInfo() {
        cc.popupManager.popup("lobby", "subwindowPre/SkillInfo", "SkillInfoWindow", {
          scale: false
        }, 1, this.json.id, this.lv, this.exp, this.expNeed);
      }
    };
    __decorate([ property(cc.Sprite) ], UIGameBuffItem.prototype, "quaSp", void 0);
    __decorate([ property(cc.Sprite) ], UIGameBuffItem.prototype, "icon", void 0);
    __decorate([ property(cc.Label) ], UIGameBuffItem.prototype, "nameLabel", void 0);
    __decorate([ property(cc.RichText) ], UIGameBuffItem.prototype, "descLabel", void 0);
    __decorate([ property(cc.Label) ], UIGameBuffItem.prototype, "typeLabel", void 0);
    __decorate([ property(cc.Label) ], UIGameBuffItem.prototype, "lvLabel", void 0);
    __decorate([ property(cc.Label) ], UIGameBuffItem.prototype, "expLabel", void 0);
    __decorate([ property(cc.ProgressBar) ], UIGameBuffItem.prototype, "expBar", void 0);
    UIGameBuffItem = __decorate([ ccclass ], UIGameBuffItem);
    exports.default = UIGameBuffItem;
    cc._RF.pop();
  }, {} ],
  UIGameBuff: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c55epz2KlJlYa6wQfF9Boz", "UIGameBuff");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let UIGameBuff = class UIGameBuff extends cc.Component {
      constructor() {
        super(...arguments);
        this.buff0Node = null;
        this.adBtnNode = null;
      }
      initBy(t, i) {
        this.scene = t;
        this.items = [];
        for (var u = 0; u < 3; u++) {
          var f = this.buff0Node;
          u > 0 && ((f = cc.instantiate(this.buff0Node)).parent = this.buff0Node.parent);
          var v = f.getComponent("UIGameBuffItem");
          v.initBy(t, this, u, i[u]);
          this.items[u] = v;
        }
        this.adBtnNode.active = this.scene.funcId >= 34;
      }
      onClickRefresh() {
        var s = this;
        cc.pvz.AdUtils.showAdRewardVideoOrTicket(cc.pvz.GameConst.AdType["\u6218\u5c40\u79d8\u7c4d\u5237\u65b0"], function(t) {
          if (t) {
            var h = s.scene.randomSkills();
            s.items.forEach(function(t, i) {
              t.initBy(s.scene, s, i, h[i]);
            });
          }
        });
      }
    };
    __decorate([ property(cc.Node) ], UIGameBuff.prototype, "buff0Node", void 0);
    __decorate([ property(cc.Node) ], UIGameBuff.prototype, "adBtnNode", void 0);
    UIGameBuff = __decorate([ ccclass ], UIGameBuff);
    exports.default = UIGameBuff;
    cc._RF.pop();
  }, {} ],
  UIGameKt: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "96041puDohKq4ACff8K4qgR", "UIGameKt");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var kt = Math.E;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let UIGameKt = class UIGameKt extends cc.Component {
      constructor() {
        super(...arguments);
        this.iconSp = null;
        this.desc = null;
      }
      initBy(t, i) {
        this.scene = t;
        this.id = i;
        this.row = t.ktJsonFile.json.find(function(t) {
          return t.id == i;
        });
        this.desc.string = this.row.desc;
        cc.pvz.utils.setSpriteFrame(this.iconSp, "image", "kt/icon" + this.id);
      }
      onClickClose() {
        this.isAding || cc.popupManager.removePopup(this);
      }
      onClickAd() {
        var s = this;
        this.isAding || (this.isAding = true, cc.pvz.AdUtils.showAdRewardVideoOrTicket(cc.pvz.GameConst.AdType["\u7a7a\u6295"], function(t) {
          s.isAding = false;
          t && (s.scene.enableKt(s.row.id, s.row.v1), cc.popupManager.removePopup(s));
        }));
      }
    };
    __decorate([ property(cc.Sprite) ], UIGameKt.prototype, "iconSp", void 0);
    __decorate([ property(cc.Label) ], UIGameKt.prototype, "desc", void 0);
    UIGameKt = __decorate([ ccclass ], UIGameKt);
    exports.default = UIGameKt;
    cc._RF.pop();
  }, {} ],
  UIGameOver: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "632a571kPdJ7ogvhewf7tWG", "UIGameOver");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var J, U, Q, a, r, Y, $, tt, m, v;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let UIGameOver = class UIGameOver extends cc.Component {
      constructor() {
        super(...arguments);
        this.nameLabel = null;
        this.waveLabel = null;
        this.maxWaveLabel = null;
        this.coinRoot = null;
        this.coinLabel = null;
        this.diamondRoot = null;
        this.diamondLabel = null;
        this.rateRoot = null;
        this.rateLabel = null;
        this.adNode = null;
        this.buff1Name = null;
        this.buff2Name = null;
      }
      initBy(t, i) {
        var I = "name", J = this;
        this.scene = t;
        this.isSucc = 0 == i;
        this.coinRoot.active = false;
        this.diamondRoot.active = false;
        this.coinCount = cc.pvz.runtimeData.coin;
        this.coinCount > 0 && (this.coinRoot.active = true, this.coinCount *= cc.pvz.runtimeData.ktCoinRate, 
        this.coinLabel.string = cc.pvz.utils.formatNumInGame(Math.floor(this.coinCount)));
        cc.pvz.runtimeData.diamond > 0 && (this.diamondRoot.active = true, this.diamondLabel.string = t.itemCountLabels[2].string);
        var K = cc.pvz.runtimeData.coinRate, U = [];
        if (cc.pvz.gameRewards = [], 0 == cc.pvz.runtimeData.mode) this.adNode.active = true; else if (6 == cc.pvz.runtimeData.mode) {
          if (this.isSucc) {
            for (var V = this.scene.waveCount / 5 * K, O = [], q = 0; q < this.scene.emitRow.pzProb.length; q += 2) {
              var Z = this.scene.emitRow.pzProb[q], Q = this.scene.emitRow.pzProb[q + 1];
              O.push({
                qua: Z,
                weight: Q
              });
            }
            cc.pvz.utils.normalizeWeights(O);
            for (var j = function() {
              var n = cc.pvz.utils.randomFrom(O).qua, a = J.scene.equipJsonFile.json.filter(function(t) {
                return t.quality == n;
              }).map(function(t) {
                return t.id;
              }), r = cc.pvz.utils.randomInArr(a);
              console.log("id: ", r);
              var e = U.find(function(t) {
                return t[0] == r;
              });
              e ? e[1] += 1 : U.push([ r, 1, 4, n ]);
            }, Y = 0; Y < V; Y++) j();
          }
          this.adNode && (this.adNode.active = false);
          this.buff1Name.string = cc.find(I, t.buffNodes[0]).getComponent(cc.Label).string;
          this.buff2Name.string = cc.find(I, t.buffNodes[1]).getComponent(cc.Label).string;
        } else if (7 == cc.pvz.runtimeData.mode) ; else {
          if (this.isSucc) {
            var X = this.scene.emitRow.rwd, $ = X[1], tt = X[2];
            3 == cc.pvz.runtimeData.mode ? (U.push([ 36, tt, 1 ]), U.push([ 37, tt, 1 ])) : U.push([ $, tt, 1 ]);
            var it = cc.player.metaStageInfo[cc.pvz.runtimeData.mode];
            cc.pvz.runtimeData.level > it[0] && (it[0] = cc.pvz.runtimeData.level);
            it[1]--;
            it[3] = Date.now();
            cc.pvz.PlayerData.saveData();
            cc.pvz.PlayerData.increaseMissionProg(1210 + cc.pvz.runtimeData.mode, 1);
          }
          this.adNode.active = false;
        }
        this.nameLabel.string = this.scene.nameLabel.string;
        this.rateRoot.active = K > 1;
        this.rateRoot.active && (this.rateLabel.string = "x" + K);
        U.forEach(function(t) {
          var l = "image", d = "anim/icon", m = cc.instantiate(J.coinRoot);
          4 == t[2] ? (cc.pvz.utils.setSpriteFrame(cc.find("anim/di", m).getComponent(cc.Sprite), l, "pz/LQua" + t[3]), 
          cc.pvz.utils.setSpriteFrame(cc.find(d, m).getComponent(cc.Sprite), l, "equip_icon/" + t[0])) : (cc.pvz.utils.setSpriteFrame(cc.find(d, m).getComponent(cc.Sprite), l, "Item/item" + t[0]), 
          cc.pvz.gameRewards.push({
            id: t[0],
            count: t[1]
          }));
          cc.find("anim/num", m).getComponent(cc.Label).string = cc.pvz.utils.formatNumInGame(t[1]);
          m.parent = J.coinRoot.parent;
          m.active = true;
          cc.pvz.PlayerData.getRewardBonus(t[2], t[0], t[1]);
        });
        cc.pvz.exitMode = cc.pvz.runtimeData.mode;
        this.waveLabel.string = cc.pvz.runtimeData.wave + 1;
        0 == cc.pvz.runtimeData.mode || 7 == cc.pvz.runtimeData.mode ? this.maxWaveLabel.string = this.scene.maxWaveLabel.string : this.maxWaveLabel.string = this.waveLabel.string;
        cc.pvz.TAUtils.trackEndLevel(cc.pvz.runtimeData.mode, cc.pvz.runtimeData.level, i);
        this.ft();
      }
      ft() {
        var f = Math.ceil(this.coinCount), v = Math.ceil(cc.pvz.runtimeData.diamond);
        if (cc.pvz.PlayerData.itemNum(2, f), cc.pvz.PlayerData.itemNum(3, v), cc.pvz.PlayerData.saveData(), 
        f > 0 || v > 0) {
          if (f > 0) {
            var l = cc.pvz.gameRewards.find(function(t) {
              return 2 == t.id;
            });
            l ? l.count += f : cc.pvz.gameRewards.push({
              id: 2,
              count: f
            });
          }
          if (v > 0) {
            var d = cc.pvz.gameRewards.find(function(t) {
              return 3 == t.id;
            });
            d ? d.count += v : cc.pvz.gameRewards.push({
              id: 3,
              count: v
            });
          }
        }
      }
      closeThis() {
        var doLoadScene = function() {
          cc.butler && cc.butler.loadScene ? cc.butler.loadScene("main") : cc.director.loadScene("main");
        };
        cc.assetManager.loadBundle("lobby", function(err) {
          err && console.warn("[UIGameOver] loadBundle lobby failed:", err);
          try {
            require("../lobby/ConfigCtrl").default.isInit = false;
          } catch (e) {
            console.warn("[UIGameOver] reset ConfigCtrl.isInit failed:", e);
          }
          doLoadScene();
        });
      }
      onClickClose() {
        if (this.isAding) return;
        this.isAding = true;
        this.closeThis();
      }
      onClickAd() {
        var s = this;
        this.isAding || (this.isAding = true, cc.pvz.AdUtils.showAdRewardVideoOrTicket(cc.pvz.GameConst.AdType["\u7ed3\u7b97\u53cc\u500d"], function(t) {
          s.isAding = false;
          t && (s.ft(), s.closeThis());
        }));
      }
    };
    __decorate([ property(cc.Label) ], UIGameOver.prototype, "nameLabel", void 0);
    __decorate([ property(cc.Label) ], UIGameOver.prototype, "waveLabel", void 0);
    __decorate([ property(cc.Label) ], UIGameOver.prototype, "maxWaveLabel", void 0);
    __decorate([ property(cc.Node) ], UIGameOver.prototype, "coinRoot", void 0);
    __decorate([ property(cc.Label) ], UIGameOver.prototype, "coinLabel", void 0);
    __decorate([ property(cc.Node) ], UIGameOver.prototype, "diamondRoot", void 0);
    __decorate([ property(cc.Label) ], UIGameOver.prototype, "diamondLabel", void 0);
    __decorate([ property(cc.Node) ], UIGameOver.prototype, "rateRoot", void 0);
    __decorate([ property(cc.Label) ], UIGameOver.prototype, "rateLabel", void 0);
    __decorate([ property(cc.Node) ], UIGameOver.prototype, "adNode", void 0);
    __decorate([ property(cc.Label) ], UIGameOver.prototype, "buff1Name", void 0);
    __decorate([ property(cc.Label) ], UIGameOver.prototype, "buff2Name", void 0);
    UIGameOver = __decorate([ ccclass ], UIGameOver);
    exports.default = UIGameOver;
    cc._RF.pop();
  }, {
    "../lobby/ConfigCtrl": "ConfigCtrl"
  } ],
  UIGameRevive: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8b669tUi/ZLdrRLxa+osW6u", "UIGameRevive");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass} = cc._decorator;
    let UIGameRevive = class UIGameRevive extends cc.Component {
      initBy(t) {
        this.scene = t;
      }
      onClickClose() {
        this.scene.showFailUI(false);
        cc.popupManager.removePopup(this);
      }
      onClickAd() {
        var s = this;
        this.isWatching || (this.isWatching = true, cc.pvz.AdUtils.showAdRewardVideoOrTicket(cc.pvz.GameConst.AdType["\u6b7b\u4ea1\u590d\u6d3b"], function(t) {
          if (s.isWatching = false, t) {
            cc.popupManager.removePopup(s);
            s.scene.isPaused = true;
            cc.pvz.runtimeData.rebornCount--;
            setTimeout(function() {
              s.scene.onRevive(20);
            });
          }
        }));
      }
    };
    UIGameRevive = __decorate([ ccclass ], UIGameRevive);
    exports.default = UIGameRevive;
    cc._RF.pop();
  }, {} ],
  UIGameWin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2efeej4kFZMz4eTMtwa1qf2", "UIGameWin");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var g;
    var d = "x";
    const {ccclass: ccclass, property: property} = cc._decorator;
    let UIGameWin = class UIGameWin extends cc.Component {
      constructor() {
        super(...arguments);
        this.nameLabel = null;
        this.countLabel = null;
        this.item0 = null;
        this.itemListLayout = null;
        this.scroll = null;
        this.itemJsonFile = null;
      }
      initBy(t) {
        var b = this;
        this.scene = t;
        this.nameLabel.string = t.emitRow.name;
        this.countLabel.string = 10 - (cc.player.levelBoxCounter || 0);
        this.item0.active = false;
        var M = cc.pvz.utils.idCountArr2RewardList(t.emitRow.passReward);
        M.forEach(function(t, i) {
          b.scheduleOnce(function() {
            b.showItem(i, t.itemId, t.count * cc.pvz.runtimeData.coinRate);
          }, .2 * i);
        });
        M.length > 4 ? (this.scroll.horizontal = true, this.itemListLayout.node.anchor = cc.v2(1, .5), 
        this.itemListLayout.node[d] = this.scroll.node.width / 2) : (this.scroll.horizontal = false, 
        this.itemListLayout.node[d] = 0, this.itemListLayout.node.width = M.length * this.item0.width + this.itemListLayout.spacingX * (M.length - 1), 
        this.itemListLayout.node.anchor = cc.v2(.5, .5), this.itemListLayout.resizeMode = cc.Layout.ResizeMode.NONE);
      }
      showItem(t, i, c) {
        var k = "image", b = this.item0;
        t > 0 && ((b = cc.instantiate(this.item0)).parent = this.item0.parent, t > 3 && this.scroll.scrollToRight());
        b.active = true;
        var M = this.itemJsonFile.json.find(function(t) {
          return t.id == i;
        }).qua, g = cc.find("anim", b);
        cc.pvz.utils.setSpriteFrame(cc.find("icon", g).getComponent(cc.Sprite), k, "Item/item" + i);
        cc.find("num", g).getComponent(cc.Label).string = cc.pvz.utils.formatNumInGame(c);
        cc.pvz.utils.setSpriteFrame(cc.find("di", g).getComponent(cc.Sprite), k, "pz/LQua" + M);
        g.getComponent(cc.Animation).play();
      }
      onClickClose() {
        cc.pvz.utils.idCountArr2RewardList(this.scene.emitRow.passReward).forEach(function(t) {
          cc.pvz.PlayerData.itemNum(t.itemId, t.count * cc.pvz.runtimeData.coinRate);
        });
        cc.player.levelBoxCounter = (cc.player.levelBoxCounter || 0) + 1;
        cc.pvz.PlayerData.saveData();
        this.scene.showWinUI();
        cc.popupManager.removePopup(this);
      }
    };
    __decorate([ property(cc.Label) ], UIGameWin.prototype, "nameLabel", void 0);
    __decorate([ property(cc.Label) ], UIGameWin.prototype, "countLabel", void 0);
    __decorate([ property(cc.Node) ], UIGameWin.prototype, "item0", void 0);
    __decorate([ property(cc.Layout) ], UIGameWin.prototype, "itemListLayout", void 0);
    __decorate([ property(cc.ScrollView) ], UIGameWin.prototype, "scroll", void 0);
    __decorate([ property(cc.JsonAsset) ], UIGameWin.prototype, "itemJsonFile", void 0);
    UIGameWin = __decorate([ ccclass ], UIGameWin);
    exports.default = UIGameWin;
    cc._RF.pop();
  }, {} ],
  UnlockNewFunc: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17e37y3YmVPerqqLq8zw6k/", "UnlockNewFunc");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const SpineCtrl_1 = require("./SpineCtrl");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let UnlockNewFunc = class UnlockNewFunc extends cc.Component {
      constructor() {
        super(...arguments);
        this.main = null;
        this.icon = null;
        this.tars = null;
      }
      init() {}
      showOne(c) {
        var t;
        t = this;
        this.state = 1;
        this.main.setAnimation(0, "jiesuo1", false);
        this.icon.setAnimation(0, "anniu" + c + "_5", true);
        this.main.setBoneHandleTo("IK", this.tars[c - 1], cc.Vec2.ZERO);
        cc.MainUI.clickMaskCb = function() {
          2 === t.state && (t.state = 3, t.main.setAnimation(0, "jiesuo3", false));
        };
      }
      showTo(c) {
        var t;
        t = this;
        this.showFuncs = c;
        cc.find("Canvas/ClickMask").active = true;
        this.main.lockBoneHandle("IK");
        this.main.setCompleteListener(0, "jiesuo1", function() {
          t.state = 2;
          t.main.setAnimation(0, "jiesuo2", false);
        });
        this.main.setCompleteListener(0, "jiesuo2", function() {
          t.state = 3;
          t.main.setAnimation(0, "jiesuo3", false);
        });
        this.main.setCompleteListener(0, "jiesuo3", function() {
          t.showFuncs.length > 0 ? t.showOne(t.showFuncs.shift()) : (t.node.active = false, 
          cc.find("Canvas/ClickMask").active = false, cc.MainUI.clickMaskCb = null);
        });
        this.showOne(this.showFuncs.shift());
      }
      start() {}
    };
    __decorate([ property(SpineCtrl_1.default) ], UnlockNewFunc.prototype, "main", void 0);
    __decorate([ property(SpineCtrl_1.default) ], UnlockNewFunc.prototype, "icon", void 0);
    __decorate([ property(cc.Node) ], UnlockNewFunc.prototype, "tars", void 0);
    UnlockNewFunc = __decorate([ ccclass ], UnlockNewFunc);
    exports.default = UnlockNewFunc;
    cc._RF.pop();
  }, {
    "./SpineCtrl": "SpineCtrl"
  } ],
  UpgradeProNum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9318dOS8EZMy5w8BoJCQDdk", "UpgradeProNum");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const Pool_1 = require("./Pool");
    var l, r, n, o;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let UpgradeProNum = class UpgradeProNum extends cc.Component {
      constructor() {
        super(...arguments);
        this.upgradePool = null;
      }
      showAt(c, t, i, n, e) {
        var s, o, r, l = "anim";
        r = this;
        void 0 === n && (n = 0);
        void 0 === e && (e = 0);
        (s = this.upgradePool.getNewPoolItem()).setPosition(s.parent.convertToNodeSpaceAR(i.convertToWorldSpaceAR(new cc.Vec2(n, e))));
        s.getChildByName(l).getChildByName("proName").getComponent(cc.Label).string = c + "+";
        s.getChildByName(l).getChildByName("proVal").getComponent(cc.Label).string = t;
        (o = s.getChildByName(l).getComponent(cc.Animation)).play(o.getClips()[0].name);
        o.once("finished", function() {
          r.upgradePool.destroyPoolItem(s);
        });
      }
      start() {}
    };
    __decorate([ property(Pool_1.default) ], UpgradeProNum.prototype, "upgradePool", void 0);
    UpgradeProNum = __decorate([ ccclass ], UpgradeProNum);
    exports.default = UpgradeProNum;
    cc._RF.pop();
  }, {
    "./Pool": "Pool"
  } ],
  UserIcon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "da742XchNxMlqXHjIyVSNQC", "UserIcon");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var c;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let UserIcon = class UserIcon extends cc.Component {
      constructor() {
        super(...arguments);
        this.nameStr = null;
        this.avatar = null;
        this.defaultAvatar = null;
      }
      show(c) {
        var t;
        t = this;
        void 0 === c && (c = {
          uid: 0,
          name: "",
          avatar: ""
        });
        this.uid = c.uid;
        this.nameStr.string = c.name;
        c.avatar.length > 0 ? cc.assetManager.loadRemote(c.avatar, {
          ext: ".jpg"
        }, function(_c, i) {
          var n;
          (n = new cc.SpriteFrame()).setTexture(i);
          t.avatar.spriteFrame = n;
        }) : this.avatar.spriteFrame = this.defaultAvatar;
      }
      hide() {}
      start() {}
    };
    __decorate([ property(cc.Label) ], UserIcon.prototype, "nameStr", void 0);
    __decorate([ property(cc.Sprite) ], UserIcon.prototype, "avatar", void 0);
    __decorate([ property(cc.SpriteFrame) ], UserIcon.prototype, "defaultAvatar", void 0);
    UserIcon = __decorate([ ccclass ], UserIcon);
    exports.default = UserIcon;
    cc._RF.pop();
  }, {} ],
  WXAuthBtn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ec01vtpAdLSYFTHXWO/XPP", "WXAuthBtn");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const NetworkManager_1 = require("../main/NetworkManager");
    var e;
    var e = function() {
      let t;
      return t = function() {}, t.init = function(c) {
        var i, e, s, o, r, h, a;
        window.wx && !t.wxButton && ((a = window.wx.getSystemInfoSync()).screenWidth, a.screenHeight, 
        o = cc.view.getViewportRect(), e = c.getBoundingBoxToWorld(), h = cc.view.getScaleX(), 
        e.x += o.x / h, e.y += o.y / h, r = h / (s = cc.view.getDevicePixelRatio()), i = cc.view.getScaleY() / s, 
        (t.wxButton = window.wx.createUserInfoButton({
          type: "text",
          text: "",
          style: {
            left: e.x * r,
            top: a.windowHeight - (e.y + e.height) * i,
            width: e.width * r,
            height: e.height * i,
            lineHeight: 40,
            backgroundColor: "#80ff0000",
            color: "#ffffff",
            textAlign: "center",
            fontSize: 16,
            borderRadius: 4
          }
        })).onTap(function(c) {
          var i, e;
          (console.log(c), c.userInfo && c.userInfo.avatarUrl) && (e = c.userInfo.avatarUrl, 
          i = c.userInfo.nickName, e.length > 0 && NetworkManager_1.default.auth(i, e, function(c) {
            c && t.authCb();
          }));
        }), t.wxButton.hide());
      }, t.wxButton = null, t.authCb = function() {}, t;
    }();
    exports.default = e;
    cc._RF.pop();
  }, {
    "../main/NetworkManager": "NetworkManager"
  } ],
  WeaponCard: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6efb1V2xOZF/rovp7VVWZO/", "WeaponCard");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const r = require("./ConfigCtrl");
    const h = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var l = 0;
    var k = 0;
    var F = 0;
    var u = 0;
    let WeaponCard = class WeaponCard extends cc.Component {
      constructor() {
        super(...arguments);
        this.iconSpr = null;
        this.bgSpr = null;
        this.bgSFS = null;
        this.weaponNameStr = null;
        this.redP = null;
        this.buyPosPanels = null;
        this.unlockNeed = null;
        this.deployBtn = null;
        this.lockPanel = null;
        this.weaponStrInfo = null;
        this.stars = null;
        this.starSFS = null;
        this.lvUpEff = null;
      }
      initAsUsing(c, t) {
        this.type = 1;
        this.idx = c;
        this.par = t;
        for (var l = 0; l < this.buyPosPanels.length; l++) this.buyPosPanels[l].active = false;
        -1 === cc.player.weaponUsing[c] ? (this.buyPosPanels[1].active = true, this.unlockNeed.string = "" + r.Datas.PlayerPro0[r.Datas.Config[3].v[c]].name) : 0 === cc.player.weaponUsing[c] ? this.buyPosPanels[0].active = true : (this.buyPosPanels[2].active = true, 
        this.initByWeaponIdx(cc.player.weaponUsing[c]), this.refreshDeployBtns());
      }
      initAsInStorage(c, t) {
        this.type = 2;
        this.idx = c;
        this.par = t;
        this.buyPosPanels[0].active = false;
        this.buyPosPanels[1].active = false;
        this.buyPosPanels[2].active = true;
        this.initByWeaponIdx(c);
      }
      initAsInRankuser(c, t, i) {
        var n, e, s;
        this.type = 4;
        this.buyPosPanels[0].active = false;
        this.buyPosPanels[1].active = false;
        this.buyPosPanels[2].active = true;
        this.deployBtn.map(function(c) {
          return c.active = false;
        });
        this.idx = c;
        s = r.Datas.Weapon[c];
        this.weaponNameStr.string = s.name;
        this.bgSpr[0].spriteFrame = this.bgSFS[s.quality - 1];
        this.bgSpr[1].spriteFrame = this.bgSFS[s.quality - 1 + 3];
        cc.pvz.utils.setSpriteFrame(this.iconSpr, "image", "weapon_icon/weapon_" + c);
        this.weaponStrInfo[0].string = "Lv." + t;
        n = 0;
        (e = i) > 5 && (e -= 5, n = 1);
        for (var k = 0; k < this.stars.children.length; k++) {
          this.stars.children[k].active = k < e;
          this.stars.children[k].getComponent(cc.Sprite).spriteFrame = this.starSFS[n];
        }
      }
      initByWeaponIdx(c) {
        var t;
        if (t = r.Datas.Weapon[c], this.bgSpr[0].spriteFrame = this.bgSFS[t.quality - 1], 
        this.bgSpr[1].spriteFrame = this.bgSFS[t.quality - 1 + 3], this.weaponNameStr.string = t.name, 
        cc.pvz.utils.setSpriteFrame(this.iconSpr, "image", "weapon_icon/weapon_" + c), this.deployBtn[0].active = false, 
        this.deployBtn[1].active = false, this.redP.active = false, cc.player.weaponInfo[c] || 3 === this.type) {
          var O, E, L, N, j, G, W;
          this.lockPanel.active = false;
          this.weaponStrInfo[0].node.parent.active = true;
          j = cc.player.weaponInfo[c] ? cc.player.weaponInfo[c][0] : 0;
          E = 0;
          (L = N = cc.player.weaponInfo[c] ? cc.player.weaponInfo[c][1] : 0) > 5 && (L -= 5, 
          E = 1);
          this.weaponStrInfo[0].string = "Lv." + j;
          for (var F = 0; F < this.stars.children.length; F++) {
            this.stars.children[F].active = F < L;
            this.stars.children[F].getComponent(cc.Sprite).spriteFrame = this.starSFS[E];
          }
          for (O = 0, F = 0; F < cc.player.weaponUsing.length; F++) cc.player.weaponUsing[F] >= 0 && O++;
          if (cc.player.weaponInfo[c]) {
            G = cc.player.weaponInfo[c][2];
            (W = r.Datas.WeaponStar[100 * this.idx + N + 1]) && W.exp > 0 && G >= W.exp && (this.redP.active = true);
          }
          this.deployBtn[0].active = O > 0;
        } else {
          this.lockPanel.active = true;
          this.weaponStrInfo[0].node.parent.active = false;
        }
      }
      refreshDeployBtns() {
        if (1 === this.type) {
          this.deployBtn[0].active = false;
          this.deployBtn[1].active = true;
        } else for (var o = 0; o < cc.player.weaponUsing.length; o++) cc.player.weaponUsing[o] === this.idx && (this.deployBtn[0].active = false, 
        this.deployBtn[1].active = true);
      }
      onClick() {
        var c;
        1 === this.type ? (c = cc.player.weaponUsing[this.idx]) > 0 && cc.SubwindowManager.showWindow(h.UIStatus.WeaponInfo, {
          type: 1,
          idx: c
        }) : 2 === this.type && cc.SubwindowManager.showWindow(h.UIStatus.WeaponInfo, {
          type: 1,
          idx: this.idx
        });
      }
      deploy() {
        for (var h = 0; h < cc.player.weaponUsing.length; h++) if (0 === cc.player.weaponUsing[h]) return cc.player.weaponUsing[h] = this.idx, 
        this.par.refreshUsing(), this.par.refreshStorageCardById(this.idx), void cc.pvz.PlayerData.saveData();
        cc.popupManager.showToast(r.Datas.Tips[9].v);
      }
      undeploy() {
        var c;
        if (1 === this.type) {
          c = cc.player.weaponUsing[this.idx];
          cc.player.weaponUsing[this.idx] = 0;
          this.par.refreshUsing();
          this.par.refreshStorageCardById(c);
        } else if (2 === this.type) {
          for (var u = 0; u < cc.player.weaponUsing.length; u++) if (cc.player.weaponUsing[u] === this.idx) {
            cc.player.weaponUsing[u] = 0;
            break;
          }
          this.par.refreshUsing();
          this.par.refreshStorageCardById(this.idx);
        }
        cc.pvz.PlayerData.saveData();
      }
      show() {}
      hide() {}
    };
    __decorate([ property(cc.Sprite) ], WeaponCard.prototype, "iconSpr", void 0);
    __decorate([ property(cc.Sprite) ], WeaponCard.prototype, "bgSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], WeaponCard.prototype, "bgSFS", void 0);
    __decorate([ property(cc.Label) ], WeaponCard.prototype, "weaponNameStr", void 0);
    __decorate([ property(cc.Node) ], WeaponCard.prototype, "redP", void 0);
    __decorate([ property(cc.Node) ], WeaponCard.prototype, "buyPosPanels", void 0);
    __decorate([ property(cc.Label) ], WeaponCard.prototype, "unlockNeed", void 0);
    __decorate([ property(cc.Node) ], WeaponCard.prototype, "deployBtn", void 0);
    __decorate([ property(cc.Node) ], WeaponCard.prototype, "lockPanel", void 0);
    __decorate([ property(cc.Label) ], WeaponCard.prototype, "weaponStrInfo", void 0);
    __decorate([ property(cc.Node) ], WeaponCard.prototype, "stars", void 0);
    __decorate([ property(cc.SpriteFrame) ], WeaponCard.prototype, "starSFS", void 0);
    __decorate([ property(cc.Node) ], WeaponCard.prototype, "lvUpEff", void 0);
    WeaponCard = __decorate([ ccclass ], WeaponCard);
    exports.default = WeaponCard;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager"
  } ],
  WeaponGetWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0962aFkvkhHK5lyTDTJlMBW", "WeaponGetWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const v = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const EnabledBtn_1 = require("./EnabledBtn");
    const Tool_1 = require("./Tool");
    const a = require("./SubwindowManager");
    const WeaponWindow_1 = require("./WeaponWindow");
    var f;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let WeaponGetWindow = class WeaponGetWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.btns = null;
        this.countdownStr = null;
        this.getTimesStr = null;
        this.redP = null;
      }
      init() {}
      show() {
        this.refresh();
        this.tCount = 0;
      }
      refresh() {
        var c, v = 1e3, f = 40;
        if (Date.now(), cc.player.weaponGetLastTime[1] < Tool_1.default.today() / v) {
          this.btns[0].getComponent(EnabledBtn_1.default).setEnable(true);
          this.btns[0].active = true;
          this.btns[1].active = false;
          this.redP[1].active = true;
          this.countdownStr[1].node.active = false;
        } else {
          var A, O;
          if (this.countdownStr[1].node.active = true, cc.pvz.PlayerData.itemNum(f) > 0) {
            this.btns[0].active = false;
            this.btns[1].active = true;
            O = Math.min(10, cc.pvz.PlayerData.itemNum(f));
            this.getTimesStr[0].string = "\u5f00\u7bb1" + O + "\u6b21";
            this.getTimesStr[1].string = "" + O;
          } else {
            this.btns[0].active = true;
            this.btns[1].active = false;
            this.redP[1].active = false;
            this.btns[0].getComponent(EnabledBtn_1.default).setEnable(false);
          }
          A = Math.floor(86400 - (Date.now() / v - Tool_1.default.today() / v));
          this.countdownStr[1].string = Tool_1.default.formatCountDown(A, true) + " \u540e\u514d\u8d39";
        }
        (c = Math.floor(3600 - (Date.now() / v - cc.player.weaponGetLastTime[0]))) > 0 ? (this.btns[2].getComponent(EnabledBtn_1.default).setEnable(false), 
        this.redP[0].active = false, this.countdownStr[0].node.active = true, this.countdownStr[0].string = Tool_1.default.formatCountDown(c, true) + " \u540e\u53ef\u4f7f\u7528") : (this.redP[0].active = true, 
        this.countdownStr[0].node.active = false, this.btns[2].getComponent(EnabledBtn_1.default).setEnable(true));
      }
      getByAd() {
        var c;
        c = this;
        false !== this.btns[2].getComponent(EnabledBtn_1.default).flag && cc.pvz.AdUtils.willShowAdRewardVideo(cc.pvz.GameConst.AdType["\u83b7\u5f97\u6b66\u5668"], function(t) {
          t && (cc.player.weaponGetLastTime[0] = Math.floor(Date.now() / 1e3), c.doGetWeapon(1), 
          RedPointManager_1.default.check("WeaponGet"));
        });
      }
      getByFree() {
        false !== this.btns[0].getComponent(EnabledBtn_1.default).flag && (cc.player.weaponGetLastTime[1] = Math.floor(Date.now() / 1e3), 
        this.doGetWeapon(1), RedPointManager_1.default.check("WeaponGet"));
      }
      getByItem() {
        var c, i = 40;
        c = Math.min(10, cc.pvz.PlayerData.itemNum(i));
        cc.pvz.PlayerData.itemNum(i, -c);
        this.doGetWeapon(c);
      }
      doGetWeapon(c) {
        var t, i, n, s;
        for (var B in i = [], t = [], v.Datas.Weapon) cc.player.weaponInfo[B] && 10 === cc.player.weaponInfo[B][1] || (t.push(parseInt(B)), 
        i.push(v.Datas.Weapon[B].odds));
        for (0 === t.length && (t.push(1), i.push(v.Datas.Weapon[1].odds)), s = [], B = 0; B < c; B++) {
          var y;
          y = t[Tool_1.default.randomByWeight(i)];
          s.push(2);
          s.push(y);
          s.push(1);
          cc.pvz.PlayerData.getRewardBonus(2, y, 1);
        }
        cc.pvz.PlayerData.increaseMissionProg(801, c);
        cc.pvz.PlayerData.increaseMissionProg(802, c);
        cc.pvz.PlayerData.saveData();
        cc.SubwindowManager.showWindow(a.UIStatus.GetItem, {
          items: s
        });
        (n = cc.SubwindowManager.getWindowHandle(a.UIStatus.Weapon).getComponent(WeaponWindow_1.default)).refreshUsing();
        n.refreshStorage();
        this.refresh();
        this.getFlag = 1;
      }
      hide() {
        this.getFlag && (RedPointManager_1.default.check("WeaponStarUp"), this.getFlag = 0);
        cc.SubwindowManager.hideWindow(a.UIStatus.WeaponGet);
      }
      start() {}
      update(c) {
        this.tCount += c;
        this.tCount >= 1 && (this.tCount = 0, this.refresh());
      }
    };
    __decorate([ property(cc.Node) ], WeaponGetWindow.prototype, "btns", void 0);
    __decorate([ property(cc.Label) ], WeaponGetWindow.prototype, "countdownStr", void 0);
    __decorate([ property(cc.Label) ], WeaponGetWindow.prototype, "getTimesStr", void 0);
    __decorate([ property(cc.Node) ], WeaponGetWindow.prototype, "redP", void 0);
    WeaponGetWindow = __decorate([ ccclass ], WeaponGetWindow);
    exports.default = WeaponGetWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./EnabledBtn": "EnabledBtn",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool",
    "./WeaponWindow": "WeaponWindow"
  } ],
  WeaponInfoWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1bb7aCIGepJ25Uf5FBiGOg9", "WeaponInfoWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const l = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const EffSpine_1 = require("./EffSpine");
    const EnabledBtn_1 = require("./EnabledBtn");
    const PanelNevigator_1 = require("./PanelNevigator");
    const WeaponCard_1 = require("./WeaponCard");
    const WeaponRandomPro_1 = require("./WeaponRandomPro");
    const Tool_1 = require("./Tool");
    const _ = require("./SubwindowManager");
    const WeaponWindow_1 = require("./WeaponWindow");
    var t, o, C, j, e, n;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let WeaponInfoWindow = class WeaponInfoWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.cardPre = null;
        this.cardContainer = null;
        this.wNameStr = null;
        this.panel1Strs = null;
        this.costSpr = null;
        this.redP = null;
        this.costStr = null;
        this.p1Btns = null;
        this.wRanProPre = null;
        this.wRanProContainer = null;
        this.cost2Str = null;
      }
      init() {}
      show(c) {
        void 0 === c && (c = {
          idx: 0
        });
        this.idx = c.idx;
        this.doUp = 0;
        this.wNameStr.string = l.Datas.Weapon[this.idx].name;
        this.refreshIcon();
        this.node.getComponent(PanelNevigator_1.default).refreshPage(0);
      }
      refreshIcon() {
        var c;
        (c = Tool_1.default.getPrefab(this.cardContainer, this.cardPre, "card").getComponent(WeaponCard_1.default)).initAsInStorage(this.idx, this);
        c.type = 3;
        c.deployBtn.map(function(c) {
          return c.active = false;
        });
        c.redP.active = false;
        c.weaponNameStr.node.parent.active = false;
      }
      getWeaponLvStr(c, t) {
        var i, r = "\u6301\u6709\u65f6\u89d2\u8272\u653b\u51fb\u529b";
        return void 0 === t && (t = 0), i = [ "<color = #3CAD2F>", "</c>" ], 0 === c.value ? Un : 1 === c.type ? r + (t ? i[0] : "") + "+" + c.value + (t ? i[1] : "") : 101 === c.type ? r + (t ? i[0] : "") + "+" + Tool_1.default.formatNum2(c.value / 100) + "%" + (t ? i[1] : "") : void 0;
      }
      getWeaponStarStr(c, t) {
        var i, o = 100;
        return void 0 === t && (t = 0), i = [ "<color = #3CAD2F>", "</c>" ], 0 === c.value ? Un : 1 === c.type ? "\u6240\u6709\u6b66\u5668\u653b\u51fb\u529b" + (t ? i[0] : "") + "+" + Tool_1.default.formatNum2(c.value / o) + "%" + (t ? i[1] : "") : 2 === c.type ? "\u6b66\u5668\u98de\u884c\u901f\u5ea6" + (t ? i[0] : "") + "+" + c.value + (t ? i[1] : "") : 3 === c.type ? "\u6b66\u5668\u66b4\u51fb\u4f24\u5bb3" + (t ? i[0] : "") + "+" + Tool_1.default.formatNum2(c.value / o) + "%" + (t ? i[1] : "") : 4 === c.type ? "\u6b66\u5668\u66b4\u51fb\u51e0\u7387" + (t ? i[0] : "") + "+" + Tool_1.default.formatNum2(c.value / o) + "%" + (t ? i[1] : "") : void 0;
      }
      refreshPanel1() {
        var c, t, i, n, e, o, r, h, a, C = 100, j = "(\u8fbe\u5230";
        if (o = l.Datas.Weapon[this.idx], h = cc.player.weaponInfo[this.idx][0], c = cc.player.weaponInfo[this.idx][1], 
        this.panel1Strs[0].string = Tool_1.default.getRicktextStr(o.desc, 0, [ [ o.atk + o.atk_add * (h - 1) ] ], [], [ "%" ], o.color), 
        this.panel1Strs[1].string = "\u98de\u884c\u901f\u5ea6\uff1a<color = #3CAD2F>" + (o.speed + o.speed_add * (h - 1)) + "</c>\uff08\u5347\u661f\u63d0\u5347\u98de\u884c\u901f\u5ea6\uff09", 
        e = 1e3 * this.idx + h, t = l.Datas.WeaponExp[e], i = l.Datas.WeaponExp[e + 1]) {
          for (this.p1Btns[1].active = true; i && i.value === t.value; ) {
            e++;
            i = l.Datas.WeaponExp[e + 1];
          }
          this.panel1Strs[2].string = this.getWeaponLvStr(t, 1) + (i ? j + i.level + "\u7ea7\u83b7\u5f97\uff1a" + this.getWeaponLvStr(i) + gt : "");
          this.costStr[1].string = "" + t.need;
          this.p1Btns[1].getComponent(EnabledBtn_1.default).setEnable(cc.pvz.PlayerData.itemNum(38) >= t.need);
        } else {
          this.p1Btns[1].active = false;
          this.panel1Strs[2].string = this.getWeaponLvStr(t, 1) + "\n";
        }
        if (r = C * this.idx + c + 1, a = l.Datas.WeaponStar[C * this.idx + c + 1], n = l.Datas.WeaponStar[r + 1]) {
          for (this.p1Btns[0].active = true; n && n.value === a.value; ) {
            r++;
            n = l.Datas.WeaponStar[e + 1];
          }
          this.panel1Strs[3].string = this.getWeaponStarStr(a, 1) + (n ? j + n.star + "\u661f\u83b7\u5f97\uff1a" + this.getWeaponStarStr(n) + gt : "");
          this.costStr[0].string = cc.player.weaponInfo[this.idx][2] + "/" + a.exp;
          cc.pvz.utils.setSpriteFrame(this.costSpr, "image", "weapon_icon/weapon_" + this.idx);
          this.p1Btns[0].getComponent(EnabledBtn_1.default).setEnable(cc.player.weaponInfo[this.idx][2] >= a.exp);
          this.redP.active = this.p1Btns[0].getComponent(EnabledBtn_1.default).flag;
        } else {
          this.p1Btns[0].active = false;
          this.panel1Strs[3].string = "" + this.getWeaponStarStr(a, 1);
        }
      }
      refreshPanel2() {
        for (var c, a = 0; a < 5; a++) Tool_1.default.getPrefab(this.wRanProContainer, this.wRanProPre, "randomPro" + a).getComponent(WeaponRandomPro_1.default).initAs(this.idx, a, this);
        for (this.cost2Str[0].string = "5", c = 0, a = 0; a < 5; a++) cc.player.weaponInfo[this.idx][5 + 3 * a] && c++;
        this.cost2Str[1].string = "" + 5 * c;
      }
      doLvUp() {
        var c, v = 38;
        c = l.Datas.WeaponExp[1e3 * this.idx + cc.player.weaponInfo[this.idx][0]];
        cc.pvz.PlayerData.itemNum(v) >= c.need && (cc.pvz.PlayerData.itemNum(v, -c.need), 
        cc.player.weaponInfo[this.idx][0]++, this.refreshIcon(), this.refreshPanel1(), Tool_1.default.displayBPChange(), 
        cc.pvz.PlayerData.increaseMissionProg(803, 1), cc.pvz.PlayerData.increaseMissionProg(804, 1), 
        cc.pvz.PlayerData.saveData(), Tool_1.default.getPrefab(this.cardContainer, this.cardPre, "card").getComponent(WeaponCard_1.default).lvUpEff.getComponent(EffSpine_1.default).play(), 
        this.doUp = 1);
      }
      doStarUp() {
        var c;
        c = l.Datas.WeaponStar[100 * this.idx + cc.player.weaponInfo[this.idx][1] + 1];
        cc.player.weaponInfo[this.idx][2] >= c.exp && (cc.player.weaponInfo[this.idx][2] -= c.exp, 
        cc.player.weaponInfo[this.idx][1]++, cc.pvz.PlayerData.createNewWeaponRandomPro(this.idx, cc.player.weaponInfo[this.idx][1] - 1), 
        this.refreshIcon(), this.refreshPanel1(), Tool_1.default.getPrefab(this.cardContainer, this.cardPre, "card").getComponent(WeaponCard_1.default).lvUpEff.getComponent(EffSpine_1.default).play(), 
        cc.pvz.PlayerData.saveData(), this.doUp = 1);
      }
      regetRandomPro(c, t) {
        var i, h = 39;
        if (i = 5 + 5 * t, cc.pvz.PlayerData.itemNum(h) >= i) {
          cc.pvz.PlayerData.itemNum(h, -i);
          for (var p = 0; p < 5; p++) c[3 + 3 * p] > 0 && 0 === c[5 + 3 * p] && cc.pvz.PlayerData.createNewWeaponRandomPro(this.idx, p);
          this.refreshPanel2();
          cc.pvz.PlayerData.increaseMissionProg(805, 1);
          cc.pvz.PlayerData.increaseMissionProg(806, 1);
          cc.pvz.PlayerData.saveData();
        } else {
          var w;
          w = l.Datas.Tips[2].v.replace("{1}", l.Datas.Item[h].name);
          cc.popupManager.showToast(w);
        }
      }
      doGetNewRandomPros() {
        for (var r = this, h = cc.player.weaponInfo[this.idx], a = 0, u = 0, v = 0; v < 5; v++) h[3 + 3 * v] > 0 && (0 === h[5 + 3 * v] ? a++ : u++);
        if (0 !== a) {
          for (v = 0; v < 5; v++) if (h[3 + 3 * v] > 0 && 6 === l.Datas.WeaponRandomPro[h[3 + 3 * v]].quality && 0 === h[5 + 3 * v]) return void cc.SubwindowManager.showWindow(_.UIStatus.Alert, {
            text: l.Datas.Config[10002].v,
            onOk: function() {
              r.regetRandomPro(h, u);
            }
          });
          this.regetRandomPro(h, u);
        } else cc.popupManager.showToast(l.Datas.Tips[4].v);
      }
      hide() {
        var c;
        (cc.SubwindowManager.hideWindow(_.UIStatus.WeaponInfo), this.doUp) && ((c = cc.SubwindowManager.getWindowHandle(_.UIStatus.Weapon).getComponent(WeaponWindow_1.default)).refreshUsing(), 
        c.refreshStorage(), RedPointManager_1.default.check("WeaponStarUp"));
      }
    };
    __decorate([ property(cc.Prefab) ], WeaponInfoWindow.prototype, "cardPre", void 0);
    __decorate([ property(cc.Node) ], WeaponInfoWindow.prototype, "cardContainer", void 0);
    __decorate([ property(cc.Label) ], WeaponInfoWindow.prototype, "wNameStr", void 0);
    __decorate([ property(cc.RichText) ], WeaponInfoWindow.prototype, "panel1Strs", void 0);
    __decorate([ property(cc.Sprite) ], WeaponInfoWindow.prototype, "costSpr", void 0);
    __decorate([ property(cc.Node) ], WeaponInfoWindow.prototype, "redP", void 0);
    __decorate([ property(cc.Label) ], WeaponInfoWindow.prototype, "costStr", void 0);
    __decorate([ property(cc.Node) ], WeaponInfoWindow.prototype, "p1Btns", void 0);
    __decorate([ property(cc.Prefab) ], WeaponInfoWindow.prototype, "wRanProPre", void 0);
    __decorate([ property(cc.Node) ], WeaponInfoWindow.prototype, "wRanProContainer", void 0);
    __decorate([ property(cc.Label) ], WeaponInfoWindow.prototype, "cost2Str", void 0);
    WeaponInfoWindow = __decorate([ ccclass ], WeaponInfoWindow);
    exports.default = WeaponInfoWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./EffSpine": "EffSpine",
    "./EnabledBtn": "EnabledBtn",
    "./PanelNevigator": "PanelNevigator",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool",
    "./WeaponCard": "WeaponCard",
    "./WeaponRandomPro": "WeaponRandomPro",
    "./WeaponWindow": "WeaponWindow"
  } ],
  WeaponProWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f0545k0JRpPjLzeR+ESSoui", "WeaponProWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const r = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    const s = require("./SubwindowManager");
    var a, u, v, t;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let WeaponProWindow = class WeaponProWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.infoStrs = null;
      }
      init() {}
      show() {
        var c, t, a = 1, u = 101, v = 100;
        for (var I in c = {
          [a]: 0,
          [u]: 0
        }, t = {
          [a]: 0,
          2: 0,
          3: 0,
          4: 0
        }, cc.player.weaponInfo) {
          var k, C;
          cc.player.weaponInfo[I][0] > 0 && (c[(C = r.Datas.WeaponExp[1e3 * parseInt(I) + cc.player.weaponInfo[I][0]]).type] += C.value);
          t[(k = r.Datas.WeaponStar[v * parseInt(I) + cc.player.weaponInfo[I][1] + 1]).type] += k.value;
        }
        this.infoStrs[0].string = Tool_1.default.formatNum2(c[1]);
        this.infoStrs[1].string = Tool_1.default.formatNum2(c[u] / v) + "%";
        this.infoStrs[2].string = Tool_1.default.formatNum2(t[1] / v) + "%";
        this.infoStrs[3].string = Tool_1.default.formatNum2(t[2]);
        this.infoStrs[4].string = Tool_1.default.formatNum2(t[4] / v) + "%";
        this.infoStrs[5].string = Tool_1.default.formatNum2(t[3] / v) + "%";
      }
      hide() {
        cc.SubwindowManager.hideWindow(s.UIStatus.WeaponPro);
      }
      start() {}
    };
    __decorate([ property(cc.Label) ], WeaponProWindow.prototype, "infoStrs", void 0);
    WeaponProWindow = __decorate([ ccclass ], WeaponProWindow);
    exports.default = WeaponProWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool"
  } ],
  WeaponRandomPro: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3b9c8e50gpLc5fInL7poe37", "WeaponRandomPro");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const s = require("./ConfigCtrl");
    const Tool_1 = require("./Tool");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let WeaponRandomPro = class WeaponRandomPro extends cc.Component {
      constructor() {
        super(...arguments);
        this.bgSpr = null;
        this.bgSFS = null;
        this.lockNode = null;
        this.iconSpr = null;
        this.iconSFS = null;
        this.descStr = null;
        this.lockBtnNode = null;
      }
      initAs(c, t, i) {
        this.wId = c;
        this.rIdx = t;
        this.par = i;
        this.refresh();
      }
      refresh() {
        var c, t, i, n;
        if (c = cc.player.weaponInfo[this.wId], this.rIdx + 1 > c[1]) return this.lockNode.active = true, 
        void (this.lockNode.getComponentInChildren(cc.Label).string = this.rIdx + 1 + "\u661f\u89e3\u9501");
        this.lockNode.active = false;
        0 === (n = cc.player.weaponInfo[this.wId][3 + 3 * this.rIdx]) && (cc.pvz.PlayerData.createNewWeaponRandomPro(this.wId, this.rIdx), 
        n = cc.player.weaponInfo[this.wId][3 + 3 * this.rIdx]);
        t = cc.player.weaponInfo[this.wId][4 + 3 * this.rIdx];
        i = s.Datas.WeaponRandomPro[n];
        this.iconSpr.spriteFrame = this.iconSFS[i.quality - 1];
        i.epsKey >= 2 && i.epsKey <= 4 ? (this.descStr[0].string = i.explain, this.descStr[1].string = "+" + Tool_1.default.formatNum2(t / 100) + "%") : (this.descStr[0].string = i.explain, 
        this.descStr[1].string = "+" + t);
        this.lockThisPro(null, "-1");
        this.par.cost2Str[0].string = "5";
      }
      lockThisPro(_c, t) {
        var i, n;
        if (1 === (i = parseInt(t))) {
          for (var g = cc.player.weaponInfo[this.wId], m = 0, S = 0; S < 5; S++) g[3 + 3 * S] > 0 && 0 === g[5 + 3 * S] && m++;
          if (1 === m) return void cc.popupManager.showToast(s.Datas.Tips[4].v);
          g[5 + 3 * this.rIdx] = 1;
        } else 0 === i && (cc.player.weaponInfo[this.wId][5 + 3 * this.rIdx] = 0);
        for (this.lockBtnNode[0].active = 1 === cc.player.weaponInfo[this.wId][5 + 3 * this.rIdx], 
        this.lockBtnNode[1].active = 0 === cc.player.weaponInfo[this.wId][5 + 3 * this.rIdx], 
        this.lockBtnNode[0].active ? this.bgSpr.spriteFrame = this.bgSFS[0] : this.bgSpr.spriteFrame = this.bgSFS[1], 
        n = 0, S = 0; S < 5; S++) cc.player.weaponInfo[this.wId][5 + 3 * S] && n++;
        this.par.cost2Str[1].string = "" + 5 * n;
      }
      start() {}
    };
    __decorate([ property(cc.Sprite) ], WeaponRandomPro.prototype, "bgSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], WeaponRandomPro.prototype, "bgSFS", void 0);
    __decorate([ property(cc.Node) ], WeaponRandomPro.prototype, "lockNode", void 0);
    __decorate([ property(cc.Sprite) ], WeaponRandomPro.prototype, "iconSpr", void 0);
    __decorate([ property(cc.SpriteFrame) ], WeaponRandomPro.prototype, "iconSFS", void 0);
    __decorate([ property(cc.Label) ], WeaponRandomPro.prototype, "descStr", void 0);
    __decorate([ property(cc.Node) ], WeaponRandomPro.prototype, "lockBtnNode", void 0);
    WeaponRandomPro = __decorate([ ccclass ], WeaponRandomPro);
    exports.default = WeaponRandomPro;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./Tool": "Tool"
  } ],
  WeaponWindow: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cbfb31IRn5L06dXJHks7ozq", "WeaponWindow");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const n = require("./ConfigCtrl");
    const RedPointManager_1 = require("./RedPointManager");
    const WeaponCard_1 = require("./WeaponCard");
    const Tool_1 = require("./Tool");
    const v = require("./SubwindowManager");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let WeaponWindow = class WeaponWindow extends cc.Component {
      constructor() {
        super(...arguments);
        this.weaponCardPre = null;
        this.weaponUsing = null;
        this.weaponContainer = null;
        this.countStr = null;
        this.autoStarBtn = null;
      }
      init() {}
      refreshUsing() {
        for (var o = 0, a = 0; a < this.weaponUsing.length; a++) {
          Tool_1.default.getPrefab(this.weaponUsing[a], this.weaponCardPre, "" + a).getComponent(WeaponCard_1.default).initAsUsing(a, this);
          cc.player.weaponUsing[a] > 0 && o++;
        }
        this.countStr[0].string = o + "/" + this.weaponUsing.length;
      }
      refreshStorage() {
        var c;
        for (var h in c = [ 0, 0 ], n.Datas.Weapon) {
          cc.player.weaponInfo[h] && cc.player.weaponInfo[h][0] > 0 && c[0]++;
          c[1]++;
          this.refreshStorageCardById(parseInt(h));
        }
        this.countStr[1].string = c[0] + "/" + c[1];
        this.autoStarBtn.active = RedPointManager_1.default.justCheck("WeaponStarUp", {});
      }
      refreshStorageCardById(c) {
        var t;
        (t = Tool_1.default.getPrefab(this.weaponContainer, this.weaponCardPre, "" + c).getComponent(WeaponCard_1.default)).initAsInStorage(c, this);
        t.refreshDeployBtns();
      }
      doStarUpAll() {
        var c, r = 100;
        for (var w in c = false, cc.player.weaponInfo) for (var g = parseInt(w), m = n.Datas.WeaponStar[r * g + cc.player.weaponInfo[w][1] + 1]; m && m.exp > 0 && cc.player.weaponInfo[w][2] >= m.exp; ) {
          cc.player.weaponInfo[w][2] -= m.exp;
          cc.player.weaponInfo[w][1]++;
          cc.pvz.PlayerData.createNewWeaponRandomPro(w, cc.player.weaponInfo[w][1] - 1);
          c = true;
          m = n.Datas.WeaponStar[r * g + cc.player.weaponInfo[w][1] + 1];
        }
        c && (this.refreshUsing(), this.refreshStorage(), cc.popupManager.showToast(n.Datas.Tips[3].v), 
        this.autoStarBtn.active = false, RedPointManager_1.default.check("WeaponStarUp", {}), 
        cc.pvz.PlayerData.saveData());
      }
      showGetWeapon() {
        Tool_1.default.canGetWeapon() ? cc.SubwindowManager.showWindow(v.UIStatus.WeaponGet, {}) : cc.popupManager.showToast(n.Datas.Tips[15].v);
      }
      showWeaponPro() {
        cc.SubwindowManager.showWindow(v.UIStatus.WeaponPro, {});
      }
      show(c) {
        void 0 === c && (c = {
          par: null
        });
        this.par = c.par;
        this.refreshUsing();
        this.refreshStorage();
      }
      hide() {
        cc.SubwindowManager.hideWindow(v.UIStatus.Weapon);
        this.par ? this.par.refresh() : cc.MainUI.pageContainer[3].getComponentInChildren("Page4").refresh();
      }
      start() {}
    };
    __decorate([ property(cc.Prefab) ], WeaponWindow.prototype, "weaponCardPre", void 0);
    __decorate([ property(cc.Node) ], WeaponWindow.prototype, "weaponUsing", void 0);
    __decorate([ property(cc.Node) ], WeaponWindow.prototype, "weaponContainer", void 0);
    __decorate([ property(cc.Label) ], WeaponWindow.prototype, "countStr", void 0);
    __decorate([ property(cc.Node) ], WeaponWindow.prototype, "autoStarBtn", void 0);
    WeaponWindow = __decorate([ ccclass ], WeaponWindow);
    exports.default = WeaponWindow;
    cc._RF.pop();
  }, {
    "./ConfigCtrl": "ConfigCtrl",
    "./RedPointManager": "RedPointManager",
    "./SubwindowManager": "SubwindowManager",
    "./Tool": "Tool",
    "./WeaponCard": "WeaponCard"
  } ],
  WidgetEx: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1aa4em4XgxFwI4RW4nNQh/U", "WidgetEx");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass} = cc._decorator;
    let WidgetEx = class WidgetEx extends cc.Component {
      onLoad() {
        this.node.getComponent(cc.Widget).target = cc.find("Canvas");
        this.node.getComponent(cc.Widget).updateAlignment();
      }
    };
    WidgetEx = __decorate([ ccclass ], WidgetEx);
    exports.default = WidgetEx;
    cc._RF.pop();
  }, {} ],
  WxClubBtn: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7893b+K+KlGKJACDY5+yX5T", "WxClubBtn");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let WxClubBtn = class WxClubBtn extends cc.Component {
      constructor() {
        super(...arguments);
        this.url = "";
      }
      onLoad() {
        var c;
        c = this;
        cc.sys.platform == cc.sys.WECHAT_GAME && setTimeout(function() {
          c.createBtn();
        });
      }
      createBtn() {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) if (this.clubBtn) this.setVisible(true); else {
          var v, f, d, l, _, p, w, g;
          v = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
          g = cc.view.getViewportRect();
          l = this.node.getBoundingBoxToWorld();
          d = cc.view.getScaleX();
          l.x += g.x / d;
          l.y += g.y / d;
          w = d / (f = cc.view.getDevicePixelRatio());
          p = cc.view.getScaleY() / f;
          _ = {
            type: "text",
            text: "",
            style: {
              left: l.x * w,
              top: v.windowHeight - (l.y + l.height) * p,
              width: l.width * w,
              height: l.height * p
            }
          };
          this.clubBtn = wx.createGameClubButton(_);
          this.clubBtn.show();
        } else console.log("createBtn");
      }
      setVisible(c) {
        c ? this.clubBtn ? this.clubBtn.show() : this.createBtn() : this.clubBtn && this.clubBtn.hide();
      }
    };
    __decorate([ property ], WxClubBtn.prototype, "url", void 0);
    WxClubBtn = __decorate([ ccclass ], WxClubBtn);
    exports.default = WxClubBtn;
    cc._RF.pop();
  }, {} ],
  footage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f11b5QjXjJLnZdWu4LfkOm5", "footage");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Footage = class Footage extends cc.Component {
      constructor() {
        super(...arguments);
        this.spine = null;
        this.cutOut = null;
        this.speedLabel = null;
      }
      onLoad() {
        var e = this;
        this.cutOut.node.active = false;
        this.spine.setAnimation(0, "action1_1", false);
        this.spine.setCompleteListener(function() {
          e.spine.setAnimation(0, "action2_2", false);
          e.spine.setCompleteListener(function() {
            e.startLoadGame();
          });
        });
        this.spine.setEventListener(function(e, t) {
          t.stringValue && cc.butler.playEffectAsync("music", t.stringValue);
        });
        this.timeScaleLevel = 0;
        this.maxTimeScaleLv = 3;
        this.updateSpeed();
        cc.pvz.TAUtils.zlTrack("TUTORIAL_START", {});
      }
      updateSpeed() {
        cc.pvz.timeScale = [ 1, 1.5, 2 ][this.timeScaleLevel];
        cc.director.getScheduler().setTimeScale(cc.pvz.timeScale);
        this.spine.timeScale = cc.pvz.timeScale;
        var e = 1 + this.timeScaleLevel;
        this.speedLabel.string = "x" + parseFloat(e.toFixed(1));
      }
      startLoadGame() {
        if (cc.pvz.showOpOnly) setTimeout(function() {
          cc.pvz.timeScale = 1;
          cc.director.getScheduler().setTimeScale(1);
          cc.director.loadScene("loading");
        }, 1e3); else {
          var e = this.cutOut.node;
          cc.pvz.runtimeData.init(0, 1, 1);
          cc.director.loadScene("game", function() {
            var t = e.getComponent(cc.Animation);
            t.play();
            t.once("finished", function() {
              cc.game.removePersistRootNode(e);
              e.destroy();
              cc.pvz.TAUtils.zlTrack("TUTORIAL_FINISH", {});
            });
          });
          e.active = true;
          cc.game.addPersistRootNode(e);
        }
      }
      onClickSpeed() {
        var e = (this.timeScaleLevel + 1) % this.maxTimeScaleLv;
        this.timeScaleLevel = e;
        this.updateSpeed();
      }
    };
    __decorate([ property(sp.Skeleton) ], Footage.prototype, "spine", void 0);
    __decorate([ property(cc.Animation) ], Footage.prototype, "cutOut", void 0);
    __decorate([ property(cc.Label) ], Footage.prototype, "speedLabel", void 0);
    Footage = __decorate([ ccclass ], Footage);
    exports.default = Footage;
    cc._RF.pop();
  }, {} ],
  loading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4fb22yK5QBL776TWeRI2qRH", "loading");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const NetworkManager_1 = require("./NetworkManager");
    const ConfigCtrl_1 = require("../lobby/ConfigCtrl");
    var r;
    var f = NetworkManager_1.default;
    const {ccclass: ccclass, property: property} = cc._decorator;
    let Loading = class Loading extends cc.Component {
      constructor() {
        super(...arguments);
        this.progressBar = null;
        this.progressLabel = null;
      }
      onLoad() {
        cc.player = {
          soundVolume: 1,
          musicVolume: 1
        };
        cc.sys.localStorage.removeItem("80day-rt1");
        this.initEngine();
        this.bundles = [ "image", "music", "skins", "lobby", "game", "footage" ];
        this.index = 0;
        this.loadBundle();
        this.total = this.bundles.length + 1;
        this.singleTime = Math.max(.3, 1.8 / this.total);
        this.barProgress = 0;
        this.progressBar.progress = 0;
        this.updateProgress();
      }
      onProgressChanged() {
        this.barProgress++;
        this.updateProgress();
      }
      updateProgress() {
        var c = (this.barProgress + 1) / this.total;
        cc.tween(this.progressBar).to(this.singleTime, {
          progress: c
        }).start();
      }
      update() {
        this.progressLabel.string = (100 * this.progressBar.progress).toFixed(2) + "%";
        0 !== f.LoginAndLoadDataOk && (f.LoginAndLoadDataOk = 0, this.intoGame());
      }
      initEngine() {
        cc.debug.setDisplayStats(false);
        cc.macro.ENABLE_MULTI_TOUCH = false;
        cc.isControlAd = true;
        cc.sys.platform == cc.sys.WECHAT_GAME ? (wx.setKeepScreenOn({
          keepScreenOn: true
        }), wx.onError(function(t) {
          cc.pvz.TAUtils.trackError(t.message);
        })) : cc.sys.platform == cc.sys.BYTEDANCE_GAME && tt.setKeepScreenOn({
          keepScreenOn: true,
          success: function() {},
          fail: function() {}
        });
        cc.CollisionManager.prototype.removeCollider = function(t) {
          var u = this._colliders.indexOf(t);
          if (u >= 0) {
            cc.js.array.fastRemoveAt(this._colliders, u);
            for (var s = this._contacts, f = [], v = s.length - 1; v >= 0; v--) {
              var h = s[v];
              h.collider1 !== t && h.collider2 !== t || (h.touching && this._doCollide(3, h), 
              f.push(v));
            }
            f.sort(function(t, n) {
              return n - t;
            });
            f.forEach(function(t) {
              cc.js.array.fastRemoveAt(s, t);
            });
            t.node.off(cc.Node.EventType.GROUP_CHANGED, this.onNodeGroupChanged, this);
          } else cc.errorID(6600);
        };
      }
      loadBundle() {
        var n = this, r = this.bundles[this.index];
        cc.assetManager.loadBundle(r, function() {
          n.index++;
          n.onProgressChanged();
          n.index >= n.bundles.length ? n.onBundlesReady() : n.loadBundle();
        });
      }
      onBundlesReady() {
        console.log("[loading] onBundlesReady");
        try {
          cc.pvz.AdUtils.initAllAds();
        } catch (e) {
          console.error("[loading] initAllAds failed:", e);
        }
        try {
          cc.pvz.TAUtils.initShareConfig();
        } catch (e) {
          console.error("[loading] initShareConfig failed:", e);
        }
        try {
          cc.pvz.PlayerData.initPlayerData();
        } catch (e) {
          console.error("[loading] initPlayerData failed:", e);
        }
        console.log("[loading] calling initConfigDatas...");
        ConfigCtrl_1.initDatas(function() {
          console.log("[loading] config data loaded, calling login...");
          f.login(function() {
            console.log("[loading] login callback, calling loadData...");
            f.loadData(function() {
              console.log("[loading] loadData callback, setting LoginAndLoadDataOk=1");
              f.LoginAndLoadDataOk = 1;
              cc.is1st && cc.pvz.TAUtils.zlTrack("USER_REGISTER", {});
            });
          });
        });
      }
      intoGame() {
        console.log("[loading] intoGame, cc.is1st=" + cc.is1st + ", cc.butler=" + !!cc.butler);
        var o = 101;
        setInterval(function() {
          cc.pvz.PlayerData.increaseMissionProg(103, 1, 0);
        }, 6e4);
        cc.player.dailyInfo.prog[o] || cc.pvz.PlayerData.increaseMissionProg(o, 1, 1);
        if (cc.is1st) {
          console.log("[loading] \u9996\u6b21\u73a9\u5bb6\uff0c\u8df3\u8f6c footage");
          cc.assetManager.loadBundle("footage", function() {
            cc.director.loadScene("footage");
          });
        } else {
          console.log("[loading] \u8001\u73a9\u5bb6\uff0c\u8df3\u8f6c main");
          cc.butler.loadScene("main");
        }
      }
    };
    __decorate([ property(cc.ProgressBar) ], Loading.prototype, "progressBar", void 0);
    __decorate([ property(cc.Label) ], Loading.prototype, "progressLabel", void 0);
    Loading = __decorate([ ccclass ], Loading);
    exports.default = Loading;
    cc._RF.pop();
  }, {
    "../lobby/ConfigCtrl": "ConfigCtrl",
    "./NetworkManager": "NetworkManager"
  } ],
  utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33107qyh5RKgqzGjxDwI8NS", "utils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var h, d, w;
    var o = "Cannot find module '";
    var y = {
      getRGBColor: function(t) {
        var r = new cc.Color();
        return r.fromHEX(t), r;
      },
      getReminDays: function(t, n) {
        var c = Date.now() - n;
        return t - Math.floor(c / 864e5);
      },
      getTodayZeroTimes: function() {
        var t = Date.now();
        return t - t % 864e5;
      },
      getTodayEndedMs: function() {
        var c = 59, e = new Date();
        return new Date(e.getFullYear(), e.getMonth(), e.getDate(), 23, c, c).getTime();
      },
      getTodayLastTimes: function() {
        var r = 59, c = new Date(), e = new Date(c.getFullYear(), c.getMonth(), c.getDate(), 23, r, r);
        return Math.floor((e - c) / 1e3);
      },
      getServerDayLastTimes: function(t) {
        var c = 59, e = new Date(t);
        e.setHours(23, c, c, 999);
        var i = e.getTime() - t;
        return i = Math.max(i, 0), Math.floor(i / 1e3);
      },
      getCurDayInYears: function() {
        var r = new Date().getFullYear().toString(), c = new Date() - new Date(r) + 288e5;
        return Math.ceil(c / 864e5) + 1;
      },
      getDate: function() {
        var r = new Date();
        return 1e4 * r.getFullYear() + 100 * r.getMonth() + r.getDate();
      },
      getStartOfWeek: function() {
        var r = new Date(), c = r.getDay(), e = 0 == c ? -6 : 1 - c;
        return r.setDate(r.getDate() + e), r.setHours(0, 0, 0, 0), r.getTime();
      },
      getCurDayInWeek: function() {
        var t = new Date().getDay();
        return 0 == t ? 7 : t;
      },
      formatNumInGame: function(t) {
        var r = 1e3, c = 1e6, e = 1e9;
        if (t >= r) {
          var i = 2, o = null;
          return t < c ? (i = r, o = "K") : t < e ? (i = c, o = "M") : (i = e, o = "B"), t /= i, 
          parseFloat(t.toFixed(2)) + o;
        }
        return t;
      },
      formatItemNum: function(t) {
        var r = 1e3;
        if (c < 1e4) return t;
        var e = parseInt(c / r);
        return (e = (c / r).toFixed((c - r * e) % 100 == 0 ? 1 : 2)) + "k";
      },
      formatItemNum2: function(t) {
        return t < 100 ? t : String(t).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      foramtAttributeNum: function(t) {
        return 10 * t % 10 == 0 ? r.toFixed(0) : r.toFixed(1);
      },
      randomInArr: function(t) {
        return t[cc.math.randomRangeInt(0, t.length)];
      },
      randomInArrN: function(t, n, r) {
        void 0 === r && (r = false);
        var o = t.map(function(t) {
          return t;
        });
        if (t.length <= n && !r) return o;
        for (var a = [], u = 0; u < n; u++) {
          var s = cc.math.randomRangeInt(0, o.length), f = o.splice(s, 1)[0];
          a.push(f);
        }
        return a;
      },
      randomWeightIndex: function(t) {
        for (var c = 0, e = [ 0 ], i = t.length, o = 0; o < i; o++) {
          c += t[o];
          e.push(c);
        }
        for (var a = Math.random() * e[e.length - 1] - 1, u = 0, s = 0, f = 0, v = e.length - 1; f < v; ) if ((s = e[(u = parseInt((f + v) / 2)) + 1]) < a) f = u + 1; else {
          if (!(s > a)) {
            f = u;
            break;
          }
          v = u;
        }
        return f;
      },
      getZIndex: function(t) {
        return t.zIndex;
      },
      checkZIndex: function(t, n) {
        return t.zIndex <= n.zIndex;
      },
      getTargetLength: function(t, n) {
        return t.position.sub(n.position).len();
      },
      getSpineCurrentName: function(t) {
        return t.animation;
      },
      getTargetNodeComponent: function(t, n) {
        return t.getComponent(n);
      },
      ComputeBulletPosition: function(t, n) {
        var e = cc.v2(n.worldX, n.worldY);
        return t.convertToWorldSpaceAR(e);
      },
      ComputeDistance: function(t, n) {
        var o = t.convertToWorldSpaceAR(cc.v2()), a = n.convertToWorldSpaceAR(cc.v2());
        return o.sub(a).mag();
      },
      ComputeListSum: function(t) {
        return t.reduce(function(t, n) {
          return t + n;
        }, 0);
      },
      getRotationRadians: function(t, n) {
        var c = n.sub(t);
        return Math.atan2(c.y, c.x);
      },
      getRotationAngle: function(t, n) {
        return 180 * this.getRotationRadians(t, n) / Math.PI;
      },
      shuffleArray: function(t) {
        for (var n, r, i = t.length; i; ) {
          r = Math.floor(Math.random() * i--);
          n = t[i];
          t[i] = t[r];
          t[r] = n;
        }
        return t;
      },
      compareVersion: function(t, n) {
        t = t.split(".");
        n = n.split(".");
        for (var o = Math.max(t.length, n.length); t.length < o; ) t.push("0");
        for (;n.length < o; ) n.push("0");
        for (var a = 0; a < o; a++) {
          var u = parseInt(t[a]), s = parseInt(n[a]);
          if (u > s) return 1;
          if (u < s) return -1;
        }
        return 0;
      },
      formatCDTime: function(t) {
        var c = 60, e = 86400, i = 3600, a = "\u5c0f\u65f6", u = "", s = t % c;
        if (t >= e) {
          u += Math.floor(t / e) + "\u5929";
          u += Math.floor(t / i % 24) + a;
        } else {
          if (t >= i) return (u += Math.floor(t / i) + a) + (Math.floor(t / c % c) + "\u5206");
          if (t > c) return (u += Math.floor(t / c % c) + "\u5206") + Math.floor(s) + "\u79d2";
          s > 0 && (u += Math.floor(s) + "\u79d2");
        }
        return u;
      },
      formatSeconds3: function(t, n) {
        var i = 3600, o = 60;
        void 0 === n && (n = true);
        var f = Math.floor(t / i);
        t -= i * f;
        var v = Math.floor(t / o), h = t % o;
        return f = f.toString().padStart(2, "0"), (n ? f + ":" : "") + (v = v.toString().padStart(2, "0")) + ":" + h.toString().padStart(2, "0");
      },
      formatSeconds4: function(t) {
        var e = 60, a = t % e;
        return Math.floor(t / e).toString().padStart(2, "0") + ":" + a.toString().padStart(2, "0");
      },
      formatSeconds: function(t) {
        var c = 60, e = 3600, o = t % c, a = "";
        return t >= e && (a += Math.floor(t / e) + "\u5c0f\u65f6"), t >= c && (a += Math.floor(t / c % c) + "\u5206"), 
        o > 0 && (a += Math.floor(o) + "\u79d2"), a;
      },
      formatSeconds2: function(t) {
        var r = 60, c = t % r, e = "";
        if (t >= r) {
          var i = t / r;
          e += ((i = parseInt(i)) >= 10 ? i : "0" + i) + ":";
        } else e += "00:";
        return e + (c > 0 ? c >= 10 ? c : "0" + c : "00");
      },
      formatMillSeconds: function(t) {
        var r = 60, e = Math.floor(t), i = Math.floor(e / r), o = i + ":", a = t - r * i;
        return a < 10 && (o += "0"), o + a.toFixed(2);
      },
      uploadScore: function(t) {
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
          var e = [], i = {};
          i.key = String("s");
          i.value = String(t);
          e.push(i);
          wx.setUserCloudStorage({
            KVDataList: e,
            success: function() {},
            fail: function() {}
          });
        }
      },
      fadeInBtn: function(t) {
        t.opacity = 0;
        t.active = true;
        t.runAction(cc.fadeIn(.16));
      },
      bindSpine: function(t, n, r) {
        var e = t.attachUtil.generateAttachedNodes(n)[0];
        r.parent = e;
      },
      getbindSpine: function(t, n) {
        return t.attachUtil.generateAttachedNodes(n)[0].children[0];
      },
      bindSpines: function(t, n) {
        var c = t.attachUtil;
        n.forEach(function(t) {
          var e = c.generateAttachedNodes(t.bone)[0];
          t.node.parent = e;
        });
      },
      sendMsg: function(t, n, r, c) {
        if (void 0 === c && (c = 5e3), cc.sys.platform == cc.sys.BYTEDANCE_GAME) return new Promise(function(e, i) {
          var s = {
            url: t,
            data: n || {},
            method: r,
            success: function(t) {
              e(t.data);
            },
            fail: function(t) {
              i(t);
            },
            timeout: c
          };
          n && (s.data = n);
          tt.request(s);
        });
        if (cc.sys.platform == cc.sys.WECHAT_GAME) return new Promise(function(e, i) {
          var s = {
            url: t,
            data: n || {},
            method: r,
            success: function(t) {
              e(t.data);
            },
            fail: function(t) {
              i(t);
            },
            timeout: c
          };
          n && (s.data = n);
          wx.request(s);
        });
        var a = new XMLHttpRequest();
        return new Promise(function(e, i) {
          var f = function() {
            var n = xn, r = n[4], c = n[3], i = a.responseText;
            if (0 == i.length) {
              cc.error("empty response, url:", t);
              e({});
            } else {
              var o = JSON.parse(i);
              e("object" == typeof o && o ? o : i);
            }
            a = null;
            clearTimeout(h);
          }, v = function() {
            i("error:xhr status=" + a.status);
            a = null;
          }, h = setTimeout(function() {
            console.error("xhr timeout");
            a && (a.abort(), v());
          }, c);
          if (a.onreadystatechange = function() {
            var r = 400;
            4 == a.readyState && (a.status >= 200 && a.status < r ? f() : a.status >= r && v());
          }, console.log("xhr start by " + r + " method!url=" + t + ", data=" + n), a.open(r, t, true), 
          "POST" == r && n) {
            var l = new Blob([ JSON.stringify(n) ]);
            a.send(l);
          } else a.send();
        });
      },
      setSpriteFrame: function(t, n, r) {
        if (!t) return console.warn("sprite is null", n, r), void cc.pvz.TAUtils.trackError("sprite is null:" + n + "," + r);
        this.useBundleAsset(n, r, cc.SpriteFrame, function(n) {
          t.spriteFrame = n;
        });
      },
      setSpriteFrames: function(t, n, r) {
        this.useBundleAsset(n, r, cc.SpriteFrame, function(n) {
          t.forEach(function(t) {
            return t.spriteFrame = n;
          });
        });
      },
      useBundleAsset: function(t, n, r, c) {
        var o = function(t) {
          var i = t.get(n, r);
          i ? c(i) : t.load(n, r, function(t, n) {
            t ? (console.warn(t), cc.pvz.TAUtils.trackWarn(t.message)) : c(n);
          });
        }, a = cc.assetManager.getBundle(t);
        a ? o(a) : cc.assetManager.loadBundle(t, function(t, n) {
          t ? (console.warn(t), cc.pvz.TAUtils.trackWarn(t.message)) : o(n);
        });
      },
      releaseAsset: function(t, n, r) {
        var e = cc.assetManager.getBundle(t);
        e && e.get(n, r) && e.release(n, r);
      },
      manuallyCheckCollider: function(t, n) {
        void 0 === n && (n = null);
        for (var u = cc.director.getCollisionManager(), s = [], f = u._contacts[0].constructor, v = 0, h = 0, l = u._colliders, d = 0, w = l.length; d < w; d++) {
          var g = l[d];
          u.shouldCollide(t, g) && s.push(new f(t, g));
        }
        u.initCollider(t);
        u.updateCollider(t);
        var m = [];
        for (v = 0, h = s.length; v < h; v++) {
          var p = s[v].updateState();
          p !== f.CollisionType.None && m.push([ p, s[v] ]);
        }
        for (v = 0, h = m.length; v < h; v++) {
          var A = m[v];
          u._doCollide(A[0], A[1]);
        }
        return m.length > 0;
      },
      manuallyCheck2Collider: function(t, n) {
        var i = cc.director.getCollisionManager();
        return i.initCollider(t), i.initCollider(n), i.updateCollider(t), i.updateCollider(n), 
        new i._contacts[0].constructor(t, n).test();
      },
      updateColliders: function(t) {
        for (var r = cc.director.getCollisionManager(), c = 0, e = t.length; c < e; c++) {
          var i = t[c];
          r.initCollider(i);
          r.updateCollider(i);
        }
      },
      getCollideWith: function(t, n) {
        var o = cc.director.getCollisionManager();
        o._contacts[0] || console.error("s");
        o.initCollider(t);
        o.updateCollider(t);
        for (var u = 0, s = n.length; u < s; u++) {
          var f = n[u];
          if (o.initCollider(f), o.updateCollider(f), new o._contacts[0].constructor(t, f).test()) return f;
        }
        return null;
      },
      inRange2: function(t, n, r) {
        var c = r.x - t.x, e = r.y - t.y;
        return c * c + e * e / .49 <= n;
      },
      getRewardItem: function(t, n, r) {
        void 0 === r && (r = -1);
        var i = {};
        return i.itemId = t, i.count = n, i.toolId = r, i;
      },
      onChangeCNNUm: function(t) {
        return [ "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d", "\u5341" ][t - 1];
      },
      spineFromTo: function(t, n, r, c, e) {
        void 0 === c && (c = true);
        void 0 === e && (e = null);
        n && t.setAnimation(0, n, false);
        t.setCompleteListener(function() {
          t.setAnimation(0, r, c);
          o && o();
          t.setCompleteListener(null);
        });
      },
      nodeSetParent: function(t, n) {
        t && t.parent != n && (t.position = n.convertToNodeSpaceAR(t.convertToWorldSpaceAR(cc.Vec2.ZERO)), 
        t.parent = n);
      },
      normalizeAngle: function(t) {
        var n = 360;
        return (t % n + n) % n;
      },
      addValue: function(t, n, r) {
        t[n] ? t[n] = t[n] + r : t[n] = r;
      },
      doWhenSpineReady: function(t, n) {
        var r = this;
        t._skeleton ? n() : setTimeout(function() {
          r.doWhenSpineReady(t, n);
        });
      },
      IKtoLocalPos: function(t, n, r) {
        this.doWhenSpineReady(t, function() {
          var i = t.findBone("IK");
          t._skeleton.updateWorldTransform();
          var o = i.parent.worldToLocal(cc.v2(n, r));
          n && (i.x = o.x);
          r && (i.y = o.y);
        });
      },
      IKToWorldY: function(t, n) {
        var c = t.node.convertToNodeSpaceAR(cc.v2(0, n));
        this.IKtoLocalPos(t, null, c.y);
      },
      IKToWorldPos: function(t, n) {
        this.boneToWorldPos(t, "IK", n);
      },
      boneToNodePos: function(t, n, r) {
        this.doWhenSpineReady(t, function() {
          var e = t.findBone(n);
          t._skeleton.updateWorldTransform();
          var i = e.parent.worldToLocal(r);
          e.x = i.x;
          e.y = i.y;
        });
      },
      boneToWorldPos: function(t, n, r) {
        var e = t.node.convertToNodeSpaceAR(r);
        this.doWhenSpineReady(t, function() {
          var c = t.findBone(n);
          t._skeleton.updateWorldTransform();
          var i = c.parent.worldToLocal(e);
          c.x = i.x;
          c.y = i.y;
        });
      },
      getBoneNodePos: function(t, n) {
        void 0 === n && (n = "IK");
        var i = t.findBone(n);
        return t._skeleton.updateWorldTransform(), cc.v2(i.worldX, i.worldY);
      },
      getBoneWorldPos: function(t, n) {
        void 0 === n && (n = "IK");
        var i = t.findBone(n);
        t._skeleton.updateWorldTransform();
        var o = cc.v2(i.worldX, i.worldY);
        return t.node.convertToWorldSpaceAR(o);
      },
      lerpMap: function(t, n, r, c, e) {
        var a = (r - t) / (n - t);
        return a = cc.misc.clampf(a, 0, 1), cc.misc.lerp(c, e, a);
      },
      normalizeWeights: function(t, n, r) {
        void 0 === n && (n = "weight");
        void 0 === r && (r = "____r");
        var i = t.reduce(function(t, r) {
          return t + r[n];
        }, 0), o = t.map(function(t) {
          return JSON.parse(JSON.stringify(t));
        }), a = 0;
        return o.forEach(function(c, e) {
          a += c[n] / i;
          c[r] = a;
          t[e][r] = a;
        }), o;
      },
      randomFrom: function(t, n) {
        void 0 === n && (n = "____r");
        var c = Math.random();
        return t.find(function(t) {
          return c < t[n];
        });
      },
      numberToChinese: function(t) {
        var c = 1e4, e = [ "\u96f6", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u4e03", "\u516b", "\u4e5d" ];
        if (0 === t) return e[0];
        var i = function(t) {
          for (var r = [ "", "\u5341", "\u767e", "\u5343" ], c = "", i = 0, o = false; t > 0; ) {
            var a = t % 10;
            if (0 === a) o = true; else {
              var u = e[a] + r[i];
              o && (u += "".length > 0 ? e[0] : "", o = false);
              c = u + c;
            }
            i++;
            t = Math.floor(t / 10);
          }
          return c;
        }, o = "", a = [ "", "\u4e07", Qt ], u = 0, s = false;
        do {
          var f = t % c;
          o = i(f) + a[u] + (s ? e[0] : "") + o;
          t = (t - f) / c;
          u++;
          s = f < 1e3;
        } while (t > 0);
        return o.replace(/^\u4e00\u5341/, "\u5341");
      },
      formatStr: function(t, n) {
        return t.replace(/\{(\d+)\}/g, function(t, r) {
          return void 0 !== n[r] ? n[r] : t;
        });
      },
      trace: function(t) {
        try {
          throw new Error(t);
        } catch (t) {
          console.log(t.stack || t.message);
        }
      },
      syncNodePos: function(t, n) {
        t.position = t.parent.convertToNodeSpaceAR(n.convertToWorldSpaceAR(cc.Vec2.ZERO));
      },
      idCountArr2RewardList: function(t) {
        return cc.pvz.utils.idCountArrPushToRewardList([], t);
      },
      idCountArrPushToRewardList: function(t, n) {
        for (var r = n.length / 2, c = function() {
          var o = n[2 * e], a = n[2 * e + 1], u = t.find(function(t) {
            return t.itemId == o;
          });
          if (u) u.count += a; else {
            var s = cc.pvz.utils.getRewardItem(o, a);
            t.push(s);
          }
        }, e = 0; e < r; e++) c();
        return t;
      },
      startNumberTween: function(t, n, r, c, e) {
        void 0 === e && (e = false);
        true;
        var o = Date.now();
        !function r() {
          var f = Date.now(), v = Math.min((f - o) / (1e3 * c), 1), h = n + "/" * v;
          t.string = e ? cc.pvz.utils.formatItemNum2(Math.floor(h)) : Math.floor(h).toString();
          v < 1 && setTimeout(function() {
            r();
          });
        }();
      }
    };
    cc.pvz || (cc.pvz = {});
    cc.pvz.utils = y;
    exports.default = "/";
    cc._RF.pop();
  }, {} ]
}, {}, [ "footage", "Bullet", "ColliderProxy", "Enemy", "EnemyPoison", "EnemyTower", "EventCollider", "Game", "GameBirds", "GameComponent", "GameDropKt", "GameLaser", "GameMine", "GamePlane", "GamePoison", "GameRoar", "GameSkin8Line", "GameSkin9Stick", "GameTestSkills", "GameTestSkins", "GameTower", "GameTowerUI", "Hero", "PropNode", "SkillIcon", "UIGameBack", "UIGameBuff", "UIGameBuffItem", "UIGameKt", "UIGameOver", "UIGameRevive", "UIGameWin", "AdBuffPanel", "AdBuffWindow", "AdTicketWindow", "AlertWindow", "ArchieveWindow", "AuthWindow", "BpChange", "CDKeyWindow", "CheckGuideProg", "ClearDataWindow", "ColorAss2D", "ConfigCtrl", "Coor", "DataProbe", "DynamicScrollView", "EffSpine", "EnabledBtn", "EquipDecompWindow", "EquipIcon", "EquipInfoWindow", "EquipRandomPro", "EquipStageBuff", "EquipStageInfoWindow", "EquipStagePanel", "ExitLevelBonusWindow", "FakeBattleground", "FakeEnemy", "FakeGoldCoin", "FingerPosRecord", "FitToBottom", "FlyingBonus", "GameClubPanel", "GameClubWindow", "GetItemWindow", "GetNewSkillWindow", "GetNewSkinWindow", "GetSkinWindow", "GoldStageInfoWindow", "GrowRoadLevelInfo", "GrowRoadUnlockWindow", "GrowRoadWindow", "HeroSkin", "InviteKeyWindow", "InviteWindow", "ItemIcon", "ItemInfoWindow", "ItemNumStr", "LabInfoWindow", "LabItem", "LabWindow", "MailInfo2Window", "MailInfoWindow", "MailPanel", "MailWindow", "MainUI", "MetaStageInfoWindow", "MetaStagePanel", "MissionMain", "MissionPanel", "Nevigator", "Page1", "Page2", "Page3", "Page4", "Page5", "PanelNevigator", "PatrolWindow", "PlayerData", "Pool", "PreGameWindow", "ProInfoAllWindow", "QRCodeWindow", "RankUserInfo", "RankUserWindow", "RanklistWindow", "RedPoint", "RedPointManager", "SetWindow", "ShopItem", "ShopWindow", "SignPanel", "SignWindow", "SkillCard", "SkillInfoWindow", "SkinIcon", "SkinProWindow", "SlotGrid", "SlotsWindow", "SpineCtrl", "StaminaAdGetWindow", "StaminaFreeGetWindow", "StaminaPanel", "SubwindowManager", "Tool", "TowerProPanel", "TowerSetCard", "TowerSetInfoWindow", "TowerSetPanel", "UIADMiniGame", "UIDaifuOver", "UIDaifuPause", "UnlockNewFunc", "UpgradeProNum", "UserIcon", "WXAuthBtn", "WeaponCard", "WeaponGetWindow", "WeaponInfoWindow", "WeaponProWindow", "WeaponRandomPro", "WeaponWindow", "WidgetEx", "WxClubBtn", "AdUtils", "AutoScale", "Butler", "ContentAdapter", "CustomSafeArea", "GameConst", "MyRequest", "NetworkManager", "PopupManager", "PrefabInfo", "RemoveWhenComplete", "RuntimeData", "TAUtils", "loading", "utils" ]);