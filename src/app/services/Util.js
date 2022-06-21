import moment from 'moment'

const capitalizeFirstLetter = (str) =>
    str?.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

const replaceSpace = (str) => str.split(' ').join('_')

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const isTokenExpired = (token) => {
    let base64Url = token.split('.')[1]
    if (base64Url === undefined) return true

    console.log('base64Url: ', base64Url)

    let base64 = base64Url.replace('-', '+')
    if (base64 === undefined) return true

    base64 = base64.replace('_', '/')
    if (base64 === undefined) return true

    let json = JSON.parse(window.atob(base64))
    if (json === undefined) return true

    let exp = JSON.parse(window.atob(base64)).exp
    if (exp === undefined) return true

    exp *= 1000

    return exp <= new Date().getTime()
}
const getDateFromMillis = (millis) => {
    let date = new Date(millis)
    return (date.getDate() < 10 ? '0' : '') + date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear()
}

const getDateWithHourFromMillis = (millis) => {
    let d = new Date(millis)
    return (
        ('0' + d.getDate()).slice(-2) +
        '-' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '-' +
        d.getFullYear() +
        ' ' +
        ('0' + d.getHours()).slice(-2) +
        ':' +
        ('0' + d.getMinutes()).slice(-2)
    )
}

const doCommaSeparationWithIntegers = (amount) => {
    if (amount === null || amount === undefined) return '-'
    amount = amount.toString()
    if (amount.length <= 3) {
        return amount
    }
    let formattedAmount = ''
    for (let i = amount.length - 1, p = 0; i >= 0; i--, p++) {
        if (p >= 3 && (p - 3) % 2 === 0) formattedAmount = ','.concat(formattedAmount)
        formattedAmount = amount[i].concat(formattedAmount)
    }
    return formattedAmount
}

const convertToISODate = (dateObj) => {
    console.log(
        'convert function, dateObj: ' +
            dateObj +
            'full year: ' +
            dateObj.getFullYear() +
            ' month: ' +
            dateObj.getMonth() +
            ' day: ' +
            dateObj.getDate()
    )
    let date = dateObj.getFullYear()
    date += '-'
    if (dateObj.getMonth() < 9) date += '0' + (dateObj.getMonth() + 1) + '-'
    else date += dateObj.getMonth() + 1 + '-'
    if (dateObj.getDate() < 10) date += '0'
    date += dateObj.getDate()
    return date
}

const getOneWeekAgoMillis = () => {
    let start = new Date()
    start.setHours(0, 0, 0, 0)
    return start.getTime() - 7 * 24 * 60 * 60 * 1000
}

const convertToSelectOptions = (obj) => {
    let array = []
    for (let i in obj) {
        array.push({ value: parseInt(i, 10), label: obj[i] })
    }
    return array
}

const doCommaSeparationWithDecimals = (amount) => {
    if (amount === null || amount === undefined) return '-'
    amount = amount.toString()
    let minusFound = false
    if (amount.startsWith('-')) {
        minusFound = true
        amount = amount.substr(1)
    }
    amount = parseFloat(amount).toFixed(2)

    let lastIndex = amount.lastIndexOf('.')
    let formattedAmount = amount.substring(lastIndex)

    for (let i = lastIndex - 1, p = 0; i >= 0; i--, p++) {
        if (p >= 3 && (p - 3) % 2 === 0) formattedAmount = ','.concat(formattedAmount)
        formattedAmount = amount[i].concat(formattedAmount)
    }

    if (minusFound) formattedAmount = '-' + formattedAmount
    return formattedAmount
}

const convertToDateFromMiliSeconds = (input) => {
    return new Date(input).toLocaleDateString('en-GB')
}

const convertToDateTimeFromMiliSeconds = (input) => {
    return new Date(input).toLocaleString('en-GB')
}

const encodeQueryData = (data) => {
    let ret = [],
        temp
    for (let i in data) {
        temp = data[i]
        if (temp !== '' && temp !== null) {
            ret.push(encodeURIComponent(i) + '=' + encodeURIComponent(temp))
        }
    }
    return ret.length ? '?' + ret.join('&') : ''
}

const _getKey = () => {
    return Math.floor(Math.random() * 10000000) + Math.floor(Math.random() * 10000000)
}

const getToken = () => {
    let token = ''
    let rememberMe = localStorage.getItem('rememberMe')
    if (parseInt(rememberMe) === 1) {
        token = localStorage.getItem('token')
    } else {
        token = sessionStorage.getItem('token')
    }
    return token
}

const IMAGE_SOURCE = ['cloudfront.net']

const addImageSuffix = (imgUrl, suffix) => {
    if (!imgUrl) {
        return ''
    }
    let flag = true
    IMAGE_SOURCE.map((url) => {
        if (imgUrl.includes(url)) {
            flag = false
        }
    })

    if (flag) {
        return imgUrl
    }

    //checking the scaled image types
    if (!['jpeg', 'jpg', 'png'].includes(getImageExt(imgUrl))) {
        return imgUrl
    }

    let splits = imgUrl.split('.')
    let result = ''
    splits.map((item, i) => {
        if (i === splits.length - 1) {
            result += suffix + '.' + item
        } else if (i === 0) {
            result += item
        } else {
            result += '.' + item
        }
    })
    return result
}

