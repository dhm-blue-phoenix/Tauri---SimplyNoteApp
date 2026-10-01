type Endpoint = 'notes';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface AddNote {
    title: string,
    content: string
}

interface RequestData {
    method: Method,
    endpoint: Endpoint,
    id?: string,
    body?: unknown
}

interface BackendResult {
    is_ok: boolean,
    status: 'error' | number,
    content: unknown
}

type NoteStatus = 'notes' | 'trash';

interface Note {
    id: string,
    title: string,
    content: string,
    status: NoteStatus,
    created_at: string,
}

type Notes = Note[];

export type {
    Note,
    Notes,
    NoteStatus,
    Endpoint,
    Method,
    BackendResult,
    RequestData,
    AddNote
};