from dataclasses import dataclass
from typing import List


@dataclass()
class Source:
    sr_number: str
    art_number: str
    abs_nr: str
    ziff: str
    number: int


@dataclass()
class Performance:
    word: str
    highlight: bool
    count: int
    source: List[Source]