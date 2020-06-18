function chkEmail(str) {
  let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  return !regExp.test(str) ? false : true;
}

function chkPwd(str) {
  var pw = str;
  var num = pw.search(/[0-9]/g);
  var eng = pw.search(/[a-z]/gi);
  var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if (pw.length < 8 || pw.length > 20) {
    // $('span#password-helper').text("8자리 ~ 20자리 이내로 영문,숫자,특수문자를 혼합하여 입력해주세요.");
    return false;
  }

  if (pw.search(/₩s/) != -1) {
    // $('span#password-helper').text("공백없이 입력해주세요.");
    return false;
  }

  if (num < 0 || eng < 0 || spe < 0) {
    // $('span#password-helper').text("영문,숫자,특수문자를 혼합하여 입력해주세요.");
    return false;
  }

  return true;
}

module.exports = {
  chkEmail,
  chkPwd,
};
