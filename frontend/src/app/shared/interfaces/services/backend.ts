type Endpoint = 'notes';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

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
    Method,
    BackendResult,
    RequestData
};