const convertTimeToLocal = (date, time = '', outputFormat = 'DD.MM.YYYY') => {
    let formatForUtc = moment(date, 'DD/MM/YYYY').format('MM/DD/YYYY') + (time ? ' ' + time : '')
    let convertedDate = moment.utc(formatForUtc).format()
    var local = moment.utc(convertedDate).local().format(outputFormat)
    return local
}

const convertDateTimeToLocal = (date, time = '', outputFormat = 'DD.MM.YYYY') => {
    let formattedTime = moment(time, 'HH:mm:ss').format('hh:mm A')
    let formatForUtc = moment(date, 'YYYY-MM-DD').format('MM/DD/YYYY') + (time ? ' ' + formattedTime : '')
    let convertedDate = moment.utc(formatForUtc).format()
    var local = moment.utc(convertedDate).local().format(outputFormat)
    return local
}

const getTodayTimeDifference = (startDate, endDate = moment()) => {
    let a = moment(startDate)
    let b = moment(endDate)
    let res = b.diff(a, 'minutes')
    if (res < 60) {
        return `${res} minutes ago`
    } else {
        let res = b.diff(a, 'hours')
        return `${res} hours ago`
    }
    return ''
}

const getUrlParameter = (name, params) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')

    var results = regex.exec(params)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

const changeDateFormat = (date, currentFormat = 'DD/MM/YYYY', newFormat = 'Do MMM, YY') =>
    moment(date, currentFormat).format(newFormat)

const parseHtml = (text) => {
    let urlRegex =
        /(\b((https?|ftp|file):\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?)/gi

    return text.replace(urlRegex, function (url) {
        let newUrl = url.indexOf('http') === -1 ? 'http://' + url : url
        return '<a href="' + newUrl + '">' + url + '</a>'
    })
}

const validateNumber = (e) => {
    const valuesAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (!valuesAllowed.includes(e.key)) {
        e.preventDefault()
    }
}

const validateFloatNumber = (e) => {
    const valuesAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    if (!valuesAllowed.includes(e.key)) {
        e.preventDefault()
    }
}

const authUserInfo = () => {
    let userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
        userInfo = JSON.parse(userInfo)
    } else {
        userInfo = {}
    }
    return userInfo
}
const isValidJSON = (str) => {
    try {
        JSON.parse(str)
        return true
    } catch (e) {
        return false
    }
}

const getImageExt = (url) => {
    if (!url) {
        return ''
    }
    let splits = url.split('.')
    let result = ''
    if (splits.length) {
        result = splits[splits.length - 1]
    }
    return result
}

const IMAGE_EXTS = ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'svg', 'JPEG', 'JPG', 'PNG', 'GIF', 'TIFF', 'SVG']

const replaceUnderLine = (str) => capitalizeFirstLetter(str.split('_').join(' '))

const isValidFile = (file, type) => {
    let ext = file.name.split('.').pop()
    if (type === 'PRODUCT_DESIGN' || type == 'REFERENCE_IMAGE') {
        if (IMAGE_EXTS.includes(ext) && file.size < 2000001) {
            return true
        }
    } else {
        if (
            (IMAGE_EXTS.includes(ext) ||
                ext === 'xls' ||
                ext === 'xlsx' ||
                ext === 'docx' ||
                ext === 'doc' ||
                ext === 'eps' ||
                ext === 'ai' ||
                ext === 'pdf' ||
                ext === 'ppt' ||
                ext === 'pptx') &&
            file.size < 2000001
        ) {
            return true
        }
    }

    return false
}

const parseDate = (date) => {
    let temp = date.split('/')
    return temp[2] + '-' + temp[1] + '-' + temp[0]
}

const dateCompare = (orderDate, dueDate) => {
    const dateA = moment(orderDate)
    const dateB = moment(dueDate)
    const difference = dateB.diff(dateA, 'days')
    if (difference >= 1) {
        return true
    } else {
        return false
    }
}

const DATE_TYPES = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond']

const addWithCurrentDate = (date, duration, dateType, dateFormat = 'Do MMM, YY') => {
    if (DATE_TYPES.includes(dateType)) {
        return moment(date).add(duration, dateType).format(dateFormat)
    }
    return false
}

const copy = (obj) => JSON.parse(JSON.stringify(obj))

const getDateDifference = (startDate = moment(), endDate) => {
    const dateA = moment(startDate)
    const dateB = moment(endDate)
    return dateB.diff(dateA, 'days')
}

const getNumberUnit = (value) => {
    if (value < 1e3) return value
    if (value >= 1e3 && value < 1e6) return +(value / 1e3).toFixed(2) + 'K'
    if (value >= 1e6 && value < 1e9) return +(value / 1e6).toFixed(2) + 'M'
    if (value >= 1e9 && value < 1e12) return +(value / 1e9).toFixed(2) + 'B'
    if (value >= 1e12) return +(value / 1e12).toFixed(2) + 'T'
}

