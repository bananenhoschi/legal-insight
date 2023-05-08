export interface Token {
    word: string
    highlight: boolean
    count?: number
    source?: Source[]
}

export interface Source {
    sr_number: number
    art_number: number
    abs_nr: number
    ziff: string,
    number: number
}
