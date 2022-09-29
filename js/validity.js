function Check(obj) {
    try {
        if (JSON.stringify(obj) === '{}') {
            alert("请指定挂载对象例如:el:'#diy1'");
        } else {
            if (obj.el === '') {
                alert("请指定挂载对象例如:el:'#diy1'");
                return;
            }
            this.el = obj.el || '';
            this.flag = true;
            //不为空
            this.emailRegular = obj.emailRegular || '/\S/';
            this.emailRulesTips = obj.emailRulesTips || 'X';
            //密码
            this.pwdRegular = obj.pwdRegular || '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$';
            this.pwdRulesTips = obj.pwdRulesTips || '字母与数组组合6-12位';
            this.confirmPwdTips = obj.confirmPwdTips || 'X';
            //手机
            this.phoneRegular = obj.phoneRegular || '^1(3|4|5|6|7|8|9)\\d{9}$';
            this.phoneRulesTips = obj.phoneRulesTips || 'X';
            //不为空
            
        }
    } catch (e) {
        alert("请指定挂载对象例如:el:'#diy1'");
    }

}

Check.prototype = {
    init: function () {
        if (this.el === undefined) {
            return false;
        }
        return this.checkDataFn(this.el);
    },
    $$: function (obj) {
        return document.querySelector(obj);
    },

    //错误获取焦点
    getFocusFn: function () {
        var listed = document.querySelectorAll(this.el + ' .diy');
        for (var j = 0; j < listed.length; j++) {
            if (!this.validationFn(listed[j])) {
                listed[j].focus();
                break;
            }
        }
    },

    //添加错误提示
    tipsHtmlFn: function (obj, str) {
        var node = document.createElement('span');
        node.style.color = 'red';
        // node.classList.add('tips');
        node.className = 'tips';
        if (str === undefined) {
            if (obj.getAttribute('diy-tips') === null || obj.getAttribute('diy-tips') === '') {
                node.innerHTML = '';
            } else {
                node.innerHTML = obj.getAttribute('diy-tips');
            }
        } else {
            node.innerHTML = str;
        }
        // obj.parentNode.insertBefore(node,obj); ////元素前添加元素
        obj.parentNode.appendChild(node); ////元素尾部添加元素
        obj.focus(); //获取焦点
        obj.style.border = "0.5px solid red"
        return node;
    },

    //默认验证
    defaultCheckFn: function (obj) {
        var reg = new RegExp(obj.getAttribute('regular'));
        return reg.test(obj.value);
    },
    //密码校验
    checkPwdFn: function (obj) {
        var reg = new RegExp(this.pwdRegular);
        return reg.test(obj.value);
    },
    //手机验证
    checkPhoneFn: function (obj) {
        var reg = new RegExp(this.phoneRegular);
        return reg.test(obj.value);
    },
    //邮箱验证
    checkEmailFn: function (obj) {
        var reg = new RegExp(this.emailRegular);
        return reg.test(obj.value);
    },
    //删除提示
    removeTipsFn: function (obj) {
        //如果提示存在删除
        if (obj.parentNode.querySelector('.tips') != null) {
            obj.parentNode.removeChild(obj.parentNode.querySelector('.tips')); //删除当前的提示
        }
        obj.style.border = "";
    },
    //去除首尾空格
    removeSpace: function (tempStr) {
        if (tempStr === null) {
            return '不符合自定义规则';
        }
        if (typeof tempStr === 'string') {
            return tempStr.replace(/(^\s*)|(\s*$)/g, '');
        } else {
            return tempStr.value.replace(/(^\s*)|(\s*$)/g, '');
        }
    },
    validationFn: function (obj) {
        this.removeTipsFn(obj);
        if (this.removeSpace(obj) === '' || this.removeSpace(obj) === null) {
            this.tipsHtmlFn(obj);
            return false;
        } else if (obj.getAttribute('regular') !== null) {  //自定义规则
            if (this.defaultCheckFn(obj) === false) {
                this.tipsHtmlFn(obj, this.removeSpace(obj.getAttribute('reg-tips')));
                return false;
            } else {
                return true;
            }
        } else if (obj.type === 'email') {
            if (this.checkEmailFn(obj) === false) {
                this.tipsHtmlFn(obj, this.emailRulesTips);
                return false;
            } else {
                return true;
            }
        } else if (obj.getAttribute('name') === 'phone') {
            if (this.checkPhoneFn(obj) === false) {
                this.tipsHtmlFn(obj, this.phoneRulesTips);
                return false;
            } else {
                return true;
            }
        } else if (obj.type === 'password') {
            if (this.checkPwdFn(obj) === false) {
                this.tipsHtmlFn(obj, this.pwdRulesTips);
                return false;
            } else {
                if (obj.getAttribute('name') === 'confirm-pwd') {
                    if (this.removeSpace(this.$$('input[name="pwd"]').value) !==
                        this.removeSpace(this.$$('input[name="confirm-pwd"]').value)
                    ) {
                        this.tipsHtmlFn(obj, this.confirmPwdTips);
                        return false;
                    } else {

                        return true;
                    }
                } else {
                    return true;
                }
            }
        } else {
            return true;
        }

    },
    //全局检查校验
    checkDataFn: function () {
        var checkList = document.querySelectorAll(this.el + ' .diy');
        try {
            for (var i = 0; i < checkList.length; i++) {
                if (!this.validationFn(checkList[i])) {
                    this.flag = false;
                }
            }
            this.getFocusFn();
            return this.flag;
        } catch (e) {
            console.log('请先确认，使用配置规则无误');
            console.log(e);
        }
    }
};