const getShortName = (source, size = 35) => {
    return source?.length > size ? source?.slice(0, size - 1) + '…' : source
}
const isPageReachBottom = () => {
    let bool = false
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const html = document.documentElement
    const windowBottom = windowHeight + window.pageYOffset
    if (Math.floor(windowBottom) - html.scrollHeight === 0) {
        bool = true
    }
    return bool
}

const toOrdinalSuffix = (num) => {
    const int = parseInt(num),
        digits = [int % 10, int % 100],
        ordinals = ['st', 'nd', 'rd', 'th'],
        oPattern = [1, 2, 3, 4],
        tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19]
    return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
        ? int + ordinals[digits[0] - 1]
        : int + ordinals[3]
}

const DOC_EXTS = ['doc', 'docx', 'DOC', 'DOCX']
const XLS_EXTS = ['xls', 'xlsx', 'XLS', 'XLSX']
const PDF_EXTS = ['pdf', 'PDF']
const AI_EXTS = ['ai', 'AI']
const PSD_EXTS = ['ps', 'psd', 'PS', 'PSD']
const EPS_EXTS = ['eps', 'EPS']
const getFileType = (fileName) => {
    if (!fileName || fileName.trim().length === 0) return 'NO_FILE'

    let ext = fileName.split('.').pop()

    if (IMAGE_EXTS.includes(ext)) return 'IMAGE'
    else if (DOC_EXTS.includes(ext)) return 'DOC'
    else if (XLS_EXTS.includes(ext)) return 'XLX'
    else if (PDF_EXTS.includes(ext)) return 'PDF'
    else if (AI_EXTS.includes(ext)) return 'AI'
    else if (PSD_EXTS.includes(ext)) return 'PSD'
    else if (EPS_EXTS.includes(ext)) return 'EPS'
    else return 'FILE'
}
const getIconByFileType = (fileType) => {
    switch (fileType) {
        case 'DOC':
            return '/images/file-doc.svg'
        case 'XLX':
            return '/images/file-xls.svg'
        case 'PDF':
            return '/images/file-pdf.svg'
        case 'AI':
            return '/images/file-ai.svg'
        case 'PSD':
            return '/images/file-ps.svg'
        case 'EPS':
            return '/images/file-eps.svg'
        case 'FILE':
            return '/images/file.svg'
        default:
            return '/images/file.svg'
    }
}

const getMentionedUserIds = (post, orderMemberList) => {
    let foundEmails = []
    let emailRegex =
        /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
    let match = null
    let ids = []
    while ((match = emailRegex.exec(post))) {
        foundEmails.push(match[0])
        post = post.replace(match[0], '')
    }
    foundEmails.map((email) => {
        orderMemberList.map((member) => {
            if (member.email === email && !ids.includes(member.memberId)) {
                ids.push(member.memberId)
            }
        })
    })
    return ids
}

const mentionModule = (memberList, bool) => {
    if (!bool) {
        return {
            allowedChars: /^[A-Za-z\s]*$/,
            mentionDenotationChars: ['@'],
            source: async (searchTerm, renderList) => {
                if (searchTerm.length === 0) {
                    renderList(memberList, searchTerm)
                } else {
                    let matches = []
                    for (let i = 0; i < memberList.length; i++) {
                        if (memberList[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                            matches.push(memberList[i])
                        }
                    }
                    renderList(matches, searchTerm)
                }
            }
        }
    }
}

const onErrorImageLoad = (e, url, type = 'user') => {
    let image = '/images/default_product.svg'
    if (type === 'user') {
        image = '/images/pro_pic_default.svg'
    }
    fetch(addImageSuffix(url, '')).then(() => {
        image = addImageSuffix(url, '')
    })
    e.target.src = image
    e.target.onerror = null
}

export {
    capitalizeFirstLetter,
    replaceSpace,
    convertToDateTimeFromMiliSeconds,
    convertToDateFromMiliSeconds,
    convertToSelectOptions,
    isTokenExpired,
    convertToISODate,
    getOneWeekAgoMillis,
    getDateFromMillis,
    doCommaSeparationWithDecimals,
    doCommaSeparationWithIntegers,
    getDateWithHourFromMillis,
    encodeQueryData,
    _getKey,
    getToken,
    addImageSuffix,
    convertTimeToLocal,
    getTodayTimeDifference,
    getUrlParameter,
    changeDateFormat,
    parseHtml,
    validateNumber,
    authUserInfo,
    isValidJSON,
    getImageExt,
    IMAGE_EXTS,
    replaceUnderLine,
    isValidFile,
    parseDate,
    dateCompare,
    addWithCurrentDate,
    copy,
    validateFloatNumber,
    getDateDifference,
    convertDateTimeToLocal,
    getNumberUnit,
    getShortName,
    isPageReachBottom,
    toOrdinalSuffix,
    getFileType,
    getIconByFileType,
    getMentionedUserIds,
    mentionModule,
    onErrorImageLoad
}
