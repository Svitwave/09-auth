import { nextServer } from "./api";
import { User } from "../../types/user";
import { type Note } from "../../types/note";
import { type NoteTag } from "../../types/note";

export interface NoteSearchResponse {
  page: number;
  notes: Note[];
  totalPages: number;
  tag: NoteTag | null;
}

export async function fetchNotes(
  SearchText: string,
  page: number,
  tag?: string
) {
  const params: Record<string, string | number> = {
    search: SearchText,
    page,
    perPage: 12,
  };

  if (tag) {
    params.tag = tag;
  }

  const { data } = await nextServer.get<NoteSearchResponse>("/notes", {
    params,
  });

  return data;
}

export async function fetchNoteById(noteId: Note["id"]) {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);

  return data;
}

export async function deleteNote(noteId: string) {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
}

interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}
export async function createNote(newNote: NewNote) {
  const { data } = await nextServer.post<Note>("/notes", newNote);

  return data;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  const { data } = await nextServer.post("/auth/logout");
  return data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};
