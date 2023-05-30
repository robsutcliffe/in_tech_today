export default function isValidDate(date: string): boolean {
    return !isNaN(Date.parse(date));
}