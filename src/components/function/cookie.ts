export const getCookie = (name: string) => {
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
};

export const setCookie  = (name: string, value: string, exp: number) => {
    let date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURI(value) + ';expires=' + date.toUTCString() + ';path=/';
};
