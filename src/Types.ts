// These types are dummy

export type Uint8 = number
export type Uint16 = number

export interface Register<T> {
    read(): T
    write(value: T): T
}

export interface SplittedRegister<T, K> extends Register<T> {
    readLow(): T
    readHigh(): T
    writeLow(value: K): T
    writeHigh(value: K): T
}