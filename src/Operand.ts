export default interface Operand {
    immediate: boolean;
    name: string;
    bytes?: number;
    value?: number;
}
