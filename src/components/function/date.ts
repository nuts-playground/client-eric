export function formatDate(dateString: string) {
    // ex) 2024-03-23T23:06:36.654Z
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const twoDigit = (num: number) => num < 10 ? `0${num}` : `${num}`;
    const formattedDate = `${year}-${twoDigit(month)}-${twoDigit(day)}`;
    const formattedTime = `${twoDigit(hours)}:${twoDigit(minutes)}`;
    return `${formattedDate} ${formattedTime}`;
}
