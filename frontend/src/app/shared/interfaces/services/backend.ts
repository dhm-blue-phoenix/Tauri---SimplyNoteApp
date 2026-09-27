type Endpoint = "notes" | "note";

interface BackendResult {
    is_ok: boolean,
    status: "error" | number,
    content: unknown
}

type NoteStatus = "notes" | "trash";

interface Note {
    id: string,
    title: String,
    content: String,
    status: NoteStatus,
    created_at: String,
}

type Notes = Note[];

export type {
    Note,
    Notes,
    NoteStatus,
    Endpoint,
    BackendResult
};