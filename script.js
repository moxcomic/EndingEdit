// EndingEdit，作者 bin
if (game) {
  const old = {
    "_showInfo_mj": uiscript.UI_Win.prototype._showInfo_mj,
    "_showInfo_record": uiscript.UI_Win.prototype._showInfo_record
  }
  class Edit {
    constructor() {
      this.time = 0;
      this.parameter = {
        /** 比如六倍役满*/
        'title_id': null,
        /** 手牌,长度过长时游戏崩溃可能,最长不超过18*/
        'hand': [],
        /** 要胡的牌*/
        'hupai': '',
        /** 宝牌指示器的数组,最高长度5,否则游戏崩溃*/
        'doras': [],
        /** 里宝牌指示器的数组,最高长度5,否则游戏崩溃*/
        'lidoras': [],
        /** 是否为役满*/
        'yiman': false,
        /** 是否为自摸*/
        'zimo': false,
        /** 符数最高3位*/
        'fu': 0,
        /** 番数最高2位*/
        'fan': 0,
        /** 总点数,为庄家时总点数会变成设定值的1.5倍 */
        'score': 0,
        /** 标准格式 { "name": String, "id": Number }*/
        'fans': [],
        /**
         * "kezi(1z,1z,1z)"
         * "shunzi(1z,1z,1z)"
         * "angang(1z,1z,1z,1z)"
         * "minggang(1z,1z,1z,1z)"
         */
        'ming': []
      };
      this.atGame = true;
      this.atRecord = true;
    }
    /**
     * 通过json快速设置参数
     * @param {String} title_id 标题
     * @param {Array} hand 手牌
     * @param {String} hupai 胡牌
     * @param {Array} doras 宝牌指示器
     * @param {Array} lidoras 里宝牌指示器
     * @param {boolean} liqi 立直
     * @param {boolean} yiman 役满
     * @param {boolean} zimo 自摸
     * @param {Number} fu 符数
     * @param {Number} fan 番数
     * @param {Number} score 点数
     * @param {Array} fans 番种
     * @param {Array} ming 明牌
     */
    build({
      'title_id': title_id,
      'hand': hand,
      'hupai': hupai,
      'doras': doras,
      'lidoras': lidoras,
      'yiman': yiman,
      'zimo': zimo,
      'fu': fu,
      'fan': fan,
      'score': score,
      'fans': fans,
      'ming': ming
    }) {
      this.times = 1;
      this.parameter['title_id'] = title_id < 12 && title_id > 0 ? title_id : null;
      if (hand instanceof Array) this.parameter['hand'] = hand;
      if (typeof hupai == "string") this.parameter['hupai'] = hupai;
      if (doras instanceof Array) this.parameter['doras'] = doras;
      if (lidoras instanceof Array) this.parameter['lidoras'] = lidoras;
      if (typeof yiman == 'boolean') this.parameter['yiman'] = yiman;
      if (typeof zimo == 'boolean') this.parameter['zimo'] = zimo;
      if (typeof fu == 'number') this.parameter['fu'] = fu;
      if (typeof fan == 'number') this.parameter['fan'] = fan;
      if (typeof score == 'number') this.parameter['score'] = score;
      if (fans instanceof Array) this.parameter['fans'] = fans;
      if (ming instanceof Array) this.parameter['ming'] = ming;
      return this.times;
    };
    /**
     * @returns {boolean} 是否启用
     */
    get isopen() {
      return this.time > 0
    }
    get 预设() {
      const _this = this;
      const ret = {
        /**
         * 国士无双十三面
         * @param {String} hupai 要胡的牌
         */
        国士无双十三面(hupai = '1z') {
          return _this.build({
            'title_id': 6,
            'hand': ['1m', '9m', '1p', '9p', '1s', '9s', '1z', '2z', '3z', '4z', '5z', '6z', '7z'],
            'hupai': hupai,
            'yiman': true,
            'fu': 0,
            'fan': 0,
            'score': 64000,
            'fans': [{
              name: "国士无双十三面",
              id: 49
            }],
          });
        },
        /**
         * 天地创造
         * @param {String} hand 手上的牌
         * @param {String} doras 宝牌指示器
         */
        天地创造(hand = '5z', doras = '5z') {
          return _this.build({
            'title_id': 10,
            'hand': [hand, hand],
            'hupai': hand,
            'doras': [doras, doras, doras, doras, doras],
            'lidoras': [doras, doras, doras, doras, doras],
            'yiman': true,
            'zimo': true,
            'fu': 0,
            'fan': 0,
            'score': 192000,
            'fans': [{
              "name": "天地创造"
            }],
            'ming': ['angang(' + hand + ',' + hand + ',' + hand + ',' + hand + ')', 'minggang(' + hand + ',' + hand + ',' + hand + ',' + hand + ')']
          });
        },
        /**
         * 大四喜
         * @param {String} duizi 对子
         */
        大四喜(duizi = '3s') {
          return _this.build({
            'title_id': 6,
            'hand': [duizi, '1z', '1z', '1z', '2z', '2z', '2z', '3z', '3z', '3z', '4z', '4z', '4z'],
            'hupai': duizi,
            'yiman': true,
            'fu': 0,
            'fan': 0,
            'score': 64000,
            'fans': [{
              "name": "大四喜",
              id: 50
            }],
          });
        },
        /**
         * 纯正九莲宝灯
         * @param {String} paitype 牌的种类 
         * @param {String} hupai 要胡的牌
         */
        纯正九莲宝灯(paitype = 'm', hupai = '7') {
          return _this.build({
            'title_id': 6,
            'hand': ['1' + paitype, '1' + paitype, '1' + paitype, '2' + paitype, '3' + paitype, '4' + paitype, '5' + paitype, '6' + paitype, '7' + paitype, '8' + paitype, '9' + paitype, '9' + paitype, '9' + paitype],
            'hupai': hupai + paitype,
            'yiman': true,
            'fu': 0,
            'fan': 0,
            'score': 64000,
            'fans': [{
              "name": "纯正九莲宝灯",
              id: 47
            }],
          });
        },
        /**
         * 四暗刻单骑
         * @param {[string,string,string,string]} kezi 暗刻的牌
         * @param {String} hupai 听牌
         */
        四暗刻单骑(kezi = ['1m', '2p', '3s', '4z'], hupai = '5s') {
          return _this.build({
            'title_id': 6,
            'hand': [kezi[0], kezi[0], kezi[0], kezi[1], kezi[1], kezi[1], kezi[2], kezi[2], kezi[2], kezi[3], kezi[3], kezi[3], hupai],
            'hupai': hupai,
            'yiman': true,
            'fu': 0,
            'fan': 0,
            'score': 64000,
            'fans': [{
              name: "四暗刻单骑",
              id: 48
            }],
          });
        },
      }
      return ret;
    }
    get tools() {
      const ret = {
        creatfans(id) {
          let f = {
              "name": null,
              "id": 0
            },
            type = typeof id;
          if (type === "string")
            cfg.fan.fan.forEach((t) => t.name_chs === id && (f.id = t.id, f.name = t["name_" + GameMgr.client_language]))
          else if (type === "number")
            f.name = cfg.fan.fan.get(id)["name_" + GameMgr.client_language],
            f.id = id;
          else
            f.name = null,
            f.id = cfg.fan.fan.maxKey;
          return f;
        }
      }
      return ret;
    }
    get getPara() {
      return this.parameter;
    }
    /** 获取次数*/
    get times() {
      return this.time;
    }
    /** 设置次数*/
    set times(num) {
      if (num > 0)
        this.time = num,
        console.log("将会修改%d次胡牌界面", this.time)
      else
        this.time = 0
    }
    /**
     * @param {Boolean} bool
     */
    set atGame(bool) {
      const _this = this;
      if (bool)
        uiscript.UI_Win.prototype._showInfo_mj = function (t) {
          _this._EditJSON(t);
          return old._showInfo_mj.call(this, t)
        }
      else
        uiscript.UI_Win.prototype._showInfo_mj = function (t) {
          console.log("游戏时修改未开启");
          return old._showInfo_mj.call(this, t)
        }
      console.log("游戏时胡牌修改已" + (bool ? "开启" : "关闭"))
    }
    /**
     * @param {Boolean} bool
     */
    set atRecord(bool) {
      const _this = this;
      if (bool)
        uiscript.UI_Win.prototype._showInfo_record = function (t) {
          _this._EditJSON(t);
          return old._showInfo_record.call(this, t)
        }
      else
        uiscript.UI_Win.prototype._showInfo_record = function (t) {
          console.log("回放时修改未开启");
          return old._showInfo_record.call(this, t)
        }
      console.log("回放时胡牌修改已" + (bool ? "开启" : "关闭"))
    }
    /**
     * 修改胡牌数据方法
     * @param {json} t 数据
     */
    _EditJSON(t) {
      if (this.isopen) {
        let n = this.parameter['title_id'];
        t["title_id"] = n < 12 && n > 0 ? n : null;
        if ((this.parameter['hand'] instanceof Array) && this.parameter['hand'].length > 0)
          t["hand"] = this.parameter['hand'];
        if (typeof this.parameter['hupai'] == "string")
          t["hupai"] = this.parameter['hupai'];
        if ((this.parameter['doras'] instanceof Array) && this.parameter['doras'].length > 0)
          t["doras"] = this.parameter['doras'];
        if ((this.parameter['lidoras'] instanceof Array) && this.parameter['lidoras'].length > 0)
          t["lidoras"] = this.parameter['lidoras'];
        if (typeof this.parameter['yiman'] == "boolean")
          t["yiman"] = this.parameter['yiman'];
        if (this.parameter['zimo'] === true)
          t["mode"] = 0;
        if ((typeof this.parameter['fu'] == 'number'))
          t["fu"] = this.parameter['fu'];
        if ((typeof this.parameter['fan'] == 'number'))
          t["fan"] = this.parameter['fan'];
        if ((typeof this.parameter['score'] == 'number') && this.parameter['score'] > 0)
          t["score"] = t["mode"] ? this.parameter['score'] : this.parameter['score'] * 1.5;
        if ((this.parameter['fans'] instanceof Array) && this.parameter['fans'].length > 0)
          t["fan_ids"] = this.parameter['fans'].map(v => v.id ? v.id : cfg.fan.fan.maxKey),
          t["fan_names"] = this.parameter['fans'].map(v => v.name),
          t["fan_value"] = null;
        if (this.parameter['ming'] instanceof Array)
          t["ming"] = this.parameter['ming'];
        console.log('替换成功');
        this.times--;
      }
    }
    help(name) {
      switch (name) {
        case 'open':
          return '可直接设置,表示将会替换几次胡牌界面'
        case 'times':
          return '可直接设置,为0时不修改,大于0时每修改一次值-1,默认为0';
        case 'atGame':
          return '直接设置,为true时表示可以在游戏时修改胡牌界面,否则不修改,默认为true'
        case 'atRecord':
          return '直接设置,为true时表示可以在牌铺回放时修改界面,否则不修改,默认为true'
        case 'getPara':
        case 'parameter':
        case "build":
          return "{\n" +
            "\t'title_id': null,\n" +
            "\t'hand': ['手牌数组'],\n" +
            "\t'hupai': '要胡的牌',\n" +
            "\t'doras': ['宝牌数组'],\n" +
            "\t'lidoras': ['里宝牌数组'],\n" +
            "\t'yiman': false,\n" +
            "\t'zimo': false,\n" +
            "\t'fu': 0,\n" +
            "\t'fan': 0,\n" +
            "\t'score': 0,\n" +
            "\t'fans': [{name: 番名,id:番名对应id可以不写}],\n" +
            "\t'ming': ['副露数组'],\n" +
            "\t'//帮助': '更详细说明参见 EndingEdit.help(对应参数名)'\n" +
            "}";
        case 'title_id':
          return '数字,可选: 0-10 无用请设置成null'
        case 'hand':
          return '数组,最高长度为18,有副露情况下为减去副露长度,请至少设置一张牌'
        case 'hupai':
          return '字符串,要胡的牌'
        case 'doras':
          return '数组,宝牌指示器数组,最高长度为5,否则报错'
        case 'lidoras':
          return '数组,里宝牌指示器数组,最高长度为5,否则报错'
        case 'yiman':
          return '布尔,是否役满'
        case 'zimo':
          return '布尔,是否自摸'
        case 'fu':
          return '数值,役种累计符数,最高3位,役满情况设置成0'
        case 'fan':
          return '数值,役种累计番数,最高2位,役满情况设置成0'
        case 'score':
          return '数值,符番算点之后的总点数,与符数或番数无关'
        case 'fans':
          return '番种数组,格式{ "name": String,id:number},多种番种之间用(半角逗号)隔开,其中id部分可省略'
        case 'ming':
          return '副露字符串数组,多种副露之间用(半角逗号)隔开,例:\n"kezi(1z,1z,1z)",\n"shunzi(1z,1z,1z)",\n"angang(1z,1z,1z,1z)",\n"minggang(1z,1z,1z,1z)",本参数将会被无条件设置'
        case '预设':
          return '预设包,直接调用'
        case 'tools':
          return '工具类,用于简易(快速)创建一个番种'
        case 'help':
          return '用来修改胡牌界面的一个装逼用工具包'
        default:
          return 'EndingEdit.times: 数字字段,是否将会在下一次结算时更改结算参数,为0时不更改,默认为0\n' +
            'EndingEdit.build: 方法,通过JSON格式快速设置参数,全部参数参见 EndingEdit.parameter\n' +
            'EndingEdit.atGame: 此字段设置为true时将会在游戏时修改胡牌界面,默认为true\n' +
            'EndingEdit.atRecord: 此字段设置为true时将会在回放牌铺时修改胡牌界面,默认为true\n' +
            'EndingEdit.getPara: 方法,将会直接返回EndingEdit.parameter.注,当修改内部的值时EndingEdit.parameter内的值也会被修改\n' +
            'EndingEdit.parameter: 结算时将会更改的全部参数,无需更改的参数设置为  0  或  false  或  ""  或  []\n' +
            '关于parameter更详细参数介绍请参见: EndingEdit.help(参数名)';
      }
    }
  }

  if (!window.EndingEdit) {
    window.EndingEdit = new Edit();
    Majsoul_Plus["EndingEdit"] = {
      name: "天地创造",
      actions: {
        "帮助": () => uiscript.UIMgr.Inst.ShowErrorInfo(EndingEdit.help('help')),
        "修改次数+1": () => EndingEdit.times++,
        "关闭游戏时修改": () => EndingEdit.atGame = false,
        "开启游戏时修改": () => EndingEdit.atGame = true,
        "天地创造": () => EndingEdit.预设.天地创造(),
        "四暗刻单骑": () => EndingEdit.预设.四暗刻单骑(),
        "国士无双十三面": () => EndingEdit.预设.国士无双十三面(),
        "大四喜": () => EndingEdit.预设.大四喜(),
        "纯正九莲宝灯": () => EndingEdit.预设.纯正九莲宝灯()
      }
    }
    console.log('天地创造mod加载完毕,请使用EndingEdit.help()命令参看帮助');
  } else {
    console.warn("EndingEdit已被占用 -> 占用对象:", window.EndingEdit);
  }
}