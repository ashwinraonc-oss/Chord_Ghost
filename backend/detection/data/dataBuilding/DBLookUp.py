"""
Ready-to-use lookup tables built from tombatossals/chords-db (MIT licensed).
Source: https://github.com/tombatossals/chords-db/tree/master/src/db/guitar

guitar_chords: dict keyed by (root, suffix) -> list of voicings
    e.g. guitar_chords[('C', 'major')], guitar_chords[('A', 'm7b5')]
    root spelling matches the source data's own key names: C, Csharp, D, Eb,
    E, F, Fsharp, G, Ab, A, Bb, B (sharps/flats exactly as chords-db chose them)
    suffix spelling matches chords-db's suffixes list (major, minor, 7, m7b5,
    maj9, /E, m9/Bb, etc -- 86 suffixes total, including slash/inversion chords)

chord_voicings: dict keyed by frozenset(pitch classes 0-11, C=0) -> list of
    voicings, merged across every (root, suffix) pair that lands on that exact
    set of notes (same idea as chord_voicings_complete.py earlier in this chat)

contributors: dict keyed by the same frozenset -> list of (root, suffix) pairs
    that contributed voicings to that entry (so you can see what merged)

Each voicing is [Low E, A, D, G, B, High E] absolute fret numbers, -1 = muted,
0 = open. Unlike the from-scratch library built earlier in this chat, each
chord here has however many voicings chords-db curated for it (1 to 4), not a
fixed count of 10 -- this is real, human-curated fingering data, not
algorithmically generated.
"""
import os
from .DataBuilder import build

_json_path = os.path.join(os.path.dirname(__file__), 'data.json')
guitar_chords, chord_voicings, contributors = build(_json_path)