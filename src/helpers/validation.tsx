export const validateStringLength = (start: number, finish: number, s: string) : boolean => {
    return s.length >= start && s.length <= finish
}

export const validateStringAlphabet = (s: string, type: string) : boolean => {
    switch (type) {
        case 'Cyrillic': {
            return /^[\u0400-\u04FF ]+$/.test(s);
        }
        case 'Latin': {
            return /^[A-Za-z]+$/.test(s);
        }
        case 'LatinDigits': {
            return /^[A-Za-z0-9]+$/.test(s);
        }
        default:
            return false
    }

}

export const validate = (type: string, content: string): boolean => {
    switch (type){
        case 'email': {
            return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(content)) && content != "";
        }
        case 'name': {
            return validateStringLength(2, 30, content) && validateStringAlphabet(content, 'Cyrillic');
        }
        case 'brand': {
            return (validateStringLength(4, 20, content) && validateStringAlphabet(content, 'Latin'));
        }
        case 'model': {
            return validateStringLength(4, 20, content) && validateStringAlphabet(content, 'LatinDigits');
        }
        case 'text': {
            return (!/[!@#$%^&*()_+\-=\[\]{};':"\\|<>]+/.test(content) && content.length < 500 && content != "")
        }
        default: return true

    }
}