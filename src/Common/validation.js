
export function validateName(userName) {
    console.log("********" + userName)
    var userNameRegex = /^[A-Za-z0-9 ]+$/;
    userName = userName.trim();
    if (userName == "" || userName == undefined || userName == null) {
        return { status: false, error: 'Please enter name.' };
    }
    else if (!userNameRegex.test(userName)) {
        return { status: false, error: 'Please enter valid name.' };
    }
    else {
        return { status: true, error: '' };
    }
}

export function validateFName(fname) {
    var fnameRegex = /^[A-Za-z ]+$/;
    // fname = fname.trim();
    if (fname == "" || fname == undefined || fname == null) {
        return { status: false, error: 'Please enter first name.' };
    }
    else if (!fnameRegex.test(fname)) {
        return { status: false, error: 'Please enter valid first name.' };
    }
    else {
        return { status: true, error: '' };
    }
}

export function validateMName(fname) {
    var fnameRegex = /^[A-Za-z ]+$/;
    // fname = fname.trim();
    if (fname == "" || fname == undefined || fname == null) {
        return { status: false, error: '' };
    }
    else if (!fnameRegex.test(fname)) {
        return { status: false, error: 'Please enter valid middle name.' };
    }
    else {
        return { status: true, error: ' ' };
    }
}

export function validateLName(lname) {
    var lnameRegex = /^[A-Za-z ]+$/;
    // lname = lname.trim();
    if (lname == "" || lname == undefined || lname == null) {
        return { status: false, error: 'Please enter last name.' };
    }
    else if (!lnameRegex.test(lname)) {
        return { status: false, error: 'Please enter valid last name.' };
    }
    else {
        return { status: true, error: '' };
    }
}

export function validateEmail(email) {
    var emailRegex = /^[A-Z0-9_]+([\.][A-Z0-9_]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,5})+$/i;
    email = email.trim();
    if (email == "" || email == undefined || email == null) {
        return { status: false, error: 'Please enter email address.' };
    }
    else if (!emailRegex.test(email)) {
        return { status: false, error: 'Please enter valid email address.' };
    }
    else {
        return { status: true, error: '' };
    }
}

export function validateMobileNo(mobileNo) {
    var mobileNoRegex = /^[0]?[789]\d{9}$/;
    mobileNo = mobileNo.trim();
    if (mobileNo == "" || mobileNo == undefined || mobileNo == null) {
        return { status: false, error: 'Please enter mobile number.' }
    }
    // else if (!mobileNoRegex.test(mobileNo)) {
    else if (mobileNo.length < 10 || mobileNo.length > 10) {
        return { status: false, error: 'Mobile number should contain 10 digits only.' };
    }
    else {
        return { status: true, error: '' }
    }
}

export function validateLandlineNo(landlineNo) {
    console.log('ff  ', landlineNo)
    var mobileNoRegex = /^[0]?[789]\d{9}$/;
    landlineNo = landlineNo.landlineNo.trim();
    if (landlineNo == "" || landlineNo == undefined || landlineNo == null) {
        return { status: false, error: '' }
    }
    else if (landlineNo.length < 10 || landlineNo.length > 10) {
        return { status: false, error: 'Landline number should contain 10 digits only.' };
    }
    else {
        return { status: true, error: '' }
    }
}

export function validatePostCode(postCode) {
    console.log('ff  ', postCode)
    var mobileNoRegex = /^[0]?[789]\d{9}$/;
    postCode = postCode.postCode.trim();
    if (postCode == "" || postCode == undefined || postCode == null) {
        return { status: false, error: '' }
    }
    else if (postCode.length < 10 || postCode.length > 10) {
        return { status: false, error: 'Post code should contain 10 digits only.' };
    }
    else {
        return { status: true, error: '' }
    }
}

export function validatePassword(password) {
    // var passwordRegex = /^ (?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    var passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    password = password.trim();
    if (password === "" || password === undefined || password === null) {
        return { status: false, error: 'Please enter password.' }
    }
    else if (password.length < 8) {
        return { status: false, error: 'Password should be atleast 8 characters.' };
    }
    // else if (!passwordRegex.test(password)) {
    //     return { status: false, error: 'Password must be at least 8 characters and include 1 special character ,1 digit and 1 capital letter.' };
    // }
    else {
        return { status: true, error: '' }
    }
}

export function validateCurrentPassword(password) {
    // var passwordRegex = /^ (?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    var passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    password = password.trim();
    if (password === "" || password === undefined || password === null) {
        return { status: false, error: 'Please enter password.' }
    }
    else if (password.length < 8) {
        return { status: false, error: 'Password should be atleast 8 characters.' };
    }
    else if (!passwordRegex.test(password)) {
        return { status: false, error: 'Password must be at least 8 characters and include 1 special character ,1 digit and 1 capital letter.' };
    }
    else {
        return { status: true, error: '' }
    }
}

export function validateNewPassword(password) {
    // var passwordRegex = /^ (?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    var passwordRegex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    password = password.trim();
    if (password === "" || password === undefined || password === null) {
        return { status: false, error: 'Please enter password.' }
    }
    else if (password.length < 8) {
        return { status: false, error: 'Password should be atleast 8 characters.' };
    }
    else if (!passwordRegex.test(password)) {
        return { status: false, error: 'Password must be at least 8 characters and include 1 special character ,1 digit and 1 capital letter.' };
    }
    else {
        return { status: true, error: '' }
    }
}

export function validateAddress(address) {
    var addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
    address = address.trim();
    if (address == "" || address == undefined || address == null) {
        return { status: false, error: 'Please enter address.' }
    }
    else if (!addressRegex.test(address)) {
        return { status: false, error: 'Please enter valid address.' };
    }
    else {
        return { status: true, error: '' }
    }
}

export function validateAmount(amount) {
    var amountRegex = /^[0-9/s]{3,5}$/;
    if (amount == "" || amount == undefined || amount == null) {
        return { status: false, error: 'Please enter amount.' }
    }
    else if (!amountRegex.test(amount)) {
        return { status: false, error: 'Please Enter valid amount.' }
    }
    else {
        return { status: true, error: '' }
    }
}

export function validateDigitalAddress(digital) {
    var DigitalAddressRegex = /^[A-Za-z]{2}-[0-9]{3}-[0-9]{4}$/;
    if (digital == "" || digital == undefined || digital == null) {
        return { status: false, error: 'Please enter digital address.' }
    }
    else if (!DigitalAddressRegex.test(digital)) {
        return { status: false, error: 'Please enter valid digital address.' }
    }
    else {
        return { status: true, error: '' }
    }
}

